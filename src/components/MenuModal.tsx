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

  const pdfPreviewUrl = getPreviewUrl(menuPdfUrl)

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center"
      onClick={(e) => {
        // fermer si clic sur le fond (pas si clic dans l'iframe)
        if (e.target === e.currentTarget) onClose()
      }}
    >
      {/* Bouton fermer — visible sans panneau blanc */}
      <button
        onClick={onClose}
        aria-label={t?.menu?.close || 'Close menu'}
        className="absolute top-4 right-4 z-50 p-2 rounded-full backdrop-blur-sm bg-black/40 hover:bg-black/50 text-white shadow-lg"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Iframe full-bleed */}
      <iframe
        src={pdfPreviewUrl}
        title={t?.menu?.title || 'Menu'}
        className="w-full h-full border-0"
        style={{
          minHeight: '100vh',
          minWidth: '100vw',
        }}
        allowFullScreen
        allow="fullscreen"
      />
    </div>
  )
}

export default MenuModal
