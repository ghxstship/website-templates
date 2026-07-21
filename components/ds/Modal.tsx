"use client";

import { useEffect, useRef } from "react";
import { CloseIcon } from "@/components/icons";

const FOCUSABLE =
  'a[href],area[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),button:not([disabled]),[tabindex]:not([tabindex="-1"])';

// Shared scroll-lock counter so stacked/overlapping modals don't corrupt the
// restore value (each open increments; body unlocks only when the last closes).
let scrollLocks = 0;

/** Generic Modernist modal: scrim + centered dialog, Esc / backdrop to close,
 *  focus trapped inside and restored to the trigger on close. */
export function Modal({
  open,
  onClose,
  children,
  width = 440,
  label,
  showClose = true,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: number;
  label?: string;
  showClose?: boolean;
}) {
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    const prevFocus = document.activeElement as HTMLElement | null;

    // Move focus into the dialog (first focusable, else the dialog itself).
    const focusables = dialog ? Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE)) : [];
    (focusables[0] ?? dialog)?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !dialog) return;
      const items = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null || el === document.activeElement,
      );
      if (items.length === 0) {
        e.preventDefault();
        dialog.focus();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey && (active === first || active === dialog)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey, true);

    scrollLocks += 1;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey, true);
      scrollLocks = Math.max(0, scrollLocks - 1);
      if (scrollLocks === 0) document.body.style.overflow = "";
      prevFocus?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="dialog-backdrop" onClick={onClose}>
      <div
        ref={dialogRef}
        className="dialog"
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
        style={{ width: `min(${width}px, 100%)` }}
        onClick={(e) => e.stopPropagation()}
      >
        {showClose ? (
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: -8 }}>
            <button
              type="button"
              className="btn btn-icon"
              onClick={onClose}
              aria-label="Close"
            >
              <CloseIcon size={18} />
            </button>
          </div>
        ) : null}
        {children}
      </div>
    </div>
  );
}
