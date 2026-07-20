import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { PostForm } from "@/components/career/CareerClient";
export const metadata: Metadata = { title: "Post a role" };
export default function PostPage() {
  return <div className="fadein"><PageHeader kicker="For employers & casting" title="Post a role" /><section className="wrap" style={{ paddingBlock: "clamp(28px, 4vw, 48px) clamp(48px, 6vw, 80px)", maxWidth: 760 }}><PostForm /></section></div>;
}
