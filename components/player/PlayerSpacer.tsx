"use client";

import { usePlayer } from "./PlayerContext";

/** Reserves 72px at the bottom so the fixed player never covers the footer. */
export function PlayerSpacer() {
  const { hasTrack } = usePlayer();
  return <div style={{ height: hasTrack ? 72 : 0 }} />;
}
