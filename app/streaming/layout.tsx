import type { Metadata } from "next";
import { StreamingProvider } from "@/components/streaming/StreamingContext";
import { SiteHeader } from "@/components/shell/SiteHeader";
import { SiteFooter } from "@/components/shell/SiteFooter";
import { STREAMING, NAV } from "@/lib/streaming";

export const metadata: Metadata = {
  title: { default: `${STREAMING.brand} — Stream, watch, own`, template: `%s — ${STREAMING.brand}` },
  description: STREAMING.heroSub,
};

export default function StreamingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh" }}>
      <StreamingProvider>
        <SiteHeader brand={STREAMING.brand} brandHref="/streaming" navItems={NAV} ctas={[{ label: "Library", href: "/streaming/library", variant: "secondary" }, { label: "Go Premium", href: "/streaming/plans" }]} />
        <main>{children}</main>
        <SiteFooter brand={STREAMING.brand} tagline={STREAMING.heroSub} columns={[{ title: "Platform", links: NAV.map((n) => ({ label: n.label, href: n.path })) }]} socials={["Instagram", "TikTok", "YouTube", "X / Twitter"]} />
      </StreamingProvider>
    </div>
  );
}
