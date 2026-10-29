"use client";

import Link from "next/link";

export default function About() {
  return (
    <section id="about" className="py-16 sm:py-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-[32px] sm:rounded-[44px] border border-[#e5e5ea] shadow-[0_8px_30px_rgb(0,0,0,0.03)] p-8 sm:p-14 md:p-16">
          
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10 lg:gap-14 items-center">
            
            {/* Left Column: Bio & Journey */}
            <div>
              <div className="inline-flex items-center gap-2 bg-[#f4f4f6] border border-[#e5e5ea] rounded-full px-3.5 py-1 text-xs font-medium text-[#52525b] shadow-sm mb-4">
                <span>About Me</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#18181b] leading-tight">
                Engineering reliable systems with curiosity and purpose.
              </h2>

              <div className="mt-6 space-y-4 text-sm sm:text-base text-[#71717a] leading-relaxed">
                <p>
                  I am a Software Engineering undergraduate at{" "}
                  <strong className="text-[#18181b] font-semibold">
                    Sabaragamuwa University of Sri Lanka
                  </strong>
                  . I specialize in building scalable web architectures with Next.js, TypeScript, and Docker, while actively diving deep into AI & Machine Learning with Python.
                </p>
                <p>
                  My engineering journey is driven by practical problem-solving—from developing industrial ERP systems like{" "}
                  <strong className="text-[#18181b] font-medium">TitanCore</strong> to building AI computer vision safety tools like{" "}
                  <strong className="text-[#18181b] font-medium">RoadAware</strong>.
                </p>
                <p>
                  When I&apos;m not coding, I&apos;m exploring cloud infrastructure, automated CI/CD workflows, and training neural models for computer vision and NLP tasks.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/resume"
                  className="inline-flex items-center gap-2 bg-[#18181b] hover:bg-black text-white text-xs sm:text-sm font-medium px-5 py-2.5 rounded-full shadow-sm transition-all"
                >
                  <span>View Resume</span>
                  <span>↗</span>
                </Link>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 bg-[#f4f4f6] hover:bg-[#e4e4e7] text-[#18181b] text-xs sm:text-sm font-medium px-5 py-2.5 rounded-full transition-all"
                >
                  <span>Get in Touch</span>
                </a>
              </div>
            </div>

            {/* Right Column: Key Details & Quick Highlights */}
            <div className="bg-[#f9f9fb] border border-[#e5e5ea] rounded-3xl p-6 sm:p-8 flex flex-col gap-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#a1a1aa]">
                  Current Status
                </span>
                <p className="text-sm font-semibold text-[#18181b] mt-1 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  Available for Internships & Projects
                </p>
              </div>

              <div className="border-t border-[#e5e5ea] pt-5">
                <span className="text-xs font-mono uppercase tracking-wider text-[#a1a1aa]">
                  Education
                </span>
                <p className="text-sm font-semibold text-[#18181b] mt-1">
                  BSc (Hons) in Software Engineering
                </p>
                <p className="text-xs text-[#71717a] mt-0.5">
                  Sabaragamuwa University of Sri Lanka
                </p>
              </div>

              <div className="border-t border-[#e5e5ea] pt-5">
                <span className="text-xs font-mono uppercase tracking-wider text-[#a1a1aa]">
                  Core Focus
                </span>
                <p className="text-sm font-semibold text-[#18181b] mt-1">
                  Full-Stack Architecture & AI/ML
                </p>
                <p className="text-xs text-[#71717a] mt-0.5">
                  Python, Next.js, PostgreSQL, Docker, PyTorch
                </p>
              </div>

              <div className="border-t border-[#e5e5ea] pt-5">
                <span className="text-xs font-mono uppercase tracking-wider text-[#a1a1aa]">
                  Location
                </span>
                <p className="text-sm font-semibold text-[#18181b] mt-1">
                  Sri Lanka (GMT+5:30)
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}