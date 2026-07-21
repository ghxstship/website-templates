import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { GovernanceList } from "@/components/membership/MembershipClient";
export const metadata: Metadata = { title: "Governance" };
export default function GovernancePage() {
  return <div className="fadein"><PageHeader kicker="Members decide" title="Governance" /><section className="wrap" style={{ paddingBlock: "clamp(24px, 3vw, 44px) clamp(48px, 6vw, 80px)" }}><GovernanceList /></section></div>;
}
