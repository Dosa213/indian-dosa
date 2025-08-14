// sanity/schemas/index.js
export const schemaTypes = [
  // Schema pour les images du site
  {
    name: 'siteImages',
    title: 'Site Images',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string'
      },
      {
        name: 'heroImage',
        title: 'Hero Background Image',
        type: 'image',
        options: {
          hotspot: true
        }
      },
      {
        name: 'logo',
        title: 'Site Logo',
        type: 'image',
        options: {
          hotspot: true
        }
      },
      {
        name: 'menuImages',
        title: 'Menu Images',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'image',
                title: 'Image',
                type: 'image',
                options: {
                  hotspot: true
                }
              },
              {
                name: 'alt',
                title: 'Alt Text',
                type: 'string'
              },
              {
                name: 'category',
                title: 'Category',
                type: 'string',
                options: {
                  list: [
                    { title: 'Dosas', value: 'dosas' },
                    { title: 'Curries', value: 'curries' },
                    { title: 'Snacks', value: 'snacks' },
                    { title: 'Desserts', value: 'desserts' },
                    { title: 'Beverages', value: 'beverages' }
                  ]
                }
              }
            ]
          }
        ]
      },
      {
        name: 'galleryImages',
        title: 'Food Gallery Images',
        type: 'array',
        of: [
          {
            type: 'image',
            options: {
              hotspot: true
            }
          }
        ]
      }
    ]
  },

  // Schema pour les informations du footer
  {
    name: 'footerInfo',
    title: 'Footer Information',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string'
      },
      {
        name: 'contactInfo',
        title: 'Contact Information',
        type: 'object',
        fields: [
          {
            name: 'phone',
            title: 'Phone Number',
            type: 'string'
          },
          {
            name: 'email',
            title: 'Email Address',
            type: 'string'
          },
          {
            name: 'hours',
            title: 'Opening Hours',
            type: 'object',
            fields: [
              {
                name: 'en',
                title: 'English',
                type: 'string'
              },
              {
                name: 'pt',
                title: 'Portuguese',
                type: 'string'
              }
            ]
          }
        ]
      },
      {
        name: 'socialMedia',
        title: 'Social Media Links',
        type: 'object',
        fields: [
          {
            name: 'instagram',
            title: 'Instagram URL',
            type: 'url'
          },
          {
            name: 'youtube',
            title: 'YouTube URL',
            type: 'url'
          },
          {
            name: 'tiktok',
            title: 'TikTok URL',
            type: 'url'
          },
          {
            name: 'whatsapp',
            title: 'WhatsApp Number',
            type: 'string'
          },
          {
            name: 'googleMaps',
            title: 'Google Maps URL',
            type: 'url'
          }
        ]
      },
      {
        name: 'copyright',
        title: 'Copyright Text',
        type: 'object',
        fields: [
          {
            name: 'en',
            title: 'English',
            type: 'string'
          },
          {
            name: 'pt',
            title: 'Portuguese',
            type: 'string'
          }
        ]
      }
    ]
  },

  // Schema pour le menu
  {
    name: 'menuItem',
    title: 'Menu Items',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Item Name',
        type: 'object',
        fields: [
          {
            name: 'en',
            title: 'English',
            type: 'string'
          },
          {
            name: 'pt',
            title: 'Portuguese',
            type: 'string'
          }
        ]
      },
      {
        name: 'description',
        title: 'Description',
        type: 'object',
        fields: [
          {
            name: 'en',
            title: 'English',
            type: 'text'
          },
          {
            name: 'pt',
            title: 'Portuguese',
            type: 'text'
          }
        ]
      },
      {
        name: 'price',
        title: 'Price',
        type: 'number'
      },
      {
        name: 'category',
        title: 'Category',
        type: 'string',
        options: {
          list: [
            { title: 'Starters', value: 'starters' },
            { title: 'Dosas', value: 'dosas' },
            { title: 'Curries', value: 'curries' },
            { title: 'Snacks', value: 'snacks' },
            { title: 'Desserts', value: 'desserts' },
            { title: 'Beverages', value: 'beverages' }
          ]
        }
      },
      {
        name: 'image',
        title: 'Item Image',
        type: 'image',
        options: {
          hotspot: true
        }
      },
      {
        name: 'isCombo',
        title: 'Is Combo Item',
        type: 'boolean'
      },
      {
        name: 'isFeatured',
        title: 'Featured Item',
        type: 'boolean'
      },
      {
        name: 'tags',
        title: 'Tags',
        type: 'array',
        of: [
          {
            type: 'string',
            options: {
              list: [
                { title: 'Vegan', value: 'vegan' },
                { title: 'Vegetarian', value: 'vegetarian' },
                { title: 'Gluten Free', value: 'gluten-free' },
                { title: 'Spicy', value: 'spicy' },
                { title: 'Popular', value: 'popular' }
              ]
            }
          }
        ]
      }
    ]
  }
]