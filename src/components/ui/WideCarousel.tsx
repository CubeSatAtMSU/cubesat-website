"use client";

import { useState } from "react";
import Image from "next/image";

interface WideCarouselProps {
  images: { src: string; alt: string }[];
}

export default function WideCarousel({ images }: WideCarouselProps) {
  const [current, setCurrent] = useState(0);

  // Show 3 images at a time on desktop, 1 on mobile
  const visibleDesktop = 3;
  const maxIndex = Math.max(0, images.length - visibleDesktop);

  const prev = () => setCurrent((c) => (c === 0 ? maxIndex : c - 1));
  const next = () => setCurrent((c) => (c >= maxIndex ? 0 : c + 1));

  return (
    <div className="relative w-screen left-1/2 -translate-x-1/2 overflow-hidden py-4">
      {/* Slider track */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${current * (100 / visibleDesktop)}%)`,
        }}
      >
        {images.map((img, i) => (
          <div
            key={i}
            className="flex-shrink-0 px-2"
            style={{ width: `${100 / visibleDesktop}%` }}
          >
            <div className="relative h-[250px] md:h-[340px] rounded-lg overflow-hidden bg-gray-100">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      {images.length > visibleDesktop && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-colors cursor-pointer z-10"
            aria-label="Previous images"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-colors cursor-pointer z-10"
            aria-label="Next images"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </>
      )}

      {/* Dot indicators */}
      {images.length > visibleDesktop && (
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2.5 h-2.5 rounded-full transition-colors cursor-pointer ${
                i === current ? "bg-maroon-dark" : "bg-gray-200"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
