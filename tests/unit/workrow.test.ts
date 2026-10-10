import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { parseHTML } from 'linkedom';
import { describe, expect, it } from 'vitest';
import WorkRow from '../../src/components/WorkRow.astro';
import { work } from '../../src/data/work';

async function render(props: Record<string, unknown>) {
  const container = await AstroContainer.create();
  const html = await container.renderToString(WorkRow, { props });
  return parseHTML(`<body><ul>${html}</ul></body>`).document;
}

describe('WorkRow', () => {
  it('puts the title first in the DOM and links it only when given an href', async () => {
    const item = work.find((w) => w.id === 'agent-retrieval')!;
    const linked = await render({ item, href: '/work/agent-retrieval/' });
    const li = linked.querySelector('li.row')!;
    expect(li.firstElementChild?.tagName).toBe('H3');
    expect(linked.querySelector('h3 a')?.getAttribute('href')).toBe('/work/agent-retrieval/');
    const plain = await render({ item });
    expect(plain.querySelector('h3 a')).toBeNull();
    expect(plain.querySelector('h3')?.textContent?.replace(/\s+/g, ' ').trim()).toBe(item.title);
  });

  it('joins the last two words of the title, so it never ends on a line of one word', async () => {
    // The .hit tap area turns off text-wrap: pretty in the title, so the no-break space does the job instead.
    const item = work.find((w) => w.id === 'iqoq')!;
    for (const doc of [await render({ item, href: '/work/llm-evaluation/#platform' }), await render({ item })]) {
      expect(doc.querySelector('h3')?.textContent?.trim()).toBe('Validation engine for Databricks platforms');
    }
    const covid = await render({ item: work.find((w) => w.id === 'covid')! });
    const title = covid.querySelector('h3')!;
    expect(title.textContent).toContain('in COVID-19');
    expect([...title.querySelectorAll('.nowrap')].map((s) => s.textContent)).toEqual(['co-expression', 'COVID-19']);
  });

  it('shows context and years, the result line only when present, and external links', async () => {
    const thesis = work.find((w) => w.id === 'thesis')!;
    const doc = await render({ item: thesis });
    expect(doc.querySelector('.row-context')?.textContent?.replace(/\s+/g, ' ').trim()).toBe(`${thesis.context}, · ${thesis.years}`);
    expect(doc.querySelector('.row-result')).toBeNull();
    expect(doc.querySelector('.row-links a')?.getAttribute('href')).toBe('/Harish___DDP_Report.pdf');
    const sql = await render({ item: work.find((w) => w.id === 'digitus-sql')! });
    expect(sql.querySelector('.row-result')?.textContent).toContain('52% to 76%');
  });

  it('can show the years alone when the group heading already names the context', async () => {
    const item = work.find((w) => w.id === 'agent-retrieval')!;
    const doc = await render({ item, hideContext: true });
    expect(doc.querySelector('.row-context')?.textContent?.replace(/\s+/g, ' ').trim()).toBe(item.years);
    expect(doc.querySelector('.row-context [aria-hidden]')).toBeNull();
  });

  it('reads as "context, years" once the aria-hidden dot is removed', async () => {
    // Assistive tech skips aria-hidden content, so a visually hidden comma carries the pause.
    const item = work.find((w) => w.id === 'thesis')!;
    const doc = await render({ item });
    const context = doc.querySelector('.row-context')!.cloneNode(true) as Element;
    for (const hidden of context.querySelectorAll('[aria-hidden]')) hidden.remove();
    expect(context.textContent?.replace(/\s+/g, ' ').trim()).toBe(`${item.context}, ${item.years}`);
  });

  it('keeps the dot with the years and "IIT Madras" whole, so neither starts or ends a line', async () => {
    const item = work.find((w) => w.id === 'microbiome')!;
    const doc = await render({ item });
    const nowrap = doc.querySelector('.row-context > .nowrap');
    expect(nowrap?.querySelector('[aria-hidden="true"]')?.textContent).toBe('·');
    expect(nowrap?.textContent?.replace(/\s+/g, ' ').trim()).toBe(`, · ${item.years}`);
    expect(doc.querySelector('.row-context')?.textContent).toContain('IIT\u00a0Madras');
  });
});
