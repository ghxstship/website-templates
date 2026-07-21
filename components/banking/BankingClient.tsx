"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon } from "@/components/icons";
import { useBanking } from "./BankingContext";
import { BANKING, NAV, ACCOUNTS, CRYPTO, TRANSACTIONS, CHAIN_FEATURES, MARKETS, REWARDS, PERSONAL_PLANS, BUSINESS_PLANS } from "@/lib/banking";

const UP = "var(--color-up)";
const DOWN = "var(--color-accent-700)";

export function BankingHeader() {
  const pathname = usePathname();
  const { openModal } = useBanking();
  const [menu, setMenu] = useState(false);
  const active = (p: string) => (p === "/banking" ? pathname === p : pathname.startsWith(p));
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 60, background: "var(--color-bg)", borderBottom: "2px solid var(--color-divider)" }}>
      <div className="wrap" style={{ display: "flex", alignItems: "center", gap: 26, height: 74 }}>
        <Link href="/banking" onClick={() => setMenu(false)} style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 20, letterSpacing: "-0.01em", textDecoration: "none", color: "var(--color-text)", textTransform: "uppercase", marginRight: "auto" }}>{BANKING.brand}</Link>
        <nav className="desk-nav" style={{ marginLeft: 0 }}>
          {NAV.map((n) => <Link key={n.path} href={n.path} className="nav-link" aria-current={active(n.path) ? "page" : undefined}>{n.label}</Link>)}
        </nav>
        <Link href="/banking/dashboard" className="btn btn-secondary desk-nav" style={{ padding: "8px 14px" }}>Sign in</Link>
        <button type="button" className="btn btn-primary" onClick={() => openModal("open")} style={{ padding: "9px 16px", flex: "0 0 auto" }}>Open account</button>
        <button type="button" className="burger btn btn-icon" onClick={() => setMenu((v) => !v)} aria-label="Menu"><MenuIcon size={20} /></button>
      </div>
      <div className={`mob-menu${menu ? " open" : ""}`} style={{ borderTop: "2px solid var(--color-divider)" }}>
        <div className="wrap" style={{ display: "flex", flexDirection: "column", paddingBlock: "12px 18px" }}>
          {NAV.map((n) => <Link key={n.path} href={n.path} onClick={() => setMenu(false)} style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 18, textTransform: "uppercase", textDecoration: "none", color: "var(--color-text)", padding: "12px 0", borderBottom: "1px solid var(--color-divider)" }}>{n.label}</Link>)}
        </div>
      </div>
    </header>
  );
}

export function OpenAccountButton({ label, className, style }: { label: string; className: string; style?: React.CSSProperties }) {
  const { openModal } = useBanking();
  return <button type="button" className={className} style={style} onClick={() => openModal("open")}>{label}</button>;
}

