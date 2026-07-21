"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { usePersistentState } from "@/lib/persist";
import { Modal } from "@/components/ds/Modal";
import { ConfirmModal } from "@/components/ds/ConfirmModal";
import { BANKING } from "@/lib/banking";

type ModalKind = "open" | "convert" | "send" | null;
export type Transfer = { id: string; merchant: string; cat: string; date: string; amount: string; out: boolean };

type Ctx = {
  points: number;
  balanceCents: number;
  transfers: Transfer[];
  redeem: (name: string, cost: number) => void;
  openModal: (kind: "open" | "convert" | "send") => void;
  notify: (title: string, body: string) => void;
};
const BankingCtx = createContext<Ctx | null>(null);

const SEED_BALANCE = 1248055; // $12,480.55
let txSeq = 0;

function money(cents: number): string {
  return "$" + (cents / 100).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function BankingProvider({ children }: { children: React.ReactNode }) {
  const [points, setPoints] = usePersistentState("bank.points", 18400);
  const [balanceCents, setBalanceCents] = usePersistentState("bank.balance", SEED_BALANCE);
  const [transfers, setTransfers] = usePersistentState<Transfer[]>("bank.transfers", []);
  const [modal, setModal] = useState<ModalKind>(null);
  const [pending, setPending] = useState(false);
  const [confirm, setConfirm] = useState<{ title: string; body: string } | null>(null);

  const redeem = useCallback((name: string, cost: number) => {
    setPoints((p) => {
      if (p < cost) return p;
      const np = p - cost;
      setConfirm({ title: "Reward redeemed", body: `${name} is on its way. New balance: ${np.toLocaleString()} pts.` });
      return np;
    });
  }, []);
  const openModal = useCallback((kind: "open" | "convert" | "send") => setModal(kind), []);
  const notify = useCallback((title: string, body: string) => setConfirm({ title, body }), []);

  const sendMoney = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const recipient = (form.elements.namedItem("bk-to") as HTMLInputElement)?.value.trim() || "Recipient";
    const raw = (form.elements.namedItem("bk-amt") as HTMLInputElement)?.value ?? "";
    const cents = Math.round((parseFloat(raw.replace(/[^0-9.]/g, "")) || 0) * 100);
    if (cents <= 0) return;
    if (cents > balanceCents) {
      setModal(null);
      setConfirm({ title: "Insufficient balance", body: `You can’t send ${money(cents)} — your available balance is ${money(balanceCents)}.` });
      return;
    }
    setPending(true);
    txSeq += 1;
    const tx: Transfer = { id: `tx-${txSeq}`, merchant: `Sent to ${recipient}`, cat: "Transfer", date: "Just now", amount: `−${money(cents)}`, out: true };
    setTransfers((prev) => [tx, ...prev]);
    setBalanceCents((b) => b - cents);
    setPending(false);
    setModal(null);
    setConfirm({ title: "Money sent", body: `${money(cents)} is on its way to ${recipient}. New balance: ${money(balanceCents - cents)}.` });
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const wasConvert = modal === "convert";
    setModal(null);
    setConfirm(wasConvert
      ? { title: "Trade submitted", body: "Your order is executing on-chain. It will appear in your wallet shortly." }
      : { title: "Account created", body: `Welcome to ${BANKING.brand}. Your virtual card is ready to use right now.` });
  };

  return (
    <BankingCtx.Provider value={{ points, balanceCents, transfers, redeem, openModal, notify }}>
      {children}
      <Modal open={modal !== null} onClose={() => setModal(null)} width={500} showClose={false}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 18, textTransform: "uppercase" }}>{modal === "convert" ? "Trade" : modal === "send" ? "Send money" : "Open an account"}</span></div>
        {modal === "send" ? (
          <form onSubmit={sendMoney} style={{ display: "grid", gap: 16 }}>
            <div style={{ fontSize: 13, color: "color-mix(in srgb, var(--color-text) 60%, transparent)" }}>Available balance: <strong>{money(balanceCents)}</strong></div>
            <div className="field"><label htmlFor="bk-to">To</label><input id="bk-to" name="bk-to" className="input" required placeholder="Name, @handle or account" /></div>
            <div className="field"><label htmlFor="bk-amt">Amount (USD)</label><input id="bk-amt" name="bk-amt" className="input" required placeholder="0.00" inputMode="decimal" /></div>
            <div className="field"><label htmlFor="bk-note">Note (optional)</label><input id="bk-note" className="input" placeholder="What’s it for?" /></div>
            <button type="submit" className="btn btn-primary" disabled={pending} style={{ padding: "13px 24px", justifyContent: "flex-start" }}>{pending ? "Sending…" : "Send money"}</button>
          </form>
        ) : modal === "convert" ? (
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
