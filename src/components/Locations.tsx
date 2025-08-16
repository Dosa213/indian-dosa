import React from 'react';
import { MapPin, Phone, Clock, Mail, Navigation, Calendar } from 'lucide-react';
import { Language } from '../hooks/useLanguage';
import { content } from '../data/content';
import { useFooterInfo } from '../hooks/useSanity';

interface LocationsProps {
  language: Language;
  onReserveClick: () => void;
}

export const Locations: React.FC<LocationsProps> = ({ language, onReserveClick }) => {
  const t = content[language];
  const { footerInfo, loading } = useFooterInfo();

  // Locations statiques (ne changent pas)
  const locations = [
    {
      name: t.locations.saldanha,
      address: 'Av. Fontes Pereira de Melo 42E',
      area: 'Saldanha, Lisboa',
      mapUrl: 'https://goo.gl/maps/saldanha-location',
      embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3112.5234567890123!2d-9.1456789012345!3d38.7345678901234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDQ0JzA0LjQiTiA5wrAwOCc0NC40Ilc!5e0!3m2!1sen!2spt!4v1234567890123!5m2!1sen!2spt&q=Av.+Fontes+Pereira+de+Melo+42E,+Lisboa'
    },
    {
      name: t.locations.gulbenkian,
      address: 'Av. Conde Valbom 61A, 1050-067 Lisboa',
      area: 'Gulbenkian, Lisboa',
      mapUrl: 'https://maps.app.goo.gl/vFhjnR3TECMCjh7TA?g_st=ipc',
      embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3112.1234567890123!2d-9.1567890123456!3d38.7456789012345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDQ0JzQwLjQiTiA5wrAwOSczMC40Ilc!5e0!3m2!1sen!2spt!4v1234567890124!5m2!1sen!2spt&q=Av.+Conde+Valbom+61A,+Lisboa'
    },
    {
      name: t.locations.foodTruck,
      address: t.locations.mobile,
      area: 'Lisboa & Arredores',
      mapUrl: null,
      embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d51984.47312117728!2d-9.1876806!3d38.7436214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDQ0JzM3LjAiTiA5wrAxMScxNS42Ilc!5e0!3m2!1sen!2spt!4v1234567890125!5m2!1sen!2spt&q=Lisboa,+Portugal'
    }
  ];

  // Utilise les données Sanity seulement pour les infos de contact
  const contactPhone = !loading && footerInfo?.contactInfo?.phone 
    ? footerInfo.contactInfo.phone 
    : '+351 936 656 390';

  const contactEmail = !loading && footerInfo?.contactInfo?.email 
    ? footerInfo.contactInfo.email 
    : 'ladosapt@gmail.com';

  return (
    <section id="locations" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-display font-bold text-primary mb-6">
            {t.locations.title}
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            {language === 'en' 
              ? 'Visit us at our restaurants or book our food truck for your event'
              : 'Visite-nos nos nossos restaurantes ou reserve o nosso food truck para o seu evento'
            }
          </p>
        </div>

        {/* Location Cards - STATIQUES */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {locations.map((location, index) => (
            <div 
              key={index}
              className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-slide-up border border-gray-100"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden h-48">
                <iframe
                  src={location.embedUrl}
                  className="w-full h-full border-0 group-hover:scale-105 transition-transform duration-300"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Map of ${location.name}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-xl font-semibold mb-1 text-white drop-shadow-lg">{location.name}</h3>
                  <p className="text-sm text-white/90 drop-shadow-md">{location.area}</p>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-start space-x-3 mb-4">
                  <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-700 font-medium">{location.address}</p>
                    {location.mapUrl && (
                      <a
                        href={location.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1 text-secondary hover:text-secondary/80 text-sm mt-2 transition-colors"
                      >
                        <Navigation className="w-4 h-4" />
                        <span>{t.locations.directions}</span>
                      </a>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 text-gray-600 mb-4">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">
                    {index < 2 ? t.locations.hours : t.locations.onDemand}
                  </span>
                </div>
                
                {index < 2 ? (
                  <button
                    onClick={onReserveClick}
                    className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>{t.nav.reserve}</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      const eventsSection = document.getElementById('events');
                      eventsSection?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full bg-secondary text-white py-2 px-4 rounded-lg hover:bg-secondary/90 transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>{t.events.bookTruck}</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Get in Touch - AVEC SANITY */}
        <div className="bg-gray-50 rounded-2xl p-8 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <div className="text-center mb-8">
            <h3 className="text-2xl font-display font-semibold text-primary mb-4">
              {language === 'en' ? 'Get in Touch' : 'Entre em Contacto'}
            </h3>
            <p className="text-gray-600">
              {language === 'en' 
                ? 'Ready to experience authentic South Indian flavors? Contact us for reservations or catering.'
                : 'Pronto para experimentar sabores autênticos do Sul da Índia? Contacte-nos para reservas ou catering.'
              }
            </p>
          </div>
          
          {/* Loading State */}
          {loading && (
            <div className="text-center mb-6">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            </div>
          )}
          
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <a
              href={`tel:${contactPhone}`}
              className="group flex items-center space-x-4 bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:bg-primary hover:text-white"
            >
              <div className="w-12 h-12 bg-primary group-hover:bg-white rounded-full flex items-center justify-center transition-colors">
                <Phone className="w-6 h-6 text-white group-hover:text-primary" />
              </div>
              <div>
                <p className="text-sm text-gray-500 group-hover:text-white/80 mb-1">
                  {language === 'en' ? 'Call us' : 'Ligue-nos'}
                </p>
                <p className="font-semibold text-lg">{contactPhone}</p>
              </div>
            </a>
            
            <a
              href={`mailto:${contactEmail}`}
              className="group flex items-center space-x-4 bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:bg-secondary hover:text-white"
            >
              <div className="w-12 h-12 bg-secondary group-hover:bg-white rounded-full flex items-center justify-center transition-colors">
                <Mail className="w-6 h-6 text-white group-hover:text-secondary" />
              </div>
              <div>
                <p className="text-sm text-gray-500 group-hover:text-white/80 mb-1">
                  {language === 'en' ? 'Email us' : 'Envie-nos email'}
                </p>
                <p className="font-semibold text-lg">{contactEmail}</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};