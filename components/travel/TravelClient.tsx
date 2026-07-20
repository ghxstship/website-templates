"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { MenuIcon } from "@/components/icons";
import { Placeholder } from "@/components/Placeholder";
import { useTravel } from "./TravelContext";
import { TRAVEL, NAV, MODES, FIELD_SETS, RESULTS, RESULTS_SUMMARY, MODE_TITLE, TOURS, type Mode } from "@/lib/travel";

export function TravelHeader() {
  const pathname = usePathname();
  const [menu, setMenu] = useState(false);
  const active = (p: string) => (p === "/travel" ? pathname === p : pathname.startsWith(p));
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 60, background: "var(--color-bg)", borderBottom: "2px solid var(--color-divider)" }}>
      <div className="wrap" style={{ display: "flex", alignItems: "center", gap: 26, height: 74 }}>
        <Link href="/travel" onClick={() => setMenu(false)} style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 20, letterSpacing: "-0.01em", textDecoration: "none", color: "var(--color-text)", textTransform: "uppercase", marginRight: "auto" }}>{TRAVEL.brand}</Link>
        <nav className="desk-nav" style={{ marginLeft: 0 }}>
          {NAV.filter((n) => n.path !== "/travel").map((n) => <Link key={n.path} href={n.path} className="nav-link" aria-current={active(n.path) ? "page" : undefined}>{n.label}</Link>)}
        </nav>
        <Link href="/travel/trips" className="btn btn-secondary desk-nav" style={{ padding: "8px 14px" }}>My trips</Link>
        <Link href="/travel" className="btn btn-primary" style={{ padding: "9px 16px", flex: "0 0 auto" }}>Book now</Link>
        <button type="button" className="burger btn btn-icon" onClick={() => setMenu((v) => !v)} aria-label="Menu"><MenuIcon size={20} /></button>
      </div>
      <div className={`mob-menu${menu ? " open" : ""}`} style={{ borderTop: "2px solid var(--color-divider)" }}>
        <div className="wrap" style={{ display: "flex", flexDirection: "column", paddingBlock: "12px 18px" }}>
          {NAV.map((n) => <Link key={n.path} href={n.path} onClick={() => setMenu(false)} style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 18, textTransform: "uppercase", textDecoration: "none", color: "var(--color-text)", padding: "12px 0", borderBottom: "1px solid var(--color-divider)" }}>{n.label}</Link>)}
        </div>
      </div>
    </header>
  );
}

export function BookingEngine() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("flights");
  const fs = FIELD_SETS[mode];
  return (
    <section className="wrap" style={{ paddingBottom: "clamp(32px, 4vw, 56px)" }}>
      <div style={{ border: "2px solid var(--color-divider)" }}>
        <div style={{ display: "flex", flexWrap: "wrap", borderBottom: "2px solid var(--color-divider)" }}>
          {MODES.map((m) => (
            <button key={m.key} type="button" onClick={() => setMode(m.key)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "16px 20px", background: mode === m.key ? "var(--color-text)" : "transparent", color: mode === m.key ? "var(--color-bg)" : "var(--color-text)", border: 0, borderRight: "1px solid var(--color-divider)", cursor: "pointer", fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 13, letterSpacing: "0.04em", textTransform: "uppercase" }}>{m.label}</button>
          ))}
        </div>
        <div style={{ padding: "clamp(20px, 3vw, 32px)" }}>
          <form className="searchgrid" onSubmit={(e) => { e.preventDefault(); router.push(`/travel/results?mode=${mode}`); }} style={{ display: "grid", gridTemplateColumns: fs.cols, gap: 16, alignItems: "end" }}>
            {fs.fields.map((f) => (
              <div key={f.label} className="field"><label>{f.label}</label><input className="input" type={f.type} defaultValue={f.value} placeholder={f.ph} style={{ minHeight: 44 }} /></div>
            ))}
            <button type="submit" className="btn btn-primary" style={{ minHeight: 44, padding: "12px 24px" }}>Search</button>
          </form>
        </div>
      </div>
    </section>
  );
}

