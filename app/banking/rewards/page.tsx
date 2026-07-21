import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Rewards } from "@/components/banking/BankingClient";
export const metadata: Metadata = { title: "Rewards" };
export default function RewardsPage() { return <div className="fadein"><PageHeader kicker="Spend, earn, redeem" title="Rewards" /><Rewards /></div>; }
