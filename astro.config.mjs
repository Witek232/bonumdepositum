import { defineConfig } from 'astro/config';
import alpinejs from '@astrojs/alpinejs';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import { satteri } from '@astrojs/markdown-satteri';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://bonumdepositum.eu',
  output: 'static',

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    sitemap(),
    mdx(),
    alpinejs(),
  ],

  i18n: {
    defaultLocale: 'pl',
    locales: ['pl', 'en', 'es'],
    routing: {
      prefixDefaultLocale: false,
    },
  },

  markdown: {
    processor: satteri(),
  },
});
