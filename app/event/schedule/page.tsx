import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ScheduleTabs } from "@/components/event/EventClient";

export const metadata: Metadata = { title: "Schedule" };

export default function SchedulePage() {
  return (
    <div className="fadein">
      <PageHeader kicker="Program" title="Schedule" />
      <ScheduleTabs />
    </div>
  );
}
