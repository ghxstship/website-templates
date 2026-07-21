"use client";

import { useEffect } from "react";

/** Last-resort boundary — replaces the root layout, so it ships its own html/body. */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[app/global-error]", error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#f3f2f2",
          color: "#111",
          fontFamily: "system-ui, sans-serif",
          padding: "24px",
        }}
      >
        <div style={{ maxWidth: 480 }}>
          <div style={{ fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: "#ec3013", marginBottom: 16 }}>
            Error
          </div>
          <h1 style={{ fontSize: 40, fontWeight: 800, lineHeight: 1, margin: "0 0 16px", textTransform: "uppercase" }}>
            Something broke
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.5, margin: "0 0 24px", color: "#444" }}>
            An unexpected error interrupted the app. Please try again.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{ border: "2px solid #ec3013", background: "#ec3013", color: "#f3f2f2", padding: "12px 22px", fontWeight: 600, cursor: "pointer", borderRadius: 0 }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
