"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { MenuIcon, CheckIcon } from "@/components/icons";
import { Placeholder } from "@/components/Placeholder";
import { SaveHeart } from "@/components/ds/SaveHeart";
import { Modal } from "@/components/ds/Modal";
import { ConfirmModal } from "@/components/ds/ConfirmModal";
import { useFavorites } from "@/lib/useFavorites";
import { usePersistentState } from "@/lib/persist";
import { captureBooking } from "@/lib/actions";
import { BOOKING, BUSINESSES, CATEGORIES, HOURS, DOWS, ALL_TIMES, TAKEN_BY_DATE, STEP_NAMES, DASH_STATS, APPTS, STAGE_NAMES, STAGE_TAGS, NAV, money, type Business } from "@/lib/booking";

export function BookingHeader() {
  const pathname = usePathname();
  const [menu, setMenu] = useState(false);
  const active = (p: string) => pathname === p || pathname.startsWith(p + "/") || (p === "/booking/discover" && pathname.startsWith("/booking/business"));
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 60, background: "var(--color-bg)", borderBottom: "2px solid var(--color-divider)" }}>
      <div className="wrap" style={{ display: "flex", alignItems: "center", gap: 26, height: 74 }}>
        <Link href="/booking" onClick={() => setMenu(false)} style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 20, letterSpacing: "-0.01em", textDecoration: "none", color: "var(--color-text)", textTransform: "uppercase", marginRight: "auto" }}>{BOOKING.brand}</Link>
        <nav className="desk-nav" style={{ marginLeft: 0 }}>{NAV.map((n) => <Link key={n.path} href={n.path} className="nav-link" aria-current={active(n.path) ? "page" : undefined}>{n.label}</Link>)}</nav>
        <Link href="/booking/dashboard" className="btn btn-secondary desk-nav" style={{ padding: "8px 14px" }}>Provider log-in</Link>
        <Link href="/booking/discover" className="btn btn-primary" style={{ padding: "9px 16px", flex: "0 0 auto" }}>Book now</Link>
        <button type="button" className="burger btn btn-icon" onClick={() => setMenu((v) => !v)} aria-label="Menu"><MenuIcon size={20} /></button>
      </div>
      <div className={`mob-menu${menu ? " open" : ""}`} style={{ borderTop: "2px solid var(--color-divider)" }}>
        <div className="wrap" style={{ display: "flex", flexDirection: "column", paddingBlock: "12px 18px" }}>{NAV.map((n) => <Link key={n.path} href={n.path} onClick={() => setMenu(false)} style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 18, textTransform: "uppercase", textDecoration: "none", color: "var(--color-text)", padding: "12px 0", borderBottom: "1px solid var(--color-divider)" }}>{n.label}</Link>)}</div>
      </div>
    </header>
  );
}

export function HomeSearch() {
  const router = useRouter();
  return (
    <>
      <form onSubmit={(e) => { e.preventDefault(); router.push("/booking/discover"); }} className="searchrow" style={{ display: "grid", gridTemplateColumns: "minmax(0,1.3fr) minmax(0,1fr) auto", gap: 12, maxWidth: 760, border: "2px solid var(--color-divider)", padding: 12 }}>
        <input className="input" placeholder="Service, business or category" style={{ border: 0, minHeight: 44 }} />
        <input className="input" placeholder="Location" style={{ border: 0, borderLeft: "1px solid var(--color-divider)", minHeight: 44 }} />
        <button type="submit" className="btn btn-primary" style={{ padding: "12px 26px" }}>Search</button>
      </form>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 18 }}>
        {["Barber", "Beauty", "Tattoo", "Petcare", "Home"].map((c) => <Link key={c} href={`/booking/discover?cat=${c}`} className="btn btn-secondary" style={{ padding: "8px 16px" }}>{c}</Link>)}
      </div>
    </>
  );
}

