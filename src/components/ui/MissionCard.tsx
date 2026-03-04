import Image from "next/image";
import Link from "next/link";

interface MissionCardProps {
  title: string;
  description: string;
  image: string;
  href: string;
  className?: string;
}

export default function MissionCard({
  title,
  description,
  image,
  href,
  className = "",
}: MissionCardProps) {
  return (
    <Link
      href={href}
      className={`group relative rounded-lg overflow-hidden aspect-[3/4] block ${className}`}
    >
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <h3 className="text-[20px] font-semibold text-white mb-2">
          {title}
        </h3>
        <p className="text-[14px] leading-relaxed text-white/80">
          {description}
        </p>
      </div>
    </Link>
  );
}
