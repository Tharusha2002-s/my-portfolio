"use client";

import { useState, useMemo, useEffect } from "react";
import { fetchSkillsList, Skill } from "@/utils/api";

const services = [
  {
    title: "AI & Machine Learning",
    description:
      "Developing predictive models, data science pipelines, and intelligent computer vision algorithms with Python.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    title: "Web & Full-Stack Apps",
    description:
      "Transforming complex requirements into seamless, interactive Next.js, React, and Express web applications.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    title: "Cloud & DevOps",
    description:
      "Architecting resilient multi-stage Docker containers, automated CI/CD pipelines, and high-uptime VPS servers.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
      </svg>
    ),
  },
  {
    title: "Database & Systems",
    description:
      "Designing clean relational database schemas with PostgreSQL, Prisma ORM, and high-concurrency RESTful APIs.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
  },
];

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    fetchSkillsList()
      .then((data) => {
        if (isMounted) {
          setSkills(data || []);
        }
      })
      .catch((err) => {
        console.error("Could not fetch skills:", err);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(skills.map((s) => s.category || "General")));
    return ["All", ...cats];
  }, [skills]);

  const filteredSkills = useMemo(() => {
    if (activeCategory === "All") return skills;
    return skills.filter((s) => (s.category || "General") === activeCategory);
  }, [skills, activeCategory]);

  return (
    <section id="services" className="py-16 sm:py-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* Services & Expertise Card (Matches Middle Section of Reference Image) */}
        <div className="bg-white rounded-[32px] sm:rounded-[44px] border border-[#e5e5ea] shadow-[0_8px_30px_rgb(0,0,0,0.03)] p-8 sm:p-14 md:p-16 text-center">
          
          {/* Centered Pill Tag */}
          <div className="inline-flex items-center gap-2 bg-[#f4f4f6] border border-[#e5e5ea] rounded-full px-3.5 py-1 text-xs font-medium text-[#52525b] shadow-sm">
            <span>Services & Expertise</span>
          </div>

          {/* Centered Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#18181b] max-w-xl mx-auto mt-4 mb-12 sm:mb-16 leading-tight">
            Collaborate with brands and teams to create impactful results.
          </h2>

          {/* 4-Column Minimalist Service Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
            {services.map((service) => (
              <div
                key={service.title}
                className="flex flex-col gap-3 p-2 rounded-2xl hover:bg-gray-50/80 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-[#f4f4f6] border border-[#e5e5ea] text-[#18181b] flex items-center justify-center">
                  {service.icon}
                </div>
                <h3 className="font-semibold text-base text-[#18181b] mt-1">
                  {service.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#71717a] leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>

          {/* Technical Skills Database Badges */}
          <div id="skills" className="mt-16 sm:mt-20 pt-10 sm:pt-12 border-t border-[#e5e5ea] text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-lg font-bold text-[#18181b]">
                  Technical Stack & Tools
                </h3>
                <p className="text-xs text-[#71717a] mt-0.5">
                  Live technologies synchronized with PostgreSQL database
                </p>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                      activeCategory === cat
                        ? "bg-[#18181b] text-white shadow-sm"
                        : "bg-[#f4f4f6] text-[#52525b] hover:bg-[#e4e4e7]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Skills Chips */}
            {isLoading ? (
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <div key={n} className="h-8 w-24 bg-gray-100 animate-pulse rounded-full" />
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {filteredSkills.map((skill) => (
                  <span
                    key={skill.id || skill.name}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-[#f4f4f6] border border-[#e5e5ea] text-[#18181b] hover:border-[#a1a1aa] transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#18181b]" />
                    <span>{skill.name}</span>
                  </span>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}