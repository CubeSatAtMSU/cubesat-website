import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import NewsletterTimeline from "@/components/sections/NewsletterTimeline";
import { getSiteConfig, getAllMissions, getAllNewsletters, groupNewslettersByYear } from "@/lib/payload-helpers";

export default async function NewslettersPage() {
  const [siteConfig, missions, newsletters] = await Promise.all([
    getSiteConfig(),
    getAllMissions(),
    getAllNewsletters(),
  ]);

  const grouped = groupNewslettersByYear(newsletters);

  return (
    <>
      <Navbar links={siteConfig.navLinks} missions={missions} transparent={false} />
      <main>
        {/* Header */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-20 px-6 md:px-20 max-w-[1280px] mx-auto">
          <p className="text-[13px] font-semibold uppercase tracking-wider text-maroon-light mb-3">
            Stay Updated
          </p>
          <h1 className="text-[36px] md:text-[48px] font-semibold text-gray-900 leading-tight">
            Newsletters
          </h1>
          <p className="mt-4 text-[16px] text-gray-600 max-w-2xl">
            Semester updates from CubeSat at MSU &mdash; mission progress, team highlights, and what&apos;s ahead.
          </p>
        </section>

        <NewsletterTimeline grouped={grouped} />
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
