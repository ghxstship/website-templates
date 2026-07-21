import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ARTICLES, ARTICLE_BODY } from "@/lib/news";
import { ArticleActions } from "@/components/news/NewsClient";
import { Placeholder } from "@/components/Placeholder";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ id: a.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  return { title: ARTICLES.find((a) => a.id === id)?.title ?? "Article" };
}

export default async function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const article = ARTICLES.find((a) => a.id === id);
  if (!article) notFound();
  const readNext = ARTICLES.filter((a) => a.id !== id).slice(0, 3);

  return (
    <div className="fadein">
      <section className="wrap" style={{ paddingBlock: "20px 0" }}><Link href="/news/sections" className="btn btn-ghost" style={{ padding: "8px 4px" }}>← Back</Link></section>
      <article className="wrap" style={{ paddingBlock: "12px clamp(48px, 6vw, 80px)", maxWidth: 760 }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 16 }}><span className="tag tag-accent">{article.section}</span><span style={{ fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase", color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }}>{article.time}</span></div>
        <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(32px, 5vw, 60px)", lineHeight: 1, letterSpacing: "-0.025em", margin: "0 0 18px" }}>{article.title}</h1>
        <p style={{ fontSize: 19, lineHeight: 1.5, margin: "0 0 20px", color: "color-mix(in srgb, var(--color-text) 80%, transparent)" }}>{article.excerpt}</p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, padding: "14px 0", borderTop: "2px solid var(--color-divider)", borderBottom: "2px solid var(--color-divider)", marginBottom: 28 }}>
          <div style={{ fontSize: 14 }}>By <strong style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}>{article.author}</strong></div>
          <ArticleActions />
        </div>
        <figure className="grayscale" style={{ margin: "0 0 12px", aspectRatio: "16/9", border: "2px solid var(--color-divider)" }}><Placeholder /></figure>
        <figcaption style={{ fontSize: 12, color: "color-mix(in srgb, var(--color-text) 55%, transparent)", marginBottom: 28 }}>{article.caption ?? "Photograph for The Dispatch."}</figcaption>
        {ARTICLE_BODY.map((para, i) => <p key={i} style={{ fontSize: 17, lineHeight: 1.7, margin: "0 0 22px" }}>{para}</p>)}
        <hr className="rule" style={{ height: 1, margin: "12px 0 28px" }} />
        <div style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-accent-700)", marginBottom: 16 }}>Read next</div>
        {readNext.map((r) => (
          <Link key={r.id} href={`/news/article/${r.id}`} style={{ display: "block", padding: "14px 0", borderTop: "1px solid var(--color-divider)", textDecoration: "none", color: "var(--color-text)" }}>
            <span style={{ fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--color-accent-700)" }}>{r.section}</span>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 18, marginTop: 4 }}>{r.title}</div>
          </Link>
        ))}
      </article>
    </div>
  );
}
