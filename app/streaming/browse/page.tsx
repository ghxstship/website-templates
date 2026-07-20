import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { MediaGrid } from "@/components/streaming/StreamingClient";
export const metadata: Metadata = { title: "Browse" };
export default function BrowsePage() { return <div className="fadein"><PageHeader kicker="Everything, every format" title="Browse" /><MediaGrid /></div>; }
