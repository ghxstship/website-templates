import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { AdminConsole } from "@/components/membership/MembershipClient";
export const metadata: Metadata = { title: "Admin" };
export default function AdminPage() {
  return <div className="fadein"><PageHeader kicker="Operator console" title="Admin" /><AdminConsole /></div>;
}
