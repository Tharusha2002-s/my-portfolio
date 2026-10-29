"use client";

import Image from "next/image";
import { smoothScrollTo } from "@/utils/smoothScroll";

const technologies = [
  { name: "Python", category: "AI / ML" },
  { name: "Next.js", category: "Frontend" },
  { name: "TypeScript", category: "Language" },
  { name: "React", category: "Frontend" },
  { name: "Docker", category: "DevOps" },
  { name: "PostgreSQL", category: "Database" },
  { name: "Node.js", category: "Backend" },
  { name: "Tailwind CSS", category: "Styling" },
  { name: "Hetzner Cloud", category: "Cloud" },
];

export default function Hero() {
  const handleScrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    smoothScrollTo("projects", 80);
  };

  return (
    <section className="relative pt-24 sm:pt-28 pb-12 sm:pb-16 px-4 sm:px-6">
      {/* 1. Main Rounded Hero Card (Matches Reference Image) */}
      <div className="max-w-5xl mx-auto bg-white rounded-[32px] sm:rounded-[44px] border border-[#e5e5ea] shadow-[0_8px_30px_rgb(0,0,0,0.03)] px-6 py-16 sm:py-24 text-center relative overflow-hidden">
        
        {/* Subtle decorative background gradient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-gradient-to-b from-gray-50 to-transparent pointer-events-none rounded-t-[44px]" />

        <div className="relative z-10 flex flex-col items-center">
          
          {/* Avatar with Floating Speech Bubble Badge */}
          <div className="relative mb-6">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-white shadow-md mx-auto ring-1 ring-black/5 bg-gray-100">
              <Image
                src="/profile.png"
                alt="Tharusha Sangeeth"
                width={96}
                height={96}
                priority
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating Speech Tag (Matches reference image avatar badge) */}
            <div className="absolute -top-1 -right-16 sm:-right-20 bg-white border border-[#e5e5ea] shadow-sm rounded-full px-2.5 py-1 text-[11px] font-medium text-[#18181b] flex items-center gap-1.5 whitespace-nowrap animate-bounce duration-1000">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>Available 👋</span>
            </div>
          </div>

          {/* Primary Centered Heading (User Selected Choice) */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#18181b] max-w-2xl mx-auto leading-[1.18] sm:leading-[1.14]">
            Building scalable systems, intelligent AI, and web experiences.
          </h1>

          {/* Subtitle */}
          <p className="mt-5 max-w-xl mx-auto text-sm sm:text-base text-[#71717a] font-normal leading-relaxed">
            Hi, I&apos;m Tharusha Sangeeth — Software Engineering undergraduate at Sabaragamuwa University of Sri Lanka, crafting resilient full-stack applications and advancing in AI/ML.
          </p>

          {/* Center Dark Pill Button: Latest Work ↗ */}
          <div className="mt-8 flex items-center gap-3">
            <a
              href="#projects"
              onClick={handleScrollToProjects}
              className="inline-flex items-center gap-2 bg-[#18181b] hover:bg-black text-white font-medium text-xs sm:text-sm rounded-full px-6 py-3 shadow-sm hover:scale-105 active:scale-95 transition-all"
            >
              <span>Latest Work</span>
              <span>↗</span>
            </a>
          </div>

        </div>
      </div>

      {/* 2. Technologies / Brand Strip (Beneath Hero Card on Canvas) */}
      <div className="max-w-5xl mx-auto mt-12 sm:mt-16 pt-2">
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 md:gap-12 opacity-75 hover:opacity-100 transition-opacity">
          {technologies.map((tech) => (
            <div
              key={tech.name}
              className="flex items-center gap-2 font-mono text-xs sm:text-sm font-semibold text-[#52525b] hover:text-[#18181b] transition-colors"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#a1a1aa]" />
              <span>{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}