"use client";

import * as React from "react";

/**
 * OrganicCompoundingCurve — hero graphic for the Organic Social page.
 *
 * Chart-style SVG with two 12-month trend lines:
 *   - Content-factory (gray, near-flat): ad-hoc posting, no library
 *   - Format-led (yellow, exponential): formats compounding into audience asset
 *
 * Annotated milestones at M3 (library complete), M6 (compounding), M9 (asset),
 * M12 (moat). Animated pulse dot travels along the format-led curve.
 *
 * Same drafting aesthetic: corner ticks, mono labels. Tokens only.
 */

// Chart geometry — relative to 460x460 viewBox
const CHART_X = 60;
const CHART_Y = 110;
const CHART_W = 350;
const CHART_H = 250;

// 12 monthly x-coordinates
const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);

// Content-factory: near-flat, slight rise (1→2.5 over 12 months)
const CONTENT_VALUES = [1, 1.2, 1.4, 1.5, 1.6, 1.8, 1.9, 2.0, 2.1, 2.2, 2.3, 2.5];

// Format-led: exponential, dramatic rise (1→9.5)
const FORMAT_VALUES = [1, 1.2, 1.6, 2.4, 3.2, 4.0, 5.0, 6.2, 7.4, 8.4, 9.0, 9.5];

const MAX_VALUE = 10;

function pointFromMonth(month: number, value: number) {
  const x = CHART_X + ((month - 1) / 11) * CHART_W;
  const y = CHART_Y + CHART_H - (value / MAX_VALUE) * CHART_H;
  return { x, y };
}

function buildPath(values: number[]): string {
  return values
    .map((v, i) => {
      const p = pointFromMonth(i + 1, v);
      return `${i === 0 ? "M" : "L"} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`;
    })
    .join(" ");
}

const MILESTONES = [
  { month: 3, label: "Library", sub: "complete" },
  { month: 6, label: "Compounding", sub: "begins" },
  { month: 9, label: "Audience", sub: "= asset" },
  { month: 12, label: "Moat", sub: "" },
];

