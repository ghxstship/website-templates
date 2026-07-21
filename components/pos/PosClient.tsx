"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { STOREFRONTS, TIP_PRESETS, PAY_DEFS, REG_MENU, REG_CATS, TENDER_OPTS, fmt } from "@/lib/pos";
import { usePos } from "./PosContext";

export function StorefrontGrid() {
  const { addSample } = usePos();
  const router = useRouter();
  return (
    <div className="grid3" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 2, background: "var(--color-divider)", border: "2px solid var(--color-divider)" }}>
      {STOREFRONTS.map((t) => (
        <div key={t.vid} style={{ background: "var(--color-bg)", padding: 22, display: "flex", flexDirection: "column" }}>
          <span className="tag tag-outline" style={{ alignSelf: "flex-start", marginBottom: 12 }}>{t.type}</span>
          <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 18, margin: "0 0 4px" }}>{t.name}</h3>
          <p style={{ fontSize: 13, margin: "0 0 16px", flex: 1, color: "color-mix(in srgb, var(--color-text) 70%, transparent)" }}>{t.sample} · {fmt(t.price)}</p>
          <button type="button" className="btn btn-secondary" onClick={() => { addSample(t); router.push("/pos/cart"); }} style={{ padding: "9px 16px" }}>Add to cart</button>
        </div>
      ))}
    </div>
  );
}

