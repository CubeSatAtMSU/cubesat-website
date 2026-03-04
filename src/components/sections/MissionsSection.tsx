"use client";

import { useState, useEffect, useCallback } from "react";
import MissionCard from "../ui/MissionCard";
import Button from "../ui/Button";
import type { MissionData } from "@/data/types";

interface MissionsSectionProps {
  label: string;
  title: string;
  missions: MissionData[];
}

export default function MissionsSection({
  label,
  title,
  missions,
}: MissionsSectionProps) {
  const [current, setCurrent] = useState(0);
  const [visibleItems, setVisibleItems] = useState(3);

  useEffect(() => {
    const updateVisible = () => {
      const width = window.innerWidth;
      if (width >= 1024) setVisibleItems(3);
      else if (width >= 768) setVisibleItems(2);
      else setVisibleItems(1);
    };

    updateVisible();
    window.addEventListener("resize", updateVisible);
    return () => window.removeEventListener("resize", updateVisible);
  }, []);

  const maxIndex = Math.max(0, missions.length - visibleItems);

  // Clamp current index when breakpoint changes
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setCurrent((c) => Math.min(c, maxIndex)); }, [maxIndex]);

  const prev = useCallback(
    () => setCurrent((c) => (c === 0 ? maxIndex : c - 1)),
    [maxIndex]
  );
  const next = useCallback(
    () => setCurrent((c) => (c >= maxIndex ? 0 : c + 1)),
    [maxIndex]
  );

  const showControls = missions.length > visibleItems;

  return (
    <section id="missions" className="py-20 md:py-28 bg-gray-50">
      <div className="max-w-[1280px] mx-auto px-6 md:px-20">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-[16px] font-semibold text-maroon-light tracking-wide mb-3">
            {label}
          </p>
          <h2 className="text-[24px] md:text-[32px] font-semibold text-gray-900 leading-snug">
            {title}
          </h2>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${current * (100 / visibleItems)}%)`,
              }}
            >
              {missions.map((mission) => (
                <div
                  key={mission.slug}
                  className="flex-shrink-0 px-3"
                  style={{ width: `${100 / visibleItems}%` }}
                >
                  <MissionCard
                    title={mission.card.title}
                    description={mission.card.description}
                    image={mission.card.image}
                    href={`/missions/${mission.slug}`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation arrows */}
          {showControls && (
            <>
              <button
                onClick={prev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-colors cursor-pointer z-10"
                aria-label="Previous missions"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                onClick={next}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-colors cursor-pointer z-10"
                aria-label="Next missions"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Dot indicators */}
        {showControls && (
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2.5 h-2.5 rounded-full transition-colors cursor-pointer ${
                  i === current ? "bg-maroon-dark" : "bg-gray-300"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        )}

        {/* View All Missions button */}
        <div className="flex justify-center mt-10">
          <Button variant="secondary" href="/missions">
            View All Missions
          </Button>
        </div>
      </div>
    </section>
  );
}
