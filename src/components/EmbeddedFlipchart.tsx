import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Maximize2, 
  Minimize2, 
  ExternalLink, 
  BookOpen,
  Loader2,
  X
} from 'lucide-react';
import { createPortal } from 'react-dom';

interface EmbeddedFlipchartProps {
  title: string;
  author?: string;
  year?: string;
  source: 'archive' | 'polona';
  embedUrl: string;
  externalUrl: string;
  description?: string;
  className?: string;
}

export function EmbeddedFlipchart({
  title,
  author,
  year,
  source,
  embedUrl,
  externalUrl,
  description,
  className = ''
}: EmbeddedFlipchartProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const openFullscreen = () => {
    setIsFullscreen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
    document.body.style.overflow = '';
  };

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`bg-stone-800/50 border border-gold-900/30 rounded-2xl overflow-hidden ${className}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gold-900/30 bg-stone-900/50">
          <div className="flex items-center gap-3">
            <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
              source === 'archive' 
                ? 'bg-blue-500/90 text-white' 
                : 'bg-red-500/90 text-white'
            }`}>
              {source === 'archive' ? 'Archive.org' : 'Polona.pl'}
            </div>
            <div>
              <h3 className="font-cinzel text-bronze-100 text-sm sm:text-base">{title}</h3>
              {author && <p className="text-gold-500 text-xs">{author} {year && `(${year})`}</p>}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-bronze-400 hover:text-gold-400 hover:bg-stone-700 rounded-lg transition-colors"
              title="Otwórz w źródle"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
            <button
              onClick={openFullscreen}
              className="p-2 text-bronze-400 hover:text-gold-400 hover:bg-stone-700 rounded-lg transition-colors"
              title="Pełny ekran"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Embed container */}
        <div className="relative aspect-[4/3] sm:aspect-[16/9]">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-stone-900 z-10">
              <div className="text-center">
                <Loader2 className="w-8 h-8 text-gold-500 animate-spin mx-auto mb-2" />
                <p className="text-bronze-400 text-sm">Ładowanie...</p>
              </div>
            </div>
          )}
          <iframe
            src={embedUrl}
            title={title}
            className="w-full h-full border-0"
            allowFullScreen
            onLoad={() => setIsLoading(false)}
          />
        </div>

        {/* Description */}
        {description && (
          <div className="p-4 border-t border-gold-900/30 bg-stone-900/30">
            <p className="text-bronze-400 text-sm">{description}</p>
          </div>
        )}
      </motion.div>

      {/* Fullscreen Modal */}
      {isFullscreen && createPortal(
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[99999] bg-stone-950 flex flex-col"
        >
          {/* Fullscreen header */}
          <div className="flex items-center justify-between p-4 border-b border-gold-900/30 bg-stone-900">
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5 text-gold-500" />
              <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                source === 'archive' 
                  ? 'bg-blue-500/90 text-white' 
                  : 'bg-red-500/90 text-white'
              }`}>
                {source === 'archive' ? 'Archive.org' : 'Polona.pl'}
              </div>
              <div>
                <h3 className="font-cinzel text-bronze-100">{title}</h3>
                {author && <p className="text-gold-500 text-xs">{author} {year && `(${year})`}</p>}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-bronze-400 hover:text-gold-400 hover:bg-stone-800 rounded-lg transition-colors"
                title="Otwórz w źródle"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
              <button
                onClick={closeFullscreen}
                className="p-2 text-bronze-400 hover:text-gold-400 hover:bg-stone-800 rounded-lg transition-colors"
                title="Zamknij pełny ekran"
              >
                <Minimize2 className="w-5 h-5" />
              </button>
              <button
                onClick={closeFullscreen}
                className="p-2 text-bronze-400 hover:text-red-400 hover:bg-stone-800 rounded-lg transition-colors"
                title="Zamknij"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Fullscreen iframe */}
          <div className="flex-1">
            <iframe
              src={embedUrl}
              title={title}
              className="w-full h-full border-0"
              allowFullScreen
            />
          </div>
        </motion.div>,
        document.body
      )}
    </>
  );
}

// Pre-configured components for specific books
export function ArchiveEmbed({ bookId, ...props }: { bookId: string } & Omit<EmbeddedFlipchartProps, 'source' | 'embedUrl' | 'externalUrl'>) {
  return (
    <EmbeddedFlipchart
      {...props}
      source="archive"
      embedUrl={`https://archive.org/embed/${bookId}`}
      externalUrl={`https://archive.org/details/${bookId}`}
    />
  );
}

export function PolonaEmbed({ itemId, ...props }: { itemId: string } & Omit<EmbeddedFlipchartProps, 'source' | 'embedUrl' | 'externalUrl'>) {
  return (
    <EmbeddedFlipchart
      {...props}
      source="polona"
      embedUrl={`https://polona.pl/preview/${itemId}`}
      externalUrl={`https://polona.pl/item/${itemId}`}
    />
  );
}
