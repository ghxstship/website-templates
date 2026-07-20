"use client";

import { useEffect, useState } from "react";
import { DAYS, TIERS, EVENT } from "@/lib/event";
import { captureBooking } from "@/lib/actions";
import { ConfirmModal } from "@/components/ds/ConfirmModal";

export function EventCountdown() {
  const [parts, setParts] = useState<{ n: string; label: string }[] | null>(null);

  useEffect(() => {
    const target = new Date(EVENT.targetIso).getTime();
    const tick = () => {
      let diff = Math.max(0, target - Date.now());
      const d = Math.floor(diff / 86400000); diff -= d * 86400000;
      const h = Math.floor(diff / 3600000); diff -= h * 3600000;
      const m = Math.floor(diff / 60000); diff -= m * 60000;
      const s = Math.floor(diff / 1000);
      const pad = (n: number) => String(n).padStart(2, "0");
      setParts([
        { n: String(d), label: "Days" },
        { n: pad(h), label: "Hours" },
        { n: pad(m), label: "Minutes" },
        { n: pad(s), label: "Seconds" },
      ]);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const shown = parts ?? [
    { n: "—", label: "Days" }, { n: "—", label: "Hours" }, { n: "—", label: "Minutes" }, { n: "—", label: "Seconds" },
  ];

  return (
    <section style={{ background: "var(--color-accent)", color: "var(--color-bg)" }}>
      <div className="wrap grid4" style={{ paddingBlock: "clamp(28px, 4vw, 48px)", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
        {shown.map((c) => (
          <div key={c.label}>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(36px, 5vw, 64px)", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>{c.n}</div>
            <div style={{ fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 8, opacity: 0.85 }}>{c.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ScheduleTabs() {
  const [day, setDay] = useState(0);
  const sessions = DAYS[day].sessions;
  return (
    <>
      <section className="wrap" style={{ paddingBlock: "24px 12px" }}>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {DAYS.map((d, i) => (
            <button key={d.label} type="button" onClick={() => setDay(i)} className={`chip${day === i ? " active" : ""}`} style={{ padding: "9px 18px" }}>
              {d.label}
            </button>
          ))}
        </div>
      </section>
      <section className="wrap" style={{ paddingBlock: "12px clamp(48px, 6vw, 88px)" }}>
        {sessions.map((s, i) => (
          <div key={i} className="row-line" style={{ display: "grid", gridTemplateColumns: "130px minmax(0,1fr) minmax(0,1fr) auto", gap: 20, alignItems: "center", padding: "20px 0", borderTop: "2px solid var(--color-divider)" }}>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 15, fontVariantNumeric: "tabular-nums" }}>{s[0]}</div>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 18 }}>{s[1]}</div>
            <div className="row-venue" style={{ fontSize: 14, color: "color-mix(in srgb, var(--color-text) 65%, transparent)" }}>{s[2]}</div>
            <span className="tag tag-outline">{s[3]}</span>
          </div>
        ))}
      </section>
    </>
  );
}

export function TicketTiers() {
  const [pending, setPending] = useState<string | null>(null);
  const [confirm, setConfirm] = useState<{ title: string; body: string } | null>(null);

  const reserve = async (name: string, price: string) => {
    setPending(name);
    const res = await captureBooking("event", {
      kind: "ticket",
      summary: `${name} — ${EVENT.name}`,
      details: { tier: name, price },
      refPrefix: "LMN",
    });
    setPending(null);
    setConfirm({
      title: `${name} — reserved`,
      body: res.ok
        ? `Your tickets are held for 15 minutes (ref ${res.ref}). Check your email to complete payment; your wristband QR arrives on confirmation.`
        : "Your tickets are held for 15 minutes. Check your email to complete payment.",
    });
  };

  return (
    <>
      <div className="grid3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, background: "var(--color-divider)", border: "2px solid var(--color-divider)" }}>
        {TIERS.map((t) => {
          const featured = t.featured;
          return (
            <div key={t.name} style={{ background: featured ? "var(--color-accent)" : "var(--color-bg)", color: featured ? "var(--color-bg)" : "var(--color-text)", padding: "clamp(24px, 3vw, 36px)", display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.8, marginBottom: 16 }}>{t.tagline}</div>
              <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 26, margin: "0 0 8px" }}>{t.name}</h3>
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(34px, 4vw, 48px)", marginBottom: 20 }}>{t.price}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28, flex: 1 }}>
                {t.perks.map((perk) => (
                  <div key={perk} style={{ display: "flex", gap: 10, alignItems: "baseline", fontSize: 14, lineHeight: 1.4 }}>
                    <span style={{ color: featured ? "var(--color-bg)" : "var(--color-accent)", fontWeight: 800 }}>—</span>
                    <span>{perk}</span>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => reserve(t.name, t.price)}
                disabled={pending === t.name}
                className={featured ? "btn" : "btn btn-secondary"}
                style={{ padding: "12px 20px", ...(featured ? { background: "var(--color-bg)", color: "var(--color-accent)" } : {}) }}
              >
                {pending === t.name ? "Reserving…" : t.cta}
              </button>
            </div>
          );
        })}
      </div>
      <ConfirmModal open={!!confirm} onClose={() => setConfirm(null)} title={confirm?.title ?? ""} body={confirm?.body ?? ""} />
    </>
  );
}
