import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { RequestForm } from "@/components/concierge/ConciergeClient";
export const metadata: Metadata = { title: "New request" };
export default async function RequestPage({ searchParams }: { searchParams: Promise<{ cat?: string }> }) {
  const { cat } = await searchParams;
  return (
    <div className="fadein">
      <PageHeader kicker="Tell us what you need" title="New request" />
      <section className="wrap" style={{ paddingBlock: "clamp(28px, 4vw, 48px) clamp(48px, 6vw, 80px)", maxWidth: 760 }}>
        <RequestForm initialCat={cat ?? "Dining"} />
      </section>
    </div>
  );
}
