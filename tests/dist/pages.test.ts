import { describe, expect, it } from 'vitest';
import { DISCLAIMERS } from '../disclaimers';
import { contentPagePaths, jsonLd, loadPage, readDist, text, urlPath } from './helpers';

const PROFILES = [
  'https://github.com/harishm17',
  'https://www.linkedin.com/in/harishm17/',
  'https://codeforces.com/profile/harishm',
  'https://lichess.org/@/harishm17',
];

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
  // Rules like "no code, prompts or customer details" are followed, never stated (Harish, 2026-10-09).
  ...DISCLAIMERS,
];

describe('every content page', () => {
  it.each(contentPagePaths())('%s has the shared shell', (path) => {
    const doc = loadPage(path);
    expect(doc.documentElement.getAttribute('lang')).toBe('en');
    expect(doc.querySelectorAll('h1').length).toBe(1);
    expect(doc.querySelector('a.skip')?.getAttribute('href')).toBe('#main');
    expect(doc.querySelector('main#main')).not.toBeNull();
    expect(doc.querySelector('meta[name="description"]')?.getAttribute('content')?.length).toBeGreaterThan(20);
    expect(doc.querySelector('meta[name="twitter:card"]')?.getAttribute('content')).toBe('summary_large_image');
    expect(text(doc.querySelector('footer'))).toContain('Updated October 2026');
    // Same order as the home link row.
    expect([...doc.querySelectorAll('footer a')].map((a) => a.getAttribute('href'))).toEqual([
      '/HarishManoharan.pdf',
      'https://github.com/harishm17',
      'https://www.linkedin.com/in/harishm17/',
      'mailto:harish_manoharan@outlook.com',
    ]);
    expect([...doc.querySelectorAll('footer a[rel~="me"]')].map((a) => a.getAttribute('href'))).toEqual(PROFILES.slice(0, 2));
  });

  it.each(contentPagePaths().filter((path) => path !== '404.html'))('%s has a self-referencing canonical and no robots block', (path) => {
    const doc = loadPage(path);
    const canonical = `https://harishmanoharan.com${urlPath(path)}`;
    expect(doc.querySelectorAll('link[rel="canonical"]').length).toBe(1);
    expect(doc.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(canonical);
    expect(doc.querySelector('meta[property="og:url"]')?.getAttribute('content')).toBe(canonical);
    expect(doc.querySelector('meta[name="robots"]')).toBeNull();
  });

  it('404 is noindex and has no canonical, since its URL is any missing page', () => {
    const doc = loadPage('404.html');
    expect(doc.querySelector('meta[name="robots"]')?.getAttribute('content')).toBe('noindex');
    expect(doc.querySelector('link[rel="canonical"]')).toBeNull();
    expect(doc.querySelector('meta[property="og:url"]')).toBeNull();
  });

  it.each(contentPagePaths())('%s declares the favicons search engines can use, with the SVG for browsers', (path) => {
    const doc = loadPage(path);
    const icons = [...doc.querySelectorAll('link[rel="icon"], link[rel="apple-touch-icon"]')].map((l) => [
      l.getAttribute('rel'),
      l.getAttribute('href'),
      l.getAttribute('sizes'),
      l.getAttribute('type'),
    ]);
    expect(icons).toEqual([
      ['icon', '/favicon.ico', '48x48', null],
      ['icon', '/favicon.svg', null, 'image/svg+xml'],
      ['icon', '/favicon-192.png', '192x192', 'image/png'],
      ['apple-touch-icon', '/apple-touch-icon.png', null, null],
    ]);
  });

  it.each(contentPagePaths())('%s links his profiles rel="me" in the head', (path) => {
    const me = [...loadPage(path).querySelectorAll('head link[rel="me"]')].map((l) => l.getAttribute('href'));
    expect(me).toEqual(PROFILES);
  });

  it('every title carries the name: "Harish Manoharan: …" on home, "…: Harish Manoharan" elsewhere, unique and at most 70 characters', () => {
    const titles = contentPagePaths().map((path) => [path, loadPage(path).title] as const);
    for (const [path, title] of titles) {
      if (path === 'index.html') expect(title.startsWith('Harish Manoharan: '), title).toBe(true);
      else expect(title.endsWith(': Harish Manoharan'), title).toBe(true);
      expect(title.length, title).toBeLessThanOrEqual(70);
    }
    expect(new Set(titles.map(([, t]) => t)).size).toBe(titles.length);
  });

  it.each(contentPagePaths())('%s has at most one ld+json script, and it parses', (path) => {
    const doc = loadPage(path);
    expect(doc.querySelectorAll('script[type="application/ld+json"]').length).toBeLessThanOrEqual(1);
    expect(() => jsonLd(doc)).not.toThrow();
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
    // Machine-read copy (JSON-LD) follows the same rules.
    const ld = [...doc.querySelectorAll('script[type="application/ld+json"]')].map((s) => s.textContent ?? '').join(' ');
    const copy = [doc.title, description, ld, text(doc.body)].join(' ');
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
    expect(text(doc.querySelector('main p'))).toContain('Try the home page or the Work page.');
  });
});
