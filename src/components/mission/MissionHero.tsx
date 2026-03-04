import Button from "../ui/Button";

interface MissionHeroProps {
  title: string;
  subtitle: string;
  missionStatement: string;
  ctaText?: string;
  ctaHref?: string;
}

export default function MissionHero({
  title,
  subtitle,
  missionStatement,
  ctaText = "View Timeline",
  ctaHref = "#timeline",
}: MissionHeroProps) {
  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-20">
      <div className="max-w-[1280px] mx-auto px-6 md:px-20">
        <h1 className="text-[48px] md:text-[64px] font-semibold text-gray-900 leading-tight">
          {title}
        </h1>
        <p className="text-[20px] font-semibold text-maroon-light mt-2">
          {subtitle}
        </p>
        <div className="mt-8 max-w-4xl">
          <p className="text-[16px] leading-relaxed text-gray-600">
            <span className="font-semibold text-gray-900">Mission Statement: </span>
            {missionStatement}
          </p>
        </div>
        <div className="mt-8">
          <Button variant="secondary" href={ctaHref}>
            {ctaText}
          </Button>
        </div>
      </div>
    </section>
  );
}
