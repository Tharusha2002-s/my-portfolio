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
        className="h-full w-full drop-shadow-[0_0_12px_rgba(0,200,255,0.35)]"
      >
        <defs>
          <linearGradient id="tsGradPrimary" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00e5ff" />
            <stop offset="50%" stopColor="#00c8ff" />
            <stop offset="100%" stopColor="#0077b6" />
          </linearGradient>
          <linearGradient id="tsGradAccent" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#80e5ff" />
          </linearGradient>
          <linearGradient id="tsBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0d1117" />
            <stop offset="100%" stopColor="#080c10" />
          </linearGradient>
          <filter id="neonCyanGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Tech Squircle Background */}
        <rect
          x="4"
          y="4"
          width="92"
          height="92"
          rx="22"
          fill="url(#tsBgGrad)"
          stroke="#1e2d3d"
          strokeWidth="2.5"
          className="transition-colors duration-300 group-hover:stroke-[#00c8ff]/60"
        />

        {/* Ambient Corner Crosshairs / Cyber Accents */}
        <path
          d="M 14 24 L 14 14 L 24 14"
          stroke="#00c8ff"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.7"
        />
        <path
          d="M 86 76 L 86 86 L 76 86"
          stroke="#00c8ff"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.7"
        />

        {/* 'T' Pillar with Apex Arrowhead (Engineering & Ascent) */}
        <path
          d="M 50 18 L 62 26 L 54 26 L 54 52 L 46 52 L 46 26 L 38 26 Z"
          fill="url(#tsGradPrimary)"
          opacity="0.95"
        />
        <path
          d="M 50 50 L 50 82"
          stroke="url(#tsGradPrimary)"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* 'S' Flow Ribbon Weaving Interlocked through the T */}
        <path
          d="M 68 34 C 68 28 62 24 50 24 C 36 24 30 30 30 38 C 30 46 40 48 54 51 C 66 54 70 59 70 66 C 70 75 62 79 48 79 C 34 79 28 73 28 66"
          stroke="url(#tsGradAccent)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#neonCyanGlow)"
        />

        {/* Terminal Dot Nodes */}
        <circle cx="68" cy="34" r="3.5" fill="#00e5ff" />
        <circle cx="28" cy="66" r="3.5" fill="#38bdf8" />
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
            <span className="text-[#e6edf3] text-sm transition-colors group-hover:text-[#00c8ff]">
              THARUSHA
            </span>
            <span className="text-[#00c8ff] text-xs ml-1 font-semibold">
              {subtitle}
            </span>
          </div>
          <span className="text-[9px] uppercase tracking-[0.2em] text-[#5c6f7f] mt-0.5">
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
