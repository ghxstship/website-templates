"use client";

import { useEffect, useState } from "react";
import { Placeholder } from "@/components/Placeholder";
import { CloseIcon } from "@/components/icons";

export type GalleryTile = { caption: string; ratio: string };

/** Grayscale tile grid with a built-in lightbox. Reused across templates. */
export function PhotoGallery({ items, minWidth = 240 }: { items: GalleryTile[]; minWidth?: number }) {
  const [active, setActive] = useState<GalleryTile | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(auto-fill, minmax(${minWidth}px, 1fr))`, gap: 2, background: "var(--color-divider)", border: "2px solid var(--color-divider)" }}>
        {items.map((g, i) => (
          <figure
            key={i}
            onClick={() => setActive(g)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setActive(g); } }}
            className="grayscale"
            style={{ margin: 0, aspectRatio: g.ratio, cursor: "pointer", background: "var(--color-bg)" }}
          >
            <Placeholder label={g.caption} />
          </figure>
        ))}
      </div>

      {active ? (
        <div onClick={() => setActive(null)} style={{ position: "fixed", inset: 0, zIndex: 90, background: "color-mix(in srgb, var(--color-text) 92%, transparent)", display: "flex", alignItems: "center", justifyContent: "center", padding: "clamp(20px, 5vw, 64px)" }}>
          <div onClick={(e) => e.stopPropagation()} style={{ width: "min(1000px, 100%)" }}>
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
              <button type="button" className="btn btn-icon" onClick={() => setActive(null)} aria-label="Close" style={{ color: "var(--color-bg)" }}>
                <CloseIcon size={22} />
              </button>
            </div>
            <div className="grayscale" style={{ background: "var(--color-bg)", aspectRatio: "16/9", position: "relative" }}>
              <Placeholder label={active.caption} />
            </div>
            <div style={{ color: "var(--color-bg)", fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 18, marginTop: 16 }}>{active.caption}</div>
          </div>
        </div>
      ) : null}
    </>
  );
}
