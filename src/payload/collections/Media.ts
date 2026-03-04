import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'alt',
    description: 'Image references — stores local paths for now, will switch to S3 uploads later',
  },
  fields: [
    {
      name: 'url',
      type: 'text',
      required: true,
      label: 'Image Path',
      admin: {
        description: 'Local path (e.g., /images/home/team-1.jpg) — will become an upload field when S3 is configured',
      },
    },
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Alt Text',
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Caption (optional)',
    },
  ],
}
