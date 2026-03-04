"use client";

import { useState } from "react";

const newsletters = [
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

// Group newsletters by year
const grouped = newsletters.reduce<Record<string, typeof newsletters>>(
  (acc, nl) => {
    if (!acc[nl.year]) acc[nl.year] = [];
    acc[nl.year].push(nl);
    return acc;
  },
  {}
);

const years = Object.keys(grouped).sort((a, b) => Number(b) - Number(a));

export default function NewslettersExperiment() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  let globalIndex = 0;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 px-6 md:px-20 max-w-[1280px] mx-auto">
        <p className="text-[13px] font-semibold uppercase tracking-wider text-maroon-light mb-3">
          Stay Updated
        </p>
        <h1 className="text-[36px] md:text-[48px] font-semibold text-gray-900 leading-tight">
          Newsletters
        </h1>
        <p className="mt-4 text-[16px] text-gray-600 max-w-2xl">
          Semester updates from CubeSat at MSU — mission progress, team highlights, and what&apos;s ahead.
        </p>
      </section>

      {/* Timeline */}
      <section className="pb-20 md:pb-28 px-6 md:px-20 max-w-[1280px] mx-auto">
        <div className="relative">
          {years.map((year, yearIdx) => (
            <div key={year} className={yearIdx > 0 ? "mt-16" : ""}>
              {/* Year marker */}
              <div className="flex items-center gap-6 md:gap-10 mb-10">
                <span className="text-[28px] md:text-[36px] font-semibold text-gray-300 tabular-nums min-w-[80px] md:min-w-[100px] text-right">
                  {year}
                </span>
                <div className="h-px bg-gray-200 flex-1" />
              </div>

              {/* Entries for this year */}
              <div className="flex flex-col gap-0">
                {grouped[year].map((nl) => {
                  const idx = globalIndex++;
                  const isFirst = idx === 0;
                  const isHovered = hoveredIndex === idx;

                  return (
                    <div
                      key={idx}
                      className="group relative flex items-stretch"
                      onMouseEnter={() => setHoveredIndex(idx)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      {/* Timeline column */}
                      <div className="flex flex-col items-center min-w-[80px] md:min-w-[100px] mr-6 md:mr-10">
                        {/* Line above dot */}
                        <div
                          className={`w-px flex-1 ${
                            idx === 0 && yearIdx === 0
                              ? "bg-transparent"
                              : "bg-gray-200"
                          }`}
                        />
                        {/* Dot */}
                        <div
                          className={`w-3 h-3 rounded-full shrink-0 transition-all duration-300 ${
                            isFirst
                              ? "bg-maroon-dark scale-125"
                              : isHovered
                              ? "bg-maroon-dark scale-110"
                              : "bg-gray-300"
                          }`}
                        />
                        {/* Line below dot */}
                        <div className="w-px flex-1 bg-gray-200" />
                      </div>

                      {/* Content */}
                      <a
                        href={nl.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex-1 py-8 pr-6 border-b border-gray-100 transition-all duration-300 ${
                          isHovered ? "translate-x-1" : ""
                        }`}
                      >
                        {isFirst && (
                          <span className="inline-block text-[11px] font-semibold uppercase tracking-wider text-maroon-light bg-maroon-dark/8 px-3 py-1 rounded-full mb-3">
                            Latest
                          </span>
                        )}

                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <p className="text-[12px] font-semibold uppercase tracking-wider text-maroon-light mb-1">
                              {nl.date}
                            </p>
                            <h3
                              className={`text-[18px] md:text-[20px] font-semibold transition-colors duration-200 ${
                                isHovered
                                  ? "text-maroon-dark"
                                  : "text-gray-900"
                              }`}
                            >
                              {nl.title}
                            </h3>
                            <p className="mt-2 text-[15px] text-gray-500 leading-relaxed max-w-xl">
                              {nl.description}
                            </p>
                          </div>

                          {/* Arrow icon */}
                          <div
                            className={`mt-1 shrink-0 transition-all duration-300 ${
                              isHovered
                                ? "text-maroon-dark translate-x-1"
                                : "text-gray-300"
                            }`}
                          >
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M7 17L17 7" />
                              <path d="M7 7h10v10" />
                            </svg>
                          </div>
                        </div>
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Terminal dot */}
          <div className="flex items-center">
            <div className="min-w-[80px] md:min-w-[100px] mr-6 md:mr-10 flex flex-col items-center">
              <div className="w-px h-8 bg-gray-200" />
              <div className="w-2 h-2 rounded-full bg-gray-200" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
