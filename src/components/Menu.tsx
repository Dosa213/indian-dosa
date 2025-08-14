import React from 'react';
import { Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { Language } from '../hooks/useLanguage';
import { content } from '../data/content';

interface MenuProps {
  language: Language;
  onFullMenuClick: () => void;
}

export const Menu: React.FC<MenuProps> = ({ language, onFullMenuClick }) => {
  const t = content[language];

  const featuredItems = [
    {
      ...t.menu.featured.dosaCombo,
      image: 'https://lh3.googleusercontent.com/pw/AP1GczPnDovnFkv276pvpkv-hgAbq1yYWbtX--ivZA38sB_vcrQRr_9eVdNR9q-A2d0-reIZlXGzC0-ftEjIi16KtpZTBbG4WoDXixXqmKQHhg3VYbX3wPZC_iZo98-aRxT-ohsbCix4nJYCybq5boOwH6Yz=w2732-h1536-s-no-gm?authuser=1'
    },
    {
      ...t.menu.featured.bowlCombo,
      image: 'https://lh3.googleusercontent.com/pw/AP1GczNeU6EY4f-o0p08mfPbkkjQJtHrf8U9FQMDa463sZ-YlWGHGOoZ9fFZ6uRXmo1sdUbFKXII0ih4ZsEZSt4WL-RHP_h0aJwVvD1JK7wxnePM_4v7NF1ik6kAXXtWwNEtDTZP1s8wPukpz96bExMvEBY_=w2732-h1536-s-no-gm?authuser=1'
    },
    {
      ...t.menu.featured.samosaCombo,
      image: 'https://lh3.googleusercontent.com/pw/AP1GczOtKuXAZLVOsIBNZE0nabIjH-3Ux5uvgtjuskj_UjIDH1kvApZckgJoarps0BCqWWBPf7CsKlDjEYGoXQvu-6xPBv2FFgjQQ3YGZNLjxb7tM_p6p71aqRaRNlumDJyjqwOO7EF69Aa64J1wHsA_mfg5=w2732-h1536-s-no-gm?authuser=1'
    },
    {
      ...t.menu.featured.rollCombo,
      image: 'https://lh3.googleusercontent.com/pw/AP1GczN9hv4DLAgKIIjAxjXt-T7DzTSzhQQsYXUgg_dc4gxJko-7gV8v2Ar82YaKq8GQVJRCO74gTVIruDJih2z6SaZf-TuwH1hR5S9yWEIR0b9FKAD2gGzTQYvMbY_sMATGXMTH5lS4dKZSgqQQlLkS2iKl=w2732-h1536-s-no-gm?authuser=1'
    }
  ];

  const galleryImages = [
    'https://lh3.googleusercontent.com/pw/AP1GczPZc6pHW83R3pn1w_nJEBjE2ZDqxfLaIIIwVqS4hi2OUoFCCG3V0UOof9mB6o9A5_GaVUSOlCzK3kJ1lgteStI7wqifLB4RmeE3pxR-WT_bEb0cLHQ5Vmztocvqo9yjqp8fJGa6Deq7_oFsyrqy6WNz=w2510-h2008-s-no-gm?authuser=1',
    'https://lh3.googleusercontent.com/pw/AP1GczNI3h8huWGhq-LZF1lRtxwl99RzmR_tSyAj09Gz-xzh7Xx1pUYx0qHH6vxPci5qdlt_-8nTe7bo7YBOeIvXW7lqV04yBEDn7WJVEDAA9YPFZi4UgAjwdOUuYKEF27Bv1RP7S0BIdu15M0mq7DSFzfrX=w2510-h2008-s-no-gm?authuser=1',
    'https://lh3.googleusercontent.com/pw/AP1GczOl3-fUU_SRLya8jrR3fTzxmV5HqlCOASebmdXNeQ0wVMZclrTuyqCm4nQAfjFeLeUAsTVba2cvqJkpHkgWQtd7ZnlkU5Mk63b3Bj4KnD-pnF8ltr5q4ii9qZISjFAMVVMoUMTnNl3uoiH5DVyLLjmB=w2510-h2008-s-no-gm?authuser=1',
    'https://lh3.googleusercontent.com/pw/AP1GczN7_0K0GymRg7IQDD98wUTb04AMfCoy_-p-jeTANRlGbu7KApMD1VGM3kpmr9nm3ZIOJjYXtCBtssZHOPyatMW9qIe86wJB_BsoYMIK6Sw1IN5hnn1dh668_DeM6Qm0xXyyhUWBYJp3vWwPJAlFvlQ3=w2510-h2008-s-no-gm?authuser=1',
    'https://lh3.googleusercontent.com/pw/AP1GczPB4Ll-a9DXjjGtL3vtKopIU89LdBwwe-7r67gAYgP-D8rS7aiiKGazigRQZEi_l7WcSaA28al_PWaJKAoyWprIBkAfr2a66gqB16KR8LLtpQUzcuY5qZlhdeNJC16CozeqX0LdUV099lXowL8hVrWO=w2510-h2008-s-no-gm?authuser=1',
    'https://lh3.googleusercontent.com/pw/AP1GczOi3wWOxW0kHM03msY4zo43Ds5R_WkuulwopgEdRxPA9eqm3wA8SZRyYOgcVvRrgrTF0kmALlBNBfNhI2phLco1U5t3vRr8kbvK8_UpA9_l0WULcmpwxU92R33WD_VsSWNERKvZwR5-IaCgCkXK6lFM=w1156-h921-s-no-gm?authuser=1'
  ];

  return (
    <section id="menu" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-display font-bold text-primary mb-4">
            {t.menu.title}
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            {t.menu.subtitle}
          </p>
          <button
            onClick={onFullMenuClick}
            className="inline-flex items-center space-x-2 bg-primary text-white px-8 py-3 rounded-full hover:bg-primary/90 transition-colors duration-200"
          >
            <Eye className="w-5 h-5" />
            <span>{t.menu.viewFull}</span>
          </button>
        </div>

        {/* Featured Items */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {featuredItems.map((item, index) => (
            <div 
              key={index}
              className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-primary mb-2 text-center">
                  {item.name}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Food Gallery */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-display font-semibold text-primary mb-8">
            {t.menu.gallery}
          </h3>
        </div>
        
        <div className="relative overflow-hidden">
          <div className="flex animate-parallax space-x-6">
            {[...galleryImages, ...galleryImages].map((image, index) => (
              <div key={index} className="flex-shrink-0">
                <img
                  src={image}
                  alt={`Food gallery ${index + 1}`}
                  className="w-64 h-40 object-cover rounded-lg shadow-md"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};