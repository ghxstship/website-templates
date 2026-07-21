"use client";

import { useState } from "react";
import { QtyStepper } from "@/components/ds/QtyStepper";
import { Modal } from "@/components/ds/Modal";
import { ConfirmModal } from "@/components/ds/ConfirmModal";
import { Placeholder } from "@/components/Placeholder";
import { SaveHeart } from "@/components/ds/SaveHeart";
import { useFavorites } from "@/lib/useFavorites";
import { captureBooking } from "@/lib/actions";
import { ATTRACTIONS, ZONES, SLOTS, TICKET_TYPES } from "@/lib/attraction";

export function AttractionsGrid() {
  const [zone, setZone] = useState("all");
  const [showFav, setShowFav] = useState(false);
  const fav = useFavorites("attraction", "Exhibit");
  let shown = ATTRACTIONS.filter((a) => zone === "all" || a.zone === zone);
  if (showFav) shown = shown.filter((a) => fav.isSaved(a.title));
  return (
    <>
      <section className="wrap" style={{ paddingBlock: "20px 8px" }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {ZONES.map((z) => <button key={z} type="button" onClick={() => setZone(z)} className={`chip${zone === z ? " active" : ""}`}>{z === "all" ? "All levels" : z}</button>)}
          <button type="button" onClick={() => setShowFav((v) => !v)} className={`chip${showFav ? " active" : ""}`}>Favorites · {fav.count}</button>
        </div>
      </section>
      <section className="wrap" style={{ paddingBlock: "16px clamp(48px, 6vw, 80px)" }}>
        {showFav && shown.length === 0 ? (
          <p style={{ fontSize: 16, color: "color-mix(in srgb, var(--color-text) 60%, transparent)", padding: "8px 0 16px" }}>No favorites yet. Tap the heart on any exhibit.</p>
        ) : null}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "clamp(16px, 2vw, 28px)" }}>
          {shown.map((a) => (
            <div key={a.title} style={{ border: "2px solid var(--color-divider)", display: "flex", flexDirection: "column" }}>
              <figure className="grayscale" style={{ margin: 0, aspectRatio: "4/3", borderBottom: "2px solid var(--color-divider)", position: "relative" }}><Placeholder /><SaveHeart overlay active={fav.isSaved(a.title)} onToggle={() => fav.toggle(a.title, a.title)} label={`Favorite ${a.title}`} size={17} /></figure>
              <div style={{ padding: "16px 18px 20px", flex: 1, display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}><span style={{ fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--color-accent-700)" }}>{a.tag}</span><span className="tag tag-neutral">{a.zone}</span></div>
                <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 19, margin: "0 0 8px" }}>{a.title}</h3>
                <p style={{ fontSize: 13.5, lineHeight: 1.5, margin: "0 0 12px", flex: 1, color: "color-mix(in srgb, var(--color-text) 72%, transparent)" }}>{a.desc}</p>
                <div style={{ fontSize: 12, color: "color-mix(in srgb, var(--color-text) 58%, transparent)" }}>{a.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export function TicketBuilder() {
  const [date, setDate] = useState("2026-09-18");
  const [slot, setSlot] = useState("10:00");
  const [qtys, setQtys] = useState<number[]>([2, 0, 0, 0]);
  const [checkout, setCheckout] = useState(false);
  const [confirm, setConfirm] = useState<{ ref: string } | null>(null);
  const [pending, setPending] = useState(false);
  const setQ = (i: number, v: number) => setQtys((q) => q.map((x, j) => (j === i ? v : x)));
  const total = TICKET_TYPES.reduce((s, t, i) => s + t.num * qtys[i], 0);
  const count = qtys.reduce((s, x) => s + x, 0);
  const summary = TICKET_TYPES.map((t, i) => ({ label: `${qtys[i]} × ${t.name}`, amount: `$${t.num * qtys[i]}`, n: qtys[i] })).filter((x) => x.n > 0);

  const confirmCheckout = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setPending(true);
    const res = await captureBooking("attraction", { kind: "timed-entry", summary: `${count} tickets — ${date} ${slot}`, details: { date, slot, count, total }, email: String(fd.get("email") ?? ""), refPrefix: "HLX" });
    setPending(false);
    setCheckout(false);
    setConfirm({ ref: res.ref ?? "HLX-000000" });
    setQtys([0, 0, 0, 0]);
  };

  return (
    <section className="wrap ticketgrid" style={{ paddingBlock: "clamp(28px, 4vw, 48px) clamp(48px, 6vw, 80px)", display: "grid", gridTemplateColumns: "minmax(0,1.4fr) minmax(0,0.8fr)", gap: "clamp(28px, 5vw, 56px)", alignItems: "start" }}>
      <div>
        <div className="eyebrow" style={{ marginBottom: 12 }}>1 · Choose a date</div>
        <input className="input" type="date" value={date} onChange={(e) => setDate(e.target.value)} style={{ maxWidth: 260, minHeight: 44, marginBottom: 28 }} />
        <div className="eyebrow" style={{ marginBottom: 12 }}>2 · Entry time</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}>
          {SLOTS.map((s) => <button key={s} type="button" onClick={() => setSlot(s)} className={`chip${slot === s ? " active" : ""}`}>{s}</button>)}
        </div>
        <div className="eyebrow" style={{ marginBottom: 12 }}>3 · Tickets</div>
        {TICKET_TYPES.map((t, i) => (
          <div key={t.name} style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: 16, alignItems: "center", padding: "16px 0", borderTop: "1px solid var(--color-divider)" }}>
            <div><div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 16 }}>{t.name}</div><div style={{ fontSize: 13, color: "color-mix(in srgb, var(--color-text) 58%, transparent)" }}>{t.note}</div></div>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 16, color: "var(--color-accent)" }}>${t.num}</div>
            <QtyStepper value={qtys[i]} onChange={(v) => setQ(i, v)} min={0} max={10} size="sm" label={`Quantity, ${t.name}`} />
          </div>
        ))}
      </div>
      <div style={{ border: "2px solid var(--color-divider)", position: "sticky", top: 90 }}>
        <div style={{ padding: 20, borderBottom: "2px solid var(--color-divider)", fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 18, textTransform: "uppercase" }}>Your visit</div>
        <div style={{ padding: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, padding: "6px 0" }}><span style={{ color: "color-mix(in srgb, var(--color-text) 62%, transparent)" }}>Date</span><span style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}>{date}</span></div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, padding: "6px 0" }}><span style={{ color: "color-mix(in srgb, var(--color-text) 62%, transparent)" }}>Entry</span><span style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}>{slot}</span></div>
          {summary.map((l) => <div key={l.label} style={{ display: "flex", justifyContent: "space-between", fontSize: 14, padding: "6px 0", borderTop: "1px solid var(--color-divider)" }}><span>{l.label}</span><span style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}>{l.amount}</span></div>)}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "14px 0 0", marginTop: 8, borderTop: "2px solid var(--color-divider)", fontFamily: "var(--font-heading)", fontWeight: 800 }}><span style={{ fontSize: 17 }}>Total</span><span style={{ fontSize: 24, color: "var(--color-accent)" }}>${total}</span></div>
          <button type="button" className="btn btn-primary" onClick={() => count > 0 && setCheckout(true)} disabled={count === 0} style={{ width: "100%", justifyContent: "center", padding: "13px 20px", marginTop: 18 }}>Checkout</button>
        </div>
      </div>

      <Modal open={checkout} onClose={() => setCheckout(false)} width={520} showClose={false}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
          <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 18, textTransform: "uppercase" }}>Checkout</span>
        </div>
        <div style={{ fontSize: 14, color: "color-mix(in srgb, var(--color-text) 65%, transparent)", marginBottom: 18 }}>{date} · {slot} · {count} {count === 1 ? "ticket" : "tickets"}</div>
        <form onSubmit={confirmCheckout} style={{ display: "grid", gap: 16 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}><div className="field"><label htmlFor="at-name">Name</label><input id="at-name" name="name" className="input" required /></div><div className="field"><label htmlFor="at-email">Email</label><input id="at-email" name="email" className="input" type="email" required /></div></div>
          <div className="field"><label htmlFor="at-card">Card number</label><input id="at-card" name="card" className="input" required placeholder="4242 4242 4242 4242" /></div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "14px 0", borderTop: "2px solid var(--color-divider)", borderBottom: "2px solid var(--color-divider)" }}><span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 16 }}>Total</span><span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 22, color: "var(--color-accent)" }}>${total}</span></div>
          <button type="submit" className="btn btn-primary" disabled={pending} style={{ padding: "13px 24px", justifyContent: "flex-start" }}>{pending ? "Processing…" : "Pay & get tickets"}</button>
        </form>
      </Modal>

      <ConfirmModal
        open={!!confirm}
        onClose={() => setConfirm(null)}
        title="You're booked in"
        body={
          <>
            <p style={{ fontSize: 15.5, lineHeight: 1.6, margin: "0 0 20px", color: "color-mix(in srgb, var(--color-text) 78%, transparent)" }}>Your timed-entry tickets are confirmed and in your email. See you on {date} at {slot}.</p>
            <div style={{ display: "flex", gap: 14, alignItems: "center", border: "2px solid var(--color-divider)", padding: 14 }}>
              <div style={{ width: 56, height: 56, flex: "0 0 auto", background: "repeating-linear-gradient(45deg, var(--color-text) 0 3px, transparent 3px 6px)" }} />
              <div><div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 14 }}>{confirm?.ref}</div><div style={{ fontSize: 12, color: "color-mix(in srgb, var(--color-text) 58%, transparent)" }}>Show this QR at the gate</div></div>
            </div>
          </>
        }
      />
    </section>
  );
}
