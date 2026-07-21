"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Placeholder } from "@/components/Placeholder";
import { SearchIcon, HeartIcon, CommentIcon, RepostIcon, BookmarkIcon, UpvoteIcon, DownvoteIcon } from "@/components/icons";
import { useSocial } from "./SocialContext";
import { SOCIAL, FEED, COMMUNITIES, COMMUNITY_POSTS, THREADS, NOTIFICATIONS, TRENDS, SUGGESTIONS, MY_SEED_POSTS, EXPLORE_LIKES, type Community } from "@/lib/social";

const NAV = [
  { label: "Home", path: "/social" },
  { label: "Explore", path: "/social/explore" },
  { label: "Communities", path: "/social/communities" },
  { label: "Messages", path: "/social/messages" },
  { label: "Notifications", path: "/social/notifications" },
  { label: "Profile", path: "/social/profile" },
];

export function LeftRail() {
  const pathname = usePathname();
  const { openComposer } = useSocial();
  const active = (p: string) => (p === "/social" ? pathname === p : pathname.startsWith(p));
  return (
    <aside className="left-rail">
      <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 24, letterSpacing: "-0.02em", textTransform: "uppercase", padding: "8px 12px 20px" }}>{SOCIAL.brand}</div>
      {NAV.map((n) => (
        <Link key={n.path} href={n.path} className="nav-item" style={{ color: active(n.path) ? "var(--color-accent)" : "var(--color-text)", textDecoration: "none" }}>
          {n.label}
          {n.label === "Messages" ? <span style={{ marginLeft: "auto", background: "var(--color-accent)", color: "var(--color-bg)", fontSize: 11, fontWeight: 800, padding: "1px 7px" }}>3</span> : null}
        </Link>
      ))}
      <button type="button" className="btn btn-primary" onClick={openComposer} style={{ marginTop: 14, padding: "13px 16px", justifyContent: "center" }}>Post</button>
      <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderTop: "2px solid var(--color-divider)" }}>
        <figure className="grayscale" style={{ margin: 0, width: 38, height: 38, border: "1px solid var(--color-divider)", flex: "0 0 auto" }}><Placeholder /></figure>
        <div style={{ minWidth: 0 }}><div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 14 }}>{SOCIAL.meName}</div><div style={{ fontSize: 12, color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }}>{SOCIAL.meHandle}</div></div>
      </div>
    </aside>
  );
}

export function RightRail() {
  const { follows, toggle } = useSocial();
  return (
    <aside className="right-rail">
      <div style={{ display: "flex", alignItems: "center", gap: 10, border: "1px solid var(--color-divider)", padding: "10px 14px", marginBottom: 24 }}>
        <SearchIcon size={18} style={{ color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }} />
        <input placeholder={`Search ${SOCIAL.brand}`} style={{ border: 0, background: "none", outline: "none", font: "inherit", fontSize: 14, width: "100%", color: "var(--color-text)" }} />
      </div>
      <div style={{ border: "2px solid var(--color-divider)", marginBottom: 24 }}>
        <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 17, padding: "16px 18px 10px" }}>Trending</div>
        {TRENDS.map((t) => (
          <div key={t.tag} style={{ padding: "10px 18px", borderTop: "1px solid var(--color-divider)" }}>
            <div style={{ fontSize: 12, color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }}>{t.cat}</div>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 15 }}>{t.tag}</div>
            <div style={{ fontSize: 12, color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }}>{t.count} posts</div>
          </div>
        ))}
      </div>
      <div style={{ border: "2px solid var(--color-divider)" }}>
        <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 17, padding: "16px 18px 10px" }}>Who to follow</div>
        {SUGGESTIONS.map((s) => {
          const following = follows.has(s.handle);
          return (
            <div key={s.handle} style={{ display: "flex", gap: 12, alignItems: "center", padding: "12px 18px", borderTop: "1px solid var(--color-divider)" }}>
              <figure className="grayscale" style={{ margin: 0, width: 40, height: 40, border: "1px solid var(--color-divider)", flex: "0 0 auto" }}><Placeholder /></figure>
              <div style={{ flex: 1, minWidth: 0 }}><div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 14 }}>{s.name}</div><div style={{ fontSize: 12, color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }}>{s.handle}</div></div>
              <button type="button" onClick={() => toggle("follows", s.handle)} className={following ? "btn btn-secondary" : "btn btn-primary"} style={{ padding: "6px 14px", flex: "0 0 auto" }}>{following ? "Following" : "Follow"}</button>
            </div>
          );
        })}
      </div>
    </aside>
  );
}

