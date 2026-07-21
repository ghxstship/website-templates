"use client";

import { useCallback, useMemo } from "react";
import { usePersistentState } from "./persist";
import { announce } from "./announce";

/**
 * Reusable "favourite / save" recipe. Persists a list of ids under the given
 * namespace, announces on toggle, and exposes helpers for a Saved filter/page.
 */
export function useFavorites(namespace: string, noun = "Item") {
  const [saved, setSaved] = usePersistentState<string[]>(`${namespace}.saved`, []);
  const set = useMemo(() => new Set(saved), [saved]);

  const isSaved = useCallback((id: string) => set.has(id), [set]);

  const toggle = useCallback(
    (id: string, label?: string) => {
      setSaved((prev) => {
        const has = prev.includes(id);
        announce(has ? `${label ?? noun} removed from saved` : `${label ?? noun} saved`);
        return has ? prev.filter((x) => x !== id) : [...prev, id];
      });
    },
    [setSaved, noun],
  );

  return { saved, count: saved.length, isSaved, toggle };
}
