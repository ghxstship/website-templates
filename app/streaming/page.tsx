import Link from "next/link";
import { STREAMING } from "@/lib/streaming";
import { MediaGrid, ContinueWatching } from "@/components/streaming/StreamingClient";

export default function StreamingHome() {
  return (
    <div className="fadein">
      <section className="wrap" style={{ paddingBlock: "clamp(32px, 5vw, 60px) clamp(20px, 3vw, 32px)" }}>
        <div className="kicker" style={{ marginBottom: 20 }}>Stream · Watch · Own</div>
        <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(40px, 7vw, 100px)", lineHeight: 0.92, letterSpacing: "-0.03em", margin: "0 0 20px", textTransform: "uppercase" }}>{STREAMING.heroLine}</h1>
        <p style={{ fontSize: "clamp(16px, 1.4vw, 20px)", lineHeight: 1.5, maxWidth: "52ch", margin: "0 0 28px", color: "color-mix(in srgb, var(--color-text) 82%, transparent)" }}>{STREAMING.heroSub}</p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href="/streaming/browse" className="btn btn-primary" style={{ padding: "13px 22px" }}>Start browsing</Link>
          <Link href="/streaming/creators" className="btn btn-secondary" style={{ padding: "13px 22px" }}>Explore creators</Link>
        </div>
      </section>
      <ContinueWatching />
      <MediaGrid />
    </div>
  );
}
