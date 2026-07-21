import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { OffersList } from "@/components/hospitality/HospitalityClient";
export const metadata: Metadata = { title: "Offers" };
export default function OffersPage() {
  return <div className="fadein"><PageHeader kicker="Direct-only rates" title="Offers" /><section className="wrap" style={{ paddingBlock: "clamp(24px, 3vw, 44px) clamp(48px, 6vw, 80px)" }}><OffersList /></section></div>;
}
