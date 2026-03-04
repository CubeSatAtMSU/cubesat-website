interface SectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
  centered?: boolean;
  onDark?: boolean;
}

export default function SectionHeader({
  label,
  title,
  description,
  centered = false,
  onDark = false,
}: SectionHeaderProps) {
  const alignment = centered ? "text-center mx-auto" : "text-left";
  const textColor = onDark ? "text-white" : "text-gray-900";
  const labelColor = onDark ? "text-white/70" : "text-maroon-light";
  const descColor = onDark ? "text-white/80" : "text-gray-600";

  return (
    <div className={`${alignment} max-w-3xl ${centered ? "mx-auto" : ""}`}>
      {label && (
        <p className={`text-[16px] font-semibold tracking-wide mb-3 ${labelColor}`}>
          {label}
        </p>
      )}
      <h2 className={`text-[36px] md:text-[48px] font-semibold leading-tight ${textColor}`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-[16px] leading-relaxed ${descColor}`}>
          {description}
        </p>
      )}
    </div>
  );
}
