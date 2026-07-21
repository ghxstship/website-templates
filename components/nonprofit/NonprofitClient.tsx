"use client";

import { useState } from "react";
import { Placeholder } from "@/components/Placeholder";
import { AMOUNT_OPTIONS, IMPACT_EXAMPLES, impactLine, INVOLVE_WAYS, NONPROFIT } from "@/lib/nonprofit";
import { useNonprofit } from "./NonprofitContext";

export function DonateForm() {
  const { totalGiven, giftCount, recordGift } = useNonprofit();
  const [freq, setFreq] = useState<"once" | "monthly">("once");
  const [amt, setAmt] = useState(50);
  const [customAmt, setCustomAmt] = useState("");
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState<string | null>(null);

  const effAmt = customAmt ? parseFloat(customAmt.replace(/[^0-9.]/g, "")) || 0 : amt;
  const per = freq === "monthly" ? "/mo" : "";

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = (e.currentTarget.elements.namedItem("np-email") as HTMLInputElement)?.value ?? "";
    setPending(true);
    const message = await recordGift(effAmt, freq, email);
    setPending(false);
    setDone(message);
  };

  if (done) {
    return (
      <div style={{ border: "2px solid var(--color-accent)", padding: "clamp(24px, 4vw, 40px)" }}>
        <div style={{ width: 48, height: 48, background: "var(--color-accent)", color: "var(--color-bg)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 24 }}>✓</div>
        <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(24px, 3vw, 34px)", letterSpacing: "-0.015em", margin: "0 0 12px" }}>Thank you.</h2>
        <p style={{ fontSize: 16, lineHeight: 1.6, margin: "0 0 22px", color: "color-mix(in srgb, var(--color-text) 78%, transparent)" }}>{done} A receipt is on its way to your email.</p>
        <button type="button" className="btn btn-secondary" onClick={() => { setDone(null); setCustomAmt(""); }} style={{ padding: "12px 20px" }}>Give again</button>
      </div>
    );
  }

  return (
    <div>
      {giftCount > 0 ? (
        <div style={{ padding: "12px 16px", border: "2px solid var(--color-accent)", fontSize: 14, marginBottom: 20, fontFamily: "var(--font-heading)", fontWeight: 800 }}>
          Welcome back — you’ve given ${totalGiven.toLocaleString()} across {giftCount} gift{giftCount === 1 ? "" : "s"}. Thank you.
        </div>
      ) : null}
      <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
        {(["once", "monthly"] as const).map((f) => (
          <button key={f} type="button" onClick={() => setFreq(f)} className="btn" style={{ flex: 1, justifyContent: "center", padding: 12, border: "1px solid var(--color-divider)", background: freq === f ? "var(--color-text)" : "transparent", color: freq === f ? "var(--color-bg)" : "var(--color-text)" }}>{f === "once" ? "One-time" : "Monthly"}</button>
        ))}
      </div>
      <div style={{ fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: "color-mix(in srgb, var(--color-text) 55%, transparent)", marginBottom: 12 }}>Choose an amount</div>
      <div className="amtgrid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginBottom: 16 }}>
        {AMOUNT_OPTIONS.map((v) => {
          const active = amt === v && !customAmt;
          return <button key={v} type="button" onClick={() => { setAmt(v); setCustomAmt(""); }} className="btn" style={{ padding: "16px 8px", border: "1px solid var(--color-divider)", background: active ? "var(--color-text)" : "transparent", color: active ? "var(--color-bg)" : "var(--color-text)", fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 18 }}>${v}</button>;
        })}
      </div>
      <div className="field" style={{ marginBottom: 20 }}><label htmlFor="np-custom">Or enter an amount</label><input id="np-custom" className="input" value={customAmt} onChange={(e) => setCustomAmt(e.target.value)} placeholder="$" style={{ minHeight: 44 }} /></div>
      <div style={{ padding: "14px 16px", background: "color-mix(in srgb, var(--color-accent) 10%, transparent)", fontSize: 14, marginBottom: 22 }}>{impactLine(effAmt)}</div>
      <form onSubmit={submit} style={{ display: "grid", gap: 16 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div className="field"><label htmlFor="np-name">Name</label><input id="np-name" className="input" required /></div>
          <div className="field"><label htmlFor="np-email">Email</label><input id="np-email" name="np-email" className="input" type="email" required /></div>
        </div>
        <div className="field"><label htmlFor="np-card">Card number</label><input id="np-card" className="input" required placeholder="4242 4242 4242 4242" /></div>
        <button type="submit" className="btn btn-primary" disabled={pending || effAmt <= 0} style={{ padding: "14px 24px", justifyContent: "flex-start" }}>{pending ? "Processing…" : `Give $${effAmt}${per}`}</button>
        <div style={{ fontSize: 12, color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }}>{NONPROFIT.orgName} is a registered charity. Donations may be tax-deductible.</div>
      </form>
    </div>
  );
}

export function DonateAside() {
  return (
    <aside style={{ border: "2px solid var(--color-divider)", position: "sticky", top: 90 }}>
      <figure className="grayscale" style={{ margin: 0, aspectRatio: "4/3", borderBottom: "2px solid var(--color-divider)" }}><Placeholder label="On the front line" /></figure>
      <div style={{ padding: 22 }}>
        <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 18, margin: "0 0 12px" }}>Your impact</h3>
        {IMPACT_EXAMPLES.map((i) => (
          <div key={i.amt} style={{ display: "flex", gap: 10, alignItems: "baseline", padding: "8px 0", borderTop: "1px solid var(--color-divider)", fontSize: 14, lineHeight: 1.4 }}>
            <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, color: "var(--color-accent)", minWidth: 46 }}>{i.amt}</span>
            <span>{i.does}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}

export function InvolveWays() {
  const { notify } = useNonprofit();
  return (
    <div className="grid3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, background: "var(--color-divider)", border: "2px solid var(--color-divider)" }}>
      {INVOLVE_WAYS.map((w) => (
        <div key={w.key} style={{ background: "var(--color-bg)", padding: "26px 24px", display: "flex", flexDirection: "column" }}>
          <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 20, margin: "0 0 8px" }}>{w.name}</h3>
          <p style={{ fontSize: 14, lineHeight: 1.55, margin: "0 0 18px", flex: 1, color: "color-mix(in srgb, var(--color-text) 74%, transparent)" }}>{w.body}</p>
          <button type="button" className="btn btn-primary" onClick={() => notify(w.title, w.note)} style={{ justifyContent: "center", padding: "10px 16px" }}>{w.cta}</button>
        </div>
      ))}
    </div>
  );
}
