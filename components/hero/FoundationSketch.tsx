import * as React from "react";
import { DOODLES } from "@/components/insights/doodles";

/**
 * FoundationSketch — the drawing that fills the hero's right column.
 *
 * ── WHAT WENT WRONG TWICE BEFORE ────────────────────────────────────────────
 * First a client funnel went here. Vikas killed it, correctly: "How can we show
 * a client's funnel on the homepage of our organization? It does not match."
 * Then the two USP figures went back in — right, but they only fill the top
 * third, leaving a large empty patch beneath them. He circled it.
 *
 * ── WHY THIS DRAWING AND NOT ANOTHER ────────────────────────────────────────
 * The headline says "Your channels aren't the problem. What's underneath them
 * is." The body names the three layers by name: positioning, measurement,
 * conversion. So the hero already makes a structural claim in words and then
 * shows nothing. This draws the claim: four channels sitting on top, a ground
 * line, and the three strata underneath that we actually rebuild.
 *
 * It is our own architecture, which is the test the funnel failed. Nobody
 * else's data appears in it, so there is nothing to source and nothing to
 * withdraw later.
 *
 * ── STYLE ───────────────────────────────────────────────────────────────────
 * Hand-drawn, sharing the doodle library with the Insights artwork, so the
 * homepage and the articles look like they came from the same hand. The strata
 * edges wobble on purpose — a ruler-straight box reads as a slide, a slightly
 * crooked one reads as a sketch on a wall.
 */

const CHANNELS = ["megaphone", "magnifier", "envelope", "hashtag"] as const;

const STRATA = [
  { label: "Positioning", note: "who it's for, why you", x1: 62, x2: 452, y: 176 },
  { label: "Measurement", note: "what actually moved", x1: 34, x2: 480, y: 238 },
  { label: "Conversion", note: "where revenue lands", x1: 8, x2: 506, y: 300 },
];

export function FoundationSketch({ className = "" }: { className?: string }) {
  return (
    <div className={className} aria-hidden="true">
      <svg
        viewBox="0 0 520 372"
        fill="none"
        className="h-auto w-full overflow-visible"
        role="presentation"
      >
        <style>{`
          .fs-draw { stroke-dasharray: 1400; stroke-dashoffset: 1400; animation: fs-draw 1.5s ease-out forwards; }
          .fs-fade { opacity: 0; animation: fs-fade .7s ease-out forwards; }
          @keyframes fs-draw { to { stroke-dashoffset: 0; } }
          @keyframes fs-fade { to { opacity: 1; } }
          @media (prefers-reduced-motion: reduce) {
            .fs-draw { stroke-dashoffset: 0; animation: none; }
            .fs-fade { opacity: 1; animation: none; }
          }
        `}</style>

        {/* ── surface: the channels everyone already looks at ─────────────── */}
        <text
          x="8"
          y="12"
          className="fill-white/40"
          style={{ font: "500 10px var(--font-mono), monospace", letterSpacing: "0.14em" }}
        >
          WHAT YOU BUY
        </text>

        {CHANNELS.map((name, i) => {
          const Doodle = DOODLES[name];
          return (
            <g
              key={name}
              className="fs-fade"
              style={{ animationDelay: `${0.15 + i * 0.09}s` }}
            >
              <g
                transform={`translate(${16 + i * 122}, 30) scale(0.46)`}
                stroke="rgba(255,255,255,0.45)"
                strokeWidth={4.5}
              >
                <Doodle />
              </g>
            </g>
          );
        })}

        {/* ── the ground line: a hand-drawn rule, not a border ─────────────── */}
        <path
          d="M4 108 C 120 104, 210 112, 300 107 S 430 102, 516 108"
          stroke="#FFD031"
          strokeWidth={2.5}
          strokeLinecap="round"
          className="fs-draw"
          style={{ animationDelay: "0.5s" }}
        />
        <text
          x="516"
          y="128"
          textAnchor="end"
          className="fill-brand-yellow"
          style={{ font: "500 10px var(--font-mono), monospace", letterSpacing: "0.14em" }}
        >
          ↓ WHAT WE REBUILD
        </text>

        {/* ── the three strata ─────────────────────────────────────────────── */}
        {STRATA.map((s, i) => {
          const h = 50;
          const wob = i % 2 === 0 ? 2 : -2;
          const d =
            `M${s.x1} ${s.y + 2} ` +
            `L${s.x2} ${s.y - wob} ` +
            `L${s.x2 + wob} ${s.y + h} ` +
            `L${s.x1 - 1} ${s.y + h - 2} Z`;
          return (
            <g key={s.label}>
              <path
                d={d}
                stroke="rgba(255,255,255,0.32)"
                strokeWidth={2}
                strokeLinejoin="round"
                fill="rgba(255,255,255,0.035)"
                className="fs-draw"
                style={{ animationDelay: `${0.8 + i * 0.22}s` }}
              />
              <g className="fs-fade" style={{ animationDelay: `${1.15 + i * 0.22}s` }}>
                <rect x={s.x1 + 18} y={s.y + 20} width="7" height="7" fill="#FFD031" />
                <text
                  x={s.x1 + 34}
                  y={s.y + 27}
                  className="fill-white"
                  style={{ font: "500 16px var(--font-sans), system-ui" }}
                >
                  {s.label}
                </text>
                <text
                  x={s.x2 - 14}
                  y={s.y + 27}
                  textAnchor="end"
                  className="fill-white/45"
                  style={{ font: "400 11px var(--font-mono), monospace", letterSpacing: "0.06em" }}
                >
                  {s.note}
                </text>
              </g>
            </g>
          );
        })}

        {/* ── the join: strata are one system, not three services ──────────── */}
        <path
          d="M30 226 L30 236 M30 288 L30 298"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth={2}
          strokeLinecap="round"
          className="fs-fade"
          style={{ animationDelay: "1.7s" }}
        />
      </svg>
    </div>
  );
}
