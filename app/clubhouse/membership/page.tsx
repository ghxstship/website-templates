import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { JoinPlans, JoinForm } from "@/components/clubhouse/ClubhouseClient";
export const metadata: Metadata = { title: "Become a member" };
export default function MembershipPage() {
  return (
    <div className="fadein">
      <PageHeader kicker="Membership" title="Become a member" />
      <section className="wrap" style={{ paddingBlock: "clamp(24px, 3vw, 44px)" }}><JoinPlans /></section>
      <section id="apply" className="wrap" style={{ paddingBlock: "clamp(20px, 3vw, 36px) clamp(48px, 6vw, 80px)", maxWidth: 760 }}>
        <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(22px, 2.6vw, 32px)", letterSpacing: "-0.02em", margin: "0 0 6px", textTransform: "uppercase" }}>Request an invitation</h2>
        <p style={{ fontSize: 15, color: "color-mix(in srgb, var(--color-text) 65%, transparent)", margin: "0 0 22px" }}>Tell us a little about you — the committee reviews weekly.</p>
        <JoinForm />
      </section>
    </div>
  );
}
