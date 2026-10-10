import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const work = defineCollection({
  loader: glob({ base: './src/content/work', pattern: '*.mdx' }),
  schema: z.object({
    title: z.string().max(80),
    /** Used in the <title> tag when "title: site name" would pass 70 characters. */
    shortTitle: z.string().optional(),
    dek: z.string(),
    description: z.string().max(160),
    context: z.string(),
    years: z.string(),
    updated: z.coerce.date(),
    readMinutes: z.number().int().positive(),
    builtWith: z.array(z.string()).min(1),
    myPart: z.string(),
    order: z.number().int(),
    draft: z.boolean().default(false),
    ogImage: z.string().startsWith('/og/'),
    numbers: z.array(z.string()).default([]),
  }),
});

export const collections = { work };
