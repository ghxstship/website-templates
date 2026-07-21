"use client";

import Link from "next/link";
import type { Product } from "@/lib/ecommerce";
import { money } from "@/lib/ecommerce";
import { Placeholder } from "@/components/Placeholder";
import { SaveHeart } from "@/components/ds/SaveHeart";
import { useFavorites } from "@/lib/useFavorites";

export function Wishlist({ products }: { products: Product[] }) {
  const fav = useFavorites("ecom", "Product");
  const saved = products.filter((p) => fav.isSaved(p.slug));
  return (
    <div>
      <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 22, margin: "0 0 18px" }}>Wishlist · {fav.count}</h2>
      {saved.length === 0 ? (
        <p style={{ fontSize: 14, color: "color-mix(in srgb, var(--color-text) 60%, transparent)" }}>
          No saved items yet. Tap the heart on any product to add it here.
        </p>
      ) : (
        saved.map((p) => (
          <div key={p.slug} style={{ display: "flex", gap: 14, padding: "14px 0", borderTop: "1px solid var(--color-divider)", alignItems: "center" }}>
            <figure className="grayscale" style={{ margin: 0, width: 56, height: 56, flex: "0 0 auto", border: "1px solid var(--color-divider)" }}><Placeholder /></figure>
            <div style={{ flex: 1, minWidth: 0 }}>
              <Link href={`/ecommerce/product/${p.slug}`} style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 15, color: "var(--color-text)", textDecoration: "none" }}>{p.name}</Link>
              <div style={{ fontSize: 13, color: "color-mix(in srgb, var(--color-text) 58%, transparent)" }}>{money(p.price_cents)}</div>
            </div>
            <SaveHeart active onToggle={() => fav.toggle(p.slug, p.name)} label="Remove from wishlist" size={16} />
          </div>
        ))
      )}
    </div>
  );
}
