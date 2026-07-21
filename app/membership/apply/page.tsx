import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ApplyFunnel } from "@/components/membership/MembershipClient";
export const metadata: Metadata = { title: "Apply to join" };
export default function ApplyPage() {
  return (
    <div className="fadein">
      <PageHeader kicker="The velvet rope" title="Apply to join" />
      <section className="wrap" style={{ paddingBlock: "clamp(28px, 4vw, 48px) clamp(48px, 6vw, 80px)", maxWidth: 760 }}><ApplyFunnel /></section>
    </div>
  );
}
