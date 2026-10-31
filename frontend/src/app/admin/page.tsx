"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  fetchDashboardMetrics,
  DashboardStats,
  ContactMessage,
  updateMessageRecord,
  updateProjectRecord,
} from "@/utils/api";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  const loadData = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    try {
      const data = await fetchDashboardMetrics();
      setStats(data);
    } catch (err) {
      console.error("Failed to load dashboard metrics:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleToggleFeatured = async (projectId: string, currentFeatured: boolean) => {
    try {
      await updateProjectRecord(projectId, { featured: !currentFeatured });
      // Update local state smoothly
      if (stats) {
        setStats({
          ...stats,
          recentProjects: stats.recentProjects.map((p) =>
            p.id === projectId ? { ...p, featured: !currentFeatured } : p
          ),
          projects: {
            ...stats.projects,
            featured: currentFeatured
              ? stats.projects.featured - 1
              : stats.projects.featured + 1,
          },
        });
      }
    } catch (err) {
      console.error("Failed to toggle featured status:", err);
    }
  };

  const handleQuickMarkRead = async (message: ContactMessage) => {
    try {
      const updated = await updateMessageRecord(message.id, "READ");
      if (stats) {
        setStats({
          ...stats,
          recentMessages: stats.recentMessages.map((m) =>
            m.id === message.id ? updated : m
          ),
          messages: {
            ...stats.messages,
            unread: Math.max(0, stats.messages.unread - 1),
          },
        });
      }
      setSelectedMessage(null);
    } catch (err) {
      console.error("Failed to mark message as read:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center font-mono text-sm text-[#18181b]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-7 w-7 animate-spin rounded-full border-2 border-[#18181b] border-t-transparent" />
          <span className="text-[#71717a]">Loading telemetry & metrics...</span>
        </div>
      </div>
    );
  }

  const formatUptime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return `${hrs}h ${mins}m`;
  };

  return (
    <div className="space-y-8">
      {/* Header section */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#e5e5ea] pb-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#71717a]">
            Control Center
          </span>
          <h1 className="mt-1 text-2xl sm:text-3xl font-bold text-[#18181b]">
            System Telemetry & Overview
          </h1>
          <p className="mt-1 text-xs text-[#71717a]">
            Real-time status of portfolio projects, visitor inquiries, and server health.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => loadData(true)}
            disabled={refreshing}
            className="flex items-center gap-2 rounded-xl border border-[#e5e5ea] bg-white px-3.5 py-2 font-mono text-xs text-[#18181b] hover:bg-[#f4f4f6] transition-all disabled:opacity-50 cursor-pointer shadow-sm"
          >
            <span className={refreshing ? "animate-spin" : ""}>🔄</span>
            <span>{refreshing ? "Refreshing..." : "Sync Telemetry"}</span>
          </button>

          <Link
            href="/admin/projects"
            className="flex items-center gap-2 rounded-xl bg-[#18181b] px-4 py-2 font-mono text-xs font-bold text-white hover:bg-black transition-colors shadow-sm"
          >
            <span>+ New Project</span>
          </Link>
        </div>
      </div>

      {/* KPI Metrics Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Projects KPI */}
        <div className="rounded-2xl border border-[#e5e5ea] bg-white p-5 shadow-sm transition-all hover:border-[#d4d4d8]">
          <div className="flex items-center justify-between text-[#71717a]">
            <span className="font-mono text-xs uppercase tracking-wider">Projects</span>
            <span className="text-lg">📁</span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-[#18181b]">
              {stats?.projects.total || 0}
            </span>
            <span className="font-mono text-xs text-[#a1a1aa]">total</span>
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-[#f0f0f2] pt-2 font-mono text-[11px]">
            <span className="text-[#71717a]">Featured on Site:</span>
            <span className="text-[#18181b] font-bold">{stats?.projects.featured || 0}</span>
          </div>
        </div>

        {/* Inquiries KPI */}
        <div className="rounded-2xl border border-[#e5e5ea] bg-white p-5 shadow-sm transition-all hover:border-[#d4d4d8]">
          <div className="flex items-center justify-between text-[#71717a]">
            <span className="font-mono text-xs uppercase tracking-wider">Inquiries</span>
            <span className="text-lg">📬</span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-[#18181b]">
              {stats?.messages.total || 0}
            </span>
            <span className="font-mono text-xs text-[#a1a1aa]">messages</span>
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-[#f0f0f2] pt-2 font-mono text-[11px]">
            <span className="text-[#71717a]">Unread Messages:</span>
            <span
              className={`rounded-md px-2 py-0.5 font-bold ${
                (stats?.messages.unread || 0) > 0
                  ? "bg-amber-50 text-amber-800 border border-amber-200"
                  : "bg-emerald-50 text-emerald-800 border border-emerald-200"
              }`}
            >
              {stats?.messages.unread || 0} Unread
            </span>
          </div>
        </div>

        {/* Skills KPI */}
        <div className="rounded-2xl border border-[#e5e5ea] bg-white p-5 shadow-sm transition-all hover:border-[#d4d4d8]">
          <div className="flex items-center justify-between text-[#71717a]">
            <span className="font-mono text-xs uppercase tracking-wider">Tech Stack</span>
            <span className="text-lg">⚡</span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-[#18181b]">
              {stats?.skills.total || 0}
            </span>
            <span className="font-mono text-xs text-[#a1a1aa]">technologies</span>
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-[#f0f0f2] pt-2 font-mono text-[11px]">
            <span className="text-[#71717a]">Categories:</span>
            <span className="text-[#18181b] font-medium">Frontend, Backend, DB, DevOps</span>
          </div>
        </div>

        {/* System & DB Health KPI */}
        <div className="rounded-2xl border border-[#e5e5ea] bg-white p-5 shadow-sm transition-all hover:border-[#d4d4d8]">
          <div className="flex items-center justify-between text-[#71717a]">
            <span className="font-mono text-xs uppercase tracking-wider">Engine Status</span>
            <span className="text-lg">🩺</span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-xl font-bold text-emerald-600">ONLINE</span>
            <span className="font-mono text-xs text-[#a1a1aa]">
              {formatUptime(stats?.system.uptimeSeconds || 0)}
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-[#f0f0f2] pt-2 font-mono text-[11px]">
            <span className="text-[#71717a]">Database:</span>
            <span className="text-emerald-700 font-medium">PostgreSQL Connected</span>
          </div>
        </div>
      </div>

      {/* Quick Action Shortcuts */}
      <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-[#e5e5ea] bg-white p-4 shadow-sm">
        <span className="font-mono text-xs text-[#71717a]">Quick Actions:</span>
        <Link
          href="/admin/projects"
          className="rounded-xl border border-[#e5e5ea] bg-[#f9f9fb] px-3.5 py-1.5 font-mono text-xs text-[#18181b] hover:bg-[#f4f4f6] hover:border-[#d4d4d8] transition-colors"
        >
          📁 Manage Projects
        </Link>
        <Link
          href="/admin/messages?status=UNREAD"
          className="rounded-xl border border-[#e5e5ea] bg-[#f9f9fb] px-3.5 py-1.5 font-mono text-xs text-[#18181b] hover:bg-[#f4f4f6] hover:border-[#d4d4d8] transition-colors"
        >
          📬 View Unread Messages ({(stats?.messages.unread || 0)})
        </Link>
        <Link
          href="/admin/skills"
          className="rounded-xl border border-[#e5e5ea] bg-[#f9f9fb] px-3.5 py-1.5 font-mono text-xs text-[#18181b] hover:bg-[#f4f4f6] hover:border-[#d4d4d8] transition-colors"
        >
          🛠️ Edit Skills
        </Link>
        <Link
          href="/admin/settings"
          className="rounded-xl border border-[#e5e5ea] bg-[#f9f9fb] px-3.5 py-1.5 font-mono text-xs text-[#18181b] hover:bg-[#f4f4f6] hover:border-[#d4d4d8] transition-colors"
        >
          ⚙️ Security & Profile
        </Link>
      </div>

      {/* Main 2-column Dashboard Layout */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Left Column: Recent Inquiries */}
        <div className="rounded-2xl border border-[#e5e5ea] bg-white p-5 sm:p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between border-b border-[#f0f0f2] pb-3">
            <div className="flex items-center gap-2">
              <span className="text-base">📬</span>
              <h2 className="text-base font-semibold text-[#18181b]">
                Recent Inquiries
              </h2>
            </div>
            <Link
              href="/admin/messages"
              className="font-mono text-xs text-[#18181b] font-semibold hover:underline"
            >
              View All ({stats?.messages.total || 0}) →
            </Link>
          </div>

          {stats?.recentMessages && stats.recentMessages.length > 0 ? (
            <div className="space-y-3">
              {stats.recentMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`rounded-xl border p-4 transition-all ${
                    msg.status === "UNREAD"
                      ? "border-amber-200 bg-amber-50/50 hover:border-amber-300"
                      : "border-[#e5e5ea] bg-[#f9f9fb] hover:border-[#d4d4d8]"
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold text-sm text-[#18181b]">
                        {msg.name}
                      </span>
                      <span className="font-mono text-xs text-[#71717a] break-all">
                        &lt;{msg.email}&gt;
                      </span>
                    </div>

                    <span
                      className={`font-mono text-[10px] px-2 py-0.5 rounded-md ${
                        msg.status === "UNREAD"
                          ? "bg-amber-100 text-amber-800 font-bold border border-amber-300"
                          : msg.status === "REPLIED"
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                          : "bg-blue-100 text-blue-800 border border-blue-300"
                      }`}
                    >
                      {msg.status}
                    </span>
                  </div>

                  <p className="mt-2 text-xs font-semibold text-[#18181b]">
                    {msg.subject}
                  </p>

                  <p className="mt-1 line-clamp-2 text-xs text-[#71717a]">
                    {msg.message}
                  </p>

                  <div className="mt-3 flex items-center justify-between border-t border-[#e5e5ea] pt-2 font-mono text-[11px]">
                    <span className="text-[#a1a1aa]">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedMessage(msg)}
                        className="text-[#18181b] font-medium hover:underline cursor-pointer"
                      >
                        Inspect
                      </button>
                      <a
                        href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(
                          msg.subject
                        )}&body=Hi ${encodeURIComponent(msg.name)},%0D%0A%0D%0AThank you for reaching out!`}
                        className="text-[#71717a] hover:text-[#18181b]"
                      >
                        Reply ↗
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="py-8 text-center font-mono text-xs text-[#a1a1aa]">
              No contact inquiries recorded yet.
            </p>
          )}
        </div>

        {/* Right Column: Recent Projects */}
        <div className="rounded-2xl border border-[#e5e5ea] bg-white p-5 sm:p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between border-b border-[#f0f0f2] pb-3">
            <div className="flex items-center gap-2">
              <span className="text-base">📁</span>
              <h2 className="text-base font-semibold text-[#18181b]">
                Portfolio Projects
              </h2>
            </div>
            <Link
              href="/admin/projects"
              className="font-mono text-xs text-[#18181b] font-semibold hover:underline"
            >
              Manage ({stats?.projects.total || 0}) →
            </Link>
          </div>

          {stats?.recentProjects && stats.recentProjects.length > 0 ? (
            <div className="space-y-3">
              {stats.recentProjects.map((proj) => (
                <div
                  key={proj.id}
                  className="rounded-xl border border-[#e5e5ea] bg-[#f9f9fb] p-4 transition-all hover:border-[#d4d4d8]"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 font-mono text-xs text-[#71717a]">
                        <span className="font-bold text-[#18181b]">PROJ-{proj.number}</span>
                        <span>•</span>
                        <span>{proj.category}</span>
                      </div>
                      <h3 className="mt-1 text-sm font-semibold text-[#18181b]">
                        {proj.title}
                      </h3>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleToggleFeatured(proj.id, proj.featured)}
                      title="Toggle featured status"
                      className={`font-mono text-[10px] px-2 py-0.5 rounded-md border transition-all cursor-pointer ${
                        proj.featured
                          ? "border-amber-300 bg-amber-50 text-amber-800 font-bold"
                          : "border-[#e5e5ea] bg-white text-[#71717a] hover:text-[#18181b]"
                      }`}
                    >
                      {proj.featured ? "★ FEATURED" : "☆ STANDARD"}
                    </button>
                  </div>

                  <p className="mt-1.5 line-clamp-2 text-xs text-[#71717a]">
                    {proj.description}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-[#e5e5ea] pt-2 font-mono text-[11px]">
                    <div className="flex flex-wrap gap-1">
                      {Array.isArray(proj.technologies)
                        ? proj.technologies.slice(0, 3).map((tech) => (
                            <span
                              key={tech}
                              className="rounded bg-white border border-[#e5e5ea] px-1.5 py-0.5 text-[10px] text-[#71717a]"
                            >
                              #{tech}
                            </span>
                          ))
                        : null}
                      {Array.isArray(proj.technologies) && proj.technologies.length > 3 && (
                        <span className="text-[10px] text-[#a1a1aa]">
                          +{proj.technologies.length - 3} more
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      {proj.github && (
                        <a
                          href={proj.github}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#71717a] hover:text-[#18181b]"
                        >
                          GitHub ↗
                        </a>
                      )}
                      {proj.demo && (
                        <a
                          href={proj.demo}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#18181b] font-medium hover:underline"
                        >
                          Demo ↗
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="py-8 text-center font-mono text-xs text-[#a1a1aa]">
              No projects found in database.
            </p>
          )}
        </div>
      </div>

      {/* Message Inspection Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-2xl border border-[#e5e5ea] bg-white p-6 shadow-2xl">
            <button
              type="button"
              onClick={() => setSelectedMessage(null)}
              className="absolute top-4 right-4 text-[#71717a] hover:text-[#18181b]"
            >
              ✕
            </button>

            <span className="font-mono text-xs text-[#71717a] uppercase tracking-wider">
              Inquiry Inspection
            </span>
            <h3 className="mt-2 text-lg font-bold text-[#18181b]">
              {selectedMessage.subject}
            </h3>

            <div className="mt-3 space-y-1 font-mono text-xs text-[#71717a]">
              <p>
                From: <span className="text-[#18181b] font-semibold">{selectedMessage.name}</span> (
                <a
                  href={`mailto:${selectedMessage.email}`}
                  className="text-[#18181b] underline"
                >
                  {selectedMessage.email}
                </a>
                )
              </p>
              <p>
                Received:{" "}
                <span className="text-[#18181b]">
                  {new Date(selectedMessage.createdAt).toLocaleString()}
                </span>
              </p>
            </div>

            <div className="mt-4 max-h-60 overflow-y-auto rounded-xl border border-[#e5e5ea] bg-[#f9f9fb] p-4 text-xs leading-relaxed text-[#18181b] whitespace-pre-wrap">
              {selectedMessage.message}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[#f0f0f2] pt-4 font-mono text-xs">
              <a
                href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(
                  selectedMessage.subject
                )}&body=Hi ${encodeURIComponent(selectedMessage.name)},%0D%0A%0D%0A`}
                className="rounded-xl bg-[#18181b] px-4 py-2 text-white hover:bg-black transition-colors"
              >
                Reply via Email ✉️
              </a>

              {selectedMessage.status === "UNREAD" && (
                <button
                  type="button"
                  onClick={() => handleQuickMarkRead(selectedMessage)}
                  className="rounded-xl border border-[#e5e5ea] bg-white px-4 py-2 text-[#18181b] hover:bg-[#f4f4f6] transition-colors"
                >
                  Mark as Read ✓
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
