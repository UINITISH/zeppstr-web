"use client";

import * as React from "react";
import { DiagramFrame, INK, EMERALD, YELLOW, MONO } from "./DiagramFrame";

/**
 * Hero diagrams for the two hub pages, /solutions and /industries.
 *
 * ── WHY THESE EXIST ─────────────────────────────────────────────────────────
 * Both hub pages rendered their hero as a single left-hand column, leaving the
 * entire right half of the first viewport empty. Every solution page, every
 * industry page, /work and /about all put a diagram there. So the two pages
 * that are the front door to thirty-odd sub-pages were the least designed
 * pages on the site, and they were the ones prospects reach first from the
 * mega-menu.
 *
 * Both diagrams argue the same point their page's headline makes, rather than
 * decorating it.
 */

/* ────────────────────────────────────────────────────────────────────────────
 * PracticeStack — /solutions
 *
 * The headline is "Five practices. One system underneath them." The diagram
 * has to carry the second sentence, because the card grid below already covers
 * the first. So: five practice bands, visibly resting on a single foundation
 * bar, with a highlighted band travelling up and down the stack — whichever
 * one is your constraint this quarter.
 *
 * The travelling highlight is the argument. It is deliberately NOT fixed on
 * one band, because the page's whole claim is that the constraint is usually
 * not the practice you came to buy.
 * ──────────────────────────────────────────────────────────────────────────── */

const PRACTICES = [
  "Brand, Engagement & Lifecycle",
  "Experience & Engineering",
  "Performance Media",
  "Organic Growth",
  "Growth Strategy & Advisory",
];

