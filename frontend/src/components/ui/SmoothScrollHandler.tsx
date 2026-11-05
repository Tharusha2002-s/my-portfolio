"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { smoothScrollTo } from "@/utils/smoothScroll";

export default function SmoothScrollHandler() {
  const pathname = usePathname();

  useEffect(() => {
    const handleHash = () => {
      if (typeof window !== "undefined" && window.location.hash) {
        const id = window.location.hash.replace("#", "");
        if (id) {
          // Small delay to allow layout to complete painting
          const timer = setTimeout(() => {
            smoothScrollTo(id, 80);
          }, 120);
          return () => clearTimeout(timer);
        }
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, [pathname]);

  return null;
}
