"use client";

import * as React from "react";

/**
 * OperatingCadenceCalendar — hero graphic for Fractional Marketing Leadership.
 *
 * 4-week monthly calendar (4 rows × 5 weekday cols) showing the engagement
 * pattern of a fractional CMO. Yellow-shaded cells are active engagement
 * days; light cells are off. Hover any active day to see what's happening.
 *
 * Mirrors the "fractional but accountable" POV — you can literally see the
 * presence pattern on the calendar.
 */

type CalendarDay = {
  /** Day number 1–28 */
  day: number;
  /** Active engagement day? */
  active: boolean;
  /** Optional commitment label */
  commitment?: string;
};

const WEEKDAYS = ["MON", "TUE", "WED", "THU", "FRI"];

// 4 weeks × 5 weekdays = 20 cells
const CALENDAR: CalendarDay[] = [
  // Week 01 — Leadership team week
  { day: 1, active: true, commitment: "Leadership team" },
  { day: 2, active: false },
  { day: 3, active: true, commitment: "1:1 with team" },
  { day: 4, active: false },
  { day: 5, active: false },
  // Week 02 — Cadence week
  { day: 8, active: true, commitment: "Pipeline review" },
  { day: 9, active: false },
  { day: 10, active: true, commitment: "Channel deep-dive" },
  { day: 11, active: false },
  { day: 12, active: false },
  // Week 03 — Building week
  { day: 15, active: true, commitment: "Strategy session" },
  { day: 16, active: false },
  { day: 17, active: true, commitment: "Vendor reviews" },
  { day: 18, active: false },
  { day: 19, active: false },
  // Week 04 — Board prep week
  { day: 22, active: true, commitment: "Board prep" },
  { day: 23, active: false },
  { day: 24, active: true, commitment: "Exec readout" },
  { day: 25, active: false },
  { day: 26, active: false },
];

const WEEK_ANNOTATIONS = [
  "LEADERSHIP TEAM",
  "PIPELINE CADENCE",
  "STRATEGY · BUILD",
  "BOARD · READOUT",
];

