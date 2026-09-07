"use client";

import * as React from "react";

/**
 * LocationCoverageHeatmap — hero graphic for Local Search.
 *
 * 6×6 heatmap grid showing Map Pack coverage across locations × intents.
 *   Columns = locations (LOC 01–06)
 *   Rows    = search intents (services / queries)
 *
 * Each cell shows a rank position (1–10+) and is color-coded:
 *   Rank 1–3 (Map Pack) → yellow (filled)
 *   Rank 4–10 (Page 1)  → light yellow (outlined)
 *   Rank 11+ (gap)      → light gray
 *
 * Hover any cell to highlight it. Summary stats at the bottom.
 */

// 6 cols x 6 rows of rank values. 99 = not ranking.
// Built to show realistic coverage state — some strong locations, some gaps.
const COVERAGE: number[][] = [
  // INTENT row → values across 6 locations
  [1, 1, 2, 4, 3, 8], // services A
  [2, 3, 1, 6, 5, 12], // services B
  [1, 2, 3, 3, 7, 15], // services C
  [3, 4, 5, 8, 12, 18], // services D
  [5, 7, 8, 14, 18, 22], // services E
  [12, 15, 18, 22, 25, 30], // services F
];

const LOCATIONS = ["L01", "L02", "L03", "L04", "L05", "L06"];
const INTENTS = ["I01", "I02", "I03", "I04", "I05", "I06"];

type RankBucket = "mappack" | "page1" | "gap";

function bucket(rank: number): RankBucket {
  if (rank <= 3) return "mappack";
  if (rank <= 10) return "page1";
  return "gap";
}

function cellColor(b: RankBucket): {
  fill: string;
  textColor: string;
  textOpacity: number;
} {
  if (b === "mappack") return { fill: "#FFD031", textColor: "#0A102F", textOpacity: 0.9 };
  if (b === "page1")
    return { fill: "#FFF1B8", textColor: "#0A102F", textOpacity: 0.7 };
  return { fill: "#F0F0EC", textColor: "#0A102F", textOpacity: 0.4 };
}

