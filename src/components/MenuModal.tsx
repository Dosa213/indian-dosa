import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Language } from '../hooks/useLanguage';
import { content } from '../data/content';
import { useSanity } from '../hooks/useSanity';

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const MenuModal: React.FC<MenuModalProps> = ({ isOpen, onClose, language }) => {
  const t = content[language];
  const sanityData = useSanity();
  const loading = (sanityData as any).loading;
  const [iframeLoaded, setIframeLoaded] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIframeLoaded(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;
  if (loading) return null;

  const menuPdfUrl = (sanityData as any).menuPdfUrl;
  if (!menuPdfUrl) return null;

  const getPreviewUrl = (url: string) => {
    const driveMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)\//);
    if (driveMatch?.[1]) {
      return `https://drive.google.com/file/d/${driveMatch[1]}/preview`;
    }
    const openIdMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (openIdMatch?.[1]) {
      return `https://drive.google.com/file/d/${openIdMatch[1]}/preview`;
    }
    return url;
  };

  const pdfPreviewUrl = getPreviewUrl(menuPdfUrl);

  const handleIframeLoad = () => {
    setIframeLoaded(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-2 md:p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-transparent w-full max-w-6xl h-full max-h-[95vh] relative">
        {/* Close button only */}
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 z-10 p-2 text-white hover:bg-white/20 rounded-full transition-colors"
          aria-label={t?.menu?.close || 'Close menu'}
        >
          <X className="w-6 h-6" />
        </button>
        
        {/* PDF container */}
        <div className="w-full h-full rounded-lg overflow-hidden bg-transparent">
          {!iframeLoaded && (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <div className="text-center p-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-gray-600">
                  {language === 'en' ? 'Loading menu...' : 'Carregando menu...'}
                </p>
              </div>
            </div>
          )}
          
          <iframe
            src={pdfPreviewUrl}
            className="w-full h-full border-0"
            title={t?.menu?.title || 'Menu'}
            onLoad={handleIframeLoad}
            allowFullScreen
            style={{
              opacity: iframeLoaded ? 1 : 0,
              transition: 'opacity 0.3s ease-in-out'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MenuModal;