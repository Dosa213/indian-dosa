import { useState, useCallback } from 'react';

export type Language = 'en' | 'pt';

export const useLanguage = () => {
  const [language, setLanguage] = useState<Language>('en');

  const toggleLanguage = useCallback(() => {
    setLanguage(prev => prev === 'en' ? 'pt' : 'en');
  }, []);

  return {
    language,
    setLanguage,
    toggleLanguage,
  };
};