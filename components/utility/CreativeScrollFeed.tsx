"use client";

import * as React from "react";

/**
 * CreativeScrollFeed — hero graphic for Paid Social.
 *
 * Stylized vertical feed of 3 ad cards arranged like a social-platform
 * preview. Each card has a sponsored handle, an abstract creative preview,
 * headline + sub-line, a yellow CTA pill, and a performance status badge
 * (Winner / Testing / Killed) in the top-right.
 *
 * Drafting aesthetic — corner ticks, mono labels, hairline rules. Hover
 * any card to lift it forward visually.
 */

type StatusType = "winner" | "testing" | "killed";

type AdCard = {
  handle: string;
  headline: string;
  subline: string;
  status: StatusType;
  metric: string;
};

const CARDS: AdCard[] = [
  {
    handle: "@brand",
    headline: "Hook that names the pain in five words.",
    subline: "Tap to see how we fixed it.",
    status: "winner",
    metric: "4.8× ROAS",
  },
  {
    handle: "@brand",
    headline: "Variant — sharper hook, same offer.",
    subline: "A/B vs winner. Day 3 of 14.",
    status: "testing",
    metric: "2.1× ROAS",
  },
  {
    handle: "@brand",
    headline: "Polished hero film that looked like an ad.",
    subline: "Scrolled past 94% of the time.",
    status: "killed",
    metric: "0.4× ROAS",
  },
];

function statusStyle(s: StatusType) {
  if (s === "winner")
    return {
      bg: "#FFD031",
      stroke: "#0A102F",
      strokeOpacity: 0.85,
      textColor: "#0A102F",
      label: "WINNER",
    };
  if (s === "testing")
    return {
      bg: "#FFFFFF",
      stroke: "#0A102F",
      strokeOpacity: 0.55,
      textColor: "#0A102F",
      label: "TESTING",
    };
  return {
    bg: "#F0F0EC",
    stroke: "#0A102F",
    strokeOpacity: 0.25,
    textColor: "#0A102F",
    label: "KILLED",
  };
}

