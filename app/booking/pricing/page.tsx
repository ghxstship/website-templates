import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { PricingClient } from "@/components/booking/BookingClient";
export const metadata: Metadata = { title: "Pricing" };
export default function PricingPage() { return <div className="fadein"><PageHeader kicker="Simple plans for providers" title="Pricing" /><PricingClient /></div>; }
