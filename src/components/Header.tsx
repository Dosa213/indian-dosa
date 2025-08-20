import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Language } from '../hooks/useLanguage';
import { content } from '../data/content';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onMenuClick: () => void;
  onReserveClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  language, 
  onLanguageChange, 
  onMenuClick,
  onReserveClick 
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const t = content[language];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { key: 'home', href: '#home' },
    { key: 'menu', href: '#menu' },
    { key: 'locations', href: '#locations' },
    { key: 'events', href: '#events' },
    { key: 'about', href: '#about' },
    { key: 'reviews', href: '#reviews' },
    { key: 'contact', href: '#contact' }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white shadow-lg py-2' 
        : 'bg-white/95 backdrop-blur-sm py-2'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center space-x-2 cursor-pointer">
  <img 
    src="https://lh3.googleusercontent.com/pw/AP1GczOaKawDXoEOBqw1IJmYtMUxQ3bB_CtiQ_SC5D0M0BfEU7G0efxHOoCtt2uw6lVNv1nezoycIqF1NyzeruFW_JgPk36xfUA62gthvjww1ejrQW_-yMm6S0UEBGn9EepJdeUzaMYAQXZvgK8Fcp718w7j=w1277-h1280-s-no-gm?authuser=1"
    alt="Indian Dosa Logo"
    className="w-14 h-14 object-contain"
  />
</a>


          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="text-gray-700 hover:text-primary transition-colors duration-200"
              >
                {t.nav[item.key as keyof typeof t.nav]}
              </a>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="flex items-center bg-gray-100 rounded-full p-1">
              <button
                onClick={() => onLanguageChange('en')}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  language === 'en' 
                    ? 'bg-primary text-white' 
                    : 'text-gray-600 hover:text-primary'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => onLanguageChange('pt')}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  language === 'pt' 
                    ? 'bg-primary text-white' 
                    : 'text-gray-600 hover:text-primary'
                }`}
              >
                PT
              </button>
            </div>

            {/* Reserve Button */}
            <button
              onClick={onReserveClick}
              className="hidden md:flex items-center space-x-2 bg-secondary text-white px-6 py-2 rounded-full hover:bg-secondary/90 transition-colors duration-200"
            >
              <Phone className="w-4 h-4" />
              <span>{t.nav.reserve}</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 py-4 border-t">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  className="text-gray-700 hover:text-primary transition-colors duration-200 py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t.nav[item.key as keyof typeof t.nav]}
                </a>
              ))}
              <button
                onClick={() => {
                  onReserveClick();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center space-x-2 bg-secondary text-white px-6 py-3 rounded-full hover:bg-secondary/90 transition-colors duration-200 mt-4"
              >
                <Phone className="w-4 h-4" />
                <span>{t.nav.reserve}</span>
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};