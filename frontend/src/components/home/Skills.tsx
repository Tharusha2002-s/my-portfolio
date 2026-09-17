"use client";

import { useState, useMemo } from "react";

const skillGroups = [
  {
    number: "01",
    title: "Frontend",
    description: "Building responsive, accessible, and interactive user interfaces.",
    skills: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Tailwind CSS",
    ],
  },
  {
    number: "02",
    title: "Backend",
    description: "Developing robust APIs and server-side business logic.",
    skills: [
      "Node.js",
      "Express.js",
      "Next.js API",
      "REST APIs",
      "JWT",
      "Prisma",
    ],
  },
  {
    number: "03",
    title: "Database",
    description: "Designing schemas and managing relational database engines.",
    skills: [
      "PostgreSQL",
      "MySQL",
      "SQL",
      "Database Design",
    ],
  },
  {
    number: "04",
    title: "DevOps & Cloud",
    description: "Containerization, automated pipelines, and cloud hosting.",
    skills: [
      "Git",
      "GitHub",
      "Docker",
      "CI/CD",
      "AWS",
      "Linux",
    ],
  },
];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredGroups = useMemo(() => {
    return skillGroups
      .filter(
        (group) => activeCategory === "All" || group.title === activeCategory
      )
      .map((group) => {
        if (!searchQuery.trim()) return group;
        const matchingSkills = group.skills.filter((s) =>
          s.toLowerCase().includes(searchQuery.toLowerCase().trim())
        );
        return {
          ...group,
          skills: matchingSkills,
        };
      })
      .filter((group) => group.skills.length > 0);
  }, [activeCategory, searchQuery]);

  const totalVisibleSkills = useMemo(() => {
    return filteredGroups.reduce((acc, g) => acc + g.skills.length, 0);
  }, [filteredGroups]);

  return (
    <section
      id="skills"
      className="relative border-t border-[#1e2d3d] bg-[#080c10] py-20 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">

        {/* Section Header */}
        <div className="mb-10 sm:mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 sm:mb-3 font-mono text-xs uppercase tracking-[0.2em] text-[#00c8ff]">
              03 / Skills
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-[#e6edf3] sm:text-5xl">
              Technologies
            </h2>
          </div>

          <span className="font-mono text-xs text-[#5c6f7f]">
            {totalVisibleSkills} technologies displayed
          </span>
        </div>

        {/* Interactive Controls: Search & Category Tabs */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {["All", "Frontend", "Backend", "Database", "DevOps & Cloud"].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveCategory(tab)}
                className={`border px-3 py-1.5 font-mono text-xs transition-all ${
                  activeCategory === tab
                    ? "border-[#00c8ff] bg-[#00c8ff]/10 text-[#00c8ff]"
                    : "border-[#2a3a49] bg-[#0d1117] text-[#8899a6] hover:border-[#3d5166] hover:text-[#e6edf3]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skill (e.g. Docker)..."
              className="w-full border border-[#2a3a49] bg-[#0d1117] pl-8 pr-3 py-1.5 font-mono text-xs text-[#e6edf3] placeholder:text-[#5c6f7f] outline-none focus:border-[#00c8ff] transition-colors"
            />
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#5c6f7f]"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#5c6f7f] hover:text-[#e6edf3]"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Skills Grid */}
        {filteredGroups.length === 0 ? (
          <div className="border border-[#1e2d3d] bg-[#0d1117] p-10 text-center font-mono text-xs text-[#8899a6]">
            No skills found matching &quot;{searchQuery}&quot;.
            <div className="mt-3">
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                }}
                className="text-[#00c8ff] underline hover:text-[#e6edf3]"
              >
                Reset Search
              </button>
            </div>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {filteredGroups.map((group) => (
              <div
                key={group.number}
                className="group border border-[#1e2d3d] bg-[#0d1117] p-6 sm:p-7 transition-all duration-300 hover:border-[#00c8ff]/50 hover:shadow-[0_0_25px_rgba(0,200,255,0.05)]"
              >
                {/* Header */}
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-[#00c8ff]">
                      {group.number}
                    </span>

                    <h3 className="text-lg sm:text-xl font-semibold text-[#e6edf3] transition-colors group-hover:text-[#00c8ff]">
                      {group.title}
                    </h3>
                  </div>

                  <span className="font-mono text-sm text-[#1e2d3d] transition-colors group-hover:text-[#3d5166]">
                    {"</>"}
                  </span>
                </div>

                {/* Description */}
                <p className="mb-5 text-sm leading-6 text-[#8899a6]">
                  {group.description}
                </p>

                {/* Interactive Skills Badges */}
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="border border-[#2a3a49] bg-[#080c10] px-3 py-1.5 font-mono text-xs text-[#8899a6] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#00c8ff] hover:text-[#00c8ff] hover:shadow-[0_0_12px_rgba(0,200,255,0.2)]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Continuous Learning Banner */}
        <div className="mt-8 border border-[#1e2d3d] bg-[#0d1117] px-5 sm:px-6 py-4 sm:py-5">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="font-mono text-xs text-[#5c6f7f]">
              CURRENTLY EXPANDING:
            </span>

            <span className="font-mono text-xs text-[#00c8ff]">
              Cloud Architecture
            </span>

            <span className="text-[#2a3a49]">/</span>

            <span className="font-mono text-xs text-[#00c8ff]">
              Kubernetes & Microservices
            </span>

            <span className="text-[#2a3a49]">/</span>

            <span className="font-mono text-xs text-[#00c8ff]">
              Full-Stack System Design
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}