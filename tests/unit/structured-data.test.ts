import { describe, expect, it } from 'vitest';
import { profiles, site } from '../../src/data/site';
import { PERSON_ID, aboutJsonLd, articleJsonLd, homeJsonLd, person } from '../../src/lib/structured-data';

describe('site identity data', () => {
  it('lists exactly the confirmed profiles the site links, in a fixed order', () => {
    expect([...profiles]).toEqual([
      'https://github.com/harishm17',
      'https://www.linkedin.com/in/harishm17/',
      'https://codeforces.com/profile/harishm',
      'https://lichess.org/@/harishm17',
    ]);
  });

  it('keeps the handle in one place', () => {
    expect(site.handle).toBe('harishm17');
    for (const url of [site.github, site.linkedin, site.lichess]) expect(url).toContain(site.handle);
  });

  it('derives the footer month from the last-edit date', () => {
    expect(site.updated.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(site.updated.iso).toBe(site.updated.date.slice(0, 7));
    expect(site.updated.label).toMatch(/^[A-Z][a-z]+ \d{4}$/);
    expect(new Date(site.updated.date).getTime()).toBeLessThanOrEqual(Date.now());
  });

  it('keeps the description short enough for a search snippet and names him', () => {
    expect(site.description.length).toBeLessThanOrEqual(160);
    expect(site.description.startsWith(site.name)).toBe(true);
  });
});

describe('Person', () => {
  const p = person();

  it('carries the name, the handle as alternateName and a stable @id', () => {
    expect(p).toMatchObject({ '@type': 'Person', '@id': PERSON_ID, name: 'Harish Manoharan', alternateName: 'harishm17', url: `${site.url}/` });
    expect(PERSON_ID).toBe('https://harishmanoharan.com/#person');
  });

  it('lists only the confirmed profiles in sameAs, all over https', () => {
    expect(p.sameAs).toEqual([...profiles]);
    for (const url of p.sameAs as string[]) expect(url).toMatch(/^https:\/\//);
    expect(JSON.stringify(p)).not.toMatch(/chess\.com|huggingface\.co|kaggle\.com|leetcode\.com|x\.com|instagram|youtube/);
  });

  it('adds page-only properties without dropping the shared ones', () => {
    const withPhoto = person({ image: 'https://example.com/a.jpg' });
    expect(withPhoto.image).toBe('https://example.com/a.jpg');
    expect({ ...withPhoto, image: undefined }).toEqual({ ...p, image: undefined });
  });
});

describe('page markup', () => {
  it('home: WebSite and Person in one graph, tied by @id', () => {
    const ld = homeJsonLd();
    const graph = ld['@graph'] as Record<string, unknown>[];
    expect(graph.map((n) => n['@type'])).toEqual(['WebSite', 'Person']);
    expect(graph[0].publisher).toEqual({ '@id': PERSON_ID });
    expect(graph[0].name).toBe(site.name);
    expect(graph[1]).not.toHaveProperty('image');
  });

  it('about: a ProfilePage whose Person has the stable photo URL', () => {
    const ld = aboutJsonLd();
    expect(ld['@type']).toBe('ProfilePage');
    expect(ld.url).toBe('https://harishmanoharan.com/about/');
    expect((ld.mainEntity as Record<string, unknown>).image).toBe('https://harishmanoharan.com/harish-manoharan.jpg');
  });

  it('write-up: an Article credited to the Person', () => {
    const ld = articleJsonLd({
      headline: 'H',
      description: 'D',
      url: 'https://harishmanoharan.com/work/x/',
      image: 'https://harishmanoharan.com/og/x.png',
      dateModified: '2026-10-08',
    });
    expect(ld).toEqual({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'H',
      description: 'D',
      image: ['https://harishmanoharan.com/og/x.png'],
      datePublished: '2026-10-08T12:00:00Z',
      dateModified: '2026-10-08T12:00:00Z',
      mainEntityOfPage: 'https://harishmanoharan.com/work/x/',
      author: { '@type': 'Person', '@id': PERSON_ID, name: 'Harish Manoharan', url: 'https://harishmanoharan.com/' },
    });
  });
});
