"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

export interface CarouselImage {
  src: string;
  alt: string;
  caption?: string;
}

interface ImageCarouselProps {
  images: CarouselImage[];
  className?: string;
  contain?: boolean;
}

export default function ImageCarousel({ images, className = "", contain = false }: ImageCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const goTo = (index: number) => setCurrent(index);
  const prev = useCallback(() => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1)), [images.length]);
  const next = useCallback(() => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1)), [images.length]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [lightboxOpen]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [lightboxOpen, prev, next]);

  const objectFit = contain ? "object-contain" : "object-cover";
  const shadow = contain ? "drop-shadow-md" : "";

  return (
    <>
      <div className={`relative ${className}`}>
        <div
          className={`relative w-full aspect-[4/3] overflow-hidden rounded-lg ${contain ? "cursor-pointer" : ""}`}
          onClick={contain ? () => setLightboxOpen(true) : undefined}
        >
          {images.map((img, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-opacity duration-500 ${
                i === current ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className={`${objectFit} ${shadow}`}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        <button
          onClick={(e) => { e.stopPropagation(); prev(); }}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-colors cursor-pointer"
          aria-label="Previous image"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); next(); }}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-colors cursor-pointer"
          aria-label="Next image"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-4">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`w-2.5 h-2.5 rounded-full transition-colors cursor-pointer ${
                i === current ? "bg-maroon-dark" : "bg-gray-200"
              }`}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>

        {/* Caption */}
        {images[current].caption && (
          <p className="text-[13px] text-gray-500 text-center mt-2">
            {images[current].caption}
          </p>
        )}
      </div>

      {/* Lightbox modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/85 flex items-center justify-center"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Close button */}
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer z-10"
            aria-label="Close lightbox"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Lightbox image */}
          <div
            className="relative w-[85vw] h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[current].src}
              alt={images[current].alt}
              fill
              className="object-contain"
              sizes="85vw"
              priority
            />
          </div>

          {/* Lightbox nav arrows */}
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/15 hover:bg-white/25 rounded-full flex items-center justify-center transition-colors cursor-pointer z-10"
            aria-label="Previous image"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/15 hover:bg-white/25 rounded-full flex items-center justify-center transition-colors cursor-pointer z-10"
            aria-label="Next image"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* Image caption */}
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-[14px]">
            {images[current].caption || images[current].alt}
          </p>
        </div>
      )}
    </>
  );
}
