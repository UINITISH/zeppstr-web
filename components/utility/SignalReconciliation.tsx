"use client";

import * as React from "react";
import { DiagramFrame, INK, EMERALD, YELLOW, MONO } from "./DiagramFrame";

/**
 * SignalReconciliation — hero graphic for Attribution & Measurement.
 *
 * Two stacked bars: what the ad platform reported, and what the CRM actually
 * recorded. The gap between them is the subject of the page, so it is drawn as
 * a hatched band rather than left implicit.
 *
 * The animation walks a signal pulse down the platform bar and stops it at the
 * CRM line — the point being that the platform keeps counting past where the
 * evidence stops.
 */

const ROWS = [
  { label: "PLATFORM REPORTED", value: 400, colour: INK, opacity: 0.18 },
  { label: "CRM VERIFIED", value: 147, colour: EMERALD, opacity: 1 },
];

const MAX = 400;
const BAR_X = 60;
const BAR_W = 340;

export function SignalReconciliation({ className = "" }: { className?: string }) {
  return (
    <DiagramFrame
      className={className}
      title="Signal reconciliation — 400 conversions reported by the ad platform against 147 recorded in the CRM"
      leftLabel="SIGNAL RECONCILIATION"
      rightLabel="GAP 63%"
    >
      {ROWS.map((row, i) => {
        const y = 120 + i * 96;
        const w = (row.value / MAX) * BAR_W;
        return (
          <g key={row.label}>
            <text
              x={BAR_X}
              y={y - 14}
              fontFamily={MONO}
              fontSize="9"
              fontWeight="600"
              fill={INK}
              fillOpacity="0.6"
              letterSpacing="1.5"
            >
              {row.label}
            </text>
            {/* Track */}
            <rect x={BAR_X} y={y} width={BAR_W} height="34" fill={INK} fillOpacity="0.04" />
            {/* Value */}
            <rect x={BAR_X} y={y} width={w} height="34" fill={row.colour} fillOpacity={row.opacity}>
              <animate
                attributeName="width"
                from="0"
                to={w}
                dur="1.1s"
                begin={`${0.2 + i * 0.25}s`}
                fill="freeze"
                calcMode="spline"
                keySplines="0.16 1 0.3 1"
              />
            </rect>
            <text
              x={BAR_X + w + 12}
              y={y + 23}
              fontFamily={MONO}
              fontSize="13"
              fontWeight="600"
              fill={INK}
              fillOpacity="0.85"
            >
              {row.value}
            </text>
          </g>
        );
      })}

      {/* The gap — hatched, because it is the point of the page */}
      <defs>
        <pattern id="gap-hatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="7" stroke={YELLOW} strokeWidth="3" />
        </pattern>
      </defs>
      {(() => {
        const crmW = (147 / MAX) * BAR_W;
        const platW = (400 / MAX) * BAR_W;
        return (
          <g opacity="0">
            <animate attributeName="opacity" from="0" to="1" dur="0.6s" begin="1.5s" fill="freeze" />
            <rect
              x={BAR_X + crmW}
              y="216"
              width={platW - crmW}
              height="34"
              fill="url(#gap-hatch)"
              fillOpacity="0.5"
            />
            <line
              x1={BAR_X + crmW}
              y1="112"
              x2={BAR_X + crmW}
              y2="268"
              stroke={EMERALD}
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            <text
              x={BAR_X + crmW + (platW - crmW) / 2}
              y="290"
              fontFamily={MONO}
              fontSize="9"
              fontWeight="600"
              fill={INK}
              fillOpacity="0.7"
              letterSpacing="1.4"
              textAnchor="middle"
            >
              253 UNEVIDENCED
            </text>
          </g>
        );
      })()}

      {/* Signal pulse — travels the platform bar, stops at the CRM line */}
      <circle r="4" fill={YELLOW}>
        <animate
          attributeName="cx"
          values={`${BAR_X};${BAR_X + (147 / MAX) * BAR_W}`}
          dur="2.4s"
          begin="1.8s"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.4 0 0.2 1"
        />
        <animate attributeName="cy" values="137;137" dur="2.4s" begin="1.8s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;1;1;0" dur="2.4s" begin="1.8s" repeatCount="indefinite" />
      </circle>

      <text
        x="60"
        y="344"
        fontFamily={MONO}
        fontSize="8.5"
        fontWeight="500"
        fill={INK}
        fillOpacity="0.45"
        letterSpacing="1.3"
      >
        SMART BIDDING TRAINS ON THE UPPER BAR
      </text>
      <text
        x="60"
        y="362"
        fontFamily={MONO}
        fontSize="8.5"
        fontWeight="500"
        fill={INK}
        fillOpacity="0.45"
        letterSpacing="1.3"
      >
        THE BUSINESS BANKS THE LOWER ONE
      </text>
    </DiagramFrame>
  );
}
