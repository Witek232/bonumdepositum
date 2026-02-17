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
  Loader2,
  Info,
  BookMarked
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
  language?: string;
  category?: string;
}

// Prawdziwe książki z Archive.org i Polona.pl
const flipcharts: FlipchartItem[] = [
  // Archive.org - prawdziwe linki
  {
    id: '1',
    title: 'Summa Theologiae',
    source: 'archive',
    embedUrl: 'https://archive.org/embed/sumlogsanctithom00444gut',
    externalUrl: 'https://archive.org/details/sumlogsanctithom00444gut',
    description: 'Monumentalne dzieło teologiczno-filozoficzne św. Tomasza z Akwinu, stanowiące syntezę scholastycznej teologii i filozofii chrześcijańskiej.',
    author: 'Tomasz z Akwinu',
    year: '1265-1274',
    pages: 3500,
    thumbnail: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
    language: 'Łacina',
    category: 'Teologia'
  },
  {
    id: '2',
    title: 'Metaphysics',
    source: 'archive',
    embedUrl: 'https://archive.org/embed/Aristotle-Metaphysics',
    externalUrl: 'https://archive.org/details/Aristotle-Metaphysics',
    description: 'Fundamentalne dzieło Arystotelesa poświęcone "filozofii pierwszej" - nauce o bycie jako takim i pierwszych przyczynach.',
    author: 'Arystoteles',
    year: 'IV w. p.n.e.',
    pages: 350,
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
    language: 'Angielski',
    category: 'Metafizyka'
  },
  {
    id: '3',
    title: 'The Republic - Plato',
    source: 'archive',
    embedUrl: 'https://archive.org/embed/republicofplato00telerich',
    externalUrl: 'https://archive.org/details/republicofplato00telerich',
    description: 'Najsłynniejszy dialog Platona, zawierający wizję idealnego państwa, alegorię jaskini i teorię idei.',
    author: 'Platon',
    year: 'ok. 375 p.n.e.',
    pages: 420,
    thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=300&fit=crop',
    language: 'Angielski',
    category: 'Filozofia polityczna'
  },
  {
    id: '4',
    title: 'Meditations - Marcus Aurelius',
    source: 'archive',
    embedUrl: 'https://archive.org/embed/meditationsofmar00marcuoft',
    externalUrl: 'https://archive.org/details/meditationsofmar00marcuoft',
    description: 'Osobiste zapiski cesarza-filozofa Marka Aureliusza, klasyczne dzieło stoicyzmu.',
    author: 'Marek Aureliusz',
    year: '170-180 n.e.',
    pages: 180,
    thumbnail: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=300&fit=crop',
    language: 'Angielski',
    category: 'Stoicyzm'
  },
  {
    id: '5',
    title: 'Nicomachean Ethics',
    source: 'archive',
    embedUrl: 'https://archive.org/embed/nicomacheanethic00arisuoft',
    externalUrl: 'https://archive.org/details/nicomacheanethic00arisuoft',
    description: 'Główne dzieło etyczne Arystotelesa, poświęcone cnotom i drodze do szczęścia (eudajmonii).',
    author: 'Arystoteles',
    year: 'IV w. p.n.e.',
    pages: 280,
    thumbnail: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=300&fit=crop',
    language: 'Angielski',
    category: 'Etyka'
  },
  {
    id: '6',
    title: 'Confessions - St. Augustine',
    source: 'archive',
    embedUrl: 'https://archive.org/embed/confessionsofsai00augu',
    externalUrl: 'https://archive.org/details/confessionsofsai00augu',
    description: 'Autobiograficzne i filozoficzne dzieło św. Augustyna, jedno z najważniejszych pism patrystycznych.',
    author: 'Augustyn z Hippony',
    year: '397-400 n.e.',
    pages: 320,
    thumbnail: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=300&fit=crop',
    language: 'Angielski',
    category: 'Patrystyka'
  },
  // Polona.pl - prawdziwe linki do polskich starodruków
  {
    id: '7',
    title: 'Biblia to jest Ksiegi Starego y Nowego Testamentu',
    source: 'polona',
    embedUrl: 'https://polona.pl/preview/biblia-to-iest-ksiegi-starego-y-nowego-testamentu-wedlug-lacinskiego-przekladu-starego-w,ODM0OTk2NTk',
    externalUrl: 'https://polona.pl/item/biblia-to-iest-ksiegi-starego-y-nowego-testamentu-wedlug-lacinskiego-przekladu-starego-w,ODM0OTk2NTk',
    description: 'Biblia Jakuba Wujka - pierwszy pełny katolicki przekład Pisma Świętego na język polski.',
    author: 'Jakub Wujek',
    year: '1599',
    pages: 1200,
    thumbnail: 'https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?w=400&h=300&fit=crop',
    language: 'Polski',
    category: 'Teologia'
  },
  {
    id: '8',
    title: 'O poprawie Rzeczypospolitej',
    source: 'polona',
    embedUrl: 'https://polona.pl/preview/o-poprawie-rzeczypospolitey-xiag-piecioro,Njg2MDQ0ODA',
    externalUrl: 'https://polona.pl/item/o-poprawie-rzeczypospolitey-xiag-piecioro,Njg2MDQ0ODA',
    description: 'Traktat polityczny Andrzeja Frycza Modrzewskiego, jeden z najważniejszych tekstów renesansowej myśli politycznej.',
    author: 'Andrzej Frycz Modrzewski',
    year: '1551',
    pages: 350,
    thumbnail: 'https://images.unsplash.com/photo-1461360370896-922624d12a74?w=400&h=300&fit=crop',
    language: 'Polski',
    category: 'Filozofia polityczna'
  },
  {
    id: '9',
    title: 'Kazania sejmowe',
    source: 'polona',
    embedUrl: 'https://polona.pl/preview/kazania-sejmowe,ODk4NDM5NzM',
    externalUrl: 'https://polona.pl/item/kazania-sejmowe,ODk4NDM5NzM',
    description: 'Zbiór kazań Piotra Skargi, wybitne dzieło oratorskie polskiego baroku, zawierające krytykę wad Rzeczypospolitej.',
    author: 'Piotr Skarga',
    year: '1597',
    pages: 280,
    thumbnail: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400&h=300&fit=crop',
    language: 'Polski',
    category: 'Retoryka'
  },
  {
    id: '10',
    title: 'Żywoty Świętych',
    source: 'polona',
    embedUrl: 'https://polona.pl/preview/zywoty-swietych-starego-y-nowego-zakonu-na-kazdy-dzien-przez-caly-rok,OTIyODk2MTU',
    externalUrl: 'https://polona.pl/item/zywoty-swietych-starego-y-nowego-zakonu-na-kazdy-dzien-przez-caly-rok,OTIyODk2MTU',
    description: 'Monumentalne dzieło hagiograficzne Piotra Skargi, opisujące życie świętych na każdy dzień roku.',
    author: 'Piotr Skarga',
    year: '1610',
    pages: 1400,
    thumbnail: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop',
    language: 'Polski',
    category: 'Hagiografia'
  },
  {
    id: '11',
    title: 'De revolutionibus orbium coelestium',
    source: 'polona',
    embedUrl: 'https://polona.pl/preview/nicolai-copernici-torinensis-de-revolutionibus-orbium-coelestium-libri-vi,MTEyMzY1OTc',
    externalUrl: 'https://polona.pl/item/nicolai-copernici-torinensis-de-revolutionibus-orbium-coelestium-libri-vi,MTEyMzY1OTc',
    description: 'Przełomowe dzieło Mikołaja Kopernika, które zrewolucjonizowało rozumienie wszechświata.',
    author: 'Mikołaj Kopernik',
    year: '1543',
    pages: 196,
    thumbnail: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=300&fit=crop',
    language: 'Łacina',
    category: 'Astronomia'
  },
  {
    id: '12',
    title: 'Kronika polska',
    source: 'polona',
    embedUrl: 'https://polona.pl/preview/kronika-polska-litewska-zmudzka-y-wszystkiey-rusi-kijowskiey-moskiewskiey-siewierskiey,ODA4OTQwMjQ',
    externalUrl: 'https://polona.pl/item/kronika-polska-litewska-zmudzka-y-wszystkiey-rusi-kijowskiey-moskiewskiey-siewierskiey,ODA4OTQwMjQ',
    description: 'Monumentalna kronika Macieja Stryjkowskiego, ważne źródło do dziejów Polski, Litwy i Rusi.',
    author: 'Maciej Stryjkowski',
    year: '1582',
    pages: 800,
    thumbnail: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=400&h=300&fit=crop',
    language: 'Polski',
    category: 'Historia'
  },
];

