"use client";

import * as React from "react";

/**
 * BrandIdentitySystem — editorial hero graphic for the Brand Identity sub-service.
 *
 * Static, composed SVG showing the four operating layers of a brand identity
 * system arranged as a stacked architecture diagram:
 *   01 — MARK (geometric primitive)
 *   02 — TYPE (letterform sample)
 *   03 — COLOR (swatch row)
 *   04 — VOICE (spoken-tone wave)
 *
 * Each layer pulses on hover (no popups — calmer than LifecycleCircle).
 * Outer frame ticks animate subtly to indicate the system is "operating".
 *
 * Tokens only: brand-yellow, ink-headline, emerald-900, white. No new colors.
 */

const LAYERS = [
  { n: "01", label: "Mark" },
  { n: "02", label: "Type" },
  { n: "03", label: "Color" },
  { n: "04", label: "Voice" },
];

export function BrandIdentitySystem({ className = "" }: { className?: string }) {
  const [hovered, setHovered] = React.useState<number | null>(null);

  return (
    <div className={`relative w-full max-w-[460px] mx-auto ${className}`}>
      <svg
        viewBox="0 0 460 460"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        aria-labelledby="brand-identity-system-title"
        role="img"
      >
        <title id="brand-identity-system-title">
          Brand Identity System — Mark, Type, Color, Voice
        </title>

        {/* ─── Outer frame ─── */}
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

        {/* Coordinate ticks along top edge — subtle "drafting" feel */}
        {Array.from({ length: 9 }).map((_, i) => {
          const x = 60 + i * 42.5;
          return (
            <line
              key={i}
              x1={x}
              y1={20}
              x2={x}
              y2={26}
              stroke="#0A102F"
              strokeOpacity="0.3"
              strokeWidth="1"
            />
          );
        })}

        {/* Header label — top left */}
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
          BRAND OPERATING SYSTEM — v1.0
        </text>

        {/* Header label — top right */}
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
          04 / LAYERS
        </text>

        {/* ─── 01 — MARK (top-left quadrant) ─── */}
        <g
          onMouseEnter={() => setHovered(0)}
          onMouseLeave={() => setHovered(null)}
          style={{ cursor: "pointer" }}
        >
          <rect
            x="60"
            y="80"
            width="160"
            height="140"
            fill={hovered === 0 ? "#FFD031" : "#F8F8F6"}
            stroke="#0A102F"
            strokeOpacity="0.15"
            strokeWidth="1"
            style={{ transition: "fill 240ms ease" }}
          />
          {/* Index */}
          <text
            x="72"
            y="100"
            fontFamily="var(--font-mono), ui-monospace, monospace"
            fontSize="9"
            fill="#0A102F"
            fillOpacity="0.6"
            letterSpacing="1.5"
          >
            01 — MARK
          </text>
          {/* Geometric brand mark: square + circle composition */}
          <g transform="translate(140, 150)">
            <rect
              x="-26"
              y="-26"
              width="52"
              height="52"
              fill="#0A102F"
            />
            <circle
              cx="18"
              cy="18"
              r="22"
              fill="#FFD031"
              stroke="#0A102F"
              strokeWidth="1.5"
            />
            <line
              x1="-30"
              y1="0"
              x2="44"
              y2="0"
              stroke="#0A102F"
              strokeWidth="1"
              strokeOpacity="0.4"
              strokeDasharray="2 3"
            />
          </g>
        </g>

        {/* ─── 02 — TYPE (top-right quadrant) ─── */}
        <g
          onMouseEnter={() => setHovered(1)}
          onMouseLeave={() => setHovered(null)}
          style={{ cursor: "pointer" }}
        >
          <rect
            x="240"
            y="80"
            width="160"
            height="140"
            fill={hovered === 1 ? "#FFD031" : "#F8F8F6"}
            stroke="#0A102F"
            strokeOpacity="0.15"
            strokeWidth="1"
            style={{ transition: "fill 240ms ease" }}
          />
          <text
            x="252"
            y="100"
            fontFamily="var(--font-mono), ui-monospace, monospace"
            fontSize="9"
            fill="#0A102F"
            fillOpacity="0.6"
            letterSpacing="1.5"
          >
            02 — TYPE
          </text>
          {/* Big Z letterform — extralight, brand-aligned */}
          <text
            x="320"
            y="190"
            fontFamily="var(--font-display), ui-sans-serif, system-ui, sans-serif"
            fontSize="110"
            fontWeight="200"
            fill="#0A102F"
            textAnchor="middle"
            letterSpacing="-4"
          >
            Z
          </text>
          {/* Baseline + cap height guides */}
          <line
            x1="252"
            y1="195"
            x2="388"
            y2="195"
            stroke="#0A102F"
            strokeOpacity="0.25"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
          <line
            x1="252"
            y1="115"
            x2="388"
            y2="115"
            stroke="#0A102F"
            strokeOpacity="0.25"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
          <text
            x="388"
            y="113"
            fontFamily="var(--font-mono), ui-monospace, monospace"
            fontSize="8"
            fill="#0A102F"
            fillOpacity="0.4"
            textAnchor="end"
          >
            cap
          </text>
          <text
            x="388"
            y="208"
            fontFamily="var(--font-mono), ui-monospace, monospace"
            fontSize="8"
            fill="#0A102F"
            fillOpacity="0.4"
            textAnchor="end"
          >
            baseline
          </text>
        </g>

        {/* ─── 03 — COLOR (bottom-left quadrant) ─── */}
        <g
          onMouseEnter={() => setHovered(2)}
          onMouseLeave={() => setHovered(null)}
          style={{ cursor: "pointer" }}
        >
          <rect
            x="60"
            y="240"
            width="160"
            height="140"
            fill={hovered === 2 ? "#FFD031" : "#F8F8F6"}
            stroke="#0A102F"
            strokeOpacity="0.15"
            strokeWidth="1"
            style={{ transition: "fill 240ms ease" }}
          />
          <text
            x="72"
            y="260"
            fontFamily="var(--font-mono), ui-monospace, monospace"
            fontSize="9"
            fill="#0A102F"
            fillOpacity="0.6"
            letterSpacing="1.5"
          >
            03 — COLOR
          </text>
          {/* 4-swatch grid + hex labels */}
          {[
            { x: 72, fill: "#0A102F", label: "0A102F" },
            { x: 110, fill: "#064E3B", label: "064E3B" },
            { x: 148, fill: "#FFD031", label: "FFD031" },
            { x: 186, fill: "#FFFFFF", label: "FFFFFF", stroke: true },
          ].map((s) => (
            <g key={s.label}>
              <rect
                x={s.x}
                y={280}
                width="32"
                height="56"
                fill={s.fill}
                stroke={s.stroke ? "#0A102F" : "none"}
                strokeOpacity={s.stroke ? 0.2 : 0}
                strokeWidth="1"
              />
              <text
                x={s.x + 16}
                y={352}
                fontFamily="var(--font-mono), ui-monospace, monospace"
                fontSize="7"
                fill="#0A102F"
                fillOpacity="0.6"
                textAnchor="middle"
                letterSpacing="0.5"
              >
                {s.label}
              </text>
            </g>
          ))}
        </g>

        {/* ─── 04 — VOICE (bottom-right quadrant) ─── */}
        <g
          onMouseEnter={() => setHovered(3)}
          onMouseLeave={() => setHovered(null)}
          style={{ cursor: "pointer" }}
        >
          <rect
            x="240"
            y="240"
            width="160"
            height="140"
            fill={hovered === 3 ? "#FFD031" : "#F8F8F6"}
            stroke="#0A102F"
            strokeOpacity="0.15"
            strokeWidth="1"
            style={{ transition: "fill 240ms ease" }}
          />
          <text
            x="252"
            y="260"
            fontFamily="var(--font-mono), ui-monospace, monospace"
            fontSize="9"
            fill="#0A102F"
            fillOpacity="0.6"
            letterSpacing="1.5"
          >
            04 — VOICE
          </text>
          {/* Spoken-tone waveform — minimal bars */}
          <g transform="translate(260, 310)">
            {[14, 26, 36, 22, 42, 30, 48, 24, 34, 20, 30, 14].map((h, i) => (
              <rect
                key={i}
                x={i * 10}
                y={-h / 2}
                width="4"
                height={h}
                fill="#0A102F"
                fillOpacity="0.85"
              >
                <animate
                  attributeName="height"
                  values={`${h};${h * 0.45};${h}`}
                  dur={`${2.6 + (i % 4) * 0.4}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="y"
                  values={`${-h / 2};${(-h * 0.45) / 2};${-h / 2}`}
                  dur={`${2.6 + (i % 4) * 0.4}s`}
                  repeatCount="indefinite"
                />
              </rect>
            ))}
          </g>
          <text
            x="320"
            y="360"
            fontFamily="var(--font-mono), ui-monospace, monospace"
            fontSize="8"
            fill="#0A102F"
            fillOpacity="0.5"
            textAnchor="middle"
            letterSpacing="1.5"
          >
            CONFIDENT · CLEAR · DRY
          </text>
        </g>

        {/* Center division crosshair */}
        <line
          x1="230"
          y1="80"
          x2="230"
          y2="380"
          stroke="#0A102F"
          strokeOpacity="0.18"
          strokeWidth="1"
        />
        <line
          x1="60"
          y1="230"
          x2="400"
          y2="230"
          stroke="#0A102F"
          strokeOpacity="0.18"
          strokeWidth="1"
        />

        {/* Footer label — bottom left */}
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
          OPERATED, NOT FRAMED
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
          ZEPPSTR · IDENTITY
        </text>
      </svg>

      {/* Hover hint — sits below the diagram */}
      <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
        Hover {hovered !== null ? `· ${LAYERS[hovered].label}` : "any layer"}
      </p>
    </div>
  );
}
