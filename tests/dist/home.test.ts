import { existsSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { distFile, loadPage, readDist, text } from './helpers';

const doc = loadPage('index.html');
const main = () => text(doc.querySelector('main'));

describe('home: head', () => {
  it('uses the positioning title and description', () => {
    expect(text(doc.querySelector('title'))).toBe('Harish Manoharan: LLM retrieval and evaluation');
    expect(doc.querySelector('meta[name="description"]')?.getAttribute('content')).toBe(
      'Software engineer at Purgo AI working on retrieval and evaluation for an LLM coding agent. MS CS, UT Dallas; IIT Madras.',
    );
  });

  it('has Person JSON-LD with employer, schools and profiles', () => {
    const raw = doc.querySelector('script[type="application/ld+json"]')?.textContent ?? '';
    const ld = JSON.parse(raw);
    expect(ld['@type']).toBe('Person');
    expect(ld.name).toBe('Harish Manoharan');
    expect(ld.worksFor.name).toBe('Purgo AI');
    expect(ld.alumniOf.map((a: { name: string }) => a.name)).toEqual([
      'The University of Texas at Dallas',
      'Indian Institute of Technology Madras',
    ]);
    expect(ld.sameAs).toEqual(['https://github.com/harishm17', 'https://www.linkedin.com/in/harishm17/']);
  });
});

describe('home: intro', () => {
  it('has a short h1 with the niche nouns', () => {
    const h1 = text(doc.querySelector('h1'));
    expect(h1).toMatch(/retrieval and evaluation/);
    expect(h1.length).toBeLessThanOrEqual(60);
  });

  it('puts role, employer and both schools in the ID line', () => {
    const id = text(doc.querySelector('.id-line'));
    for (const s of ['Software engineer at Purgo AI', 'UT Dallas', '2026', 'GPA 3.92', 'IIT Madras', '2024']) {
      expect(id).toContain(s);
    }
  });

  it('says intern then full-time, and names both earlier internships', () => {
    const bio = text(doc.querySelector('.bio'));
    for (const s of ['June 2025', 'intern', 'June 2026', 'Digitus', 'PwC']) expect(bio).toContain(s);
  });

  it('keeps the spaces around the inline case-study link in the bio', () => {
    // Guards against whitespace dropped next to the link ("I work onwhat it retrieves").
    expect(text(doc.querySelector('.bio'))).toContain('I work on what it retrieves before it writes, and on the benchmarks');
  });

  it('links resume, GitHub, LinkedIn and email', () => {
    const hrefs = [...doc.querySelectorAll('.link-row a')].map((a) => a.getAttribute('href'));
    expect(hrefs).toEqual([
      '/HarishManoharan.pdf',
      'https://github.com/harishm17',
      'https://www.linkedin.com/in/harishm17/',
      'mailto:harish_manoharan@outlook.com',
    ]);
  });
});

describe('home: results band', () => {
  it('shows exactly the three Purgo results with their samples', () => {
    const cells = [...doc.querySelectorAll('.band li.cell')];
    expect(cells.map((c) => text(c.querySelector('.vh')))).toEqual([
      'cut from 79 to 24',
      'cut from 8.6% to 5.3%',
      'up from 0.54 to 0.68',
    ]);
    expect(cells.map((c) => text(c.querySelector('.sample')))).toEqual([
      '103-ticket benchmark',
      '95 tickets, one run; recall unchanged',
      '4.0 s to 0.18 s per query; 188 real queries, expected tables from real tickets',
    ]);
  });

  it('links the case study under the band only when it is published', () => {
    const link = doc.querySelector('.case-link a');
    if (existsSync('dist/work/agent-retrieval/index.html')) {
      expect(link?.getAttribute('href')).toBe('/work/agent-retrieval/');
      expect(text(doc.querySelector('.case-link'))).toMatch(/^Read the case study: Finding the tables an LLM agent misses · \d+ min$/);
    } else {
      expect(link).toBeNull();
    }
  });

  it('keeps the write-up-only cost result off the home page', () => {
    expect(main()).not.toContain('7.6');
  });
});

describe('home: now, work, research', () => {
  it('features a11y-stem as a dated Now block without promises it cannot keep yet', () => {
    // `section.now`: Figure also uses a `.now` span for the "after" value inside the band.
    const now = text(doc.querySelector('section.now'));
    expect(now).toContain('a11y-stem');
    expect(now).toMatch(/Updated October \d+, 2026/);
    expect(now).toContain('7 to 1');
    // Spec §9: the 7-to-1 result must say the fix was built on the same sample it was measured on.
    expect(now).toMatch(/same (30 equations|sample)/);
    expect(now).toContain('development sample');
    for (const s of ['open-source', 'open source', '2027', 'November', 'compliant']) expect(now.toLowerCase()).not.toContain(s.toLowerCase());
  });

  it('lists four selected rows in order, then links to all work', () => {
    const titles = [...doc.querySelectorAll('.selected .row-title')].map((h) => text(h));
    expect(titles).toEqual([
      'Finding the tables an LLM agent misses',
      'Testing LLMs and Databricks platforms for regulated use',
      'Text-to-SQL agent',
      'Finding behaviors in mouse videos without labels',
    ]);
    expect(doc.querySelector('.selected .more a')?.getAttribute('href')).toBe('/work/');
  });

  it('never links a page that was not built', () => {
    for (const a of doc.querySelectorAll('main a[href^="/work/"]')) {
      const path = (a.getAttribute('href') ?? '').split('#')[0];
      expect(() => distFile(`${path.replace(/^\//, '')}index.html`), path).not.toThrow();
    }
  });

  it('has no em dashes in the page text', () => {
    expect(readDist('index.html')).not.toContain('—');
  });
});
