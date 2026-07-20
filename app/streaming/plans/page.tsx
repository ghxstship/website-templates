import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Plans } from "@/components/streaming/StreamingClient";
export const metadata: Metadata = { title: "Plans" };
export default function PlansPage() { return <div className="fadein"><PageHeader kicker="Membership" title="Plans" /><Plans /></div>; }
