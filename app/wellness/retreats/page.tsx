import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { RetreatsList } from "@/components/wellness/WellnessClient";
export const metadata: Metadata = { title: "Retreats" };
export default function RetreatsPage() {
  return <div className="fadein"><PageHeader kicker="Multi-day programs" title="Retreats" /><section className="wrap" style={{ paddingBlock: "clamp(24px, 3vw, 44px) clamp(48px, 6vw, 80px)" }}><RetreatsList /></section></div>;
}
