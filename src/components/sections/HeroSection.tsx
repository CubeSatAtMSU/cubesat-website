import Image from "next/image";
import Button from "../ui/Button";

interface HeroButton {
  text: string;
  href: string;
}

interface HeroSectionProps {
  title: string;
  tagline: string;
  backgroundImage: string;
  buttons: HeroButton[];
}

export default function HeroSection({
  title,
  tagline,
  backgroundImage,
  buttons,
}: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt="CubeSat at MSU team"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/55" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-[800px] mx-auto">
        <p className="text-[13px] uppercase tracking-[0.15em] text-white/70 font-medium mb-6">
          {tagline}
        </p>
        <h1 className="text-[40px] md:text-[64px] font-semibold text-white leading-tight">
          {title}
        </h1>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {buttons.map((btn) => (
            <Button
              key={btn.text}
              variant="on-dark-bold"
              href={btn.href}
              className="w-full md:w-auto"
            >
              {btn.text}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
