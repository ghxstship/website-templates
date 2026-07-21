import Link from "next/link";
import type { Product } from "@/lib/ecommerce";
import { money } from "@/lib/ecommerce";
import { Placeholder } from "@/components/Placeholder";
import { WishlistHeart } from "./WishlistHeart";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/ecommerce/product/${product.slug}`} style={{ textDecoration: "none", color: "var(--color-text)", cursor: "pointer" }}>
      <figure className="grayscale" style={{ margin: "0 0 14px", aspectRatio: "1/1", border: "2px solid var(--color-divider)", position: "relative" }}>
        <Placeholder label="Product" />
        <WishlistHeart slug={product.slug} name={product.name} />
        {product.is_new ? (
          <span className="tag" style={{ position: "absolute", top: 10, left: 10, background: "var(--color-accent)", color: "var(--color-bg)" }}>New</span>
        ) : null}
      </figure>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "baseline" }}>
        <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 16, margin: 0 }}>{product.name}</h3>
        <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 15, color: "var(--color-accent)" }}>{money(product.price_cents)}</span>
      </div>
      <div style={{ fontSize: 13, color: "color-mix(in srgb, var(--color-text) 58%, transparent)", marginTop: 4 }}>{product.category}</div>
    </Link>
  );
}
