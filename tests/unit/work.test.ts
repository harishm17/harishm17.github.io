import { existsSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { GROUPS, byGroup, featured, homeItems, work } from '../../src/data/work';

const SLUGS = ['agent-retrieval', 'llm-evaluation', 'a11y-stem'];
// Never-public terms are checked against the private list in private-terms.test.ts.
const NEVER = ['—', '→'];

describe('work data', () => {
  it('has unique ids and known groups', () => {
    expect(new Set(work.map((w) => w.id)).size).toBe(work.length);
    const groups = new Set(GROUPS.map((g) => g.id));
    for (const w of work) expect(groups.has(w.group)).toBe(true);
  });

  it('every group has at least one row', () => {
    for (const g of GROUPS) expect(byGroup(g.id).length).toBeGreaterThan(0);
  });

  it('pages point at known write-ups', () => {
    for (const w of work) if (w.page) expect(SLUGS).toContain(w.page);
  });

  it('More work on the home page shows two rows in a fixed order', () => {
    expect(homeItems().map((w) => w.id)).toEqual(['digitus-sql', 'thesis']);
  });

  it('the home page features three areas in a fixed order', () => {
    expect(featured.map((f) => f.id)).toEqual(['agent-retrieval', 'llm-evaluation', 'a11y-stem']);
    expect(new Set(featured.map((f) => f.id)).size).toBe(featured.length);
  });

  it('featured pages are known write-ups and every card has a context, title, summary and link label', () => {
    for (const f of featured) {
      if (f.page) expect(SLUGS).toContain(f.page);
      for (const field of [f.context, f.years, f.title, f.summary, f.linkLabel]) expect(field.trim()).not.toBe('');
    }
  });

  it('featured copy keeps the benchmark numbers in the write-ups', () => {
    const copy = JSON.stringify(featured);
    for (const n of ['79', '8.6', '5.3', '0.54', '0.68', '7.6', 'recall@10']) expect(copy).not.toContain(n);
  });

  it('links are https or point at a file that exists in public/', () => {
    for (const w of work) {
      for (const link of w.links ?? []) {
        if (link.href.startsWith('/')) expect(existsSync(`public${link.href}`), link.href).toBe(true);
        else expect(link.href).toMatch(/^https:\/\//);
      }
    }
  });

  it('only the rows spec section 9 allows on /work/ carry a result line', () => {
    expect(work.filter((w) => w.result !== undefined).map((w) => w.id)).toEqual(['digitus-sql', 'pwc']);
  });

  it('keeps the write-up-only figures out of the work rows', () => {
    const all = JSON.stringify(work);
    for (const figure of ['7.6', '0.931', '0.944', '0.54', '0.68', '0.18']) expect(all).not.toContain(figure);
  });

  it('uses no em dashes or arrows', () => {
    const all = JSON.stringify([work, featured]);
    for (const bad of NEVER) expect(all).not.toContain(bad);
  });
});
