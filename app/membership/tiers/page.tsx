import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { TiersGrid } from "@/components/membership/MembershipClient";
export const metadata: Metadata = { title: "Tiers" };
export default function TiersPage() {
  return <div className="fadein"><PageHeader kicker="Choose your level" title="Tiers" /><section className="wrap" style={{ paddingBlock: "clamp(24px, 3vw, 44px) clamp(48px, 6vw, 80px)" }}><TiersGrid /></section></div>;
}
