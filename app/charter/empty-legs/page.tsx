import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { EmptyLegsTable } from "@/components/charter/CharterClient";
export const metadata: Metadata = { title: "Empty legs" };
export default function EmptyLegsPage() {
  return <div className="fadein"><PageHeader kicker="Repositioning flights — up to 75% off" title="Empty legs" /><section className="wrap" style={{ paddingBlock: "clamp(20px, 3vw, 32px) clamp(48px, 6vw, 80px)" }}><EmptyLegsTable /></section></div>;
}
