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
  const sanityData = useSanity()
  const loading = (sanityData as any).loading

  if (!isOpen) return null
  if (loading) return null

  const menuPdfUrl = (sanityData as any).menuPdfUrl
  if (!menuPdfUrl) return null

  const getPreviewUrl = (url: string) => {
    const driveMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)\//)
    if (driveMatch?.[1]) {
      return `https://drive.google.com/file/d/${driveMatch[1]}/preview`
    }
    const openIdMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/)
    if (openIdMatch?.[1]) {
      return `https://drive.google.com/file/d/${openIdMatch[1]}/preview`
    }
    return url
  }

  // Google Docs Viewer (fallback) - utile si l'embed natif échoue
  const getGViewUrl = (url: string) => {
    // gview nécessite une url accessible publiquement (direct link). Si tu utilises drive preview, gview peut ne pas fonctionner.
    return `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(url)}`
  }

  const pdfPreviewUrl = getPreviewUrl(menuPdfUrl)

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-1 md:p-4"
      onClick={(e) => {
        // fermer si clic sur le background (pas si clic dans la modale)
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        className="bg-white rounded-xl w-full h-full max-w-6xl max-h-[99vh] md:max-h-[95vh] relative overflow-hidden"
        style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.25)' }}
      >
        <div className="absolute top-2 right-2 md:top-4 md:right-4 z-10">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors bg-white shadow-lg"
            aria-label={t?.menu?.close || 'Close menu'}
          >
            <X className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>

        {/* Contenu scrollable de la modale */}
        <div
          className="w-full h-full relative overflow-auto"
          style={{
            maxHeight: 'calc(100vh - 2rem)',
            WebkitOverflowScrolling: 'touch',
            padding: 8
          }}
        >
          {/* Essayons d'abord <object> (meilleur rendu natif pour PDF) */}
          <object
            data={pdfPreviewUrl}
            type="application/pdf"
            aria-label={t?.menu?.title || 'Menu'}
            className="w-full h-full"
            style={{ minHeight: '70vh', borderRadius: 12 }}
          >
            {/* Fallback si <object> n'affiche pas le PDF : Google Viewer ou iframe */}
            <iframe
              src={getGViewUrl(pdfPreviewUrl)}
              title={t?.menu?.title || 'Menu'}
              className="w-full h-full border-0"
              style={{ minHeight: '70vh', borderRadius: 12 }}
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
            />
          </object>
        </div>
      </div>
    </div>
  )
}

export default MenuModal