function CenterHeader({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <div style={{ position: "sticky", top: 0, zIndex: 30, background: "color-mix(in srgb, var(--color-bg) 88%, transparent)", backdropFilter: "blur(8px)", borderBottom: "2px solid var(--color-divider)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 22px", minHeight: 60 }}>
        <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 22, letterSpacing: "-0.015em", margin: 0 }}>{title}</h1>
      </div>
      {children}
    </div>
  );
}

function PostActions({ post }: { post: (typeof FEED)[number] }) {
  const { isOn, toggle, openPost, comments } = useSocial();
  const liked = isOn("likes", post.id), reposted = isOn("reposts", post.id), saved = isOn("saves", post.id);
  const dim = "color-mix(in srgb, var(--color-text) 60%, transparent)";
  const extraComments = comments[post.id]?.length ?? 0;
  return (
    <div style={{ display: "flex", gap: 8, marginTop: 14, maxWidth: 420, justifyContent: "space-between" }}>
      <button type="button" onClick={() => openPost(post.id)} style={{ display: "flex", alignItems: "center", gap: 7, background: "none", border: 0, cursor: "pointer", color: dim, fontSize: 13 }}><CommentIcon size={18} />{post.comments + extraComments}</button>
      <button type="button" onClick={() => toggle("reposts", post.id)} style={{ display: "flex", alignItems: "center", gap: 7, background: "none", border: 0, cursor: "pointer", color: reposted ? "var(--color-accent)" : dim, fontSize: 13 }}><RepostIcon size={18} />{post.reposts + (reposted ? 1 : 0)}</button>
      <button type="button" onClick={() => toggle("likes", post.id)} style={{ display: "flex", alignItems: "center", gap: 7, background: "none", border: 0, cursor: "pointer", color: liked ? "var(--color-accent)" : dim, fontSize: 13 }}><HeartIcon size={18} style={{ fill: liked ? "var(--color-accent)" : "none" }} />{post.likes + (liked ? 1 : 0)}</button>
      <button type="button" onClick={() => toggle("saves", post.id)} style={{ display: "flex", alignItems: "center", gap: 7, background: "none", border: 0, cursor: "pointer", color: saved ? "var(--color-accent)" : dim, fontSize: 13 }}><BookmarkIcon size={18} style={{ fill: saved ? "var(--color-accent)" : "none" }} /></button>
    </div>
  );
}

export function Feed() {
  const { myPosts, addPost, follows, saves } = useSocial();
  const [tab, setTab] = useState<"foryou" | "following" | "favorites">("foryou");
  const [text, setText] = useState("");
  const composed = myPosts.map((t, i) => ({ id: `me${i}`, name: SOCIAL.meName, handle: SOCIAL.meHandle, time: "now", text: t, hasImg: false, likes: 0, comments: 0, reposts: 0 }));
  const all = [...composed, ...FEED];
  const shown = tab === "following"
    ? all.filter((x) => follows.has(x.handle) || x.handle === SOCIAL.meHandle)
    : tab === "favorites"
      ? all.filter((x) => saves.has(x.id))
      : all;
  const dim = "color-mix(in srgb, var(--color-text) 60%, transparent)";
  const tabLabel = { foryou: "For you", following: "Following", favorites: `Favorites · ${saves.size}` };

  return (
    <>
      <CenterHeader title="Home">
        <div style={{ display: "flex" }}>
          {(["foryou", "following", "favorites"] as const).map((k) => (
            <button key={k} type="button" onClick={() => setTab(k)} style={{ flex: 1, padding: 14, background: "none", border: 0, borderBottom: `3px solid ${tab === k ? "var(--color-accent)" : "transparent"}`, cursor: "pointer", fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 14, color: tab === k ? "var(--color-text)" : dim, textTransform: "uppercase", letterSpacing: "0.04em" }}>{tabLabel[k]}</button>
          ))}
        </div>
      </CenterHeader>
      <div style={{ display: "flex", gap: 14, padding: "20px 22px", borderBottom: "2px solid var(--color-divider)" }}>
        <figure className="grayscale" style={{ margin: 0, width: 44, height: 44, border: "1px solid var(--color-divider)", flex: "0 0 auto" }}><Placeholder /></figure>
        <form onSubmit={(e) => { e.preventDefault(); addPost(text); setText(""); }} style={{ flex: 1 }}>
          <textarea className="input" value={text} onChange={(e) => setText(e.target.value)} placeholder="What's happening?" style={{ border: 0, padding: "8px 0", minHeight: 52, fontSize: 17, resize: "none" }} />
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 6 }}><button type="submit" className="btn btn-primary" disabled={!text.trim()} style={{ padding: "9px 22px" }}>Post</button></div>
        </form>
      </div>
      {tab === "favorites" && shown.length === 0 ? (
        <p style={{ fontSize: 15, color: "color-mix(in srgb, var(--color-text) 60%, transparent)", padding: "24px 22px" }}>No favorites yet. Tap the bookmark on any post to save it here.</p>
      ) : null}
      {shown.map((p) => (
        <article key={p.id} style={{ display: "flex", gap: 14, padding: "18px 22px", borderBottom: "2px solid var(--color-divider)" }}>
          <figure className="grayscale" style={{ margin: 0, width: 44, height: 44, border: "1px solid var(--color-divider)", flex: "0 0 auto" }}><Placeholder /></figure>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", gap: 6, alignItems: "baseline", flexWrap: "wrap" }}><span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 15 }}>{p.name}</span><span style={{ fontSize: 14, color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }}>{p.handle} · {p.time}</span></div>
            <p style={{ fontSize: 15.5, lineHeight: 1.5, margin: "4px 0 0" }}>{p.text}</p>
            {p.hasImg ? <figure className="grayscale" style={{ margin: "12px 0 0", aspectRatio: "16/10", border: "2px solid var(--color-divider)" }}><Placeholder /></figure> : null}
            <PostActions post={p} />
          </div>
        </article>
      ))}
    </>
  );
}

