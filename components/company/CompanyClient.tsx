"use client";

import { useState } from "react";
import Link from "next/link";
import { PLANS, PRODUCTS, FAQS } from "@/lib/company";
import { FAQ } from "@/components/ds/FAQ";
import { Modal } from "@/components/ds/Modal";
import { captureMessage } from "@/lib/actions";

export function DemoForm() {
  const [done, setDone] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (done) {
    return (
      <div style={{ border: "2px solid var(--color-accent)", padding: 28 }}>
        <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 20, color: "var(--color-accent)", marginBottom: 8 }}>Thanks — we&apos;ll be in touch.</div>
        <p style={{ fontSize: 15, margin: 0, color: "color-mix(in srgb, var(--color-text) 75%, transparent)" }}>A solutions engineer will email you to schedule within one business day.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        setPending(true);
        setError(null);
        const res = await captureMessage("company", {
          name: String(fd.get("name") ?? ""),
          email: String(fd.get("email") ?? ""),
          subject: `Demo — ${fd.get("company") || "?"} (${fd.get("size")})`,
          message: String(fd.get("message") ?? ""),
        });
        setPending(false);
        if (res.ok) setDone(true);
        else setError(res.error ?? "Something went wrong.");
      }}
      style={{ display: "grid", gap: 18 }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        <div className="field"><label htmlFor="d-name">Full name</label><input id="d-name" name="name" className="input" required placeholder="Your name" /></div>
        <div className="field"><label htmlFor="d-email">Work email</label><input id="d-email" name="email" className="input" type="email" required placeholder="you@company.com" /></div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        <div className="field"><label htmlFor="d-company">Company</label><input id="d-company" name="company" className="input" placeholder="Company" /></div>
        <div className="field"><label htmlFor="d-size">Company size</label>
          <select id="d-size" name="size" className="input" style={{ minHeight: 40 }}>
            <option>1–50</option><option>51–200</option><option>201–1000</option><option>1000+</option>
          </select>
        </div>
      </div>
      <div className="field"><label htmlFor="d-msg">What are you trying to solve?</label><textarea id="d-msg" name="message" className="input" required placeholder="Tell us about your use case…" /></div>
      {error ? <div style={{ fontSize: 14, color: "var(--color-accent-700)" }}>{error}</div> : null}
      <button type="submit" className="btn btn-primary" disabled={pending} style={{ padding: "13px 24px", justifyContent: "flex-start" }}>{pending ? "Sending…" : "Request demo"}</button>
    </form>
  );
}

export function Pricing() {
  const [annual, setAnnual] = useState(true);
  return (
    <>
      <section className="wrap" style={{ paddingBlock: "clamp(24px, 3vw, 40px) 12px" }}>
        <div className="seg">
          {(["monthly", "annual"] as const).map((k) => (
            <button key={k} type="button" className={`seg-opt${(k === "annual") === annual ? " active" : ""}`} onClick={() => setAnnual(k === "annual")}>
              {k === "monthly" ? "Monthly" : "Annual"}
            </button>
          ))}
        </div>
        <span style={{ fontSize: 13, color: "var(--color-accent-700)", marginLeft: 14 }}>{annual ? "Save 2 months" : "Switch to annual to save"}</span>
      </section>
      <section className="wrap" style={{ paddingBlock: "20px clamp(48px, 6vw, 88px)" }}>
        <div className="grid3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, background: "var(--color-divider)", border: "2px solid var(--color-divider)" }}>
          {PLANS.map((pl) => {
            const f = pl.featured;
            return (
              <div key={pl.name} style={{ background: f ? "var(--color-accent)" : "var(--color-bg)", color: f ? "var(--color-bg)" : "var(--color-text)", padding: "clamp(24px, 3vw, 36px)", display: "flex", flexDirection: "column" }}>
                <div style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.8, marginBottom: 16 }}>{pl.tagline}</div>
                <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 26, margin: "0 0 8px" }}>{pl.name}</h3>
                <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 20 }}>
                  <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(34px, 4vw, 48px)" }}>{annual ? pl.annual : pl.monthly}</span>
                  {pl.per ? <span style={{ fontSize: 14, opacity: 0.7 }}>{annual ? "/mo, billed annually" : "/mo"}</span> : null}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28, flex: 1 }}>
                  {pl.perks.map((pk) => (
                    <div key={pk} style={{ display: "flex", gap: 10, alignItems: "baseline", fontSize: 14, lineHeight: 1.4 }}><span style={{ fontWeight: 800 }}>—</span><span>{pk}</span></div>
                  ))}
                </div>
                <Link href="/company/contact" className={f ? "btn" : "btn btn-secondary"} style={{ padding: "12px 20px", ...(f ? { background: "var(--color-bg)", color: "var(--color-accent)" } : {}) }}>{pl.cta}</Link>
              </div>
            );
          })}
        </div>
      </section>
      <hr className="rule" />
      <section className="wrap" style={{ paddingBlock: "clamp(36px, 5vw, 64px) clamp(48px, 6vw, 88px)" }}>
        <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(28px, 3.4vw, 40px)", letterSpacing: "-0.02em", margin: "0 0 24px", textTransform: "uppercase" }}>FAQ</h2>
        <FAQ items={FAQS} />
      </section>
    </>
  );
}

export function ProductsGrid() {
  const [open, setOpen] = useState<number | null>(null);
  const product = open != null ? PRODUCTS[open] : null;
  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 2, background: "var(--color-divider)", border: "2px solid var(--color-divider)" }}>
        {PRODUCTS.map((p, i) => (
          <div key={p.name} style={{ background: "var(--color-bg)", padding: "clamp(24px, 3vw, 36px)", display: "flex", flexDirection: "column" }}>
            <div style={{ width: 44, height: 44, background: "var(--color-accent)", color: "var(--color-bg)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
              <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 20 }}>{p.mark}</span>
            </div>
            <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 24, margin: "0 0 10px" }}>{p.name}</h3>
            <p style={{ fontSize: 15, lineHeight: 1.6, margin: "0 0 20px", flex: 1, color: "color-mix(in srgb, var(--color-text) 80%, transparent)" }}>{p.body}</p>
            <button type="button" onClick={() => setOpen(i)} style={{ background: "none", border: 0, cursor: "pointer", padding: 0, textAlign: "left", fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--color-accent)" }}>Learn more →</button>
          </div>
        ))}
      </div>
      <Modal open={product != null} onClose={() => setOpen(null)} width={560} showClose={false}>
        {product ? (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, marginBottom: 20 }}>
              <div style={{ width: 48, height: 48, background: "var(--color-accent)", color: "var(--color-bg)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 22 }}>{product.mark}</span>
              </div>
            </div>
            <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(28px, 4vw, 40px)", letterSpacing: "-0.02em", margin: "0 0 16px" }}>{product.name}</h3>
            <p style={{ fontSize: 16, lineHeight: 1.7, margin: "0 0 28px", color: "color-mix(in srgb, var(--color-text) 82%, transparent)" }}>{product.detail}</p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href="/company/contact" className="btn btn-primary" style={{ padding: "12px 20px" }}>Book a demo</Link>
              <button type="button" className="btn btn-secondary" onClick={() => setOpen(null)} style={{ padding: "12px 20px" }}>Close</button>
            </div>
          </>
        ) : null}
      </Modal>
    </>
  );
}
