"use client";

import * as React from "react";

/**
 * EmailFlowGraph — hero graphic for the Lifecycle & Email page.
 *
 * Vertical pipeline of 5 customer lifecycle states connected by labeled
 * transitions. Each transition is an automated email flow. A side branch
 * shows the win-back loop for first buyers who don't repeat in 60 days.
 *
 * Animated marching dots travel down the pipeline, indicating live flow.
 *
 * Same drafting aesthetic as BrandIdentitySystem and CreatorTierLadder:
 * corner ticks, mono labels, hairline rules. Tokens only.
 */

const STATES = [
  { label: "Subscriber", n: "01" },
  { label: "Activated", n: "02" },
  { label: "First Buyer", n: "03" },
  { label: "Repeat Buyer", n: "04" },
  { label: "Loyal", n: "05" },
];

const TRANSITIONS = [
  "Welcome series · 3 emails",
  "Browse + cart abandon",
  "Post-purchase · 5 emails",
  "Replenishment + cross-sell",
];

export function EmailFlowGraph({ className = "" }: { className?: string }) {
  const [hovered, setHovered] = React.useState<number | null>(null);

  // Vertical layout — nodes evenly spaced down the center
  const cx = 230;
  const startY = 96;
  const stepY = 65;

  return (
    <div className={`relative w-full max-w-[460px] mx-auto ${className}`}>
      <svg
        viewBox="0 0 460 460"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        aria-labelledby="email-flow-graph-title"
        role="img"
      >
        <title id="email-flow-graph-title">
          Lifecycle State Machine — Subscriber to Loyal
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
          LIFECYCLE STATE MACHINE — v1.0
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
          5 STATES · 4 FLOWS
        </text>

        {/* Sub-header */}
        <text
          x="32"
          y="74"
          fontFamily="var(--font-mono), ui-monospace, monospace"
          fontSize="8"
          fill="#0A102F"
          fillOpacity="0.4"
          letterSpacing="1.2"
        >
          STATE ↓
        </text>
        <text
          x="428"
          y="74"
          fontFamily="var(--font-mono), ui-monospace, monospace"
          fontSize="8"
          fill="#0A102F"
          fillOpacity="0.4"
          letterSpacing="1.2"
          textAnchor="end"
        >
          FLOW
        </text>

        {/* Connecting pipeline — vertical dashed line with marching animation */}
        <line
          x1={cx}
          y1={startY + 14}
          x2={cx}
          y2={startY + stepY * 4 - 14}
          stroke="#0A102F"
          strokeOpacity="0.5"
          strokeWidth="1"
          strokeDasharray="4 4"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="0"
            to="-8"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </line>

        {/* Win-back side branch — from First Buyer (idx 2), curves right and back down */}
        <path
          d={`M ${cx + 14} ${startY + stepY * 2}
              Q ${cx + 80} ${startY + stepY * 2 + 8}, ${cx + 80} ${startY + stepY * 2 + 40}
              Q ${cx + 80} ${startY + stepY * 3 + 12}, ${cx + 14} ${startY + stepY * 3}`}
          fill="none"
          stroke="#0A102F"
          strokeOpacity="0.3"
          strokeWidth="1"
          strokeDasharray="3 3"
        />
        <text
          x={cx + 92}
          y={startY + stepY * 2 + 36}
          fontFamily="var(--font-mono), ui-monospace, monospace"
          fontSize="8"
          fill="#0A102F"
          fillOpacity="0.5"
          letterSpacing="1.2"
        >
          ↻ WIN-BACK
        </text>
        <text
          x={cx + 92}
          y={startY + stepY * 2 + 48}
          fontFamily="var(--font-mono), ui-monospace, monospace"
          fontSize="8"
          fill="#0A102F"
          fillOpacity="0.4"
          letterSpacing="1.2"
        >
          @ NO-PURCHASE 60D
        </text>

        {/* Transition labels — appear between each pair of nodes */}
        {TRANSITIONS.map((label, i) => {
          const labelY = startY + stepY * i + stepY / 2 + 4;
          return (
            <g key={i}>
              <text
                x={cx - 24}
                y={labelY}
                fontFamily="var(--font-mono), ui-monospace, monospace"
                fontSize="8"
                fill="#0A102F"
                fillOpacity="0.6"
                letterSpacing="1.2"
                textAnchor="end"
              >
                {label.toUpperCase()}
              </text>
              {/* Yellow arrow head pointing down on the pipeline */}
              <polygon
                points={`${cx - 3.5},${labelY - 2} ${cx + 3.5},${labelY - 2} ${cx},${labelY + 3}`}
                fill="#FFD031"
              />
            </g>
          );
        })}

        {/* State nodes — rectangles down the center */}
        {STATES.map((state, i) => {
          const y = startY + stepY * i;
          const isHovered = hovered === i;
          return (
            <g
              key={state.label}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: "pointer" }}
            >
              {/* Node rectangle */}
              <rect
                x={cx - 100}
                y={y - 16}
                width="200"
                height="32"
                fill={isHovered ? "#FFD031" : "#FFFFFF"}
                stroke="#0A102F"
                strokeOpacity="0.6"
                strokeWidth="1.25"
                style={{ transition: "fill 240ms ease" }}
              />
              {/* State number — small mono left */}
              <text
                x={cx - 92}
                y={y + 4}
                fontFamily="var(--font-mono), ui-monospace, monospace"
                fontSize="9"
                fill="#0A102F"
                fillOpacity="0.6"
                letterSpacing="1.5"
              >
                {state.n}
              </text>
              {/* State label — display weight, center */}
              <text
                x={cx}
                y={y + 5}
                fontFamily="var(--font-display), ui-sans-serif, system-ui, sans-serif"
                fontSize="16"
                fontWeight="400"
                fill="#0A102F"
                textAnchor="middle"
                letterSpacing="-0.3"
              >
                {state.label}
              </text>
              {/* Pulse dot on the right */}
              <circle
                cx={cx + 92}
                cy={y}
                r="2.5"
                fill="#FFD031"
              >
                <animate
                  attributeName="opacity"
                  values="1;0.2;1"
                  dur={`${2 + (i % 3) * 0.5}s`}
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          );
        })}

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
          AUTOMATED · MEASURED
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
          ZEPPSTR · LIFECYCLE
        </text>
      </svg>

      {/* Hover hint */}
      <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
        Hover {hovered !== null ? `· ${STATES[hovered].label}` : "any state"}
      </p>
    </div>
  );
}
