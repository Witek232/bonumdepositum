import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight, Clock, Tag } from 'lucide-react';

export const blogPosts = [
  {
    id: 1,
    title: 'Czy metafizyka jest nadal potrzebna współczesnemu człowiekowi?',
    excerpt: 'Rozważania nad aktualością klasycznej metafizyki w świecie zdominowanym przez nauki przyrodnicze i technologię.',
    author: 'Dr Jan Kowalski',
    date: '15 grudnia 2024',
    readTime: '8 min',
    category: 'Metafizyka',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=500&fit=crop',
    featured: true
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
    featured: false
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
    featured: false
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
    featured: false
  },
];

export function BlogSection() {
  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <section className="py-24 bg-gradient-to-b from-stone-900 to-stone-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-cinzel text-4xl sm:text-5xl font-bold text-bronze-100 mb-4">
            Najnowsze <span className="text-gold-500">Artykuły</span>
          </h2>
          <p className="text-bronze-400 font-cormorant text-xl italic max-w-2xl mx-auto">
            Głębokie analizy, eseje i refleksje nad odwieczną mądrością
          </p>
        </motion.div>

        {/* Featured Post */}
        {featuredPost && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <Link to={`/blog/${featuredPost.id}`} className="group block">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-stone-800/30 border border-gold-900/30 rounded-2xl overflow-hidden hover:border-gold-700/50 transition-all">
                <div className="relative overflow-hidden">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover min-h-[300px] group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-gold-500 text-stone-950 px-3 py-1 rounded-full text-xs font-semibold">
                    Polecany
                  </div>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="bg-gold-900/30 text-gold-400 px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                      <Tag className="w-3 h-3" />
                      <span>{featuredPost.category}</span>
                    </span>
                  </div>
                  <h3 className="font-cinzel text-2xl lg:text-3xl text-bronze-100 group-hover:text-gold-400 transition-colors mb-4">
                    {featuredPost.title}
                  </h3>
                  <p className="text-bronze-400 mb-6 font-cormorant text-lg">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-bronze-500 text-sm">
                      <span className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{featuredPost.author}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{featuredPost.date}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{featuredPost.readTime}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Regular Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={`/blog/${post.id}`} className="group block h-full">
                <article className="h-full bg-stone-800/30 border border-gold-900/30 rounded-xl overflow-hidden hover:border-gold-700/50 transition-all flex flex-col">
                  <div className="relative overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <span className="bg-gold-900/80 text-gold-300 px-2 py-1 rounded text-xs font-medium">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="font-cinzel text-lg text-bronze-100 group-hover:text-gold-400 transition-colors mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-bronze-500 text-sm mb-4 line-clamp-2 flex-grow">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-bronze-600 text-xs">
                      <span className="flex items-center space-x-1">
                        <User className="w-3 h-3" />
                        <span>{post.author}</span>
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

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            to="/blog"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-gold-600/20 to-bronze-600/20 hover:from-gold-600/30 hover:to-bronze-600/30 border border-gold-700/30 text-gold-400 font-semibold py-3 px-8 rounded-xl transition-all"
          >
            <span>Zobacz wszystkie artykuły</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
