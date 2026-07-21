import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Dashboard } from "@/components/banking/BankingClient";
export const metadata: Metadata = { title: "Wallet" };
export default function DashboardPage() { return <div className="fadein"><PageHeader kicker="Good morning, Alex" title="Wallet" /><Dashboard /></div>; }
