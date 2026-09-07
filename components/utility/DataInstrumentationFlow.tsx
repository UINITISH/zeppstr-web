"use client";

import * as React from "react";

/**
 * DataInstrumentationFlow — hero graphic for Analytics & Instrumentation.
 *
 * Converging-diverging flow diagram showing the source-of-truth pattern:
 *   4 source nodes (Web · App · CRM · Ads) → 1 central WAREHOUSE → 4 output
 *   nodes (Dashboards · Attribution · Experiments · Segments).
 *
 * Animated marching dashes flow left-to-right on every connection.
 * Hover any node to highlight it. Same drafting aesthetic — corner ticks,
 * mono labels, hairline rules. Tokens only.
 */

const SOURCES = [
  { label: "Web", spec: "JS SDK · GTM" },
  { label: "App", spec: "Native SDK" },
  { label: "CRM", spec: "HubSpot · Salesforce" },
  { label: "Ads", spec: "Google · Meta · LinkedIn" },
];

const OUTPUTS = [
  { label: "Dashboards", spec: "Looker · Metabase" },
  { label: "Attribution", spec: "Modeled · Multi-touch" },
  { label: "Experiments", spec: "A/B · Holdout" },
  { label: "Segments", spec: "Audiences · Activation" },
];

export function DataInstrumentationFlow({ className = "" }: { className?: string }) {
  const [hovered, setHovered] = React.useState<string | null>(null);

  // Layout
  const sourceX = 70;
  const warehouseX = 230;
  const outputX = 390;

  // Vertically distribute sources & outputs
  const sourceYs = SOURCES.map((_, i) => 110 + i * 70);
  const outputYs = OUTPUTS.map((_, i) => 110 + i * 70);

  const warehouseY = 230;

  return (
    <div className={`relative w-full max-w-[460px] mx-auto ${className}`}>
      <svg
        viewBox="0 0 460 460"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        aria-labelledby="data-instrumentation-flow-title"
        role="img"
      >
        <title id="data-instrumentation-flow-title">
          Data instrumentation flow — one warehouse, one source of truth
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
          DATA FLOW — SINGLE SOURCE OF TRUTH
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
          v1.0
        </text>

        {/* Column labels */}
        <text
          x={sourceX}
          y={76}
          fontFamily="var(--font-mono), ui-monospace, monospace"
          fontSize="8"
          fill="#0A102F"
          fillOpacity="0.4"
          letterSpacing="1.2"
          textAnchor="middle"
        >
          SOURCES
        </text>
        <text
          x={warehouseX}
          y={76}
          fontFamily="var(--font-mono), ui-monospace, monospace"
          fontSize="8"
          fill="#0A102F"
          fillOpacity="0.4"
          letterSpacing="1.2"
          textAnchor="middle"
        >
          WAREHOUSE
        </text>
        <text
          x={outputX}
          y={76}
          fontFamily="var(--font-mono), ui-monospace, monospace"
          fontSize="8"
          fill="#0A102F"
          fillOpacity="0.4"
          letterSpacing="1.2"
          textAnchor="middle"
        >
          ACTIVATION
        </text>

        {/* Source → Warehouse connections */}
        {SOURCES.map((src, i) => {
          const sy = sourceYs[i];
          const startX = sourceX + 30;
          const endX = warehouseX - 36;
          const midX = (startX + endX) / 2;
          const path = `M ${startX} ${sy} C ${midX} ${sy}, ${midX} ${warehouseY}, ${endX} ${warehouseY}`;
          const isLit = hovered === `s-${i}` || hovered === "warehouse";
          return (
            <path
              key={`sline-${i}`}
              d={path}
              fill="none"
              stroke={isLit ? "#FFD031" : "#0A102F"}
              strokeOpacity={isLit ? 1 : 0.3}
              strokeWidth={isLit ? 2 : 1}
              strokeDasharray="3 3"
              style={{ transition: "stroke 240ms ease, stroke-opacity 240ms ease" }}
            >
              <animate
                attributeName="stroke-dashoffset"
                from="0"
                to="-6"
                dur={`${2 + i * 0.3}s`}
                repeatCount="indefinite"
              />
            </path>
          );
        })}

        {/* Warehouse → Output connections */}
        {OUTPUTS.map((out, i) => {
          const oy = outputYs[i];
          const startX = warehouseX + 36;
          const endX = outputX - 30;
          const midX = (startX + endX) / 2;
          const path = `M ${startX} ${warehouseY} C ${midX} ${warehouseY}, ${midX} ${oy}, ${endX} ${oy}`;
          const isLit = hovered === `o-${i}` || hovered === "warehouse";
          return (
            <path
              key={`oline-${i}`}
              d={path}
              fill="none"
              stroke={isLit ? "#FFD031" : "#0A102F"}
              strokeOpacity={isLit ? 1 : 0.3}
              strokeWidth={isLit ? 2 : 1}
              strokeDasharray="3 3"
              style={{ transition: "stroke 240ms ease, stroke-opacity 240ms ease" }}
            >
              <animate
                attributeName="stroke-dashoffset"
                from="0"
                to="-6"
                dur={`${2.2 + i * 0.3}s`}
                repeatCount="indefinite"
              />
            </path>
          );
        })}

        {/* Source nodes */}
        {SOURCES.map((src, i) => {
          const sy = sourceYs[i];
          const isHovered = hovered === `s-${i}`;
          return (
            <g
              key={`src-${i}`}
              onMouseEnter={() => setHovered(`s-${i}`)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: "pointer" }}
            >
              <rect
                x={sourceX - 30}
                y={sy - 14}
                width="60"
                height="28"
                fill={isHovered ? "#FFD031" : "#F8F8F6"}
                stroke="#0A102F"
                strokeOpacity="0.5"
                strokeWidth="1"
                style={{ transition: "fill 240ms ease" }}
              />
              <text
                x={sourceX}
                y={sy + 4}
                fontFamily="var(--font-display), ui-sans-serif, system-ui, sans-serif"
                fontSize="12"
                fontWeight="500"
                fill="#0A102F"
                textAnchor="middle"
              >
                {src.label}
              </text>
            </g>
          );
        })}

        {/* Warehouse central node — big and dark */}
        <g
          onMouseEnter={() => setHovered("warehouse")}
          onMouseLeave={() => setHovered(null)}
          style={{ cursor: "pointer" }}
        >
          <rect
            x={warehouseX - 36}
            y={warehouseY - 36}
            width="72"
            height="72"
            fill={hovered === "warehouse" ? "#FFD031" : "#0A102F"}
            style={{ transition: "fill 240ms ease" }}
          />
          <text
            x={warehouseX}
            y={warehouseY - 12}
            fontFamily="var(--font-mono), ui-monospace, monospace"
            fontSize="8"
            fill={hovered === "warehouse" ? "#0A102F" : "#FFD031"}
            letterSpacing="1.5"
            textAnchor="middle"
            style={{ transition: "fill 240ms ease" }}
          >
            00
          </text>
          <text
            x={warehouseX}
            y={warehouseY + 4}
            fontFamily="var(--font-display), ui-sans-serif, system-ui, sans-serif"
            fontSize="13"
            fontWeight="400"
            fill={hovered === "warehouse" ? "#0A102F" : "#FFFFFF"}
            textAnchor="middle"
            style={{ transition: "fill 240ms ease" }}
          >
            WAREHOUSE
          </text>
          <text
            x={warehouseX}
            y={warehouseY + 20}
            fontFamily="var(--font-mono), ui-monospace, monospace"
            fontSize="7"
            fill={hovered === "warehouse" ? "#0A102F" : "#FFFFFF"}
            fillOpacity="0.7"
            letterSpacing="1.2"
            textAnchor="middle"
            style={{ transition: "fill 240ms ease" }}
          >
            BQ · SNOWFLAKE
          </text>
          {/* Pulse halo */}
          <rect
            x={warehouseX - 42}
            y={warehouseY - 42}
            width="84"
            height="84"
            fill="none"
            stroke="#FFD031"
            strokeOpacity="0.6"
            strokeWidth="1"
          >
            <animate
              attributeName="stroke-opacity"
              values="0.6;0;0.6"
              dur="2.4s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="width"
              values="84;100;84"
              dur="2.4s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="height"
              values="84;100;84"
              dur="2.4s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="x"
              values={`${warehouseX - 42};${warehouseX - 50};${warehouseX - 42}`}
              dur="2.4s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="y"
              values={`${warehouseY - 42};${warehouseY - 50};${warehouseY - 42}`}
              dur="2.4s"
              repeatCount="indefinite"
            />
          </rect>
        </g>

        {/* Output nodes */}
        {OUTPUTS.map((out, i) => {
          const oy = outputYs[i];
          const isHovered = hovered === `o-${i}`;
          return (
            <g
              key={`out-${i}`}
              onMouseEnter={() => setHovered(`o-${i}`)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: "pointer" }}
            >
              <rect
                x={outputX - 30}
                y={oy - 14}
                width="60"
                height="28"
                fill={isHovered ? "#FFD031" : "#F8F8F6"}
                stroke="#0A102F"
                strokeOpacity="0.5"
                strokeWidth="1"
                style={{ transition: "fill 240ms ease" }}
              />
              <text
                x={outputX}
                y={oy + 4}
                fontFamily="var(--font-display), ui-sans-serif, system-ui, sans-serif"
                fontSize="10"
                fontWeight="500"
                fill="#0A102F"
                textAnchor="middle"
              >
                {out.label}
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
          ONE SCHEMA · ONE TRUTH
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
          ZEPPSTR · ANALYTICS
        </text>
      </svg>

      <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
        Hover {hovered ? `· ${hovered === "warehouse" ? "Warehouse" : hovered.startsWith("s-") ? SOURCES[parseInt(hovered.slice(2))].label : OUTPUTS[parseInt(hovered.slice(2))].label}` : "any node"}
      </p>
    </div>
  );
}
