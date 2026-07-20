"use client";

import { createContext, useCallback, useContext, useState } from "react";

export type LightboxItem = {
  type: "video" | "photo";
  caption: string;
  slot: string;
};

type LightboxContextValue = {
  item: LightboxItem | null;
  open: (item: LightboxItem) => void;
  close: () => void;
};

const LightboxContext = createContext<LightboxContextValue | null>(null);

export function LightboxProvider({ children }: { children: React.ReactNode }) {
  const [item, setItem] = useState<LightboxItem | null>(null);
  const open = useCallback((i: LightboxItem) => setItem(i), []);
  const close = useCallback(() => setItem(null), []);
  return (
    <LightboxContext.Provider value={{ item, open, close }}>
      {children}
    </LightboxContext.Provider>
  );
}

export function useLightbox() {
  const ctx = useContext(LightboxContext);
  if (!ctx) throw new Error("useLightbox must be used within LightboxProvider");
  return ctx;
}
