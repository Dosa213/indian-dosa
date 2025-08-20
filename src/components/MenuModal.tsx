// src/components/MenuModal.tsx
import React from 'react'
import { X } from 'lucide-react'
import { Language } from '../hooks/useLanguage'
import { content } from '../data/content'
import { useSanity } from '../hooks/useSanity'

interface MenuModalProps {
  isOpen: boolean
  onClose: () => void
  language: Language
}

export const MenuModal: React.FC<MenuModalProps> = ({ isOpen, onClose, language }) => {
  const t = content[language]
  const sanityData = useSanity() // wrapper: contient menuPdfUrl si présent
  const loading = (sanityData as any).loading

  if (!isOpen) return null
  if (loading) return null

  const menuPdfUrl = (sanityData as any).menuPdfUrl
  if (!menuPdfUrl) return null

  const getPreviewUrl = (url: string) => {
    // Supporte les liens Google Drive classiques et preview ; sinon renvoie l'URL directe
    // exemple Drive: https://drive.google.com/file/d/ID/view?usp=sharing
    const driveMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)\//)
    if (driveMatch?.[1]) {
      return `https://drive.google.com/file/d/${driveMatch[1]}/preview`
    }
    // si c'est un lien de partage "open?id=ID"
    const openIdMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/)
    if (openIdMatch?.[1]) {
      return `https://drive.google.com/file/d/${openIdMatch[1]}/preview`
    }
    return url
  }

  const pdfUrl = getPreviewUrl(menuPdfUrl)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-2 md:p-4">
      <div className="bg-white rounded-xl w-full h-full max-w-6xl max-h-[98vh] md:max-h-[95vh] relative overflow-hidden">
        <div className="absolute top-2 right-2 md:top-4 md:right-4 z-10">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors bg-white shadow-lg"
            aria-label={t?.menu?.close || 'Close menu'}
          >
            <X className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>
        
        {/* Mobile-friendly iframe container */}
        <div className="w-full h-full relative">
          <iframe
            src={pdfUrl}
            className="w-full h-full border-0 rounded-xl"
            title={t?.menu?.title || 'Menu'}
            allowFullScreen
            style={{
              minHeight: '100%',
              minWidth: '100%'
            }}
          />
          
          {/* Fallback link for mobile if iframe doesn't work well */}
          <div className="md:hidden absolute bottom-4 left-4 right-4">
            <a
              href={menuPdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors"
            >
              {language === 'en' ? 'Open Menu in New Tab' : 'Abrir Menu em Nova Aba'}
            </a>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @media (max-width: 767px) {
          .fixed.inset-0 {
            padding: 8px;
          }
          
          iframe {
            transform: scale(1);
            transform-origin: top left;
          }
        }
      `}</style>
    </div>
  )
}

export default MenuModal