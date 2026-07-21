import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { CalendarList } from "@/components/clubhouse/ClubhouseClient";
export const metadata: Metadata = { title: "Calendar" };
export default function CalendarPage() {
  return <div className="fadein"><PageHeader kicker="Member events & programming" title="Calendar" /><CalendarList /></div>;
}
