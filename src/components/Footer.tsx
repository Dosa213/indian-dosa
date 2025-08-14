import React from 'react';
import { Instagram, Youtube, Clock, Phone, Mail } from 'lucide-react';
import { Language } from '../hooks/useLanguage';
import { content } from '../data/content';
import { useFooterInfo, useSiteImages } from '../hooks/useSanity';
import { urlFor } from '../lib/sanity';

interface FooterProps {
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  const t = content[language];
  const { footerInfo, loading: footerLoading } = useFooterInfo();
  const { images, loading: imagesLoading } = useSiteImages();

  const footerLinks = [
    { key: 'home', href: '#home' },
    { key: 'menu', href: '#menu' },
    { key: 'locations', href: '#locations' },
    { key: 'events', href: '#events' },
    { key: 'contact', href: '#contact' }
  ];

  // Données de fallback si Sanity n'est pas disponible
  const fallbackLogo = "https://lh3.googleusercontent.com/pw/AP1GczOaKawDXoEOBqw1IJmYtMUxQ3bB_CtiQ_SC5D0M0BfEU7G0efxHOoCtt2uw6lVNv1nezoycIqF1NyzeruFW_JgPk36xfUA62gthvjww1ejrQW_-yMm6S0UEBGn9EepJdeUzaMYAQXZvgK8Fcp718w7j=w1277-h1280-s-no-gm?authuser=1";
  
  const fallbackContact = {
    phone: "+351 936 656 390",
    email: "ladosapt@gmail.com",
    hours: { en: "11h - 23h, 7 days a week", pt: "11h - 23h, 7 dias por semana" }
  };
  
  const fallbackSocial = {
    instagram: "https://instagram.com/indiandosa_lisboa",
    youtube: "https://youtube.com/@Indiandosa",
    whatsapp: "+351936656390",
    tiktok: "https://www.tiktok.com/@indiandosa_lisboa?_t=ZG-8ys5BhCdXTl&_r=1",
    googleMaps: "https://maps.app.goo.gl/vFhjnR3TECMCjh7TA?g_st=ipc"
  };

  // Utilise les données Sanity si disponibles, sinon les données de fallback
  const displayLogo = !imagesLoading && images?.logo 
    ? urlFor(images.logo).width(64).height(64).url() 
    : fallbackLogo;

  const displayContact = !footerLoading && footerInfo?.contactInfo 
    ? footerInfo.contactInfo 
    : fallbackContact;

  const displaySocial = !footerLoading && footerInfo?.socialMedia 
    ? footerInfo.socialMedia 
    : fallbackSocial;

  const displayCopyright = !footerLoading && footerInfo?.copyright 
    ? footerInfo.copyright[language] || footerInfo.copyright.en 
    : t.footer.copyright;

  return (
    <footer id="contact" className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Logo & Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              {(imagesLoading || footerLoading) ? (
                <div className="w-16 h-16 bg-gray-700 rounded animate-pulse"></div>
              ) : (
                <img 
                  src={displayLogo}
                  alt="Indian Dosa Logo"
                  className="w-16 h-16 object-contain"
                />
              )}
            </div>
            <p className="text-gray-300 mb-4">
              {language === 'en' 
                ? 'Authentic South Indian cuisine in the heart of Lisbon. Experience traditional flavors with a modern touch.'
                : 'Culinária auténtica do Sul da Índia no coração de Lisboa. Experimente sabores tradicionais com um toque moderno.'
              }
            </p>
            <div className="flex items-center space-x-2 text-accent">
              <Clock className="w-5 h-5" />
              <span>
                {displayContact.hours?.[language] || displayContact.hours?.en || t.footer.hours}
              </span>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4">
              {language === 'en' ? 'Contact' : 'Contacto'}
            </h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300">
                <Phone className="w-5 h-5 text-accent" />
                <a href={`tel:${displayContact.phone}`} className="hover:text-accent transition-colors">
                  {displayContact.phone}
                </a>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail className="w-5 h-5 text-accent" />
                <a href={`mailto:${displayContact.email}`} className="hover:text-accent transition-colors">
                  {displayContact.email}
                </a>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">
              {language === 'en' ? 'Follow Us' : 'Siga-nos'}
            </h4>
            <div className="flex space-x-4">
              {displaySocial.instagram && (
                <a
                  href={displaySocial.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 bg-gray-700 hover:bg-accent rounded-full transition-colors duration-200"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {displaySocial.youtube && (
                <a
                  href={displaySocial.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 bg-gray-700 hover:bg-accent rounded-full transition-colors duration-200"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              )}
              {(displaySocial.tiktok || fallbackSocial.tiktok) && (
                <a
                  href={displaySocial.tiktok || fallbackSocial.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 bg-gray-700 hover:bg-accent rounded-full transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </a>
              )}
              {(displaySocial.googleMaps || fallbackSocial.googleMaps) && (
                <a
                  href={displaySocial.googleMaps || fallbackSocial.googleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 bg-gray-700 hover:bg-accent rounded-full transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </a>
              )}
              {displaySocial.whatsapp && (
                <a
                  href={`https://wa.me/${displaySocial.whatsapp.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 bg-gray-700 hover:bg-accent rounded-full transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.108"/>
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>{displayCopyright}</p>
          <div className="mt-4">
            <a
              href="https://www.vasseo.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-gray-400 hover:text-accent transition-colors duration-200 text-sm"
            >
              <span>Created with</span>
              <svg
                className="w-4 h-4 text-accent"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
              <span>by Vasseo</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};