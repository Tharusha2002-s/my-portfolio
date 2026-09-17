"use client";

import { useState } from "react";

const terminalFiles = {
  "about.ts": `const developer = {
  name: "Tharusha Sangeeth",
  role: "Software Engineer",
  education: "BSc (Hons) in Software Engineering",
  institution: "Sabaragamuwa University of Sri Lanka",
  location: "Sri Lanka",
  status: "Available for internships & full-time roles"
};

// Always learning. Always building.`,

  "stack.ts": `const techStack = {
  frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  backend: ["Node.js", "Express.js", "REST APIs", "Prisma"],
  database: ["PostgreSQL", "MySQL", "Prisma ORM"],
  devops: ["Docker", "Git", "GitHub Actions", "AWS Basics"],
  architecture: ["Clean Architecture", "Modular Design"]
};`,

  "connect.ts": `const contactDetails = {
  email: "tharushasangeeth034@gmail.com",
  github: "https://github.com/Tharusha20-s",
  linkedin: "https://linkedin.com/in/tharusha-sangeeth",
  availability: "Open to discussions, collaboration & projects"
};`
};

type TerminalFileName = keyof typeof terminalFiles;

export default function About() {
  const [activeTab, setActiveTab] = useState<TerminalFileName>("about.ts");
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(terminalFiles[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="about"
      className="relative border-t border-[#1e2d3d] bg-[#080c10] py-20 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">

        {/* Section Heading */}
        <div className="mb-12 sm:mb-14 flex items-end justify-between">
          <div>
            <p className="mb-2 sm:mb-3 font-mono text-xs uppercase tracking-[0.2em] text-[#00c8ff]">
              01 / About
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-[#e6edf3] sm:text-5xl">
              About Me
            </h2>
          </div>

          <span className="hidden font-mono text-xs text-[#3d5166] sm:block">
            who I am
          </span>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">

          {/* Left Side */}
          <div>
            <p className="text-lg sm:text-xl leading-8 text-[#c9d1d9]">
              I&#39;m a Software Engineering undergraduate passionate about
              building modern web applications and solving real-world
              problems through reliable engineering.
            </p>

            <p className="mt-5 sm:mt-6 leading-7 text-[#8899a6] text-sm sm:text-base">
              I enjoy working across the full development lifecycle — from
              designing user interfaces and developing APIs to working with
              databases, deployment, and cloud technologies.
            </p>

            <p className="mt-5 sm:mt-6 leading-7 text-[#8899a6] text-sm sm:text-base">
              My current focus is full-stack development with modern
              JavaScript and TypeScript technologies, while continuously
              expanding my knowledge in DevOps, cloud computing, and
              software architecture.
            </p>

            {/* Interactive Terminal Card */}
            <div className="mt-8 sm:mt-10 overflow-hidden rounded-lg border border-[#1e2d3d] bg-[#0d1117] shadow-xl">
              
              {/* Terminal Header with Tabs & Copy Button */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1e2d3d] px-4 py-2.5 bg-[#080c10]">
                <div className="flex items-center gap-1 sm:gap-2">
                  <div className="flex items-center gap-1.5 mr-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
                  </div>

                  {/* Tabs */}
                  <div className="flex items-center gap-1">
                    {(Object.keys(terminalFiles) as TerminalFileName[]).map((fileName) => (
                      <button
                        key={fileName}
                        type="button"
                        onClick={() => setActiveTab(fileName)}
                        className={`px-2.5 py-1 font-mono text-xs transition-colors rounded ${
                          activeTab === fileName
                            ? "bg-[#1e2d3d] text-[#00c8ff] font-medium"
                            : "text-[#5c6f7f] hover:text-[#e6edf3]"
                        }`}
                      >
                        {fileName}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Copy Button */}
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="flex items-center gap-1.5 font-mono text-[11px] text-[#5c6f7f] hover:text-[#00c8ff] transition-colors"
                  aria-label="Copy terminal snippet"
                >
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  <span>{copied ? "Copied!" : "Copy"}</span>
                </button>
              </div>

              {/* Terminal Content with Responsive Code Highlighting */}
              <div className="p-4 sm:p-5 font-mono text-xs sm:text-sm leading-6 sm:leading-7 overflow-x-auto text-[#b6e3ff]">
                <pre className="whitespace-pre">
                  <code>{terminalFiles[activeTab]}</code>
                </pre>
              </div>
            </div>
          </div>

          {/* Right Side Cards */}
          <div className="grid content-start gap-4 sm:grid-cols-2 lg:grid-cols-1">

            {/* Education */}
            <div className="group border border-[#1e2d3d] bg-[#0d1117] p-6 transition-all duration-300 hover:border-[#00c8ff]/60 hover:shadow-[0_0_20px_rgba(0,200,255,0.08)]">
              <div className="mb-4 sm:mb-5 flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-wider text-[#5c6f7f]">
                  Education
                </span>

                <span className="font-mono text-[#00c8ff] transition-transform group-hover:translate-x-0.5">
                  01
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-semibold text-[#e6edf3]">
                BSc (Hons) Software Engineering
              </h3>

              <p className="mt-2 text-sm text-[#8899a6]">
                Sabaragamuwa University of Sri Lanka
              </p>

              <p className="mt-4 font-mono text-xs text-[#5c6f7f]">
                Faculty of Computing • Undergraduate
              </p>
            </div>

            {/* Development */}
            <div className="group border border-[#1e2d3d] bg-[#0d1117] p-6 transition-all duration-300 hover:border-[#00c8ff]/60 hover:shadow-[0_0_20px_rgba(0,200,255,0.08)]">
              <div className="mb-4 sm:mb-5 flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-wider text-[#5c6f7f]">
                  Focus
                </span>

                <span className="font-mono text-[#00c8ff] transition-transform group-hover:translate-x-0.5">
                  02
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-semibold text-[#e6edf3]">
                Full-Stack & Cloud
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#8899a6]">
                Building high-performance frontend interfaces, robust REST APIs,
                database schemas, and containerized architectures.
              </p>
            </div>

            {/* Technologies */}
            <div className="group border border-[#1e2d3d] bg-[#0d1117] p-6 transition-all duration-300 hover:border-[#00c8ff]/60 hover:shadow-[0_0_20px_rgba(0,200,255,0.08)]">
              <div className="mb-4 sm:mb-5 flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-wider text-[#5c6f7f]">
                  Core Technologies
                </span>

                <span className="font-mono text-[#00c8ff] transition-transform group-hover:translate-x-0.5">
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
                    className="border border-[#2a3a49] px-2.5 py-1 font-mono text-xs text-[#8899a6] transition-colors hover:border-[#00c8ff]/40 hover:text-[#e6edf3]"
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