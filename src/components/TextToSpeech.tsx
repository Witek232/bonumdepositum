import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  Square, 
  SkipBack,
  Settings,
  Mic,
  ChevronUp,
  ChevronDown
} from 'lucide-react';

interface TextToSpeechProps {
  text: string;
  title?: string;
}

const TextToSpeech = ({ text, title = "Artykuł" }: TextToSpeechProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [volume, setVolume] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentWord, setCurrentWord] = useState('');
  const [isSupported, setIsSupported] = useState(true);

  // Sprawdź wsparcie dla Speech Synthesis
  useEffect(() => {
    if (!('speechSynthesis' in window)) {
      setIsSupported(false);
      return;
    }

    const loadVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      // Preferuj głosy polskie
      const polishVoices = availableVoices.filter(voice => 
        voice.lang.startsWith('pl')
      );
      const otherVoices = availableVoices.filter(voice => 
        !voice.lang.startsWith('pl')
      );
      
      const sortedVoices = [...polishVoices, ...otherVoices];
      setVoices(sortedVoices);
      
      // Wybierz domyślnie polski głos lub pierwszy dostępny
      if (sortedVoices.length > 0) {
        const defaultVoice = polishVoices[0] || sortedVoices[0];
        setSelectedVoice(defaultVoice);
      }
    };

    loadVoices();
    speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      speechSynthesis.cancel();
    };
  }, []);

  // Czyszczenie przy odmontowaniu
  useEffect(() => {
    return () => {
      speechSynthesis.cancel();
    };
  }, []);

  const cleanText = (rawText: string): string => {
    return rawText
      .replace(/<[^>]*>/g, '') // Usuń tagi HTML
      .replace(/\s+/g, ' ') // Normalizuj białe znaki
      .replace(/[„""]/g, '"') // Normalizuj cudzysłowy
      .trim();
  };

  const speak = useCallback(() => {
    if (!isSupported) return;

    speechSynthesis.cancel();
    
    const cleanedText = cleanText(text);
    const utterance = new SpeechSynthesisUtterance(cleanedText);
    
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = volume;

    // Śledzenie postępu
    const words = cleanedText.split(' ');
    let wordIndex = 0;

    utterance.onboundary = (event) => {
      if (event.name === 'word') {
        wordIndex++;
        setProgress((wordIndex / words.length) * 100);
        setCurrentWord(words[wordIndex] || '');
      }
    };

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setProgress(0);
      setCurrentWord('');
    };

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setIsPlaying(false);
      setIsPaused(false);
    };

    speechSynthesis.speak(utterance);
  }, [text, selectedVoice, rate, pitch, volume, isSupported]);

  const togglePlay = () => {
    if (!isSupported) return;

    if (isPlaying && !isPaused) {
      speechSynthesis.pause();
      setIsPaused(true);
    } else if (isPaused) {
      speechSynthesis.resume();
      setIsPaused(false);
    } else {
      speak();
    }
  };

  const stop = () => {
    speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    setProgress(0);
    setCurrentWord('');
  };

  const skipBack = () => {
    stop();
    speak();
  };

  const adjustRate = (delta: number) => {
    setRate(prev => Math.min(2, Math.max(0.5, prev + delta)));
  };

  if (!isSupported) {
    return (
      <div className="bg-stone-800/50 border border-amber-900/30 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-3 text-amber-200/60">
          <VolumeX className="w-5 h-5" />
          <span className="text-sm">
            Twoja przeglądarka nie obsługuje odczytu głosowego.
          </span>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      {/* Główny panel */}
      <div className="bg-gradient-to-r from-stone-800/80 to-stone-900/80 border border-amber-900/30 rounded-xl overflow-hidden backdrop-blur-sm">
        {/* Nagłówek z tytułem */}
        <div 
          className="flex items-center justify-between px-4 py-3 bg-stone-900/50 cursor-pointer"
          onClick={() => setIsMinimized(!isMinimized)}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center">
              <Mic className="w-5 h-5 text-amber-100" />
            </div>
            <div>
              <h4 className="text-amber-100 font-medium text-sm">Odczyt głosowy</h4>
              <p className="text-amber-200/60 text-xs truncate max-w-[200px]">{title}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isPlaying && (
              <div className="flex items-center gap-1">
                {[0, 1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    className="w-1 bg-amber-500 rounded-full"
                    animate={{
                      height: isPlaying && !isPaused ? [4, 16, 4] : 4,
                    }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                      delay: i * 0.1,
                    }}
                  />
                ))}
              </div>
            )}
            <motion.div
              animate={{ rotate: isMinimized ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronUp className="w-5 h-5 text-amber-200/60" />
            </motion.div>
          </div>
        </div>

        <AnimatePresence>
          {!isMinimized && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Pasek postępu */}
              <div className="px-4 pt-3">
                <div className="relative h-2 bg-stone-700 rounded-full overflow-hidden">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-600 to-amber-400 rounded-full"
                    style={{ width: `${progress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
                {currentWord && (
                  <p className="text-amber-200/40 text-xs mt-1 truncate">
                    ...{currentWord}...
                  </p>
                )}
              </div>

              {/* Kontrolki */}
              <div className="flex items-center justify-center gap-2 p-4">
                {/* Przewiń do początku */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={skipBack}
                  className="w-10 h-10 rounded-full bg-stone-700/50 hover:bg-stone-700 flex items-center justify-center text-amber-200/80 transition-colors"
                  title="Od początku"
                >
                  <SkipBack className="w-4 h-4" />
                </motion.button>

                {/* Play/Pause */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={togglePlay}
                  className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 hover:from-amber-500 hover:to-amber-700 flex items-center justify-center text-white shadow-lg shadow-amber-900/30 transition-all"
                  title={isPlaying && !isPaused ? "Pauza" : "Odtwórz"}
                >
                  {isPlaying && !isPaused ? (
                    <Pause className="w-6 h-6" />
                  ) : (
                    <Play className="w-6 h-6 ml-1" />
                  )}
                </motion.button>

                {/* Stop */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={stop}
                  className="w-10 h-10 rounded-full bg-stone-700/50 hover:bg-stone-700 flex items-center justify-center text-amber-200/80 transition-colors"
                  title="Stop"
                >
                  <Square className="w-4 h-4" />
                </motion.button>

                {/* Ustawienia */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowSettings(!showSettings)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    showSettings 
                      ? 'bg-amber-700 text-white' 
                      : 'bg-stone-700/50 hover:bg-stone-700 text-amber-200/80'
                  }`}
                  title="Ustawienia"
                >
                  <Settings className="w-4 h-4" />
                </motion.button>
              </div>

              {/* Panel ustawień */}
              <AnimatePresence>
                {showSettings && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-amber-900/20 overflow-hidden"
                  >
                    <div className="p-4 space-y-4">
                      {/* Wybór głosu */}
                      <div>
                        <label className="text-amber-200/60 text-xs mb-2 block">
                          Głos
                        </label>
                        <select
                          value={selectedVoice?.name || ''}
                          onChange={(e) => {
                            const voice = voices.find(v => v.name === e.target.value);
                            setSelectedVoice(voice || null);
                          }}
                          className="w-full bg-stone-700 border border-stone-600 rounded-lg px-3 py-2 text-amber-100 text-sm focus:outline-none focus:border-amber-600"
                        >
                          {voices.map((voice) => (
                            <option key={voice.name} value={voice.name}>
                              {voice.name} ({voice.lang})
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Prędkość */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-amber-200/60 text-xs">
                            Prędkość: {rate.toFixed(1)}x
                          </label>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => adjustRate(-0.1)}
                              className="w-6 h-6 rounded bg-stone-700 hover:bg-stone-600 flex items-center justify-center text-amber-200/80"
                            >
                              <ChevronDown className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => adjustRate(0.1)}
                              className="w-6 h-6 rounded bg-stone-700 hover:bg-stone-600 flex items-center justify-center text-amber-200/80"
                            >
                              <ChevronUp className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <input
                          type="range"
                          min="0.5"
                          max="2"
                          step="0.1"
                          value={rate}
                          onChange={(e) => setRate(parseFloat(e.target.value))}
                          className="w-full accent-amber-600"
                        />
                      </div>

                      {/* Tonacja */}
                      <div>
                        <label className="text-amber-200/60 text-xs mb-2 block">
                          Tonacja: {pitch.toFixed(1)}
                        </label>
                        <input
                          type="range"
                          min="0.5"
                          max="2"
                          step="0.1"
                          value={pitch}
                          onChange={(e) => setPitch(parseFloat(e.target.value))}
                          className="w-full accent-amber-600"
                        />
                      </div>

                      {/* Głośność */}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          {volume === 0 ? (
                            <VolumeX className="w-4 h-4 text-amber-200/60" />
                          ) : (
                            <Volume2 className="w-4 h-4 text-amber-200/60" />
                          )}
                          <label className="text-amber-200/60 text-xs">
                            Głośność: {Math.round(volume * 100)}%
                          </label>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.1"
                          value={volume}
                          onChange={(e) => setVolume(parseFloat(e.target.value))}
                          className="w-full accent-amber-600"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default TextToSpeech;
