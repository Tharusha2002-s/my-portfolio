import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog & Notes | Tharusha Sangeeth",
  description: "Technical writings, engineering thoughts, and tutorials by Tharusha Sangeeth.",
};

const articles = [
  {
    slug: "building-scalable-fullstack-apps-with-nextjs",
    title: "Architecting Full-Stack Applications with Next.js App Router",
    summary:
      "A deep dive into server components, server actions, route handlers, and state management patterns for enterprise applications.",
    date: "September 2026",
    readTime: "6 min read",
    tags: ["Next.js", "Architecture", "Full-Stack"],
    status: "Upcoming",
  },
  {
    slug: "geospatial-mapping-leaflet-react",
    title: "Building Interactive Geospatial Hazard Trackers with Leaflet & React",
    summary:
      "Lessons learned from engineering RoadAware: handling real-time coordinates, geofencing, and map performance optimizations.",
    date: "August 2026",
    readTime: "8 min read",
    tags: ["React", "Leaflet", "GIS"],
    status: "Upcoming",
  },
  {
    slug: "docker-devops-for-undergrads",
    title: "Practical Docker & Containerization for Software Engineering Students",
    summary:
      "How to set up reproducible multi-container developer environments with Docker Compose, PostgreSQL, and Node.js.",
    date: "July 2026",
    readTime: "5 min read",
    tags: ["DevOps", "Docker", "Containers"],
    status: "Upcoming",
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#080c10] py-24 sm:py-28 px-4 sm:px-6">
      <div className="mx-auto max-w-4xl">

        {/* Back Link */}
        <div className="mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs text-[#8899a6] transition-colors hover:text-[#00c8ff]"
          >
            ← Back to Home
          </Link>
        </div>

        {/* Page Header */}
        <div className="mb-14">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#00c8ff]">
            Articles & Notes
          </span>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#e6edf3] sm:text-5xl">
            Engineering Blog
          </h1>
          <p className="mt-4 max-w-2xl text-base text-[#8899a6]">
            Documenting my learnings, software engineering insights, and tutorials across web development, DevOps, and database architectures.
          </p>
        </div>

        {/* Articles List */}
        <div className="space-y-6">
          {articles.map((article) => (
            <article
              key={article.slug}
              className="border border-[#1e2d3d] bg-[#0d1117] p-7 transition-all duration-300 hover:border-[#00c8ff]/50"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-3 font-mono text-xs text-[#5c6f7f]">
                  <span>{article.date}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>

                <span className="border border-[#00c8ff]/30 bg-[#00c8ff]/10 px-2 py-0.5 font-mono text-[10px] text-[#00c8ff]">
                  {article.status}
                </span>
              </div>

              <h2 className="mt-3 text-xl font-semibold text-[#e6edf3] hover:text-[#00c8ff] transition-colors">
                {article.title}
              </h2>

              <p className="mt-3 text-sm leading-6 text-[#8899a6]">
                {article.summary}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-[#2a3a49] px-2.5 py-1 font-mono text-[10px] text-[#6f8291]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

      </div>
    </main>
  );
}
