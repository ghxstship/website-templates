import Link from "next/link";
import { ARTICLES } from "@/lib/news";
import { NewsletterInline } from "@/components/forms/NewsletterInline";
import { Placeholder } from "@/components/Placeholder";

export default function FrontPage() {
  const lead = ARTICLES[0];
  const sidebar = ARTICLES.slice(1, 5);
  const grid = ARTICLES.slice(1, 9);
  return (
    <div className="fadein">
      <section className="wrap lead" style={{ paddingBlock: "clamp(28px, 4vw, 48px)", display: "grid", gridTemplateColumns: "minmax(0,1.5fr) minmax(0,1fr)", gap: "clamp(28px, 4vw, 56px)", alignItems: "start" }}>
        <Link href={`/news/article/${lead.id}`} style={{ textDecoration: "none", color: "var(--color-text)" }}>
          <figure className="grayscale" style={{ margin: "0 0 20px", aspectRatio: "3/2", border: "2px solid var(--color-divider)" }}><Placeholder /></figure>
          <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}><span className="tag tag-accent">{lead.section}</span><span style={{ fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase", color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }}>{lead.time}</span></div>
          <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(30px, 4.6vw, 58px)", lineHeight: 1, letterSpacing: "-0.025em", margin: "0 0 14px" }}>{lead.title}</h1>
          <p style={{ fontSize: 17, lineHeight: 1.6, margin: "0 0 10px", maxWidth: "56ch", color: "color-mix(in srgb, var(--color-text) 80%, transparent)" }}>{lead.excerpt}</p>
          <div style={{ fontSize: 13, color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }}>By {lead.author}</div>
        </Link>
        <div>
          <div style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-accent-700)", paddingBottom: 12, borderBottom: "2px solid var(--color-divider)", marginBottom: 4 }}>Latest</div>
          {sidebar.map((s) => (
            <Link key={s.id} href={`/news/article/${s.id}`} style={{ display: "block", padding: "16px 0", borderBottom: "1px solid var(--color-divider)", textDecoration: "none", color: "var(--color-text)" }}>
              <div style={{ fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--color-accent-700)", marginBottom: 6 }}>{s.section}</div>
              <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 17, lineHeight: 1.15, margin: 0 }}>{s.title}</h3>
              <div style={{ fontSize: 12, color: "color-mix(in srgb, var(--color-text) 55%, transparent)", marginTop: 6 }}>{s.time}</div>
            </Link>
          ))}
        </div>
      </section>
      <hr className="rule" />
      <section className="wrap" style={{ paddingBlock: "clamp(28px, 4vw, 48px)" }}>
        <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(22px, 2.6vw, 32px)", letterSpacing: "-0.02em", margin: "0 0 20px", textTransform: "uppercase" }}>More stories</h2>
        <div className="frontgrid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 2, background: "var(--color-divider)", border: "2px solid var(--color-divider)" }}>
          {grid.map((g) => (
            <Link key={g.id} href={`/news/article/${g.id}`} style={{ background: "var(--color-bg)", textDecoration: "none", color: "var(--color-text)" }}>
              <figure className="grayscale" style={{ margin: 0, aspectRatio: "3/2" }}><Placeholder /></figure>
              <div style={{ padding: "14px 16px 18px" }}>
                <div style={{ fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--color-accent-700)", marginBottom: 6 }}>{g.section}</div>
                <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 16, lineHeight: 1.18, margin: 0 }}>{g.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section style={{ background: "var(--color-accent)", color: "var(--color-bg)" }}>
        <div className="wrap lead" style={{ paddingBlock: "clamp(36px, 5vw, 64px)", display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: 32, alignItems: "center" }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(26px, 3.6vw, 48px)", lineHeight: 0.98, letterSpacing: "-0.02em", margin: 0, textTransform: "uppercase" }}>The daily brief, in your inbox.</h2>
          <div>
            <p style={{ fontSize: 15, lineHeight: 1.5, margin: "0 0 18px", maxWidth: "40ch" }}>One email each morning — the stories that matter, nothing that doesn&apos;t.</p>
            <NewsletterInline template="news" source="daily-brief" success="Subscribed. First edition lands tomorrow." inputStyle={{ background: "var(--color-bg)", borderColor: "var(--color-bg)" }} buttonClassName="btn" buttonStyle={{ background: "var(--color-bg)", color: "var(--color-accent)", padding: "11px 22px" }} button="Subscribe" />
          </div>
        </div>
      </section>
    </div>
  );
}
