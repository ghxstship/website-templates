import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { LineupList } from "@/components/event/LineupList";

export const metadata: Metadata = { title: "Lineup" };

export default function LineupPage() {
  return (
    <div className="fadein">
      <PageHeader kicker="Who's playing" title="Lineup" />
      <section className="wrap" style={{ paddingBlock: "clamp(28px, 4vw, 48px) clamp(48px, 6vw, 88px)" }}>
        <LineupList />
      </section>
    </div>
  );
}
