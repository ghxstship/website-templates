"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon } from "@/components/icons";
import { QtyStepper } from "@/components/ds/QtyStepper";
import { useTicketing, TIER_MULT } from "./TicketingContext";
import { TICKETING, NAV, EVENTS, EVENT_CATS, TICKET_TIERS, MEMBERSHIP, REWARDS, type TEvent } from "@/lib/ticketing";

export function TicketingHeader() {
  const pathname = usePathname();
  const { points } = useTicketing();
  const [menu, setMenu] = useState(false);
  const active = (p: string) => pathname === p || pathname.startsWith(p + "/");
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 60, background: "var(--color-bg)", borderBottom: "2px solid var(--color-divider)" }}>
      <div className="wrap" style={{ display: "flex", alignItems: "center", gap: 26, height: 74 }}>
        <Link href="/ticketing" onClick={() => setMenu(false)} style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 20, letterSpacing: "-0.01em", textDecoration: "none", color: "var(--color-text)", textTransform: "uppercase", marginRight: "auto" }}>{TICKETING.brand}</Link>
        <nav className="desk-nav" style={{ marginLeft: 0 }}>
          {NAV.map((n) => <Link key={n.path} href={n.path} className="nav-link" aria-current={active(n.path) ? "page" : undefined}>{n.label}</Link>)}
        </nav>
        <Link href="/ticketing/account" className="btn btn-secondary desk-nav" style={{ padding: "8px 14px" }}>{points} pts</Link>
        <Link href="/ticketing/events" className="btn btn-primary" style={{ padding: "9px 16px", flex: "0 0 auto" }}>Browse events</Link>
        <button type="button" className="burger btn btn-icon" onClick={() => setMenu((v) => !v)} aria-label="Menu"><MenuIcon size={20} /></button>
      </div>
      <div className={`mob-menu${menu ? " open" : ""}`} style={{ borderTop: "2px solid var(--color-divider)" }}>
        <div className="wrap" style={{ display: "flex", flexDirection: "column", paddingBlock: "12px 18px" }}>
          {[...NAV, { label: "Account", path: "/ticketing/account" }].map((n) => <Link key={n.path} href={n.path} onClick={() => setMenu(false)} style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 18, textTransform: "uppercase", textDecoration: "none", color: "var(--color-text)", padding: "12px 0", borderBottom: "1px solid var(--color-divider)" }}>{n.label}</Link>)}
        </div>
      </div>
    </header>
  );
}

export function EventsList() {
  const [cat, setCat] = useState("all");
  const shown = EVENTS.filter((e) => cat === "all" || e.cat === cat);
  return (
    <>
      <section className="wrap" style={{ paddingBlock: "20px 8px" }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {EVENT_CATS.map((c) => <button key={c} type="button" onClick={() => setCat(c)} className={`chip${cat === c ? " active" : ""}`}>{c === "all" ? "All" : c}</button>)}
        </div>
      </section>
      <section className="wrap" style={{ paddingBlock: "12px clamp(48px, 6vw, 80px)" }}>
        {shown.map((e) => (
          <Link key={e.id} href={`/ticketing/events/${e.id}`} className="row-line" style={{ display: "grid", gridTemplateColumns: "120px minmax(0,1fr) minmax(0,0.9fr) auto auto", gap: 18, alignItems: "center", padding: "20px 0", borderTop: "2px solid var(--color-divider)", textDecoration: "none", color: "var(--color-text)" }}>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 15, textTransform: "uppercase" }}>{e.date}</div>
            <div><div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(17px, 2vw, 22px)" }}>{e.title}</div><div style={{ fontSize: 13, color: "color-mix(in srgb, var(--color-text) 60%, transparent)", marginTop: 4 }}>{e.venue}</div></div>
            <div className="row-sub"><span className="tag tag-outline">{e.cat}</span></div>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 15 }}>{e.from}</div>
            <span className="btn btn-primary" style={{ padding: "8px 16px" }}>Tickets</span>
          </Link>
        ))}
      </section>
    </>
  );
}

