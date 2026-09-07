"use client";

import * as React from "react";

/**
 * ProductionAssetTree — hero graphic for the Video Production page.
 *
 * Tree/fan diagram showing how one shoot day expands into multiple
 * deployable assets. Left: "Shoot Day" trunk node. Center: "Edit" middle
 * node. Right: fan of 6 leaf nodes (Hero Film / Cut-down / Vertical /
 * Stills / BTS / Sales Cut), each connected by an animated dashed branch.
 *
 * Same drafting aesthetic as the other hero graphics: corner ticks, mono
 * labels, hairline rules. Tokens only.
 */

const LEAVES = [
  { label: "Hero Film", spec: "90s · YouTube + Site" },
  { label: "Cut-down", spec: "60s + 30s · Paid" },
  { label: "Vertical Cuts", spec: "6 × 15s · Social" },
  { label: "Stills", spec: "3 photo plates" },
  { label: "BTS", spec: "Behind-the-scenes" },
  { label: "Sales Cuts", spec: "2 product clips" },
];

export function ProductionAssetTree({ className = "" }: { className?: string }) {
  const [hovered, setHovered] = React.useState<number | null>(null);

  // Anchor points
  const trunkX = 70;
  const trunkY = 230;
  const editX = 180;
  const editY = 230;
  const leafX = 340;

  // Distribute 6 leaves vertically — symmetric around 230
  const leafYs = LEAVES.map((_, i) => 90 + i * 56);

  return (
    <div className={`relative w-full max-w-[460px] mx-auto ${className}`}>
      <svg
        viewBox="0 0 460 460"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        aria-labelledby="production-asset-tree-title"
        role="img"
      >
        <title id="production-asset-tree-title">
          Production asset tree — one shoot day, many assets
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
          PRODUCTION ASSET TREE — Q1
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
          01 × ∞
        </text>

        <text
          x="32"
          y="74"
          fontFamily="var(--font-mono), ui-monospace, monospace"
          fontSize="8"
          fill="#0A102F"
          fillOpacity="0.4"
          letterSpacing="1.2"
        >
          INPUT
        </text>
        <text
          x="180"
          y="74"
          fontFamily="var(--font-mono), ui-monospace, monospace"
          fontSize="8"
          fill="#0A102F"
          fillOpacity="0.4"
          letterSpacing="1.2"
          textAnchor="middle"
        >
          MULTIPLIER
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
          OUTPUT ASSETS
        </text>

        {/* Trunk node — Shoot Day */}
        <g>
          <rect
            x={trunkX - 30}
            y={trunkY - 30}
            width="60"
            height="60"
            fill="#0A102F"
          />
          <text
            x={trunkX}
            y={trunkY - 8}
            fontFamily="var(--font-mono), ui-monospace, monospace"
            fontSize="8"
            fill="#FFD031"
            letterSpacing="1.5"
            textAnchor="middle"
          >
            01
          </text>
          <text
            x={trunkX}
            y={trunkY + 6}
            fontFamily="var(--font-display), ui-sans-serif, system-ui, sans-serif"
            fontSize="13"
            fontWeight="400"
            fill="#FFFFFF"
            textAnchor="middle"
          >
            SHOOT
          </text>
          <text
            x={trunkX}
            y={trunkY + 20}
            fontFamily="var(--font-display), ui-sans-serif, system-ui, sans-serif"
            fontSize="13"
            fontWeight="400"
            fill="#FFFFFF"
            textAnchor="middle"
          >
            DAY
          </text>
        </g>

        {/* Trunk → Edit connection */}
        <line
          x1={trunkX + 30}
          y1={trunkY}
          x2={editX - 30}
          y2={editY}
          stroke="#0A102F"
          strokeOpacity="0.4"
          strokeWidth="1.25"
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
        <polygon
          points={`${editX - 32},${editY - 4} ${editX - 32},${editY + 4} ${editX - 26},${editY}`}
          fill="#FFD031"
        />

        {/* Edit middle node */}
        <g>
          <rect
            x={editX - 30}
            y={editY - 22}
            width="60"
            height="44"
            fill="#FFFFFF"
            stroke="#0A102F"
            strokeOpacity="0.7"
            strokeWidth="1.25"
          />
          <text
            x={editX}
            y={editY - 4}
            fontFamily="var(--font-mono), ui-monospace, monospace"
            fontSize="8"
            fill="#0A102F"
            fillOpacity="0.6"
            letterSpacing="1.5"
            textAnchor="middle"
          >
            02
          </text>
          <text
            x={editX}
            y={editY + 10}
            fontFamily="var(--font-display), ui-sans-serif, system-ui, sans-serif"
            fontSize="13"
            fontWeight="400"
            fill="#0A102F"
            textAnchor="middle"
          >
            EDIT
          </text>
        </g>

        {/* Branches from Edit → each leaf */}
        {leafYs.map((y, i) => {
          const isHovered = hovered === i;
          // Bezier curve from edit (right edge) to leaf (left edge)
          const startX = editX + 30;
          const endX = leafX - 4;
          const midX = (startX + endX) / 2;
          const path = `M ${startX} ${editY} C ${midX} ${editY}, ${midX} ${y}, ${endX} ${y}`;
          return (
            <g
              key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: "pointer" }}
            >
              {/* Branch path */}
              <path
                d={path}
                fill="none"
                stroke={isHovered ? "#FFD031" : "#0A102F"}
                strokeOpacity={isHovered ? 1 : 0.3}
                strokeWidth={isHovered ? 2 : 1}
                strokeDasharray="3 3"
                style={{ transition: "stroke 240ms ease, stroke-opacity 240ms ease" }}
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="0"
                  to="-6"
                  dur={`${2 + i * 0.4}s`}
                  repeatCount="indefinite"
                />
              </path>

              {/* Leaf card */}
              <rect
                x={leafX}
                y={y - 18}
                width="86"
                height="36"
                fill={isHovered ? "#FFD031" : "#F8F8F6"}
                stroke="#0A102F"
                strokeOpacity="0.4"
                strokeWidth="1"
                style={{ transition: "fill 240ms ease" }}
              />

              {/* Leaf label */}
              <text
                x={leafX + 6}
                y={y - 4}
                fontFamily="var(--font-display), ui-sans-serif, system-ui, sans-serif"
                fontSize="10.5"
                fontWeight="500"
                fill="#0A102F"
              >
                {LEAVES[i].label}
              </text>

              {/* Spec */}
              <text
                x={leafX + 6}
                y={y + 9}
                fontFamily="var(--font-mono), ui-monospace, monospace"
                fontSize="7"
                fill="#0A102F"
                fillOpacity="0.6"
                letterSpacing="0.8"
              >
                {LEAVES[i].spec.toUpperCase()}
              </text>

              {/* Pulse dot at leaf */}
              <circle
                cx={leafX - 4}
                cy={y}
                r="2"
                fill="#FFD031"
              >
                <animate
                  attributeName="opacity"
                  values="1;0.2;1"
                  dur={`${1.6 + (i % 4) * 0.4}s`}
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
          ONE SHOOT · SIXTEEN ASSETS
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
          ZEPPSTR · VIDEO
        </text>
      </svg>

      <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
        Hover {hovered !== null ? `· ${LEAVES[hovered].label}` : "any output"}
      </p>
    </div>
  );
}
