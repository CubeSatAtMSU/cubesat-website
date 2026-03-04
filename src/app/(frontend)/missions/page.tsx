import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MissionCard from "@/components/ui/MissionCard";
import { getSiteConfig, getAllMissions } from "@/lib/payload-helpers";

export default async function MissionsPage() {
  const [siteConfig, missions] = await Promise.all([
    getSiteConfig(),
    getAllMissions(),
  ]);

  return (
    <>
      <Navbar links={siteConfig.navLinks} missions={missions} transparent={false} />
      <main>
        {/* Header */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-20 px-6 md:px-20 max-w-[1280px] mx-auto">
          <p className="text-[13px] font-semibold uppercase tracking-wider text-maroon-light mb-3">
            Our Work
          </p>
          <h1 className="text-[36px] md:text-[48px] font-semibold text-gray-900 leading-tight">
            Missions
          </h1>
          <p className="mt-4 text-[16px] text-gray-600 max-w-2xl">
            Every mission is a step toward advancing student-led space research at Mississippi State. Explore our past, present, and upcoming projects.
          </p>
        </section>

        {/* Mission Grid */}
        <section className="pb-20 md:pb-28 px-6 md:px-20 max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {missions.map((mission) => (
              <MissionCard
                key={mission.slug}
                title={mission.card.title}
                description={mission.card.description}
                image={mission.card.image}
                href={`/missions/${mission.slug}`}
              />
            ))}
          </div>
        </section>
      </main>
      <Footer
        contacts={siteConfig.contacts}
        socialLinks={siteConfig.socialLinks}
        contactQuestion={siteConfig.footer.contactQuestion}
        joinTitle={siteConfig.footer.joinTitle}
        joinDescription={siteConfig.footer.joinDescription}
        joinLink={siteConfig.footer.joinLink}
        contactCallout={siteConfig.footer.contactCallout}
        newsletterTitle={siteConfig.footer.newsletterTitle}
        newsletterDescription={siteConfig.footer.newsletterDescription}
      />
    </>
  );
}
