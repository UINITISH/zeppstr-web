"use client";

import * as React from "react";

/**
 * ResearchMethodMatrix — hero graphic for the UX Research page.
 *
 * 2×2 plotted matrix with axis labels:
 *   X-axis: GENERATIVE ←→ EVALUATIVE
 *   Y-axis: BEHAVIORAL ←→ ATTITUDINAL
 *
 * Research methods plotted as labeled dots in their correct quadrants:
 *   - Lower-left  (Generative · Behavioral) → ethnography, diary, contextual
 *   - Upper-left  (Generative · Attitudinal) → interview, card sort, concept
 *   - Lower-right (Evaluative · Behavioral)  → usability, A/B, tree test
 *   - Upper-right (Evaluative · Attitudinal) → survey, NPS, brand tracking
 *
 * Drafting aesthetic — corner ticks, mono labels — and one yellow dot that
 * orbits the matrix to reinforce "the right method for the right question."
 */

type Method = {
  label: string;
  /** x in 0..1 (left → right) where 0=generative, 1=evaluative */
  x: number;
  /** y in 0..1 (top → bottom) where 0=attitudinal, 1=behavioral */
  y: number;
};

const METHODS: Method[] = [
  // Upper-left — Generative · Attitudinal
  { label: "Interview", x: 0.18, y: 0.22 },
  { label: "Card sort", x: 0.32, y: 0.12 },
  { label: "Concept test", x: 0.38, y: 0.32 },

  // Upper-right — Evaluative · Attitudinal
  { label: "Survey", x: 0.66, y: 0.18 },
  { label: "NPS", x: 0.82, y: 0.28 },
  { label: "Brand track", x: 0.74, y: 0.08 },

  // Lower-left — Generative · Behavioral
  { label: "Ethnography", x: 0.14, y: 0.72 },
  { label: "Diary study", x: 0.28, y: 0.82 },
  { label: "Contextual", x: 0.36, y: 0.62 },

  // Lower-right — Evaluative · Behavioral
  { label: "Usability", x: 0.62, y: 0.72 },
  { label: "Tree test", x: 0.74, y: 0.82 },
  { label: "A/B test", x: 0.86, y: 0.62 },
];

const QUADRANT_LABELS = [
  { label: "DISCOVER · ATTITUDE", x: 0.08, y: 0.04, anchor: "start" as const },
  { label: "VALIDATE · ATTITUDE", x: 0.92, y: 0.04, anchor: "end" as const },
  { label: "DISCOVER · BEHAVIOUR", x: 0.08, y: 0.96, anchor: "start" as const },
  { label: "VALIDATE · BEHAVIOUR", x: 0.92, y: 0.96, anchor: "end" as const },
];