export function Explore() {
  const { openPost } = useSocial();
  return (
    <>
      <CenterHeader title="Explore" />
      <div style={{ padding: 18 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 4 }}>
          {EXPLORE_LIKES.map((likes, i) => (
            <figure key={i} onClick={() => openPost(FEED[i % FEED.length].id)} className="grayscale" style={{ margin: 0, aspectRatio: "1/1", cursor: "pointer", position: "relative", border: "1px solid var(--color-divider)" }}>
              <Placeholder />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "8px 10px", background: "linear-gradient(transparent, color-mix(in srgb, var(--color-text) 70%, transparent))", color: "var(--color-bg)", fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 13, pointerEvents: "none" }}>♥ {likes}</div>
            </figure>
          ))}
        </div>
      </div>
    </>
  );
}

export function CommunitiesList() {
  const { isOn, toggle } = useSocial();
  return (
    <>
      <CenterHeader title="Communities" />
      {COMMUNITIES.map((c) => {
        const joined = isOn("joined", c.name);
        return (
          <div key={c.slug} style={{ display: "flex", gap: 14, padding: "18px 22px", borderBottom: "2px solid var(--color-divider)", alignItems: "center" }}>
            <figure className="grayscale" style={{ margin: 0, width: 52, height: 52, border: "2px solid var(--color-divider)", flex: "0 0 auto" }}><Placeholder /></figure>
            <Link href={`/social/communities/${c.slug}`} style={{ flex: 1, minWidth: 0, textDecoration: "none", color: "var(--color-text)" }}>
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 16 }}>{c.name}</div>
              <div style={{ fontSize: 13, color: "color-mix(in srgb, var(--color-text) 60%, transparent)", margin: "2px 0 4px" }}>{c.members} members</div>
              <p style={{ fontSize: 13.5, lineHeight: 1.45, margin: 0, color: "color-mix(in srgb, var(--color-text) 72%, transparent)", maxWidth: "52ch" }}>{c.desc}</p>
            </Link>
            <button type="button" onClick={() => toggle("joined", c.name)} className={joined ? "btn btn-secondary" : "btn btn-primary"} style={{ padding: "8px 18px", flex: "0 0 auto" }}>{joined ? "Joined" : "Join"}</button>
          </div>
        );
      })}
    </>
  );
}

