"use client";

import * as React from "react";

/**
 * SpendAllocationDial — hero graphic for Paid Search.
 *
 * Circular pie chart with 5 budget segments showing how a disciplined paid
 * search account allocates spend:
 *   - Brand defense
 *   - Non-brand acquisition
 *   - Competitor conquest
 *   - Long-tail expansion
 *   - Remarketing
 *
 * Each segment is labeled with its % outside the disc. The center shows
 * total spend + ROAS multiplier. Drafting aesthetic — corner ticks, mono
 * labels, hairline rules. Hover a segment to lift it forward.
 */

type Segment = {
  label: string;
  short: string;
  pct: number;
  fill: string;
  textOnFill: "ink" | "yellow" | "white";
};

const SEGMENTS: Segment[] = [
  { label: "Brand Defense", short: "BRAND", pct: 18, fill: "#FFD031", textOnFill: "ink" },
  { label: "Non-brand Acquisition", short: "NON-BRAND", pct: 38, fill: "#0A102F", textOnFill: "yellow" },
  { label: "Competitor Conquest", short: "CONQUEST", pct: 8, fill: "#FFF1B8", textOnFill: "ink" },
  { label: "Long-tail Expansion", short: "LONG-TAIL", pct: 22, fill: "#F0EAD8", textOnFill: "ink" },
  { label: "Remarketing", short: "REMARKET", pct: 14, fill: "#0A102F", textOnFill: "yellow" },
];

const TOTAL_PCT = SEGMENTS.reduce((s, x) => s + x.pct, 0); // should be 100

// Center of the dial
const CX = 230;
const CY = 240;
const R_OUTER = 110;
const R_INNER = 56;
const R_LABEL = 132; // where percentage labels sit outside the disc

// Convert percent → angle (in radians, starting from -90° / top)
function pctToAngle(pct: number, runningPct: number) {
  const startRad = ((runningPct / 100) * 360 - 90) * (Math.PI / 180);
  const endRad = (((runningPct + pct) / 100) * 360 - 90) * (Math.PI / 180);
  return { startRad, endRad };
}

function arcPath(startRad: number, endRad: number, hovered: boolean) {
  // Slight outward push on hover
  const offset = hovered ? 6 : 0;
  const midAngle = (startRad + endRad) / 2;
  const ox = Math.cos(midAngle) * offset;
  const oy = Math.sin(midAngle) * offset;

  const x1 = CX + ox + Math.cos(startRad) * R_OUTER;
  const y1 = CY + oy + Math.sin(startRad) * R_OUTER;
  const x2 = CX + ox + Math.cos(endRad) * R_OUTER;
  const y2 = CY + oy + Math.sin(endRad) * R_OUTER;
  const x3 = CX + ox + Math.cos(endRad) * R_INNER;
  const y3 = CY + oy + Math.sin(endRad) * R_INNER;
  const x4 = CX + ox + Math.cos(startRad) * R_INNER;
  const y4 = CY + oy + Math.sin(startRad) * R_INNER;

  const largeArc = endRad - startRad > Math.PI ? 1 : 0;

  return `M ${x1} ${y1}
          A ${R_OUTER} ${R_OUTER} 0 ${largeArc} 1 ${x2} ${y2}
          L ${x3} ${y3}
          A ${R_INNER} ${R_INNER} 0 ${largeArc} 0 ${x4} ${y4}
          Z`;
}

