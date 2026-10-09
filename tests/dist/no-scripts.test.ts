import { describe, expect, it } from 'vitest';
import { contentPagePaths, readDist } from './helpers';

describe('no client JavaScript (Review Focus 4)', () => {
  it.each(contentPagePaths())('%s ships no script except JSON-LD', (path) => {
    const scripts = [...readDist(path).matchAll(/<script\b([^>]*)>/g)].map((m) => m[1]);
    for (const attrs of scripts) expect(attrs).toContain('type="application/ld+json"');
  });
});
