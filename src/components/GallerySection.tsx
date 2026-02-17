import { motion } from 'framer-motion';
import { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';

const images = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
    title: 'Biblioteka klasztorna',
    category: 'Miejsca'
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop',
    title: 'Starodruki filozoficzne',
    category: 'Księgi'
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&h=600&fit=crop',
    title: 'Akademia Platońska',
    category: 'Sztuka'
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&h=600&fit=crop',
    title: 'Medytacja i refleksja',
    category: 'Praktyka'
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&h=600&fit=crop',
    title: 'Summa Theologiae',
    category: 'Księgi'
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800&h=600&fit=crop',
    title: 'Scriptorium',
    category: 'Miejsca'
  },
];

export function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<typeof images[0] | null>(null);

  return (
    <section className="py-24 bg-stone-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-cinzel text-4xl sm:text-5xl font-bold text-bronze-100 mb-4">
            Galeria <span className="text-gold-500">Inspiracji</span>
          </h2>
          <p className="text-bronze-400 font-cormorant text-xl italic max-w-2xl mx-auto">
            Obrazy i fotografie związane z historią filozofii
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`group relative overflow-hidden rounded-xl cursor-pointer ${
                index === 0 || index === 3 ? 'row-span-2' : ''
              }`}
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={image.src}
                alt={image.title}
                className={`w-full object-cover group-hover:scale-110 transition-transform duration-500 ${
                  index === 0 || index === 3 ? 'h-full min-h-[400px]' : 'h-48 md:h-64'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-12 h-12 rounded-full bg-gold-500/90 flex items-center justify-center">
                  <ZoomIn className="w-5 h-5 text-stone-950" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="font-cinzel text-bronze-100 font-medium">{image.title}</p>
                <p className="text-gold-500 text-sm">{image.category}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-stone-950/95 backdrop-blur-lg flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2 text-bronze-400 hover:text-gold-500 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="max-w-4xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="max-w-full max-h-[80vh] object-contain rounded-xl"
              />
              <div className="mt-4 text-center">
                <h3 className="font-cinzel text-xl text-bronze-100">{selectedImage.title}</h3>
                <p className="text-gold-500">{selectedImage.category}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
