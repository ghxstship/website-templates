"use client";

import { useState } from "react";
import Link from "next/link";
import { usePersistentState } from "@/lib/persist";
import { announce } from "@/lib/announce";
import { ConfirmModal } from "@/components/ds/ConfirmModal";
import { Placeholder } from "@/components/Placeholder";
import { captureBooking } from "@/lib/actions";
import { DAYS, DISCIPLINES, CLASSES, LEAGUES, RECOVERY, NUTRITION, PLANS } from "@/lib/fitness";

const UP = "var(--color-up)";

export function Timetable() {
  const [day, setDay] = useState(0);
  const [disc, setDisc] = useState("all");
  const [booked, setBooked] = usePersistentState<string[]>("fitness.booked", []);
  const [confirm, setConfirm] = useState<{ title: string; body: string } | null>(null);
  const shown = CLASSES.map((c, i) => ({ c, i })).filter(({ c }) => disc === "all" || c.discipline === disc);

  const book = async (i: number, name: string) => {
    const key = `${day}:${i}`;
    if (booked.includes(key)) return;
    setBooked((s) => [...s, key]);
    await captureBooking("fitness", { kind: "class", summary: `${name} — ${DAYS[day]}`, details: { class: name, day: DAYS[day] }, refPrefix: "IRN" });
    announce(`${name} booked for ${DAYS[day]}`);
    setConfirm({ title: "You're booked in", body: `${name} is on your schedule. We've added it to your calendar and app.` });
  };
  const cancel = (i: number, name: string) => {
    const key = `${day}:${i}`;
    setBooked((s) => s.filter((k) => k !== key));
    announce(`${name} canceled`);
    setConfirm({ title: "Class canceled", body: `Your place in ${name} on ${DAYS[day]} has been released.` });
  };

  return (
    <>
      <section className="wrap" style={{ paddingBlock: "20px 8px", display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>{DAYS.map((d, i) => <button key={d} type="button" onClick={() => setDay(i)} className={`chip${day === i ? " active" : ""}`} style={{ padding: "8px 14px" }}>{d}</button>)}</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>{DISCIPLINES.map((c) => <button key={c} type="button" onClick={() => setDisc(c)} className={`chip${disc === c ? " active" : ""}`} style={{ padding: "8px 14px" }}>{c === "all" ? "All" : c}</button>)}</div>
      </section>
      <section className="wrap" style={{ paddingBlock: "12px clamp(48px, 6vw, 80px)" }}>
        {shown.map(({ c, i }) => {
          const key = `${day}:${i}`;
          const isBooked = booked.includes(key);
          const full = c.spots === 0 && !isBooked;
          return (
            <div key={i} className="row-line" style={{ display: "grid", gridTemplateColumns: "110px minmax(0,1.3fr) minmax(0,1fr) auto auto", gap: 18, alignItems: "center", padding: "18px 0", borderTop: "2px solid var(--color-divider)" }}>
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 15, fontVariantNumeric: "tabular-nums" }}>{c.time}</div>
              <div><div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(17px, 2vw, 22px)" }}>{c.name}</div><div style={{ fontSize: 13, color: "color-mix(in srgb, var(--color-text) 60%, transparent)", marginTop: 4 }}>{c.coach} · {c.len}</div></div>
              <div className="row-sub"><span className="tag tag-outline">{c.discipline}</span></div>
              <div style={{ fontSize: 13, color: full ? "var(--color-accent-700)" : isBooked ? UP : "color-mix(in srgb, var(--color-text) 60%, transparent)" }}>{full ? "Waitlist" : isBooked ? "Booked" : `${c.spots} spots`}</div>
              {isBooked ? (
                <button type="button" onClick={() => cancel(i, c.name)} className="btn btn-secondary" style={{ padding: "9px 18px" }}>Cancel</button>
              ) : (
                <button type="button" onClick={() => book(i, c.name)} className="btn btn-primary" style={{ padding: "9px 18px" }}>{full ? "Join waitlist" : "Book"}</button>
              )}
            </div>
          );
        })}
      </section>
      <ConfirmModal open={!!confirm} onClose={() => setConfirm(null)} title={confirm?.title ?? ""} body={confirm?.body ?? ""} />
    </>
  );
}

