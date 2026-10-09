import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { parseHTML } from 'linkedom';
import { describe, expect, it } from 'vitest';
import SiteHeader from '../../src/components/SiteHeader.astro';

async function render(props: Record<string, unknown>) {
  const container = await AstroContainer.create();
  const html = await container.renderToString(SiteHeader, { props });
  return parseHTML(`<body>${html}</body>`).document;
}

describe('SiteHeader', () => {
  it('links the name home and lists Work, About, Resume in that order', async () => {
    const doc = await render({});
    expect(doc.querySelector('a.name')?.getAttribute('href')).toBe('/');
    const links = [...doc.querySelectorAll('nav a')].map((a) => [a.textContent?.trim(), a.getAttribute('href')]);
    expect(links).toEqual([
      ['Work', '/work/'],
      ['About', '/about/'],
      ['Resume', '/HarishManoharan.pdf'],
    ]);
  });

  it('marks the current page with aria-current="page"', async () => {
    const doc = await render({ current: 'about' });
    expect(doc.querySelector('nav a[href="/about/"]')?.getAttribute('aria-current')).toBe('page');
    expect(doc.querySelector('nav a[href="/work/"]')?.hasAttribute('aria-current')).toBe(false);
  });

  it('marks Work with aria-current="true" inside a write-up', async () => {
    const doc = await render({ current: 'work', inWriteup: true });
    expect(doc.querySelector('nav a[href="/work/"]')?.getAttribute('aria-current')).toBe('true');
  });
});
