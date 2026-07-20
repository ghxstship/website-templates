"use client";

import type { Video } from "@/lib/types";
import { useLightbox } from "@/components/lightbox/LightboxContext";
import { Placeholder } from "@/components/Placeholder";
import { PlayIcon } from "@/components/icons";

export function VideoGrid({ videos }: { videos: Video[] }) {
  const { open } = useLightbox();
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
        gap: 2,
        background: "var(--color-divider)",
        border: "2px solid var(--color-divider)",
      }}
    >
      {videos.map((v) => (
        <div
          key={v.id}
          onClick={() => open({ type: "video", caption: v.title, slot: v.id })}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              open({ type: "video", caption: v.title, slot: v.id });
            }
          }}
          style={{ background: "var(--color-bg)", cursor: "pointer" }}
        >
          <figure
            className="grayscale"
            style={{ margin: 0, position: "relative", aspectRatio: "16/9" }}
          >
            <Placeholder label="Video still" />
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: "none",
              }}
            >
              <span
                style={{
                  width: 62,
                  height: 62,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "var(--color-accent)",
                  color: "var(--color-bg)",
                }}
              >
                <PlayIcon size={24} />
              </span>
            </div>
          </figure>
          <div style={{ padding: "18px 20px 22px" }}>
            <h3
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 800,
                fontSize: 20,
                margin: "0 0 6px",
              }}
            >
              {v.title}
            </h3>
            <div
              style={{
                fontSize: 13,
                color: "color-mix(in srgb, var(--color-text) 60%, transparent)",
              }}
            >
              {v.meta}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
