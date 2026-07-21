"use client";

import { useState } from "react";
import { Placeholder } from "@/components/Placeholder";
import { SaveHeart } from "@/components/ds/SaveHeart";
import { useFavorites } from "@/lib/useFavorites";
import { captureMessage } from "@/lib/actions";
import {
  MODE_DEFS, FIELD_SETS, MODE_NOTES, RESULT_SETS, RESULTS_TITLES,
  FLEET, CAT_LIST, EMPTY_LEGS, TIERS, type Mode,
} from "@/lib/charter";
import { useCharter } from "./CharterContext";

export function RequestEngine({ showNote = true }: { showNote?: boolean }) {
  const { requestQuote } = useCharter();
  const [mode, setMode] = useState<Mode>("jets");
  const [shown, setShown] = useState(false);
  const results = RESULT_SETS[mode];

  return (
    <>
      <div style={{ border: "2px solid var(--color-divider)" }}>
        <div style={{ display: "flex", flexWrap: "wrap", borderBottom: "2px solid var(--color-divider)" }}>
          {MODE_DEFS.map((m) => (
            <button key={m.key} type="button" onClick={() => { setMode(m.key); setShown(false); }} style={{ display: "flex", alignItems: "center", gap: 8, padding: "16px 22px", background: mode === m.key ? "var(--color-accent)" : "transparent", color: mode === m.key ? "var(--color-bg)" : "var(--color-text)", border: 0, borderRight: "1px solid var(--color-divider)", cursor: "pointer", fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 13, letterSpacing: "0.04em", textTransform: "uppercase" }}>{m.label}</button>
          ))}
        </div>
        <div style={{ padding: "clamp(20px, 3vw, 32px)" }}>
          <div className="searchgrid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, alignItems: "end" }}>
            {FIELD_SETS[mode].map(([label, ph], i) => (
              <div key={i} className="field"><label>{label}</label><input className="input" placeholder={ph} /></div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 20, flexWrap: "wrap", alignItems: "center" }}>
            <button type="button" className="btn btn-primary" onClick={() => setShown(true)} style={{ padding: "12px 22px" }}>Search availability</button>
            {showNote ? <span style={{ fontSize: 13, color: "color-mix(in srgb, var(--color-text) 58%, transparent)" }}>{MODE_NOTES[mode]}</span> : null}
          </div>
        </div>
      </div>
      {shown ? (
        <div style={{ marginTop: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 18 }}>
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(22px, 3vw, 34px)", letterSpacing: "-0.02em", margin: 0, textTransform: "uppercase" }}>{RESULTS_TITLES[mode]}</h2>
            <span style={{ fontSize: 13, color: "color-mix(in srgb, var(--color-text) 58%, transparent)" }}>{results.length} options</span>
          </div>
          <div style={{ border: "2px solid var(--color-divider)" }}>
            {results.map((r) => (
              <div key={r.name} style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) auto", gap: 16, padding: "18px 22px", borderBottom: "1px solid var(--color-divider)", alignItems: "center" }}>
                <div>
                  <div style={{ display: "flex", gap: 8, marginBottom: 6 }}><span className="tag tag-outline">{r.class}</span><span className="tag tag-neutral">{r.cap}</span></div>
                  <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 18, margin: "0 0 4px" }}>{r.name}</h3>
                  <p style={{ fontSize: 13.5, margin: 0, color: "color-mix(in srgb, var(--color-text) 72%, transparent)" }}>{r.spec}</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ textAlign: "right" }}><div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 20, color: "var(--color-accent)" }}>{r.price}</div><div style={{ fontSize: 11, textTransform: "uppercase", color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }}>{r.priceUnit}</div></div>
                  <button type="button" className="btn btn-primary" onClick={() => requestQuote(r.name)} style={{ padding: "10px 18px" }}>Request</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}

