import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Maximize2, 
  Minimize2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink,
  BookOpen,
  Search,
  Filter,
  Library
} from 'lucide-react';

interface FlipchartItem {
  id: string;
  title: string;
  source: 'archive' | 'polona';
  embedUrl: string;
  externalUrl: string;
  description: string;
  author?: string;
  year?: string;
  pages?: number;
  thumbnail: string;
  category: string;
}

const flipcharts: FlipchartItem[] = [
  {
    id: '1',
    title: 'Summa Theologiae - Św. Tomasz z Akwinu',
    source: 'archive',
    embedUrl: 'https://archive.org/embed/summatheologiae00thomuoft',
    externalUrl: 'https://archive.org/details/summatheologiae00thomuoft',
    description: 'Monumentalne dzieło teologiczno-filozoficzne św. Tomasza z Akwinu, stanowiące syntezę scholastycznej teologii i filozofii.',
    author: 'Tomasz z Akwinu',
    year: '1265-1274',
    pages: 3500,
    thumbnail: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
    category: 'Tomizm'
  },
  {
    id: '2',
    title: 'Metafizyka - Arystoteles',
    source: 'archive',
    embedUrl: 'https://archive.org/embed/aristotlesmetaph00arisuoft',
    externalUrl: 'https://archive.org/details/aristotlesmetaph00arisuoft',
    description: 'Fundamentalne dzieło Arystotelesa poświęcone "filozofii pierwszej" - nauce o bycie jako takim.',
    author: 'Arystoteles',
    year: 'IV w. p.n.e.',
    pages: 350,
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
    category: 'Metafizyka'
  },
  {
    id: '3',
    title: 'Etyka Nikomachejska',
    source: 'archive',
    embedUrl: 'https://archive.org/embed/ethicanicomachea00arisuoft',
    externalUrl: 'https://archive.org/details/ethicanicomachea00arisuoft',
    description: 'Główne dzieło etyczne Arystotelesa, poświęcone cnótom i drodze do szczęścia (eudajmonii).',
    author: 'Arystoteles',
    year: 'IV w. p.n.e.',
    pages: 280,
    thumbnail: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=300&fit=crop',
    category: 'Etyka'
  },
  {
    id: '4',
    title: 'O Państwie - Platon',
    source: 'polona',
    embedUrl: 'https://polona.pl/embed/item/48152011?range=0',
    externalUrl: 'https://polona.pl/item/48152011',
    description: 'Najsłynniejszy dialog Platona, zawierający wizję idealnego państwa i alegorię jaskini.',
    author: 'Platon',
    year: 'ok. 375 p.n.e.',
    pages: 420,
    thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=300&fit=crop',
    category: 'Platonizm'
  },
  {
    id: '5',
    title: 'Wyznania - Św. Augustyn',
    source: 'polona',
    embedUrl: 'https://polona.pl/embed/item/33205849?range=0',
    externalUrl: 'https://polona.pl/item/33205849',
    description: 'Autobiograficzne i filozoficzne dzieło św. Augustyna, jedno z najważniejszych pism patrystycznych.',
    author: 'Augustyn z Hippony',
    year: '397-400',
    pages: 320,
    thumbnail: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=300&fit=crop',
    category: 'Patrystyka'
  },
  {
    id: '6',
    title: 'Medytacje o pierwszej filozofii - Kartezjusz',
    source: 'archive',
    embedUrl: 'https://archive.org/embed/meditationesdepr00desc',
    externalUrl: 'https://archive.org/details/meditationesdepr00desc',
    description: 'Przełomowe dzieło Kartezjusza, ustanawiające fundamenty nowożytnej filozofii.',
    author: 'René Descartes',
    year: '1641',
    pages: 180,
    thumbnail: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=300&fit=crop',
    category: 'Nowożytność'
  },
  {
    id: '7',
    title: 'Summa contra Gentiles',
    source: 'archive',
    embedUrl: 'https://archive.org/embed/summacontragenti00thom',
    externalUrl: 'https://archive.org/details/summacontragenti00thom',
    description: 'Apologetyczne dzieło św. Tomasza, zawierające filozoficzne argumenty za prawdami wiary.',
    author: 'Tomasz z Akwinu',
    year: '1259-1265',
    pages: 1200,
    thumbnail: 'https://images.unsplash.com/photo-1589656966895-2f33e7653819?w=400&h=300&fit=crop',
    category: 'Tomizm'
  },
  {
    id: '8',
    title: 'De Anima - Arystoteles',
    source: 'archive',
    embedUrl: 'https://archive.org/embed/aristotelesdean01arisgoog',
    externalUrl: 'https://archive.org/details/aristotelesdean01arisgoog',
    description: 'Traktat Arystotelesa o duszy, fundamentalny dla filozofii umysłu i psychologii.',
    author: 'Arystoteles',
    year: 'IV w. p.n.e.',
    pages: 200,
    thumbnail: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=400&h=300&fit=crop',
    category: 'Metafizyka'
  },
];

