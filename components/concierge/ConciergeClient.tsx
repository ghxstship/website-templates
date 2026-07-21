"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CATEGORIES, REQ_CATS, SERVICE_SECTIONS, PLANS, STATUS_TAGS } from "@/lib/concierge";
import { useConcierge } from "./ConciergeContext";

export function CategoryGrid() {
  const router = useRouter();
  return (
    <div className="grid3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, background: "var(--color-divider)", border: "2px solid var(--color-divider)" }}>
      {CATEGORIES.map(([name, desc]) => (
        <button key={name} type="button" onClick={() => router.push(`/concierge/request?cat=${encodeURIComponent(name)}`)} style={{ background: "var(--color-bg)", padding: "26px 24px", cursor: "pointer", border: 0, textAlign: "left", font: "inherit", color: "inherit" }}>
          <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 19, margin: "0 0 8px" }}>{name}</h3>
          <p style={{ fontSize: 14, lineHeight: 1.55, margin: "0 0 14px", color: "color-mix(in srgb, var(--color-text) 74%, transparent)" }}>{desc}</p>
          <span style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--color-accent-700)" }}>Request →</span>
        </button>
      ))}
    </div>
  );
}

export function RequestForm({ initialCat = "Dining" }: { initialCat?: string }) {
  const { addRequest } = useConcierge();
  const [cat, setCat] = useState(REQ_CATS.includes(initialCat) ? initialCat : "Dining");
  const [priority, setPriority] = useState("Standard");
  const [pending, setPending] = useState(false);
  const responseTime = priority === "Right now" ? "a few minutes" : priority === "Urgent (within 24h)" ? "under an hour" : "within 4 hours";

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const detail = (e.currentTarget.elements.namedItem("co-detail") as HTMLTextAreaElement)?.value ?? "";
    setPending(true);
    await addRequest(cat, detail, responseTime);
    setPending(false);
  };

  return (
    <>
      <div style={{ fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: "color-mix(in srgb, var(--color-text) 55%, transparent)", marginBottom: 12 }}>Category</div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}>
        {REQ_CATS.map((c) => (
          <button key={c} type="button" onClick={() => setCat(c)} className="btn" style={{ padding: "9px 16px", border: "1px solid var(--color-divider)", background: cat === c ? "var(--color-text)" : "transparent", color: cat === c ? "var(--color-bg)" : "var(--color-text)" }}>{c}</button>
        ))}
      </div>
      <form onSubmit={submit} style={{ display: "grid", gap: 18 }}>
        <div className="field"><label htmlFor="co-detail">What can we arrange?</label><textarea id="co-detail" name="co-detail" className="input" required placeholder="e.g. A table for four at 8pm Friday, somewhere quiet." style={{ minHeight: 110 }} /></div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
          <div className="field"><label htmlFor="co-when">When</label><input id="co-when" className="input" type="date" style={{ minHeight: 42 }} /></div>
          <div className="field"><label htmlFor="co-pri">Priority</label><select id="co-pri" className="input" value={priority} onChange={(e) => setPriority(e.target.value)} style={{ minHeight: 42 }}><option>Standard</option><option>Urgent (within 24h)</option><option>Right now</option></select></div>
        </div>
        <div className="field"><label htmlFor="co-budget">Budget (optional)</label><input id="co-budget" className="input" placeholder="Any guidance helps" /></div>
        <button type="submit" className="btn btn-primary" disabled={pending} style={{ padding: "13px 24px", justifyContent: "flex-start" }}>{pending ? "Sending…" : "Send to my manager"}</button>
        <div style={{ fontSize: 12, color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }}>Typical first response: {responseTime}.</div>
      </form>
    </>
  );
}

