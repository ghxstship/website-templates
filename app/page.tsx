import Link from "next/link";
import { TEMPLATES } from "@/lib/templates";
import { ArrowRightIcon } from "@/components/icons";

export default function SuiteIndex() {
  return (
    <div className="fadein">
      {/* Top bar */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 60,
          background: "var(--color-bg)",
          borderBottom: "2px solid var(--color-divider)",
        }}
      >
        <div className="wrap" style={{ display: "flex", alignItems: "center", gap: 24, height: 74 }}>
          <span
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 800,
              fontSize: 20,
              letterSpacing: "-0.01em",
              textTransform: "uppercase",
            }}
          >
            Modernist
          </span>
          <span className="hide-mobile" style={{ marginLeft: "auto", fontSize: 13, color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }}>
            White-label website suite
          </span>
        </div>
      </header>

      {/* Hero */}
      <section className="wrap" style={{ paddingBlock: "clamp(48px, 8vw, 104px) clamp(32px, 5vw, 64px)" }}>
        <div className="kicker" style={{ marginBottom: 24 }}>
          {TEMPLATES.length} templates — one design system
        </div>
        <h1
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 800,
            fontSize: "clamp(44px, 9vw, 128px)",
            lineHeight: 0.9,
            letterSpacing: "-0.03em",
            margin: "0 0 28px",
            textTransform: "uppercase",
          }}
        >
          Ship any site,
          <br />
          one system.
        </h1>
        <p
          style={{
            fontSize: "clamp(17px, 1.6vw, 22px)",
            lineHeight: 1.5,
            maxWidth: "56ch",
            margin: 0,
            color: "color-mix(in srgb, var(--color-text) 80%, transparent)",
          }}
        >
          A suite of white-label website templates built on the Modernist design
          system — flat, architectural, mono-accent red on off-white. Every one is a
          full Next.js + Supabase build with its signature workflow wired end to end.
        </p>
      </section>

      <hr className="rule" />

      {/* Template grid */}
      <section className="wrap" style={{ paddingBlock: "clamp(32px, 5vw, 56px) clamp(56px, 8vw, 96px)" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: 2,
            background: "var(--color-divider)",
            border: "2px solid var(--color-divider)",
          }}
        >
          {TEMPLATES.map((t) => (
            <Link
              key={t.slug}
              href={`/${t.slug}`}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 14,
                padding: "28px 26px 30px",
                background: "var(--color-bg)",
                textDecoration: "none",
                color: "var(--color-text)",
                minHeight: 220,
              }}
            >
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
                <span className="tag tag-outline">{t.category}</span>
                <span style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "color-mix(in srgb, var(--color-text) 45%, transparent)" }}>
                  /{t.slug}
                </span>
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 800,
                  fontSize: 30,
                  letterSpacing: "-0.02em",
                  margin: "auto 0 0",
                  textTransform: "uppercase",
                }}
              >
                {t.name}
              </h2>
              <p style={{ fontSize: 15, lineHeight: 1.5, margin: 0, color: "color-mix(in srgb, var(--color-text) 72%, transparent)" }}>
                {t.tagline}
              </p>
              <div style={{ fontSize: 12, color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }}>
                {t.workflow}
              </div>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 4, color: "var(--color-accent)", fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                View template <ArrowRightIcon size={15} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <footer style={{ borderTop: "2px solid var(--color-divider)" }}>
        <div
          className="wrap"
          style={{
            paddingBlock: "28px 40px",
            display: "flex",
            justifyContent: "space-between",
            gap: 16,
            flexWrap: "wrap",
            fontSize: 12,
            color: "color-mix(in srgb, var(--color-text) 55%, transparent)",
          }}
        >
          <span>Modernist — white-label website suite.</span>
          <span>Next.js · Supabase</span>
        </div>
      </footer>
    </div>
  );
}
