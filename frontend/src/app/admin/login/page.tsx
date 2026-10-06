"use client";

import { useState } from "react";
import Link from "next/link";
import { useAdminAuth } from "../AdminAuthContext";

export default function AdminLoginPage() {
  const { login } = useAdminAuth();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier || !password) {
      setError("Please enter both username/email and password.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await login(identifier, password);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Failed to authenticate.");
      } else {
        setError("Invalid credentials. Please verify and try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoFill = () => {
    setIdentifier("admin@tharusha.dev");
    setPassword("Admin@2026!");
    setError(null);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#080c10] p-4 sm:p-6 selection:bg-[#00c8ff]/20 selection:text-[#00c8ff]">
      {/* Background cyber grid effect */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#1e2d3d_1px,transparent_1px)] [background-size:24px_24px] opacity-25" />

      {/* Login Card */}
      <div className="relative w-full max-w-md border border-[#1e2d3d] bg-[#0d1117] p-6 sm:p-10 shadow-[0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-sm">
        {/* Glow Accent Top border */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#00c8ff] to-transparent" />

        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-lg border border-[#00c8ff]/30 bg-[#00c8ff]/10 text-2xl shadow-[0_0_20px_rgba(0,200,255,0.15)]">
            ⚡
          </div>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#00c8ff]">
            Tharusha Portfolio
          </span>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-[#e6edf3]">
            Admin Control Center
          </h1>
          <p className="mt-2 text-xs text-[#8899a6]">
            Secure authentication for portfolio management & inquiries
          </p>
        </div>

        {/* Demo Credentials Quick Fill Chip */}
        <div className="mb-6 border border-[#1e2d3d] bg-[#0a0f14] p-3 text-center">
          <p className="font-mono text-[11px] text-[#8899a6]">
            Default credentials configured:
          </p>
          <button
            type="button"
            onClick={handleDemoFill}
            className="mt-1.5 inline-flex items-center gap-1.5 border border-[#00c8ff]/40 bg-[#00c8ff]/10 px-2.5 py-1 font-mono text-xs text-[#00c8ff] hover:bg-[#00c8ff]/20 transition-all cursor-pointer"
          >
            <span>👉 Auto-fill Demo Credentials</span>
          </button>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="mb-6 border border-rose-800/60 bg-rose-950/30 p-3 text-xs text-rose-300 font-mono flex items-start gap-2">
            <span className="text-base leading-none">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block font-mono text-xs uppercase tracking-wider text-[#8899a6]">
              Email or Username
            </label>
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="admin@tharusha.dev"
              required
              className="w-full border border-[#2a3a49] bg-[#080c10] px-4 py-3 font-mono text-sm text-[#e6edf3] placeholder-[#485b6a] focus:border-[#00c8ff] focus:outline-none transition-colors"
            />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="font-mono text-xs uppercase tracking-wider text-[#8899a6]">
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="font-mono text-[11px] text-[#00c8ff] hover:underline"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              required
              className="w-full border border-[#2a3a49] bg-[#080c10] px-4 py-3 font-mono text-sm text-[#e6edf3] placeholder-[#485b6a] focus:border-[#00c8ff] focus:outline-none transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full border border-[#00c8ff] bg-[#00c8ff] py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-[#080c10] transition-all hover:bg-[#00b5e6] hover:shadow-[0_0_25px_rgba(0,200,255,0.4)] disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? "Authenticating..." : "Access Admin Console →"}
          </button>
        </form>

        {/* Footer Navigation */}
        <div className="mt-8 text-center border-t border-[#1e2d3d] pt-6">
          <Link
            href="/"
            className="font-mono text-xs text-[#8899a6] hover:text-[#00c8ff] transition-colors"
          >
            ← Back to Public Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}
