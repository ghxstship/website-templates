"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Placeholder } from "@/components/Placeholder";
import { Modal } from "@/components/ds/Modal";
import { useCareer } from "./CareerContext";
import { captureMessage } from "@/lib/actions";
import { LISTINGS, TYPE_FILTERS, sectionsFor, APPLY_LABELS, UPLOAD_LABELS, PITCH_LABELS, ATS_ROLES, STAGE_NAMES, type Listing, type ListingType } from "@/lib/career";

export function HomeSearch() {
  const router = useRouter();
  const [q, setQ] = useState("");
  return (
    <form onSubmit={(e) => { e.preventDefault(); router.push("/career/listings"); }} style={{ display: "flex", gap: 10, flexWrap: "wrap", maxWidth: 640 }}>
      <input className="input" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Role, skill or keyword" style={{ flex: 1, minWidth: 220, minHeight: 46 }} />
      <button type="submit" className="btn btn-primary" style={{ padding: "12px 24px" }}>Search</button>
    </form>
  );
}

export function ListingsList({ initialType = "all" }: { initialType?: string }) {
  const [type, setType] = useState<ListingType | "all">((TYPE_FILTERS as string[]).includes(initialType) ? (initialType as ListingType) : "all");
  const shown = LISTINGS.filter((l) => type === "all" || l.type === type);
  return (
    <>
      <section className="wrap" style={{ paddingBlock: "20px 8px" }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {TYPE_FILTERS.map((t) => <button key={t} type="button" onClick={() => setType(t)} className={`chip${type === t ? " active" : ""}`}>{t === "all" ? "All" : `${t}s`}</button>)}
        </div>
      </section>
      <section className="wrap" style={{ paddingBlock: "12px clamp(48px, 6vw, 80px)" }}>
        {shown.map((l) => (
          <Link key={l.id} href={`/career/listings/${l.id}`} className="row-line" style={{ display: "grid", gridTemplateColumns: "minmax(0,1.6fr) minmax(0,1fr) auto auto", gap: 18, alignItems: "center", padding: "20px 0", borderTop: "2px solid var(--color-divider)", textDecoration: "none", color: "var(--color-text)" }}>
            <div><div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(17px, 2vw, 22px)" }}>{l.title}</div><div style={{ fontSize: 13, color: "color-mix(in srgb, var(--color-text) 60%, transparent)", marginTop: 4 }}>{l.org} · {l.location}</div></div>
            <div className="row-sub" style={{ fontSize: 14, color: "color-mix(in srgb, var(--color-text) 72%, transparent)" }}>{l.comp}</div>
            <span className="tag tag-outline">{l.type}</span>
            <span className="btn btn-primary" style={{ padding: "8px 16px" }}>View</span>
          </Link>
        ))}
      </section>
    </>
  );
}

export function ListingDetail({ listing }: { listing: Listing }) {
  const { applied, apply } = useCareer();
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const isApplied = applied.has(listing.id);
  const sections = sectionsFor(listing.type);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setPending(true);
    await captureMessage("career", { name: String(fd.get("name") ?? ""), email: String(fd.get("email") ?? ""), subject: `${APPLY_LABELS[listing.type]} — ${listing.title} @ ${listing.org}`, message: String(fd.get("pitch") ?? "") });
    setPending(false);
    setOpen(false);
    apply(listing.id, listing.title, listing.org);
  };

  return (
    <>
      <section className="wrap" style={{ paddingBlock: "20px 0" }}><Link href="/career/listings" className="btn btn-ghost" style={{ padding: "8px 4px" }}>← All listings</Link></section>
      <section className="wrap split2" style={{ paddingBlock: "16px clamp(40px, 5vw, 64px)", display: "grid", gridTemplateColumns: "minmax(0,1.6fr) minmax(0,0.9fr)", gap: "clamp(28px, 5vw, 56px)", alignItems: "start" }}>
        <div>
          <span className="tag tag-accent">{listing.type}</span>
          <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(28px, 4vw, 50px)", lineHeight: 1, letterSpacing: "-0.02em", margin: "14px 0 10px" }}>{listing.title}</h1>
          <div style={{ fontSize: 15, color: "color-mix(in srgb, var(--color-text) 68%, transparent)", marginBottom: 24 }}>{listing.org} · {listing.location} · {listing.comp}</div>
          {sections.map((s) => (
            <div key={s.h} style={{ marginBottom: 24 }}>
              <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 17, margin: "0 0 10px", textTransform: "uppercase", letterSpacing: "0.02em" }}>{s.h}</h3>
              {s.items.map((i) => <div key={i} style={{ display: "flex", gap: 10, alignItems: "baseline", fontSize: 15, lineHeight: 1.5, marginBottom: 8 }}><span style={{ color: "var(--color-accent)", fontWeight: 800 }}>—</span><span>{i}</span></div>)}
            </div>
          ))}
        </div>
        <div style={{ border: "2px solid var(--color-divider)", position: "sticky", top: 90 }}>
          <div style={{ padding: 22, borderBottom: "2px solid var(--color-divider)" }}>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 22, marginBottom: 4 }}>{listing.comp}</div>
            <div style={{ fontSize: 13, color: "color-mix(in srgb, var(--color-text) 58%, transparent)" }}>{listing.detailLine}</div>
          </div>
          <div style={{ padding: 22 }}>
            {isApplied ? (
              <div style={{ border: "2px solid var(--color-accent)", padding: 16, textAlign: "center" }}><div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, color: "var(--color-accent)" }}>Application submitted</div><div style={{ fontSize: 13, color: "color-mix(in srgb, var(--color-text) 65%, transparent)", marginTop: 4 }}>Track it under Applications.</div></div>
            ) : (
              <>
                <button type="button" className="btn btn-primary" onClick={() => setOpen(true)} style={{ width: "100%", justifyContent: "center", padding: "13px 20px" }}>{APPLY_LABELS[listing.type]}</button>
                <div style={{ fontSize: 12, color: "color-mix(in srgb, var(--color-text) 55%, transparent)", marginTop: 12, textAlign: "center" }}>{listing.type === "RFP" ? "Bids reviewed after the closing date." : "Usually responds within a week."}</div>
              </>
            )}
          </div>
        </div>
      </section>
      <Modal open={open} onClose={() => setOpen(false)} width={540} showClose={false}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 18, textTransform: "uppercase" }}>{APPLY_LABELS[listing.type]}</span></div>
        <div style={{ fontSize: 14, color: "color-mix(in srgb, var(--color-text) 65%, transparent)", marginBottom: 18 }}>{listing.title} · {listing.org}</div>
        <form onSubmit={submit} style={{ display: "grid", gap: 16 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}><div className="field"><label htmlFor="ap-name">Full name</label><input id="ap-name" name="name" className="input" required /></div><div className="field"><label htmlFor="ap-email">Email</label><input id="ap-email" name="email" className="input" type="email" required /></div></div>
          <div className="field"><label htmlFor="ap-up">{UPLOAD_LABELS[listing.type]}</label><input id="ap-up" name="upload" className="input" placeholder="Paste a link or file name" /></div>
          <div className="field"><label htmlFor="ap-pitch">{PITCH_LABELS[listing.type]}</label><textarea id="ap-pitch" name="pitch" className="input" required style={{ minHeight: 100 }} /></div>
          <button type="submit" className="btn btn-primary" disabled={pending} style={{ padding: "13px 24px", justifyContent: "flex-start" }}>{pending ? "Submitting…" : "Submit application"}</button>
        </form>
      </Modal>
    </>
  );
}

