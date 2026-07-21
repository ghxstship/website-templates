import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { MembershipPlans } from "@/components/wellness/WellnessClient";
export const metadata: Metadata = { title: "Membership" };
export default function MembershipPage() {
  return <div className="fadein"><PageHeader kicker="Regulars save more" title="Membership" /><section className="wrap" style={{ paddingBlock: "clamp(24px, 3vw, 44px) clamp(48px, 6vw, 80px)" }}><MembershipPlans /></section></div>;
}
