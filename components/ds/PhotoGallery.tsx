"use client";

import { useState } from "react";
import { Placeholder } from "@/components/Placeholder";
import { LightboxOverlay } from "@/components/ds/LightboxOverlay";

export type GalleryTile = { caption: string; ratio: string };

/** Grayscale tile grid with a built-in lightbox. Reused across templates. */
export function PhotoGallery({ items, minWidth = 240 }: { items: GalleryTile[]; minWidth?: number }) {
  const [active, setActive] = useState<GalleryTile | null>(null);

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

      {active ? <LightboxOverlay caption={active.caption} onClose={() => setActive(null)} /> : null}
    </>
  );
}
