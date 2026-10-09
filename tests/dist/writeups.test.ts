import { describe, expect, it } from 'vitest';
import { loadPage, readDist, text } from './helpers';

describe('/work/agent-retrieval/', () => {
  const doc = loadPage('work/agent-retrieval/index.html');

  it('has the title, dek, meta, scope note and Work marked current', () => {
    expect(text(doc.querySelector('h1'))).toBe('Finding the tables an LLM agent misses');
    expect(text(doc.querySelector('.dek'))).toContain('from 79 to 24');
    const side = text(doc.querySelector('.side'));
    for (const s of ['Purgo AI', 'min read', 'Updated', 'My part.', 'Built with.']) expect(side).toContain(s);
    expect(side).not.toMatch(/permission/i);
    expect(doc.querySelector('nav a[href="/work/"]')?.getAttribute('aria-current')).toBe('true');
    expect(doc.querySelector('meta[property="og:type"]')?.getAttribute('content')).toBe('article');
  });

  it('opens with the results table and keeps the anchors other pages link to', () => {
    const first = doc.querySelector('.prose > *');
    expect(first?.matches('section.table-wrap')).toBe(true);
    expect(text(doc.querySelector('#results-caption'))).toBe('Results');
    expect(doc.querySelector('h2#catalog-search')).not.toBeNull();
    expect(doc.querySelector('h2#cost')).not.toBeNull();
  });

  it('states every caveat spec §9 requires', () => {
    const body = text(doc.querySelector('.prose'));
    for (const s of [
      'separate run',
      'no held-out set',
      'small share of a full run’s cost',
      'one benchmark run',
      'the only quality measure I compared',
      'one example ranking call',
      'no confidence interval',
      'I didn’t measure whether the generated code got more correct',
    ]) expect(body).toContain(s);
  });

  it('cites no PR numbers', () => {
    // Other never-public terms are checked against the private list in private-terms.test.ts.
    expect(readDist('work/agent-retrieval/index.html')).not.toContain('PR #');
  });

  it('ends on the limits list, with the author credit only in the side block', () => {
    expect([...doc.querySelectorAll('.prose h2')].map((h) => text(h)).at(-1)).toBe('What this doesn’t show');
    expect(text(doc.querySelector('.side'))).toContain('catalog search benchmark');
  });

  it('keeps the side block short: spoken meta line, a one-line date and a one-sentence scope', () => {
    const meta = doc.querySelector('.side p')!.cloneNode(true) as Element;
    meta.querySelectorAll('[aria-hidden]').forEach((n) => n.remove());
    expect(text(meta)).toMatch(/^Purgo AI, 2026, \d+ min read$/);
    expect(text(doc.querySelector('.side time')?.parentElement)).toMatch(/^Updated \w+ \d+, \d{4}$/);
    expect(text(doc.querySelector('.side .scope'))).toBe('Numbers from Purgo’s internal benchmarks. No code, prompts or customer details.');
  });
});

describe('/work/llm-evaluation/', () => {
  const doc = loadPage('work/llm-evaluation/index.html');

  it('explains IQ/OQ in plain words and lists what each behavioral test catches', () => {
    const body = text(doc.querySelector('.prose'));
    expect(body).toContain('installation qualification');
    expect(body).toContain('operational qualification');
    expect(doc.querySelectorAll('#oq-tests tbody tr').length).toBeGreaterThanOrEqual(6);
  });

  it('keeps a long title within the 70-character title-tag limit and still names the author', () => {
    expect(doc.title.length).toBeLessThanOrEqual(70);
    expect(doc.title).toBe('Testing LLMs and Databricks for regulated use: Harish Manoharan');
    expect(text(doc.querySelector('h1'))).toBe('Testing LLMs and Databricks platforms for regulated use');
  });

  it('credits the colleague who built the first scaffold', () => {
    expect(text(doc.querySelector('.side'))).toContain('scaffold');
  });
});
