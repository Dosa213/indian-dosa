import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = sanityClient({
  projectId: 'ee76l8as', // remplace si besoin
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true
})

const builder = imageUrlBuilder(client)

// Retourne null si source invalide (plus tolérant)
export const urlFor = (source) => {
  if (!source) return null
  return builder.image(source)
}
