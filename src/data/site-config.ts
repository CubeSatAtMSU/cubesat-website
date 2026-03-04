// Global site configuration — maps to a Payload "Global" singleton
// Everything here is editable by a CMS user: contacts, links, social URLs, nav

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

export interface NavLink {
  label: string;
  href: string;
  /** When set to "missions", the navbar auto-generates a submenu from the mission pool */
  submenuType?: "missions";
}

export interface SiteConfig {
  contacts: ContactPerson[];
  socialLinks: SocialLinks;
  navLinks: NavLink[];
  footer: {
    contactQuestion: string;
    joinTitle: string;
    joinDescription: string;
    joinLink: { text: string; href: string };
    contactCallout: { text: string; name: string; email: string };
    newsletterTitle: string;
    newsletterDescription: string;
  };
}

export const siteConfig: SiteConfig = {
  contacts: [
    { role: "President", name: "Sloan Berry", email: "msb686@msstate.edu" },
    { role: "Chief Engineer", name: "Daniel Hurley", email: "djh578@msstate.edu" },
    { role: "MSU Advisor", name: "Mr. Rob Wolz", email: "rrw72@msstate.edu" },
  ],

  socialLinks: {
    github: "https://github.com/CubeSatAtMSU",
    linkedin: "https://www.linkedin.com/company/cubesat-msu/posts/?feedView=all",
    instagram: "https://www.instagram.com/cubesat.at.msu/",
    cowbellConnect: "https://msstate.campuslabs.com/engage/organization/cubesat_msu",
  },

  navLinks: [
    { label: "Missions", href: "/missions", submenuType: "missions" },
    { label: "Newsletter", href: "/newsletters" },
    { label: "Contact", href: "#footer" },
    {
      label: "Join Us",
      href: "https://msstate.campuslabs.com/engage/organization/cubesat_msu",
    },
  ],

  footer: {
    contactQuestion: "Have questions? Want to donate to CubeSat at MSU?",
    joinTitle: "Join Our Team",
    joinDescription:
      "Gain hands on experience and be part of aerospace innovation at MSU",
    joinLink: {
      text: "Join on Cowbell Connect",
      href: "https://msstate.campuslabs.com/engage/organization/cubesat_msu",
    },
    contactCallout: {
      text: "Questions? Reach out to",
      name: "Sloan Berry",
      email: "msb686@msstate.edu",
    },
    newsletterTitle: "Newsletter and Documentation",
    newsletterDescription: "Stay updated with our latest progress",
  },
};
