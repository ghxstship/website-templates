import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ServicesList } from "@/components/service/ServicesList";
export const metadata: Metadata = { title: "Services" };
export default function ServicesPage() {
  return <div className="fadein"><PageHeader kicker="Menu & pricing" title="Services" /><ServicesList /></div>;
}
