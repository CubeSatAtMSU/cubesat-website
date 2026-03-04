import Image from "next/image";
import ImageCarousel from "./ImageCarousel";
import type { MediaBlock } from "@/data/types";

interface MediaDisplayProps {
  media: MediaBlock;
  aspectRatio?: string;
  className?: string;
}

/**
 * Renders a MediaBlock as either a single image or a carousel.
 * Used throughout the site so any image slot can be toggled to a carousel via CMS.
 */
export default function MediaDisplay({
  media,
  aspectRatio = "aspect-[4/3]",
  className = "",
}: MediaDisplayProps) {
  if (media.type === "carousel" && media.images.length > 1) {
    return (
      <ImageCarousel
        images={media.images}
        contain={media.contain}
        className={className}
      />
    );
  }

  const image = media.images[0];
  if (!image) return null;

  return (
    <div className={className}>
      <div className={`relative ${aspectRatio} rounded-lg overflow-hidden`}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className={media.contain ? "object-contain" : "object-cover"}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      {image.caption && (
        <p className="text-[13px] text-gray-500 text-center mt-2">
          {image.caption}
        </p>
      )}
    </div>
  );
}