export function DiscoverGrid({ initialCat = "all" }: { initialCat?: string }) {
  const [cat, setCat] = useState(CATEGORIES.includes(initialCat) ? initialCat : "all");
  const [showSaved, setShowSaved] = useState(false);
  const fav = useFavorites("booking", "Business");
  let list = BUSINESSES.filter((b) => cat === "all" || b.category === cat);
  if (showSaved) list = list.filter((b) => fav.isSaved(b.slug));
  return (
    <>
      <section className="wrap" style={{ paddingBlock: "20px 8px" }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>{CATEGORIES.map((c) => <button key={c} type="button" onClick={() => setCat(c)} className={`chip${cat === c ? " active" : ""}`}>{c === "all" ? "All" : c}</button>)}</div>
      </section>
      <section className="wrap" style={{ paddingBlock: "8px 0" }}>
        <button type="button" onClick={() => setShowSaved((v) => !v)} className={showSaved ? "btn btn-primary" : "btn btn-secondary"} style={{ padding: "8px 16px" }}>{showSaved ? `Showing favorites · ` : `Favorites · `}</button>
      </section>
      <section className="wrap" style={{ paddingBlock: "16px clamp(48px, 6vw, 80px)" }}>
        {showSaved && fav.count === 0 ? <p style={{ fontSize: 16, color: "color-mix(in srgb, var(--color-text) 60%, transparent)", padding: "8px 0 16px" }}>No saved businesses yet. Tap the heart on any listing.</p> : null}
        <div className="grid3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "clamp(16px, 2vw, 28px)" }}>
          {list.map((b) => (
            <Link key={b.slug} href={`/booking/business/${b.slug}`} style={{ border: "2px solid var(--color-divider)", cursor: "pointer", display: "flex", flexDirection: "column", textDecoration: "none", color: "var(--color-text)" }}>
              <figure className="grayscale" style={{ margin: 0, aspectRatio: "3/2", borderBottom: "2px solid var(--color-divider)", position: "relative" }}>
                <Placeholder label={b.name} />
                <SaveHeart overlay active={fav.isSaved(b.slug)} onToggle={() => fav.toggle(b.slug, b.name)} />
              </figure>
              <div style={{ padding: "16px 18px 20px", flex: 1, display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10 }}><h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 18, margin: 0 }}>{b.name}</h3><span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, color: "var(--color-accent)", fontSize: 14 }}>★ {b.rating}</span></div>
                <div style={{ fontSize: 13, color: "color-mix(in srgb, var(--color-text) 60%, transparent)", margin: "6px 0 12px" }}>{b.category} · {b.area}</div>
                <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}><span style={{ fontSize: 13, color: "color-mix(in srgb, var(--color-text) 58%, transparent)" }}>{b.from}</span><span style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--color-accent-700)" }}>Book →</span></div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

