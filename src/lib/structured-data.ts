/**
 * JSON-LD for search engines. Every page that carries markup describes the same Person (one @id), so the home
 * page, the About page and the write-ups all point at one entity: the name, the handle and the linked profiles.
 * Each page emits one ld+json script; the copy lint in tests/dist/pages.test.ts reads it like visible text.
 */
import { profiles, site } from '../data/site';

export type JsonLd = Record<string, unknown>;

const HOME = `${site.url}/`;
export const PERSON_ID = `${site.url}/#person`;
export const WEBSITE_ID = `${site.url}/#website`;
const PHOTO = `${site.url}${site.photo}`;

/** Google wants a full ISO 8601 date-time with a time zone; dates here are YYYY-MM-DD (noon UTC keeps the day). */
export function isoDateTime(date: string): string {
  return `${date}T12:00:00Z`;
}

/** The full Person. `extra` adds properties shown only on some pages (the photo on /about/, the only page that shows it). */
export function person(extra: JsonLd = {}): JsonLd {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: site.name,
    alternateName: site.handle,
    url: HOME,
    description: site.lede,
    email: `mailto:${site.email}`,
    jobTitle: 'Software Engineer',
    worksFor: { '@type': 'Organization', name: 'Purgo AI', url: 'https://www.purgo.ai/' },
    alumniOf: [
      {
        '@type': 'CollegeOrUniversity',
        name: 'The University of Texas at Dallas',
        url: 'https://www.utdallas.edu/',
        sameAs: 'https://en.wikipedia.org/wiki/University_of_Texas_at_Dallas',
      },
      {
        '@type': 'CollegeOrUniversity',
        name: 'Indian Institute of Technology Madras',
        url: 'https://www.iitm.ac.in/',
        sameAs: 'https://en.wikipedia.org/wiki/IIT_Madras',
      },
    ],
    homeLocation: { '@type': 'Place', name: site.location },
    knowsAbout: ['AI engineering', 'AI agents', 'Large language models (LLMs)', 'Generative AI', 'LLM evaluation', 'Retrieval-augmented generation (RAG)'],
    sameAs: [...profiles],
    ...extra,
  };
}

/** Home page: the WebSite (Google reads the site name from it, on the home page only) and the Person. */
export function homeJsonLd(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        url: HOME,
        name: site.name,
        alternateName: ['harishmanoharan.com'],
        inLanguage: 'en',
        publisher: { '@id': PERSON_ID },
      },
      person(),
    ],
  };
}

/** /about/: a ProfilePage about the Person, with the photo the page shows. */
export function aboutJsonLd(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    url: `${site.url}/about/`,
    dateModified: isoDateTime(site.updated.date),
    mainEntity: person({ image: PHOTO }),
  };
}

export interface ArticleInput {
  /** The visible h1. */
  headline: string;
  description: string;
  /** Absolute URL of the page. */
  url: string;
  /** Absolute URL of the share image. */
  image: string;
  /** YYYY-MM-DD, as shown next to "Updated". */
  dateModified: string;
  /** YYYY-MM-DD the write-up was first published; defaults to dateModified. */
  datePublished?: string;
}

/** A write-up, credited to the Person (same @id and url as the full node on home and /about/). */
export function articleJsonLd(a: ArticleInput): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: a.headline,
    description: a.description,
    image: [a.image],
    datePublished: isoDateTime(a.datePublished ?? a.dateModified),
    dateModified: isoDateTime(a.dateModified),
    mainEntityOfPage: a.url,
    author: { '@type': 'Person', '@id': PERSON_ID, name: site.name, url: HOME },
  };
}
