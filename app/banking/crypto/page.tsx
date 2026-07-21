import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { CryptoPage } from "@/components/banking/BankingClient";
export const metadata: Metadata = { title: "Crypto" };
export default function CryptoRoute() { return <div className="fadein"><PageHeader kicker="On-chain, by default" title="Crypto" /><CryptoPage /></div>; }
