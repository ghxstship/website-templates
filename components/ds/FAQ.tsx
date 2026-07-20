"use client";

import { useState } from "react";

/** FAQ accordion — one open at a time, +/− sign, 2px top rule per item. */
export function FAQ({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i} style={{ borderTop: "2px solid var(--color-divider)" }}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
                padding: "20px 0",
                background: "transparent",
                border: 0,
                cursor: "pointer",
                textAlign: "left",
                fontFamily: "var(--font-heading)",
                fontWeight: 800,
                fontSize: "clamp(17px, 2vw, 21px)",
                color: "var(--color-text)",
              }}
            >
              <span>{item.q}</span>
              <span
                aria-hidden
                style={{
                  color: "var(--color-accent)",
                  fontSize: 22,
                  lineHeight: 1,
                  flex: "0 0 auto",
                }}
              >
                {isOpen ? "–" : "+"}
              </span>
            </button>
            {isOpen ? (
              <p
                style={{
                  margin: 0,
                  padding: "0 0 22px",
                  fontSize: 16,
                  lineHeight: 1.6,
                  maxWidth: "72ch",
                  color: "color-mix(in srgb, var(--color-text) 78%, transparent)",
                }}
              >
                {item.a}
              </p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
