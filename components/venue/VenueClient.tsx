"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon } from "@/components/icons";
import { QtyStepper } from "@/components/ds/QtyStepper";
import { ConfirmModal } from "@/components/ds/ConfirmModal";
import { Placeholder } from "@/components/Placeholder";
import { SaveHeart } from "@/components/ds/SaveHeart";
import { useFavorites } from "@/lib/useFavorites";
import { captureBooking, captureMessage } from "@/lib/actions";
import { VENUE, NAV, EVENTS, EVENT_CATS, TICKET_TIERS, type VEvent } from "@/lib/venue";

export function VenueHeader() {
  const pathname = usePathname();
  const [menu, setMenu] = useState(false);
  const active = (p: string) => pathname === p || pathname.startsWith(p + "/");
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 60, background: "var(--color-bg)", borderBottom: "2px solid var(--color-divider)" }}>
      <div className="wrap" style={{ display: "flex", alignItems: "center", gap: 28, height: 74 }}>
        <Link href="/venue" onClick={() => setMenu(false)} style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 20, letterSpacing: "-0.01em", textDecoration: "none", color: "var(--color-text)", textTransform: "uppercase", marginRight: "auto" }}>{VENUE.name}</Link>
        <nav className="desk-nav" style={{ marginLeft: 0 }}>
          {NAV.map((n) => <Link key={n.path} href={n.path} className="nav-link" aria-current={active(n.path) ? "page" : undefined}>{n.label}</Link>)}
          <Link href="/ecommerce" className="nav-link">Shop ↗</Link>
        </nav>
        <Link href="/venue/events" className="btn btn-primary desk-nav" style={{ padding: "9px 16px" }}>What&apos;s on</Link>
        <button type="button" className="burger btn btn-icon" onClick={() => setMenu((v) => !v)} aria-label="Menu"><MenuIcon size={20} /></button>
      </div>
      <div className={`mob-menu${menu ? " open" : ""}`} style={{ borderTop: "2px solid var(--color-divider)" }}>
        <div className="wrap" style={{ display: "flex", flexDirection: "column", paddingBlock: "12px 18px" }}>
          {NAV.map((n) => <Link key={n.path} href={n.path} onClick={() => setMenu(false)} style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 18, textTransform: "uppercase", textDecoration: "none", color: "var(--color-text)", padding: "12px 0", borderBottom: "1px solid var(--color-divider)" }}>{n.label}</Link>)}
          <Link href="/ecommerce" onClick={() => setMenu(false)} style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 18, textTransform: "uppercase", textDecoration: "none", color: "var(--color-text)", padding: "12px 0" }}>Shop ↗</Link>
        </div>
      </div>
    </header>
  );
}

export function EventsList() {
  const [cat, setCat] = useState("all");
  const [showFav, setShowFav] = useState(false);
  const fav = useFavorites("venue", "Event");
  let shown = EVENTS.filter((e) => cat === "all" || e.cat === cat);
  if (showFav) shown = shown.filter((e) => fav.isSaved(e.id));
  return (
    <>
      <section className="wrap" style={{ paddingBlock: "20px 8px" }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {EVENT_CATS.map((c) => <button key={c} type="button" onClick={() => setCat(c)} className={`chip${cat === c ? " active" : ""}`}>{c === "all" ? "All" : c}</button>)}
          <button type="button" onClick={() => setShowFav((v) => !v)} className={`chip${showFav ? " active" : ""}`}>Favorites · {fav.count}</button>
        </div>
      </section>
      <section className="wrap" style={{ paddingBlock: "12px clamp(48px, 6vw, 80px)" }}>
        {showFav && shown.length === 0 ? (
          <p style={{ fontSize: 16, color: "color-mix(in srgb, var(--color-text) 60%, transparent)", padding: "16px 0" }}>No favorites yet. Tap the heart on any event.</p>
        ) : null}
        {shown.map((e) => (
          <Link key={e.id} href={`/venue/events/${e.id}`} className="row-line" style={{ display: "grid", gridTemplateColumns: "130px minmax(0,1fr) minmax(0,0.8fr) auto auto auto", gap: 18, alignItems: "center", padding: "20px 0", borderTop: "2px solid var(--color-divider)", textDecoration: "none", color: "var(--color-text)" }}>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 15, textTransform: "uppercase" }}>{e.date}</div>
            <div><div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(18px, 2vw, 24px)" }}>{e.title}</div><div style={{ fontSize: 13, color: "color-mix(in srgb, var(--color-text) 60%, transparent)", marginTop: 4 }}>{e.time}</div></div>
            <div className="row-sub"><span className="tag tag-outline">{e.cat}</span></div>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 15 }}>{e.from}</div>
            <SaveHeart active={fav.isSaved(e.id)} onToggle={() => fav.toggle(e.id, e.title)} label={`Favorite ${e.title}`} size={16} />
            <span className="btn btn-primary" style={{ padding: "8px 16px" }}>Tickets</span>
          </Link>
        ))}
      </section>
    </>
  );
}

