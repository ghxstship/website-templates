"use client";

import { useState } from "react";
import { useCart } from "./CartContext";
import { money } from "@/lib/ecommerce";
import { placeOrder } from "@/app/ecommerce/actions";
import { Placeholder } from "@/components/Placeholder";
import { CloseIcon, CheckIcon } from "@/components/icons";

export function CartOverlays() {
  const cart = useCart();
  return (
    <>
      {cart.view === "cart" ? <CartDrawer /> : null}
      {cart.view === "checkout" ? <Checkout /> : null}
      {cart.confirm ? <Confirm /> : null}
    </>
  );
}

function CartDrawer() {
  const { items, count, subtotalCents, closeAll, openCheckout, removeAt } = useCart();
  const empty = items.length === 0;
  return (
    <>
      <div
        onClick={closeAll}
        style={{ position: "fixed", inset: 0, zIndex: 80, background: "color-mix(in srgb, var(--color-text) 55%, transparent)" }}
      />
      <aside
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          zIndex: 81,
          width: "min(440px, 100%)",
          background: "var(--color-bg)",
          borderLeft: "2px solid var(--color-divider)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", borderBottom: "2px solid var(--color-divider)" }}>
          <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 20, margin: 0, textTransform: "uppercase" }}>Cart · {count}</h3>
          <button type="button" className="btn btn-icon" onClick={closeAll} aria-label="Close"><CloseIcon size={18} /></button>
        </div>
        <div style={{ flex: 1, overflow: "auto", padding: "4px 24px" }}>
          {empty ? (
            <p style={{ fontSize: 15, color: "color-mix(in srgb, var(--color-text) 60%, transparent)", padding: "28px 0" }}>Your cart is empty.</p>
          ) : (
            items.map((c, i) => (
              <div key={c.key} style={{ display: "flex", gap: 14, padding: "16px 0", borderBottom: "1px solid var(--color-divider)" }}>
                <figure className="grayscale" style={{ margin: 0, width: 64, height: 64, flex: "0 0 auto", border: "1px solid var(--color-divider)" }}>
                  <Placeholder />
                </figure>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 15 }}>{c.name}</div>
                  <div style={{ fontSize: 12, color: "color-mix(in srgb, var(--color-text) 58%, transparent)", margin: "2px 0 6px" }}>{c.variant}</div>
                  <button type="button" onClick={() => removeAt(i)} style={{ background: "none", border: 0, cursor: "pointer", fontSize: 12, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--color-accent-700)", padding: 0 }}>Remove</button>
                </div>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 15 }}>{money(c.price_cents)}</div>
              </div>
            ))
          )}
        </div>
        <div style={{ padding: "20px 24px", borderTop: "2px solid var(--color-divider)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16, fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 17 }}>
            <span>Subtotal</span><span>{money(subtotalCents)}</span>
          </div>
          <button type="button" className="btn btn-primary" onClick={openCheckout} disabled={empty} style={{ width: "100%", justifyContent: "flex-start", padding: "13px 20px" }}>Checkout</button>
        </div>
      </aside>
    </>
  );
}

function Field({ label, name, type = "text", placeholder, required = true }: { label: string; name: string; type?: string; placeholder?: string; required?: boolean }) {
  return (
    <div className="field">
      <label htmlFor={`co-${name}`}>{label}</label>
      <input id={`co-${name}`} name={name} className="input" type={type} required={required} placeholder={placeholder} />
    </div>
  );
}

