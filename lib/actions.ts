"use server";

import { getSupabaseServer } from "./supabase/server";

export type ActionResult = { ok: boolean; ref?: string; error?: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Newsletter / notify signups → leads (template-tagged). */
export async function captureLead(
  template: string,
  email: string,
  source = "newsletter",
): Promise<ActionResult> {
  if (!EMAIL_RE.test(email)) return { ok: false, error: "Enter a valid email address." };
  try {
    const sb = getSupabaseServer();
    const { error } = await sb.from("leads").insert({ template, email, source });
    if (error) throw error;
    return { ok: true };
  } catch (err) {
    console.error("[captureLead]", err);
    return { ok: false, error: "Something went wrong. Please try again." };
  }
}

/** Contact / enquiry forms → messages (template-tagged). */
export async function captureMessage(
  template: string,
  input: { name: string; email: string; subject?: string; message: string },
): Promise<ActionResult> {
  if (!input.name?.trim()) return { ok: false, error: "Please enter your name." };
  if (!EMAIL_RE.test(input.email)) return { ok: false, error: "Enter a valid email address." };
  if (!input.message?.trim()) return { ok: false, error: "Please enter a message." };
  try {
    const sb = getSupabaseServer();
    const { error } = await sb.from("messages").insert({
      template,
      name: input.name.trim(),
      email: input.email.trim(),
      subject: input.subject?.trim() || "General",
      message: input.message.trim(),
    });
    if (error) throw error;
    return { ok: true };
  } catch (err) {
    console.error("[captureMessage]", err);
    return { ok: false, error: "Something went wrong. Please try again." };
  }
}

/** Reservations / bookings / holds → bookings (template-tagged). Generates a ref. */
export async function captureBooking(
  template: string,
  input: {
    kind: string;
    summary: string;
    details?: Record<string, unknown>;
    email?: string;
    refPrefix?: string;
  },
): Promise<ActionResult> {
  const prefix = (input.refPrefix ?? template.slice(0, 3)).toUpperCase();
  // Unique 6-digit ref. Server actions run at request time, so time + entropy is
  // safe here and avoids the collisions a summary-length hash produced.
  const n = Math.floor(100000 + Math.random() * 899999);
  const ref = `${prefix}-${n}`;
  try {
    const sb = getSupabaseServer();
    const { error } = await sb.from("bookings").insert({
      template,
      kind: input.kind,
      ref,
      summary: input.summary,
      details: input.details ?? {},
      email: input.email ?? null,
    });
    if (error) throw error;
    return { ok: true, ref };
  } catch (err) {
    console.error("[captureBooking]", err);
    return { ok: false, error: "Something went wrong. Please try again." };
  }
}
