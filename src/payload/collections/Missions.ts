import type { CollectionConfig } from 'payload'
import { mediaBlockField } from '../fields/mediaBlock'

export const Missions: CollectionConfig = {
  slug: 'missions',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  fields: [
    // ——— Card data ———
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'URL-friendly name (e.g., "1-mississippi")',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Short description shown on the mission card',
      },
    },
    {
      name: 'cardImage',
      type: 'relationship',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Image shown on the mission card in the carousel/grid',
      },
    },

    // ——— Page: Hero (always required) ———
    {
      name: 'hero',
      type: 'group',
      label: 'Hero Section',
      admin: {
        description: 'The hero section at the top of the mission page (always shown)',
      },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'subtitle', type: 'text', required: true },
        {
          name: 'missionStatement',
          type: 'textarea',
          required: true,
        },
        { name: 'ctaText', type: 'text', defaultValue: 'View Timeline' },
        { name: 'ctaHref', type: 'text', defaultValue: '#timeline' },
      ],
    },

    // ——— Page: Sections (blocks field — mix and match!) ———
    {
      name: 'sections',
      type: 'blocks',
      label: 'Page Sections',
      admin: {
        description: 'Add content sections, objectives, and timelines in any order',
      },
      blocks: [
        // Block: Content Section
        {
          slug: 'content',
          labels: { singular: 'Content Section', plural: 'Content Sections' },
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'subtitle', type: 'text' },
            {
              name: 'text',
              type: 'textarea',
              admin: {
                description: 'Use a double newline to separate paragraphs',
              },
            },
            mediaBlockField('media', 'Media'),
            {
              name: 'link',
              type: 'group',
              label: 'External Link (optional)',
              fields: [
                { name: 'text', type: 'text' },
                { name: 'href', type: 'text' },
              ],
            },
            {
              name: 'reverse',
              type: 'checkbox',
              label: 'Reverse layout (media on left)',
              defaultValue: false,
            },
            {
              name: 'background',
              type: 'select',
              defaultValue: 'white',
              options: [
                { label: 'White', value: 'white' },
                { label: 'Gray', value: 'gray' },
              ],
            },
          ],
        },

        // Block: Objectives Grid
        {
          slug: 'objectives',
          labels: { singular: 'Objectives Grid', plural: 'Objectives Grids' },
          fields: [
            {
              name: 'title',
              type: 'text',
              defaultValue: 'Mission Objectives',
            },
            {
              name: 'objectives',
              type: 'array',
              label: 'Objectives',
              minRows: 1,
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'description', type: 'textarea', required: true },
              ],
            },
            {
              name: 'background',
              type: 'select',
              defaultValue: 'white',
              options: [
                { label: 'White', value: 'white' },
                { label: 'Gray', value: 'gray' },
              ],
            },
          ],
        },

        // Block: Timeline
        {
          slug: 'timeline',
          labels: { singular: 'Timeline', plural: 'Timelines' },
          fields: [
            {
              name: 'title',
              type: 'text',
              defaultValue: 'Mission Timeline',
            },
            { name: 'subtitle', type: 'text' },
            {
              name: 'items',
              type: 'array',
              label: 'Timeline Items',
              minRows: 1,
              fields: [
                { name: 'year', type: 'text', required: true },
                { name: 'season', type: 'text', required: true },
                { name: 'title', type: 'text', required: true },
                { name: 'description', type: 'textarea', required: true },
              ],
            },
            {
              name: 'background',
              type: 'select',
              defaultValue: 'white',
              options: [
                { label: 'White', value: 'white' },
                { label: 'Gray', value: 'gray' },
              ],
            },
          ],
        },
      ],
    },
  ],
}
