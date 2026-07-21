"use client";

import { useEffect, useState } from "react";
import { captureMessage } from "@/lib/actions";
import { announce } from "@/lib/announce";

/** Generic contact/enquiry form → messages. Reused across templates. */
export function ContactForm({
  template,
  subjects,
  subjectLabel = "Subject",
  successTitle = "Message sent.",
  successBody = "Thanks — we'll be in touch soon.",
}: {
  template: string;
  subjects: string[];
  subjectLabel?: string;
  successTitle?: string;
  successBody?: string;
}) {
  const [done, setDone] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => { if (done) announce(`${successTitle} ${successBody}`); }, [done, successTitle, successBody]);

  if (done) {
    return (
      <div role="status" style={{ border: "2px solid var(--color-accent)", padding: 28 }}>
        <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 20, color: "var(--color-accent)", marginBottom: 8 }}>
          {successTitle}
        </div>
        <p style={{ fontSize: 15, margin: 0, color: "color-mix(in srgb, var(--color-text) 75%, transparent)" }}>{successBody}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        setPending(true);
        setError(null);
        const res = await captureMessage(template, {
          name: String(fd.get("name") ?? ""),
          email: String(fd.get("email") ?? ""),
          subject: String(fd.get("subject") ?? ""),
          message: String(fd.get("message") ?? ""),
        });
        setPending(false);
        if (res.ok) setDone(true);
        else setError(res.error ?? "Something went wrong.");
      }}
      style={{ display: "grid", gap: 18 }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        <div className="field"><label htmlFor="cf-name">Name</label><input id="cf-name" name="name" className="input" required placeholder="Your name" /></div>
        <div className="field"><label htmlFor="cf-email">Email</label><input id="cf-email" name="email" className="input" type="email" required placeholder="you@email.com" /></div>
      </div>
      <div className="field">
        <label htmlFor="cf-subject">{subjectLabel}</label>
        <select id="cf-subject" name="subject" className="input" style={{ minHeight: 40 }}>
          {subjects.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>
      <div className="field"><label htmlFor="cf-message">Message</label><textarea id="cf-message" name="message" className="input" required placeholder="How can we help?" /></div>
      {error ? <div role="alert" style={{ fontSize: 14, color: "var(--color-accent-700)" }}>{error}</div> : null}
      <button type="submit" className="btn btn-primary" disabled={pending} style={{ padding: "13px 24px", justifyContent: "flex-start" }}>
        {pending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
