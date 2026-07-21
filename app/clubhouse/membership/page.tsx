import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { CrossLinkCard } from "@/components/shell/CrossLinkCard";
import { CLUBHOUSE } from "@/lib/clubhouse";

export const metadata: Metadata = { title: "Manage membership" };

export default function MembershipPage() {
  return (
    <div className="fadein">
      <PageHeader kicker="Membership" title="Manage membership" />
      <section className="wrap" style={{ paddingBlock: "clamp(24px, 3vw, 44px) clamp(48px, 6vw, 80px)", maxWidth: 820 }}>
        <p style={{ fontSize: 16, lineHeight: 1.6, margin: "0 0 24px", color: "color-mix(in srgb, var(--color-text) 80%, transparent)" }}>
          Applications, tiers, invitations and billing for {CLUBHOUSE.brand} are handled by the membership desk. Already a member? Everything you need is right here in the house — spaces, the calendar and the concierge.
        </p>
        <CrossLinkCard
          kicker="Not a member yet?"
          title="Apply, choose a tier or manage your membership"
          body="Membership applications, tiers, the member pass and billing live on the membership desk."
          href="/membership"
          cta="Go to membership"
          variant="accent"
        />
      </section>
    </div>
  );
}
