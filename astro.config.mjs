// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { readFileSync, readdirSync } from 'node:fs';
import { parse as parseYaml } from 'yaml';
import { site } from './src/data/site.ts';

const SITE = site.url;

/** Old SPA routes that people may still have links to (spec §3). */
export const REDIRECTS = {
  '/experience': '/work/',
  '/projects': '/work/',
  '/research': '/work/#research',
  '/skills': '/about/',
  '/certifications': '/about/',
  '/leadership': '/about/#outside',
  '/hobbies': '/about/#outside',
  '/contact': '/about/#contact',
};

const redirectPages = new Set(Object.keys(REDIRECTS).map((from) => `${SITE}${from}/`));

/**
 * Sitemap lastmod: a write-up's frontmatter `updated` date, and site.updated.date for every other page. Never
 * the build time: Google ignores lastmod values that change when the content hasn't.
 */
const WORK_DIR = './src/content/work';
const writeupUpdated = new Map(
  readdirSync(WORK_DIR)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const front = readFileSync(`${WORK_DIR}/${file}`, 'utf8').match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '';
      const updated = new Date(parseYaml(front).updated).toISOString().slice(0, 10);
      return [`${SITE}/work/${file.replace(/\.mdx$/, '')}/`, updated];
    }),
);

export default defineConfig({
  site: SITE,
  output: 'static',
  redirects: REDIRECTS,
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !redirectPages.has(page) && !page.includes('/404'),
      serialize: (item) => ({ ...item, lastmod: writeupUpdated.get(item.url) ?? site.updated.date }),
      namespaces: { news: false, xhtml: false, image: false, video: false },
    }),
  ],
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Schibsted Grotesk',
      cssVariable: '--font-sans',
      weights: ['400 900'],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
  ],
});
