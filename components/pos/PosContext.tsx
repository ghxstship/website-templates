"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { usePersistentState } from "@/lib/persist";
import { Modal } from "@/components/ds/Modal";
import { captureBooking } from "@/lib/actions";
import { SEED_CART, DELIVERY_TYPES, fmt, type CartItem } from "@/lib/pos";

export type VendorGroup = {
  vid: string; vendor: string; type: string;
  items: (CartItem & { idx: number })[];
  fulfill: string; fulfillOpts: [string, string][]; delivering: boolean; subtotal: number; qty: number;
};

type Ctx = {
  cart: CartItem[]; count: number;
  addSample: (s: { vid: string; name: string; type: string; sample: string; price: number }) => void;
  changeQty: (idx: number, delta: number) => void;
  groups: VendorGroup[];
  fulfill: Record<string, string>; setFulfill: (vid: string, val: string) => void;
  tip: number; setTip: (t: number) => void;
  pay: string; setPay: (p: string) => void;
  totals: { itemsSub: number; deliveryFee: number; serviceFee: number; tax: number; tipN: number; grand: number; vendorCount: number };
  openCheckout: () => void;
  notify: (title: string, body: string) => void;
};
const PosCtx = createContext<Ctx | null>(null);

export function PosProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = usePersistentState<CartItem[]>("pos.cart", SEED_CART);
  const [fulfill, setFulfillState] = useState<Record<string, string>>({});
  const [tip, setTip] = useState(18);
  const [pay, setPay] = useState("card");
  const [modal, setModal] = useState(false);
  const [pending, setPending] = useState(false);
  const [confirm, setConfirm] = useState<{ title: string; body: string; refs?: { vendor: string; ref: string }[] } | null>(null);

  const count = cart.reduce((s, x) => s + x.qty, 0);

  const addSample = useCallback((s: { vid: string; name: string; type: string; sample: string; price: number }) => {
    setCart((prev) => {
      const ex = prev.find((c) => c.vid === s.vid && c.name === s.sample);
      if (ex) return prev.map((x) => (x === ex ? { ...x, qty: x.qty + 1 } : x));
      return [...prev, { vid: s.vid, vendor: s.name, type: s.type, name: s.sample, price: s.price, qty: 1 }];
    });
  }, [setCart]);

  const changeQty = useCallback((idx: number, delta: number) => {
    setCart((prev) => prev.map((x, i) => (i === idx ? { ...x, qty: x.qty + delta } : x)).filter((x) => x.qty > 0));
  }, [setCart]);

  const setFulfill = useCallback((vid: string, val: string) => setFulfillState((f) => ({ ...f, [vid]: val })), []);

  const groups = useMemo<VendorGroup[]>(() => {
    const g: Record<string, { vid: string; vendor: string; type: string; items: (CartItem & { idx: number })[] }> = {};
    cart.forEach((x, i) => {
      g[x.vid] = g[x.vid] || { vid: x.vid, vendor: x.vendor, type: x.type, items: [] };
      g[x.vid].items.push({ ...x, idx: i });
    });
    return Object.values(g).map((grp) => {
      const isRetail = grp.type === "Retail";
      const opts: [string, string][] = isRetail ? [["ship", "Ship"], ["pickup", "Pickup"]] : [["delivery", "Delivery"], ["pickup", "Pickup"]];
      const cur = fulfill[grp.vid] || opts[0][0];
      const delivering = cur === "delivery" || cur === "ship";
      const subtotal = grp.items.reduce((s, it) => s + it.price * it.qty, 0);
      const qty = grp.items.reduce((s, it) => s + it.qty, 0);
      return { ...grp, fulfill: cur, fulfillOpts: opts, delivering, subtotal, qty };
    });
  }, [cart, fulfill]);

  const totals = useMemo(() => {
    let itemsSub = 0, foodSub = 0, deliveringVendors = 0;
    groups.forEach((g) => {
      itemsSub += g.subtotal;
      if (DELIVERY_TYPES.includes(g.type)) foodSub += g.subtotal;
      if (g.delivering) deliveringVendors += 1;
    });
    const deliveryFee = deliveringVendors * 4.99;
    const serviceFee = itemsSub * 0.08;
    const tax = itemsSub * 0.085;
    const tipN = foodSub * (tip / 100);
    return { itemsSub, deliveryFee, serviceFee, tax, tipN, grand: itemsSub + deliveryFee + serviceFee + tax + tipN, vendorCount: groups.length };
  }, [groups, tip]);

  const openCheckout = useCallback(() => setModal(true), []);
  const notify = useCallback((title: string, body: string) => setConfirm({ title, body }), []);

  const confirmCheckout = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    const refs: { vendor: string; ref: string }[] = [];
    for (const g of groups) {
      const res = await captureBooking("pos", { kind: "order", summary: `${g.vendor} — ${fmt(g.subtotal)}`, details: { type: g.type, fulfill: g.fulfill }, refPrefix: "ORD" });
      refs.push({ vendor: g.vendor, ref: res.ref ?? "ORD-0000" });
    }
    const vc = totals.vendorCount;
    setPending(false);
    setModal(false);
    setCart([]);
    setConfirm({ title: "Order placed", body: `Paid ${fmt(totals.grand)} across ${vc} ${vc === 1 ? "store" : "stores"}. Each store received its own order and settles separately.`, refs });
  };

  return (
    <PosCtx.Provider value={{ cart, count, addSample, changeQty, groups, fulfill, setFulfill, tip, setTip, pay, setPay, totals, openCheckout, notify }}>
      {children}
      <Modal open={modal} onClose={() => setModal(false)} width={520} showClose={false}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 18, textTransform: "uppercase" }}>Checkout · {fmt(totals.grand)}</span>
        </div>
        <form onSubmit={confirmCheckout} style={{ display: "grid", gap: 16 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div className="field"><label htmlFor="pos-name">Name</label><input id="pos-name" className="input" required placeholder="Full name" /></div>
            <div className="field"><label htmlFor="pos-email">Email</label><input id="pos-email" className="input" type="email" required placeholder="you@email.com" /></div>
          </div>
          <div className="field"><label htmlFor="pos-addr">Delivery address</label><input id="pos-addr" className="input" required placeholder="Street, city, postcode" /></div>
          <div className="field"><label htmlFor="pos-card">Card number</label><input id="pos-card" className="input" required placeholder="4242 4242 4242 4242" /></div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "14px 0", borderTop: "2px solid var(--color-divider)", borderBottom: "2px solid var(--color-divider)" }}>
            <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}>Total</span>
            <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 22, color: "var(--color-accent)" }}>{fmt(totals.grand)}</span>
          </div>
          <button type="submit" className="btn btn-primary" disabled={pending} style={{ padding: "13px 24px", justifyContent: "center" }}>{pending ? "Processing…" : `Pay ${fmt(totals.grand)}`}</button>
        </form>
      </Modal>
      <Modal open={!!confirm} onClose={() => setConfirm(null)} width={480} showClose={false}>
        {confirm ? (
          <div>
            <div style={{ width: 48, height: 48, background: "var(--color-accent)", color: "var(--color-bg)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 22, fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 24 }}>✓</div>
            <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 26, letterSpacing: "-0.015em", margin: "0 0 12px" }}>{confirm.title}</h3>
            <p style={{ fontSize: 15.5, lineHeight: 1.6, margin: "0 0 20px", color: "color-mix(in srgb, var(--color-text) 78%, transparent)" }}>{confirm.body}</p>
            {confirm.refs && confirm.refs.length ? (
              <div style={{ borderTop: "2px solid var(--color-divider)", marginBottom: 22 }}>
                {confirm.refs.map((r) => (
                  <div key={r.ref} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid var(--color-divider)", fontSize: 14 }}>
                    <span>{r.vendor}</span><span style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}>{r.ref}</span>
                  </div>
                ))}
              </div>
            ) : null}
            <button type="button" className="btn btn-primary" onClick={() => setConfirm(null)} style={{ padding: "12px 22px" }}>Done</button>
          </div>
        ) : null}
      </Modal>
    </PosCtx.Provider>
  );
}

export function usePos() {
  const c = useContext(PosCtx);
  if (!c) throw new Error("usePos within provider");
  return c;
}
