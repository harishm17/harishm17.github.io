import { existsSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { GROUPS, byGroup, homeItems, work } from '../../src/data/work';

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

  it('home shows four rows in a fixed order', () => {
    expect(homeItems().map((w) => w.id)).toEqual(['agent-retrieval', 'llm-evaluation', 'digitus-sql', 'thesis']);
  });

  it('home rows never repeat a results-band number', () => {
    for (const w of homeItems()) {
      const copy = `${w.summary} ${w.result ?? ''}`;
      for (const n of ['79', '8.6', '0.54', '0.68']) expect(copy).not.toContain(n);
    }
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
    const all = JSON.stringify(work);
    for (const bad of NEVER) expect(all).not.toContain(bad);
  });
});
