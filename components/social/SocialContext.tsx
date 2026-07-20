"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { CloseIcon } from "@/components/icons";
import { SOCIAL, FEED, COMMUNITY_POSTS } from "@/lib/social";

type Toggle = Set<string>;

type Ctx = {
  myPosts: string[];
  likes: Toggle; reposts: Toggle; saves: Toggle; follows: Toggle; joined: Toggle; comments: Record<string, string[]>;
  votes: Record<string, number>;
  msgs: Record<number, string[]>;
  addPost: (t: string) => void;
  toggle: (kind: "likes" | "reposts" | "saves" | "follows" | "joined", id: string) => void;
  isOn: (kind: "likes" | "reposts" | "saves" | "follows" | "joined", id: string) => boolean;
  vote: (id: string, dir: number) => void;
  voteOf: (id: string) => number;
  sendMsg: (thread: number, t: string) => void;
  addComment: (id: string, t: string) => void;
  openComposer: () => void;
  openPost: (id: string) => void;
};
const SocialCtx = createContext<Ctx | null>(null);

export function SocialProvider({ children }: { children: React.ReactNode }) {
  const [myPosts, setMyPosts] = useState<string[]>([]);
  const [sets, setSets] = useState<Record<string, Set<string>>>({ likes: new Set(), reposts: new Set(), saves: new Set(), follows: new Set(), joined: new Set(["r/webdev"]) });
  const [votes, setVotes] = useState<Record<string, number>>({});
  const [msgs, setMsgs] = useState<Record<number, string[]>>({});
  const [comments, setComments] = useState<Record<string, string[]>>({});
  const [composerOpen, setComposerOpen] = useState(false);
  const [composer, setComposer] = useState("");
  const [openPostId, setOpenPostId] = useState<string | null>(null);
  const [reply, setReply] = useState("");

  const addPost = useCallback((t: string) => { const v = t.trim(); if (v) setMyPosts((p) => [v, ...p]); }, []);
  const toggle = useCallback((kind: string, id: string) => {
    setSets((s) => { const n = new Set(s[kind]); if (n.has(id)) n.delete(id); else n.add(id); return { ...s, [kind]: n }; });
  }, []);
  const vote = useCallback((id: string, dir: number) => {
    setVotes((v) => ({ ...v, [id]: v[id] === dir ? 0 : dir }));
  }, []);
  const sendMsg = useCallback((thread: number, t: string) => { const v = t.trim(); if (v) setMsgs((m) => ({ ...m, [thread]: [...(m[thread] ?? []), v] })); }, []);
  const addComment = useCallback((id: string, t: string) => { const v = t.trim(); if (v) setComments((c) => ({ ...c, [id]: [...(c[id] ?? []), v] })); }, []);

  const op = openPostId ? (FEED.find((x) => x.id === openPostId) ?? COMMUNITY_POSTS.find((x) => x.id === openPostId)) : null;
  const opName = op ? ("name" in op ? op.name : op.author) : "";
  const opHandle = op && "handle" in op ? op.handle : "";
  const opText = op ? ("text" in op ? op.text : op.body) : "";
  const seedComments: Record<string, { name: string; text: string }[]> = {
    s1: [{ name: "Dev Null", text: "the restraint here is the whole thing. nice work." }, { name: "Aria Chen", text: "that grid 😍" }],
    s2: [{ name: "Maya Okafor", text: "say it louder" }],
  };
  const openComments = openPostId ? [...(seedComments[openPostId] ?? []), ...((comments[openPostId] ?? []).map((t) => ({ name: SOCIAL.meName, text: t })))] : [];

  const value: Ctx = {
    myPosts, likes: sets.likes, reposts: sets.reposts, saves: sets.saves, follows: sets.follows, joined: sets.joined, comments, votes, msgs,
    addPost, toggle, isOn: (k, id) => sets[k].has(id), vote, voteOf: (id) => votes[id] ?? 0, sendMsg, addComment,
    openComposer: () => setComposerOpen(true), openPost: (id) => setOpenPostId(id),
  };

  return (
    <SocialCtx.Provider value={value}>
      {children}

      {composerOpen ? (
        <div onClick={() => setComposerOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 90, background: "color-mix(in srgb, var(--color-text) 70%, transparent)", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "clamp(20px, 8vh, 100px) 20px" }}>
          <div onClick={(e) => e.stopPropagation()} style={{ width: "min(560px, 100%)", background: "var(--color-bg)", border: "2px solid var(--color-divider)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", borderBottom: "2px solid var(--color-divider)" }}>
              <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 18, textTransform: "uppercase" }}>New post</span>
              <button type="button" className="btn btn-icon" onClick={() => setComposerOpen(false)} aria-label="Close"><CloseIcon size={18} /></button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); addPost(composer); setComposer(""); setComposerOpen(false); }} style={{ padding: 20 }}>
              <textarea className="input" value={composer} onChange={(e) => setComposer(e.target.value)} placeholder="What's happening?" style={{ minHeight: 120, fontSize: 17, border: 0, padding: 0 }} />
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}><button type="submit" className="btn btn-primary" disabled={!composer.trim()} style={{ padding: "11px 26px" }}>Post</button></div>
            </form>
          </div>
        </div>
      ) : null}

      {openPostId ? (
        <div onClick={() => setOpenPostId(null)} style={{ position: "fixed", inset: 0, zIndex: 90, background: "color-mix(in srgb, var(--color-text) 72%, transparent)", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "clamp(20px, 6vh, 80px) 20px", overflow: "auto" }}>
          <div onClick={(e) => e.stopPropagation()} style={{ width: "min(600px, 100%)", background: "var(--color-bg)", border: "2px solid var(--color-divider)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 18px", borderBottom: "2px solid var(--color-divider)" }}>
              <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 16 }}>Thread</span>
              <button type="button" className="btn btn-icon" onClick={() => setOpenPostId(null)} aria-label="Close"><CloseIcon size={18} /></button>
            </div>
            <div style={{ padding: 18, borderBottom: "2px solid var(--color-divider)" }}>
              <div style={{ display: "flex", gap: 6, alignItems: "baseline", marginBottom: 6 }}><span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 15 }}>{opName}</span><span style={{ fontSize: 14, color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }}>{opHandle}</span></div>
              <p style={{ fontSize: 16, lineHeight: 1.5, margin: 0 }}>{opText}</p>
            </div>
            <div style={{ maxHeight: "40vh", overflow: "auto" }}>
              {openComments.map((c, i) => (
                <div key={i} style={{ display: "flex", gap: 12, padding: "14px 18px", borderBottom: "1px solid var(--color-divider)" }}>
                  <div><div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 14 }}>{c.name}</div><div style={{ fontSize: 14, lineHeight: 1.45, marginTop: 2 }}>{c.text}</div></div>
                </div>
              ))}
            </div>
            <form onSubmit={(e) => { e.preventDefault(); if (openPostId) addComment(openPostId, reply); setReply(""); }} style={{ display: "flex", gap: 10, padding: "14px 18px", borderTop: "2px solid var(--color-divider)" }}>
              <input className="input" value={reply} onChange={(e) => setReply(e.target.value)} placeholder="Post your reply…" style={{ flex: 1 }} />
              <button type="submit" className="btn btn-primary" disabled={!reply.trim()} style={{ padding: "9px 20px" }}>Reply</button>
            </form>
          </div>
        </div>
      ) : null}
    </SocialCtx.Provider>
  );
}

export function useSocial() {
  const c = useContext(SocialCtx);
  if (!c) throw new Error("useSocial within provider");
  return c;
}
