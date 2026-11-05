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

  // Resolves the best preview image for each project
  const getProjectImage = (project: Project): string => {
    if (project.image && project.image.trim().length > 0) {
      return project.image;
    }
    const title = project.title.toLowerCase();
    if (title.includes("portfolio")) return "/projects/portfolio.svg";
    if (title.includes("titancore") || title.includes("construction")) return "/projects/titancore.svg";
    if (title.includes("roadaware") || title.includes("hazard") || title.includes("safety")) return "/projects/roadaware.svg";
    return "/projects/portfolio.svg";
  };

  return (
    <section id="projects" className="scroll-mt-20 sm:scroll-mt-24 py-16 sm:py-20 px-4 sm:px-6">
      <div className="max-w-6xl xl:max-w-7xl mx-auto">
        
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-[28px] border border-[#e5e5ea] p-6 h-96 animate-pulse flex flex-col justify-between"
              >
                <div className="aspect-[16/10] w-full bg-gray-100 rounded-2xl mb-4" />
                <div className="h-6 w-1/3 bg-gray-100 rounded mb-2" />
                <div className="h-4 w-3/4 bg-gray-100 rounded" />
                <div className="h-10 w-full bg-gray-100 rounded mt-4" />
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group bg-white rounded-[28px] sm:rounded-[32px] border border-[#e5e5ea] p-5 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.06)] hover:border-[#d4d4d8] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Visual Preview Image Card */}
                  <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden mb-5 bg-[#f4f4f6] border border-[#e5e5ea]/80 shadow-[inset_0_1px_3px_rgba(0,0,0,0.02)]">
                    <Image
                      src={getProjectImage(project)}
                      alt={project.title}
                      fill
                      className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    
                    {/* Subtle hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/[0.02] transition-colors pointer-events-none" />

                    {/* Floating Category Tag */}
                    <div className="absolute top-3 left-3">
                      <span className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#18181b] border border-[#e5e5ea] shadow-sm">
                        {project.category || "Full-Stack"}
                      </span>
                    </div>

                    {/* Floating Featured Badge */}
                    {project.featured && (
                      <div className="absolute top-3 right-3">
                        <span className="text-[10.5px] font-semibold text-emerald-700 bg-white/95 backdrop-blur-md border border-emerald-200/80 px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Featured
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-[#18181b] group-hover:text-black transition-colors">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[#71717a] mt-2.5 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tech Stack Chips */}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-[#f4f4f6] text-[#52525b] border border-[#e5e5ea]/50"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Project Action Links */}
                <div className="flex items-center gap-3 pt-5 mt-5 border-t border-[#f4f4f6]">
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold bg-[#18181b] text-white hover:bg-black px-4 py-2 rounded-full transition-all shadow-sm hover:scale-105 active:scale-95"
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
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-[#52525b] hover:text-[#18181b] bg-[#f4f4f6] hover:bg-[#e4e4e7] border border-[#e5e5ea]/60 px-4 py-2 rounded-full transition-all hover:scale-105 active:scale-95"
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
