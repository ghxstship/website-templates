"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { ConfirmModal } from "@/components/ds/ConfirmModal";

type Ctx = {
  applied: Set<string>;
  apply: (id: string, title: string, org: string) => void;
  stageOf: Record<string, number>;
  move: (key: string, base: number, dir: number) => void;
};
const CareerCtx = createContext<Ctx | null>(null);

export function CareerProvider({ children }: { children: React.ReactNode }) {
  const [applied, setApplied] = useState<Set<string>>(new Set());
  const [stageOf, setStageOf] = useState<Record<string, number>>({});
  const [confirm, setConfirm] = useState<{ title: string; body: string } | null>(null);

  const apply = useCallback((id: string, title: string, org: string) => {
    setApplied((s) => new Set(s).add(id));
    setConfirm({ title: "Application submitted", body: `Your application for ${title} at ${org} is in. Track it under Applications.` });
  }, []);

  const move = useCallback((key: string, base: number, dir: number) => {
    setStageOf((s) => {
      const cur = s[key] != null ? s[key] : base;
      return { ...s, [key]: Math.max(0, Math.min(4, cur + dir)) };
    });
  }, []);

  return (
    <CareerCtx.Provider value={{ applied, apply, stageOf, move }}>
      {children}
      <ConfirmModal open={!!confirm} onClose={() => setConfirm(null)} title={confirm?.title ?? ""} body={confirm?.body ?? ""} />
    </CareerCtx.Provider>
  );
}

export function useCareer() {
  const c = useContext(CareerCtx);
  if (!c) throw new Error("useCareer within provider");
  return c;
}
