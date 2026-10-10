import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { readFileSync, readdirSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { site } from '../../src/data/site';
import { DIST, distFile, loadPage, readDist } from './helpers';

// sha256 of box-backup/index.html on main (2026-10-08). The box-backup Google OAuth app needs this page unchanged.
const BOX_BACKUP_SHA256 = 'a3e1588fdaa845575efb72e5d0db317171ca4512e715ca01d11af210c965dded';

describe('kept files', () => {
  it('serves the box-backup privacy page byte for byte', () => {
    const sha = createHash('sha256').update(readFileSync(distFile('box-backup/index.html'))).digest('hex');
    expect(sha).toBe(BOX_BACKUP_SHA256);
  });

  it.each([
    'HarishManoharan.pdf',
    'Harish___DDP_Report.pdf',
    'Harish-YRF_poster.pdf',
    'CS6130_Report.pdf',
    'CS6130.pdf',
    'AACB_Report.pdf',
  ])('keeps %s at its old path', (pdf) => {
    expect(readFileSync(distFile(pdf)).subarray(0, 5).toString()).toBe('%PDF-');
  });
});

// Search engines title a PDF result from its metadata, so each research PDF names itself and its authors.
// Reading the (compressed) metadata needs pdfinfo from poppler-utils; without it these are reported as skipped.
const pdfinfo = (file: string): Record<string, string> | null => {
  try {
    const out = execFileSync('pdfinfo', [file], { encoding: 'utf8' });
    return Object.fromEntries(out.split('\n').map((l) => [l.slice(0, l.indexOf(':')), l.slice(l.indexOf(':') + 1).trim()]));
  } catch {
    return null;
  }
};
describe.skipIf(!pdfinfo(distFile('CS6130.pdf')))('research PDFs carry search-friendly metadata', () => {
  it.each(['Harish___DDP_Report.pdf', 'Harish-YRF_poster.pdf', 'CS6130_Report.pdf', 'CS6130.pdf', 'AACB_Report.pdf'])('%s', (pdf) => {
    const info = pdfinfo(distFile(pdf))!;
    expect(info.Title?.length).toBeGreaterThan(10);
    expect(info.Author).toContain('Harish Manoharan');
    // No student roll number (the poster's Author used to carry one).
    expect(info.Author).not.toMatch(/\d/);
    expect(info.Keywords ?? '').toBe('');
  });
});

describe('redirects from the old SPA routes', () => {
  it.each([
    ['experience', '/work/'],
    ['projects', '/work/'],
    ['research', '/work/#research'],
    ['skills', '/about/'],
    ['certifications', '/about/'],
    ['leadership', '/about/#outside'],
    ['hobbies', '/about/#outside'],
    ['contact', '/about/#contact'],
  ])('/%s redirects to %s with a canonical link', (from, to) => {
    const html = readDist(`${from}/index.html`);
    expect(html).toContain(`content="0;url=${to}"`);
    expect(html).toMatch(/<link rel="canonical" href="[^"]+"/);
  });
});

describe('robots and sitemap', () => {
  it('robots.txt allows everything and points at the sitemap index', () => {
    expect(readDist('robots.txt').trim()).toBe(
      'User-agent: *\nAllow: /\nSitemap: https://harishmanoharan.com/sitemap-index.xml',
    );
  });

  it('the sitemap lists real pages and none of the redirect stubs', () => {
    const xml = readDist('sitemap-0.xml');
    expect(xml).toContain('<loc>https://harishmanoharan.com/</loc>');
    for (const stub of ['experience', 'projects', 'research', 'skills', 'certifications', 'leadership', 'hobbies', 'contact', 'box-backup', '404']) {
      expect(xml).not.toContain(`/${stub}`);
    }
  });

  it('dates every page with lastmod: a write-up by the date it shows, the rest by site.updated.date', () => {
    const xml = readDist('sitemap-0.xml');
    const entries = [...xml.matchAll(/<url><loc>([^<]+)<\/loc><lastmod>([^<]+)<\/lastmod><\/url>/g)].map((m) => [m[1], m[2]]);
    expect(entries.length).toBe([...xml.matchAll(/<loc>/g)].length);
    for (const [loc, lastmod] of entries) {
      const path = new URL(loc).pathname;
      const shown = loadPage(`${path.slice(1)}index.html`).querySelector('.side time')?.getAttribute('datetime');
      if (path.startsWith('/work/') && path !== '/work/') expect(shown, loc).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(lastmod.slice(0, 10), loc).toBe(shown ?? site.updated.date);
      expect(new Date(lastmod).getTime(), loc).toBeLessThanOrEqual(Date.now());
    }
  });

  it('declares only the sitemap namespace it uses', () => {
    expect(readDist('sitemap-0.xml')).not.toMatch(/xmlns:(news|xhtml|image|video)=/);
  });
});

describe('favicons', () => {
  it('draws the monogram as outlines, so it looks the same without any font', () => {
    const svg = readDist('favicon.svg');
    expect(svg).toContain('viewBox="0 0 32 32"');
    expect(svg).toContain('<path');
    expect(svg).not.toContain('<text');
  });

  it('serves favicon.ico with 16, 32 and 48 px images', () => {
    const ico = readFileSync(distFile('favicon.ico'));
    expect(ico.readUInt16LE(2)).toBe(1); // icon, not cursor
    const sizes = Array.from({ length: ico.readUInt16LE(4) }, (_, i) => ico.readUInt8(6 + 16 * i) || 256);
    expect(sizes).toEqual([16, 32, 48]);
  });

  it.each([
    ['favicon-192.png', 192],
    ['apple-touch-icon.png', 180],
  ])('serves %s as a %ipx square PNG', async (file, size) => {
    const meta = await sharp(distFile(file)).metadata();
    expect([meta.format, meta.width, meta.height]).toEqual(['png', size, size]);
  });
});

describe('IndexNow', () => {
  it('serves exactly one key file at the root, holding its own name', () => {
    const keys = readdirSync(DIST).filter((f) => /^[A-Za-z0-9-]{8,128}\.txt$/.test(f) && f !== 'robots.txt');
    expect(keys.length).toBe(1);
    expect(readDist(keys[0]).trim()).toBe(keys[0].replace(/\.txt$/, ''));
  });
});
