"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { usePersistentState } from "@/lib/persist";
import { announce } from "@/lib/announce";
import { Modal } from "@/components/ds/Modal";
import { ConfirmModal } from "@/components/ds/ConfirmModal";
import { captureBooking, captureMessage } from "@/lib/actions";

type Ctx = {
  rsvps: string[];
  isGoing: (id: string) => boolean;
  toggleRsvp: (id: string, title: string) => void;
  openBook: (name: string) => void;
  joined: boolean;
  joinRef: string;
  submitJoin: (name: string, email: string, note: string) => Promise<void>;
};
const ClubhouseCtx = createContext<Ctx | null>(null);

export function ClubhouseProvider({ children }: { children: React.ReactNode }) {
  const [rsvps, setRsvps] = usePersistentState<string[]>("clubhouse.rsvps", []);
  const [joined, setJoined] = usePersistentState("clubhouse.joined", false);
  const [joinRef, setJoinRef] = usePersistentState("clubhouse.joinRef", "");
  const [book, setBook] = useState<string | null>(null);
  const [confirm, setConfirm] = useState<{ title: string; body: string } | null>(null);

  const isGoing = useCallback((id: string) => rsvps.includes(id), [rsvps]);

  const toggleRsvp = useCallback((id: string, title: string) => {
    setRsvps((prev) => {
      const going = prev.includes(id);
      if (going) {
        announce(`RSVP canceled for ${title}`);
        setConfirm({ title: "RSVP canceled", body: `Your place at ${title} has been released.` });
        return prev.filter((x) => x !== id);
      }
      announce(`RSVP confirmed for ${title}`);
      setConfirm({ title: "You’re on the list", body: `Your spot for ${title} is booked. We’ve added it to your calendar and the house team will expect you.` });
      return [...prev, id];
    });
  }, [setRsvps]);

  const openBook = useCallback((name: string) => setBook(name), []);

  const submitJoin = useCallback(async (name: string, email: string, note: string) => {
    const res = await captureMessage("clubhouse", { name, email, subject: "Membership application", message: note });
    const ref = res.ref ?? `FH-${(name.length * 131 + 1000) % 9999}`;
    setJoinRef(ref);
    setJoined(true);
  }, [setJoined, setJoinRef]);

  const submitBook = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!book) return;
    await captureBooking("clubhouse", { kind: "space", summary: book, refPrefix: "FH" });
    setBook(null);
    setConfirm({ title: "Space booked", body: `${book} is reserved. A calendar invite and the house directions are on their way.` });
  };

  return (
    <ClubhouseCtx.Provider value={{ rsvps, isGoing, toggleRsvp, openBook, joined, joinRef, submitJoin }}>
      {children}
      <Modal open={book !== null} onClose={() => setBook(null)} label={book ? `Book ${book}` : "Book a space"} width={500} showClose={false}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 18, textTransform: "uppercase" }}>Book {book}</span>
        </div>
        <form onSubmit={submitBook} style={{ display: "grid", gap: 16 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div className="field"><label htmlFor="cl-date">Date</label><input id="cl-date" className="input" type="date" defaultValue="2026-09-18" style={{ minHeight: 42 }} /></div>
            <div className="field"><label htmlFor="cl-start">Start</label><select id="cl-start" className="input" style={{ minHeight: 42 }}><option>09:00</option><option>12:00</option><option>15:00</option><option>18:00</option></select></div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div className="field"><label htmlFor="cl-hrs">Hours</label><select id="cl-hrs" className="input" style={{ minHeight: 42 }}><option>1</option><option>2</option><option>3</option><option>Half day</option></select></div>
            <div className="field"><label htmlFor="cl-guests">Guests</label><input id="cl-guests" className="input" placeholder="incl. you" /></div>
          </div>
          <div className="field"><label htmlFor="cl-notes">Notes for the house team</label><textarea id="cl-notes" className="input" /></div>
          <button type="submit" className="btn btn-primary" style={{ padding: "13px 24px", justifyContent: "flex-start" }}>Confirm booking</button>
        </form>
      </Modal>
      <ConfirmModal open={!!confirm} onClose={() => setConfirm(null)} title={confirm?.title ?? ""} body={confirm?.body ?? ""} />
    </ClubhouseCtx.Provider>
  );
}

export function useClubhouse() {
  const c = useContext(ClubhouseCtx);
  if (!c) throw new Error("useClubhouse within provider");
  return c;
}
