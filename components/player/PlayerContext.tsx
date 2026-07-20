"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

export type PlayerState = {
  title: string | null;
  album: string | null;
  playing: boolean;
  progress: number; // 0..100
  dur: number; // seconds
};

type PlayerContextValue = {
  player: PlayerState;
  playTrack: (title: string, album: string, dur?: number) => void;
  togglePlay: () => void;
  close: () => void;
  seek: (pct: number) => void;
  hasTrack: boolean;
};

const PlayerContext = createContext<PlayerContextValue | null>(null);

const INITIAL: PlayerState = {
  title: null,
  album: null,
  playing: false,
  progress: 0,
  dur: 218,
};

/**
 * Persistent audio player. Mounted in the root layout, so its state survives
 * client-side route changes. Progress is a real-time simulation advancing by
 * (100/dur)*0.25 %/tick every 250ms — mirroring the design prototype. Wire to
 * a real <audio> element to play actual files.
 */
export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [player, setPlayer] = useState<PlayerState>(INITIAL);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopTimer = useCallback(() => {
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
  }, []);

  const runTimer = useCallback(() => {
    stopTimer();
    timer.current = setInterval(() => {
      setPlayer((s) => {
        if (!s.playing) return s;
        const next = s.progress + (100 / s.dur) * 0.25;
        if (next >= 100) {
          return { ...s, progress: 100, playing: false };
        }
        return { ...s, progress: next };
      });
    }, 250);
  }, [stopTimer]);

  // Stop the interval whenever playback halts (end of track or pause).
  useEffect(() => {
    if (!player.playing) stopTimer();
  }, [player.playing, stopTimer]);

  useEffect(() => () => stopTimer(), [stopTimer]);

  const playTrack = useCallback(
    (title: string, album: string, dur = 218) => {
      setPlayer({ title, album, playing: true, progress: 0, dur });
      runTimer();
    },
    [runTimer],
  );

  const togglePlay = useCallback(() => {
    setPlayer((s) => {
      const playing = !s.playing;
      if (playing) {
        const progress = s.progress >= 100 ? 0 : s.progress;
        runTimer();
        return { ...s, playing: true, progress };
      }
      return { ...s, playing: false };
    });
  }, [runTimer]);

  const close = useCallback(() => {
    stopTimer();
    setPlayer(INITIAL);
  }, [stopTimer]);

  const seek = useCallback((pct: number) => {
    setPlayer((s) => ({
      ...s,
      progress: Math.max(0, Math.min(100, pct)),
    }));
  }, []);

  return (
    <PlayerContext.Provider
      value={{
        player,
        playTrack,
        togglePlay,
        close,
        seek,
        hasTrack: !!player.title,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used within PlayerProvider");
  return ctx;
}
