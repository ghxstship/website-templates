"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon, CheckIcon, HeartIcon, CommentIcon } from "@/components/icons";
import { Placeholder } from "@/components/Placeholder";
import { useLearning } from "./LearningContext";
import { LEARNING, NAV, COURSES, CATEGORIES, PLANS, SEED_POSTS, lessonCount, type Course } from "@/lib/learning";

export function LearningHeader() {
  const pathname = usePathname();
  const [menu, setMenu] = useState(false);
  const active = (p: string) => pathname === p || pathname.startsWith(p + "/");
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 60, background: "var(--color-bg)", borderBottom: "2px solid var(--color-divider)" }}>
      <div className="wrap" style={{ display: "flex", alignItems: "center", gap: 26, height: 74 }}>
        <Link href="/learning" onClick={() => setMenu(false)} style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 20, letterSpacing: "-0.01em", textDecoration: "none", color: "var(--color-text)", textTransform: "uppercase", marginRight: "auto" }}>{LEARNING.brand}</Link>
        <nav className="desk-nav" style={{ marginLeft: 0 }}>
          {NAV.map((n) => <Link key={n.path} href={n.path} className="nav-link" aria-current={active(n.path) ? "page" : undefined}>{n.label}</Link>)}
        </nav>
        <Link href="/learning/dashboard" className="btn btn-secondary desk-nav" style={{ padding: "8px 14px" }}>Dashboard</Link>
        <Link href="/learning/courses" className="btn btn-primary" style={{ padding: "9px 16px", flex: "0 0 auto" }}>Browse</Link>
        <button type="button" className="burger btn btn-icon" onClick={() => setMenu((v) => !v)} aria-label="Menu"><MenuIcon size={20} /></button>
      </div>
      <div className={`mob-menu${menu ? " open" : ""}`} style={{ borderTop: "2px solid var(--color-divider)" }}>
        <div className="wrap" style={{ display: "flex", flexDirection: "column", paddingBlock: "12px 18px" }}>
          {NAV.map((n) => <Link key={n.path} href={n.path} onClick={() => setMenu(false)} style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 18, textTransform: "uppercase", textDecoration: "none", color: "var(--color-text)", padding: "12px 0", borderBottom: "1px solid var(--color-divider)" }}>{n.label}</Link>)}
        </div>
      </div>
    </header>
  );
}

function CourseCard({ c }: { c: Course }) {
  const { isEnrolled } = useLearning();
  return (
    <Link href={`/learning/courses/${c.slug}`} style={{ border: "2px solid var(--color-divider)", display: "flex", flexDirection: "column", textDecoration: "none", color: "var(--color-text)" }}>
      <figure className="grayscale" style={{ margin: 0, aspectRatio: "16/10", borderBottom: "2px solid var(--color-divider)" }}><Placeholder /></figure>
      <div style={{ padding: "16px 18px 20px", flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
          <span style={{ fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--color-accent-700)" }}>{c.cat}</span>
          {isEnrolled(c.slug) ? <span className="tag tag-accent">Enrolled</span> : null}
        </div>
        <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 19, margin: "0 0 8px" }}>{c.title}</h3>
        <p style={{ fontSize: 13.5, lineHeight: 1.5, margin: "0 0 14px", flex: 1, color: "color-mix(in srgb, var(--color-text) 72%, transparent)" }}>{c.blurb}</p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <span style={{ fontSize: 13, color: "color-mix(in srgb, var(--color-text) 58%, transparent)" }}>{c.instructor} · {lessonCount(c)} lessons</span>
          <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, color: "var(--color-accent)" }}>${c.num}</span>
        </div>
      </div>
    </Link>
  );
}

