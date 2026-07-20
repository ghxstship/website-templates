import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Pricing } from "@/components/learning/LearningClient";

export const metadata: Metadata = { title: "Pricing" };

export default function PricingPage() {
  return (
    <div className="fadein">
      <PageHeader kicker="Membership" title="Pricing" />
      <Pricing />
    </div>
  );
}
