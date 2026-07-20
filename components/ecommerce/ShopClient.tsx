"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/ecommerce";
import { CATEGORIES } from "@/lib/ecommerce";
import { ProductCard } from "./ProductCard";

export function ShopClient({
  products,
  initialCategory = "all",
}: {
  products: Product[];
  initialCategory?: string;
}) {
  const [category, setCategory] = useState(
    CATEGORIES.includes(initialCategory) ? initialCategory : "all",
  );
  const [sort, setSort] = useState<"featured" | "low" | "high">("featured");

  const shown = useMemo(() => {
    let list = products.filter((p) => category === "all" || p.category === category);
    if (sort === "low") list = [...list].sort((a, b) => a.price_cents - b.price_cents);
    if (sort === "high") list = [...list].sort((a, b) => b.price_cents - a.price_cents);
    return list;
  }, [products, category, sort]);

  return (
    <>
      <section className="wrap" style={{ paddingBlock: 20, display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {CATEGORIES.map((c) => (
            <button key={c} type="button" onClick={() => setCategory(c)} className={`chip${category === c ? " active" : ""}`}>
              {c === "all" ? "All" : c}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <span className="eyebrow">Sort</span>
          <select className="input" value={sort} onChange={(e) => setSort(e.target.value as typeof sort)} style={{ minHeight: 38, width: "auto" }}>
            <option value="featured">Featured</option>
            <option value="low">Price: low to high</option>
            <option value="high">Price: high to low</option>
          </select>
        </div>
      </section>
      <section className="wrap" style={{ paddingBlock: "8px clamp(48px, 6vw, 80px)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: "clamp(16px, 2vw, 28px)" }}>
          {shown.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </>
  );
}
