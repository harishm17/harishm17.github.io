/**
 * The date of the last real change to the home, About or Work page (copy, links or structured data). The
 * footer's "Updated" month, the sitemap's lastmod for those pages and the About page's dateModified come from
 * it, so bump it only for real edits: search engines stop trusting a lastmod that moves on every build.
 */
const updated = '2026-10-10';

export const site = {
  name: 'Harish Manoharan',
  /** His handle on GitHub, LinkedIn and Lichess. */
  handle: 'harishm17',
  url: 'https://harishmanoharan.com',
  email: 'harish_manoharan@outlook.com',
  github: 'https://github.com/harishm17',
  linkedin: 'https://www.linkedin.com/in/harishm17/',
  lichess: 'https://lichess.org/@/harishm17',
  codeforces: 'https://codeforces.com/profile/harishm',
  resume: '/HarishManoharan.pdf',
  /** A square copy of the About photo at a URL that never changes (`npm run photo`), for structured data. */
  photo: '/harish-manoharan.jpg',
  location: 'San Francisco Bay Area',
  title: 'Harish Manoharan: software engineer at Purgo AI',
  /** The home page's one-line role, also the Person description in structured data. */
  lede: 'Software engineer at Purgo AI, working on its data-engineering agent and the evals behind it.',
  description:
    'Harish Manoharan is a software engineer at Purgo AI in the San Francisco Bay Area, working on its data-engineering agent and evals. UT Dallas; IIT Madras.',
  updated: {
    date: updated,
    iso: updated.slice(0, 7),
    label: new Date(updated).toLocaleDateString('en-US', { year: 'numeric', month: 'long', timeZone: 'UTC' }),
  },
  og: { home: '/og/home-2026-10.png' },
} as const;

/**
 * Profiles that are his and that the site links to. They go in the Person's sameAs and get rel="me", which
 * tells search engines these accounts and this site belong to one person. Add one only when the account is
 * his, shows his name or links back here, and the site links it.
 */
export const profiles = [site.github, site.linkedin, site.codeforces, site.lichess] as const;
