"use client";

import * as React from "react";
import { DiagramFrame, INK, EMERALD, YELLOW, MONO } from "./DiagramFrame";

/**
 * Hero diagrams for the two top-level pages that had none.
 *
 * About and Work were the last pages on the site with a bare left-aligned hero
 * while every solution, sub-service and industry page carried a diagram. Same
 * fix, same frame.
 */

/* ────────────────────────────── ABOUT ────────────────────────────────────
   Capacity as the product. Twelve slots in a year, most of them declined —
   which is the claim the whole page rests on, so it is drawn rather than
   asserted in a sentence. */
export function CapacityModel({ className = "" }: { className?: string }) {
  const SLOTS = 12;
  const COLS = 4;
  const CELL = 74;
  const GAP = 12;
  const X0 = (460 - (COLS * CELL + (COLS - 1) * GAP)) / 2;
  const Y0 = 128;
  // ── THIS IS THE MODEL, NOT LIVE AVAILABILITY ──────────────────────────────
  // The first version labelled six cells TAKEN and six OPEN, which reads as
  // "we currently have six clients and six slots free". That is a live
  // availability claim nobody has verified, and it would be wrong the week
  // after it shipped. The site has spent weeks removing exactly this kind of
  // unsourced number.
  //
  // The published range is 6–12 partners a year. So the diagram shows the
  // RANGE: six cells filled (the floor), six outlined (the ceiling), captioned
  // as the model rather than as a booking state.
  const FLOOR = 6;
  return (
    <DiagramFrame
      className={className}
      title="Capacity model — between six and twelve partner clients a year, deliberately capped"
      leftLabel="ANNUAL CAPACITY"
      rightLabel="6–12 PARTNERS"
    >
      {Array.from({ length: SLOTS }).map((_, i) => {
        const x = X0 + (i % COLS) * (CELL + GAP);
        const y = Y0 + Math.floor(i / COLS) * (CELL + GAP);
        const taken = i < FLOOR;
        return (
          <g key={i} opacity="0">
            <animate attributeName="opacity" from="0" to="1" dur="0.45s" begin={`${0.2 + i * 0.07}s`} fill="freeze" />
            <rect
              x={x}
              y={y}
              width={CELL}
              height={CELL}
              fill={taken ? EMERALD : "none"}
              fillOpacity={taken ? 0.92 : 0}
              stroke={taken ? EMERALD : INK}
              strokeWidth={taken ? 1.5 : 1}
              strokeOpacity={taken ? 1 : 0.2}
              strokeDasharray={taken ? undefined : "4 4"}
            />
            <text
              x={x + CELL / 2}
              y={y + CELL / 2 + 4}
              fontFamily={MONO}
              fontSize="9"
              fontWeight="700"
              fill={taken ? YELLOW : INK}
              fillOpacity={taken ? 1 : 0.28}
              letterSpacing="1"
              textAnchor="middle"
            >
              {taken ? "6" : "12"}
            </text>
          </g>
        );
      })}
      <text x="42" y="386" fontFamily={MONO} fontSize="8.5" fontWeight="600" fill={INK} fillOpacity="0.55" letterSpacing="1.3">
        CAPACITY IS THE PRODUCT
      </text>
      <text x="42" y="404" fontFamily={MONO} fontSize="8.5" fontWeight="500" fill={INK} fillOpacity="0.42" letterSpacing="1.3">
        WE DECLINE MOST OF WHAT COMES IN
      </text>
      <text x="42" y="424" fontFamily={MONO} fontSize="8" fontWeight="500" fill={INK} fillOpacity="0.32" letterSpacing="1.2">
        THE MODEL — NOT THIS YEAR&apos;S AVAILABILITY
      </text>
    </DiagramFrame>
  );
}

/* ─────────────────────────────── WORK ────────────────────────────────────
   One pattern across every engagement: fix the measurement, fix the
   constraint, then scale. The ramp is deliberately flat before month three,
   because that is what the case studies actually show. */
export function CompoundingPattern({ className = "" }: { className?: string }) {
  const X0 = 62, X1 = 404, BASE = 330, TOP = 128;
  // Flat while measurement is rebuilt, then compounding. Shape only — this is
  // an argument about sequence, not a plotted client result, so it carries no
  // axis values.
  const path = `M ${X0} ${BASE - 8}
    C ${X0 + 60} ${BASE - 10}, ${X0 + 90} ${BASE - 18}, ${X0 + 118} ${BASE - 30}
    C ${X0 + 170} ${BASE - 54}, ${X0 + 220} ${BASE - 110}, ${X1} ${TOP}`;
  const phases = [
    { t: 0.0, label: "INSTRUMENT" },
    { t: 0.34, label: "REBUILD" },
    { t: 1.0, label: "COMPOUND" },
  ];
  return (
    <DiagramFrame
      className={className}
      title="The compounding pattern — flat while measurement is rebuilt, then compounding"
      leftLabel="ONE PATTERN"
      rightLabel="MONTHS 1–12"
    >
      <line x1={X0} y1={BASE} x2={X1} y2={BASE} stroke={INK} strokeWidth="1" strokeOpacity="0.2" />
      <line x1={X0} y1={BASE} x2={X0} y2={TOP - 10} stroke={INK} strokeWidth="1" strokeOpacity="0.2" />

      {/* The flat stretch nobody wants to pay for */}
      <rect x={X0} y={TOP - 10} width={0.34 * (X1 - X0)} height={BASE - TOP + 10} fill={INK} fillOpacity="0.04" />
      <text x={X0 + 8} y={TOP + 6} fontFamily={MONO} fontSize="7.5" fontWeight="600" fill={INK} fillOpacity="0.4" letterSpacing="1.1">
        NOTHING REPORTABLE HERE
      </text>

      <path d={path} fill="none" stroke={EMERALD} strokeWidth="3" strokeLinecap="round" strokeDasharray="620" strokeDashoffset="620">
        <animate attributeName="stroke-dashoffset" from="620" to="0" dur="2.2s" begin="0.4s" fill="freeze" calcMode="spline" keySplines="0.4 0 0.2 1" />
      </path>

      {phases.map((p, i) => {
        const x = X0 + (X1 - X0) * p.t;
        const last = i === phases.length - 1;
        return (
          <g key={p.label}>
            <line x1={x} y1={BASE} x2={x} y2={BASE + 8} stroke={INK} strokeWidth="1.5" strokeOpacity="0.3" />
            <text x={x} y={BASE + 26} fontFamily={MONO} fontSize="7.5" fontWeight="700" fill={INK} fillOpacity={last ? 0.8 : 0.5} letterSpacing="1" textAnchor={last ? "end" : "start"}>
              {p.label}
            </text>
          </g>
        );
      })}

      <circle cx={X1} cy={TOP} r="6" fill={YELLOW} stroke={EMERALD} strokeWidth="1.5" opacity="0">
        <animate attributeName="opacity" from="0" to="1" dur="0.4s" begin="2.5s" fill="freeze" />
      </circle>

      <text x={X0} y="392" fontFamily={MONO} fontSize="8.5" fontWeight="600" fill={INK} fillOpacity="0.55" letterSpacing="1.3">
        THE ORDER IS THE METHOD
      </text>
      <text x={X0} y="410" fontFamily={MONO} fontSize="8.5" fontWeight="500" fill={INK} fillOpacity="0.42" letterSpacing="1.3">
        SHAPE ONLY — SEE EACH CASE FOR REAL FIGURES
      </text>
    </DiagramFrame>
  );
}
