"use client";

import type { GalleryItem } from "@/lib/types";
import { useLightbox } from "@/components/lightbox/LightboxContext";
import { Placeholder } from "@/components/Placeholder";

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const { open } = useLightbox();
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
        gap: 2,
        background: "var(--color-divider)",
        border: "2px solid var(--color-divider)",
      }}
    >
      {items.map((g) => (
        <figure
          key={g.id}
          onClick={() => open({ type: "photo", caption: g.caption, slot: g.id })}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              open({ type: "photo", caption: g.caption, slot: g.id });
            }
          }}
          className="grayscale"
          style={{
            margin: 0,
            aspectRatio: g.ratio,
            cursor: "pointer",
            background: "var(--color-bg)",
          }}
        >
          <Placeholder label={g.caption} />
        </figure>
      ))}
    </div>
  );
}
