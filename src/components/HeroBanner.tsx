import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, BookOpen, Play, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRef } from 'react';

export function HeroBanner() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Parallax effects
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image - Antique theme with parallax */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: backgroundY }}
      >
        {/* Main antique background image */}
        <img
          src="https://images.unsplash.com/photo-1604580864964-0462f5d5b1a8?w=1920&h=1080&fit=crop"
          alt="Antique Greek columns"
          className="w-full h-full object-cover scale-110"
        />
        
        {/* Animated vignette effect */}
        <motion.div 
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(ellipse at center, transparent 0%, rgba(28, 25, 23, 0.4) 50%, rgba(28, 25, 23, 0.95) 100%)',
              'radial-gradient(ellipse at center, transparent 0%, rgba(28, 25, 23, 0.5) 45%, rgba(28, 25, 23, 0.95) 100%)',
              'radial-gradient(ellipse at center, transparent 0%, rgba(28, 25, 23, 0.4) 50%, rgba(28, 25, 23, 0.95) 100%)',
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Dark overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/70 via-stone-950/50 to-stone-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/60 via-transparent to-stone-950/60" />
        
        {/* Animated light rays */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`ray-${i}`}
              className="absolute top-0 w-32 h-full opacity-[0.03]"
              style={{
                left: `${15 + i * 18}%`,
                background: 'linear-gradient(180deg, rgba(212, 160, 18, 0.8), transparent 70%)',
                transformOrigin: 'top center',
              }}
              animate={{
                scaleY: [1, 1.2, 1],
                opacity: [0.02, 0.05, 0.02],
                skewX: [-5, 5, -5],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            />
          ))}
        </div>

        {/* Animated gold orbs */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.15, 0.3, 0.15],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-gold-500/20 to-bronze-600/5 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.25, 0.1],
            x: [0, -40, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-bronze-500/20 to-gold-600/5 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-gold-400/10 to-transparent blur-3xl"
        />

        {/* Floating particles - enhanced */}
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: `${Math.random() * 100}%`, 
              y: '110%',
              opacity: 0,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{ 
              y: '-10%',
              opacity: [0, 0.8, 0.8, 0],
              rotate: [0, 360],
            }}
            transition={{ 
              duration: Math.random() * 15 + 12,
              repeat: Infinity,
              delay: Math.random() * 12,
              ease: 'linear'
            }}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 4 + 2,
              height: Math.random() * 4 + 2,
              background: i % 3 === 0 
                ? 'radial-gradient(circle, rgba(212, 160, 18, 0.9), transparent)'
                : 'radial-gradient(circle, rgba(184, 134, 11, 0.7), transparent)',
              boxShadow: '0 0 6px rgba(212, 160, 18, 0.5)',
            }}
          />
        ))}

        {/* Sparkle effects */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute w-1 h-1 bg-gold-300"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
              borderRadius: '50%',
              boxShadow: '0 0 10px 2px rgba(212, 160, 18, 0.6)',
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Ancient pattern overlay - animated */}
        <motion.div 
          className="absolute inset-0"
          animate={{
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4a012' fill-opacity='0.3'%3E%3Cpath d='M40 0L80 40L40 80L0 40L40 0zM40 10L10 40L40 70L70 40L40 10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} 
        />
      </motion.div>

      {/* Content with parallax */}
      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        style={{ y: textY, opacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Badge with glow effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-gold-900/40 to-bronze-900/40 border border-gold-700/40 rounded-full px-5 py-2 backdrop-blur-sm relative"
          >
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                boxShadow: [
                  '0 0 20px rgba(212, 160, 18, 0.1)',
                  '0 0 40px rgba(212, 160, 18, 0.2)',
                  '0 0 20px rgba(212, 160, 18, 0.1)',
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-4 h-4 text-gold-400" />
            </motion.div>
            <span className="text-gold-300 text-sm font-medium tracking-wide">Portal Filozofii Klasycznej</span>
          </motion.div>

          {/* Decorative Greek key pattern - animated */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex justify-center"
          >
            <motion.div 
              className="h-px w-32 bg-gradient-to-r from-transparent via-gold-500 to-transparent"
              animate={{
                boxShadow: [
                  '0 0 10px rgba(212, 160, 18, 0.3)',
                  '0 0 20px rgba(212, 160, 18, 0.5)',
                  '0 0 10px rgba(212, 160, 18, 0.3)',
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          {/* Main heading with enhanced animation */}
          <h1 className="font-cinzel text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight">
            <motion.span
              initial={{ opacity: 0, y: 40, rotateX: -40 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
              className="block text-bronze-100 drop-shadow-lg"
              style={{ textShadow: '0 0 40px rgba(212, 160, 18, 0.2)' }}
            >
              Bonum
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 40, rotateX: -40 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: 0.6, duration: 0.8, type: "spring" }}
              className="block relative"
            >
              <span className="gold-shimmer">Depositum</span>
              {/* Glow behind text */}
              <motion.span
                className="absolute inset-0 gold-shimmer blur-xl opacity-30"
                animate={{ opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Depositum
              </motion.span>
            </motion.span>
          </h1>

          {/* Decorative element with animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex justify-center items-center space-x-4"
          >
            <motion.div 
              className="h-px w-16 bg-gradient-to-r from-transparent to-gold-600"
              animate={{ scaleX: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div 
              className="w-3 h-3 rotate-45 border border-gold-500"
              animate={{ 
                rotate: [45, 225, 45],
                borderColor: ['rgb(212, 160, 18)', 'rgb(184, 134, 11)', 'rgb(212, 160, 18)']
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="h-px w-16 bg-gradient-to-l from-transparent to-gold-600"
              animate={{ scaleX: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          {/* Subtitle with typewriter-like effect */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="font-cormorant text-2xl sm:text-3xl lg:text-4xl text-bronze-200 italic max-w-3xl mx-auto drop-shadow-md"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              „Dobre dziedzictwo"
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.5 }}
            >
              {" "}— zachowujemy i przekazujemy mądrość pokoleń
            </motion.span>
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="text-bronze-400 text-lg max-w-2xl mx-auto"
          >
            Odkryj bogactwo klasycznej filozofii, od starożytnych Greków przez scholastykę 
            po współczesny tomizm. Artykuły, wykłady, starodruki i materiały edukacyjne.
          </motion.p>

          {/* CTA Buttons with enhanced hover effects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link
              to="/blog"
              className="group relative inline-flex items-center space-x-2 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-stone-950 font-semibold py-4 px-8 rounded-xl transition-all shadow-lg shadow-gold-500/25 hover:shadow-gold-500/50 overflow-hidden"
            >
              {/* Shine effect on hover */}
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
              />
              <BookOpen className="w-5 h-5 relative z-10" />
              <span className="relative z-10">Czytaj artykuły</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
            </Link>

            <Link
              to="/wyklady"
              className="group inline-flex items-center space-x-2 bg-stone-800/60 hover:bg-stone-800/80 backdrop-blur-sm border border-gold-700/40 hover:border-gold-500/60 text-bronze-200 font-semibold py-4 px-8 rounded-xl transition-all relative overflow-hidden"
            >
              {/* Animated border glow */}
              <motion.span
                className="absolute inset-0 rounded-xl"
                animate={{
                  boxShadow: [
                    'inset 0 0 0 1px rgba(212, 160, 18, 0.1)',
                    'inset 0 0 0 1px rgba(212, 160, 18, 0.3)',
                    'inset 0 0 0 1px rgba(212, 160, 18, 0.1)',
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <Play className="w-5 h-5 text-gold-500 group-hover:scale-110 transition-transform" />
              <span>Obejrzyj wykłady</span>
            </Link>
          </motion.div>

          {/* Stats with count-up animation effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.7 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-8 pt-12 max-w-4xl mx-auto"
          >
            {[
              { number: '150+', label: 'Artykułów' },
              { number: '50+', label: 'Wykładów' },
              { number: '100+', label: 'Starodruków' },
              { number: '2000+', label: 'Lat mądrości' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 + i * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="text-center group cursor-default"
              >
                <motion.p 
                  className="font-cinzel text-3xl sm:text-4xl font-bold text-gold-500 drop-shadow-lg"
                  whileHover={{ textShadow: '0 0 30px rgba(212, 160, 18, 0.5)' }}
                >
                  {stat.number}
                </motion.p>
                <p className="text-bronze-500 text-sm mt-1 group-hover:text-bronze-400 transition-colors">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator - enhanced */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center space-y-2"
          >
            <span className="text-bronze-600 text-xs tracking-widest uppercase">Przewiń</span>
            <div className="w-6 h-10 border-2 border-gold-600/50 rounded-full flex items-start justify-center p-2">
              <motion.div
                animate={{ y: [0, 12, 0], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-gold-500 rounded-full shadow-lg shadow-gold-500/50"
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
