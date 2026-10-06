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
      <div className="flex h-96 items-center justify-center font-mono text-sm text-[#00c8ff]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-7 w-7 animate-spin rounded-full border-2 border-[#00c8ff] border-t-transparent" />
          <span>Loading telemetry & metrics...</span>
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
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1e2d3d] pb-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#00c8ff]">
            Control Center
          </span>
          <h1 className="mt-1 text-2xl sm:text-3xl font-bold text-[#e6edf3]">
            System Telemetry & Overview
          </h1>
          <p className="mt-1 text-xs text-[#8899a6]">
            Real-time status of portfolio projects, visitor inquiries, and server health.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => loadData(true)}
            disabled={refreshing}
            className="flex items-center gap-2 border border-[#2a3a49] bg-[#0d1117] px-3.5 py-2 font-mono text-xs text-[#8899a6] hover:border-[#00c8ff] hover:text-[#00c8ff] transition-all disabled:opacity-50"
          >
            <span className={refreshing ? "animate-spin" : ""}>🔄</span>
            <span>{refreshing ? "Refreshing..." : "Sync Telemetry"}</span>
          </button>

          <Link
            href="/admin/projects"
            className="flex items-center gap-2 border border-[#00c8ff] bg-[#00c8ff] px-4 py-2 font-mono text-xs font-bold text-[#080c10] hover:bg-[#00b5e6] transition-colors"
          >
            <span>+ New Project</span>
          </Link>
        </div>
      </div>

      {/* KPI Metrics Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Projects KPI */}
        <div className="border border-[#1e2d3d] bg-[#0d1117] p-5 transition-all hover:border-[#00c8ff]/40">
          <div className="flex items-center justify-between text-[#8899a6]">
            <span className="font-mono text-xs uppercase tracking-wider">Projects</span>
            <span className="text-lg">📁</span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-[#e6edf3]">
              {stats?.projects.total || 0}
            </span>
            <span className="font-mono text-xs text-[#5c6f7f]">total</span>
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-[#1e2d3d] pt-2 font-mono text-[11px]">
            <span className="text-[#8899a6]">Featured on Site:</span>
            <span className="text-[#00c8ff] font-bold">{stats?.projects.featured || 0}</span>
          </div>
        </div>

        {/* Inquiries KPI */}
        <div className="border border-[#1e2d3d] bg-[#0d1117] p-5 transition-all hover:border-[#00c8ff]/40">
          <div className="flex items-center justify-between text-[#8899a6]">
            <span className="font-mono text-xs uppercase tracking-wider">Inquiries</span>
            <span className="text-lg">📬</span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-[#e6edf3]">
              {stats?.messages.total || 0}
            </span>
            <span className="font-mono text-xs text-[#5c6f7f]">messages</span>
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-[#1e2d3d] pt-2 font-mono text-[11px]">
            <span className="text-[#8899a6]">Unread Messages:</span>
            <span
              className={`rounded px-1.5 py-0.5 font-bold ${
                (stats?.messages.unread || 0) > 0
                  ? "bg-amber-400/20 text-amber-300 border border-amber-400/40 animate-pulse"
                  : "text-emerald-400"
              }`}
            >
              {stats?.messages.unread || 0} Unread
            </span>
          </div>
        </div>

        {/* Skills KPI */}
        <div className="border border-[#1e2d3d] bg-[#0d1117] p-5 transition-all hover:border-[#00c8ff]/40">
          <div className="flex items-center justify-between text-[#8899a6]">
            <span className="font-mono text-xs uppercase tracking-wider">Tech Stack</span>
            <span className="text-lg">⚡</span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-[#e6edf3]">
              {stats?.skills.total || 0}
            </span>
            <span className="font-mono text-xs text-[#5c6f7f]">technologies</span>
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-[#1e2d3d] pt-2 font-mono text-[11px]">
            <span className="text-[#8899a6]">Categories:</span>
            <span className="text-[#00c8ff]">Frontend, Backend, DB, DevOps</span>
          </div>
        </div>

        {/* System & DB Health KPI */}
        <div className="border border-[#1e2d3d] bg-[#0d1117] p-5 transition-all hover:border-[#00c8ff]/40">
          <div className="flex items-center justify-between text-[#8899a6]">
            <span className="font-mono text-xs uppercase tracking-wider">Engine Status</span>
            <span className="text-lg">🩺</span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-xl font-bold text-emerald-400">ONLINE</span>
            <span className="font-mono text-xs text-[#5c6f7f]">
              {formatUptime(stats?.system.uptimeSeconds || 0)}
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-[#1e2d3d] pt-2 font-mono text-[11px]">
            <span className="text-[#8899a6]">Database:</span>
            <span className="text-emerald-400">PostgreSQL Connected</span>
          </div>
        </div>
      </div>

      {/* Quick Action Shortcuts */}
      <div className="flex flex-wrap items-center gap-3 border border-[#1e2d3d] bg-[#0a0f14] p-4">
        <span className="font-mono text-xs text-[#5c6f7f]">Quick Actions:</span>
        <Link
          href="/admin/projects"
          className="border border-[#2a3a49] bg-[#0d1117] px-3 py-1.5 font-mono text-xs text-[#e6edf3] hover:border-[#00c8ff] hover:text-[#00c8ff] transition-colors"
        >
          📁 Manage Projects
        </Link>
        <Link
          href="/admin/messages?status=UNREAD"
          className="border border-[#2a3a49] bg-[#0d1117] px-3 py-1.5 font-mono text-xs text-[#e6edf3] hover:border-[#00c8ff] hover:text-[#00c8ff] transition-colors"
        >
          📬 View Unread Messages ({(stats?.messages.unread || 0)})
        </Link>
        <Link
          href="/admin/skills"
          className="border border-[#2a3a49] bg-[#0d1117] px-3 py-1.5 font-mono text-xs text-[#e6edf3] hover:border-[#00c8ff] hover:text-[#00c8ff] transition-colors"
        >
          🛠️ Edit Skills
        </Link>
        <Link
          href="/admin/settings"
          className="border border-[#2a3a49] bg-[#0d1117] px-3 py-1.5 font-mono text-xs text-[#e6edf3] hover:border-[#00c8ff] hover:text-[#00c8ff] transition-colors"
        >
          ⚙️ Security & Profile
        </Link>
      </div>

      {/* Main 2-column Dashboard Layout */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Left Column: Recent Inquiries */}
        <div className="border border-[#1e2d3d] bg-[#0d1117] p-5 sm:p-6">
          <div className="mb-5 flex items-center justify-between border-b border-[#1e2d3d] pb-3">
            <div className="flex items-center gap-2">
              <span className="text-base">📬</span>
              <h2 className="text-base font-semibold text-[#e6edf3]">
                Recent Inquiries
              </h2>
            </div>
            <Link
              href="/admin/messages"
              className="font-mono text-xs text-[#00c8ff] hover:underline"
            >
              View All ({stats?.messages.total || 0}) →
            </Link>
          </div>

          {stats?.recentMessages && stats.recentMessages.length > 0 ? (
            <div className="space-y-3">
              {stats.recentMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`border p-4 transition-all ${
                    msg.status === "UNREAD"
                      ? "border-amber-400/40 bg-amber-400/5 hover:border-amber-400"
                      : "border-[#1e2d3d] bg-[#0a0f14] hover:border-[#2a3a49]"
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-[#e6edf3]">
                        {msg.name}
                      </span>
                      <span className="font-mono text-xs text-[#5c6f7f]">
                        &lt;{msg.email}&gt;
                      </span>
                    </div>

                    <span
                      className={`font-mono text-[10px] px-2 py-0.5 rounded ${
                        msg.status === "UNREAD"
                          ? "bg-amber-400/20 text-amber-300 font-bold border border-amber-400/30"
                          : msg.status === "REPLIED"
                          ? "bg-emerald-400/20 text-emerald-300 border border-emerald-400/30"
                          : "bg-blue-400/20 text-blue-300 border border-blue-400/30"
                      }`}
                    >
                      {msg.status}
                    </span>
                  </div>

                  <p className="mt-2 text-xs font-semibold text-[#00c8ff]">
                    {msg.subject}
                  </p>

                  <p className="mt-1 line-clamp-2 text-xs text-[#8899a6]">
                    {msg.message}
                  </p>

                  <div className="mt-3 flex items-center justify-between border-t border-[#1e2d3d] pt-2 font-mono text-[11px]">
                    <span className="text-[#5c6f7f]">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedMessage(msg)}
                        className="text-[#00c8ff] hover:underline cursor-pointer"
                      >
                        Inspect
                      </button>
                      <a
                        href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(
                          msg.subject
                        )}&body=Hi ${encodeURIComponent(msg.name)},%0D%0A%0D%0AThank you for reaching out!`}
                        className="text-[#8899a6] hover:text-[#e6edf3]"
                      >
                        Reply ↗
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="py-8 text-center font-mono text-xs text-[#5c6f7f]">
              No contact inquiries recorded yet.
            </p>
          )}
        </div>

        {/* Right Column: Recent Projects */}
        <div className="border border-[#1e2d3d] bg-[#0d1117] p-5 sm:p-6">
          <div className="mb-5 flex items-center justify-between border-b border-[#1e2d3d] pb-3">
            <div className="flex items-center gap-2">
              <span className="text-base">📁</span>
              <h2 className="text-base font-semibold text-[#e6edf3]">
                Portfolio Projects
              </h2>
            </div>
            <Link
              href="/admin/projects"
              className="font-mono text-xs text-[#00c8ff] hover:underline"
            >
              Manage ({stats?.projects.total || 0}) →
            </Link>
          </div>

          {stats?.recentProjects && stats.recentProjects.length > 0 ? (
            <div className="space-y-3">
              {stats.recentProjects.map((proj) => (
                <div
                  key={proj.id}
                  className="border border-[#1e2d3d] bg-[#0a0f14] p-4 transition-all hover:border-[#2a3a49]"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 font-mono text-xs text-[#00c8ff]">
                        <span>PROJ-{proj.number}</span>
                        <span>•</span>
                        <span>{proj.category}</span>
                      </div>
                      <h3 className="mt-1 text-sm font-semibold text-[#e6edf3]">
                        {proj.title}
                      </h3>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleToggleFeatured(proj.id, proj.featured)}
                      title="Toggle featured status"
                      className={`font-mono text-[10px] px-2 py-0.5 border transition-all cursor-pointer ${
                        proj.featured
                          ? "border-[#00c8ff] bg-[#00c8ff]/10 text-[#00c8ff]"
                          : "border-[#2a3a49] bg-[#0d1117] text-[#5c6f7f] hover:text-[#e6edf3]"
                      }`}
                    >
                      {proj.featured ? "★ FEATURED" : "☆ STANDARD"}
                    </button>
                  </div>

                  <p className="mt-1.5 line-clamp-2 text-xs text-[#8899a6]">
                    {proj.description}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-[#1e2d3d] pt-2 font-mono text-[11px]">
                    <div className="flex flex-wrap gap-1">
                      {Array.isArray(proj.technologies)
                        ? proj.technologies.slice(0, 3).map((tech) => (
                            <span
                              key={tech}
                              className="bg-[#161b22] px-1.5 py-0.5 text-[10px] text-[#6c7d8f]"
                            >
                              #{tech}
                            </span>
                          ))
                        : null}
                      {Array.isArray(proj.technologies) && proj.technologies.length > 3 && (
                        <span className="text-[10px] text-[#5c6f7f]">
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
                          className="text-[#8899a6] hover:text-[#00c8ff]"
                        >
                          GitHub ↗
                        </a>
                      )}
                      {proj.demo && (
                        <a
                          href={proj.demo}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#00c8ff] hover:underline"
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
            <p className="py-8 text-center font-mono text-xs text-[#5c6f7f]">
              No projects found in database.
            </p>
          )}
        </div>
      </div>

      {/* Message Inspection Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-lg border border-[#1e2d3d] bg-[#0d1117] p-6 shadow-2xl">
            <button
              type="button"
              onClick={() => setSelectedMessage(null)}
              className="absolute top-4 right-4 text-[#8899a6] hover:text-[#e6edf3]"
            >
              ✕
            </button>

            <span className="font-mono text-xs text-[#00c8ff] uppercase tracking-wider">
              Inquiry Inspection
            </span>
            <h3 className="mt-2 text-lg font-bold text-[#e6edf3]">
              {selectedMessage.subject}
            </h3>

            <div className="mt-3 space-y-1 font-mono text-xs text-[#8899a6]">
              <p>
                From: <span className="text-[#e6edf3]">{selectedMessage.name}</span> (
                <a
                  href={`mailto:${selectedMessage.email}`}
                  className="text-[#00c8ff] hover:underline"
                >
                  {selectedMessage.email}
                </a>
                )
              </p>
              <p>
                Received:{" "}
                <span className="text-[#e6edf3]">
                  {new Date(selectedMessage.createdAt).toLocaleString()}
                </span>
              </p>
            </div>

            <div className="mt-4 max-h-60 overflow-y-auto border border-[#1e2d3d] bg-[#080c10] p-4 text-xs leading-relaxed text-[#e6edf3] whitespace-pre-wrap">
              {selectedMessage.message}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[#1e2d3d] pt-4 font-mono text-xs">
              <a
                href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(
                  selectedMessage.subject
                )}&body=Hi ${encodeURIComponent(selectedMessage.name)},%0D%0A%0D%0A`}
                className="border border-[#00c8ff] bg-[#00c8ff]/10 px-4 py-2 text-[#00c8ff] hover:bg-[#00c8ff] hover:text-[#080c10] transition-colors"
              >
                Reply via Email ✉️
              </a>

              {selectedMessage.status === "UNREAD" && (
                <button
                  type="button"
                  onClick={() => handleQuickMarkRead(selectedMessage)}
                  className="border border-[#2a3a49] bg-[#161b22] px-4 py-2 text-[#e6edf3] hover:border-emerald-500 hover:text-emerald-400 transition-colors"
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