export function Applications() {
  const { applied } = useCareer();
  const items = LISTINGS.filter((l) => applied.has(l.id));
  if (items.length === 0) {
    return <p style={{ fontSize: 16, color: "color-mix(in srgb, var(--color-text) 60%, transparent)", padding: "16px 0" }}>You haven&apos;t applied to anything yet. <Link href="/career/listings">Browse listings →</Link></p>;
  }
  return (
    <>
      {items.map((l) => (
        <div key={l.id} className="row-line" style={{ display: "grid", gridTemplateColumns: "minmax(0,1.4fr) minmax(0,1fr) auto auto", gap: 18, alignItems: "center", padding: "18px 0", borderTop: "2px solid var(--color-divider)" }}>
          <div className="row-sub" style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 17 }}>{l.title}</div>
          <div style={{ fontSize: 14, color: "color-mix(in srgb, var(--color-text) 62%, transparent)" }}>{l.org}</div>
          <span className="tag tag-outline">{l.type}</span>
          <span className="tag tag-accent">Under review</span>
        </div>
      ))}
    </>
  );
}

export function PostForm() {
  const [done, setDone] = useState(false);
  const [pending, setPending] = useState(false);
  if (done) {
    return (
      <div style={{ border: "2px solid var(--color-accent)", padding: "clamp(24px, 4vw, 40px)" }}>
        <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 24, color: "var(--color-accent)", marginBottom: 10 }}>Your listing is live.</div>
        <p style={{ fontSize: 15, margin: "0 0 20px", color: "color-mix(in srgb, var(--color-text) 75%, transparent)" }}>Candidates will now appear in your ATS pipeline as they apply.</p>
        <Link href="/career/ats" className="btn btn-primary" style={{ padding: "12px 20px" }}>Open the ATS →</Link>
      </div>
    );
  }
  return (
    <form onSubmit={async (e) => { e.preventDefault(); const fd = new FormData(e.currentTarget); setPending(true); await captureMessage("career", { name: String(fd.get("org") ?? "Employer"), email: "employer@example.com", subject: `New listing — ${fd.get("title")} (${fd.get("type")})`, message: String(fd.get("desc") ?? "") }); setPending(false); setDone(true); }} style={{ display: "grid", gap: 18 }}>
      <div className="field"><label htmlFor="p-type">Listing type</label><select id="p-type" name="type" className="input" style={{ minHeight: 42 }}><option>Job</option><option>Gig / freelance</option><option>Audition / casting</option><option>RFP / tender</option></select></div>
      <div className="field"><label htmlFor="p-title">Title</label><input id="p-title" name="title" className="input" required placeholder="e.g. Senior Product Designer" /></div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}><div className="field"><label htmlFor="p-org">Organisation</label><input id="p-org" name="org" className="input" required /></div><div className="field"><label htmlFor="p-loc">Location</label><input id="p-loc" name="location" className="input" required placeholder="Remote / city" /></div></div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}><div className="field"><label htmlFor="p-comp">Compensation / budget</label><input id="p-comp" name="comp" className="input" placeholder="$ range or rate" /></div><div className="field"><label htmlFor="p-close">Closing date</label><input id="p-close" name="close" className="input" type="date" style={{ minHeight: 42 }} /></div></div>
      <div className="field"><label htmlFor="p-desc">Description &amp; requirements</label><textarea id="p-desc" name="desc" className="input" required style={{ minHeight: 120 }} /></div>
      <button type="submit" className="btn btn-primary" disabled={pending} style={{ padding: "13px 24px", justifyContent: "flex-start" }}>{pending ? "Publishing…" : "Publish listing"}</button>
    </form>
  );
}

