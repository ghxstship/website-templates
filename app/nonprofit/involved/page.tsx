import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { InvolveWays } from "@/components/nonprofit/NonprofitClient";
export const metadata: Metadata = { title: "Get involved" };
export default function InvolvedPage() {
  return <div className="fadein"><PageHeader kicker="Beyond giving" title="Get involved" /><section className="wrap" style={{ paddingBlock: "clamp(24px, 3vw, 44px) clamp(48px, 6vw, 80px)" }}><InvolveWays /></section></div>;
}
