import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas/index.js'

export default defineConfig({
  name: 'indian-dosa',
  title: 'Indian Dosa Website',
  projectId: 'ee76l8as',
  dataset: 'production',
  plugins: [
    structureTool(),
    visionTool()
  ],
  schema: {
    types: schemaTypes,
  },
})