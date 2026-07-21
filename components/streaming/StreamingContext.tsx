"use client";

import { createContext, useContext, useState, useRef, useCallback, useEffect } from "react";
import { usePersistentState } from "@/lib/persist";
import { ConfirmModal } from "@/components/ds/ConfirmModal";
import { PlayIcon, PauseIcon, CloseIcon } from "@/components/icons";
import type { Media } from "@/lib/streaming";

type PlayerItem = { title: string; creator: string } | null;
export type WatchItem = { title: string; creator: string };
type Ctx = {
  subs: Set<string>; purchased: Set<string>; premium: boolean;
  continueWatching: WatchItem[];
  hasAccess: (m: Media) => boolean;
  subscribe: (creator: string, sub: number) => void;
  buy: (title: string) => void;
  joinPlan: (name: string, prem: boolean) => void;
  play: (item: { title: string; creator: string }) => void;
  download: (title: string) => void;
};
const StreamingCtx = createContext<Ctx | null>(null);

export function StreamingProvider({ children }: { children: React.ReactNode }) {
  const [subs, setSubs] = useState<Set<string>>(new Set());
  const [purchased, setPurchased] = useState<Set<string>>(new Set());
  const [premium, setPremium] = useState(false);
  const [continueWatching, setContinueWatching] = usePersistentState<WatchItem[]>("streaming.continue", []);
  const [confirm, setConfirm] = useState<{ title: string; body: string } | null>(null);
  const [player, setPlayer] = useState<PlayerItem>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const stop = useCallback(() => { if (timer.current) { clearInterval(timer.current); timer.current = null; } }, []);
  const run = useCallback(() => {
    stop();
    timer.current = setInterval(() => setProgress((p) => { if (p >= 100) { stop(); setPlaying(false); return 100; } return p + 0.5; }), 200);
  }, [stop]);
  useEffect(() => () => stop(), [stop]);

  const hasAccess = useCallback((m: Media) => !m.locked || premium || subs.has(m.creator) || purchased.has(m.title), [premium, subs, purchased]);
  const subscribe = useCallback((creator: string) => { setSubs((s) => new Set(s).add(creator)); setConfirm({ title: `Subscribed to ${creator}`, body: `Every premium post from ${creator} is now unlocked, and you can cancel any time.` }); }, []);
  const buy = useCallback((title: string) => { setPurchased((s) => new Set(s).add(title)); setConfirm({ title: "Purchased", body: `You now own ${title}. It has been added to your library.` }); }, []);
  const joinPlan = useCallback((name: string, prem: boolean) => { setPremium(prem); setConfirm({ title: `${name} active`, body: prem ? "Premium unlocked — ad-free streaming, offline downloads and every creator's free tier." : `Your ${name} plan is active.` }); }, []);
  const download = useCallback((title: string) => setConfirm({ title: "Download started", body: `${title} is downloading to your device.` }), []);
  const play = useCallback((item: { title: string; creator: string }) => {
    setPlayer(item); setPlaying(true); setProgress(0); run();
    setContinueWatching((prev) => [item, ...prev.filter((w) => w.title !== item.title)].slice(0, 8));
  }, [run, setContinueWatching]);
  const togglePlay = () => setPlaying((pl) => { const next = !pl; if (next && progress < 100) run(); else stop(); return next; });
  const closePlayer = () => { stop(); setPlayer(null); setPlaying(false); setProgress(0); };

  return (
    <StreamingCtx.Provider value={{ subs, purchased, premium, continueWatching, hasAccess, subscribe, buy, joinPlan, play, download }}>
      {children}
      <div style={{ height: player ? 72 : 0 }} />
      {player ? (
        <div style={{ position: "fixed", left: 0, right: 0, bottom: 0, zIndex: 70, background: "var(--color-text)", color: "var(--color-bg)", borderTop: "2px solid var(--color-accent)" }}>
          <div style={{ height: 4, background: "color-mix(in srgb, var(--color-bg) 22%, transparent)" }}><div style={{ height: "100%", background: "var(--color-accent)", width: `${progress}%` }} /></div>
          <div className="wrap" style={{ display: "flex", alignItems: "center", gap: 18, paddingBlock: 12, minHeight: 64 }}>
            <button type="button" className="btn btn-icon" onClick={togglePlay} style={{ background: "var(--color-accent)", color: "var(--color-bg)", flex: "0 0 auto" }} aria-label={playing ? "Pause" : "Play"}>{playing ? <PauseIcon size={16} /> : <PlayIcon size={16} />}</button>
            <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 15, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{player.title}</div><div style={{ fontSize: 12, color: "color-mix(in srgb, var(--color-bg) 65%, transparent)" }}>{player.creator}</div></div>
            <button type="button" className="btn btn-icon" onClick={closePlayer} style={{ color: "var(--color-bg)", flex: "0 0 auto" }} aria-label="Close"><CloseIcon size={16} /></button>
          </div>
        </div>
      ) : null}
      <ConfirmModal open={!!confirm} onClose={() => setConfirm(null)} title={confirm?.title ?? ""} body={confirm?.body ?? ""} />
    </StreamingCtx.Provider>
  );
}

export function useStreaming() {
  const c = useContext(StreamingCtx);
  if (!c) throw new Error("useStreaming within provider");
  return c;
}
