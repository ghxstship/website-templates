"use client";

import { createContext, useContext, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePersistentState } from "@/lib/persist";
import { announce } from "@/lib/announce";
import { MenuIcon, CloseIcon, CheckIcon } from "@/components/icons";
import { RESTAURANT, NAV } from "@/lib/restaurant";
import { captureBooking } from "@/lib/actions";

type OrderItem = { key: string; name: string; price_num: number };
type SavedItem = { name: string; price_num: number };
type Ctx = {
  items: OrderItem[];
  mode: "pickup" | "delivery";
  setMode: (m: "pickup" | "delivery") => void;
  add: (name: string, price_num: number) => void;
  removeAt: (i: number) => void;
  open: boolean;
  setOpen: (o: boolean) => void;
  confirm: { title: string; body: string } | null;
  place: () => Promise<void>;
  closeConfirm: () => void;
  lastOrder: SavedItem[];
  reorder: () => void;
};
const OrderCtx = createContext<Ctx | null>(null);
let seq = 0;

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<OrderItem[]>([]);
  const [mode, setMode] = useState<"pickup" | "delivery">("pickup");
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState<{ title: string; body: string } | null>(null);
  const [lastOrder, setLastOrder] = usePersistentState<SavedItem[]>("restaurant.lastOrder", []);

  const add = useCallback((name: string, price_num: number) => {
    setItems((s) => [...s, { key: `o${seq++}`, name, price_num }]);
    setOpen(true);
  }, []);
  const removeAt = useCallback((i: number) => setItems((s) => s.filter((_, j) => j !== i)), []);
  const place = useCallback(async () => {
    if (!items.length) return;
    const total = items.reduce((t, c) => t + c.price_num, 0);
    await captureBooking("restaurant", { kind: "order", summary: `Provisions order — $${total} (${mode})`, details: { items: items.map((i) => i.name), mode }, refPrefix: "MRD" });
    setLastOrder(items.map((i) => ({ name: i.name, price_num: i.price_num })));
    setItems([]);
    setOpen(false);
    setConfirm({ title: "Order received", body: "Thank you. Your provisions will be ready as scheduled — we'll text you when it's time." });
  }, [items, mode, setLastOrder]);

  const reorder = useCallback(() => {
    if (!lastOrder.length) return;
    setItems(lastOrder.map((i) => ({ key: `o${seq++}`, name: i.name, price_num: i.price_num })));
    setOpen(true);
    announce("Your last order was added to the cart");
  }, [lastOrder]);

  return (
    <OrderCtx.Provider value={{ items, mode, setMode, add, removeAt, open, setOpen, confirm, place, closeConfirm: () => setConfirm(null), lastOrder, reorder }}>
      {children}
    </OrderCtx.Provider>
  );
}

export function ReorderBar() {
  const { lastOrder, reorder } = useOrder();
  if (!lastOrder.length) return null;
  const total = lastOrder.reduce((t, c) => t + c.price_num, 0);
  const names = lastOrder.map((i) => i.name).join(", ");
  return (
    <section className="wrap" style={{ paddingBlock: "8px 0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap", border: "2px solid var(--color-accent)", padding: "16px 20px" }}>
        <div>
          <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 15, textTransform: "uppercase" }}>Order again</div>
          <div style={{ fontSize: 13, color: "color-mix(in srgb, var(--color-text) 65%, transparent)", marginTop: 2, maxWidth: "52ch" }}>{names} · ${total}</div>
        </div>
        <button type="button" className="btn btn-primary" onClick={reorder} style={{ padding: "10px 20px" }}>Reorder — ${total}</button>
      </div>
    </section>
  );
}
export function useOrder() {
  const c = useContext(OrderCtx);
  if (!c) throw new Error("useOrder within OrderProvider");
  return c;
}