export function BusinessProfile({ biz }: { biz: Business }) {
  return (
    <>
      <section className="wrap" style={{ paddingBlock: "20px 0" }}><Link href="/booking/discover" className="btn btn-ghost" style={{ padding: "8px 4px" }}>← Discover</Link></section>
      <figure className="grayscale" style={{ margin: "12px 0 0", aspectRatio: "24/7" }}><Placeholder label={biz.name} /></figure>
      <section className="wrap split2" style={{ paddingBlock: "clamp(24px, 4vw, 44px)", display: "grid", gridTemplateColumns: "minmax(0,1.5fr) minmax(0,1fr)", gap: "clamp(28px, 5vw, 56px)", alignItems: "start" }}>
        <div>
          <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12, flexWrap: "wrap" }}><span className="tag tag-accent">{biz.category}</span><span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, color: "var(--color-accent)" }}>★ {biz.rating}</span><span style={{ fontSize: 13, color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }}>{biz.reviews} reviews · {biz.area}</span></div>
          <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(30px, 4.4vw, 56px)", lineHeight: 1, letterSpacing: "-0.02em", margin: "0 0 14px", textTransform: "uppercase" }}>{biz.name}</h1>
          <p style={{ fontSize: 16, lineHeight: 1.65, margin: "0 0 28px", maxWidth: "60ch", color: "color-mix(in srgb, var(--color-text) 82%, transparent)" }}>{biz.about}</p>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 22, margin: "0 0 4px", textTransform: "uppercase" }}>Services</h2>
          {biz.services.map((s) => (
            <div key={s.name} className="row-line" style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) auto auto auto", gap: 16, alignItems: "center", padding: "16px 0", borderTop: "1px solid var(--color-divider)" }}>
              <div><div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 16 }}>{s.name}</div><div style={{ fontSize: 13, color: "color-mix(in srgb, var(--color-text) 60%, transparent)" }}>{s.desc}</div></div>
              <div className="row-sub" style={{ fontSize: 13, color: "color-mix(in srgb, var(--color-text) 58%, transparent)" }}>{s.min} min</div>
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 16, color: "var(--color-accent)" }}>{money(s.price)}</div>
              <Link href={`/booking/business/${biz.slug}/book`} className="btn btn-primary" style={{ padding: "8px 16px" }}>Book</Link>
            </div>
          ))}
        </div>
        <aside style={{ border: "2px solid var(--color-divider)", position: "sticky", top: 90 }}>
          <div style={{ padding: 20, borderBottom: "2px solid var(--color-divider)" }}><Link href={`/booking/business/${biz.slug}/book`} className="btn btn-primary" style={{ width: "100%", justifyContent: "center", padding: "13px 20px" }}>Book an appointment</Link></div>
          <div style={{ padding: 20 }}>
            <div className="eyebrow" style={{ marginBottom: 12 }}>Opening hours</div>
            {HOURS.map(([d, t]) => <div key={d} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", fontSize: 13.5 }}><span style={{ color: "color-mix(in srgb, var(--color-text) 62%, transparent)" }}>{d}</span><span style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}>{t}</span></div>)}
            <div style={{ fontSize: 13, color: "color-mix(in srgb, var(--color-text) 60%, transparent)", marginTop: 14, paddingTop: 14, borderTop: "1px solid var(--color-divider)" }}>{biz.addr}</div>
          </div>
        </aside>
      </section>
    </>
  );
}

