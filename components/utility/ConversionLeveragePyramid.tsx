"use client";

import * as React from "react";

/**
 * ConversionLeveragePyramid — hero graphic for Conversion Optimization.
 *
 * Upright pyramid with 5 horizontal tiers showing where conversion leverage
 * actually lives in a funnel. Widest (largest leverage) at bottom = OFFER.
 * Narrowest (smallest leverage) at top = COLOR.
 *
 *   ▲ Color           (smallest)
 *   ▲ Design
 *   ▲ Copy
 *   ▲ Flow
 *   ▲ Offer           (largest leverage)
 *
 * Side annotations call out the gap: "Most teams test here" (top) vs
 * "Where leverage lives" (bottom). Hover any tier to highlight it.
 *
 * Same drafting aesthetic as the other hero graphics.
 */

const TIERS = [
  { n: "01", label: "Color", lift: "+1–3%", width: 90 },
  { n: "02", label: "Design", lift: "+2–10%", width: 150 },
  { n: "03", label: "Copy", lift: "+5–25%", width: 220 },
  { n: "04", label: "Flow", lift: "+10–40%", width: 290 },
  { n: "05", label: "Offer", lift: "+40–200%", width: 360 },
];

export function ConversionLeveragePyramid({ className = "" }: { className?: string }) {
  const [hovered, setHovered] = React.useState<number | null>(null);

  const tierH = 50;
  const startY = 100;
  const cx = 230;

  return (
    <div className={`relative w-full max-w-[460px] mx-auto ${className}`}>
      <svg
        viewBox="0 0 460 460"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        aria-labelledby="conversion-leverage-pyramid-title"
        role="img"
      >
        <title id="conversion-leverage-pyramid-title">
          Conversion leverage pyramid — Offer biggest lever, Color smallest
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
          CONVERSION LEVERAGE — 5 TIERS
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
          LIFT RANGE
        </text>

        <text
          x="32"
          y="76"
          fontFamily="var(--font-mono), ui-monospace, monospace"
          fontSize="8"
          fill="#0A102F"
          fillOpacity="0.4"
          letterSpacing="1.2"
        >
          TIER ↓ = MORE LEVERAGE
        </text>

        {/* Tiers */}
        {TIERS.map((tier, i) => {
          const y = startY + i * tierH;
          const isHovered = hovered === i;
          // Narrower at top, wider at bottom
          const halfWidth = tier.width / 2;
          return (
            <g
              key={tier.label}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: "pointer" }}
            >
              {/* Trapezoid-ish tier (just rect for now, width tapers visually) */}
              <rect
                x={cx - halfWidth}
                y={y}
                width={tier.width}
                height={tierH - 6}
                fill={isHovered ? "#FFD031" : "#F8F8F6"}
                stroke="#0A102F"
                strokeOpacity="0.4"
                strokeWidth="1"
                style={{ transition: "fill 240ms ease" }}
              />

              {/* Tier number */}
              <text
                x={cx - halfWidth + 10}
                y={y + 18}
                fontFamily="var(--font-mono), ui-monospace, monospace"
                fontSize="9"
                fill="#0A102F"
                fillOpacity="0.6"
                letterSpacing="1.5"
              >
                {tier.n}
              </text>

              {/* Tier label center */}
              <text
                x={cx}
                y={y + 24}
                fontFamily="var(--font-display), ui-sans-serif, system-ui, sans-serif"
                fontSize={i === 4 ? 22 : i === 3 ? 18 : i === 2 ? 16 : i === 1 ? 14 : 12}
                fontWeight={i >= 3 ? 600 : 400}
                fill="#0A102F"
                textAnchor="middle"
                letterSpacing="-0.3"
              >
                {tier.label}
              </text>

              {/* Lift range, right side */}
              <text
                x={cx + halfWidth - 10}
                y={y + 18}
                fontFamily="var(--font-mono), ui-monospace, monospace"
                fontSize="9"
                fill={i === 4 ? "#0A102F" : "#0A102F"}
                fillOpacity={i === 4 ? 1 : 0.6}
                letterSpacing="1.2"
                textAnchor="end"
                fontWeight={i === 4 ? 600 : 400}
              >
                {tier.lift}
              </text>

              {/* Pulse dot on the right edge */}
              <circle
                cx={cx + halfWidth + 10}
                cy={y + (tierH - 6) / 2}
                r="2.5"
                fill="#FFD031"
              >
                <animate
                  attributeName="opacity"
                  values="1;0.2;1"
                  dur={`${1.6 + i * 0.3}s`}
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          );
        })}

        {/* Side annotations — "Most teams test here" at top */}
        <g>
          <line
            x1="60"
            y1={startY + 25}
            x2="105"
            y2={startY + 25}
            stroke="#0A102F"
            strokeOpacity="0.4"
            strokeWidth="1"
            strokeDasharray="2 2"
          />
          <polygon
            points={`108,${startY + 22} 108,${startY + 28} 113,${startY + 25}`}
            fill="#0A102F"
            fillOpacity="0.4"
          />
          <text
            x="60"
            y={startY + 12}
            fontFamily="var(--font-mono), ui-monospace, monospace"
            fontSize="8"
            fill="#0A102F"
            fillOpacity="0.65"
            letterSpacing="1.2"
          >
            MOST TEAMS
          </text>
          <text
            x="60"
            y={startY + 38}
            fontFamily="var(--font-mono), ui-monospace, monospace"
            fontSize="8"
            fill="#0A102F"
            fillOpacity="0.65"
            letterSpacing="1.2"
          >
            TEST HERE
          </text>
        </g>

        {/* "Where leverage lives" at bottom */}
        <g>
          <line
            x1="60"
            y1={startY + 4 * tierH + 22}
            x2="48"
            y2={startY + 4 * tierH + 22}
            stroke="#0A102F"
            strokeOpacity="0.5"
            strokeWidth="1"
            strokeDasharray="2 2"
          />
          {/* Yellow accent for "where leverage lives" */}
          <line
            x1="48"
            y1={startY + 4 * tierH + 22}
            x2="48"
            y2={startY + 4 * tierH + 22 + 30}
            stroke="#FFD031"
            strokeWidth="2"
          />
          <text
            x="40"
            y={startY + 4 * tierH + 18}
            fontFamily="var(--font-mono), ui-monospace, monospace"
            fontSize="8"
            fill="#0A102F"
            fillOpacity="0.8"
            letterSpacing="1.2"
            textAnchor="end"
          >
            WHERE
          </text>
          <text
            x="40"
            y={startY + 4 * tierH + 32}
            fontFamily="var(--font-mono), ui-monospace, monospace"
            fontSize="8"
            fontWeight="500"
            fill="#0A102F"
            fillOpacity="0.9"
            letterSpacing="1.2"
            textAnchor="end"
          >
            LEVERAGE
          </text>
          <text
            x="40"
            y={startY + 4 * tierH + 46}
            fontFamily="var(--font-mono), ui-monospace, monospace"
            fontSize="8"
            fill="#0A102F"
            fillOpacity="0.8"
            letterSpacing="1.2"
            textAnchor="end"
          >
            LIVES
          </text>
        </g>

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
          OFFER &gt; FLOW &gt; COPY &gt; DESIGN
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
          ZEPPSTR · CRO
        </text>
      </svg>

      <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
        Hover {hovered !== null ? `· ${TIERS[hovered].label} (${TIERS[hovered].lift})` : "any tier"}
      </p>
    </div>
  );
}
