import Link from "next/link";
import type { NavItem } from "./Header";
import type { Social } from "@/lib/types";

export function Footer({
  artistName,
  tagline,
  navItems,
  socials,
  year,
}: {
  artistName: string;
  tagline: string;
  navItems: NavItem[];
  socials: Social[];
  year: number;
}) {
  return (
    <footer
      style={{
        borderTop: "2px solid var(--color-divider)",
        background: "var(--color-bg)",
      }}
    >
      <div
        className="wrap foot-grid"
        style={{
          paddingBlock: "clamp(44px, 6vw, 72px) 32px",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.3fr) repeat(2, minmax(0, 1fr))",
          gap: 32,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 800,
              fontSize: "clamp(30px, 4vw, 52px)",
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
              marginBottom: 14,
            }}
          >
            {artistName}
          </div>
          <p
            style={{
              fontSize: 14,
              maxWidth: "34ch",
              color: "color-mix(in srgb, var(--color-text) 65%, transparent)",
              margin: 0,
            }}
          >
            {tagline}
          </p>
        </div>

        <div>
          <div className="foot-heading">Explore</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.path}
                style={{
                  fontSize: 14,
                  textDecoration: "none",
                  color: "var(--color-text)",
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div className="foot-heading">Follow</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target={s.url !== "#" ? "_blank" : undefined}
                rel={s.url !== "#" ? "noopener noreferrer" : undefined}
                style={{
                  fontSize: 14,
                  textDecoration: "none",
                  color: "var(--color-text)",
                }}
              >
                {s.name} ↗
              </a>
            ))}
          </div>
        </div>
      </div>

      <div
        className="wrap"
        style={{
          paddingBlock: "20px 32px",
          borderTop: "1px solid var(--color-divider)",
          display: "flex",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
          fontSize: 12,
          color: "color-mix(in srgb, var(--color-text) 55%, transparent)",
        }}
      >
        <span>
          © {year} {artistName}. All rights reserved.
        </span>
        <span>White-label template — Modernist</span>
      </div>
    </footer>
  );
}
