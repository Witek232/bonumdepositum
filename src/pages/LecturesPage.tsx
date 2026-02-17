import { motion } from 'framer-motion';
import { Play, Clock, Eye, Filter, BookOpen, Video } from 'lucide-react';
import { useState } from 'react';

const lectures = [
  {
    id: 1,
    title: 'Wprowadzenie do metafizyki św. Tomasza z Akwinu',
    description: 'Kompletny kurs wprowadzający do metafizyki tomistycznej, obejmujący podstawowe pojęcia i zasady.',
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=450&fit=crop',
    duration: '45:20',
    views: '2.3k',
    category: 'Tomizm',
    lecturer: 'Dr Jan Kowalski',
    videoId: 'dQw4w9WgXcQ'
  },
  {
    id: 2,
    title: 'Etyka cnót w filozofii Arystotelesa',
    description: 'Dogłębna analiza koncepcji cnoty, szczęścia i doskonałości moralnej w etyce Stagiryty.',
    thumbnail: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=450&fit=crop',
    duration: '38:15',
    views: '1.8k',
    category: 'Etyka',
    lecturer: 'Prof. Anna Nowak',
    videoId: 'dQw4w9WgXcQ'
  },
  {
    id: 3,
    title: 'Platońska teoria idei - wykład wprowadzający',
    description: 'Przedstawienie fundamentów platońskiej metafizyki i epistemologii.',
    thumbnail: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&h=450&fit=crop',
    duration: '52:40',
    views: '3.1k',
    category: 'Platonizm',
    lecturer: 'Dr Maria Wiśniewska',
    videoId: 'dQw4w9WgXcQ'
  },
  {
    id: 4,
    title: 'Pięć dróg św. Tomasza - szczegółowa analiza',
    description: 'Systematyczna prezentacja i obrona pięciu argumentów za istnieniem Boga.',
    thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&h=450&fit=crop',
    duration: '1:15:30',
    views: '4.2k',
    category: 'Tomizm',
    lecturer: 'Prof. Tomasz Adamski',
    videoId: 'dQw4w9WgXcQ'
  },
  {
    id: 5,
    title: 'Logika arystotelesowska - sylogistyka',
    description: 'Wprowadzenie do klasycznej logiki formalnej i teorii sylogizmów.',
    thumbnail: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&h=450&fit=crop',
    duration: '42:10',
    views: '1.5k',
    category: 'Logika',
    lecturer: 'Dr hab. Ewa Malinowska',
    videoId: 'dQw4w9WgXcQ'
  },
  {
    id: 6,
    title: 'Epistemologia tomistyczna - realizm poznawczy',
    description: 'Obrona realizmu epistemologicznego w tradycji tomistycznej.',
    thumbnail: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800&h=450&fit=crop',
    duration: '55:45',
    views: '2.1k',
    category: 'Epistemologia',
    lecturer: 'Dr Piotr Zieliński',
    videoId: 'dQw4w9WgXcQ'
  },
];

const categories = ['Wszystkie', 'Tomizm', 'Etyka', 'Platonizm', 'Logika', 'Epistemologia', 'Metafizyka'];

export function LecturesPage() {
  const [activeCategory, setActiveCategory] = useState('Wszystkie');
  const [selectedLecture, setSelectedLecture] = useState<typeof lectures[0] | null>(null);

  const filteredLectures = activeCategory === 'Wszystkie' 
    ? lectures 
    : lectures.filter(l => l.category === activeCategory);

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
              <Video className="w-4 h-4 text-gold-500" />
              <span className="text-gold-400 text-sm">Materiały video</span>
            </div>
            <h1 className="font-cinzel text-4xl sm:text-5xl lg:text-6xl font-bold text-bronze-100 mb-4">
              Wykłady <span className="text-gold-500">Filozoficzne</span>
            </h1>
            <p className="text-bronze-400 font-cormorant text-xl italic max-w-2xl mx-auto">
              Nagrane prezentacje naszych ekspertów - ucz się w swoim tempie
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            <Filter className="w-5 h-5 text-bronze-500" />
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category
                    ? 'bg-gold-500 text-stone-950'
                    : 'bg-stone-800/50 text-bronze-400 hover:text-gold-400 border border-gold-900/30 hover:border-gold-700/50'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Selected Lecture Player */}
      {selectedLecture && (
        <section className="py-8 bg-stone-900">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-stone-800/50 border border-gold-900/30 rounded-2xl overflow-hidden"
            >
              <div className="aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${selectedLecture.videoId}?autoplay=1`}
                  title={selectedLecture.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <div className="p-6">
                <span className="bg-gold-500 text-stone-950 px-3 py-1 rounded-full text-xs font-semibold">
                  {selectedLecture.category}
                </span>
                <h2 className="font-cinzel text-2xl text-bronze-100 mt-3 mb-2">
                  {selectedLecture.title}
                </h2>
                <p className="text-bronze-400 mb-4">{selectedLecture.description}</p>
                <div className="flex items-center space-x-4 text-bronze-500 text-sm">
                  <span className="flex items-center space-x-1">
                    <BookOpen className="w-4 h-4" />
                    <span>{selectedLecture.lecturer}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{selectedLecture.duration}</span>
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Lectures Grid */}
      <section className="py-16 bg-stone-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredLectures.map((lecture, index) => (
              <motion.div
                key={lecture.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => setSelectedLecture(lecture)}
              >
                <div className="relative overflow-hidden rounded-xl mb-4">
                  <img
                    src={lecture.thumbnail}
                    alt={lecture.title}
                    className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
                  
                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-gold-500/90 flex items-center justify-center group-hover:scale-110 group-hover:bg-gold-400 transition-all shadow-lg shadow-gold-500/30">
                      <Play className="w-6 h-6 text-stone-950 ml-1" fill="currentColor" />
                    </div>
                  </div>

                  {/* Duration badge */}
                  <div className="absolute bottom-3 right-3 bg-stone-950/80 px-2 py-1 rounded text-xs text-bronze-200 flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{lecture.duration}</span>
                  </div>

                  {/* Category badge */}
                  <div className="absolute top-3 left-3 bg-gold-500/90 px-3 py-1 rounded-full text-xs text-stone-950 font-semibold">
                    {lecture.category}
                  </div>
                </div>

                <h3 className="font-cinzel text-lg text-bronze-100 group-hover:text-gold-400 transition-colors mb-2">
                  {lecture.title}
                </h3>
                
                <p className="text-bronze-500 text-sm mb-3 line-clamp-2">
                  {lecture.description}
                </p>
                
                <div className="flex items-center justify-between text-bronze-600 text-xs">
                  <span>{lecture.lecturer}</span>
                  <span className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{lecture.views} wyświetleń</span>
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredLectures.length === 0 && (
            <div className="text-center py-16">
              <p className="text-bronze-500 text-lg">Brak wykładów w tej kategorii.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
