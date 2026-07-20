import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSiteData } from "@/lib/data";
import { PageHeader } from "@/components/PageHeader";
import { Placeholder } from "@/components/Placeholder";

export const revalidate = 60;
export const metadata: Metadata = { title: "News" };

export default async function NewsPage() {
  const { config, posts } = await getSiteData();
  if (!config.show_news) notFound();
  return (
    <div className="fadein">
      <PageHeader kicker="Journal" title="News" />
      <section
        className="wrap"
        style={{ paddingBlock: "8px clamp(48px, 6vw, 88px)" }}
      >
        {posts.map((post) => (
          <article
            key={post.id}
            className="split2"
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 0.5fr) minmax(0, 1fr)",
              gap: "clamp(24px, 4vw, 56px)",
              paddingBlock: "clamp(28px, 4vw, 48px)",
              borderTop: "2px solid var(--color-divider)",
              alignItems: "start",
            }}
          >
            <figure className="grayscale" style={{ margin: 0, aspectRatio: "3/2" }}>
              <Placeholder label="Article image" />
            </figure>
            <div>
              <div
                style={{
                  display: "flex",
                  gap: 12,
                  alignItems: "center",
                  marginBottom: 14,
                }}
              >
                <span className="tag tag-accent">{post.category}</span>
                <span
                  style={{
                    fontSize: 12,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "color-mix(in srgb, var(--color-text) 55%, transparent)",
                  }}
                >
                  {post.date_label}
                </span>
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 800,
                  fontSize: "clamp(24px, 3vw, 38px)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.015em",
                  margin: "0 0 14px",
                }}
              >
                {post.title}
              </h2>
              <p
                style={{
                  fontSize: 16,
                  lineHeight: 1.6,
                  margin: "0 0 18px",
                  maxWidth: "60ch",
                  color: "color-mix(in srgb, var(--color-text) 78%, transparent)",
                }}
              >
                {post.excerpt}
              </p>
              <a
                href="#"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 600,
                  fontSize: 13,
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                }}
              >
                Read more →
              </a>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
