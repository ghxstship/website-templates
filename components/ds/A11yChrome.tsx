"use client";

import { useEffect } from "react";

/**
 * Suite-wide a11y runtime (production equivalent of site-kit.js's injected
 * chrome). Renders a skip-to-content link + a polite aria-live region, and
 * auto-announces the heading of any overlay (modal/drawer/lightbox) that opens
 * — no per-page wiring. Escape / backdrop dismissal already lives in the Modal
 * primitive; this adds the announcer and skip link.
 */
export function A11yChrome() {
  useEffect(() => {
    // Give the first <main> a stable id for the skip link target.
    const main = document.querySelector("main");
    if (main && !main.id) main.id = "sk-main";

    let last = "";
    let timer: ReturnType<typeof setTimeout> | undefined;

    const isVisible = (el: Element) => {
      const cs = getComputedStyle(el);
      if (cs.position !== "fixed" || cs.display === "none" || cs.visibility === "hidden" || parseFloat(cs.opacity) === 0) return false;
      const r = el.getBoundingClientRect();
      return r.width > 40 && r.height > 40;
    };

    const announceOverlay = () => {
      const fixed = Array.from(document.querySelectorAll<HTMLElement>('[style*="fixed"]')).filter(isVisible);
      if (!fixed.length) { last = ""; return; }
      fixed.sort((a, b) => (+getComputedStyle(a).zIndex || 0) - (+getComputedStyle(b).zIndex || 0));
      const top = fixed[fixed.length - 1];
      const h = top.querySelector("h1, h2, h3, [role='heading']");
      const txt = h ? (h.textContent || "").trim().replace(/\s+/g, " ") : "";
      if (txt && txt !== last) {
        last = txt;
        const live = document.getElementById("sk-live");
        if (live) { live.textContent = ""; live.textContent = txt; }
      }
    };

    const mo = new MutationObserver(() => {
      clearTimeout(timer);
      timer = setTimeout(announceOverlay, 80);
    });
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { mo.disconnect(); clearTimeout(timer); };
  }, []);

  return (
    <>
      <a
        href="#sk-main"
        style={{
          position: "fixed",
          left: 8,
          top: -48,
          zIndex: 9999,
          background: "var(--color-accent)",
          color: "#fff",
          padding: "8px 14px",
          font: "600 13px/1 var(--font-heading), system-ui, sans-serif",
          textDecoration: "none",
          transition: "top 0.15s",
        }}
        onFocus={(e) => (e.currentTarget.style.top = "8px")}
        onBlur={(e) => (e.currentTarget.style.top = "-48px")}
      >
        Skip to content
      </a>
      <div
        id="sk-live"
        aria-live="polite"
        aria-atomic="true"
        style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)", whiteSpace: "nowrap" }}
      />
    </>
  );
}
