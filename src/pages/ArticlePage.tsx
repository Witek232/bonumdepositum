import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { Calendar, User, Clock, Tag, ArrowLeft, Share2, Bookmark, Heart, BookOpen } from 'lucide-react';
import TextToSpeech from '../components/TextToSpeech';
import { EmbeddedFlipchart } from '../components/EmbeddedFlipchart';

const articles: Record<number, {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorBio: string;
  authorImage: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  tags: string[];
}> = {
  1: {
    id: 1,
    title: 'Czy metafizyka jest nadal potrzebna współczesnemu człowiekowi?',
    excerpt: 'Rozważania nad aktualością klasycznej metafizyki w świecie zdominowanym przez nauki przyrodnicze i technologię.',
    content: `
Metafizyka, ta królowa nauk filozoficznych, wydaje się dziś wielu osobom dziedziną archaiczną, pozostałością dawnych czasów, gdy ludzkość nie dysponowała jeszcze narzędziami nauk przyrodniczych. Czy słusznie?

Współczesny człowiek, zanurzony w świecie technologii i natychmiastowej gratyfikacji, rzadko zatrzymuje się, by zadać sobie fundamentalne pytania o naturę rzeczywistości. Kim jestem? Dlaczego istnieje raczej coś niż nic? Czy moje życie ma jakikolwiek sens wykraczający poza biologiczne przetrwanie?

Te pytania, choć mogą wydawać się abstrakcyjne, mają bezpośredni wpływ na nasze codzienne życie. Sposób, w jaki na nie odpowiadamy – świadomie lub nieświadomie – kształtuje nasze wartości, decyzje i relacje z innymi.

Arystoteles definiował metafizykę jako naukę o bycie jako takim. Nie interesował się ona poszczególnymi przedmiotami czy zjawiskami, lecz tym, co sprawia, że cokolwiek w ogóle istnieje. To pytanie, które nauki szczegółowe z założenia pomijają, koncentrując się na badaniu konkretnych aspektów rzeczywistości.

Fizyka może nam powiedzieć, jak zachowują się cząstki elementarne, ale nie odpowie na pytanie, dlaczego w ogóle istnieją cząstki, materia, energia – dlaczego istnieje cokolwiek. To pytanie wymaga innego rodzaju refleksji, refleksji metafizycznej.

Święty Tomasz z Akwinu, kontynuując tradycję arystotelesowską, rozwinął koncepcję metafizyki jako nauki o esse – o akcie istnienia. Dla Tomasza istnienie nie jest czymś oczywistym, co można przyjąć bez zastanowienia. Przeciwnie, jest to najbardziej fundamentalna i zarazem najbardziej tajemnicza rzeczywistość, którą napotykamy.

We współczesnym świecie obserwujemy paradoksalne zjawisko. Z jednej strony nauki przyrodnicze osiągają coraz większe sukcesy w wyjaśnianiu mechanizmów funkcjonowania świata. Z drugiej strony, wiele osób doświadcza głębokiego poczucia bezsensu i pustki egzystencjalnej. Czy te dwa zjawiska są ze sobą powiązane?

Być może właśnie dlatego, że zrezygnowaliśmy z metafizyki, z głębszej refleksji nad fundamentami rzeczywistości, czujemy się zagubieni. Nauki szczegółowe, przy całej swojej użyteczności, nie są w stanie odpowiedzieć na pytania o sens i cel ludzkiego istnienia.

Metafizyka nie jest przeciwnikiem nauki. Jest raczej jej dopełnieniem, refleksją, która nadaje sens naukowym odkryciom, umieszczając je w szerszym kontekście ludzkiego doświadczenia i poszukiwania prawdy.

Czy metafizyka jest potrzebna współczesnemu człowiekowi? Odpowiedź brzmi: bardziej niż kiedykolwiek. W świecie nadmiaru informacji i bodźców, potrzebujemy punktu odniesienia, fundamentu, który pozwoli nam zrozumieć, kim jesteśmy i dokąd zmierzamy. Metafizyka oferuje nam właśnie taki fundament.
    `,
    author: 'Dr Jan Kowalski',
    authorBio: 'Doktor filozofii, specjalizuje się w metafizyce klasycznej i filozofii św. Tomasza z Akwinu. Wykładowca na Uniwersytecie Warszawskim.',
    authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    date: '15 grudnia 2024',
    readTime: '8 min',
    category: 'Metafizyka',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=600&fit=crop',
    tags: ['metafizyka', 'filozofia', 'Arystoteles', 'św. Tomasz', 'sens życia'],
  },
  2: {
    id: 2,
    title: 'Pięć dróg św. Tomasza - analiza pierwszej drogi',
    excerpt: 'Szczegółowa analiza argumentu z ruchu i jego współczesne interpretacje w kontekście fizyki i kosmologii.',
    content: `
Święty Tomasz z Akwinu w swojej Sumie Teologicznej przedstawił pięć dróg, czyli pięć argumentów za istnieniem Boga. Pierwsza z nich, znana jako argument z ruchu, jest jednocześnie najprostsza i najczęściej dyskutowana.

Argument rozpoczyna się od prostej obserwacji: rzeczy w świecie się poruszają, zmieniają. To, co potencjalne, przechodzi do aktu. Zimna woda staje się gorąca, nasiono staje się drzewem, człowiek przechodzi ze stanu niewiedzy do stanu wiedzy.

Tomasz zauważa, że nic nie może być jednocześnie w potencji i w akcie pod tym samym względem. Woda nie może być jednocześnie zimna i gorąca. To, co jest zimne, może stać się gorące tylko dzięki czemuś, co jest aktualnie gorące.

Stąd wynika pierwsza przesłanka: wszystko, co się porusza, jest poruszane przez coś innego. Nic nie może samo siebie poruszyć, samo sobie nadać ruchu czy zmiany.

Druga przesłanka dotyczy niemożliwości nieskończonego cofania się w szeregu przyczyn ruchu. Jeśli każdy poruszyciel jest poruszany przez innego, a ten przez jeszcze innego, musimy ostatecznie dotrzeć do pierwszego poruszyciela, który sam nie jest przez nic poruszany.

Tego pierwszego nieporuszonego poruszyciela wszyscy nazywają Bogiem.

Argument ten bywa często źle rozumiany. Nie chodzi tu o czasowy początek wszechświata, o pierwszą przyczynę w sensie chronologicznym. Tomasz nie twierdzi, że Bóg jest potrzebny tylko do wyjaśnienia początku świata.

Chodzi raczej o hierarchię przyczyn w każdym momencie istnienia. W każdej chwili rzeczy istnieją i się zmieniają. W każdej chwili potrzebują fundamentu swojego istnienia i zmiany. Ten fundament ostatecznie musi być czymś, co samo jest czystym aktem, bez żadnej potencjalności.

Współczesna fizyka, zwłaszcza kosmologia, często przywoływana jest jako kontrargument wobec rozumowania Tomasza. Skoro znamy prawa fizyki rządzące ruchem, czy potrzebujemy jeszcze pierwszego poruszyciela?

To jednak nieporozumienie. Prawa fizyki opisują regularności w zachowaniu materii, ale same nie wyjaśniają, dlaczego te regularności istnieją, dlaczego istnieje materia, która się im podporządkowuje, ani dlaczego w ogóle istnieją jakiekolwiek prawa.

Pierwsza droga nie jest argumentem z luk w naukowym wyjaśnieniu. Jest raczej argumentem metafizycznym, dotyczącym fundamentalnej struktury rzeczywistości, która leży u podstaw wszystkich naukowych wyjaśnień.

Krytyka argumentu z ruchu ma długą historię. David Hume kwestionował samą zasadę przyczynowości. Immanuel Kant twierdził, że argument ten wykracza poza granice możliwego doświadczenia. Współcześni filozofowie podają w wątpliwość niektóre przesłanki Tomasza.

Mimo to argument z ruchu pozostaje żywy w filozoficznej debacie. Dla wielu myślicieli stanowi punkt wyjścia do głębszej refleksji nad naturą rzeczywistości i możliwością poznania Absolutu.
    `,
    author: 'Prof. Anna Nowak',
    authorBio: 'Profesor filozofii na Katolickim Uniwersytecie Lubelskim, autorka licznych publikacji z zakresu tomizmu i filozofii religii.',
    authorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face',
    date: '12 grudnia 2024',
    readTime: '12 min',
    category: 'Tomizm',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&h=600&fit=crop',
    tags: ['tomizm', 'teologia naturalna', 'pięć dróg', 'Bóg', 'pierwszy poruszyciel'],
  },
  3: {
    id: 3,
    title: 'Etyka cnót Arystotelesa a współczesna psychologia pozytywna',
    excerpt: 'Porównanie starożytnej koncepcji eudajmonii z najnowszymi badaniami nad szczęściem i dobrostanem.',
    content: `
Etyka cnót Arystotelesa, sformułowana ponad dwa tysiące lat temu, przeżywa obecnie prawdziwy renesans. Co ciekawe, współczesna psychologia pozytywna, dziedzina ukształtowana na przełomie XX i XXI wieku, w wielu punktach zbiega się z intuicjami starożytnego filozofa.

Arystoteles twierdził, że celem ludzkiego życia jest eudajmonia – słowo często tłumaczone jako szczęście, choć lepszym przekładem byłoby rozkwit lub pełnia życia. Eudajmonia to nie chwilowa przyjemność czy dobre samopoczucie, lecz trwała doskonałość w byciu człowiekiem.

Kluczem do osiągnięcia eudajmonii są cnoty, czyli trwałe dyspozycje charakteru, które umożliwiają nam działanie doskonałe. Cnoty nabywamy przez praktykę – stajemy się sprawiedliwi, czyniąc sprawiedliwe uczynki, odważni przez odważne działanie.

Martin Seligman, jeden z twórców psychologii pozytywnej, początkowo koncentrował się na badaniu szczęścia rozumianego jako pozytywne emocje. Z czasem jednak doszedł do przekonania, że samo szczęście w tym sensie jest niewystarczające. W swojej teorii PERMA zaproponował pięć elementów dobrostanu: pozytywne emocje, zaangażowanie, relacje, sens i osiągnięcia.

Zauważmy podobieństwo do Arystotelesa. Szczęście nie jest prostym hedonizmem, lecz złożonym fenomenem obejmującym różne aspekty ludzkiego życia. Co więcej, Seligman i jego współpracownicy opracowali katalog dwudziestu czterech cnót i sił charakteru, które przyczyniają się do rozkwitu jednostki i społeczeństwa.

Badania empiryczne potwierdzają wiele intuicji Arystotelesa. Osoby, które kultywują cnoty takie jak wdzięczność, życzliwość czy nadzieję, doświadczają wyższego poziomu dobrostanu. Ale relacja jest dwustronna – praktykowanie cnót prowadzi do dobrostanu, a dobrostan ułatwia praktykowanie cnót.

Arystoteles podkreślał również rolę relacji międzyludzkich w osiąganiu eudajmonii. Człowiek jest z natury istotą społeczną, a przyjaźń jest jedną z najwyższych form ludzkiego spełnienia. Współczesne badania w pełni potwierdzają tę intuicję – jakość naszych relacji jest jednym z najsilniejszych predyktorów szczęścia i zdrowia.

Istnieją jednak różnice między klasyczną etyką cnót a psychologią pozytywną. Arystoteles rozumiał cnoty w kontekście obiektywnego porządku moralnego, naturalnego celu ludzkiego życia. Psychologia pozytywna, jako nauka empiryczna, stara się być neutralna światopoglądowo, koncentrując się na tym, co faktycznie przyczynia się do subiektywnie odczuwanego dobrostanu.

Ta różnica ma istotne konsekwencje. Dla Arystotelesa niektóre życia są obiektywnie lepsze od innych, niezależnie od subiektywnych odczuć. Tyran może czuć się szczęśliwy, ale jego życie nie jest udane w najgłębszym sensie. Psychologia pozytywna, z jej naciskiem na subiektywny dobrostan, ma trudności z formułowaniem tak mocnych tez.

Mimo tych różnic, dialog między starożytną mądrością a współczesną nauką jest niezwykle płodny. Arystoteles oferuje psychologii pozytywnej głębszy fundament filozoficzny, koncepcję natury ludzkiej i ludzkiego celu. Psychologia pozytywna dostarcza empirycznego wsparcia dla wielu intuicji etyki cnót.

W świecie, który często redukuje szczęście do przyjemności i konsumpcji, przesłanie Arystotelesa pozostaje aktualne: prawdziwy rozkwit wymaga pracy nad sobą, kultywowania cnót i budowania głębokich relacji z innymi.
    `,
    author: 'Dr Maria Wiśniewska',
    authorBio: 'Psycholog i filozof, łączy badania naukowe z refleksją filozoficzną. Autorka książki "Szczęście według Arystotelesa".',
    authorImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
    date: '10 grudnia 2024',
    readTime: '10 min',
    category: 'Etyka',
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1200&h=600&fit=crop',
    tags: ['etyka cnót', 'Arystoteles', 'eudajmonia', 'psychologia pozytywna', 'szczęście'],
  },
};

