import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { SavedArticles } from "@/components/news/NewsClient";
export const metadata: Metadata = { title: "Saved" };
export default function SavedPage() { return <div className="fadein"><PageHeader kicker="Your reading list" title="Saved" /><section className="wrap" style={{ paddingBlock: "clamp(20px, 3vw, 36px) clamp(48px, 6vw, 80px)" }}><SavedArticles /></section></div>; }
