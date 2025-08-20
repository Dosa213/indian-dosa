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
  const m1 = url.match(/\/d\/([a-zA-Z0-9_-]+)\//)
  if (m1?.[1]) return m1[1]
  const m2 = url.match(/[?&]id=([a-zA-Z0-9_-]+)/)
  if (m2?.[1]) return m2[1]
  return null
}

const getDirectPdfUrl = (url: string | null) => {
  if (!url) return null
  const id = extractDriveFileId(url)
  if (id) return `https://drive.google.com/uc?export=download&id=${id}`
  return url
}

export const MenuModal: React.FC<MenuModalProps> = ({ isOpen, onClose, language }) => {
  const t = content[language]
  const sanityData = useSanity() as any
  const loading = !!sanityData?.loading
  const rawMenuUrl = sanityData?.menuPdfUrl ?? null
  const pdfUrl = getDirectPdfUrl(rawMenuUrl)

  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])
  React.useEffect(() => {
    return () => {
      // cleanup if needed on unmount
    }
  }, [])

  // blob state
  const [blobUrl, setBlobUrl] = React.useState<string | null>(null)
  const [fetchError, setFetchError] = React.useState<string | null>(null)
  const [fetching, setFetching] = React.useState(false)

  React.useEffect(() => {
    if (!isOpen || !pdfUrl) return
    let cancelled = false
    let objectUrl: string | null = null

    async function fetchPdf() {
      setFetching(true)
      setFetchError(null)
      setBlobUrl(null)
      try {
        const resp = await fetch(pdfUrl, { mode: 'cors' })
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`)
        const blob = await resp.blob()
        objectUrl = URL.createObjectURL(blob)
        if (!cancelled) setBlobUrl(objectUrl)
      } catch (err: any) {
        console.error('PDF fetch error:', err)
        if (!cancelled) setFetchError(String(err.message || err))
      } finally {
        if (!cancelled) setFetching(false)
      }
    }

    fetchPdf()

    return () => {
      cancelled = true
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }, [isOpen, pdfUrl])

  if (!mounted) return null
  if (!isOpen) return null

  // Loading UI
  if (loading || fetching) {
    return ReactDOM.createPortal(
      <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 p-4">
        <div className="rounded-lg bg-white/5 p-6">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white mx-auto" />
        </div>
      </div>,
      document.body
    )
  }

  if (!pdfUrl) return null

  const modal = (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-4xl max-h-[92dvh] flex flex-col" style={{ WebkitOverflowScrolling: 'touch' }}>
        <button
          onClick={onClose}
          aria-label={t?.menu?.close || 'Close menu'}
          className="absolute top-3 right-3 z-50 p-2 rounded-full backdrop-blur-sm bg-black/40 hover:bg-black/50 text-white shadow"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-full h-full overflow-auto rounded-lg bg-white" style={{ maxHeight: '92dvh', WebkitOverflowScrolling: 'touch', padding: 8 }}>
          {fetchError ? (
            <div className="p-6 text-center">
              <p className="mb-3">Cannot fetch PDF inline: {fetchError}</p>
              <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="inline-block px-4 py-2 rounded-full bg-primary text-white">
                Open full menu
              </a>
            </div>
          ) : blobUrl ? (
            // embed the blob URL
            <object
              data={blobUrl}
              type="application/pdf"
              className="w-full block"
              style={{ height: 'min(82dvh,900px)', width: '100%', border: 0, borderRadius: 8 }}
            >
              <embed
                src={blobUrl}
                type="application/pdf"
                style={{ height: 'min(82dvh,900px)', width: '100%', border: 0, borderRadius: 8 }}
              />
              <div className="p-6 text-center">
                <p className="mb-3">Cannot display PDF inline.</p>
                <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="inline-block px-4 py-2 rounded-full bg-primary text-white">
                  Open full menu
                </a>
              </div>
            </object>
          ) : (
            <div className="p-6 text-center">
              <p>Preparing PDF...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  return ReactDOM.createPortal(modal, document.body)
}

export default MenuModal
