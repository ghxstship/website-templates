import type { Metadata } from "next";
import { LearningProvider } from "@/components/learning/LearningContext";
import { LearningHeader } from "@/components/learning/LearningClient";
import { SiteFooter } from "@/components/shell/SiteFooter";
import { LEARNING, NAV } from "@/lib/learning";

export const metadata: Metadata = {
  title: { default: `${LEARNING.brand} — Courses & community`, template: `%s — ${LEARNING.brand}` },
  description: LEARNING.heroSub,
};

export default function LearningLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh" }}>
      <LearningProvider>
        <LearningHeader />
        <main>{children}</main>
        <SiteFooter
          brand={LEARNING.brand}
          tagline={LEARNING.heroSub}
          columns={[{ title: "Platform", links: NAV.map((n) => ({ label: n.label, href: n.path })) }]}
          socials={["YouTube", "X / Twitter", "LinkedIn", "Discord"]}
        />
      </LearningProvider>
    </div>
  );
}
