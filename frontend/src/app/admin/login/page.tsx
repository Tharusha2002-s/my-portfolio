"use client";

import { useState } from "react";
import Link from "next/link";
import { useAdminAuth } from "../AdminAuthContext";
import { LogoIcon } from "@/components/ui/Logo";

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
        setError("Invalid credentials. Please verify your credentials and try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f4f4f6] p-4 sm:p-6 selection:bg-black/10 selection:text-black">
      {/* Background subtle dots */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#d4d4d8_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />

      {/* Login Card */}
      <div className="relative w-full max-w-md rounded-3xl border border-[#e5e5ea] bg-white p-7 sm:p-10 shadow-xl backdrop-blur-sm">
        {/* Header with Tharusha's Logo */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex items-center justify-center">
            <LogoIcon size="lg" />
          </div>
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#71717a]">
            Tharusha Sangeeth
          </span>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-[#18181b]">
            Admin Control Center
          </h1>
          <p className="mt-2 text-xs text-[#71717a]">
            Secure database authentication for portfolio management
          </p>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="mb-6 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700 font-mono flex items-start gap-2">
            <span className="text-base leading-none">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block font-mono text-xs uppercase tracking-wider text-[#71717a]">
              Email or Username
            </label>
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="Enter username or email"
              required
              className="w-full rounded-xl border border-[#e5e5ea] bg-[#f9f9fb] px-4 py-3 font-mono text-sm text-[#18181b] placeholder-[#a1a1aa] focus:border-[#18181b] focus:bg-white focus:outline-none transition-all"
            />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="font-mono text-xs uppercase tracking-wider text-[#71717a]">
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="font-mono text-[11px] text-[#18181b] font-semibold hover:underline"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full rounded-xl border border-[#e5e5ea] bg-[#f9f9fb] px-4 py-3 font-mono text-sm text-[#18181b] placeholder-[#a1a1aa] focus:border-[#18181b] focus:bg-white focus:outline-none transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-xl bg-[#18181b] py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-black hover:shadow-md disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? "Authenticating..." : "Access Admin Console →"}
          </button>
        </form>

        {/* Footer Navigation */}
        <div className="mt-8 text-center border-t border-[#f0f0f2] pt-6">
          <Link
            href="/"
            className="font-mono text-xs text-[#71717a] hover:text-[#18181b] transition-colors"
          >
            ← Back to Public Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}
