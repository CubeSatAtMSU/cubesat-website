import MediaDisplay from "../ui/MediaDisplay";
import Button from "../ui/Button";
import type { MediaBlock } from "@/data/types";

interface CTASectionProps {
  title: string;
  description: string;
  sponsorshipNote: string;
  primaryButton: { text: string; href: string };
  secondaryButton: { text: string; href: string };
  media?: MediaBlock;
}

export default function CTASection({
  title,
  description,
  sponsorshipNote,
  primaryButton,
  secondaryButton,
  media,
}: CTASectionProps) {
  return (
    <section id="support" className="py-20 md:py-28">
      <div className="max-w-[1280px] mx-auto px-6 md:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Text content */}
          <div>
            <h2 className="text-[36px] md:text-[48px] font-semibold text-gray-900 leading-tight">
              {title}
            </h2>
            <p className="mt-6 text-[16px] leading-relaxed text-gray-600">
              {description}
            </p>
            <p className="mt-3 text-[15px] text-gray-500">
              {sponsorshipNote}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button variant="primary" href={primaryButton.href} className="w-full md:w-auto">
                {primaryButton.text}
              </Button>
              <Button variant="secondary" href={secondaryButton.href} className="w-full md:w-auto">
                {secondaryButton.text}
              </Button>
            </div>
          </div>

          {/* Image / Carousel */}
          {media && <MediaDisplay media={media} />}
        </div>
      </div>
    </section>
  );
}
