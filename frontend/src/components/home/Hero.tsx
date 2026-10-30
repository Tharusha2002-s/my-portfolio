"use client";

import Image from "next/image";
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
      {/* 1. Main Rounded Hero Card */}
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

            {/* Floating Speech Tag */}
            <div className="absolute -top-1 -right-16 sm:-right-20 bg-white border border-[#e5e5ea] shadow-sm rounded-full px-2.5 py-1 text-[11px] font-medium text-[#18181b] flex items-center gap-1.5 whitespace-nowrap animate-bounce duration-1000">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>Available 👋</span>
            </div>
          </div>

          {/* Primary Centered Heading */}
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

      {/* 2. Technologies / Brand Strip with Logos & Infinite Moving Marquee Circle */}
      <div className="max-w-5xl mx-auto mt-12 sm:mt-16 pt-2 overflow-hidden relative">
        {/* Left & Right Edge Gradient Fade Masks */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#f4f4f6] to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#f4f4f6] to-transparent z-10" />

        {/* Moving Marquee Track */}
        <div className="animate-marquee-cycle flex items-center gap-3 sm:gap-4 py-2 select-none">
          {[...technologies, ...technologies].map((tech, idx) => {
            const TechIcon = tech.Icon;
            return (
              <div
                key={`${tech.name}-${idx}`}
                className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-[#e5e5ea] shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:border-[#a1a1aa] hover:shadow-sm transition-all shrink-0 cursor-default"
              >
                <TechIcon className="w-4 h-4 shrink-0" />
                <span className="font-mono text-xs sm:text-sm font-semibold text-[#3f3f46]">
                  {tech.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
