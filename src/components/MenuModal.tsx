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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      {/* Modal container */}
      <div className="relative w-full max-w-6xl h-full max-h-[90vh] bg-white rounded-lg overflow-hidden flex flex-col">
        {/* Header with close button */}
        <div className="flex justify-between items-center p-4 border-b bg-white">
          <h2 className="text-xl font-semibold text-primary">{t?.menu?.title || 'Menu'}</h2>
          <button
            onClick={onClose}
            aria-label={t?.menu?.close || 'Close menu'}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Iframe container */}
        <div className="flex-1 overflow-hidden">
          <iframe
            src={pdfPreviewUrl}
            title={t?.menu?.title || 'Menu'}
            className="w-full h-full"
            style={{
              border: 'none',
              minHeight: '500px'
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