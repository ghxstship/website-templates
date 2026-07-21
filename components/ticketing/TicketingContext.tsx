"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { usePersistentState } from "@/lib/persist";
import { ConfirmModal } from "@/components/ds/ConfirmModal";
import { captureBooking } from "@/lib/actions";
import { type MemberTier, TIER_NAME, TIER_MULT } from "@/lib/ticketing";

export type Booking = { date: string; title: string; qty: number; tier: string };

type Ctx = {
  points: number;
  tier: MemberTier;
  bookings: Booking[];
  isMember: boolean;
  tierName: string;
  book: (ev: { title: string; date: string }, count: number, firstTier: string, earn: number) => Promise<void>;
  cancelBooking: (index: number) => void;
  joinTier: (t: MemberTier) => void;
  redeem: (name: string, cost: number) => void;
};
const TicketingCtx = createContext<Ctx | null>(null);

export function TicketingProvider({ children }: { children: React.ReactNode }) {
  const [points, setPoints] = usePersistentState("ticketing.points", 2450);
  const [tier, setTier] = usePersistentState<MemberTier>("ticketing.tier", "free");
  const [bookings, setBookings] = usePersistentState<Booking[]>("ticketing.bookings", []);
  const [confirm, setConfirm] = useState<{ title: string; body: string } | null>(null);

  const book = useCallback(async (ev: { title: string; date: string }, count: number, firstTier: string, earn: number) => {
    if (count === 0) return;
    await captureBooking("ticketing", { kind: "tickets", summary: `${count}× ${ev.title}`, details: { event: ev.title, date: ev.date, count, tier: firstTier }, refPrefix: "FRW" });
    setPoints((p) => {
      const np = p + earn;
      setConfirm({ title: `Booked — ${earn} points earned`, body: `Your mobile tickets are in your account. New balance: ${np} points.` });
      return np;
    });
    setBookings((b) => [...b, { date: ev.date, title: ev.title, qty: count, tier: firstTier }]);
  }, []);

  const cancelBooking = useCallback((index: number) => {
    setBookings((prev) => {
      const bk = prev[index];
      if (bk) setConfirm({ title: "Tickets canceled", body: `Your ${bk.qty}× ${bk.title} ${bk.qty === 1 ? "ticket has" : "tickets have"} been canceled and refunded to your original payment method.` });
      return prev.filter((_, i) => i !== index);
    });
  }, [setBookings]);

  const joinTier = useCallback((t: MemberTier) => {
    setTier(t);
    setConfirm({
      title: { free: "Free account active", plus: "Welcome to Plus", vip: "Welcome to the VIP Club" }[t],
      body: t === "vip" ? "You now get 3× points, zero fees, presale access and the members bar at every venue." : t === "plus" ? "You now get 2× points, zero booking fees and 48-hour presale access." : "Your free account is active.",
    });
  }, []);

  const redeem = useCallback((name: string, cost: number) => {
    setPoints((p) => {
      if (p < cost) return p;
      const np = p - cost;
      setConfirm({ title: "Reward redeemed", body: `${name} is in your account. New balance: ${np} points.` });
      return np;
    });
  }, []);

  return (
    <TicketingCtx.Provider value={{ points, tier, bookings, isMember: tier !== "free", tierName: TIER_NAME[tier], book, cancelBooking, joinTier, redeem }}>
      {children}
      <ConfirmModal open={!!confirm} onClose={() => setConfirm(null)} title={confirm?.title ?? ""} body={confirm?.body ?? ""} />
    </TicketingCtx.Provider>
  );
}

export function useTicketing() {
  const c = useContext(TicketingCtx);
  if (!c) throw new Error("useTicketing within provider");
  return c;
}

export { TIER_MULT };
