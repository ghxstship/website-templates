import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { CartView } from "@/components/pos/PosClient";
export const metadata: Metadata = { title: "Your cart" };
export default function CartPage() {
  return <div className="fadein"><PageHeader kicker="Multi-store basket" title="Your cart" /><CartView /></div>;
}