export function Dashboard() {
  const { openModal, notify, balanceCents, transfers } = useBanking();
  const liveBalance = "$" + (balanceCents / 100).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const accounts = ACCOUNTS.map((a, i) => (i === 0 ? { ...a, balance: liveBalance } : a));
  const activity = [...transfers, ...TRANSACTIONS];
  const actions: [string, () => void][] = [
    ["Send", () => openModal("send")],
    ["Request", () => notify("Request — ready", "Your request flow is set up. This is a prototype action.")],
    ["Add money", () => notify("Add money — ready", "Your add-money flow is set up. This is a prototype action.")],
    ["Trade", () => openModal("convert")],
  ];
  return (
    <>
      <section className="wrap" style={{ paddingBlock: "clamp(24px, 3vw, 40px) 8px" }}>
        <div className="grid3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, background: "var(--color-divider)", border: "2px solid var(--color-divider)" }}>
          {accounts.map((a) => (
            <div key={a.name} style={{ background: a.dark ? "var(--color-text)" : "var(--color-bg)", color: a.dark ? "var(--color-bg)" : "var(--color-text)", padding: 24 }}>
              <div style={{ fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", opacity: 0.75, marginBottom: 10 }}>{a.name}</div>
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(26px, 3vw, 38px)", lineHeight: 1 }}>{a.balance}</div>
              <div style={{ fontSize: 12, marginTop: 8, opacity: 0.7 }}>{a.sub}</div>
            </div>
          ))}
        </div>
      </section>
      <section className="wrap" style={{ paddingBlock: "16px 8px" }}>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {actions.map(([label, fn]) => <button key={label} type="button" className="btn btn-secondary" onClick={fn} style={{ padding: "11px 20px" }}>{label}</button>)}
        </div>
      </section>
      <section className="wrap" style={{ paddingBlock: "clamp(24px, 3vw, 36px) 8px" }}>
        <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 22, margin: "0 0 16px" }}>Crypto &amp; assets</h2>
        {CRYPTO.map((c) => (
          <div key={c.name} className="row-line" style={{ display: "grid", gridTemplateColumns: "44px minmax(0,1fr) minmax(0,1fr) auto auto", gap: 16, alignItems: "center", padding: "14px 0", borderTop: "2px solid var(--color-divider)" }}>
            <div style={{ width: 36, height: 36, background: "var(--color-text)", color: "var(--color-bg)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 13 }}>{c.sym}</div>
            <div><div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 15 }}>{c.name}</div><div style={{ fontSize: 12, color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }}>{c.amount}</div></div>
            <div className="row-sub" style={{ fontSize: 14, color: c.up ? UP : DOWN }}>{c.change}</div>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 15 }}>{c.value}</div>
            <button type="button" className="btn btn-primary" onClick={() => openModal("convert")} style={{ padding: "7px 14px", fontSize: 12 }}>Trade</button>
          </div>
        ))}
      </section>
      <section className="wrap" style={{ paddingBlock: "clamp(24px, 3vw, 36px) clamp(48px, 6vw, 80px)" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16, marginBottom: 8 }}><h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 22, margin: 0 }}>Recent activity</h2><span style={{ fontSize: 13, color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }}>This month</span></div>
        {activity.map((t, i) => (
          <div key={`${t.merchant}-${i}`} className="row-line" style={{ display: "grid", gridTemplateColumns: "44px minmax(0,1fr) minmax(0,0.8fr) auto", gap: 16, alignItems: "center", padding: "14px 0", borderTop: "1px solid var(--color-divider)" }}>
            <div style={{ width: 34, height: 34, border: "1px solid var(--color-divider)", display: "flex", alignItems: "center", justifyContent: "center", color: "color-mix(in srgb, var(--color-text) 60%, transparent)", fontWeight: 800 }}>{t.out ? "↗" : "↙"}</div>
            <div><div style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 15 }}>{t.merchant}</div><div style={{ fontSize: 12, color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }}>{t.cat}</div></div>
            <div className="row-sub" style={{ fontSize: 13, color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }}>{t.date}</div>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 15, color: t.out ? "var(--color-text)" : UP }}>{t.amount}</div>
          </div>
        ))}
      </section>
    </>
  );
}

export function CryptoPage() {
  const { openModal } = useBanking();
  return (
    <section className="wrap split2" style={{ paddingBlock: "clamp(24px, 3vw, 44px)", display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: "clamp(28px, 5vw, 56px)", alignItems: "start" }}>
      <div>
        <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(22px, 2.6vw, 32px)", letterSpacing: "-0.015em", margin: "0 0 16px" }}>Buy, hold, spend and earn — natively.</h2>
        <p style={{ fontSize: 16, lineHeight: 1.65, margin: "0 0 24px", color: "color-mix(in srgb, var(--color-text) 82%, transparent)" }}>Your wallet holds fiat and crypto side by side. Spend either from the same card, self-custody your keys, and settle on-chain in seconds.</p>
        {CHAIN_FEATURES.map((f) => (
          <div key={f.h} style={{ display: "flex", gap: 12, alignItems: "baseline", padding: "12px 0", borderTop: "1px solid var(--color-divider)" }}><span style={{ color: "var(--color-accent)", fontWeight: 800 }}>—</span><div><div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 15 }}>{f.h}</div><div style={{ fontSize: 13.5, color: "color-mix(in srgb, var(--color-text) 72%, transparent)", marginTop: 3 }}>{f.b}</div></div></div>
        ))}
      </div>
      <div style={{ border: "2px solid var(--color-divider)" }}>
        <div style={{ padding: "18px 20px", borderBottom: "2px solid var(--color-divider)", fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 16, textTransform: "uppercase" }}>Markets</div>
        {MARKETS.map((m) => (
          <div key={m.name} style={{ display: "grid", gridTemplateColumns: "40px 1fr auto auto", gap: 14, alignItems: "center", padding: "14px 20px", borderBottom: "1px solid var(--color-divider)" }}>
            <div style={{ width: 32, height: 32, background: "var(--color-text)", color: "var(--color-bg)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 12 }}>{m.sym}</div>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 14 }}>{m.name}</div>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 14 }}>{m.price}</div>
            <div style={{ fontSize: 13, color: m.up ? UP : DOWN, minWidth: 56, textAlign: "right" }}>{m.change}</div>
          </div>
        ))}
        <div style={{ padding: "18px 20px" }}><button type="button" className="btn btn-primary" onClick={() => openModal("convert")} style={{ width: "100%", justifyContent: "center", padding: "12px 20px" }}>Trade now</button></div>
      </div>
    </section>
  );
}

