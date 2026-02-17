import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { BookOpen, Users, Video, FileText, ArrowRight } from 'lucide-react';

const categoryData: Record<string, {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  keyTopics: string[];
  relatedAuthors: string[];
  articleCount: number;
  videoCount: number;
}> = {
  'metafizyka': {
    title: 'Metafizyka',
    subtitle: 'Nauka o bycie jako takim',
    description: 'Metafizyka jest fundamentalną gałęzią filozofii, zajmującą się badaniem natury rzeczywistości, bytu, istnienia i podstawowych struktur świata. Arystoteles nazwał ją "filozofią pierwszą", ponieważ bada ona zasady, które są założone przez wszystkie inne nauki.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=600&fit=crop',
    keyTopics: ['Byt i nicość', 'Substancja i przypadłość', 'Akt i możność', 'Przyczynowość', 'Czas i przestrzeń', 'Uniwersalia'],
    relatedAuthors: ['Arystoteles', 'Św. Tomasz z Akwinu', 'Platon', 'Leibniz'],
    articleCount: 24,
    videoCount: 8
  },
  'etyka': {
    title: 'Etyka',
    subtitle: 'Filozofia moralna',
    description: 'Etyka bada fundamentalne pytania o dobro i zło, słuszność i niesłuszność działania, cnoty i wady charakteru. Klasyczna etyka cnót, zapoczątkowana przez Arystotelesa, koncentruje się na pytaniu "jak żyć dobrze" i rozwoju doskonałości moralnej.',
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1200&h=600&fit=crop',
    keyTopics: ['Etyka cnót', 'Prawo naturalne', 'Sumienie', 'Wolna wola', 'Szczęście (eudajmonia)', 'Sprawiedliwość'],
    relatedAuthors: ['Arystoteles', 'Św. Tomasz z Akwinu', 'Seneka', 'MacIntyre'],
    articleCount: 18,
    videoCount: 6
  },
  'tomizm': {
    title: 'Tomizm',
    subtitle: 'Filozofia św. Tomasza z Akwinu',
    description: 'Tomizm jest szkołą filozoficzną opartą na nauczaniu św. Tomasza z Akwinu (1225-1274). Łączy on filozofię arystotelesowską z teologią chrześcijańską, tworząc spójny system metafizyczny, epistemologiczny i etyczny.',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&h=600&fit=crop',
    keyTopics: ['Pięć dróg', 'Akt i możność', 'Esse i essentia', 'Analogia bytu', 'Prawo naturalne', 'Teologia naturalna'],
    relatedAuthors: ['Św. Tomasz z Akwinu', 'Garrigou-Lagrange', 'Gilson', 'Maritain'],
    articleCount: 32,
    videoCount: 12
  },
  'platonizm': {
    title: 'Platonizm',
    subtitle: 'Dziedzictwo Platona',
    description: 'Platonizm to tradycja filozoficzna wywodząca się od Platona, koncentrująca się na teorii idei (form), hierarchicznej strukturze rzeczywistości i dążeniu duszy do poznania prawdy, dobra i piękna.',
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1200&h=600&fit=crop',
    keyTopics: ['Teoria idei', 'Alegoria jaskini', 'Nieśmiertelność duszy', 'Anamneza', 'Piękno', 'Dialektyka'],
    relatedAuthors: ['Platon', 'Plotyn', 'Św. Augustyn', 'Proklos'],
    articleCount: 21,
    videoCount: 7
  },
  'epistemologia': {
    title: 'Epistemologia',
    subtitle: 'Teoria poznania',
    description: 'Epistemologia bada naturę wiedzy, jej źródła, granice i uzasadnienie. Analizuje pytania o to, czym jest prawda, jak możemy ją poznać i jakie są kryteria odróżnienia wiedzy od mniemania.',
    image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=1200&h=600&fit=crop',
    keyTopics: ['Natura wiedzy', 'Źródła poznania', 'Sceptycyzm', 'Realizm', 'Prawda', 'Pewność'],
    relatedAuthors: ['Platon', 'Arystoteles', 'Św. Tomasz z Akwinu', 'Descartes'],
    articleCount: 15,
    videoCount: 5
  },
  'logika': {
    title: 'Logika',
    subtitle: 'Sztuka myślenia',
    description: 'Logika jest nauką o poprawnym rozumowaniu. Bada strukturę argumentów, zasady wnioskowania i warunki prawdziwości sądów. Arystoteles, twórca logiki formalnej, nazywał ją "organon" - narzędziem myślenia.',
    image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=1200&h=600&fit=crop',
    keyTopics: ['Sylogistyka', 'Definicja', 'Podział', 'Błędy logiczne', 'Dowodzenie', 'Logika modalna'],
    relatedAuthors: ['Arystoteles', 'Św. Tomasz z Akwinu', 'Bocheński', 'Łukasiewicz'],
    articleCount: 12,
    videoCount: 4
  }
};

