import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSiteData } from "@/lib/data";
import { PageHeader } from "@/components/PageHeader";
import { MerchGrid } from "@/components/store/MerchGrid";
import { CrossLinkCard } from "@/components/shell/CrossLinkCard";

export const revalidate = 60;
export const metadata: Metadata = { title: "Store" };

export default async function StorePage() {
  const { config, merch } = await getSiteData();
  if (!config.show_store) notFound();
  return (
    <div className="fadein">
      <PageHeader kicker="Official store" title="Merch" />
      <section
        className="wrap"
        style={{ paddingBlock: "clamp(28px, 4vw, 48px) clamp(48px, 6vw, 88px)" }}
      >
        <MerchGrid merch={merch} />
        <div style={{ marginTop: "clamp(28px, 4vw, 44px)" }}>
          <CrossLinkCard kicker="Cart & checkout" title="Shop the full catalog" body="Sizes, bundles, cart and secure checkout are handled in the official store." href="/ecommerce/shop" cta="Open the shop" />
        </div>
      </section>
    </div>
  );
}
