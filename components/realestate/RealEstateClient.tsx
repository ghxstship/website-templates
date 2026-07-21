"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Placeholder } from "@/components/Placeholder";
import { SaveHeart } from "@/components/ds/SaveHeart";
import { Modal } from "@/components/ds/Modal";
import { ConfirmModal } from "@/components/ds/ConfirmModal";
import { useFavorites } from "@/lib/useFavorites";
import { captureBooking, captureMessage } from "@/lib/actions";
import { LISTINGS, type Listing, fmtPrice, specLine } from "@/lib/realestate";

/** Card used on home (featured), buy grid and saved grid. */
export function ListingCard({ l, bordered = false }: { l: Listing; bordered?: boolean }) {
  const fav = useFavorites("realestate", "Home");
  return (
    <Link
      href={`/realestate/listing/${l.slug}`}
      style={{ background: "var(--color-bg)", textDecoration: "none", color: "var(--color-text)", display: "flex", flexDirection: "column", border: bordered ? "2px solid var(--color-divider)" : undefined, cursor: "pointer" }}
    >
      <figure className="grayscale" style={{ margin: 0, aspectRatio: "3/2", position: "relative", borderBottom: bordered ? "2px solid var(--color-divider)" : undefined }}>
        <Placeholder label={l.title} />
        <span className="tag" style={{ position: "absolute", top: 10, left: 10, background: "var(--color-text)", color: "var(--color-bg)" }}>{l.deal}</span>
        <SaveHeart overlay active={fav.isSaved(l.slug)} onToggle={() => fav.toggle(l.slug, l.title)} label="Add to favorites" size={17} />
      </figure>
      <div style={{ padding: "16px 18px 20px", flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 20, color: "var(--color-accent)" }}>{fmtPrice(l)}</div>
        <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 16, margin: "6px 0 4px" }}>{l.title}</div>
        <div style={{ fontSize: 13, color: "color-mix(in srgb, var(--color-text) 60%, transparent)", marginBottom: 12 }}>{l.area}</div>
        <div style={{ marginTop: "auto", fontSize: 13, color: "color-mix(in srgb, var(--color-text) 70%, transparent)" }}>{specLine(l)}</div>
      </div>
    </Link>
  );
}

export function HomeSearch() {
  const router = useRouter();
  const [loc, setLoc] = useState("");
  const [forWhat, setForWhat] = useState<"Buy" | "Rent">("Buy");
  const [beds, setBeds] = useState("Any");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        const q = loc.trim();
        if (q) params.set("q", q);
        params.set("deal", forWhat === "Rent" ? "rent" : "sale");
        if (beds !== "Any") params.set("beds", beds.replace("+", ""));
        const qs = params.toString();
        router.push(`/realestate/buy${qs ? `?${qs}` : ""}`);
      }}
      className="searchrow"
      style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", gap: 12, maxWidth: 860, border: "2px solid var(--color-divider)", padding: 12 }}
    >
      <div className="field" style={{ margin: 0 }}><label htmlFor="re-search-loc">Location</label><input id="re-search-loc" className="input" value={loc} onChange={(e) => setLoc(e.target.value)} placeholder="City or area" style={{ border: 0, minHeight: 42 }} /></div>
      <div className="field" style={{ margin: 0 }}><label htmlFor="re-search-for">For</label><select id="re-search-for" className="input" value={forWhat} onChange={(e) => setForWhat(e.target.value as "Buy" | "Rent")} style={{ border: 0, minHeight: 42 }}><option>Buy</option><option>Rent</option></select></div>
      <div className="field" style={{ margin: 0 }}><label htmlFor="re-search-beds">Beds</label><select id="re-search-beds" className="input" value={beds} onChange={(e) => setBeds(e.target.value)} style={{ border: 0, minHeight: 42 }}><option>Any</option><option>1+</option><option>2+</option><option>3+</option></select></div>
      <button type="submit" className="btn btn-primary" style={{ alignSelf: "end", padding: "12px 24px" }}>Search</button>
    </form>
  );
}

