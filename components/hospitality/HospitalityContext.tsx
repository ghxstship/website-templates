"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { Modal } from "@/components/ds/Modal";
import { ConfirmModal } from "@/components/ds/ConfirmModal";
import { captureBooking, captureLead } from "@/lib/actions";

type Ctx = {
  checkIn: string; checkOut: string; guests: string;
  setCheckIn: (v: string) => void; setCheckOut: (v: string) => void; setGuests: (v: string) => void;
  nights: number;
  openReserve: (name: string, rate: number) => void;
  enquireResidence: (name: string) => void;
};
const HospitalityCtx = createContext<Ctx | null>(null);

function nightsBetween(a: string, b: string): number {
  const d = Math.round((new Date(b).getTime() - new Date(a).getTime()) / 86400000);
  return d > 0 ? d : 3;
}

export function HospitalityProvider({ children }: { children: React.ReactNode }) {
  const [checkIn, setCheckIn] = useState("2026-09-18");
  const [checkOut, setCheckOut] = useState("2026-09-21");
  const [guests, setGuests] = useState("2 adults");
  const [book, setBook] = useState<{ name: string; rate: number } | null>(null);
  const [pending, setPending] = useState(false);
  const [confirm, setConfirm] = useState<{ title: string; body: string } | null>(null);

  const nights = nightsBetween(checkIn, checkOut);

  const openReserve = useCallback((name: string, rate: number) => setBook({ name, rate }), []);
  const enquireResidence = useCallback((name: string) => {
    captureLead("hospitality", "residences@theforge.example", `residence:${name}`);
    setConfirm({ title: "Enquiry received", body: `Thank you for your interest in ${name}. Our residences team will be in touch to arrange a private viewing.` });
  }, []);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!book) return;
    setPending(true);
    const res = await captureBooking("hospitality", { kind: "stay", summary: `${book.name} — ${nights} nights`, details: { checkIn, checkOut, guests, rate: book.rate, total: book.rate * nights }, refPrefix: "FH" });
    setPending(false);
    setBook(null);
    setConfirm({ title: "Reservation confirmed", body: `Ref ${res.ref ?? "FH-00000"}. Your ${nights}-night stay is booked — a confirmation and directions are on their way.` });
  };

  const nightsLabel = `${nights} ${nights === 1 ? "night" : "nights"} · ${guests}`;

  return (
    <HospitalityCtx.Provider value={{ checkIn, checkOut, guests, setCheckIn, setCheckOut, setGuests, nights, openReserve, enquireResidence }}>
      {children}
      <Modal open={book !== null} onClose={() => setBook(null)} width={500} showClose={false}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 18, textTransform: "uppercase" }}>Reserve {book?.name}</span>
        </div>
        <form onSubmit={submit} style={{ display: "grid", gap: 16 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div className="field"><label htmlFor="hp-ci">Check in</label><input id="hp-ci" className="input" type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} style={{ minHeight: 42 }} /></div>
            <div className="field"><label htmlFor="hp-co">Check out</label><input id="hp-co" className="input" type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} style={{ minHeight: 42 }} /></div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div className="field"><label htmlFor="hp-g">Guests</label><input id="hp-g" className="input" value={guests} onChange={(e) => setGuests(e.target.value)} /></div>
            <div className="field"><label htmlFor="hp-name">Name</label><input id="hp-name" className="input" required /></div>
          </div>
          <div className="field"><label htmlFor="hp-email">Email</label><input id="hp-email" className="input" type="email" required /></div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "12px 0", borderTop: "2px solid var(--color-divider)", borderBottom: "2px solid var(--color-divider)" }}>
            <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 15 }}>{nightsLabel}</span>
            <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 20, color: "var(--color-accent)" }}>{book ? `$${(book.rate * nights).toLocaleString()}` : ""}</span>
          </div>
          <button type="submit" className="btn btn-primary" disabled={pending} style={{ padding: "13px 24px", justifyContent: "flex-start" }}>{pending ? "Confirming…" : "Confirm reservation"}</button>
        </form>
      </Modal>
      <ConfirmModal open={!!confirm} onClose={() => setConfirm(null)} title={confirm?.title ?? ""} body={confirm?.body ?? ""} />
    </HospitalityCtx.Provider>
  );
}

export function useHospitality() {
  const c = useContext(HospitalityCtx);
  if (!c) throw new Error("useHospitality within provider");
  return c;
}