export function EventDetail({ event }: { event: VEvent }) {
  const [qtys, setQtys] = useState<number[]>([0, 0, 0]);
  const [confirm, setConfirm] = useState<{ title: string; body: string } | null>(null);
  const setQ = (i: number, v: number) => setQtys((q) => q.map((x, j) => (j === i ? v : x)));
  const total = TICKET_TIERS.reduce((s, t, i) => s + t.num * qtys[i], 0);
  const count = qtys.reduce((s, x) => s + x, 0);

  const checkout = async () => {
    if (count === 0) return;
    await captureBooking("venue", { kind: "tickets", summary: `${count}× ${event.title} — ${VENUE.name}`, details: { event: event.title, date: event.date, count, total }, refPrefix: "ARM" });
    setConfirm({ title: "Tickets reserved", body: `${count} ticket(s) held for 10 minutes. Complete payment via the link in your email to receive your mobile tickets.` });
    setQtys([0, 0, 0]);
  };

  return (
    <>
      <section className="wrap" style={{ paddingBlock: "20px 0" }}><Link href="/venue/events" className="btn btn-ghost" style={{ padding: "8px 4px" }}>← All events</Link></section>
      <section className="wrap split2" style={{ paddingBlock: "16px clamp(40px, 5vw, 64px)", display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: "clamp(28px, 5vw, 64px)", alignItems: "start" }}>
        <figure className="grayscale" style={{ margin: 0, aspectRatio: "1/1", border: "2px solid var(--color-divider)" }}><Placeholder label="Event image" /></figure>
        <div>
          <span className="tag tag-accent">{event.cat}</span>
          <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(30px, 4vw, 52px)", lineHeight: 1, letterSpacing: "-0.02em", margin: "14px 0" }}>{event.title}</h1>
          <div style={{ fontSize: 16, color: "color-mix(in srgb, var(--color-text) 70%, transparent)", marginBottom: 22 }}>{event.date} — {event.time} · {VENUE.name}</div>
          <p style={{ fontSize: 16, lineHeight: 1.65, margin: "0 0 28px", maxWidth: "48ch", color: "color-mix(in srgb, var(--color-text) 82%, transparent)" }}>{event.desc}</p>
          <div className="eyebrow" style={{ marginBottom: 12 }}>Select tickets</div>
          {TICKET_TIERS.map((t, i) => (
            <div key={t.name} style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: 16, alignItems: "center", padding: "16px 0", borderTop: "1px solid var(--color-divider)" }}>
              <div><div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 16 }}>{t.name}</div><div style={{ fontSize: 13, color: "color-mix(in srgb, var(--color-text) 58%, transparent)" }}>{t.note}</div></div>
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 16, color: "var(--color-accent)" }}>${t.num}</div>
              <QtyStepper value={qtys[i]} onChange={(v) => setQ(i, v)} min={0} max={10} size="sm" />
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 0", marginTop: 4, borderTop: "2px solid var(--color-divider)", borderBottom: "2px solid var(--color-divider)" }}>
            <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 18 }}>Total</span>
            <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 22, color: "var(--color-accent)" }}>${total}</span>
          </div>
          <button type="button" className="btn btn-primary" onClick={checkout} disabled={count === 0} style={{ marginTop: 20, padding: "14px 26px", justifyContent: "flex-start" }}>Continue to checkout</button>
          <p style={{ fontSize: 13, color: "color-mix(in srgb, var(--color-text) 58%, transparent)", margin: "16px 0 0" }}>Members save on every booking. <Link href="/ticketing">Join the club ↗</Link></p>
        </div>
      </section>
      <ConfirmModal open={!!confirm} onClose={() => setConfirm(null)} title={confirm?.title ?? ""} body={confirm?.body ?? ""} />
    </>
  );
}

export function HireForm() {
  const [done, setDone] = useState(false);
  const [pending, setPending] = useState(false);
  if (done) {
    return (
      <div style={{ border: "2px solid var(--color-accent)", padding: 28 }}>
        <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 20, color: "var(--color-accent)", marginBottom: 8 }}>Enquiry received.</div>
        <p style={{ fontSize: 15, margin: 0, color: "color-mix(in srgb, var(--color-text) 75%, transparent)" }}>Our events team will be in touch within two working days.</p>
      </div>
    );
  }
  return (
    <form onSubmit={async (e) => { e.preventDefault(); const fd = new FormData(e.currentTarget); setPending(true); await captureMessage("venue", { name: String(fd.get("name") ?? ""), email: String(fd.get("email") ?? ""), subject: `Hire — ${fd.get("type")} (${fd.get("guests")} guests)`, message: String(fd.get("message") ?? "") }); setPending(false); setDone(true); }} style={{ display: "grid", gap: 18 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        <div className="field"><label htmlFor="h-name">Name</label><input id="h-name" name="name" className="input" required /></div>
        <div className="field"><label htmlFor="h-email">Email</label><input id="h-email" name="email" className="input" type="email" required /></div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        <div className="field"><label htmlFor="h-type">Event type</label><select id="h-type" name="type" className="input" style={{ minHeight: 40 }}><option>Corporate</option><option>Wedding</option><option>Concert / promoter</option><option>Filming</option><option>Other</option></select></div>
        <div className="field"><label htmlFor="h-guests">Guests</label><input id="h-guests" name="guests" className="input" placeholder="Approx." /></div>
      </div>
      <div className="field"><label htmlFor="h-msg">Tell us about your event</label><textarea id="h-msg" name="message" className="input" required /></div>
      <button type="submit" className="btn btn-primary" disabled={pending} style={{ padding: "13px 24px", justifyContent: "flex-start" }}>{pending ? "Sending…" : "Send enquiry"}</button>
    </form>
  );
}
