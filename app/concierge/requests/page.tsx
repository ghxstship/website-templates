import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { RequestsList } from "@/components/concierge/ConciergeClient";
export const metadata: Metadata = { title: "My requests" };
export default function RequestsPage() {
  return <div className="fadein"><PageHeader kicker="Tracked & timestamped" title="My requests" /><section className="wrap" style={{ paddingBlock: "clamp(24px, 3vw, 44px) clamp(48px, 6vw, 80px)" }}><RequestsList /></section></div>;
}
