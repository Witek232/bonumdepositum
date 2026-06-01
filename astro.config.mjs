import { defineConfig } from 'astro/config';
import alpinejs from '@astrojs/alpinejs';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import { satteri } from '@astrojs/markdown-satteri';
import { unified } from '@astrojs/markdown-remark';

export default defineConfig({
  site: 'https://bonumdepositum.eu',
  output: 'static',

  integrations: [
    sitemap(),
    // MDX używa unified(), żeby zachować kompatybilność z pluginami remark/rehype
    // jeśli nie używasz żadnych pluginów MDX, możesz usunąć opcję processor
    mdx({
      processor: unified(),
    }),
    alpinejs(),
  ],

  i18n: {
    defaultLocale: 'pl',
    locales: ['pl', 'en', 'es'],
    routing: {
      prefixDefaultLocale: false,
    },
  },

  // Tailwind obsługiwany przez PostCSS (postcss.config.mjs) — bez @tailwindcss/vite
  // vite: {} można całkowicie pominąć jeśli nie masz innych pluginów Vite

  markdown: {
    // Sätteri — szybszy procesor Rust-based (Astro 6.4+)
    // Nie obsługuje remark/rehype pluginów
    processor: satteri(),
  },
});

  markdown: {
    // ZMIANA: Zastąpienie "remarkPlugins" procesorem Sätteri dla maksymalnej wydajności
    processor: satteri(),
  },
});
