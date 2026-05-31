import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import remarkToc from 'remark-toc';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://bonumdepositum.eu',
  integrations: [sitemap(), mdx()],  // ✅ Poprawione: dodany nawias [ i przecinek
  i18n: {
    defaultLocale: 'pl',
    locales: ['pl', 'en', 'es'],
    routing: {
      prefixDefaultLocale: false // Polski bez przedrostka, inne z przedrostkiem
    }
  },
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    remarkPlugins: [
      [remarkToc, { heading: 'spis-tresci' }] // Generuje TOC pod nagłówkiem h2 "spis-tresci"
    ],
  },
});
