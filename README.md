# Bonum Depositum - Portal Filozofii Klasycznej

Nowoczesny portal filozoficzny z ciemnym motywem (brązy i złoto), animowanym banerem, mega menu i blogiem.

## 🚀 Funkcjonalności

- 🎨 **Ciemny motyw** - eleganckie brązy i złoto
- ✨ **Animowany baner** - efekt paralaksy, cząsteczki, promienie świetlne
- 📱 **Responsywne mega menu** - z akordeonowym menu mobilnym
- 📚 **Biblioteka starodruków** - integracja z Archive.org i Polona.pl
- 🖥️ **Tryb pełnoekranowy** - dla flipchartów i dokumentów
- 📝 **Blog** - gotowy na integrację z Tina CMS
- 🎬 **Osadzone video** - sekcja wykładów
- 🔊 **Odczyt głosowy** - Web Speech API do czytania artykułów
- 🔝 **Przycisk "Do góry"** - z wskaźnikiem postępu przewijania

## 🛠️ Technologie

- **React 19** + **TypeScript**
- **Vite 7** - szybki bundler
- **Tailwind CSS 4** - stylowanie
- **Framer Motion** - animacje
- **React Router** - routing
- **Lucide React** - ikony

## 📦 Instalacja lokalna

```bash
# Klonuj repozytorium
git clone https://github.com/TWOJA-NAZWA/bonum-depositum.git
cd bonum-depositum

# Zainstaluj zależności
npm install

# Uruchom serwer deweloperski
npm run dev

# Zbuduj produkcję
npm run build
```

## ☁️ Wdrożenie na Cloudflare Pages (ZALECANE)

### Krok po kroku:

1. **Wgraj kod na GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/TWOJA-NAZWA/bonum-depositum.git
   git push -u origin main
   ```

2. **Połącz z Cloudflare Pages:**
   - Wejdź na [dash.cloudflare.com](https://dash.cloudflare.com)
   - Wybierz **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
   - Autoryzuj GitHub i wybierz swoje repozytorium

3. **Skonfiguruj build:**
   - **Framework preset:** `None` (lub Vite jeśli dostępne)
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   
4. **Zmienne środowiskowe (opcjonalne):**
   - `NODE_VERSION` = `20`

5. **Kliknij "Save and Deploy"**

6. **Gotowe!** Twoja strona będzie dostępna pod adresem:
   `https://bonum-depositum.pages.dev`

### Rozwiązywanie problemów Cloudflare:

Jeśli build się nie udaje:

1. **Sprawdź logi** - kliknij na deployment i zobacz "Build log"
2. **Wersja Node.js** - dodaj zmienną `NODE_VERSION` = `20`
3. **Błędy TypeScript** - upewnij się, że `npm run build` działa lokalnie

## 🐙 Wdrożenie na GitHub Pages

1. Wgraj kod na GitHub (jak wyżej)
2. Przejdź do **Settings** → **Pages**
3. W **Source** wybierz **GitHub Actions**
4. Workflow automatycznie zbuduje i wdroży stronę
5. Strona będzie dostępna pod: `https://TWOJA-NAZWA.github.io/bonum-depositum`

## 📝 Przygotowanie do Tina CMS

Projekt jest przygotowany do integracji z Tina CMS:

```bash
# Zainstaluj Tina CMS
npx @tinacms/cli@latest init

# Uruchom z Tina
npm run dev
```

## 📁 Struktura projektu

```
bonum-depositum/
├── src/
│   ├── components/
│   │   ├── MegaMenu.tsx         # Nawigacja z mega menu
│   │   ├── HeroBanner.tsx       # Animowany baner
│   │   ├── FlipchartViewer.tsx  # Przeglądarka starodruków
│   │   ├── ScrollToTop.tsx      # Przycisk powrotu do góry
│   │   ├── TextToSpeech.tsx     # Odczyt głosowy
│   │   ├── EmbeddedFlipchart.tsx # Osadzony flipchart
│   │   └── ...
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── BlogPage.tsx
│   │   ├── ArticlePage.tsx
│   │   ├── BibliotekePage.tsx
│   │   └── ...
│   ├── App.tsx                  # Główny komponent z routingiem
│   └── main.tsx
├── public/
│   ├── _redirects               # Routing SPA dla Cloudflare/Netlify
│   └── _headers                 # Nagłówki bezpieczeństwa
├── .github/workflows/           # GitHub Actions
└── README.md
```

## 🎨 Personalizacja

### Kolory (Tailwind)
Główne kolory używane w projekcie:
- `amber-500/600` - złoto
- `gold-500/600` - niestandardowe złoto
- `bronze-500/600` - niestandardowy brąz
- `stone-800/900/950` - ciemne tło

### Fonty
- **Cinzel** - nagłówki (klasyczny, antyczny styl)
- **Cormorant Garamond** - cytaty i podpisy
- **Inter** - tekst główny

## 📄 Licencja

MIT License - możesz używać projektu do celów komercyjnych i niekomercyjnych.

---

Stworzono z ❤️ dla miłośników filozofii klasycznej.