export function CreativeScrollFeed({ className = "" }: { className?: string }) {
  const [hovered, setHovered] = React.useState<number | null>(null);

  // Card geometry — fill canvas with 3 stacked cards
  const startX = 50;
  const startY = 92;
  const cardW = 340;
  const cardH = 100;
  const gap = 10;

  return (
    <div className={`relative w-full max-w-[460px] mx-auto ${className}`}>
      <svg
        viewBox="0 0 460 460"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        aria-labelledby="creative-scroll-feed-title"
        role="img"
      >
        <title id="creative-scroll-feed-title">
          Creative feed — winning, testing, and killed ad variants
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
          CREATIVE FEED — WEEK 12
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
          03 OF 30 LIVE
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
          SCROLL ↓
        </text>

        {/* Cards */}
        {CARDS.map((card, i) => {
          const y = startY + i * (cardH + gap);
          const isHovered = hovered === i;
          const status = statusStyle(card.status);
          const cardOpacity = card.status === "killed" ? 0.55 : 1;

          return (
            <g
              key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: "pointer", opacity: cardOpacity }}
            >
              {/* Card background */}
              <rect
                x={startX}
                y={y}
                width={cardW}
                height={cardH}
                fill="#FFFFFF"
                stroke="#0A102F"
                strokeOpacity={isHovered ? 0.85 : 0.4}
                strokeWidth={isHovered ? 1.5 : 1}
                style={{
                  transition: "stroke-width 200ms ease, stroke-opacity 200ms ease",
                }}
              />

              {/* Sponsored handle bar (top of card) */}
              <line
                x1={startX}
                y1={y + 22}
                x2={startX + cardW}
                y2={y + 22}
                stroke="#0A102F"
                strokeOpacity="0.15"
                strokeWidth="1"
              />
              <rect
                x={startX + 10}
                y={y + 8}
                width="6"
                height="6"
                fill="#FFD031"
              />
              <text
                x={startX + 22}
                y={y + 14}
                fontFamily="var(--font-mono), ui-monospace, monospace"
                fontSize="8"
                fill="#0A102F"
                fillOpacity="0.65"
                letterSpacing="1.2"
              >
                SPONSORED · {card.handle}
              </text>

              {/* Status badge top-right */}
              <rect
                x={startX + cardW - 70}
                y={y + 8}
                width="62"
                height="14"
                fill={status.bg}
                stroke={status.stroke}
                strokeOpacity={status.strokeOpacity}
                strokeWidth="1"
              />
              <text
                x={startX + cardW - 39}
                y={y + 18}
                fontFamily="var(--font-mono), ui-monospace, monospace"
                fontSize="7"
                fontWeight="600"
                fill={status.textColor}
                letterSpacing="1.0"
                textAnchor="middle"
              >
                {status.label}
              </text>

              {/* Abstract creative preview (left side) */}
              <rect
                x={startX + 10}
                y={y + 32}
                width="60"
                height="60"
                fill={card.status === "winner" ? "#FFD031" : "#F0F0EC"}
                stroke="#0A102F"
                strokeOpacity="0.4"
                strokeWidth="1"
              />
              {card.status === "winner" && (
                <>
                  {/* "Play" indicator */}
                  <polygon
                    points={`${startX + 32},${y + 50} ${startX + 32},${y + 74} ${startX + 50},${y + 62}`}
                    fill="#0A102F"
                  />
                </>
              )}
              {card.status === "testing" && (
                <>
                  {/* "A/B" indicator */}
                  <text
                    x={startX + 40}
                    y={y + 67}
                    fontFamily="var(--font-mono), ui-monospace, monospace"
                    fontSize="14"
                    fontWeight="600"
                    fill="#0A102F"
                    fillOpacity="0.65"
                    textAnchor="middle"
                  >
                    A/B
                  </text>
                </>
              )}
              {card.status === "killed" && (
                <>
                  {/* "X" indicator */}
                  <line
                    x1={startX + 22}
                    y1={y + 44}
                    x2={startX + 58}
                    y2={y + 80}
                    stroke="#0A102F"
                    strokeOpacity="0.45"
                    strokeWidth="2"
                  />
                  <line
                    x1={startX + 58}
                    y1={y + 44}
                    x2={startX + 22}
                    y2={y + 80}
                    stroke="#0A102F"
                    strokeOpacity="0.45"
                    strokeWidth="2"
                  />
                </>
              )}

              {/* Headline */}
              <text
                x={startX + 82}
                y={y + 46}
                fontFamily="var(--font-display), ui-sans-serif, system-ui, sans-serif"
                fontSize="11"
                fontWeight="600"
                fill="#0A102F"
                letterSpacing="-0.2"
              >
                {card.headline}
              </text>

              {/* Sub-line */}
              <text
                x={startX + 82}
                y={y + 62}
                fontFamily="var(--font-display), ui-sans-serif, system-ui, sans-serif"
                fontSize="9"
                fontWeight="400"
                fill="#0A102F"
                fillOpacity="0.55"
                letterSpacing="-0.1"
              >
                {card.subline}
              </text>

              {/* CTA pill */}
              <rect
                x={startX + 82}
                y={y + 74}
                width={card.status === "killed" ? 70 : 56}
                height="14"
                fill={card.status === "winner" ? "#FFD031" : "#FFFFFF"}
                stroke="#0A102F"
                strokeOpacity="0.5"
                strokeWidth="1"
              />
              <text
                x={
                  startX +
                  82 +
                  (card.status === "killed" ? 70 : 56) / 2
                }
                y={y + 84}
                fontFamily="var(--font-mono), ui-monospace, monospace"
                fontSize="7"
                fontWeight="600"
                fill="#0A102F"
                letterSpacing="1.0"
                textAnchor="middle"
              >
                {card.status === "killed" ? "RETIRED" : "LEARN MORE"}
              </text>

              {/* Metric on the right */}
              <text
                x={startX + cardW - 12}
                y={y + 86}
                fontFamily="var(--font-display), ui-sans-serif, system-ui, sans-serif"
                fontSize="13"
                fontWeight="600"
                fill={card.status === "winner" ? "#FFD031" : "#0A102F"}
                stroke={card.status === "winner" ? "#0A102F" : "none"}
                strokeWidth={card.status === "winner" ? 0.5 : 0}
                letterSpacing="-0.3"
                textAnchor="end"
              >
                {card.metric}
              </text>
            </g>
          );
        })}

        {/* Scroll indicator on the right edge */}
        <g>
          <line
            x1="420"
            y1={startY}
            x2="420"
            y2={startY + 3 * (cardH + gap) - gap}
            stroke="#0A102F"
            strokeOpacity="0.15"
            strokeWidth="1"
          />
          {[0, 1, 2].map((i) => (
            <circle
              key={i}
              cx="420"
              cy={startY + i * (cardH + gap) + cardH / 2}
              r="3"
              fill={i === 0 ? "#FFD031" : "#0A102F"}
              fillOpacity={i === 0 ? 1 : 0.3}
              stroke="#0A102F"
              strokeWidth="0.75"
              strokeOpacity={i === 0 ? 0.6 : 0.3}
            >
              {i === 0 && (
                <animate
                  attributeName="opacity"
                  values="1;0.4;1"
                  dur="2.4s"
                  repeatCount="indefinite"
                />
              )}
            </circle>
          ))}
        </g>

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
          CREATIVE &gt; TARGETING
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
          ZEPPSTR · SOCIAL
        </text>
      </svg>

      <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
        Hover{" "}
        {hovered !== null
          ? `· ${CARDS[hovered].status.toUpperCase()} · ${CARDS[hovered].metric}`
          : "any creative"}
      </p>
    </div>
  );
}
