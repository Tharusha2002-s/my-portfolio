"use client";

import { useEffect, useState, useMemo } from "react";
import {
  fetchAdminMessages,
  updateMessageRecord,
  deleteMessageRecord,
  ContactMessage,
} from "@/utils/api";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>("ALL");
  const [search, setSearch] = useState("");

  // Modal / Detail drawer
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [adminNotes, setAdminNotes] = useState("");
  const [savingNotes, setSavingNotes] = useState(false);

  // Delete modal
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadMessages = async () => {
    try {
      const data = await fetchAdminMessages();
      setMessages(data.messages);
    } catch (err) {
      console.error("Failed to load inquiries:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const counts = useMemo(() => {
    return {
      all: messages.length,
      unread: messages.filter((m) => m.status === "UNREAD").length,
      read: messages.filter((m) => m.status === "READ").length,
      replied: messages.filter((m) => m.status === "REPLIED").length,
      archived: messages.filter((m) => m.status === "ARCHIVED").length,
    };
  }, [messages]);

  const filteredMessages = useMemo(() => {
    return messages.filter((msg) => {
      const matchTab = activeTab === "ALL" || msg.status === activeTab;
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        msg.name.toLowerCase().includes(q) ||
        msg.email.toLowerCase().includes(q) ||
        msg.subject.toLowerCase().includes(q) ||
        msg.message.toLowerCase().includes(q);

      return matchTab && matchSearch;
    });
  }, [messages, activeTab, search]);

  const handleOpenDetail = (msg: ContactMessage) => {
    setSelectedMessage(msg);
    setAdminNotes(msg.adminNotes || "");
    // Auto-mark as READ if it was UNREAD
    if (msg.status === "UNREAD") {
      updateMessageRecord(msg.id, "READ").then((updated) => {
        setMessages((prev) =>
          prev.map((m) => (m.id === msg.id ? updated : m))
        );
        setSelectedMessage(updated);
      });
    }
  };

  const handleUpdateStatus = async (status: string) => {
    if (!selectedMessage) return;
    try {
      const updated = await updateMessageRecord(
        selectedMessage.id,
        status,
        adminNotes
      );
      setMessages((prev) =>
        prev.map((m) => (m.id === selectedMessage.id ? updated : m))
      );
      setSelectedMessage(updated);
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedMessage) return;
    setSavingNotes(true);
    try {
      const updated = await updateMessageRecord(
        selectedMessage.id,
        selectedMessage.status,
        adminNotes
      );
      setMessages((prev) =>
        prev.map((m) => (m.id === selectedMessage.id ? updated : m))
      );
      setSelectedMessage(updated);
    } catch (err) {
      console.error("Failed to save notes:", err);
    } finally {
      setSavingNotes(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteMessageRecord(id);
      setMessages((prev) => prev.filter((m) => m.id !== id));
      if (selectedMessage?.id === id) setSelectedMessage(null);
      setDeletingId(null);
    } catch (err) {
      console.error("Failed to delete message:", err);
    }
  };

  const handleExportJSON = () => {
    const jsonStr = JSON.stringify(messages, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `portfolio-inquiries-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center font-mono text-sm text-[#00c8ff]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-7 w-7 animate-spin rounded-full border-2 border-[#00c8ff] border-t-transparent" />
          <span>Loading contact inquiries...</span>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "ALL", label: "All Messages", count: counts.all },
    { id: "UNREAD", label: "Unread", count: counts.unread },
    { id: "READ", label: "Read", count: counts.read },
    { id: "REPLIED", label: "Replied", count: counts.replied },
    { id: "ARCHIVED", label: "Archived", count: counts.archived },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1e2d3d] pb-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#00c8ff]">
            Visitor Communications
          </span>
          <h1 className="mt-1 text-2xl sm:text-3xl font-bold text-[#e6edf3]">
            Inquiries Inbox
          </h1>
          <p className="mt-1 text-xs text-[#8899a6]">
            Review, reply to, and organize direct inquiries from portfolio visitors.
          </p>
        </div>

        <button
          type="button"
          onClick={handleExportJSON}
          className="flex items-center gap-2 border border-[#2a3a49] bg-[#0d1117] px-4 py-2 font-mono text-xs text-[#8899a6] hover:border-[#00c8ff] hover:text-[#00c8ff] transition-colors"
        >
          <span>📥 Export Inquiries (JSON)</span>
        </button>
      </div>

      {/* Tabs and Search Bar */}
      <div className="space-y-4">
        {/* Status Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-[#1e2d3d] pb-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 border px-3.5 py-1.5 font-mono text-xs transition-all cursor-pointer ${
                activeTab === tab.id
                  ? "border-[#00c8ff] bg-[#00c8ff]/10 text-[#00c8ff] font-bold"
                  : "border-[#2a3a49] bg-[#0d1117] text-[#8899a6] hover:text-[#e6edf3]"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`rounded px-1.5 py-0.2 text-[10px] ${
                  tab.id === "UNREAD" && tab.count > 0
                    ? "bg-amber-400 text-black font-bold"
                    : "bg-[#1e2d3d] text-[#8899a6]"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="flex items-center justify-between gap-4 border border-[#1e2d3d] bg-[#0d1117] p-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search inquiries by sender, email, subject, or message content..."
            className="w-full bg-transparent px-2 font-mono text-xs text-[#e6edf3] placeholder-[#485b6a] focus:outline-none"
          />
          <span className="font-mono text-xs text-[#5c6f7f] shrink-0">
            {filteredMessages.length} found
          </span>
        </div>
      </div>

      {/* Messages List */}
      {filteredMessages.length === 0 ? (
        <div className="border border-[#1e2d3d] bg-[#0d1117] p-12 text-center font-mono">
          <p className="text-sm text-[#8899a6]">No messages in this folder or matching your search.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredMessages.map((msg) => (
            <div
              key={msg.id}
              onClick={() => handleOpenDetail(msg)}
              className={`border p-4 transition-all cursor-pointer ${
                msg.status === "UNREAD"
                  ? "border-amber-400/50 bg-amber-400/5 hover:border-amber-400"
                  : "border-[#1e2d3d] bg-[#0d1117] hover:border-[#00c8ff]/40"
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  {msg.status === "UNREAD" && (
                    <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping" />
                  )}
                  <span className="font-bold text-sm text-[#e6edf3]">{msg.name}</span>
                  <span className="font-mono text-xs text-[#5c6f7f]">
                    &lt;{msg.email}&gt;
                  </span>
                </div>

                <div className="flex items-center gap-3 font-mono text-xs">
                  <span className="text-[#5c6f7f]">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </span>

                  <span
                    className={`font-mono text-[10px] px-2 py-0.5 rounded ${
                      msg.status === "UNREAD"
                        ? "bg-amber-400/20 text-amber-300 font-bold border border-amber-400/30"
                        : msg.status === "REPLIED"
                        ? "bg-emerald-400/20 text-emerald-300 border border-emerald-400/30"
                        : msg.status === "ARCHIVED"
                        ? "bg-gray-700 text-gray-300"
                        : "bg-blue-400/20 text-blue-300 border border-blue-400/30"
                    }`}
                  >
                    {msg.status}
                  </span>
                </div>
              </div>

              <h4 className="mt-2 text-sm font-semibold text-[#00c8ff]">
                {msg.subject}
              </h4>

              <p className="mt-1 line-clamp-2 text-xs text-[#8899a6] leading-relaxed">
                {msg.message}
              </p>

              {msg.adminNotes && (
                <div className="mt-2 flex items-center gap-2 font-mono text-[11px] text-amber-300/80 bg-amber-400/5 px-2 py-1 border border-amber-400/20">
                  <span>📌 Note:</span>
                  <span className="truncate">{msg.adminNotes}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Message Detail & Reply Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 sm:p-4 backdrop-blur-sm">
          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto border border-[#1e2d3d] bg-[#0d1117] p-4 sm:p-6 shadow-2xl">
            <button
              type="button"
              onClick={() => setSelectedMessage(null)}
              className="absolute top-4 right-4 text-[#8899a6] hover:text-[#e6edf3]"
            >
              ✕
            </button>

            {/* Header info */}
            <div className="border-b border-[#1e2d3d] pb-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs uppercase tracking-wider text-[#00c8ff]">
                  Inquiry Detail
                </span>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#1e2d3d] text-[#8899a6]">
                  {selectedMessage.status}
                </span>
              </div>

              <h2 className="mt-2 text-xl font-bold text-[#e6edf3]">
                {selectedMessage.subject}
              </h2>

              <div className="mt-3 grid gap-1 font-mono text-xs text-[#8899a6] sm:grid-cols-2">
                <p>
                  From:{" "}
                  <span className="font-bold text-[#e6edf3]">
                    {selectedMessage.name}
                  </span>
                </p>
                <p>
                  Email:{" "}
                  <a
                    href={`mailto:${selectedMessage.email}`}
                    className="text-[#00c8ff] hover:underline"
                  >
                    {selectedMessage.email}
                  </a>
                </p>
                <p>
                  Received:{" "}
                  <span className="text-[#e6edf3]">
                    {new Date(selectedMessage.createdAt).toLocaleString()}
                  </span>
                </p>
                <p>
                  ID: <span className="text-[#5c6f7f]">{selectedMessage.id.slice(0, 8)}...</span>
                </p>
              </div>
            </div>

            {/* Full Message Body */}
            <div className="mt-4">
              <label className="mb-2 block font-mono text-xs text-[#5c6f7f]">
                Message Content:
              </label>
              <div className="max-h-64 overflow-y-auto border border-[#1e2d3d] bg-[#080c10] p-4 text-xs leading-relaxed text-[#e6edf3] whitespace-pre-wrap font-sans">
                {selectedMessage.message}
              </div>
            </div>

            {/* Admin Notes */}
            <div className="mt-4">
              <div className="mb-1.5 flex items-center justify-between font-mono text-xs">
                <label className="text-[#8899a6]">Internal Notes (Admin Only):</label>
                <button
                  type="button"
                  onClick={handleSaveNotes}
                  disabled={savingNotes}
                  className="text-[#00c8ff] hover:underline cursor-pointer"
                >
                  {savingNotes ? "Saving..." : "Save Notes"}
                </button>
              </div>
              <textarea
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder="e.g. Sent response on LinkedIn; Follow up next Tuesday..."
                rows={2}
                className="w-full border border-[#2a3a49] bg-[#080c10] px-3 py-2 font-mono text-xs text-[#e6edf3] placeholder-[#485b6a] focus:border-[#00c8ff] focus:outline-none"
              />
            </div>

            {/* Status change and Action Buttons */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[#1e2d3d] pt-4 font-mono text-xs">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[#5c6f7f]">Status:</span>
                {["UNREAD", "READ", "REPLIED", "ARCHIVED"].map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => handleUpdateStatus(st)}
                    className={`border px-2.5 py-1 text-[11px] transition-colors cursor-pointer ${
                      selectedMessage.status === st
                        ? "border-[#00c8ff] bg-[#00c8ff]/10 text-[#00c8ff] font-bold"
                        : "border-[#2a3a49] bg-[#161b22] text-[#8899a6] hover:text-[#e6edf3]"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(
                    selectedMessage.subject
                  )}&body=Hi ${encodeURIComponent(selectedMessage.name)},%0D%0A%0D%0AThank you for reaching out!%0D%0A%0D%0ABest regards,%0D%0ATharusha Sangeeth`}
                  onClick={() => handleUpdateStatus("REPLIED")}
                  className="border border-[#00c8ff] bg-[#00c8ff] px-4 py-2 font-bold text-[#080c10] hover:bg-[#00b5e6] transition-colors"
                >
                  ✉️ Reply via Email
                </a>

                <button
                  type="button"
                  onClick={() => setDeletingId(selectedMessage.id)}
                  className="border border-rose-950 bg-rose-950/20 px-3 py-2 text-rose-400 hover:bg-rose-950/40 transition-colors"
                >
                  🗑️
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      {deletingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-sm border border-rose-900/50 bg-[#0d1117] p-6 shadow-2xl">
            <h3 className="font-bold text-[#e6edf3]">Delete this inquiry?</h3>
            <p className="mt-2 text-xs text-[#8899a6]">
              This inquiry message will be permanently deleted from the database.
            </p>
            <div className="mt-4 flex justify-end gap-3 font-mono text-xs">
              <button
                type="button"
                onClick={() => setDeletingId(null)}
                className="border border-[#2a3a49] bg-[#161b22] px-3 py-1.5 text-[#8899a6]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDelete(deletingId)}
                className="border border-rose-600 bg-rose-600 px-3 py-1.5 font-bold text-white hover:bg-rose-500"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
