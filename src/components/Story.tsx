import React from 'react';
import { useState } from 'react';
import { Heart, Award, Leaf } from 'lucide-react';
import { Language } from '../hooks/useLanguage';
import { content } from '../data/content';

interface StoryProps {
  language: Language;
}

export const Story: React.FC<StoryProps> = ({ language }) => {
  const t = content[language];
  const [showFullStory, setShowFullStory] = useState(false);

  const values = [
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
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: 'url("https://lh3.googleusercontent.com/pw/AP1GczOEFEqceG8NRDdC8jYT1lqU3_-ohXAtvvit-RmkmV7Za4tPGEMjpvC6YRQKqsNfpU4ZHH1QiwFN3Tu6eZaATeXy4Sf3om8HHi8xJ4tWtZBy3i9GLSO8ttaSjKtuG8cQB_15wocCjc93-BvOZ5QnGrxu=w1080-h720-s-no-gm?authuser=1")',
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>
      
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-16 animate-fade-in relative z-10">
          <h2 className="text-4xl font-display font-bold text-white mb-6">
            {t.story.title}
          </h2>
          
          {/* Background Image - positioned to start after title */}
          
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
          {values.map((value, index) => {
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