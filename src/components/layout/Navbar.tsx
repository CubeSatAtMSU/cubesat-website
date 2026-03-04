"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import type { MissionData } from "@/data/types";

interface NavLinkData {
  label: string;
  href: string;
  submenuType?: "missions";
}

interface NavbarProps {
  links: NavLinkData[];
  missions: MissionData[];
  transparent?: boolean;
}

export default function Navbar({ links, missions, transparent = true }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const showSolid = !transparent || scrolled;
  const navBg = showSolid ? "bg-white shadow-sm" : "bg-transparent";
  const textColor = showSolid ? "text-gray-900" : "text-white";
  const logoFilter = showSolid ? "invert" : "";

  // Build submenu items from mission pool
  const missionSubmenu = missions.slice(0, 6).map((m) => ({
    label: m.card.title,
    href: `/missions/${m.slug}`,
  }));

  // Resolve nav links — inject mission submenu where submenuType === "missions"
  const resolvedLinks = links.map((link) => ({
    label: link.label,
    href: link.href,
    submenu: link.submenuType === "missions" ? missionSubmenu : undefined,
  }));

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-20 flex items-center justify-between h-20">
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/images/cubesat-logo.svg"
            alt="CubeSat at MSU"
            width={160}
            height={55}
            className={`h-12 w-auto transition-all duration-300 ${logoFilter}`}
            priority
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-10">
          {resolvedLinks.map((link) => {
            const isExternal = link.href.startsWith("http");

            if (link.submenu) {
              return (
                <div key={link.label} className="relative group">
                  <a
                    href={link.href}
                    className={`text-[16px] font-medium transition-colors hover:opacity-70 ${textColor}`}
                  >
                    {link.label}
                  </a>
                  {/* Invisible bridge to prevent hover gap */}
                  <div className="absolute left-0 top-full w-full h-3" />
                  {/* Dropdown */}
                  <div className="absolute left-0 top-[calc(100%+12px)] bg-white rounded-lg shadow-lg py-2 min-w-48 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    {link.submenu.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="block px-4 py-2 text-[16px] text-gray-900 hover:bg-maroon-dark hover:text-white transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                    <div className="border-t border-gray-100 my-1" />
                    <Link
                      href="/missions"
                      className="block px-4 py-2 text-[16px] font-medium text-maroon-dark hover:bg-maroon-dark hover:text-white transition-colors"
                    >
                      View All Missions
                    </Link>
                  </div>
                </div>
              );
            }

            if (isExternal) {
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-[16px] font-medium transition-colors hover:opacity-70 ${textColor}`}
                >
                  {link.label}
                </a>
              );
            }
            return (
              <a
                key={link.label}
                href={link.href}
                className={`text-[16px] font-medium transition-colors hover:opacity-70 ${textColor}`}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`md:hidden flex flex-col gap-1.5 cursor-pointer ${textColor}`}
          aria-label="Toggle navigation"
        >
          <span className={`block w-6 h-0.5 bg-current transition-transform ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-current transition-opacity ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-current transition-transform ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-6 py-4 flex flex-col gap-4">
            {resolvedLinks.map((link) => (
              <div key={link.label}>
                {link.submenu ? (
                  <>
                    <button
                      onClick={() =>
                        setMobileSubmenuOpen(
                          mobileSubmenuOpen === link.label ? null : link.label
                        )
                      }
                      className="text-[16px] font-medium text-gray-900 hover:text-maroon-dark transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      {link.label}
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className={`transition-transform duration-200 ${
                          mobileSubmenuOpen === link.label ? "rotate-180" : ""
                        }`}
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>
                    {mobileSubmenuOpen === link.label && (
                      <div className="ml-4 mt-2 flex flex-col gap-3">
                        {link.submenu.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className="text-[14px] text-gray-600 hover:text-maroon-dark transition-colors"
                          >
                            {item.label}
                          </Link>
                        ))}
                        <div className="border-t border-gray-100 pt-2 mt-1">
                          <Link
                            href="/missions"
                            onClick={() => setMobileOpen(false)}
                            className="text-[14px] font-medium text-maroon-dark hover:text-maroon-light transition-colors"
                          >
                            View All Missions →
                          </Link>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-[16px] font-medium text-gray-900 hover:text-maroon-dark transition-colors"
                    {...(link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {link.label}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
