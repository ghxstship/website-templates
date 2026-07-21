"use client";

import { useState } from "react";
import { TIERS, PERKS, PROPOSALS, PENDING_APPS, ADMIN_STATS, MEMBERSHIP, type Tier } from "@/lib/membership";
import { useMembership } from "./MembershipContext";

export function ApplyFunnel() {
  const { status, applyRef, submitApply, simulateApprove, resetApply } = useMembership();
  const [mode, setMode] = useState<"apply" | "referral">("apply");
  const [pending, setPending] = useState(false);

  if (status === "pending") {
    return (
      <div style={{ border: "2px solid var(--color-accent)", padding: "clamp(24px, 4vw, 40px)" }}>
        <div style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-accent-700)", marginBottom: 12 }}>Application received</div>
        <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(24px, 3vw, 34px)", letterSpacing: "-0.015em", margin: "0 0 12px" }}>You&rsquo;re on the list.</h2>
        <p style={{ fontSize: 16, lineHeight: 1.6, margin: "0 0 22px", color: "color-mix(in srgb, var(--color-text) 78%, transparent)" }}>Your reference is <strong>{applyRef}</strong>. The membership committee reviews applications weekly — we&rsquo;ll email you either way. Members can vouch to move you up.</p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <button type="button" className="btn btn-primary" onClick={simulateApprove} style={{ padding: "12px 20px" }}>Simulate approval →</button>
          <button type="button" className="btn btn-secondary" onClick={resetApply} style={{ padding: "12px 20px" }}>Start over</button>
        </div>
      </div>
    );
  }

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setPending(true);
    await submitApply(
      (form.elements.namedItem("mo-name") as HTMLInputElement)?.value ?? "",
      (form.elements.namedItem("mo-email") as HTMLInputElement)?.value ?? "",
    );
    setPending(false);
  };

  return (
    <>
      <div style={{ display: "flex", gap: 8, marginBottom: 28, flexWrap: "wrap" }}>
        {(["apply", "referral"] as const).map((m) => (
          <button key={m} type="button" onClick={() => setMode(m)} className="btn" style={{ padding: "10px 18px", border: "1px solid var(--color-divider)", background: mode === m ? "var(--color-text)" : "transparent", color: mode === m ? "var(--color-bg)" : "var(--color-text)" }}>{m === "apply" ? "Apply" : "I have a referral"}</button>
        ))}
      </div>
      <form onSubmit={submit} style={{ display: "grid", gap: 18 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
          <div className="field"><label htmlFor="mo-name">Full name</label><input id="mo-name" name="mo-name" className="input" required /></div>
          <div className="field"><label htmlFor="mo-email">Email</label><input id="mo-email" name="mo-email" className="input" type="email" required /></div>
        </div>
        {mode === "referral" ? <div className="field"><label htmlFor="mo-ref">Member referral code</label><input id="mo-ref" className="input" required placeholder="e.g. MV-2231" /></div> : null}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
          <div className="field"><label htmlFor="mo-city">City</label><input id="mo-city" className="input" required /></div>
          <div className="field"><label htmlFor="mo-tier">Desired tier</label><select id="mo-tier" className="input" style={{ minHeight: 42 }}><option>Resident</option><option>Patron</option><option>Founder</option></select></div>
        </div>
        <div className="field"><label htmlFor="mo-why">What draws you to the club?</label><textarea id="mo-why" className="input" required style={{ minHeight: 100 }} /></div>
        <button type="submit" className="btn btn-primary" disabled={pending} style={{ padding: "13px 24px", justifyContent: "flex-start" }}>{pending ? "Submitting…" : mode === "referral" ? "Submit with referral" : "Submit application"}</button>
      </form>
    </>
  );
}

export function TiersGrid() {
  const { isMember, tier, chooseTier } = useMembership();
  return (
    <div className="grid3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, background: "var(--color-divider)", border: "2px solid var(--color-divider)" }}>
      {TIERS.map((t) => {
        const featured = t.key === "patron";
        const current = isMember && tier === t.key;
        return (
          <div key={t.key} style={{ background: featured ? "var(--color-accent)" : "var(--color-bg)", color: featured ? "var(--color-bg)" : "var(--color-text)", padding: "clamp(24px, 3vw, 40px)", display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.8, marginBottom: 16 }}>{t.tagline}</div>
            <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 28, margin: "0 0 8px" }}>{t.name}</h3>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 22 }}><span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(30px, 4vw, 46px)" }}>{t.price}</span><span style={{ fontSize: 14, opacity: 0.7 }}>{t.per}</span></div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28, flex: 1 }}>
              {t.perks.map((pk) => <div key={pk} style={{ display: "flex", gap: 10, alignItems: "baseline", fontSize: 14, lineHeight: 1.4 }}><span style={{ fontWeight: 800 }}>—</span><span>{pk}</span></div>)}
            </div>
            <button type="button" className="btn" disabled={current} onClick={() => chooseTier(t.key as Tier, t.name)} style={{ padding: "12px 20px", background: featured ? "var(--color-bg)" : "var(--color-accent)", color: featured ? "var(--color-accent)" : "var(--color-bg)", border: 0, opacity: current ? 0.6 : 1 }}>
              {current ? "Current tier" : isMember ? `Switch to ${t.name}` : `Choose ${t.name}`}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export function PassView() {
  const { tierName, usedPerks, redeemPerk } = useMembership();
  return (
    <section className="wrap split2" style={{ paddingBlock: "clamp(28px, 4vw, 48px)", display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: "clamp(28px, 5vw, 56px)", alignItems: "start" }}>
      <div style={{ background: "var(--color-text)", color: "var(--color-bg)", padding: "clamp(24px, 3vw, 36px)", aspectRatio: "16/10", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}><span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", fontSize: 13 }}>{MEMBERSHIP.brand}</span><span className="tag tag-accent">{tierName}</span></div>
        <div style={{ width: 60, height: 60, background: "repeating-linear-gradient(45deg, var(--color-bg) 0 4px, transparent 4px 8px)" }} />
        <div><div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(20px, 3vw, 28px)" }}>Alex Rivera</div><div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", opacity: 0.8 }}><span>No. 4021</span><span>Valid thru 12/27</span></div></div>
      </div>
      <div>
        <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 22, margin: "0 0 6px" }}>Perk wallet</h2>
        <p style={{ fontSize: 14, color: "color-mix(in srgb, var(--color-text) 62%, transparent)", margin: "0 0 16px" }}>Redeemable across the ecosystem. $120 credit remaining.</p>
        {PERKS.map((pk, i) => {
          const used = usedPerks.includes(String(i));
          return (
            <div key={pk.name} className="row-line" style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: 14, alignItems: "center", padding: "14px 0", borderTop: "1px solid var(--color-divider)" }}>
              <div><div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 15 }}>{pk.name}</div><div style={{ fontSize: 12, color: "color-mix(in srgb, var(--color-text) 58%, transparent)" }}>{pk.venue}</div></div>
              <div className="row-sub" style={{ fontSize: 13, color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }}>{pk.expires}</div>
              <button type="button" className={`btn ${used ? "btn-secondary" : "btn-primary"}`} disabled={used} onClick={() => redeemPerk(i, pk.name, pk.venue)} style={{ padding: "7px 14px", fontSize: 12 }}>{used ? "Redeemed" : "Redeem"}</button>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function GovernanceList() {
  const { votes, vote } = useMembership();
  return (
    <>
      {PROPOSALS.map((pr) => {
        const v = votes[pr.id];
        const tally = {
          For: pr.base.For + (v === "For" ? 1 : 0),
          Against: pr.base.Against + (v === "Against" ? 1 : 0),
          Abstain: pr.base.Abstain + (v === "Abstain" ? 1 : 0),
        };
        const total = tally.For + tally.Against + tally.Abstain;
        return (
          <div key={pr.id} style={{ border: "2px solid var(--color-divider)", padding: "clamp(20px, 3vw, 32px)", marginBottom: 20 }}>
            <div style={{ fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-accent-700)", marginBottom: 10 }}>{pr.tag}</div>
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(20px, 2.6vw, 30px)", letterSpacing: "-0.015em", margin: "0 0 10px" }}>{pr.title}</h2>
            <p style={{ fontSize: 15, lineHeight: 1.6, margin: "0 0 20px", maxWidth: "64ch", color: "color-mix(in srgb, var(--color-text) 80%, transparent)" }}>{pr.body}</p>
            {(["For", "Against", "Abstain"] as const).map((k) => {
              const pct = Math.round((tally[k] / total) * 100);
              const chosen = v === k;
              return (
                <div key={k} style={{ marginBottom: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginBottom: 6 }}>
                    <button type="button" onClick={() => vote(pr.id, pr.title, k)} className="btn" style={{ padding: "6px 16px", border: `1px solid ${chosen ? "var(--color-accent)" : "var(--color-divider)"}`, background: chosen ? "var(--color-accent)" : "transparent", color: chosen ? "var(--color-bg)" : "var(--color-text)" }}>{k}</button>
                    <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 14 }}>{pct}%</span>
                  </div>
                  <div style={{ height: 8, background: "color-mix(in srgb, var(--color-text) 12%, transparent)" }}><div style={{ height: "100%", background: "var(--color-accent)", width: `${pct}%` }} /></div>
                </div>
              );
            })}
            {v ? <div style={{ fontSize: 13, color: "var(--color-accent-700)", fontFamily: "var(--font-heading)", fontWeight: 800, marginTop: 12 }}>You voted: {v}</div> : null}
          </div>
        );
      })}
    </>
  );
}

export function AdminConsole() {
  const { decisions, decide } = useMembership();
  return (
    <>
      <section className="wrap" style={{ paddingBlock: "clamp(20px, 3vw, 36px) 8px" }}>
        <div className="grid4" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 2, background: "var(--color-divider)", border: "2px solid var(--color-divider)" }}>
          {ADMIN_STATS.map((s) => (
            <div key={s.label} style={{ background: "var(--color-bg)", padding: 22 }}>
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(24px, 3vw, 40px)", color: "var(--color-accent)", lineHeight: 1 }}>{s.num}</div>
              <div style={{ fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase", color: "color-mix(in srgb, var(--color-text) 58%, transparent)", marginTop: 8 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>
      <section className="wrap" style={{ paddingBlock: "clamp(20px, 3vw, 32px) clamp(48px, 6vw, 80px)" }}>
        <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 22, margin: "0 0 8px" }}>Applications to review</h2>
        {PENDING_APPS.map((a) => {
          const done = decisions[a.id];
          const statusTag = done === "Approved" ? "tag-accent" : done === "Declined" ? "tag-neutral" : "tag-outline";
          return (
            <div key={a.id} style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) auto auto auto auto", gap: 14, alignItems: "center", padding: "14px 0", borderTop: "2px solid var(--color-divider)" }}>
              <div><div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 15 }}>{a.name}</div><div style={{ fontSize: 12, color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }}>{a.ref} · {a.when}</div></div>
              <span className="tag tag-outline">{a.tier}</span>
              <span className={`tag ${statusTag}`}>{done ?? "Pending"}</span>
              <button type="button" className="btn btn-primary" disabled={!!done} onClick={() => decide(a.id, "Approved")} style={{ padding: "6px 14px", fontSize: 12 }}>Approve</button>
              <button type="button" className="btn btn-secondary" disabled={!!done} onClick={() => decide(a.id, "Declined")} style={{ padding: "6px 14px", fontSize: 12 }}>Decline</button>
            </div>
          );
        })}
      </section>
    </>
  );
}
