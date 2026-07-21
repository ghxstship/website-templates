import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Timetable } from "@/components/fitness/FitnessClient";
export const metadata: Metadata = { title: "Timetable" };
export default function SchedulePage() { return <div className="fadein"><PageHeader kicker="This week" title="Timetable" /><Timetable /></div>; }