export function CartView() {
  const router = useRouter();
  const { groups, changeQty, setFulfill, tip, setTip, pay, setPay, totals, count, openCheckout, cart } = usePos();

  if (cart.length === 0) {
    return (
      <section className="wrap" style={{ paddingBlock: "clamp(40px, 6vw, 80px)", textAlign: "center" }}>
        <p style={{ fontSize: 18, margin: "0 0 20px", color: "color-mix(in srgb, var(--color-text) 65%, transparent)" }}>Your cart is empty.</p>
        <button type="button" className="btn btn-primary" onClick={() => router.push("/pos")} style={{ padding: "12px 22px" }}>Browse storefronts</button>
      </section>
    );
  }

  return (
    <section className="wrap checkout-grid" style={{ paddingBlock: "clamp(24px, 3vw, 40px) clamp(48px, 6vw, 80px)", display: "grid", gridTemplateColumns: "minmax(0, 1fr) 400px", gap: "clamp(28px, 4vw, 56px)", alignItems: "start" }}>
      <div>
        {groups.map((v) => (
          <div key={v.vid} style={{ border: "2px solid var(--color-divider)", marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, padding: "16px 20px", borderBottom: "2px solid var(--color-divider)", flexWrap: "wrap" }}>
              <div><div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 17 }}>{v.vendor}</div><div style={{ fontSize: 12, letterSpacing: "0.04em", textTransform: "uppercase", color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }}>{v.type} · {v.qty} {v.qty === 1 ? "item" : "items"}</div></div>
              <div style={{ display: "flex", border: "1px solid var(--color-divider)" }}>
                {v.fulfillOpts.map(([val, label]) => {
                  const on = v.fulfill === val;
                  return <button key={val} type="button" onClick={() => setFulfill(v.vid, val)} style={{ padding: "7px 14px", border: 0, cursor: "pointer", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.03em", background: on ? "var(--color-accent)" : "transparent", color: on ? "var(--color-bg)" : "var(--color-text)" }}>{label}</button>;
                })}
              </div>
            </div>
            {v.items.map((it) => (
              <div key={it.idx} style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: 16, alignItems: "center", padding: "14px 20px", borderBottom: "1px solid var(--color-divider)" }}>
                <div><div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 15 }}>{it.name}</div><div style={{ fontSize: 12, color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }}>{fmt(it.price)} each</div></div>
                <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--color-divider)" }}>
                  <button type="button" onClick={() => changeQty(it.idx, -1)} className="btn" style={{ padding: "6px 11px" }}>−</button>
                  <span style={{ minWidth: 28, textAlign: "center", fontFamily: "var(--font-heading)", fontWeight: 800 }}>{it.qty}</span>
                  <button type="button" onClick={() => changeQty(it.idx, 1)} className="btn" style={{ padding: "6px 11px" }}>+</button>
                </div>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, minWidth: 68, textAlign: "right" }}>{fmt(it.price * it.qty)}</div>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 20px", fontSize: 13 }}>
              <span style={{ color: "color-mix(in srgb, var(--color-text) 60%, transparent)" }}>{v.delivering ? (v.fulfill === "ship" ? "Ships to your address" : "Delivered to your address") : "Ready for pickup"}</span>
              <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}>Subtotal {fmt(v.subtotal)}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ border: "2px solid var(--color-divider)", position: "sticky", top: 90 }}>
        <div style={{ padding: 20, borderBottom: "2px solid var(--color-divider)" }}>
          <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 18, textTransform: "uppercase", marginBottom: 16 }}>Order summary</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}><span>Items ({count})</span><span>{fmt(totals.itemsSub)}</span></div>
            <div style={{ display: "flex", justifyContent: "space-between" }}><span>Delivery</span><span>{fmt(totals.deliveryFee)}</span></div>
            <div style={{ display: "flex", justifyContent: "space-between" }}><span>Service fee</span><span>{fmt(totals.serviceFee)}</span></div>
            <div style={{ display: "flex", justifyContent: "space-between" }}><span>Tax</span><span>{fmt(totals.tax)}</span></div>
            <div style={{ display: "flex", justifyContent: "space-between" }}><span>Tip</span><span>{fmt(totals.tipN)}</span></div>
          </div>
          <div style={{ display: "flex", gap: 6, marginTop: 14 }}>
            {TIP_PRESETS.map((v) => {
              const on = tip === v;
              return <button key={v} type="button" onClick={() => setTip(v)} style={{ flex: 1, padding: "8px 0", border: `1px solid ${on ? "var(--color-accent)" : "var(--color-divider)"}`, background: on ? "var(--color-accent)" : "transparent", color: on ? "var(--color-bg)" : "var(--color-text)", cursor: "pointer", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 12 }}>{v}%</button>;
            })}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "18px 20px", borderBottom: "2px solid var(--color-divider)" }}>
          <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 17 }}>Total</span>
          <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 26, color: "var(--color-accent)" }}>{fmt(totals.grand)}</span>
        </div>
        <div style={{ padding: 20 }}>
          <div style={{ fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase", color: "color-mix(in srgb, var(--color-text) 55%, transparent)", marginBottom: 10 }}>Pay with</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 18 }}>
            {PAY_DEFS.map(([k, label]) => {
              const on = pay === k;
              return <button key={k} type="button" onClick={() => setPay(k)} style={{ padding: 10, border: `1px solid ${on ? "var(--color-accent)" : "var(--color-divider)"}`, background: on ? "color-mix(in srgb, var(--color-accent) 10%, transparent)" : "transparent", color: "var(--color-text)", cursor: "pointer", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 12.5, textAlign: "left" }}>{label}</button>;
            })}
          </div>
          <button type="button" className="btn btn-primary" onClick={openCheckout} style={{ width: "100%", justifyContent: "center", padding: 14 }}>Checkout · {fmt(totals.grand)}</button>
          <p style={{ fontSize: 11.5, lineHeight: 1.5, margin: "12px 0 0", color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }}>{totals.vendorCount} {totals.vendorCount === 1 ? "store" : "stores"} settle separately; you pay once.</p>
        </div>
      </div>
    </section>
  );
}