export function BuyGrid() {
  const params = useSearchParams();
  const fav = useFavorites("realestate", "Home");
  const [deal, setDeal] = useState<"For sale" | "To rent">(params.get("deal") === "rent" ? "To rent" : "For sale");
  const [ptype, setPtype] = useState("all");
  const [sort, setSort] = useState("new");
  const [savedOnly, setSavedOnly] = useState(false);

  const q = (params.get("q") ?? "").trim().toLowerCase();
  const minBeds = Number(params.get("beds")) || 0;

  let rows = LISTINGS.filter((l) => l.deal === deal && (ptype === "all" || l.type === ptype));
  if (q) rows = rows.filter((l) => `${l.title} ${l.area}`.toLowerCase().includes(q));
  if (minBeds) rows = rows.filter((l) => l.beds >= minBeds);
  if (savedOnly) rows = rows.filter((l) => fav.isSaved(l.slug));
  if (sort === "low") rows = [...rows].sort((a, b) => a.num - b.num);
  if (sort === "high") rows = [...rows].sort((a, b) => b.num - a.num);

  const savedCount = LISTINGS.filter((l) => fav.isSaved(l.slug)).length;
  const types = ["all", "House", "Apartment"];
  return (
    <>
      <section className="wrap" style={{ paddingBlock: "8px 6px" }}>
        <div className="kicker">{rows.length} homes {deal === "To rent" ? "to rent" : "for sale"}</div>
      </section>
      <section className="wrap" style={{ paddingBlock: "12px 8px", display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {(["For sale", "To rent"] as const).map((d) => (
            <button key={d} type="button" onClick={() => setDeal(d)} className="btn" style={{ padding: "8px 16px", border: "1px solid var(--color-divider)", background: deal === d ? "var(--color-accent)" : "transparent", color: deal === d ? "var(--color-bg)" : "var(--color-text)" }}>{d}</button>
          ))}
          <span style={{ width: 1, background: "var(--color-divider)", margin: "0 4px" }} />
          {types.map((t) => (
            <button key={t} type="button" onClick={() => setPtype(t)} className="btn" style={{ padding: "8px 16px", border: "1px solid var(--color-divider)", background: ptype === t ? "var(--color-text)" : "transparent", color: ptype === t ? "var(--color-bg)" : "var(--color-text)" }}>{t === "all" ? "All types" : `${t}s`}</button>
          ))}
          <span style={{ width: 1, background: "var(--color-divider)", margin: "0 4px" }} />
          <button type="button" onClick={() => setSavedOnly((v) => !v)} aria-pressed={savedOnly} className="btn" style={{ padding: "8px 16px", border: "1px solid var(--color-divider)", background: savedOnly ? "var(--color-accent)" : "transparent", color: savedOnly ? "var(--color-bg)" : "var(--color-text)" }}>Saved · {savedCount}</button>
        </div>
        <select className="input" value={sort} onChange={(e) => setSort(e.target.value)} style={{ width: "auto", minHeight: 38 }}>
          <option value="new">Newest</option><option value="low">Price ↑</option><option value="high">Price ↓</option>
        </select>
      </section>
      <section className="wrap" style={{ paddingBlock: "16px clamp(48px, 6vw, 80px)" }}>
        {rows.length === 0 ? (
          <p style={{ fontSize: 16, color: "color-mix(in srgb, var(--color-text) 60%, transparent)", padding: "16px 0" }}>
            {savedOnly
              ? "No saved homes yet. Tap the heart on any listing to shortlist it."
              : "No homes match these filters. Try widening your search."}
          </p>
        ) : (
          <div className="grid3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "clamp(16px, 2vw, 28px)" }}>
            {rows.map((l) => <ListingCard key={l.slug} l={l} bordered />)}
          </div>
        )}
      </section>
    </>
  );
}

export function SavedGrid() {
  const fav = useFavorites("realestate", "Home");
  const rows = LISTINGS.filter((l) => fav.isSaved(l.slug));
  return (
    <section className="wrap" style={{ paddingBlock: "20px clamp(48px, 6vw, 80px)" }}>
      {rows.length === 0 ? (
        <p style={{ fontSize: 16, color: "color-mix(in srgb, var(--color-text) 60%, transparent)", padding: "16px 0" }}>
          No favorites yet. Tap the heart on any listing to add it to your favorites.
        </p>
      ) : (
        <div className="grid3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "clamp(16px, 2vw, 28px)" }}>
          {rows.map((l) => <ListingCard key={l.slug} l={l} bordered />)}
        </div>
      )}
    </section>
  );
}

export function ListingAside({ l }: { l: Listing }) {
  const fav = useFavorites("realestate", "Home");
  const [modal, setModal] = useState<"viewing" | "enquiry" | null>(null);
  const [pending, setPending] = useState(false);
  const [confirm, setConfirm] = useState<{ title: string; body: string } | null>(null);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("re-name") as HTMLInputElement)?.value ?? "";
    const email = (form.elements.namedItem("re-email") as HTMLInputElement)?.value ?? "";
    setPending(true);
    if (modal === "viewing") {
      const res = await captureBooking("realestate", { kind: "viewing", summary: `${l.title} — ${fmtPrice(l)}`, details: { area: l.area, agent: l.agent }, email, refPrefix: "VW" });
      setPending(false);
      setModal(null);
      setConfirm({ title: "Viewing requested", body: `${l.agent} will confirm your viewing of ${l.title} shortly.${res.ref ? ` Ref ${res.ref}.` : ""}` });
    } else {
      await captureMessage("realestate", { name, email, subject: `Enquiry: ${l.title}`, message: (form.elements.namedItem("re-msg") as HTMLTextAreaElement)?.value || "Question about this listing." });
      setPending(false);
      setModal(null);
      setConfirm({ title: "Question sent", body: `${l.agent} will reply to your question about ${l.title} shortly.` });
    }
  };

  return (
    <aside style={{ border: "2px solid var(--color-divider)", position: "sticky", top: 90 }}>
      <div style={{ padding: 22, borderBottom: "2px solid var(--color-divider)" }}>
        <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 30, color: "var(--color-accent)" }}>{fmtPrice(l)}</div>
        <div style={{ fontSize: 13, color: "color-mix(in srgb, var(--color-text) 58%, transparent)" }}>{l.deal === "To rent" ? "per calendar month" : "Freehold · guide price"}</div>
      </div>
      <div style={{ padding: 22 }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 16 }}>
          <figure className="grayscale" style={{ margin: 0, width: 44, height: 44, border: "1px solid var(--color-divider)", flex: "0 0 auto" }}><Placeholder /></figure>
          <div><div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 15 }}>{l.agent}</div><div style={{ fontSize: 12, color: "color-mix(in srgb, var(--color-text) 58%, transparent)" }}>Listing agent</div></div>
        </div>
        <button type="button" className="btn btn-primary" onClick={() => setModal("viewing")} style={{ width: "100%", justifyContent: "center", padding: "13px 20px", marginBottom: 10 }}>Book a viewing</button>
        <button type="button" className="btn btn-secondary" onClick={() => setModal("enquiry")} style={{ width: "100%", justifyContent: "center", padding: "13px 20px" }}>Ask a question</button>
        <button type="button" className="btn btn-ghost" onClick={() => fav.toggle(l.slug, l.title)} style={{ width: "100%", justifyContent: "center", padding: "12px 20px", marginTop: 10, color: fav.isSaved(l.slug) ? "var(--color-accent)" : undefined }}>
          {fav.isSaved(l.slug) ? "★ In favorites" : "♡ Add to favorites"}
        </button>
      </div>

      <Modal open={modal !== null} onClose={() => setModal(null)} width={500} label={modal === "enquiry" ? "Ask a question" : "Book a viewing"}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
          <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 18, textTransform: "uppercase" }}>{modal === "enquiry" ? "Ask a question" : "Book a viewing"}</span>
        </div>
        <form onSubmit={submit} style={{ display: "grid", gap: 16, marginTop: 8 }}>
          <div style={{ fontSize: 14, color: "color-mix(in srgb, var(--color-text) 65%, transparent)" }}>{l.title} · {fmtPrice(l)}</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div className="field"><label htmlFor="re-name">Name</label><input id="re-name" name="re-name" className="input" required /></div>
            <div className="field"><label htmlFor="re-phone">Phone</label><input id="re-phone" name="re-phone" className="input" required /></div>
          </div>
          <div className="field"><label htmlFor="re-email">Email</label><input id="re-email" name="re-email" className="input" type="email" required /></div>
          {modal === "viewing" ? (
            <div className="field"><label htmlFor="re-date">Preferred date</label><input id="re-date" name="re-date" className="input" type="date" style={{ minHeight: 42 }} /></div>
          ) : (
            <div className="field"><label htmlFor="re-msg">Your question</label><textarea id="re-msg" name="re-msg" className="input" required /></div>
          )}
          <button type="submit" className="btn btn-primary" disabled={pending} style={{ padding: "13px 24px", justifyContent: "flex-start" }}>{pending ? "Sending…" : modal === "enquiry" ? "Send question" : "Request viewing"}</button>
        </form>
      </Modal>
      <ConfirmModal open={!!confirm} onClose={() => setConfirm(null)} title={confirm?.title ?? ""} body={confirm?.body ?? ""} />
    </aside>
  );
}

