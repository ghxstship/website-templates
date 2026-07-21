import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import { A11yChrome } from "@/components/ds/A11yChrome";
import { SITE_URL, SITE_NAME } from "@/lib/seo";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "600", "800"],
  variable: "--font-archivo",
  display: "swap",
});

const DESCRIPTION =
  "White-label website templates on one shared Modernist design system. Next.js + Supabase.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Modernist — White-Label Website Suite",
    template: "%s — Modernist Suite",
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: "Modernist — White-Label Website Suite",
    description: DESCRIPTION,
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Modernist — White-Label Website Suite",
    description: DESCRIPTION,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={archivo.variable}>
      <body>
        <A11yChrome />
        {children}
      </body>
    </html>
  );
}
