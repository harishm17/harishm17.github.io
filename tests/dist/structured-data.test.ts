import { describe, expect, it } from 'vitest';
import sharp from 'sharp';
import { site } from '../../src/data/site';
import { contentPagePaths, distFile, jsonLd, loadPage, text, urlPath, type LdNode } from './helpers';

const PERSON_ID = 'https://harishmanoharan.com/#person';

/** Every node on the page with the given type, including nested ones (a ProfilePage's mainEntity). */
function nodes(path: string, type: string): LdNode[] {
  const found: LdNode[] = [];
  const walk = (v: unknown) => {
    if (Array.isArray(v)) v.forEach(walk);
    else if (v && typeof v === 'object') {
      const n = v as LdNode;
      if (n['@type'] === type) found.push(n);
      Object.values(n).forEach(walk);
    }
  };
  walk(jsonLd(loadPage(path)));
  return found;
}

const canonical = (path: string) => loadPage(path).querySelector('link[rel="canonical"]')?.getAttribute('href');
const writeups = contentPagePaths().filter((p) => p.startsWith('work/') && p !== 'work/index.html');

describe('structured data across pages', () => {
  it('marks up home, About and each write-up, and nothing else', () => {
    const marked = contentPagePaths().filter((p) => jsonLd(loadPage(p)).length > 0);
    expect(marked).toEqual(['index.html', 'about/index.html', ...writeups]);
    expect(writeups.length).toBeGreaterThanOrEqual(2);
  });

  it('describes one Person everywhere: the full node is the same on home and About', () => {
    const [home] = nodes('index.html', 'Person');
    const [about] = nodes('about/index.html', 'Person');
    const { image, ...aboutWithoutImage } = about;
    expect(aboutWithoutImage).toEqual(home);
    expect(image).toBe('https://harishmanoharan.com/harish-manoharan.jpg');
    for (const path of writeups) expect(nodes(path, 'Person').map((p) => p['@id'])).toEqual([PERSON_ID]);
  });

  it('puts the WebSite only on the home page, where Google reads the site name', () => {
    expect(nodes('index.html', 'WebSite').length).toBe(1);
    for (const path of contentPagePaths().filter((p) => p !== 'index.html')) expect(nodes(path, 'WebSite')).toEqual([]);
  });

  it('shows the handle it gives as alternateName as text on the site', () => {
    const [p] = nodes('index.html', 'Person');
    const about = text(loadPage('about/index.html').querySelector('main'));
    expect(about).toContain(`I’m ${p.alternateName} on GitHub, LinkedIn and Lichess.`);
  });

  it('links every sameAs profile from a page, and never an account that is not his or not listed', () => {
    const [p] = nodes('index.html', 'Person');
    const hrefs = new Set(contentPagePaths().flatMap((path) => [...loadPage(path).querySelectorAll('a[href^="https://"]')].map((a) => a.getAttribute('href'))));
    for (const url of p.sameAs) expect(hrefs.has(url), url).toBe(true);
    const all = contentPagePaths().map((path) => JSON.stringify(jsonLd(loadPage(path)))).join(' ');
    expect(all).not.toMatch(/chess\.com|huggingface\.co|kaggle\.com|leetcode\.com/);
  });
});

describe('/about/ ProfilePage', () => {
  const [page] = nodes('about/index.html', 'ProfilePage');

  it('is about this page and dated by the last real edit', () => {
    expect(page.url).toBe(canonical('about/index.html'));
    // Google reports a bare date as an invalid datetime; it wants a time and a zone.
    expect(page.dateModified).toBe(`${site.updated.date}T12:00:00Z`);
    expect(page.mainEntity['@id']).toBe(PERSON_ID);
  });

  it('points at a square photo of at least 50,000 pixels that is built at a stable URL', async () => {
    const file = distFile(new URL(page.mainEntity.image).pathname.slice(1));
    const { width, height, format } = await sharp(file).metadata();
    expect(format).toBe('jpeg');
    expect(width).toBe(height);
    expect(width! * height!).toBeGreaterThanOrEqual(50_000);
  });
});

describe.each(writeups)('%s Article', (path) => {
  const doc = loadPage(path);
  const [article] = nodes(path, 'Article');

  it('repeats the visible headline, description, date and share image', () => {
    expect(article.headline).toBe(text(doc.querySelector('h1')));
    expect(article.description).toBe(doc.querySelector('meta[name="description"]')?.getAttribute('content'));
    expect(article.dateModified).toBe(`${doc.querySelector('.side time')?.getAttribute('datetime')}T12:00:00Z`);
    expect(article.datePublished).toMatch(/^\d{4}-\d{2}-\d{2}T12:00:00Z$/);
    expect(article.datePublished <= article.dateModified).toBe(true);
    expect(article.image).toEqual([doc.querySelector('meta[property="og:image"]')?.getAttribute('content')]);
    expect(article.mainEntityOfPage).toBe(canonical(path));
    expect(urlPath(path)).toBe(new URL(article.mainEntityOfPage).pathname);
  });

  it('credits the Person with the same @id and url as the full node, so parsers merge them', () => {
    expect(article.author).toEqual({
      '@type': 'Person',
      '@id': PERSON_ID,
      name: 'Harish Manoharan',
      url: 'https://harishmanoharan.com/',
    });
    expect(nodes('index.html', 'Person')[0].url).toBe(article.author.url);
  });
});
