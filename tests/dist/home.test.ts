import { existsSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { distFile, loadPage, readDist, text } from './helpers';

const doc = loadPage('index.html');
const main = () => text(doc.querySelector('main'));

describe('home: head', () => {
  it('uses the positioning title and description', () => {
    expect(text(doc.querySelector('title'))).toBe('Harish Manoharan: software engineer at Purgo AI');
    expect(doc.querySelector('meta[name="description"]')?.getAttribute('content')).toBe(
      'Software engineer at Purgo AI, working on its data-engineering agent and the evals behind it. M.S. CS, UT Dallas; IIT Madras.',
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
    // Says what kind of agent, like the byline.
    expect(ld.knowsAbout).toEqual(['Data-engineering agents', 'Retrieval', 'LLM evaluation', 'Databricks', 'dbt']);
  });
});

describe('home: intro', () => {
  it('leads with the name as the h1 and no header name link', () => {
    expect(text(doc.querySelector('h1'))).toBe('Harish Manoharan');
    expect(doc.querySelector('.site-head .name')).toBeNull();
    expect(doc.querySelectorAll('.site-head nav a').length).toBe(3);
  });

  it('names the employer and what he builds in a short lede, not one narrow sub-area', () => {
    const lede = text(doc.querySelector('.lede'));
    expect(lede).toBe('Software engineer at Purgo AI, working on its data-engineering agent and the evals behind it.');
    expect(lede).not.toContain('retrieval and evaluation');
  });

  it('puts both schools and years in the ID line, without a GPA', () => {
    const id = text(doc.querySelector('.id-line'));
    for (const s of ['UT Dallas', '2026', 'IIT Madras', '2024']) {
      expect(id).toContain(s);
    }
    expect(id).not.toContain('GPA');
  });

  it('says intern then full-time, and names both earlier internships', () => {
    const bio = text(doc.querySelector('.bio'));
    for (const s of ['June 2025', 'intern', 'June 2026', 'Digitus', 'PwC']) expect(bio).toContain(s);
  });

  it('opens with what he did, not with a description of the agent, and says the work spans the pipeline', () => {
    const bio = text(doc.querySelector('.bio'));
    expect(bio.startsWith('I joined Purgo as an intern in June 2025')).toBe(true);
    expect(bio).toContain('I work across our LangGraph agent for data engineering');
    expect(bio).toContain('I also build the evals and benchmarks we use to decide whether a change helped.');
  });

  it('keeps the spaces around the inline case-study link in the bio', () => {
    // Guards against whitespace dropped next to the link ("a ticket,finds the tables it needs, drafts").
    expect(text(doc.querySelector('.bio'))).toContain(
      'how it analyzes a ticket, finds the tables it needs, drafts a design, and writes and reviews Databricks and dbt code.',
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
      'Purgo AI, · 2025–26',
      'Purgo AI, · 2025–26',
      'Personal project, · in progress',
    ]);
    // Assistive tech skips the aria-hidden dot, so the hidden comma carries the pause.
    const spoken = (el: Element | null) => {
      const c = el!.cloneNode(true) as Element;
      c.querySelectorAll('[aria-hidden]').forEach((n) => n.remove());
      return text(c);
    };
    expect(spoken(cards()[0].querySelector('.card-context'))).toBe('Purgo AI, 2025–26');
    for (const c of cards()) expect(text(c.querySelector('.card-summary')).length).toBeGreaterThan(40);
    const first = text(cards()[0].querySelector('.card-summary'));
    expect(first).toContain('about 70%');
    // Results-led, and it must not repeat the bio's "I work across our LangGraph agent" (Harish, 2026-10-09).
    expect(first).toContain('each change measured on benchmarks built from real tickets');
    expect(first).not.toContain('I work across');
  });

  it('links each published card once, from its title', () => {
    for (const [i, slug] of [[0, 'agent-retrieval'], [1, 'llm-evaluation']] as const) {
      expect(published(slug)).toBe(true);
      expect([...cards()[i].querySelectorAll('a')].map((a) => a.getAttribute('href'))).toEqual([`/work/${slug}/`]);
      expect(cards()[i].querySelector('h3 a')?.getAttribute('href')).toBe(`/work/${slug}/`);
    }
    expect(doc.querySelector('.card-link')).toBeNull();
  });

  it('links the a11y-stem card only once that write-up is published', () => {
    const card = cards()[2];
    if (published('a11y-stem')) {
      expect([...card.querySelectorAll('a')].map((a) => a.getAttribute('href'))).toEqual(['/work/a11y-stem/']);
    } else {
      expect(card.querySelector('a')).toBeNull();
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
    expect(text(doc.querySelector('.more-work .more a'))).toBe('All work');
  });

  it('gives the links into write-ups and the Work page larger tap areas', () => {
    const links = [...doc.querySelectorAll('.card-title a, .more-work .row-title a, .more-work .more a')];
    expect(links.length).toBeGreaterThanOrEqual(3);
    for (const a of links) expect(a.classList.contains('hit'), a.getAttribute('href') ?? '').toBe(true);
    // Inline sentence links stay plain.
    expect(doc.querySelector('.bio a')?.classList.contains('hit')).toBe(false);
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
