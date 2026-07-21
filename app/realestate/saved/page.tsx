import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { SavedGrid } from "@/components/realestate/RealEstateClient";
export const metadata: Metadata = { title: "Favorites" };
export default function SavedPage() {
  return <div className="fadein"><PageHeader kicker="Your saved homes" title="Favorites" /><SavedGrid /></div>;
}