export function EventDetail({ event }: { event: TEvent }) {
  const { tier, isMember, book } = useTicketing();
  const [qtys, setQtys] = useState<number[]>([0, 0, 0]);
  const setQ = (i: number, v: number) => setQtys((q) => q.map((x, j) => (j === i ? v : x)));
  const subNum = TICKET_TIERS.reduce((s, t, i) => s + t.num * qtys[i], 0);
  const count = qtys.reduce((s, x) => s + x, 0);
  const fee = isMember ? 0 : Math.round(subNum * 0.12);
  const total = subNum + fee;
  const earn = subNum * TIER_MULT[tier];
  const firstTierIdx = qtys.findIndex((x) => x > 0);

  return (
    <>
      <section className="wrap" style={{ paddingBlock: "20px 0" }}><Link href="/ticketing/events" className="btn btn-ghost" style={{ padding: "8px 4px" }}>← All events</Link></section>
      <section className="wrap split2" style={{ paddingBlock: "16px clamp(40px, 5vw, 64px)", display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: "clamp(28px, 5vw, 64px)", alignItems: "start" }}>
        <figure className="grayscale" style={{ margin: 0, aspectRatio: "1/1", border: "2px solid var(--color-divider)" }}><PlaceholderClient label="Event image" /></figure>
        <div>
          <span className="tag tag-accent">{event.cat}</span>
          <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(30px, 4vw, 50px)", lineHeight: 1, letterSpacing: "-0.02em", margin: "14px 0 12px" }}>{event.title}</h1>
          <div style={{ fontSize: 16, color: "color-mix(in srgb, var(--color-text) 70%, transparent)", marginBottom: 22 }}>{event.date} · {event.venue}</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", background: "color-mix(in srgb, var(--color-accent) 10%, transparent)", marginBottom: 20 }}>
            <span style={{ fontSize: 13 }}>You&apos;ll earn <strong>{earn} points</strong> on this booking</span>
            {isMember ? <span className="tag tag-accent">No fees</span> : null}
          </div>
          <div className="eyebrow" style={{ marginBottom: 12 }}>Select tickets</div>
          {TICKET_TIERS.map((t, i) => (
            <div key={t.name} style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: 16, alignItems: "center", padding: "16px 0", borderTop: "1px solid var(--color-divider)" }}>
              <div><div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 16 }}>{t.name}</div><div style={{ fontSize: 13, color: "color-mix(in srgb, var(--color-text) 58%, transparent)" }}>{t.note}</div></div>
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 16, color: "var(--color-accent)" }}>${t.num}</div>
              <QtyStepper value={qtys[i]} onChange={(v) => setQ(i, v)} min={0} max={10} size="sm" />
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0", marginTop: 4, borderTop: "2px solid var(--color-divider)", borderBottom: "2px solid var(--color-divider)" }}>
            <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 17 }}>{fee === 0 ? "Total (no fees)" : `Total (incl. $${fee} fees)`}</span>
            <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 22, color: "var(--color-accent)" }}>${total}</span>
          </div>
          <button type="button" className="btn btn-primary" onClick={() => book({ title: event.title, date: event.date }, count, firstTierIdx >= 0 ? TICKET_TIERS[firstTierIdx].name : "GA", earn)} disabled={count === 0} style={{ marginTop: 20, padding: "14px 26px", justifyContent: "flex-start" }}>Book &amp; earn points</button>
        </div>
      </section>
    </>
  );
}

