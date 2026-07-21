"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { usePersistentState } from "@/lib/persist";
import { announce } from "@/lib/announce";
import { ConfirmModal } from "@/components/ds/ConfirmModal";
import { captureLead } from "@/lib/actions";

type Ctx = {
  totalGiven: number;
  giftCount: number;
  recordGift: (amount: number, freq: "once" | "monthly", email: string) => Promise<string>;
  notify: (title: string, body: string) => void;
};
const NonprofitCtx = createContext<Ctx | null>(null);

export function NonprofitProvider({ children }: { children: React.ReactNode }) {
  const [totalGiven, setTotalGiven] = usePersistentState("nonprofit.totalGiven", 0);
  const [giftCount, setGiftCount] = usePersistentState("nonprofit.giftCount", 0);
  const [confirm, setConfirm] = useState<{ title: string; body: string } | null>(null);

  const recordGift = useCallback(async (amount: number, freq: "once" | "monthly", email: string) => {
    await captureLead("nonprofit", email || "donor@tideline.example", `donation:${freq}:${amount}`);
    const newTotal = Math.round((totalGiven + amount) * 100) / 100;
    const newCount = giftCount + 1;
    setTotalGiven(newTotal);
    setGiftCount(newCount);
    announce(`Thank you — gift of $${amount} received`);
    const per = freq === "monthly" ? "/mo" : "";
    return `Your ${freq === "monthly" ? "monthly " : ""}gift of $${amount}${per} will go straight to the front line. Your lifetime giving: $${newTotal.toLocaleString()} across ${newCount} gift${newCount === 1 ? "" : "s"}.`;
  }, [totalGiven, giftCount, setTotalGiven, setGiftCount]);

  const notify = useCallback((title: string, body: string) => setConfirm({ title, body }), []);

  return (
    <NonprofitCtx.Provider value={{ totalGiven, giftCount, recordGift, notify }}>
      {children}
      <ConfirmModal open={!!confirm} onClose={() => setConfirm(null)} title={confirm?.title ?? ""} body={confirm?.body ?? ""} />
    </NonprofitCtx.Provider>
  );
}

export function useNonprofit() {
  const c = useContext(NonprofitCtx);
  if (!c) throw new Error("useNonprofit within provider");
  return c;
}
