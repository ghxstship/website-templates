import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { CrossLinkCard } from "@/components/shell/CrossLinkCard";
import { JoinPlans } from "@/components/clubhouse/ClubhouseClient";

export const metadata: Metadata = { title: "Membership" };

export default function MembershipPage() {
  return (
    <div className="fadein">
      <PageHeader kicker="Membership" title="Become a member" />
      <section className="wrap" style={{ paddingBlock: "clamp(24px, 3vw, 44px)" }}>
        <JoinPlans />
      </section>
      <section className="wrap" style={{ paddingBlock: "clamp(20px, 3vw, 36px) clamp(48px, 6vw, 80px)", maxWidth: 820 }}>
        <CrossLinkCard
          kicker="Applications & billing"
          title="Apply, choose a tier or manage your membership"
          body="Membership applications, invitations, the member pass and billing are handled by the membership desk."
          href="/membership"
          cta="Go to membership"
          variant="accent"
        />
      </section>
    </div>
  );
}
