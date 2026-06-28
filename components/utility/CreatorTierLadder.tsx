"use client";

import * as React from "react";

/**
 * CreatorTierLadder — hero graphic for the Influencer & Creator Partnership page.
 *
 * Three stacked horizontal bands representing the tier system Zeppstr uses to
 * structure creator partnerships:
 *   ANCHOR    — 1 per quarter — 1M+ reach
 *   RESONANCE — 3 per quarter — 100K–1M
 *   NICHE     — 8 per quarter — 10K–100K
 *
 * Each tier is sized by relative reach (anchor widest, niche narrowest) and
 * pulses subtly. On hover the band turns yellow.
 *
 * Same drafting aesthetic as BrandIdentitySystem — corner ticks, mono labels,
 * coordinate ticks. Tokens only: brand-yellow, ink-headline, emerald-900.
 */

const TIERS = [
  {
    n: "01",
    label: "Anchor",
    reach: "1M+",
    cadence: "1 / quarter",
    role: "Hero creative the quarter is built around",
    width: 360,
  },
  {
    n: "02",
    label: "Resonance",
    reach: "100K – 1M",
    cadence: "3 / quarter",
    role: "Mid-funnel signal · audience overlap with high-LTV",
    width: 280,
  },
  {
    n: "03",
    label: "Niche",
    reach: "10K – 100K",
    cadence: "8 / quarter",
    role: "The compounding tier · high engagement, low CPM",
    width: 200,
  },
];

export function CreatorTierLadder({ className = "" }: { className?: string }) {
  const [hovered, setHovered] = React.useState<number | null>(null);

  return (
    <div className={`relative w-full max-w-[460px] mx-auto ${className}`}>
      <svg
        viewBox="0 0 460 460"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        aria-labelledby="creator-tier-ladder-title"
        role="img"
      >
        <title id="creator-tier-ladder-title">
          Creator Partnership Tiers — Anchor, Resonance, Niche
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

        {/* Vertical reach axis ticks on left edge */}
        {Array.from({ length: 9 }).map((_, i) => {
          const y = 60 + i * 42.5;
          return (
            <line
              key={i}
              x1={20}
              y1={y}
              x2={26}
              y2={y}
              stroke="#0A102F"
              strokeOpacity="0.3"
              strokeWidth="1"
            />
          );
        })}

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
          CREATOR PARTNERSHIP TIERS — Q1
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
          12 / QUARTER
        </text>

        {/* Reach axis label */}
        <text
          x="32"
          y="76"
          fontFamily="var(--font-mono), ui-monospace, monospace"
          fontSize="8"
          fill="#0A102F"
          fillOpacity="0.4"
          letterSpacing="1.2"
        >
          REACH ↓
        </text>

        {/* Three tier bands */}
        {TIERS.map((tier, i) => {
          const bandY = 100 + i * 110;
          const bandHeight = 88;
          const bandX = 60;
          const fill = hovered === i ? "#FFD031" : "#F8F8F6";

          return (
            <g
              key={tier.label}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: "pointer" }}
            >
              {/* Tier band — width tapers down for visual hierarchy */}
              <rect
                x={bandX}
                y={bandY}
                width={tier.width}
                height={bandHeight}
                fill={fill}
                stroke="#0A102F"
                strokeOpacity="0.18"
                strokeWidth="1"
                style={{ transition: "fill 240ms ease" }}
              />

              {/* Tier number */}
              <text
                x={bandX + 14}
                y={bandY + 22}
                fontFamily="var(--font-mono), ui-monospace, monospace"
                fontSize="9"
                fill="#0A102F"
                fillOpacity="0.6"
                letterSpacing="1.5"
              >
                {tier.n}
              </text>

              {/* Tier label — large extralight */}
              <text
                x={bandX + 14}
                y={bandY + 58}
                fontFamily="var(--font-display), ui-sans-serif, system-ui, sans-serif"
                fontSize="30"
                fontWeight="300"
                fill="#0A102F"
                letterSpacing="-0.8"
              >
                {tier.label}
              </text>

              {/* Reach figure — right-aligned inside band */}
              <text
                x={bandX + tier.width - 14}
                y={bandY + 24}
                fontFamily="var(--font-mono), ui-monospace, monospace"
                fontSize="9"
                fill="#0A102F"
                fillOpacity="0.7"
                letterSpacing="1.5"
                textAnchor="end"
              >
                {tier.reach}
              </text>

              {/* Cadence */}
              <text
                x={bandX + tier.width - 14}
                y={bandY + 74}
                fontFamily="var(--font-mono), ui-monospace, monospace"
                fontSize="9"
                fill="#0A102F"
                fillOpacity="0.8"
                letterSpacing="1.5"
                textAnchor="end"
              >
                {tier.cadence.toUpperCase()}
              </text>

              {/* Pulse indicator dot */}
              <circle
                cx={bandX + tier.width + 14}
                cy={bandY + bandHeight / 2}
                r="3"
                fill="#FFD031"
              >
                <animate
                  attributeName="opacity"
                  values="1;0.2;1"
                  dur={`${2 + i * 0.7}s`}
                  repeatCount="indefinite"
                />
              </circle>

              {/* Tier role description below band (only visible on hover) */}
              <text
                x={bandX + 14}
                y={bandY + bandHeight + 14}
                fontFamily="var(--font-mono), ui-monospace, monospace"
                fontSize="8"
                fill="#0A102F"
                fillOpacity={hovered === i ? 0.7 : 0}
                letterSpacing="1.2"
                style={{ transition: "fill-opacity 240ms ease" }}
              >
                {tier.role.toUpperCase()}
              </text>
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
          OWNED, NOT RENTED
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
          ZEPPSTR · CREATORS
        </text>
      </svg>

      {/* Hover hint */}
      <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
        Hover {hovered !== null ? `· ${TIERS[hovered].label}` : "any tier"}
      </p>
    </div>
  );
}
