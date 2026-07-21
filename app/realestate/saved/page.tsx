import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { SavedGrid } from "@/components/realestate/RealEstateClient";
export const metadata: Metadata = { title: "Saved" };
export default function SavedPage() {
  return <div className="fadein"><PageHeader kicker="Your shortlist" title="Saved homes" /><SavedGrid /></div>;
}