export function Leagues() {
  const [joined, setJoined] = useState<Set<number>>(new Set());
  const [confirm, setConfirm] = useState<{ title: string; body: string } | null>(null);
  const join = async (i: number, sport: string) => {
    if (joined.has(i)) return;
    setJoined((s) => new Set(s).add(i));
    await captureBooking("fitness", { kind: "league", summary: `${sport} league`, details: { sport }, refPrefix: "IRN" });
    setConfirm({ title: "You're in", body: `Your spot in ${sport} is confirmed. The captain will be in touch with fixtures.` });
  };
  return (
    <section className="wrap" style={{ paddingBlock: "clamp(24px, 3vw, 44px) clamp(48px, 6vw, 80px)" }}>
      {LEAGUES.map((l, i) => {
        const isJoined = joined.has(i);
        const full = l.spots === 0 && !isJoined;
        return (
          <div key={i} className="row-line" style={{ display: "grid", gridTemplateColumns: "minmax(0,1.4fr) minmax(0,1fr) auto auto", gap: 18, alignItems: "center", padding: "20px 0", borderTop: "2px solid var(--color-divider)" }}>
            <div><div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(18px, 2vw, 24px)" }}>{l.sport}</div><div style={{ fontSize: 13, color: "color-mix(in srgb, var(--color-text) 60%, transparent)", marginTop: 4 }}>{l.night} · {l.format}</div></div>
            <div className="row-sub" style={{ fontSize: 14, color: "color-mix(in srgb, var(--color-text) 72%, transparent)" }}>{l.season}</div>
            <div style={{ fontSize: 13, color: full ? "var(--color-accent-700)" : isJoined ? UP : "color-mix(in srgb, var(--color-text) 60%, transparent)" }}>{full ? "Full — waitlist" : isJoined ? "Joined" : `${l.spots} spots`}</div>
            <button type="button" onClick={() => join(i, l.sport)} disabled={isJoined} className={isJoined ? "btn btn-secondary" : "btn btn-primary"} style={{ padding: "9px 18px" }}>{isJoined ? "Joined" : full ? "Waitlist" : "Join"}</button>
          </div>
        );
      })}
      <ConfirmModal open={!!confirm} onClose={() => setConfirm(null)} title={confirm?.title ?? ""} body={confirm?.body ?? ""} />
    </section>
  );
}

export function NutritionConsult() {
  const [confirm, setConfirm] = useState(false);
  return (
    <>
      <button type="button" className="btn btn-primary" onClick={() => setConfirm(true)} style={{ marginTop: 18, padding: "11px 20px" }}>Book a consult</button>
      <ConfirmModal open={confirm} onClose={() => setConfirm(false)} title="Consult requested" body="A nutritionist will reach out to schedule your first session and scan." />
    </>
  );
}

export function Membership() {
  const [confirm, setConfirm] = useState<string | null>(null);
  return (
    <>
      <div className="grid3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, background: "var(--color-divider)", border: "2px solid var(--color-divider)" }}>
        {PLANS.map((pl) => {
          const f = pl.featured;
          return (
            <div key={pl.key} style={{ background: f ? "var(--color-accent)" : "var(--color-bg)", color: f ? "var(--color-bg)" : "var(--color-text)", padding: "clamp(24px, 3vw, 40px)", display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.8, marginBottom: 16 }}>{pl.tagline}</div>
              <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 26, margin: "0 0 8px" }}>{pl.name}</h3>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 22 }}><span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(30px, 4vw, 46px)" }}>{pl.price}</span><span style={{ fontSize: 14, opacity: 0.7 }}>{pl.per}</span></div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28, flex: 1 }}>{pl.perks.map((pk) => <div key={pk} style={{ display: "flex", gap: 10, alignItems: "baseline", fontSize: 14, lineHeight: 1.4 }}><span style={{ fontWeight: 800 }}>—</span><span>{pk}</span></div>)}</div>
              <button type="button" onClick={() => setConfirm(pl.name)} className={f ? "btn" : "btn btn-primary"} style={{ padding: "12px 20px", ...(f ? { background: "var(--color-bg)", color: "var(--color-accent)" } : {}) }}>Start {pl.name}</button>
            </div>
          );
        })}
      </div>
      <p style={{ fontSize: 13, color: "color-mix(in srgb, var(--color-text) 60%, transparent)", marginTop: 20, maxWidth: "60ch" }}>All memberships include the app, class booking and open-gym access. Freeze any time. Student and off-peak rates available at the front desk.</p>
      <ConfirmModal open={!!confirm} onClose={() => setConfirm(null)} title={confirm ? `Welcome to IRONHOUSE` : ""} body={confirm ? `Your ${confirm} membership starts today with a free first week. See you on the floor.` : ""} />
    </>
  );
}
