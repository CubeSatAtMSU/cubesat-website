import { notFound } from "next/navigation";
import MissionPage from "@/components/mission/MissionPage";
import MissionHero from "@/components/mission/MissionHero";
import MissionSection from "@/components/mission/MissionSection";
import ObjectivesGrid from "@/components/mission/ObjectivesGrid";
import Timeline from "@/components/mission/Timeline";
import { getMission, getAllMissions } from "@/lib/payload-helpers";
import type { MissionPageSection } from "@/data/types";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const missions = await getAllMissions();
  return missions.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const mission = await getMission(slug);
  if (!mission) return { title: "Mission Not Found" };

  return {
    title: `${mission.card.title} — CubeSat at MSU`,
    description: mission.card.description,
  };
}

function renderSection(section: MissionPageSection, index: number) {
  switch (section.type) {
    case "content":
      return (
        <MissionSection
          key={index}
          title={section.title}
          subtitle={section.subtitle}
          text={section.text}
          media={section.media}
          link={section.link}
          reverse={section.reverse}
          background={section.background}
        />
      );
    case "objectives":
      return (
        <ObjectivesGrid
          key={index}
          title={section.title}
          objectives={section.objectives}
          background={section.background}
        />
      );
    case "timeline":
      return (
        <Timeline
          key={index}
          title={section.title}
          subtitle={section.subtitle}
          items={section.items}
          background={section.background}
        />
      );
  }
}

export default async function MissionDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const mission = await getMission(slug);
  if (!mission) notFound();

  return (
    <MissionPage>
      <MissionHero
        title={mission.page.hero.title}
        subtitle={mission.page.hero.subtitle}
        missionStatement={mission.page.hero.missionStatement}
        ctaText={mission.page.hero.ctaText}
        ctaHref={mission.page.hero.ctaHref}
      />
      {mission.page.sections.map((section, i) => renderSection(section, i))}
    </MissionPage>
  );
}
