"use client";

import * as React from "react";
import { DiagramFrame, INK, EMERALD, YELLOW, MONO } from "./DiagramFrame";

/**
 * DecisionCadenceLoop — hero graphic for Growth Strategy & Operating Model.
 *
 * Four nodes on a loop: measure, review, decide, stop. A marker travels the
 * loop continuously, and the STOP node is drawn in yellow because it is the one
 * organisations skip — which is the argument of the page. The north-star metric
 * sits at the centre with a single named owner, because an unowned number is
 * the failure mode underneath all of this.
 */

const CX = 230;
const CY = 244;
const R = 118;

const NODES = [
  { label: "MEASURE", angle: -90 },
  { label: "REVIEW", angle: 0 },
  { label: "DECIDE", angle: 90 },
  { label: "STOP", angle: 180, accent: true },
];

function pos(angle: number, radius = R) {
  const rad = (angle * Math.PI) / 180;
  return { x: CX + Math.cos(rad) * radius, y: CY + Math.sin(rad) * radius };
}

export function DecisionCadenceLoop({ className = "" }: { className?: string }) {
  return (
    <DiagramFrame
      className={className}
      title="Decision cadence loop — measure, review, decide, stop, around one owned north-star metric"
      leftLabel="OPERATING CADENCE"
      rightLabel="WEEKLY / MONTHLY"
    >
      {/* Loop */}
      <circle cx={CX} cy={CY} r={R} fill="none" stroke={INK} strokeWidth="1.5" strokeOpacity="0.16" strokeDasharray="6 6" />

      {/* Centre — the number, and who owns it */}
      <circle cx={CX} cy={CY} r="58" fill={EMERALD}>
        <animate attributeName="r" from="42" to="58" dur="0.9s" begin="0.2s" fill="freeze" calcMode="spline" keySplines="0.16 1 0.3 1" />
      </circle>
      <text x={CX} y={CY - 10} fontFamily={MONO} fontSize="8" fontWeight="600" fill={YELLOW} letterSpacing="1.4" textAnchor="middle">
        NORTH STAR
      </text>
      <text x={CX} y={CY + 8} fontFamily={MONO} fontSize="9" fontWeight="700" fill="#FFFFFF" fillOpacity="0.95" letterSpacing="1" textAnchor="middle">
        ONE METRIC
      </text>
      <text x={CX} y={CY + 26} fontFamily={MONO} fontSize="7.5" fontWeight="500" fill="#FFFFFF" fillOpacity="0.6" letterSpacing="1" textAnchor="middle">
        ONE OWNER
      </text>

      {/* Nodes */}
      {NODES.map((n, i) => {
        const p = pos(n.angle);
        return (
          <g key={n.label} opacity="0">
            <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin={`${0.6 + i * 0.16}s`} fill="freeze" />
            <rect
              x={p.x - 44}
              y={p.y - 17}
              width="88"
              height="34"
              fill={n.accent ? YELLOW : "#FFFFFF"}
              stroke={n.accent ? EMERALD : INK}
              strokeWidth={n.accent ? 1.5 : 1}
              strokeOpacity={n.accent ? 1 : 0.2}
            />
            <text
              x={p.x}
              y={p.y + 4}
              fontFamily={MONO}
              fontSize="9"
              fontWeight="700"
              fill={INK}
              fillOpacity={n.accent ? 1 : 0.7}
              letterSpacing="1.2"
              textAnchor="middle"
            >
              {n.label}
            </text>
          </g>
        );
      })}

      {/* Travelling marker — the cadence actually running */}
      <circle r="5" fill={YELLOW} stroke={EMERALD} strokeWidth="1.5">
        <animateMotion
          dur="7s"
          repeatCount="indefinite"
          path={`M ${CX + R} ${CY} A ${R} ${R} 0 1 1 ${CX - R} ${CY} A ${R} ${R} 0 1 1 ${CX + R} ${CY}`}
        />
      </circle>

      {/* The note that matters */}
      <g opacity="0">
        <animate attributeName="opacity" from="0" to="1" dur="0.6s" begin="1.6s" fill="freeze" />
        <text x="42" y="402" fontFamily={MONO} fontSize="8.5" fontWeight="600" fill={INK} fillOpacity="0.6" letterSpacing="1.3">
          ORGANISATIONS ARE GOOD AT STARTING
        </text>
        <text x="42" y="420" fontFamily={MONO} fontSize="8.5" fontWeight="600" fill={INK} fillOpacity="0.6" letterSpacing="1.3">
          AND TERRIBLE AT STOPPING
        </text>
      </g>
    </DiagramFrame>
  );
}
