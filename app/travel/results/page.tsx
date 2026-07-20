import { ResultsClient } from "@/components/travel/TravelClient";
import { FIELD_SETS, type Mode } from "@/lib/travel";

export default async function ResultsPage({ searchParams }: { searchParams: Promise<{ mode?: string }> }) {
  const { mode } = await searchParams;
  const m = (mode && mode in FIELD_SETS ? mode : "flights") as Mode;
  return <div className="fadein"><ResultsClient mode={m} /></div>;
}
