import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { RequestEngine } from "@/components/charter/CharterClient";
export const metadata: Metadata = { title: "Request a charter" };
export default function RequestPage() {
  return (
    <div className="fadein">
      <PageHeader kicker="Tell us the mission" title="Request a charter" />
      <section className="wrap" style={{ paddingBlock: "clamp(24px, 3vw, 40px)" }}><RequestEngine showNote={false} /></section>
    </div>
  );
}
