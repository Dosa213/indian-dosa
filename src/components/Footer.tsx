import React from 'react';
import { Instagram, Youtube, Clock, Music } from 'lucide-react';
import { Language } from '../hooks/useLanguage';
import { content } from '../data/content';

interface FooterProps {
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  const t = content[language];

  const footerLinks = [
    { key: 'home', href: '#home' },
    { key: 'menu', href: '#menu' },
    { key: 'locations', href: '#locations' },
    { key: 'events', href: '#events' },
    { key: 'contact', href: '#contact' }
  ];

  return (
    <footer id="contact" className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo & Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <img 
                src="https://lh3.googleusercontent.com/pw/AP1GczOaKawDXoEOBqw1IJmYtMUxQ3bB_CtiQ_SC5D0M0BfEU7G0efxHOoCtt2uw6lVNv1nezoycIqF1NyzeruFW_JgPk36xfUA62gthvjww1ejrQW_-yMm6S0UEBGn9EepJdeUzaMYAQXZvgK8Fcp718w7j=w1277-h1280-s-no-gm?authuser=1"
                alt="Indian Dosa Logo"
                className="w-16 h-16 object-contain"
              />
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              {language === 'en' 
                ? 'Authentic South Indian cuisine in the heart of Lisbon. Experience traditional flavors with a modern touch.'
                : 'Culinária auténtica do Sul da Índia no coração de Lisboa. Experimente sabores tradicionais com um toque moderno.'
              }
            </p>
            <div className="flex items-center space-x-2 text-accent">
              <Clock className="w-5 h-5" />
              <span>{t.footer.hours}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">
              {language === 'en' ? 'Quick Links' : 'Links Rápidos'}
            </h4>
            <nav className="flex flex-col space-y-2">
              {footerLinks.map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  className="text-gray-300 hover:text-accent transition-colors duration-200"
                >
                  {t.nav[link.key as keyof typeof t.nav]}
                </a>
              ))}
            </nav>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">
              {language === 'en' ? 'Follow Us' : 'Siga-nos'}
            </h4>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/indiandosa_lisboa"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 bg-gray-700 hover:bg-accent rounded-full transition-colors duration-200"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com/@Indiandosa"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 bg-gray-700 hover:bg-accent rounded-full transition-colors duration-200"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="https://www.tiktok.com/@indiandosa_lisboa?_t=ZG-8ys5BhCdXTl&_r=1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 bg-gray-700 hover:bg-accent rounded-full transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
              <a
                href="https://maps.app.goo.gl/vFhjnR3TECMCjh7TA?g_st=ipc"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 bg-gray-700 hover:bg-accent rounded-full transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>{t.footer.copyright}</p>
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