export function Membership() {
  const { tier, joinTier } = useTicketing();
  return (
    <div className="grid3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, background: "var(--color-divider)", border: "2px solid var(--color-divider)" }}>
      {MEMBERSHIP.map((t) => {
        const vip = t.key === "vip";
        const current = tier === t.key;
        return (
          <div key={t.key} style={{ background: vip ? "var(--color-accent)" : "var(--color-bg)", color: vip ? "var(--color-bg)" : "var(--color-text)", padding: "clamp(24px, 3vw, 40px)", display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.8, marginBottom: 16 }}>{t.tagline}</div>
            <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 28, margin: "0 0 8px" }}>{t.name}</h3>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 22 }}><span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(32px, 4vw, 46px)" }}>{t.price}</span><span style={{ fontSize: 14, opacity: 0.7 }}>{t.per}</span></div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28, flex: 1 }}>
              {t.perks.map((pk) => <div key={pk} style={{ display: "flex", gap: 10, alignItems: "baseline", fontSize: 14, lineHeight: 1.4 }}><span style={{ fontWeight: 800 }}>—</span><span>{pk}</span></div>)}
            </div>
            <button type="button" onClick={() => joinTier(t.key)} disabled={current} className={vip ? "btn" : "btn btn-primary"} style={{ padding: "12px 20px", ...(vip ? { background: "var(--color-bg)", color: "var(--color-accent)" } : {}) }}>
              {current ? "Current plan" : t.key === "free" ? "Downgrade" : `Join ${t.name}`}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export function Rewards() {
  const { points, redeem } = useTicketing();
  return (
    <>
      <section style={{ background: "var(--color-text)", color: "var(--color-bg)" }}>
        <div className="wrap" style={{ paddingBlock: 24, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <span style={{ fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", opacity: 0.8 }}>Your balance</span>
          <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(28px, 3vw, 40px)", color: "var(--color-accent)" }}>{points} pts</span>
        </div>
      </section>
      <section className="wrap" style={{ paddingBlock: "clamp(28px, 4vw, 48px) clamp(48px, 6vw, 80px)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "clamp(16px, 2vw, 28px)" }}>
          {REWARDS.map((r) => {
            const disabled = points < r.cost;
            return (
              <div key={r.name} style={{ border: "2px solid var(--color-divider)", padding: 24, display: "flex", flexDirection: "column" }}>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 18, marginBottom: 8 }}>{r.name}</div>
                <p style={{ fontSize: 14, lineHeight: 1.55, margin: "0 0 20px", flex: 1, color: "color-mix(in srgb, var(--color-text) 72%, transparent)" }}>{r.desc}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                  <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 16, color: "var(--color-accent)" }}>{r.cost} pts</span>
                  <button type="button" onClick={() => redeem(r.name, r.cost)} disabled={disabled} className={disabled ? "btn btn-secondary" : "btn btn-primary"} style={{ padding: "9px 16px" }}>{disabled ? "Not enough" : "Redeem"}</button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

export function Account() {
  const { points, tierName, bookings } = useTicketing();
  const ticketCount = bookings.reduce((s, b) => s + b.qty, 0);
  return (
    <>
      <section className="wrap" style={{ paddingBlock: "clamp(28px, 4vw, 48px)" }}>
        <div className="grid3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, background: "var(--color-divider)", border: "2px solid var(--color-divider)" }}>
          {[[points, "Points balance"], [tierName, "Current tier"], [ticketCount, "Upcoming tickets"]].map(([v, l]) => (
            <div key={String(l)} style={{ background: "var(--color-bg)", padding: 28 }}>
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(30px, 4vw, 48px)", color: "var(--color-accent)", lineHeight: 1 }}>{v}</div>
              <div style={{ fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: "color-mix(in srgb, var(--color-text) 58%, transparent)", marginTop: 10 }}>{l}</div>
            </div>
          ))}
        </div>
      </section>
      <section className="wrap" style={{ paddingBlock: "8px clamp(48px, 6vw, 80px)" }}>
        <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 22, margin: "0 0 8px" }}>Your tickets</h2>
        {bookings.length === 0 ? (
          <p style={{ fontSize: 15, color: "color-mix(in srgb, var(--color-text) 60%, transparent)", padding: "20px 0" }}>No upcoming tickets yet. <Link href="/ticketing/events">Browse events →</Link></p>
        ) : bookings.map((b, i) => (
          <div key={i} className="row-line" style={{ display: "grid", gridTemplateColumns: "120px minmax(0,1fr) auto auto", gap: 18, alignItems: "center", padding: "18px 0", borderTop: "2px solid var(--color-divider)" }}>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 14, textTransform: "uppercase" }}>{b.date}</div>
            <div className="row-sub" style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 17 }}>{b.title}</div>
            <div style={{ fontSize: 14, color: "color-mix(in srgb, var(--color-text) 60%, transparent)" }}>{b.qty}× {b.tier}</div>
            <span className="tag tag-outline">Confirmed</span>
          </div>
        ))}
      </section>
    </>
  );
}

// Local placeholder (client) to avoid importing server component into client tree unnecessarily.
function PlaceholderClient({ label }: { label: string }) {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "flex-end", background: "repeating-linear-gradient(135deg, var(--color-neutral-200) 0, var(--color-neutral-200) 12px, var(--color-neutral-300) 12px, var(--color-neutral-300) 24px)" }}>
      <span style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-neutral-700)", padding: "10px 12px", background: "color-mix(in srgb, var(--color-bg) 82%, transparent)", margin: 10 }}>{label}</span>
    </div>
  );
}
