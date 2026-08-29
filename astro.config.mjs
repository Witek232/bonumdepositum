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
    sitemap({
      // Filtr: usuń 404 i prywatne ścieżki
      filter: (page) => !page.includes('/404') && !page.includes('/_') && !page.includes('/admin'),
      // Dodaje lastmod, changefreq, priority - kluczowe dla Google
      serialize(item) {
        const url = item.url;
        let priority = 0.5;
        let changefreq = 'monthly';

        if (url === 'https://bonumdepositum.eu/') {
          priority = 1.0;
          changefreq = 'weekly';
        } else if (url === 'https://bonumdepositum.eu/blog/' || url === 'https://bonumdepositum.eu/cycles/') {
          priority = 0.9;
          changefreq = 'daily';
        } else if (url.includes('/cycles/') && url.split('/').length === 5) {
          // /cycles/katechizm-katolicki/ - strony cykli (bez lekcji)
          priority = 0.8;
          changefreq = 'weekly';
        } else if (url.includes('/blog/katechizm/')) {
          priority = 0.7;
          changefreq = 'monthly';
        } else if (url.includes('/blog/')) {
          priority = 0.6;
          changefreq = 'monthly';
        } else if (url.includes('/reading/')) {
          priority = 0.6;
          changefreq = 'monthly';
        }

        return {
          ...item,
          lastmod: new Date().toISOString(),
          changefreq,
          priority,
        };
      },
    }),
    mdx(),
    alpinejs(),
  ],

  // UWAGA SEO: i18n zadeklarowane ale strony /en/ /es/ nie istnieją i robią 301 na /
  // Jeśli nie planujesz tłumaczeń w najbliższych 3 miesiącach - USUŃ cały blok i18n
  // i zostaw tylko polską wersję. Obecnie zostawione, ale _redirects robi 301 /en/ -> /
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
