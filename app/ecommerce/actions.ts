"use server";

import { getSupabaseServer } from "@/lib/supabase/server";

export type PlaceOrderResult = { ok: boolean; ref?: string; error?: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type OrderItem = { name: string; variant: string; price_cents: number };

export async function placeOrder(input: {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  region: string;
  zip: string;
  items: OrderItem[];
  subtotalCents: number;
  shippingCents: number;
  discountCents: number;
  promoCode: string | null;
}): Promise<PlaceOrderResult> {
  if (!EMAIL_RE.test(input.email)) return { ok: false, error: "Enter a valid email." };
  if (!input.items.length) return { ok: false, error: "Your cart is empty." };
  if (!input.firstName || !input.lastName || !input.address || !input.city || !input.zip) {
    return { ok: false, error: "Please complete the shipping details." };
  }

  const ref = "#AT-" + String(1000 + Math.floor(input.subtotalCents % 9000)) + "-" + input.items.length;
  try {
    const sb = getSupabaseServer();
    const { error } = await sb.from("ecom_orders").insert({
      ref,
      email: input.email,
      first_name: input.firstName,
      last_name: input.lastName,
      address: input.address,
      city: input.city,
      region: input.region,
      zip: input.zip,
      items: input.items,
      subtotal_cents: input.subtotalCents,
      shipping_cents: input.shippingCents,
      discount_cents: input.discountCents,
      promo_code: input.promoCode,
      total_cents: input.subtotalCents - input.discountCents + input.shippingCents,
    });
    if (error) throw error;
    return { ok: true, ref };
  } catch (err) {
    console.error("[placeOrder]", err);
    return { ok: false, error: "Something went wrong placing the order." };
  }
}
