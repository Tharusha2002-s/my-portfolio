"use client";

export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => {
        if (typeof window !== "undefined") {
          window.print();
        }
      }}
      className="border border-[#00c8ff] bg-[#00c8ff] px-4 py-2 font-mono text-xs font-medium text-[#080c10] transition-all hover:bg-transparent hover:text-[#00c8ff]"
    >
      Print / Save PDF (Ctrl+P)
    </button>
  );
}