export function SpendAllocationDial({ className = "" }: { className?: string }) {
  const [hovered, setHovered] = React.useState<number | null>(null);

  // Build cumulative offsets so we can position labels
  let cumPct = 0;
  const renderedSegments = SEGMENTS.map((seg) => {
    const { startRad, endRad } = pctToAngle(seg.pct, cumPct);
    const midRad = (startRad + endRad) / 2;
    const labelX = CX + Math.cos(midRad) * R_LABEL;
    const labelY = CY + Math.sin(midRad) * R_LABEL;
    const data = { seg, startRad, endRad, midRad, labelX, labelY };
    cumPct += seg.pct;
    return data;
  });

  return (
    <div className={`relative w-full max-w-[460px] mx-auto ${className}`}>
      <svg
        viewBox="0 0 460 460"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        aria-labelledby="spend-allocation-dial-title"
        role="img"
      >
        <title id="spend-allocation-dial-title">
          Spend allocation dial — paid search budget by category
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
          SPEND ALLOCATION — Q1
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
          05 BUCKETS · {TOTAL_PCT}%
        </text>

        <text
          x="32"
          y="72"
          fontFamily="var(--font-mono), ui-monospace, monospace"
          fontSize="8"
          fill="#0A102F"
          fillOpacity="0.4"
          letterSpacing="1.2"
        >
          BY INTENT TYPE
        </text>

        {/* Outer track ring */}
        <circle
          cx={CX}
          cy={CY}
          r={R_OUTER + 6}
          fill="none"
          stroke="#0A102F"
          strokeOpacity="0.15"
          strokeWidth="1"
          strokeDasharray="3 4"
        />

        {/* Pie segments */}
        {renderedSegments.map((rs, i) => {
          const isHovered = hovered === i;
          return (
            <g
              key={rs.seg.label}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: "pointer" }}
            >
              <path
                d={arcPath(rs.startRad, rs.endRad, isHovered)}
                fill={rs.seg.fill}
                stroke="#FFFFFF"
                strokeWidth="2"
                style={{ transition: "transform 200ms ease" }}
              />
            </g>
          );
        })}

        {/* Labels around the dial */}
        {renderedSegments.map((rs, i) => {
          const isHovered = hovered === i;
          // Position adjustment by quadrant
          const isRight = Math.cos(rs.midRad) > 0;
          return (
            <g key={`label-${i}`}>
              {/* Small connector line from segment edge to label */}
              <line
                x1={CX + Math.cos(rs.midRad) * (R_OUTER + 2)}
                y1={CY + Math.sin(rs.midRad) * (R_OUTER + 2)}
                x2={CX + Math.cos(rs.midRad) * (R_LABEL - 6)}
                y2={CY + Math.sin(rs.midRad) * (R_LABEL - 6)}
                stroke="#0A102F"
                strokeOpacity={isHovered ? 0.8 : 0.3}
                strokeWidth="1"
                style={{ transition: "stroke-opacity 200ms ease" }}
              />

              {/* Percentage figure */}
              <text
                x={rs.labelX}
                y={rs.labelY - 2}
                fontFamily="var(--font-display), ui-sans-serif, system-ui, sans-serif"
                fontSize={isHovered ? 18 : 16}
                fontWeight={isHovered ? 700 : 500}
                fill="#0A102F"
                textAnchor={isRight ? "start" : "end"}
                letterSpacing="-0.4"
                style={{ transition: "font-size 200ms ease" }}
              >
                {rs.seg.pct}%
              </text>

              {/* Label */}
              <text
                x={rs.labelX}
                y={rs.labelY + 12}
                fontFamily="var(--font-mono), ui-monospace, monospace"
                fontSize="7"
                fontWeight="500"
                fill="#0A102F"
                fillOpacity="0.6"
                letterSpacing="1.2"
                textAnchor={isRight ? "start" : "end"}
              >
                {rs.seg.short}
              </text>
            </g>
          );
        })}

        {/* Center hub — donut hole content */}
        <circle
          cx={CX}
          cy={CY}
          r={R_INNER - 2}
          fill="#FFFFFF"
          stroke="#0A102F"
          strokeOpacity="0.55"
          strokeWidth="1"
        />
        <text
          x={CX}
          y={CY - 16}
          fontFamily="var(--font-mono), ui-monospace, monospace"
          fontSize="7"
          fill="#0A102F"
          fillOpacity="0.55"
          letterSpacing="1.5"
          textAnchor="middle"
        >
          TOTAL SPEND
        </text>
        <text
          x={CX}
          y={CY - 2}
          fontFamily="var(--font-display), ui-sans-serif, system-ui, sans-serif"
          fontSize="16"
          fontWeight="600"
          fill="#0A102F"
          textAnchor="middle"
          letterSpacing="-0.5"
        >
          100%
        </text>
        {/* ROAS marker */}
        <line
          x1={CX - 22}
          y1={CY + 8}
          x2={CX + 22}
          y2={CY + 8}
          stroke="#0A102F"
          strokeOpacity="0.18"
          strokeWidth="1"
        />
        <text
          x={CX}
          y={CY + 20}
          fontFamily="var(--font-mono), ui-monospace, monospace"
          fontSize="7"
          fill="#0A102F"
          fillOpacity="0.55"
          letterSpacing="1.5"
          textAnchor="middle"
        >
          ROAS
        </text>
        <text
          x={CX}
          y={CY + 34}
          fontFamily="var(--font-display), ui-sans-serif, system-ui, sans-serif"
          fontSize="20"
          fontWeight="300"
          fill="#FFD031"
          stroke="#0A102F"
          strokeWidth="0.5"
          textAnchor="middle"
          letterSpacing="-0.5"
        >
          4.2×
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
          BUY INTENT · NOT TRAFFIC
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
          ZEPPSTR · PAID
        </text>
      </svg>

      <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
        Hover{" "}
        {hovered !== null
          ? `· ${SEGMENTS[hovered].label} (${SEGMENTS[hovered].pct}%)`
          : "any bucket"}
      </p>
    </div>
  );
}
