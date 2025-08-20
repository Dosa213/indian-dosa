import React, { useState } from 'react';
import { useLanguage } from './hooks/useLanguage';
import { LoadingScreen } from './components/LoadingScreen';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Story } from './components/Story';
import { Menu } from './components/Menu';
// nouveau (import par défaut)
import MenuModal from './components/MenuModal'

import { Events } from './components/Events';
import { DosaCoffee } from './components/DosaCoffee';
import { Testimonials } from './components/Testimonials';
import { Locations } from './components/Locations';
import { Footer } from './components/Footer';
import { ReservationModal } from './components/ReservationModal';
import { WelcomePopup } from './components/WelcomePopup';

const useLoading = () => {
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return isLoading;
};

function App() {
  const { language, setLanguage } = useLanguage();
  const isLoading = useLoading();
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const [isWelcomePopupOpen, setIsWelcomePopupOpen] = useState(true);

  const handleReserveClick = () => {
    setIsReservationModalOpen(true);
  };

  const handleMenuClick = () => {
    setIsMenuModalOpen(true);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header 
        language={language}
        onLanguageChange={setLanguage}
        onMenuClick={handleMenuClick}
        onReserveClick={handleReserveClick}
      />
      
      <main>
        <Hero 
          language={language}
          onMenuClick={handleMenuClick}
          onReserveClick={handleReserveClick}
        />
        <Story language={language} />
        <Menu 
          language={language}
          onFullMenuClick={handleMenuClick}
        />
        <DosaCoffee language={language} />
        <Events language={language} />
        <Testimonials language={language} />
        <Locations 
          language={language}
          onReserveClick={handleReserveClick}
        />
      </main>

      <Footer language={language} />

      <MenuModal
        isOpen={isMenuModalOpen}
        onClose={() => setIsMenuModalOpen(false)}
        language={language}
      />

      <ReservationModal
        isOpen={isReservationModalOpen}
        onClose={() => setIsReservationModalOpen(false)}
        language={language}
      />

      <WelcomePopup
        isOpen={isWelcomePopupOpen}
        onClose={() => setIsWelcomePopupOpen(false)}
      />
    </div>
  );
}

export default App;