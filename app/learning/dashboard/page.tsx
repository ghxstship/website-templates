import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Dashboard } from "@/components/learning/LearningClient";

export const metadata: Metadata = { title: "Dashboard" };

export default function DashboardPage() {
  return (
    <div className="fadein">
      <PageHeader kicker="Welcome back" title="Dashboard" />
      <Dashboard />
    </div>
  );
}
