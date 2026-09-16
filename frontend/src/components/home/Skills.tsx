const skillGroups = [
  {
    number: "01",
    title: "Frontend",
    description: "Building responsive and interactive user interfaces.",
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
    description: "Developing APIs and server-side applications.",
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
    description: "Designing and working with relational databases.",
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
    description: "Learning deployment, containers, automation, and cloud infrastructure.",
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
  return (
    <section
      id="skills"
      className="relative border-t border-[#1e2d3d] bg-[#080c10] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">

        {/* Section Header */}
        <div className="mb-14 flex items-end justify-between">
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-[#00c8ff]">
              03 / Skills
            </p>

            <h2 className="text-4xl font-bold tracking-tight text-[#e6edf3] sm:text-5xl">
              Technologies
            </h2>
          </div>

          <span className="hidden font-mono text-xs text-[#3d5166] sm:block">
             tools of the trade
          </span>
        </div>

        {/* Skills Grid */}
        <div className="grid gap-5 md:grid-cols-2">
          {skillGroups.map((group) => (
            <div
              key={group.number}
              className="group border border-[#1e2d3d] bg-[#0d1117] p-7 transition-all duration-300 hover:border-[#00c8ff]/50"
            >
              {/* Header */}
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs text-[#00c8ff]">
                    {group.number}
                  </span>

                  <h3 className="text-xl font-semibold text-[#e6edf3] transition-colors group-hover:text-[#00c8ff]">
                    {group.title}
                  </h3>
                </div>

                <span className="font-mono text-lg text-[#1e2d3d] transition-colors group-hover:text-[#3d5166]">
                  {"</>"}
                </span>
              </div>

              {/* Description */}
              <p className="mb-6 text-sm leading-6 text-[#8899a6]">
                {group.description}
              </p>

              {/* Skills */}
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="border border-[#2a3a49] bg-[#080c10] px-3 py-2 font-mono text-xs text-[#8899a6] transition-all duration-200 hover:border-[#00c8ff]/50 hover:text-[#00c8ff]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Tech Line */}
        <div className="mt-8 border border-[#1e2d3d] bg-[#0d1117] px-6 py-5">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <span className="font-mono text-xs text-[#5c6f7f]">
              CURRENTLY LEARNING
            </span>

            <span className="font-mono text-xs text-[#00c8ff]">
              AWS
            </span>

            <span className="text-[#2a3a49]">/</span>

            <span className="font-mono text-xs text-[#00c8ff]">
              DevOps
            </span>

            <span className="text-[#2a3a49]">/</span>

            <span className="font-mono text-xs text-[#00c8ff]">
              Cloud Architecture
            </span>

            <span className="text-[#2a3a49]">/</span>

            <span className="font-mono text-xs text-[#00c8ff]">
              AI & ML
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}