export function ResearchMethodMatrix({ className = "" }: { className?: string }) {
  const [hovered, setHovered] = React.useState<number | null>(null);

  // Plot area
  const plotX = 80;
  const plotY = 110;
  const plotW = 300;
  const plotH = 280;

  const toX = (xN: number) => plotX + xN * plotW;
  const toY = (yN: number) => plotY + yN * plotH;

  return (
    <div className={`relative w-full max-w-[460px] mx-auto ${className}`}>
      <svg
        viewBox="0 0 460 460"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        aria-labelledby="research-method-matrix-title"
        role="img"
      >
        <title id="research-method-matrix-title">
          Research method matrix — generative vs evaluative, behavioural vs attitudinal
        </title>

        {/* Outer frame */}
        <rect
          x="20"
          y="20"
          width="420"
          height="420"
          fill="none"
          stroke="#0A102F"
          strokeWidth="1"
          strokeOpacity="0.15"
        />

        {/* Corner ticks */}
        {[
          { x: 20, y: 20 },
          { x: 440, y: 20 },
          { x: 20, y: 440 },
          { x: 440, y: 440 },
        ].map((c, i) => (
          <g key={i} stroke="#0A102F" strokeWidth="1.5" strokeOpacity="0.8">
            <line x1={c.x - 6} y1={c.y} x2={c.x + 6} y2={c.y} />
            <line x1={c.x} y1={c.y - 6} x2={c.x} y2={c.y + 6} />
          </g>
        ))}

        {/* Header labels */}
        <text
          x="32"
          y="46"
          fontFamily="var(--font-mono), ui-monospace, monospace"
          fontSize="9"
          fontWeight="500"
          fill="#0A102F"
          fillOpacity="0.5"
          letterSpacing="1.8"
        >
          METHOD MATRIX — RIGHT METHOD FOR RIGHT QUESTION
        </text>
        <text
          x="428"
          y="46"
          fontFamily="var(--font-mono), ui-monospace, monospace"
          fontSize="9"
          fontWeight="500"
          fill="#0A102F"
          fillOpacity="0.5"
          letterSpacing="1.8"
          textAnchor="end"
        >
          12 METHODS
        </text>

        {/* X-axis label below plot */}
        <text
          x={plotX + plotW / 2}
          y={plotY + plotH + 32}
          fontFamily="var(--font-mono), ui-monospace, monospace"
          fontSize="9"
          fontWeight="500"
          fill="#0A102F"
          fillOpacity="0.6"
          letterSpacing="1.5"
          textAnchor="middle"
        >
          GENERATIVE ←——— EVALUATIVE
        </text>

        {/* Y-axis label (rotated) on left */}
        <text
          x={20}
          y={plotY + plotH / 2}
          fontFamily="var(--font-mono), ui-monospace, monospace"
          fontSize="9"
          fontWeight="500"
          fill="#0A102F"
          fillOpacity="0.6"
          letterSpacing="1.5"
          textAnchor="middle"
          transform={`rotate(-90 ${36} ${plotY + plotH / 2})`}
        >
          ATTITUDINAL ←——— BEHAVIOURAL
        </text>

        {/* Plot area border */}
        <rect
          x={plotX}
          y={plotY}
          width={plotW}
          height={plotH}
          fill="#F8F8F6"
          fillOpacity="0.4"
          stroke="#0A102F"
          strokeOpacity="0.35"
          strokeWidth="1"
        />

        {/* Crosshair (axis lines through center) */}
        <line
          x1={plotX + plotW / 2}
          y1={plotY}
          x2={plotX + plotW / 2}
          y2={plotY + plotH}
          stroke="#0A102F"
          strokeOpacity="0.25"
          strokeWidth="1"
          strokeDasharray="2 3"
        />
        <line
          x1={plotX}
          y1={plotY + plotH / 2}
          x2={plotX + plotW}
          y2={plotY + plotH / 2}
          stroke="#0A102F"
          strokeOpacity="0.25"
          strokeWidth="1"
          strokeDasharray="2 3"
        />

        {/* Quadrant labels inside the plot, near corners */}
        {QUADRANT_LABELS.map((q, i) => (
          <text
            key={i}
            x={plotX + q.x * plotW}
            y={plotY + q.y * plotH + (q.y < 0.5 ? 14 : -8)}
            fontFamily="var(--font-mono), ui-monospace, monospace"
            fontSize="8"
            fill="#0A102F"
            fillOpacity="0.45"
            letterSpacing="1.2"
            textAnchor={q.anchor}
          >
            {q.label}
          </text>
        ))}

        {/* Method dots */}
        {METHODS.map((m, i) => {
          const cx = toX(m.x);
          const cy = toY(m.y);
          const isHovered = hovered === i;
          return (
            <g
              key={m.label}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: "pointer" }}
            >
              <circle
                cx={cx}
                cy={cy}
                r={isHovered ? 6 : 4}
                fill={isHovered ? "#FFD031" : "#0A102F"}
                stroke="#0A102F"
                strokeWidth="1"
                style={{ transition: "fill 200ms ease, r 200ms ease" }}
              />
              <text
                x={cx + 8}
                y={cy + 3}
                fontFamily="var(--font-mono), ui-monospace, monospace"
                fontSize="8"
                fontWeight={isHovered ? 600 : 400}
                fill="#0A102F"
                fillOpacity={isHovered ? 1 : 0.7}
                letterSpacing="0.8"
                style={{ transition: "fill-opacity 200ms ease" }}
              >
                {m.label.toUpperCase()}
              </text>
            </g>
          );
        })}

        {/* Orbiting yellow pulse dot — drifts around the matrix on a slow path */}
        <circle r="5" fill="#FFD031" stroke="#0A102F" strokeWidth="1.25">
          <animateMotion
            dur="14s"
            repeatCount="indefinite"
            path={`M ${plotX + 40} ${plotY + 40}
                   C ${plotX + plotW - 40} ${plotY + 40},
                     ${plotX + plotW - 40} ${plotY + plotH - 40},
                     ${plotX + 40} ${plotY + plotH - 40}
                   C ${plotX + 40} ${plotY + plotH / 2},
                     ${plotX + plotW / 2} ${plotY + 40},
                     ${plotX + 40} ${plotY + 40} Z`}
          />
          <animate
            attributeName="opacity"
            values="0.3;1;0.3"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Footer labels */}
        <text
          x="32"
          y="424"
          fontFamily="var(--font-mono), ui-monospace, monospace"
          fontSize="9"
          fontWeight="500"
          fill="#0A102F"
          fillOpacity="0.5"
          letterSpacing="1.8"
        >
          BEHAVIOUR &gt; OPINION
        </text>
        <text
          x="428"
          y="424"
          fontFamily="var(--font-mono), ui-monospace, monospace"
          fontSize="9"
          fontWeight="500"
          fill="#0A102F"
          fillOpacity="0.5"
          letterSpacing="1.8"
          textAnchor="end"
        >
          ZEPPSTR · RESEARCH
        </text>
      </svg>

      <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
        Hover {hovered !== null ? `· ${METHODS[hovered].label}` : "any method"}
      </p>
    </div>
  );
}
