"use client";

import type { CSSProperties, ReactNode } from "react";
import { usePlayer } from "./PlayerContext";

/**
 * Triggers the persistent player. Used for hero "Play latest", album
 * "Play album", and individual track rows.
 */
export function PlayButton({
  title,
  album,
  dur,
  className,
  style,
  children,
  ariaLabel,
  stopPropagation,
}: {
  title: string;
  album: string;
  dur: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  ariaLabel?: string;
  stopPropagation?: boolean;
}) {
  const { playTrack } = usePlayer();
  return (
    <button
      type="button"
      className={className}
      style={style}
      aria-label={ariaLabel}
      onClick={(e) => {
        if (stopPropagation) e.stopPropagation();
        playTrack(title, album, dur);
      }}
    >
      {children}
    </button>
  );
}
