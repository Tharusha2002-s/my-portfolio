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
    <main className="min-h-screen bg-[#f4f4f6] py-24 sm:py-28 px-4 sm:px-6">
      <div className="mx-auto max-w-4xl">

        {/* Back Link */}
        <div className="mb-8 sm:mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-white border border-[#e5e5ea] rounded-full px-4 py-2 text-xs font-medium text-[#18181b] shadow-sm hover:bg-gray-50 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>

        {/* Page Header Container */}
        <div className="bg-white rounded-[32px] sm:rounded-[40px] border border-[#e5e5ea] p-8 sm:p-14 shadow-[0_8px_30px_rgb(0,0,0,0.03)] mb-8">
          <span className="inline-block bg-[#f4f4f6] border border-[#e5e5ea] text-[11px] font-mono uppercase tracking-wider text-[#52525b] px-3 py-0.5 rounded-full">
            Articles & Notes
          </span>
          <h1 className="mt-4 text-3xl sm:text-5xl font-bold tracking-tight text-[#18181b]">
            Engineering Blog
          </h1>
          <p className="mt-3 max-w-2xl text-sm sm:text-base text-[#71717a] leading-relaxed">
            Documenting my learnings, software engineering insights, and tutorials across web development, DevOps, and database architectures.
          </p>
        </div>

        {/* Articles List */}
        <div className="space-y-6">
          {articles.map((article) => (
            <article
              key={article.slug}
              className="bg-white rounded-[24px] sm:rounded-[32px] border border-[#e5e5ea] p-7 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-md hover:border-[#d4d4d8] transition-all"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-3 text-xs text-[#71717a]">
                  <span>{article.date}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>

                <span className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-2.5 py-0.5 rounded-full text-[11px] font-medium">
                  {article.status}
                </span>
              </div>

              <h2 className="mt-4 text-xl sm:text-2xl font-bold text-[#18181b] hover:text-black transition-colors">
                {article.title}
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-[#52525b]">
                {article.summary}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-[#f4f4f6] border border-[#e5e5ea] px-3 py-1 rounded-full text-xs font-mono text-[#52525b]"
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
