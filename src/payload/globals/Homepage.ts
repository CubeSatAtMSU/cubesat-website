import type { GlobalConfig } from 'payload'
import { mediaBlockField } from '../fields/mediaBlock'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  label: 'Homepage',
  admin: {
    description: 'Configure all sections on the landing page',
  },
  fields: [
    // ——— Hero ———
    {
      name: 'hero',
      type: 'group',
      label: 'Hero Section',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'tagline', type: 'text', required: true },
        {
          name: 'backgroundImage',
          type: 'relationship',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'buttons',
          type: 'array',
          label: 'CTA Buttons',
          maxRows: 4,
          fields: [
            { name: 'text', type: 'text', required: true },
            { name: 'href', type: 'text', required: true },
          ],
        },
      ],
    },

    // ——— About ———
    {
      name: 'about',
      type: 'group',
      label: 'About Section',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'title', type: 'text', required: true },
        {
          name: 'text',
          type: 'array',
          label: 'Paragraphs',
          fields: [
            { name: 'paragraph', type: 'textarea', required: true },
          ],
        },
        mediaBlockField('media', 'About Image'),
      ],
    },

    // ——— Subteams ———
    {
      name: 'subteams',
      type: 'group',
      label: 'Subteams Section',
      fields: [
        {
          name: 'visible',
          type: 'checkbox',
          label: 'Show Subteams Section',
          defaultValue: true,
        },
        { name: 'label', type: 'text' },
        { name: 'title', type: 'text' },
        {
          name: 'items',
          type: 'array',
          label: 'Subteams',
          fields: [
            { name: 'name', type: 'text', required: true },
            { name: 'description', type: 'textarea', required: true },
          ],
        },
        mediaBlockField('media', 'Subteams Image'),
      ],
    },

    // ——— Missions Carousel ———
    {
      name: 'missions',
      type: 'group',
      label: 'Missions Carousel',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'title', type: 'text', required: true },
        {
          name: 'featuredMissions',
          type: 'relationship',
          relationTo: 'missions',
          hasMany: true,
          maxRows: 6,
          label: 'Featured Missions (pick up to 6, order matters)',
          admin: {
            description: 'Select which missions appear in the homepage carousel and in what order',
          },
        },
      ],
    },

    // ——— Community ———
    {
      name: 'community',
      type: 'group',
      label: 'Community Section',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'title', type: 'text', required: true },
        mediaBlockField('media', 'Community Images'),
        {
          name: 'outreach',
          type: 'array',
          label: 'Outreach Items',
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'description', type: 'textarea', required: true },
          ],
        },
      ],
    },

    // ——— CTA ———
    {
      name: 'cta',
      type: 'group',
      label: 'Call to Action Section',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
        { name: 'sponsorshipNote', type: 'text' },
        {
          name: 'primaryButton',
          type: 'group',
          fields: [
            { name: 'text', type: 'text', required: true },
            { name: 'href', type: 'text', required: true },
          ],
        },
        {
          name: 'secondaryButton',
          type: 'group',
          fields: [
            { name: 'text', type: 'text', required: true },
            { name: 'href', type: 'text', required: true },
          ],
        },
        mediaBlockField('media', 'CTA Image'),
      ],
    },
  ],
}
