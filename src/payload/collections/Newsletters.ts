import type { CollectionConfig } from 'payload'

export const Newsletters: CollectionConfig = {
  slug: 'newsletters',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'date', 'year', 'updatedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: { description: 'e.g., "Spring 2025 Newsletter"' },
    },
    {
      name: 'date',
      type: 'text',
      required: true,
      admin: { description: 'Display date, e.g., "Spring 2025" or "Fall 2024"' },
    },
    {
      name: 'year',
      type: 'text',
      required: true,
      admin: { description: 'Year for grouping, e.g., "2025"' },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'href',
      type: 'text',
      required: true,
      admin: {
        description: 'Link to the newsletter PDF (local path or external URL)',
      },
    },
  ],
}