const categories = ['Wszystkie', 'Tomizm', 'Metafizyka', 'Etyka', 'Platonizm', 'Patrystyka', 'Nowożytność'];
const sources = ['Wszystkie', 'Archive.org', 'Polona.pl'];

export function BibliotekePage() {
  const [selectedFlipchart, setSelectedFlipchart] = useState<FlipchartItem | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState('Wszystkie');
  const [activeSource, setActiveSource] = useState('Wszystkie');
  const [searchQuery, setSearchQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter flipcharts
  const filteredFlipcharts = flipcharts.filter(f => {
    const matchesCategory = activeCategory === 'Wszystkie' || f.category === activeCategory;
    const matchesSource = activeSource === 'Wszystkie' || 
      (activeSource === 'Archive.org' && f.source === 'archive') ||
      (activeSource === 'Polona.pl' && f.source === 'polona');
    const matchesSearch = f.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.author?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSource && matchesSearch;
  });

  // Fullscreen handling
  const enterFullscreen = async () => {
    if (containerRef.current) {
      try {
        if (containerRef.current.requestFullscreen) {
          await containerRef.current.requestFullscreen();
        }
        setIsFullscreen(true);
      } catch (err) {
        console.error('Fullscreen error:', err);
      }
    }
  };

  const exitFullscreen = async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      }
      setIsFullscreen(false);
    } catch (err) {
      console.error('Exit fullscreen error:', err);
    }
  };

  const toggleFullscreen = () => {
    if (isFullscreen) {
      exitFullscreen();
    } else {
      enterFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedFlipchart) return;
      if (e.key === 'Escape') {
        if (isFullscreen) exitFullscreen();
        else setSelectedFlipchart(null);
      } else if (e.key === 'ArrowLeft') navigatePrev();
      else if (e.key === 'ArrowRight') navigateNext();
      else if (e.key === 'f' || e.key === 'F') toggleFullscreen();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedFlipchart, isFullscreen, currentIndex]);

  const openFlipchart = (flipchart: FlipchartItem) => {
    const index = filteredFlipcharts.findIndex(f => f.id === flipchart.id);
    setCurrentIndex(index);
    setSelectedFlipchart(flipchart);
  };

  const navigatePrev = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : filteredFlipcharts.length - 1;
    setCurrentIndex(newIndex);
    setSelectedFlipchart(filteredFlipcharts[newIndex]);
  };

  const navigateNext = () => {
    const newIndex = currentIndex < filteredFlipcharts.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(newIndex);
    setSelectedFlipchart(filteredFlipcharts[newIndex]);
  };

  const closeFlipchart = () => {
    if (isFullscreen) exitFullscreen();
    setSelectedFlipchart(null);
  };

  return (
    <div className="pt-20 min-h-screen">
      {/* Header */}
      <section className="py-16 bg-gradient-to-b from-stone-900 to-stone-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center space-x-2 bg-gold-900/20 border border-gold-700/30 rounded-full px-4 py-2 mb-6">
              <Library className="w-4 h-4 text-gold-500" />
              <span className="text-gold-400 text-sm">Biblioteka Cyfrowa</span>
            </div>
            <h1 className="font-cinzel text-4xl sm:text-5xl lg:text-6xl font-bold text-bronze-100 mb-4">
              Starodruki & <span className="text-gold-500">Manuskrypty</span>
            </h1>
            <p className="text-bronze-400 font-cormorant text-xl italic max-w-2xl mx-auto">
              Przeglądaj historyczne teksty filozoficzne z Archive.org i Polona.pl w trybie pełnoekranowym
            </p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-4xl mx-auto space-y-6"
          >
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-bronze-500" />
              <input
                type="text"
                placeholder="Szukaj dzieł, autorów..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-stone-800/50 border border-gold-900/30 rounded-xl pl-12 pr-4 py-4 text-bronze-200 placeholder:text-bronze-600 focus:outline-none focus:border-gold-600 transition-colors"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-bronze-500" />
                <span className="text-bronze-500 text-sm">Kategoria:</span>
              </div>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    activeCategory === category
                      ? 'bg-gold-500 text-stone-950'
                      : 'bg-stone-800/50 text-bronze-400 hover:text-gold-400 border border-gold-900/30'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-bronze-500" />
                <span className="text-bronze-500 text-sm">Źródło:</span>
              </div>
              {sources.map((source) => (
                <button
                  key={source}
                  onClick={() => setActiveSource(source)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    activeSource === source
                      ? 'bg-gold-500 text-stone-950'
                      : 'bg-stone-800/50 text-bronze-400 hover:text-gold-400 border border-gold-900/30'
                  }`}
                >
                  {source}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 bg-stone-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredFlipcharts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredFlipcharts.map((flipchart, index) => (
                <motion.div
                  key={flipchart.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group cursor-pointer"
                  onClick={() => openFlipchart(flipchart)}
                >
                  <div className="bg-stone-800/50 border border-gold-900/30 rounded-xl overflow-hidden hover:border-gold-700/50 transition-all hover:shadow-xl hover:shadow-gold-900/20 h-full flex flex-col">
                    <div className="relative overflow-hidden">
                      <img
                        src={flipchart.thumbnail}
                        alt={flipchart.title}
                        className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent" />
                      
                      <div className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs font-semibold ${
                        flipchart.source === 'archive' 
                          ? 'bg-blue-500/90 text-white' 
                          : 'bg-red-500/90 text-white'
                      }`}>
                        {flipchart.source === 'archive' ? 'Archive' : 'Polona'}
                      </div>

                      <div className="absolute top-2 right-2 bg-stone-950/80 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                        <Maximize2 className="w-3 h-3 text-gold-500" />
                      </div>

                      <div className="absolute bottom-2 right-2 bg-gold-900/80 px-2 py-0.5 rounded text-xs text-gold-200">
                        {flipchart.category}
                      </div>
                    </div>

                    <div className="p-4 flex-1 flex flex-col">
                      <h3 className="font-cinzel text-sm text-bronze-100 group-hover:text-gold-400 transition-colors mb-1 line-clamp-2">
                        {flipchart.title}
                      </h3>
                      
                      {flipchart.author && (
                        <p className="text-gold-600 text-xs mb-2">{flipchart.author}</p>
                      )}
                      
                      <p className="text-bronze-500 text-xs line-clamp-2 flex-1">
                        {flipchart.description}
                      </p>
                      
                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-gold-900/20 text-bronze-600 text-xs">
                        {flipchart.year && <span>{flipchart.year}</span>}
                        {flipchart.pages && <span>{flipchart.pages} str.</span>}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <BookOpen className="w-12 h-12 text-bronze-600 mx-auto mb-4" />
              <p className="text-bronze-500 text-lg">Nie znaleziono dzieł spełniających kryteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Viewer Modal */}
      <AnimatePresence>
        {selectedFlipchart && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-stone-950/98 backdrop-blur-lg flex flex-col"
            ref={containerRef}
          >
            {/* Header */}
            <div className={`flex items-center justify-between p-4 border-b border-gold-900/30 bg-stone-900/95 ${isFullscreen ? 'px-8' : ''}`}>
              <div className="flex items-center space-x-4 min-w-0">
                <div className={`px-3 py-1 rounded-full text-xs font-semibold flex-shrink-0 ${
                  selectedFlipchart.source === 'archive' 
                    ? 'bg-blue-500/90 text-white' 
                    : 'bg-red-500/90 text-white'
                }`}>
                  {selectedFlipchart.source === 'archive' ? 'Archive.org' : 'Polona.pl'}
                </div>
                <div className="min-w-0">
                  <h2 className="font-cinzel text-lg text-bronze-100 truncate">
                    {selectedFlipchart.title}
                  </h2>
                  {selectedFlipchart.author && (
                    <p className="text-gold-500 text-sm">{selectedFlipchart.author}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2 flex-shrink-0">
                <button onClick={navigatePrev} className="p-2 text-bronze-400 hover:text-gold-400 hover:bg-stone-800 rounded-lg transition-colors" title="Poprzedni (←)">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                <span className="text-bronze-500 text-sm px-2">
                  {currentIndex + 1} / {filteredFlipcharts.length}
                </span>
                
                <button onClick={navigateNext} className="p-2 text-bronze-400 hover:text-gold-400 hover:bg-stone-800 rounded-lg transition-colors" title="Następny (→)">
                  <ChevronRight className="w-5 h-5" />
                </button>

                <div className="w-px h-6 bg-gold-900/30 mx-2" />

                <a
                  href={selectedFlipchart.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-bronze-400 hover:text-gold-400 hover:bg-stone-800 rounded-lg transition-colors"
                  title="Otwórz w źródle"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>

                <button
                  onClick={toggleFullscreen}
                  className="p-2 text-bronze-400 hover:text-gold-400 hover:bg-stone-800 rounded-lg transition-colors"
                  title={isFullscreen ? "Wyjdź z pełnego ekranu (F)" : "Pełny ekran (F)"}
                >
                  {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
                </button>

                <button
                  onClick={closeFlipchart}
                  className="p-2 text-bronze-400 hover:text-red-400 hover:bg-stone-800 rounded-lg transition-colors"
                  title="Zamknij (Esc)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Iframe */}
            <div className="flex-1 relative">
              <iframe
                src={selectedFlipchart.embedUrl}
                title={selectedFlipchart.title}
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
              />

              <button
                onClick={navigatePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-stone-900/80 hover:bg-gold-900/80 text-bronze-200 hover:text-gold-400 rounded-full transition-all shadow-lg"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <button
                onClick={navigateNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-stone-900/80 hover:bg-gold-900/80 text-bronze-200 hover:text-gold-400 rounded-full transition-all shadow-lg"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Footer */}
            <div className={`p-4 border-t border-gold-900/30 bg-stone-900/95 ${isFullscreen ? 'px-8' : ''}`}>
              <div className="flex items-center justify-between">
                <p className="text-bronze-400 text-sm max-w-2xl line-clamp-1">
                  {selectedFlipchart.description}
                </p>
                <div className="flex items-center space-x-4 text-bronze-500 text-xs">
                  {selectedFlipchart.year && <span>{selectedFlipchart.year}</span>}
                  {selectedFlipchart.pages && <span>{selectedFlipchart.pages} stron</span>}
                  <span className="text-bronze-600 hidden md:inline">← → nawigacja • F pełny ekran • Esc zamknij</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
