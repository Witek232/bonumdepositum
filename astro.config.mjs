import { defineConfig } from 'astro/config';
import alpinejs from '@astrojs/alpinejs';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
// USUNIĘTO: import remarkToc from 'remark-toc'; (Sätteri tego nie obsługuje)
import tailwindcss from '@tailwindcss/vite';
import { satteri } from '@astrojs/markdown-satteri';

export default defineConfig({
  site: 'https://bonumdepositum.eu',
  
  // DODANO: Tryb statyczny - wymagany dla Cloudflare Pages (bez @astrojs/cloudflare)
  output: 'static', 
  
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
    // ZMIANA: Zastąpienie "remarkPlugins" procesorem Sätteri dla maksymalnej wydajności
    processor: satteri(),
  },
});
