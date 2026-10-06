import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#080c10] px-6 text-center">
      {/* Background Cyber Grid */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#1e2d3d_1px,transparent_1px)] [background-size:24px_24px] opacity-25" />

      <div className="relative z-10 max-w-md border border-[#1e2d3d] bg-[#0d1117] p-8 sm:p-12 shadow-2xl">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#00c8ff]">
          ERROR 404 // RESOURCE NOT FOUND
        </span>

        <h1 className="mt-4 font-mono text-6xl font-bold tracking-tight text-[#e6edf3]">
          404
        </h1>

        <p className="mt-4 text-sm leading-6 text-[#8899a6]">
          The coordinates you entered do not correspond to any active page, project, or endpoint in this sector.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="border border-[#00c8ff] bg-[#00c8ff] px-5 py-2.5 font-mono text-xs font-bold text-[#080c10] transition-colors hover:bg-transparent hover:text-[#00c8ff]"
          >
            ← Return to Portfolio
          </Link>
          <Link
            href="/#contact"
            className="border border-[#2a3a49] bg-[#080c10] px-5 py-2.5 font-mono text-xs text-[#8899a6] transition-colors hover:border-[#00c8ff] hover:text-[#e6edf3]"
          >
            Report Issue
          </Link>
        </div>
      </div>
    </main>
  );
}