function Checkout() {
  const { items, subtotalCents, shippingCents, discountCents, totalCents, promo, applyPromo, clearPromo, openCart, clear, setConfirm } = useCart();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [promoInput, setPromoInput] = useState("");
  const [promoError, setPromoError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setPending(true);
    setError(null);
    const res = await placeOrder({
      email: String(fd.get("email") ?? ""),
      firstName: String(fd.get("firstName") ?? ""),
      lastName: String(fd.get("lastName") ?? ""),
      address: String(fd.get("address") ?? ""),
      city: String(fd.get("city") ?? ""),
      region: String(fd.get("region") ?? ""),
      zip: String(fd.get("zip") ?? ""),
      items: items.map((i) => ({ name: i.name, variant: i.variant, price_cents: i.price_cents })),
      subtotalCents: subtotalCents - discountCents,
      shippingCents,
    });
    setPending(false);
    if (res.ok) {
      clear();
      setConfirm({ title: "Order confirmed", body: `Thank you. Order ${res.ref} is confirmed — a receipt is on its way and it ships within one business day.` });
    } else {
      setError(res.error ?? "Something went wrong.");
    }
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 90, background: "var(--color-bg)", overflow: "auto" }}>
      <div style={{ position: "sticky", top: 0, background: "var(--color-bg)", borderBottom: "2px solid var(--color-divider)", zIndex: 1 }}>
        <div className="wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 18, textTransform: "uppercase" }}>Checkout</span>
          <button type="button" className="btn btn-ghost" onClick={openCart} style={{ padding: "8px 4px" }}>← Back to cart</button>
        </div>
      </div>
      <div className="wrap split2" style={{ paddingBlock: "clamp(28px, 4vw, 56px)", display: "grid", gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 0.8fr)", gap: "clamp(32px, 5vw, 72px)", alignItems: "start" }}>
        <form onSubmit={onSubmit} style={{ display: "grid", gap: 18 }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 22, margin: 0 }}>Contact &amp; shipping</h2>
          <Field label="Email" name="email" type="email" placeholder="you@email.com" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Field label="First name" name="firstName" />
            <Field label="Last name" name="lastName" />
          </div>
          <Field label="Address" name="address" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
            <Field label="City" name="city" />
            <Field label="State" name="region" />
            <Field label="ZIP" name="zip" />
          </div>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 22, margin: "12px 0 0" }}>Payment</h2>
          <Field label="Card number" name="card" placeholder="4242 4242 4242 4242" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Field label="Expiry" name="exp" placeholder="MM / YY" />
            <Field label="CVC" name="cvc" placeholder="123" />
          </div>
          {error ? <div style={{ fontSize: 14, color: "var(--color-accent-700)" }}>{error}</div> : null}
          <button type="submit" className="btn btn-primary" disabled={pending} style={{ padding: "14px 24px", justifyContent: "flex-start" }}>
            {pending ? "Placing order…" : `Pay ${money(totalCents)}`}
          </button>
        </form>
        <div style={{ border: "2px solid var(--color-divider)", padding: 24 }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 18, margin: "0 0 16px", textTransform: "uppercase" }}>Order summary</h2>
          {items.map((c) => (
            <div key={c.key} style={{ display: "flex", justifyContent: "space-between", gap: 12, padding: "10px 0", borderBottom: "1px solid var(--color-divider)", fontSize: 14 }}>
              <span>{c.name} <span style={{ color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }}>{c.variant}</span></span>
              <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}>{money(c.price_cents)}</span>
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0 0", fontSize: 14, color: "color-mix(in srgb, var(--color-text) 65%, transparent)" }}><span>Subtotal</span><span>{money(subtotalCents)}</span></div>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", fontSize: 14, color: "color-mix(in srgb, var(--color-text) 65%, transparent)" }}><span>Shipping</span><span>{shippingCents === 0 ? "Free" : money(shippingCents)}</span></div>
          {discountCents > 0 ? (
            <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", fontSize: 14, color: "var(--color-accent)", fontFamily: "var(--font-heading)", fontWeight: 800 }}><span>Promo {promo}</span><span>−{money(discountCents)}</span></div>
          ) : null}
          <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid var(--color-divider)" }}>
            {promo ? (
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13 }}>
                <span style={{ color: "var(--color-accent)", fontFamily: "var(--font-heading)", fontWeight: 800 }}>✓ {promo} applied (10% off)</span>
                <button type="button" onClick={clearPromo} style={{ background: "none", border: 0, cursor: "pointer", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--color-accent-700)", padding: 0 }}>Remove</button>
              </div>
            ) : (
              <div style={{ display: "flex", gap: 8 }}>
                <input aria-label="Promo code" className="input" value={promoInput} onChange={(e) => { setPromoInput(e.target.value); setPromoError(null); }} placeholder="Promo code" style={{ flex: 1, minHeight: 40 }} />
                <button type="button" className="btn btn-secondary" onClick={() => { if (applyPromo(promoInput)) { setPromoError(null); setPromoInput(""); } else { setPromoError("That code isn’t valid."); } }} style={{ padding: "8px 16px" }}>Apply</button>
              </div>
            )}
            {promoError ? <div style={{ fontSize: 12, color: "var(--color-accent-700)", marginTop: 6 }}>{promoError}</div> : null}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0 0", marginTop: 8, borderTop: "2px solid var(--color-divider)", fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 18 }}><span>Total</span><span>{money(totalCents)}</span></div>
        </div>
      </div>
    </div>
  );
}

function Confirm() {
  const { confirm, setConfirm, closeAll } = useCart();
  if (!confirm) return null;
  const done = () => { setConfirm(null); closeAll(); };
  return (
    <div onClick={done} style={{ position: "fixed", inset: 0, zIndex: 95, background: "color-mix(in srgb, var(--color-text) 90%, transparent)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: "min(460px, 100%)", background: "var(--color-bg)", border: "2px solid var(--color-accent)", padding: "clamp(28px, 4vw, 48px)" }}>
        <div style={{ width: 48, height: 48, background: "var(--color-accent)", color: "var(--color-bg)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 22 }}>
          <CheckIcon size={24} />
        </div>
        <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 28, letterSpacing: "-0.015em", margin: "0 0 12px" }}>{confirm.title}</h3>
        <p style={{ fontSize: 15.5, lineHeight: 1.6, margin: "0 0 26px", color: "color-mix(in srgb, var(--color-text) 78%, transparent)" }}>{confirm.body}</p>
        <button type="button" className="btn btn-primary" onClick={done} style={{ padding: "12px 22px" }}>Continue shopping</button>
      </div>
    </div>
  );
}
