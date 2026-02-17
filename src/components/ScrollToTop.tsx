import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / maxScroll) * 100;
      
      setScrollProgress(progress);
      setIsVisible(scrolled > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 group"
          aria-label="Powrót do góry"
        >
          {/* Progress ring */}
          <svg className="w-14 h-14 transform -rotate-90">
            {/* Background circle */}
            <circle
              cx="28"
              cy="28"
              r="24"
              fill="none"
              stroke="rgba(120, 90, 60, 0.3)"
              strokeWidth="3"
            />
            {/* Progress circle */}
            <motion.circle
              cx="28"
              cy="28"
              r="24"
              fill="none"
              stroke="url(#goldGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={150.8}
              strokeDashoffset={150.8 - (150.8 * scrollProgress) / 100}
              className="drop-shadow-lg"
            />
            <defs>
              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#d4a012" />
                <stop offset="100%" stopColor="#b8860b" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Button center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-stone-800 to-stone-900 border border-gold-600/50 flex items-center justify-center shadow-lg group-hover:border-gold-500 transition-colors">
              <motion.div
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ChevronUp className="w-5 h-5 text-gold-500 group-hover:text-gold-400 transition-colors" />
              </motion.div>
            </div>
          </div>

          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <div className="bg-stone-800 text-bronze-200 text-xs px-3 py-1.5 rounded-lg whitespace-nowrap border border-gold-700/30">
              Do góry
              <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-stone-800" />
            </div>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
