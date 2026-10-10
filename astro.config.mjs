// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

const SITE = 'https://harishmanoharan.com';

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

export default defineConfig({
  site: SITE,
  output: 'static',
  redirects: REDIRECTS,
  integrations: [
    mdx(),
    sitemap({ filter: (page) => !redirectPages.has(page) && !page.includes('/404') }),
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
