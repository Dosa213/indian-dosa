import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: 'ee76l8as',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01'
})

const builder = imageUrlBuilder(client)

export const urlFor = (source) => builder.image(source)