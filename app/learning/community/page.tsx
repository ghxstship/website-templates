import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Community } from "@/components/learning/LearningClient";

export const metadata: Metadata = { title: "Community" };

export default function CommunityPage() {
  return (
    <div className="fadein">
      <PageHeader kicker="Members" title="Community" />
      <Community />
    </div>
  );
}