export function OrganicCompoundingCurve({ className = "" }: { className?: string }) {
  const contentPath = buildPath(CONTENT_VALUES);
  const formatPath = buildPath(FORMAT_VALUES);

  return (
    <div className={`relative w-full max-w-[460px] mx-auto ${className}`}>
      <svg
        viewBox="0 0 460 460"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        aria-labelledby="organic-compounding-curve-title"
        role="img"
      >
        <title id="organic-compounding-curve-title">
          Audience Asset Growth — Content-factory vs Format-led
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
          AUDIENCE ASSET — 12 MONTH CURVE
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
          v1.0
        </text>

        {/* Y-axis label */}
        <text
          x="32"
          y="76"
          fontFamily="var(--font-mono), ui-monospace, monospace"
          fontSize="8"
          fill="#0A102F"
          fillOpacity="0.4"
          letterSpacing="1.2"
        >
          ASSET VALUE ↑
        </text>

        {/* Legend — top right */}
        <g>
          <line
            x1={CHART_X + CHART_W - 110}
            y1="78"
            x2={CHART_X + CHART_W - 96}
            y2="78"
            stroke="#0A102F"
            strokeOpacity="0.35"
            strokeWidth="1.5"
            strokeDasharray="3 2"
          />
          <text
            x={CHART_X + CHART_W - 90}
            y="81"
            fontFamily="var(--font-mono), ui-monospace, monospace"
            fontSize="8"
            fill="#0A102F"
            fillOpacity="0.5"
            letterSpacing="1.2"
          >
            CONTENT FACTORY
          </text>

          <line
            x1={CHART_X + CHART_W - 110}
            y1="92"
            x2={CHART_X + CHART_W - 96}
            y2="92"
            stroke="#FFD031"
            strokeWidth="2.5"
          />
          <text
            x={CHART_X + CHART_W - 90}
            y="95"
            fontFamily="var(--font-mono), ui-monospace, monospace"
            fontSize="8"
            fill="#0A102F"
            fillOpacity="0.85"
            letterSpacing="1.2"
            fontWeight="500"
          >
            FORMAT-LED
          </text>
        </g>

        {/* Grid lines — horizontal (4 lines) */}
        {[0.25, 0.5, 0.75, 1].map((frac, i) => {
          const y = CHART_Y + CHART_H - frac * CHART_H;
          return (
            <line
              key={i}
              x1={CHART_X}
              y1={y}
              x2={CHART_X + CHART_W}
              y2={y}
              stroke="#0A102F"
              strokeOpacity="0.08"
              strokeWidth="1"
            />
          );
        })}

        {/* X-axis ticks + labels */}
        {MONTHS.filter((m) => m === 1 || m % 3 === 0).map((m) => {
          const x = CHART_X + ((m - 1) / 11) * CHART_W;
          return (
            <g key={m}>
              <line
                x1={x}
                y1={CHART_Y + CHART_H}
                x2={x}
                y2={CHART_Y + CHART_H + 5}
                stroke="#0A102F"
                strokeOpacity="0.4"
                strokeWidth="1"
              />
              <text
                x={x}
                y={CHART_Y + CHART_H + 18}
                fontFamily="var(--font-mono), ui-monospace, monospace"
                fontSize="8"
                fill="#0A102F"
                fillOpacity="0.5"
                letterSpacing="1.2"
                textAnchor="middle"
              >
                M{String(m).padStart(2, "0")}
              </text>
            </g>
          );
        })}

        {/* Content-factory curve — dashed gray */}
        <path
          d={contentPath}
          fill="none"
          stroke="#0A102F"
          strokeOpacity="0.35"
          strokeWidth="1.5"
          strokeDasharray="3 2"
        />

        {/* Format-led curve — yellow, thick */}
        <path
          d={formatPath}
          fill="none"
          stroke="#FFD031"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Subtle yellow glow underneath the format-led curve */}
        <path
          d={`${formatPath} L ${CHART_X + CHART_W} ${CHART_Y + CHART_H} L ${CHART_X} ${CHART_Y + CHART_H} Z`}
          fill="#FFD031"
          fillOpacity="0.08"
        />

        {/* Milestone annotations — dotted vertical lines + labels */}
        {MILESTONES.map((m) => {
          const p = pointFromMonth(m.month, FORMAT_VALUES[m.month - 1]);
          return (
            <g key={m.month}>
              <line
                x1={p.x}
                y1={p.y}
                x2={p.x}
                y2={CHART_Y - 4}
                stroke="#0A102F"
                strokeOpacity="0.2"
                strokeWidth="1"
                strokeDasharray="2 3"
              />
              <circle
                cx={p.x}
                cy={p.y}
                r="3.5"
                fill="#FFD031"
                stroke="#0A102F"
                strokeWidth="1"
              />
              {/* Label positioned above the chart */}
              <text
                x={p.x}
                y={CHART_Y - 14}
                fontFamily="var(--font-mono), ui-monospace, monospace"
                fontSize="8"
                fontWeight="500"
                fill="#0A102F"
                fillOpacity="0.75"
                letterSpacing="1.0"
                textAnchor="middle"
              >
                {m.label.toUpperCase()}
              </text>
              {m.sub && (
                <text
                  x={p.x}
                  y={CHART_Y - 4}
                  fontFamily="var(--font-mono), ui-monospace, monospace"
                  fontSize="7"
                  fill="#0A102F"
                  fillOpacity="0.45"
                  letterSpacing="1.0"
                  textAnchor="middle"
                >
                  {m.sub.toUpperCase()}
                </text>
              )}
            </g>
          );
        })}

        {/* Animated pulse dot traveling along the yellow curve */}
        <circle r="5" fill="#FFD031" stroke="#0A102F" strokeWidth="1.25">
          <animateMotion dur="6s" repeatCount="indefinite" path={formatPath} />
          <animate
            attributeName="opacity"
            values="0.4;1;0.4"
            dur="1.2s"
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
          FORMATS COMPOUND
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
          ZEPPSTR · ORGANIC
        </text>
      </svg>
    </div>
  );
}
