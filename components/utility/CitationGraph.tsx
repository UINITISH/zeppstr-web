"use client";

import * as React from "react";

/**
 * CitationGraph — hero graphic for the Authority Building page.
 *
 * Radial node graph: a central BRAND node with 8 publication-citation nodes
 * arranged around it at varying distances. Each node connects to the brand
 * with a directional dashed line; line thickness encodes citation weight
 * (T1 publications draw a heavier line than T3).
 *
 * Drafting aesthetic — corner ticks, mono labels, hairline rules. Animated
 * pulse halo on the brand node. Hover any publication node lights up its
 * citation path.
 */

type Citation = {
  label: string;
  tier: 1 | 2 | 3;
  /** Angle in degrees (0 = right, 90 = top, etc.) */
  angle: number;
  /** Distance from center */
  distance: number;
};

const CITATIONS: Citation[] = [
  // Tier 1 — heavy lines, closer
  { label: "WSJ", tier: 1, angle: 80, distance: 120 },
  { label: "TechCrunch", tier: 1, angle: 280, distance: 120 },
  // Tier 2 — medium
  { label: "Forbes", tier: 2, angle: 30, distance: 145 },
  { label: "Inc.", tier: 2, angle: 150, distance: 140 },
  { label: "HBR", tier: 2, angle: 210, distance: 145 },
  { label: "Wired", tier: 2, angle: 330, distance: 140 },
  // Tier 3 — light
  { label: "Trade Blog", tier: 3, angle: 0, distance: 165 },
  { label: "Niche Pub", tier: 3, angle: 180, distance: 165 },
];

