"use client";

import { useCart } from "./CartContext";

export function AccountDetails() {
  const { setConfirm } = useCart();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setConfirm({ title: "Details saved", body: "Your account details have been updated." });
      }}
      style={{ display: "grid", gap: 16 }}
    >
      <div className="field"><label htmlFor="ac-name">Name</label><input id="ac-name" className="input" defaultValue="Alex Rivera" /></div>
      <div className="field"><label htmlFor="ac-email">Email</label><input id="ac-email" className="input" type="email" defaultValue="alex@email.com" /></div>
      <div className="field"><label htmlFor="ac-addr">Shipping address</label><input id="ac-addr" className="input" defaultValue="14 Warehouse Row, Brooklyn NY" /></div>
      <button type="submit" className="btn btn-primary" style={{ padding: "12px 20px", justifyContent: "flex-start" }}>Save changes</button>
    </form>
  );
}
