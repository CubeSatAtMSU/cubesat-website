import type { GlobalConfig } from 'payload'

export const SiteConfig: GlobalConfig = {
  slug: 'site-config',
  label: 'Site Settings',
  admin: {
    description: 'Global settings: contacts, social links, navigation, footer',
  },
  fields: [
    // ——— Contacts ———
    {
      name: 'contacts',
      type: 'array',
      label: 'Contact People',
      admin: { description: 'Shown in the footer "Get in Touch" section' },
      fields: [
        { name: 'role', type: 'text', required: true },
        { name: 'name', type: 'text', required: true },
        { name: 'email', type: 'email', required: true },
      ],
    },

    // ——— Social Links ———
    {
      name: 'socialLinks',
      type: 'group',
      label: 'Social Media Links',
      fields: [
        { name: 'github', type: 'text', label: 'GitHub URL' },
        { name: 'linkedin', type: 'text', label: 'LinkedIn URL' },
        { name: 'instagram', type: 'text', label: 'Instagram URL' },
        { name: 'cowbellConnect', type: 'text', label: 'Cowbell Connect URL' },
      ],
    },

    // ——— Navigation ———
    {
      name: 'navLinks',
      type: 'array',
      label: 'Navigation Links',
      admin: { description: 'Links shown in the navbar' },
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
        {
          name: 'submenuType',
          type: 'select',
          label: 'Dropdown submenu',
          options: [
            { label: 'None', value: 'none' },
            { label: 'Missions (auto-generated)', value: 'missions' },
          ],
          defaultValue: 'none',
        },
      ],
    },

    // ——— Footer ———
    {
      name: 'footer',
      type: 'group',
      label: 'Footer Content',
      fields: [
        { name: 'contactQuestion', type: 'text', label: 'Contact Question' },
        { name: 'joinTitle', type: 'text', label: 'Join Section Title' },
        { name: 'joinDescription', type: 'textarea', label: 'Join Section Description' },
        {
          name: 'joinLink',
          type: 'group',
          label: 'Join Button',
          fields: [
            { name: 'text', type: 'text', required: true },
            { name: 'href', type: 'text', required: true },
          ],
        },
        {
          name: 'contactCallout',
          type: 'group',
          label: 'Contact Callout (below join button)',
          fields: [
            { name: 'text', type: 'text' },
            { name: 'name', type: 'text' },
            { name: 'email', type: 'email' },
          ],
        },
        { name: 'newsletterTitle', type: 'text' },
        { name: 'newsletterDescription', type: 'textarea' },
      ],
    },
  ],
}