export function CommunityDetail({ community }: { community: Community }) {
  const { isOn, toggle, vote, voteOf, openPost } = useSocial();
  const joined = isOn("joined", community.name);
  return (
    <>
      <div style={{ position: "sticky", top: 0, zIndex: 30, background: "color-mix(in srgb, var(--color-bg) 88%, transparent)", backdropFilter: "blur(8px)", borderBottom: "2px solid var(--color-divider)", display: "flex", alignItems: "center", gap: 12, padding: "12px 22px" }}>
        <Link href="/social/communities" className="btn btn-icon" aria-label="Back" style={{ textDecoration: "none" }}>←</Link>
        <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 22, margin: 0 }}>{community.name}</h1>
      </div>
      <div style={{ padding: "20px 22px", borderBottom: "2px solid var(--color-divider)", display: "flex", gap: 16, alignItems: "center" }}>
        <figure className="grayscale" style={{ margin: 0, width: 64, height: 64, border: "2px solid var(--color-divider)", flex: "0 0 auto" }}><Placeholder /></figure>
        <div style={{ flex: 1 }}><h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 22, margin: 0 }}>{community.name}</h2><div style={{ fontSize: 13, color: "color-mix(in srgb, var(--color-text) 60%, transparent)" }}>{community.members} members</div></div>
        <button type="button" onClick={() => toggle("joined", community.name)} className={joined ? "btn btn-secondary" : "btn btn-primary"} style={{ padding: "8px 18px" }}>{joined ? "Joined" : "Join"}</button>
      </div>
      {COMMUNITY_POSTS.map((p) => {
        const v = voteOf(p.id);
        const dim = "color-mix(in srgb, var(--color-text) 60%, transparent)";
        return (
          <article key={p.id} style={{ display: "flex", gap: 14, padding: "16px 22px", borderBottom: "2px solid var(--color-divider)" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, flex: "0 0 auto" }}>
              <button type="button" onClick={() => vote(p.id, 1)} style={{ background: "none", border: 0, cursor: "pointer", color: v === 1 ? "var(--color-accent)" : dim, padding: 0 }}><UpvoteIcon size={22} /></button>
              <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 14 }}>{p.score + v}</span>
              <button type="button" onClick={() => vote(p.id, -1)} style={{ background: "none", border: 0, cursor: "pointer", color: v === -1 ? "var(--color-accent)" : dim, padding: 0 }}><DownvoteIcon size={22} /></button>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12, color: "color-mix(in srgb, var(--color-text) 55%, transparent)", marginBottom: 4 }}>{p.author} · {p.time}</div>
              <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 17, margin: "0 0 6px" }}>{p.title}</h3>
              <p style={{ fontSize: 14.5, lineHeight: 1.5, margin: "0 0 10px", color: "color-mix(in srgb, var(--color-text) 78%, transparent)" }}>{p.body}</p>
              <button type="button" onClick={() => openPost(p.id)} style={{ display: "flex", alignItems: "center", gap: 7, background: "none", border: 0, cursor: "pointer", color: dim, fontSize: 13, padding: 0 }}><CommentIcon size={16} />{p.comments} comments</button>
            </div>
          </article>
        );
      })}
    </>
  );
}

