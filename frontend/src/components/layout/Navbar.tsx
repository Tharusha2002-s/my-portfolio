"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { smoothScrollTo } from "@/utils/smoothScroll";

const navLinks = [
  { label: "About", href: "/#about", sectionId: "about" },
  { label: "Projects", href: "/#projects", sectionId: "projects" },
  { label: "Services", href: "/#services", sectionId: "services" },
  { label: "Skills", href: "/#skills", sectionId: "skills" },
  { label: "Contact", href: "/#contact", sectionId: "contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const pathname = usePathname();

  useEffect(() => {
    if (pathname?.startsWith("/admin")) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 20);

      if (pathname === "/") {
        const sections = ["about", "projects", "services", "skills", "contact"];
        const isBottom =
          window.innerHeight + scrollY >=
          document.documentElement.scrollHeight - 70;

        if (isBottom) {
          setActiveSection("contact");
          return;
        }

        if (scrollY < 180) {
          setActiveSection("");
          return;
        }

        let current = "";
        for (const section of sections) {
          const el = document.getElementById(section);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= 120) {
              current = section;
            }
          }
        }
        if (current) {
          setActiveSection(current);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    link: (typeof navLinks)[0]
  ) => {
    if (link.sectionId && pathname === "/") {
      e.preventDefault();
      smoothScrollTo(link.sectionId, 80);
      setMenuOpen(false);
    } else {
      setMenuOpen(false);
    }
  };

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#f4f4f6]/90 backdrop-blur-md border-b border-[#e5e5ea] shadow-sm py-3"
          : "bg-transparent border-b border-transparent py-4 sm:py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link
          href="/"
          onClick={(e) => {
            if (pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="group flex items-center font-mono text-sm sm:text-base tracking-widest font-bold select-none text-[#18181b] transition-opacity hover:opacity-80"
        >
          THARUSHA
        </Link>

        {/* Right Side: Clean Typographic Links (Matches reference image) */}
        <nav className="hidden md:flex items-center gap-5 text-xs sm:text-sm font-medium text-[#71717a]">
          <a
            href="https://www.linkedin.com/in/tharusha-sangeeth-3b2665306/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#18181b] transition-colors"
          >
            LinkedIn
          </a>
          <span className="text-[#d4d4d8]">/</span>
          <a
            href="https://github.com/Tharusha2002-s"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#18181b] transition-colors"
          >
            GitHub
          </a>
          <span className="text-[#d4d4d8]">/</span>
          {navLinks.map((link, idx) => {
            const isActive =
              pathname === "/" && activeSection === link.sectionId;
            return (
              <span key={link.label} className="flex items-center gap-5">
                <Link
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link)}
                  className={`transition-colors ${
                    isActive
                      ? "text-[#18181b] font-semibold"
                      : "hover:text-[#18181b]"
                  }`}
                >
                  {link.label}
                </Link>
                {idx < navLinks.length - 1 && (
                  <span className="text-[#d4d4d8]">/</span>
                )}
              </span>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center">
          <button
            type="button"
            className="p-2 text-[#52525b] hover:text-[#18181b] transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="md:hidden border-b border-[#e5e5ea] bg-white/98 backdrop-blur-xl px-6 py-6 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link)}
                className="py-2 text-base font-medium text-[#52525b] hover:text-[#18181b] transition-colors"
              >
                {link.label}
              </Link>
            ))}

            <div className="mt-4 pt-4 border-t border-[#e5e5ea] flex flex-col gap-3">
              <a
                href="https://www.linkedin.com/in/tharusha-sangeeth-3b2665306/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-[#52525b] hover:text-[#18181b]"
              >
                LinkedIn ↗
              </a>
              <a
                href="https://github.com/Tharusha2002-s"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-[#52525b] hover:text-[#18181b]"
              >
                GitHub ↗
              </a>
              <Link
                href="/resume"
                onClick={() => setMenuOpen(false)}
                className="mt-2 text-center bg-[#18181b] text-white py-2.5 rounded-full font-medium text-xs hover:bg-black transition-colors"
              >
                View Full Resume ↗
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}