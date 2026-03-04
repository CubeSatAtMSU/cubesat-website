// Newsletter collection — maps to a Payload "Collection"
// Sorted by date descending. The first entry is always the "most recent" newsletter.

import type { NewsletterData } from "./types";

export const newsletters: NewsletterData[] = [
  {
    date: "Spring 2025",
    year: "2025",
    title: "Spring 2025 Newsletter",
    description:
      "Updates on CAPE-4 collaboration progress, spring recruitment results, and upcoming launch preparations.",
    href: "/newsletters/CubeSat Spring 2025 Newsletter (4).pdf",
  },
  {
    date: "Fall 2024",
    year: "2024",
    title: "Fall 2024 Newsletter",
    description:
      "Recap of 1-Mississippi development milestones, new team members, and subteam highlights from the semester.",
    href: "/newsletters/CubeSat Fall 2024 Newsletter.pdf",
  },
];

/** The most recent newsletter (first in the array) */
export function getLatestNewsletter(): NewsletterData | undefined {
  return newsletters[0];
}

/** Group newsletters by year, sorted descending */
export function getNewslettersByYear(): { year: string; items: NewsletterData[] }[] {
  const grouped: Record<string, NewsletterData[]> = {};
  for (const nl of newsletters) {
    if (!grouped[nl.year]) grouped[nl.year] = [];
    grouped[nl.year].push(nl);
  }
  return Object.keys(grouped)
    .sort((a, b) => Number(b) - Number(a))
    .map((year) => ({ year, items: grouped[year] }));
}
