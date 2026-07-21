import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { MembershipPlans } from "@/components/concierge/ConciergeClient";
export const metadata: Metadata = { title: "Plans" };
export default function PlansPage() {
  return <div className="fadein"><PageHeader kicker="Retainers" title="Plans" /><section className="wrap" style={{ paddingBlock: "clamp(24px, 3vw, 44px) clamp(48px, 6vw, 80px)" }}><MembershipPlans /></section></div>;
}
