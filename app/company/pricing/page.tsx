import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Pricing } from "@/components/company/CompanyClient";

export const metadata: Metadata = { title: "Pricing" };

export default function PricingPage() {
  return (
    <div className="fadein">
      <PageHeader kicker="Simple, transparent" title="Pricing" />
      <Pricing />
    </div>
  );
}
