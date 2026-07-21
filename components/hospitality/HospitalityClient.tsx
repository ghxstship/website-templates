"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Placeholder } from "@/components/Placeholder";
import { SaveHeart } from "@/components/ds/SaveHeart";
import { useFavorites } from "@/lib/useFavorites";
import { ROOMS, RESIDENCES, OFFERS } from "@/lib/hospitality";
import { useHospitality } from "./HospitalityContext";

export function HomeSearch() {
  const router = useRouter();
  const { checkIn, checkOut, guests, setCheckIn, setCheckOut, setGuests } = useHospitality();
  return (
    <form
      onSubmit={(e) => { e.preventDefault(); router.push("/hospitality/rooms"); }}
      className="searchrow"
      style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", gap: 12, maxWidth: 820, border: "2px solid var(--color-divider)", padding: 12 }}
    >
      <div className="field" style={{ margin: 0 }}><label>Check in</label><input className="input" type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} style={{ border: 0, minHeight: 42 }} /></div>
      <div className="field" style={{ margin: 0 }}><label>Check out</label><input className="input" type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} style={{ border: 0, minHeight: 42 }} /></div>
      <div className="field" style={{ margin: 0 }}><label>Guests</label><input className="input" value={guests} onChange={(e) => setGuests(e.target.value)} style={{ border: 0, minHeight: 42 }} /></div>
      <button type="submit" className="btn btn-primary" style={{ alignSelf: "end", padding: "12px 24px" }}>Check availability</button>
    </form>
  );
}

export function FeaturedRooms() {
  const { openReserve } = useHospitality();
  return (
    <div className="grid3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, background: "var(--color-divider)", border: "2px solid var(--color-divider)" }}>
      {ROOMS.slice(0, 3).map((r) => (
        <button key={r.slug} type="button" onClick={() => openReserve(r.name, r.num)} style={{ background: "var(--color-bg)", cursor: "pointer", border: 0, textAlign: "left", padding: 0, font: "inherit", color: "inherit" }}>
          <figure className="grayscale" style={{ margin: 0, aspectRatio: "4/3" }}><Placeholder label={r.name} /></figure>
          <div style={{ padding: "16px 18px 20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}><h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 18, margin: 0 }}>{r.name}</h3><span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, color: "var(--color-accent)" }}>${r.num}</span></div>
            <div style={{ fontSize: 13, color: "color-mix(in srgb, var(--color-text) 60%, transparent)", marginTop: 6 }}>{r.sleeps} · {r.size}</div>
          </div>
        </button>
      ))}
    </div>
  );
}

export function RoomsList() {
  const { openReserve, nights, guests } = useHospitality();
  const fav = useFavorites("hospitality", "Room");
  const [showSaved, setShowSaved] = useState(false);
  const rows = showSaved ? ROOMS.filter((r) => fav.isSaved(r.slug)) : ROOMS;
  const nightsLabel = `${nights} ${nights === 1 ? "night" : "nights"} · ${guests}`;
  return (
    <>
      <section className="wrap" style={{ paddingBlock: "8px 0" }}><div className="kicker">{nightsLabel}</div></section>
      <section className="wrap" style={{ paddingBlock: "16px 0" }}>
        <button type="button" onClick={() => setShowSaved((v) => !v)} className={`btn ${showSaved ? "btn-primary" : "btn-secondary"}`} style={{ padding: "8px 16px", border: "1px solid var(--color-divider)" }}>
          {showSaved ? `Showing favorites · ${fav.count}` : `Favorites · ${fav.count}`}
        </button>
      </section>
      <section className="wrap" style={{ paddingBlock: "clamp(24px, 3vw, 44px) clamp(48px, 6vw, 80px)" }}>
        {showSaved && rows.length === 0 ? (
          <p style={{ fontSize: 16, color: "color-mix(in srgb, var(--color-text) 60%, transparent)", padding: "16px 0" }}>No favorites yet. Tap the heart on a room to add it here.</p>
        ) : null}
        {rows.map((r) => (
          <div key={r.slug} className="split2" style={{ display: "grid", gridTemplateColumns: "minmax(0, 0.6fr) minmax(0, 1fr)", gap: "clamp(24px, 4vw, 56px)", alignItems: "center", paddingBlock: "clamp(24px, 3vw, 40px)", borderTop: "2px solid var(--color-divider)" }}>
            <figure className="grayscale" style={{ margin: 0, aspectRatio: "4/3", border: "2px solid var(--color-divider)", position: "relative" }}>
              <Placeholder label={r.name} />
              <SaveHeart overlay active={fav.isSaved(r.slug)} onToggle={() => fav.toggle(r.slug, r.name)} label="Save room" size={17} />
            </figure>
            <div>
              <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 12, flexWrap: "wrap" }}><span className="tag tag-neutral">{r.sleeps}</span><span style={{ fontSize: 13, color: "color-mix(in srgb, var(--color-text) 60%, transparent)" }}>{r.size}</span></div>
              <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(22px, 3vw, 34px)", letterSpacing: "-0.015em", margin: "0 0 12px" }}>{r.name}</h2>
              <p style={{ fontSize: 15.5, lineHeight: 1.6, margin: "0 0 18px", maxWidth: "52ch", color: "color-mix(in srgb, var(--color-text) 80%, transparent)" }}>{r.desc}</p>
              <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
                <div><span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 22, color: "var(--color-accent)" }}>${r.num}</span> <span style={{ fontSize: 13, color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }}>/ night</span></div>
                <button type="button" className="btn btn-primary" onClick={() => openReserve(r.name, r.num)} style={{ padding: "10px 20px" }}>Reserve</button>
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}

export function ResidencesGrid() {
  const { enquireResidence } = useHospitality();
  return (
    <div className="grid3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, background: "var(--color-divider)", border: "2px solid var(--color-divider)" }}>
      {RESIDENCES.map((r) => (
        <div key={r.name} style={{ background: "var(--color-bg)", display: "flex", flexDirection: "column" }}>
          <figure className="grayscale" style={{ margin: 0, aspectRatio: "4/3" }}><Placeholder label={r.name} /></figure>
          <div style={{ padding: "18px 20px 22px", flex: 1, display: "flex", flexDirection: "column" }}>
            <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 19, margin: "0 0 4px" }}>{r.name}</h3>
            <div style={{ fontSize: 13, color: "color-mix(in srgb, var(--color-text) 60%, transparent)", marginBottom: 14 }}>{r.meta}</div>
            <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, color: "var(--color-accent)" }}>{r.price}</span>
              <button type="button" className="btn btn-secondary" onClick={() => enquireResidence(r.name)} style={{ padding: "8px 14px" }}>Enquire</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function OffersList() {
  const { openReserve } = useHospitality();
  return (
    <>
      {OFFERS.map((o) => (
        <div key={o.name} className="row-line" style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.5fr) minmax(0, 1fr) auto", gap: 18, alignItems: "center", padding: "20px 0", borderTop: "2px solid var(--color-divider)" }}>
          <div><div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(18px, 2vw, 24px)" }}>{o.name}</div><div style={{ fontSize: 13, color: "color-mix(in srgb, var(--color-text) 60%, transparent)", marginTop: 4, maxWidth: "56ch" }}>{o.desc}</div></div>
          <div className="row-sub" style={{ fontSize: 14, color: "var(--color-accent-700)", fontFamily: "var(--font-heading)", fontWeight: 800 }}>{o.deal}</div>
          <button type="button" className="btn btn-primary" onClick={() => openReserve(`with ${o.name}`, o.rate)} style={{ padding: "9px 18px" }}>Book</button>
        </div>
      ))}
    </>
  );
}