export function RequestsList() {
  const { requests, withdraw, message } = useConcierge();
  return (
    <>
      {requests.length === 0 ? (
        <p style={{ fontSize: 16, color: "color-mix(in srgb, var(--color-text) 60%, transparent)", padding: "16px 0" }}>No open requests. Tap “Make a request” to start one.</p>
      ) : null}
      {requests.map((r) => {
        const closed = r.status === "Done";
        return (
          <div key={r.id} className="row-line" style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.5fr) minmax(0, 0.6fr) auto auto", gap: 18, alignItems: "center", padding: "18px 0", borderTop: "2px solid var(--color-divider)" }}>
            <div><div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 16 }}>{r.title}</div><div style={{ fontSize: 13, color: "color-mix(in srgb, var(--color-text) 58%, transparent)", marginTop: 4 }}>{r.cat} · {r.when}</div></div>
            <div className="row-sub" style={{ fontSize: 13, color: "color-mix(in srgb, var(--color-text) 60%, transparent)" }}>with {r.manager}</div>
            <span className={`tag ${STATUS_TAGS[r.status] ?? "tag-outline"}`}>{r.status}</span>
            <div style={{ display: "flex", gap: 8, alignItems: "center", justifyContent: "flex-end" }}>
              {!closed ? <button type="button" onClick={() => withdraw(r.id, r.title)} className="btn btn-secondary" style={{ padding: "7px 12px", fontSize: 12 }}>Cancel</button> : null}
              <button type="button" className={`btn ${closed ? "btn-secondary" : "btn-primary"}`} onClick={() => !closed && message(r.manager)} disabled={closed} style={{ padding: "7px 14px", fontSize: 12 }}>{closed ? "Closed" : "Message"}</button>
            </div>
          </div>
        );
      })}
    </>
  );
}

export function ServiceSections() {
  const router = useRouter();
  return (
    <>
      {SERVICE_SECTIONS.map((sec) => (
        <div key={sec.name} className="split2" style={{ display: "grid", gridTemplateColumns: "minmax(0, 0.4fr) minmax(0, 1fr)", gap: "clamp(20px, 4vw, 56px)", alignItems: "start", paddingBlock: "clamp(24px, 3vw, 40px)", borderTop: "2px solid var(--color-divider)" }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(22px, 2.8vw, 32px)", letterSpacing: "-0.015em", margin: 0, textTransform: "uppercase" }}>{sec.name}</h2>
          <div>
            <p style={{ fontSize: 15.5, lineHeight: 1.6, margin: "0 0 16px", color: "color-mix(in srgb, var(--color-text) 80%, transparent)" }}>{sec.intro}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>{sec.items.map((i) => <span key={i} className="tag tag-neutral">{i}</span>)}</div>
            <button type="button" className="btn btn-primary" onClick={() => router.push(`/concierge/request?cat=${encodeURIComponent(sec.name.split(" ")[0])}`)} style={{ marginTop: 20, padding: "10px 20px" }}>Request this</button>
          </div>
        </div>
      ))}
    </>
  );
}

/** Tier display only — applications/billing are owned by Membership OS (/membership). */
export function MembershipPlans() {
  return (
    <div className="grid3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, background: "var(--color-divider)", border: "2px solid var(--color-divider)" }}>
      {PLANS.map((pl) => {
        const featured = pl.key === "personal";
        return (
          <div key={pl.key} style={{ background: featured ? "var(--color-accent)" : "var(--color-bg)", color: featured ? "var(--color-bg)" : "var(--color-text)", padding: "clamp(24px, 3vw, 40px)", display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.8, marginBottom: 16 }}>{pl.tagline}</div>
            <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 26, margin: "0 0 8px" }}>{pl.name}</h3>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 22 }}><span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(30px, 4vw, 44px)" }}>{pl.price}</span><span style={{ fontSize: 14, opacity: 0.7 }}>{pl.per}</span></div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28, flex: 1 }}>
              {pl.perks.map((pk) => <div key={pk} style={{ display: "flex", gap: 10, alignItems: "baseline", fontSize: 14, lineHeight: 1.4 }}><span style={{ fontWeight: 800 }}>—</span><span>{pk}</span></div>)}
            </div>
            <Link href="/membership" className="btn" style={{ padding: "12px 20px", textDecoration: "none", justifyContent: "center", background: featured ? "var(--color-bg)" : "var(--color-accent)", color: featured ? "var(--color-accent)" : "var(--color-bg)", border: 0 }}>{pl.price === "Custom" ? "Talk to us ↗" : `Choose ${pl.name} ↗`}</Link>
          </div>
        );
      })}
    </div>
  );
}
