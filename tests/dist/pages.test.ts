import { describe, expect, it } from 'vitest';
import { contentPagePaths, loadPage, readDist, text } from './helpers';

// Task 5's banned list plus the spec's closing phrase (spec section 8).
const BANNED = [
  /passionate/i,
  /leverag/i,
  /cutting-edge/i,
  /seamless/i,
  /\brobust\b/i,
  /\bdelve/i,
  /showcase/i,
  /\bjourney\b/i,
  /at the intersection of/i,
  /every change/i,
  /I like building things/i,
  // Copy that explains the site to the reader instead of saying something (Harish, 2026-10-09).
  /linked titles/i,
  /write-ups are linked/i,
  /\bclick\b/i,
  /this page (covers|lists|shows|has)/i,
  /in one place/i,
  // Say "agents", not "LLM agents": the context is already AI (Harish, 2026-10-09).
  /\bLLM agents?\b/i,
  // "building agents" alone says nothing about what kind (Harish, 2026-10-09).
  /building agents/i,
];

describe('every content page', () => {
  it.each(contentPagePaths())('%s has the shared shell', (path) => {
    const doc = loadPage(path);
    expect(doc.documentElement.getAttribute('lang')).toBe('en');
    expect(doc.querySelectorAll('h1').length).toBe(1);
    expect(doc.querySelector('a.skip')?.getAttribute('href')).toBe('#main');
    expect(doc.querySelector('main#main')).not.toBeNull();
    expect(doc.querySelector('link[rel="canonical"]')?.getAttribute('href')).toMatch(/^https:\/\/harishm17\.github\.io\//);
    expect(doc.querySelector('meta[name="description"]')?.getAttribute('content')?.length).toBeGreaterThan(20);
    expect(doc.querySelector('meta[name="twitter:card"]')?.getAttribute('content')).toBe('summary_large_image');
    expect(doc.querySelector('link[rel="icon"]')?.getAttribute('href')).toBe('/favicon.svg');
    expect(text(doc.querySelector('footer'))).toContain('Updated October 2026');
    expect(doc.querySelector('footer a[href="/HarishManoharan.pdf"]')).not.toBeNull();
  });

  it.each(contentPagePaths().filter((path) => path !== 'index.html'))('%s shows the name link in the header', (path) => {
    const doc = loadPage(path);
    const name = doc.querySelector('.site-head a.name');
    expect(name?.getAttribute('href')).toBe('/');
    expect(text(name)).toBe('Harish Manoharan');
  });

  it.each(contentPagePaths())('%s follows the copy rules', (path) => {
    expect(readDist(path)).not.toContain('\u2014');
    // Banned words are matched against visible text, not raw HTML, so asset hashes and CSS cannot trip them.
    const doc = loadPage(path);
    const description = doc.querySelector('meta[name="description"]')?.getAttribute('content') ?? '';
    const copy = [doc.title, description, text(doc.body)].join(' ');
    for (const re of BANNED) expect(copy).not.toMatch(re);
  });

  it.each(contentPagePaths())('%s keeps separator dots free of spaces so hidden dots do not glue words', (path) => {
    // A "·" inside aria-hidden must carry no spaces of its own: when assistive tech skips it, the
    // spaces go with it ("Purgo AI2026"). The spaces belong outside the span, as in spec section 7.
    const dots = [...loadPage(path).querySelectorAll('[aria-hidden="true"]')].filter((el) => el.textContent?.trim() === '·');
    for (const dot of dots) expect(dot.textContent).toBe('·');
  });

  it('404 explains and links home and to Work', () => {
    const doc = loadPage('404.html');
    expect(text(doc.querySelector('h1'))).toBe('This page doesn’t exist.');
    const hrefs = [...doc.querySelectorAll('main a')].map((a) => a.getAttribute('href'));
    expect(hrefs).toEqual(['/', '/work/']);
    // Guards against whitespace dropped next to the inline links ("home pageor").
    expect(text(doc.querySelector('main p'))).toContain('Try the home page or the work index.');
  });
});
