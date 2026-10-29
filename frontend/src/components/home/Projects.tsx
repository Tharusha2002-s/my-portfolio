"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { fetchPublicProjects, Project } from "@/utils/api";

export default function Projects() {
  const [projectList, setProjectList] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    fetchPublicProjects()
      .then((data) => {
        if (isMounted) {
          setProjectList(data || []);
        }
      })
      .catch((err) => {
        console.warn("Could not fetch remote projects:", err);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>(["All"]);
    projectList.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return Array.from(set);
  }, [projectList]);

  const filteredProjects = useMemo(() => {
    return projectList.filter((project) => {
      return (
        selectedCategory === "All" || project.category === selectedCategory
      );
    });
  }, [projectList, selectedCategory]);

  return (
    <section id="projects" className="py-16 sm:py-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-white border border-[#e5e5ea] rounded-full px-3 py-1 text-xs font-medium text-[#52525b] shadow-sm mb-3">
              <span>Featured Work</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#18181b]">
              Selected Projects
            </h2>
            <p className="text-sm text-[#71717a] mt-1 max-w-lg">
              Full-stack production platforms, enterprise ERP systems, and AI/ML computer vision applications.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-[#18181b] text-white shadow-sm"
                    : "bg-white border border-[#e5e5ea] text-[#52525b] hover:bg-[#f4f4f6]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="bg-white rounded-[28px] border border-[#e5e5ea] p-6 h-80 animate-pulse flex flex-col justify-between"
              >
                <div className="h-6 w-1/3 bg-gray-100 rounded" />
                <div className="h-4 w-3/4 bg-gray-100 rounded" />
                <div className="h-10 w-full bg-gray-100 rounded" />
              </div>
            ))}
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="bg-white rounded-[28px] border border-[#e5e5ea] p-12 text-center">
            <p className="text-[#71717a] text-sm">
              No projects found in this category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group bg-white rounded-[28px] sm:rounded-[32px] border border-[#e5e5ea] p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:border-[#d4d4d8] transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Category & Status */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-xs font-mono font-medium px-2.5 py-1 rounded-full bg-[#f4f4f6] text-[#52525b] border border-[#e5e5ea]">
                      {project.category || "Full-Stack"}
                    </span>
                    {project.featured && (
                      <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2.5 py-0.5 rounded-full">
                        ★ Featured
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-[#18181b] group-hover:text-black transition-colors">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[#71717a] mt-3 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Stack Chips */}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-5">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-[#f4f4f6] text-[#52525b]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Project Links */}
                <div className="flex items-center gap-3 pt-6 mt-6 border-t border-[#f4f4f6]">
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold bg-[#18181b] text-white hover:bg-black px-4 py-2 rounded-full transition-all"
                    >
                      <span>Live Demo</span>
                      <span>↗</span>
                    </a>
                  )}

                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-[#52525b] hover:text-[#18181b] bg-[#f4f4f6] hover:bg-[#e4e4e7] px-4 py-2 rounded-full transition-all"
                    >
                      <span>Source Code</span>
                      <span>↗</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}