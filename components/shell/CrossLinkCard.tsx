import Link from "next/link";

/**
 * A hand-off card that demotes a non-owned feature to a cross-link into the
 * template that owns it. Used by the overlap-remediation seams so a consumer
 * still sees the pathway (e.g. "Flying private? → Charter") without the
 * non-owner re-implementing the feature. Routing/scope only — Modernist style.
 */
export function CrossLinkCard({
  kicker,
  title,
  body,
  href,
  cta,
  external = true,
  variant = "outline",
}: {
  kicker?: string;
  title: string;
  body?: string;
  href: string;
  cta: string;
  /** show the ↗ hand-off glyph on the CTA */
  external?: boolean;
  /** "outline" = bordered card on bg; "accent" = filled accent band */
  variant?: "outline" | "accent";
}) {
  const accent = variant === "accent";
  return (
    <div
      style={{
        border: `2px solid ${accent ? "var(--color-accent)" : "var(--color-divider)"}`,
        background: accent ? "var(--color-accent)" : "var(--color-bg)",
        color: accent ? "var(--color-bg)" : "var(--color-text)",
        padding: "clamp(20px, 3vw, 28px)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 20,
        flexWrap: "wrap",
      }}
    >
      <div style={{ minWidth: 0 }}>
        {kicker ? (
          <div style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", opacity: accent ? 0.85 : 0.6, marginBottom: 8 }}>
            {kicker}
          </div>
        ) : null}
        <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(18px, 2.4vw, 26px)", letterSpacing: "-0.015em" }}>{title}</div>
        {body ? (
          <p style={{ fontSize: 14.5, lineHeight: 1.55, margin: "8px 0 0", maxWidth: "56ch", color: accent ? "color-mix(in srgb, var(--color-bg) 82%, transparent)" : "color-mix(in srgb, var(--color-text) 75%, transparent)" }}>
            {body}
          </p>
        ) : null}
      </div>
      <Link
        href={href}
        className={`btn ${accent ? "btn-secondary" : "btn-primary"}`}
        style={{ padding: "12px 22px", flex: "0 0 auto", textDecoration: "none", ...(accent ? { background: "var(--color-bg)", color: "var(--color-accent)", border: 0 } : {}) }}
      >
        {cta}{external ? " ↗" : " →"}
      </Link>
    </div>
  );
}
