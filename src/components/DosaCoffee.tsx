// src/components/DosaCoffee.tsx
import React, { useEffect, useState } from 'react'
import { Coffee, ChevronLeft, ChevronRight } from 'lucide-react'
import { Language } from '../hooks/useLanguage'
import { content } from '../data/content'
import { useSiteImages } from '../hooks/useSanity'
import { urlFor } from '../lib/sanity'

interface DosaCoffeeProps {
  language: Language
}

const STATIC_COFFEE_IMAGES = [
  'https://lh3.googleusercontent.com/pw/AP1GczNJEDllUBSBd-hNZSlJP2YbOA_BBZVhzArZB8slbM3p0Tm7LgyA2iuI8KY9k_m-GNQvD2GLoM-YbgCWCGJH3AlqMcExAv-DM2P65k4yNEduLPQqzqNa9JF0dqH4wl2Uuvj2uI6jP4ck78lmnCUpaPtC=w2800-h1945-s-no-gm?authuser=1',
  'https://lh3.googleusercontent.com/pw/AP1GczPvRnup3EN9_NMcEcQSnWsIsMkOUKuF5MXXcncjp11OQpHZchWppuDDfMCZ7UfzJTgRQWRSFy9q_xXkfMgipGiZ361fSbn_Lfu0Gx_YzHCoxCPhnru21urLdagNiiwwM7wuYU4bIW4UkYLCLx34ty34=w750-h560-s-no-gm?authuser=1',
  'https://lh3.googleusercontent.com/pw/AP1GczOtSUJH2170ZyqcvgU2bLMS0wQHoOLMH9NHIWeDnPRnGHyLYHlpZoBU0gQR7O0WOGrNiU_bu4xTA45ht0evs1dhz2O8wsiuI-etKtXVY2gSV3ZOceLNY6gj5L92wg9xRht8zfwea8wit4SiT9ItE8p7=w3014-h2008-s-no-gm?authuser=1',
  'https://lh3.googleusercontent.com/pw/AP1GczNxp_loU12aJFvk43KstXXP4WOVNEPYqckYP-pA457vcWuHiwSaL3dj-nFE7zI4k6NUxsb-rXvT9XjQm90xFofXeiXSWuMY92sEQ5CpHjxK2ZSQ8wwIl_GzXwLTTplrzp8sWbUFWjitjDP8NyFk8BxA=w600-h400-s-no-gm?authuser=1'
]

const PLACEHOLDER = 'https://via.placeholder.com/1200x800?text=No+Image'

const safeUrlFor = (imgOrRef: any, opts?: { width?: number; height?: number }) => {
  try {
    if (!imgOrRef) return null
    if (typeof imgOrRef === 'string') return imgOrRef
    const source = imgOrRef.image ?? imgOrRef
    if (!source) return null
    const builder = urlFor(source)
    if (!builder) return null
    let b = builder
    if (opts?.width) b = b.width(opts.width)
    if (opts?.height) b = b.height(opts.height)
    b = b.auto('format')
    return b.url()
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn('safeUrlFor error for', imgOrRef, err)
    return null
  }
}

export const DosaCoffee: React.FC<DosaCoffeeProps> = ({ language }) => {
  const t = content[language]
  const { images, loading: imagesLoading } = useSiteImages()
  const [currentImage, setCurrentImage] = useState(0)

  // Priorité : dosaImages -> coffeeGallery -> eventsGallery -> galleryImages -> static
  const raw =
    images?.dosaImages ??
    images?.coffeeGallery ??
    images?.eventsGallery ??
    images?.galleryImages ??
    []

  const galleryUrls = (raw || [])
    .map((it: any) => safeUrlFor(it.image ?? it, { width: 1600, height: 900 }))
    .filter(Boolean) as string[]

  const displayImages = galleryUrls.length > 0 ? galleryUrls : STATIC_COFFEE_IMAGES

  useEffect(() => {
    if (!displayImages.length) return
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % displayImages.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [displayImages.length])

  const nextImage = () => setCurrentImage((p) => (p + 1) % displayImages.length)
  const prevImage = () => setCurrentImage((p) => (p - 1 + displayImages.length) % displayImages.length)

  const currentSrc = displayImages[currentImage] ?? PLACEHOLDER

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <div className="flex items-center space-x-3 mb-6">
              <Coffee className="w-8 h-8 text-accent" />
              <h2 className="text-4xl font-display font-bold text-primary">{t.dosaCoffee.title}</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">{t.dosaCoffee.subtitle}</p>
          </div>

          <div className="relative animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="relative overflow-hidden rounded-xl shadow-xl">
              <img src={currentSrc} alt={t.dosaCoffee.title} className="w-full h-80 object-cover" loading="lazy" />

              <button onClick={prevImage} className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-colors" aria-label="Previous image">
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button onClick={nextImage} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-colors" aria-label="Next image">
                <ChevronRight className="w-6 h-6" />
              </button>

              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {displayImages.map((_, index) => (
                  <button key={index} onClick={() => setCurrentImage(index)} className={`w-3 h-3 rounded-full transition-colors ${index === currentImage ? 'bg-white' : 'bg-white/50'}`} aria-label={`Image ${index + 1}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