export function OperatingCadenceCalendar({ className = "" }: { className?: string }) {
  const [hovered, setHovered] = React.useState<number | null>(null);

  // Grid geometry
  const gridX = 105;
  const gridY = 110;
  const cellW = 56;
  const cellH = 56;
  const cellGap = 4;

  const activeCount = CALENDAR.filter((c) => c.active).length;
  const totalCount = CALENDAR.length;

  return (
    <div className={`relative w-full max-w-[460px] mx-auto ${className}`}>
      <svg
        viewBox="0 0 460 460"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        aria-labelledby="operating-cadence-calendar-title"
        role="img"
      >
        <title id="operating-cadence-calendar-title">
          Operating cadence calendar — fractional CMO monthly rhythm
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
          OPERATING CADENCE — MONTH 01
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
          {activeCount} / {totalCount} DAYS
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
          WEEK
        </text>

        {/* Weekday header row */}
        {WEEKDAYS.map((d, i) => {
          const x = gridX + i * (cellW + cellGap) + cellW / 2;
          return (
            <text
              key={d}
              x={x}
              y={96}
              fontFamily="var(--font-mono), ui-monospace, monospace"
              fontSize="8"
              fontWeight="500"
              fill="#0A102F"
              fillOpacity="0.55"
              letterSpacing="1.5"
              textAnchor="middle"
            >
              {d}
            </text>
          );
        })}

        {/* Week annotations on the left */}
        {WEEK_ANNOTATIONS.map((label, weekIdx) => {
          const y = gridY + weekIdx * (cellH + cellGap) + cellH / 2;
          return (
            <g key={weekIdx}>
              <text
                x={92}
                y={y - 3}
                fontFamily="var(--font-mono), ui-monospace, monospace"
                fontSize="8"
                fontWeight="500"
                fill="#0A102F"
                fillOpacity="0.7"
                letterSpacing="1.2"
                textAnchor="end"
              >
                W{String(weekIdx + 1).padStart(2, "0")}
              </text>
              <text
                x={92}
                y={y + 7}
                fontFamily="var(--font-mono), ui-monospace, monospace"
                fontSize="7"
                fill="#0A102F"
                fillOpacity="0.45"
                letterSpacing="1.0"
                textAnchor="end"
              >
                {label}
              </text>
            </g>
          );
        })}

        {/* Calendar cells */}
        {CALENDAR.map((cell, i) => {
          const weekIdx = Math.floor(i / 5);
          const dayIdx = i % 5;
          const x = gridX + dayIdx * (cellW + cellGap);
          const y = gridY + weekIdx * (cellH + cellGap);
          const isHovered = hovered === i;

          // Active days: yellow when not hovered, deeper yellow on hover
          // Inactive days: very light surface
          const fillColor = cell.active
            ? isHovered ? "#FFD031" : "#FFD031"
            : "#F8F8F6";
          const fillOpacity = cell.active ? 1 : 1;
          const strokeOpacity = cell.active ? 0.6 : 0.2;

          return (
            <g
              key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: cell.active ? "pointer" : "default" }}
            >
              <rect
                x={x}
                y={y}
                width={cellW}
                height={cellH}
                fill={fillColor}
                fillOpacity={fillOpacity}
                stroke="#0A102F"
                strokeOpacity={strokeOpacity}
                strokeWidth={isHovered ? 1.5 : 1}
                style={{ transition: "stroke-width 200ms ease" }}
              />

              {/* Day number top-left */}
              <text
                x={x + 6}
                y={y + 14}
                fontFamily="var(--font-mono), ui-monospace, monospace"
                fontSize="9"
                fill={cell.active ? "#0A102F" : "#0A102F"}
                fillOpacity={cell.active ? 0.85 : 0.35}
                letterSpacing="0.8"
              >
                {String(cell.day).padStart(2, "0")}
              </text>

              {/* Active marker — small filled square in center */}
              {cell.active && (
                <>
                  <rect
                    x={x + cellW / 2 - 5}
                    y={y + cellH / 2 - 5}
                    width="10"
                    height="10"
                    fill="#0A102F"
                    fillOpacity="0.85"
                  />
                  {/* Pulse halo on active cells */}
                  <circle
                    cx={x + cellW / 2}
                    cy={y + cellH / 2}
                    r="8"
                    fill="none"
                    stroke="#0A102F"
                    strokeOpacity="0.5"
                    strokeWidth="1"
                  >
                    <animate
                      attributeName="r"
                      values="8;14;8"
                      dur={`${2 + (i % 3) * 0.3}s`}
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="stroke-opacity"
                      values="0.5;0;0.5"
                      dur={`${2 + (i % 3) * 0.3}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                </>
              )}

              {/* Hover label — show commitment */}
              {isHovered && cell.commitment && (
                <text
                  x={x + cellW / 2}
                  y={y + cellH - 5}
                  fontFamily="var(--font-mono), ui-monospace, monospace"
                  fontSize="6"
                  fill="#0A102F"
                  letterSpacing="0.6"
                  textAnchor="middle"
                  fontWeight="500"
                >
                  {cell.commitment.toUpperCase()}
                </text>
              )}
            </g>
          );
        })}

        {/* Engagement stat at bottom */}
        <text
          x="32"
          y="396"
          fontFamily="var(--font-mono), ui-monospace, monospace"
          fontSize="9"
          fill="#0A102F"
          fillOpacity="0.55"
          letterSpacing="1.5"
        >
          ENGAGEMENT: {Math.round((activeCount / totalCount) * 100)}% · ~2 DAYS / WEEK
        </text>

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
          FRACTIONAL · NOT PART-TIME
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
          ZEPPSTR · FRACTIONAL
        </text>
      </svg>

      <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
        Hover {hovered !== null && CALENDAR[hovered].commitment ? `· ${CALENDAR[hovered].commitment}` : "any engagement day"}
      </p>
    </div>
  );
}
