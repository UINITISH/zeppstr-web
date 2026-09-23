"use client";

import * as React from "react";
import { DiagramFrame, INK, EMERALD, YELLOW, MONO } from "./DiagramFrame";

/**
 * IntentLadder — hero graphic for Organic Search Strategy.
 *
 * Four rungs from research to purchase. Two opposed bars per rung: search
 * volume falls as you climb, commercial value rises. The crossing point is the
 * argument — volume is the wrong thing to prioritise on, and the rungs a
 * keyword tool ranks highest are the ones furthest from a sale.
 */

const RUNGS = [
  { label: "RESEARCHING", volume: 1, value: 0.16 },
  { label: "COMPARING", volume: 0.62, value: 0.42 },
  { label: "PRICING", volume: 0.3, value: 0.74 },
  { label: "BUYING", volume: 0.12, value: 1 },
];

// The two bars grow away from a centre spine. The rung label sits ABOVE each
// pair rather than between them — the gutter is only 24px and the label was
// printing on top of whichever bar reached it first.
const LEFT_EDGE = 218;
const RIGHT_EDGE = 242;
const MAX_BAR = 146;
const ROW_Y = 150;
const ROW_GAP = 66;

export function IntentLadder({ className = "" }: { className?: string }) {
  return (
    <DiagramFrame
      className={className}
      title="Intent ladder — search volume falls and commercial value rises as intent climbs"
      leftLabel="VOLUME"
      rightLabel="VALUE"
    >
      {RUNGS.map((rung, i) => {
        const y = ROW_Y + i * ROW_GAP;
        const vw = rung.volume * MAX_BAR;
        const cw = rung.value * MAX_BAR;
        return (
          <g key={rung.label}>
            {/* Volume — leftward */}
            <rect x={LEFT_EDGE - vw} y={y} width={vw} height="30" fill={INK} fillOpacity="0.14">
              <animate attributeName="width" from="0" to={vw} dur="0.9s" begin={`${0.2 + i * 0.12}s`} fill="freeze" calcMode="spline" keySplines="0.16 1 0.3 1" />
              <animate attributeName="x" from={LEFT_EDGE} to={LEFT_EDGE - vw} dur="0.9s" begin={`${0.2 + i * 0.12}s`} fill="freeze" calcMode="spline" keySplines="0.16 1 0.3 1" />
            </rect>
            {/* Value — rightward */}
            <rect x={RIGHT_EDGE} y={y} width={cw} height="30" fill={i === RUNGS.length - 1 ? YELLOW : EMERALD} fillOpacity={i === RUNGS.length - 1 ? 1 : 0.55}>
              <animate attributeName="width" from="0" to={cw} dur="0.9s" begin={`${0.3 + i * 0.12}s`} fill="freeze" calcMode="spline" keySplines="0.16 1 0.3 1" />
            </rect>
            {/* Rung label, above the pair */}
            <text x="230" y={y - 7} fontFamily={MONO} fontSize="8" fontWeight="700" fill={INK} fillOpacity="0.7" letterSpacing="1.4" textAnchor="middle">
              {rung.label}
            </text>
          </g>
        );
      })}

      {/* Centre spine */}
      <line x1="230" y1="132" x2="230" y2="382" stroke={INK} strokeWidth="1" strokeOpacity="0.18" />

      {/* Where the tool points vs where the money is */}
      <g opacity="0">
        <animate attributeName="opacity" from="0" to="1" dur="0.6s" begin="1.5s" fill="freeze" />
        {/* Clear of the bars: one above the top rung, one below the bottom. */}
        <text x="42" y="112" fontFamily={MONO} fontSize="8" fontWeight="600" fill={INK} fillOpacity="0.5" letterSpacing="1.2">
          ↑ WHERE THE KEYWORD TOOL POINTS
        </text>
        <text x="418" y="406" fontFamily={MONO} fontSize="8" fontWeight="600" fill={EMERALD} letterSpacing="1.2" textAnchor="end">
          WHERE THE MONEY IS ↓
        </text>
      </g>

      <text x="42" y="428" fontFamily={MONO} fontSize="8.5" fontWeight="500" fill={INK} fillOpacity="0.4" letterSpacing="1.3">
        PRIORITISE BY DECISION, NOT BY SEARCH VOLUME
      </text>
    </DiagramFrame>
  );
}
