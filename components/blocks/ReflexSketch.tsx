import * as React from "react";

/**
 * ReflexSketch — the drawing beside the POV statement on the homepage.
 *
 * ── WHY ─────────────────────────────────────────────────────────────────────
 * That section was `py-28 md:py-44` around a single paragraph: ~176px of
 * padding top and bottom, with the entire right half of a 12-column grid
 * empty. Every other section on this page carries a visual — the hero has the
 * foundation sketch, Work has the compounding curve, Insights has the scene
 * artwork — so the POV block read as the one place where the page ran out of
 * things to say, at exactly the moment it makes its strongest claim.
 *
 * ── WHAT IT DRAWS ───────────────────────────────────────────────────────────
 * The sentence it sits beside is: "The reflex is to add — another agency,
 * another platform, another channel. The constraint was never the channels."
 *
 * So: three ghosted boxes stacking up (the additions), against an outcome line
 * that stays resolutely flat no matter how many get added — then the single
 * solid bar underneath that the additions were all sitting on. The argument
 * made in one picture rather than restated in a second paragraph.
 *
 * ── LANGUAGE ────────────────────────────────────────────────────────────────
 * Deliberately the same idioms as the rest of the site and no new ones:
 * hairline rules, mono micro-labels in caps, one yellow accent, nothing
 * filled. It is a drafting annotation, not an illustration. It must not
 * compete with the type it sits next to — if it reads as the loudest thing in
 * the section, it is wrong.
 */

const INK = "#0A102F";
const MONO = "var(--font-mono), ui-monospace, monospace";

const ADDITIONS = ["+ agency", "+ platform", "+ channel"];

export function ReflexSketch({ className = "" }: { className?: string }) {
  return (
    <div className={className} aria-hidden="true">
      <svg viewBox="0 0 280 300" fill="none" className="h-auto w-full">
        <text
          x="0"
          y="10"
          fill={INK}
          fillOpacity="0.35"
          style={{ font: "500 9px " + MONO, letterSpacing: "0.16em" }}
        >
          THE REFLEX
        </text>

        {/* three additions, each one stepping right and up — effort accumulating */}
        {ADDITIONS.map((label, i) => {
          const y = 128 - i * 34;
          const x = 4 + i * 10;
          return (
            <g key={label}>
              <rect
                x={x}
                y={y}
                width={150}
                height={26}
                stroke={INK}
                strokeOpacity={0.22}
                strokeWidth={1}
                fill="none"
              />
              <text
                x={x + 12}
                y={y + 17}
                fill={INK}
                fillOpacity="0.45"
                style={{ font: "500 10px " + MONO, letterSpacing: "0.08em" }}
              >
                {label}
              </text>
            </g>
          );
        })}

        {/* the outcome, refusing to move */}
        <path d="M186 60 L186 150" stroke={INK} strokeOpacity={0.12} strokeWidth={1} />
        <path
          d="M196 108 L276 108"
          stroke={INK}
          strokeOpacity={0.3}
          strokeWidth={1.5}
          strokeDasharray="5 5"
        />
        <text
          x="276"
          y="100"
          textAnchor="end"
          fill={INK}
          fillOpacity="0.35"
          style={{ font: "500 9px " + MONO, letterSpacing: "0.12em" }}
        >
          FLAT
        </text>

        {/* the thing all of it was standing on */}
        <path d="M0 178 L280 178" stroke={INK} strokeOpacity={0.12} strokeWidth={1} />
        <text
          x="0"
          y="204"
          fill={INK}
          fillOpacity="0.35"
          style={{ font: "500 9px " + MONO, letterSpacing: "0.16em" }}
        >
          THE CONSTRAINT
        </text>

        <rect
          x="0"
          y="218"
          width="280"
          height="46"
          stroke={INK}
          strokeOpacity={0.5}
          strokeWidth={1.5}
          fill="none"
        />
        {/* the one filled mark in the whole drawing */}
        <rect x="0" y="218" width="5" height="46" fill="#FFD031" />
        <text
          x="20"
          y="246"
          fill={INK}
          fillOpacity="0.8"
          style={{ font: "500 12px " + MONO, letterSpacing: "0.06em" }}
        >
          architecture
        </text>
      </svg>
    </div>
  );
}