export function BookingFlow({ biz }: { biz: Business }) {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [staff, setStaff] = useState<number | null>(null);
  const [date, setDate] = useState(0);
  const [time, setTime] = useState<string | null>(null);
  const [done, setDone] = useState<{ ref: string } | null>(null);

  const chosen = biz.services.filter((_, i) => selected.has(i));
  const totalNum = chosen.reduce((t, s) => t + s.price, 0);
  const totalMin = chosen.reduce((t, s) => t + s.min, 0);
  const staffName = staff != null ? biz.team[staff].name : "Any available";
  const taken = TAKEN_BY_DATE[date] ?? [];
  const whenLabel = time ? `${DOWS[date]} ${18 + date} Sep · ${time}` : "";
  const nextDisabled = [chosen.length === 0, false, time == null, false, false][step];
  const nextLabel = ["Choose specialist", "Skip — any specialist", "Enter details", "", ""][step];

  const confirm = async () => {
    const n = 100000 + ((totalNum * 37 + biz.slug.length * 911) % 899999);
    const ref = `BK-${n}`;
    await captureBooking("booking", { kind: "appointment", summary: `${chosen.map((s) => s.name).join(", ") || "appointment"} — ${biz.name}`, details: { biz: biz.name, staff: staffName, when: whenLabel, services: chosen.map((s) => s.name) }, refPrefix: "SLT" });
    setDone({ ref });
    try { window.scrollTo(0, 0); } catch { /* noop */ }
  };

  if (done) {
    return (
      <section className="wrap" style={{ paddingBlock: "clamp(40px, 7vw, 96px)", textAlign: "center", maxWidth: 1120, margin: "0 auto" }}>
        <div style={{ width: 60, height: 60, background: "var(--color-accent)", color: "var(--color-bg)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}><CheckIcon size={30} /></div>
        <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(32px, 5vw, 56px)", letterSpacing: "-0.02em", margin: "0 0 14px", textTransform: "uppercase" }}>You&apos;re booked in</h1>
        <p style={{ fontSize: 17, lineHeight: 1.6, margin: "0 auto 32px", maxWidth: "46ch", color: "color-mix(in srgb, var(--color-text) 78%, transparent)" }}>{staffName} · {whenLabel} · {chosen.map((s) => s.name).join(", ") || "appointment"} at {biz.name}.</p>
        <div style={{ maxWidth: 460, margin: "0 auto 32px", border: "2px solid var(--color-divider)", textAlign: "left" }}>
          <div style={{ display: "flex", gap: 16, padding: "18px 20px", alignItems: "center" }}><div style={{ width: 56, height: 56, flex: "0 0 auto", background: "repeating-linear-gradient(45deg, var(--color-text) 0 3px, transparent 3px 6px)" }} /><div><div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 15 }}>{done.ref}</div><div style={{ fontSize: 12, color: "color-mix(in srgb, var(--color-text) 58%, transparent)" }}>Show this at the front desk</div></div></div>
        </div>
        <Link href="/booking/discover" className="btn btn-primary" style={{ padding: "12px 24px" }}>Find more</Link>
      </section>
    );
  }

  return (
    <div>
      <section style={{ borderBottom: "2px solid var(--color-divider)" }}>
        <div className="wrap" style={{ display: "flex", alignItems: "center", gap: 16, paddingBlock: 14, flexWrap: "wrap" }}>
          <Link href={`/booking/business/${biz.slug}`} className="btn btn-ghost" style={{ padding: "6px 4px" }}>← {biz.name}</Link>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 4px", marginLeft: "auto" }}>
            {STEP_NAMES.map((label, i) => {
              const d = i < step, a = i === step;
              return (
                <button key={label} type="button" onClick={() => i <= step && setStep(i)} style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: 0, cursor: i <= step ? "pointer" : "default", padding: "6px 8px" }}>
                  <span style={{ width: 24, height: 24, flex: "0 0 auto", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 11, background: a || d ? "var(--color-accent)" : "transparent", color: a || d ? "var(--color-bg)" : "color-mix(in srgb, var(--color-text) 55%, transparent)", border: `2px solid ${a || d ? "var(--color-accent)" : "var(--color-divider)"}` }}>{d ? "✓" : i + 1}</span>
                  <span className="hide-mobile" style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 11, letterSpacing: "0.04em", textTransform: "uppercase", color: a ? "var(--color-text)" : "color-mix(in srgb, var(--color-text) 50%, transparent)" }}>{label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>
      <section className="wrap bookgrid" style={{ paddingBlock: "clamp(24px, 4vw, 44px)", display: "grid", gridTemplateColumns: "minmax(0,1.5fr) minmax(0,1fr)", gap: "clamp(28px, 5vw, 56px)", alignItems: "start" }}>
        <div>
          {step === 0 && (
            <div>
              <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(26px, 4vw, 42px)", letterSpacing: "-0.02em", margin: "0 0 6px", textTransform: "uppercase" }}>Choose services</h1>
              <p style={{ fontSize: 15, color: "color-mix(in srgb, var(--color-text) 65%, transparent)", margin: "0 0 20px" }}>Add one or more to book together.</p>
              {biz.services.map((s, i) => {
                const on = selected.has(i);
                return (
                  <button key={s.name} type="button" onClick={() => setSelected((prev) => { const n = new Set(prev); if (n.has(i)) n.delete(i); else n.add(i); return n; })} style={{ width: "100%", display: "grid", gridTemplateColumns: "28px 1fr auto auto", gap: 16, alignItems: "center", padding: "16px 0", borderTop: "2px solid var(--color-divider)", background: "none", cursor: "pointer", textAlign: "left" }}>
                    <span style={{ width: 24, height: 24, border: `2px solid ${on ? "var(--color-accent)" : "var(--color-divider)"}`, background: on ? "var(--color-accent)" : "transparent", color: "var(--color-bg)", display: "flex", alignItems: "center", justifyContent: "center" }}>{on ? <CheckIcon size={13} /> : null}</span>
                    <span><span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 16, display: "block" }}>{s.name}</span><span style={{ fontSize: 13, color: "color-mix(in srgb, var(--color-text) 60%, transparent)" }}>{s.desc}</span></span>
                    <span style={{ fontSize: 13, color: "color-mix(in srgb, var(--color-text) 58%, transparent)" }}>{s.min} min</span>
                    <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 16, color: "var(--color-accent)" }}>{money(s.price)}</span>
                  </button>
                );
              })}
            </div>
          )}
          {step === 1 && (
            <div>
              <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(26px, 4vw, 42px)", letterSpacing: "-0.02em", margin: "0 0 6px", textTransform: "uppercase" }}>Pick a specialist</h1>
              <p style={{ fontSize: 15, color: "color-mix(in srgb, var(--color-text) 65%, transparent)", margin: "0 0 24px" }}>Or take the first available.</p>
              <div className="staffgrid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, background: "var(--color-divider)", border: "2px solid var(--color-divider)" }}>
                {biz.team.map((m, i) => (
                  <button key={m.name} type="button" onClick={() => { setStaff(i); setStep(2); }} style={{ background: staff === i ? "var(--color-accent)" : "var(--color-bg)", color: staff === i ? "var(--color-bg)" : "var(--color-text)", border: 0, cursor: "pointer", textAlign: "left", padding: 0 }}>
                    <figure className="grayscale" style={{ margin: 0, aspectRatio: "1/1" }}><Placeholder label={m.name} /></figure>
                    <div style={{ padding: "14px 16px 18px" }}><div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 15 }}>{m.name}</div><div style={{ fontSize: 12, opacity: 0.7, marginTop: 2 }}>{m.role}</div></div>
                  </button>
                ))}
              </div>
            </div>
          )}
          {step === 2 && (
            <div>
              <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(26px, 4vw, 42px)", letterSpacing: "-0.02em", margin: "0 0 6px", textTransform: "uppercase" }}>Date &amp; time</h1>
              <p style={{ fontSize: 15, color: "color-mix(in srgb, var(--color-text) 65%, transparent)", margin: "0 0 20px" }}>{totalMin ? `${totalMin} min` : ""} with {staffName}.</p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
                {DOWS.map((dow, i) => <button key={dow} type="button" onClick={() => { setDate(i); setTime(null); }} className="btn" style={{ flexDirection: "column", padding: "10px 14px", border: "1px solid var(--color-divider)", background: date === i ? "var(--color-text)" : "transparent", color: date === i ? "var(--color-bg)" : "var(--color-text)", minWidth: 58 }}><span style={{ fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", opacity: 0.7 }}>{dow}</span><span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 17 }}>{18 + i}</span></button>)}
              </div>
              <div className="eyebrow" style={{ marginBottom: 12 }}>Available times</div>
              <div className="slots" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8 }}>
                {ALL_TIMES.map((t) => { const isTaken = taken.includes(t); return <button key={t} type="button" disabled={isTaken} onClick={() => setTime(t)} className="btn" style={{ padding: "10px 8px", border: "1px solid var(--color-divider)", background: time === t ? "var(--color-text)" : isTaken ? "color-mix(in srgb, var(--color-text) 6%, transparent)" : "transparent", color: time === t ? "var(--color-bg)" : "var(--color-text)" }}>{t}</button>; })}
              </div>
            </div>
          )}
          {step === 3 && (
            <div>
              <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(26px, 4vw, 42px)", letterSpacing: "-0.02em", margin: "0 0 6px", textTransform: "uppercase" }}>Your details</h1>
              <p style={{ fontSize: 15, color: "color-mix(in srgb, var(--color-text) 65%, transparent)", margin: "0 0 24px" }}>We&apos;ll text a reminder before your visit.</p>
              <form onSubmit={(e) => { e.preventDefault(); setStep(4); }} style={{ display: "grid", gap: 18 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}><div className="field"><label htmlFor="bk-fn">First name</label><input id="bk-fn" className="input" required /></div><div className="field"><label htmlFor="bk-ln">Last name</label><input id="bk-ln" className="input" required /></div></div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}><div className="field"><label htmlFor="bk-mob">Mobile</label><input id="bk-mob" className="input" required /></div><div className="field"><label htmlFor="bk-em">Email</label><input id="bk-em" className="input" type="email" required /></div></div>
                <div className="field"><label htmlFor="bk-notes">Notes (optional)</label><textarea id="bk-notes" className="input" /></div>
                <button type="submit" className="btn btn-primary" style={{ padding: "13px 24px", justifyContent: "flex-start" }}>Continue to payment</button>
              </form>
            </div>
          )}
          {step === 4 && (
            <div>
              <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(26px, 4vw, 42px)", letterSpacing: "-0.02em", margin: "0 0 6px", textTransform: "uppercase" }}>Confirm &amp; pay</h1>
              <p style={{ fontSize: 15, color: "color-mix(in srgb, var(--color-text) 65%, transparent)", margin: "0 0 24px" }}>A {BOOKING.deposit} deposit holds your slot; balance due in-store.</p>
              <form onSubmit={(e) => { e.preventDefault(); confirm(); }} style={{ display: "grid", gap: 18 }}>
                <div className="field"><label htmlFor="bk-card">Card number</label><input id="bk-card" className="input" required placeholder="4242 4242 4242 4242" /></div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}><div className="field"><label htmlFor="bk-exp">Expiry</label><input id="bk-exp" className="input" required placeholder="MM / YY" /></div><div className="field"><label htmlFor="bk-cvc">CVC</label><input id="bk-cvc" className="input" required placeholder="123" /></div></div>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}><button type="submit" className="btn btn-primary" style={{ padding: "13px 24px", justifyContent: "flex-start" }}>Pay {BOOKING.deposit} &amp; book</button><button type="button" className="btn btn-secondary" onClick={confirm} style={{ padding: "13px 20px" }}>Pay in store</button></div>
              </form>
            </div>
          )}
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginTop: 32, paddingTop: 24, borderTop: "2px solid var(--color-divider)" }}>
            {step > 0 ? <button type="button" className="btn btn-secondary" onClick={() => setStep(Math.max(0, step - 1))} style={{ padding: "11px 20px" }}>Back</button> : <span />}
            {step <= 2 ? <button type="button" className="btn btn-primary" onClick={() => !nextDisabled && setStep(step + 1)} disabled={nextDisabled} style={{ padding: "11px 22px" }}>{nextLabel}</button> : null}
          </div>
        </div>
        <aside className="summary" style={{ border: "2px solid var(--color-divider)", position: "sticky", top: 90 }}>
          <figure className="grayscale" style={{ margin: 0, aspectRatio: "16/9", borderBottom: "2px solid var(--color-divider)" }}><Placeholder /></figure>
          <div style={{ padding: 20 }}>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 18, marginBottom: 2 }}>{biz.name}</div>
            <div style={{ fontSize: 13, color: "color-mix(in srgb, var(--color-text) 58%, transparent)", marginBottom: 16 }}>{biz.addr}</div>
            <div className="eyebrow" style={{ marginBottom: 10 }}>Your booking</div>
            {chosen.length ? chosen.map((s) => <div key={s.name} style={{ display: "flex", justifyContent: "space-between", gap: 12, padding: "8px 0", borderBottom: "1px solid var(--color-divider)", fontSize: 14 }}><span>{s.name}</span><span style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}>{money(s.price)}</span></div>) : <div style={{ fontSize: 14, color: "color-mix(in srgb, var(--color-text) 55%, transparent)", padding: "8px 0" }}>No services selected yet.</div>}
            {time ? <div style={{ display: "flex", justifyContent: "space-between", gap: 12, padding: "10px 0", marginTop: 4, borderTop: "1px solid var(--color-divider)", fontSize: 14 }}><span style={{ color: "color-mix(in srgb, var(--color-text) 60%, transparent)" }}>When</span><span style={{ fontFamily: "var(--font-heading)", fontWeight: 600, textAlign: "right" }}>{whenLabel}</span></div> : null}
            {staff != null ? <div style={{ display: "flex", justifyContent: "space-between", gap: 12, padding: "6px 0", fontSize: 14 }}><span style={{ color: "color-mix(in srgb, var(--color-text) 60%, transparent)" }}>With</span><span style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}>{staffName}</span></div> : null}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "12px 0 0", marginTop: 8, borderTop: "2px solid var(--color-divider)", fontFamily: "var(--font-heading)", fontWeight: 800 }}><span style={{ fontSize: 16 }}>Total</span><span style={{ fontSize: 22, color: "var(--color-accent)" }}>${totalNum}</span></div>
            <div style={{ fontSize: 12, color: "color-mix(in srgb, var(--color-text) 55%, transparent)", marginTop: 6 }}>{totalMin || 0} min · {BOOKING.deposit} deposit today</div>
          </div>
        </aside>
      </section>
    </div>
  );
}

