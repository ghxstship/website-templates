"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

export type CartItem = {
  key: string;
  slug: string;
  name: string;
  price_cents: number;
  variant: string;
};

type View = "closed" | "cart" | "checkout";

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotalCents: number;
  shippingCents: number;
  totalCents: number;
  view: View;
  addItem: (item: Omit<CartItem, "key">, qty: number) => void;
  removeAt: (index: number) => void;
  openCart: () => void;
  openCheckout: () => void;
  closeAll: () => void;
  clear: () => void;
  confirm: { title: string; body: string } | null;
  setConfirm: (c: { title: string; body: string } | null) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

let seq = 0;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [view, setView] = useState<View>("closed");
  const [confirm, setConfirm] = useState<{ title: string; body: string } | null>(null);

  const addItem = useCallback((item: Omit<CartItem, "key">, qty: number) => {
    const add: CartItem[] = Array.from({ length: Math.max(1, qty) }, () => ({
      ...item,
      key: `c${seq++}`,
    }));
    setItems((s) => [...s, ...add]);
    setView("cart");
  }, []);

  const removeAt = useCallback((index: number) => {
    setItems((s) => s.filter((_, i) => i !== index));
  }, []);

  const subtotalCents = useMemo(
    () => items.reduce((t, c) => t + c.price_cents, 0),
    [items],
  );
  const shippingCents = subtotalCents >= 7500 || subtotalCents === 0 ? 0 : 800;

  const value: CartContextValue = {
    items,
    count: items.length,
    subtotalCents,
    shippingCents,
    totalCents: subtotalCents + shippingCents,
    view,
    addItem,
    removeAt,
    openCart: () => setView("cart"),
    openCheckout: () => setView("checkout"),
    closeAll: () => setView("closed"),
    clear: () => setItems([]),
    confirm,
    setConfirm,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
