import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, User, Clock, Tag, Search, Filter } from 'lucide-react';
import { useState } from 'react';

const allPosts = [
  {
    id: 1,
    title: 'Czy metafizyka jest nadal potrzebna współczesnemu człowiekowi?',
    excerpt: 'Rozważania nad aktualością klasycznej metafizyki w świecie zdominowanym przez nauki przyrodnicze i technologię.',
    author: 'Dr Jan Kowalski',
    date: '15 grudnia 2024',
    readTime: '8 min',
    category: 'Metafizyka',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=500&fit=crop',
  },
  {
    id: 2,
    title: 'Pięć dróg św. Tomasza - analiza pierwszej drogi',
    excerpt: 'Szczegółowa analiza argumentu z ruchu i jego współczesne interpretacje w kontekście fizyki i kosmologii.',
    author: 'Prof. Anna Nowak',
    date: '12 grudnia 2024',
    readTime: '12 min',
    category: 'Tomizm',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=500&fit=crop',
  },
  {
    id: 3,
    title: 'Etyka cnót Arystotelesa a współczesna psychologia pozytywna',
    excerpt: 'Porównanie starożytnej koncepcji eudajmonii z najnowszymi badaniami nad szczęściem i dobrostanem.',
    author: 'Dr Maria Wiśniewska',
    date: '10 grudnia 2024',
    readTime: '10 min',
    category: 'Etyka',
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&h=500&fit=crop',
  },
  {
    id: 4,
    title: 'Platońska teoria idei w świetle współczesnej filozofii matematyki',
    excerpt: 'Czy matematyczne przedmioty istnieją niezależnie od umysłu? Platonizm matematyczny we współczesnej debacie.',
    author: 'Dr Piotr Zieliński',
    date: '8 grudnia 2024',
    readTime: '15 min',
    category: 'Platonizm',
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&h=500&fit=crop',
  },
  {
    id: 5,
    title: 'Wolna wola i determinizm - problem filozoficzny',
    excerpt: 'Czy nasze wybory są naprawdę wolne? Przegląd stanowisk filozoficznych od starożytności po współczesność.',
    author: 'Prof. Tomasz Adamski',
    date: '5 grudnia 2024',
    readTime: '14 min',
    category: 'Metafizyka',
    image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&h=500&fit=crop',
  },
  {
    id: 6,
    title: 'Substancja i przypadłość w metafizyce Arystotelesa',
    excerpt: 'Analiza fundamentalnych kategorii bytu w systemie arystotelesowskim.',
    author: 'Dr hab. Ewa Malinowska',
    date: '1 grudnia 2024',
    readTime: '11 min',
    category: 'Arystotelizm',
    image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800&h=500&fit=crop',
  },
];

const categories = ['Wszystkie', 'Metafizyka', 'Tomizm', 'Etyka', 'Platonizm', 'Arystotelizm', 'Logika'];

export function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('Wszystkie');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = allPosts.filter(post => {
    const matchesCategory = activeCategory === 'Wszystkie' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
            <h1 className="font-cinzel text-4xl sm:text-5xl lg:text-6xl font-bold text-bronze-100 mb-4">
              Blog <span className="text-gold-500">Filozoficzny</span>
            </h1>
            <p className="text-bronze-400 font-cormorant text-xl italic max-w-2xl mx-auto">
              Artykuły, eseje i refleksje nad odwieczną mądrością
            </p>
          </motion.div>

          {/* Search and Filter */}
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
                placeholder="Szukaj artykułów..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-stone-800/50 border border-gold-900/30 rounded-xl pl-12 pr-4 py-4 text-bronze-200 placeholder:text-bronze-600 focus:outline-none focus:border-gold-600 transition-colors"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap items-center gap-3">
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
            </div>
          </motion.div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16 bg-stone-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/blog/${post.id}`} className="group block h-full">
                  <article className="h-full bg-stone-800/30 border border-gold-900/30 rounded-xl overflow-hidden hover:border-gold-700/50 transition-all flex flex-col">
                    <div className="relative overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <span className="bg-gold-500 text-stone-950 px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
                          <Tag className="w-3 h-3" />
                          <span>{post.category}</span>
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h2 className="font-cinzel text-xl text-bronze-100 group-hover:text-gold-400 transition-colors mb-3">
                        {post.title}
                      </h2>
                      <p className="text-bronze-500 text-sm mb-6 flex-grow">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-bronze-600 text-xs border-t border-gold-900/20 pt-4">
                        <span className="flex items-center space-x-1">
                          <User className="w-3 h-3" />
                          <span>{post.author}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{post.date}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{post.readTime}</span>
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-bronze-500 text-lg">Nie znaleziono artykułów spełniających kryteria.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
