// src/components/Story.tsx
import React from 'react';
import { useState } from 'react';
import { Heart, Award, Leaf } from 'lucide-react';
import { Language } from '../hooks/useLanguage';
import { content } from '../data/content';
import { useSiteImages } from '../hooks/useSanity';
import { urlFor } from '../lib/sanity';

interface StoryProps {
  language: Language;
}

export const Story: React.FC<StoryProps> = ({ language }) => {
  const t = content[language];
  const [showFullStory, setShowFullStory] = useState(false);
  const { images, loading } = useSiteImages();

  // Génère l'URL avec urlFor si l'image existe dans Sanity
  const bgSrc = images?.storyBackground ? urlFor(images.storyBackground).auto('format').width(2000).url() : null

  // fallback (optionnel) : remplace par une image locale si tu préfères
  const fallback = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=60'

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: bgSrc ? `url("${bgSrc}")` : `url("${fallback}")`,
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>
      
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-16 animate-fade-in relative z-10">
          <h2 className="text-4xl font-display font-bold text-white mb-6">
            {t.story.title}
          </h2>
          
          <div className="text-lg text-white leading-relaxed mb-4 space-y-4">
            {t.story.text.split('\n\n').map((paragraph, index) => (
              <div key={index}>
                {index === 0 || showFullStory ? (
                  <p className="text-justify max-w-3xl mx-auto">
                    {paragraph}
                  </p>
                ) : null}
                {index === 0 && !showFullStory && (
                  <div className="text-center mt-6">
                    <button
                      onClick={() => setShowFullStory(true)}
                      className="inline-flex items-center px-6 py-2 bg-accent text-gray-900 rounded-full hover:bg-accent/90 transition-colors duration-200 text-sm font-medium"
                    >
                      {language === 'en' ? 'Learn More' : 'Saber Mais'}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto relative z-10">
          {[
            {
              icon: Award,
              title: t.story.values.authenticity.title,
              desc: t.story.values.authenticity.desc
            },
            {
              icon: Heart,
              title: t.story.values.passion.title,
              desc: t.story.values.passion.desc
            },
            {
              icon: Leaf,
              title: t.story.values.savor.title,
              desc: t.story.values.savor.desc
            }
          ].map((value, index) => {
            const Icon = value.icon;
            return (
              <div 
                key={index}
                className="text-center group animate-slide-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  {value.title}
                </h3>
                <p className="text-white/90">
                  {value.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Story;
