import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { FleetGrid } from "@/components/charter/CharterClient";
export const metadata: Metadata = { title: "The fleet" };
export default function FleetPage() {
  return <div className="fadein"><PageHeader kicker="Air · sea · ground" title="The fleet" /><FleetGrid /></div>;
}
