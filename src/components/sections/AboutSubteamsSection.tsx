import MediaDisplay from "../ui/MediaDisplay";
import type { MediaBlock } from "@/data/types";

interface Subteam {
  name: string;
  description: string;
}

interface AboutSubteamsSectionProps {
  aboutTitle: string;
  aboutLabel: string;
  aboutText: string[];
  aboutMedia?: MediaBlock;
  showSubteams: boolean;
  subteamsTitle?: string;
  subteamsLabel?: string;
  subteams?: Subteam[];
  subteamsMedia?: MediaBlock;
}

export default function AboutSubteamsSection({
  aboutTitle,
  aboutLabel,
  aboutText,
  aboutMedia,
  showSubteams,
  subteamsTitle,
  subteamsLabel,
  subteams,
  subteamsMedia,
}: AboutSubteamsSectionProps) {
  return (
    <section id="about" className="py-20 md:py-28">
      <div className="max-w-[1280px] mx-auto px-6 md:px-20">
        {/* Row 1: About text left, Image/Carousel right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div>
            <p className="text-[16px] uppercase tracking-wide font-semibold text-maroon-light mb-2">
              {aboutLabel}
            </p>
            <h2 className="text-[32px] md:text-[36px] font-semibold text-gray-900 leading-tight">
              {aboutTitle}
            </h2>
            <div className="mt-8 space-y-5">
              {aboutText.map((paragraph, i) => (
                <p key={i} className="text-[16px] leading-relaxed text-gray-600">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          {aboutMedia && <MediaDisplay media={aboutMedia} />}
        </div>

        {/* Row 2: Subteams (conditionally rendered) */}
        {showSubteams && subteams && subteamsMedia && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center mt-20 md:mt-28">
            <div className="order-2 md:order-1">
              <MediaDisplay media={subteamsMedia} />
            </div>
            <div className="order-1 md:order-2">
              <p className="text-[16px] uppercase tracking-wide font-semibold text-maroon-light mb-2">
                {subteamsLabel}
              </p>
              <h2 className="text-[32px] md:text-[36px] font-semibold text-gray-900 leading-tight">
                {subteamsTitle}
              </h2>
              <div className="mt-8">
                {subteams.map((team, i) => (
                  <div
                    key={team.name}
                    className={`py-4 ${i < subteams.length - 1 ? "border-b border-gray-200" : ""}`}
                  >
                    <h3 className="text-[17px] font-semibold text-gray-900">
                      {team.name}
                    </h3>
                    <p className="text-[14px] leading-relaxed text-gray-500 mt-1">
                      {team.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
