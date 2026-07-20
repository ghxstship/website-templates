import Link from "next/link";
import { getProducts, ECOM, money } from "@/lib/ecommerce";
import { ProductCard } from "@/components/ecommerce/ProductCard";
import { Placeholder } from "@/components/Placeholder";

export const revalidate = 60;

const PROMISES = [
  { t: "Free carbon-neutral shipping", b: "On every order over $75, delivered in recycled packaging." },
  { t: "30-day returns", b: "Not right? Send it back within 30 days, no questions." },
  { t: "Made to be repaired", b: "We stock spares and offer a resole and repair service for life." },
];

export default async function EcommerceHome() {
  const products = await getProducts();
  const featuredSlugs = ["merino-crew-knit", "derby-boot", "waxed-canvas-tote", "chore-jacket"];
  const featured = featuredSlugs.map((s) => products.find((p) => p.slug === s)).filter(Boolean) as typeof products;
  const collections = ["Apparel", "Footwear", "Accessories", "Home"];

  return (
    <div className="fadein">
      <section className="wrap split2" style={{ paddingBlock: "clamp(32px, 5vw, 64px)", display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: "clamp(24px, 4vw, 56px)", alignItems: "center" }}>
        <div>
          <div className="kicker" style={{ marginBottom: 22 }}>New season</div>
          <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(40px, 6vw, 82px)", lineHeight: 0.96, letterSpacing: "-0.03em", margin: "0 0 24px", textTransform: "uppercase" }}>{ECOM.heroLine}</h1>
          <p style={{ fontSize: "clamp(16px, 1.4vw, 19px)", lineHeight: 1.5, maxWidth: "44ch", margin: "0 0 30px", color: "color-mix(in srgb, var(--color-text) 82%, transparent)" }}>{ECOM.heroSub}</p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/ecommerce/shop" className="btn btn-primary" style={{ padding: "13px 22px" }}>Shop all</Link>
            <Link href="/ecommerce/shop" className="btn btn-secondary" style={{ padding: "13px 22px" }}>New arrivals</Link>
          </div>
        </div>
        <figure className="grayscale" style={{ margin: 0, aspectRatio: "4/5", border: "2px solid var(--color-divider)" }}>
          <Placeholder label="Hero image" />
        </figure>
      </section>

      <hr className="rule" />

      <section className="wrap" style={{ paddingBlock: "clamp(36px, 5vw, 64px)" }}>
        <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(24px, 3vw, 38px)", letterSpacing: "-0.02em", margin: "0 0 24px", textTransform: "uppercase" }}>Shop by category</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 2, background: "var(--color-divider)", border: "2px solid var(--color-divider)" }}>
          {collections.map((c) => (
            <Link key={c} href={`/ecommerce/shop?category=${c}`} style={{ background: "var(--color-bg)", textDecoration: "none", color: "var(--color-text)" }}>
              <figure className="grayscale" style={{ margin: 0, aspectRatio: "3/4" }}>
                <Placeholder label={c} />
              </figure>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 18px" }}>
                <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 18 }}>{c}</span>
                <span style={{ color: "var(--color-accent)", fontFamily: "var(--font-heading)", fontWeight: 800 }}>→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <hr className="rule" />

      <section className="wrap" style={{ paddingBlock: "clamp(36px, 5vw, 64px)" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(24px, 3vw, 38px)", letterSpacing: "-0.02em", margin: 0, textTransform: "uppercase" }}>Best sellers</h2>
          <Link href="/ecommerce/shop" className="btn btn-ghost">View all →</Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: "clamp(16px, 2vw, 28px)" }}>
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section style={{ borderTop: "2px solid var(--color-divider)" }}>
        <div className="wrap" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24, paddingBlock: "clamp(32px, 4vw, 48px)" }}>
          {PROMISES.map((pr) => (
            <div key={pr.t}>
              <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 17, margin: "0 0 8px" }}>{pr.t}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.55, margin: 0, color: "color-mix(in srgb, var(--color-text) 72%, transparent)" }}>{pr.b}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
