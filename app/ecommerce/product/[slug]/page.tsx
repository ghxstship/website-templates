import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, getProducts, money } from "@/lib/ecommerce";
import { Placeholder } from "@/components/Placeholder";
import { ProductDetailControls } from "@/components/ecommerce/ProductDetail";

export const revalidate = 60;

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  return { title: product?.name ?? "Product" };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  return (
    <div className="fadein">
      <section className="wrap" style={{ paddingBlock: "20px 0" }}>
        <Link href="/ecommerce/shop" className="btn btn-ghost" style={{ padding: "8px 4px" }}>← Back to shop</Link>
      </section>
      <section className="wrap split2" style={{ paddingBlock: "16px clamp(48px, 6vw, 80px)", display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: "clamp(28px, 5vw, 72px)", alignItems: "start" }}>
        <figure className="grayscale" style={{ margin: 0, aspectRatio: "1/1", border: "2px solid var(--color-divider)" }}>
          <Placeholder label="Product" />
        </figure>
        <div>
          <div className="eyebrow" style={{ marginBottom: 12 }}>{product.category}</div>
          <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(30px, 4vw, 48px)", lineHeight: 1, letterSpacing: "-0.02em", margin: "0 0 14px" }}>{product.name}</h1>
          <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 24, color: "var(--color-accent)", marginBottom: 22 }}>{money(product.price_cents)}</div>
          <p style={{ fontSize: 16, lineHeight: 1.65, margin: "0 0 28px", maxWidth: "48ch", color: "color-mix(in srgb, var(--color-text) 82%, transparent)" }}>{product.description}</p>
          <ProductDetailControls product={product} />
          <div style={{ marginTop: 32, borderTop: "2px solid var(--color-divider)" }}>
            {product.specs.map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", gap: 16, padding: "12px 0", borderBottom: "1px solid var(--color-divider)", fontSize: 14 }}>
                <span className="eyebrow">{k}</span>
                <span style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
