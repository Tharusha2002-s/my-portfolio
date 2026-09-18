"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { smoothScrollTo } from "@/utils/smoothScroll";

const footerLinks = [
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/#projects" },
  { label: "Skills", href: "/#skills" },
  { label: "Blog", href: "/blog" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/#contact" },
];

export default function Footer() {
  const [colomboTime, setColomboTime] = useState<string>("");
  const pathname = usePathname();

  useEffect(() => {
    const updateTime = () => {
      try {
        const timeStr = new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Colombo",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }).format(new Date());
        setColomboTime(timeStr);
      } catch {
        setColomboTime("");
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000 * 30);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleFooterClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("/#") && pathname === "/") {
      e.preventDefault();
      const sectionId = href.replace("/#", "");
      smoothScrollTo(sectionId, 70);
    }
  };

  return (
    <footer className="border-t border-[#1e2d3d] bg-[#080c10]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-12">

        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">

          {/* Logo, Copyright & Local Time */}
          <div>
            <Link
              href="/"
              onClick={(e) => {
                if (pathname === "/") {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className="font-mono text-sm tracking-widest text-[#00c8ff]"
            >
              TS<span className="text-[#3d5166]">.dev</span>
            </Link>

            <p className="mt-2 text-xs text-[#5c6f7f]">
              © {new Date().getFullYear()} Tharusha Sangeeth. All rights reserved.
            </p>

            {colomboTime && (
              <div className="mt-3 flex items-center gap-2 font-mono text-[11px] text-[#5c6f7f]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#00c8ff] animate-pulse" />
                <span>Sri Lanka (UTC+5:30): {colomboTime}</span>
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap gap-x-5 gap-y-2.5">
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={(e) => handleFooterClick(e, link.href)}
                className="font-mono text-xs text-[#5c6f7f] transition-colors hover:text-[#00c8ff]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Social Links & Back to Top */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <a
              href="https://github.com/Tharusha20-s"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-[#5c6f7f] transition-colors hover:text-[#00c8ff]"
            >
              GitHub ↗
            </a>

            <a
              href="https://www.linkedin.com/in/tharusha-sangeeth"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-[#5c6f7f] transition-colors hover:text-[#00c8ff]"
            >
              LinkedIn ↗
            </a>

            <button
              type="button"
              onClick={scrollToTop}
              className="font-mono text-xs text-[#00c8ff] hover:underline"
            >
              Back to top ↑
            </button>
          </div>

        </div>

        {/* Bottom Technical Line */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-[#1e2d3d] pt-6">
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00c8ff]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#5c6f7f]">
              Built with Next.js 16 · TypeScript · Tailwind CSS
            </span>
          </div>

          <span className="font-mono text-[10px] text-[#3d5166]">
            Press <kbd className="border border-[#1e2d3d] px-1 py-0.5 text-[9px]">Ctrl+K</kbd> for commands
          </span>
        </div>

      </div>
    </footer>
  );
}