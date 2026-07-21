import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { TreatmentsList } from "@/components/wellness/WellnessClient";
export const metadata: Metadata = { title: "Treatments" };
export default function TreatmentsPage() {
  return <div className="fadein"><PageHeader kicker="The menu" title="Treatments" /><TreatmentsList /></div>;
}
