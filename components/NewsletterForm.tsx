"use client";

import { useActionState } from "react";
import { subscribeNewsletter, type FormResult } from "@/app/actions";

export function NewsletterForm() {
  const [state, action, pending] = useActionState<FormResult | null, FormData>(
    subscribeNewsletter,
    null,
  );

  if (state?.ok) {
    return (
      <div
        style={{
          fontFamily: "var(--font-heading)",
          fontWeight: 800,
          fontSize: 18,
        }}
      >
        Subscribed. Check your inbox.
      </div>
    );
  }

  return (
    <form action={action} style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
      <input
        className="input"
        type="email"
        name="email"
        required
        placeholder="you@email.com"
        aria-label="Email address"
        style={{
          flex: 1,
          minWidth: 220,
          background: "var(--color-bg)",
          borderColor: "var(--color-bg)",
        }}
      />
      <button
        type="submit"
        className="btn"
        disabled={pending}
        style={{
          background: "var(--color-bg)",
          color: "var(--color-accent)",
          padding: "11px 22px",
        }}
      >
        {pending ? "…" : "Subscribe"}
      </button>
      {state?.error ? (
        <div style={{ flexBasis: "100%", fontSize: 13, marginTop: 2 }}>
          {state.error}
        </div>
      ) : null}
    </form>
  );
}
