import type { Metadata } from "next";
import { CompanyHeader } from "@/components/company/CompanyHeader";
import { SiteFooter } from "@/components/shell/SiteFooter";
import { COMPANY, NAV } from "@/lib/company";

export const metadata: Metadata = {
  title: { default: `${COMPANY.name} — ${COMPANY.category}`, template: `%s — ${COMPANY.name}` },
  description: COMPANY.subhead,
};

export default function CompanyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh" }}>
      <CompanyHeader />
      <main>{children}</main>
      <SiteFooter
        brand={COMPANY.name}
        tagline={COMPANY.subhead}
        columns={[{ title: "Company", links: NAV.map((n) => ({ label: n.label, href: n.path })) }]}
        socials={["LinkedIn", "X / Twitter", "GitHub", "Newsletter"]}
        legalRight="White-label template — Modernist"
      />
    </div>
  );
}
