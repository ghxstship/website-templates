import Link from "next/link";

export default function NotFound() {
  return (
    <div className="fadein">
      <section
        className="wrap"
        style={{ paddingBlock: "clamp(60px, 12vw, 140px)" }}
      >
        <div className="kicker" style={{ marginBottom: 18 }}>
          Error 404
        </div>
        <h1
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 800,
            fontSize: "clamp(44px, 9vw, 110px)",
            lineHeight: 0.92,
            letterSpacing: "-0.03em",
            margin: "0 0 24px",
            textTransform: "uppercase",
          }}
        >
          Not found
        </h1>
        <p
          style={{
            fontSize: 17,
            maxWidth: "42ch",
            margin: "0 0 28px",
            color: "color-mix(in srgb, var(--color-text) 78%, transparent)",
          }}
        >
          This page doesn&apos;t exist, or the section is switched off in the
          site configuration.
        </p>
        <Link href="/" className="btn btn-primary" style={{ padding: "12px 20px" }}>
          Back home
        </Link>
      </section>
    </div>
  );
}
