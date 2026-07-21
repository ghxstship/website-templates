"use client";

import { useState } from "react";
import { Placeholder } from "@/components/Placeholder";
import { SaveHeart } from "@/components/ds/SaveHeart";
import { useFavorites } from "@/lib/useFavorites";
import { TREATMENTS, TREATMENT_CATS, RETREATS, PLANS } from "@/lib/wellness";
import { useWellness } from "./WellnessContext";

export function FeaturedTreatments() {
  const { openBook } = useWellness();
  return (
    <div className="grid3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, background: "var(--color-divider)", border: "2px solid var(--color-divider)" }}>
      {TREATMENTS.slice(0, 3).map((t) => (
        <div key={t.name} style={{ background: "var(--color-bg)", display: "flex", flexDirection: "column" }}>
          <figure className="grayscale" style={{ margin: 0, aspectRatio: "4/3" }}><Placeholder label={t.name} /></figure>
          <div style={{ padding: "18px 20px 22px", flex: 1, display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}><h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 18, margin: 0 }}>{t.name}</h3><span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, color: "var(--color-accent)" }}>${t.num}</span></div>
            <div style={{ fontSize: 13, color: "color-mix(in srgb, var(--color-text) 60%, transparent)", margin: "6px 0 14px" }}>{t.dur}</div>
            <button type="button" className="btn btn-secondary" onClick={() => openBook(t.name)} style={{ justifyContent: "center", padding: "10px 16px", marginTop: "auto" }}>Book</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export function TreatmentsList() {
  const { openBook } = useWellness();
  const fav = useFavorites("wellness", "Treatment");
  const [cat, setCat] = useState("all");
  const [showSaved, setShowSaved] = useState(false);
  let rows = TREATMENTS.filter((t) => cat === "all" || t.cat === cat);
  if (showSaved) rows = rows.filter((t) => fav.isSaved(t.name));
  return (
    <>
      <section className="wrap" style={{ paddingBlock: "20px 8px" }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {TREATMENT_CATS.map((c) => (
            <button key={c} type="button" onClick={() => setCat(c)} className="btn" style={{ padding: "8px 16px", border: "1px solid var(--color-divider)", background: cat === c ? "var(--color-text)" : "transparent", color: cat === c ? "var(--color-bg)" : "var(--color-text)" }}>{c === "all" ? "All" : c}</button>
          ))}
        </div>
      </section>
      <section className="wrap" style={{ paddingBlock: "4px 0" }}>
        <button type="button" onClick={() => setShowSaved((v) => !v)} className={`btn ${showSaved ? "btn-primary" : "btn-secondary"}`} style={{ padding: "8px 16px", border: "1px solid var(--color-divider)" }}>{showSaved ? `Showing saved · ${fav.count}` : `Saved · ${fav.count}`}</button>
      </section>
      <section className="wrap" style={{ paddingBlock: "12px clamp(48px, 6vw, 80px)" }}>
        {showSaved && rows.length === 0 ? <p style={{ fontSize: 16, color: "color-mix(in srgb, var(--color-text) 60%, transparent)", padding: "16px 0" }}>No saved treatments yet. Tap the heart on any treatment.</p> : null}
        {rows.map((t) => (
          <div key={t.name} className="row-line" style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.5fr) auto minmax(0, 0.4fr) auto", gap: 18, alignItems: "center", padding: "18px 0", borderTop: "2px solid var(--color-divider)" }}>
            <div><div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(17px, 2vw, 22px)" }}>{t.name}</div><div style={{ fontSize: 13, color: "color-mix(in srgb, var(--color-text) 62%, transparent)", marginTop: 4, maxWidth: "52ch" }}>{t.desc}</div></div>
            <div className="row-sub" style={{ fontSize: 13, color: "color-mix(in srgb, var(--color-text) 58%, transparent)" }}>{t.dur}</div>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 17, color: "var(--color-accent)" }}>${t.num}</div>
            <div style={{ display: "flex", gap: 8, alignItems: "center", justifyContent: "flex-end" }}>
              <SaveHeart active={fav.isSaved(t.name)} onToggle={() => fav.toggle(t.name, t.name)} label="Save treatment" size={15} />
              <button type="button" className="btn btn-primary" onClick={() => openBook(t.name)} style={{ padding: "9px 18px" }}>Book</button>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}

export function RetreatsList() {
  const { openBook } = useWellness();
  return (
    <>
      {RETREATS.map((r) => (
        <div key={r.name} className="split2" style={{ display: "grid", gridTemplateColumns: "minmax(0, 0.6fr) minmax(0, 1fr)", gap: "clamp(24px, 4vw, 56px)", alignItems: "center", paddingBlock: "clamp(24px, 3vw, 40px)", borderTop: "2px solid var(--color-divider)" }}>
          <figure className="grayscale" style={{ margin: 0, aspectRatio: "4/3", border: "2px solid var(--color-divider)" }}><Placeholder label={r.name} /></figure>
          <div>
            <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 12, flexWrap: "wrap" }}><span className="tag tag-accent">{r.length}</span><span style={{ fontSize: 13, color: "color-mix(in srgb, var(--color-text) 60%, transparent)" }}>{r.dates}</span></div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(22px, 3vw, 34px)", letterSpacing: "-0.015em", margin: "0 0 12px" }}>{r.name}</h2>
            <p style={{ fontSize: 15.5, lineHeight: 1.6, margin: "0 0 18px", maxWidth: "52ch", color: "color-mix(in srgb, var(--color-text) 80%, transparent)" }}>{r.desc}</p>
            <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
              <div><span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 22, color: "var(--color-accent)" }}>${r.num.toLocaleString()}</span> <span style={{ fontSize: 13, color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }}>all-inclusive</span></div>
              <button type="button" className="btn btn-primary" onClick={() => openBook(r.name)} style={{ padding: "10px 20px" }}>Reserve a place</button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export function MembershipPlans() {
  const { joinPlan } = useWellness();
  return (
    <div className="grid3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, background: "var(--color-divider)", border: "2px solid var(--color-divider)" }}>
      {PLANS.map((pl) => {
        const featured = pl.key === "restore";
        return (
          <div key={pl.key} style={{ background: featured ? "var(--color-accent)" : "var(--color-bg)", color: featured ? "var(--color-bg)" : "var(--color-text)", padding: "clamp(24px, 3vw, 40px)", display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.8, marginBottom: 16 }}>{pl.tagline}</div>
            <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 26, margin: "0 0 8px" }}>{pl.name}</h3>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 22 }}><span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(30px, 4vw, 44px)" }}>{pl.price}</span><span style={{ fontSize: 14, opacity: 0.7 }}>{pl.per}</span></div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28, flex: 1 }}>
              {pl.perks.map((pk) => <div key={pk} style={{ display: "flex", gap: 10, alignItems: "baseline", fontSize: 14, lineHeight: 1.4 }}><span style={{ fontWeight: 800 }}>—</span><span>{pk}</span></div>)}
            </div>
            <button type="button" className="btn" onClick={() => joinPlan(pl.name)} style={{ padding: "12px 20px", background: featured ? "var(--color-bg)" : "var(--color-accent)", color: featured ? "var(--color-accent)" : "var(--color-bg)", border: 0 }}>Join {pl.name}</button>
          </div>
        );
      })}
    </div>
  );
}
