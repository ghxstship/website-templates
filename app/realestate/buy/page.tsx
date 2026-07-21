import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { BuyGrid } from "@/components/realestate/RealEstateClient";
export const metadata: Metadata = { title: "Buy & rent" };
export default function BuyPage() {
  return <div className="fadein"><PageHeader kicker="Homes for sale & to rent" title="Buy & rent" /><BuyGrid /></div>;
}
