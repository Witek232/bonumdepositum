import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
// 👇 Nowe importy dla konfiguracji Markdown
import { unified } from '@astrojs/markdown-remark';
import remarkToc from 'remark-toc';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://bonumdepositum.eu',
  integrations: [tailwind(), sitemap(), mdx()],
  i18n: {
    defaultLocale: 'pl',
    locales: ['pl', 'en', 'es'],
    routing: {
      prefixDefaultLocale: false // Polski bez przedrostka, inne z przedrostkiem
    }
  },
  // 👇 Dodana sekcja markdown z pluginem TOC
  markdown: {
    remarkPlugins: [
      [remarkToc, { heading: 'spis-tresci' }] // Generuje TOC pod nagłówkiem h2 "spis-tresci"
    ],
  },
});
