import { Link } from 'react-router-dom';
import { Scroll, Mail, BookOpen, Heart, ExternalLink } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-stone-950 border-t border-gold-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-500 to-bronze-600 flex items-center justify-center">
                <Scroll className="w-5 h-5 text-stone-950" />
              </div>
              <span className="font-cinzel text-lg font-bold text-gold-500">
                Bonum Depositum
              </span>
            </div>
            <p className="text-bronze-400 font-cormorant text-lg italic">
              "Veritas est adaequatio rei et intellectus"
            </p>
            <p className="text-bronze-500 text-sm">
              Portal poświęcony klasycznej filozofii, etyce i metafizyce. Zachowujemy i przekazujemy dziedzictwo wielkich myślicieli.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-cinzel text-gold-500 font-semibold mb-4 uppercase tracking-wider text-sm">
              Nawigacja
            </h3>
            <ul className="space-y-2">
              {['Strona główna', 'O projekcie', 'Blog', 'Autorzy', 'Kursy', 'Kontakt'].map((link) => (
                <li key={link}>
                  <Link 
                    to={`/${link.toLowerCase().replace(' ', '-')}`}
                    className="text-bronze-400 hover:text-gold-400 transition-colors text-sm flex items-center space-x-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-gold-600" />
                    <span>{link}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-cinzel text-gold-500 font-semibold mb-4 uppercase tracking-wider text-sm">
              Dyscypliny
            </h3>
            <ul className="space-y-2">
              {['Metafizyka', 'Epistemologia', 'Etyka', 'Logika', 'Tomizm', 'Historia filozofii'].map((link) => (
                <li key={link}>
                  <Link 
                    to={`/${link.toLowerCase()}`}
                    className="text-bronze-400 hover:text-gold-400 transition-colors text-sm flex items-center space-x-2"
                  >
                    <BookOpen className="w-3 h-3 text-gold-600" />
                    <span>{link}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-cinzel text-gold-500 font-semibold mb-4 uppercase tracking-wider text-sm">
              Newsletter
            </h3>
            <p className="text-bronze-400 text-sm mb-4">
              Otrzymuj najnowsze artykuły i materiały edukacyjne.
            </p>
            <form className="space-y-3">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-bronze-500" />
                <input
                  type="email"
                  placeholder="Twój email"
                  className="w-full bg-stone-900 border border-gold-900/30 rounded-lg pl-10 pr-4 py-2 text-bronze-200 placeholder:text-bronze-600 focus:outline-none focus:border-gold-500 transition-colors text-sm"
                />
              </div>
              <button className="w-full bg-gradient-to-r from-gold-600 to-bronze-600 hover:from-gold-500 hover:to-bronze-500 text-stone-950 font-semibold py-2 px-4 rounded-lg transition-all text-sm">
                Subskrybuj
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-gold-900/20">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-bronze-500 text-sm">
              © 2024 Bonum Depositum. Wszelkie prawa zastrzeżone.
            </p>
            <div className="flex items-center space-x-1 text-bronze-500 text-sm">
              <span>Stworzone z</span>
              <Heart className="w-4 h-4 text-gold-500 fill-gold-500" />
              <span>dla filozofii</span>
            </div>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-bronze-400 hover:text-gold-400 transition-colors text-sm flex items-center space-x-1">
                <span>GitHub</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a href="#" className="text-bronze-400 hover:text-gold-400 transition-colors text-sm flex items-center space-x-1">
                <span>Cloudflare</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
