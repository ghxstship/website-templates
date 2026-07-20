import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Library } from "@/components/streaming/StreamingClient";
export const metadata: Metadata = { title: "Library" };
export default function LibraryPage() { return <div className="fadein"><PageHeader kicker="Your collection" title="Library" /><Library /></div>; }
