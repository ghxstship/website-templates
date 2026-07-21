"use client";

/**
 * Universal segmented/filter control — a row of `.chip` buttons with one active.
 * Options are either raw strings, or `{ value, label }` when the display text
 * differs from the value. Renders an accessible tab-like group.
 */
export type ChipOption = string | { value: string; label: string };

function opt(o: ChipOption): { value: string; label: string } {
  return typeof o === "string" ? { value: o, label: o } : o;
}

export function FilterChipRow({
  options,
  value,
  onChange,
  label,
  style,
  chipStyle,
}: {
  options: ChipOption[];
  value: string;
  onChange: (value: string) => void;
  /** Accessible name for the group (e.g. "Filter by category"). */
  label?: string;
  style?: React.CSSProperties;
  chipStyle?: React.CSSProperties;
}) {
  return (
    <div
      role="group"
      aria-label={label}
      style={{ display: "flex", gap: 8, flexWrap: "wrap", ...style }}
    >
      {options.map((o) => {
        const { value: v, label: l } = opt(o);
        const active = v === value;
        return (
          <button
            key={v}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(v)}
            className={`chip${active ? " active" : ""}`}
            style={chipStyle}
          >
            {l}
          </button>
        );
      })}
    </div>
  );
}
