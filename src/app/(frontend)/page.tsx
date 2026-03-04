import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutSubteamsSection from "@/components/sections/AboutSubteamsSection";
import MissionsSection from "@/components/sections/MissionsSection";
import CommunitySection from "@/components/sections/CommunitySection";
import CTASection from "@/components/sections/CTASection";
import { getSiteConfig, getHomepageData, getAllMissions } from "@/lib/payload-helpers";

export default async function Home() {
  const [siteConfig, homepageData, missions] = await Promise.all([
    getSiteConfig(),
    getHomepageData(),
    getAllMissions(),
  ]);

  return (
    <>
      <Navbar links={siteConfig.navLinks} missions={missions} />
      <main>
        <HeroSection
          title={homepageData.hero.title}
          tagline={homepageData.hero.tagline}
          backgroundImage={homepageData.hero.backgroundImage}
          buttons={homepageData.hero.buttons}
        />
        <AboutSubteamsSection
          aboutLabel={homepageData.about.label}
          aboutTitle={homepageData.about.title}
          aboutText={homepageData.about.text}
          aboutMedia={homepageData.about.media}
          showSubteams={homepageData.subteams.visible}
          subteamsLabel={homepageData.subteams.label}
          subteamsTitle={homepageData.subteams.title}
          subteams={homepageData.subteams.items}
          subteamsMedia={homepageData.subteams.media}
        />
        <MissionsSection
          label={homepageData.missions.label}
          title={homepageData.missions.title}
          missions={homepageData.missions.featured}
        />
        <CommunitySection
          label={homepageData.community.label}
          title={homepageData.community.title}
          media={homepageData.community.media}
          outreach={homepageData.community.outreach}
        />
        <CTASection
          title={homepageData.cta.title}
          description={homepageData.cta.description}
          sponsorshipNote={homepageData.cta.sponsorshipNote}
          primaryButton={homepageData.cta.primaryButton}
          secondaryButton={homepageData.cta.secondaryButton}
          media={homepageData.cta.media}
        />
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