export function ATSPipeline() {
  const { stageOf, move } = useCareer();
  const [rIdx, setRIdx] = useState(0);
  const roster = ATS_ROLES[rIdx].cands;
  const key = (i: number) => `${rIdx}:${i}`;
  const stageFor = (i: number) => (stageOf[key(i)] != null ? stageOf[key(i)] : roster[i].stage);

  return (
    <>
      <section className="wrap" style={{ paddingBlock: "clamp(32px, 5vw, 56px) 20px" }}>
        <div className="kicker" style={{ marginBottom: 16 }}>Applicant tracking · {ATS_ROLES[rIdx].role}</div>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(36px, 5vw, 68px)", lineHeight: 0.95, letterSpacing: "-0.03em", margin: 0, textTransform: "uppercase" }}>Pipeline</h1>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {ATS_ROLES.map((r, i) => <button key={r.role} type="button" onClick={() => setRIdx(i)} className={`chip${rIdx === i ? " active" : ""}`} style={{ fontSize: 12, padding: "7px 14px" }}>{r.role}</button>)}
          </div>
        </div>
      </section>
      <hr className="rule" />
      <section className="wrap" style={{ paddingBlock: "clamp(20px, 3vw, 32px) clamp(48px, 6vw, 80px)" }}>
        <div className="pipeline">
          {STAGE_NAMES.map((name, sIdx) => {
            const cards = roster.map((c, i) => ({ c, i })).filter(({ i }) => stageFor(i) === sIdx);
            return (
              <div key={name} style={{ background: "var(--color-bg)", minHeight: 300 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 16px", borderBottom: "2px solid var(--color-divider)" }}><span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 13, letterSpacing: "0.04em", textTransform: "uppercase" }}>{name}</span><span style={{ fontSize: 12, fontWeight: 800, color: "var(--color-accent)" }}>{cards.length}</span></div>
                <div style={{ padding: 12 }}>
                  {cards.map(({ c, i }) => (
                    <div key={i} style={{ border: "1px solid var(--color-divider)", padding: 12, marginBottom: 10 }}>
                      <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 8 }}>
                        <figure className="grayscale" style={{ margin: 0, width: 30, height: 30, border: "1px solid var(--color-divider)", flex: "0 0 auto" }}><Placeholder /></figure>
                        <div style={{ minWidth: 0 }}><div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 13, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.name}</div><div style={{ fontSize: 11, color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }}>{c.role}</div></div>
                      </div>
                      <div style={{ display: "flex", gap: 6 }}>
                        {sIdx > 0 ? <button type="button" onClick={() => move(key(i), roster[i].stage, -1)} className="btn btn-secondary" style={{ padding: "4px 8px", fontSize: 11 }}>←</button> : null}
                        {sIdx < 4 ? <button type="button" onClick={() => move(key(i), roster[i].stage, 1)} className="btn btn-primary" style={{ padding: "4px 10px", fontSize: 11, flex: 1, justifyContent: "center" }}>{STAGE_NAMES[Math.min(4, sIdx + 1)]} →</button> : null}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
