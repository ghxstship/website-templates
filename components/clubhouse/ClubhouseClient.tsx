"use client";

import { useState } from "react";
import Link from "next/link";
import { Placeholder } from "@/components/Placeholder";
import { EVENTS, EVENT_CATS, SPACES, PLANS, type ClubEvent } from "@/lib/clubhouse";
import { useClubhouse } from "./ClubhouseContext";

/** Tier display only — applications/billing are owned by Membership OS (/membership). */
export function JoinPlans() {
  return (
    <div className="grid3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, background: "var(--color-divider)", border: "2px solid var(--color-divider)" }}>
      {PLANS.map((pl) => {
        const featured = pl.key === "full";
        return (
          <div key={pl.key} style={{ background: featured ? "var(--color-accent)" : "var(--color-bg)", color: featured ? "var(--color-bg)" : "var(--color-text)", padding: "clamp(24px, 3vw, 40px)", display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.8, marginBottom: 16 }}>{pl.tagline}</div>
            <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 26, margin: "0 0 8px" }}>{pl.name}</h3>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 22 }}><span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(30px, 4vw, 44px)" }}>{pl.price}</span><span style={{ fontSize: 14, opacity: 0.7 }}>{pl.per}</span></div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28, flex: 1 }}>
              {pl.perks.map((pk) => <div key={pk} style={{ display: "flex", gap: 10, alignItems: "baseline", fontSize: 14, lineHeight: 1.4 }}><span style={{ fontWeight: 800 }}>—</span><span>{pk}</span></div>)}
            </div>
            <Link href="/membership" className="btn" style={{ padding: "12px 20px", textDecoration: "none", justifyContent: "center", background: featured ? "var(--color-bg)" : "var(--color-accent)", color: featured ? "var(--color-accent)" : "var(--color-bg)", border: 0 }}>Apply for {pl.name} ↗</Link>
          </div>
        );
      })}
    </div>
  );
}

const UP = "var(--color-up)";

function eventView(ev: ClubEvent, going: boolean) {
  const full = ev.cap === 0 && !going;
  const spots = full ? "Waitlist" : going ? "Going" : `${ev.cap} left`;
  const spotsColor = full ? "var(--color-accent-700)" : going ? UP : "color-mix(in srgb, var(--color-text) 60%, transparent)";
  const cta = going ? "Cancel" : full ? "Waitlist" : "RSVP";
  return { full, spots, spotsColor, cta, btnClass: going ? "btn-secondary" : "btn-primary" };
}

export function UpcomingList() {
  const { isGoing, toggleRsvp } = useClubhouse();
  return (
    <>
      {EVENTS.slice(0, 4).map((ev) => {
        const going = isGoing(ev.id);
        const v = eventView(ev, going);
        return (
          <div key={ev.id} className="row-line" style={{ display: "grid", gridTemplateColumns: "120px minmax(0, 1fr) minmax(0, 0.7fr) auto", gap: 18, alignItems: "center", padding: "18px 0", borderTop: "2px solid var(--color-divider)" }}>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 15, textTransform: "uppercase" }}>{ev.date}</div>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(17px, 2vw, 22px)" }}>{ev.title}</div>
            <div className="row-sub"><span className="tag tag-outline">{ev.type}</span></div>
            <button type="button" className={`btn ${v.btnClass}`} onClick={() => toggleRsvp(ev.id, ev.title)} disabled={v.full} style={{ padding: "8px 16px" }}>{v.cta}</button>
          </div>
        );
      })}
    </>
  );
}

export function CalendarList() {
  const { isGoing, toggleRsvp } = useClubhouse();
  const [cat, setCat] = useState("all");
  const rows = EVENTS.filter((e) => cat === "all" || e.type === cat);
  return (
    <>
      <section className="wrap" style={{ paddingBlock: "20px 8px" }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {EVENT_CATS.map((c) => (
            <button key={c} type="button" onClick={() => setCat(c)} className="btn" style={{ padding: "8px 16px", border: "1px solid var(--color-divider)", background: cat === c ? "var(--color-text)" : "transparent", color: cat === c ? "var(--color-bg)" : "var(--color-text)" }}>{c === "all" ? "All" : c}</button>
          ))}
        </div>
      </section>
      <section className="wrap" style={{ paddingBlock: "12px clamp(48px, 6vw, 80px)" }}>
        {rows.map((ev) => {
          const going = isGoing(ev.id);
          const v = eventView(ev, going);
          return (
            <div key={ev.id} className="row-line" style={{ display: "grid", gridTemplateColumns: "130px minmax(0, 1fr) minmax(0, 0.8fr) auto auto", gap: 18, alignItems: "center", padding: "20px 0", borderTop: "2px solid var(--color-divider)" }}>
              <div><div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 15, textTransform: "uppercase" }}>{ev.date}</div><div style={{ fontSize: 12, color: "color-mix(in srgb, var(--color-text) 55%, transparent)", marginTop: 3 }}>{ev.time}</div></div>
              <div><div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(17px, 2vw, 22px)" }}>{ev.title}</div><div style={{ fontSize: 13, color: "color-mix(in srgb, var(--color-text) 60%, transparent)", marginTop: 4 }}>{ev.host}</div></div>
              <div className="row-sub"><span className="tag tag-outline">{ev.type}</span></div>
              <div style={{ fontSize: 13, color: v.spotsColor }}>{v.spots}</div>
              <button type="button" className={`btn ${v.btnClass}`} onClick={() => toggleRsvp(ev.id, ev.title)} disabled={v.full} style={{ padding: "9px 18px" }}>{v.cta}</button>
            </div>
          );
        })}
      </section>
    </>
  );
}

export function SpacesList() {
  const { openBook } = useClubhouse();
  return (
    <>
      {SPACES.map((s) => (
        <div key={s.name} className="split2" style={{ display: "grid", gridTemplateColumns: "minmax(0, 0.55fr) minmax(0, 1fr)", gap: "clamp(24px, 4vw, 56px)", alignItems: "center", paddingBlock: "clamp(24px, 3vw, 40px)", borderTop: "2px solid var(--color-divider)" }}>
          <figure className="grayscale" style={{ margin: 0, aspectRatio: "4/3", border: "2px solid var(--color-divider)" }}><Placeholder label={s.name} /></figure>
          <div>
            <div style={{ display: "flex", gap: 24, marginBottom: 12, flexWrap: "wrap" }}><span className="tag tag-neutral">{s.cap}</span><span style={{ fontSize: 13, color: "color-mix(in srgb, var(--color-text) 60%, transparent)" }}>{s.rate}</span></div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(22px, 3vw, 34px)", letterSpacing: "-0.015em", margin: "0 0 12px" }}>{s.name}</h2>
            <p style={{ fontSize: 15.5, lineHeight: 1.6, margin: "0 0 18px", maxWidth: "52ch", color: "color-mix(in srgb, var(--color-text) 80%, transparent)" }}>{s.desc}</p>
            <button type="button" className="btn btn-primary" onClick={() => openBook(s.name)} style={{ padding: "10px 20px" }}>Book this space</button>
          </div>
        </div>
      ))}
    </>
  );
}

