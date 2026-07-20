"use client";

import { MinusIcon, PlusIcon } from "@/components/icons";

/** − value + control in a 1px box. */
export function QtyStepper({
  value,
  onChange,
  min = 0,
  max = 99,
  size = "md",
}: {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md";
}) {
  const pad = size === "sm" ? 6 : 9;
  const w = size === "sm" ? 34 : 44;
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        border: "1px solid var(--color-divider)",
      }}
    >
      <button
        type="button"
        aria-label="Decrease"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className="btn"
        style={{ padding: pad, border: 0 }}
      >
        <MinusIcon size={14} />
      </button>
      <span
        style={{
          minWidth: w,
          textAlign: "center",
          fontFamily: "var(--font-heading)",
          fontWeight: 800,
          fontVariantNumeric: "tabular-nums",
          fontSize: 15,
        }}
      >
        {value}
      </span>
      <button
        type="button"
        aria-label="Increase"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="btn"
        style={{ padding: pad, border: 0 }}
      >
        <PlusIcon size={14} />
      </button>
    </div>
  );
}
