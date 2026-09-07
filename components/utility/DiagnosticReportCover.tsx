"use client";

import * as React from "react";

/**
 * DiagnosticReportCover — hero graphic for Growth Diagnostic & Audit.
 *
 * Renders a stylized document cover for the diagnostic deliverable — title
 * block, "prepared for" line, executive findings TOC with severity
 * indicators, and a footer stamp showing page count + reading time.
 *
 * Reinforces the page POV: the diagnostic IS the deliverable. This is what
 * walks in the door, not a sales-deck reference to it.
 */

const FINDINGS = [
  { n: "01", label: "Strategy & Operating Model", severity: 2 },
  { n: "02", label: "Acquisition Channel Mix", severity: 3 },
  { n: "03", label: "Conversion Architecture", severity: 3 },
  { n: "04", label: "Lifecycle & Retention", severity: 2 },
  { n: "05", label: "Brand & Positioning", severity: 1 },
  { n: "06", label: "Measurement & Attribution", severity: 3 },
];

// Severity indicator: 3 = critical (●●●), 2 = medium (●●○), 1 = light (●○○)
function SeverityIndicator({ level, x, y }: { level: number; x: number; y: number }) {
  return (
    <g>
      {[0, 1, 2].map((i) => (
        <circle
          key={i}
          cx={x + i * 9}
          cy={y}
          r="3"
          fill={i < level ? "#FFD031" : "none"}
          stroke="#0A102F"
          strokeOpacity="0.6"
          strokeWidth="1"
        />
      ))}
    </g>
  );
}

