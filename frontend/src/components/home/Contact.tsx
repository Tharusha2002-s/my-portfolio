"use client";

import { useState } from "react";
import Link from "next/link";

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
      setFeedbackMessage("Network error. Please try again or email directly.");
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Large Rounded Contact Card (Matches Bottom Section of Reference Image) */}
        <div className="bg-white rounded-[32px] sm:rounded-[44px] border border-[#e5e5ea] shadow-[0_8px_30px_rgb(0,0,0,0.03)] p-8 sm:p-14 md:p-16 text-center">
          
          {/* Handshake Icon Circle (Exact from Reference Image) */}
          <div className="w-14 h-14 rounded-full bg-[#f4f4f6] border border-[#e5e5ea] flex items-center justify-center mx-auto text-2xl shadow-sm">
            🤝
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#18181b] mt-5 mb-3 leading-tight">
            Tell me about your next project
          </h2>

          <p className="text-sm sm:text-base text-[#71717a] max-w-lg mx-auto">
            Have an open software engineering role, a collaboration inquiry, or a question? Drop a message or reach out directly.
          </p>

          {/* Action Pill Buttons (Matches Reference Image) */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <a
              href="mailto:tharushasangeeth034@gmail.com"
              className="inline-flex items-center gap-2 bg-[#18181b] hover:bg-black text-white text-xs sm:text-sm font-medium px-6 py-2.5 rounded-full shadow-sm hover:scale-105 active:scale-95 transition-all"
            >
              <span>Email Me</span>
              <span>✉</span>
            </a>

            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-[#18181b] border border-[#e5e5ea] text-xs sm:text-sm font-medium px-6 py-2.5 rounded-full shadow-sm hover:border-gray-300 transition-all"
            >
              <span>{copied ? "Copied!" : "Copy Email"}</span>
            </button>

            <Link
              href="/resume"
              className="inline-flex items-center gap-1.5 bg-white hover:bg-gray-50 text-[#18181b] border border-[#e5e5ea] text-xs sm:text-sm font-medium px-5 py-2.5 rounded-full shadow-sm hover:border-gray-300 transition-all"
            >
              <span>View Resume</span>
              <span>↗</span>
            </Link>
          </div>

          {/* Direct Interactive Message Form */}
          <div className="mt-12 pt-10 border-t border-[#e5e5ea] text-left max-w-xl mx-auto">
            <h3 className="text-base font-bold text-[#18181b] mb-4 text-center sm:text-left">
              Send a Direct Message
            </h3>

            {feedbackMessage && (
              <div
                className={`mb-6 p-4 rounded-2xl text-xs sm:text-sm font-medium ${
                  status === "success"
                    ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                    : "bg-red-50 text-red-800 border border-red-200"
                }`}
              >
                {feedbackMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-medium text-[#52525b] mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Jane Doe"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#f4f4f6] border border-[#e5e5ea] text-[#18181b] text-xs sm:text-sm placeholder:text-[#a1a1aa] focus:outline-none focus:border-[#18181b] focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-[#52525b] mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="jane@example.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#f4f4f6] border border-[#e5e5ea] text-[#18181b] text-xs sm:text-sm placeholder:text-[#a1a1aa] focus:outline-none focus:border-[#18181b] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-xs font-medium text-[#52525b] mb-1.5">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Project inquiry / Opportunity"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#f4f4f6] border border-[#e5e5ea] text-[#18181b] text-xs sm:text-sm placeholder:text-[#a1a1aa] focus:outline-none focus:border-[#18181b] focus:bg-white transition-all"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-medium text-[#52525b] mb-1.5">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me a bit about what you're working on..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#f4f4f6] border border-[#e5e5ea] text-[#18181b] text-xs sm:text-sm placeholder:text-[#a1a1aa] focus:outline-none focus:border-[#18181b] focus:bg-white transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full py-3 bg-[#18181b] hover:bg-black disabled:bg-gray-400 text-white font-medium text-xs sm:text-sm rounded-xl shadow-sm transition-all"
              >
                {status === "submitting" ? "Sending message..." : "Send Message ↗"}
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}