"use client";

import { useEffect } from "react";
import { CloseIcon } from "@/components/icons";

/** Generic Modernist modal: scrim + centered dialog, Esc / backdrop to close. */
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
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="dialog-backdrop" onClick={onClose}>
      <div
        className="dialog"
        role="dialog"
        aria-modal="true"
        aria-label={label}
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
