"use client";

import { useEffect } from "react";
import { smoothScrollTo } from "@/utils/smoothScroll";

export default function SmoothScrollHandler() {
  useEffect(() => {
    const handleHash = () => {
      if (typeof window !== "undefined" && window.location.hash) {
        const id = window.location.hash.replace("#", "");
        if (id) {
          // Small delay to allow layout to complete painting
          setTimeout(() => {
            smoothScrollTo(id, 70);
          }, 150);
        }
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  return null;
}