export function CitationGraph({ className = "" }: { className?: string }) {
  const [hovered, setHovered] = React.useState<number | null>(null);

  // Center of the canvas (within the inset frame)
  const cx = 230;
  const cy = 230;

  function nodePosition(angle: number, distance: number) {
    const rad = (angle * Math.PI) / 180;
    return {
      x: cx + Math.cos(rad) * distance,
      // Flip y so positive angle goes up visually
      y: cy - Math.sin(rad) * distance,
    };
  }

  return (
    <div className={`relative w-full max-w-[460px] mx-auto ${className}`}>
      <svg
        viewBox="0 0 460 460"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        aria-labelledby="citation-graph-title"
        role="img"
      >
        <title id="citation-graph-title">
          Citation graph — publications citing the brand
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
          CITATION GRAPH — Q1 2026
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
          08 CITATIONS
        </text>

        {/* Legend bottom-left */}
        <g>
          <line
            x1="32"
            y1="404"
            x2="48"
            y2="404"
            stroke="#0A102F"
            strokeWidth="2.5"
            strokeOpacity="0.8"
          />
          <text
            x="54"
            y="407"
            fontFamily="var(--font-mono), ui-monospace, monospace"
            fontSize="7"
            fill="#0A102F"
            fillOpacity="0.55"
            letterSpacing="1.0"
          >
            T1 · HEAVY
          </text>

          <line
            x1="118"
            y1="404"
            x2="134"
            y2="404"
            stroke="#0A102F"
            strokeWidth="1.5"
            strokeOpacity="0.6"
          />
          <text
            x="140"
            y="407"
            fontFamily="var(--font-mono), ui-monospace, monospace"
            fontSize="7"
            fill="#0A102F"
            fillOpacity="0.55"
            letterSpacing="1.0"
          >
            T2 · MEDIUM
          </text>

          <line
            x1="208"
            y1="404"
            x2="224"
            y2="404"
            stroke="#0A102F"
            strokeWidth="0.75"
            strokeOpacity="0.45"
          />
          <text
            x="230"
            y="407"
            fontFamily="var(--font-mono), ui-monospace, monospace"
            fontSize="7"
            fill="#0A102F"
            fillOpacity="0.55"
            letterSpacing="1.0"
          >
            T3 · LIGHT
          </text>
        </g>

        {/* Citation lines (drawn first so nodes overlay them) */}
        {CITATIONS.map((c, i) => {
          const pos = nodePosition(c.angle, c.distance);
          const isHovered = hovered === i;
          const strokeWidth = isHovered ? 3 : c.tier === 1 ? 2.5 : c.tier === 2 ? 1.5 : 0.75;
          const baseOpacity = c.tier === 1 ? 0.8 : c.tier === 2 ? 0.6 : 0.45;
          return (
            <line
              key={`line-${i}`}
              x1={pos.x}
              y1={pos.y}
              x2={cx}
              y2={cy}
              stroke={isHovered ? "#FFD031" : "#0A102F"}
              strokeOpacity={isHovered ? 1 : baseOpacity}
              strokeWidth={strokeWidth}
              strokeDasharray="3 3"
              style={{ transition: "stroke 200ms ease, stroke-width 200ms ease" }}
            >
              <animate
                attributeName="stroke-dashoffset"
                from="0"
                to="-6"
                dur={`${3 + i * 0.4}s`}
                repeatCount="indefinite"
              />
            </line>
          );
        })}

        {/* Central brand node */}
        <g>
          {/* Outer pulse halo */}
          <circle
            cx={cx}
            cy={cy}
            r="42"
            fill="none"
            stroke="#FFD031"
            strokeOpacity="0.5"
            strokeWidth="1"
          >
            <animate
              attributeName="r"
              values="42;58;42"
              dur="3s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="stroke-opacity"
              values="0.5;0;0.5"
              dur="3s"
              repeatCount="indefinite"
            />
          </circle>
          <rect
            x={cx - 38}
            y={cy - 28}
            width="76"
            height="56"
            fill="#0A102F"
          />
          <text
            x={cx}
            y={cy - 6}
            fontFamily="var(--font-mono), ui-monospace, monospace"
            fontSize="8"
            fill="#FFD031"
            letterSpacing="1.5"
            textAnchor="middle"
          >
            00
          </text>
          <text
            x={cx}
            y={cy + 9}
            fontFamily="var(--font-display), ui-sans-serif, system-ui, sans-serif"
            fontSize="14"
            fontWeight="400"
            fill="#FFFFFF"
            textAnchor="middle"
            letterSpacing="-0.4"
          >
            BRAND
          </text>
          <text
            x={cx}
            y={cy + 22}
            fontFamily="var(--font-mono), ui-monospace, monospace"
            fontSize="7"
            fill="#FFFFFF"
            fillOpacity="0.7"
            letterSpacing="1.0"
            textAnchor="middle"
          >
            SOURCE
          </text>
        </g>

        {/* Citation nodes */}
        {CITATIONS.map((c, i) => {
          const pos = nodePosition(c.angle, c.distance);
          const isHovered = hovered === i;
          // Size by tier
          const w = c.tier === 1 ? 64 : c.tier === 2 ? 56 : 48;
          const h = 24;
          return (
            <g
              key={`node-${i}`}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: "pointer" }}
            >
              <rect
                x={pos.x - w / 2}
                y={pos.y - h / 2}
                width={w}
                height={h}
                fill={isHovered ? "#FFD031" : "#FFFFFF"}
                stroke="#0A102F"
                strokeOpacity={c.tier === 1 ? 0.85 : c.tier === 2 ? 0.6 : 0.45}
                strokeWidth={c.tier === 1 ? 1.5 : 1}
                style={{ transition: "fill 200ms ease" }}
              />
              <text
                x={pos.x}
                y={pos.y + 3}
                fontFamily="var(--font-mono), ui-monospace, monospace"
                fontSize={c.tier === 3 ? 7 : 8}
                fontWeight={c.tier === 1 ? 600 : 500}
                fill="#0A102F"
                letterSpacing="0.8"
                textAnchor="middle"
              >
                {c.label.toUpperCase()}
              </text>
              {/* Tier indicator dot */}
              <circle
                cx={pos.x - w / 2 + 4}
                cy={pos.y - h / 2 + 4}
                r="1.5"
                fill={c.tier === 1 ? "#FFD031" : c.tier === 2 ? "#0A102F" : "#0A102F"}
                fillOpacity={c.tier === 1 ? 1 : c.tier === 2 ? 0.6 : 0.35}
              />
              {/* Arrow head pointing at the brand */}
              {(() => {
                // Direction from node to brand
                const dx = cx - pos.x;
                const dy = cy - pos.y;
                const len = Math.sqrt(dx * dx + dy * dy);
                // Point arrowhead 4px before node edge
                const baseDist = w / 2 + 4;
                const headX = pos.x + (dx / len) * baseDist;
                const headY = pos.y + (dy / len) * baseDist;
                return (
                  <circle
                    cx={headX}
                    cy={headY}
                    r="2.5"
                    fill="#FFD031"
                  >
                    <animate
                      attributeName="opacity"
                      values="1;0.3;1"
                      dur={`${2 + (i % 4) * 0.4}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                );
              })()}
            </g>
          );
        })}

        {/* Footer labels */}
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
          ZEPPSTR · AUTHORITY
        </text>
      </svg>

      <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
        Hover {hovered !== null ? `· ${CITATIONS[hovered].label} (T${CITATIONS[hovered].tier})` : "any citation"}
      </p>
    </div>
  );
}
