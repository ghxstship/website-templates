"use client";

import { useEffect } from "react";
import { Modal } from "./Modal";
import { announce } from "@/lib/announce";
import { CheckIcon } from "@/components/icons";

/**
 * Universal success surface: centered card, accent-bordered check, title +
 * body + Done. Every transaction across the suite resolves here. Announces its
 * title (and string body) to the live region so it's not silent for SR users.
 */
export function ConfirmModal({
  open,
  onClose,
  title,
  body,
  doneLabel = "Done",
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  body: React.ReactNode;
  doneLabel?: string;
}) {
  useEffect(() => {
    if (open && title) announce(typeof body === "string" ? `${title}. ${body}` : title);
  }, [open, title, body]);

  return (
    <Modal open={open} onClose={onClose} label={title} showClose={false}>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <span
          style={{
            width: 48,
            height: 48,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "2px solid var(--color-accent)",
            color: "var(--color-accent)",
          }}
        >
          <CheckIcon size={24} />
        </span>
        <div className="dialog-title">{title}</div>
        <div className="dialog-body">{body}</div>
        <div className="dialog-actions">
          <button type="button" className="btn btn-primary" onClick={onClose}>
            {doneLabel}
          </button>
        </div>
      </div>
    </Modal>
  );
}
