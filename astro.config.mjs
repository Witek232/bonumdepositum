import { defineConfig, fontProviders } from 'astro/config';
import alpinejs from '@astrojs/alpinejs';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import { satteri } from '@astrojs/markdown-satteri';
import tailwindcss from '@tailwindcss/vite';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

// =====================================================================
// SEO: prawdziwe daty lastmod dla sitemapy
// Google jawnie ignoruje <lastmod>, gdy wszystkie wpisy mają tę samą
// wartość (np. datę builda) — traci wtedy zaufanie do całej mapy.
// Poniższy kod odczytuje daty publikacji wprost z plików .mdx
// (pole pubDate w frontmatter) i przypisuje je właściwym URL-om.
// =====================================================================
function collectLastmod(baseDir, urlPrefix, map) {
  const files = readdirSync(baseDir, { recursive: true, encoding: 'utf8' });
  for (const file of files) {
    if (!file.endsWith('.mdx')) continue;
    const raw = readFileSync(join(baseDir, file), 'utf8');
    const fmMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!fmMatch) continue;
    const frontmatter = fmMatch[1];
    // Data: pubDate lub updated (jeśli będzie dodane) — bierzemy późniejszą
    const dates = [...frontmatter.matchAll(
      /^(?:pubDate|updated|dateModified):\s*["']?(\d{4}-\d{2}-\d{2})/gm,
    )].map((m) => m[1]);
    if (dates.length === 0) continue;
    const lastmod = new Date(Math.max(...dates.map((d) => new Date(d).getTime())));
    // Slug: z frontmatter "slug:" (obsługiwane przez loader glob),
    // w przeciwnym razie ścieżka pliku względem katalogu kolekcji
    const slugMatch = frontmatter.match(/^slug:\s*["']?([^"'\r\n]+?)["']?\s*$/m);
    const id = slugMatch
      ? slugMatch[1].trim()
      : file.replace(/\.mdx$/, '').replace(/\\/g, '/');
    map.set(`${urlPrefix}${id}/`, lastmod.toISOString());
  }
}

const lastmodMap = new Map();
try {
  collectLastmod('./src/content/blog', '/blog/', lastmodMap);
  collectLastmod('./src/content/cycles', '/cycles/', lastmodMap);
  collectLastmod('./src/content/reading', '/reading/', lastmodMap);
} catch (err) {
  // Nie przerywamy builda — mapa po prostu będzie bez lastmod
  console.warn('[sitemap] Nie udało się odczytać dat z treści:', err.message);
}

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
      // lastmod = rzeczywista data publikacji treści (patrz collectLastmod wyżej).
      // Strony bez znanej daty (np. strona główna, indeksy) dostają wpis bez
      // <lastmod> — to uczciwiej niż podawanie daty builda.
      // changefreq i priority celowo usunięte: Google ich nie używa.
      serialize(item) {
        const path = new URL(item.url).pathname;
        const realDate = lastmodMap.get(path);
        if (!realDate) return { url: item.url };
        return { url: item.url, lastmod: realDate };
      },
    }),
    mdx(),
    alpinejs(),
  ],

  markdown: {
    processor: satteri(),
  },
});
