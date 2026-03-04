import Button from "../ui/Button";
import type { ContactPerson, SocialLinks } from "@/data/types";

interface FooterProps {
  contacts: ContactPerson[];
  socialLinks: SocialLinks;
  contactQuestion: string;
  joinTitle: string;
  joinDescription: string;
  joinLink: { text: string; href: string };
  contactCallout: { text: string; name: string; email: string };
  newsletterTitle: string;
  newsletterDescription: string;
}

export default function Footer({
  contacts,
  socialLinks,
  contactQuestion,
  joinTitle,
  joinDescription,
  joinLink,
  contactCallout,
  newsletterTitle,
  newsletterDescription,
}: FooterProps) {
  return (
    <footer id="footer" className="bg-gray-700 text-white py-16 md:py-20">
      <div className="max-w-[1280px] mx-auto px-6 md:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Left Column: Get in Touch */}
          <div>
            <h2 className="text-[36px] md:text-[48px] font-semibold leading-tight">
              Get in Touch
            </h2>
            <p className="mt-4 text-[16px] text-white/70 leading-relaxed">
              {contactQuestion}
            </p>

            <div className="mt-10 space-y-8">
              {contacts.map((contact) => (
                <div key={contact.name}>
                  <p className="text-[14px] text-white/50">{contact.role}</p>
                  <p className="text-[20px] font-semibold mt-1">{contact.name}</p>
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-[14px] text-white/60 hover:text-white transition-colors"
                  >
                    {contact.email}
                  </a>
                </div>
              ))}
            </div>

            {/* Social icons */}
            <div className="mt-10 flex items-center gap-5">
              {socialLinks.github && (
                <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-white/60 hover:text-white transition-colors">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                </a>
              )}
              {socialLinks.linkedin && (
                <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-white/60 hover:text-white transition-colors">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              )}
              {socialLinks.instagram && (
                <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-white/60 hover:text-white transition-colors">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
              )}
              {socialLinks.cowbellConnect && (
                <a href={socialLinks.cowbellConnect} target="_blank" rel="noopener noreferrer" aria-label="Cowbell Connect" className="text-white/60 hover:text-white transition-colors">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Right Column: Join + Newsletter */}
          <div>
            <h2 className="text-[36px] md:text-[48px] font-semibold leading-tight">
              {joinTitle}
            </h2>
            <p className="mt-4 text-[16px] text-white/70 leading-relaxed">
              {joinDescription}
            </p>
            <div className="mt-8">
              <Button variant="on-dark-bold" href={joinLink.href}>
                {joinLink.text}
              </Button>
            </div>
            <p className="mt-6 text-[14px] text-white/50">
              {contactCallout.text} {contactCallout.name} at{" "}
              <a href={`mailto:${contactCallout.email}`} className="text-white/70 hover:text-white transition-colors">
                {contactCallout.email}
              </a>
            </p>

            {/* Divider */}
            <div className="border-t border-white/20 mt-10 pt-10">
              <h3 className="text-[24px] md:text-[32px] font-semibold">
                {newsletterTitle}
              </h3>
              <p className="mt-3 text-[16px] text-white/70">
                {newsletterDescription}
              </p>
              <div className="mt-6">
                <Button variant="on-dark-bold" href="/newsletters">
                  View Newsletter
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
