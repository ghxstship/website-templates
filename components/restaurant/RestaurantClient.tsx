"use client";

import { useState } from "react";
import { MENUS, ORDER_SECTIONS } from "@/lib/restaurant";
import { useOrder } from "./order";
import { captureBooking } from "@/lib/actions";

export function MenusClient() {
  const [tab, setTab] = useState(0);
  const m = MENUS[tab];
  return (
    <>
      <section className="wrap" style={{ paddingBlock: "20px 8px" }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {MENUS.map((mm, i) => (
            <button key={mm.label} type="button" onClick={() => setTab(i)} className={`chip${tab === i ? " active" : ""}`} style={{ padding: "9px 18px" }}>{mm.label}</button>
          ))}
        </div>
      </section>
      <section className="wrap" style={{ paddingBlock: "16px clamp(48px, 6vw, 80px)", maxWidth: 820 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16, marginBottom: 8 }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(24px, 3vw, 36px)", letterSpacing: "-0.015em", margin: 0 }}>{m.title}</h2>
          <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 20, color: "var(--color-accent)" }}>{m.price}</span>
        </div>
        <p style={{ fontSize: 15, color: "color-mix(in srgb, var(--color-text) 65%, transparent)", margin: "0 0 24px" }}>{m.note}</p>
        {m.courses.map((c) => (
          <div key={c.name} style={{ padding: "18px 0", borderTop: "1px solid var(--color-divider)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "baseline" }}>
              <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 18, margin: 0 }}>{c.name}</h3>
              {c.price ? <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 15, color: "var(--color-accent)" }}>{c.price}</span> : null}
            </div>
            <p style={{ fontSize: 14.5, lineHeight: 1.55, margin: "6px 0 0", color: "color-mix(in srgb, var(--color-text) 70%, transparent)" }}>{c.desc}</p>
          </div>
        ))}
      </section>
    </>
  );
}

export function OrderMenu() {
  const { mode, setMode, add } = useOrder();
  return (
    <>
      <section className="wrap" style={{ paddingBlock: "20px 8px", display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
        <span className="eyebrow" style={{ marginRight: 6 }}>Fulfilment</span>
        {([["pickup", "Collection"], ["delivery", "Local delivery"]] as const).map(([k, label]) => (
          <button key={k} type="button" onClick={() => setMode(k)} className={`chip${mode === k ? " active" : ""}`}>{label}</button>
        ))}
      </section>
      <section className="wrap" style={{ paddingBlock: "16px clamp(48px, 6vw, 80px)" }}>
        {ORDER_SECTIONS.map((sec) => (
          <div key={sec.title} style={{ marginBottom: "clamp(28px, 4vw, 48px)" }}>
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(20px, 2.6vw, 28px)", letterSpacing: "-0.015em", margin: "0 0 4px", paddingBottom: 12, borderBottom: "2px solid var(--color-divider)", textTransform: "uppercase" }}>{sec.title}</h2>
            {sec.items.map((i) => (
              <div key={i.name} style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) auto auto", gap: 16, alignItems: "center", padding: "16px 0", borderBottom: "1px solid var(--color-divider)" }}>
                <div>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 16 }}>{i.name}</div>
                  <div style={{ fontSize: 13.5, lineHeight: 1.5, color: "color-mix(in srgb, var(--color-text) 65%, transparent)", marginTop: 4, maxWidth: "60ch" }}>{i.desc}</div>
                </div>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 15, color: "var(--color-accent)" }}>${i.price_num}</div>
                <button type="button" className="btn btn-secondary" onClick={() => add(i.name, i.price_num)} style={{ padding: "8px 16px" }}>Add</button>
              </div>
            ))}
          </div>
        ))}
      </section>
    </>
  );
}

export function ReservationForm() {
  const [party, setParty] = useState(2);
  const [service, setService] = useState("Dinner");
  const [date, setDate] = useState("2026-09-18");
  const [time, setTime] = useState("7:30pm");
  const [done, setDone] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const times = service === "Lunch" ? ["12:00pm", "12:30pm", "1:00pm", "1:30pm", "2:00pm"] : ["6:00pm", "6:30pm", "7:00pm", "7:30pm", "8:00pm", "8:30pm"];
  const preview = `${party}${party === 1 ? " guest" : " guests"}, ${time}`;

  if (done) {
    return (
      <div style={{ border: "2px solid var(--color-accent)", padding: "clamp(24px, 4vw, 40px)" }}>
        <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 26, color: "var(--color-accent)", marginBottom: 12 }}>Table reserved.</div>
        <p style={{ fontSize: 16, lineHeight: 1.6, margin: "0 0 8px" }}>{done}</p>
        <p style={{ fontSize: 14, margin: 0, color: "color-mix(in srgb, var(--color-text) 65%, transparent)" }}>A confirmation and our cancellation policy are on their way to your email.</p>
        <button type="button" className="btn btn-secondary" onClick={() => setDone(null)} style={{ marginTop: 24, padding: "11px 20px" }}>Book another</button>
      </div>
    );
  }

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const summary = `A table for ${party}, ${service.toLowerCase()} on ${date} at ${time}.`;
        setPending(true);
        await captureBooking("restaurant", { kind: "reservation", summary, details: { party, service, date, time, name: fd.get("name"), notes: fd.get("notes") }, email: String(fd.get("email") ?? ""), refPrefix: "MRD" });
        setPending(false);
        setDone(summary);
      }}
    >
      <div className="eyebrow" style={{ marginBottom: 12 }}>Party size</div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}>
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <button key={n} type="button" onClick={() => setParty(n)} className={`chip${party === n ? " active" : ""}`} style={{ minWidth: 48, justifyContent: "center" }}>{n === 6 ? "6+" : n}</button>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 28 }}>
        <div className="field"><label htmlFor="r-date">Date</label><input id="r-date" className="input" type="date" value={date} onChange={(e) => setDate(e.target.value)} style={{ minHeight: 42 }} /></div>
        <div className="field"><label htmlFor="r-svc">Service</label><select id="r-svc" className="input" value={service} onChange={(e) => { setService(e.target.value); setTime(e.target.value === "Lunch" ? "12:00pm" : "7:30pm"); }} style={{ minHeight: 42 }}><option>Dinner</option><option>Lunch</option></select></div>
      </div>
      <div className="eyebrow" style={{ marginBottom: 12 }}>Time</div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}>
        {times.map((t) => <button key={t} type="button" onClick={() => setTime(t)} className={`chip${time === t ? " active" : ""}`}>{t}</button>)}
      </div>
      <hr className="rule" style={{ height: 1, marginBottom: 28 }} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div className="field"><label htmlFor="r-name">Name</label><input id="r-name" name="name" className="input" required /></div>
        <div className="field"><label htmlFor="r-email">Email</label><input id="r-email" name="email" className="input" type="email" required /></div>
        <div className="field"><label htmlFor="r-phone">Phone</label><input id="r-phone" name="phone" className="input" required /></div>
        <div className="field"><label htmlFor="r-occ">Occasion (optional)</label><input id="r-occ" name="occasion" className="input" /></div>
      </div>
      <div className="field" style={{ marginTop: 20 }}><label htmlFor="r-notes">Dietary requirements or notes</label><textarea id="r-notes" name="notes" className="input" /></div>
      <button type="submit" className="btn btn-primary" disabled={pending} style={{ marginTop: 24, padding: "14px 26px", justifyContent: "flex-start" }}>{pending ? "Reserving…" : `Confirm reservation — ${preview}`}</button>
    </form>
  );
}
