"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { usePersistentState } from "@/lib/persist";
import { announce } from "@/lib/announce";
import { ConfirmModal } from "@/components/ds/ConfirmModal";
import { captureMessage } from "@/lib/actions";
import { MEMBERSHIP, TIER_NAMES, type Tier } from "@/lib/membership";

type Status = "guest" | "pending" | "member";
type Ctx = {
  status: Status; tier: Tier; applyRef: string;
  usedPerks: string[]; votes: Record<string, string>; decisions: Record<string, string>;
  isMember: boolean; tierName: string; memberChip: string; ctaLabel: string;
  submitApply: (name: string, email: string) => Promise<void>;
  simulateApprove: () => void;
  resetApply: () => void;
  chooseTier: (key: Tier, name: string) => void;
  redeemPerk: (i: number, name: string, venue: string) => void;
  vote: (proposalId: string, title: string, option: string) => void;
  decide: (appId: string, decision: "Approved" | "Declined") => void;
  notify: (title: string, body: string) => void;
};
const MembershipCtx = createContext<Ctx | null>(null);

export function MembershipProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = usePersistentState<Status>("membership.status", "guest");
  const [tier, setTier] = usePersistentState<Tier>("membership.tier", "resident");
  const [applyRef, setApplyRef] = usePersistentState("membership.applyRef", "");
  const [usedPerks, setUsedPerks] = usePersistentState<string[]>("membership.usedPerks", []);
  const [votes, setVotes] = usePersistentState<Record<string, string>>("membership.votes", {});
  const [decisions, setDecisions] = usePersistentState<Record<string, string>>("membership.decisions", {});
  const [confirm, setConfirm] = useState<{ title: string; body: string } | null>(null);

  const isMember = status === "member";
  const tierName = TIER_NAMES[tier];
  const memberChip = isMember ? `${tierName} · No. 4021` : "Sign in";
  const ctaLabel = isMember ? "Your pass" : "Request invite";

  const submitApply = useCallback(async (name: string, email: string) => {
    const res = await captureMessage("membership", { name, email, subject: "Membership application", message: `Application to ${MEMBERSHIP.brand}` });
    setApplyRef(res.ref ?? `APP-${(name.length * 173 + 1000) % 9999}`);
    setStatus("pending");
  }, [setApplyRef, setStatus]);

  const simulateApprove = useCallback(() => {
    setStatus("member");
    announce("Membership approved");
    setConfirm({ title: "You’re in", body: `Welcome to ${MEMBERSHIP.brand}. Your Resident membership is live — explore the ecosystem with your new pass.` });
  }, [setStatus]);

  const resetApply = useCallback(() => { setStatus("guest"); setApplyRef(""); }, [setStatus, setApplyRef]);

  const chooseTier = useCallback((key: Tier, name: string) => {
    setStatus("member"); setTier(key);
    setConfirm({ title: `Welcome, ${name}`, body: `Your ${name} membership is active. Your pass and perk wallet are ready.` });
  }, [setStatus, setTier]);

  const redeemPerk = useCallback((i: number, name: string, venue: string) => {
    setUsedPerks((prev) => (prev.includes(String(i)) ? prev : [...prev, String(i)]));
    setConfirm({ title: "Perk redeemed", body: `${name} has been added to your pass — show the QR at ${venue.split("(")[0].trim()}.` });
  }, [setUsedPerks]);

  const vote = useCallback((proposalId: string, title: string, option: string) => {
    setVotes((prev) => ({ ...prev, [proposalId]: option }));
    setConfirm({ title: "Vote recorded", body: `Your “${option}” vote on “${title}” is on the ledger. You can change it until voting closes.` });
  }, [setVotes]);

  const decide = useCallback((appId: string, decision: "Approved" | "Declined") => {
    setDecisions((prev) => ({ ...prev, [appId]: decision }));
  }, [setDecisions]);

  const notify = useCallback((title: string, body: string) => setConfirm({ title, body }), []);

  return (
    <MembershipCtx.Provider value={{ status, tier, applyRef, usedPerks, votes, decisions, isMember, tierName, memberChip, ctaLabel, submitApply, simulateApprove, resetApply, chooseTier, redeemPerk, vote, decide, notify }}>
      {children}
      <ConfirmModal open={!!confirm} onClose={() => setConfirm(null)} title={confirm?.title ?? ""} body={confirm?.body ?? ""} />
    </MembershipCtx.Provider>
  );
}

export function useMembership() {
  const c = useContext(MembershipCtx);
  if (!c) throw new Error("useMembership within provider");
  return c;
}
