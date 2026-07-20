import type { Metadata } from "next";
import { getSiteData } from "@/lib/data";
import { PageHeader } from "@/components/PageHeader";
import { Placeholder } from "@/components/Placeholder";

export const revalidate = 60;
export const metadata: Metadata = { title: "About" };

export default async function AboutPage() {
  const { bio, facts, press } = await getSiteData();
  return (
    <div className="fadein">
      <PageHeader kicker="Biography" title="About" />
      <section
        className="wrap split2"
        style={{
          paddingBlock: "clamp(36px, 5vw, 64px)",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.2fr)",
          gap: "clamp(32px, 5vw, 72px)",
          alignItems: "start",
        }}
      >
        <figure
          className="grayscale sticky-fig"
          style={{
            margin: 0,
            aspectRatio: "4/5",
            position: "sticky",
            top: 96,
          }}
        >
          <Placeholder label="Portrait" />
        </figure>
        <div>
          <p
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 800,
              fontSize: "clamp(22px, 2.6vw, 30px)",
              lineHeight: 1.25,
              letterSpacing: "-0.01em",
              margin: "0 0 28px",
            }}
          >
            {bio.lead}
          </p>
          <p
            style={{
              fontSize: 16,
              lineHeight: 1.7,
              margin: "0 0 20px",
              color: "color-mix(in srgb, var(--color-text) 82%, transparent)",
            }}
          >
            {bio.p1}
          </p>
          <p
            style={{
              fontSize: 16,
              lineHeight: 1.7,
              margin: "0 0 36px",
              color: "color-mix(in srgb, var(--color-text) 82%, transparent)",
            }}
          >
            {bio.p2}
          </p>

          <hr className="rule" style={{ height: 1 }} />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: 24,
              paddingBlock: 28,
            }}
          >
            {facts.map((f) => (
              <div key={f.k}>
                <div
                  style={{
                    fontSize: 12,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "color-mix(in srgb, var(--color-text) 55%, transparent)",
                    marginBottom: 8,
                  }}
                >
                  {f.k}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 800,
                    fontSize: 17,
                  }}
                >
                  {f.v}
                </div>
              </div>
            ))}
          </div>

          <hr className="rule" style={{ height: 1 }} />
          <div style={{ paddingTop: 28 }}>
            <div
              style={{
                fontSize: 12,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "color-mix(in srgb, var(--color-text) 55%, transparent)",
                marginBottom: 14,
              }}
            >
              Press
            </div>
            {press.map((q, i) => (
              <blockquote
                key={i}
                style={{
                  margin: "0 0 18px",
                  paddingLeft: 18,
                  borderLeft: "3px solid var(--color-accent)",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 600,
                    fontSize: 17,
                    lineHeight: 1.4,
                    margin: "0 0 6px",
                  }}
                >
                  “{q.quote}”
                </p>
                <cite
                  style={{
                    fontSize: 13,
                    fontStyle: "normal",
                    color: "color-mix(in srgb, var(--color-text) 60%, transparent)",
                  }}
                >
                  — {q.source}
                </cite>
              </blockquote>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