export function FleetGrid() {
  const fav = useFavorites("charter", "Aircraft");
  const [cat, setCat] = useState("all");
  const [showSaved, setShowSaved] = useState(false);
  let rows = FLEET.filter((f) => cat === "all" || f.category === cat);
  if (showSaved) rows = rows.filter((f) => fav.isSaved(f.slug));
  return (
    <>
      <section className="wrap" style={{ paddingBlock: "20px 8px" }}>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {CAT_LIST.map(([k, label]) => (
            <button key={k} type="button" onClick={() => setCat(k)} className="btn" style={{ padding: "8px 16px", border: `1px solid ${cat === k ? "var(--color-accent)" : "var(--color-divider)"}`, background: cat === k ? "var(--color-accent)" : "transparent", color: cat === k ? "var(--color-bg)" : "var(--color-text)" }}>{label}</button>
          ))}
        </div>
      </section>
      <section className="wrap" style={{ paddingBlock: "4px 0" }}>
        <button type="button" onClick={() => setShowSaved((v) => !v)} className={`btn ${showSaved ? "btn-primary" : "btn-secondary"}`} style={{ padding: "8px 16px", border: "1px solid var(--color-divider)" }}>{showSaved ? `Showing favorites · ` : `Favorites · `}</button>
      </section>
      <section className="wrap" style={{ paddingBlock: "20px clamp(48px, 6vw, 80px)" }}>
        {showSaved && rows.length === 0 ? <p style={{ fontSize: 16, color: "color-mix(in srgb, var(--color-text) 60%, transparent)", padding: "8px 0 16px" }}>No favorites yet. Tap the heart on any listing.</p> : null}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 2, background: "var(--color-divider)", border: "2px solid var(--color-divider)" }}>
          {rows.map((f) => (
            <div key={f.slug} style={{ background: "var(--color-bg)", display: "flex", flexDirection: "column" }}>
              <figure className="grayscale" style={{ margin: 0, aspectRatio: "3/2", borderBottom: "2px solid var(--color-divider)", position: "relative" }}>
                <Placeholder label={f.name} />
                <SaveHeart overlay active={fav.isSaved(f.slug)} onToggle={() => fav.toggle(f.slug, f.name)} label="Save aircraft" size={17} />
              </figure>
              <div style={{ padding: "18px 20px 22px", flex: 1, display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", gap: 8, marginBottom: 8 }}><span className="tag tag-accent">{f.category}</span></div>
                <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 18, margin: "0 0 6px" }}>{f.name}</h3>
                <p style={{ fontSize: 13.5, lineHeight: 1.5, margin: "0 0 14px", flex: 1, color: "color-mix(in srgb, var(--color-text) 74%, transparent)" }}>{f.spec}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--color-divider)", paddingTop: 12 }}>
                  <span style={{ fontSize: 12, color: "color-mix(in srgb, var(--color-text) 58%, transparent)" }}>{f.cap}</span>
                  <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, color: "var(--color-accent)" }}>{f.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export function EmptyLegsTable() {
  const { notify } = useCharter();
  return (
    <table className="table">
      <thead><tr><th>Route</th><th>Date</th><th>Aircraft</th><th>Seats</th><th style={{ textAlign: "right" }}>From</th><th></th></tr></thead>
      <tbody>
        {EMPTY_LEGS.map((e) => (
          <tr key={e.route}>
            <td style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}>{e.route}</td>
            <td>{e.date}</td><td>{e.craft}</td><td>{e.seats}</td>
            <td style={{ textAlign: "right", color: "var(--color-accent)", fontFamily: "var(--font-heading)", fontWeight: 800 }}>{e.price}</td>
            <td style={{ textAlign: "right" }}><button type="button" className="btn btn-primary" onClick={() => notify({ kicker: "Empty leg held", title: "Leg reserved", body: `${e.route} on ${e.date} is held for 30 minutes. The desk will call to confirm cards and catering.` })} style={{ padding: "6px 14px", fontSize: 12 }}>Book leg</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function MembershipTiers() {
  const { notify } = useCharter();
  return (
    <div className="grid3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, background: "var(--color-divider)", border: "2px solid var(--color-divider)" }}>
      {TIERS.map((t) => (
        <div key={t.name} style={{ background: "var(--color-bg)", padding: "clamp(24px, 3vw, 36px)", display: "flex", flexDirection: "column" }}>
          <div style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-accent-700)" }}>{t.kicker}</div>
          <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 26, margin: "8px 0 4px" }}>{t.name}</h3>
          <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 34, color: "var(--color-accent)", marginBottom: 4 }}>{t.price}</div>
          <div style={{ fontSize: 12, color: "color-mix(in srgb, var(--color-text) 55%, transparent)", marginBottom: 18 }}>{t.unit}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
            {t.feats.map((ft) => <div key={ft} style={{ display: "flex", gap: 10, fontSize: 14, lineHeight: 1.4 }}><span style={{ color: "var(--color-accent)", flex: "0 0 auto" }}>—</span>{ft}</div>)}
          </div>
          <button type="button" className={`btn ${t.featured ? "btn-primary" : "btn-secondary"}`} onClick={() => notify({ kicker: "Application started", title: "Welcome aboard, almost", body: `Your ${t.name} application is in. An advisor will complete onboarding and issue your card within two business days.` })} style={{ justifyContent: "center", padding: "12px 18px", marginTop: 22 }}>{t.cta}</button>
        </div>
      ))}
    </div>
  );
}

export function ContactForm() {
  const { notify } = useCharter();
  const [pending, setPending] = useState(false);
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("ch-name") as HTMLInputElement)?.value ?? "";
    const email = (form.elements.namedItem("ch-email") as HTMLInputElement)?.value ?? "";
    const message = (form.elements.namedItem("ch-msg") as HTMLTextAreaElement)?.value ?? "";
    setPending(true);
    await captureMessage("charter", { name, email, subject: "Flight desk mission", message });
    setPending(false);
    form.reset();
    notify({ kicker: "Message sent", title: "The desk has your mission", body: "Thank you — an advisor will reach out shortly, 24/7. For anything urgent, call +1 (800) 555-0199." });
  };
  return (
    <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div className="field"><label htmlFor="ch-name">Full name</label><input id="ch-name" name="ch-name" className="input" required placeholder="Your name" /></div>
      <div className="field"><label htmlFor="ch-email">Email</label><input id="ch-email" name="ch-email" className="input" type="email" required placeholder="you@example.com" /></div>
      <div className="field"><label htmlFor="ch-msg">Mission details</label><textarea id="ch-msg" name="ch-msg" className="input" required placeholder="Where, when, how many, and any special requirements" /></div>
      <button type="submit" className="btn btn-primary" disabled={pending} style={{ padding: "13px 20px", justifyContent: "center" }}>{pending ? "Sending…" : "Send to the desk"}</button>
    </form>
  );
}
