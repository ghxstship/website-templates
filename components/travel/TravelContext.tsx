"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { usePersistentState } from "@/lib/persist";
import { Modal } from "@/components/ds/Modal";
import { ConfirmModal } from "@/components/ds/ConfirmModal";
import { captureBooking } from "@/lib/actions";

export type Trip = { mode: string; title: string; detail: string; ref: string };
type BookingItem = { title: string; sub: string; meta: string; price: string; mode: string };

type Ctx = {
  trips: Trip[];
  openBooking: (item: BookingItem) => void;
  cancelTrip: (index: number) => void;
};
const TravelCtx = createContext<Ctx | null>(null);

export function TravelProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [trips, setTrips] = usePersistentState<Trip[]>("travel.trips", []);
  const [booking, setBooking] = useState<BookingItem | null>(null);
  const [confirm, setConfirm] = useState<{ title: string; body: string } | null>(null);
  const [pending, setPending] = useState(false);

  const openBooking = useCallback((item: BookingItem) => setBooking(item), []);
  const cancelTrip = useCallback((index: number) => {
    setTrips((prev) => {
      const trip = prev[index];
      if (trip) setConfirm({ title: "Trip canceled", body: `${trip.title} (ref ${trip.ref}) has been canceled. Any refund due will be processed to your original payment method.` });
      return prev.filter((_, i) => i !== index);
    });
  }, [setTrips]);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!booking) return;
    setPending(true);
    const res = await captureBooking("travel", { kind: booking.mode, summary: `${booking.title} — ${booking.price}`, details: { ...booking }, refPrefix: "WPT" });
    setPending(false);
    const ref = res.ref ?? "WP-0000";
    setTrips((t) => [...t, { mode: booking.mode, title: booking.title, detail: booking.sub, ref }]);
    setBooking(null);
    setConfirm({ title: "Booking confirmed", body: `Reference ${ref}. A confirmation and e-tickets are on their way to your email.` });
  };

  return (
    <TravelCtx.Provider value={{ trips, openBooking, cancelTrip }}>
      {children}
      <Modal open={!!booking} onClose={() => setBooking(null)} width={520} label="Confirm booking">
        {booking ? (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
              <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 18, textTransform: "uppercase" }}>Confirm booking</span>
            </div>
            <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 24, letterSpacing: "-0.015em", margin: "0 0 6px" }}>{booking.title}</h3>
            <div style={{ fontSize: 14, color: "color-mix(in srgb, var(--color-text) 65%, transparent)", marginBottom: 20 }}>{booking.sub} · {booking.meta}</div>
            <form onSubmit={submit} style={{ display: "grid", gap: 16 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div className="field"><label htmlFor="tb-name">Lead traveler</label><input id="tb-name" className="input" required placeholder="Full name" /></div>
                <div className="field"><label htmlFor="tb-email">Email</label><input id="tb-email" className="input" type="email" required placeholder="you@email.com" /></div>
              </div>
              <div className="field"><label htmlFor="tb-card">Card number</label><input id="tb-card" className="input" required placeholder="4242 4242 4242 4242" /></div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "14px 0", borderTop: "2px solid var(--color-divider)", borderBottom: "2px solid var(--color-divider)" }}>
                <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 16 }}>Total</span>
                <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 22, color: "var(--color-accent)" }}>{booking.price}</span>
              </div>
              <button type="submit" className="btn btn-primary" disabled={pending} style={{ padding: "13px 24px", justifyContent: "flex-start" }}>{pending ? "Confirming…" : "Pay & confirm"}</button>
            </form>
          </>
        ) : null}
      </Modal>
      <ConfirmModal
        open={!!confirm}
        onClose={() => { setConfirm(null); router.push("/travel/trips"); }}
        title={confirm?.title ?? ""}
        body={confirm?.body ?? ""}
        doneLabel="View my trips"
      />
    </TravelCtx.Provider>
  );
}

export function useTravel() {
  const c = useContext(TravelCtx);
  if (!c) throw new Error("useTravel within provider");
  return c;
}
