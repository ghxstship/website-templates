"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { Modal } from "@/components/ds/Modal";
import { ConfirmModal } from "@/components/ds/ConfirmModal";
import { BANKING } from "@/lib/banking";

type ModalKind = "open" | "convert" | null;
type Ctx = {
  points: number;
  redeem: (name: string, cost: number) => void;
  openModal: (kind: "open" | "convert") => void;
  notify: (title: string, body: string) => void;
};
const BankingCtx = createContext<Ctx | null>(null);

export function BankingProvider({ children }: { children: React.ReactNode }) {
  const [points, setPoints] = useState(18400);
  const [modal, setModal] = useState<ModalKind>(null);
  const [confirm, setConfirm] = useState<{ title: string; body: string } | null>(null);

  const redeem = useCallback((name: string, cost: number) => {
    setPoints((p) => {
      if (p < cost) return p;
      const np = p - cost;
      setConfirm({ title: "Reward redeemed", body: `${name} is on its way. New balance: ${np.toLocaleString()} pts.` });
      return np;
    });
  }, []);
  const openModal = useCallback((kind: "open" | "convert") => setModal(kind), []);
  const notify = useCallback((title: string, body: string) => setConfirm({ title, body }), []);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const wasConvert = modal === "convert";
    setModal(null);
    setConfirm(wasConvert
      ? { title: "Trade submitted", body: "Your order is executing on-chain. It will appear in your wallet shortly." }
      : { title: "Account created", body: `Welcome to ${BANKING.brand}. Your virtual card is ready to use right now.` });
  };

  return (
    <BankingCtx.Provider value={{ points, redeem, openModal, notify }}>
      {children}
      <Modal open={modal !== null} onClose={() => setModal(null)} width={500} showClose={false}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 18, textTransform: "uppercase" }}>{modal === "convert" ? "Trade" : "Open an account"}</span></div>
        {modal === "convert" ? (
          <form onSubmit={submit} style={{ display: "grid", gap: 16 }}>
            <div className="field"><label htmlFor="b-from">From</label><select id="b-from" className="input" style={{ minHeight: 42 }}><option>USD Balance</option><option>BTC</option><option>ETH</option></select></div>
            <div className="field"><label htmlFor="b-to">To</label><select id="b-to" className="input" style={{ minHeight: 42 }}><option>BTC</option><option>ETH</option><option>USDC</option><option>USD Balance</option></select></div>
            <div className="field"><label htmlFor="b-amt">Amount</label><input id="b-amt" className="input" placeholder="0.00" /></div>
            <div style={{ fontSize: 12, color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }}>Rate locked for 30s · network fee estimated on-chain.</div>
            <button type="submit" className="btn btn-primary" style={{ padding: "13px 24px", justifyContent: "flex-start" }}>Confirm trade</button>
          </form>
        ) : (
          <form onSubmit={submit} style={{ display: "grid", gap: 16 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}><div className="field"><label htmlFor="b-name">Full name</label><input id="b-name" className="input" required /></div><div className="field"><label htmlFor="b-email">Email</label><input id="b-email" className="input" type="email" required /></div></div>
            <div className="field"><label htmlFor="b-type">Account type</label><select id="b-type" className="input" style={{ minHeight: 42 }}><option>Personal</option><option>Business</option><option>Premium (Metal)</option></select></div>
            <div className="field"><label htmlFor="b-country">Country</label><input id="b-country" className="input" required /></div>
            <div style={{ fontSize: 12, color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }}>Identity verified in minutes. Your keys, your crypto — non-custodial by default.</div>
            <button type="submit" className="btn btn-primary" style={{ padding: "13px 24px", justifyContent: "flex-start" }}>Create account</button>
          </form>
        )}
      </Modal>
      <ConfirmModal open={!!confirm} onClose={() => setConfirm(null)} title={confirm?.title ?? ""} body={confirm?.body ?? ""} />
    </BankingCtx.Provider>
  );
}

export function useBanking() {
  const c = useContext(BankingCtx);
  if (!c) throw new Error("useBanking within provider");
  return c;
}
