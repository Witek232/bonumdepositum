import { motion } from 'framer-motion';
import { Play, Clock, Eye } from 'lucide-react';

const videos = [
  {
    id: 1,
    title: 'Wprowadzenie do metafizyki św. Tomasza z Akwinu',
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=450&fit=crop',
    duration: '45:20',
    views: '2.3k',
    category: 'Tomizm'
  },
  {
    id: 2,
    title: 'Etyka cnót w filozofii Arystotelesa',
    thumbnail: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=450&fit=crop',
    duration: '38:15',
    views: '1.8k',
    category: 'Etyka'
  },
  {
    id: 3,
    title: 'Platońska teoria idei - wykład wprowadzający',
    thumbnail: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&h=450&fit=crop',
    duration: '52:40',
    views: '3.1k',
    category: 'Platonizm'
  },
];

export function VideoSection() {
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
            Wykłady <span className="text-gold-500">Video</span>
          </h2>
          <p className="text-bronze-400 text-lg max-w-2xl mx-auto font-cormorant text-xl italic">
            Poznaj filozofię poprzez nagrane prezentacje naszych ekspertów
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-xl mb-4">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
                
                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-gold-500/90 flex items-center justify-center group-hover:scale-110 group-hover:bg-gold-400 transition-all shadow-lg shadow-gold-500/30">
                    <Play className="w-6 h-6 text-stone-950 ml-1" fill="currentColor" />
                  </div>
                </div>

                {/* Duration badge */}
                <div className="absolute bottom-3 right-3 bg-stone-950/80 px-2 py-1 rounded text-xs text-bronze-200 flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{video.duration}</span>
                </div>

                {/* Category badge */}
                <div className="absolute top-3 left-3 bg-gold-500/90 px-3 py-1 rounded-full text-xs text-stone-950 font-semibold">
                  {video.category}
                </div>
              </div>

              <h3 className="font-cinzel text-lg text-bronze-100 group-hover:text-gold-400 transition-colors mb-2">
                {video.title}
              </h3>
              
              <div className="flex items-center space-x-1 text-bronze-500 text-sm">
                <Eye className="w-4 h-4" />
                <span>{video.views} wyświetleń</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Embedded Video Example */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="bg-stone-900/50 border border-gold-900/30 rounded-2xl p-8">
            <h3 className="font-cinzel text-2xl text-gold-500 mb-6 text-center">
              Polecany wykład tygodnia
            </h3>
            <div className="aspect-video rounded-xl overflow-hidden bg-stone-800">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Featured lecture"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