export function PricingClient() {
  const [modal, setModal] = useState(false);
  const [confirm, setConfirm] = useState(false);
  return (
    <>
      <section className="wrap" style={{ paddingBlock: "clamp(24px, 3vw, 44px) clamp(48px, 6vw, 80px)" }}>
        <div className="grid3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, background: "var(--color-divider)", border: "2px solid var(--color-divider)" }}>
          {[{ name: "Starter", tagline: "Solo", price: "$0", per: "", perks: ["Booking page", "Up to 40 bookings/mo", "Reminders", "2.9% + card fee"], f: false }, { name: "Pro", tagline: "Most popular", price: "$29", per: "/mo", perks: ["Unlimited bookings", "Deposits & no-show fees", "Up to 5 staff", "Lower card fees"], f: true }, { name: "Team", tagline: "Multi-location", price: "$79", per: "/mo", perks: ["Everything in Pro", "Unlimited staff & locations", "Analytics & payroll", "Priority support"], f: false }].map((pl) => (
            <div key={pl.name} style={{ background: pl.f ? "var(--color-accent)" : "var(--color-bg)", color: pl.f ? "var(--color-bg)" : "var(--color-text)", padding: "clamp(24px, 3vw, 40px)", display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.8, marginBottom: 16 }}>{pl.tagline}</div>
              <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 26, margin: "0 0 8px" }}>{pl.name}</h3>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 22 }}><span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(30px, 4vw, 44px)" }}>{pl.price}</span><span style={{ fontSize: 14, opacity: 0.7 }}>{pl.per}</span></div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28, flex: 1 }}>{pl.perks.map((pk) => <div key={pk} style={{ display: "flex", gap: 10, alignItems: "baseline", fontSize: 14, lineHeight: 1.4 }}><span style={{ fontWeight: 800 }}>—</span><span>{pk}</span></div>)}</div>
              <button type="button" onClick={() => setModal(true)} className={pl.f ? "btn" : "btn btn-primary"} style={{ padding: "12px 20px", ...(pl.f ? { background: "var(--color-bg)", color: "var(--color-accent)" } : {}) }}>{pl.name === "Starter" ? "Start free" : `Choose ${pl.name}`}</button>
            </div>
          ))}
        </div>
      </section>
      <Modal open={modal} onClose={() => setModal(false)} width={520} showClose={false}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 18, textTransform: "uppercase" }}>List your business</span></div>
        <form onSubmit={(e) => { e.preventDefault(); setModal(false); setConfirm(true); }} style={{ display: "grid", gap: 16 }}>
          <div className="field"><label htmlFor="lb-name">Business name</label><input id="lb-name" className="input" required /></div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}><div className="field"><label htmlFor="lb-cat">Category</label><select id="lb-cat" className="input" style={{ minHeight: 42 }}><option>Barber</option><option>Beauty & spa</option><option>Tattoo</option><option>Petcare</option><option>Home services</option><option>Medical</option></select></div><div className="field"><label htmlFor="lb-city">City</label><input id="lb-city" className="input" required /></div></div>
          <div className="field"><label htmlFor="lb-em">Work email</label><input id="lb-em" className="input" type="email" required /></div>
          <button type="submit" className="btn btn-primary" style={{ padding: "13px 24px", justifyContent: "flex-start" }}>Create my page</button>
        </form>
      </Modal>
      <ConfirmModal open={confirm} onClose={() => setConfirm(false)} title="Your page is live" body={`Welcome to ${BOOKING.brand}. Add your services and hours, and you can take bookings right away.`} />
    </>
  );
}

