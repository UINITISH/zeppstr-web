"use client";

import * as React from "react";

/**
 * LifecycleCircle — interactive customer-lifecycle diagram with hover popups.
 *
 * Each node, on hover, reveals a small editorial popup card positioned outward
 * from the node (angular smart-placement). The popup contains the stage's
 * number, label, description, and drivers — styled as a hairline messenger box.
 *
 * Layered SVG:
 *   - Outer dashed ring (slow CW rotation)
 *   - Tick marks at 15° intervals
 *   - Middle dotted ring (CCW)
 *   - Inner solid hairline
 *   - Animated dashed flow lines from center to each node
 *   - 5 stage nodes with radiating pulse rings + hover scale
 *   - Center brand mark (static)
 *   - Per-node hover popup cards (opacity-driven)
 */

interface Stage {
  label: string;
  description: string;
  drivers: string;
}

const STAGES: Stage[] = [
  {
    label: "Awareness",
    description:
      "Top-of-funnel demand. Paid, organic, and earned — operated as one signal stream.",
    drivers: "Paid · SEO · Influencer · PR",
  },
  {
    label: "Engagement",
    description:
      "Mid-funnel interest. Content, community, brand depth — first visits become relationships.",
    drivers: "Content · Social · Email capture",
  },
  {
    label: "Conversion",
    description:
      "Decision moment. Site, offers, friction removal — the layer most marketing under-engineers.",
    drivers: "CRO · UX · Offer architecture",
  },
  {
    label: "Retention",
    description:
      "Owned-channel value. Lifecycle email, SMS, post-purchase — where compounding actually happens.",
    drivers: "Email · SMS · Loyalty",
  },
  {
    label: "Advocacy",
    description:
      "Compound trust. Reviews, referrals, UGC — the customer becomes a channel.",
    drivers: "Referral · UGC · Reviews",
  },
];

const VIEW = 520;
const CENTER = VIEW / 2;
const OUTER_R = 210;
const MIDDLE_R = 155;
const INNER_R = 78;
const NODE_R = 22;

function point(angleDeg: number, r: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: CENTER + r * Math.cos(rad),
    y: CENTER - r * Math.sin(rad),
  };
}

