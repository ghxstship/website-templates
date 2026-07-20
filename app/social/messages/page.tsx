import type { Metadata } from "next";
import { Messages } from "@/components/social/SocialClient";
export const metadata: Metadata = { title: "Messages" };
export default function MessagesPage() { return <Messages />; }