export function ProviderDashboard() {
  const [stages, setStages] = usePersistentState<Record<string, number>>("booking.appt", {});
  const stageOf = (i: number) => (stages[`a${i}`] != null ? stages[`a${i}`] : APPTS[i].base);
  return (
    <section className="wrap" style={{ paddingBlock: "clamp(20px, 3vw, 36px) clamp(48px, 6vw, 80px)" }}>
      <div className="grid4" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 2, background: "var(--color-divider)", border: "2px solid var(--color-divider)", marginBottom: "clamp(24px, 3vw, 40px)" }}>
        {DASH_STATS.map((s) => <div key={s.label} style={{ background: "var(--color-bg)", padding: 22 }}><div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(26px, 3vw, 40px)", color: "var(--color-accent)", lineHeight: 1 }}>{s.num}</div><div style={{ fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase", color: "color-mix(in srgb, var(--color-text) 58%, transparent)", marginTop: 8 }}>{s.label}</div></div>)}
      </div>
      <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 22, margin: "0 0 4px" }}>Today&apos;s appointments</h2>
      {APPTS.map((a, i) => {
        const cur = stageOf(i);
        const done = cur >= 2;
        return (
          <div key={i} className="row-line" style={{ display: "grid", gridTemplateColumns: "90px 44px minmax(0,1fr) minmax(0,0.8fr) auto auto", gap: 16, alignItems: "center", padding: "16px 0", borderTop: "2px solid var(--color-divider)" }}>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 15, fontVariantNumeric: "tabular-nums" }}>{a.time}</div>
            <figure className="grayscale" style={{ margin: 0, width: 36, height: 36, border: "1px solid var(--color-divider)" }}><Placeholder /></figure>
            <div><div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 15 }}>{a.client}</div><div style={{ fontSize: 12, color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }}>{a.service}</div></div>
            <div className="row-sub" style={{ fontSize: 13, color: "color-mix(in srgb, var(--color-text) 60%, transparent)" }}>{a.staff} · {a.dur}</div>
            <span className={`tag ${STAGE_TAGS[cur]}`}>{STAGE_NAMES[cur]}</span>
            <button type="button" onClick={() => setStages((s) => ({ ...s, [`a${i}`]: Math.min(2, cur + 1) }))} disabled={done} className={done ? "btn btn-secondary" : "btn btn-primary"} style={{ padding: "7px 14px", fontSize: 12 }}>{done ? "Done" : cur === 0 ? "Check in" : "Complete"}</button>
          </div>
        );
      })}
    </section>
  );
}
