"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon } from "@/components/icons";
import { Modal } from "@/components/ds/Modal";
import { ConfirmModal } from "@/components/ds/ConfirmModal";
import { COMPANY, NAV } from "@/lib/company";

export function CompanyHeader() {
  const pathname = usePathname();
  const [menu, setMenu] = useState(false);
  const [signIn, setSignIn] = useState(false);
  const [welcome, setWelcome] = useState(false);
  const active = (p: string) => pathname === p || pathname.startsWith(p + "/");

  return (
    <>
      <header style={{ position: "sticky", top: 0, zIndex: 60, background: "var(--color-bg)", borderBottom: "2px solid var(--color-divider)" }}>
        <div className="wrap" style={{ display: "flex", alignItems: "center", gap: 30, height: 74 }}>
          <Link href="/company" onClick={() => setMenu(false)} style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 20, letterSpacing: "-0.01em", textDecoration: "none", color: "var(--color-text)", textTransform: "uppercase" }}>{COMPANY.name}</Link>
          <nav className="desk-nav">
            {NAV.map((n) => (
              <Link key={n.path} href={n.path} className="nav-link" aria-current={active(n.path) ? "page" : undefined}>{n.label}</Link>
            ))}
          </nav>
          <div className="desk-nav nav-cta" style={{ marginLeft: 0, gap: 10 }}>
            <button type="button" className="btn btn-secondary" onClick={() => setSignIn(true)} style={{ padding: "9px 16px" }}>Sign in</button>
            <Link href="/company/contact" className="btn btn-primary" style={{ padding: "9px 16px" }}>Book a demo</Link>
          </div>
          <button type="button" className="burger btn btn-icon" onClick={() => setMenu((v) => !v)} aria-label="Menu"><MenuIcon size={20} /></button>
        </div>
        <div className={`mob-menu${menu ? " open" : ""}`} style={{ borderTop: "2px solid var(--color-divider)", background: "var(--color-bg)" }}>
          <div className="wrap" style={{ display: "flex", flexDirection: "column", paddingTop: 12, paddingBottom: 18 }}>
            {NAV.map((n) => (
              <Link key={n.path} href={n.path} onClick={() => setMenu(false)} style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 18, textTransform: "uppercase", textDecoration: "none", color: "var(--color-text)", paddingBlock: 12, borderBottom: "1px solid var(--color-divider)" }}>{n.label}</Link>
            ))}
            <button type="button" className="btn btn-primary" onClick={() => { setMenu(false); setSignIn(true); }} style={{ marginTop: 14, justifyContent: "center" }}>Sign in</button>
          </div>
        </div>
      </header>

      <Modal open={signIn} onClose={() => setSignIn(false)} label="Sign in" width={420} showClose={false}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 24, letterSpacing: "-0.015em", margin: 0 }}>Sign in</h3>
        </div>
        <form
          onSubmit={(e) => { e.preventDefault(); setSignIn(false); setWelcome(true); }}
          style={{ display: "grid", gap: 18 }}
        >
          <div className="field"><label htmlFor="si-email">Work email</label><input id="si-email" className="input" type="email" required placeholder="you@company.com" /></div>
          <div className="field"><label htmlFor="si-pass">Password</label><input id="si-pass" className="input" type="password" required placeholder="••••••••" /></div>
          <button type="submit" className="btn btn-primary" style={{ padding: "12px 20px", justifyContent: "flex-start" }}>Sign in</button>
          <div style={{ fontSize: 13, color: "color-mix(in srgb, var(--color-text) 60%, transparent)" }}>
            No account? <Link href="/company/contact" onClick={() => setSignIn(false)}>Start a free trial</Link>
          </div>
        </form>
      </Modal>

      <ConfirmModal open={welcome} onClose={() => setWelcome(false)} title="Welcome back" body="You are signed in. Redirecting you to your workspace…" />
    </>
  );
}
