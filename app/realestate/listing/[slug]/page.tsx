import Link from "next/link";
import { notFound } from "next/navigation";
import { LISTINGS, listingBySlug } from "@/lib/realestate";
import { Placeholder } from "@/components/Placeholder";
import { ListingAside } from "@/components/realestate/RealEstateClient";

export function generateStaticParams() {
  return LISTINGS.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const l = listingBySlug(slug);
  return { title: l ? l.title : "Listing" };
}

export default async function ListingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const l = listingBySlug(slug);
  if (!l) notFound();
  const facts = [
    { v: l.beds, k: "Beds" }, { v: l.baths, k: "Baths" },
    { v: `${l.sqm}m²`, k: "Area" }, { v: l.type, k: "Type" },
  ];
  return (
    <div className="fadein">
      <section className="wrap" style={{ paddingBlock: "20px 0" }}>
        <Link href="/realestate/buy" className="btn btn-ghost" style={{ padding: "8px 4px" }}>← All listings</Link>
      </section>
      <figure className="grayscale" style={{ margin: "12px 0 0", aspectRatio: "24/9" }}><Placeholder label={l.title} /></figure>
      <section className="wrap detailgrid" style={{ paddingBlock: "clamp(24px, 4vw, 44px)", display: "grid", gridTemplateColumns: "minmax(0, 1.5fr) minmax(0, 1fr)", gap: "clamp(28px, 5vw, 56px)", alignItems: "start" }}>
        <div>
          <span className="tag tag-accent">{l.deal}</span>
          <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(28px, 4vw, 48px)", lineHeight: 1, letterSpacing: "-0.02em", margin: "14px 0 8px" }}>{l.title}</h1>
          <div style={{ fontSize: 16, color: "color-mix(in srgb, var(--color-text) 68%, transparent)", marginBottom: 20 }}>{l.area}</div>
          <div style={{ display: "flex", gap: 28, flexWrap: "wrap", padding: "16px 0", borderTop: "2px solid var(--color-divider)", borderBottom: "2px solid var(--color-divider)", marginBottom: 22 }}>
            {facts.map((f) => <div key={f.k}><div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 22 }}>{f.v}</div><div style={{ fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase", color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }}>{f.k}</div></div>)}
          </div>
          <p style={{ fontSize: 16, lineHeight: 1.7, margin: "0 0 20px", maxWidth: "60ch", color: "color-mix(in srgb, var(--color-text) 82%, transparent)" }}>{l.desc}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {l.features.map((ft) => <span key={ft} className="tag tag-neutral">{ft}</span>)}
          </div>
        </div>
        <ListingAside l={l} />
      </section>
    </div>
  );
}
