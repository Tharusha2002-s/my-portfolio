"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { smoothScrollTo } from "@/utils/smoothScroll";

const navLinks = [
  { label: "About", href: "/#about", sectionId: "about" },
  { label: "Projects", href: "/#projects", sectionId: "projects" },
  { label: "Skills", href: "/#skills", sectionId: "skills" },
  { label: "Blog", href: "/blog", isRoute: true },
  { label: "Resume", href: "/resume", isRoute: true },
  { label: "Contact", href: "/#contact", sectionId: "contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 30);

      // Scroll progress calculation
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((scrollY / totalHeight) * 100);
      }

      // Smooth scrollspy active section detection on homepage
      if (pathname === "/") {
        const sections = ["about", "projects", "skills", "contact"];
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
            // Active if section is in upper-mid viewport
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
    if (!link.isRoute && link.sectionId) {
      if (pathname === "/") {
        e.preventDefault();
        smoothScrollTo(link.sectionId, 70);
        setMenuOpen(false);
      } else {
        setMenuOpen(false);
      }
    } else {
      setMenuOpen(false);
    }
  };

  const openCommandPalette = () => {
    window.dispatchEvent(new CustomEvent("open-command-palette"));
    setMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#080c10]/95 backdrop-blur-md border-b border-[#1e2d3d] shadow-lg shadow-black/20"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          onClick={(e) => {
            if (pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="group flex items-center gap-2 font-mono text-sm tracking-widest font-medium"
        >
          <span className="text-[#00c8ff] transition-transform duration-200 group-hover:scale-105">
            TS
          </span>
          <span className="text-[#3d5166] group-hover:text-[#8899a6] transition-colors">
            .dev
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => {
            const isActive = link.isRoute
              ? pathname === link.href
              : pathname === "/" && activeSection === link.sectionId;

            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link)}
                className={`relative text-sm font-medium transition-all duration-200 py-1.5 ${
                  isActive
                    ? "text-[#00c8ff]"
                    : "text-[#8899a6] hover:text-[#e6edf3]"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00c8ff] rounded-full transition-all duration-300" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Right Side: Command Palette Launcher */}
        <div className="hidden md:flex items-center gap-3">
          <button
            type="button"
            onClick={openCommandPalette}
            aria-label="Open Command Palette"
            className="flex items-center gap-2 border border-[#2a3a49] bg-[#0d1117] px-3 py-1.5 font-mono text-xs text-[#8899a6] transition-all hover:border-[#00c8ff]/60 hover:text-[#e6edf3]"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <span className="text-[11px]">Command</span>
            <kbd className="border border-[#1e2d3d] bg-[#080c10] px-1.5 py-0.5 text-[9px] text-[#5c6f7f]">
              Ctrl K
            </kbd>
          </button>
        </div>

        {/* Mobile Menu & Command Buttons */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={openCommandPalette}
            aria-label="Search"
            className="text-[#8899a6] hover:text-[#00c8ff] p-2"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </button>

          <button
            type="button"
            className="text-[#8899a6] hover:text-[#00c8ff] p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? (
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 6L6 18" />
                <path d="M6 6L18 18" />
              </svg>
            ) : (
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 12h18" />
                <path d="M3 6h18" />
                <path d="M3 18h18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Dynamic Scroll Reading Progress Indicator */}
      {scrolled && (
        <div
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#00c8ff] via-[#38bdf8] to-[#00c8ff] transition-all duration-150 ease-out shadow-[0_0_8px_rgba(0,200,255,0.6)]"
          style={{ width: `${scrollProgress}%` }}
        />
      )}

      {/* Mobile Navigation Drawer */}
      {menuOpen && (
        <div className="md:hidden border-b border-[#1e2d3d] bg-[#080c10]/98 backdrop-blur-xl px-6 py-6 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => {
              const isActive = link.isRoute
                ? pathname === link.href
                : pathname === "/" && activeSection === link.sectionId;

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link)}
                  className={`flex items-center justify-between py-2 text-base font-medium transition-colors ${
                    isActive
                      ? "text-[#00c8ff] font-semibold"
                      : "text-[#8899a6] hover:text-[#e6edf3]"
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="font-mono text-xs text-[#00c8ff]">● active</span>
                  )}
                </Link>
              );
            })}

            <div className="mt-4 pt-4 border-t border-[#1e2d3d] flex flex-col gap-3">
              <button
                type="button"
                onClick={openCommandPalette}
                className="flex items-center justify-center gap-2 border border-[#2a3a49] bg-[#0d1117] py-2.5 font-mono text-xs text-[#e6edf3] hover:border-[#00c8ff]"
              >
                <span>Open Command Palette</span>
                <kbd className="border border-[#1e2d3d] bg-[#080c10] px-1.5 py-0.5 text-[10px] text-[#5c6f7f]">
                  Ctrl+K
                </kbd>
              </button>

              <Link
                href="/resume"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center border border-[#00c8ff] bg-[#00c8ff] py-2.5 font-mono text-xs font-medium text-[#080c10]"
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