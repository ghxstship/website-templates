import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import { getSiteData, enabledPages, PAGE_LABELS, PAGE_PATHS, safeAccent } from "@/lib/data";
import { SiteChrome } from "@/components/SiteChrome";
import type { NavItem } from "@/components/Header";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "600", "800"],
  variable: "--font-archivo",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const { config } = await getSiteData();
  return {
    title: {
      default: `${config.artist_name} — ${config.genre}`,
      template: `%s — ${config.artist_name}`,
    },
    description: config.tagline,
    openGraph: {
      title: config.artist_name,
      description: config.tagline,
      type: "website",
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await getSiteData();
  const { config, socials } = data;

  const navItems: NavItem[] = enabledPages(config).map((key) => ({
    key,
    label: PAGE_LABELS[key],
    path: PAGE_PATHS[key],
  }));

  // Only override the accent ramp for a genuinely custom color; the default
  // (#ec3013) keeps its designed 600/700 hover+active shades from the CSS.
  const accent = safeAccent(config.accent_color);
  const isDefault = !accent || accent.toLowerCase() === "#ec3013";
  const accentVars = !isDefault
    ? ({
        ["--color-accent" as string]: accent,
        ["--color-accent-600" as string]: accent,
        ["--color-accent-700" as string]: accent,
      } as React.CSSProperties)
    : undefined;

  return (
    <html lang="en" className={archivo.variable}>
      <body>
        <div style={{ minHeight: "100vh", ...accentVars }}>
          <SiteChrome
            artistName={config.artist_name}
            tagline={config.tagline}
            navItems={navItems}
            socials={socials}
            year={new Date().getFullYear()}
          >
            {children}
          </SiteChrome>
        </div>
      </body>
    </html>
  );
}
