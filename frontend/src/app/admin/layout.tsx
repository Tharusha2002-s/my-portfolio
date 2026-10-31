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
    return <div className="min-h-screen bg-[#f4f4f6] text-[#18181b]">{children}</div>;
  }

  // Loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f4f4f6] text-[#18181b] font-mono">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#18181b] border-t-transparent" />
          <span className="text-xs tracking-widest uppercase text-[#71717a]">Initializing Admin Console...</span>
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
    <div className="flex min-h-screen bg-[#f4f4f6] text-[#18181b]">
      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-[#e5e5ea] bg-white transition-transform duration-200 lg:static lg:translate-x-0 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo / Header with White TS Logo */}
        <div className="flex h-16 items-center justify-between border-b border-[#e5e5ea] px-6">
          <Link href="/admin" className="flex items-center gap-2.5 font-mono select-none">
            <LogoIcon size="sm" />
            <span className="text-sm font-bold tracking-wider text-[#18181b]">
              THARUSHA<span className="text-[#71717a] font-normal text-xs ml-1">/ADMIN</span>
            </span>
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="text-[#71717a] hover:text-[#18181b] lg:hidden"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        {/* Live Backend Connection Indicator */}
        <div className="border-b border-[#e5e5ea] bg-[#f9f9fb] px-6 py-2.5">
          <div className="flex items-center justify-between font-mono text-[11px]">
            <span className="text-[#71717a]">API Status:</span>
            <div className="flex items-center gap-1.5">
              <span
                className={`h-2 w-2 rounded-full ${
                  apiOnline === true
                    ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                    : apiOnline === false
                    ? "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]"
                    : "bg-amber-400"
                }`}
              />
              <span
                className={
                  apiOnline === true
                    ? "text-emerald-700 font-medium"
                    : apiOnline === false
                    ? "text-rose-600 font-medium"
                    : "text-amber-600 font-medium"
                }
              >
                {apiOnline === true ? "Online (5001)" : apiOnline === false ? "Offline" : "Checking..."}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 space-y-1 px-3 py-4">
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
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-xs transition-all ${
                  isActive
                    ? "bg-[#18181b] text-white shadow-sm font-semibold"
                    : "text-[#52525b] hover:bg-[#f4f4f6] hover:text-[#18181b]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-base">{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      isActive ? "bg-white text-[#18181b]" : "bg-emerald-50 text-emerald-800 border border-emerald-200"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer & User Profile */}
        <div className="border-t border-[#e5e5ea] p-4 bg-[#f9f9fb]">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white font-mono text-xs font-bold text-[#18181b] border border-[#e5e5ea] shadow-sm">
              {user?.name?.[0] || "T"}
            </div>
            <div className="overflow-hidden">
              <p className="truncate text-xs font-semibold text-[#18181b]">{user?.name || "Admin"}</p>
              <p className="truncate font-mono text-[10px] text-[#71717a]">{user?.role || "SUPER_ADMIN"}</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 border border-[#e5e5ea] bg-white py-2 rounded-xl font-mono text-[11px] text-[#52525b] transition-colors hover:border-[#18181b] hover:text-[#18181b] shadow-sm"
            >
              <span>← View Portfolio</span>
            </Link>
            <button
              type="button"
              onClick={logout}
              className="flex items-center justify-center gap-2 border border-rose-200 bg-rose-50 py-2 rounded-xl font-mono text-[11px] text-rose-700 transition-colors hover:bg-rose-100"
            >
              <span>🚪 Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-x-hidden">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[#e5e5ea] bg-white/90 px-4 sm:px-8 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#e5e5ea] bg-white text-base text-[#52525b] hover:text-[#18181b] hover:border-[#18181b] transition-colors lg:hidden shadow-sm"
              aria-label="Open sidebar"
            >
              ☰
            </button>
            <div className="flex items-center gap-2 font-mono text-xs text-[#71717a]">
              <span>portal</span>
              <span>/</span>
              <span className="text-[#18181b] font-semibold uppercase">
                {pathname.replace("/admin", "").replace("/", "") || "overview"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 border border-[#e5e5ea] bg-white px-3.5 py-1.5 rounded-full font-mono text-xs text-[#52525b] hover:border-[#18181b] hover:text-[#18181b] transition-colors shadow-sm"
            >
              <span>Live Site</span>
              <span>↗</span>
            </Link>
            <button
              type="button"
              onClick={logout}
              title="Logout"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e5e5ea] bg-white font-mono text-xs text-[#52525b] hover:text-rose-600 hover:border-rose-300 transition-colors shadow-sm"
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
