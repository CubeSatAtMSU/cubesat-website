"use client";

import { useState } from "react";
import type { NewsletterData } from "@/data/types";

interface NewsletterGroup {
  year: string;
  items: NewsletterData[];
}

interface NewsletterTimelineProps {
  grouped: NewsletterGroup[];
}

export default function NewsletterTimeline({ grouped }: NewsletterTimelineProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  let globalIndex = 0;

  return (
    <section className="pb-20 md:pb-28 px-6 md:px-20 max-w-[1280px] mx-auto">
      <div className="relative">
        {grouped.map((group, yearIdx) => (
          <div key={group.year} className={yearIdx > 0 ? "mt-16" : ""}>
            {/* Year marker */}
            <div className="flex items-center gap-6 md:gap-10 mb-10">
              <span className="text-[28px] md:text-[36px] font-semibold text-gray-300 tabular-nums min-w-[80px] md:min-w-[100px] text-right">
                {group.year}
              </span>
              <div className="h-px bg-gray-200 flex-1" />
            </div>

            {/* Entries for this year */}
            <div className="flex flex-col gap-0">
              {group.items.map((nl) => {
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
  );
}
