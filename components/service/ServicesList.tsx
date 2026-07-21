"use client";

import { useState } from "react";
import Link from "next/link";
import { SERVICES, SVC_CATS, SERVICE } from "@/lib/service";
import { useFavorites } from "@/lib/useFavorites";
import { SaveHeart } from "@/components/ds/SaveHeart";

export function ServicesList() {
  const [cat, setCat] = useState("all");
  const [showSaved, setShowSaved] = useState(false);
  const fav = useFavorites("service", "Service");

  let rows = SERVICES.filter((s) => cat === "all" || s.cat === cat);
  if (showSaved) rows = rows.filter((s) => fav.isSaved(s.name));

  return (
    <>
      <section className="wrap" style={{ paddingBlock: "20px 8px" }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {SVC_CATS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c)}
              className="btn"
              style={{
                padding: "8px 16px",
                border: "1px solid var(--color-divider)",
                background: cat === c ? "var(--color-text)" : "transparent",
                color: cat === c ? "var(--color-bg)" : "var(--color-text)",
              }}
            >
              {c === "all" ? "All" : c}
            </button>
          ))}
        </div>
      </section>
      <section className="wrap" style={{ paddingBlock: "4px 0" }}>
        <button
          type="button"
          onClick={() => setShowSaved((v) => !v)}
          className={`btn ${showSaved ? "btn-primary" : "btn-secondary"}`}
          style={{ padding: "8px 16px", border: "1px solid var(--color-divider)" }}
        >
          {showSaved ? `Showing saved · ${fav.count}` : `Saved · ${fav.count}`}
        </button>
      </section>
      <section className="wrap" style={{ paddingBlock: "12px clamp(48px, 6vw, 80px)" }}>
        {showSaved && rows.length === 0 ? (
          <p style={{ fontSize: 16, color: "color-mix(in srgb, var(--color-text) 60%, transparent)", padding: "8px 0 16px" }}>
            No saved services yet. Tap the heart on any service.
          </p>
        ) : null}
        {rows.map((s) => (
          <div
            key={s.name}
            className="row-line"
            style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.5fr) auto minmax(0, 0.5fr) auto", gap: 18, alignItems: "center", padding: "18px 0", borderTop: "2px solid var(--color-divider)" }}
          >
            <div>
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(17px, 2vw, 22px)" }}>{s.name}</div>
              <div style={{ fontSize: 13, color: "color-mix(in srgb, var(--color-text) 62%, transparent)", marginTop: 4, maxWidth: "52ch" }}>{s.desc}</div>
            </div>
            <div className="row-sub" style={{ fontSize: 13, color: "color-mix(in srgb, var(--color-text) 58%, transparent)" }}>{s.dur}</div>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 17, color: "var(--color-accent)" }}>${s.num}</div>
            <div style={{ display: "flex", gap: 8, alignItems: "center", justifyContent: "flex-end" }}>
              <SaveHeart active={fav.isSaved(s.name)} onToggle={() => fav.toggle(s.name, s.name)} label="Save service" size={15} />
              <Link href={SERVICE.bookHref} className="btn btn-primary" style={{ padding: "9px 18px", textDecoration: "none" }}>Book</Link>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
