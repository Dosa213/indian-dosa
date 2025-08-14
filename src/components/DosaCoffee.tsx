import React, { useState } from 'react';
import { Coffee, ChevronLeft, ChevronRight } from 'lucide-react';
import { Language } from '../hooks/useLanguage';
import { content } from '../data/content';

interface DosaCoffeeProps {
  language: Language;
}

export const DosaCoffee: React.FC<DosaCoffeeProps> = ({ language }) => {
  const t = content[language];
  const [currentImage, setCurrentImage] = useState(0);

  const coffeeImages = [
    'https://lh3.googleusercontent.com/pw/AP1GczNJEDllUBSBd-hNZSlJP2YbOA_BBZVhzArZB8slbM3p0Tm7LgyA2iuI8KY9k_m-GNQvD2GLoM-YbgCWCGJH3AlqMcExAv-DM2P65k4yNEduLPQqzqNa9JF0dqH4wl2Uuvj2uI6jP4ck78lmnCUpaPtC=w2800-h1945-s-no-gm?authuser=1',
    'https://lh3.googleusercontent.com/pw/AP1GczPvRnup3EN9_NMcEcQSnWsIsMkOUKuF5MXXcncjp11OQpHZchWppuDDfMCZ7UfzJTgRQWRSFy9q_xXkfMgipGiZ361fSbn_Lfu0Gx_YzHCoxCPhnru21urLdagNiiwwM7wuYU4bIW4UkYLCLx34ty34=w750-h560-s-no-gm?authuser=1',
    'https://lh3.googleusercontent.com/pw/AP1GczOtSUJH2170ZyqcvgU2bLMS0wQHoOLMH9NHIWeDnPRnGHyLYHlpZoBU0gQR7O0WOGrNiU_bu4xTA45ht0evs1dhz2O8wsiuI-etKtXVY2gSV3ZOceLNY6gj5L92wg9xRht8zfwea8wit4SiT9ItE8p7=w3014-h2008-s-no-gm?authuser=1',
    'https://lh3.googleusercontent.com/pw/AP1GczNxp_loU12aJFvk43KstXXP4WOVNEPYqckYP-pA457vcWuHiwSaL3dj-nFE7zI4k6NUxsb-rXvT9XjQm90xFofXeiXSWuMY92sEQ5CpHjxK2ZSQ8wwIl_GzXwLTTplrzp8sWbUFWjitjDP8NyFk8BxA=w600-h400-s-no-gm?authuser=1',
    'https://lh3.googleusercontent.com/pw/AP1GczOCEzFUCJFY_Orb_MrendmOTr3i3ePTfLbwqmBpgs38MfE1M598KG_gnEpcIQvp5ILcytmVTFtjgf1eQWQ41CupRzq6lq-i4d1E9H0SrESdZ6mZVXZyLszMIPQVPCZDnRXQz5dVMH1Sw6ODW2KZ_70X=w2764-h1842-s-no-gm?authuser=1',
    'https://lh3.googleusercontent.com/pw/AP1GczMS2FEPjA0wMljivVC-lxOFFZYx0_g6cgFCm9QlYVXLcV4lfIPcQZ5h6uVIAFj1sXOps7ewciYc1cvAkaCgmbtFdPqMUPNquN-z9fJjLquR-0Q9tIxN85QIruQSQAdMcWkzKjfag8GYmtfLA9LDzhkn=w2676-h2008-s-no-gm?authuser=1',
    'https://lh3.googleusercontent.com/pw/AP1GczNn5HaCO8sA6lrO1VhBvBA090GeGsJKDReu3cxti6s_YxJAHOIul6BiMeB1iucilxPG9UckKTqUxMy0PdnewQ-d-VvT7TT6ptaerTXs40E8G-lbM8P_Xg4S_ACQRu9qp-7cYiaUzWYpgyMILd9d__77=w1986-h1408-s-no-gm?authuser=1',
    'https://lh3.googleusercontent.com/pw/AP1GczOnizUO-6bh4jp9Vu-JamRlWY1tm64l9veM6iW7LSFeLco4BHjVKZNd4qjxCjEpduyZfnN6LLm4qMj2oqqUd8XPHnZmy53gTx9s8a3iiXbeOAFSYrpgn3LyagEeF5h18vM4zDMZ3XaP8NgJ9Dx7I79A=w2626-h2008-s-no-gm?authuser=1'
  ];

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % coffeeImages.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + coffeeImages.length) % coffeeImages.length);
  };

  // Auto-slideshow effect
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % coffeeImages.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [coffeeImages.length]);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="animate-fade-in">
            <div className="flex items-center space-x-3 mb-6">
              <Coffee className="w-8 h-8 text-accent" />
              <h2 className="text-4xl font-display font-bold text-primary">
                {t.dosaCoffee.title}
              </h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              {t.dosaCoffee.subtitle}
            </p>
          </div>

          {/* Coffee Gallery Carousel */}
          <div className="relative animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="relative overflow-hidden rounded-xl shadow-xl">
              <img
                src={coffeeImages[currentImage]}
                alt={`Filter Coffee ${currentImage + 1}`}
                className="w-full h-80 object-cover"
                loading="lazy"
              />
              
              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
              
              {/* Dots Indicator */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {coffeeImages.map((_, index) => (
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
          </div>
        </div>
      </div>
    </section>
  );
};