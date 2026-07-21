"use client";

import { useEffect, useState } from "react";
import { captureLead } from "@/lib/actions";
import { announce } from "@/lib/announce";

/** Inline email capture → leads. Reused across templates. */
export function NewsletterInline({
  template,
  source = "newsletter",
  placeholder = "you@email.com",
  button = "Notify me",
  success = "You're on the list.",
  inputStyle,
  buttonClassName = "btn btn-primary",
  buttonStyle = { padding: "11px 22px" },
}: {
  template: string;
  source?: string;
  placeholder?: string;
  button?: string;
  success?: string;
  inputStyle?: React.CSSProperties;
  buttonClassName?: string;
  buttonStyle?: React.CSSProperties;
}) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => { if (done) announce(success); }, [done, success]);

  if (done) {
    return (
      <div role="status" style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 18, color: "var(--color-accent)" }}>
        {success}
      </div>
    );
  }

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setPending(true);
        setError(null);
        const res = await captureLead(template, email, source);
        setPending(false);
        if (res.ok) setDone(true);
        else setError(res.error ?? "Something went wrong.");
      }}
      style={{ display: "flex", gap: 10, flexWrap: "wrap" }}
    >
      <input
        className="input"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={placeholder}
        aria-label="Email address"
        style={{ flex: 1, minWidth: 220, ...inputStyle }}
      />
      <button type="submit" className={buttonClassName} disabled={pending} style={buttonStyle}>
        {pending ? "…" : button}
      </button>
      {error ? <div role="alert" style={{ flexBasis: "100%", fontSize: 13, color: "var(--color-accent-700)" }}>{error}</div> : null}
    </form>
  );
}
