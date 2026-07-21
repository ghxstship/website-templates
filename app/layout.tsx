import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import { A11yChrome } from "@/components/ds/A11yChrome";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "600", "800"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Modernist — White-Label Website Suite",
    template: "%s — Modernist Suite",
  },
  description:
    "White-label website templates on one shared Modernist design system. Next.js + Supabase.",
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
