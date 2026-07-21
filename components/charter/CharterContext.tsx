"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { ConfirmModal } from "@/components/ds/ConfirmModal";
import { captureBooking } from "@/lib/actions";

type ConfirmData = { kicker: string; title: string; body: string };
type Ctx = {
  notify: (data: ConfirmData) => void;
  requestQuote: (name: string) => Promise<void>;
};
const CharterCtx = createContext<Ctx | null>(null);

export function CharterProvider({ children }: { children: React.ReactNode }) {
  const [confirm, setConfirm] = useState<ConfirmData | null>(null);

  const notify = useCallback((data: ConfirmData) => setConfirm(data), []);
  const requestQuote = useCallback(async (name: string) => {
    const res = await captureBooking("charter", { kind: "quote", summary: name, refPrefix: "CHT" });
    setConfirm({ kicker: "Request received", title: "Quote on the way", body: `${name} — an advisor will confirm availability and a firm price within the hour. Reference ${res.ref ?? "CHT-0000"}.` });
  }, []);

  return (
    <CharterCtx.Provider value={{ notify, requestQuote }}>
      {children}
      <ConfirmModal open={!!confirm} onClose={() => setConfirm(null)} title={confirm?.title ?? ""} body={confirm ? `${confirm.kicker} — ${confirm.body}` : ""} />
    </CharterCtx.Provider>
  );
}

export function useCharter() {
  const c = useContext(CharterCtx);
  if (!c) throw new Error("useCharter within provider");
  return c;
}
