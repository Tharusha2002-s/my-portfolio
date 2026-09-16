import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#080c10]">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-[0.08]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(#3d5166 1px, transparent 1px), linear-gradient(90deg, #3d5166 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Glow */}
      <div className="absolute top-1/4 right-0 h-72 w-72 rounded-full bg-[#00c8ff]/10 blur-[120px]" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl items-center px-6 pt-20">
        <div className="w-full">

          {/* Availability */}
          <div className="mb-8 flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00c8ff] opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#00c8ff]" />
            </span>

            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#8899a6]">
              Available for opportunities
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="max-w-4xl text-5xl font-bold leading-[0.95] tracking-tight text-[#e6edf3] sm:text-6xl md:text-7xl lg:text-8xl">
            THARUSHA
            <br />
            <span className="text-[#00c8ff]">SANGEETH</span>
          </h1>

          {/* Role */}
          <div className="mt-8 flex flex-wrap items-center gap-2 font-mono text-sm text-[#8899a6] sm:text-base">
            <span className="text-[#3d5166]">&gt;</span>
            <span>Software Engineer</span>
            <span className="text-[#3d5166]">/</span>
            <span>Full-Stack Developer</span>
            <span className="animate-pulse text-[#00c8ff]">▌</span>
          </div>

          {/* Description */}
          <p className="mt-8 max-w-2xl text-base leading-7 text-[#8899a6] sm:text-lg">
            I build modern, scalable web applications with a focus on
            clean architecture, great user experiences, and reliable
            engineering.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-wrap items-center gap-4">

            <a
              href="#projects"
              className="group inline-flex items-center gap-3 border border-[#00c8ff] bg-[#00c8ff] px-6 py-3 font-mono text-sm font-medium text-[#080c10] transition-all duration-200 hover:bg-transparent hover:text-[#00c8ff]"
            >
              View Projects
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-3 border border-[#2a3a49] px-6 py-3 font-mono text-sm font-medium text-[#e6edf3] transition-all duration-200 hover:border-[#00c8ff] hover:text-[#00c8ff]"
            >
              Get in Touch
            </a>

            <Link
              href="/resume"
              className="font-mono text-sm text-[#8899a6] underline-offset-4 transition-colors hover:text-[#00c8ff] hover:underline"
            >
              Resume ↗
            </Link>
          </div>

          {/* Statistics */}
          <div className="mt-20 grid max-w-2xl grid-cols-2 gap-y-8 border-t border-[#1e2d3d] pt-8 sm:grid-cols-4 sm:gap-0">

            <div>
              <div className="font-mono text-2xl font-bold text-[#e6edf3]">
                05+
              </div>
              <div className="mt-1 text-xs uppercase tracking-wider text-[#5c6f7f]">
                Projects
              </div>
            </div>

            <div>
              <div className="font-mono text-2xl font-bold text-[#e6edf3]">
                10+
              </div>
              <div className="mt-1 text-xs uppercase tracking-wider text-[#5c6f7f]">
                Technologies
              </div>
            </div>

            <div>
              <div className="font-mono text-2xl font-bold text-[#e6edf3]">
                03+
              </div>
              <div className="mt-1 text-xs uppercase tracking-wider text-[#5c6f7f]">
                Years Learning
              </div>
            </div>

            <div>
              <div className="font-mono text-2xl font-bold text-[#e6edf3]">
                ∞
              </div>
              <div className="mt-1 text-xs uppercase tracking-wider text-[#5c6f7f]">
                Curiosity
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#5c6f7f]">
          Scroll
        </span>

        <div className="h-10 w-px bg-gradient-to-b from-[#00c8ff] to-transparent" />
      </div>
    </section>
  );
}