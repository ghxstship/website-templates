"use client";

import { HeartIcon } from "@/components/icons";

/**
 * Favorite toggle. `overlay` renders it as an absolute chip on a card figure;
 * otherwise it's an inline button. Always stops propagation so it never
 * triggers a parent row/card open handler.
 */
export function SaveHeart({
  active,
  onToggle,
  overlay = false,
  size = 18,
  label = "Save",
}: {
  active: boolean;
  onToggle: () => void;
  overlay?: boolean;
  size?: number;
  label?: string;
}) {
  const base: React.CSSProperties = overlay
    ? {
        position: "absolute",
        top: 10,
        right: 10,
        width: 34,
        height: 34,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "color-mix(in srgb, var(--color-bg) 88%, transparent)",
        border: "1px solid var(--color-divider)",
        cursor: "pointer",
        color: active ? "var(--color-accent)" : "var(--color-text)",
        zIndex: 1,
      }
    : {
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        background: "none",
        border: 0,
        padding: 0,
        cursor: "pointer",
        color: active ? "var(--color-accent)" : "color-mix(in srgb, var(--color-text) 60%, transparent)",
      };
  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={active ? "Remove from favorites" : label}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onToggle();
      }}
      style={base}
    >
      <HeartIcon size={size} style={{ fill: active ? "var(--color-accent)" : "none" }} />
    </button>
  );
}
