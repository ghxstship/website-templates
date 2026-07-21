"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { usePersistentState } from "@/lib/persist";
import { announce } from "@/lib/announce";
import { ConfirmModal } from "@/components/ds/ConfirmModal";
import { captureLead } from "@/lib/actions";
import { LEARNING, COURSES } from "@/lib/learning";

function courseTitle(slug: string): string {
  return COURSES.find((c) => c.slug === slug)?.title ?? slug;
}

type Ctx = {
  enrolled: Set<string>;
  done: Record<string, Set<number>>;
  posts: string[];
  likes: Set<string>;
  certificates: string[];
  enroll: (slug: string, title: string) => void;
  toggleLesson: (slug: string, lessonIdx: number, total: number) => void;
  isEnrolled: (slug: string) => boolean;
  doneCount: (slug: string) => number;
  hasCertificate: (slug: string) => boolean;
  addPost: (text: string) => void;
  toggleLike: (id: string) => void;
  join: (planName: string) => void;
};
const LearningCtx = createContext<Ctx | null>(null);

export function LearningProvider({ children }: { children: React.ReactNode }) {
  const [enrolled, setEnrolled] = useState<Set<string>>(new Set());
  const [done, setDone] = useState<Record<string, Set<number>>>({});
  const [posts, setPosts] = useState<string[]>([]);
  const [likes, setLikes] = useState<Set<string>>(new Set());
  const [certificates, setCertificates] = usePersistentState<string[]>("learning.certificates", []);
  const [confirm, setConfirm] = useState<{ title: string; body: string } | null>(null);

  const enroll = useCallback((slug: string, title: string) => {
    setEnrolled((s) => new Set(s).add(slug));
    setConfirm({ title: "Enrolled", body: `You now have lifetime access to ${title}. Jump into the first lesson whenever you're ready.` });
  }, []);

  const toggleLesson = useCallback((slug: string, lessonIdx: number, total: number) => {
    setDone((d) => {
      const set = new Set(d[slug] ?? []);
      if (set.has(lessonIdx)) set.delete(lessonIdx);
      else set.add(lessonIdx);
      if (set.size >= total && total > 0) {
        setCertificates((prev) => {
          if (prev.includes(slug)) return prev;
          announce(`Certificate earned for ${courseTitle(slug)}`);
          setConfirm({ title: "Certificate earned 🎓", body: `You’ve completed ${courseTitle(slug)}. Your certificate is now in your dashboard — congratulations.` });
          return [...prev, slug];
        });
      }
      return { ...d, [slug]: set };
    });
  }, [setCertificates]);

  const addPost = useCallback((text: string) => {
    const t = text.trim();
    if (t) setPosts((p) => [t, ...p]);
  }, []);

  const toggleLike = useCallback((id: string) => {
    setLikes((s) => { const n = new Set(s); if (n.has(id)) n.delete(id); else n.add(id); return n; });
  }, []);

  const join = useCallback(async (planName: string) => {
    await captureLead("learning", `member+${planName.toLowerCase()}@forge.example`, `plan:${planName}`);
    setConfirm({ title: `${planName} — you're in`, body: `Welcome to ${LEARNING.brand}. Your membership is active and every course is unlocked.` });
  }, []);

  return (
    <LearningCtx.Provider value={{ enrolled, done, posts, likes, certificates, enroll, toggleLesson, isEnrolled: (s) => enrolled.has(s), doneCount: (s) => (done[s]?.size ?? 0), hasCertificate: (s) => certificates.includes(s), addPost, toggleLike, join }}>
      {children}
      <ConfirmModal open={!!confirm} onClose={() => setConfirm(null)} title={confirm?.title ?? ""} body={confirm?.body ?? ""} doneLabel="Start learning" />
    </LearningCtx.Provider>
  );
}

export function useLearning() {
  const c = useContext(LearningCtx);
  if (!c) throw new Error("useLearning within provider");
  return c;
}
