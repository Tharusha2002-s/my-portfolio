import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#f4f4f6] px-6 text-center">
      <div className="relative z-10 max-w-md rounded-[32px] sm:rounded-[40px] border border-[#e5e5ea] bg-white p-8 sm:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.03)]">
        <span className="inline-block bg-[#f4f4f6] border border-[#e5e5ea] text-[11px] font-mono uppercase tracking-wider text-[#52525b] px-3 py-0.5 rounded-full">
          Error 404 // Not Found
        </span>

        <h1 className="mt-4 font-mono text-6xl font-bold tracking-tight text-[#18181b]">
          404
        </h1>

        <p className="mt-4 text-sm leading-relaxed text-[#71717a]">
          The page or endpoint you are looking for does not exist or has been relocated.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="rounded-full bg-[#18181b] hover:bg-black px-6 py-2.5 text-xs font-semibold text-white shadow-sm transition-all"
          >
            ← Return to Portfolio
          </Link>
          <Link
            href="/#contact"
            className="rounded-full border border-[#e5e5ea] bg-white hover:bg-gray-50 px-6 py-2.5 text-xs font-medium text-[#18181b] shadow-sm transition-all"
          >
            Contact
          </Link>
        </div>
      </div>
    </main>
  );
}