export function CategoryPage() {
  const { slug } = useParams();
  const category = categoryData[slug || 'metafizyka'];

  if (!category) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-cinzel text-3xl text-bronze-100 mb-4">Kategoria nie znaleziona</h1>
          <Link to="/" className="text-gold-500 hover:text-gold-400">
            Wróć do strony głównej
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen">
      {/* Hero */}
      <section className="relative py-24">
        <div className="absolute inset-0">
          <img
            src={category.image}
            alt={category.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/90 to-stone-950/70" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl"
          >
            <h1 className="font-cinzel text-5xl sm:text-6xl font-bold text-bronze-100 mb-4">
              {category.title}
            </h1>
            <p className="font-cormorant text-2xl text-gold-500 italic mb-6">
              {category.subtitle}
            </p>
            <p className="text-bronze-300 text-lg leading-relaxed">
              {category.description}
            </p>

            {/* Stats */}
            <div className="flex items-center space-x-8 mt-8">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-gold-500" />
                <span className="text-bronze-200">{category.articleCount} artykułów</span>
              </div>
              <div className="flex items-center space-x-2">
                <Video className="w-5 h-5 text-gold-500" />
                <span className="text-bronze-200">{category.videoCount} wykładów</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-stone-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Key Topics */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h2 className="font-cinzel text-2xl text-bronze-100 mb-6 flex items-center space-x-2">
                  <FileText className="w-6 h-6 text-gold-500" />
                  <span>Kluczowe zagadnienia</span>
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {category.keyTopics.map((topic) => (
                    <div
                      key={topic}
                      className="bg-stone-900/50 border border-gold-900/30 rounded-xl p-4 hover:border-gold-700/50 transition-all cursor-pointer group"
                    >
                      <p className="text-bronze-200 group-hover:text-gold-400 transition-colors">
                        {topic}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Sample Articles */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="font-cinzel text-2xl text-bronze-100 mb-6 flex items-center space-x-2">
                  <BookOpen className="w-6 h-6 text-gold-500" />
                  <span>Najnowsze artykuły</span>
                </h2>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <Link
                      key={i}
                      to={`/blog/${i}`}
                      className="block bg-stone-900/50 border border-gold-900/30 rounded-xl p-6 hover:border-gold-700/50 transition-all group"
                    >
                      <h3 className="font-cinzel text-lg text-bronze-100 group-hover:text-gold-400 transition-colors mb-2">
                        Przykładowy artykuł o {category.title.toLowerCase()} #{i}
                      </h3>
                      <p className="text-bronze-500 text-sm">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
                      </p>
                      <div className="flex items-center space-x-2 mt-4 text-gold-500 text-sm">
                        <span>Czytaj więcej</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Related Authors */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-stone-900/50 border border-gold-900/30 rounded-xl p-6"
              >
                <h3 className="font-cinzel text-xl text-bronze-100 mb-4 flex items-center space-x-2">
                  <Users className="w-5 h-5 text-gold-500" />
                  <span>Powiązani autorzy</span>
                </h3>
                <div className="space-y-3">
                  {category.relatedAuthors.map((author) => (
                    <Link
                      key={author}
                      to={`/autorzy/${author.toLowerCase().replace(' ', '-')}`}
                      className="flex items-center space-x-3 p-2 rounded-lg hover:bg-stone-800/50 transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-500 to-bronze-600 flex items-center justify-center">
                        <span className="text-stone-950 font-semibold text-sm">
                          {author.charAt(0)}
                        </span>
                      </div>
                      <span className="text-bronze-300 group-hover:text-gold-400 transition-colors">
                        {author}
                      </span>
                    </Link>
                  ))}
                </div>
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-br from-gold-900/30 to-bronze-900/30 border border-gold-700/30 rounded-xl p-6"
              >
                <h3 className="font-cinzel text-xl text-bronze-100 mb-3">
                  Chcesz pogłębić wiedzę?
                </h3>
                <p className="text-bronze-400 text-sm mb-4">
                  Zapisz się na nasz kurs wprowadzający do {category.title.toLowerCase()}.
                </p>
                <Link
                  to="/kursy"
                  className="inline-flex items-center space-x-2 bg-gold-500 hover:bg-gold-400 text-stone-950 font-semibold py-2 px-4 rounded-lg transition-colors text-sm"
                >
                  <span>Zobacz kursy</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
