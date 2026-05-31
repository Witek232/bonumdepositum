import { defineConfig } from 'astro/config';
import alpinejs from '@astrojs/alpinejs';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import remarkToc from 'remark-toc';
import tailwindcss from '@tailwindcss/vite';
import { satteri } from '@astrojs/markdown-satteri';

export default defineConfig({
  site: 'https://bonumdepositum.eu',
  integrations: [sitemap(), mdx(), alpinejs()],
  i18n: {
    defaultLocale: 'pl',
    locales: ['pl', 'en', 'es'],
    routing: {
      prefixDefaultLocale: false
    }
  },
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    remarkPlugins: [
      [remarkToc, { heading: 'spis-tresci' }]
    ],
  },
});
