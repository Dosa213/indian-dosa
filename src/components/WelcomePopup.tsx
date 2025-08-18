// src/components/WelcomePopup.tsx
import React from 'react'
import { X } from 'lucide-react'
import { useSiteImages } from '../hooks/useSanity'
import { urlFor } from '../lib/sanity'

interface WelcomePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WelcomePopup: React.FC<WelcomePopupProps> = ({ isOpen, onClose }) => {
  const { images, loading } = useSiteImages()

  if (!isOpen) return null
  if (loading) return null

  // si image présente dans Sanity -> construire l'URL via urlFor
  const imgObj = images?.welcomePopupImage
  const src = imgObj ? urlFor(imgObj).auto('format').width(1200).url() : null
  const alt = images?.welcomePopupAlt || 'Welcome to Indian Dosa'

  // fallback si pas d'image configurée
  const fallback = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=60'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 p-2 hover:bg-gray-100 rounded-full transition-colors bg-white/90 shadow-lg"
          aria-label="Close welcome popup"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-hidden rounded-xl">
          <img
            src={src || fallback}
            alt={alt}
            className="w-full h-auto object-contain"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  )
}

export default WelcomePopup
