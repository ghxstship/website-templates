import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { SpacesList } from "@/components/clubhouse/ClubhouseClient";
export const metadata: Metadata = { title: "Spaces" };
export default function SpacesPage() {
  return <div className="fadein"><PageHeader kicker="Rooms & studios" title="Spaces" /><section className="wrap" style={{ paddingBlock: "clamp(24px, 3vw, 44px) clamp(48px, 6vw, 80px)" }}><SpacesList /></section></div>;
}
