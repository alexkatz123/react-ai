"use client";

export function useConfirm(message = "Are you sure?") {
  return () => (typeof window !== "undefined" ? window.confirm(message) : true);
}

