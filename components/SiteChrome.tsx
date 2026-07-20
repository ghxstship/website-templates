"use client";

import { PlayerProvider } from "./player/PlayerContext";
import { AudioPlayer } from "./player/AudioPlayer";
import { LightboxProvider } from "./lightbox/LightboxContext";
import { Lightbox } from "./lightbox/Lightbox";
import { PlayerSpacer } from "./player/PlayerSpacer";
import { Header, type NavItem } from "./Header";
import { Footer } from "./Footer";
import type { Social } from "@/lib/types";

/**
 * App-wide chrome. Because this is rendered by the root layout and the
 * providers live here, player + lightbox state persist across route changes.
 */
export function SiteChrome({
  artistName,
  tagline,
  navItems,
  socials,
  year,
  children,
}: {
  artistName: string;
  tagline: string;
  navItems: NavItem[];
  socials: Social[];
  year: number;
  children: React.ReactNode;
}) {
  return (
    <PlayerProvider>
      <LightboxProvider>
        <Header artistName={artistName} navItems={navItems} />
        <main>{children}</main>
        <Footer
          artistName={artistName}
          tagline={tagline}
          navItems={navItems}
          socials={socials}
          year={year}
        />
        <PlayerSpacer />
        <AudioPlayer artistName={artistName} />
        <Lightbox />
      </LightboxProvider>
    </PlayerProvider>
  );
}
