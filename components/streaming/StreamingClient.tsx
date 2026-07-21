"use client";

import { useState } from "react";
import Link from "next/link";
import { Placeholder } from "@/components/Placeholder";
import { PlayIcon, LockIcon } from "@/components/icons";
import { useStreaming } from "./StreamingContext";
import { MEDIA, TYPE_CHIPS, TYPE_LABELS, TYPE_WORDS, CREATORS, PLANS, type Media, type MediaType } from "@/lib/streaming";

function MediaCard({ m }: { m: Media }) {
  const { hasAccess } = useStreaming();
  const locked = m.locked && !hasAccess(m);
  return (
    <Link href={`/streaming/media/${m.id}`} style={{ cursor: "pointer", textDecoration: "none", color: "var(--color-text)" }}>
      <figure className="grayscale" style={{ margin: "0 0 12px", aspectRatio: m.ratio, border: "2px solid var(--color-divider)", position: "relative" }}>
        <Placeholder />
        <span style={{ position: "absolute", top: 8, left: 8, background: "var(--color-text)", color: "var(--color-bg)", fontSize: 10, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", padding: "3px 7px" }}>{TYPE_LABELS[m.type]}</span>
        {locked ? <span style={{ position: "absolute", top: 8, right: 8, width: 26, height: 26, background: "var(--color-accent)", color: "var(--color-bg)", display: "flex", alignItems: "center", justifyContent: "center" }}><LockIcon size={13} /></span> : null}
        <span style={{ position: "absolute", bottom: 8, left: 8, width: 34, height: 34, background: "color-mix(in srgb, var(--color-text) 82%, transparent)", color: "var(--color-bg)", display: "flex", alignItems: "center", justifyContent: "center" }}><PlayIcon size={16} /></span>
      </figure>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 8, alignItems: "baseline" }}>
        <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 15, margin: 0 }}>{m.title}</h3>
        {locked ? <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 13, color: "var(--color-accent)" }}>${m.num}</span> : null}
      </div>
      <div style={{ fontSize: 12, color: "color-mix(in srgb, var(--color-text) 58%, transparent)", marginTop: 3 }}>{m.creator} · {m.meta}</div>
    </Link>
  );
}

export function ContinueWatching() {
  const { continueWatching, play } = useStreaming();
  if (continueWatching.length === 0) return null;
  const rows = continueWatching.map((w) => MEDIA.find((m) => m.title === w.title) ?? { id: w.title, title: w.title, creator: w.creator, type: "video" as MediaType, ratio: "16/9", meta: "Resume", num: 0, locked: false });
  return (
    <section className="wrap" style={{ paddingBlock: "clamp(20px, 3vw, 32px) 4px" }}>
      <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(20px, 2.4vw, 30px)", letterSpacing: "-0.015em", margin: "0 0 16px", textTransform: "uppercase" }}>Continue watching</h2>
      <div style={{ display: "grid", gridAutoFlow: "column", gridAutoColumns: "minmax(200px, 1fr)", gap: 16, overflowX: "auto", paddingBottom: 8 }}>
        {rows.map((m) => (
          <button key={m.id} type="button" onClick={() => play({ title: m.title, creator: m.creator })} style={{ background: "var(--color-bg)", border: 0, padding: 0, cursor: "pointer", textAlign: "left", color: "inherit", font: "inherit" }}>
            <figure className="grayscale" style={{ margin: "0 0 12px", aspectRatio: "16/9", border: "2px solid var(--color-divider)", position: "relative" }}>
              <Placeholder label={m.title} />
              <span style={{ position: "absolute", bottom: 8, left: 8, width: 34, height: 34, background: "var(--color-accent)", color: "var(--color-bg)", display: "flex", alignItems: "center", justifyContent: "center" }}><PlayIcon size={16} /></span>
              <span style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 4, background: "color-mix(in srgb, var(--color-text) 20%, transparent)" }}><span style={{ display: "block", height: "100%", width: "45%", background: "var(--color-accent)" }} /></span>
            </figure>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 15 }}>{m.title}</div>
            <div style={{ fontSize: 12, color: "color-mix(in srgb, var(--color-text) 58%, transparent)", marginTop: 3 }}>{m.creator} · Resume</div>
          </button>
        ))}
      </div>
    </section>
  );
}

