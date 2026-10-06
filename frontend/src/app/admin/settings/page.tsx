"use client";

import { useState } from "react";
import { useAdminAuth } from "../AdminAuthContext";
import { updateAdminPassword } from "@/utils/api";

export default function AdminSettingsPage() {
  const { user } = useAdminAuth();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updating, setUpdating] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    if (!currentPassword || !newPassword || !confirmPassword) {
      setStatusMessage({
        type: "error",
        text: "All password fields are required.",
      });
      return;
    }

    if (newPassword.length < 6) {
      setStatusMessage({
        type: "error",
        text: "New password must be at least 6 characters long.",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      setStatusMessage({
        type: "error",
        text: "New password and confirmation do not match.",
      });
      return;
    }

    setUpdating(true);

    try {
      await updateAdminPassword(currentPassword, newPassword);
      setStatusMessage({
        type: "success",
        text: "Password updated successfully!",
      });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setStatusMessage({
          type: "error",
          text: err.message || "Failed to update password.",
        });
      } else {
        setStatusMessage({
          type: "error",
          text: "An error occurred while updating password.",
        });
      }
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-8">
      {/* Header */}
      <div className="border-b border-[#1e2d3d] pb-6">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#00c8ff]">
          Configuration & Credentials
        </span>
        <h1 className="mt-1 text-2xl sm:text-3xl font-bold text-[#e6edf3]">
          Admin Settings & Security
        </h1>
        <p className="mt-1 text-xs text-[#8899a6]">
          Manage account security, review system environment variables, and verify database connectivity.
        </p>
      </div>

      {/* Profile Overview Card */}
      <div className="border border-[#1e2d3d] bg-[#0d1117] p-6">
        <h2 className="font-mono text-xs uppercase tracking-wider text-[#00c8ff]">
          01 // Administrator Profile
        </h2>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="border border-[#1e2d3d] bg-[#080c10] p-4">
            <span className="font-mono text-[11px] text-[#5c6f7f]">Full Name</span>
            <p className="mt-1 font-bold text-sm text-[#e6edf3]">
              {user?.name || "Tharusha Sangeeth"}
            </p>
          </div>

          <div className="border border-[#1e2d3d] bg-[#080c10] p-4">
            <span className="font-mono text-[11px] text-[#5c6f7f]">Email Address</span>
            <p className="mt-1 font-bold text-sm text-[#e6edf3]">
              {user?.email || "—"}
            </p>
          </div>

          <div className="border border-[#1e2d3d] bg-[#080c10] p-4">
            <span className="font-mono text-[11px] text-[#5c6f7f]">Username</span>
            <p className="mt-1 font-mono text-sm text-[#00c8ff]">
              @{user?.username || "admin"}
            </p>
          </div>

          <div className="border border-[#1e2d3d] bg-[#080c10] p-4">
            <span className="font-mono text-[11px] text-[#5c6f7f]">Access Role</span>
            <div className="mt-1 flex items-center gap-2">
              <span className="rounded bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 font-mono text-xs text-emerald-400">
                {user?.role || "SUPER_ADMIN"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Change Password Form */}
      <div className="border border-[#1e2d3d] bg-[#0d1117] p-6">
        <h2 className="font-mono text-xs uppercase tracking-wider text-[#00c8ff]">
          02 // Security & Authentication
        </h2>
        <p className="mt-1 text-xs text-[#8899a6]">
          Update your administrative master password. Passwords are encrypted with bcrypt salts.
        </p>

        {statusMessage && (
          <div
            className={`mt-4 border p-3 font-mono text-xs ${
              statusMessage.type === "success"
                ? "border-emerald-500/50 bg-emerald-950/30 text-emerald-300"
                : "border-rose-500/50 bg-rose-950/30 text-rose-300"
            }`}
          >
            {statusMessage.text}
          </div>
        )}

        <form onSubmit={handlePasswordSubmit} className="mt-5 space-y-4 max-w-md font-mono text-xs">
          <div>
            <label className="mb-1.5 block text-[#8899a6]">Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••••••"
              required
              className="w-full border border-[#2a3a49] bg-[#080c10] px-3 py-2 text-sm text-[#e6edf3] focus:border-[#00c8ff] focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-[#8899a6]">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Minimum 6 characters"
              required
              className="w-full border border-[#2a3a49] bg-[#080c10] px-3 py-2 text-sm text-[#e6edf3] focus:border-[#00c8ff] focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-[#8899a6]">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter new password"
              required
              className="w-full border border-[#2a3a49] bg-[#080c10] px-3 py-2 text-sm text-[#e6edf3] focus:border-[#00c8ff] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={updating}
            className="border border-[#00c8ff] bg-[#00c8ff] px-5 py-2.5 font-bold text-[#080c10] hover:bg-[#00b5e6] disabled:opacity-50 cursor-pointer transition-colors"
          >
            {updating ? "Updating..." : "Update Master Password"}
          </button>
        </form>
      </div>

      {/* System Environment Diagnostics */}
      <div className="border border-[#1e2d3d] bg-[#0d1117] p-6">
        <h2 className="font-mono text-xs uppercase tracking-wider text-[#00c8ff]">
          03 // System Architecture & Diagnostics
        </h2>

        <div className="mt-4 space-y-2 border border-[#1e2d3d] bg-[#080c10] p-4 font-mono text-xs text-[#8899a6]">
          <div className="flex justify-between border-b border-[#1e2d3d] pb-2">
            <span>Frontend Engine:</span>
            <span className="text-[#e6edf3]">Next.js 16 (React 19)</span>
          </div>
          <div className="flex justify-between border-b border-[#1e2d3d] py-2">
            <span>Backend Service:</span>
            <span className="text-[#e6edf3]">Express 4 + TypeScript</span>
          </div>
          <div className="flex justify-between border-b border-[#1e2d3d] py-2">
            <span>Database Layer:</span>
            <span className="text-emerald-400">Prisma ORM (PostgreSQL)</span>
          </div>
          <div className="flex justify-between border-b border-[#1e2d3d] py-2">
            <span>Backend API Endpoint:</span>
            <span className="text-[#00c8ff]">http://localhost:5001/api</span>
          </div>
          <div className="flex justify-between pt-2">
            <span>Authentication:</span>
            <span className="text-[#e6edf3]">JWT (HMAC-SHA256, 7-Day Session)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
