import type { Metadata } from "next";
import { ATSPipeline } from "@/components/career/CareerClient";
export const metadata: Metadata = { title: "Recruiter ATS" };
export default function ATSPage() { return <div className="fadein"><ATSPipeline /></div>; }
