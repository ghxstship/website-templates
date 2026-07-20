import type { Metadata } from "next";
import { CommunitiesList } from "@/components/social/SocialClient";
export const metadata: Metadata = { title: "Communities" };
export default function CommunitiesPage() { return <CommunitiesList />; }
