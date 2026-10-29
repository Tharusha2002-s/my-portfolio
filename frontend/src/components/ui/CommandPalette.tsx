"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { smoothScrollTo } from "@/utils/smoothScroll";

interface CommandItem {
  id: string;
  category: "Navigation" | "Action" | "Theme Accent";
  title: string;
  subtitle?: string;
  icon: string;
  shortcut?: string;
  action: () => void;
}

function CommandPaletteModal({ onClose }: { onClose: () => void }) {
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedNotification, setCopiedNotification] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText("tharushasangeeth034@gmail.com");
    setCopiedNotification("Email copied to clipboard!");
    setTimeout(() => {
      setCopiedNotification("");
      onClose();
    }, 1200);
  };

  const setAccent = (color: string, glow: string) => {
    document.documentElement.style.setProperty("--accent", color);
    document.documentElement.style.setProperty("--accent-glow", glow);
    setCopiedNotification(`Accent changed to ${color}`);
    setTimeout(() => {
      setCopiedNotification("");
      onClose();
    }, 800);
  };

  const commands: CommandItem[] = [
    // Navigation
    {
      id: "nav-about",
      category: "Navigation",
      title: "About Me",
      subtitle: "Background, education, and terminal info",
      icon: "👤",
      action: () => {
        if (window.location.pathname === "/") {
          smoothScrollTo("about", 70);
        } else {
          router.push("/#about");
        }
        onClose();
      },
    },
    {
      id: "nav-projects",
      category: "Navigation",
      title: "Selected Projects",
      subtitle: "Explore portfolio works and case studies",
      icon: "💼",
      action: () => {
        if (window.location.pathname === "/") {
          smoothScrollTo("projects", 70);
        } else {
          router.push("/#projects");
        }
        onClose();
      },
    },
    {
      id: "nav-skills",
      category: "Navigation",
      title: "Technologies & Skills",
      subtitle: "Frontend, Backend, Database, Cloud",
      icon: "⚡",
      action: () => {
        if (window.location.pathname === "/") {
          smoothScrollTo("skills", 70);
        } else {
          router.push("/#skills");
        }
        onClose();
      },
    },
    {
      id: "nav-contact",
      category: "Navigation",
      title: "Contact Form",
      subtitle: "Send a message or inquiry",
      icon: "✉️",
      action: () => {
        if (window.location.pathname === "/") {
          smoothScrollTo("contact", 70);
        } else {
          router.push("/#contact");
        }
        onClose();
      },
    },
    {
      id: "nav-resume",
      category: "Navigation",
      title: "Curriculum Vitae / Resume",
      subtitle: "Full education, experience, and print version",
      icon: "📄",
      action: () => {
        router.push("/resume");
        onClose();
      },
    },
    {
      id: "nav-blog",
      category: "Navigation",
      title: "Engineering Blog",
      subtitle: "Technical tutorials and engineering notes",
      icon: "📝",
      action: () => {
        router.push("/blog");
        onClose();
      },
    },
    {
      id: "nav-admin",
      category: "Navigation",
      title: "Admin Dashboard",
      subtitle: "Manage projects, inquiries, and site metrics",
      icon: "⚙️",
      action: () => {
        router.push("/admin");
        onClose();
      },
    },

    // Actions
    {
      id: "act-copy-email",
      category: "Action",
      title: "Copy Email Address",
      subtitle: "tharushasangeeth034@gmail.com",
      icon: "📋",
      shortcut: "Copy",
      action: copyEmail,
    },
    {
      id: "act-github",
      category: "Action",
      title: "Open GitHub Profile",
      subtitle: "github.com/Tharusha20-s",
      icon: "🐙",
      action: () => {
        window.open("https://github.com/Tharusha20-s", "_blank");
        onClose();
      },
    },
    {
      id: "act-linkedin",
      category: "Action",
      title: "Open LinkedIn Profile",
      subtitle: "linkedin.com/in/tharusha-sangeeth",
      icon: "🔗",
      action: () => {
        window.open("https://www.linkedin.com/in/tharusha-sangeeth", "_blank");
        onClose();
      },
    },

    // Themes
    {
      id: "theme-cyan",
      category: "Theme Accent",
      title: "Cyan Accent (Default)",
      subtitle: "#00c8ff Neon Blue",
      icon: "💎",
      action: () => setAccent("#00c8ff", "rgba(0, 200, 255, 0.15)"),
    },
    {
      id: "theme-emerald",
      category: "Theme Accent",
      title: "Emerald Accent",
      subtitle: "#10b981 Terminal Green",
      icon: "🟢",
      action: () => setAccent("#10b981", "rgba(16, 185, 129, 0.15)"),
    },
    {
      id: "theme-violet",
      category: "Theme Accent",
      title: "Violet Accent",
      subtitle: "#a855f7 Cyberpunk Purple",
      icon: "🟣",
      action: () => setAccent("#a855f7", "rgba(168, 85, 247, 0.15)"),
    },
    {
      id: "theme-amber",
      category: "Theme Accent",
      title: "Amber Accent",
      subtitle: "#f59e0b Retro Amber",
      icon: "🟠",
      action: () => setAccent("#f59e0b", "rgba(245, 158, 11, 0.15)"),
    },
  ];

  const filteredCommands = commands.filter((c) => {
    const query = search.toLowerCase().trim();
    return (
      c.title.toLowerCase().includes(query) ||
      c.category.toLowerCase().includes(query) ||
      (c.subtitle && c.subtitle.toLowerCase().includes(query))
    );
  });

  const handleKeyDownList = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filteredCommands.length || 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev === 0 ? filteredCommands.length - 1 : prev - 1
      );
    } else if (e.key === "Enter" && filteredCommands[selectedIndex]) {
      e.preventDefault();
      filteredCommands[selectedIndex].action();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
      className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-20 sm:pt-28 backdrop-blur-md bg-black/30 transition-opacity"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl overflow-hidden rounded-2xl border border-[#e5e5ea] bg-white shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDownList}
      >
        {/* Input Bar */}
        <div className="flex items-center gap-3 border-b border-[#e5e5ea] px-4 py-3 sm:px-6">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-[#18181b]"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>

          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command or search sections, actions..."
            className="w-full bg-transparent font-sans text-sm text-[#18181b] outline-none placeholder:text-[#a1a1aa]"
          />

          <kbd className="hidden sm:inline-block border border-gray-200 bg-gray-50 px-2 py-0.5 rounded text-[10px] text-gray-500">
            ESC
          </kbd>
        </div>

        {/* Status notification */}
        {copiedNotification && (
          <div className="bg-emerald-50 border-b border-emerald-200 px-4 py-2 text-xs text-emerald-800 text-center font-medium">
            ✓ {copiedNotification}
          </div>
        )}

        {/* Command List */}
        <div className="max-h-80 overflow-y-auto p-2">
          {filteredCommands.length === 0 ? (
            <div className="py-8 text-center text-xs text-[#71717a]">
              No commands found for &quot;{search}&quot;
            </div>
          ) : (
            filteredCommands.map((command, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={command.id}
                  onClick={command.action}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex cursor-pointer items-center justify-between px-4 py-3 rounded-xl transition-colors ${
                    isSelected
                      ? "bg-gray-100 text-[#18181b]"
                      : "text-[#52525b] hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-base">{command.icon}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-sm font-medium ${
                            isSelected ? "text-[#18181b] font-semibold" : "text-[#27272a]"
                          }`}
                        >
                          {command.title}
                        </span>
                        <span className="text-[10px] uppercase tracking-wider text-gray-400">
                          [{command.category}]
                        </span>
                      </div>
                      {command.subtitle && (
                        <p className="text-xs text-[#71717a]">{command.subtitle}</p>
                      )}
                    </div>
                  </div>

                  {isSelected && (
                    <span className="text-xs text-[#18181b] font-medium">↵ Open</span>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="flex flex-wrap items-center justify-between border-t border-[#e5e5ea] bg-gray-50 px-4 py-2.5 text-[11px] text-[#71717a]">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <span className="text-[#18181b] font-medium">Command Bar</span>
        </div>
      </div>
    </div>
  );
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    const handleCustomOpen = () => {
      setIsOpen(true);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-command-palette", handleCustomOpen);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-command-palette", handleCustomOpen);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return <CommandPaletteModal onClose={() => setIsOpen(false)} />;
}
