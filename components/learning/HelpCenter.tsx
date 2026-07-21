"use client";

import { useMemo, useState } from "react";
import { HELP_CATEGORIES, HELP_FAQS } from "@/lib/learning";
import { FAQ } from "@/components/ds/FAQ";

/** Help center — searchable category cards + common-questions FAQ. */
export function HelpCenter() {
  const [query, setQuery] = useState("");

  const categories = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return HELP_CATEGORIES;
    return HELP_CATEGORIES.map((c) => ({
      ...c,
      articles: c.name.toLowerCase().includes(q)
        ? c.articles
        : c.articles.filter((a) => a.toLowerCase().includes(q)),
    })).filter((c) => c.articles.length > 0);
  }, [query]);

  return (
    <>
      <section className="wrap" style={{ paddingBlock: "clamp(28px, 4vw, 48px) 24px", textAlign: "center" }}>
        <div className="kicker" style={{ marginBottom: 14 }}>How can we help?</div>
        <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(38px, 5.5vw, 68px)", lineHeight: 0.95, letterSpacing: "-0.03em", margin: "0 auto 24px", textTransform: "uppercase" }}>Help center</h1>
        <div style={{ display: "flex", alignItems: "center", gap: 10, border: "2px solid var(--color-divider)", padding: "12px 16px", maxWidth: 560, margin: "0 auto" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden style={{ color: "color-mix(in srgb, var(--color-text) 55%, transparent)", flex: "0 0 auto" }}>
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4-4" />
          </svg>
          <input
            className="input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles…"
            aria-label="Search help articles"
            style={{ border: 0, minHeight: 40 }}
          />
        </div>
      </section>
      <hr className="rule" />
      <section className="wrap" style={{ paddingBlock: "clamp(24px, 3vw, 44px)" }}>
        {categories.length === 0 ? (
          <p style={{ fontSize: 16, color: "color-mix(in srgb, var(--color-text) 60%, transparent)", padding: "16px 0", margin: 0 }}>
            No articles match “{query}”. Try a different search, or contact support below.
          </p>
        ) : (
          <div className="grid2" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 2, background: "var(--color-divider)", border: "2px solid var(--color-divider)" }}>
            {categories.map((c) => (
              <div key={c.name} style={{ background: "var(--color-bg)", padding: 24 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
                  <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 18, margin: 0 }}>{c.name}</h3>
                  <span style={{ fontSize: 12, color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }}>{c.count}</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {c.articles.map((a) => (
                    <a key={a} href="#" style={{ fontSize: 14.5, padding: "8px 0", borderTop: "1px solid var(--color-divider)", textDecoration: "none", color: "var(--color-text)" }}>{a}</a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
      <section className="wrap" style={{ paddingBlock: "clamp(20px, 3vw, 36px)" }}>
        <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(22px, 2.6vw, 32px)", letterSpacing: "-0.02em", margin: "0 0 20px", textTransform: "uppercase" }}>Common questions</h2>
        <FAQ items={HELP_FAQS} />
      </section>
    </>
  );
}
