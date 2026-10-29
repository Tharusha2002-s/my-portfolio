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
    <main className="min-h-screen bg-[#f4f4f6] py-24 sm:py-28 px-4 sm:px-6">
      <div className="mx-auto max-w-4xl">

        {/* Back and Action Buttons */}
        <div className="mb-8 sm:mb-10 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-white border border-[#e5e5ea] rounded-full px-4 py-2 text-xs font-medium text-[#18181b] shadow-sm hover:bg-gray-50 transition-colors"
          >
            ← Back to Home
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/#contact"
              className="bg-white border border-[#e5e5ea] px-4 py-2 rounded-full text-xs font-medium text-[#18181b] shadow-sm hover:bg-gray-50 transition-colors"
            >
              Contact Me
            </Link>
            <PrintButton />
          </div>
        </div>

        {/* Resume Sheet Container */}
        <div className="bg-white rounded-[32px] sm:rounded-[40px] border border-[#e5e5ea] p-8 sm:p-14 shadow-[0_8px_30px_rgb(0,0,0,0.03)]">

          {/* Header */}
          <div className="border-b border-[#e5e5ea] pb-8">
            <span className="inline-block bg-[#f4f4f6] border border-[#e5e5ea] text-[11px] font-mono uppercase tracking-wider text-[#52525b] px-3 py-0.5 rounded-full">
              Curriculum Vitae
            </span>
            <h1 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-[#18181b]">
              Tharusha Sangeeth
            </h1>
            <p className="mt-2 text-sm text-[#71717a]">
              Software Engineering Undergraduate · Full-Stack Developer & Aspiring AI/ML Engineer
            </p>

            <div className="mt-5 flex flex-wrap gap-4 text-xs text-[#71717a]">
              <span>📍 Sri Lanka</span>
              <span>•</span>
              <a
                href="mailto:tharushasangeeth034@gmail.com"
                className="text-[#18181b] hover:underline break-all font-medium"
              >
                tharushasangeeth034@gmail.com
              </a>
              <span>•</span>
              <a
                href="https://github.com/Tharusha2002-s"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#18181b] hover:underline break-all font-medium"
              >
                github.com/Tharusha2002-s
              </a>
            </div>
          </div>

          {/* Summary */}
          <section className="mt-8">
            <h2 className="text-xs font-mono uppercase tracking-widest text-[#a1a1aa]">
              01 // Professional Summary
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#52525b]">
              Passionate and detail-oriented Software Engineering undergraduate with hands-on experience
              in developing full-stack web applications using Next.js, React, Node.js, and TypeScript.
              Adept at building performant architectures, intuitive user interfaces, and robust backend APIs.
              Actively expanding into AI & Machine Learning engineering with Python, deep learning algorithms,
              and cloud-native DevOps architectures.
            </p>
          </section>

          {/* Education */}
          <section className="mt-8 border-t border-[#e5e5ea] pt-8">
            <h2 className="text-xs font-mono uppercase tracking-widest text-[#a1a1aa]">
              02 // Education
            </h2>
            <div className="mt-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-base font-semibold text-[#18181b]">
                  BSc (Hons) in Software Engineering
                </h3>
                <span className="text-xs text-[#71717a] font-medium">
                  Expected 2027
                </span>
              </div>
              <p className="mt-1 text-sm text-[#52525b]">
                Sabaragamuwa University of Sri Lanka — Faculty of Computing
              </p>
              <p className="mt-2 text-xs leading-relaxed text-[#71717a]">
                Relevant Coursework: Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, Software Architecture, Web Application Development, Operating Systems.
              </p>
            </div>
          </section>

          {/* Technical Skills */}
          <section className="mt-8 border-t border-[#e5e5ea] pt-8">
            <h2 className="text-xs font-mono uppercase tracking-widest text-[#a1a1aa]">
              03 // Technical Skills
            </h2>
            {loading ? (
              <p className="mt-4 text-xs text-[#71717a] animate-pulse">
                Loading live skills from database...
              </p>
            ) : Object.keys(skillsByCategory).length > 0 ? (
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {Object.entries(skillsByCategory).map(([category, items]) => (
                  <div key={category} className="bg-[#f9f9fb] p-4 rounded-2xl border border-[#e5e5ea]">
                    <span className="text-xs font-semibold text-[#18181b] block mb-1">
                      {category}
                    </span>
                    <p className="text-xs text-[#52525b] leading-relaxed">
                      {items.join(", ")}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-3 text-xs text-[#71717a]">
                No skills configured yet. Add skills in Admin Dashboard to display here.
              </p>
            )}
          </section>

          {/* Projects */}
          <section className="mt-8 border-t border-[#e5e5ea] pt-8">
            <h2 className="text-xs font-mono uppercase tracking-widest text-[#a1a1aa]">
              04 // Featured Projects
            </h2>
            {loading ? (
              <p className="mt-4 text-xs text-[#71717a] animate-pulse">
                Loading live projects from database...
              </p>
            ) : projects.length > 0 ? (
              <div className="mt-4 space-y-6">
                {projects.map((p) => (
                  <div key={p.id} className="bg-[#f9f9fb] p-5 rounded-2xl border border-[#e5e5ea]">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="text-sm font-semibold text-[#18181b]">
                        {p.title} — {p.category}
                      </h3>
                      {p.technologies && p.technologies.length > 0 && (
                        <span className="font-mono text-[11px] text-[#52525b]">
                          {p.technologies.join(" / ")}
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-[#52525b]">
                      {p.description}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-3 text-xs text-[#71717a]">
                No projects published yet. Add projects in Admin Dashboard to display here.
              </p>
            )}
          </section>

        </div>
      </div>
    </main>
  );
}