export function CoursesGrid() {
  const [cat, setCat] = useState("all");
  const shown = cat === "all" ? COURSES : COURSES.filter((c) => c.cat === cat);
  return (
    <>
      <section className="wrap" style={{ paddingBlock: "20px 8px" }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {CATEGORIES.map((c) => <button key={c} type="button" onClick={() => setCat(c)} className={`chip${cat === c ? " active" : ""}`}>{c === "all" ? "All" : c}</button>)}
        </div>
      </section>
      <section className="wrap" style={{ paddingBlock: "16px clamp(48px, 6vw, 80px)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "clamp(16px, 2vw, 28px)" }}>
          {shown.map((c) => <CourseCard key={c.slug} c={c} />)}
        </div>
      </section>
    </>
  );
}

export function CourseDetail({ course }: { course: Course }) {
  const { isEnrolled, enroll, done, toggleLesson } = useLearning();
  const enrolled = isEnrolled(course.slug);
  const total = lessonCount(course);
  const doneSet = done[course.slug] ?? new Set<number>();
  const pct = total ? Math.round((doneSet.size / total) * 100) : 0;
  let li = -1;

  const includes = [`${course.hours} of video`, "Lifetime access & updates", "Community access", "Certificate of completion"];

  return (
    <>
      <section className="wrap" style={{ paddingBlock: "20px 0" }}><Link href="/learning/courses" className="btn btn-ghost" style={{ padding: "8px 4px" }}>← All courses</Link></section>
      <section className="wrap coursedetail" style={{ paddingBlock: "16px clamp(40px, 5vw, 64px)", display: "grid", gridTemplateColumns: "minmax(0,1.5fr) minmax(0,1fr)", gap: "clamp(28px, 5vw, 56px)", alignItems: "start" }}>
        <div>
          <div style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-accent-700)", marginBottom: 12 }}>{course.cat}</div>
          <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(30px, 4vw, 52px)", lineHeight: 1, letterSpacing: "-0.02em", margin: "0 0 16px" }}>{course.title}</h1>
          <p style={{ fontSize: 16, lineHeight: 1.65, margin: "0 0 20px", maxWidth: "56ch", color: "color-mix(in srgb, var(--color-text) 82%, transparent)" }}>{course.blurb}</p>
          <div style={{ fontSize: 14, color: "color-mix(in srgb, var(--color-text) 65%, transparent)", marginBottom: 24 }}>By {course.instructor} · {total} lessons · {course.hours}</div>
          {enrolled ? (
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}><span className="eyebrow">Your progress</span><span style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}>{pct}%</span></div>
              <div className="progress"><span style={{ width: `${pct}%` }} /></div>
            </div>
          ) : null}
          <div style={{ borderTop: "2px solid var(--color-divider)" }}>
            {course.modules.map((m) => (
              <div key={m.title} style={{ padding: "18px 0", borderBottom: "1px solid var(--color-divider)" }}>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 16, marginBottom: 10 }}>{m.title}</div>
                {m.lessons.map((l) => {
                  li += 1;
                  const idx = li;
                  const isDone = doneSet.has(idx);
                  return (
                    <button key={l.title} type="button" onClick={() => enrolled && toggleLesson(course.slug, idx, total)} disabled={!enrolled} style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "10px 0", background: "none", border: 0, cursor: enrolled ? "pointer" : "not-allowed", textAlign: "left" }}>
                      <span style={{ width: 22, height: 22, flex: "0 0 auto", border: `2px solid ${isDone ? "var(--color-accent)" : "var(--color-divider)"}`, background: isDone ? "var(--color-accent)" : "transparent", color: "var(--color-bg)", display: "flex", alignItems: "center", justifyContent: "center" }}>{isDone ? <CheckIcon size={13} /> : null}</span>
                      <span style={{ flex: 1, fontSize: 14.5, color: !enrolled ? "color-mix(in srgb, var(--color-text) 45%, transparent)" : isDone ? "color-mix(in srgb, var(--color-text) 55%, transparent)" : "var(--color-text)" }}>{l.title}</span>
                      <span style={{ fontSize: 12, color: "color-mix(in srgb, var(--color-text) 50%, transparent)" }}>{l.len}</span>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
        <div style={{ border: "2px solid var(--color-divider)", position: "sticky", top: 90 }}>
          <figure className="grayscale" style={{ margin: 0, aspectRatio: "16/10", borderBottom: "2px solid var(--color-divider)" }}><Placeholder /></figure>
          <div style={{ padding: 22 }}>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 32, color: "var(--color-accent)", marginBottom: 4 }}>${course.num}</div>
            <div style={{ fontSize: 13, color: "color-mix(in srgb, var(--color-text) 58%, transparent)", marginBottom: 20 }}>One-time · lifetime access</div>
            {enrolled ? (
              <button type="button" className="btn btn-secondary" style={{ width: "100%", justifyContent: "center", padding: "13px 20px" }}>Continue learning</button>
            ) : (
              <button type="button" className="btn btn-primary" onClick={() => enroll(course.slug, course.title)} style={{ width: "100%", justifyContent: "center", padding: "13px 20px" }}>Enroll now</button>
            )}
            <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 10 }}>
              {includes.map((i) => <div key={i} style={{ display: "flex", gap: 10, alignItems: "baseline", fontSize: 13.5 }}><span style={{ color: "var(--color-accent)", fontWeight: 800 }}>—</span><span>{i}</span></div>)}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export function Community() {
  const { posts, addPost, likes, toggleLike } = useLearning();
  const [text, setText] = useState("");
  const mine = posts.map((t, i) => ({ id: `me${i}`, name: "You", time: "now", cat: "", text: t, likes: 0, comments: 0 }));
  const all = [...mine, ...SEED_POSTS];
  return (
    <section className="wrap" style={{ paddingBlock: "clamp(24px, 3vw, 40px) clamp(48px, 6vw, 80px)", maxWidth: 760 }}>
      <div style={{ display: "flex", gap: 14, paddingBottom: 20, borderBottom: "2px solid var(--color-divider)" }}>
        <figure className="grayscale" style={{ margin: 0, width: 44, height: 44, border: "1px solid var(--color-divider)", flex: "0 0 auto" }}><Placeholder /></figure>
        <form onSubmit={(e) => { e.preventDefault(); addPost(text); setText(""); }} style={{ flex: 1 }}>
          <textarea className="input" value={text} onChange={(e) => setText(e.target.value)} placeholder="Share a win, ask a question…" style={{ minHeight: 56, fontSize: 16, resize: "none" }} />
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}><button type="submit" className="btn btn-primary" disabled={!text.trim()} style={{ padding: "9px 22px" }}>Post</button></div>
        </form>
      </div>
      {all.map((p) => {
        const liked = likes.has(p.id);
        return (
          <article key={p.id} style={{ display: "flex", gap: 14, padding: "20px 0", borderBottom: "2px solid var(--color-divider)" }}>
            <figure className="grayscale" style={{ margin: 0, width: 44, height: 44, border: "1px solid var(--color-divider)", flex: "0 0 auto" }}><Placeholder /></figure>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", gap: 6, alignItems: "baseline", flexWrap: "wrap" }}>
                <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 15 }}>{p.name}</span>
                <span style={{ fontSize: 13, color: "color-mix(in srgb, var(--color-text) 55%, transparent)" }}>· {p.time}</span>
                {p.cat ? <span className="tag tag-neutral">{p.cat}</span> : null}
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.5, margin: "6px 0 12px" }}>{p.text}</p>
              <div style={{ display: "flex", gap: 24 }}>
                <button type="button" onClick={() => toggleLike(p.id)} style={{ display: "flex", alignItems: "center", gap: 7, background: "none", border: 0, cursor: "pointer", color: liked ? "var(--color-accent)" : "color-mix(in srgb, var(--color-text) 55%, transparent)", fontSize: 13 }}><HeartIcon size={17} style={{ fill: liked ? "var(--color-accent)" : "none" }} />{p.likes + (liked ? 1 : 0)}</button>
                <span style={{ display: "flex", alignItems: "center", gap: 7, color: "color-mix(in srgb, var(--color-text) 55%, transparent)", fontSize: 13 }}><CommentIcon size={17} />{p.comments}</span>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}

export function Dashboard() {
  const { enrolled, done, certificates } = useLearning();
  const mine = COURSES.filter((c) => enrolled.has(c.slug));
  const earned = COURSES.filter((c) => certificates.includes(c.slug));
  return (
    <section className="wrap" style={{ paddingBlock: "clamp(28px, 4vw, 48px) clamp(48px, 6vw, 80px)" }}>
      {earned.length > 0 ? (
        <div style={{ marginBottom: 36 }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 22, margin: "0 0 20px" }}>Your certificates · {earned.length}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
            {earned.map((c) => (
              <div key={c.slug} style={{ border: "2px solid var(--color-accent)", padding: 22, display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-accent-700)" }}>Certificate of completion</span>
                  <span style={{ fontSize: 22 }}>🎓</span>
                </div>
                <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 20, margin: 0 }}>{c.title}</h3>
                <div style={{ fontSize: 13, color: "color-mix(in srgb, var(--color-text) 62%, transparent)" }}>Awarded to Alex Rivera · {c.instructor}</div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
      <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 22, margin: "0 0 20px" }}>Continue learning</h2>
      {mine.length === 0 ? (
        <p style={{ fontSize: 16, color: "color-mix(in srgb, var(--color-text) 60%, transparent)", padding: "16px 0" }}>You haven&apos;t enrolled in any courses yet. <Link href="/learning/courses">Browse courses →</Link></p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 2, background: "var(--color-divider)", border: "2px solid var(--color-divider)" }}>
          {mine.map((c) => {
            const total = lessonCount(c);
            const dc = done[c.slug]?.size ?? 0;
            const pct = total ? Math.round((dc / total) * 100) : 0;
            return (
              <Link key={c.slug} href={`/learning/courses/${c.slug}`} style={{ background: "var(--color-bg)", padding: 20, textDecoration: "none", color: "var(--color-text)" }}>
                <div style={{ fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--color-accent-700)", marginBottom: 8 }}>{c.cat}</div>
                <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 18, margin: "0 0 14px" }}>{c.title}</h3>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 6 }}><span style={{ color: "color-mix(in srgb, var(--color-text) 58%, transparent)" }}>{dc}/{total} lessons</span><span style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}>{pct}%</span></div>
                <div className="progress"><span style={{ width: `${pct}%` }} /></div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}

export function Pricing() {
  const { join } = useLearning();
  return (
    <section className="wrap" style={{ paddingBlock: "clamp(28px, 4vw, 48px) clamp(48px, 6vw, 80px)" }}>
      <div className="grid3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, background: "var(--color-divider)", border: "2px solid var(--color-divider)" }}>
        {PLANS.map((pl) => {
          const f = pl.featured;
          return (
            <div key={pl.key} style={{ background: f ? "var(--color-accent)" : "var(--color-bg)", color: f ? "var(--color-bg)" : "var(--color-text)", padding: "clamp(24px, 3vw, 40px)", display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.8, marginBottom: 16 }}>{pl.tagline}</div>
              <h3 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: 28, margin: "0 0 8px" }}>{pl.name}</h3>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 22 }}><span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(32px, 4vw, 46px)" }}>{pl.price}</span><span style={{ fontSize: 14, opacity: 0.7 }}>{pl.per}</span></div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28, flex: 1 }}>{pl.perks.map((pk) => <div key={pk} style={{ display: "flex", gap: 10, alignItems: "baseline", fontSize: 14, lineHeight: 1.4 }}><span style={{ fontWeight: 800 }}>—</span><span>{pk}</span></div>)}</div>
              <button type="button" onClick={() => join(pl.name)} className={f ? "btn" : "btn btn-primary"} style={{ padding: "12px 20px", ...(f ? { background: "var(--color-bg)", color: "var(--color-accent)" } : {}) }}>{pl.key === "free" ? "Start free" : `Choose ${pl.name}`}</button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
