import { getCollection, type CollectionEntry } from 'astro:content';
import { isPublished } from './published';

export async function getPublished(): Promise<CollectionEntry<'work'>[]> {
  const entries = await getCollection('work', ({ data }) => isPublished(data.draft));
  return entries.sort((a, b) => a.data.order - b.data.order);
}

export async function publishedSlugs(): Promise<Set<string>> {
  return new Set((await getPublished()).map((e) => e.id));
}
