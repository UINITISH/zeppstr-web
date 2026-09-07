"use client";

import * as React from "react";

/**
 * WebPerformanceScorecard — hero graphic for the Web Development page.
 *
 * 2×2 grid of Lighthouse-style gauge circles showing the performance baseline
 * we ship to. Yellow arcs sweep clockwise to their target score on render and
 * re-sweep periodically. Hover any gauge to highlight it.
 *
 *   Performance · 98
 *   Accessibility · 100
 *   Best Practices · 100
 *   SEO · 100
 *
 * Same drafting aesthetic as the other hero graphics — corner ticks, mono
 * labels, hairline rules. Tokens only.
 */

const GAUGES = [
  { label: "Performance", target: 98, sub: "Mobile · real users" },
  { label: "Accessibility", target: 100, sub: "WCAG 2.1 AA" },
  { label: "Best Practices", target: 100, sub: "Web platform" },
  { label: "SEO", target: 100, sub: "Indexable · structured" },
];

const RADIUS = 38;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function WebPerformanceScorecard({ className = "" }: { className?: string }) {
  const [hovered, setHovered] = React.useState<number | null>(null);

  // Grid layout: 2x2 within the canvas
  const cellW = 200;
  const cellH = 150;
  const startX = 30; // 30 + 200 + 30 + 200 = 460 ✓
  const startY = 90;

  return (
    <div className={`relative w-full max-w-[460px] mx-auto ${className}`}>
      <svg
        viewBox="0 0 460 460"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        aria-labelledby="web-performance-scorecard-title"
        role="img"
      >
        <title id="web-performance-scorecard-title">
          Web performance scorecard — the baseline we ship
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
          PERFORMANCE BASELINE — POST-LAUNCH
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
          LIGHTHOUSE
        </text>

        <text
          x="32"
          y="72"
          fontFamily="var(--font-mono), ui-monospace, monospace"
          fontSize="8"
          fill="#0A102F"
          fillOpacity="0.4"
          letterSpacing="1.2"
        >
          SCORE / 100
        </text>

        {/* 2x2 gauge grid */}
        {GAUGES.map((g, i) => {
          const row = Math.floor(i / 2);
          const col = i % 2;
          const cellX = startX + col * cellW;
          const cellY = startY + row * cellH;
          const cx = cellX + cellW / 2;
          const cy = cellY + 55;
          const isHovered = hovered === i;
          const dashOffset = CIRCUMFERENCE * (1 - g.target / 100);

          return (
            <g
              key={g.label}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: "pointer" }}
            >
              {/* Gauge background ring */}
              <circle
                cx={cx}
                cy={cy}
                r={RADIUS}
                fill="none"
                stroke="#0A102F"
                strokeOpacity="0.12"
                strokeWidth="6"
              />

              {/* Yellow arc — animated sweep */}
              <circle
                cx={cx}
                cy={cy}
                r={RADIUS}
                fill="none"
                stroke="#FFD031"
                strokeWidth={isHovered ? 8 : 6}
                strokeLinecap="round"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={dashOffset}
                transform={`rotate(-90 ${cx} ${cy})`}
                style={{ transition: "stroke-width 200ms ease" }}
              >
                <animate
                  attributeName="stroke-dashoffset"
                  values={`${CIRCUMFERENCE};${dashOffset}`}
                  dur="2s"
                  begin={`${i * 0.3}s; 12s`}
                  repeatCount="indefinite"
                />
              </circle>

              {/* Inner score number */}
              <text
                x={cx}
                y={cy + 8}
                fontFamily="var(--font-display), ui-sans-serif, system-ui, sans-serif"
                fontSize="32"
                fontWeight="300"
                fill="#0A102F"
                textAnchor="middle"
                letterSpacing="-1.5"
              >
                {g.target}
              </text>

              {/* Pulse dot at the start of the arc (top) */}
              <circle
                cx={cx}
                cy={cy - RADIUS}
                r="3"
                fill="#FFD031"
                stroke="#0A102F"
                strokeWidth="1"
              >
                <animate
                  attributeName="opacity"
                  values="1;0.3;1"
                  dur={`${2 + i * 0.3}s`}
                  repeatCount="indefinite"
                />
              </circle>

              {/* Label below gauge */}
              <text
                x={cx}
                y={cy + RADIUS + 16}
                fontFamily="var(--font-mono), ui-monospace, monospace"
                fontSize="9"
                fontWeight="500"
                fill="#0A102F"
                fillOpacity="0.85"
                letterSpacing="1.5"
                textAnchor="middle"
              >
                {g.label.toUpperCase()}
              </text>
              <text
                x={cx}
                y={cy + RADIUS + 28}
                fontFamily="var(--font-mono), ui-monospace, monospace"
                fontSize="7"
                fill="#0A102F"
                fillOpacity="0.55"
                letterSpacing="1.0"
                textAnchor="middle"
              >
                {g.sub.toUpperCase()}
              </text>
            </g>
          );
        })}

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
          INFRASTRUCTURE, NOT DEBT
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
          ZEPPSTR · ENGINEERING
        </text>
      </svg>

      <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
        Hover {hovered !== null ? `· ${GAUGES[hovered].label}` : "any gauge"}
      </p>
    </div>
  );
}
