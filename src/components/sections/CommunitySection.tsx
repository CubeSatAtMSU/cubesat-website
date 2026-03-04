import MediaDisplay from "../ui/MediaDisplay";
import type { MediaBlock } from "@/data/types";

interface OutreachItem {
  title: string;
  description: string;
}

interface CommunitySectionProps {
  label: string;
  title: string;
  media?: MediaBlock;
  outreach: OutreachItem[];
}

export default function CommunitySection({
  label,
  title,
  media,
  outreach,
}: CommunitySectionProps) {
  return (
    <section className="py-20 md:py-28">
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

        {/* Media + Outreach descriptions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
          {media && <MediaDisplay media={media} />}
          <div className="space-y-10 pt-2">
            {outreach.map((item) => (
              <div key={item.title}>
                <h3 className="text-[20px] font-semibold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-[16px] leading-relaxed text-gray-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
