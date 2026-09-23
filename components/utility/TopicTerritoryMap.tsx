"use client";

import * as React from "react";

/**
 * TopicTerritoryMap — hero graphic for Content Architecture.
 *
 * 2×2 grid of rectangular topic territories. Each territory contains:
 *   - A yellow-corner pillar marker (filled square + label)
 *   - 3 small supporting article markers
 *   - Internal-link dashes connecting articles within the territory
 *
 * Cross-territory internal-link lines show the graph emerging across topics.
 * A fifth "future territory" zone (gray/empty) hints at growth opportunity.
 *
 * Drafting aesthetic — corner ticks, mono labels, hairline rules — and
 * animated marching dashes on the internal-link lines.
 */

type Territory = {
  n: string;
  name: string;
  shortName: string;
};

const TERRITORIES: Territory[] = [
  { n: "01", name: "Customer Retention", shortName: "RETENTION" },
  { n: "02", name: "Onboarding Design", shortName: "ONBOARDING" },
  { n: "03", name: "Pricing Strategy", shortName: "PRICING" },
  { n: "04", name: "Lifecycle Marketing", shortName: "LIFECYCLE" },
];

export function TopicTerritoryMap({ className = "" }: { className?: string }) {
  const [hovered, setHovered] = React.useState<number | null>(null);

  // 2x2 grid of territories
  const startX = 50;
  const startY = 86;
  const cellW = 175;
  const cellH = 145;
  const gap = 12;

  function territoryRect(i: number) {
    const col = i % 2;
    const row = Math.floor(i / 2);
    return {
      x: startX + col * (cellW + gap),
      y: startY + row * (cellH + gap),
      w: cellW,
      h: cellH,
    };
  }

  return (
    <div className={`relative w-full max-w-[460px] mx-auto ${className}`}>
      <svg
        viewBox="0 0 460 460"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        aria-labelledby="topic-territory-map-title"
        role="img"
      >
        <title id="topic-territory-map-title">
          Topic territory map — pillars, supporting articles, internal links
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
          TOPIC TERRITORY MAP — Q1
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
          04 OWNED · 01 PLANNED
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
          ◼ PILLAR · ▪ SUPPORTING · — INTERNAL LINK
        </text>

        {/* Cross-territory internal-link lines (drawn first as background) */}
        {(() => {
          // Diagonal cross-links between territories
          const links = [
            { from: 0, to: 1 }, // TL → TR
            { from: 0, to: 2 }, // TL → BL
            { from: 1, to: 3 }, // TR → BR
            { from: 2, to: 3 }, // BL → BR
            { from: 0, to: 3 }, // TL → BR (diagonal)
          ];
          return links.map(({ from, to }, i) => {
            const f = territoryRect(from);
            const t = territoryRect(to);
            // Connect from territory center to territory center
            return (
              <line
                key={`xlink-${i}`}
                x1={f.x + f.w / 2}
                y1={f.y + f.h / 2}
                x2={t.x + t.w / 2}
                y2={t.y + t.h / 2}
                stroke="#FFD031"
                strokeOpacity="0.4"
                strokeWidth="1"
                strokeDasharray="3 4"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="0"
                  to="-7"
                  dur={`${3 + i * 0.4}s`}
                  repeatCount="indefinite"
                />
              </line>
            );
          });
        })()}

        {/* Territories */}
        {TERRITORIES.map((territory, i) => {
          const r = territoryRect(i);
          const isHovered = hovered === i;
          // Pillar position: top-left of territory
          const pillarX = r.x + 18;
          const pillarY = r.y + 38;
          // 3 supporting articles positioned around the pillar
          const supports = [
            { sx: r.x + r.w - 36, sy: r.y + 34 },
            { sx: r.x + r.w - 28, sy: r.y + r.h - 38 },
            { sx: r.x + 32, sy: r.y + r.h - 22 },
          ];

          return (
            <g
              key={territory.n}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: "pointer" }}
            >
              {/* Territory boundary */}
              <rect
                x={r.x}
                y={r.y}
                width={r.w}
                height={r.h}
                fill={isHovered ? "#FFD031" : "#FFFFFF"}
                fillOpacity={isHovered ? 0.35 : 1}
                stroke="#0A102F"
                strokeOpacity="0.6"
                strokeWidth="1.25"
                style={{ transition: "fill 240ms ease, fill-opacity 240ms ease" }}
              />

              {/* Yellow corner tab */}
              <rect
                x={r.x}
                y={r.y}
                width="14"
                height="14"
                fill="#FFD031"
              />

              {/* Territory number */}
              <text
                x={r.x + 24}
                y={r.y + 11}
                fontFamily="var(--font-mono), ui-monospace, monospace"
                fontSize="8"
                fill="#0A102F"
                fillOpacity="0.7"
                letterSpacing="1.5"
              >
                {territory.n}
              </text>

              {/* Territory name top-right */}
              <text
                x={r.x + r.w - 8}
                y={r.y + 11}
                fontFamily="var(--font-mono), ui-monospace, monospace"
                fontSize="7"
                fontWeight="600"
                fill="#0A102F"
                fillOpacity="0.7"
                letterSpacing="1.2"
                textAnchor="end"
              >
                {territory.shortName}
              </text>

              {/* Internal-link lines within territory (pillar to each support) */}
              {supports.map((s, si) => (
                <line
                  key={`il-${i}-${si}`}
                  x1={pillarX + 14}
                  y1={pillarY + 7}
                  x2={s.sx}
                  y2={s.sy}
                  stroke="#0A102F"
                  strokeOpacity="0.45"
                  strokeWidth="1"
                  strokeDasharray="2 2"
                />
              ))}

              {/* Pillar marker */}
              <rect
                x={pillarX}
                y={pillarY}
                width="28"
                height="14"
                fill="#0A102F"
              />
              <text
                x={pillarX + 14}
                y={pillarY + 10}
                fontFamily="var(--font-mono), ui-monospace, monospace"
                fontSize="6"
                fontWeight="500"
                fill="#FFD031"
                letterSpacing="0.6"
                textAnchor="middle"
              >
                PILLAR
              </text>

              {/* Pillar label below */}
              <text
                x={pillarX}
                y={pillarY + 26}
                fontFamily="var(--font-display), ui-sans-serif, system-ui, sans-serif"
                fontSize="9"
                fontWeight="600"
                fill="#0A102F"
                fillOpacity="0.85"
                letterSpacing="-0.1"
              >
                {territory.name}
              </text>

              {/* Supporting article markers */}
              {supports.map((s, si) => (
                <g key={`s-${i}-${si}`}>
                  <rect
                    x={s.sx - 4}
                    y={s.sy - 4}
                    width="8"
                    height="8"
                    fill={isHovered ? "#FFD031" : "#FFFFFF"}
                    stroke="#0A102F"
                    strokeOpacity="0.65"
                    strokeWidth="1"
                  />
                  {/* Pulse */}
                  <circle
                    cx={s.sx}
                    cy={s.sy}
                    r="2"
                    fill="#FFD031"
                    fillOpacity="0.8"
                  >
                    <animate
                      attributeName="opacity"
                      values="1;0.2;1"
                      dur={`${1.8 + si * 0.4}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                </g>
              ))}

              {/* Supporting count label bottom-right */}
              <text
                x={r.x + r.w - 8}
                y={r.y + r.h - 6}
                fontFamily="var(--font-mono), ui-monospace, monospace"
                fontSize="7"
                fill="#0A102F"
                fillOpacity="0.5"
                letterSpacing="1.0"
                textAnchor="end"
              >
                03 SUPPORTING
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
          ARCHITECTED · NOT ASSEMBLED
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
          ZEPPSTR · CONTENT
        </text>
      </svg>

      <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
        Hover {hovered !== null ? `· ${TERRITORIES[hovered].name}` : "any territory"}
      </p>
    </div>
  );
}
