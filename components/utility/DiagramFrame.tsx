import * as React from "react";

/**
 * DiagramFrame — the shared chrome every hero diagram sits inside.
 *
 * Each of the twenty-odd hero graphics on the solution pages repeats the same
 * drafting furniture: a 460×460 viewBox, a hairline frame inset by 20, corner
 * ticks, and a mono label in each top corner. That was copy-pasted into every
 * one of them, which is why the frame opacity drifted between files.
 *
 * New diagrams use this. The existing ones are left alone — rewriting working
 * components to share a wrapper is churn, and they can migrate if they are ever
 * touched for another reason.
 */
export const INK = "#0A102F";
export const EMERALD = "#064E3B";
export const YELLOW = "#FFD031";
export const MONO = "var(--font-mono), ui-monospace, monospace";

export function DiagramFrame({
  title,
  leftLabel,
  rightLabel,
  children,
  className = "",
}: {
  /** Accessible description — this is what a screen reader announces. */
  title: string;
  leftLabel: string;
  rightLabel: string;
  children: React.ReactNode;
  className?: string;
}) {
  const id = React.useId();
  return (
    <div className={`relative w-full max-w-[460px] mx-auto ${className}`}>
      <svg
        viewBox="0 0 460 460"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        role="img"
        aria-labelledby={id}
      >
        <title id={id}>{title}</title>

        <rect
          x="20"
          y="20"
          width="420"
          height="420"
          fill="none"
          stroke={INK}
          strokeWidth="1"
          strokeOpacity="0.15"
        />

        {[
          { x: 20, y: 20 },
          { x: 440, y: 20 },
          { x: 20, y: 440 },
          { x: 440, y: 440 },
        ].map((c, i) => (
          <g key={i} stroke={INK} strokeWidth="1.5" strokeOpacity="0.8">
            <line x1={c.x - 6} y1={c.y} x2={c.x + 6} y2={c.y} />
            <line x1={c.x} y1={c.y - 6} x2={c.x} y2={c.y + 6} />
          </g>
        ))}

        <text
          x="32"
          y="46"
          fontFamily={MONO}
          fontSize="9"
          fontWeight="500"
          fill={INK}
          fillOpacity="0.5"
          letterSpacing="1.8"
        >
          {leftLabel}
        </text>
        <text
          x="428"
          y="46"
          fontFamily={MONO}
          fontSize="9"
          fontWeight="500"
          fill={INK}
          fillOpacity="0.5"
          letterSpacing="1.8"
          textAnchor="end"
        >
          {rightLabel}
        </text>

        {children}
      </svg>
    </div>
  );
}
