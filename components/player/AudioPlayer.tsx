"use client";

import { usePlayer } from "./PlayerContext";
import { PlayIcon, PauseIcon, CloseIcon } from "@/components/icons";
import { fmt } from "@/lib/data";

const EQ = [
  { dur: "0.7s", delay: "0s" },
  { dur: "0.5s", delay: "0.15s" },
  { dur: "0.9s", delay: "0.3s" },
  { dur: "0.6s", delay: "0.1s" },
];

export function AudioPlayer({ artistName }: { artistName: string }) {
  const { player, hasTrack, togglePlay, close, seek } = usePlayer();
  if (!hasTrack) return null;

  const onSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = ((e.clientX - rect.left) / rect.width) * 100;
    seek(pct);
  };

  const STEP = 5;
  const onSeekKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case "ArrowLeft":
      case "ArrowDown":
        e.preventDefault();
        seek(player.progress - STEP);
        break;
      case "ArrowRight":
      case "ArrowUp":
        e.preventDefault();
        seek(player.progress + STEP);
        break;
      case "Home":
        e.preventDefault();
        seek(0);
        break;
      case "End":
        e.preventDefault();
        seek(100);
        break;
    }
  };

  const eqState = player.playing ? "running" : "paused";

  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 70,
        background: "var(--color-text)",
        color: "var(--color-bg)",
      }}
    >
      {/* seek track */}
      <div
        onClick={onSeek}
        onKeyDown={onSeekKey}
        role="slider"
        tabIndex={0}
        aria-label="Seek"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(player.progress)}
        style={{
          height: 4,
          background: "color-mix(in srgb, var(--color-bg) 22%, transparent)",
          cursor: "pointer",
        }}
      >
        <div
          style={{
            height: "100%",
            background: "var(--color-accent)",
            width: `${player.progress}%`,
          }}
        />
      </div>

      <div
        className="wrap"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          paddingBlock: 14,
          minHeight: 64,
        }}
      >
        <button
          type="button"
          className="btn btn-icon"
          onClick={togglePlay}
          aria-label={player.playing ? "Pause" : "Play"}
          style={{
            background: "var(--color-accent)",
            color: "var(--color-bg)",
            flex: "0 0 auto",
          }}
        >
          {player.playing ? <PauseIcon size={16} /> : <PlayIcon size={16} />}
        </button>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 3,
            flex: "0 0 auto",
            height: 22,
          }}
          aria-hidden
        >
          {EQ.map((b, i) => (
            <span
              key={i}
              style={{
                width: 3,
                height: "100%",
                background: "var(--color-accent)",
                transformOrigin: "bottom",
                animation: `eqbar ${b.dur} ease-in-out ${b.delay} infinite`,
                animationPlayState: eqState,
              }}
            />
          ))}
        </div>

        <div style={{ minWidth: 0, flex: 1 }}>
          <div
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 800,
              fontSize: 15,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {player.title}
          </div>
          <div
            style={{
              fontSize: 12,
              color: "color-mix(in srgb, var(--color-bg) 65%, transparent)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {artistName} — {player.album}
          </div>
        </div>

        <div
          style={{
            fontVariantNumeric: "tabular-nums",
            fontSize: 13,
            color: "color-mix(in srgb, var(--color-bg) 70%, transparent)",
            flex: "0 0 auto",
          }}
        >
          {fmt((player.progress / 100) * player.dur)} / {fmt(player.dur)}
        </div>

        <button
          type="button"
          className="btn btn-icon"
          onClick={close}
          aria-label="Close player"
          style={{ color: "var(--color-bg)", flex: "0 0 auto" }}
        >
          <CloseIcon size={16} />
        </button>
      </div>
    </div>
  );
}
