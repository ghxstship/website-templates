import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { CreatorsGrid } from "@/components/streaming/StreamingClient";
export const metadata: Metadata = { title: "Creators" };
export default function CreatorsPage() { return <div className="fadein"><PageHeader kicker="Support the makers" title="Creators" /><CreatorsGrid /></div>; }
