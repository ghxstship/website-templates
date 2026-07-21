"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { usePersistentState } from "@/lib/persist";
import { announce } from "@/lib/announce";
import { ConfirmModal } from "@/components/ds/ConfirmModal";
import { captureMessage } from "@/lib/actions";
import { SEED_REQUESTS, type Request } from "@/lib/concierge";

type Ctx = {
  requests: Request[];
  openCount: number;
  addRequest: (cat: string, detail: string, responseTime: string) => Promise<void>;
  withdraw: (id: string, title: string) => void;
  message: (manager: string) => void;
  notify: (title: string, body: string) => void;
};
const ConciergeCtx = createContext<Ctx | null>(null);

let counter = 0;

export function ConciergeProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [requests, setRequests] = usePersistentState<Request[]>("concierge.requests", SEED_REQUESTS);
  const [confirm, setConfirm] = useState<{ title: string; body: string; go?: boolean } | null>(null);

  const openCount = requests.filter((r) => r.status !== "Done").length;

  const addRequest = useCallback(async (cat: string, detail: string, responseTime: string) => {
    await captureMessage("concierge", { name: "Concierge member", email: "member@atlasconcierge.example", subject: `${cat} request`, message: detail || `New ${cat.toLowerCase()} request` });
    counter += 1;
    const req: Request = { id: `req-${counter}-${cat}`, title: `New ${cat.toLowerCase()} request`, cat, when: "Today", manager: "Sofia", status: "New" };
    setRequests((prev) => [req, ...prev]);
    announce("Request received");
    setConfirm({ title: "Request received", body: `Your ${cat.toLowerCase()} request is with your manager, Sofia. You’ll hear back ${responseTime}.`, go: true });
  }, [setRequests]);

  const withdraw = useCallback((id: string, title: string) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
    announce(`${title} withdrawn`);
    setConfirm({ title: "Request withdrawn", body: `${title} has been withdrawn. Your manager has been notified.` });
  }, [setRequests]);

  const message = useCallback((manager: string) => {
    setConfirm({ title: "Message sent", body: `Your note is with ${manager}. Expect a reply shortly.` });
  }, []);

  const notify = useCallback((title: string, body: string) => setConfirm({ title, body }), []);

  const close = () => {
    const shouldGo = confirm?.go;
    setConfirm(null);
    if (shouldGo) router.push("/concierge/requests");
  };

  return (
    <ConciergeCtx.Provider value={{ requests, openCount, addRequest, withdraw, message, notify }}>
      {children}
      <ConfirmModal open={!!confirm} onClose={close} title={confirm?.title ?? ""} body={confirm?.body ?? ""} doneLabel={confirm?.go ? "View my requests" : "Done"} />
    </ConciergeCtx.Provider>
  );
}

export function useConcierge() {
  const c = useContext(ConciergeCtx);
  if (!c) throw new Error("useConcierge within provider");
  return c;
}
