import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { RoomsList } from "@/components/hospitality/HospitalityClient";
export const metadata: Metadata = { title: "Rooms" };
export default function RoomsPage() {
  return <div className="fadein"><PageHeader kicker="Stay with us" title="Rooms & suites" /><RoomsList /></div>;
}
