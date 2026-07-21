import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Plans } from "@/components/banking/BankingClient";
export const metadata: Metadata = { title: "Plans" };
export default function PlansPage() { return <div className="fadein"><PageHeader kicker="Personal · Business · Premium" title="Plans" /><Plans /></div>; }
