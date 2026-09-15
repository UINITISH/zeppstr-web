"use client";

import * as React from "react";
import { DiagramFrame, INK, EMERALD, YELLOW, MONO } from "./DiagramFrame";

/**
 * CreativeTestGrid — hero graphic for Creative Strategy & Production.
 *
 * Thirty-three cells, one per creative tested on the TRU Aquapolis Meta
 * account. Five carry 86% of the leads; the other twenty-eight fade out on a
 * stagger, which is the retirement discipline the page argues for.
 *
 * The winners are fixed indices, not random — the diagram has to render the
 * same way on every load and on the server.
 */

const TOTAL = 33;
const WINNERS = new Set([2, 9, 14, 23, 30]);
// 7 columns x 5 rows = 35 slots for 33 creatives, which fits inside the 460
// frame with room for the annotation strip. A 6-column grid needed six rows and
// spilled past the bottom edge, and the labels landed on top of the cells.
const COLS = 7;
const CELL = 46;
const GAP = 7;
const ORIGIN_X = 48;   // (460 - (7*46 + 6*7)) / 2
const ORIGIN_Y = 100;

export function CreativeTestGrid({ className = "" }: { className?: string }) {
  return (
    <DiagramFrame
      className={className}
      title="Creative test grid — thirty-three creatives tested, five producing 86% of leads"
      leftLabel="CREATIVE TEST SET"
      rightLabel="33 TESTED / 5 KEPT"
    >
      {Array.from({ length: TOTAL }).map((_, i) => {
        const col = i % COLS;
        const row = Math.floor(i / COLS);
        const x = ORIGIN_X + col * (CELL + GAP);
        const y = ORIGIN_Y + row * (CELL + GAP);
        const win = WINNERS.has(i);
        return (
          <g key={i}>
            <rect
              x={x}
              y={y}
              width={CELL}
              height={CELL}
              fill={win ? YELLOW : INK}
              fillOpacity={win ? 1 : 0.08}
              stroke={win ? EMERALD : INK}
              strokeWidth={win ? 1.5 : 1}
              strokeOpacity={win ? 1 : 0.12}
            >
              {/* Losers fade back; winners hold. The stagger reads as a cull
                  rather than a page-load animation. */}
              {!win && (
                <animate
                  attributeName="fill-opacity"
                  values="0.22;0.22;0.05"
                  keyTimes="0;0.45;1"
                  dur="3.2s"
                  begin={`${0.3 + (i % 11) * 0.06}s`}
                  fill="freeze"
                />
              )}
              {win && (
                <animate
                  attributeName="fill-opacity"
                  values="0.2;1"
                  dur="0.9s"
                  begin={`${1.4 + (i % 5) * 0.12}s`}
                  fill="freeze"
                />
              )}
            </rect>
            {win && (
              <text
                x={x + CELL / 2}
                y={y + CELL / 2 + 4}
                fontFamily={MONO}
                fontSize="10"
                fontWeight="700"
                fill={INK}
                textAnchor="middle"
                opacity="0"
              >
                {String(i + 1).padStart(2, "0")}
                <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="1.9s" fill="freeze" />
              </text>
            )}
          </g>
        );
      })}

      {/* Result annotation */}
      <g opacity="0">
        <animate attributeName="opacity" from="0" to="1" dur="0.6s" begin="2.4s" fill="freeze" />
        <line x1="48" y1="386" x2="412" y2="386" stroke={INK} strokeWidth="1" strokeOpacity="0.15" />
        <text x="48" y="378" fontFamily={MONO} fontSize="9" fontWeight="600" fill={INK} fillOpacity="0.65" letterSpacing="1.5">
          86% OF LEADS
        </text>
        <text x="412" y="378" fontFamily={MONO} fontSize="9" fontWeight="600" fill={INK} fillOpacity="0.45" letterSpacing="1.5" textAnchor="end">
          28 RETIRED
        </text>
        <text x="48" y="408" fontFamily={MONO} fontSize="8.5" fontWeight="500" fill={INK} fillOpacity="0.45" letterSpacing="1.3">
          BEST PERFORMER WAS A STATIC FLOOR PLAN
        </text>
      </g>
    </DiagramFrame>
  );
}
