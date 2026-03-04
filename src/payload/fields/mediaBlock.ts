import type { Field } from 'payload'

/**
 * Reusable MediaBlock field group — used anywhere an image/carousel can appear.
 * Maps to the MediaBlock type in src/data/types.ts
 */
export const mediaBlockField = (name: string, label: string): Field => ({
  name,
  type: 'group',
  label,
  fields: [
    {
      name: 'type',
      type: 'select',
      required: true,
      defaultValue: 'image',
      options: [
        { label: 'Single Image', value: 'image' },
        { label: 'Carousel', value: 'carousel' },
      ],
    },
    {
      name: 'images',
      type: 'array',
      label: 'Images',
      minRows: 1,
      fields: [
        {
          name: 'image',
          type: 'relationship',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'contain',
      type: 'checkbox',
      label: 'Contain images (fit inside frame instead of cropping)',
      defaultValue: false,
    },
  ],
})
