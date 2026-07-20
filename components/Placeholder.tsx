import type { CSSProperties } from "react";

/**
 * Drop-in placeholder standing in for real artist photography. In production
 * these become <img>/next/image inside the same grayscale wrapper with the
 * same fixed aspect ratios. The wrapper (.grayscale) is applied by the caller.
 */
export function Placeholder({
  label,
  style,
}: {
  label?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      aria-hidden={label ? undefined : true}
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "flex-end",
        background:
          "repeating-linear-gradient(135deg, var(--color-neutral-200) 0, var(--color-neutral-200) 12px, var(--color-neutral-300) 12px, var(--color-neutral-300) 24px)",
        ...style,
      }}
    >
      {label ? (
        <span
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 600,
            fontSize: 11,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--color-neutral-700)",
            padding: "10px 12px",
            background: "color-mix(in srgb, var(--color-bg) 82%, transparent)",
            margin: 10,
          }}
        >
          {label}
        </span>
      ) : null}
    </div>
  );
}
