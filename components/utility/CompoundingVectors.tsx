"use client";

import * as React from "react";

/**
 * CompoundingVectors — the homepage hero diagram.
 *
 * ── WHY THIS EXISTS ─────────────────────────────────────────────────────────
 * Every solution page, every industry page, /work, /about and both hub pages
 * carry an animated hero diagram. The homepage — the one page guaranteed to be
 * seen — carried none. It was the only hero on the site with nothing in it but
 * type, which is why it read as less designed than pages three clicks deeper.
 *
 * ── WHAT IT ARGUES ──────────────────────────────────────────────────────────
 * The homepage claim is that channels compound when the layer beneath them
 * works, and compete when it does not. That is vector addition, so the diagram
 * is literally vector addition.
 *
 * Four channel arrows leave a common origin. In the first half of the loop
 * they are splayed apart — same number of arrows, same length each, but they
 * point in different directions, so the resultant (the yellow arrow) is short.
 * In the second half they rotate into near-alignment and the resultant grows
 * to several times its former length. Nothing is added. Nothing is spent. Only
 * the direction changes.
 *
 * That is the entire argument of the firm in one loop, and it is honest: the
 * diagram makes a structural point, not a numerical one, so there is no figure
 * on it that a reader could mistake for a client result.
 *
 * ── DARK VARIANT ────────────────────────────────────────────────────────────
 * This does not use DiagramFrame. That component draws ink-on-white chrome for
 * the light hero pattern; the homepage hero is full-bleed emerald, so the
 * frame, labels and hairlines here are white-on-dark equivalents. Keeping them
 * as separate components is deliberate — parameterising DiagramFrame for two
 * colour schemes would complicate twenty working diagrams to serve one.
 */

const YELLOW = "#FFD031";
const MONO = "var(--font-mono), ui-monospace, monospace";

/**
 * Channel arrows. `splayed` is the competing angle, `aligned` the compounding one.
 *
 * LABELS ARE NOT ATTACHED TO THE ARROWS — see the legend at the foot of the
 * SVG. The first version put each label inside its arrow's rotating <g>, which
 * meant the text rotated with the vector: "SITE" at +72° rendered on its side
 * and "PAID" at -64° rendered upside-down-ish. Counter-rotating text inside an
 * animating transform is possible but fragile, and the arrows do not need
 * individual labels to make the point — the point is the spread, not which
 * arrow is which.
 */
const CHANNELS = [
  { label: "PAID", splayed: -52, aligned: -11 },
  { label: "ORGANIC", splayed: -17, aligned: -4 },
  { label: "LIFECYCLE", splayed: 20, aligned: 4 },
  { label: "SITE", splayed: 55, aligned: 11 },
];

const CX = 104;
const CY = 168;
const LEN = 150;

