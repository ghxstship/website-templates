import type { Metadata } from "next";
import { SocialProvider } from "@/components/social/SocialContext";
import { LeftRail, RightRail, BottomBar } from "@/components/social/SocialClient";
import { SOCIAL } from "@/lib/social";

export const metadata: Metadata = {
  title: { default: `${SOCIAL.brand} — Social`, template: `%s — ${SOCIAL.brand}` },
  description: "A three-pane social app — feed, communities and messages.",
};

export default function SocialLayout({ children }: { children: React.ReactNode }) {
  return (
    <SocialProvider>
      <div className="app-grid">
        <LeftRail />
        <main className="social-center">{children}</main>
        <RightRail />
      </div>
      <BottomBar />
    </SocialProvider>
  );
}