// Related books for each article
const articleBooks: Record<number, {
  title: string;
  author: string;
  year: string;
  source: 'archive' | 'polona';
  embedUrl: string;
  externalUrl: string;
  description: string;
}> = {
  1: {
    title: 'Metaphysics',
    author: 'Arystoteles',
    year: 'IV w. p.n.e.',
    source: 'archive',
    embedUrl: 'https://archive.org/embed/Aristotle-Metaphysics',
    externalUrl: 'https://archive.org/details/Aristotle-Metaphysics',
    description: 'Fundamentalne dzieło Arystotelesa poświęcone "filozofii pierwszej" - nauce o bycie jako takim.',
  },
  2: {
    title: 'Summa Theologiae',
    author: 'Tomasz z Akwinu',
    year: '1265-1274',
    source: 'archive',
    embedUrl: 'https://archive.org/embed/sumlogsanctithom00444gut',
    externalUrl: 'https://archive.org/details/sumlogsanctithom00444gut',
    description: 'Monumentalne dzieło teologiczno-filozoficzne św. Tomasza z Akwinu.',
  },
  3: {
    title: 'Nicomachean Ethics',
    author: 'Arystoteles',
    year: 'IV w. p.n.e.',
    source: 'archive',
    embedUrl: 'https://archive.org/embed/nicomacheanethic00arisuoft',
    externalUrl: 'https://archive.org/details/nicomacheanethic00arisuoft',
    description: 'Główne dzieło etyczne Arystotelesa, poświęcone cnotom i drodze do szczęścia.',
  },
};

