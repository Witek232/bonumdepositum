import { defineConfig, fontProviders } from 'astro/config';
import alpinejs from '@astrojs/alpinejs';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import { satteri } from '@astrojs/markdown-satteri';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://bonumdepositum.eu',
  output: 'static',

  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Noto Serif',
      cssVariable: '--font-noto-serif',
      fallbacks: ['Georgia', 'Times New Roman', 'serif'],
      display: 'swap',
      options: {
        variants: [
          {
            src: ['./src/assets/fonts/noto-serif-v33-greek_latin_latin-ext-regular.woff2'],
            weight: 400,
            style: 'normal',
          },
          {
            src: ['./src/assets/fonts/noto-serif-v33-greek_latin_latin-ext-italic.woff2'],
            weight: 400,
            style: 'italic',
          },
          {
            src: ['./src/assets/fonts/noto-serif-v33-greek_latin_latin-ext-600.woff2'],
            weight: 600,
            style: 'normal',
          },
          {
            src: ['./src/assets/fonts/noto-serif-v33-greek_latin_latin-ext-600italic.woff2'],
            weight: 600,
            style: 'italic',
          },
          {
            src: ['./src/assets/fonts/noto-serif-v33-greek_latin_latin-ext-700.woff2'],
            weight: 700,
            style: 'normal',
          },
          {
            src: ['./src/assets/fonts/noto-serif-v33-greek_latin_latin-ext-700italic.woff2'],
            weight: 700,
            style: 'italic',
          },
        ],
      },
    },
  ],

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
