import type { Metadata } from "next";
import { Notifications } from "@/components/social/SocialClient";
export const metadata: Metadata = { title: "Notifications" };
export default function NotificationsPage() { return <Notifications />; }
