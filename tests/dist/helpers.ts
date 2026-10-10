import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parseHTML } from 'linkedom';

export const DIST = join(process.cwd(), 'dist');

export function distFile(path: string): string {
  const p = join(DIST, path);
  if (!existsSync(p)) throw new Error(`Missing ${p}. Run "npm run build" first.`);
  return p;
}

export function readDist(path: string): string {
  return readFileSync(distFile(path), 'utf8');
}

export function loadPage(path: string): Document {
  return parseHTML(readDist(path)).document as unknown as Document;
}

export function text(el: Element | null | undefined): string {
  return (el?.textContent ?? '').replace(/\s+/g, ' ').trim();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type LdNode = Record<string, any>;

/** Every ld+json script on the page, parsed. */
export function jsonLd(doc: Document): LdNode[] {
  return [...doc.querySelectorAll('script[type="application/ld+json"]')].map((s) => JSON.parse(s.textContent ?? ''));
}

/** URL path of a content page's dist file: "about/index.html" is "/about/", "404.html" is "/404.html". */
export function urlPath(file: string): string {
  return `/${file.replace(/index\.html$/, '')}`;
}

/** Content pages = sitemap URLs (redirect stubs are excluded there) plus the 404 page, as dist file paths. */
export function contentPagePaths(): string[] {
  const xml = readDist('sitemap-0.xml');
  const paths = [...xml.matchAll(/<loc>https?:\/\/[^/<]+(\/[^<]*)<\/loc>/g)].map((m) => m[1]);
  return [...paths.map((p) => `${p.replace(/^\//, '')}index.html`), '404.html'];
}
