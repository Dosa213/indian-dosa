import { useState, useEffect } from 'react'
import { client } from '../lib/sanity'

/**
 * Hook: useSiteImages
 * Récupère le document siteImages et plusieurs galleries (dosaImages, coffeeGallery, eventsGallery, galleryImages, menuImages)
 * Expose aussi menuPdfUrl (menuPdf.asset->url), storyBackground (image object) et welcomePopupImage / welcomePopupAlt
 */
export const useSiteImages = () => {
  const [images, setImages] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true

    const fetchImages = async () => {
      try {
        const query = `*[_type == "siteImages"][0]{
          title,
          heroImage,
          logo,
          "menuImages": menuImages[]{ image, alt, category },
          "galleryImages": galleryImages[]{ image, alt, caption, order },
          "eventsGallery": eventsGallery[]{ image, alt, caption, order },
          "coffeeGallery": coffeeGallery[]{ image, alt, caption, order },
          "dosaImages": dosaImages[]{ image, alt, caption, order },
          "menuPdfUrl": menuPdf.asset->url,
          "storyBackground": storyBackground,
          "welcomePopupImage": welcomePopupImage,    // objet image complet
          "welcomePopupAlt": welcomePopupAlt         // texte alternatif
        }`

        const result = await client.fetch(query)
        if (mounted) setImages(result)
      } catch (err) {
        console.error('Error fetching site images:', err)
        if (mounted) setError(err)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    fetchImages()
    return () => {
      mounted = false
    }
  }, [])

  return { images, loading, error }
}

/**
 * Wrapper legacy: useSanity()
 * Retourne les champs exposés dans images directement (pour compatibilité avec ton code existant).
 * Exemple d'utilisation : const sanityData = useSanity(); puis sanityData.menuPdfUrl
 */
export const useSanity = () => {
  const { images, loading, error } = useSiteImages()
  // Spread images only si présent, sinon retourne objet vide
  return { ...(images || {}), loading, error }
}

/**
 * Hook: useFooterInfo
 * Récupère le document footerInfo
 */
export const useFooterInfo = () => {
  const [footerInfo, setFooterInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    const fetchFooterInfo = async () => {
      try {
        const query = `*[_type == "footerInfo"][0]{
          title,
          contactInfo{
            phone,
            email,
            hours
          },
          socialMedia,
          copyright
        }`
        const result = await client.fetch(query)
        if (mounted) setFooterInfo(result)
      } catch (err) {
        console.error('Error fetching footer info:', err)
        if (mounted) setError(err)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    fetchFooterInfo()
    return () => { mounted = false }
  }, [])

  return { footerInfo, loading, error }
}

/**
 * Hook: useMenuItems
 * Récupère tous les documents menuItem (triés)
 */
export const useMenuItems = () => {
  const [menuItems, setMenuItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    const fetchMenuItems = async () => {
      try {
        const query = `*[_type == "menuItem"] | order(category asc, name.en asc){
          _id,
          name,
          description,
          price,
          category,
          image,
          isCombo,
          isFeatured,
          tags
        }`
        const result = await client.fetch(query)
        if (mounted) setMenuItems(result)
      } catch (err) {
        console.error('Error fetching menu items:', err)
        if (mounted) setError(err)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    fetchMenuItems()
    return () => { mounted = false }
  }, [])

  return { menuItems, loading, error }
}

/**
 * Hook: useLocations
 * Récupère le document locations (restaurants + foodTruck)
 */
export const useLocations = () => {
  const [locations, setLocations] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    const fetchLocations = async () => {
      try {
        const query = `*[_type == "locations"][0]{
          title,
          restaurants[] {
            name,
            address,
            area,
            phone,
            email,
            mapUrl,
            embedUrl
          },
          foodTruck {
            name,
            description,
            phone,
            email
          }
        }`
        const result = await client.fetch(query)
        if (mounted) setLocations(result)
      } catch (err) {
        console.error('Error fetching locations:', err)
        if (mounted) setError(err)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    fetchLocations()
    return () => { mounted = false }
  }, [])

  return { locations, loading, error }
}

/**
 * Hook: useFeaturedItems
 * Récupère les menuItem où isFeatured == true
 */
export const useFeaturedItems = () => {
  const [featuredItems, setFeaturedItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    const fetchFeaturedItems = async () => {
      try {
        const query = `*[_type == "menuItem" && isFeatured == true] | order(name.en asc){
          _id,
          name,
          description,
          price,
          category,
          image,
          isCombo,
          tags
        }`
        const result = await client.fetch(query)
        if (mounted) setFeaturedItems(result)
      } catch (err) {
        console.error('Error fetching featured items:', err)
        if (mounted) setError(err)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    fetchFeaturedItems()
    return () => { mounted = false }
  }, [])

  return { featuredItems, loading, error }
}