export function ArticlePage() {
  const { id } = useParams<{ id: string }>();
  const articleId = parseInt(id || '1');
  const article = articles[articleId];

  if (!article) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-cinzel text-3xl text-bronze-100 mb-4">Artykuł nie znaleziony</h1>
          <Link to="/blog" className="text-gold-500 hover:text-gold-400">
            ← Wróć do bloga
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-stone-950">
      {/* Hero Image */}
      <div className="relative h-[50vh] min-h-[400px]">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-4xl mx-auto">
            <Link 
              to="/blog"
              className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Wróć do bloga
            </Link>
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block bg-gold-500 text-stone-950 px-3 py-1 rounded-full text-sm font-semibold mb-4"
            >
              <Tag className="w-3 h-3 inline mr-1" />
              {article.category}
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold text-bronze-100 mb-4"
            >
              {article.title}
            </motion.h1>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap items-center gap-4 text-bronze-400 text-sm"
            >
              <span className="flex items-center gap-1">
                <User className="w-4 h-4" />
                {article.author}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {article.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {article.readTime} czytania
              </span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Text to Speech */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <TextToSpeech text={article.content} title={article.title} />
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center gap-4 mb-8 pb-8 border-b border-amber-900/20"
        >
          <button className="flex items-center gap-2 px-4 py-2 bg-stone-800/50 hover:bg-stone-800 border border-amber-900/30 rounded-lg text-amber-200/80 hover:text-amber-100 transition-colors">
            <Share2 className="w-4 h-4" />
            Udostępnij
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-stone-800/50 hover:bg-stone-800 border border-amber-900/30 rounded-lg text-amber-200/80 hover:text-amber-100 transition-colors">
            <Bookmark className="w-4 h-4" />
            Zapisz
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-stone-800/50 hover:bg-stone-800 border border-amber-900/30 rounded-lg text-amber-200/80 hover:text-amber-100 transition-colors">
            <Heart className="w-4 h-4" />
            Lubię to
          </button>
        </motion.div>

        {/* Article Body */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="prose prose-lg prose-invert prose-amber max-w-none"
        >
          {article.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="text-bronze-300 leading-relaxed mb-6 text-lg">
              {paragraph.trim()}
            </p>
          ))}
        </motion.article>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 pt-8 border-t border-amber-900/20"
        >
          <h4 className="text-amber-200/60 text-sm mb-3">Tagi:</h4>
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-stone-800/50 border border-amber-900/30 rounded-full text-amber-200/80 text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Author Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-12 p-6 bg-stone-800/30 border border-amber-900/30 rounded-xl"
        >
          <div className="flex items-start gap-4">
            <img
              src={article.authorImage}
              alt={article.author}
              className="w-16 h-16 rounded-full object-cover border-2 border-amber-600"
            />
            <div>
              <h4 className="font-cinzel text-lg text-amber-100 mb-1">
                {article.author}
              </h4>
              <p className="text-bronze-400 text-sm">
                {article.authorBio}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Embedded Source Book */}
        {articleBooks[articleId] && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
            className="mt-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="w-6 h-6 text-gold-500" />
              <h3 className="font-cinzel text-2xl text-amber-100">
                Źródło do lektury
              </h3>
            </div>
            <p className="text-bronze-400 mb-6">
              Zapoznaj się z oryginalnym tekstem źródłowym związanym z tym artykułem. 
              Możesz przeglądać starodruk bezpośrednio poniżej lub otworzyć go w trybie pełnoekranowym.
            </p>
            <EmbeddedFlipchart
              title={articleBooks[articleId].title}
              author={articleBooks[articleId].author}
              year={articleBooks[articleId].year}
              source={articleBooks[articleId].source}
              embedUrl={articleBooks[articleId].embedUrl}
              externalUrl={articleBooks[articleId].externalUrl}
              description={articleBooks[articleId].description}
            />
          </motion.div>
        )}

        {/* Related Articles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16"
        >
          <h3 className="font-cinzel text-2xl text-amber-100 mb-6">
            Powiązane artykuły
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.values(articles)
              .filter((a) => a.id !== article.id)
              .slice(0, 2)
              .map((relatedArticle) => (
                <Link
                  key={relatedArticle.id}
                  to={`/blog/${relatedArticle.id}`}
                  className="group block"
                >
                  <article className="bg-stone-800/30 border border-amber-900/30 rounded-lg overflow-hidden hover:border-amber-700/50 transition-all">
                    <img
                      src={relatedArticle.image}
                      alt={relatedArticle.title}
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="p-4">
                      <h4 className="font-cinzel text-amber-100 group-hover:text-amber-400 transition-colors line-clamp-2">
                        {relatedArticle.title}
                      </h4>
                      <p className="text-bronze-500 text-sm mt-2 line-clamp-2">
                        {relatedArticle.excerpt}
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
