import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

// Collections
import { Users } from './src/payload/collections/Users'
import { Media } from './src/payload/collections/Media'
import { Missions } from './src/payload/collections/Missions'
import { Newsletters } from './src/payload/collections/Newsletters'

// Globals
import { SiteConfig } from './src/payload/globals/SiteConfig'
import { Homepage } from './src/payload/globals/Homepage'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: ' — CubeSat at MSU',
    },
  },

  collections: [Users, Media, Missions, Newsletters],

  globals: [SiteConfig, Homepage],

  editor: lexicalEditor(),

  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),

  secret: process.env.PAYLOAD_SECRET || '',

  typescript: {
    outputFile: path.resolve(dirname, 'src/payload-types.ts'),
  },
})
