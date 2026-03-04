import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  access: {
    // Only logged-in admins can create new users
    create: ({ req }) => !!req.user,
    // Only logged-in admins can read user list
    read: ({ req }) => !!req.user,
    // Only logged-in admins can update users
    update: ({ req }) => !!req.user,
    // Only logged-in admins can delete users
    delete: ({ req }) => !!req.user,
  },
  fields: [],
}
