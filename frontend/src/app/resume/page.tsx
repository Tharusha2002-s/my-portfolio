"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PrintButton from "@/components/ui/PrintButton";
import { fetchPublicProjects, fetchSkillsList, Project, Skill } from "@/utils/api";

export default function ResumePage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetchPublicProjects().catch(() => []),
      fetchSkillsList().catch(() => []),
    ]).then(([projData, skillData]) => {
      setProjects(projData || []);
      setSkills(skillData || []);
      setLoading(false);
    });
  }, []);

  const skillsByCategory: Record<string, string[]> = {};
  skills.forEach((s) => {
    const cat = s.category || "General";
    if (!skillsByCategory[cat]) skillsByCategory[cat] = [];
    skillsByCategory[cat].push(s.name);
  });

  return (
    <main className="min-h-screen bg-[#080c10] py-24 sm:py-28 px-4 sm:px-6">
      <div className="mx-auto max-w-4xl">

        {/* Back and Action Buttons */}
        <div className="mb-8 sm:mb-10 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs text-[#8899a6] transition-colors hover:text-[#00c8ff]"
          >
            ← Back to Home
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/#contact"
              className="border border-[#2a3a49] px-4 py-2 font-mono text-xs text-[#e6edf3] transition-colors hover:border-[#00c8ff] hover:text-[#00c8ff]"
            >
              Contact Me
            </Link>
            <PrintButton />
          </div>
        </div>

        {/* Resume Sheet Container */}
        <div className="border border-[#1e2d3d] bg-[#0d1117] p-5 sm:p-12 shadow-2xl">

          {/* Header */}
          <div className="border-b border-[#1e2d3d] pb-8">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#00c8ff]">
              Resume / Curriculum Vitae
            </span>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#e6edf3] sm:text-4xl">
              Tharusha Sangeeth
            </h1>
            <p className="mt-2 font-mono text-sm text-[#8899a6]">
              Software Engineering Undergraduate · Full-Stack Developer
            </p>

            <div className="mt-5 flex flex-wrap gap-4 font-mono text-xs text-[#5c6f7f]">
              <span>📍 Sri Lanka</span>
              <span>•</span>
              <a
                href="mailto:tharushasangeeth034@gmail.com"
                className="text-[#8899a6] hover:text-[#00c8ff]"
              >
                tharushasangeeth034@gmail.com
              </a>
              <span>•</span>
              <a
                href="https://github.com/Tharusha2002-s"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8899a6] hover:text-[#00c8ff]"
              >
                github.com/Tharusha2002-s
              </a>
            </div>
          </div>

          {/* Summary */}
          <section className="mt-8">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-[#00c8ff]">
              01 // Professional Summary
            </h2>
            <p className="mt-3 text-sm leading-7 text-[#8899a6]">
              Passionate and detail-oriented Software Engineering undergraduate with hands-on experience
              in developing full-stack web applications using Next.js, React, Node.js, and TypeScript.
              Adept at building performant architectures, intuitive user interfaces, and robust backend APIs.
              Actively exploring DevOps, cloud computing (AWS, Docker), and software design patterns.
            </p>
          </section>

          {/* Education */}
          <section className="mt-8 border-t border-[#1e2d3d] pt-8">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-[#00c8ff]">
              02 // Education
            </h2>
            <div className="mt-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-base font-semibold text-[#e6edf3]">
                  BSc (Hons) in Software Engineering
                </h3>
                <span className="font-mono text-xs text-[#5c6f7f]">
                  Expected 2027
                </span>
              </div>
              <p className="mt-1 text-sm text-[#8899a6]">
                Sabaragamuwa University of Sri Lanka — Faculty of Computing
              </p>
              <p className="mt-2 text-xs leading-6 text-[#5c6f7f]">
                Relevant Coursework: Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, Software Architecture, Web Application Development, Operating Systems.
              </p>
            </div>
          </section>

          {/* Technical Skills */}
          <section className="mt-8 border-t border-[#1e2d3d] pt-8">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-[#00c8ff]">
              03 // Technical Skills
            </h2>
            {loading ? (
              <p className="mt-4 font-mono text-xs text-[#5c6f7f] animate-pulse">
                Loading live skills from database...
              </p>
            ) : Object.keys(skillsByCategory).length > 0 ? (
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {Object.entries(skillsByCategory).map(([category, items]) => (
                  <div key={category}>
                    <span className="font-mono text-xs text-[#e6edf3]">{category}:</span>
                    <p className="mt-1 text-xs text-[#8899a6]">
                      {items.join(", ")}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-3 font-mono text-xs text-[#5c6f7f]">
                No skills configured yet. Add skills in Admin Dashboard to display here.
              </p>
            )}
          </section>

          {/* Projects */}
          <section className="mt-8 border-t border-[#1e2d3d] pt-8">
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-[#00c8ff]">
              04 // Featured Projects
            </h2>
            {loading ? (
              <p className="mt-4 font-mono text-xs text-[#5c6f7f] animate-pulse">
                Loading live projects from database...
              </p>
            ) : projects.length > 0 ? (
              <div className="mt-4 space-y-6">
                {projects.map((p) => (
                  <div key={p.id}>
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="text-sm font-semibold text-[#e6edf3]">
                        {p.title} — {p.category}
                      </h3>
                      {p.technologies && p.technologies.length > 0 && (
                        <span className="font-mono text-xs text-[#00c8ff]">
                          {p.technologies.join(" / ")}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-xs leading-6 text-[#8899a6]">
                      {p.description}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-3 font-mono text-xs text-[#5c6f7f]">
                No projects published yet. Add projects in Admin Dashboard to display here.
              </p>
            )}
          </section>

        </div>
      </div>
    </main>
  );
}
