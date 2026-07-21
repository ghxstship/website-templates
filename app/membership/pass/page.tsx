import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { PassView } from "@/components/membership/MembershipClient";
export const metadata: Metadata = { title: "Your pass" };
export default function PassPage() {
  return <div className="fadein"><PageHeader kicker="Your membership" title="Your pass" /><PassView /></div>;
}
