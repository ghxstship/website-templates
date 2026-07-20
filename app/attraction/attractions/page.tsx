import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { AttractionsGrid } from "@/components/attraction/AttractionClient";
export const metadata: Metadata = { title: "Attractions" };
export default function AttractionsPage() {
  return <div className="fadein"><PageHeader kicker="On show" title="Attractions" /><AttractionsGrid /></div>;
}
