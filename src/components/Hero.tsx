import React from 'react';
import { Play, Eye, Calendar } from 'lucide-react';
import { Language } from '../hooks/useLanguage';
import { content } from '../data/content';

interface HeroProps {
  language: Language;
  onMenuClick: () => void;
  onReserveClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ language, onMenuClick, onReserveClick }) => {
  const t = content[language];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: 'url("https://lh3.googleusercontent.com/pw/AP1GczOFP3Ex5PFOy_-__Q7A77xiAseYL-BBeQNnIVYMNDPSHnNUQGGKvsaAGh9yky4VaNqlkXvDr00gZ0oxicXQZeR75JBKxaMeh72vCMvUgdslxpVG9y3qTLBvjAxGg4k7-jn5ciWan3pTWyvEc_YM8uLT=w3216-h2008-s-no-gm?authuser=1")',
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto animate-fade-in">
        <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight">
          {t.hero.title}
        </h1>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <button
            onClick={onMenuClick}
            className="group flex items-center justify-center space-x-3 bg-accent text-gray-900 px-8 py-4 rounded-full text-lg font-semibold hover:bg-accent/90 transform hover:scale-105 transition-all duration-300"
          >
            <Eye className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span>{t.hero.viewMenu}</span>
          </button>
          
          <button
            onClick={onReserveClick}
            className="group flex items-center justify-center space-x-3 bg-secondary text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-secondary/90 transform hover:scale-105 transition-all duration-300"
          >
            <Calendar className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span>{t.hero.reserveTable}</span>
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};