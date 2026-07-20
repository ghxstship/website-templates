"use client";

import { useActionState } from "react";
import { sendContact, type FormResult } from "@/app/actions";

const SUBJECTS = [
  "Booking / live",
  "Press / interview",
  "Licensing / sync",
  "General",
];

export function ContactForm() {
  const [state, action, pending] = useActionState<FormResult | null, FormData>(
    sendContact,
    null,
  );

  if (state?.ok) {
    return (
      <div style={{ border: "2px solid var(--color-accent)", padding: 28 }}>
        <div
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 800,
            fontSize: 20,
            color: "var(--color-accent)",
            marginBottom: 8,
          }}
        >
          Message sent.
        </div>
        <p
          style={{
            fontSize: 15,
            margin: 0,
            color: "color-mix(in srgb, var(--color-text) 75%, transparent)",
          }}
        >
          Thanks for reaching out — we&apos;ll be in touch within a few days.
        </p>
      </div>
    );
  }

  return (
    <form action={action} style={{ display: "grid", gap: 18 }}>
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}
      >
        <div className="field">
          <label htmlFor="cf-name">Name</label>
          <input
            id="cf-name"
            className="input"
            name="name"
            required
            placeholder="Your name"
          />
        </div>
        <div className="field">
          <label htmlFor="cf-email">Email</label>
          <input
            id="cf-email"
            className="input"
            name="email"
            type="email"
            required
            placeholder="you@email.com"
          />
        </div>
      </div>
      <div className="field">
        <label htmlFor="cf-subject">Subject</label>
        <select
          id="cf-subject"
          className="input"
          name="subject"
          style={{ minHeight: 40 }}
        >
          {SUBJECTS.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="cf-message">Message</label>
        <textarea
          id="cf-message"
          className="input"
          name="message"
          required
          placeholder="Tell us about it…"
        />
      </div>
      {state?.error ? (
        <div style={{ fontSize: 14, color: "var(--color-accent-700)" }}>
          {state.error}
        </div>
      ) : null}
      <button
        type="submit"
        className="btn btn-primary"
        disabled={pending}
        style={{ padding: "13px 24px", justifyContent: "flex-start" }}
      >
        {pending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
