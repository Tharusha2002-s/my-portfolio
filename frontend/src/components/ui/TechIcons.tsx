import React from "react";

export function PythonIcon({ className = "w-4 h-4 shrink-0" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path
        d="M11.92 1.5c-5.4 0-5.07 2.34-5.07 2.34l.06 2.42h5.19v.73H4.4S1.5 6.6 1.5 12c0 5.4 2.54 5.23 2.54 5.23h1.52v-2.14s-.08-2.54 2.5-2.54h5.12s2.38.04 2.38-2.38V4.02s.32-2.52-3.64-2.52zm-2.8 1.57c.52 0 .94.42.94.94 0 .52-.42.94-.94.94-.52 0-.94-.42-.94-.94 0-.52.42-.94.94-.94z"
        fill="#3776AB"
      />
      <path
        d="M12.08 22.5c5.4 0 5.07-2.34 5.07-2.34l-.06-2.42h-5.19v-.73h7.7s2.9-.39 2.9-5.79c0-5.4-2.54-5.23-2.54-5.23h-1.52v2.14s.08 2.54-2.5 2.54h-5.12s-2.38-.04-2.38 2.38v5.15s-.32 2.52 3.64 2.52zm2.8-1.57c-.52 0-.94-.42-.94-.94 0-.52.42-.94.94-.94.52 0 .94.42.94.94 0 .52-.42.94-.94.94z"
        fill="#FFD438"
      />
    </svg>
  );
}

export function NextjsIcon({ className = "w-8 h-8 shrink-0" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="11" fill="#000000" />
      <path
        d="M15.5 17.5L8.7 8.7h-.2v6.6h1.4v-4.8l5.6 7zM14.1 8.7h1.4v4.4l-1.4-1.8z"
        fill="#ffffff"
      />
    </svg>
  );
}

export function TypeScriptIcon({ className = "w-4 h-4 shrink-0" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="4" fill="#3178C6" />
      <path
        fill="#fff"
        d="M4.5 13.5h3.6V19H10v-5.5h3.6V11H4.5v2.5zm11.7 1.8c.8 0 1.4-.2 1.9-.6.5-.4.7-1 .7-1.7 0-.7-.3-1.2-.8-1.6-.5-.4-1.2-.7-2.1-.9-.9-.3-1.5-.6-1.8-.9-.3-.3-.5-.7-.5-1.2 0-.6.2-1 .7-1.4.5-.4 1.1-.5 1.9-.5.7 0 1.3.2 1.8.5.5.3.8.8.9 1.4h-1.8c-.1-.3-.2-.5-.4-.6-.2-.1-.5-.2-.9-.2-.4 0-.8.1-1 .3-.2.2-.3.5-.3.8 0 .3.1.5.3.7.2.2.6.4 1.2.6 1 .4 1.8.8 2.2 1.3.4.5.7 1.1.7 1.8 0 .8-.3 1.5-.9 2-.6.5-1.4.8-2.4.8-1 0-1.8-.3-2.4-.8-.6-.5-.9-1.2-1-2h1.8c.1.5.3.8.6 1 .3.2.7.3 1.3.3z"
      />
    </svg>
  );
}

export function ReactIcon({ className = "w-4 h-4 shrink-0" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <ellipse cx="12" cy="12" rx="10" ry="4.2" stroke="#00D8FF" strokeWidth="1.5" />
      <ellipse
        cx="12"
        cy="12"
        rx="10"
        ry="4.2"
        stroke="#00D8FF"
        strokeWidth="1.5"
        transform="rotate(60 12 12)"
      />
      <ellipse
        cx="12"
        cy="12"
        rx="10"
        ry="4.2"
        stroke="#00D8FF"
        strokeWidth="1.5"
        transform="rotate(120 12 12)"
      />
      <circle cx="12" cy="12" r="1.8" fill="#00D8FF" />
    </svg>
  );
}

export function DockerIcon({ className = "w-4 h-4 shrink-0" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#2496ED">
      <path d="M13.98 10.37h2.15v2.15H13.98zm-2.83 0h2.15v2.15h-2.15zm-2.84 0h2.15v2.15H8.31zm-2.83 0h2.15v2.15H5.48zm5.67-2.84h2.15v2.15h-2.15zm-2.84 0h2.15v2.15H8.31zm-2.83 0h2.15v2.15H5.48zm5.67-2.83h2.15v2.15h-2.15zm8.9 6.2c-.44-.28-1.46-.37-2.3-.23-.1-.66-.48-1.25-1.02-1.67l-.46-.35-.35.45c-.48.62-.64 1.45-.48 2.22-.44.25-.97.43-1.6.43H1.47a.47.47 0 0 0-.47.47c.07 1.83.67 3.58 1.74 4.98 1.43 1.88 3.53 3.02 5.92 3.2 5.7.43 10.58-3.08 11.96-8.23.63.07 1.77.06 2.38-.57l.38-.4-.44-.37c-.36-.3-.92-.61-1.56-.69z" />
    </svg>
  );
}

export function PostgresIcon({ className = "w-4 h-4 shrink-0" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#336791">
      <path d="M12.18 2.5a9.7 9.7 0 0 0-4.66 1.2c-.38.22-.52.68-.33 1.07.19.4.65.55 1.05.35a8.2 8.2 0 0 1 3.94-1.02c4.46 0 8.1 3.49 8.1 7.78 0 3.05-1.85 5.75-4.64 7.02-.4.18-.58.65-.4 1.05.18.4.65.58 1.05.4a9.66 9.66 0 0 0 5.59-8.47c0-5.18-4.38-9.38-9.7-9.38zm-5.4 3.7c-.42 0-.82.1-1.18.28A6.85 6.85 0 0 0 2.2 12.3c0 2.92 1.82 5.46 4.47 6.44.42.15.87-.06 1.03-.48.15-.41-.06-.87-.48-1.02a5.35 5.35 0 0 1-3.42-4.94 5.34 5.34 0 0 1 2.66-4.58c.28-.14.59-.22.92-.22.44 0 .8.36.8.8v6.4c0 .44.36.8.8.8s.8-.36.8-.8V7c0-.44-.36-.8-.8-.8z" />
    </svg>
  );
}

export function NodeIcon({ className = "w-4 h-4 shrink-0" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#5FA04E">
      <path d="M12 2l9 5.2v10.4l-9 5.2-9-5.2V7.2L12 2zm0 2.3L4.8 8.4v7.2L12 19.7l7.2-4.1V8.4L12 4.3z" />
      <circle cx="12" cy="12" r="3" fill="#5FA04E" />
    </svg>
  );
}

export function TailwindIcon({ className = "w-4 h-4 shrink-0" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#06B6D4">
      <path d="M12 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.9.2 1.6.9 2.3 1.6 1.4 1.4 2.8 2.8 5.7 2.8 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.9-.2-1.6-.9-2.3-1.6C16.3 6.2 15 4.8 12 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.9.2 1.6.9 2.3 1.6 1.4 1.4 2.8 2.8 5.7 2.8 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.9-.2-1.6-.9-2.3-1.6C10.3 13.4 9 12 6 12z" />
    </svg>
  );
}

export function HetznerIcon({ className = "w-4 h-4 shrink-0" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="4" fill="#D50C2D" />
      <path fill="#fff" d="M5.5 5.5h3.4v5.1h6.2V5.5h3.4v13h-3.4v-5.1H8.9v5.1H5.5v-13z" />
    </svg>
  );
}

