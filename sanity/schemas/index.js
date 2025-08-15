// sanity/schemas/index.js
export const schemaTypes = [
  // Schema pour les images du site
  {
    name: 'siteImages',
    title: 'Site Images',
    type: 'document',
    fields: [
      { name: 'title', title: 'Title', type: 'string' },
      {
        name: 'heroImage',
        title: 'Hero Background Image',
        type: 'image',
        options: { hotspot: true }
      },
      {
        name: 'logo',
        title: 'Site Logo',
        type: 'image',
        options: { hotspot: true }
      },

      // menuImages
      {
        name: 'menuImages',
        title: 'Menu Images',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
              { name: 'alt', title: 'Alt Text', type: 'string' },
              {
                name: 'category',
                title: 'Category',
                type: 'string',
                options: { list: [
                  { title: 'Dosas', value: 'dosas' },
                  { title: 'Curries', value: 'curries' },
                  { title: 'Snacks', value: 'snacks' },
                  { title: 'Desserts', value: 'desserts' },
                  { title: 'Beverages', value: 'beverages' }
                ]}
              }
            ]
          }
        ]
      },

      // Food gallery (garder si tu veux)
      {
        name: 'galleryImages',
        title: 'Food Gallery Images',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
              { name: 'alt', title: 'Alt Text', type: 'string' },
              { name: 'caption', title: 'Caption', type: 'string' }
            ]
          }
        ],
        options: { sortable: true }
      },

      // Events gallery (déjà demandé)
      {
        name: 'eventsGallery',
        title: 'Events Gallery Images',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
              { name: 'alt', title: 'Alt Text', type: 'string' },
              { name: 'caption', title: 'Caption', type: 'string' },
              { name: 'order', title: 'Order', type: 'number' }
            ]
          }
        ],
        options: { sortable: true }
      },

      // Coffee gallery (optionnel)
      {
        name: 'coffeeGallery',
        title: 'Coffee Gallery Images',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
              { name: 'alt', title: 'Alt Text', type: 'string' },
              { name: 'caption', title: 'Caption', type: 'string' },
              { name: 'order', title: 'Order', type: 'number' }
            ]
          }
        ],
        options: { sortable: true }
      },

      // NOUVEAU : dosaImages (images spécifiques aux Dosa/Coffee section)
      {
        name: 'dosaImages',
        title: 'Dosa / Coffee Images',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
              { name: 'alt', title: 'Alt Text', type: 'string' },
              { name: 'caption', title: 'Caption', type: 'string' },
              { name: 'order', title: 'Order', type: 'number' }
            ]
          }
        ],
        options: { sortable: true }
      }

      // (tu peux ajouter d'autres champs plus bas si nécessaire)
    ]
  },

  // other schemas (locations, footerInfo, menuItem) — copie les tiennes ici
  {
    name: 'locations',
    title: 'Locations',
    type: 'document',
    fields: [
      { name: 'title', title: 'Title', type: 'string' },
      {
        name: 'restaurants',
        title: 'Restaurant Locations',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              { name: 'name', title: 'Restaurant Name', type: 'string' },
              { name: 'address', title: 'Full Address', type: 'text' },
              { name: 'area', title: 'Area/Neighborhood', type: 'string' },
              { name: 'phone', title: 'Phone Number', type: 'string' },
              { name: 'email', title: 'Email Address', type: 'string' },
              { name: 'mapUrl', title: 'Google Maps URL', type: 'url' },
              { name: 'embedUrl', title: 'Google Maps Embed URL', type: 'url' }
            ]
          }
        ]
      },
      {
        name: 'foodTruck',
        title: 'Food Truck Information',
        type: 'object',
        fields: [
          {
            name: 'name', title: 'Food Truck Name', type: 'object',
            fields: [{ name: 'en', title: 'English', type: 'string' }, { name: 'pt', title: 'Portuguese', type: 'string' }]
          },
          {
            name: 'description', title: 'Service Area Description', type: 'object',
            fields: [{ name: 'en', title: 'English', type: 'string' }, { name: 'pt', title: 'Portuguese', type: 'string' }]
          },
          { name: 'phone', title: 'Contact Phone', type: 'string' },
          { name: 'email', title: 'Contact Email', type: 'string' }
        ]
      }
    ]
  },

  // footerInfo and menuItem ... (garde tes définitions actuelles)
  {
    name: 'footerInfo',
    title: 'Footer Information',
    type: 'document',
    fields: [
      { name: 'title', title: 'Title', type: 'string' },
      {
        name: 'contactInfo',
        title: 'Contact Information',
        type: 'object',
        fields: [
          { name: 'phone', title: 'Phone Number', type: 'string' },
          { name: 'email', title: 'Email Address', type: 'string' },
          {
            name: 'hours',
            title: 'Opening Hours',
            type: 'object',
            fields: [{ name: 'en', title: 'English', type: 'string' }, { name: 'pt', title: 'Portuguese', type: 'string' }]
          }
        ]
      },
      {
        name: 'socialMedia',
        title: 'Social Media Links',
        type: 'object',
        fields: [
          { name: 'instagram', title: 'Instagram URL', type: 'url' },
          { name: 'youtube', title: 'YouTube URL', type: 'url' },
          { name: 'tiktok', title: 'TikTok URL', type: 'url' },
          { name: 'whatsapp', title: 'WhatsApp Number', type: 'string' },
          { name: 'googleMaps', title: 'Google Maps URL', type: 'url' }
        ]
      },
      {
        name: 'copyright',
        title: 'Copyright Text',
        type: 'object',
        fields: [{ name: 'en', title: 'English', type: 'string' }, { name: 'pt', title: 'Portuguese', type: 'string' }]
      }
    ]
  },

  {
    name: 'menuItem',
    title: 'Menu Items',
    type: 'document',
    fields: [
      {
        name: 'name', title: 'Item Name', type: 'object',
        fields: [{ name: 'en', title: 'English', type: 'string' }, { name: 'pt', title: 'Portuguese', type: 'string' }]
      },
      {
        name: 'description', title: 'Description', type: 'object',
        fields: [{ name: 'en', title: 'English', type: 'text' }, { name: 'pt', title: 'Portuguese', type: 'text' }]
      },
      { name: 'price', title: 'Price', type: 'number' },
      {
        name: 'category', title: 'Category', type: 'string',
        options: { list: [
          { title: 'Starters', value: 'starters' }, { title: 'Dosas', value: 'dosas' },
          { title: 'Curries', value: 'curries' }, { title: 'Snacks', value: 'snacks' },
          { title: 'Desserts', value: 'desserts' }, { title: 'Beverages', value: 'beverages' }
        ]}
      },
      { name: 'image', title: 'Item Image', type: 'image', options: { hotspot: true } },
      { name: 'isCombo', title: 'Is Combo Item', type: 'boolean' },
      { name: 'isFeatured', title: 'Featured Item', type: 'boolean' },
      {
        name: 'tags', title: 'Tags', type: 'array',
        of: [{ type: 'string', options: { list: [
          { title: 'Vegan', value: 'vegan' }, { title: 'Vegetarian', value: 'vegetarian' },
          { title: 'Gluten Free', value: 'gluten-free' }, { title: 'Spicy', value: 'spicy' },
          { title: 'Popular', value: 'popular' }
        ]}}]
      }
    ]
  }
]
