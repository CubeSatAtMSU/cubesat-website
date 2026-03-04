// Homepage section configuration — maps to a Payload "Global" singleton
// Controls all content on the landing page

import type { MediaBlock } from "./types";

export interface HeroConfig {
  title: string;
  tagline: string;
  backgroundImage: string;
  buttons: { text: string; href: string }[];
}

export interface AboutConfig {
  label: string;
  title: string;
  text: string[];
  media: MediaBlock;
}

export interface SubteamsConfig {
  visible: boolean;
  label: string;
  title: string;
  items: { name: string; description: string }[];
  media: MediaBlock;
}

export interface MissionsCarouselConfig {
  label: string;
  title: string;
  /** Ordered slugs — pick up to 6 from the mission pool */
  featuredSlugs: string[];
}

export interface CommunityConfig {
  label: string;
  title: string;
  media: MediaBlock;
  outreach: { title: string; description: string }[];
}

export interface CTAConfig {
  title: string;
  description: string;
  sponsorshipNote: string;
  primaryButton: { text: string; href: string };
  secondaryButton: { text: string; href: string };
  media: MediaBlock;
}

export interface HomepageData {
  hero: HeroConfig;
  about: AboutConfig;
  subteams: SubteamsConfig;
  missions: MissionsCarouselConfig;
  community: CommunityConfig;
  cta: CTAConfig;
}

export const homepageData: HomepageData = {
  hero: {
    title: "Launching Mississippi Into Orbit",
    tagline: "Mississippi's First Student Satellite Team",
    backgroundImage: "/images/home/team-4.jpg",
    buttons: [
      {
        text: "Become a Sponsor",
        href: "https://dda.msstate.edu/give-now?f=313064",
      },
      { text: "Join Us", href: "#footer" },
    ],
  },

  about: {
    label: "Student Team",
    title: "CubeSat at MSU",
    text: [
      "CubeSat at MSU is a student-led design team focused on designing, launching, and operating Mississippi\u2019s first satellite and developing other various missions.",
      "We are dedicated to providing an educational, hands-on experience for MSU students from all academic fields as well as providing outreach to our local community.",
    ],
    media: {
      type: "image",
      images: [{ src: "/images/home/team-2.jpg", alt: "CubeSat at MSU team" }],
    },
  },

  subteams: {
    visible: true,
    label: "Building Together",
    title: "Our Subteams",
    items: [
      {
        name: "Structures",
        description: "Focus on the frame and manufacturing of the CubeSat",
      },
      {
        name: "Instruments",
        description:
          "Focus on ACDS, circuitry, and software of the satellite",
      },
      {
        name: "GNC",
        description:
          "Focused on guidance, navigation, and control of the satellite as well as operating the ground station",
      },
    ],
    media: {
      type: "image",
      images: [
        { src: "/images/home/team-3.jpg", alt: "CubeSat subteams working" },
      ],
    },
  },

  missions: {
    label: "Our Missions",
    title: "Our missions advance student expertise in aerospace and drive innovation across Mississippi\u2019s space industry.",
    featuredSlugs: ["1-mississippi", "cape-4", "desperado"],
  },

  community: {
    label: "Our Community",
    title: "CubeSat at MSU is dedicated to serving our community and promoting a positive STEM experience in everything we do.",
    media: {
      type: "carousel",
      contain: true,
      images: [
        { src: "/images/community/k12/outreach-1.jpg", alt: "K-12 outreach event" },
        { src: "/images/community/k12/outreach-2.jpg", alt: "Students learning about CubeSats" },
        { src: "/images/community/k12/outreach-3.jpg", alt: "Community outreach" },
        { src: "/images/community/k12/outreach-4.jpg", alt: "STEM education" },
        { src: "/images/community/k12/outreach-5.png", alt: "K-12 outreach program" },
        { src: "/images/community/engineering/aiaa.png", alt: "AIAA Student Conference" },
        { src: "/images/community/engineering/ase.jpg", alt: "ASE Anniversary" },
        { src: "/images/community/engineering/workshop.png", alt: "Instruments Workshop" },
        { src: "/images/community/engineering/symposium.png", alt: "Research Symposium" },
      ],
    },
    outreach: [
      {
        title: "K-12 outreach",
        description:
          "Since our founding, CubeSat at MSU has participated in outreach to local elementary schools and provided a positive, fun academic experience to students. Our goal is to encourage students to shoot for the stars (literally) and stay curious as they grow up.",
      },
      {
        title: "Engineering outreach",
        description:
          "Our missions are a chance for MSU students to learn outside the classroom, apply their knowledge hands on, and make lifelong connections with other students, faculty, and industry leaders.",
      },
    ],
  },

  cta: {
    title: "Support Innovation",
    description:
      "Partner with CubeSat at MSU to launch Mississippi\u2019s first satellite and inspire the next generation of aerospace engineers. Your support enables groundbreaking student research and hands-on STEM education.",
    sponsorshipNote:
      "Interested in sponsoring? Reach out to us via email and we\u2019ll share more about partnership opportunities.",
    primaryButton: {
      text: "Become a Sponsor",
      href: "https://dda.msstate.edu/give-now?f=313064",
    },
    secondaryButton: {
      text: "Join Us",
      href: "https://msstate.campuslabs.com/engage/organization/cubesat_msu",
    },
    media: {
      type: "image",
      images: [
        {
          src: "/images/home/team-1.jpg",
          alt: "CubeSat at MSU team working",
        },
      ],
    },
  },
};
