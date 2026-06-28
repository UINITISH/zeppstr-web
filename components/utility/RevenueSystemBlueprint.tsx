"use client";

import * as React from "react";

/**
 * RevenueSystemBlueprint — hero graphic for Revenue System Design.
 *
 * 5 horizontal stage rails (Acquire / Convert / Activate / Retain / Expand)
 * each showing 3 sub-components as small boxes plus a KPI label. Arrows flow
 * downward between rails; a yellow loop-back arrow on the right curves from
 * Expand back to Acquire (referral / repeat compounds back to acquisition).
 *
 * Reinforces the page POV — the system is wired, not assembled.
 */

const STAGES = [
  {
    n: "01",
    name: "Acquire",
    components: ["Paid", "Organic", "Referral"],
    kpi: "CAC",
  },
  {
    n: "02",
    name: "Convert",
    components: ["Site", "Sales", "Trial"],
    kpi: "CVR",
  },
  {
    n: "03",
    name: "Activate",
    components: ["Onboard", "First value", "Setup"],
    kpi: "TT-Value",
  },
  {
    n: "04",
    name: "Retain",
    components: ["Lifecycle", "Success", "Engage"],
    kpi: "Retention",
  },
  {
    n: "05",
    name: "Expand",
    components: ["Upsell", "Cross-sell", "Referral"],
    kpi: "NRR",
  },
];

