// src/components/Events.tsx
import React, { useEffect, useState } from 'react'
import { Truck, Calendar, Send } from 'lucide-react'
import { Language } from '../hooks/useLanguage'
import { content } from '../data/content'
import { useSiteImages } from '../hooks/useSanity'
import { urlFor } from '../lib/sanity'

interface EventsProps {
  language: Language;
}

const EventsGallery: React.FC = () => {
  const { images, loading } = useSiteImages()
  const [currentImage, setCurrentImage] = useState(0)

  const gallery = images?.eventsGallery ?? []
  const sortedGallery = [...gallery].sort((a: any, b: any) => (a?.order ?? 0) - (b?.order ?? 0))

  useEffect(() => {
    if (!sortedGallery.length) return
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % sortedGallery.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [sortedGallery.length])

  if (loading) return <div className="w-full h-80 flex items-center justify-center">Chargement...</div>
  if (!sortedGallery.length) return <div className="w-full h-80 flex items-center justify-center text-gray-500">Aucune image pour les événements</div>

  return (
    <div className="relative w-full h-80 rounded-lg overflow-hidden shadow-lg">
      {sortedGallery.map((item: any, index: number) => {
        const src = urlFor(item.image).auto('format').width(2000).url()
        const alt = item.alt || `Event image ${index + 1}`
        return (
          <img
            key={index}
            src={src}
            alt={alt}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${index === currentImage ? 'opacity-100' : 'opacity-0'}`}
            loading="lazy"
          />
        )
      })}

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {sortedGallery.map((_: any, index: number) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`w-3 h-3 rounded-full transition-colors ${index === currentImage ? 'bg-white' : 'bg-white/50'}`}
            aria-label={`Afficher l'image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export const Events: React.FC<EventsProps> = ({ language }) => {
  const t = content[language]
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: '',
    date: '',
    guests: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<{ ok: boolean; message: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus(null)

    // client-side validation minimal
    if (!formData.name || !formData.email || !formData.type || !formData.date) {
      setStatus({ ok: false, message: language === 'en' ? 'Please fill required fields' : 'Veuillez remplir les champs requis' })
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/send-event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      if (!res.ok) {
        setStatus({ ok: false, message: data?.message || 'Error sending request' })
      } else {
        setStatus({ ok: true, message: language === 'en' ? 'Request sent — we will contact you soon.' : 'Demande envoyée — nous vous contacterons bientôt.' })
        setFormData({ name: '', email: '', type: '', date: '', guests: '', message: '' })
      }
    } catch (err) {
      console.error(err)
      setStatus({ ok: false, message: language === 'en' ? 'Network error' : 'Erreur réseau' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="events" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-display font-bold text-primary mb-4">
            {t.events.title}
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            {t.events.subtitle}
          </p>
          <div className="flex items-center justify-center space-x-8 text-accent font-semibold">
            <span className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>{t.events.stats}</span>
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Food Truck Gallery */}
          <div className="animate-slide-up">
            <EventsGallery />
          </div>

          {/* Booking Form */}
          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-xl p-8">
              <h3 className="text-2xl font-semibold text-primary mb-6 flex items-center space-x-2">
                <Truck className="w-6 h-6" />
                <span>{t.events.bookTruck}</span>
              </h3>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder={t.events.form.name}
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
                <input
                  type="email"
                  placeholder={t.events.form.email}
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder={t.events.form.type}
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
                <input
                  type="date"
                  placeholder={t.events.form.date}
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>

              <input
                type="number"
                placeholder={t.events.form.guests}
                value={formData.guests}
                onChange={(e) => setFormData({...formData, guests: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent mb-4"
                required
              />

              <textarea
                placeholder={t.events.form.message}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent mb-6"
              />

              {status && (
                <div className={`mb-4 text-sm ${status.ok ? 'text-green-600' : 'text-red-600'}`}>
                  {status.message}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-secondary text-white py-3 rounded-lg hover:bg-secondary/90 transition-colors duration-200 flex items-center justify-center space-x-2 disabled:opacity-60"
              >
                <Send className="w-5 h-5" />
                <span>{loading ? (language === 'en' ? 'Sending...' : 'Envoi...') : t.events.bookTruck}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Events
