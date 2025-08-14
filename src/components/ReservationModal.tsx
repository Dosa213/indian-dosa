import React from 'react';
import { X } from 'lucide-react';
import { Language } from '../hooks/useLanguage';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose, language }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full h-[80vh] relative">
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors bg-white shadow-lg"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="w-full h-full rounded-xl overflow-hidden">
          <iframe
            src="https://reservation.umai.io/en/widget/indian-dosa"
            className="w-full h-full border-0"
            title={language === 'en' ? 'Reserve Table' : 'Reservar Mesa'}
          />
        </div>
      </div>
    </div>
  );
};