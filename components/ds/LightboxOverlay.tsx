"use client";

import { useEffect, useRef } from "react";
import { Placeholder } from "@/components/Placeholder";
import { PlayIcon, CloseIcon } from "@/components/icons";

/**
 * Shared full-screen lightbox overlay (grayscale photo or video-poster).
 * Single source of truth for both the context-driven <Lightbox> and the
 * self-contained <PhotoGallery>. Handles Escape-to-close, backdrop click, and
 * dialog semantics.
 */
export function LightboxOverlay({
  caption,
  variant = "photo",
  onClose,
}: {
  caption: string;
  variant?: "photo" | "video";
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={caption}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 90,
        background: "color-mix(in srgb, var(--color-text) 92%, transparent)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(20px, 5vw, 64px)",
      }}
    >
      <div onClick={(e) => e.stopPropagation()} style={{ width: "min(1000px, 100%)", maxHeight: "100%" }}>
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
          <button ref={closeRef} type="button" className="btn btn-icon" onClick={onClose} aria-label="Close" style={{ color: "var(--color-bg)" }}>
            <CloseIcon size={22} />
          </button>
        </div>
        <div className="grayscale" style={{ background: "var(--color-bg)", aspectRatio: "16/9", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
          {variant === "video" ? (
            <span style={{ width: 84, height: 84, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--color-accent)", color: "var(--color-bg)" }}>
              <PlayIcon size={34} />
            </span>
          ) : (
            <Placeholder label={caption} />
          )}
        </div>
        <div style={{ color: "var(--color-bg)", fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 18, marginTop: 16 }}>{caption}</div>
      </div>
    </div>
  );
}
