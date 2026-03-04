// Shared types for the data layer
// These mirror what Payload CMS collections/globals would define

export interface ImageData {
  src: string;
  alt: string;
  caption?: string;
}

/**
 * MediaBlock — unified type for any image/carousel slot.
 * When type is 'image', only images[0] is rendered.
 * When type is 'carousel', all images are rendered in a carousel.
 * Every visual slot on the site uses this, so a CMS user can swap
 * between a single image and a carousel at any time.
 */
export interface MediaBlock {
  type: "image" | "carousel";
  images: ImageData[];
  contain?: boolean;
}

// ——— Mission page section types (Payload "blocks" field) ———

export interface ContentSection {
  type: "content";
  title: string;
  subtitle?: string;
  text?: string | string[];
  media?: MediaBlock;
  link?: { text: string; href: string };
  reverse?: boolean;
  background?: "white" | "gray";
}

export interface ObjectivesSection {
  type: "objectives";
  title?: string;
  objectives: { title: string; description: string }[];
  background?: "white" | "gray";
}

export interface TimelineSection {
  type: "timeline";
  title?: string;
  subtitle?: string;
  items: { year: string; season: string; title: string; description: string }[];
  background?: "white" | "gray";
}

export type MissionPageSection =
  | ContentSection
  | ObjectivesSection
  | TimelineSection;

// ——— Mission (collection item) ———

export interface MissionHeroData {
  title: string;
  subtitle: string;
  missionStatement: string;
  ctaText?: string;
  ctaHref?: string;
}

export interface MissionData {
  slug: string;
  // Card data (used in carousel & grid)
  card: {
    title: string;
    description: string;
    image: string;
  };
  // Full page data
  page: {
    hero: MissionHeroData;
    sections: MissionPageSection[];
  };
}

// ——— Newsletter (collection item) ———

export interface NewsletterData {
  date: string;
  year: string;
  title: string;
  description: string;
  href: string;
}

// ——— Site config types ———

export interface ContactPerson {
  role: string;
  name: string;
  email: string;
}

export interface SocialLinks {
  github?: string;
  linkedin?: string;
  instagram?: string;
  cowbellConnect?: string;
}

export interface NavLinkData {
  label: string;
  href: string;
  submenuType?: "missions";
}
