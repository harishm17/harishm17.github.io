import { existsSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { distFile, loadPage, readDist, text } from './helpers';

const doc = loadPage('index.html');
const main = () => text(doc.querySelector('main'));

describe('home: head', () => {
  it('uses the positioning title and description', () => {
    expect(text(doc.querySelector('title'))).toBe('Harish Manoharan: software engineer, LLM agents');
    expect(doc.querySelector('meta[name="description"]')?.getAttribute('content')).toBe(
      'Software engineer at Purgo AI, building an LLM agent that turns data-engineering tickets into Databricks and dbt code. M.S. CS, UT Dallas; IIT Madras.',
    );
    expect(doc.querySelector('meta[name="description"]')?.getAttribute('content')?.length).toBeLessThanOrEqual(160);
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
  it('leads with the name as the h1 and no header name link', () => {
    expect(text(doc.querySelector('h1'))).toBe('Harish Manoharan');
    expect(doc.querySelector('.site-head .name')).toBeNull();
    expect(doc.querySelectorAll('.site-head nav a').length).toBe(3);
  });

  it('names the employer and the agent in a short lede, not one narrow sub-area', () => {
    const lede = text(doc.querySelector('.lede'));
    expect(lede).toContain('Software engineer at Purgo AI');
    expect(lede).toContain('LLM agent');
    expect(lede).toContain('Databricks and dbt code');
    expect(lede).not.toContain('retrieval and evaluation');
    expect(lede.length).toBeLessThanOrEqual(125);
  });

  it('puts both schools, years and GPA in the ID line', () => {
    const id = text(doc.querySelector('.id-line'));
    for (const s of ['UT Dallas', '2026', 'GPA 3.92', 'IIT Madras', '2024']) {
      expect(id).toContain(s);
    }
  });

  it('says intern then full-time, and names both earlier internships', () => {
    const bio = text(doc.querySelector('.bio'));
    for (const s of ['June 2025', 'intern', 'June 2026', 'Digitus', 'PwC']) expect(bio).toContain(s);
  });

  it('describes the whole pipeline and says the work spans it', () => {
    const bio = text(doc.querySelector('.bio'));
    expect(bio).toContain('LangGraph pipeline');
    expect(bio).toContain('I work across that pipeline: the nodes themselves, their prompts, and the evals and benchmarks');
  });

  it('keeps the spaces around the inline case-study link in the bio', () => {
    // Guards against whitespace dropped next to the link ("a ticket,finds the tables it needs, drafts").
    expect(text(doc.querySelector('.bio'))).toContain(
      'it analyzes a ticket, finds the tables it needs, drafts a design, then writes and reviews the code.',
    );
    const link = doc.querySelector('.bio a');
    expect(text(link)).toBe('finds the tables it needs');
    expect(link?.getAttribute('href')).toBe('/work/agent-retrieval/');
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

describe('home: featured', () => {
  const cards = () => [...doc.querySelectorAll('.featured .cards > li')];
  const published = (slug: string) => existsSync(`dist/work/${slug}/index.html`);

  it('has a Featured heading and three cards with plain-language titles, in order', () => {
    expect(text(doc.querySelector('.featured h2.section-title'))).toBe('Featured');
    expect(cards().map((c) => text(c.querySelector('h3')))).toEqual([
      'An agent that writes data-engineering code',
      'Testing LLMs for regulated use',
      'a11y-stem',
    ]);
  });

  it('gives each card a context line, a short paragraph and no result numbers', () => {
    expect(cards().map((c) => text(c.querySelector('.card-context')))).toEqual([
      'Purgo AI · 2025–26',
      'Purgo AI · 2025–26',
      'Personal project · in progress',
    ]);
    for (const c of cards()) expect(text(c.querySelector('.card-summary')).length).toBeGreaterThan(40);
    const first = text(cards()[0].querySelector('.card-summary'));
    expect(first).toContain('about 70%');
    expect(first).toContain('I work across Purgo’s LangGraph agent');
  });

  it('links the first two cards to their write-ups', () => {
    for (const [i, slug, label] of [
      [0, 'agent-retrieval', 'Read the retrieval case study'],
      [1, 'llm-evaluation', 'Read the write-up'],
    ] as const) {
      expect(published(slug)).toBe(true);
      const hrefs = [...cards()[i].querySelectorAll('a')].map((a) => a.getAttribute('href'));
      expect(hrefs).toEqual([`/work/${slug}/`, `/work/${slug}/`]);
      expect(text(cards()[i].querySelector('.card-link'))).toBe(label);
    }
  });

  it('links the a11y-stem card only once that write-up is published', () => {
    const card = cards()[2];
    if (published('a11y-stem')) {
      expect([...card.querySelectorAll('a')].map((a) => a.getAttribute('href'))).toEqual(['/work/a11y-stem/', '/work/a11y-stem/']);
      expect(text(card.querySelector('.card-link'))).toBe('About a11y-stem');
    } else {
      expect(card.querySelector('a')).toBeNull();
      expect(card.querySelector('.card-link')).toBeNull();
    }
  });

  it('keeps the benchmark numbers in the write-ups, off the home page', () => {
    const body = main();
    for (const n of ['79', '8.6%', '5.3%', '0.54', '0.68', 'recall@10', '7.6']) expect(body, n).not.toContain(n);
    expect(doc.querySelector('.band, .figure, .bars')).toBeNull();
  });
});

describe('home: more work', () => {
  it('has no Now block and no a11y-stem finding on the page', () => {
    expect(doc.querySelector('section.now')).toBeNull();
    expect(main()).not.toContain('Updated');
    expect(main()).not.toContain('7 to 1');
  });

  it('lists exactly two rows after Featured, then links to all work', () => {
    const headings = [...doc.querySelectorAll('main h2')].map((h) => text(h));
    expect(headings).toEqual(['Featured', 'More work']);
    const titles = [...doc.querySelectorAll('.more-work .row-title')].map((h) => text(h));
    expect(titles).toEqual(['Text-to-SQL agent', 'Finding behaviors in mouse videos without labels']);
    expect(doc.querySelector('.more-work .more a')?.getAttribute('href')).toBe('/work/');
    expect(text(doc.querySelector('.more-work .more a'))).toBe('All work, research and coursework');
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
