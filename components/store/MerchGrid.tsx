import Link from "next/link";
import type { Merch } from "@/lib/types";
import { Placeholder } from "@/components/Placeholder";
import { ArrowRightIcon } from "@/components/icons";

function MerchCard({ item }: { item: Merch }) {
  return (
    <div>
      <figure
        className="grayscale"
        style={{
          margin: "0 0 16px",
          aspectRatio: "1/1",
          border: "2px solid var(--color-divider)",
        }}
      >
        <Placeholder label="Product" />
      </figure>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 12,
          alignItems: "baseline",
        }}
      >
        <h3
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 800,
            fontSize: 17,
            margin: 0,
          }}
        >
          {item.name}
        </h3>
        <span
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 800,
            fontSize: 16,
            color: "var(--color-accent)",
          }}
        >
          {item.price}
        </span>
      </div>
      <div
        style={{
          fontSize: 13,
          color: "color-mix(in srgb, var(--color-text) 60%, transparent)",
          margin: "6px 0 14px",
        }}
      >
        {item.category}
      </div>
      <Link
        href="/ecommerce/shop"
        className="btn btn-secondary btn-block"
        style={{ justifyContent: "space-between", textDecoration: "none" }}
      >
        View in shop
        <ArrowRightIcon size={15} />
      </Link>
    </div>
  );
}

export function MerchGrid({ merch }: { merch: Merch[] }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: "clamp(20px, 3vw, 36px)",
      }}
    >
      {merch.map((m) => (
        <MerchCard key={m.id} item={m} />
      ))}
    </div>
  );
}
