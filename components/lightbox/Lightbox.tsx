"use client";

import { useEffect } from "react";
import { useLightbox } from "./LightboxContext";
import { Placeholder } from "@/components/Placeholder";
import { PlayIcon, CloseIcon } from "@/components/icons";

export function Lightbox() {
  const { item, close } = useLightbox();

  // Close on Escape
  useEffect(() => {
    if (!item) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [item, close]);

  if (!item) return null;

  return (
    <div
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-label={item.caption}
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
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ width: "min(1000px, 100%)", maxHeight: "100%" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: 12,
          }}
        >
          <button
            type="button"
            className="btn btn-icon"
            onClick={close}
            aria-label="Close"
            style={{ color: "var(--color-bg)" }}
          >
            <CloseIcon size={22} />
          </button>
        </div>
        <div
          style={{
            background: "var(--color-bg)",
            aspectRatio: "16/9",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {item.type === "video" ? (
            <span
              style={{
                width: 84,
                height: 84,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "var(--color-accent)",
                color: "var(--color-bg)",
              }}
            >
              <PlayIcon size={34} />
            </span>
          ) : (
            <div className="grayscale" style={{ position: "absolute", inset: 0 }}>
              <Placeholder label={item.caption} />
            </div>
          )}
        </div>
        <div
          style={{
            color: "var(--color-bg)",
            fontFamily: "var(--font-heading)",
            fontWeight: 800,
            fontSize: 18,
            marginTop: 16,
          }}
        >
          {item.caption}
        </div>
      </div>
    </div>
  );
}
