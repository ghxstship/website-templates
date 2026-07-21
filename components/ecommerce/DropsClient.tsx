"use client";

import { useState } from "react";
import type { Drop } from "@/lib/ecommerce";
import { BID_STEP } from "@/lib/ecommerce";
import { Placeholder } from "@/components/Placeholder";
import { CheckIcon } from "@/components/icons";
import { usePersistentState } from "@/lib/persist";

type Confirm = { title: string; body: string };

/**
 * Live "Drops" auction grid. Each lot shows the current bid; "Bid" raises it by
 * $BID_STEP, marks the viewer as the top bidder, and surfaces a confirm modal —
 * mirroring the v4 prototype's bid/top-bidder/confirm flow. Bids persist locally
 * so a refresh keeps the auction state (keyed "ecom.bids" / "ecom.myBids").
 */
export function DropsClient({ drops }: { drops: Drop[] }) {
  // Map of lot id → current bid (whole dollars). Absent = still at opening bid.
  const [bids, setBids] = usePersistentState<Record<string, number>>("ecom.bids", {});
  // Lots where the viewer currently holds the top bid.
  const [myBids, setMyBids] = usePersistentState<Record<string, boolean>>("ecom.myBids", {});
  const [confirm, setConfirm] = useState<Confirm | null>(null);

  const currentOf = (d: Drop) => (bids[d.id] != null ? bids[d.id] : d.base);

  const placeBid = (d: Drop) => {
    const next = currentOf(d) + BID_STEP;
    setBids((b) => ({ ...b, [d.id]: next }));
    setMyBids((m) => ({ ...m, [d.id]: true }));
    setConfirm({
      title: "Bid placed",
      body: `You're the top bid on ${d.name} at $${next}. We'll alert you if you're outbid.`,
    });
  };

  return (
    <>
      <section className="wrap" style={{ paddingBlock: "clamp(24px, 3vw, 44px) clamp(48px, 6vw, 80px)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 2, background: "var(--color-divider)", border: "2px solid var(--color-divider)" }}>
          {drops.map((d) => {
            const current = currentOf(d);
            const youLead = !!myBids[d.id];
            const bidderCount = d.bidders + (youLead ? 1 : 0);
            return (
              <div key={d.id} style={{ background: "var(--color-bg)", display: "flex", flexDirection: "column" }}>
                <figure className="grayscale" style={{ margin: 0, aspectRatio: "1/1", borderBottom: "2px solid var(--color-divider)", position: "relative" }}>
                  <Placeholder label={d.name} />
                  <span className="tag" style={{ position: "absolute", top: 10, left: 10, background: "var(--color-accent)", color: "var(--color-bg)" }}>{d.ends}</span>
                </figure>
                <div style={{ padding: "18px 20px 22px", flex: 1, display: "flex", flexDirection: "column" }}>
                  <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 17, margin: "0 0 10px" }}>{d.name}</h3>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
                    <span style={{ fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase", color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }}>Current bid</span>
                    <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 20, color: "var(--color-accent)" }}>${current}</span>
                  </div>
                  <div style={{ fontSize: 12, color: "color-mix(in srgb, var(--color-text) 55%, transparent)", marginBottom: 16 }}>{bidderCount} bidders</div>
                  {youLead ? (
                    <div style={{ fontSize: 12, color: "var(--color-accent-700)", fontFamily: "var(--font-heading)", fontWeight: 800, marginBottom: 10 }}>You're the top bid</div>
                  ) : null}
                  <button type="button" className="btn btn-primary" onClick={() => placeBid(d)} style={{ justifyContent: "center", padding: "11px 16px", marginTop: "auto" }}>
                    Bid ${current + BID_STEP}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <p style={{ fontSize: 13, color: "color-mix(in srgb, var(--color-text) 58%, transparent)", marginTop: 20, maxWidth: "60ch" }}>
          Drops are one-off and limited-run pieces sold by live auction. Bids raise in ${BID_STEP} increments; you&apos;ll be notified if you&apos;re outbid before the timer ends.
        </p>
      </section>

      {confirm ? (
        <div onClick={() => setConfirm(null)} style={{ position: "fixed", inset: 0, zIndex: 95, background: "color-mix(in srgb, var(--color-text) 90%, transparent)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" style={{ width: "min(460px, 100%)", background: "var(--color-bg)", border: "2px solid var(--color-accent)", padding: "clamp(28px, 4vw, 48px)" }}>
            <div style={{ width: 48, height: 48, background: "var(--color-accent)", color: "var(--color-bg)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 22 }}>
              <CheckIcon size={24} />
            </div>
            <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 28, letterSpacing: "-0.015em", margin: "0 0 12px" }}>{confirm.title}</h3>
            <p style={{ fontSize: 15.5, lineHeight: 1.6, margin: "0 0 26px", color: "color-mix(in srgb, var(--color-text) 78%, transparent)" }}>{confirm.body}</p>
            <button type="button" className="btn btn-primary" onClick={() => setConfirm(null)} style={{ padding: "12px 22px" }}>Continue browsing</button>
          </div>
        </div>
      ) : null}
    </>
  );
}
