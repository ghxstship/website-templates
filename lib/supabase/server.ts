import { createClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client using the publishable (anon) key.
 * Reads are governed by RLS "public read" policies; the two form
 * tables allow anon INSERT only. No user session is required.
 */
export function getSupabaseServer() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY",
    );
  }
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
