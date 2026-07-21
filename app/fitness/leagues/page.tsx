import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Leagues } from "@/components/fitness/FitnessClient";
export const metadata: Metadata = { title: "Leagues" };
export default function LeaguesPage() { return <div className="fadein"><PageHeader kicker="Sport & recreation" title="Leagues" /><Leagues /></div>; }
