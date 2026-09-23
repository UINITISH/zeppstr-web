"use client";

import * as React from "react";
import { DiagramFrame, INK, EMERALD, YELLOW, MONO } from "./DiagramFrame";

/**
 * WarmAudiencePool — hero graphic for Retargeting & Lifecycle Acquisition.
 *
 * Concentric rings by engagement depth: viewed, engaged, enquired, converted.
 * Particles migrate inward, and a handful peel off to an "owned channels" node
 * on the right — the handoff the page argues is the whole point, because a
 * person you can email is a person you stop re-buying.
 */

const RINGS = [
  { r: 148, label: "VIEWED", opacity: 0.06 },
  { r: 112, label: "ENGAGED", opacity: 0.1 },
  { r: 76, label: "ENQUIRED", opacity: 0.16 },
  { r: 40, label: "CONVERTED", opacity: 0.9 },
];

const CX = 200;
const CY = 232;

export function WarmAudiencePool({ className = "" }: { className?: string }) {
  return (
    <DiagramFrame
      className={className}
      title="Warm audience pool — concentric rings by engagement depth, with a handoff to owned channels"
      leftLabel="WARM AUDIENCE POOL"
      rightLabel="SEGMENTED BY DEPTH"
    >
      {RINGS.map((ring, i) => (
        <g key={ring.label}>
          <circle
            cx={CX}
            cy={CY}
            r={ring.r}
            fill={i === RINGS.length - 1 ? EMERALD : INK}
            fillOpacity={ring.opacity}
            stroke={INK}
            strokeWidth="1"
            strokeOpacity="0.14"
          >
            <animate
              attributeName="r"
              from={ring.r * 0.72}
              to={ring.r}
              dur="1s"
              begin={`${0.15 * (RINGS.length - i)}s`}
              fill="freeze"
              calcMode="spline"
              keySplines="0.16 1 0.3 1"
            />
          </circle>
          <text
            x={CX}
            y={CY - ring.r + 16}
            fontFamily={MONO}
            fontSize="8"
            fontWeight="600"
            fill={i === RINGS.length - 1 ? "#FFFFFF" : INK}
            fillOpacity={i === RINGS.length - 1 ? 0.9 : 0.5}
            letterSpacing="1.4"
            textAnchor="middle"
          >
            {ring.label}
          </text>
        </g>
      ))}

      {/* Particles migrating inward — deliberately few, because most never do */}
      {[0, 1, 2, 3, 4].map((i) => {
        const angle = (i / 5) * Math.PI * 2 + 0.4;
        const x0 = CX + Math.cos(angle) * 146;
        const y0 = CY + Math.sin(angle) * 146;
        const x1 = CX + Math.cos(angle) * 42;
        const y1 = CY + Math.sin(angle) * 42;
        return (
          <circle key={i} r="3.5" fill={YELLOW}>
            <animate attributeName="cx" values={`${x0};${x1}`} dur="3.6s" begin={`${i * 0.7}s`} repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.2 1" />
            <animate attributeName="cy" values={`${y0};${y1}`} dur="3.6s" begin={`${i * 0.7}s`} repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.2 1" />
            <animate attributeName="opacity" values="0;1;1;0" dur="3.6s" begin={`${i * 0.7}s`} repeatCount="indefinite" />
          </circle>
        );
      })}

      {/* Handoff to owned channels */}
      <g opacity="0">
        <animate attributeName="opacity" from="0" to="1" dur="0.6s" begin="1.4s" fill="freeze" />
        <line x1={CX + 40} y1={CY} x2="388" y2={CY} stroke={EMERALD} strokeWidth="1.5" strokeDasharray="5 5" />
        <rect x="352" y={CY - 30} width="60" height="60" fill={EMERALD} />
        <text x="382" y={CY - 2} fontFamily={MONO} fontSize="8" fontWeight="600" fill="#FFFFFF" fillOpacity="0.95" letterSpacing="1" textAnchor="middle">
          OWNED
        </text>
        <text x="382" y={CY + 12} fontFamily={MONO} fontSize="8" fontWeight="600" fill={YELLOW} letterSpacing="1" textAnchor="middle">
          CHANNELS
        </text>
      </g>

      <text x="42" y="418" fontFamily={MONO} fontSize="8.5" fontWeight="500" fill={INK} fillOpacity="0.45" letterSpacing="1.3">
        RENTED ATTENTION → OWNED RELATIONSHIP
      </text>
    </DiagramFrame>
  );
}