export function Register() {
  const { notify } = usePos();
  const [cat, setCat] = useState("Coffee");
  const [ticket, setTicket] = useState<{ name: string; price: number; qty: number }[]>([]);
  const [regTip, setRegTip] = useState(15);
  const [tender, setTender] = useState(false);

  const add = (name: string, price: number) => setTicket((prev) => {
    const ex = prev.find((t) => t.name === name);
    if (ex) return prev.map((t) => (t === ex ? { ...t, qty: t.qty + 1 } : t));
    return [...prev, { name, price, qty: 1 }];
  });
  const changeQty = (name: string, d: number) => setTicket((prev) => prev.map((t) => (t.name === name ? { ...t, qty: t.qty + d } : t)).filter((t) => t.qty > 0));

  const sub = ticket.reduce((s, t) => s + t.price * t.qty, 0);
  const tax = sub * 0.085;
  const tipN = sub * (regTip / 100);
  const total = sub + tax + tipN;
  const menu = REG_MENU.filter((m) => m.cat === cat);

  return (
    <section className="wrap reg-grid" style={{ paddingBlock: "clamp(20px, 3vw, 32px) clamp(48px, 6vw, 80px)", display: "grid", gridTemplateColumns: "minmax(0, 1fr) 380px", gap: "clamp(24px, 3vw, 40px)", alignItems: "start" }}>
      <div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
          {REG_CATS.map((c) => {
            const on = cat === c;
            return <button key={c} type="button" onClick={() => setCat(c)} className="btn" style={{ padding: "8px 16px", border: `1px solid ${on ? "var(--color-accent)" : "var(--color-divider)"}`, background: on ? "var(--color-accent)" : "transparent", color: on ? "var(--color-bg)" : "var(--color-text)" }}>{c}</button>;
          })}
        </div>
        <div className="reg-menu" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 2, background: "var(--color-divider)", border: "2px solid var(--color-divider)" }}>
          {menu.map((m) => (
            <button key={m.name} type="button" onClick={() => add(m.name, m.price)} style={{ background: "var(--color-bg)", border: 0, cursor: "pointer", padding: "18px 16px", textAlign: "left", display: "flex", flexDirection: "column", gap: 8, minHeight: 92 }}>
              <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 14, lineHeight: 1.2 }}>{m.name}</span>
              <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, color: "var(--color-accent)", marginTop: "auto" }}>{fmt(m.price)}</span>
            </button>
          ))}
        </div>
      </div>
      <div style={{ border: "2px solid var(--color-divider)", position: "sticky", top: 90 }}>
        <div style={{ padding: "16px 18px", borderBottom: "2px solid var(--color-divider)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 16, textTransform: "uppercase" }}>Ticket #1042</span>
          <button type="button" className="btn btn-ghost" onClick={() => setTicket([])} style={{ padding: "4px 8px", fontSize: 12 }}>Clear</button>
        </div>
        {ticket.length === 0 ? (
          <div style={{ padding: "40px 18px", textAlign: "center", fontSize: 14, color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }}>Tap products to add them to the ticket.</div>
        ) : (
          <>
            <div style={{ maxHeight: 320, overflow: "auto" }}>
              {ticket.map((t) => (
                <div key={t.name} style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: 12, alignItems: "center", padding: "12px 18px", borderBottom: "1px solid var(--color-divider)" }}>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 14 }}>{t.name}</div>
                  <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--color-divider)" }}>
                    <button type="button" onClick={() => changeQty(t.name, -1)} className="btn" style={{ padding: "4px 9px" }}>−</button>
                    <span style={{ minWidth: 24, textAlign: "center", fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 13 }}>{t.qty}</span>
                    <button type="button" onClick={() => changeQty(t.name, 1)} className="btn" style={{ padding: "4px 9px" }}>+</button>
                  </div>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 13, minWidth: 56, textAlign: "right" }}>{fmt(t.price * t.qty)}</div>
                </div>
              ))}
            </div>
            <div style={{ padding: "14px 18px", borderTop: "2px solid var(--color-divider)", display: "flex", flexDirection: "column", gap: 8, fontSize: 13 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span>Subtotal</span><span>{fmt(sub)}</span></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span>Tax</span><span>{fmt(tax)}</span></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span>Tip</span><span>{fmt(tipN)}</span></div>
              <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
                {TIP_PRESETS.map((v) => {
                  const on = regTip === v;
                  return <button key={v} type="button" onClick={() => setRegTip(v)} style={{ flex: 1, padding: "7px 0", border: `1px solid ${on ? "var(--color-accent)" : "var(--color-divider)"}`, background: on ? "var(--color-accent)" : "transparent", color: on ? "var(--color-bg)" : "var(--color-text)", cursor: "pointer", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 11 }}>{v}%</button>;
                })}
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "14px 18px", borderTop: "2px solid var(--color-divider)" }}>
              <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}>Total</span>
              <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 22, color: "var(--color-accent)" }}>{fmt(total)}</span>
            </div>
            <div style={{ padding: "0 18px 18px" }}>
              <button type="button" className="btn btn-primary" onClick={() => setTender(true)} style={{ width: "100%", justifyContent: "center", padding: 14 }}>Charge {fmt(total)}</button>
            </div>
          </>
        )}
      </div>

      {tender ? (
        <div onClick={() => setTender(false)} style={{ position: "fixed", inset: 0, zIndex: 88, background: "color-mix(in srgb, var(--color-text) 86%, transparent)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ width: "min(420px, 100%)", background: "var(--color-bg)", border: "2px solid var(--color-divider)" }}>
            <div style={{ padding: "18px 22px", borderBottom: "2px solid var(--color-divider)", fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 18, textTransform: "uppercase" }}>Tender {fmt(total)}</div>
            <div style={{ padding: 22, display: "flex", flexDirection: "column", gap: 10 }}>
              {TENDER_OPTS.map((t) => (
                <button key={t.label} type="button" className="btn btn-secondary" onClick={() => { setTender(false); setTicket([]); notify("Payment complete", `Charged ${fmt(total)} by ${t.label.toLowerCase()}. Receipt printed and emailed. Drawer ready for the next ticket.`); }} style={{ justifyContent: "space-between", padding: "14px 18px" }}>
                  {t.label}<span style={{ fontSize: 12, color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }}>{t.note}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

export function PaymentsPanel() {
  const { notify } = usePos();
  const [linkAmount, setLinkAmount] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [seed, setSeed] = useState(1);
  return (
    <section className="wrap split2" style={{ paddingBlock: "clamp(24px, 3vw, 44px)", display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)", gap: "clamp(28px, 4vw, 56px)", alignItems: "start" }}>
      <div>
        <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 20, textTransform: "uppercase", margin: "0 0 16px" }}>Create a payment link</h2>
        <div style={{ border: "2px solid var(--color-divider)", padding: 20 }}>
          <div className="field"><label htmlFor="pos-amt">Amount (USD)</label><input id="pos-amt" className="input" value={linkAmount} onChange={(e) => setLinkAmount(e.target.value)} placeholder="49.00" /></div>
          <button type="button" className="btn btn-primary" onClick={() => { setLinkUrl(`pay.ledger.example/l/${(seed * 928371).toString(36).slice(0, 7)}?amt=${linkAmount || "0.00"}`); setSeed((s) => s + 1); }} style={{ marginTop: 14, padding: "11px 20px" }}>Generate link</button>
          {linkUrl ? <div style={{ marginTop: 16, padding: "12px 14px", border: "1px dashed var(--color-divider)", fontSize: 13, wordBreak: "break-all", fontFamily: "var(--font-heading)" }}>{linkUrl}</div> : null}
        </div>
      </div>
      <div>
        <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 20, textTransform: "uppercase", margin: "0 0 16px" }}>Embedded checkout</h2>
        <div style={{ border: "2px solid var(--color-divider)" }}>
          <div style={{ padding: 20, borderBottom: "2px solid var(--color-divider)" }}>
            <div style={{ fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase", color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }}>Single-store checkout</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: 10 }}>
              <div><div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 17 }}>Annual membership</div><div style={{ fontSize: 13, color: "color-mix(in srgb, var(--color-text) 60%, transparent)" }}>Billed yearly · cancel anytime</div></div>
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 24, color: "var(--color-accent)" }}>$149.00</div>
            </div>
          </div>
          <div style={{ padding: 20, display: "grid", gap: 14 }}>
            <div className="field"><label htmlFor="pos-ecard">Card number</label><input id="pos-ecard" className="input" placeholder="4242 4242 4242 4242" /></div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div className="field"><label htmlFor="pos-exp">Expiry</label><input id="pos-exp" className="input" placeholder="MM / YY" /></div>
              <div className="field"><label htmlFor="pos-cvc">CVC</label><input id="pos-cvc" className="input" placeholder="123" /></div>
            </div>
            <button type="button" className="btn btn-primary" onClick={() => notify("Payment received", "Charged $149.00 for the annual membership. A receipt is on its way — this is the single-store checkout any template can embed.")} style={{ justifyContent: "center", padding: 13 }}>Pay $149.00</button>
            <p style={{ fontSize: 11.5, textAlign: "center", margin: 0, color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }}>Drop this component into any template for standalone checkout.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
