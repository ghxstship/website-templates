import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ServiceSections } from "@/components/concierge/ConciergeClient";
export const metadata: Metadata = { title: "Services" };
export default function ServicesPage() {
  return <div className="fadein"><PageHeader kicker="The full remit" title="Services" /><section className="wrap" style={{ paddingBlock: "clamp(24px, 3vw, 44px) clamp(48px, 6vw, 80px)" }}><ServiceSections /></section></div>;
}
