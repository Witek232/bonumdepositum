import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  Users, 
  Lightbulb, 
  Scroll, 
  GraduationCap, 
  Library,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Feather,
  Globe,
  Heart
} from 'lucide-react';

const menuItems = [
  {
    title: 'Filozofia',
    submenu: [
      {
        category: 'Dyscypliny',
        items: [
          { name: 'Metafizyka', href: '/metafizyka', icon: Globe, desc: 'Nauka o bycie jako takim' },
          { name: 'Epistemologia', href: '/epistemologia', icon: Lightbulb, desc: 'Teoria poznania' },
          { name: 'Etyka', href: '/etyka', icon: Heart, desc: 'Filozofia moralna' },
          { name: 'Logika', href: '/logika', icon: Scroll, desc: 'Sztuka myślenia' },
        ]
      },
      {
        category: 'Tradycje',
        items: [
          { name: 'Tomizm', href: '/tomizm', icon: BookOpen, desc: 'Filozofia św. Tomasza' },
          { name: 'Platonizm', href: '/platonizm', icon: Feather, desc: 'Dziedzictwo Platona' },
          { name: 'Arystotelizm', href: '/arystotelizm', icon: Library, desc: 'Szkoła perypatetycka' },
        ]
      }
    ]
  },
  {
    title: 'Autorzy',
    submenu: [
      {
        category: 'Starożytność',
        items: [
          { name: 'Platon', href: '/autorzy/platon', icon: Users, desc: 'Założyciel Akademii' },
          { name: 'Arystoteles', href: '/autorzy/arystoteles', icon: Users, desc: 'Filozof ze Stagiry' },
          { name: 'Seneka', href: '/autorzy/seneka', icon: Users, desc: 'Stoik rzymski' },
        ]
      },
      {
        category: 'Średniowiecze',
        items: [
          { name: 'Św. Augustyn', href: '/autorzy/augustyn', icon: Users, desc: 'Doktor Kościoła' },
          { name: 'Św. Tomasz', href: '/autorzy/tomasz', icon: Users, desc: 'Doctor Angelicus' },
          { name: 'Duns Szkot', href: '/autorzy/szkot', icon: Users, desc: 'Doctor Subtilis' },
        ]
      }
    ]
  },
  {
    title: 'Edukacja',
    submenu: [
      {
        category: 'Materiały',
        items: [
          { name: 'Kursy', href: '/kursy', icon: GraduationCap, desc: 'Systematyczna nauka' },
          { name: 'Wykłady', href: '/wyklady', icon: BookOpen, desc: 'Nagrane prezentacje' },
          { name: 'Lektury', href: '/lektury', icon: Library, desc: 'Zalecane teksty' },
        ]
      },
      {
        category: 'Biblioteka',
        items: [
          { name: 'Starodruki', href: '/biblioteka', icon: Scroll, desc: 'Archive.org & Polona.pl' },
        ]
      }
    ]
  },
  {
    title: 'Blog',
    href: '/blog'
  },
  {
    title: 'Kontakt',
    href: '/kontakt'
  }
];

