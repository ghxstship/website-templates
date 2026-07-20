import type { Metadata } from "next";
import { getSiteData, enabledPages, PAGE_LABELS, PAGE_PATHS, safeAccent } from "@/lib/data";
import { SiteChrome } from "@/components/SiteChrome";
import type { NavItem } from "@/components/shell/SiteHeader";

export async function generateMetadata(): Promise<Metadata> {
  const { config } = await getSiteData();
  return {
    title: { default: `${config.artist_name} — ${config.genre}`, template: `%s — ${config.artist_name}` },
    description: config.tagline,
  };
}

export default async function ArtistLayout({ children }: { children: React.ReactNode }) {
  const { config, socials } = await getSiteData();

  const navItems: NavItem[] = enabledPages(config).map((key) => ({
    label: PAGE_LABELS[key],
    path: PAGE_PATHS[key],
  }));

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
    <div style={{ minHeight: "100vh", ...accentVars }}>
      <SiteChrome
        artistName={config.artist_name}
        tagline={config.tagline}
        navItems={navItems}
        socials={socials}
      >
        {children}
      </SiteChrome>
    </div>
  );
}