export function FlipchartViewer() {
  const [selectedFlipchart, setSelectedFlipchart] = useState<FlipchartItem | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'archive' | 'polona'>('all');
  const [showInfo, setShowInfo] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredFlipcharts = flipcharts.filter(f => 
    filter === 'all' || f.source === filter
  );

  // Fullscreen API handling
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

  // Handle fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedFlipchart) return;

      if (e.key === 'Escape') {
        if (isFullscreen) {
          exitFullscreen();
        } else {
          setSelectedFlipchart(null);
        }
      } else if (e.key === 'ArrowLeft') {
        navigatePrev();
      } else if (e.key === 'ArrowRight') {
        navigateNext();
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      } else if (e.key === 'i' || e.key === 'I') {
        setShowInfo(!showInfo);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedFlipchart, isFullscreen, currentIndex, showInfo]);

  const openFlipchart = (flipchart: FlipchartItem) => {
    const index = filteredFlipcharts.findIndex(f => f.id === flipchart.id);
    setCurrentIndex(index);
    setSelectedFlipchart(flipchart);
    setIsLoading(true);
  };

  const navigatePrev = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : filteredFlipcharts.length - 1;
    setCurrentIndex(newIndex);
    setSelectedFlipchart(filteredFlipcharts[newIndex]);
    setIsLoading(true);
  };

  const navigateNext = () => {
    const newIndex = currentIndex < filteredFlipcharts.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(newIndex);
    setSelectedFlipchart(filteredFlipcharts[newIndex]);
    setIsLoading(true);
  };

  const closeFlipchart = () => {
    if (isFullscreen) {
      exitFullscreen();
    }
    setSelectedFlipchart(null);
    setShowInfo(false);
  };

  return (
    <section className="py-24 bg-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center space-x-2 bg-gold-900/20 border border-gold-700/30 rounded-full px-4 py-2 mb-6">
            <BookOpen className="w-4 h-4 text-gold-500" />
            <span className="text-gold-400 text-sm">Biblioteka Cyfrowa</span>
          </div>
          <h2 className="font-cinzel text-4xl sm:text-5xl font-bold text-bronze-100 mb-4">
            Starodruki & <span className="text-gold-500">Manuskrypty</span>
          </h2>
          <p className="text-bronze-400 font-cormorant text-xl italic max-w-2xl mx-auto mb-8">
            Przeglądaj historyczne teksty filozoficzne z Archive.org i Polona.pl
          </p>

          {/* Filter buttons */}
          <div className="flex justify-center gap-3 flex-wrap">
            <button
              onClick={() => setFilter('all')}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                filter === 'all'
                  ? 'bg-gold-600 text-stone-950'
                  : 'bg-stone-800 text-bronze-300 hover:bg-stone-700'
              }`}
            >
              Wszystkie ({flipcharts.length})
            </button>
            <button
              onClick={() => setFilter('archive')}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                filter === 'archive'
                  ? 'bg-blue-600 text-white'
                  : 'bg-stone-800 text-bronze-300 hover:bg-stone-700'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-blue-400"></span>
              Archive.org ({flipcharts.filter(f => f.source === 'archive').length})
            </button>
            <button
              onClick={() => setFilter('polona')}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                filter === 'polona'
                  ? 'bg-red-600 text-white'
                  : 'bg-stone-800 text-bronze-300 hover:bg-stone-700'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-red-400"></span>
              Polona.pl ({flipcharts.filter(f => f.source === 'polona').length})
            </button>
          </div>
        </motion.div>

        {/* Flipchart Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredFlipcharts.map((flipchart, index) => (
            <motion.div
              key={flipchart.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group cursor-pointer"
              onClick={() => openFlipchart(flipchart)}
            >
              <div className="bg-stone-800/50 border border-gold-900/30 rounded-xl overflow-hidden hover:border-gold-700/50 transition-all hover:shadow-xl hover:shadow-gold-900/20 hover:-translate-y-1">
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img
                    src={flipchart.thumbnail}
                    alt={flipchart.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/50 to-transparent" />
                  
                  {/* Source badge */}
                  <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${
                    flipchart.source === 'archive' 
                      ? 'bg-blue-500/90 text-white' 
                      : 'bg-red-500/90 text-white'
                  }`}>
                    {flipchart.source === 'archive' ? 'Archive.org' : 'Polona.pl'}
                  </div>

                  {/* Category badge */}
                  {flipchart.category && (
                    <div className="absolute top-3 right-3 px-2 py-1 rounded bg-stone-950/80 text-xs text-gold-400 backdrop-blur-sm">
                      {flipchart.category}
                    </div>
                  )}

                  {/* Fullscreen indicator on hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-stone-950/80 backdrop-blur-sm p-4 rounded-full">
                      <BookMarked className="w-8 h-8 text-gold-500" />
                    </div>
                  </div>

                  {/* Pages badge */}
                  {flipchart.pages && (
                    <div className="absolute bottom-3 right-3 bg-stone-950/80 backdrop-blur-sm px-2 py-1 rounded text-xs text-bronze-200">
                      {flipchart.pages} stron
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="font-cinzel text-sm text-bronze-100 group-hover:text-gold-400 transition-colors mb-1 line-clamp-2">
                    {flipchart.title}
                  </h3>
                  
                  {flipchart.author && (
                    <p className="text-gold-600 text-xs mb-2">{flipchart.author}</p>
                  )}
                  
                  <div className="flex items-center justify-between text-bronze-500 text-xs">
                    {flipchart.year && <span>{flipchart.year}</span>}
                    {flipchart.language && <span>{flipchart.language}</span>}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Viewer Modal */}
        <AnimatePresence>
          {selectedFlipchart && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[99999] bg-stone-950/98 backdrop-blur-lg flex flex-col"
              ref={containerRef}
            >
              {/* Header */}
              <div className={`flex items-center justify-between p-3 sm:p-4 border-b border-gold-900/30 bg-stone-900/95 ${isFullscreen ? 'px-8' : ''}`}>
                <div className="flex items-center space-x-3 min-w-0 flex-1">
                  <div className={`hidden sm:block px-3 py-1 rounded-full text-xs font-semibold flex-shrink-0 ${
                    selectedFlipchart.source === 'archive' 
                      ? 'bg-blue-500/90 text-white' 
                      : 'bg-red-500/90 text-white'
                  }`}>
                    {selectedFlipchart.source === 'archive' ? 'Archive.org' : 'Polona.pl'}
                  </div>
                  <div className="min-w-0">
                    <h2 className="font-cinzel text-sm sm:text-lg text-bronze-100 truncate">
                      {selectedFlipchart.title}
                    </h2>
                    {selectedFlipchart.author && (
                      <p className="text-gold-500 text-xs sm:text-sm truncate">{selectedFlipchart.author}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
                  {/* Navigation */}
                  <button
                    onClick={navigatePrev}
                    className="p-2 text-bronze-400 hover:text-gold-400 hover:bg-stone-800 rounded-lg transition-colors"
                    title="Poprzedni (←)"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  
                  <span className="text-bronze-500 text-xs sm:text-sm px-1 sm:px-2">
                    {currentIndex + 1} / {filteredFlipcharts.length}
                  </span>
                  
                  <button
                    onClick={navigateNext}
                    className="p-2 text-bronze-400 hover:text-gold-400 hover:bg-stone-800 rounded-lg transition-colors"
                    title="Następny (→)"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  <div className="hidden sm:block w-px h-6 bg-gold-900/30 mx-2" />

                  {/* Info toggle */}
                  <button
                    onClick={() => setShowInfo(!showInfo)}
                    className={`p-2 rounded-lg transition-colors ${
                      showInfo 
                        ? 'text-gold-400 bg-gold-900/30' 
                        : 'text-bronze-400 hover:text-gold-400 hover:bg-stone-800'
                    }`}
                    title="Informacje (I)"
                  >
                    <Info className="w-5 h-5" />
                  </button>

                  {/* External link */}
                  <a
                    href={selectedFlipchart.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-bronze-400 hover:text-gold-400 hover:bg-stone-800 rounded-lg transition-colors"
                    title="Otwórz w nowej karcie"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>

                  {/* Fullscreen toggle */}
                  <button
                    onClick={toggleFullscreen}
                    className="p-2 text-bronze-400 hover:text-gold-400 hover:bg-stone-800 rounded-lg transition-colors"
                    title={isFullscreen ? "Wyjdź z pełnego ekranu (F)" : "Pełny ekran (F)"}
                  >
                    {isFullscreen ? (
                      <Minimize2 className="w-5 h-5" />
                    ) : (
                      <Maximize2 className="w-5 h-5" />
                    )}
                  </button>

                  {/* Close */}
                  <button
                    onClick={closeFlipchart}
                    className="p-2 text-bronze-400 hover:text-red-400 hover:bg-stone-800 rounded-lg transition-colors"
                    title="Zamknij (Esc)"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Main content */}
              <div className="flex-1 flex relative overflow-hidden">
                {/* Iframe Container */}
                <div className={`flex-1 relative ${showInfo ? 'lg:mr-80' : ''}`}>
                  {/* Loading indicator */}
                  {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-stone-950 z-10">
                      <div className="text-center">
                        <Loader2 className="w-12 h-12 text-gold-500 animate-spin mx-auto mb-4" />
                        <p className="text-bronze-400">Ładowanie dokumentu...</p>
                        <p className="text-bronze-600 text-sm mt-1">
                          {selectedFlipchart.source === 'archive' ? 'Archive.org' : 'Polona.pl'}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  <iframe
                    src={selectedFlipchart.embedUrl}
                    title={selectedFlipchart.title}
                    className="w-full h-full border-0"
                    allowFullScreen
                    onLoad={() => setIsLoading(false)}
                  />

                  {/* Side navigation buttons */}
                  <button
                    onClick={navigatePrev}
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-stone-900/80 hover:bg-gold-900/80 text-bronze-200 hover:text-gold-400 rounded-full transition-all shadow-lg backdrop-blur-sm"
                  >
                    <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                  
                  <button
                    onClick={navigateNext}
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-stone-900/80 hover:bg-gold-900/80 text-bronze-200 hover:text-gold-400 rounded-full transition-all shadow-lg backdrop-blur-sm"
                  >
                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                </div>

                {/* Info sidebar */}
                <AnimatePresence>
                  {showInfo && (
                    <motion.div
                      initial={{ x: 320, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: 320, opacity: 0 }}
                      className="absolute lg:relative right-0 top-0 h-full w-80 bg-stone-900 border-l border-gold-900/30 overflow-y-auto z-20"
                    >
                      <div className="p-6">
                        <h3 className="font-cinzel text-xl text-bronze-100 mb-4">
                          {selectedFlipchart.title}
                        </h3>
                        
                        <div className="space-y-4">
                          {selectedFlipchart.author && (
                            <div>
                              <label className="text-bronze-500 text-xs uppercase tracking-wider">Autor</label>
                              <p className="text-gold-400">{selectedFlipchart.author}</p>
                            </div>
                          )}
                          
                          {selectedFlipchart.year && (
                            <div>
                              <label className="text-bronze-500 text-xs uppercase tracking-wider">Rok wydania</label>
                              <p className="text-bronze-200">{selectedFlipchart.year}</p>
                            </div>
                          )}
                          
                          {selectedFlipchart.pages && (
                            <div>
                              <label className="text-bronze-500 text-xs uppercase tracking-wider">Liczba stron</label>
                              <p className="text-bronze-200">{selectedFlipchart.pages}</p>
                            </div>
                          )}
                          
                          {selectedFlipchart.language && (
                            <div>
                              <label className="text-bronze-500 text-xs uppercase tracking-wider">Język</label>
                              <p className="text-bronze-200">{selectedFlipchart.language}</p>
                            </div>
                          )}
                          
                          {selectedFlipchart.category && (
                            <div>
                              <label className="text-bronze-500 text-xs uppercase tracking-wider">Kategoria</label>
                              <p className="text-bronze-200">{selectedFlipchart.category}</p>
                            </div>
                          )}
                          
                          <div>
                            <label className="text-bronze-500 text-xs uppercase tracking-wider">Źródło</label>
                            <p className={selectedFlipchart.source === 'archive' ? 'text-blue-400' : 'text-red-400'}>
                              {selectedFlipchart.source === 'archive' ? 'Internet Archive' : 'Polona.pl'}
                            </p>
                          </div>
                          
                          <div>
                            <label className="text-bronze-500 text-xs uppercase tracking-wider">Opis</label>
                            <p className="text-bronze-300 text-sm leading-relaxed">
                              {selectedFlipchart.description}
                            </p>
                          </div>
                          
                          <a
                            href={selectedFlipchart.externalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full mt-6 px-4 py-3 bg-gold-600 hover:bg-gold-500 text-stone-950 rounded-lg font-semibold transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                            Otwórz w źródle
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Footer - keyboard shortcuts */}
              <div className={`hidden sm:block p-2 border-t border-gold-900/30 bg-stone-900/95 ${isFullscreen ? 'px-8' : ''}`}>
                <div className="flex items-center justify-center gap-6 text-bronze-600 text-xs">
                  <span>← → Nawigacja</span>
                  <span>F Pełny ekran</span>
                  <span>I Informacje</span>
                  <span>Esc Zamknij</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
