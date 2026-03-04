interface TimelineItem {
  year: string;
  season: string;
  title: string;
  description: string;
}

interface TimelineProps {
  title?: string;
  subtitle?: string;
  items: TimelineItem[];
  background?: "white" | "gray";
}

export default function Timeline({
  title = "Mission Timeline",
  subtitle,
  items,
  background = "white",
}: TimelineProps) {
  const bgClass = background === "gray" ? "bg-gray-50" : "";
  // Group items by year
  const grouped: { year: string; entries: { season: string; title: string; description: string }[] }[] = [];
  items.forEach((item) => {
    const existing = grouped.find((g) => g.year === item.year);
    if (existing) {
      existing.entries.push({ season: item.season, title: item.title, description: item.description });
    } else {
      grouped.push({ year: item.year, entries: [{ season: item.season, title: item.title, description: item.description }] });
    }
  });

  return (
    <section id="timeline" className={`py-16 md:py-20 ${bgClass}`}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-20">
        <h2 className="text-[28px] md:text-[32px] font-semibold text-gray-900 leading-tight">
          {title}
        </h2>
        <div className="w-12 h-[3px] bg-maroon-dark mt-3 mb-3" />
        {subtitle && (
          <p className="text-[16px] text-gray-500 mb-10">{subtitle}</p>
        )}
        {!subtitle && <div className="mb-10" />}

        <div className="relative">
          {grouped.map((group, gi) => (
            <div key={gi} className="relative flex gap-8 md:gap-16 mb-10 last:mb-0">
              {/* Year label */}
              <div className="flex-shrink-0 w-16 md:w-20 pt-1">
                <span className="text-[24px] md:text-[28px] font-semibold text-gray-400">
                  {group.year}
                </span>
              </div>

              {/* Timeline line + dots */}
              <div className="relative flex-shrink-0 flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-maroon-dark mt-2 z-10" />
                {gi < grouped.length - 1 && (
                  <div className="w-[2px] bg-gray-200 flex-1 mt-1" />
                )}
              </div>

              {/* Content — simple typography, no card */}
              <div className="flex-1 space-y-6 pb-4 pt-2">
                {group.entries.map((entry, ei) => (
                  <div key={ei}>
                    <p className="text-[12px] uppercase tracking-[0.1em] font-medium text-maroon-light mb-1">
                      {entry.season}
                    </p>
                    <h3 className="text-[16px] font-semibold text-gray-900">
                      {entry.title}
                    </h3>
                    <p className="text-[16px] text-gray-600 mt-1 leading-relaxed">
                      {entry.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
