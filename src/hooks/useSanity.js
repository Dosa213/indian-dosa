// src/hooks/useSanity.js
import { useState, useEffect } from 'react'
import { client } from '../lib/sanity'

// Hook pour récupérer les images du site
export const useSiteImages = () => {
  const [images, setImages] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const query = `*[_type == "siteImages"][0]{
          title,
          heroImage,
          logo,
          menuImages[]{
            image,
            alt,
            category
          },
          galleryImages[]
        }`
        
        const result = await client.fetch(query)
        setImages(result)
      } catch (err) {
        console.error('Error fetching site images:', err)
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchImages()
  }, [])

  return { images, loading, error }
}

// Hook pour récupérer les informations du footer
export const useFooterInfo = () => {
  const [footerInfo, setFooterInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
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
        setFooterInfo(result)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchFooterInfo()
  }, [])

  return { footerInfo, loading, error }
}

// Hook pour récupérer les items du menu
export const useMenuItems = () => {
  const [menuItems, setMenuItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
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
        setMenuItems(result)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchMenuItems()
  }, [])

  return { menuItems, loading, error }
}

// Hook pour récupérer les locations
export const useLocations = () => {
  const [locations, setLocations] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const query = `*[_type == "locations"][0]{
          title,
          restaurants[]{
            name,
            address,
            area,
            phone,
            email,
            mapUrl,
            embedUrl
          },
          foodTruck{
            name,
            description,
            phone,
            email
          }
        }`
        
        const result = await client.fetch(query)
        setLocations(result)
      } catch (err) {
        console.error('Error fetching locations:', err)
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchLocations()
  }, [])

  return { locations, loading, error }
}

// Hook pour récupérer les items featured
export const useFeaturedItems = () => {
  const [featuredItems, setFeaturedItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
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
        setFeaturedItems(result)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedItems()
  }, [])

  return { featuredItems, loading, error }
}