export function RestaurantHeader() {
  const pathname = usePathname();
  const { items, setOpen } = useOrder();
  const [menu, setMenu] = useState(false);
  const active = (p: string) => pathname === p || pathname.startsWith(p + "/");
  const nav = NAV.filter((n) => n.label !== "Reserve");

  return (
    <header style={{ position: "sticky", top: 0, zIndex: 60, background: "var(--color-bg)", borderBottom: "2px solid var(--color-divider)" }}>
      <div className="wrap" style={{ display: "flex", alignItems: "center", gap: 28, height: 76 }}>
        <Link href="/restaurant" onClick={() => setMenu(false)} style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 20, letterSpacing: "-0.01em", textDecoration: "none", color: "var(--color-text)", textTransform: "uppercase", marginRight: "auto" }}>{RESTAURANT.name}</Link>
        <nav className="desk-nav" style={{ marginLeft: 0 }}>
          {nav.map((n) => <Link key={n.path} href={n.path} className="nav-link" aria-current={active(n.path) ? "page" : undefined}>{n.label}</Link>)}
        </nav>
        <button type="button" className="btn btn-secondary desk-nav" onClick={() => setOpen(true)} style={{ padding: "8px 14px" }}>Order · {items.length}</button>
        <Link href="/restaurant/reserve" className="btn btn-primary" style={{ padding: "9px 16px", flex: "0 0 auto" }}>Reserve</Link>
        <button type="button" className="burger btn btn-icon" onClick={() => setMenu((v) => !v)} aria-label="Menu"><MenuIcon size={20} /></button>
      </div>
      <div className={`mob-menu${menu ? " open" : ""}`} style={{ borderTop: "2px solid var(--color-divider)" }}>
        <div className="wrap" style={{ display: "flex", flexDirection: "column", paddingBlock: "12px 18px" }}>
          {NAV.map((n) => <Link key={n.path} href={n.path} onClick={() => setMenu(false)} style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 18, textTransform: "uppercase", textDecoration: "none", color: "var(--color-text)", padding: "12px 0", borderBottom: "1px solid var(--color-divider)" }}>{n.label}</Link>)}
        </div>
      </div>
    </header>
  );
}

export function OrderOverlays() {
  const { items, removeAt, open, setOpen, mode, place, confirm, closeConfirm } = useOrder();
  const empty = items.length === 0;
  const subtotal = items.reduce((t, c) => t + c.price_num, 0);
  return (
    <>
      {open ? (
        <>
          <div onClick={() => setOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 80, background: "color-mix(in srgb, var(--color-text) 55%, transparent)" }} />
          <aside style={{ position: "fixed", top: 0, right: 0, bottom: 0, zIndex: 81, width: "min(420px, 100%)", background: "var(--color-bg)", borderLeft: "2px solid var(--color-divider)", display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", borderBottom: "2px solid var(--color-divider)" }}>
              <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 20, margin: 0, textTransform: "uppercase" }}>Your order</h3>
              <button type="button" className="btn btn-icon" onClick={() => setOpen(false)} aria-label="Close"><CloseIcon size={18} /></button>
            </div>
            <div style={{ flex: 1, overflow: "auto", padding: "4px 24px" }}>
              <div style={{ fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--color-accent-700)", padding: "16px 0 4px" }}>{mode === "pickup" ? "For collection" : "For local delivery"}</div>
              {empty ? <p style={{ fontSize: 15, color: "color-mix(in srgb, var(--color-text) 60%, transparent)", padding: "20px 0" }}>Your order is empty. Add something from the provisions menu.</p> : items.map((c, i) => (
                <div key={c.key} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, padding: "16px 0", borderBottom: "1px solid var(--color-divider)" }}>
                  <span style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 15 }}>{c.name}</span>
                  <span style={{ display: "flex", gap: 14, alignItems: "baseline", flex: "0 0 auto" }}>
                    <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 15 }}>${c.price_num}</span>
                    <button type="button" onClick={() => removeAt(i)} style={{ background: "none", border: 0, cursor: "pointer", fontSize: 12, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--color-accent-700)", padding: 0 }}>Remove</button>
                  </span>
                </div>
              ))}
            </div>
            <div style={{ padding: "20px 24px", borderTop: "2px solid var(--color-divider)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16, fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 17 }}><span>Subtotal</span><span>${subtotal}</span></div>
              <button type="button" className="btn btn-primary" onClick={place} disabled={empty} style={{ width: "100%", justifyContent: "flex-start", padding: "13px 20px" }}>Checkout — ${subtotal}</button>
            </div>
          </aside>
        </>
      ) : null}
      {confirm ? (
        <div onClick={closeConfirm} style={{ position: "fixed", inset: 0, zIndex: 92, background: "color-mix(in srgb, var(--color-text) 90%, transparent)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ width: "min(460px, 100%)", background: "var(--color-bg)", border: "2px solid var(--color-accent)", padding: "clamp(28px, 4vw, 48px)" }}>
            <div style={{ width: 48, height: 48, background: "var(--color-accent)", color: "var(--color-bg)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 22 }}><CheckIcon size={24} /></div>
            <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 26, letterSpacing: "-0.015em", margin: "0 0 12px" }}>{confirm.title}</h3>
            <p style={{ fontSize: 15.5, lineHeight: 1.6, margin: "0 0 26px", color: "color-mix(in srgb, var(--color-text) 78%, transparent)" }}>{confirm.body}</p>
            <button type="button" className="btn btn-primary" onClick={closeConfirm} style={{ padding: "12px 22px" }}>Done</button>
          </div>
        </div>
      ) : null}
    </>
  );
}