export function CompoundingVectors() {
  const id = React.useId();

  return (
    <div className="relative w-full max-w-[460px] mx-auto">
      <svg
        viewBox="0 0 460 372"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        role="img"
        aria-labelledby={id}
      >
        <title id={id}>
          Four channel arrows leaving one origin. They begin splayed apart, so
          their combined result is short; they then rotate into alignment and
          the combined result grows several times longer. The same channels and
          the same spend, pointing the same way.
        </title>

        {/* Frame + corner ticks — the drafting language used by every other
            diagram on the site, inverted for the dark hero. */}
        <rect
          x="14"
          y="14"
          width="432"
          height="344"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="1"
          strokeOpacity="0.16"
        />
        {[
          [14, 14],
          [446, 14],
          [14, 358],
          [446, 358],
        ].map(([x, y]) => (
          <g key={`${x}-${y}`} stroke={YELLOW} strokeWidth="1.5" strokeOpacity="0.8">
            <line x1={x - 5} y1={y} x2={x + 5} y2={y} />
            <line x1={x} y1={y - 5} x2={x} y2={y + 5} />
          </g>
        ))}

        <text x="30" y="44" fontFamily={MONO} fontSize="10" letterSpacing="1.5" fill="#FFFFFF" fillOpacity="0.5">
          FOUR CHANNELS
        </text>
        <text x="430" y="44" textAnchor="end" fontFamily={MONO} fontSize="10" letterSpacing="1.5" fill="#FFFFFF" fillOpacity="0.5">
          ONE DIRECTION
        </text>

        <defs>
          <marker id={`${id}-tip`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#FFFFFF" fillOpacity="0.55" />
          </marker>
          <marker id={`${id}-tipY`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5.5" markerHeight="5.5" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill={YELLOW} />
          </marker>
        </defs>

        {/* Origin */}
        <circle cx={CX} cy={CY} r="4" fill="#FFFFFF" fillOpacity="0.5" />

        {/* The four channel vectors. Each rotates between its splayed and
            aligned angle on a shared 9s loop, so they move as one system. */}
        {CHANNELS.map((c) => (
          <g key={c.label}>
            <g transform={`rotate(${c.splayed} ${CX} ${CY})`}>
              <animateTransform
                attributeName="transform"
                type="rotate"
                values={`${c.splayed} ${CX} ${CY}; ${c.splayed} ${CX} ${CY}; ${c.aligned} ${CX} ${CY}; ${c.aligned} ${CX} ${CY}; ${c.splayed} ${CX} ${CY}`}
                keyTimes="0; 0.28; 0.46; 0.82; 1"
                dur="9s"
                repeatCount="indefinite"
                calcMode="spline"
                keySplines="0 0 1 1; .16 1 .3 1; 0 0 1 1; .7 0 .84 0"
              />
              <line
                x1={CX}
                y1={CY}
                x2={CX + LEN}
                y2={CY}
                stroke="#FFFFFF"
                strokeOpacity="0.5"
                strokeWidth="1.5"
                markerEnd={`url(#${id}-tip)`}
              />
            </g>
            {/* Faint arc showing the travel each vector makes. */}
            <path
              d={describeArc(CX, CY, LEN - 26, c.splayed, c.aligned)}
              fill="none"
              stroke="#FFFFFF"
              strokeOpacity="0.12"
              strokeWidth="1"
              strokeDasharray="2 4"
            />
          </g>
        ))}

        {/* The resultant — short while the channels compete, long once they
            align. This is the only yellow element, because it is the payoff. */}
        <g>
          <line
            x1={CX}
            y1={CY}
            x2={CX + 58}
            y2={CY}
            stroke={YELLOW}
            strokeWidth="4"
            markerEnd={`url(#${id}-tipY)`}
          >
            <animate
              attributeName="x2"
              values={`${CX + 58}; ${CX + 58}; ${CX + 292}; ${CX + 292}; ${CX + 58}`}
              keyTimes="0; 0.28; 0.46; 0.82; 1"
              dur="9s"
              repeatCount="indefinite"
              calcMode="spline"
              keySplines="0 0 1 1; .16 1 .3 1; 0 0 1 1; .7 0 .84 0"
            />
          </line>
        </g>

        {/* State label — flips with the animation. */}
        <g>
          <text x="30" y="266" fontFamily={MONO} fontSize="13" letterSpacing="2" fill={YELLOW}>
            COMPETING
            <animate
              attributeName="opacity"
              values="1;1;0;0;1"
              keyTimes="0;0.3;0.44;0.84;1"
              dur="9s"
              repeatCount="indefinite"
            />
          </text>
          <text x="30" y="266" fontFamily={MONO} fontSize="13" letterSpacing="2" fill={YELLOW}>
            COMPOUNDING
            <animate
              attributeName="opacity"
              values="0;0;1;1;0"
              keyTimes="0;0.3;0.44;0.84;1"
              dur="9s"
              repeatCount="indefinite"
            />
          </text>
        </g>

        <line x1="30" y1="284" x2="430" y2="284" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.16" />

        {/* Legend — the four channels, set flat so they stay readable however
            the arrows are rotated. Replaces the per-arrow labels. */}
        <text x="30" y="308" fontFamily={MONO} fontSize="9.5" letterSpacing="1.3" fill="#FFFFFF" fillOpacity="0.6">
          {CHANNELS.map((c) => c.label).join("  ·  ")}
        </text>

        {/* Captions. Split across two lines and shortened — the single long
            line previously ran past x=430 and was clipped by the frame edge. */}
        <text x="30" y="330" fontFamily={MONO} fontSize="9.5" letterSpacing="1.1" fill="#FFFFFF" fillOpacity="0.42">
          SAME CHANNELS. SAME BUDGET. NOTHING ADDED.
        </text>
        <text x="30" y="347" fontFamily={MONO} fontSize="9" letterSpacing="1" fill="#FFFFFF" fillOpacity="0.28">
          STRUCTURAL — NOT A CLIENT RESULT
        </text>
      </svg>
    </div>
  );
}

/** Arc path between two angles at a fixed radius — used for the travel guides. */
function describeArc(cx: number, cy: number, r: number, a0: number, a1: number) {
  const p = (deg: number) => {
    const rad = (deg * Math.PI) / 180;
    return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
  };
  const [x0, y0] = p(a0);
  const [x1, y1] = p(a1);
  const large = Math.abs(a1 - a0) > 180 ? 1 : 0;
  const sweep = a1 > a0 ? 1 : 0;
  return `M ${x0} ${y0} A ${r} ${r} 0 ${large} ${sweep} ${x1} ${y1}`;
}
