const projects = [
  {
    number: "01",
    title: "RoadAware",
    description:
      "A community-driven geospatial platform for reporting, tracking, and resolving road hazards across Sri Lanka.",
    technologies: ["Next.js", "React", "Node.js", "MySQL", "Leaflet"],
    category: "Full-Stack",
    github: "#",
    demo: "#",
  },
  {
    number: "02",
    title: "TitanCore",
    description:
      "A modern construction management platform for managing projects, workers, materials, budgets, tasks, and progress.",
    technologies: ["Next.js", "Node.js", "MySQL", "Cloudinary", "Docker"],
    category: "Web Application",
    github: "#",
    demo: "#",
  },
  {
    number: "03",
    title: "UnityHub",
    description:
      "A community and event platform designed to connect people through sports, music, university, and other events.",
    technologies: ["Next.js", "React", "PostgreSQL", "JWT"],
    category: "Full-Stack",
    github: "#",
    demo: "#",
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative border-t border-[#1e2d3d] bg-[#0a0f14] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">

        {/* Section Header */}
        <div className="mb-14 flex items-end justify-between">
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-[#00c8ff]">
              02 / Projects
            </p>

            <h2 className="text-4xl font-bold tracking-tight text-[#e6edf3] sm:text-5xl">
              Selected Work
            </h2>
          </div>

          <span className="hidden font-mono text-xs text-[#3d5166] sm:block">
            / things I built
          </span>
        </div>

        {/* Project List */}
        <div className="space-y-6">
          {projects.map((project) => (
            <article
              key={project.number}
              className="group relative overflow-hidden border border-[#1e2d3d] bg-[#0d1117] transition-all duration-300 hover:border-[#00c8ff]/50"
            >
              {/* Hover Glow */}
              <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[#00c8ff]/5 blur-3xl transition-opacity duration-300 group-hover:bg-[#00c8ff]/10" />

             <div className="grid lg:grid-cols-[100px_1fr_auto]">

                {/* Number */}
                <div className="hidden border-r border-[#1e2d3d] p-8 lg:block">
                  <span className="font-mono text-sm text-[#00c8ff]">
                    {project.number}
                  </span>
                </div>

                {/* Main Content */}
                <div className="p-7 sm:p-8">

                  <div className="mb-4 flex flex-wrap items-center gap-3">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#5c6f7f]">
                      {project.category}
                    </span>

                    <span className="h-px w-8 bg-[#2a3a49]" />

                    <span className="font-mono text-[10px] text-[#3d5166]">
                      {project.number}
                    </span>
                  </div>

                  <h3 className="text-2xl font-semibold text-[#e6edf3] transition-colors duration-200 group-hover:text-[#00c8ff]">
                    {project.title}
                  </h3>

                  <p className="mt-4 max-w-2xl text-sm leading-7 text-[#8899a6]">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.technologies.map((technology) => (
                      <span
                        key={technology}
                        className="border border-[#2a3a49] px-2.5 py-1 font-mono text-[10px] text-[#6f8291]"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="flex items-end gap-5 border-t border-[#1e2d3d] p-7 lg:flex-col lg:items-end lg:justify-center lg:border-l lg:border-t-0 lg:p-8">

                  <a
                    href={project.github}
                    className="font-mono text-xs text-[#8899a6] transition-colors hover:text-[#00c8ff]"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub ↗
                  </a>

                  <a
                    href={project.demo}
                    className="font-mono text-xs text-[#8899a6] transition-colors hover:text-[#00c8ff]"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live Demo ↗
                  </a>

                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View More */}
        <div className="mt-10 text-center">
          <a
            href="https://github.com/Tharusha20-s"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 border border-[#2a3a49] px-6 py-3 font-mono text-xs text-[#8899a6] transition-all duration-200 hover:border-[#00c8ff] hover:text-[#00c8ff]"
          >
            View More on GitHub
            <span>→</span>
          </a>
        </div>

      </div>
    </section>
  );
}