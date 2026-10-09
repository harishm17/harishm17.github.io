import { readFileSync, statSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { contentPagePaths, distFile, loadPage } from './helpers';

function pngSize(file: string) {
  const buf = readFileSync(file);
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

describe('share images', () => {
  const pages = contentPagePaths().filter((p) => p !== '404.html');

  it.each(pages)('%s points at an existing 1200x630 PNG under 300 KB', (path) => {
    const url = loadPage(path).querySelector('meta[property="og:image"]')?.getAttribute('content') ?? '';
    expect(url).toMatch(/^https:\/\/harishm17\.github\.io\/og\/.+\.png$/);
    const file = distFile(new URL(url).pathname.slice(1));
    expect(pngSize(file)).toEqual({ width: 1200, height: 630 });
    expect(statSync(file).size).toBeLessThan(300 * 1024);
  });

  it('each write-up has its own image', () => {
    const images = ['work/agent-retrieval/index.html', 'work/llm-evaluation/index.html'].map(
      (p) => loadPage(p).querySelector('meta[property="og:image"]')?.getAttribute('content'),
    );
    expect(new Set(images).size).toBe(images.length);
  });
});
