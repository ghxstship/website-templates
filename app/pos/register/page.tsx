import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Register } from "@/components/pos/PosClient";
export const metadata: Metadata = { title: "Register" };
export default function RegisterPage() {
  return <div className="fadein"><PageHeader kicker="In-person terminal" title="Register" /><Register /></div>;
}
