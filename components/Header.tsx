"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon } from "@/components/icons";

export type NavItem = { key: string; label: string; path: string };

export function Header({
  artistName,
  navItems,
}: {
  artistName: string;
  navItems: NavItem[];
}) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path: string) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path);

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
      <div
        className="wrap"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 32,
          height: 74,
        }}
      >
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
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
          {artistName}
        </Link>

        <nav className="desk-nav">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.path}
              aria-current={isActive(item.path) ? "page" : undefined}
              className="nav-link"
              data-active={isActive(item.path) ? "true" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="nav-cta desk-nav">
          <Link
            href="/music"
            className="btn btn-primary"
            style={{ padding: "9px 16px" }}
          >
            Listen
          </Link>
        </div>

        <button
          type="button"
          className="burger btn btn-icon"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Menu"
          aria-expanded={menuOpen}
        >
          <MenuIcon size={20} />
        </button>
      </div>

      <div
        className={`mob-menu${menuOpen ? " open" : ""}`}
        style={{
          borderTop: "2px solid var(--color-divider)",
          background: "var(--color-bg)",
        }}
      >
        <div
          className="wrap"
          style={{
            display: "flex",
            flexDirection: "column",
            paddingTop: 12,
            paddingBottom: 18,
          }}
        >
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.path}
              onClick={() => setMenuOpen(false)}
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
        </div>
      </div>
    </header>
  );
}
