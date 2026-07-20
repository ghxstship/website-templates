import Link from "next/link";
import { LEARNING, COURSES, STATS, lessonCount } from "@/lib/learning";
import { Placeholder } from "@/components/Placeholder";

export default function LearningHome() {
  const featured = COURSES.slice(0, 3);
  return (
    <div className="fadein">
      <section className="wrap split2" style={{ paddingBlock: "clamp(36px, 5vw, 72px)", display: "grid", gridTemplateColumns: "minmax(0,1.1fr) minmax(0,0.9fr)", gap: "clamp(28px, 5vw, 64px)", alignItems: "center" }}>
        <div>
          <div className="kicker" style={{ marginBottom: 22 }}>Courses &amp; community</div>
          <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(40px, 6vw, 84px)", lineHeight: 0.96, letterSpacing: "-0.03em", margin: "0 0 24px", textTransform: "uppercase" }}>{LEARNING.heroLine}</h1>
          <p style={{ fontSize: "clamp(16px, 1.4vw, 20px)", lineHeight: 1.5, maxWidth: "46ch", margin: "0 0 30px", color: "color-mix(in srgb, var(--color-text) 82%, transparent)" }}>{LEARNING.heroSub}</p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/learning/courses" className="btn btn-primary" style={{ padding: "13px 22px" }}>Explore courses</Link>
            <Link href="/learning/community" className="btn btn-secondary" style={{ padding: "13px 22px" }}>See the community</Link>
          </div>
        </div>
        <figure className="grayscale" style={{ margin: 0, aspectRatio: "4/5", border: "2px solid var(--color-divider)" }}><Placeholder label="Hero" /></figure>
      </section>
      <section style={{ background: "var(--color-accent)", color: "var(--color-bg)" }}>
        <div className="wrap" style={{ paddingBlock: "clamp(28px, 4vw, 44px)", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 24 }}>
          {STATS.map((s) => <div key={s.label}><div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(28px, 3.4vw, 46px)", lineHeight: 1 }}>{s.num}</div><div style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 8, opacity: 0.85 }}>{s.label}</div></div>)}
        </div>
      </section>
      <hr className="rule" />
      <section className="wrap" style={{ paddingBlock: "clamp(36px, 5vw, 64px)" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(24px, 3vw, 40px)", letterSpacing: "-0.02em", margin: 0, textTransform: "uppercase" }}>Popular courses</h2>
          <Link href="/learning/courses" className="btn btn-ghost">All courses →</Link>
        </div>
        <div className="grid3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, background: "var(--color-divider)", border: "2px solid var(--color-divider)" }}>
          {featured.map((c) => (
            <Link key={c.slug} href={`/learning/courses/${c.slug}`} style={{ background: "var(--color-bg)", textDecoration: "none", color: "var(--color-text)" }}>
              <figure className="grayscale" style={{ margin: 0, aspectRatio: "16/10" }}><Placeholder /></figure>
              <div style={{ padding: "16px 18px 20px" }}>
                <div style={{ fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--color-accent-700)", marginBottom: 8 }}>{c.cat}</div>
                <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 19, margin: "0 0 6px" }}>{c.title}</h3>
                <div style={{ fontSize: 13, color: "color-mix(in srgb, var(--color-text) 60%, transparent)" }}>{c.instructor} · {lessonCount(c)} lessons</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
