import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { parseHTML } from 'linkedom';
import { describe, expect, it } from 'vitest';
import DataTable from '../../src/components/DataTable.astro';
import FeaturedCard from '../../src/components/FeaturedCard.astro';
import Note from '../../src/components/Note.astro';
import ResultsTable from '../../src/components/ResultsTable.astro';
import Steps from '../../src/components/Steps.astro';
import { featured } from '../../src/data/work';

async function render(component: unknown, props: Record<string, unknown>) {
  const container = await AstroContainer.create();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const html = await container.renderToString(component as any, { props });
  return { html, doc: parseHTML(`<body>${html}</body>`).document };
}

describe('FeaturedCard', () => {
  it('links the title once, title first in the DOM, when the write-up is published', async () => {
    const { doc } = await render(FeaturedCard, { item: featured[0], href: '/work/agent-retrieval/' });
    expect([...doc.querySelectorAll('a')].map((a) => a.getAttribute('href'))).toEqual(['/work/agent-retrieval/']);
    expect(doc.querySelector('h3 a')?.getAttribute('href')).toBe('/work/agent-retrieval/');
    expect(doc.querySelector('li.card')?.firstElementChild?.tagName).toBe('H3');
    expect(doc.querySelector('.card-link')).toBeNull();
    expect(doc.querySelector('.card-context')?.textContent?.replace(/\s+/g, ' ').trim()).toBe('Purgo AI, · 2025–26');
  });

  it('shows a plain-text title and no link without an href (the write-up is a draft)', async () => {
    const { doc } = await render(FeaturedCard, { item: featured[2] });
    expect(doc.querySelector('h3')?.textContent).toBe('a11y-stem');
    expect(doc.querySelector('a')).toBeNull();
  });
});

describe('DataTable', () => {
  it('has a caption, column and row headers, and right-aligned numeric cells', async () => {
    const { doc } = await render(DataTable, {
      id: 'ablation',
      caption: 'Ablation',
      integer: true,
      columns: [{ label: 'Variant' }, { label: 'Missed', numeric: true }],
      rows: [{ header: 'Baseline', sub: 'separate run', cells: ['71'] }],
    });
    const wrap = doc.querySelector('section.table-wrap');
    expect(wrap?.getAttribute('aria-labelledby')).toBe('ablation-caption');
    expect(wrap?.getAttribute('tabindex')).toBe('0');
    expect(doc.querySelector('caption')?.id).toBe('ablation-caption');
    expect([...doc.querySelectorAll('thead th')].map((th) => th.getAttribute('scope'))).toEqual(['col', 'col']);
    expect(doc.querySelector('tbody th')?.getAttribute('scope')).toBe('row');
    expect(doc.querySelector('tbody th .sub')?.textContent).toBe('separate run');
    expect(doc.querySelector('tbody td')?.className).toContain('num');
    expect(doc.querySelector('tbody td')?.className).toContain('int');
  });
});

describe('ResultsTable', () => {
  it('builds metric, before, after rows from result ids', async () => {
    const { doc } = await render(ResultsTable, { id: 'results', caption: 'Results', ids: ['missed-tables', 'stage-cost'] });
    const rows = [...doc.querySelectorAll('tbody tr')].map((tr) =>
      [...tr.children].map((c) => c.textContent?.replace(/\s+/g, ' ').trim()),
    );
    expect(rows[0]).toEqual(['Missed source tables, 103-ticket benchmark', '79', '24']);
    expect(rows[1]?.[2]).toBe('0.132 (7.6× lower)');
  });

  it('shows the recall row with its own sample and without the latency pair', async () => {
    const { doc } = await render(ResultsTable, { id: 'results', caption: 'Results', ids: ['catalog-recall', 'catalog-latency'] });
    const first = doc.querySelector('tbody tr');
    expect(first?.querySelector('.sub')?.textContent).toBe('188 real queries, expected tables from real tickets');
    expect(first?.textContent).not.toContain('4.0 s');
  });
});

describe('Note and Steps', () => {
  it('Note is a labelled note', async () => {
    const { doc } = await render(Note, { text: 'Fired on 58 tickets.' });
    const note = doc.querySelector('.note');
    expect(note?.getAttribute('role')).toBe('note');
    expect(note?.textContent?.replace(/\s+/g, ' ').trim()).toBe('Note. Fired on 58 tickets.');
  });

  it('Steps is an ordered list that marks my part in text', async () => {
    const { doc } = await render(Steps, {
      caption: 'Where my changes sit',
      steps: [{ label: 'Read the ticket' }, { label: 'Follow dbt lineage', mine: true }],
    });
    const items = [...doc.querySelectorAll('figure ol li')].map((li) => li.textContent?.replace(/\s+/g, ' ').trim());
    expect(items).toEqual(['Read the ticket', 'Follow dbt lineage (my part)']);
    expect(doc.querySelector('figcaption')?.textContent).toBe('Where my changes sit');
  });
});
