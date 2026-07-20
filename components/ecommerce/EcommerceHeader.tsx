"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon } from "@/components/icons";
import { useCart } from "./CartContext";

const NAV = [
  { label: "Home", path: "/ecommerce" },
  { label: "Shop", path: "/ecommerce/shop" },
];

export function EcommerceHeader({ brand }: { brand: string }) {
  const pathname = usePathname();
  const { count, openCart } = useCart();
  const [open, setOpen] = useState(false);
  const active = (p: string) => (p === "/ecommerce" ? pathname === p : pathname.startsWith(p));

  return (
    <>
      <div
        style={{
          background: "var(--color-text)",
          color: "var(--color-bg)",
          textAlign: "center",
          fontSize: 12,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          padding: "8px 16px",
        }}
      >
        Free shipping over $75 — 30-day returns
      </div>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 60,
          background: "var(--color-bg)",
          borderBottom: "2px solid var(--color-divider)",
        }}
      >
        <div className="wrap" style={{ display: "flex", alignItems: "center", gap: 28, height: 72 }}>
          <Link
            href="/ecommerce"
            onClick={() => setOpen(false)}
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 800,
              fontSize: 20,
              letterSpacing: "-0.01em",
              textDecoration: "none",
              color: "var(--color-text)",
              textTransform: "uppercase",
              marginRight: "auto",
            }}
          >
            {brand}
          </Link>
          <nav className="desk-nav" style={{ marginLeft: 0 }}>
            {NAV.map((n) => (
              <Link key={n.path} href={n.path} className="nav-link" aria-current={active(n.path) ? "page" : undefined}>
                {n.label}
              </Link>
            ))}
          </nav>
          <Link href="/ecommerce/account" className="btn btn-secondary desk-nav" style={{ padding: "8px 14px" }}>
            Account
          </Link>
          <button type="button" className="btn btn-primary" onClick={openCart} style={{ padding: "8px 14px", flex: "0 0 auto" }}>
            Cart · {count}
          </button>
          <button type="button" className="burger btn btn-icon" onClick={() => setOpen((v) => !v)} aria-label="Menu">
            <MenuIcon size={20} />
          </button>
        </div>
        <div className={`mob-menu${open ? " open" : ""}`} style={{ borderTop: "2px solid var(--color-divider)" }}>
          <div className="wrap" style={{ display: "flex", flexDirection: "column", paddingBlock: "12px 18px" }}>
            {[...NAV, { label: "Account", path: "/ecommerce/account" }].map((n) => (
              <Link
                key={n.path}
                href={n.path}
                onClick={() => setOpen(false)}
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 600,
                  fontSize: 18,
                  textTransform: "uppercase",
                  textDecoration: "none",
                  color: "var(--color-text)",
                  padding: "12px 0",
                  borderBottom: "1px solid var(--color-divider)",
                }}
              >
                {n.label}
              </Link>
            ))}
          </div>
        </div>
      </header>
    </>
  );
}
