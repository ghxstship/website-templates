"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Shared client-side persistence (the production equivalent of site-kit's
 * SiteKit.store). SSR-safe: the first render always uses `initial` so server
 * and client markup match; the stored value is hydrated on mount, and only
 * genuine post-hydration changes are written back (the first persist is
 * skipped so it can't clobber stored state before hydration applies).
 */
const PREFIX = "modernist:";

export function readStore<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const v = window.localStorage.getItem(PREFIX + key);
    return v == null ? fallback : (JSON.parse(v) as T);
  } catch {
    return fallback;
  }
}

export function writeStore<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    /* quota / disabled storage — ignore */
  }
}

const SENTINEL = Symbol("no-stored-value");

export function usePersistentState<T>(
  key: string,
  initial: T,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState<T>(initial);
  const firstPersist = useRef(true);

  // Hydrate once from storage after mount.
  useEffect(() => {
    const stored = readStore<T | typeof SENTINEL>(key, SENTINEL);
    if (stored !== SENTINEL) setState(stored as T);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  // Persist on change — but skip the very first run so we never write `initial`
  // over a stored value before hydration has applied.
  useEffect(() => {
    if (firstPersist.current) {
      firstPersist.current = false;
      return;
    }
    writeStore(key, state);
  }, [key, state]);

  return [state, setState];
}