export function MegaMenu() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);
  const location = useLocation();

  // Zamknij menu przy zmianie strony
  useEffect(() => {
    setMobileOpen(false);
    setMobileSubmenu(null);
  }, [location.pathname]);

  // Blokuj scroll body gdy menu mobilne jest otwarte
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileOpen]);

  const toggleMobileSubmenu = (title: string) => {
    setMobileSubmenu(mobileSubmenu === title ? null : title);
  };

  // Komponent menu mobilnego
  const MobileMenu = () => (
    <div 
      className="fixed inset-0 bg-black/90"
      style={{ zIndex: 99999 }}
    >
      {/* Header z przyciskiem zamknięcia */}
      <div className="flex items-center justify-between p-4 border-b border-gold-900/50 bg-stone-950">
        <Link to="/" onClick={() => setMobileOpen(false)} className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-500 to-bronze-600 flex items-center justify-center">
            <Scroll className="w-5 h-5 text-stone-950" />
          </div>
          <span className="font-cinzel text-lg font-bold text-gold-500">
            Bonum Depositum
          </span>
        </Link>
        <button
          onClick={() => setMobileOpen(false)}
          className="p-2 text-gold-500 hover:text-gold-400"
          type="button"
          aria-label="Zamknij menu"
        >
          <X className="w-8 h-8" />
        </button>
      </div>

      {/* Scrollowalna zawartość menu */}
      <div className="overflow-y-auto h-[calc(100vh-80px)] bg-stone-950">
        <div className="p-4 space-y-2">
          {menuItems.map((item) => (
            <div key={item.title} className="border-b border-stone-800">
              {item.href ? (
                <Link
                  to={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between py-4 px-3 text-bronze-100 hover:text-gold-400 hover:bg-stone-900 rounded-lg font-medium transition-colors"
                >
                  <span className="font-cinzel text-lg">{item.title}</span>
                  <ChevronRight className="w-5 h-5 text-gold-500" />
                </Link>
              ) : (
                <div>
                  <button
                    onClick={() => toggleMobileSubmenu(item.title)}
                    className="flex items-center justify-between w-full py-4 px-3 text-bronze-100 hover:text-gold-400 hover:bg-stone-900 rounded-lg font-medium transition-colors"
                    type="button"
                  >
                    <span className="font-cinzel text-lg">{item.title}</span>
                    <ChevronDown 
                      className={`w-5 h-5 text-gold-500 transition-transform duration-300 ${
                        mobileSubmenu === item.title ? 'rotate-180' : ''
                      }`} 
                    />
                  </button>
                  
                  {mobileSubmenu === item.title && (
                    <div className="pl-4 pb-4 space-y-4 bg-stone-900/50 rounded-lg mx-2 mb-2">
                      {item.submenu?.map((category) => (
                        <div key={category.category} className="space-y-2 pt-3">
                          <p className="text-xs text-gold-500 uppercase tracking-wider font-bold px-2">
                            {category.category}
                          </p>
                          <div className="space-y-1">
                            {category.items.map((subItem) => (
                              <Link
                                key={subItem.name}
                                to={subItem.href}
                                onClick={() => setMobileOpen(false)}
                                className="flex items-center space-x-3 py-3 px-2 rounded-lg text-bronze-200 hover:text-gold-400 hover:bg-stone-800 transition-colors"
                              >
                                <div className="p-2 rounded-lg bg-gradient-to-br from-gold-600/30 to-bronze-600/30">
                                  <subItem.icon className="w-4 h-4 text-gold-400" />
                                </div>
                                <div className="flex-1">
                                  <p className="text-sm font-semibold">{subItem.name}</p>
                                  <p className="text-xs text-bronze-400">{subItem.desc}</p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
          
          {/* Footer */}
          <div className="pt-8 mt-6 border-t border-gold-900/50">
            <div className="text-center space-y-3">
              <p className="text-bronze-400 text-sm italic font-cormorant">
                "Philosophia ancilla theologiae"
              </p>
              <p className="text-gold-500 text-xs font-cinzel">
                Bonum Depositum © 2024
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-stone-950/95 backdrop-blur-md border-b border-gold-900/30" style={{ zIndex: 9990 }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-500 to-bronze-600 flex items-center justify-center pulse-glow">
                <Scroll className="w-6 h-6 text-stone-950" />
              </div>
              <div>
                <span className="font-cinzel text-xl font-bold gold-shimmer">
                  Bonum Depositum
                </span>
                <p className="text-xs text-bronze-400 font-cormorant italic">
                  Philosophia perennis
                </p>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-1">
              {menuItems.map((item) => (
                <div
                  key={item.title}
                  className="relative"
                  onMouseEnter={() => item.submenu && setActiveMenu(item.title)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  {item.href ? (
                    <Link
                      to={item.href}
                      className="px-4 py-2 text-bronze-200 hover:text-gold-400 transition-colors font-medium flex items-center space-x-1"
                    >
                      <span>{item.title}</span>
                    </Link>
                  ) : (
                    <button
                      className="px-4 py-2 text-bronze-200 hover:text-gold-400 transition-colors font-medium flex items-center space-x-1"
                    >
                      <span>{item.title}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${activeMenu === item.title ? 'rotate-180' : ''}`} />
                    </button>
                  )}

                  {/* Mega Menu Dropdown */}
                  <AnimatePresence>
                    {item.submenu && activeMenu === item.title && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 bg-stone-900/98 backdrop-blur-lg border border-gold-900/30 rounded-xl shadow-2xl shadow-black/50 p-6 min-w-[500px]"
                      >
                        <div className="grid grid-cols-2 gap-6">
                          {item.submenu.map((category) => (
                            <div key={category.category}>
                              <h3 className="font-cinzel text-gold-500 font-semibold mb-3 text-sm uppercase tracking-wider">
                                {category.category}
                              </h3>
                              <div className="space-y-2">
                                {category.items.map((subItem) => (
                                  <Link
                                    key={subItem.name}
                                    to={subItem.href}
                                    className="flex items-start space-x-3 p-2 rounded-lg hover:bg-stone-800/50 transition-colors group"
                                  >
                                    <div className="p-2 rounded-lg bg-gradient-to-br from-gold-600/20 to-bronze-600/20 group-hover:from-gold-600/40 group-hover:to-bronze-600/40 transition-colors">
                                      <subItem.icon className="w-5 h-5 text-gold-500" />
                                    </div>
                                    <div>
                                      <p className="text-bronze-100 font-medium group-hover:text-gold-400 transition-colors">
                                        {subItem.name}
                                      </p>
                                      <p className="text-bronze-500 text-sm">
                                        {subItem.desc}
                                      </p>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-3 text-gold-500 hover:text-gold-400 bg-stone-800 rounded-lg"
              aria-label="Otwórz menu"
              type="button"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - renderowane przez Portal */}
      {mobileOpen && createPortal(<MobileMenu />, document.body)}
    </>
  );
}