export function DiagnosticReportCover({ className = "" }: { className?: string }) {
  const [hovered, setHovered] = React.useState<number | null>(null);

  // Document geometry (inset within outer frame)
  const docX = 50;
  const docY = 56;
  const docW = 360;
  const docH = 348;

  return (
    <div className={`relative w-full max-w-[460px] mx-auto ${className}`}>
      <svg
        viewBox="0 0 460 460"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        aria-labelledby="diagnostic-report-cover-title"
        role="img"
      >
        <title id="diagnostic-report-cover-title">
          Strategic growth diagnostic — sample report cover
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

        {/* Header label outside the doc */}
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
          DELIVERABLE SAMPLE
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
          REV.04 · INTERNAL
        </text>

        {/* Document body — white "paper" */}
        <rect
          x={docX}
          y={docY}
          width={docW}
          height={docH}
          fill="#FFFFFF"
          stroke="#0A102F"
          strokeOpacity="0.6"
          strokeWidth="1.25"
        />

        {/* Top margin marks (drafting feel) */}
        {[0.1, 0.3, 0.5, 0.7, 0.9].map((frac, i) => (
          <line
            key={i}
            x1={docX + docW * frac}
            y1={docY}
            x2={docX + docW * frac}
            y2={docY + 4}
            stroke="#0A102F"
            strokeOpacity="0.25"
            strokeWidth="1"
          />
        ))}

        {/* Page number top-right of document */}
        <text
          x={docX + docW - 16}
          y={docY + 18}
          fontFamily="var(--font-mono), ui-monospace, monospace"
          fontSize="8"
          fill="#0A102F"
          fillOpacity="0.4"
          letterSpacing="1.2"
          textAnchor="end"
        >
          PAGE 01 / 42
        </text>

        {/* Date stamp top-left */}
        <text
          x={docX + 18}
          y={docY + 18}
          fontFamily="var(--font-mono), ui-monospace, monospace"
          fontSize="8"
          fill="#0A102F"
          fillOpacity="0.4"
          letterSpacing="1.2"
        >
          MAY 27, 2026
        </text>

        {/* Eyebrow */}
        <text
          x={docX + 18}
          y={docY + 50}
          fontFamily="var(--font-mono), ui-monospace, monospace"
          fontSize="9"
          fontWeight="500"
          fill="#FFD031"
          letterSpacing="1.8"
        >
          ZEPPSTR · STRATEGIC GROWTH
        </text>

        {/* Title — large display */}
        <text
          x={docX + 18}
          y={docY + 86}
          fontFamily="var(--font-display), ui-sans-serif, system-ui, sans-serif"
          fontSize="28"
          fontWeight="700"
          fill="#0A102F"
          letterSpacing="-1.2"
        >
          Diagnostic
        </text>
        <text
          x={docX + 18}
          y={docY + 116}
          fontFamily="var(--font-display), ui-sans-serif, system-ui, sans-serif"
          fontSize="28"
          fontWeight="200"
          fill="#0A102F"
          letterSpacing="-1.2"
        >
          & 90-Day Plan
        </text>

        {/* Prepared for line */}
        <line
          x1={docX + 18}
          y1={docY + 138}
          x2={docX + docW - 18}
          y2={docY + 138}
          stroke="#0A102F"
          strokeOpacity="0.2"
          strokeWidth="1"
        />
        <text
          x={docX + 18}
          y={docY + 155}
          fontFamily="var(--font-mono), ui-monospace, monospace"
          fontSize="8"
          fill="#0A102F"
          fillOpacity="0.55"
          letterSpacing="1.5"
        >
          PREPARED FOR · CLIENT NAME
        </text>
        <text
          x={docX + docW - 18}
          y={docY + 155}
          fontFamily="var(--font-mono), ui-monospace, monospace"
          fontSize="8"
          fill="#0A102F"
          fillOpacity="0.55"
          letterSpacing="1.5"
          textAnchor="end"
        >
          Q1 2026
        </text>

        {/* Section header */}
        <text
          x={docX + 18}
          y={docY + 188}
          fontFamily="var(--font-mono), ui-monospace, monospace"
          fontSize="9"
          fontWeight="500"
          fill="#0A102F"
          fillOpacity="0.65"
          letterSpacing="1.8"
        >
          EXECUTIVE FINDINGS · 06
        </text>

        {/* Severity legend */}
        <text
          x={docX + docW - 18}
          y={docY + 188}
          fontFamily="var(--font-mono), ui-monospace, monospace"
          fontSize="7"
          fill="#0A102F"
          fillOpacity="0.45"
          letterSpacing="1.2"
          textAnchor="end"
        >
          SEVERITY ●●●
        </text>

        {/* Findings list */}
        {FINDINGS.map((f, i) => {
          const rowY = docY + 210 + i * 24;
          const isHovered = hovered === i;
          return (
            <g
              key={f.n}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: "pointer" }}
            >
              {/* Hover highlight background */}
              {isHovered && (
                <rect
                  x={docX + 8}
                  y={rowY - 12}
                  width={docW - 16}
                  height="20"
                  fill="#FFD031"
                  fillOpacity="0.18"
                />
              )}
              {/* Index */}
              <text
                x={docX + 18}
                y={rowY}
                fontFamily="var(--font-mono), ui-monospace, monospace"
                fontSize="9"
                fill="#0A102F"
                fillOpacity="0.55"
                letterSpacing="1.5"
              >
                {f.n}
              </text>
              {/* Label */}
              <text
                x={docX + 50}
                y={rowY}
                fontFamily="var(--font-display), ui-sans-serif, system-ui, sans-serif"
                fontSize="12"
                fontWeight={isHovered ? 600 : 400}
                fill="#0A102F"
                letterSpacing="-0.2"
              >
                {f.label}
              </text>
              {/* Severity indicator */}
              <SeverityIndicator level={f.severity} x={docX + docW - 50} y={rowY - 4} />
              {/* Bottom hairline */}
              <line
                x1={docX + 18}
                y1={rowY + 8}
                x2={docX + docW - 18}
                y2={rowY + 8}
                stroke="#0A102F"
                strokeOpacity="0.12"
                strokeWidth="1"
              />
            </g>
          );
        })}

        {/* Footer stamp area */}
        <line
          x1={docX + 18}
          y1={docY + docH - 32}
          x2={docX + docW - 18}
          y2={docY + docH - 32}
          stroke="#0A102F"
          strokeOpacity="0.25"
          strokeWidth="1"
        />
        <text
          x={docX + 18}
          y={docY + docH - 14}
          fontFamily="var(--font-mono), ui-monospace, monospace"
          fontSize="8"
          fontWeight="500"
          fill="#0A102F"
          fillOpacity="0.55"
          letterSpacing="1.5"
        >
          42 PAGES · 30 MIN READ · ACTIONABLE MONDAY
        </text>

        {/* Yellow accent stamp top-right */}
        <rect
          x={docX + docW - 50}
          y={docY + docH - 24}
          width={32}
          height={14}
          fill="#FFD031"
        />
        <text
          x={docX + docW - 34}
          y={docY + docH - 14}
          fontFamily="var(--font-mono), ui-monospace, monospace"
          fontSize="7"
          fill="#0A102F"
          fontWeight="500"
          letterSpacing="0.8"
          textAnchor="middle"
        >
          REV.04
        </text>

        {/* Footer labels outside doc */}
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
          READABLE · ACTIONABLE
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
          ZEPPSTR · DIAGNOSTIC
        </text>
      </svg>

      <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
        Hover {hovered !== null ? `· ${FINDINGS[hovered].label}` : "any finding"}
      </p>
    </div>
  );
}
