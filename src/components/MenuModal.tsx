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

const extractDriveFileId = (url: string): string | null => {
  if (!url) return null
  // /d/FILEID/
  const match1 = url.match(/\/d\/([a-zA-Z0-9_-]+)\//)
  if (match1?.[1]) return match1[1]
  // ?id=FILEID or &id=FILEID
  const match2 = url.match(/[?&]id=([a-zA-Z0-9_-]+)/)
  if (match2?.[1]) return match2[1]
  return null
}

const getDirectPdfUrl = (url: string) => {
  if (!url) return null
  const id = extractDriveFileId(url)
  if (id) {
    // direct download/raw file served by Drive (works better with native PDF viewers)
    return `https://drive.google.com/uc?export=download&id=${id}`
  }
  // otherwise assume it's already a direct link to a PDF (or a viewer)
  return url
}

export const MenuModal: React.FC<MenuModalProps> = ({ isOpen, onClose, language }) => {
  const t = content[language]
  const sanityData = useSanity() as any
  const loading = !!sanityData?.loading
  const rawMenuUrl = sanityData?.menuPdfUrl ?? null
  const pdfUrl = getDirectPdfUrl(rawMenuUrl)

  // SSR guard (Next.js)
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])

  if (!mounted) return null
  if (!isOpen) return null

  // Loading state in portal
  if (loading) {
    return ReactDOM.createPortal(
      <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 p-4">
        <div className="rounded-lg bg-white/5 p-6">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white mx-auto" />
        </div>
      </div>,
      document.body
    )
  }

  if (!pdfUrl) {
    // nothing to show
    return null
  }

  const modal = (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      role="dialog"
      aria-modal="true"
      aria-label={t?.menu?.title || 'Menu'}
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

        {/* Scrollable wrapper */}
        <div
          className="w-full h-full overflow-auto rounded-lg bg-white"
          style={{
            maxHeight: '92dvh',
            WebkitOverflowScrolling: 'touch',
            touchAction: 'pan-y',
            padding: 8
          }}
        >
          {/* Primary embed using <object> */}
          <object
            data={pdfUrl}
            type="application/pdf"
            className="w-full block"
            style={{
              height: 'min(82dvh, 900px)',
              width: '100%',
              border: '0',
              borderRadius: 8,
            }}
          >
            {/* Fallback <embed> for browsers that prefer it */}
            <embed
              src={pdfUrl}
              type="application/pdf"
              style={{
                height: 'min(82dvh, 900px)',
                width: '100%',
                border: '0',
                borderRadius: 8,
              }}
            />
            {/* Final fallback: link to open in new tab */}
            <div className="p-6 text-center">
              <p className="mb-3">
                {t?.menu?.cannotDisplayPdfMessage ??
                  'Cannot display PDF inline. Click the button below to open the full menu.'}
              </p>
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 rounded-full bg-primary text-white hover:bg-primary/90"
                onClick={(e) => {
                  // allow link to open but also close the modal
                  onClose()
                }}
              >
                {t?.menu?.openFullMenu || 'Open full menu'}
              </a>
            </div>
          </object>
        </div>
      </div>
    </div>
  )

  return ReactDOM.createPortal(modal, document.body)
}

export default MenuModal