export function Messages() {
  const { msgs, sendMsg } = useSocial();
  const [ti, setTi] = useState(0);
  const [draft, setDraft] = useState("");
  const active = THREADS[ti];
  const all = [...active.seed, ...((msgs[ti] ?? []).map((t) => ({ me: true, text: t })))];
  return (
    <>
      <CenterHeader title="Messages" />
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,0.9fr) minmax(0,1.4fr)", minHeight: "calc(100vh - 122px)" }}>
        <div style={{ borderRight: "2px solid var(--color-divider)" }}>
          {THREADS.map((t, i) => (
            <button key={t.name} type="button" onClick={() => setTi(i)} style={{ width: "100%", display: "flex", gap: 12, padding: "16px 18px", border: 0, borderBottom: "1px solid var(--color-divider)", background: ti === i ? "color-mix(in srgb, var(--color-text) 6%, transparent)" : "transparent", cursor: "pointer", textAlign: "left", alignItems: "center" }}>
              <figure className="grayscale" style={{ margin: 0, width: 44, height: 44, border: "1px solid var(--color-divider)", flex: "0 0 auto" }}><Placeholder /></figure>
              <div style={{ minWidth: 0 }}><div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 14, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{t.name}</div><div style={{ fontSize: 13, color: "color-mix(in srgb, var(--color-text) 55%, transparent)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{t.preview}</div></div>
            </button>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "16px 20px", borderBottom: "2px solid var(--color-divider)", fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 16 }}>{active.name}</div>
          <div style={{ flex: 1, overflow: "auto", padding: 20, display: "flex", flexDirection: "column", gap: 12 }}>
            {all.map((m, i) => (
              <div key={i} style={{ alignSelf: m.me ? "flex-end" : "flex-start", maxWidth: "74%", background: m.me ? "var(--color-accent)" : "color-mix(in srgb, var(--color-text) 8%, transparent)", color: m.me ? "var(--color-bg)" : "var(--color-text)", padding: "10px 14px", fontSize: 14.5, lineHeight: 1.4 }}>{m.text}</div>
            ))}
          </div>
          <form onSubmit={(e) => { e.preventDefault(); sendMsg(ti, draft); setDraft(""); }} style={{ display: "flex", gap: 10, padding: "14px 18px", borderTop: "2px solid var(--color-divider)" }}>
            <input className="input" value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Message…" style={{ flex: 1 }} />
            <button type="submit" className="btn btn-primary" disabled={!draft.trim()} style={{ padding: "9px 20px" }}>Send</button>
          </form>
        </div>
      </div>
    </>
  );
}

export function Notifications() {
  return (
    <>
      <CenterHeader title="Notifications" />
      {NOTIFICATIONS.map((n, i) => (
        <div key={i} style={{ display: "flex", gap: 14, padding: "16px 22px", borderBottom: "1px solid var(--color-divider)", alignItems: "center" }}>
          <span style={{ width: 36, height: 36, flex: "0 0 auto", display: "flex", alignItems: "center", justifyContent: "center", background: n.accent ? "var(--color-accent)" : "color-mix(in srgb, var(--color-text) 10%, transparent)", color: n.accent ? "var(--color-bg)" : "var(--color-text)" }}>{n.icon}</span>
          <figure className="grayscale" style={{ margin: 0, width: 40, height: 40, border: "1px solid var(--color-divider)", flex: "0 0 auto" }}><Placeholder /></figure>
          <div style={{ flex: 1, minWidth: 0, fontSize: 14.5, lineHeight: 1.4 }}><strong style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}>{n.name}</strong> {n.action} <span style={{ color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }}>· {n.time}</span></div>
        </div>
      ))}
    </>
  );
}

export function Profile() {
  const { myPosts, isOn, toggle } = useSocial();
  const following = isOn("follows", SOCIAL.meHandle);
  const posts = [...myPosts.map((t) => ({ text: t, time: "now" })), ...MY_SEED_POSTS];
  const stats = [{ num: 128 + myPosts.length, label: "Posts" }, { num: "4,820", label: "Followers" }, { num: "312", label: "Following" }];
  return (
    <>
      <CenterHeader title={SOCIAL.meName} />
      <figure className="grayscale" style={{ margin: 0, aspectRatio: "3/1", borderBottom: "2px solid var(--color-divider)" }}><Placeholder label="Cover photo" /></figure>
      <div style={{ padding: "0 22px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: -44 }}>
          <figure className="grayscale" style={{ margin: 0, width: 92, height: 92, border: "3px solid var(--color-bg)", outline: "2px solid var(--color-divider)", background: "var(--color-bg)" }}><Placeholder /></figure>
          <button type="button" onClick={() => toggle("follows", SOCIAL.meHandle)} className={following ? "btn btn-secondary" : "btn btn-primary"} style={{ padding: "9px 20px", marginBottom: 8 }}>{following ? "Following" : "Follow"}</button>
        </div>
        <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 26, letterSpacing: "-0.015em", margin: "14px 0 2px" }}>{SOCIAL.meName}</h2>
        <div style={{ fontSize: 14, color: "color-mix(in srgb, var(--color-text) 55%, transparent)", marginBottom: 12 }}>{SOCIAL.meHandle}</div>
        <p style={{ fontSize: 15, lineHeight: 1.55, margin: "0 0 14px", maxWidth: "54ch" }}>{SOCIAL.meBio}</p>
        <div style={{ display: "flex", gap: 24, padding: "12px 0", borderTop: "2px solid var(--color-divider)", borderBottom: "2px solid var(--color-divider)" }}>
          {stats.map((s) => <div key={s.label}><span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 17 }}>{s.num}</span> <span style={{ fontSize: 14, color: "color-mix(in srgb, var(--color-text) 58%, transparent)" }}>{s.label}</span></div>)}
        </div>
      </div>
      {posts.map((p, i) => (
        <article key={i} style={{ display: "flex", gap: 14, padding: "18px 22px", borderBottom: "2px solid var(--color-divider)" }}>
          <figure className="grayscale" style={{ margin: 0, width: 44, height: 44, border: "1px solid var(--color-divider)", flex: "0 0 auto" }}><Placeholder /></figure>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", gap: 6, alignItems: "baseline" }}><span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 15 }}>{SOCIAL.meName}</span><span style={{ fontSize: 14, color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }}>{SOCIAL.meHandle} · {p.time}</span></div>
            <p style={{ fontSize: 15.5, lineHeight: 1.5, margin: "4px 0 0" }}>{p.text}</p>
          </div>
        </article>
      ))}
    </>
  );
}
