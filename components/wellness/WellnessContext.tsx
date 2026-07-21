"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { Modal } from "@/components/ds/Modal";
import { ConfirmModal } from "@/components/ds/ConfirmModal";
import { captureBooking, captureLead } from "@/lib/actions";
import { WELLNESS } from "@/lib/wellness";

type Ctx = {
  openBook: (name: string) => void;
  joinPlan: (name: string) => void;
};
const WellnessCtx = createContext<Ctx | null>(null);

export function WellnessProvider({ children }: { children: React.ReactNode }) {
  const [book, setBook] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [confirm, setConfirm] = useState<{ title: string; body: string } | null>(null);

  const openBook = useCallback((name: string) => setBook(name), []);
  const joinPlan = useCallback((name: string) => {
    captureLead("wellness", "member@thesprings.example", `membership:${name}`);
    setConfirm({ title: `Welcome to ${WELLNESS.brand}`, body: `Your ${name} membership is active with a free first week — see you at the baths.` });
  }, []);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!book) return;
    setPending(true);
    const res = await captureBooking("wellness", { kind: "treatment", summary: book, refPrefix: "SP" });
    setPending(false);
    setBook(null);
    setConfirm({ title: "Booking confirmed", body: `${book} is booked. Ref ${res.ref ?? "SP-0000"} — arrive 30 minutes early for the thermal circuit.` });
  };

  return (
    <WellnessCtx.Provider value={{ openBook, joinPlan }}>
      {children}
      <Modal open={book !== null} onClose={() => setBook(null)} width={500} showClose={false}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 18, textTransform: "uppercase" }}>Book {book}</span>
        </div>
        <form onSubmit={submit} style={{ display: "grid", gap: 16 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div className="field"><label htmlFor="wl-date">Date</label><input id="wl-date" className="input" type="date" defaultValue="2026-09-18" style={{ minHeight: 42 }} /></div>
            <div className="field"><label htmlFor="wl-time">Time</label><select id="wl-time" className="input" style={{ minHeight: 42 }}><option>09:00</option><option>11:00</option><option>14:00</option><option>16:30</option><option>19:00</option></select></div>
          </div>
          <div className="field"><label htmlFor="wl-ther">Therapist</label><select id="wl-ther" className="input" style={{ minHeight: 42 }}><option>No preference</option><option>Nadia</option><option>Yusuf</option><option>Elin</option></select></div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div className="field"><label htmlFor="wl-name">Name</label><input id="wl-name" className="input" required /></div>
            <div className="field"><label htmlFor="wl-email">Email</label><input id="wl-email" className="input" type="email" required /></div>
          </div>
          <button type="submit" className="btn btn-primary" disabled={pending} style={{ padding: "13px 24px", justifyContent: "flex-start" }}>{pending ? "Confirming…" : "Confirm booking"}</button>
        </form>
      </Modal>
      <ConfirmModal open={!!confirm} onClose={() => setConfirm(null)} title={confirm?.title ?? ""} body={confirm?.body ?? ""} />
    </WellnessCtx.Provider>
  );
}

export function useWellness() {
  const c = useContext(WellnessCtx);
  if (!c) throw new Error("useWellness within provider");
  return c;
}
