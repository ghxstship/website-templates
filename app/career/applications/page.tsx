import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Applications } from "@/components/career/CareerClient";
export const metadata: Metadata = { title: "Applications" };
export default function ApplicationsPage() {
  return <div className="fadein"><PageHeader kicker="Your pipeline" title="Applications" /><section className="wrap" style={{ paddingBlock: "clamp(24px, 3vw, 44px) clamp(48px, 6vw, 80px)" }}><Applications /></section></div>;
}
