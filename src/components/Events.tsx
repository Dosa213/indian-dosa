import React, { useState } from 'react';
import { Truck, Users, Calendar, Send } from 'lucide-react';
import { Language } from '../hooks/useLanguage';
import { content } from '../data/content';

interface EventsProps {
  language: Language;
}

const EventsGallery: React.FC = () => {
  const [currentImage, setCurrentImage] = useState(0);
  
  const images = [
    'https://lh3.googleusercontent.com/pw/AP1GczPSkL713R2CG4T7MJ1EiMo-qggmu6gKVJZADYameZDGw1Lq7izt_qUmnEgIzzVh7ykWRcgStovnWJtzvdsKFnna5PwXB8xoL7vSAv9EgKVV500DTt4L4WB4LEtKXZcGRR_6-mLODi1zzJhEGh1WVM7F=w2876-h1702-s-no-gm?authuser=1',
    'https://lh3.googleusercontent.com/pw/AP1GczN-KiWU66VmJJkII7dssmoYBejVXyONmvxmJsCs-bD8elGncdfYFihMPTeKB6-Y-VniLjgE8iRJK7pbrgjp_NwCFFgP9qL9WsM2LJuciiMAJGchQ6dZ66j5TkXiNXZuHQ9TDcIilp7CpeRGO_54OjQp=w2137-h1013-s-no-gm?authuser=1',
    'https://lh3.googleusercontent.com/pw/AP1GczMM1XGB9Kof0kof1VwdjS1drIWA3zOLX0yTSvMmj6ZOYkR_rZZSUthVd_YvKst1t0TMHjEa4EBPtULq0jo9wHHHF121AcEZ9QJMPZ9SIx5xSFhUizDXI53FgZJOR3z0t8WJC6xWTIWFLCkXjClX5f8g=w3600-h1804-s-no-gm?authuser=1'
  ];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-80 rounded-lg overflow-hidden shadow-lg">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Food truck event ${index + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            index === currentImage ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
        />
      ))}
      
      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentImage ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export const Events: React.FC<EventsProps> = ({ language }) => {
  const t = content[language];
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: '',
    date: '',
    guests: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Event booking:', formData);
    alert(language === 'en' 
      ? 'Thank you! We will contact you soon about your event.'
      : 'Obrigado! Entraremos em contacto em breve sobre o seu evento.'
    );
    setFormData({ name: '', email: '', type: '', date: '', guests: '', message: '' });
  };

  return (
    <section id="events" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-display font-bold text-primary mb-4">
            {t.events.title}
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            {t.events.subtitle}
          </p>
          <div className="flex items-center justify-center space-x-8 text-accent font-semibold">
            <span className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>{t.events.stats}</span>
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Food Truck Gallery */}
          <div className="animate-slide-up">
            <EventsGallery />
          </div>

          {/* Booking Form */}
          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-xl p-8">
              <h3 className="text-2xl font-semibold text-primary mb-6 flex items-center space-x-2">
                <Truck className="w-6 h-6" />
                <span>{t.events.bookTruck}</span>
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder={t.events.form.name}
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
                <input
                  type="email"
                  placeholder={t.events.form.email}
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder={t.events.form.type}
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
                <input
                  type="date"
                  placeholder={t.events.form.date}
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
              
              <input
                type="number"
                placeholder={t.events.form.guests}
                value={formData.guests}
                onChange={(e) => setFormData({...formData, guests: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent mb-4"
                required
              />
              
              <textarea
                placeholder={t.events.form.message}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent mb-6"
              />
              
              <button
                type="submit"
                className="w-full bg-secondary text-white py-3 rounded-lg hover:bg-secondary/90 transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <Send className="w-5 h-5" />
                <span>{t.events.bookTruck}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};