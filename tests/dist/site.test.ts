import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { distFile, readDist } from './helpers';

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

describe('redirects from the old SPA routes', () => {
  it.each([
    ['experience', '/work/'],
    ['projects', '/work/'],
    ['research', '/work/#research'],
    ['skills', '/about/'],
    ['certifications', '/about/'],
    ['leadership', '/about/'],
    ['hobbies', '/about/'],
    ['contact', '/about/'],
  ])('/%s redirects to %s with a canonical link', (from, to) => {
    const html = readDist(`${from}/index.html`);
    expect(html).toContain(`content="0;url=${to}"`);
    expect(html).toMatch(/<link rel="canonical" href="[^"]+"/);
  });
});

describe('robots and sitemap', () => {
  it('robots.txt allows everything and points at the sitemap index', () => {
    expect(readDist('robots.txt').trim()).toBe(
      'User-agent: *\nAllow: /\nSitemap: https://harishm17.github.io/sitemap-index.xml',
    );
  });

  it('the sitemap lists real pages and none of the redirect stubs', () => {
    const xml = readDist('sitemap-0.xml');
    expect(xml).toContain('<loc>https://harishm17.github.io/</loc>');
    for (const stub of ['experience', 'projects', 'research', 'skills', 'certifications', 'leadership', 'hobbies', 'contact', 'box-backup', '404']) {
      expect(xml).not.toContain(`/${stub}`);
    }
  });
});
