"use client";

import * as React from "react";

/**
 * DemandIceberg — hero graphic for Demand Generation.
 *
 * Iceberg composition with a horizontal waterline. Above the line: 5%
 * measurable signals (form fills, MQLs, demo requests). Below the line:
 * 95% unattributed dark-social signals (LinkedIn impressions, podcasts,
 * word-of-mouth). Annotations call out the percentage split.
 *
 * Drafting aesthetic — corner ticks, mono labels — and a subtle wave
 * animation along the waterline.
 */

const ABOVE_LABELS = ["Form fills", "Demo reqs", "MQLs"];
const BELOW_LABELS = [
  "LinkedIn impressions",
  "Podcast listens",
  "Dark-social shares",
  "Word-of-mouth",
  "Brand searches",
  "Content saves",
];

export function DemandIceberg({ className = "" }: { className?: string }) {
  const [hoveredZone, setHoveredZone] = React.useState<"above" | "below" | null>(null);

  // Geometry
  const waterlineY = 162;
  const cx = 230;

  // Above-water tip (5%)
  const tipTopY = waterlineY - 56;
  const tipTopHalfWidth = 18; // narrow tip at top
  const tipBottomHalfWidth = 64; // waterline width above

  // Below-water body (95%)
  const bodyBottomY = waterlineY + 220;
  const bodyTopHalfWidth = 64; // matches tip bottom
  const bodyBottomHalfWidth = 132; // wide base

  return (
    <div className={`relative w-full max-w-[460px] mx-auto ${className}`}>
      <svg
        viewBox="0 0 460 460"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        aria-labelledby="demand-iceberg-title"
        role="img"
      >
        <title id="demand-iceberg-title">
          Demand iceberg — 5% measurable signals above, 95% unattributed below
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
          DEMAND ICEBERG — Q1
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
          05% / 95% SPLIT
        </text>

        {/* Above-water annotation */}
        <text
          x="64"
          y="100"
          fontFamily="var(--font-mono), ui-monospace, monospace"
          fontSize="8"
          fontWeight="600"
          fill="#0A102F"
          fillOpacity="0.7"
          letterSpacing="1.5"
        >
          05% MEASURED
        </text>
        <text
          x="64"
          y="112"
          fontFamily="var(--font-mono), ui-monospace, monospace"
          fontSize="7"
          fill="#0A102F"
          fillOpacity="0.45"
          letterSpacing="1.2"
        >
          THE PART CRM SEES
        </text>

        {/* Above-water bracket pointing at tip */}
        <line
          x1="135"
          y1="106"
          x2="190"
          y2="106"
          stroke="#0A102F"
          strokeOpacity="0.4"
          strokeWidth="1"
          strokeDasharray="2 3"
        />
        <polygon
          points="190,103 190,109 196,106"
          fill="#0A102F"
          fillOpacity="0.6"
        />

        {/* Above-water signal labels (right side) */}
        {ABOVE_LABELS.map((label, i) => (
          <g key={`above-${i}`}>
            <text
              x="356"
              y={107 + i * 16}
              fontFamily="var(--font-mono), ui-monospace, monospace"
              fontSize="8"
              fontWeight="500"
              fill="#0A102F"
              fillOpacity="0.7"
              letterSpacing="1.2"
            >
              {label.toUpperCase()}
            </text>
            <line
              x1="350"
              y1={104 + i * 16}
              x2="276"
              y2={waterlineY - 8 - (ABOVE_LABELS.length - 1 - i) * 5}
              stroke="#0A102F"
              strokeOpacity="0.3"
              strokeWidth="1"
              strokeDasharray="2 2"
            />
          </g>
        ))}

        {/* Iceberg tip (above water) — narrow trapezoid */}
        <g
          onMouseEnter={() => setHoveredZone("above")}
          onMouseLeave={() => setHoveredZone(null)}
          style={{ cursor: "pointer" }}
        >
          <polygon
            points={`
              ${cx - tipTopHalfWidth},${tipTopY}
              ${cx + tipTopHalfWidth},${tipTopY}
              ${cx + tipBottomHalfWidth},${waterlineY}
              ${cx - tipBottomHalfWidth},${waterlineY}
            `}
            fill={hoveredZone === "above" ? "#FFD031" : "#FFFFFF"}
            stroke="#0A102F"
            strokeOpacity="0.7"
            strokeWidth="1.25"
            style={{ transition: "fill 240ms ease" }}
          />
          {/* "5%" label inside tip */}
          <text
            x={cx}
            y={waterlineY - 22}
            fontFamily="var(--font-display), ui-sans-serif, system-ui, sans-serif"
            fontSize="22"
            fontWeight="600"
            fill="#0A102F"
            textAnchor="middle"
            letterSpacing="-0.8"
          >
            5%
          </text>
        </g>

        {/* Waterline — animated wave */}
        <g>
          <line
            x1="32"
            y1={waterlineY}
            x2="428"
            y2={waterlineY}
            stroke="#FFD031"
            strokeWidth="2"
          />
          {/* Subtle wave indicator dots along the waterline */}
          {Array.from({ length: 12 }).map((_, i) => (
            <circle
              key={i}
              cx={42 + i * 32}
              cy={waterlineY}
              r="1.5"
              fill="#FFD031"
              fillOpacity="0.9"
            >
              <animate
                attributeName="cy"
                values={`${waterlineY};${waterlineY - 2};${waterlineY}`}
                dur="2.4s"
                begin={`${i * 0.15}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
          {/* "WATERLINE" label */}
          <text
            x="34"
            y={waterlineY - 4}
            fontFamily="var(--font-mono), ui-monospace, monospace"
            fontSize="7"
            fill="#0A102F"
            fillOpacity="0.55"
            letterSpacing="1.2"
          >
            ATTRIBUTION WATERLINE
          </text>
          <text
            x="426"
            y={waterlineY - 4}
            fontFamily="var(--font-mono), ui-monospace, monospace"
            fontSize="7"
            fill="#0A102F"
            fillOpacity="0.55"
            letterSpacing="1.2"
            textAnchor="end"
          >
            ↑ VISIBLE · ↓ DARK
          </text>
        </g>

        {/* Iceberg body (below water) — large trapezoid */}
        <g
          onMouseEnter={() => setHoveredZone("below")}
          onMouseLeave={() => setHoveredZone(null)}
          style={{ cursor: "pointer" }}
        >
          <polygon
            points={`
              ${cx - bodyTopHalfWidth},${waterlineY}
              ${cx + bodyTopHalfWidth},${waterlineY}
              ${cx + bodyBottomHalfWidth},${bodyBottomY}
              ${cx - bodyBottomHalfWidth},${bodyBottomY}
            `}
            fill={hoveredZone === "below" ? "#FFD031" : "#0A102F"}
            fillOpacity={hoveredZone === "below" ? 1 : 0.92}
            stroke="#0A102F"
            strokeOpacity="0.9"
            strokeWidth="1.25"
            style={{ transition: "fill 240ms ease, fill-opacity 240ms ease" }}
          />
          {/* "95%" label inside body */}
          <text
            x={cx}
            y={waterlineY + 60}
            fontFamily="var(--font-display), ui-sans-serif, system-ui, sans-serif"
            fontSize="56"
            fontWeight="200"
            fill={hoveredZone === "below" ? "#0A102F" : "#FFD031"}
            textAnchor="middle"
            letterSpacing="-2"
            style={{ transition: "fill 240ms ease" }}
          >
            95%
          </text>
          <text
            x={cx}
            y={waterlineY + 80}
            fontFamily="var(--font-mono), ui-monospace, monospace"
            fontSize="9"
            fontWeight="500"
            fill={hoveredZone === "below" ? "#0A102F" : "#FFFFFF"}
            fillOpacity={hoveredZone === "below" ? 0.85 : 0.9}
            letterSpacing="1.8"
            textAnchor="middle"
            style={{ transition: "fill 240ms ease" }}
          >
            UNATTRIBUTED DEMAND
          </text>

          {/* Body signal labels — distributed inside the body */}
          {BELOW_LABELS.map((label, i) => {
            const row = Math.floor(i / 2);
            const col = i % 2;
            const ly = waterlineY + 110 + row * 26;
            const lx = col === 0 ? cx - 56 : cx + 56;
            return (
              <text
                key={`below-${i}`}
                x={lx}
                y={ly}
                fontFamily="var(--font-mono), ui-monospace, monospace"
                fontSize="7"
                fontWeight="500"
                fill={hoveredZone === "below" ? "#0A102F" : "#FFFFFF"}
                fillOpacity={hoveredZone === "below" ? 0.65 : 0.55}
                letterSpacing="1.0"
                textAnchor={col === 0 ? "end" : "start"}
                style={{ transition: "fill 240ms ease" }}
              >
                {label.toUpperCase()}
              </text>
            );
          })}
        </g>

        {/* Below-water annotation */}
        <text
          x="64"
          y="240"
          fontFamily="var(--font-mono), ui-monospace, monospace"
          fontSize="8"
          fontWeight="600"
          fill="#0A102F"
          fillOpacity="0.7"
          letterSpacing="1.5"
        >
          95% INVISIBLE
        </text>
        <text
          x="64"
          y="252"
          fontFamily="var(--font-mono), ui-monospace, monospace"
          fontSize="7"
          fill="#0A102F"
          fillOpacity="0.45"
          letterSpacing="1.2"
        >
          WHERE PIPELINE COMES FROM
        </text>

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
          CREATE &gt; CAPTURE
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
          ZEPPSTR · DEMAND
        </text>
      </svg>

      <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
        Hover{" "}
        {hoveredZone === "above"
          ? "· 5% measured signals"
          : hoveredZone === "below"
            ? "· 95% unattributed demand"
            : "· above or below the waterline"}
      </p>
    </div>
  );
}
