import type { Metadata } from "next";
import { BankingProvider } from "@/components/banking/BankingContext";
import { BankingHeader } from "@/components/banking/BankingClient";
import { SiteFooter } from "@/components/shell/SiteFooter";
import { BANKING, NAV } from "@/lib/banking";

export const metadata: Metadata = {
  title: { default: `${BANKING.brand} — Banking & crypto`, template: `%s — ${BANKING.brand}` },
  description: BANKING.heroSub,
};

export default function BankingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh" }}>
      <BankingProvider>
        <BankingHeader />
        <main>{children}</main>
        <SiteFooter brand={BANKING.brand} tagline={BANKING.heroSub} columns={[{ title: "Product", links: NAV.map((n) => ({ label: n.label, href: n.path })) }]} socials={["X / Twitter", "Instagram", "LinkedIn"]} legalRight="Deposits protected up to the regulatory limit." />
      </BankingProvider>
    </div>
  );
}
