import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ToursGrid } from "@/components/travel/TravelClient";

export const metadata: Metadata = { title: "Tours & expeditions" };

export default function ToursPage() {
  return (
    <div className="fadein">
      <PageHeader kicker="Guided & small-group" title="Tours & expeditions" />
      <ToursGrid />
    </div>
  );
}
