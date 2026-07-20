import type { Metadata } from "next";
import { getProducts } from "@/lib/ecommerce";
import { ShopClient } from "@/components/ecommerce/ShopClient";

export const revalidate = 60;
export const metadata: Metadata = { title: "Shop" };

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const products = await getProducts();
  const { category } = await searchParams;

  return (
    <div className="fadein">
      <section className="wrap" style={{ paddingBlock: "clamp(32px, 5vw, 56px) 24px" }}>
        <div className="kicker" style={{ marginBottom: 16 }}>{products.length} products</div>
        <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(40px, 6vw, 80px)", lineHeight: 0.95, letterSpacing: "-0.03em", margin: 0, textTransform: "uppercase" }}>Shop</h1>
      </section>
      <hr className="rule" />
      <ShopClient products={products} initialCategory={category ?? "all"} />
    </div>
  );
}
