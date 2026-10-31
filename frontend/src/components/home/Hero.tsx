"use client";

import Image from "next/image";
import Link from "next/link";
import { smoothScrollTo } from "@/utils/smoothScroll";
import {
  PythonIcon,
  NextjsIcon,
  TypeScriptIcon,
  ReactIcon,
  DockerIcon,
  PostgresIcon,
  NodeIcon,
  TailwindIcon,
  HetznerIcon,
} from "@/components/ui/TechIcons";

const technologies = [
  { name: "Python", category: "AI / ML", Icon: PythonIcon },
  { name: "Next.js", category: "Frontend", Icon: NextjsIcon },
  { name: "TypeScript", category: "Language", Icon: TypeScriptIcon },
  { name: "React", category: "Frontend", Icon: ReactIcon },
  { name: "Docker", category: "DevOps", Icon: DockerIcon },
  { name: "PostgreSQL", category: "Database", Icon: PostgresIcon },
  { name: "Node.js", category: "Backend", Icon: NodeIcon },
  { name: "Tailwind CSS", category: "Styling", Icon: TailwindIcon },
  { name: "Hetzner Cloud", category: "Cloud", Icon: HetznerIcon },
];

export default function Hero() {
  const handleScrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    smoothScrollTo("projects", 80);
  };

  return (
    <section className="relative pt-24 sm:pt-28 pb-12 sm:pb-16 px-4 sm:px-6">
      {/* 1. Main Rounded Hero Card with Text Left & Photo Right */}
      <div className="max-w-5xl mx-auto bg-white rounded-[32px] sm:rounded-[44px] border border-[#e5e5ea] shadow-[0_8px_30px_rgb(0,0,0,0.03)] p-8 sm:p-12 lg:p-16 relative overflow-hidden">
        
        {/* Subtle decorative background gradient */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-gray-50/80 to-transparent pointer-events-none rounded-tr-[44px]" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10 lg:gap-12 items-center">
          
          {/* Left Side: Typography & CTA */}
          <div className="flex flex-col items-start text-left">
            
            {/* Availability Pill */}
            <div className="inline-flex items-center gap-2 bg-[#f4f4f6] border border-[#e5e5ea] rounded-full px-3.5 py-1 text-xs font-medium text-[#52525b] shadow-sm mb-5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>Available for opportunities 👋</span>
            </div>

            {/* Primary Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold tracking-tight text-[#18181b] leading-[1.16]">
              Building scalable systems, intelligent AI, and web experiences.
            </h1>

            {/* Subtitle Bio */}
            <p className="mt-5 text-sm sm:text-base text-[#71717a] font-normal leading-relaxed max-w-xl">
              Hi, I&apos;m Tharusha Sangeeth — Software Engineering undergraduate at Sabaragamuwa University of Sri Lanka, crafting resilient full-stack applications and advancing in AI/ML.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                onClick={handleScrollToProjects}
                className="inline-flex items-center gap-2 bg-[#18181b] hover:bg-black text-white font-medium text-xs sm:text-sm rounded-full px-6 py-3 shadow-sm hover:scale-105 active:scale-95 transition-all"
              >
                <span>Latest Work</span>
                <span>↗</span>
              </a>

              <Link
                href="/resume"
                className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-[#18181b] border border-[#e5e5ea] font-medium text-xs sm:text-sm rounded-full px-5 py-3 shadow-sm hover:border-gray-300 transition-all"
              >
                <span>View Resume</span>
                <span>↗</span>
              </Link>
            </div>

          </div>

          {/* Right Side: Profile Photo */}
          <div className="flex justify-center lg:justify-end order-first lg:order-last">
            <div className="relative">
              {/* Soft ambient background glow */}
              <div className="absolute -inset-3 rounded-full bg-gradient-to-tr from-gray-200/60 via-gray-100/40 to-transparent blur-xl -z-10" />

              {/* Circular Avatar Container */}
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden border-4 border-white shadow-[0_12px_40px_rgba(0,0,0,0.08)] ring-1 ring-black/5 bg-gray-100 transition-transform duration-500 hover:scale-[1.02]">
                <Image
                  src="/profile.png"
                  alt="Tharusha Sangeeth"
                  width={320}
                  height={320}
                  priority
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Badge Tag */}
              <div className="absolute bottom-2 -left-2 sm:bottom-4 sm:-left-4 bg-white/95 backdrop-blur-sm border border-[#e5e5ea] shadow-md rounded-full px-3.5 py-1.5 text-xs font-semibold text-[#18181b] flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span>Tharusha Sangeeth</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 2. Technologies / Brand Logo Strip with Infinite Moving Cycle (Matches Reference Image) */}
      <div className="max-w-5xl mx-auto mt-12 sm:mt-16 pt-2 overflow-hidden relative">
        {/* Left & Right Edge Gradient Fade Masks */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#f4f4f6] to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#f4f4f6] to-transparent z-10" />

        {/* Moving Marquee Track - Logos Only Infinite Cycle */}
        <div className="animate-marquee-cycle flex items-center gap-10 sm:gap-14 md:gap-16 py-3 select-none">
          {[...technologies, ...technologies, ...technologies, ...technologies].map((tech, idx) => {
            const TechIcon = tech.Icon;
            return (
              <div
                key={`${tech.name}-${idx}`}
                title={tech.name}
                aria-label={tech.name}
                className="flex items-center justify-center p-2.5 sm:p-3 rounded-2xl hover:bg-white hover:shadow-md hover:border hover:border-[#e5e5ea] transition-all duration-300 shrink-0 cursor-pointer group"
              >
                <TechIcon className="h-8 w-8 sm:h-9 sm:w-9 shrink-0 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
