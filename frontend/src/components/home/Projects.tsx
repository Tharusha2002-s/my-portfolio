"use client";

import { useState, useMemo } from "react";

const projects = [
  {
    number: "01",
    title: "RoadAware",
    description:
      "A community-driven geospatial platform for reporting, tracking, and resolving road hazards across Sri Lanka.",
    technologies: ["React", "Node.js", "MySQL", "Leaflet"],
    category: "Full-Stack",
    github: "https://github.com/Pathum-Piyumal/RoadAware",
    demo: "https://road-aware.vercel.app/",
  },
  {
    number: "02",
    title: "TitanCore",
    description:
      "A modern construction management platform for managing projects, workers, materials, budgets, tasks, and progress.",
    technologies: ["Next.js", "Node.js", "MySQL", "Cloudinary", "Docker"],
    category: "Web Application",
    github: "https://github.com/Tharusha2002-s/TitanCore",
    demo: "https://titancoreconstruct.netlify.app/",
  },
  {
    number: "03",
    title: "Mern",
    description:
      "A community and event platform designed to connect people through sports, music, university, and other events.",
    technologies: ["Mongodb", "React", "Next js", "Express js"],
    category: "Full-Stack",
    github: "https://github.com/Tharusha2002-s/Mern-Project",
  },
];

const categories = ["All", "Full-Stack", "Web Application"];

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchCategory =
        selectedCategory === "All" || project.category === selectedCategory;
      const matchTech =
        !selectedTech || project.technologies.includes(selectedTech);
      return matchCategory && matchTech;
    });
  }, [selectedCategory, selectedTech]);

  return (
    <section
      id="projects"
      className="relative border-t border-[#1e2d3d] bg-[#0a0f14] py-20 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">

        {/* Section Header */}
        <div className="mb-10 sm:mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 sm:mb-3 font-mono text-xs uppercase tracking-[0.2em] text-[#00c8ff]">
              02 / Projects
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-[#e6edf3] sm:text-5xl">
              Selected Work
            </h2>
          </div>

          <span className="font-mono text-xs text-[#5c6f7f]">
            Showing {filteredProjects.length} of {projects.length} projects
          </span>
        </div>

        {/* Interactive Filter Pills */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`border px-3.5 py-1.5 font-mono text-xs transition-all ${selectedCategory === category
                  ? "border-[#00c8ff] bg-[#00c8ff]/10 text-[#00c8ff]"
                  : "border-[#2a3a49] bg-[#0d1117] text-[#8899a6] hover:border-[#3d5166] hover:text-[#e6edf3]"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Active Tech Filter indicator */}
          {selectedTech && (
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="text-[#5c6f7f]">Filtered by:</span>
              <span className="border border-[#00c8ff] bg-[#00c8ff]/10 px-2 py-0.5 text-[#00c8ff]">
                #{selectedTech}
              </span>
              <button
                type="button"
                onClick={() => setSelectedTech(null)}
                className="text-xs text-[#8899a6] underline hover:text-[#e6edf3]"
              >
                Clear
              </button>
            </div>
          )}
        </div>

        {/* Projects List */}
        {filteredProjects.length === 0 ? (
          <div className="border border-[#1e2d3d] bg-[#0d1117] p-12 text-center font-mono">
            <p className="text-[#8899a6] text-sm">
              No projects match the selected filter criteria.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("All");
                setSelectedTech(null);
              }}
              className="mt-4 border border-[#00c8ff] px-4 py-2 text-xs text-[#00c8ff] hover:bg-[#00c8ff] hover:text-[#080c10] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredProjects.map((project) => (
              <article
                key={project.number}
                className="group relative overflow-hidden border border-[#1e2d3d] bg-[#0d1117] transition-all duration-300 hover:border-[#00c8ff]/60 hover:shadow-[0_0_30px_rgba(0,200,255,0.06)]"
              >
                {/* Hover Glow */}
                <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#00c8ff]/5 blur-3xl transition-opacity duration-300 group-hover:bg-[#00c8ff]/10" />

                <div className="grid lg:grid-cols-[100px_1fr_auto]">

                  {/* Number - visible on desktop */}
                  <div className="hidden border-r border-[#1e2d3d] p-8 lg:flex items-center justify-center">
                    <span className="font-mono text-sm text-[#00c8ff]">
                      {project.number}
                    </span>
                  </div>

                  {/* Main Content */}
                  <div className="p-6 sm:p-8">

                    <div className="mb-4 flex flex-wrap items-center gap-3">
                      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#00c8ff]">
                        {project.category}
                      </span>

                      <span className="h-px w-8 bg-[#2a3a49]" />

                      <span className="font-mono text-[11px] text-[#5c6f7f]">
                        PROJ-{project.number}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-semibold text-[#e6edf3] transition-colors duration-200 group-hover:text-[#00c8ff]">
                      {project.title}
                    </h3>

                    <p className="mt-3 max-w-2xl text-sm sm:text-base leading-7 text-[#8899a6]">
                      {project.description}
                    </p>

                    {/* Interactive Technologies Chips */}
                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.technologies.map((technology) => (
                        <button
                          key={technology}
                          type="button"
                          onClick={() =>
                            setSelectedTech(
                              selectedTech === technology ? null : technology
                            )
                          }
                          title={`Click to filter by ${technology}`}
                          className={`border px-2.5 py-1 font-mono text-xs transition-all ${selectedTech === technology
                            ? "border-[#00c8ff] bg-[#00c8ff]/20 text-[#00c8ff]"
                            : "border-[#2a3a49] bg-[#080c10] text-[#6f8291] hover:border-[#00c8ff]/50 hover:text-[#e6edf3]"
                            }`}
                        >
                          #{technology}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-4 sm:gap-6 border-t border-[#1e2d3d] p-6 lg:flex-col lg:items-end lg:justify-center lg:border-l lg:border-t-0 lg:p-8 bg-[#0a0f14]/50">

                    <a
                      href={project.github}
                      className="inline-flex items-center gap-1.5 font-mono text-xs text-[#8899a6] transition-colors hover:text-[#00c8ff]"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>GitHub</span>
                      <span>↗</span>
                    </a>

                    <a
                      href={project.demo}
                      className="inline-flex items-center gap-1.5 font-mono text-xs text-[#8899a6] transition-colors hover:text-[#00c8ff]"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>Live Demo</span>
                      <span>↗</span>
                    </a>

                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* View More on GitHub CTA */}
        <div className="mt-10 sm:mt-12 text-center">
          <a
            href="https://github.com/repos"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center gap-3 border border-[#2a3a49] bg-[#0d1117] px-6 py-3 font-mono text-xs text-[#8899a6] transition-all duration-200 hover:border-[#00c8ff] hover:text-[#00c8ff]"
          >
            <span>View More Repositories on GitHub</span>
            <span>→</span>
          </a>
        </div>

      </div>
    </section>
  );
}