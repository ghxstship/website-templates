import Link from "next/link";

export type FooterColumn = { title: string; links: { label: string; href: string }[] };

/** Generic Modernist footer: brand + tagline / link columns / socials / legal. */
export function SiteFooter({
  brand,
  tagline,
  columns,
  socials = [],
  legalRight = "White-label template — Modernist",
}: {
  brand: string;
  tagline: string;
  columns: FooterColumn[];
  socials?: string[];
  legalRight?: string;
}) {
  const year = new Date().getFullYear();
  const cols = socials.length
    ? [...columns, { title: "Follow", links: socials.map((s) => ({ label: `${s} ↗`, href: "#" })) }]
    : columns;

  return (
    <footer style={{ borderTop: "2px solid var(--color-divider)", background: "var(--color-bg)" }}>
      <div
        className="wrap foot-grid"
        style={{
          paddingBlock: "clamp(44px, 6vw, 72px) 32px",
          display: "grid",
          gridTemplateColumns: `minmax(0, 1.3fr) repeat(${cols.length}, minmax(0, 1fr))`,
          gap: 32,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 800,
              fontSize: "clamp(28px, 4vw, 48px)",
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
              marginBottom: 14,
            }}
          >
            {brand}
          </div>
          <p style={{ fontSize: 14, maxWidth: "34ch", color: "color-mix(in srgb, var(--color-text) 65%, transparent)", margin: 0 }}>
            {tagline}
          </p>
        </div>
        {cols.map((col) => (
          <div key={col.title}>
            <div className="foot-heading">{col.title}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {col.links.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  style={{ fontSize: 14, textDecoration: "none", color: "var(--color-text)" }}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
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
        <span>© {year} {brand}. All rights reserved.</span>
        <span>{legalRight}</span>
      </div>
    </footer>
  );
}
