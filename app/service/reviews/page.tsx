import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { SERVICE, REVIEWS } from "@/lib/service";

export const metadata: Metadata = { title: "Reviews" };

export default function ReviewsPage() {
  return (
    <div className="fadein">
      <PageHeader kicker={`★ ${SERVICE.rating} from ${SERVICE.reviewCount} clients`} title="Reviews" />
      <section className="wrap" style={{ paddingBlock: "clamp(24px, 3vw, 44px) clamp(48px, 6vw, 80px)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "clamp(16px, 2vw, 28px)" }}>
          {REVIEWS.map((r, i) => (
            <div key={i} style={{ border: "2px solid var(--color-divider)", padding: 24 }}>
              <div style={{ color: "var(--color-accent)", fontFamily: "var(--font-heading)", fontWeight: 800, marginBottom: 12 }}>{r.stars}</div>
              <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 16, lineHeight: 1.45, margin: "0 0 14px" }}>&ldquo;{r.text}&rdquo;</p>
              <div style={{ fontSize: 13, color: "color-mix(in srgb, var(--color-text) 60%, transparent)" }}>{r.author} · {r.service}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
