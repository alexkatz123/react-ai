"use client";

export function ModePill({ label, className }: { label: string; className: string }) {
  return (
    <div
      className={`rounded-full border px-3 py-1 text-sm text-center ${className}`}
    >
      {label}
    </div>
  );
}
