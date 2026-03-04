/* eslint-disable @typescript-eslint/no-explicit-any */
// Uses `any` for Payload document types until we generate payload-types.ts
// Run `npx payload generate:types` to generate typed interfaces, then replace `any`

import { getPayload } from 'payload'
import config from '@payload-config'
import type {
  MediaBlock,
  ImageData,
  MissionData,
  MissionPageSection,
  NewsletterData,
} from '@/data/types'

// ——— Payload client (cached per request by Next.js) ———

export async function getPayloadClient() {
  return getPayload({ config })
}

// ——— Media transformers ———

function mediaToSrc(media: any): string {
  if (!media) return ''
  if (typeof media === 'string') return media
  return media.url || ''
}

function mediaToImageData(media: any): ImageData {
  if (!media) return { src: '', alt: '' }
  if (typeof media === 'string') return { src: media, alt: '' }
  return {
    src: media.url || '',
    alt: media.alt || '',
    ...(media.caption && { caption: media.caption }),
  }
}

function transformMediaBlock(group: any): MediaBlock | undefined {
  if (!group?.images?.length) return undefined
  return {
    type: group.type || 'image',
    images: group.images.map((item: any) => mediaToImageData(item.image)),
    ...(group.contain && { contain: true }),
  }
}

// ——— Site Config ———

export async function getSiteConfig() {
  const payload = await getPayloadClient()
  const data: any = await payload.findGlobal({ slug: 'site-config' as any, depth: 2 })

  return {
    contacts: (data.contacts || []).map((c: any) => ({
      role: c.role,
      name: c.name,
      email: c.email,
    })),
    socialLinks: {
      github: data.socialLinks?.github || '',
      linkedin: data.socialLinks?.linkedin || '',
      instagram: data.socialLinks?.instagram || '',
      cowbellConnect: data.socialLinks?.cowbellConnect || '',
    },
    navLinks: (data.navLinks || []).map((link: any) => ({
      label: link.label,
      href: link.href,
      submenuType: link.submenuType === 'none' ? undefined : link.submenuType,
    })),
    footer: {
      contactQuestion: data.footer?.contactQuestion || '',
      joinTitle: data.footer?.joinTitle || '',
      joinDescription: data.footer?.joinDescription || '',
      joinLink: {
        text: data.footer?.joinLink?.text || '',
        href: data.footer?.joinLink?.href || '',
      },
      contactCallout: {
        text: data.footer?.contactCallout?.text || '',
        name: data.footer?.contactCallout?.name || '',
        email: data.footer?.contactCallout?.email || '',
      },
      newsletterTitle: data.footer?.newsletterTitle || '',
      newsletterDescription: data.footer?.newsletterDescription || '',
    },
  }
}

// ——— Homepage ———

export async function getHomepageData() {
  const payload = await getPayloadClient()
  const data: any = await payload.findGlobal({ slug: 'homepage' as any, depth: 2 })

  // Featured missions — populated relationship docs at depth 2
  const featuredDocs = data.missions?.featuredMissions || []
  const featured: MissionData[] = featuredDocs
    .filter((doc: any) => doc && typeof doc !== 'string')
    .map(transformMission)

  return {
    hero: {
      title: data.hero?.title || '',
      tagline: data.hero?.tagline || '',
      backgroundImage: mediaToSrc(data.hero?.backgroundImage),
      buttons: (data.hero?.buttons || []).map((b: any) => ({
        text: b.text,
        href: b.href,
      })),
    },
    about: {
      label: data.about?.label || '',
      title: data.about?.title || '',
      text: (data.about?.text || []).map((t: any) => t.paragraph),
      media: transformMediaBlock(data.about?.media),
    },
    subteams: {
      visible: data.subteams?.visible ?? true,
      label: data.subteams?.label || '',
      title: data.subteams?.title || '',
      items: (data.subteams?.items || []).map((s: any) => ({
        name: s.name,
        description: s.description,
      })),
      media: transformMediaBlock(data.subteams?.media),
    },
    missions: {
      label: data.missions?.label || '',
      title: data.missions?.title || '',
      featured,
    },
    community: {
      label: data.community?.label || '',
      title: data.community?.title || '',
      media: transformMediaBlock(data.community?.media),
      outreach: (data.community?.outreach || []).map((o: any) => ({
        title: o.title,
        description: o.description,
      })),
    },
    cta: {
      title: data.cta?.title || '',
      description: data.cta?.description || '',
      sponsorshipNote: data.cta?.sponsorshipNote || '',
      primaryButton: {
        text: data.cta?.primaryButton?.text || '',
        href: data.cta?.primaryButton?.href || '',
      },
      secondaryButton: {
        text: data.cta?.secondaryButton?.text || '',
        href: data.cta?.secondaryButton?.href || '',
      },
      media: transformMediaBlock(data.cta?.media),
    },
  }
}

// ——— Missions ———

function transformMission(doc: any): MissionData {
  return {
    slug: doc.slug,
    card: {
      title: doc.title,
      description: doc.description,
      image: mediaToSrc(doc.cardImage),
    },
    page: {
      hero: {
        title: doc.hero?.title || '',
        subtitle: doc.hero?.subtitle || '',
        missionStatement: doc.hero?.missionStatement || '',
        ctaText: doc.hero?.ctaText,
        ctaHref: doc.hero?.ctaHref,
      },
      sections: (doc.sections || []).map(transformSection),
    },
  }
}

function transformSection(block: any): MissionPageSection {
  switch (block.blockType) {
    case 'content':
      return {
        type: 'content',
        title: block.title,
        subtitle: block.subtitle,
        text: block.text,
        media: transformMediaBlock(block.media),
        link: block.link?.text
          ? { text: block.link.text, href: block.link.href }
          : undefined,
        reverse: block.reverse || false,
        background: block.background || 'white',
      }
    case 'objectives':
      return {
        type: 'objectives',
        title: block.title,
        objectives: (block.objectives || []).map((o: any) => ({
          title: o.title,
          description: o.description,
        })),
        background: block.background || 'white',
      }
    case 'timeline':
      return {
        type: 'timeline',
        title: block.title,
        subtitle: block.subtitle,
        items: (block.items || []).map((i: any) => ({
          year: i.year,
          season: i.season,
          title: i.title,
          description: i.description,
        })),
        background: block.background || 'white',
      }
    default:
      return block as MissionPageSection
  }
}

export async function getAllMissions(): Promise<MissionData[]> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'missions',
    depth: 2,
    limit: 100,
  })
  return result.docs.map(transformMission)
}

export async function getMission(slug: string): Promise<MissionData | null> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'missions',
    where: { slug: { equals: slug } },
    depth: 2,
    limit: 1,
  })
  if (result.docs.length === 0) return null
  return transformMission(result.docs[0])
}

// ——— Newsletters ———

export async function getAllNewsletters(): Promise<NewsletterData[]> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'newsletters',
    depth: 2,
    limit: 100,
    sort: '-year',
  })
  return result.docs.map((doc: any) => ({
    date: doc.date,
    year: doc.year,
    title: doc.title,
    description: doc.description,
    href: doc.href || '#',
  }))
}

export function groupNewslettersByYear(newsletters: NewsletterData[]) {
  const groups: { year: string; items: NewsletterData[] }[] = []
  for (const nl of newsletters) {
    let group = groups.find((g) => g.year === nl.year)
    if (!group) {
      group = { year: nl.year, items: [] }
      groups.push(group)
    }
    group.items.push(nl)
  }
  return groups
}
