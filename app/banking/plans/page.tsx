import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Plans } from "@/components/banking/BankingClient";

export const metadata: Metadata = { title: "Plans" };

export default async function PlansPage({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
  const { tab } = await searchParams;
  const initialTab = tab === "business" ? "business" : "personal";
  return (
    <div className="fadein">
      <PageHeader kicker="Personal · Business · Premium" title="Plans" />
      <Plans initialTab={initialTab} />
    </div>
  );
}
