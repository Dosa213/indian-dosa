import React, { useState, useEffect } from 'react';
import { Star, Quote } from 'lucide-react';
import { Language } from '../hooks/useLanguage';
import { content } from '../data/content';

interface TestimonialsProps {
  language: Language;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ language }) => {
  const t = content[language];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleReviews, setVisibleReviews] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 3) % t.testimonials.reviews.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [t.testimonials.reviews.length]);

  const getCurrentReviews = () => {
    const reviews = [];
    for (let i = 0; i < visibleReviews; i++) {
      reviews.push(t.testimonials.reviews[(currentIndex + i) % t.testimonials.reviews.length]);
    }
    return reviews;
  };

  return (
    <section id="reviews" className="py-20 bg-primary text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-display font-bold mb-4">
            {t.testimonials.title}
          </h2>
          <Quote className="w-12 h-12 mx-auto text-accent" />
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {getCurrentReviews().map((review, index) => (
            <div 
              key={`${currentIndex}-${index}`}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-accent fill-current" />
                ))}
              </div>
              <blockquote className="text-white/90 mb-4 italic">
                "{review.text}"
              </blockquote>
              <cite className="text-accent font-semibold">
                — {review.name}
              </cite>
            </div>
          ))}
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center space-x-2 mt-8">
          {Array.from({ length: Math.ceil(t.testimonials.reviews.length / 3) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index * 3)}
              className={`w-3 h-3 rounded-full transition-colors ${
                Math.floor(currentIndex / 3) === index ? 'bg-accent' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};