export function RevenueSystemBlueprint({ className = "" }: { className?: string }) {
  const [hovered, setHovered] = React.useState<number | null>(null);

  // Geometry
  const railX = 86;
  const railY = 96;
  const railW = 290;
  const railH = 50;
  const railGap = 8;

  return (
    <div className={`relative w-full max-w-[460px] mx-auto ${className}`}>
      <svg
        viewBox="0 0 460 460"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        aria-labelledby="revenue-system-blueprint-title"
        role="img"
      >
        <title id="revenue-system-blueprint-title">
          Revenue system blueprint — 5 stages wired with a referral loop-back
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
          REVENUE SYSTEM — v1.0
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
          5 STAGES · LOOP
        </text>

        {/* Column headers */}
        <text
          x={36}
          y={80}
          fontFamily="var(--font-mono), ui-monospace, monospace"
          fontSize="8"
          fill="#0A102F"
          fillOpacity="0.4"
          letterSpacing="1.2"
        >
          STAGE
        </text>
        <text
          x={railX + railW / 2}
          y={80}
          fontFamily="var(--font-mono), ui-monospace, monospace"
          fontSize="8"
          fill="#0A102F"
          fillOpacity="0.4"
          letterSpacing="1.2"
          textAnchor="middle"
        >
          COMPONENTS
        </text>
        <text
          x={428}
          y={80}
          fontFamily="var(--font-mono), ui-monospace, monospace"
          fontSize="8"
          fill="#0A102F"
          fillOpacity="0.4"
          letterSpacing="1.2"
          textAnchor="end"
        >
          KPI
        </text>

        {/* Stage rails */}
        {STAGES.map((stage, i) => {
          const y = railY + i * (railH + railGap);
          const isHovered = hovered === i;
          return (
            <g
              key={stage.n}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: "pointer" }}
            >
              {/* Left — stage number + name */}
              <text
                x={36}
                y={y + 18}
                fontFamily="var(--font-mono), ui-monospace, monospace"
                fontSize="9"
                fill="#0A102F"
                fillOpacity="0.55"
                letterSpacing="1.5"
              >
                {stage.n}
              </text>
              <text
                x={36}
                y={y + 40}
                fontFamily="var(--font-display), ui-sans-serif, system-ui, sans-serif"
                fontSize="14"
                fontWeight="500"
                fill="#0A102F"
                letterSpacing="-0.4"
              >
                {stage.name}
              </text>

              {/* Middle — rail bar with components */}
              <rect
                x={railX}
                y={y}
                width={railW}
                height={railH}
                fill={isHovered ? "#FFD031" : "#F8F8F6"}
                stroke="#0A102F"
                strokeOpacity="0.4"
                strokeWidth="1"
                style={{ transition: "fill 240ms ease" }}
              />

              {/* Sub-component pills */}
              {stage.components.map((comp, ci) => {
                const compW = (railW - 24) / stage.components.length;
                const cx = railX + 12 + ci * compW;
                return (
                  <g key={comp}>
                    <rect
                      x={cx}
                      y={y + 12}
                      width={compW - 8}
                      height={railH - 24}
                      fill="#FFFFFF"
                      stroke="#0A102F"
                      strokeOpacity="0.35"
                      strokeWidth="1"
                    />
                    <text
                      x={cx + (compW - 8) / 2}
                      y={y + railH / 2 + 4}
                      fontFamily="var(--font-mono), ui-monospace, monospace"
                      fontSize="9"
                      fontWeight="500"
                      fill="#0A102F"
                      letterSpacing="1.0"
                      textAnchor="middle"
                    >
                      {comp.toUpperCase()}
                    </text>
                  </g>
                );
              })}

              {/* Right — KPI badge */}
              <text
                x={428}
                y={y + 18}
                fontFamily="var(--font-mono), ui-monospace, monospace"
                fontSize="8"
                fill="#0A102F"
                fillOpacity="0.45"
                letterSpacing="1.2"
                textAnchor="end"
              >
                {stage.n}
              </text>
              <text
                x={428}
                y={y + 40}
                fontFamily="var(--font-mono), ui-monospace, monospace"
                fontSize="9"
                fontWeight="600"
                fill="#0A102F"
                fillOpacity="0.85"
                letterSpacing="1.2"
                textAnchor="end"
              >
                {stage.kpi}
              </text>

              {/* Downward arrow between rails (except last) */}
              {i < STAGES.length - 1 && (
                <g>
                  <line
                    x1={railX + railW / 2}
                    y1={y + railH}
                    x2={railX + railW / 2}
                    y2={y + railH + railGap}
                    stroke="#0A102F"
                    strokeOpacity="0.5"
                    strokeWidth="1"
                  />
                  <polygon
                    points={`${railX + railW / 2 - 3.5},${y + railH + railGap - 4} ${railX + railW / 2 + 3.5},${y + railH + railGap - 4} ${railX + railW / 2},${y + railH + railGap + 1}`}
                    fill="#FFD031"
                  />
                </g>
              )}
            </g>
          );
        })}

        {/* Loop-back arrow on the right side from stage 05 → stage 01 */}
        {(() => {
          const last = railY + 4 * (railH + railGap) + railH / 2;
          const first = railY + railH / 2;
          const startX = railX + railW + 4;
          const loopX = railX + railW + 28;
          return (
            <g>
              {/* Path: out from stage 05 → up the right edge → into stage 01 */}
              <path
                d={`M ${startX} ${last}
                    L ${loopX} ${last}
                    L ${loopX} ${first}
                    L ${startX} ${first}`}
                fill="none"
                stroke="#FFD031"
                strokeWidth="1.75"
                strokeDasharray="4 3"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="0"
                  to="-7"
                  dur="2.4s"
                  repeatCount="indefinite"
                />
              </path>
              {/* Arrowhead into stage 01 */}
              <polygon
                points={`${startX - 1},${first - 4} ${startX - 1},${first + 4} ${startX - 6},${first}`}
                fill="#FFD031"
              />
              {/* Label */}
              <text
                x={loopX + 4}
                y={(first + last) / 2 - 6}
                fontFamily="var(--font-mono), ui-monospace, monospace"
                fontSize="8"
                fontWeight="500"
                fill="#0A102F"
                fillOpacity="0.7"
                letterSpacing="1.2"
              >
                LOOP
              </text>
              <text
                x={loopX + 4}
                y={(first + last) / 2 + 6}
                fontFamily="var(--font-mono), ui-monospace, monospace"
                fontSize="7"
                fill="#0A102F"
                fillOpacity="0.5"
                letterSpacing="1.0"
              >
                COMPOUND
              </text>
            </g>
          );
        })()}

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
          SYSTEM &gt; TACTICS
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
          ZEPPSTR · REVENUE
        </text>
      </svg>

      <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
        Hover {hovered !== null ? `· ${STAGES[hovered].name} · ${STAGES[hovered].kpi}` : "any stage"}
      </p>
    </div>
  );
}
