import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { NewsletterCards } from "@/components/news/NewsClient";
export const metadata: Metadata = { title: "Newsletters" };
export default function NewslettersPage() { return <div className="fadein"><PageHeader kicker="Free & daily" title="Newsletters" /><section className="wrap" style={{ paddingBlock: "clamp(24px, 3vw, 44px) clamp(48px, 6vw, 80px)" }}><NewsletterCards /></section></div>; }
