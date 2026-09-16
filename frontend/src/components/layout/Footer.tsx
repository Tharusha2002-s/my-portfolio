import Link from "next/link";

const footerLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#1e2d3d] bg-[#080c10]">
      <div className="mx-auto max-w-6xl px-6 py-10">

        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">

          {/* Logo / Copyright */}
          <div>
            <Link
              href="/"
              className="font-mono text-sm tracking-widest text-[#00c8ff]"
            >
              TS<span className="text-[#3d5166]">.dev</span>
            </Link>

            <p className="mt-3 text-xs text-[#5c6f7f]">
              © {new Date().getFullYear()} Tharusha Sangeeth. All rights reserved.
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap gap-x-6 gap-y-3">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-mono text-xs text-[#5c6f7f] transition-colors hover:text-[#00c8ff]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex gap-5">
            <a
              href="https://github.com/Tharusha20-s"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-[#5c6f7f] transition-colors hover:text-[#00c8ff]"
            >
              GitHub ↗
            </a>

            <a
              href="#"
              className="font-mono text-xs text-[#5c6f7f] transition-colors hover:text-[#00c8ff]"
            >
              LinkedIn ↗
            </a>
          </div>

        </div>

        {/* Bottom Technical Line */}
        <div className="mt-8 flex items-center gap-3 border-t border-[#1e2d3d] pt-6">
          <span className="h-1.5 w-1.5 rounded-full bg-[#00c8ff]" />

          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#3d5166]">
            Built with Next.js · TypeScript · Tailwind CSS
          </span>
        </div>

      </div>
    </footer>
  );
}