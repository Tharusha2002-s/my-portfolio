"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Typewriter from "@/components/ui/Typewriter";
import { smoothScrollTo } from "@/utils/smoothScroll";

export default function Hero() {
  const [copied, setCopied] = useState(false);
  const [colomboTime, setColomboTime] = useState<string>("");

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

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("tharushasangeeth034@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#080c10]">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-[0.08]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(#3d5166 1px, transparent 1px), linear-gradient(90deg, #3d5166 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Glow */}
      <div className="absolute top-1/4 right-0 h-72 w-72 rounded-full bg-[#00c8ff]/10 blur-[120px] pointer-events-none animate-subtle-glow" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl items-center px-4 sm:px-6 pt-24 pb-16">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-12 items-center w-full">

          {/* Left Column: Personal info & CTA */}
          <div>
            {/* Availability & Local Time Pill */}
            <div className="mb-6 sm:mb-8 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2.5 border border-[#1e2d3d] bg-[#0d1117] px-3 py-1.5 rounded-full">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00c8ff] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00c8ff]" />
                </span>

                <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-[#8899a6]">
                  Available for opportunities
                </span>
              </div>

              {colomboTime && (
                <span className="hidden sm:inline-flex items-center gap-1.5 font-mono text-xs text-[#5c6f7f]">
                  <span>🇱🇰 Colombo</span>
                  <span>•</span>
                  <span>{colomboTime} (GMT+5:30)</span>
                </span>
              )}
            </div>

            {/* Main Heading with responsive font sizes */}
            <h1 className="max-w-4xl text-4xl font-bold leading-[1] tracking-tight text-[#e6edf3] sm:text-6xl md:text-7xl lg:text-7xl">
              THARUSHA
              <br />
              <span className="text-[#00c8ff]">SANGEETH</span>
            </h1>

            {/* Animated Role Typewriter */}
            <div className="mt-5 sm:mt-6 flex flex-wrap items-center gap-2 font-mono text-sm text-[#8899a6] sm:text-base">
              <span className="text-[#3d5166]">&gt;</span>
              <Typewriter
                words={[
                  "Software Engineer",
                  "Full-Stack Developer",
                  "Cloud & DevOps Enthusiast",
                  "Problem Solver",
                ]}
                className="text-[#e6edf3] font-semibold"
              />
            </div>

            {/* Description */}
            <p className="mt-5 sm:mt-6 max-w-xl text-sm sm:text-base leading-7 text-[#8899a6]">
              I engineer modern, scalable web applications with a focus on
              clean architecture, high performance, and reliable software engineering.
            </p>

            {/* Action Buttons & Quick Copy */}
            <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-3 sm:gap-4">

              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  smoothScrollTo("projects", 70);
                }}
                className="group inline-flex min-h-[44px] items-center justify-center gap-3 border border-[#00c8ff] bg-[#00c8ff] px-5 sm:px-6 py-2.5 sm:py-3 font-mono text-xs sm:text-sm font-medium text-[#080c10] transition-all duration-200 hover:bg-transparent hover:text-[#00c8ff]"
              >
                View Projects
                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </a>

              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  smoothScrollTo("contact", 70);
                }}
                className="inline-flex min-h-[44px] items-center justify-center gap-2 border border-[#2a3a49] px-5 sm:px-6 py-2.5 sm:py-3 font-mono text-xs sm:text-sm font-medium text-[#e6edf3] transition-all duration-200 hover:border-[#00c8ff] hover:text-[#00c8ff]"
              >
                Get in Touch
              </a>

              {/* Quick Copy Email Button with Animated Tooltip */}
              <div className="relative">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex min-h-[44px] items-center gap-2 border border-[#1e2d3d] bg-[#0d1117] px-4 py-2.5 sm:py-3 font-mono text-xs sm:text-sm text-[#8899a6] transition-all hover:border-[#00c8ff]/60 hover:text-[#e6edf3]"
                  aria-label="Copy email address"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  <span>{copied ? "Copied!" : "Copy Email"}</span>
                </button>

                {copied && (
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 border border-[#00c8ff]/40 bg-[#080c10] px-2 py-0.5 font-mono text-[10px] text-[#00c8ff] shadow-md">
                    ✓ Copied to clipboard!
                  </span>
                )}
              </div>

              <Link
                href="/resume"
                className="font-mono text-xs sm:text-sm text-[#8899a6] underline-offset-4 transition-colors hover:text-[#00c8ff] hover:underline"
              >
                Resume ↗
              </Link>
            </div>

            {/* Responsive Statistics Grid */}
            <div className="mt-12 sm:mt-16 grid grid-cols-2 gap-6 border-t border-[#1e2d3d] pt-6 sm:grid-cols-4 sm:gap-0">

              <div>
                <div className="font-mono text-2xl font-bold text-[#e6edf3]">
                  05+
                </div>
                <div className="mt-1 text-[11px] uppercase tracking-wider text-[#5c6f7f]">
                  Projects
                </div>
              </div>

              <div>
                <div className="font-mono text-2xl font-bold text-[#e6edf3]">
                  10+
                </div>
                <div className="mt-1 text-[11px] uppercase tracking-wider text-[#5c6f7f]">
                  Technologies
                </div>
              </div>

              <div>
                <div className="font-mono text-2xl font-bold text-[#e6edf3]">
                  03+
                </div>
                <div className="mt-1 text-[11px] uppercase tracking-wider text-[#5c6f7f]">
                  Years Learning
                </div>
              </div>

              <div>
                <div className="font-mono text-2xl font-bold text-[#e6edf3]">
                  ∞
                </div>
                <div className="mt-1 text-[11px] uppercase tracking-wider text-[#5c6f7f]">
                  Curiosity
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Display Picture (DP) Frame */}
          <div className="relative flex justify-center lg:justify-end mt-4 lg:mt-0">
            {/* Ambient background glow behind portrait */}
            <div className="absolute -inset-4 rounded-2xl bg-gradient-to-tr from-[#00c8ff]/20 via-[#00c8ff]/5 to-transparent blur-2xl -z-10 animate-subtle-glow pointer-events-none" />

            {/* DP Frame Card */}
            <div className="group relative w-full max-w-[280px] sm:max-w-[340px] lg:max-w-[380px] border border-[#1e2d3d] bg-[#0d1117]/90 p-3 sm:p-4 backdrop-blur-md transition-all duration-300 hover:border-[#00c8ff]/60 hover:shadow-[0_0_35px_rgba(0,200,255,0.15)]">

              {/* Tech Corner Crosshairs */}
              <span className="absolute -top-1.5 -left-1.5 font-mono text-xs text-[#00c8ff] select-none">
                +
              </span>
              <span className="absolute -top-1.5 -right-1.5 font-mono text-xs text-[#00c8ff] select-none">
                +
              </span>
              <span className="absolute -bottom-1.5 -left-1.5 font-mono text-xs text-[#00c8ff] select-none">
                +
              </span>
              <span className="absolute -bottom-1.5 -right-1.5 font-mono text-xs text-[#00c8ff] select-none">
                +
              </span>

              {/* Top bar with file name & live status */}
              <div className="mb-3 flex items-center justify-between border-b border-[#1e2d3d] pb-2 font-mono text-[11px] text-[#5c6f7f]">
                <span className="text-[#8899a6]">tharusha_dp.jpg</span>
                <span className="flex items-center gap-1.5 text-[#00c8ff]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#00c8ff] animate-ping" />
                  ONLINE
                </span>
              </div>

              {/* Image Container with subtle hover zoom */}
              <div className="relative overflow-hidden rounded border border-[#1e2d3d] aspect-square bg-[#080c10]">
                <Image
                  src="/profile.png"
                  alt="Tharusha Sangeeth - Software Engineer Profile Picture"
                  width={380}
                  height={380}
                  priority
                  className="h-full w-full object-cover object-center grayscale-[12%] transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
                />

                {/* Subtle gradient vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080c10]/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />

                {/* Floating badge inside photo */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between border border-[#1e2d3d]/80 bg-[#080c10]/80 px-3 py-1.5 backdrop-blur-md">
                  <span className="font-mono text-[10px] text-[#e6edf3]">
                    Software Engineering
                  </span>
                  <span className="font-mono text-[10px] text-[#00c8ff]">
                    SUSL
                  </span>
                </div>
              </div>

              {/* Bottom details line */}
              <div className="mt-3 flex items-center justify-between font-mono text-[11px] text-[#5c6f7f]">
                <span>Full-Stack Engineer</span>
                <span className="text-[#3d5166]">ID: TS-2026</span>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Interactive Scroll Down Button */}
      <button
        type="button"
        onClick={() => smoothScrollTo("about", 70)}
        aria-label="Scroll to About section"
        className="group absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex cursor-pointer"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#5c6f7f] transition-colors group-hover:text-[#00c8ff]">
          Scroll
        </span>
        <div className="h-8 w-px bg-gradient-to-b from-[#00c8ff] to-transparent transition-all duration-300 group-hover:h-10 group-hover:from-[#00c8ff] group-hover:to-[#00c8ff]/40" />
      </button>
    </section>
  );
}