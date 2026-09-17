export default function About() {
  return (
    <section
      id="about"
      className="relative border-t border-[#1e2d3d] bg-[#080c10] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">

        {/* Section Heading */}
        <div className="mb-14 flex items-end justify-between">
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-[#00c8ff]">
              01 / About
            </p>

            <h2 className="text-4xl font-bold tracking-tight text-[#e6edf3] sm:text-5xl">
              About Me
            </h2>
          </div>

          <span className="hidden font-mono text-xs text-[#3d5166] sm:block">
            who I am
          </span>
        </div>

        {/* Main Content */}
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">

          {/* Left Side */}
          <div>
            <p className="text-xl leading-8 text-[#c9d1d9]">
              I&#39;m a Software Engineering undergraduate passionate about
              building modern web applications and solving real-world
              problems through technology.
            </p>

            <p className="mt-6 leading-7 text-[#8899a6]">
              I enjoy working across the full development lifecycle — from
              designing user interfaces and developing APIs to working with
              databases, deployment, and cloud technologies.
            </p>

            <p className="mt-6 leading-7 text-[#8899a6]">
              My current focus is full-stack development with modern
              JavaScript and TypeScript technologies, while continuously
              expanding my knowledge in DevOps, cloud computing, and
              software architecture.
            </p>

            {/* Terminal-style card */}
            <div className="mt-10 overflow-hidden rounded-lg border border-[#1e2d3d] bg-[#0d1117]">
              
              {/* Terminal Header */}
              <div className="flex items-center gap-2 border-b border-[#1e2d3d] px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[#3d5166]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#3d5166]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#3d5166]" />

                <span className="ml-3 font-mono text-xs text-[#5c6f7f]">
                  about.ts
                </span>
              </div>

              {/* Terminal Content */}
              <div className="p-5 font-mono text-sm leading-7">
                <p>
                  <span className="text-[#00c8ff]">const</span>{" "}
                  <span className="text-[#e6edf3]">developer</span>{" "}
                  = {"{"}
                </p>

                <p className="pl-5">
                  <span className="text-[#8899a6]">name:</span>{" "}
                  <span className="text-[#b6e3ff]">
                    Tharusha Sangeeth
                  </span>
                  ,
                </p>

                <p className="pl-5">
                  <span className="text-[#8899a6]">role:</span>{" "}
                  <span className="text-[#b6e3ff]">
                    Software Engineer
                  </span>
                  ,
                </p>

                <p className="pl-5">
                  <span className="text-[#8899a6]">focus:</span>{" "}
                  <span className="text-[#b6e3ff]">
                    Full-Stack Development
                  </span>
                  ,
                </p>

                <p className="pl-5">
                  <span className="text-[#8899a6]">location:</span>{" "}
                  <span className="text-[#b6e3ff]">
                    Sri Lanka
                  </span>
                </p>

                <p>
                  {"};"}
                </p>

                <p className="mt-2">
                  <span className="text-[#3d5166]">
                    Always learning. Always building.
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="grid content-start gap-4 sm:grid-cols-2 lg:grid-cols-1">

            {/* Education */}
            <div className="border border-[#1e2d3d] bg-[#0d1117] p-6 transition-colors duration-200 hover:border-[#00c8ff]/40">
              <div className="mb-5 flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-wider text-[#5c6f7f]">
                  Education
                </span>

                <span className="font-mono text-[#00c8ff]">
                  01
                </span>
              </div>

              <h3 className="text-lg font-semibold text-[#e6edf3]">
                BSc (Hons) Software Engineering
              </h3>

              <p className="mt-2 text-sm text-[#8899a6]">
                Sabaragamuwa University of Sri Lanka
              </p>

              <p className="mt-4 font-mono text-xs text-[#5c6f7f]">
                Faculty of Computing
              </p>
            </div>

            {/* Development */}
            <div className="border border-[#1e2d3d] bg-[#0d1117] p-6 transition-colors duration-200 hover:border-[#00c8ff]/40">
              <div className="mb-5 flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-wider text-[#5c6f7f]">
                  Development
                </span>

                <span className="font-mono text-[#00c8ff]">
                  02
                </span>
              </div>

              <h3 className="text-lg font-semibold text-[#e6edf3]">
                Full-Stack Development
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#8899a6]">
                Building responsive frontend interfaces, APIs,
                database systems, and complete web applications.
              </p>
            </div>

            {/* Technologies */}
            <div className="border border-[#1e2d3d] bg-[#0d1117] p-6 transition-colors duration-200 hover:border-[#00c8ff]/40">
              <div className="mb-5 flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-wider text-[#5c6f7f]">
                  Technologies
                </span>

                <span className="font-mono text-[#00c8ff]">
                  03
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {[
                  "Next.js",
                  "React",
                  "TypeScript",
                  "Node.js",
                  "PostgreSQL",
                  "MySQL",
                  "Docker",
                  "AWS",
                ].map((technology) => (
                  <span
                    key={technology}
                    className="border border-[#2a3a49] px-3 py-1.5 font-mono text-xs text-[#8899a6]"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}