export function MediaGrid() {
  const [type, setType] = useState<MediaType | "all">("all");
  const shown = MEDIA.filter((m) => type === "all" || m.type === type);
  return (
    <>
      <section className="wrap" style={{ paddingBlock: "20px 8px" }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {TYPE_CHIPS.map((t) => <button key={t} type="button" onClick={() => setType(t)} className={`chip${type === t ? " active" : ""}`}>{t === "all" ? "All" : TYPE_LABELS[t]}</button>)}
        </div>
      </section>
      <section className="wrap" style={{ paddingBlock: "16px clamp(48px, 6vw, 80px)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: "clamp(14px, 2vw, 24px)" }}>
          {shown.map((m) => <MediaCard key={m.id} m={m} />)}
        </div>
      </section>
    </>
  );
}

export function MediaDetail({ media }: { media: Media }) {
  const { hasAccess, subscribe, buy, play, download } = useStreaming();
  const access = hasAccess(media);
  const gated = media.locked && !access;
  const creator = CREATORS.find((c) => c.name === media.creator);
  const playable = access && (media.type === "audio" || media.type === "video");
  const downloadable = access && media.type !== "video";
  const desc = "Released on RESONANT. " + (media.type === "audio" ? "Lossless streaming for members; buy to download the files." : media.type === "video" ? "Stream in up to 4K." : media.type === "image" ? "Browse the full set; buy for print-resolution downloads." : "Preview, then download the complete package.");
  const playLabel = media.type === "audio" ? "Play" : media.type === "video" ? "Watch" : media.type === "image" ? "View set" : "Open";

  return (
    <>
      <section className="wrap" style={{ paddingBlock: "20px 0" }}><Link href="/streaming/browse" className="btn btn-ghost" style={{ padding: "8px 4px" }}>← Browse</Link></section>
      <section className="wrap split2" style={{ paddingBlock: "16px clamp(40px, 5vw, 64px)", display: "grid", gridTemplateColumns: "minmax(0,1.4fr) minmax(0,0.8fr)", gap: "clamp(28px, 5vw, 56px)", alignItems: "start" }}>
        <div>
          <div style={{ position: "relative", border: "2px solid var(--color-divider)", aspectRatio: "16/9", background: "var(--color-text)" }}>
            <div className="grayscale" style={{ position: "absolute", inset: 0 }}><Placeholder /></div>
            {playable ? (
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <button type="button" onClick={() => play({ title: media.title, creator: media.creator })} className="btn" style={{ width: 72, height: 72, background: "var(--color-accent)", color: "var(--color-bg)", padding: 0 }}><PlayIcon size={28} /></button>
              </div>
            ) : null}
            {gated ? (
              <div style={{ position: "absolute", inset: 0, background: "color-mix(in srgb, var(--color-text) 82%, transparent)", color: "var(--color-bg)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, padding: 24, textAlign: "center" }}>
                <LockIcon size={34} />
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 20 }}>Premium content</div>
                <div style={{ fontSize: 14, maxWidth: "34ch", opacity: 0.85 }}>Subscribe to {media.creator} or buy this {TYPE_WORDS[media.type]} to unlock.</div>
              </div>
            ) : null}
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 18, flexWrap: "wrap" }}><span className="tag tag-neutral">{TYPE_LABELS[media.type]}</span><span style={{ fontSize: 13, color: "color-mix(in srgb, var(--color-text) 60%, transparent)" }}>{media.meta}</span></div>
          <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(26px, 3.6vw, 44px)", lineHeight: 1.02, letterSpacing: "-0.02em", margin: "12px 0" }}>{media.title}</h1>
          <p style={{ fontSize: 15.5, lineHeight: 1.6, margin: 0, maxWidth: "60ch", color: "color-mix(in srgb, var(--color-text) 82%, transparent)" }}>{desc}</p>
        </div>
        <div style={{ border: "2px solid var(--color-divider)" }}>
          <div style={{ padding: 20, borderBottom: "2px solid var(--color-divider)", display: "flex", gap: 12, alignItems: "center" }}>
            <figure className="grayscale" style={{ margin: 0, width: 48, height: 48, border: "1px solid var(--color-divider)", flex: "0 0 auto" }}><Placeholder /></figure>
            <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 15 }}>{media.creator}</div><div style={{ fontSize: 12, color: "color-mix(in srgb, var(--color-text) 58%, transparent)" }}>{creator?.meta}</div></div>
          </div>
          <div style={{ padding: 20 }}>
            {gated ? (
              <>
                <button type="button" className="btn btn-primary" onClick={() => subscribe(media.creator, creator?.sub ?? 5)} style={{ width: "100%", justifyContent: "center", padding: "13px 20px", marginBottom: 10 }}>Subscribe · ${creator?.sub ?? 5}/mo</button>
                <button type="button" className="btn btn-secondary" onClick={() => buy(media.title)} style={{ width: "100%", justifyContent: "center", padding: "13px 20px" }}>Buy this {TYPE_WORDS[media.type]} · ${media.num}</button>
              </>
            ) : (
              <>
                <button type="button" className="btn btn-primary" onClick={() => (playable ? play({ title: media.title, creator: media.creator }) : download(media.title))} style={{ width: "100%", justifyContent: "center", padding: "13px 20px", marginBottom: 10 }}>{playLabel}</button>
                {downloadable ? <button type="button" className="btn btn-secondary" onClick={() => download(media.title)} style={{ width: "100%", justifyContent: "center", padding: "13px 20px" }}>Download</button> : null}
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export function CreatorsGrid() {
  const { subs, subscribe } = useStreaming();
  return (
    <section className="wrap" style={{ paddingBlock: "clamp(24px, 3vw, 44px) clamp(48px, 6vw, 80px)" }}>
      <div className="grid3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "clamp(16px, 2vw, 28px)" }}>
        {CREATORS.map((c) => {
          const subscribed = subs.has(c.name);
          return (
            <div key={c.name} style={{ border: "2px solid var(--color-divider)", display: "flex", flexDirection: "column" }}>
              <figure className="grayscale" style={{ margin: 0, aspectRatio: "3/2", borderBottom: "2px solid var(--color-divider)" }}><Placeholder /></figure>
              <div style={{ padding: 18, flex: 1, display: "flex", flexDirection: "column" }}>
                <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 19, margin: "0 0 4px" }}>{c.name}</h3>
                <div style={{ fontSize: 12, color: "color-mix(in srgb, var(--color-text) 58%, transparent)", marginBottom: 10 }}>{c.meta}</div>
                <p style={{ fontSize: 13.5, lineHeight: 1.5, margin: "0 0 16px", flex: 1, color: "color-mix(in srgb, var(--color-text) 72%, transparent)" }}>{c.bio}</p>
                <button type="button" onClick={() => !subscribed && subscribe(c.name, c.sub)} className={subscribed ? "btn btn-secondary" : "btn btn-primary"} style={{ justifyContent: "center", padding: "11px 18px" }}>{subscribed ? "Subscribed" : `Subscribe · $${c.sub}/mo`}</button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function Plans() {
  const { joinPlan } = useStreaming();
  return (
    <section className="wrap" style={{ paddingBlock: "clamp(24px, 3vw, 44px) clamp(48px, 6vw, 80px)" }}>
      <div className="grid3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, background: "var(--color-divider)", border: "2px solid var(--color-divider)" }}>
        {PLANS.map((pl) => {
          const f = pl.featured;
          return (
            <div key={pl.key} style={{ background: f ? "var(--color-accent)" : "var(--color-bg)", color: f ? "var(--color-bg)" : "var(--color-text)", padding: "clamp(24px, 3vw, 40px)", display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.8, marginBottom: 16 }}>{pl.tagline}</div>
              <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 28, margin: "0 0 8px" }}>{pl.name}</h3>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 22 }}><span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(32px, 4vw, 46px)" }}>{pl.price}</span><span style={{ fontSize: 14, opacity: 0.7 }}>{pl.per}</span></div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28, flex: 1 }}>{pl.perks.map((pk) => <div key={pk} style={{ display: "flex", gap: 10, alignItems: "baseline", fontSize: 14, lineHeight: 1.4 }}><span style={{ fontWeight: 800 }}>—</span><span>{pk}</span></div>)}</div>
              <button type="button" onClick={() => joinPlan(pl.name, pl.prem)} className={f ? "btn" : "btn btn-primary"} style={{ padding: "12px 20px", ...(f ? { background: "var(--color-bg)", color: "var(--color-accent)" } : {}) }}>{pl.key === "free" ? "Current plan" : `Choose ${pl.name}`}</button>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function Library() {
  const { subs, purchased, premium } = useStreaming();
  const items = MEDIA.filter((m) => purchased.has(m.title) || (m.locked && (subs.has(m.creator) || premium)));
  return (
    <section className="wrap" style={{ paddingBlock: "clamp(24px, 3vw, 44px) clamp(48px, 6vw, 80px)" }}>
      <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 22, margin: "0 0 18px" }}>Unlocked &amp; purchased</h2>
      {items.length === 0 ? (
        <p style={{ fontSize: 16, color: "color-mix(in srgb, var(--color-text) 60%, transparent)", padding: "16px 0" }}>Nothing unlocked yet. <Link href="/streaming/browse">Browse the catalogue →</Link></p>
      ) : items.map((m) => (
        <Link key={m.id} href={`/streaming/media/${m.id}`} style={{ display: "grid", gridTemplateColumns: "88px minmax(0,1fr) auto auto", gap: 18, alignItems: "center", padding: "16px 0", borderTop: "2px solid var(--color-divider)", textDecoration: "none", color: "var(--color-text)" }}>
          <figure className="grayscale" style={{ margin: 0, width: 88, height: 56, border: "1px solid var(--color-divider)" }}><Placeholder /></figure>
          <div><div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 16 }}>{m.title}</div><div style={{ fontSize: 13, color: "color-mix(in srgb, var(--color-text) 58%, transparent)" }}>{m.creator} · {TYPE_LABELS[m.type]}</div></div>
          <span className="tag tag-accent">{purchased.has(m.title) ? "Purchased" : premium ? "Premium" : "Subscribed"}</span>
          <span className="btn btn-primary" style={{ padding: "8px 16px" }}>Open</span>
        </Link>
      ))}
    </section>
  );
}
