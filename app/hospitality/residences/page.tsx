import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ResidencesGrid } from "@/components/hospitality/HospitalityClient";
export const metadata: Metadata = { title: "Residences" };
export default function ResidencesPage() {
  return <div className="fadein"><PageHeader kicker="Own a piece of it" title="Residences" /><section className="wrap" style={{ paddingBlock: "clamp(24px, 3vw, 44px) clamp(48px, 6vw, 80px)" }}><ResidencesGrid /></section></div>;
}
