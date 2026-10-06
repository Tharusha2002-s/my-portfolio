"use client";

import { useState, useMemo, useEffect } from "react";
import { fetchSkillsList, Skill } from "@/utils/api";

const categoryDescriptions: Record<string, string> = {
  Frontend: "Building responsive, accessible, and interactive user interfaces.",
  Backend: "Developing robust APIs and server-side business logic.",
  Databases: "Designing schemas and managing relational database engines.",
  Database: "Designing schemas and managing relational database engines.",
  "DevOps & Tools": "Containerization, automated pipelines, and cloud hosting.",
  "DevOps & Cloud": "Containerization, automated pipelines, and cloud hosting.",
};

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

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
        console.error("Could not fetch skills from API:", err);
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

  const filteredGroups = useMemo(() => {
    const distinctCategories = Array.from(
      new Set(skills.map((s) => s.category || "General"))
    );

    const groups: {
      number: string;
      title: string;
      description: string;
      skills: Skill[];
    }[] = [];

    distinctCategories.forEach((cat, index) => {
      if (activeCategory !== "All" && activeCategory !== cat) return;

      const groupSkills = skills
        .filter((s) => (s.category || "General") === cat)
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

      const matchingSkills = !searchQuery.trim()
        ? groupSkills
        : groupSkills.filter((s) =>
            s.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
          );

      if (matchingSkills.length > 0) {
        groups.push({
          number: String(index + 1).padStart(2, "0"),
          title: cat,
          description:
            categoryDescriptions[cat] || "Technologies, tools, and libraries in this stack.",
          skills: matchingSkills,
        });
      }
    });

    return groups;
  }, [skills, activeCategory, searchQuery]);

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
        <div className="mb-8 sm:mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4">
          <div>
            <p className="mb-2 sm:mb-3 font-mono text-xs uppercase tracking-[0.2em] text-[#00c8ff]">
              03 / Skills
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-[#e6edf3] sm:text-5xl">
              Technologies
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {isLoading && (
              <span className="font-mono text-xs text-[#00c8ff] animate-pulse">
                Syncing with live API...
              </span>
            )}
            <span className="font-mono text-xs text-[#5c6f7f]">
              {totalVisibleSkills} technologies displayed
            </span>
          </div>
        </div>

        {/* Interactive Controls: Search & Category Tabs */}
        {skills.length > 0 && (
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2">
              {categories.map((tab) => (
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
        )}

        {/* Empty State when no skills exist in DB */}
        {!isLoading && skills.length === 0 ? (
          <div className="border border-[#1e2d3d] bg-[#0d1117] p-12 text-center font-mono">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-[#2a3a49] bg-[#080c10] text-[#00c8ff]">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-[#e6edf3]">No skills added yet</p>
            <p className="mt-1 text-xs text-[#5c6f7f]">
              Add technical skills in the Admin Dashboard to have them displayed here.
            </p>
          </div>
        ) : filteredGroups.length === 0 ? (
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
                      key={skill.id || skill.name}
                      className="group/badge inline-flex items-center gap-1.5 border border-[#2a3a49] bg-[#080c10] px-3 py-1.5 font-mono text-xs text-[#8899a6] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#00c8ff] hover:text-[#00c8ff] hover:shadow-[0_0_12px_rgba(0,200,255,0.2)]"
                    >
                      <span>{skill.name}</span>
                      {skill.proficiency && skill.proficiency > 0 && (
                        <span className="text-[10px] text-[#5c6f7f] group-hover/badge:text-[#00c8ff]/80">
                          {skill.proficiency}%
                        </span>
                      )}
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