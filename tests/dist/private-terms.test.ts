import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { parseHTML } from 'linkedom';
import { describe, expect, it } from 'vitest';
import { describeName, loadPrivateTerms } from '../private-terms';
import { DIST, loadPage, text } from './helpers';

const terms = loadPrivateTerms();

function htmlFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) return htmlFiles(p);
    return p.endsWith('.html') ? [p] : [];
  });
}

describe.skipIf(!terms)(describeName('built pages', terms), () => {
  it('no built page contains one, in its markup or its text', () => {
    const files = htmlFiles(DIST);
    expect(files.length).toBeGreaterThan(5);
    const hits: string[] = [];
    for (const f of files) {
      // Hashed asset names under /_astro/ are random, so short numbers turn up in them by chance.
      const html = readFileSync(f, 'utf8').replace(/\/_astro\/[^"'\s)]+/g, '');
      const doc = parseHTML(html).document as unknown as Document;
      const all = `${html}\n${text(doc.documentElement)}`;
      for (const t of terms!.everywhere) if (t.found(all)) hits.push(`${relative(DIST, f)}: ${t.label}`);
    }
    expect(hits).toEqual([]);
  });

  it('/about/ has none of the About-only terms', () => {
    const main = text(loadPage('about/index.html').querySelector('main'));
    expect(terms!.about.filter((t) => t.found(main)).map((t) => t.label)).toEqual([]);
  });
});
