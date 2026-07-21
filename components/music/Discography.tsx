"use client";

import { useState } from "react";
import type { Album } from "@/lib/types";
import { fmt } from "@/lib/data";
import { Placeholder } from "@/components/Placeholder";
import { PlayButton } from "@/components/player/PlayButton";
import { PlayIcon } from "@/components/icons";
import { SaveHeart } from "@/components/ds/SaveHeart";
import { useFavorites } from "@/lib/useFavorites";
import { usePlayer as usePlayerState } from "@/components/player/PlayerContext";

const STREAMING = ["Spotify", "Apple Music", "Bandcamp"];

export function Discography({ albums }: { albums: Album[] }) {
  const [expanded, setExpanded] = useState<number | null>(0);
  const [showLiked, setShowLiked] = useState(false);
  const fav = useFavorites("artist", "Album");
  const { player } = usePlayerState();

  const shown = showLiked ? albums.filter((a) => fav.isSaved(a.id)) : albums;

  return (
    <>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", paddingBottom: 16 }}>
        <button type="button" onClick={() => setShowLiked(false)} className="btn" style={{ padding: "8px 16px", border: "1px solid var(--color-divider)", background: !showLiked ? "var(--color-text)" : "transparent", color: !showLiked ? "var(--color-bg)" : "var(--color-text)" }}>All releases</button>
        <button type="button" onClick={() => setShowLiked(true)} className="btn" style={{ padding: "8px 16px", border: "1px solid var(--color-divider)", background: showLiked ? "var(--color-accent)" : "transparent", color: showLiked ? "var(--color-bg)" : "var(--color-text)" }}>Liked · {fav.count}</button>
      </div>
      {showLiked && shown.length === 0 ? (
        <p style={{ fontSize: 16, color: "color-mix(in srgb, var(--color-text) 60%, transparent)", padding: "16px 0" }}>No liked releases yet. Tap the heart on any album.</p>
      ) : null}
      {shown.map((album) => {
        const i = albums.indexOf(album);
        const isOpen = expanded === i;
        const first = album.tracks[0];
        return (
          <div
            key={album.id}
            style={{ borderBottom: "2px solid var(--color-divider)" }}
          >
            <div
              onClick={() => setExpanded(isOpen ? null : i)}
              style={{
                display: "grid",
                gridTemplateColumns: "96px minmax(0, 1fr) auto auto auto",
                gap: "clamp(16px, 3vw, 40px)",
                alignItems: "center",
                paddingBlock: 24,
                cursor: "pointer",
              }}
            >
              <figure
                className="grayscale"
                style={{ margin: 0, width: 96, height: 96 }}
              >
                <Placeholder />
              </figure>
              <div>
                <div
                  style={{
                    display: "flex",
                    gap: 10,
                    alignItems: "baseline",
                    flexWrap: "wrap",
                  }}
                >
                  <h2
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontWeight: 800,
                      fontSize: "clamp(22px, 2.6vw, 34px)",
                      letterSpacing: "-0.015em",
                      margin: 0,
                    }}
                  >
                    {album.title}
                  </h2>
                  <span className="tag tag-outline">{album.type}</span>
                </div>
                <div
                  style={{
                    fontSize: 14,
                    color: "color-mix(in srgb, var(--color-text) 62%, transparent)",
                    marginTop: 8,
                  }}
                >
                  {album.year} — {album.tracks.length} tracks
                </div>
              </div>
              <SaveHeart active={fav.isSaved(album.id)} onToggle={() => fav.toggle(album.id, album.title)} label={`Like ${album.title}`} size={18} />
              {first ? (
                <PlayButton
                  title={first.name}
                  album={album.title}
                  dur={first.seconds}
                  stopPropagation
                  className="btn btn-primary"
                  style={{ padding: "10px 16px" }}
                >
                  <PlayIcon size={14} />
                  Play
                </PlayButton>
              ) : (
                <span />
              )}
              <div
                aria-hidden
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 800,
                  color: "var(--color-accent)",
                  fontSize: 20,
                  width: 24,
                  textAlign: "center",
                }}
              >
                {isOpen ? "–" : "+"}
              </div>
            </div>

            {isOpen ? (
              <div style={{ paddingBlock: "4px 28px" }}>
                {album.tracks.map((track) => {
                  const active =
                    player.title === track.name && player.album === album.title;
                  return (
                    <PlayButton
                      key={track.position}
                      title={track.name}
                      album={album.title}
                      dur={track.seconds}
                      className="track-row"
                      ariaLabel={`Play ${track.name}`}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "40px minmax(0, 1fr) auto auto",
                        gap: 16,
                        alignItems: "center",
                        width: "100%",
                        paddingBlock: 12,
                        paddingInline: 0,
                        borderTop: "1px solid var(--color-divider)",
                        cursor: "pointer",
                        background: "transparent",
                        textAlign: "left",
                        justifyContent: "stretch",
                        borderRadius: 0,
                      }}
                    >
                      <span
                        style={{
                          fontVariantNumeric: "tabular-nums",
                          fontSize: 14,
                          color:
                            "color-mix(in srgb, var(--color-text) 55%, transparent)",
                        }}
                      >
                        {String(track.position).padStart(2, "0")}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-heading)",
                          fontWeight: 600,
                          fontSize: 16,
                          textAlign: "left",
                          color: active
                            ? "var(--color-accent)"
                            : "var(--color-text)",
                        }}
                      >
                        {track.name}
                      </span>
                      <span
                        style={{
                          fontVariantNumeric: "tabular-nums",
                          fontSize: 13,
                          color:
                            "color-mix(in srgb, var(--color-text) 55%, transparent)",
                        }}
                      >
                        {fmt(track.seconds)}
                      </span>
                      <span
                        className="btn btn-icon"
                        style={{ pointerEvents: "none" }}
                      >
                        <PlayIcon size={15} />
                      </span>
                    </PlayButton>
                  );
                })}
                <div
                  style={{
                    display: "flex",
                    gap: 16,
                    marginTop: 20,
                    flexWrap: "wrap",
                  }}
                >
                  {STREAMING.map((name) => (
                    <a
                      key={name}
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontWeight: 600,
                        fontSize: 13,
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {name} ↗
                    </a>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        );
      })}
    </>
  );
}
