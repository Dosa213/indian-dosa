import React from 'react';
import { X } from 'lucide-react';

interface WelcomePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WelcomePopup: React.FC<WelcomePopupProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 p-2 hover:bg-gray-100 rounded-full transition-colors bg-white/90 shadow-lg"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="overflow-hidden rounded-xl">
          <img
            src="https://lh3.googleusercontent.com/pw/AP1GczOpP6y7kFhXQMVqcA5enHR1Rjit44al3n8iA_RWepG81xYCeSlJaUt5giO_y6wUOJ1c9Uzdzay6ZJSoTELOMfHIZ-mnmEEM---NMP3S88rUh2ozX5oQq25Tlt6Z3X4Lyol2G5O_LzEsqww1_3nHkSBy=w900-h1600-s-no-gm?authuser=1"
            alt="Welcome to Indian Dosa"
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
};