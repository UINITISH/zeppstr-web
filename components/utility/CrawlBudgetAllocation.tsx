"use client";

import * as React from "react";
import { DiagramFrame, INK, EMERALD, YELLOW, MONO } from "./DiagramFrame";

/**
 * CrawlBudgetAllocation — hero graphic for Technical SEO & Crawl Engineering.
 *
 * A single crawl budget, split before and after. Before: most of the attention
 * spent on parameter URLs, pagination and soft 404s. After: the same budget
 * concentrated on pages that carry revenue. The bar re-segments on a delay, so
 * the reallocation is the movement rather than a fade-in.
 */

const BEFORE = [
  { label: "PARAMETER URLS", pct: 0.38, tone: 0.12 },
  { label: "PAGINATION", pct: 0.22, tone: 0.09 },
  { label: "SOFT 404s", pct: 0.16, tone: 0.06 },
  { label: "REVENUE PAGES", pct: 0.24, tone: 1 },
];

const AFTER = [
  { label: "CANONICAL", pct: 0.14, tone: 0.12 },
  { label: "SUPPORTING", pct: 0.18, tone: 0.09 },
  { label: "REVENUE PAGES", pct: 0.68, tone: 1 },
];

const X = 60;
const W = 340;

function Bar({
  rows,
  y,
  heading,
  delay,
}: {
  rows: { label: string; pct: number; tone: number }[];
  y: number;
  heading: string;
  delay: number;
}) {
  let cursor = X;
  return (
    <g>
      <text x={X} y={y - 14} fontFamily={MONO} fontSize="9" fontWeight="600" fill={INK} fillOpacity="0.6" letterSpacing="1.5">
        {heading}
      </text>
      {rows.map((r, i) => {
        const w = r.pct * W;
        const x = cursor;
        cursor += w;
        return (
          <g key={r.label}>
            <rect
              x={x}
              y={y}
              width={w}
              height="44"
              fill={r.tone === 1 ? EMERALD : INK}
              fillOpacity={r.tone === 1 ? 0.92 : r.tone}
              stroke="#FFFFFF"
              strokeWidth="1"
            >
              <animate attributeName="height" from="0" to="44" dur="0.7s" begin={`${delay + i * 0.08}s`} fill="freeze" calcMode="spline" keySplines="0.16 1 0.3 1" />
            </rect>
            {w > 62 && (
              <text
                x={x + w / 2}
                y={y + 27}
                fontFamily={MONO}
                fontSize="7.5"
                fontWeight="700"
                fill={r.tone === 1 ? "#FFFFFF" : INK}
                fillOpacity={r.tone === 1 ? 0.95 : 0.55}
                letterSpacing="0.8"
                textAnchor="middle"
              >
                {r.label}
              </text>
            )}
          </g>
        );
      })}
    </g>
  );
}

export function CrawlBudgetAllocation({ className = "" }: { className?: string }) {
  return (
    <DiagramFrame
      className={className}
      title="Crawl budget allocation — before and after, showing attention moved onto pages that carry revenue"
      leftLabel="CRAWL BUDGET"
      rightLabel="FIXED ALLOCATION"
    >
      <Bar rows={BEFORE} y={124} heading="BEFORE" delay={0.25} />

      {/* Arrow between the two states */}
      <g opacity="0">
        <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="1.1s" fill="freeze" />
        <line x1="230" y1="186" x2="230" y2="242" stroke={YELLOW} strokeWidth="2" />
        <path d="M 230 250 L 224 238 L 236 238 Z" fill={YELLOW} />
      </g>

      <Bar rows={AFTER} y={262} heading="AFTER" delay={1.3} />

      <g opacity="0">
        <animate attributeName="opacity" from="0" to="1" dur="0.6s" begin="2s" fill="freeze" />
        <text x="60" y="352" fontFamily={MONO} fontSize="8.5" fontWeight="500" fill={INK} fillOpacity="0.45" letterSpacing="1.3">
          SAME BUDGET. NOTHING ADDED.
        </text>
        <text x="60" y="370" fontFamily={MONO} fontSize="8.5" fontWeight="500" fill={INK} fillOpacity="0.45" letterSpacing="1.3">
          THE CEILING WAS THE ALLOCATION.
        </text>
      </g>
    </DiagramFrame>
  );
}
