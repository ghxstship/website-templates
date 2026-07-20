"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon } from "@/components/icons";

export type NavItem = { label: string; path: string };
export type Cta = { label: string; href: string; variant?: "primary" | "secondary" };

/** Generic Modernist sticky header: brand → nav → CTAs, hamburger under 980px. */
export function SiteHeader({
  brand,
  brandHref,
  navItems,
  ctas = [],
  height = 74,
}: {
  brand: string;
  brandHref: string;
  navItems: NavItem[];
  ctas?: Cta[];
  height?: number;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (path: string) =>
    path === brandHref ? pathname === brandHref : pathname === path || pathname.startsWith(path + "/");

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 60,
        background: "var(--color-bg)",
        borderBottom: "2px solid var(--color-divider)",
      }}
    >
      <div className="wrap" style={{ display: "flex", alignItems: "center", gap: 28, height }}>
        <Link
          href={brandHref}
          onClick={() => setOpen(false)}
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 800,
            fontSize: 20,
            letterSpacing: "-0.01em",
            textDecoration: "none",
            color: "var(--color-text)",
            textTransform: "uppercase",
          }}
        >
          {brand}
        </Link>

        <nav className="desk-nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className="nav-link"
              aria-current={isActive(item.path) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {ctas.length > 0 ? (
          <div className="nav-cta desk-nav">
            {ctas.map((c) => (
              <Link
                key={c.label}
                href={c.href}
                className={`btn ${c.variant === "secondary" ? "btn-secondary" : "btn-primary"}`}
                style={{ padding: "9px 16px" }}
              >
                {c.label}
              </Link>
            ))}
          </div>
        ) : null}

        <button
          type="button"
          className="burger btn btn-icon"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          aria-expanded={open}
        >
          <MenuIcon size={20} />
        </button>
      </div>

      <div
        className={`mob-menu${open ? " open" : ""}`}
        style={{ borderTop: "2px solid var(--color-divider)", background: "var(--color-bg)" }}
      >
        <div className="wrap" style={{ display: "flex", flexDirection: "column", paddingTop: 12, paddingBottom: 18 }}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={() => setOpen(false)}
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 600,
                fontSize: 18,
                textTransform: "uppercase",
                textDecoration: "none",
                color: "var(--color-text)",
                paddingBlock: 12,
                borderBottom: "1px solid var(--color-divider)",
              }}
            >
              {item.label}
            </Link>
          ))}
          {ctas.map((c) => (
            <Link
              key={c.label}
              href={c.href}
              onClick={() => setOpen(false)}
              className="btn btn-primary"
              style={{ marginTop: 14, justifyContent: "center" }}
            >
              {c.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
