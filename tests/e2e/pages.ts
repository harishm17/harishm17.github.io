import { readFileSync } from 'node:fs';

/** URL paths of every content page (from the built sitemap) plus the 404 page. */
export function contentPages(): string[] {
  const xml = readFileSync('dist/sitemap-0.xml', 'utf8');
  const paths = [...xml.matchAll(/<loc>https:\/\/harishm17\.github\.io(\/[^<]*)<\/loc>/g)].map((m) => m[1]);
  return [...paths, '/404.html'];
}

export const AXE_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'];
export const WIDTHS = [320, 360, 375, 390, 412, 640, 720, 899, 900, 1024, 1100, 1148, 1280, 1440];
export const TEXT_SPACING =
  '*{line-height:1.5!important;letter-spacing:.12em!important;word-spacing:.16em!important}p{margin-bottom:2em!important}';
