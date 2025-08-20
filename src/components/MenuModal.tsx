// src/components/MenuModal.tsx
import React from 'react'
import ReactDOM from 'react-dom'
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
  const sanityData = useSanity() as any
  const loading = !!sanityData?.loading
  const menuPdfUrl = sanityData?.menuPdfUrl ?? null

  // Guard for SSR (Next.js etc.)
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])

  if (!mounted) return null
  if (!isOpen) return null
  if (loading) {
    // small spinner while loading
    return ReactDOM.createPortal(
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <div className="rounded-lg bg-white/10 p-6">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white mx-auto" />
        </div>
      </div>,
      document.body
    )
  }
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

  const modal = (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-4xl max-h-[92dvh] flex flex-col"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label={t?.menu?.close || 'Close menu'}
          className="absolute top-3 right-3 z-50 p-2 rounded-full backdrop-blur-sm bg-black/40 hover:bg-black/50 text-white shadow"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scroll wrapper so iframe can be scrolled on small screens */}
        <div
          className="w-full h-full overflow-auto rounded-lg"
          style={{
            maxHeight: '92dvh',
            WebkitOverflowScrolling: 'touch',
            touchAction: 'pan-y'
          }}
        >
          {/* Iframe: use dynamic viewport units (dvh) to avoid mobile address-bar issues */}
          <iframe
            src={pdfPreviewUrl}
            title={t?.menu?.title || 'Menu'}
            className="w-full block"
            style={{
              minHeight: '60dvh',
              height: 'min(82dvh, 900px)',
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

  return ReactDOM.createPortal(modal, document.body)
}

export default MenuModal
