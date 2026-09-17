"use client";

import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [feedbackMessage, setFeedbackMessage] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText("tharushasangeeth034@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setFeedbackMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus("error");
        setFeedbackMessage(data.error || "Failed to send message. Please try again.");
        return;
      }

      setStatus("success");
      setFeedbackMessage(data.message || "Message sent successfully!");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch {
      setStatus("error");
      setFeedbackMessage("Network error. Please check your connection and try again.");
    }
  };

  return (
    <section
      id="contact"
      className="relative border-t border-[#1e2d3d] bg-[#0a0f14] py-20 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">

        {/* Section Header */}
        <div className="mb-10 sm:mb-14">
          <p className="mb-2 sm:mb-3 font-mono text-xs uppercase tracking-[0.2em] text-[#00c8ff]">
            04 / Contact
          </p>

          <h2 className="text-3xl font-bold tracking-tight text-[#e6edf3] sm:text-5xl">
            Let&#39;s Work Together
          </h2>

          <p className="mt-4 sm:mt-5 max-w-2xl text-sm sm:text-base leading-7 text-[#8899a6]">
            Have a project idea, internship opportunity, or just want to
            connect? Feel free to send me a message.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid gap-8 sm:gap-10 lg:grid-cols-[0.8fr_1.2fr]">

          {/* Contact Information Cards */}
          <div className="space-y-4">

            {/* Email Card with Copy Trigger */}
            <div className="group border border-[#1e2d3d] bg-[#0d1117] p-5 sm:p-6 transition-all duration-300 hover:border-[#00c8ff]/50">
              <div className="mb-3 flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-wider text-[#5c6f7f]">
                  Direct Email
                </span>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="font-mono text-xs text-[#00c8ff] hover:underline"
                >
                  {copied ? "✓ Copied" : "Copy"}
                </button>
              </div>

              <a
                href="mailto:tharushasangeeth034@gmail.com"
                className="break-all text-sm text-[#e6edf3] hover:text-[#00c8ff] transition-colors"
              >
                tharushasangeeth034@gmail.com
              </a>
            </div>

            {/* GitHub Card */}
            <a
              href="https://github.com/Tharusha20-s"
              target="_blank"
              rel="noopener noreferrer"
              className="group block border border-[#1e2d3d] bg-[#0d1117] p-5 sm:p-6 transition-all duration-300 hover:border-[#00c8ff]/50"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-wider text-[#5c6f7f]">
                  GitHub
                </span>

                <span className="text-[#00c8ff] transition-transform duration-200 group-hover:translate-x-1">
                  ↗
                </span>
              </div>

              <p className="text-sm text-[#e6edf3]">
                github.com/Tharusha20-s
              </p>
            </a>

            {/* LinkedIn Card */}
            <a
              href="https://www.linkedin.com/in/tharusha-sangeeth"
              target="_blank"
              rel="noopener noreferrer"
              className="group block border border-[#1e2d3d] bg-[#0d1117] p-5 sm:p-6 transition-all duration-300 hover:border-[#00c8ff]/50"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-wider text-[#5c6f7f]">
                  LinkedIn
                </span>

                <span className="text-[#00c8ff] transition-transform duration-200 group-hover:translate-x-1">
                  ↗
                </span>
              </div>

              <p className="text-sm text-[#e6edf3]">
                linkedin.com/in/tharusha-sangeeth
              </p>
            </a>

            {/* Location Card */}
            <div className="border border-[#1e2d3d] bg-[#0d1117] p-5 sm:p-6">
              <div className="mb-3">
                <span className="font-mono text-xs uppercase tracking-wider text-[#5c6f7f]">
                  Location
                </span>
              </div>

              <p className="text-sm text-[#e6edf3]">
                🇱🇰 Sri Lanka (Open to Remote Worldwide)
              </p>
            </div>

          </div>

          {/* Contact Form */}
          <div className="border border-[#1e2d3d] bg-[#0d1117] p-5 sm:p-8 shadow-xl">

            <div className="mb-6 sm:mb-8 flex flex-wrap items-center justify-between gap-2 border-b border-[#1e2d3d] pb-4 sm:pb-5">
              <span className="font-mono text-xs text-[#5c6f7f]">
                contact-form.ts
              </span>

              <span className="font-mono text-xs text-[#00c8ff]">
                POST /api/contact
              </span>
            </div>

            {/* Feedback notification banner */}
            {status === "success" && (
              <div className="mb-6 border border-[#00c8ff]/40 bg-[#00c8ff]/10 p-4 font-mono text-xs text-[#00c8ff]">
                ✓ {feedbackMessage}
              </div>
            )}

            {status === "error" && (
              <div className="mb-6 border border-red-500/40 bg-red-500/10 p-4 font-mono text-xs text-red-400">
                ✕ {feedbackMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">

              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block font-mono text-xs text-[#8899a6]"
                >
                  Name <span className="text-[#00c8ff]">*</span>
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full border border-[#2a3a49] bg-[#080c10] px-4 py-3 text-sm text-[#e6edf3] outline-none transition-colors placeholder:text-[#3d5166] focus:border-[#00c8ff]"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block font-mono text-xs text-[#8899a6]"
                >
                  Email <span className="text-[#00c8ff]">*</span>
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full border border-[#2a3a49] bg-[#080c10] px-4 py-3 text-sm text-[#e6edf3] outline-none transition-colors placeholder:text-[#3d5166] focus:border-[#00c8ff]"
                />
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block font-mono text-xs text-[#8899a6]"
                >
                  Subject <span className="text-[#00c8ff]">*</span>
                </label>

                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Project / Opportunity"
                  className="w-full border border-[#2a3a49] bg-[#080c10] px-4 py-3 text-sm text-[#e6edf3] outline-none transition-colors placeholder:text-[#3d5166] focus:border-[#00c8ff]"
                />
              </div>

              {/* Message */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="message"
                    className="font-mono text-xs text-[#8899a6]"
                  >
                    Message <span className="text-[#00c8ff]">*</span>
                  </label>
                  <span className="font-mono text-[10px] text-[#5c6f7f]">
                    {formData.message.length} chars (min 10)
                  </span>
                </div>

                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  minLength={10}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project, idea, or inquiry..."
                  className="w-full resize-none border border-[#2a3a49] bg-[#080c10] px-4 py-3 text-sm text-[#e6edf3] outline-none transition-colors placeholder:text-[#3d5166] focus:border-[#00c8ff]"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "submitting"}
                className="group inline-flex min-h-[44px] w-full sm:w-auto items-center justify-center gap-3 border border-[#00c8ff] bg-[#00c8ff] px-6 py-3 font-mono text-sm font-medium text-[#080c10] transition-all duration-200 hover:bg-transparent hover:text-[#00c8ff] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "submitting" ? (
                  <>
                    <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-[#080c10] border-t-transparent group-hover:border-[#00c8ff] group-hover:border-t-transparent" />
                    Sending Message...
                  </>
                ) : (
                  <>
                    Send Message
                    <span className="transition-transform duration-200 group-hover:translate-x-1">
                      →
                    </span>
                  </>
                )}
              </button>

            </form>
          </div>
        </div>
      </div>
    </section>
  );
}