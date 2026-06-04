import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Kolekcja Blog (wpisy, lekcje, artykuły)
const blogCollection = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    description: z.string(),
    author: z.string().default('Bonum Depositum'),
    cycle: reference('cycles').optional(),
    lang: z.enum(['pl', 'en', 'es']).default('pl'),
    audioUrl: z.string().optional(),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
    lessonNumber: z.number().optional(),
    videoId: z.string().optional(),
    videoDuration: z.string().optional(),
    summary: z.string().optional(),
    // Tłumaczenia
    'title:en': z.string().optional(),
    'title:es': z.string().optional(),
    'description:en': z.string().optional(),
    'description:es': z.string().optional(),
    'summary:en': z.string().optional(),
    'summary:es': z.string().optional(),
  }),
});

// Kolekcja Cykle
const cyclesCollection = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/cycles' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    coverImage: z.string().optional(),
    order: z.number().default(0),
    lang: z.enum(['pl', 'en', 'es']).default('pl'),
    totalLessons: z.number().optional(),
    // Tłumaczenia
    'title:en': z.string().optional(),
    'title:es': z.string().optional(),
    'description:en': z.string().optional(),
    'description:es': z.string().optional(),
  }),
});

// Kolekcja Czytelnia (dokumenty, flipbooki, archiwalia)
const readingCollection = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/reading' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string().optional(),
    pubDate: z.date().optional(),
    category: z.enum(['architecture', 'history', 'spirituality', 'art', 'literature']).optional(),
    source: z.string().optional(),
    sourceLabel: z.string().optional(),
    coverImage: z.string().optional(),
    lang: z.enum(['pl', 'en', 'es']).default('pl'),
    tags: z.array(z.string()).default([]),
    // Tłumaczenia
    'title:en': z.string().optional(),
    'title:es': z.string().optional(),
    'description:en': z.string().optional(),
    'description:es': z.string().optional(),
  }),
});

export const collections = {
  blog: blogCollection,
  cycles: cyclesCollection,
  reading: readingCollection,
};