export function PracticeStack() {
  const bandH = 44;
  const gap = 10;
  const top = 78;

  return (
    <DiagramFrame
      title="Five practices stacked on one shared system. A highlight moves between the bands, showing that the constraining practice varies."
      leftLabel="FIVE PRACTICES"
      rightLabel="ONE SYSTEM"
    >
      {PRACTICES.map((name, i) => {
        const y = top + i * (bandH + gap);
        return (
          <g key={name}>
            <rect
              x="58"
              y={y}
              width="344"
              height={bandH}
              fill="none"
              stroke={INK}
              strokeWidth="1"
              strokeOpacity="0.22"
            />
            {/* The travelling constraint highlight. Each band lights in turn on
                a 10s loop — five bands, 2s each, so the eye has time to read
                the label before it moves on. */}
            <rect
              x="58"
              y={y}
              width="344"
              height={bandH}
              fill={YELLOW}
              opacity="0"
            >
              <animate
                attributeName="opacity"
                values="0;0;0.9;0.9;0;0"
                keyTimes={`0;${(i * 2) / 10};${(i * 2 + 0.25) / 10};${
                  (i * 2 + 1.75) / 10
                };${(i * 2 + 2) / 10};1`}
                dur="10s"
                repeatCount="indefinite"
              />
            </rect>
            <text
              x="74"
              y={y + bandH / 2 + 4}
              fontFamily={MONO}
              fontSize="10.5"
              letterSpacing="1.2"
              fill={INK}
              fillOpacity="0.72"
            >
              {name.toUpperCase()}
            </text>
            {/* Row index */}
            <text
              x="386"
              y={y + bandH / 2 + 4}
              textAnchor="end"
              fontFamily={MONO}
              fontSize="10"
              fill={INK}
              fillOpacity="0.3"
            >
              {String(i + 1).padStart(2, "0")}
            </text>
          </g>
        );
      })}

      {/* Connectors from each band down into the foundation — this is the
          "underneath them" the headline promises. */}
      {PRACTICES.map((_, i) => {
        const x = 96 + i * 68;
        return (
          <line
            key={i}
            x1={x}
            y1={top + 5 * (bandH + gap) - gap}
            x2={x}
            y2={356}
            stroke={INK}
            strokeWidth="1"
            strokeOpacity="0.18"
            strokeDasharray="3 3"
          />
        );
      })}

      {/* Foundation */}
      <rect x="58" y="356" width="344" height="52" fill={EMERALD} />
      <text
        x="230"
        y="379"
        textAnchor="middle"
        fontFamily={MONO}
        fontSize="10"
        letterSpacing="1.6"
        fill="#FFFFFF"
        fillOpacity="0.72"
      >
        THE SYSTEM UNDERNEATH
      </text>
      <text
        x="230"
        y="396"
        textAnchor="middle"
        fontFamily={MONO}
        fontSize="9"
        letterSpacing="1.2"
        fill={YELLOW}
        fillOpacity="0.9"
      >
        POSITIONING · MEASUREMENT · JOURNEY · CONVERSION
      </text>

      <text
        x="58"
        y="428"
        fontFamily={MONO}
        fontSize="9"
        letterSpacing="1.1"
        fill={INK}
        fillOpacity="0.4"
      >
        THE HIGHLIGHTED BAND IS THE CONSTRAINT — IT MOVES
      </text>
    </DiagramFrame>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
 * ValueSpread — /industries
 *
 * The headline is "The method is the same. What a customer is worth is not."
 * So the diagram holds one constant (the method line, flat across the frame)
 * against six wildly different customer values plotted on a log-ish scale.
 *
 * ── A NOTE ON THE NUMBERS ───────────────────────────────────────────────────
 * The bar heights are ILLUSTRATIVE ORDERS OF MAGNITUDE, not client data, and
 * the caption says so on the face of the diagram. The one real figure on this
 * site for a unit of value is TRU Aquapolis, published at /work/tru-aquapolis.
 * Do not add rupee labels to these bars — the moment a bar carries a figure,
 * a reader will reasonably take it as a client average, and we do not have
 * one. The point being made is the SPREAD, which needs no numbers at all.
 * ──────────────────────────────────────────────────────────────────────────── */

const CATEGORIES: { label: string; h: number }[] = [
  { label: "D2C", h: 26 },
  { label: "E-COM", h: 42 },
  { label: "EDTECH", h: 86 },
  { label: "SAAS", h: 132 },
  { label: "HEALTH", h: 104 },
  { label: "PROPERTY", h: 196 },
];

export function ValueSpread() {
  const baseY = 336;
  const barW = 40;
  const gap = 18;
  const startX = 66;

  return (
    <DiagramFrame
      title="One constant method line held against six categories whose customer value differs by orders of magnitude."
      leftLabel="ONE METHOD"
      rightLabel="SIX CATEGORIES"
    >
      {/* The constant — a single flat rule the bars are measured against. This
          is the "method is the same" half of the headline. */}
      <line
        x1="58"
        y1="104"
        x2="402"
        y2="104"
        stroke={EMERALD}
        strokeWidth="2"
      />
      <text
        x="58"
        y="94"
        fontFamily={MONO}
        fontSize="10"
        letterSpacing="1.4"
        fill={EMERALD}
      >
        THE METHOD — CONSTANT
      </text>
      {/* Travelling dot: the method runs the same way across every category. */}
      <circle r="4.5" fill={YELLOW} stroke={EMERALD} strokeWidth="1.5">
        <animateMotion dur="7s" repeatCount="indefinite" path="M 58 104 L 402 104" />
      </circle>

      {/* Baseline */}
      <line
        x1="58"
        y1={baseY}
        x2="402"
        y2={baseY}
        stroke={INK}
        strokeWidth="1"
        strokeOpacity="0.25"
      />

      {CATEGORIES.map((c, i) => {
        const x = startX + i * (barW + gap);
        const y = baseY - c.h;
        return (
          <g key={c.label}>
            <rect
              x={x}
              y={y}
              width={barW}
              height={c.h}
              fill={i === 5 ? EMERALD : INK}
              fillOpacity={i === 5 ? 0.9 : 0.14}
            >
              <animate
                attributeName="height"
                from="0"
                to={c.h}
                dur="0.9s"
                begin={`${i * 0.12}s`}
                fill="freeze"
              />
              <animate
                attributeName="y"
                from={baseY}
                to={y}
                dur="0.9s"
                begin={`${i * 0.12}s`}
                fill="freeze"
              />
            </rect>
            <text
              x={x + barW / 2}
              y={baseY + 18}
              textAnchor="middle"
              fontFamily={MONO}
              fontSize="8.5"
              letterSpacing="0.8"
              fill={INK}
              fillOpacity="0.55"
            >
              {c.label}
            </text>
          </g>
        );
      })}

      {/* Axis label */}
      <text
        x="58"
        y={baseY - 210}
        fontFamily={MONO}
        fontSize="10"
        letterSpacing="1.4"
        fill={INK}
        fillOpacity="0.45"
      >
        WHAT ONE CUSTOMER IS WORTH
      </text>

      <text
        x="58"
        y="382"
        fontFamily={MONO}
        fontSize="9"
        letterSpacing="1.1"
        fill={INK}
        fillOpacity="0.4"
      >
        RELATIVE ORDERS OF MAGNITUDE — SHAPE ONLY
      </text>
      <text
        x="58"
        y="398"
        fontFamily={MONO}
        fontSize="9"
        letterSpacing="1.1"
        fill={INK}
        fillOpacity="0.4"
      >
        THE SPREAD IS THE POINT, NOT THE VALUES
      </text>
      <text
        x="58"
        y="422"
        fontFamily={MONO}
        fontSize="9"
        letterSpacing="1.1"
        fill={EMERALD}
        fillOpacity="0.75"
      >
        COST PER LEAD IS MEANINGLESS WITHOUT THIS NUMBER
      </text>
    </DiagramFrame>
  );
}
