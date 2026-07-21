import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { SectionBrowser } from "@/components/news/NewsClient";
export const metadata: Metadata = { title: "Sections" };
export default function SectionsPage() { return <div className="fadein"><PageHeader kicker="Section" title="All sections" /><SectionBrowser /></div>; }
