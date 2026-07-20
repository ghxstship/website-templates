"use client";

import { PlayerProvider } from "./player/PlayerContext";
import { AudioPlayer } from "./player/AudioPlayer";
import { LightboxProvider } from "./lightbox/LightboxContext";
import { Lightbox } from "./lightbox/Lightbox";
import { PlayerSpacer } from "./player/PlayerSpacer";
import { SiteHeader, type NavItem } from "./shell/SiteHeader";
import { SiteFooter } from "./shell/SiteFooter";
import type { Social } from "@/lib/types";

/**
 * Artist-site chrome. Player + lightbox providers live here (rendered by the
 * /artist layout), so their state persists across artist route changes.
 */
export function SiteChrome({
  artistName,
  tagline,
  navItems,
  socials,
  children,
}: {
  artistName: string;
  tagline: string;
  navItems: NavItem[];
  socials: Social[];
  children: React.ReactNode;
}) {
  return (
    <PlayerProvider>
      <LightboxProvider>
        <SiteHeader
          brand={artistName}
          brandHref="/artist"
          navItems={navItems}
          ctas={[{ label: "Listen", href: "/artist/music" }]}
        />
        <main>{children}</main>
        <SiteFooter
          brand={artistName}
          tagline={tagline}
          columns={[{ title: "Explore", links: navItems.map((n) => ({ label: n.label, href: n.path })) }]}
          socials={socials.map((s) => s.name)}
        />
        <PlayerSpacer />
        <AudioPlayer artistName={artistName} />
        <Lightbox />
      </LightboxProvider>
    </PlayerProvider>
  );
}
