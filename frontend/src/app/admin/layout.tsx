"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AdminAuthProvider, useAdminAuth } from "./AdminAuthContext";
import { checkServerHealth, fetchAdminMessages } from "@/utils/api";
import { LogoIcon } from "@/components/ui/Logo";

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const { user, logout, isAuthenticated, isLoading } = useAdminAuth();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [apiOnline, setApiOnline] = useState<boolean | null>(null);
  const [unreadCount, setUnreadCount] = useState<number>(0);

  const isLoginPage = pathname === "/admin/login";

  // Check backend server health periodically
  useEffect(() => {
    let isMounted = true;
    const check = async () => {
      const ok = await checkServerHealth();
      if (isMounted) setApiOnline(ok);
    };
    check();
    const interval = setInterval(check, 15000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  // Fetch unread count for badge if authenticated
  useEffect(() => {
    if (!isAuthenticated || isLoginPage) return;
    let isMounted = true;
    fetchAdminMessages()
      .then((res) => {
        if (isMounted) setUnreadCount(res.unreadCount);
      })
      .catch(() => {});

    const interval = setInterval(() => {
      fetchAdminMessages()
        .then((res) => {
          if (isMounted) setUnreadCount(res.unreadCount);
        })
        .catch(() => {});
    }, 20000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [isAuthenticated, isLoginPage]);

  // Close mobile sidebar on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  // If on login page, just render children directly without sidebar
  if (isLoginPage) {
    return <div className="min-h-screen bg-[#080c10] text-[#e6edf3]">{children}</div>;
  }

  // Loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#080c10] text-[#00c8ff] font-mono">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#00c8ff] border-t-transparent" />
          <span className="text-xs tracking-widest uppercase">Initializing Admin Terminal...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect via AuthContext
  }

  const navLinks = [
    { label: "Dashboard", href: "/admin", icon: "⚡" },
    { label: "Projects", href: "/admin/projects", icon: "📁" },
    {
      label: "Inquiries",
      href: "/admin/messages",
      icon: "📬",
      badge: unreadCount > 0 ? unreadCount : undefined,
    },
    { label: "Skills", href: "/admin/skills", icon: "🛠️" },
    { label: "Settings", href: "/admin/settings", icon: "⚙️" },
  ];

  return (
    <div className="flex min-h-screen bg-[#080c10] text-[#e6edf3]">
      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-[#1e2d3d] bg-[#0a0f14] transition-transform duration-200 lg:static lg:translate-x-0 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo / Header */}
        <div className="flex h-16 items-center justify-between border-b border-[#1e2d3d] px-6">
          <Link href="/admin" className="flex items-center gap-2.5 font-mono select-none">
            <LogoIcon size="sm" />
            <span className="text-sm font-bold tracking-wider text-[#e6edf3]">
              THARUSHA<span className="text-[#00c8ff]">/ADMIN</span>
            </span>
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="text-[#8899a6] hover:text-[#e6edf3] lg:hidden"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        {/* Live Backend Connection Indicator */}
        <div className="border-b border-[#1e2d3d] bg-[#0d1117] px-6 py-2.5">
          <div className="flex items-center justify-between font-mono text-[11px]">
            <span className="text-[#6c7d8f]">API Status:</span>
            <div className="flex items-center gap-1.5">
              <span
                className={`h-2 w-2 rounded-full ${
                  apiOnline === true
                    ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"
                    : apiOnline === false
                    ? "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]"
                    : "bg-amber-400"
                }`}
              />
              <span
                className={
                  apiOnline === true
                    ? "text-emerald-400"
                    : apiOnline === false
                    ? "text-rose-400"
                    : "text-amber-400"
                }
              >
                {apiOnline === true ? "Online (5001)" : apiOnline === false ? "Offline" : "Checking..."}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 space-y-1.5 px-3 py-4">
          {navLinks.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded font-mono text-xs transition-all ${
                  isActive
                    ? "bg-[#00c8ff]/10 text-[#00c8ff] border border-[#00c8ff]/30 font-semibold"
                    : "text-[#8899a6] hover:bg-[#161b22] hover:text-[#e6edf3]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-base">{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span className="rounded-full bg-[#00c8ff] px-2 py-0.5 text-[10px] font-bold text-[#080c10]">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer & User Profile */}
        <div className="border-t border-[#1e2d3d] p-4 bg-[#0d1117]">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1e2d3d] font-mono text-xs font-bold text-[#00c8ff] border border-[#2a3a49]">
              {user?.name?.[0] || "T"}
            </div>
            <div className="overflow-hidden">
              <p className="truncate text-xs font-semibold text-[#e6edf3]">{user?.name || "Admin"}</p>
              <p className="truncate font-mono text-[10px] text-[#5c6f7f]">{user?.role || "SUPER_ADMIN"}</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 border border-[#2a3a49] bg-[#080c10] py-1.5 font-mono text-[11px] text-[#8899a6] transition-colors hover:border-[#00c8ff] hover:text-[#00c8ff]"
            >
              <span>← View Portfolio</span>
            </Link>
            <button
              type="button"
              onClick={logout}
              className="flex items-center justify-center gap-2 border border-rose-950/40 bg-rose-950/20 py-1.5 font-mono text-[11px] text-rose-400 transition-colors hover:bg-rose-950/40 hover:text-rose-300"
            >
              <span>🚪 Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-x-hidden">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[#1e2d3d] bg-[#0a0f14]/90 px-4 sm:px-8 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded border border-[#2a3a49] text-base text-[#8899a6] hover:text-[#e6edf3] hover:border-[#00c8ff] transition-colors lg:hidden"
              aria-label="Open sidebar"
            >
              ☰
            </button>
            <div className="flex items-center gap-2 font-mono text-xs text-[#5c6f7f]">
              <span>portal</span>
              <span>/</span>
              <span className="text-[#00c8ff] uppercase">
                {pathname.replace("/admin", "").replace("/", "") || "overview"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 border border-[#2a3a49] bg-[#0d1117] px-3 py-1.5 font-mono text-xs text-[#8899a6] hover:border-[#00c8ff] hover:text-[#00c8ff] transition-colors"
            >
              <span>Live Site</span>
              <span>↗</span>
            </Link>
            <button
              type="button"
              onClick={logout}
              title="Logout"
              className="flex h-9 w-9 items-center justify-center border border-[#2a3a49] bg-[#0d1117] font-mono text-xs text-[#8899a6] hover:text-rose-400 hover:border-rose-900 transition-colors"
            >
              🚪
            </button>
          </div>
        </header>

        {/* Page Content Body */}
        <main className="flex-1 p-4 sm:p-8">{children}</main>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AdminAuthProvider>
  );
}