export function LifecycleCircle({ className = "" }: { className?: string }) {
  const [hovered, setHovered] = React.useState<number | null>(null);

  const stagePoints = STAGES.map((_, i) => {
    const angle = 90 - i * 72;
    return { angle, pos: point(angle, OUTER_R) };
  });

  const ticks = Array.from({ length: 24 }).map((_, i) => {
    const angle = i * 15;
    const inner = point(angle, OUTER_R + 4);
    const isMajor = i % 6 === 0;
    const outer = point(angle, OUTER_R + (isMajor ? 14 : 8));
    return { inner, outer, isMajor };
  });

  return (
    <div
      className={`relative w-full max-w-[520px] mx-auto aspect-square ${className}`}
      style={{ overflow: "visible" }}
    >
      <svg
        viewBox={`0 0 ${VIEW} ${VIEW}`}
        className="w-full h-full overflow-visible"
        role="img"
        aria-label="Customer lifecycle diagram — five connected stages"
      >
        {/* Halo */}
        <defs>
          <radialGradient id="lifecycle-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFD031" stopOpacity="0.06" />
            <stop offset="60%" stopColor="#FFD031" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx={CENTER} cy={CENTER} r={OUTER_R + 8} fill="url(#lifecycle-halo)" />

        {/* Tick marks */}
        <g className="text-ink-headline">
          {ticks.map((t, i) => (
            <line
              key={`tick-${i}`}
              x1={t.inner.x}
              y1={t.inner.y}
              x2={t.outer.x}
              y2={t.outer.y}
              stroke="currentColor"
              strokeWidth="0.75"
              strokeOpacity={t.isMajor ? 0.5 : 0.2}
            />
          ))}
        </g>

        {/* Outer dashed ring — CW rotation */}
        <g
          style={{
            transformOrigin: `${CENTER}px ${CENTER}px`,
            animation: "lifecycle-spin-cw 90s linear infinite",
          }}
        >
          <circle
            cx={CENTER}
            cy={CENTER}
            r={OUTER_R}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeOpacity="0.3"
            strokeDasharray="2 6"
            className="text-ink-headline"
          />
        </g>

        {/* Middle dotted ring — CCW */}
        <g
          style={{
            transformOrigin: `${CENTER}px ${CENTER}px`,
            animation: "lifecycle-spin-ccw 60s linear infinite",
          }}
        >
          <circle
            cx={CENTER}
            cy={CENTER}
            r={MIDDLE_R}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.75"
            strokeOpacity="0.18"
            strokeDasharray="1 8"
            className="text-ink-headline"
          />
        </g>

        {/* Inner solid hairline */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r={INNER_R}
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeOpacity="0.35"
          className="text-ink-headline"
        />

        {/* Dashed animated flow lines — marching from center outward */}
        {stagePoints.map((s, i) => {
          const inStart = point(s.angle, INNER_R + 2);
          const inEnd = point(s.angle, OUTER_R - NODE_R - 4);
          const isActive = hovered === i;
          return (
            <line
              key={`flow-line-${i}`}
              x1={inStart.x}
              y1={inStart.y}
              x2={inEnd.x}
              y2={inEnd.y}
              stroke={isActive ? "#FFD031" : "currentColor"}
              strokeWidth={isActive ? "1.5" : "1"}
              strokeOpacity={isActive ? "1" : "0.35"}
              strokeDasharray="3 4"
              className={`text-ink-headline ${
                isActive ? "lifecycle-flow-line-active" : "lifecycle-flow-line"
              }`}
              style={{ animationDelay: `${i * 0.3}s` }}
            />
          );
        })}

        {/* Stage nodes */}
        {stagePoints.map((s, i) => {
          const isActive = hovered === i;
          return (
            <g
              key={`node-${i}`}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(i)}
              onBlur={() => setHovered(null)}
              tabIndex={0}
              role="button"
              aria-label={`${STAGES[i].label} stage`}
              style={{ cursor: "pointer", outline: "none" }}
            >
              {/* Pulse ring */}
              <circle
                cx={s.pos.x}
                cy={s.pos.y}
                r={NODE_R}
                fill="none"
                stroke="#FFD031"
                strokeWidth="1.5"
                opacity="0.6"
              >
                <animate
                  attributeName="r"
                  values={`${NODE_R};${NODE_R + 18}`}
                  dur="3s"
                  repeatCount="indefinite"
                  begin={`${i * 0.6}s`}
                />
                <animate
                  attributeName="opacity"
                  values="0.6;0"
                  dur="3s"
                  repeatCount="indefinite"
                  begin={`${i * 0.6}s`}
                />
              </circle>

              {/* Outer hairline */}
              <circle
                cx={s.pos.x}
                cy={s.pos.y}
                r={NODE_R + 8}
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeOpacity={isActive ? "0.5" : "0.18"}
                className="text-ink-headline"
                style={{ transition: "stroke-opacity 200ms" }}
              />

              {/* Yellow filled node */}
              <circle
                cx={s.pos.x}
                cy={s.pos.y}
                r={isActive ? NODE_R + 3 : NODE_R}
                className="fill-brand-yellow"
                style={{ transition: "r 200ms" }}
              />

              {/* Numeral */}
              <text
                x={s.pos.x}
                y={s.pos.y + 1}
                textAnchor="middle"
                dominantBaseline="central"
                className="fill-ink-headline pointer-events-none"
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  letterSpacing: "0.02em",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </text>

              {/* Larger invisible hit target */}
              <circle
                cx={s.pos.x}
                cy={s.pos.y}
                r={NODE_R + 14}
                fill="transparent"
              />
            </g>
          );
        })}
      </svg>

      {/* Static center brand mark */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none text-center"
        style={{ width: `${INNER_R * 2 - 12}px` }}
      >
        <span aria-hidden="true" className="block w-3 h-3 bg-brand-yellow mx-auto mb-2" />
        <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-ink-muted mb-1">
          The Practice
        </p>
        <p className="font-display font-bold text-[18px] tracking-[-0.025em] text-ink-headline leading-tight">
          Lifecycle
        </p>
        <p className="font-mono text-[8.5px] uppercase tracking-[0.18em] text-ink-muted mt-1">
          As one system
        </p>
      </div>

      {/* Stage labels — visible by default, hidden when their popup is shown */}
      {stagePoints.map((s, i) => {
        const isActive = hovered === i;
        const labelOutwardR = OUTER_R + 56;
        const labelPos = point(s.angle, labelOutwardR);
        const xPct = (labelPos.x / VIEW) * 100;
        const yPct = (labelPos.y / VIEW) * 100;
        return (
          <span
            key={`label-${i}`}
            className={`absolute font-mono text-[10px] uppercase tracking-[0.22em] whitespace-nowrap select-none transition-opacity duration-200 ${
              isActive ? "opacity-0 pointer-events-none" : "text-ink-muted"
            }`}
            style={{
              left: `${xPct}%`,
              top: `${yPct}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <span className="inline-block w-1 h-1 mr-2 align-middle bg-ink-headline/40" />
            {STAGES[i].label}
          </span>
        );
      })}

      {/* Per-stage hover popup cards — placement clamped INSIDE diagram bounds */}
      {stagePoints.map((s, i) => {
        const isActive = hovered === i;

        // Anchor at the node position (not the label, so popup hugs the node)
        const anchorXPct = (s.pos.x / VIEW) * 100;
        const anchorYPct = (s.pos.y / VIEW) * 100;

        // Quadrant detection — keep popup INSIDE the diagram instead of pushing outward
        const isUpper = s.pos.y < CENTER;        // upper half → popup goes BELOW the node
        const isLeft = s.pos.x < CENTER - 30;    // left side → popup extends RIGHT of node
        const isRight = s.pos.x > CENTER + 30;   // right side → popup extends LEFT of node

        const popupGap = NODE_R + 18; // gap between node and popup edge

        // Vertical translate
        const ty = isUpper
          ? `${popupGap}px`              // top edge of popup at (node + gap)
          : `calc(-100% - ${popupGap}px)`; // bottom edge of popup at (node - gap)

        // Horizontal translate
        const tx = isLeft
          ? `${-NODE_R - 4}px`              // popup extends to the right
          : isRight
          ? `calc(-100% + ${NODE_R + 4}px)` // popup extends to the left
          : `-50%`;                          // centered

        return (
          <div
            key={`popup-${i}`}
            className={`absolute z-30 pointer-events-none transition-opacity duration-200 ease-out ${
              isActive ? "opacity-100" : "opacity-0"
            }`}
            style={{
              left: `${anchorXPct}%`,
              top: `${anchorYPct}%`,
              transform: `translate(${tx}, ${ty})`,
              width: "240px",
            }}
          >
            {/* Card */}
            <div
              className={`bg-bg-primary border border-ink-headline/20 shadow-[0_18px_48px_-12px_rgba(10,16,47,0.22)] p-5 transition-transform duration-200 ease-out ${
                isActive ? "translate-y-0" : isUpper ? "-translate-y-1" : "translate-y-1"
              }`}
            >
              {/* Top row — number + small label tag */}
              <div className="flex items-baseline justify-between mb-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-headline">
                  Stage {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink-muted">
                  Lifecycle
                </span>
              </div>

              {/* Yellow accent rule */}
              <span aria-hidden="true" className="block w-8 h-[3px] bg-brand-yellow mb-4" />

              {/* Stage label */}
              <h4 className="font-display font-bold text-[20px] tracking-[-0.02em] text-ink-headline leading-[1.15] mb-3">
                {STAGES[i].label}
              </h4>

              {/* Description */}
              <p className="font-body text-[13px] text-ink-body leading-[1.5] mb-4">
                {STAGES[i].description}
              </p>

              {/* Drivers */}
              <div className="pt-3 border-t border-ink-headline/10">
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink-muted mb-1">
                  Drivers
                </p>
                <p className="font-body text-[12px] text-ink-headline leading-snug">
                  {STAGES[i].drivers}
                </p>
              </div>
            </div>
          </div>
        );
      })}

      <style>{`
        @keyframes lifecycle-spin-cw {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes lifecycle-spin-ccw {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        @keyframes lifecycle-flow-march {
          to { stroke-dashoffset: -14; }
        }
        @keyframes lifecycle-flow-march-fast {
          to { stroke-dashoffset: -28; }
        }
        .lifecycle-flow-line {
          animation: lifecycle-flow-march 1.5s linear infinite;
        }
        .lifecycle-flow-line-active {
          animation: lifecycle-flow-march-fast 0.8s linear infinite;
        }
      `}</style>
    </div>
  );
}
