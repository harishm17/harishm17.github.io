import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { parseHTML } from 'linkedom';
import { describe, expect, it } from 'vitest';
import Bars from '../../src/components/Bars.astro';
import DataTable from '../../src/components/DataTable.astro';
import Figure from '../../src/components/Figure.astro';
import Note from '../../src/components/Note.astro';
import ResultsBand from '../../src/components/ResultsBand.astro';
import ResultsTable from '../../src/components/ResultsTable.astro';
import Steps from '../../src/components/Steps.astro';
import { bandResults, getResult } from '../../src/data/results';

async function render(component: unknown, props: Record<string, unknown>) {
  const container = await AstroContainer.create();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const html = await container.renderToString(component as any, { props });
  return { html, doc: parseHTML(`<body>${html}</body>`).document };
}

describe('Figure', () => {
  it('gives screen readers one string and hides the visual pair', async () => {
    const r = getResult('missed-tables');
    const { doc, html } = await render(Figure, { before: r.before, after: r.after });
    expect(doc.querySelector('.figure .vh')?.textContent).toBe('cut from 79 to 24');
    const visual = doc.querySelector('.figure [aria-hidden="true"]');
    expect(visual?.textContent?.replace(/\s+/g, '')).toBe('7924');
    expect(visual?.querySelector('svg')).not.toBeNull();
    expect(html).not.toContain('→');
  });

  it('uses display and spoken text for ratio results', async () => {
    const r = getResult('stage-cost');
    const { doc } = await render(Figure, { before: r.before, after: r.after, display: r.display, spoken: r.spoken });
    expect(doc.querySelector('.vh')?.textContent).toBe('7.6 times lower');
    expect(doc.querySelector('[aria-hidden="true"]')?.textContent?.trim()).toBe('7.6× lower');
  });
});

describe('Bars', () => {
  it('draws zero-based widths and is hidden from assistive tech', async () => {
    const { doc } = await render(Bars, { before: 79, after: 24, max: 80, scaleLabel: '80' });
    const bars = doc.querySelector('.bars');
    expect(bars?.getAttribute('aria-hidden')).toBe('true');
    expect(doc.querySelector('.bar-before')?.getAttribute('style')).toBe('width: max(2px, 98.8%)');
    expect(doc.querySelector('.bar-after')?.getAttribute('style')).toBe('width: max(2px, 30%)');
    expect([...doc.querySelectorAll('.scale span')].map((s) => s.textContent)).toEqual(['0', '80']);
  });
});

describe('ResultsBand', () => {
  it('renders a hidden heading and one cell per result, label first in the DOM', async () => {
    const { doc } = await render(ResultsBand, { results: bandResults() });
    expect(doc.querySelector('h2.vh')?.textContent).toBe('Results');
    const cells = [...doc.querySelectorAll('li.cell')];
    expect(cells.length).toBe(3);
    for (const cell of cells) {
      const order = [...cell.children].map((c) => [...c.classList][0]);
      expect(order).toEqual(['label', 'figure', 'bars', 'sample']);
    }
    expect(cells.map((c) => c.querySelector('.vh')?.textContent)).toEqual([
      'cut from 79 to 24',
      'cut from 8.6% to 5.3%',
      'up from 0.54 to 0.68',
    ]);
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
    expect(rows[0]).toEqual(['Missed source tables 103-ticket benchmark', '79', '24']);
    expect(rows[1]?.[2]).toBe('0.13 (7.6× lower)');
  });

  it('uses the write-up sample for the recall row, not the band caveat that repeats the latency pair', async () => {
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
