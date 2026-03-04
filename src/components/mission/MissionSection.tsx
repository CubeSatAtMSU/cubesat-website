import MediaDisplay from "../ui/MediaDisplay";
import type { MediaBlock } from "@/data/types";

interface MissionSectionProps {
  title: string;
  subtitle?: string;
  text?: string | string[];
  children?: React.ReactNode;
  media?: MediaBlock;
  reverse?: boolean;
  link?: { text: string; href: string };
  background?: "white" | "gray";
}

export default function MissionSection({
  title,
  subtitle,
  text,
  children,
  media,
  reverse = false,
  link,
  background = "white",
}: MissionSectionProps) {
  const hasMedia = media && media.images.length > 0;
  const bgClass = background === "gray" ? "bg-gray-50" : "";

  const textContent = (
    <>
      {subtitle && (
        <h3 className="text-[20px] font-semibold text-gray-900 mb-3">
          {subtitle}
        </h3>
      )}
      {text && (
        Array.isArray(text) ? (
          text.map((paragraph, i) => (
            <p key={i} className={`text-[16px] leading-relaxed text-gray-600${i > 0 ? " mt-4" : ""}`}>
              {paragraph}
            </p>
          ))
        ) : (
          <p className="text-[16px] leading-relaxed text-gray-600">{text}</p>
        )
      )}
      {children}
    </>
  );

  const linkElement = link && (
    <div className="mt-6">
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[16px] font-medium text-maroon-dark hover:text-maroon-light transition-colors inline-flex items-center gap-2"
      >
        {link.text}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </a>
    </div>
  );

  return (
    <section className={`py-16 md:py-20 ${bgClass}`}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-20">
        {hasMedia ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
            {/* Text side */}
            <div className={reverse ? "order-2 md:order-2" : "order-2 md:order-1"}>
              <h2 className="text-[28px] md:text-[32px] font-semibold text-gray-900 leading-tight">
                {title}
              </h2>
              <div className="w-12 h-[3px] bg-maroon-dark mt-3 mb-6" />
              {textContent}
              {linkElement}
            </div>

            {/* Media side */}
            <div className={reverse ? "order-1 md:order-1" : "order-1 md:order-2"}>
              <MediaDisplay media={media} />
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-[28px] md:text-[32px] font-semibold text-gray-900 leading-tight">
              {title}
            </h2>
            <div className="w-12 h-[3px] bg-maroon-dark mt-3 mb-6" />
            <div className="max-w-[680px]">
              {textContent}
            </div>
            {linkElement}
          </div>
        )}
      </div>
    </section>
  );
}
