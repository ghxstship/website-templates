import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { VideoGrid } from "@/components/news/NewsClient";
export const metadata: Metadata = { title: "Video & vlog" };
export default function VideosPage() { return <div className="fadein"><PageHeader kicker="On camera" title="Video & vlog" /><section className="wrap" style={{ paddingBlock: "clamp(24px, 3vw, 40px) clamp(48px, 6vw, 80px)" }}><VideoGrid /></section></div>; }