export function SellForm() {
  const [done, setDone] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const val = (n: string) => (form.elements.namedItem(n) as HTMLInputElement | HTMLSelectElement)?.value ?? "";
    const addr = val("sell-addr"), type = val("sell-type"), beds = val("sell-beds");
    const name = val("sell-name"), phone = val("sell-phone"), email = val("sell-email");
    setPending(true);
    setError(null);
    const res = await captureMessage("realestate", {
      name: name || "Valuation request",
      email,
      subject: "Valuation request",
      message: `Valuation requested for ${addr}. Type: ${type || "—"}. Bedrooms: ${beds || "—"}. Phone: ${phone || "—"}.`,
    });
    setPending(false);
    if (res.ok) setDone(true);
    else setError(res.error ?? "Something went wrong. Please try again.");
  };
  if (done) {
    return (
      <div style={{ border: "2px solid var(--color-accent)", padding: 28 }}>
        <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 20, color: "var(--color-accent)", marginBottom: 8 }}>Valuation requested.</div>
        <p style={{ fontSize: 15, margin: 0, color: "color-mix(in srgb, var(--color-text) 75%, transparent)" }}>An agent will call within 48 hours to arrange a visit.</p>
      </div>
    );
  }
  return (
    <form onSubmit={submit} style={{ display: "grid", gap: 18 }}>
      <div className="field"><label htmlFor="sell-addr">Property address</label><input id="sell-addr" name="sell-addr" className="input" required /></div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        <div className="field"><label htmlFor="sell-type">Type</label><select id="sell-type" name="sell-type" className="input" style={{ minHeight: 42 }}><option>House</option><option>Apartment</option><option>Land</option><option>Commercial</option></select></div>
        <div className="field"><label htmlFor="sell-beds">Bedrooms</label><input id="sell-beds" name="sell-beds" className="input" placeholder="e.g. 3" /></div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        <div className="field"><label htmlFor="sell-name">Your name</label><input id="sell-name" name="sell-name" className="input" required /></div>
        <div className="field"><label htmlFor="sell-phone">Phone</label><input id="sell-phone" name="sell-phone" className="input" type="tel" required /></div>
      </div>
      <div className="field"><label htmlFor="sell-email">Email</label><input id="sell-email" name="sell-email" className="input" type="email" required placeholder="you@email.com" /></div>
      {error ? <div role="alert" style={{ fontSize: 14, color: "var(--color-accent-700)" }}>{error}</div> : null}
      <button type="submit" className="btn btn-primary" disabled={pending} style={{ padding: "13px 24px", justifyContent: "flex-start" }}>{pending ? "Sending…" : "Request valuation"}</button>
    </form>
  );
}
