import { defineCollection, z } from 'astro:content';
import { globLoader } from 'astro/loaders';

const blog = defineCollection({
  loader: globLoader({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    lang: z.enum(['pl', 'es', 'en']).default('pl'),
    image: z.string().optional(),
    audioUrl: z.string().optional(),
  }),
});

const cycles = defineCollection({
  loader: globLoader({ pattern: "**/*.md", base: "./src/content/cycles" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    lang: z.enum(['pl', 'es', 'en']).default('pl'),
    coverImage: z.string(),
    youtubeId: z.string().optional(),
    order: z.number(),
  }),
});

const library = defineCollection({
  loader: globLoader({ pattern: "**/*.md", base: "./src/content/library" }),
  schema: z.object({
    title: z.string(),
    author: z.string(),
    lang: z.enum(['pl', 'es', 'en']).default('pl'),
    category: z.enum(['kosciol', 'filozofia', 'historia']),
    embedUrl: z.string().optional(),
  }),
});

export const collections = { blog, cycles, library };
