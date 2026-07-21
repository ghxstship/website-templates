import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Membership } from "@/components/fitness/FitnessClient";
export const metadata: Metadata = { title: "Membership" };
export default function MembershipPage() { return <div className="fadein"><PageHeader kicker="No contract · cancel anytime" title="Membership" /><section className="wrap" style={{ paddingBlock: "clamp(24px, 3vw, 44px) clamp(48px, 6vw, 80px)" }}><Membership /></section></div>; }
