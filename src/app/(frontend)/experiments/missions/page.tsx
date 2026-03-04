"use client";

import { useState } from "react";
import Image from "next/image";

const missions = [
  {
    title: "1-Mississippi",
    description:
      "Mississippi's first student-built satellite — a 1U CubeSat carrying a cosmic ray research payload to low Earth orbit.",
    image: "/images/missions/1-mississippi.jpg",
    href: "/missions/1-mississippi",
    status: "In Development",
    year: "2025",
  },
  {
    title: "CAPE-4 Collaboration",
    description:
      "A collaborative payload experiment aboard the CAPE-4 CubeSat, advancing our ground station capabilities and flight heritage.",
    image: "/images/missions/cape-4.jpg",
    href: "/missions/cape-4",
    status: "Active",
    year: "2025",
  },
  {
    title: "Future Mission",
    description:
      "Placeholder for a future mission to demonstrate how the grid scales with additional entries.",
    image: "/images/missions/1-mississippi.jpg",
    href: "#",
    status: "Planned",
    year: "2026",
  },
];

export default function MissionsExperiment() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 px-6 md:px-20 max-w-[1280px] mx-auto">
        <p className="text-[13px] font-semibold uppercase tracking-wider text-maroon-light mb-3">
          Our Work
        </p>
        <h1 className="text-[36px] md:text-[48px] font-semibold text-gray-900 leading-tight">
          Missions
        </h1>
        <p className="mt-4 text-[16px] text-gray-600 max-w-2xl">
          Every mission is a step toward advancing student-led space research at Mississippi State. Explore our past, present, and upcoming projects.
        </p>
      </section>

      {/* Mission Grid */}
      <section className="pb-20 md:pb-28 px-6 md:px-20 max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {missions.map((mission, idx) => (
            <a
              key={idx}
              href={mission.href}
              className="group relative block overflow-hidden rounded-lg"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Image */}
              <div className="aspect-[3/4] relative overflow-hidden bg-gray-100">
                <Image
                  src={mission.image}
                  alt={mission.title}
                  fill
                  className={`object-cover transition-transform duration-500 ${
                    hoveredIndex === idx ? "scale-105" : "scale-100"
                  }`}
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                {/* Status badge */}
                <div className="absolute top-4 left-4">
                  <span
                    className={`inline-block text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full ${
                      mission.status === "Active"
                        ? "bg-green-500/20 text-green-200 backdrop-blur-sm"
                        : mission.status === "In Development"
                        ? "bg-amber-500/20 text-amber-200 backdrop-blur-sm"
                        : "bg-white/15 text-white/70 backdrop-blur-sm"
                    }`}
                  >
                    {mission.status}
                  </span>
                </div>

                {/* Content at bottom */}
                <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end">
                  <p className="text-[12px] font-semibold uppercase tracking-wider text-white/60 mb-1">
                    {mission.year}
                  </p>
                  <h3 className="text-[22px] md:text-[24px] font-semibold text-white leading-snug">
                    {mission.title}
                  </h3>
                  <p
                    className={`mt-2 text-[14px] text-white/70 leading-relaxed line-clamp-3 transition-all duration-300 ${
                      hoveredIndex === idx
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-2"
                    }`}
                  >
                    {mission.description}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
