import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { parse as parseYaml } from 'yaml';
import { DIST } from './helpers';

function htmlFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? htmlFiles(p) : p.endsWith('.html') ? [p] : [];
  });
}

describe('draft write-ups (a11y-stem)', () => {
  it('are not built', () => {
    expect(existsSync(join(DIST, 'work/a11y-stem/index.html'))).toBe(false);
  });

  it('are not linked from any page or listed in the sitemap', () => {
    for (const file of htmlFiles(DIST)) expect(readFileSync(file, 'utf8'), file).not.toContain('/work/a11y-stem/');
    expect(readFileSync(join(DIST, 'sitemap-0.xml'), 'utf8')).not.toContain('a11y-stem');
  });

  it('do not publish their share image before the page itself', () => {
    const DIR = 'src/content/work';
    for (const file of readdirSync(DIR).filter((f) => f.endsWith('.mdx'))) {
      const front = readFileSync(join(DIR, file), 'utf8').match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '';
      const data = parseYaml(front) as { draft?: boolean; ogImage: string };
      if (data.draft) expect(existsSync(join(DIST, data.ogImage)), data.ogImage).toBe(false);
    }
  });
});
