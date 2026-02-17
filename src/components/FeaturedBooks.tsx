import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { EmbeddedFlipchart } from './EmbeddedFlipchart';

interface FeaturedBook {
  id: string;
  title: string;
  author: string;
  year: string;
  source: 'archive' | 'polona';
  embedUrl: string;
  externalUrl: string;
  description: string;
  highlight: string;
}

const featuredBooks: FeaturedBook[] = [
  {
    id: '1',
    title: 'Państwo (The Republic)',
    author: 'Platon',
    year: 'ok. 375 p.n.e.',
    source: 'archive',
    embedUrl: 'https://archive.org/embed/republicofplato00telerich',
    externalUrl: 'https://archive.org/details/republicofplato00telerich',
    description: 'Najsłynniejszy dialog Platona, zawierający wizję idealnego państwa, alegorię jaskini i teorię idei. Fundament zachodniej myśli politycznej.',
    highlight: 'Klasyka filozofii',
  },
  {
    id: '2',
    title: 'De revolutionibus orbium coelestium',
    author: 'Mikołaj Kopernik',
    year: '1543',
    source: 'polona',
    embedUrl: 'https://polona.pl/preview/nicolai-copernici-torinensis-de-revolutionibus-orbium-coelestium-libri-vi,MTEyMzY1OTc',
    externalUrl: 'https://polona.pl/item/nicolai-copernici-torinensis-de-revolutionibus-orbium-coelestium-libri-vi,MTEyMzY1OTc',
    description: 'Przełomowe dzieło Mikołaja Kopernika, które zrewolucjonizowało rozumienie wszechświata i zapoczątkowało rewolucję naukową.',
    highlight: 'Polski starodruk',
  },
  {
    id: '3',
    title: 'Meditations',
    author: 'Marek Aureliusz',
    year: '170-180 n.e.',
    source: 'archive',
    embedUrl: 'https://archive.org/embed/meditationsofmar00marcuoft',
    externalUrl: 'https://archive.org/details/meditationsofmar00marcuoft',
    description: 'Osobiste zapiski cesarza-filozofa Marka Aureliusza. Klasyczne dzieło stoicyzmu, ponadczasowy przewodnik po życiu mądrym i cnotliwym.',
    highlight: 'Stoicyzm',
  },
];

export function FeaturedBooks() {
  const [activeBook, setActiveBook] = useState(0);

  const nextBook = () => {
    setActiveBook((prev) => (prev + 1) % featuredBooks.length);
  };

  const prevBook = () => {
    setActiveBook((prev) => (prev - 1 + featuredBooks.length) % featuredBooks.length);
  };

  const book = featuredBooks[activeBook];

  return (
    <section className="py-24 bg-gradient-to-b from-stone-950 to-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center space-x-2 bg-gold-900/20 border border-gold-700/30 rounded-full px-4 py-2 mb-6">
            <BookOpen className="w-4 h-4 text-gold-500" />
            <span className="text-gold-400 text-sm">Wybrane Dzieła</span>
          </div>
          <h2 className="font-cinzel text-4xl sm:text-5xl font-bold text-bronze-100 mb-4">
            Czytaj <span className="text-gold-500">Online</span>
          </h2>
          <p className="text-bronze-400 font-cormorant text-xl italic max-w-2xl mx-auto">
            Przeglądaj najważniejsze dzieła filozoficzne bezpośrednio w przeglądarce
          </p>
        </motion.div>

        {/* Book selector tabs */}
        <div className="flex justify-center gap-4 mb-8 flex-wrap">
          {featuredBooks.map((b, index) => (
            <button
              key={b.id}
              onClick={() => setActiveBook(index)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeBook === index
                  ? 'bg-gold-600 text-stone-950'
                  : 'bg-stone-800 text-bronze-300 hover:bg-stone-700'
              }`}
            >
              <span className="hidden sm:inline">{b.title}</span>
              <span className="sm:hidden">{b.author}</span>
            </button>
          ))}
        </div>

        {/* Active book display */}
        <motion.div
          key={book.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="relative"
        >
          {/* Navigation arrows */}
          <button
            onClick={prevBook}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 z-10 p-3 bg-stone-800/80 hover:bg-gold-900/80 text-bronze-200 hover:text-gold-400 rounded-full transition-all shadow-lg backdrop-blur-sm hidden md:flex"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={nextBook}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 z-10 p-3 bg-stone-800/80 hover:bg-gold-900/80 text-bronze-200 hover:text-gold-400 rounded-full transition-all shadow-lg backdrop-blur-sm hidden md:flex"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Book info header */}
          <div className="mb-6 text-center">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${
              book.source === 'archive' 
                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                : 'bg-red-500/20 text-red-400 border border-red-500/30'
            }`}>
              {book.highlight} • {book.source === 'archive' ? 'Archive.org' : 'Polona.pl'}
            </span>
            <h3 className="font-cinzel text-2xl text-bronze-100 mb-2">{book.title}</h3>
            <p className="text-gold-500">{book.author} ({book.year})</p>
          </div>

          {/* Embedded flipchart */}
          <EmbeddedFlipchart
            title={book.title}
            author={book.author}
            year={book.year}
            source={book.source}
            embedUrl={book.embedUrl}
            externalUrl={book.externalUrl}
            description={book.description}
          />

          {/* Mobile navigation */}
          <div className="flex justify-center gap-4 mt-6 md:hidden">
            <button
              onClick={prevBook}
              className="p-3 bg-stone-800 hover:bg-gold-900/80 text-bronze-200 hover:text-gold-400 rounded-full transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              {featuredBooks.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveBook(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    activeBook === index ? 'bg-gold-500 w-4' : 'bg-stone-600'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={nextBook}
              className="p-3 bg-stone-800 hover:bg-gold-900/80 text-bronze-200 hover:text-gold-400 rounded-full transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="/biblioteka"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-gold-600 to-amber-600 hover:from-gold-500 hover:to-amber-500 text-stone-950 rounded-lg font-semibold transition-all shadow-lg shadow-gold-900/30"
          >
            <BookOpen className="w-5 h-5" />
            Przeglądaj całą bibliotekę
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
