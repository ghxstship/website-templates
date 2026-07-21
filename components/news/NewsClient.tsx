"use client";

import { useState } from "react";
import Link from "next/link";
import { Placeholder } from "@/components/Placeholder";
import { PhotoGallery } from "@/components/ds/PhotoGallery";
import { ARTICLES, SECTIONS, VIDEOS, NEWSLETTERS } from "@/lib/news";

export function SectionBrowser() {
  const [sec, setSec] = useState("all");
  const shown = ARTICLES.filter((a) => sec === "all" || a.section === sec);
  return (
    <>
      <section className="wrap" style={{ paddingBlock: "20px 8px" }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {["all", ...SECTIONS].map((s) => <button key={s} type="button" onClick={() => setSec(s)} className={`chip${sec === s ? " active" : ""}`}>{s === "all" ? "All" : s}</button>)}
        </div>
      </section>
      <section className="wrap" style={{ paddingBlock: "12px clamp(48px, 6vw, 80px)" }}>
        {shown.map((a) => (
          <Link key={a.id} href={`/news/article/${a.id}`} className="lead" style={{ display: "grid", gridTemplateColumns: "minmax(0,0.4fr) minmax(0,1fr)", gap: "clamp(20px, 3vw, 40px)", alignItems: "center", paddingBlock: 22, borderTop: "2px solid var(--color-divider)", textDecoration: "none", color: "var(--color-text)" }}>
            <figure className="grayscale" style={{ margin: 0, aspectRatio: "3/2", border: "2px solid var(--color-divider)" }}><Placeholder /></figure>
            <div>
              <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 10 }}><span className="tag tag-accent">{a.section}</span><span style={{ fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase", color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }}>{a.time}</span></div>
              <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(20px, 2.6vw, 30px)", lineHeight: 1.08, letterSpacing: "-0.015em", margin: "0 0 10px" }}>{a.title}</h2>
              <p style={{ fontSize: 15, lineHeight: 1.55, margin: 0, maxWidth: "60ch", color: "color-mix(in srgb, var(--color-text) 78%, transparent)" }}>{a.excerpt}</p>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}

export function ArticleActions() {
  const [saved, setSaved] = useState(false);
  const share = () => { try { navigator.clipboard?.writeText(location.href); } catch { /* noop */ } };
  return (
    <div style={{ display: "flex", gap: 10 }}>
      <button type="button" onClick={() => setSaved((s) => !s)} className="btn btn-secondary" style={{ padding: "7px 14px", fontSize: 12 }}>{saved ? "Saved" : "Save"}</button>
      <button type="button" onClick={share} className="btn btn-secondary" style={{ padding: "7px 14px", fontSize: 12 }}>Share</button>
    </div>
  );
}

export function VideoGrid() {
  return <PhotoGallery items={VIDEOS.map((v) => ({ caption: `${v.title} · ${v.length}`, ratio: "16/9" }))} minWidth={320} />;
}

export function NewsletterCards() {
  const [subs, setSubs] = useState<Set<string>>(new Set());
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "clamp(16px, 2vw, 28px)" }}>
      {NEWSLETTERS.map((n) => {
        const subbed = subs.has(n.name);
        return (
          <div key={n.name} style={{ border: "2px solid var(--color-divider)", padding: 24, display: "flex", flexDirection: "column" }}>
            <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 20, margin: "0 0 6px" }}>{n.name}</h3>
            <div style={{ fontSize: 12, color: "color-mix(in srgb, var(--color-text) 58%, transparent)", marginBottom: 12 }}>{n.cadence}</div>
            <p style={{ fontSize: 14, lineHeight: 1.55, margin: "0 0 18px", flex: 1, color: "color-mix(in srgb, var(--color-text) 72%, transparent)" }}>{n.desc}</p>
            <button type="button" onClick={() => setSubs((s) => { const x = new Set(s); if (x.has(n.name)) x.delete(n.name); else x.add(n.name); return x; })} className={subbed ? "btn btn-secondary" : "btn btn-primary"} style={{ justifyContent: "center", padding: "11px 18px" }}>{subbed ? "Subscribed" : "Subscribe"}</button>
          </div>
        );
      })}
    </div>
  );
}
