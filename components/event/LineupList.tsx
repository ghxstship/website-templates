"use client";

import { useState } from "react";
import { LINEUP_TIERS } from "@/lib/event";
import { useFavorites } from "@/lib/useFavorites";
import { HeartIcon } from "@/components/icons";

export function LineupList() {
  const [mine, setMine] = useState(false);
  const fav = useFavorites("event", "Act");

  return (
    <>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}>
        <button type="button" onClick={() => setMine(false)} className="btn" style={{ padding: "8px 16px", border: "1px solid var(--color-divider)", background: !mine ? "var(--color-text)" : "transparent", color: !mine ? "var(--color-bg)" : "var(--color-text)" }}>Full lineup</button>
        <button type="button" onClick={() => setMine(true)} className="btn" style={{ padding: "8px 16px", border: "1px solid var(--color-divider)", background: mine ? "var(--color-accent)" : "transparent", color: mine ? "var(--color-bg)" : "var(--color-text)" }}>My lineup · {fav.count}</button>
      </div>
      {mine && fav.count === 0 ? (
        <p style={{ fontSize: 16, color: "color-mix(in srgb, var(--color-text) 60%, transparent)", padding: "8px 0 16px" }}>Your lineup is empty. Tap the heart on any act to build your schedule.</p>
      ) : null}
      {LINEUP_TIERS.map((tier) => {
        const acts = mine ? tier.acts.filter((a) => fav.isSaved(a)) : tier.acts;
        if (mine && acts.length === 0) return null;
        return (
          <div key={tier.label} style={{ marginBottom: "clamp(36px, 5vw, 64px)" }}>
            <div className="eyebrow" style={{ marginBottom: 20, paddingBottom: 12, borderBottom: "2px solid var(--color-divider)" }}>{tier.label}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px 28px", alignItems: "center" }}>
              {acts.map((a) => {
                const liked = fav.isSaved(a);
                return (
                  <button
                    key={a}
                    type="button"
                    onClick={() => fav.toggle(a, a)}
                    aria-pressed={liked}
                    style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "none", border: 0, padding: 0, cursor: "pointer", color: liked ? "var(--color-accent)" : "var(--color-text)", fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: tier.size, letterSpacing: "-0.02em", lineHeight: 1.05 }}
                  >
                    {a}
                    <HeartIcon size={Math.max(14, parseInt(tier.size) / 2)} style={{ fill: liked ? "var(--color-accent)" : "none", flex: "0 0 auto" }} />
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
}
