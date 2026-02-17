# 🚀 Instrukcja wdrożenia Bonum Depositum - KROK PO KROKU

## Wstęp
Ta instrukcja przeprowadzi Cię przez cały proces od początku do końca. Potrzebujesz tylko konta na GitHub i Cloudflare.

---

## CZĘŚĆ 1: Przygotowanie plików na komputerze

### Krok 1.1: Pobierz wszystkie pliki
Pobierz wszystkie pliki z tego projektu na swój komputer. Powinny być w jednym folderze, np. `bonum-depositum`.

### Krok 1.2: Sprawdź strukturę folderów
Twój folder powinien wyglądać tak:
```
bonum-depositum/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── public/
│   ├── _headers
│   └── _redirects
├── src/
│   ├── components/
│   ├── pages/
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## CZĘŚĆ 2: Tworzenie repozytorium na GitHub

### Krok 2.1: Zaloguj się do GitHub
1. Otwórz przeglądarkę
2. Wejdź na: **https://github.com**
3. Zaloguj się na swoje konto

### Krok 2.2: Utwórz nowe repozytorium
1. Kliknij zielony przycisk **"New"** (lub ikonę **+** w prawym górnym rogu → "New repository")
2. Wypełnij formularz:
   - **Repository name:** `bonum-depositum`
   - **Description:** `Portal filozoficzny Bonum Depositum`
   - **Visibility:** Wybierz **Public** (ważne dla darmowego hostingu!)
   - **NIE zaznaczaj** "Add a README file"
   - **NIE zaznaczaj** "Add .gitignore"
   - **NIE zaznaczaj** "Choose a license"
3. Kliknij zielony przycisk **"Create repository"**

### Krok 2.3: Wgraj pliki do GitHub
Po utworzeniu repozytorium zobaczysz stronę z instrukcjami. Masz dwie opcje:

#### OPCJA A: Przez przeglądarkę (najprostsze!)
1. Na stronie nowego repozytorium kliknij **"uploading an existing file"**
2. Przeciągnij WSZYSTKIE pliki i foldery z folderu `bonum-depositum` na stronę
3. Na dole strony:
   - W polu "Commit changes" wpisz: `Initial commit`
   - Kliknij zielony przycisk **"Commit changes"**

#### OPCJA B: Przez GitHub Desktop (łatwiejsze niż terminal)
1. Pobierz GitHub Desktop: https://desktop.github.com/
2. Zainstaluj i zaloguj się
3. Kliknij "File" → "Add Local Repository"
4. Wybierz folder z plikami projektu
5. Kliknij "Publish repository"

---

## CZĘŚĆ 3: Połączenie z Cloudflare Pages

### Krok 3.1: Zaloguj się do Cloudflare
1. Otwórz przeglądarkę
2. Wejdź na: **https://dash.cloudflare.com**
3. Zaloguj się na swoje konto

### Krok 3.2: Przejdź do Workers & Pages
1. W menu po lewej stronie znajdź i kliknij **"Workers & Pages"**
2. Kliknij niebieski przycisk **"Create"** (lub "Create application")

### Krok 3.3: Wybierz Pages
1. Zobaczysz dwie zakładki: "Workers" i "Pages"
2. Kliknij zakładkę **"Pages"**
3. Kliknij **"Connect to Git"**

### Krok 3.4: Połącz z GitHub
1. Kliknij przycisk **"Connect GitHub"**
2. Otworzy się okno autoryzacji GitHub
3. Kliknij **"Authorize Cloudflare"**
4. Możesz zostać poproszony o hasło GitHub - wpisz je

### Krok 3.5: Wybierz repozytorium
1. Wybierz swoje konto GitHub z listy
2. Znajdź i wybierz repozytorium **"bonum-depositum"**
3. Kliknij **"Begin setup"**

### Krok 3.6: Skonfiguruj build (WAŻNE!)
Na stronie konfiguracji wypełnij:

| Pole | Wartość |
|------|---------|
| **Project name** | `bonum-depositum` (lub inna nazwa) |
| **Production branch** | `main` |
| **Framework preset** | Wybierz **"None"** |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |

### Krok 3.7: Dodaj zmienną środowiskową (WAŻNE!)
1. Kliknij **"Environment variables (advanced)"** aby rozwinąć sekcję
2. Kliknij **"Add variable"**
3. Wypełnij:
   - **Variable name:** `NODE_VERSION`
   - **Value:** `20`
4. Upewnij się, że jest zaznaczone dla "Production" i "Preview"

### Krok 3.8: Uruchom deploy
1. Kliknij niebieski przycisk **"Save and Deploy"**
2. Poczekaj... (może to potrwać 2-5 minut)
3. Zobaczysz logi budowania w czasie rzeczywistym

### Krok 3.9: Sprawdź wynik
Jeśli wszystko poszło dobrze:
1. Zobaczysz zielony napis **"Success"**
2. U góry pojawi się link do Twojej strony, np.:
   **https://bonum-depositum.pages.dev**
3. Kliknij ten link - Twoja strona powinna działać! 🎉

---

## ROZWIĄZYWANIE PROBLEMÓW

### ❌ Błąd: "Build failed"
**Sprawdź logi:**
1. Kliknij na nieudany deployment
2. Przeczytaj "Build log"
3. Najczęstsze problemy:

**Problem: "npm ERR!" lub błędy instalacji**
- Upewnij się, że dodałeś zmienną `NODE_VERSION` = `20`
- Sprawdź czy plik `package.json` został wgrany

**Problem: "Cannot find module" lub błędy TypeScript**
- Upewnij się, że wgrałeś WSZYSTKIE pliki i foldery
- Sprawdź czy folder `src` zawiera wszystkie komponenty

**Problem: "vite: command not found"**
- Build command powinien być dokładnie: `npm run build`
- NIE: `vite build` czy `npx vite build`

### ❌ Strona pokazuje błąd 404
- Sprawdź czy plik `public/_redirects` został wgrany
- Output directory musi być `dist` (nie `build` ani `public`)

### ❌ Strona nie wygląda poprawnie (brak stylów)
- Sprawdź czy plik `src/index.css` został wgrany
- Sprawdź logi - czy nie ma błędów CSS

---

## CO DALEJ?

### Aktualizacja strony
Gdy chcesz zaktualizować stronę:
1. Zmień pliki na GitHub
2. Cloudflare automatycznie wykryje zmiany i zbuduje nową wersję
3. Po 2-3 minutach zmiany będą widoczne

### Własna domena (opcjonalnie)
1. W Cloudflare Pages kliknij na swój projekt
2. Idź do "Custom domains"
3. Kliknij "Set up a domain"
4. Wpisz swoją domenę i postępuj według instrukcji

### Integracja z Tina CMS (późniejszy etap)
Portal jest przygotowany do integracji z Tina CMS. Instrukcja:
1. Zainstaluj Tina: `npx @tinacms/cli@latest init`
2. Skonfiguruj Tina Cloud
3. Połącz z repozytorium GitHub

---

## POMOC

Jeśli napotkasz problemy:
1. **Sprawdź logi** - zawsze czytaj komunikaty błędów
2. **Sprawdź pliki** - upewnij się, że wszystkie zostały wgrane
3. **Sprawdź konfigurację** - szczególnie NODE_VERSION i build command

---

**Powodzenia! 🚀**
