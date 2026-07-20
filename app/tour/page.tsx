import type { Metadata } from "next";
import { getSiteData } from "@/lib/data";
import { TourTable } from "@/components/tour/TourTable";

export const revalidate = 60;
export const metadata: Metadata = { title: "Tour" };

export default async function TourPage() {
  const { shows } = await getSiteData();
  const year = new Date().getFullYear();
  return (
    <div className="fadein">
      <section
        className="wrap"
        style={{ paddingBlock: "clamp(40px, 6vw, 80px) 32px" }}
      >
        <div className="kicker" style={{ marginBottom: 18 }}>
          Live {year}
        </div>
        <h1
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 800,
            fontSize: "clamp(44px, 7vw, 92px)",
            lineHeight: 0.95,
            letterSpacing: "-0.03em",
            margin: 0,
            textTransform: "uppercase",
          }}
        >
          Tour
        </h1>
      </section>
      <hr className="rule" />
      <TourTable shows={shows} />
    </div>
  );
}
