"use client";

import * as React from "react";

/**
 * InterfaceBlueprint — hero graphic for Experience Design.
 *
 * Stylized "blueprint" of a UI surface: a simplified product screen rendered
 * as wireframe shapes, with annotated callouts pointing into the screen at
 * the four design system layers (Type · Color · Space · Component).
 *
 * Drafting aesthetic — corner ticks, dimension marks, mono labels — that
 * reinforces the page POV (design is engineering, not decoration).
 *
 * Tokens only. Same visual language as the other hero graphics.
 */

type Callout = {
  label: string;
  note: string;
  /** anchor inside the wireframe screen */
  ax: number;
  ay: number;
  /** annotation card position */
  cx: number;
  cy: number;
};

const CALLOUTS: Callout[] = [
  { label: "TYPE", note: "4-tier system", ax: 165, ay: 145, cx: 360, cy: 130 },
  { label: "COLOR", note: "Semantic, not decorative", ax: 230, ay: 190, cx: 360, cy: 200 },
  { label: "SPACE", note: "8px grid · 12-col", ax: 80, ay: 250, cx: 360, cy: 270 },
  { label: "COMPONENT", note: "24 primitives", ax: 230, ay: 305, cx: 360, cy: 340 },
];

export function InterfaceBlueprint({ className = "" }: { className?: string }) {
  const [hovered, setHovered] = React.useState<number | null>(null);

  // Screen frame geometry — left ~60% of the canvas
  const screenX = 50;
  const screenY = 80;
  const screenW = 250;
  const screenH = 290;

  return (
    <div className={`relative w-full max-w-[460px] mx-auto ${className}`}>
      <svg
        viewBox="0 0 460 460"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        aria-labelledby="interface-blueprint-title"
        role="img"
      >
        <title id="interface-blueprint-title">
          Interface blueprint — design system layers behind one screen
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
          INTERFACE BLUEPRINT — REV.04
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
          1 SCREEN · 4 LAYERS
        </text>

        {/* Dimension marks along the top of the screen */}
        <g stroke="#0A102F" strokeOpacity="0.3" strokeWidth="0.75">
          <line x1={screenX} y1={screenY - 10} x2={screenX} y2={screenY - 4} />
          <line
            x1={screenX + screenW}
            y1={screenY - 10}
            x2={screenX + screenW}
            y2={screenY - 4}
          />
          <line
            x1={screenX}
            y1={screenY - 7}
            x2={screenX + screenW}
            y2={screenY - 7}
          />
        </g>
        <text
          x={screenX + screenW / 2}
          y={screenY - 12}
          fontFamily="var(--font-mono), ui-monospace, monospace"
          fontSize="7"
          fill="#0A102F"
          fillOpacity="0.4"
          letterSpacing="1.0"
          textAnchor="middle"
        >
          12 COL · 8PX
        </text>

        {/* Screen frame — white card with thin border */}
        <rect
          x={screenX}
          y={screenY}
          width={screenW}
          height={screenH}
          fill="#FFFFFF"
          stroke="#0A102F"
          strokeOpacity="0.7"
          strokeWidth="1.25"
        />

        {/* Header bar */}
        <g>
          <line
            x1={screenX}
            y1={screenY + 28}
            x2={screenX + screenW}
            y2={screenY + 28}
            stroke="#0A102F"
            strokeOpacity="0.3"
            strokeWidth="1"
          />
          <rect
            x={screenX + 12}
            y={screenY + 10}
            width={32}
            height={8}
            fill="#0A102F"
            fillOpacity="0.85"
          />
          {/* nav placeholders */}
          {[0, 1, 2, 3].map((i) => (
            <rect
              key={i}
              x={screenX + screenW - 14 - (i + 1) * 22 + 4}
              y={screenY + 12}
              width={14}
              height={4}
              fill="#0A102F"
              fillOpacity="0.3"
            />
          ))}
        </g>

        {/* Hero block */}
        <g>
          {/* Type — large headline placeholder */}
          <rect
            x={screenX + 16}
            y={screenY + 50}
            width={screenW - 100}
            height={14}
            fill="#0A102F"
            fillOpacity="0.85"
          />
          <rect
            x={screenX + 16}
            y={screenY + 70}
            width={screenW - 130}
            height={10}
            fill="#0A102F"
            fillOpacity="0.55"
          />
          {/* Sub text */}
          <rect
            x={screenX + 16}
            y={screenY + 92}
            width={screenW - 60}
            height={4}
            fill="#0A102F"
            fillOpacity="0.25"
          />
          <rect
            x={screenX + 16}
            y={screenY + 100}
            width={screenW - 80}
            height={4}
            fill="#0A102F"
            fillOpacity="0.25"
          />
          {/* Yellow button */}
          <rect
            x={screenX + 16}
            y={screenY + 116}
            width={68}
            height={20}
            fill="#FFD031"
          />
          <rect
            x={screenX + 28}
            y={screenY + 124}
            width={32}
            height={4}
            fill="#0A102F"
            fillOpacity="0.9"
          />
        </g>

        {/* Content grid — 3 cards */}
        <g>
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect
                x={screenX + 16 + i * 76}
                y={screenY + 162}
                width={64}
                height={72}
                fill="#F8F8F6"
                stroke="#0A102F"
                strokeOpacity="0.2"
                strokeWidth="1"
              />
              {/* card top accent */}
              <line
                x1={screenX + 16 + i * 76}
                y1={screenY + 162}
                x2={screenX + 16 + i * 76 + 64}
                y2={screenY + 162}
                stroke="#FFD031"
                strokeWidth="2"
              />
              {/* card content lines */}
              <rect
                x={screenX + 22 + i * 76}
                y={screenY + 175}
                width={46}
                height={6}
                fill="#0A102F"
                fillOpacity="0.7"
              />
              <rect
                x={screenX + 22 + i * 76}
                y={screenY + 187}
                width={34}
                height={3}
                fill="#0A102F"
                fillOpacity="0.4"
              />
              <rect
                x={screenX + 22 + i * 76}
                y={screenY + 195}
                width={42}
                height={3}
                fill="#0A102F"
                fillOpacity="0.4"
              />
              <rect
                x={screenX + 22 + i * 76}
                y={screenY + 203}
                width={38}
                height={3}
                fill="#0A102F"
                fillOpacity="0.4"
              />
              {/* card bottom indicator */}
              <rect
                x={screenX + 22 + i * 76}
                y={screenY + 224}
                width={14}
                height={3}
                fill="#0A102F"
                fillOpacity="0.6"
              />
            </g>
          ))}
        </g>

        {/* Footer bar */}
        <g>
          <line
            x1={screenX}
            y1={screenY + screenH - 28}
            x2={screenX + screenW}
            y2={screenY + screenH - 28}
            stroke="#0A102F"
            strokeOpacity="0.3"
            strokeWidth="1"
          />
          <rect
            x={screenX + 16}
            y={screenY + screenH - 18}
            width={30}
            height={4}
            fill="#0A102F"
            fillOpacity="0.5"
          />
          <rect
            x={screenX + 52}
            y={screenY + screenH - 18}
            width={30}
            height={4}
            fill="#0A102F"
            fillOpacity="0.3"
          />
          <rect
            x={screenX + 88}
            y={screenY + screenH - 18}
            width={30}
            height={4}
            fill="#0A102F"
            fillOpacity="0.3"
          />
        </g>

        {/* Annotation callouts */}
        {CALLOUTS.map((c, i) => {
          const isHovered = hovered === i;
          return (
            <g
              key={c.label}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: "pointer" }}
            >
              {/* Anchor dot inside the screen */}
              <circle
                cx={c.ax}
                cy={c.ay}
                r="3"
                fill="#FFD031"
                stroke="#0A102F"
                strokeWidth="1"
              />
              <circle
                cx={c.ax}
                cy={c.ay}
                r="6"
                fill="none"
                stroke="#FFD031"
                strokeOpacity="0.5"
              >
                <animate
                  attributeName="r"
                  values="6;10;6"
                  dur={`${2 + i * 0.4}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="stroke-opacity"
                  values="0.5;0;0.5"
                  dur={`${2 + i * 0.4}s`}
                  repeatCount="indefinite"
                />
              </circle>

              {/* Leader line from anchor to callout card */}
              <line
                x1={c.ax}
                y1={c.ay}
                x2={c.cx}
                y2={c.cy}
                stroke={isHovered ? "#FFD031" : "#0A102F"}
                strokeOpacity={isHovered ? 1 : 0.3}
                strokeWidth={isHovered ? 1.5 : 1}
                strokeDasharray="2 3"
                style={{ transition: "stroke 200ms ease" }}
              />

              {/* Callout card */}
              <rect
                x={c.cx - 6}
                y={c.cy - 14}
                width={86}
                height={28}
                fill={isHovered ? "#FFD031" : "#F8F8F6"}
                stroke="#0A102F"
                strokeOpacity="0.5"
                strokeWidth="1"
                style={{ transition: "fill 240ms ease" }}
              />
              <text
                x={c.cx}
                y={c.cy - 2}
                fontFamily="var(--font-mono), ui-monospace, monospace"
                fontSize="8"
                fontWeight="600"
                fill="#0A102F"
                letterSpacing="1.5"
              >
                {c.label}
              </text>
              <text
                x={c.cx}
                y={c.cy + 9}
                fontFamily="var(--font-mono), ui-monospace, monospace"
                fontSize="7"
                fill="#0A102F"
                fillOpacity="0.65"
                letterSpacing="0.8"
              >
                {c.note.toUpperCase()}
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
          SYSTEM &gt; SCREEN
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
          ZEPPSTR · DESIGN
        </text>
      </svg>

      <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
        Hover {hovered !== null ? `· ${CALLOUTS[hovered].label}` : "any layer"}
      </p>
    </div>
  );
}
