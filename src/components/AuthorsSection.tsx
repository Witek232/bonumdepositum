import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, Quote } from 'lucide-react';

const authors = [
  {
    id: 'platon',
    name: 'Platon',
    dates: '427-347 p.n.e.',
    image: 'https://images.unsplash.com/photo-1589656966895-2f33e7653819?w=400&h=400&fit=crop',
    quote: 'Poznanie piękna jest drogą do poznania dobra.',
    field: 'Założyciel Akademii Ateńskiej',
    articles: 12
  },
  {
    id: 'arystoteles',
    name: 'Arystoteles',
    dates: '384-322 p.n.e.',
    image: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=400&h=400&fit=crop',
    quote: 'Cnota jest usposobieniem do wybierania środka.',
    field: 'Filozof ze Stagiry',
    articles: 18
  },
  {
    id: 'augustyn',
    name: 'Św. Augustyn',
    dates: '354-430',
    image: 'https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?w=400&h=400&fit=crop',
    quote: 'Niespokojne jest serce nasze, dopóki nie spocznie w Tobie.',
    field: 'Doktor Kościoła',
    articles: 15
  },
  {
    id: 'tomasz',
    name: 'Św. Tomasz z Akwinu',
    dates: '1225-1274',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    quote: 'Byt i dobro są zamienne.',
    field: 'Doctor Angelicus',
    articles: 24
  },
];

export function AuthorsSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-stone-950 to-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-cinzel text-4xl sm:text-5xl font-bold text-bronze-100 mb-4">
            Wielcy <span className="text-gold-500">Filozofowie</span>
          </h2>
          <p className="text-bronze-400 font-cormorant text-xl italic max-w-2xl mx-auto">
            Poznaj myślicieli, którzy ukształtowali naszą cywilizację
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {authors.map((author, index) => (
            <motion.div
              key={author.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={`/autorzy/${author.id}`} className="group block">
                <div className="relative">
                  {/* Image with golden frame effect */}
                  <div className="relative w-48 h-48 mx-auto mb-6">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold-500 to-bronze-600 p-1">
                      <div className="w-full h-full rounded-full overflow-hidden bg-stone-900">
                        <img
                          src={author.image}
                          alt={author.name}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        />
                      </div>
                    </div>
                    {/* Glow effect */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold-500/30 to-bronze-600/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <div className="text-center">
                    <h3 className="font-cinzel text-xl text-bronze-100 group-hover:text-gold-400 transition-colors">
                      {author.name}
                    </h3>
                    <p className="text-bronze-500 text-sm mb-2">{author.dates}</p>
                    <p className="text-gold-600 text-sm font-medium mb-4">{author.field}</p>
                    
                    {/* Quote */}
                    <div className="relative bg-stone-800/50 rounded-lg p-4 border border-gold-900/20">
                      <Quote className="absolute -top-2 -left-2 w-6 h-6 text-gold-500/50" />
                      <p className="text-bronze-400 text-sm italic font-cormorant">
                        "{author.quote}"
                      </p>
                    </div>

                    {/* Articles count */}
                    <div className="mt-4 flex items-center justify-center space-x-2 text-bronze-500 text-sm">
                      <BookOpen className="w-4 h-4 text-gold-600" />
                      <span>{author.articles} artykułów</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
