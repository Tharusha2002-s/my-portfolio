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
      <div className="border-b border-[#e5e5ea] pb-6">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#71717a]">
          Configuration & Credentials
        </span>
        <h1 className="mt-1 text-2xl sm:text-3xl font-bold text-[#18181b]">
          Admin Settings & Security
        </h1>
        <p className="mt-1 text-xs text-[#71717a]">
          Manage account security, review system environment variables, and verify database connectivity.
        </p>
      </div>

      {/* Profile Overview Card */}
      <div className="rounded-2xl border border-[#e5e5ea] bg-white p-6 shadow-sm">
        <h2 className="font-mono text-xs uppercase tracking-wider text-[#71717a]">
          01 // Administrator Profile
        </h2>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-[#e5e5ea] bg-[#f9f9fb] p-4">
            <span className="font-mono text-[11px] text-[#71717a]">Full Name</span>
            <p className="mt-1 font-bold text-sm text-[#18181b]">
              {user?.name || "Tharusha Sangeeth"}
            </p>
          </div>

          <div className="rounded-xl border border-[#e5e5ea] bg-[#f9f9fb] p-4">
            <span className="font-mono text-[11px] text-[#71717a]">Email Address</span>
            <p className="mt-1 font-bold text-sm text-[#18181b]">
              {user?.email || "—"}
            </p>
          </div>

          <div className="rounded-xl border border-[#e5e5ea] bg-[#f9f9fb] p-4">
            <span className="font-mono text-[11px] text-[#71717a]">Username</span>
            <p className="mt-1 font-mono text-sm font-semibold text-[#18181b]">
              @{user?.username || "admin"}
            </p>
          </div>

          <div className="rounded-xl border border-[#e5e5ea] bg-[#f9f9fb] p-4">
            <span className="font-mono text-[11px] text-[#71717a]">Access Role</span>
            <div className="mt-1 flex items-center gap-2">
              <span className="rounded-md bg-emerald-50 border border-emerald-200 px-2 py-0.5 font-mono text-xs font-bold text-emerald-800">
                {user?.role || "SUPER_ADMIN"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Change Password Form */}
      <div className="rounded-2xl border border-[#e5e5ea] bg-white p-6 shadow-sm">
        <h2 className="font-mono text-xs uppercase tracking-wider text-[#71717a]">
          02 // Security & Authentication
        </h2>
        <p className="mt-1 text-xs text-[#71717a]">
          Update your administrative master password. Passwords are encrypted with bcrypt salts.
        </p>

        {statusMessage && (
          <div
            className={`mt-4 rounded-xl border p-3 font-mono text-xs ${
              statusMessage.type === "success"
                ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                : "border-rose-200 bg-rose-50 text-rose-700"
            }`}
          >
            {statusMessage.text}
          </div>
        )}

        <form onSubmit={handlePasswordSubmit} className="mt-5 space-y-4 max-w-md font-mono text-xs">
          <div>
            <label className="mb-1.5 block text-[#71717a]">Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••••••"
              required
              className="w-full rounded-xl border border-[#e5e5ea] bg-[#f9f9fb] px-3.5 py-2.5 text-sm text-[#18181b] focus:border-[#18181b] focus:bg-white focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-[#71717a]">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Minimum 6 characters"
              required
              className="w-full rounded-xl border border-[#e5e5ea] bg-[#f9f9fb] px-3.5 py-2.5 text-sm text-[#18181b] focus:border-[#18181b] focus:bg-white focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-[#71717a]">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter new password"
              required
              className="w-full rounded-xl border border-[#e5e5ea] bg-[#f9f9fb] px-3.5 py-2.5 text-sm text-[#18181b] focus:border-[#18181b] focus:bg-white focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={updating}
            className="rounded-xl bg-[#18181b] px-5 py-2.5 font-bold text-white hover:bg-black disabled:opacity-50 cursor-pointer transition-colors shadow-sm"
          >
            {updating ? "Updating..." : "Update Master Password"}
          </button>
        </form>
      </div>

      {/* System Environment Diagnostics */}
      <div className="rounded-2xl border border-[#e5e5ea] bg-white p-6 shadow-sm">
        <h2 className="font-mono text-xs uppercase tracking-wider text-[#71717a]">
          03 // System Architecture & Diagnostics
        </h2>

        <div className="mt-4 space-y-2 rounded-xl border border-[#e5e5ea] bg-[#f9f9fb] p-4 font-mono text-xs text-[#71717a]">
          <div className="flex flex-col sm:flex-row sm:justify-between border-b border-[#e5e5ea] pb-2 gap-1">
            <span>Frontend Engine:</span>
            <span className="text-[#18181b] font-medium">Next.js 16 (React 19)</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between border-b border-[#e5e5ea] py-2 gap-1">
            <span>Backend Service:</span>
            <span className="text-[#18181b] font-medium">Express 4 + TypeScript</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between border-b border-[#e5e5ea] py-2 gap-1">
            <span>Database Layer:</span>
            <span className="text-emerald-700 font-semibold">Prisma ORM (PostgreSQL)</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between border-b border-[#e5e5ea] py-2 gap-1">
            <span>Backend API Endpoint:</span>
            <span className="text-[#18181b] font-medium break-all">http://localhost:5001/api</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between pt-2 gap-1">
            <span>Authentication:</span>
            <span className="text-[#18181b] font-medium break-all">JWT (HMAC-SHA256, 7-Day Session)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
