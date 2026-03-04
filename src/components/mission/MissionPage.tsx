import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import ScrollToTop from "../ui/ScrollToTop";
import { getSiteConfig, getAllMissions } from "@/lib/payload-helpers";

interface MissionPageProps {
  children: React.ReactNode;
}

export default async function MissionPage({ children }: MissionPageProps) {
  const [siteConfig, missions] = await Promise.all([
    getSiteConfig(),
    getAllMissions(),
  ]);

  return (
    <>
      <ScrollToTop />
      <Navbar links={siteConfig.navLinks} missions={missions} transparent={false} />
      <main>{children}</main>
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
