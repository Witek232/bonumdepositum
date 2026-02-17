import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send, MessageSquare, Clock } from 'lucide-react';
import { useState } from 'react';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Dziękujemy za wiadomość! Odpowiemy najszybciej jak to możliwe.');
  };

  return (
    <div className="pt-20 min-h-screen">
      {/* Header */}
      <section className="py-16 bg-gradient-to-b from-stone-900 to-stone-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="font-cinzel text-4xl sm:text-5xl lg:text-6xl font-bold text-bronze-100 mb-4">
              Skontaktuj się <span className="text-gold-500">z nami</span>
            </h1>
            <p className="text-bronze-400 font-cormorant text-xl italic max-w-2xl mx-auto">
              Masz pytania? Chcesz współpracować? Napisz do nas!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-stone-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h2 className="font-cinzel text-2xl text-bronze-100 mb-6">
                  Informacje kontaktowe
                </h2>
                <p className="text-bronze-400 mb-8">
                  Jesteśmy otwarci na współpracę, propozycje artykułów, pytania 
                  dotyczące treści oraz wszelkie sugestie rozwoju portalu.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-gold-600/20 to-bronze-600/20">
                    <Mail className="w-6 h-6 text-gold-500" />
                  </div>
                  <div>
                    <h3 className="font-cinzel text-bronze-100 font-medium">Email</h3>
                    <p className="text-bronze-400">kontakt@bonumdepositum.pl</p>
                    <p className="text-bronze-500 text-sm">redakcja@bonumdepositum.pl</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-gold-600/20 to-bronze-600/20">
                    <MapPin className="w-6 h-6 text-gold-500" />
                  </div>
                  <div>
                    <h3 className="font-cinzel text-bronze-100 font-medium">Adres</h3>
                    <p className="text-bronze-400">ul. Filozofów 12</p>
                    <p className="text-bronze-500 text-sm">31-000 Kraków, Polska</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-gold-600/20 to-bronze-600/20">
                    <Phone className="w-6 h-6 text-gold-500" />
                  </div>
                  <div>
                    <h3 className="font-cinzel text-bronze-100 font-medium">Telefon</h3>
                    <p className="text-bronze-400">+48 12 345 67 89</p>
                    <p className="text-bronze-500 text-sm">Pon-Pt: 9:00 - 17:00</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-gold-600/20 to-bronze-600/20">
                    <Clock className="w-6 h-6 text-gold-500" />
                  </div>
                  <div>
                    <h3 className="font-cinzel text-bronze-100 font-medium">Czas odpowiedzi</h3>
                    <p className="text-bronze-400">Zwykle do 48 godzin</p>
                    <p className="text-bronze-500 text-sm">W sprawach pilnych - tego samego dnia</p>
                  </div>
                </div>
              </div>

              {/* Quote */}
              <div className="bg-stone-900/50 border border-gold-900/30 rounded-xl p-6 mt-8">
                <MessageSquare className="w-8 h-8 text-gold-500/50 mb-4" />
                <p className="font-cormorant text-xl text-bronze-300 italic">
                  "Filozofia zaczyna się od zachwytu i kończy się na zrozumieniu."
                </p>
                <p className="text-gold-600 text-sm mt-2">— Alfred North Whitehead</p>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <form onSubmit={handleSubmit} className="bg-stone-900/50 border border-gold-900/30 rounded-2xl p-8">
                <h2 className="font-cinzel text-2xl text-bronze-100 mb-6">
                  Wyślij wiadomość
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-bronze-300 text-sm font-medium mb-2">
                      Imię i nazwisko
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-stone-800/50 border border-gold-900/30 rounded-lg px-4 py-3 text-bronze-200 placeholder:text-bronze-600 focus:outline-none focus:border-gold-600 transition-colors"
                      placeholder="Jan Kowalski"
                    />
                  </div>

                  <div>
                    <label className="block text-bronze-300 text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-stone-800/50 border border-gold-900/30 rounded-lg px-4 py-3 text-bronze-200 placeholder:text-bronze-600 focus:outline-none focus:border-gold-600 transition-colors"
                      placeholder="jan@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-bronze-300 text-sm font-medium mb-2">
                      Temat
                    </label>
                    <select
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-stone-800/50 border border-gold-900/30 rounded-lg px-4 py-3 text-bronze-200 focus:outline-none focus:border-gold-600 transition-colors"
                    >
                      <option value="">Wybierz temat...</option>
                      <option value="pytanie">Pytanie ogólne</option>
                      <option value="wspolpraca">Propozycja współpracy</option>
                      <option value="artykul">Propozycja artykułu</option>
                      <option value="blad">Zgłoszenie błędu</option>
                      <option value="inne">Inne</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-bronze-300 text-sm font-medium mb-2">
                      Wiadomość
                    </label>
                    <textarea
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-stone-800/50 border border-gold-900/30 rounded-lg px-4 py-3 text-bronze-200 placeholder:text-bronze-600 focus:outline-none focus:border-gold-600 transition-colors resize-none"
                      placeholder="Treść wiadomości..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-stone-950 font-semibold py-4 px-8 rounded-xl transition-all shadow-lg shadow-gold-500/25 hover:shadow-gold-500/40"
                  >
                    <Send className="w-5 h-5" />
                    <span>Wyślij wiadomość</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