export function LocationCoverageHeatmap({ className = "" }: { className?: string }) {
  const [hovered, setHovered] = React.useState<{ r: number; c: number } | null>(null);

  // Grid geometry
  const gridX = 90;
  const gridY = 110;
  const cell = 46;
  const gap = 2;

  // Compute coverage stats
  let mapPackCount = 0;
  let page1Count = 0;
  let gapCount = 0;
  COVERAGE.forEach((row) =>
    row.forEach((r) => {
      const b = bucket(r);
      if (b === "mappack") mapPackCount++;
      else if (b === "page1") page1Count++;
      else gapCount++;
    })
  );
  const total = mapPackCount + page1Count + gapCount;
  const mapPackPct = Math.round((mapPackCount / total) * 100);
  const page1Pct = Math.round((page1Count / total) * 100);
  const gapPct = Math.round((gapCount / total) * 100);

  return (
    <div className={`relative w-full max-w-[460px] mx-auto ${className}`}>
      <svg
        viewBox="0 0 460 460"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        aria-labelledby="location-coverage-heatmap-title"
        role="img"
      >
        <title id="location-coverage-heatmap-title">
          Map Pack coverage heatmap — location × intent rank grid
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
          MAP PACK COVERAGE — Q1
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
          36 CELLS
        </text>

        {/* Legend */}
        <g>
          <rect x="32" y="64" width="10" height="10" fill="#FFD031" />
          <text
            x="46"
            y="73"
            fontFamily="var(--font-mono), ui-monospace, monospace"
            fontSize="7"
            fill="#0A102F"
            fillOpacity="0.6"
            letterSpacing="1.0"
          >
            MAP PACK (1–3)
          </text>
          <rect
            x="138"
            y="64"
            width="10"
            height="10"
            fill="#FFF1B8"
            stroke="#0A102F"
            strokeOpacity="0.3"
            strokeWidth="0.75"
          />
          <text
            x="152"
            y="73"
            fontFamily="var(--font-mono), ui-monospace, monospace"
            fontSize="7"
            fill="#0A102F"
            fillOpacity="0.6"
            letterSpacing="1.0"
          >
            PAGE 1 (4–10)
          </text>
          <rect x="234" y="64" width="10" height="10" fill="#F0F0EC" />
          <text
            x="248"
            y="73"
            fontFamily="var(--font-mono), ui-monospace, monospace"
            fontSize="7"
            fill="#0A102F"
            fillOpacity="0.6"
            letterSpacing="1.0"
          >
            GAP (11+)
          </text>
        </g>

        {/* Column headers (locations) */}
        {LOCATIONS.map((loc, c) => (
          <text
            key={loc}
            x={gridX + c * (cell + gap) + cell / 2}
            y={gridY - 6}
            fontFamily="var(--font-mono), ui-monospace, monospace"
            fontSize="8"
            fontWeight="500"
            fill="#0A102F"
            fillOpacity="0.55"
            letterSpacing="1.2"
            textAnchor="middle"
          >
            {loc}
          </text>
        ))}

        {/* Row headers (intents) */}
        {INTENTS.map((intent, r) => (
          <text
            key={intent}
            x={gridX - 10}
            y={gridY + r * (cell + gap) + cell / 2 + 3}
            fontFamily="var(--font-mono), ui-monospace, monospace"
            fontSize="8"
            fontWeight="500"
            fill="#0A102F"
            fillOpacity="0.55"
            letterSpacing="1.2"
            textAnchor="end"
          >
            {intent}
          </text>
        ))}

        {/* Top-left corner labels */}
        <text
          x="32"
          y={gridY - 6}
          fontFamily="var(--font-mono), ui-monospace, monospace"
          fontSize="8"
          fill="#0A102F"
          fillOpacity="0.4"
          letterSpacing="1.2"
        >
          INTENT ↓
        </text>
        <text
          x={gridX + 6 * (cell + gap) + 8}
          y={gridY - 6}
          fontFamily="var(--font-mono), ui-monospace, monospace"
          fontSize="8"
          fill="#0A102F"
          fillOpacity="0.4"
          letterSpacing="1.2"
        >
          LOCATION →
        </text>

        {/* Grid cells */}
        {COVERAGE.map((row, r) =>
          row.map((rank, c) => {
            const x = gridX + c * (cell + gap);
            const y = gridY + r * (cell + gap);
            const isHovered = hovered?.r === r && hovered?.c === c;
            const b = bucket(rank);
            const style = cellColor(b);
            const displayRank = rank > 99 ? "—" : rank;
            return (
              <g
                key={`${r}-${c}`}
                onMouseEnter={() => setHovered({ r, c })}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: "pointer" }}
              >
                <rect
                  x={x}
                  y={y}
                  width={cell}
                  height={cell}
                  fill={style.fill}
                  stroke="#0A102F"
                  strokeOpacity={isHovered ? 0.85 : b === "mappack" ? 0.55 : b === "page1" ? 0.25 : 0.15}
                  strokeWidth={isHovered ? 1.75 : b === "mappack" ? 1.25 : 1}
                  style={{ transition: "stroke-width 200ms ease, stroke-opacity 200ms ease" }}
                />

                {/* Map Pack corner accent — small dark square top-left */}
                {b === "mappack" && (
                  <rect
                    x={x}
                    y={y}
                    width="6"
                    height="6"
                    fill="#0A102F"
                  />
                )}

                {/* Rank number */}
                <text
                  x={x + cell / 2}
                  y={y + cell / 2 + 5}
                  fontFamily="var(--font-display), ui-sans-serif, system-ui, sans-serif"
                  fontSize={b === "mappack" ? 20 : b === "page1" ? 14 : 12}
                  fontWeight={b === "mappack" ? 700 : 400}
                  fill={style.textColor}
                  fillOpacity={style.textOpacity}
                  textAnchor="middle"
                  letterSpacing="-0.5"
                >
                  {displayRank}
                </text>

                {/* Hover indicator dot in corner */}
                {isHovered && (
                  <circle
                    cx={x + cell - 5}
                    cy={y + cell - 5}
                    r="2"
                    fill="#FFD031"
                    stroke="#0A102F"
                    strokeWidth="0.75"
                  />
                )}
              </g>
            );
          })
        )}

        {/* Scanning sweep line — moves across the grid horizontally */}
        <line
          x1={gridX}
          y1={gridY}
          x2={gridX}
          y2={gridY + 6 * (cell + gap) - gap}
          stroke="#FFD031"
          strokeWidth="2"
          strokeOpacity="0.7"
        >
          <animate
            attributeName="x1"
            values={`${gridX};${gridX + 6 * (cell + gap) - gap};${gridX}`}
            dur="8s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="x2"
            values={`${gridX};${gridX + 6 * (cell + gap) - gap};${gridX}`}
            dur="8s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-opacity"
            values="0;0.7;0.7;0"
            dur="8s"
            repeatCount="indefinite"
          />
        </line>

        {/* Summary stats — bottom row */}
        <g>
          <line
            x1="32"
            y1="396"
            x2="428"
            y2="396"
            stroke="#0A102F"
            strokeOpacity="0.2"
            strokeWidth="1"
          />
          <text
            x="32"
            y="416"
            fontFamily="var(--font-mono), ui-monospace, monospace"
            fontSize="8"
            fontWeight="600"
            fill="#0A102F"
            fillOpacity="0.85"
            letterSpacing="1.5"
          >
            {mapPackPct}%
          </text>
          <text
            x="32"
            y="426"
            fontFamily="var(--font-mono), ui-monospace, monospace"
            fontSize="7"
            fill="#0A102F"
            fillOpacity="0.5"
            letterSpacing="1.0"
          >
            MAP PACK
          </text>

          <text
            x="170"
            y="416"
            fontFamily="var(--font-mono), ui-monospace, monospace"
            fontSize="8"
            fontWeight="600"
            fill="#0A102F"
            fillOpacity="0.85"
            letterSpacing="1.5"
            textAnchor="middle"
          >
            {page1Pct}%
          </text>
          <text
            x="170"
            y="426"
            fontFamily="var(--font-mono), ui-monospace, monospace"
            fontSize="7"
            fill="#0A102F"
            fillOpacity="0.5"
            letterSpacing="1.0"
            textAnchor="middle"
          >
            PAGE 1
          </text>

          <text
            x="320"
            y="416"
            fontFamily="var(--font-mono), ui-monospace, monospace"
            fontSize="8"
            fontWeight="600"
            fill="#0A102F"
            fillOpacity="0.85"
            letterSpacing="1.5"
            textAnchor="middle"
          >
            {gapPct}%
          </text>
          <text
            x="320"
            y="426"
            fontFamily="var(--font-mono), ui-monospace, monospace"
            fontSize="7"
            fill="#0A102F"
            fillOpacity="0.5"
            letterSpacing="1.0"
            textAnchor="middle"
          >
            GAP TO CLOSE
          </text>

          <text
            x="428"
            y="416"
            fontFamily="var(--font-mono), ui-monospace, monospace"
            fontSize="9"
            fontWeight="500"
            fill="#0A102F"
            fillOpacity="0.5"
            letterSpacing="1.8"
            textAnchor="end"
          >
            ZEPPSTR · LOCAL
          </text>
        </g>
      </svg>

      <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
        {hovered
          ? `Hover · ${LOCATIONS[hovered.c]} × ${INTENTS[hovered.r]} · rank ${COVERAGE[hovered.r][hovered.c]}`
          : "Hover any cell"}
      </p>
    </div>
  );
}
