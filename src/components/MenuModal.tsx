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

  const pdfPreviewUrl = getPreviewUrl(menuPdfUrl)

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 p-2 overflow-y-auto"
      // Changed items-center to items-start for better handling on small screens (prevents vertical clipping).
      // Added overflow-y-auto to the outer fixed div as a fallback for extreme cases.
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      {/* Popup — added h-[92vh] to give explicit height, making h-full on children reliable. */}
      <div
        className="relative w-full max-w-4xl h-[92vh] max-h-[92vh] flex flex-col"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {/* Bouton fermer */}
        <button
          onClick={onClose}
          aria-label={t?.menu?.close || 'Close menu'}
          className="absolute top-3 right-3 z-50 p-2 rounded-full backdrop-blur-sm bg-black/40 hover:bg-black/50 text-white shadow"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Wrapper scrollable */}
        <div
          className="w-full h-full overflow-auto"
          style={{
            WebkitOverflowScrolling: 'touch',
            touchAction: 'pan-y'
          }}
        >
          {/* Iframe — changed height to 100% to fill the parent adaptively. Removed minHeight and calc for flexibility. */}
          <iframe
            src={pdfPreviewUrl}
            title={t?.menu?.title || 'Menu'}
            className="w-full h-full"
            style={{
              border: '0',
              borderRadius: 8,
              background: 'transparent'
            }}
            allowFullScreen
            allow="fullscreen"
          />
        </div>
      </div>
    </div>
  )
}

export default MenuModal