export function Rewards() {
  const { points, redeem } = useBanking();
  return (
    <>
      <section style={{ background: "var(--color-text)", color: "var(--color-bg)" }}>
        <div className="wrap" style={{ paddingBlock: 24, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}><span style={{ fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", opacity: 0.8 }}>Your points</span><span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(28px, 3vw, 40px)", color: "var(--color-accent)" }}>{points.toLocaleString()} pts</span></div>
      </section>
      <section className="wrap" style={{ paddingBlock: "clamp(24px, 3vw, 44px) clamp(48px, 6vw, 80px)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "clamp(16px, 2vw, 28px)" }}>
          {REWARDS.map((r) => {
            const disabled = points < r.cost;
            return (
              <div key={r.name} style={{ border: "2px solid var(--color-divider)", padding: 24, display: "flex", flexDirection: "column" }}>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 18, marginBottom: 8 }}>{r.name}</div>
                <p style={{ fontSize: 14, lineHeight: 1.55, margin: "0 0 20px", flex: 1, color: "color-mix(in srgb, var(--color-text) 72%, transparent)" }}>{r.desc}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}><span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 16, color: "var(--color-accent)" }}>{r.cost.toLocaleString()} pts</span><button type="button" onClick={() => redeem(r.name, r.cost)} disabled={disabled} className={disabled ? "btn btn-secondary" : "btn btn-primary"} style={{ padding: "9px 16px" }}>{disabled ? "Not enough" : "Redeem"}</button></div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

export function Plans({ initialTab = "personal" }: { initialTab?: "personal" | "business" }) {
  const { notify } = useBanking();
  const [tab, setTab] = useState<"personal" | "business">(initialTab);
  const src = tab === "business" ? BUSINESS_PLANS : PERSONAL_PLANS;
  return (
    <>
      <section className="wrap" style={{ paddingBlock: "20px 8px" }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {(["personal", "business"] as const).map((k) => <button key={k} type="button" onClick={() => setTab(k)} className={`chip${tab === k ? " active" : ""}`} style={{ padding: "8px 18px" }}>{k === "personal" ? "Personal" : "Business"}</button>)}
        </div>
      </section>
      <section className="wrap" style={{ paddingBlock: "16px clamp(48px, 6vw, 80px)" }}>
        <div className="grid3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, background: "var(--color-divider)", border: "2px solid var(--color-divider)" }}>
          {src.map((pl) => {
            const f = pl.featured;
            return (
              <div key={pl.key} style={{ background: f ? "var(--color-accent)" : "var(--color-bg)", color: f ? "var(--color-bg)" : "var(--color-text)", padding: "clamp(24px, 3vw, 40px)", display: "flex", flexDirection: "column" }}>
                <div style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.8, marginBottom: 16 }}>{pl.tagline}</div>
                <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 26, margin: "0 0 8px" }}>{pl.name}</h3>
                <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 22 }}><span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(30px, 4vw, 44px)" }}>{pl.price}</span><span style={{ fontSize: 14, opacity: 0.7 }}>{pl.per}</span></div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28, flex: 1 }}>{pl.perks.map((pk) => <div key={pk} style={{ display: "flex", gap: 10, alignItems: "baseline", fontSize: 14, lineHeight: 1.4 }}><span style={{ fontWeight: 800 }}>—</span><span>{pk}</span></div>)}</div>
                <button type="button" onClick={() => notify(`${pl.name} selected`, `Great choice. Continue to open your ${BANKING.brand} ${pl.name} account.`)} className={f ? "btn" : "btn btn-primary"} style={{ padding: "12px 20px", ...(f ? { background: "var(--color-bg)", color: "var(--color-accent)" } : {}) }}>{pl.price === "Custom" ? "Contact sales" : `Choose ${pl.name}`}</button>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
