"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

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
        router.push("/#about");
        onClose();
      },
    },
    {
      id: "nav-projects",
      category: "Navigation",
      title: "Selected Projects",
      subtitle: "RoadAware, TitanCore, UnityHub",
      icon: "💼",
      action: () => {
        router.push("/#projects");
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
        router.push("/#skills");
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
        router.push("/#contact");
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
      className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-20 sm:pt-28 backdrop-blur-md bg-black/60 transition-opacity"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl overflow-hidden border border-[#1e2d3d] bg-[#0d1117] shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDownList}
      >
        {/* Input Bar */}
        <div className="flex items-center gap-3 border-b border-[#1e2d3d] px-4 py-3 sm:px-6">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-[#00c8ff]"
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
            placeholder="Type a command or search sections, actions, themes..."
            className="w-full bg-transparent font-mono text-sm text-[#e6edf3] outline-none placeholder:text-[#5c6f7f]"
          />

          <kbd className="hidden sm:inline-block border border-[#2a3a49] px-2 py-0.5 font-mono text-[10px] text-[#5c6f7f]">
            ESC
          </kbd>
        </div>

        {/* Status notification */}
        {copiedNotification && (
          <div className="bg-[#00c8ff]/10 border-b border-[#00c8ff]/30 px-4 py-2 font-mono text-xs text-[#00c8ff] text-center">
            ✓ {copiedNotification}
          </div>
        )}

        {/* Command List */}
        <div className="max-h-80 overflow-y-auto p-2">
          {filteredCommands.length === 0 ? (
            <div className="py-8 text-center font-mono text-xs text-[#5c6f7f]">
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
                  className={`flex cursor-pointer items-center justify-between px-4 py-3 font-mono transition-colors ${
                    isSelected
                      ? "bg-[#1e2d3d]/80 text-[#e6edf3]"
                      : "text-[#8899a6] hover:bg-[#1e2d3d]/40"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-base">{command.icon}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-sm ${
                            isSelected ? "text-[#00c8ff] font-semibold" : "text-[#e6edf3]"
                          }`}
                        >
                          {command.title}
                        </span>
                        <span className="text-[10px] uppercase tracking-wider text-[#5c6f7f]">
                          [{command.category}]
                        </span>
                      </div>
                      {command.subtitle && (
                        <p className="text-xs text-[#5c6f7f]">{command.subtitle}</p>
                      )}
                    </div>
                  </div>

                  {isSelected && (
                    <span className="text-xs text-[#00c8ff]">↵ Execute</span>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="flex flex-wrap items-center justify-between border-t border-[#1e2d3d] bg-[#080c10] px-4 py-2.5 font-mono text-[11px] text-[#5c6f7f]">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <span className="text-[#00c8ff]">TS.dev Command Bar</span>
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
