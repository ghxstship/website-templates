"use client";

/** Write a message to the shared polite aria-live region (see A11yChrome). */
export function announce(message: string): void {
  if (typeof document === "undefined") return;
  const live = document.getElementById("sk-live");
  if (!live) return;
  live.textContent = "";
  live.textContent = String(message ?? "");
}
