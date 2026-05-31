import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Kolekcja Blog
const blogCollection = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    description: z.string(),
    author: z.string().default('Bonum Depositum'),
    cycle: reference('cycles').optional(), // Referencja do cyklu
    lang: z.enum(['pl', 'en', 'es']).default('pl'),
    audioUrl: z.string().optional(), // URL do audio lektora
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
    // Pola specyficzne dla języków
    'title:en': z.string().optional(),
    'title:es': z.string().optional(),
    'description:en': z.string().optional(),
    'description:es': z.string().optional(),
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
    // Pola dla tłumaczeń
    'title:en': z.string().optional(),
    'title:es': z.string().optional(),
    'description:en': z.string().optional(),
    'description:es': z.string().optional(),
  }),
});

// Kolekcja Czytelnia
const readingCollection = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/reading' }),
  schema: z.object({
    title: z.string(),
    author: z.string().optional(),
    category: z.enum(['architecture', 'history', 'spirituality', 'art', 'literature']),
    source: z.string().optional(), // URL do źródła (Polona, Archive.org)
    description: z.string(),
    coverImage: z.string().optional(),
    lang: z.enum(['pl', 'en', 'es']).default('pl'),
    // Pola dla tłumaczeń
    'title:en': z.string().optional(),
    'title:es': z.string().optional(),
    'description:en': z.string().optional(),
    'description:es': z.string().optional(),
  }),
});

// Eksport kolekcji
export const collections = {
  'blog': blogCollection,
  'cycles': cyclesCollection,
  'reading': readingCollection,
};
