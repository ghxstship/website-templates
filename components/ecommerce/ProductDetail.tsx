"use client";

import { useState } from "react";
import type { Product } from "@/lib/ecommerce";
import { money, sizesFor } from "@/lib/ecommerce";
import { useCart } from "./CartContext";
import { QtyStepper } from "@/components/ds/QtyStepper";

export function ProductDetailControls({ product }: { product: Product }) {
  const sizes = sizesFor(product.category);
  const [size, setSize] = useState<string | null>(sizes.length === 1 ? sizes[0] : null);
  const [qty, setQty] = useState(1);
  const { addItem } = useCart();

  const add = () => {
    const chosen = size ?? sizes[0];
    addItem(
      { slug: product.slug, name: product.name, price_cents: product.price_cents, variant: chosen },
      qty,
    );
  };

  return (
    <>
      <div className="eyebrow" style={{ marginBottom: 10 }}>Size</div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 }}>
        {sizes.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setSize(s)}
            className={`chip${size === s ? " active" : ""}`}
            style={{ minWidth: 48, justifyContent: "center" }}
          >
            {s}
          </button>
        ))}
      </div>
      <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
        <QtyStepper value={qty} onChange={setQty} min={1} max={20} />
        <button type="button" className="btn btn-primary" onClick={add} style={{ padding: "13px 26px", justifyContent: "flex-start" }}>
          Add to cart — {money(product.price_cents)}
        </button>
      </div>
    </>
  );
}
