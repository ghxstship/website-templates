import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ProductsGrid } from "@/components/company/CompanyClient";

export const metadata: Metadata = { title: "Products" };

export default function ProductsPage() {
  return (
    <div className="fadein">
      <PageHeader kicker="The platform" title="Products" />
      <section className="wrap" style={{ paddingBlock: "clamp(28px, 4vw, 48px) clamp(48px, 6vw, 88px)" }}>
        <ProductsGrid />
      </section>
    </div>
  );
}
