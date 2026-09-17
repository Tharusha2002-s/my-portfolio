import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CommandPalette from "@/components/ui/CommandPalette";
import ScrollToTop from "@/components/ui/ScrollToTop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Tharusha Sangeeth | Software Engineer & Full-Stack Developer",
    template: "%s | Tharusha Sangeeth",
  },
  description:
    "Personal portfolio of Tharusha Sangeeth — Software Engineering undergraduate, full-stack developer, and cloud enthusiast building scalable, modern web applications.",
  keywords: [
    "Tharusha Sangeeth",
    "Software Engineer",
    "Full-Stack Developer",
    "Next.js",
    "React",
    "TypeScript",
    "Sri Lanka",
    "Portfolio",
  ],
  authors: [{ name: "Tharusha Sangeeth" }],
  creator: "Tharusha Sangeeth",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tharusha.dev",
    title: "Tharusha Sangeeth | Software Engineer",
    description:
      "Full-stack developer building scalable web applications with clean architecture and modern UX.",
    siteName: "Tharusha Sangeeth Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tharusha Sangeeth | Software Engineer",
    description:
      "Software Engineering undergraduate and full-stack developer portfolio.",
    creator: "@Tharusha20-s",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" data-scroll-behavior="smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-[#080c10] text-[#e6edf3] font-sans antialiased min-h-screen selection:bg-[#00c8ff]/20 selection:text-[#00c8ff]`}
      >
        <Navbar />

        {children}

        <Footer />

        <CommandPalette />
        <ScrollToTop />
      </body>
    </html>
  );
}