"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[app/error]", error);
  }, [error]);

  return (
    <div className="fadein">
      <section className="wrap" style={{ paddingBlock: "clamp(60px, 12vw, 140px)" }}>
        <div className="kicker" style={{ marginBottom: 18 }}>
          Error
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
          Something broke
        </h1>
        <p
          style={{
            fontSize: 17,
            maxWidth: "44ch",
            margin: "0 0 28px",
            color: "color-mix(in srgb, var(--color-text) 78%, transparent)",
          }}
        >
          An unexpected error interrupted this page. You can try again, or head
          back and pick up where you left off.
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <button type="button" onClick={reset} className="btn btn-primary" style={{ padding: "12px 20px" }}>
            Try again
          </button>
          <Link href="/" className="btn btn-secondary" style={{ padding: "12px 20px" }}>
            Back home
          </Link>
        </div>
        {error.digest ? (
          <p style={{ fontSize: 12, marginTop: 24, color: "color-mix(in srgb, var(--color-text) 45%, transparent)", fontVariantNumeric: "tabular-nums" }}>
            Reference: {error.digest}
          </p>
        ) : null}
      </section>
    </div>
  );
}
