interface Objective {
  title: string;
  description: string;
}

interface ObjectivesGridProps {
  title?: string;
  objectives: Objective[];
  background?: "white" | "gray";
}

export default function ObjectivesGrid({
  title = "Mission Objectives",
  objectives,
  background = "white",
}: ObjectivesGridProps) {
  const bgClass = background === "gray" ? "bg-gray-50" : "";

  return (
    <section className={`py-16 md:py-20 ${bgClass}`}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-20">
        <h2 className="text-[28px] md:text-[32px] font-semibold text-gray-900 leading-tight">
          {title}
        </h2>
        <div className="w-12 h-[3px] bg-maroon-dark mt-3 mb-10" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {objectives.map((objective, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-maroon-dark/15 flex items-center justify-center mt-0.5">
                <span className="text-[12px] font-semibold text-maroon-dark leading-none">
                  {index + 1}
                </span>
              </div>
              <div className="flex-1">
                <h4 className="text-[16px] font-semibold text-gray-900">
                  {objective.title}
                </h4>
                <p className="text-[16px] leading-relaxed text-gray-600 mt-1">
                  {objective.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
