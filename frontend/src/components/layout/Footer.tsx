"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="border-t border-[#e5e5ea] bg-[#f4f4f6] py-10 sm:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#71717a]">
        
        {/* Left: Copyright (Exact from reference image) */}
        <div>
          © {new Date().getFullYear()} Tharusha Sangeeth. All rights reserved.
        </div>

        {/* Right: Clean typographic social links */}
        <div className="flex items-center gap-4 sm:gap-5 font-medium">
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
          <Link
            href="/resume"
            className="hover:text-[#18181b] transition-colors"
          >
            Resume
          </Link>
          <span className="text-[#d4d4d8]">/</span>
          <button
            type="button"
            onClick={scrollToTop}
            className="hover:text-[#18181b] transition-colors"
          >
            Top ↑
          </button>
        </div>

      </div>
    </footer>
  );
}