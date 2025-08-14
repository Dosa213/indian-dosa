import React from 'react';
import { X } from 'lucide-react';
import { Language } from '../hooks/useLanguage';
import { content } from '../data/content';

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const MenuModal: React.FC<MenuModalProps> = ({ isOpen, onClose, language }) => {
  const t = content[language];

  if (!isOpen) return null;

  // Convert Google Drive link to embeddable format
  const pdfUrl = "https://drive.google.com/file/d/14m0fsVj_weamgQ2Tceps6wckzrxuQE0P/preview";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-xl w-full h-full max-w-6xl max-h-[95vh] relative overflow-hidden">
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors bg-white shadow-lg"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="w-full h-full">
          <iframe
            src={pdfUrl}
            className="w-full h-full border-0 rounded-xl"
            title={t.menu.title}
            allow="autoplay"
          />
        </div>
      </div>
    </div>
  );
};