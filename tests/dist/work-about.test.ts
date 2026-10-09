import { describe, expect, it } from 'vitest';
import { GROUPS, byGroup } from '../../src/data/work';
import { distFile, loadPage, text } from './helpers';

describe('/work/', () => {
  const doc = loadPage('work/index.html');

  it('has one section per group, in order, with the redirect anchor ids', () => {
    expect([...doc.querySelectorAll('main h2')].map((h) => h.id)).toEqual(GROUPS.map((g) => g.id));
  });

  it('lists every row of every group', () => {
    for (const g of GROUPS) {
      const titles = [...doc.querySelectorAll(`section[aria-labelledby="${g.id}"] .row-title`)].map((h) => text(h));
      expect(titles).toEqual(byGroup(g.id).map((w) => w.title));
    }
  });

  it('does not repeat the company name on rows under the Purgo AI heading', () => {
    const contexts = [...doc.querySelectorAll('section[aria-labelledby="purgo"] .row-context')].map((p) => text(p));
    expect(contexts.length).toBe(byGroup('purgo').length);
    for (const c of contexts) expect(c).toMatch(/^\d{4}(–\d{2})?$/);
    const earlier = text(doc.querySelector('section[aria-labelledby="earlier"] .row-context'));
    expect(earlier).toContain('Digitus');
  });

  it('marks coursework as coursework and never as research', () => {
    const research = text(doc.querySelector('section[aria-labelledby="research"]'));
    expect(research).not.toContain('CS6130');
    expect(text(doc.querySelector('section[aria-labelledby="coursework"]'))).toContain('Paper presentation');
  });

  it('links only to pages that exist', () => {
    for (const a of doc.querySelectorAll('main a[href^="/"]')) {
      const path = (a.getAttribute('href') ?? '').split('#')[0];
      const file = path.endsWith('.pdf') ? path.slice(1) : `${path.replace(/^\//, '')}index.html`;
      expect(() => distFile(file), path).not.toThrow();
    }
  });
});

describe('/about/', () => {
  const doc = loadPage('about/index.html');
  const main = text(doc.querySelector('main'));

  it('tells the story and lists education with honors', () => {
    for (const s of ['IIT Madras', 'The Jackson Laboratory', 'UT Dallas', 'Purgo AI', 'GPA 3.92', 'Dean’s Graduate Scholar', 'INSPIRE Scholar', 'Young Research Fellow']) {
      expect(main).toContain(s);
    }
  });

  it('shows an optimized photo with alt text', () => {
    const img = doc.querySelector('main picture img');
    expect(img?.getAttribute('alt')).toBe('Harish Manoharan');
    expect(doc.querySelector('main picture source[type="image/avif"]')).not.toBeNull();
  });

  it('has outside work and a contact line', () => {
    for (const s of ['Shaastra', 'Lichess', 'Codeforces', 'table tennis', 'harish_manoharan@outlook.com']) expect(main).toContain(s);
    // The Codeforces profile shows no contest since February 2024, so it is past tense, not "these days".
    expect(main).not.toMatch(/These days[^.]*Codeforces/);
  });

  it('links Contact once (the footer already carries GitHub and LinkedIn)', () => {
    expect(doc.querySelectorAll('section[aria-labelledby="contact"] a').length).toBe(1);
    expect(doc.querySelector('section[aria-labelledby="contact"] a')?.getAttribute('href')).toBe('mailto:harish_manoharan@outlook.com');
  });

  it('qualifies the 6,000+ participants figure as self-reported, and only that way', () => {
    // Spec section 9: the figure is Harish's own claim from the old site, so it never appears bare.
    const mentions = main.match(/6,000\+/g) ?? [];
    const qualified = main.match(/6,000\+ participants \(a self-reported figure\)/g) ?? [];
    expect(mentions.length).toBeGreaterThan(0);
    expect(qualified.length).toBe(mentions.length);
  });

  it('says what a11y-stem is, without a repo link or launch claims', () => {
    expect(main).toContain(
      'a personal project that turns STEM lecture PDFs into accessible HTML, with equations as MathML a screen reader can speak',
    );
    expect(main).not.toMatch(/open[- ]source|\bbeta\b|\bADA\b|\blaunch/i);
    expect([...doc.querySelectorAll('main a')].some((a) => /a11y-stem/i.test(a.getAttribute('href') ?? ''))).toBe(false);
  });

  it('keeps the spaces next to inline links', () => {
    // Guards against whitespace dropped at a line break beside an inline tag ("contests onCodeforces").
    for (const s of ['chess on Lichess,', 'contests on Codeforces.', 'Email is best: harish_manoharan@outlook.com. I live in the San Francisco Bay Area.']) {
      expect(main).toContain(s);
    }
  });

  it('marks About as the current page', () => {
    expect(doc.querySelector('nav a[href="/about/"]')?.getAttribute('aria-current')).toBe('page');
  });
});
