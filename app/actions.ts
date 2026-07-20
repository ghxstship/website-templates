"use server";

import { getSupabaseServer } from "@/lib/supabase/server";

export type FormResult = { ok: boolean; error?: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Newsletter signup → newsletter_signups (anon INSERT via RLS). */
export async function subscribeNewsletter(
  _prev: FormResult | null,
  formData: FormData,
): Promise<FormResult> {
  const email = String(formData.get("email") ?? "").trim();
  if (!EMAIL_RE.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }
  try {
    const sb = getSupabaseServer();
    const { error } = await sb.from("newsletter_signups").insert({ email });
    if (error) throw error;
    return { ok: true };
  } catch (err) {
    console.error("[subscribeNewsletter]", err);
    return { ok: false, error: "Something went wrong. Please try again." };
  }
}

/** Contact / booking enquiry → contact_messages (anon INSERT via RLS). */
export async function sendContact(
  _prev: FormResult | null,
  formData: FormData,
): Promise<FormResult> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const subject = String(formData.get("subject") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name) return { ok: false, error: "Please enter your name." };
  if (!EMAIL_RE.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }
  if (!message) return { ok: false, error: "Please enter a message." };

  try {
    const sb = getSupabaseServer();
    const { error } = await sb
      .from("contact_messages")
      .insert({ name, email, subject: subject || "General", message });
    if (error) throw error;
    return { ok: true };
  } catch (err) {
    console.error("[sendContact]", err);
    return { ok: false, error: "Something went wrong. Please try again." };
  }
}