export function ResultsClient({ mode }: { mode: Mode }) {
  const { openBooking } = useTravel();
  const [sort, setSort] = useState<"best" | "price" | "fast">("best");
  let results = RESULTS[mode] ?? [];
  if (sort === "price") results = [...results].sort((a, b) => a.num - b.num);

  return (
    <>
      <section className="wrap" style={{ paddingBlock: "20px 0" }}><Link href="/travel" className="btn btn-ghost" style={{ padding: "8px 4px" }}>← New search</Link></section>
      <section className="wrap" style={{ paddingBlock: "12px 24px" }}>
        <div className="kicker" style={{ marginBottom: 12 }}>{RESULTS_SUMMARY[mode]}</div>
        <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(32px, 5vw, 68px)", lineHeight: 0.95, letterSpacing: "-0.03em", margin: 0, textTransform: "uppercase" }}>{MODE_TITLE[mode]}</h1>
      </section>
      <hr className="rule" />
      <section className="wrap" style={{ paddingBlock: "20px 8px", display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
        <span className="eyebrow" style={{ marginRight: 6 }}>Sort</span>
        {(["best", "price", "fast"] as const).map((k) => <button key={k} type="button" onClick={() => setSort(k)} className={`chip${sort === k ? " active" : ""}`}>{k === "best" ? "Best" : k === "price" ? "Cheapest" : "Fastest"}</button>)}
      </section>
      <section className="wrap" style={{ paddingBlock: "12px clamp(48px, 6vw, 80px)" }}>
        {results.map((r, i) => (
          <div key={i} className="row-line" style={{ display: "grid", gridTemplateColumns: "96px minmax(0,1.4fr) minmax(0,1fr) auto auto", gap: 20, alignItems: "center", padding: "20px 0", borderTop: "2px solid var(--color-divider)" }}>
            <figure className="grayscale" style={{ margin: 0, width: 96, height: 72, border: "1px solid var(--color-divider)" }}><Placeholder /></figure>
            <div><div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(17px, 2vw, 22px)" }}>{r.title}</div><div style={{ fontSize: 13, color: "color-mix(in srgb, var(--color-text) 60%, transparent)", marginTop: 4 }}>{r.sub}</div></div>
            <div className="row-sub" style={{ fontSize: 14, color: "color-mix(in srgb, var(--color-text) 72%, transparent)" }}>{r.meta}</div>
            <div style={{ textAlign: "right" }}><div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 20, color: "var(--color-accent)" }}>${r.num}</div><div style={{ fontSize: 12, color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }}>{r.priceNote}</div></div>
            <button type="button" className="btn btn-primary" onClick={() => openBooking({ title: r.title, sub: r.sub, meta: r.meta, price: `$${r.num}`, mode: MODE_TITLE[mode] })} style={{ padding: "9px 18px" }}>Select</button>
          </div>
        ))}
      </section>
    </>
  );
}

export function ToursGrid() {
  const { openBooking } = useTravel();
  return (
    <section className="wrap" style={{ paddingBlock: "clamp(28px, 4vw, 48px) clamp(48px, 6vw, 80px)" }}>
      {TOURS.map((t) => (
        <div key={t.name} className="split2" style={{ display: "grid", gridTemplateColumns: "minmax(0,0.6fr) minmax(0,1fr)", gap: "clamp(24px, 4vw, 56px)", alignItems: "center", paddingBlock: "clamp(24px, 3vw, 40px)", borderTop: "2px solid var(--color-divider)" }}>
          <figure className="grayscale" style={{ margin: 0, aspectRatio: "4/3", border: "2px solid var(--color-divider)" }}><Placeholder label={t.name} /></figure>
          <div>
            <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 12 }}><span className="tag tag-accent">{t.length}</span><span style={{ fontSize: 13, color: "color-mix(in srgb, var(--color-text) 60%, transparent)" }}>{t.region}</span></div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(22px, 3vw, 34px)", letterSpacing: "-0.015em", margin: "0 0 12px" }}>{t.name}</h2>
            <p style={{ fontSize: 15.5, lineHeight: 1.6, margin: "0 0 18px", maxWidth: "52ch", color: "color-mix(in srgb, var(--color-text) 80%, transparent)" }}>{t.desc}</p>
            <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
              <div><span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 22, color: "var(--color-accent)" }}>${t.num}</span> <span style={{ fontSize: 13, color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }}>per person</span></div>
              <button type="button" className="btn btn-primary" onClick={() => openBooking({ title: t.name, sub: `${t.length} · ${t.region}`, meta: "Small group", price: `$${t.num}`, mode: "Tour" })} style={{ padding: "10px 20px" }}>Reserve a place</button>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

export function TripsList() {
  const { trips } = useTravel();
  if (trips.length === 0) {
    return <p style={{ fontSize: 16, color: "color-mix(in srgb, var(--color-text) 60%, transparent)", padding: "20px 0" }}>No trips booked yet. <Link href="/travel">Start a search →</Link></p>;
  }
  return (
    <>
      {trips.map((t, i) => (
        <div key={i} className="row-line" style={{ display: "grid", gridTemplateColumns: "130px minmax(0,1fr) minmax(0,1fr) auto", gap: 18, alignItems: "center", padding: "20px 0", borderTop: "2px solid var(--color-divider)" }}>
          <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 14, textTransform: "uppercase" }}>{t.mode}</div>
          <div className="row-sub" style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 17 }}>{t.title}</div>
          <div style={{ fontSize: 14, color: "color-mix(in srgb, var(--color-text) 62%, transparent)" }}>{t.detail}</div>
          <span className="tag tag-outline">{t.ref}</span>
        </div>
      ))}
    </>
  );
}
