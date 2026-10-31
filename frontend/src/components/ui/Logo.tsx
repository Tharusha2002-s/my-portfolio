"use client";

import React from "react";
import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  subtitle?: string;
  className?: string;
  href?: string;
  iconOnly?: boolean;
}

export function LogoIcon({
  size = "md",
  className = "",
}: {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}) {
  const pixelSizes = {
    sm: "h-7 w-7",
    md: "h-9 w-9",
    lg: "h-12 w-12",
    xl: "h-16 w-16",
  };

  const dimension = pixelSizes[size] || pixelSizes.md;

  return (
    <div
      className={`relative inline-flex shrink-0 items-center justify-center transition-transform duration-300 group-hover:scale-105 ${dimension} ${className}`}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full drop-shadow-sm select-none"
      >
        {/* White Background Squircle with Soft Border */}
        <rect
          x="3"
          y="3"
          width="94"
          height="94"
          rx="24"
          fill="#ffffff"
          stroke="#e5e5ea"
          strokeWidth="4"
        />

        {/* High-Contrast Black Monogram: Big T + Smaller S */}
        <text
          x="48"
          y="67"
          textAnchor="middle"
          fontFamily="'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
        >
          <tspan fontSize="54" fontWeight="900" fill="#18181b">
            T
          </tspan>
          <tspan fontSize="34" fontWeight="800" dx="1" dy="-12" fill="#18181b">
            S
          </tspan>
        </text>
      </svg>
    </div>
  );
}

export default function Logo({
  size = "md",
  showText = true,
  subtitle = ".dev",
  className = "",
  href = "/",
  iconOnly = false,
}: LogoProps) {
  const content = (
    <div
      className={`group flex items-center gap-2.5 font-mono select-none transition-all ${className}`}
    >
      <LogoIcon size={size} />

      {showText && !iconOnly && (
        <div className="flex flex-col justify-center leading-none">
          <div className="flex items-baseline tracking-widest font-bold">
            <span className="text-[#18181b] text-sm transition-colors group-hover:opacity-80">
              THARUSHA
            </span>
            <span className="text-[#71717a] text-xs ml-1 font-semibold">
              {subtitle}
            </span>
          </div>
          <span className="text-[9px] uppercase tracking-[0.2em] text-[#a1a1aa] mt-0.5">
            Software Engineer
          </span>
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex items-center">
        {content}
      </Link>
    );
  }

  return content;
}
