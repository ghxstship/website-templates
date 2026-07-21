"use client";

import { useState } from "react";
import Link from "next/link";
import type { Show } from "@/lib/types";

const REGIONS: { key: string; label: string }[] = [
  { key: "all", label: "All" },
  { key: "na", label: "N. America" },
  { key: "eu", label: "Europe" },
  { key: "as", label: "Asia" },
];

const STATUS: Record<
  Show["status"],
  { cta: string; cls: string; sold: boolean }
> = {
  on: { cta: "Tickets", cls: "btn-primary", sold: false },
  low: { cta: "Few left", cls: "btn-primary", sold: false },
  sold: { cta: "Sold out", cls: "btn-secondary", sold: true },
};

export function TourTable({ shows }: { shows: Show[] }) {
  const [region, setRegion] = useState("all");
  const filtered = shows.filter((s) => region === "all" || s.region === region);

  return (
    <>
      <section className="wrap" style={{ paddingBlock: "24px 12px" }}>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {REGIONS.map((r) => {
            const active = region === r.key;
            return (
              <button
                key={r.key}
                type="button"
                className="btn"
                onClick={() => setRegion(r.key)}
                style={{
                  padding: "8px 16px",
                  border: "1px solid var(--color-divider)",
                  background: active ? "var(--color-text)" : "transparent",
                  color: active ? "var(--color-bg)" : "var(--color-text)",
                }}
              >
                {r.label}
              </button>
            );
          })}
        </div>
      </section>

      <section
        className="wrap"
        style={{ paddingBlock: "12px clamp(48px, 6vw, 88px)" }}
      >
        {filtered.map((show) => {
          const st = STATUS[show.status];
          return (
            <div
              key={show.id}
              className="row-line"
              style={{
                display: "grid",
                gridTemplateColumns:
                  "130px minmax(0, 1fr) minmax(0, 1.2fr) auto",
                gap: 20,
                alignItems: "center",
                paddingBlock: 22,
                borderTop: "2px solid var(--color-divider)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 800,
                  fontSize: 15,
                  letterSpacing: "0.02em",
                  textTransform: "uppercase",
                }}
              >
                {show.date_label}
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 800,
                    fontSize: 19,
                  }}
                >
                  {show.city}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: "color-mix(in srgb, var(--color-text) 60%, transparent)",
                    marginTop: 4,
                  }}
                >
                  {show.country}
                </div>
              </div>
              <div
                className="row-venue"
                style={{
                  fontSize: 14,
                  color: "color-mix(in srgb, var(--color-text) 72%, transparent)",
                }}
              >
                {show.venue}
              </div>
              {st.sold ? (
                <button type="button" className={`btn ${st.cls}`} style={{ padding: "9px 18px" }} disabled>
                  {st.cta}
                </button>
              ) : (
                <Link href="/ticketing/events" className={`btn ${st.cls}`} style={{ padding: "9px 18px", textDecoration: "none" }}>
                  {st.cta}
                </Link>
              )}
            </div>
          );
        })}
      </section>
    </>
  );
}
