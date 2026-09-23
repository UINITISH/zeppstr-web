"use client";

import * as React from "react";

/**
 * RealFunnel — the homepage hero graphic.
 *
 * ── WHY THIS REPLACED CompoundingVectors ────────────────────────────────────
 * Vikas, 17 Sep: "the side creative looks like proper AI… it should be
 * something real or less AI."
 *
 * He was right, and the diagnosis is worth writing down because it applies to
 * the whole site. CompoundingVectors was four hairline arrows rotating from
 * splayed to aligned. It was a good ARGUMENT and a bad IMAGE: abstract,
 * perfectly geometric, carrying no information a person could check. That is
 * precisely the register of a generated illustration, and no amount of
 * drafting furniture around it changes that.
 *
 * The fix is not a different abstraction. It is to stop abstracting.
 *
 * ── WHAT THIS SHOWS ─────────────────────────────────────────────────────────
 * The actual Tru Aquapolis funnel, every figure lifted from the results table
 * published at /work/tru-aquapolis:
 *
 *     Media investment        ₹1.4 Cr  (Meta + Google)
 *     Leads generated         6,000+
 *     Qualified after screen  ~4,200   (70%+)
 *     Units closed            75
 *     Closed sales value      ₹187.5 Cr
 *     Media to closed sales   134×
 *
 * Nothing here is modelled, averaged or illustrative. It is one engagement,
 * named, over a stated period, and a visitor can click through and read the
 * whole thing. On a site whose argument is that it publishes only what it can
 * prove, the strongest possible hero image is the proof itself.
 *
 * ── THE ONE THING TO BE CAREFUL ABOUT ───────────────────────────────────────
 * The bar widths are NOT to scale and must never be read as data. 6,000 leads
 * against 75 units is an 80:1 ratio — drawn honestly, the last bar would be
 * two pixels wide and unreadable. So the widths are a fixed funnel taper that
 * communicates "this narrows", and the numbers beside them carry the truth.
 * The frame says so on its face. If you ever make the widths proportional,
 * remove that caption; if you keep the caption, do not touch the widths.
 */

const YELLOW = "#FFD031";
const MONO = "var(--font-mono), ui-monospace, monospace";

type Stage = {
  /** The published figure. */
  value: string;
  /** What the figure counts. */
  label: string;
  /** Optional qualifier, set smaller. */
  note?: string;
  /** Fixed taper width — see the scale warning above. NOT derived from value. */
  w: number;
  /** The payoff row gets the brand yellow. Everything else is white. */
  payoff?: boolean;
};

const STAGES: Stage[] = [
  { value: "₹1.4 Cr", label: "MEDIA INVESTED", note: "META + GOOGLE", w: 344 },
  { value: "6,000+", label: "LEADS GENERATED", note: "₹2,333 BLENDED CPL", w: 296 },
  { value: "~4,200", label: "QUALIFIED", note: "70%+ AFTER SCREENING", w: 244 },
  { value: "75", label: "UNITS CLOSED", note: "1.8% OF QUALIFIED", w: 188 },
  { value: "₹187.5 Cr", label: "CLOSED SALES VALUE", note: "₹2.5 CR AVERAGE TICKET", w: 132, payoff: true },
];

export function RealFunnel() {
  const id = React.useId();
  const top = 92;
  const rowH = 44;
  const gap = 13;
  const cx = 230; // centre of the 460 viewBox — the funnel is centred

  return (
    <div className="relative w-full max-w-[460px] mx-auto">
      <svg
        viewBox="0 0 460 420"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        role="img"
        aria-labelledby={id}
      >
        <title id={id}>
          The Tru Aquapolis funnel: ₹1.4 crore of media produced over 6,000
          leads, of which roughly 4,200 qualified, closing 75 units worth ₹187.5
          crore. Bar widths are a fixed taper, not to scale.
        </title>

        {/* Frame + corner ticks — the drafting language the rest of the site
            uses, inverted for the dark hero. */}
        <rect
          x="14"
          y="14"
          width="432"
          height="392"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="1"
          strokeOpacity="0.16"
        />
        {[
          [14, 14],
          [446, 14],
          [14, 406],
          [446, 406],
        ].map(([x, y]) => (
          <g key={`${x}-${y}`} stroke={YELLOW} strokeWidth="1.5" strokeOpacity="0.8">
            <line x1={x - 5} y1={y} x2={x + 5} y2={y} />
            <line x1={x} y1={y - 5} x2={x} y2={y + 5} />
          </g>
        ))}

        <text x="30" y="44" fontFamily={MONO} fontSize="10" letterSpacing="1.5" fill="#FFFFFF" fillOpacity="0.5">
          ONE ENGAGEMENT
        </text>
        <text x="430" y="44" textAnchor="end" fontFamily={MONO} fontSize="10" letterSpacing="1.5" fill="#FFFFFF" fillOpacity="0.5">
          TRU AQUAPOLIS
        </text>
        <text x="30" y="62" fontFamily={MONO} fontSize="9" letterSpacing="1.2" fill="#FFFFFF" fillOpacity="0.32">
          JAN–AUG 2026 · PUBLISHED IN FULL
        </text>

        {STAGES.map((s, i) => {
          const y = top + i * (rowH + gap);
          const x = cx - s.w / 2;
          return (
            <g key={s.label}>
              {/* Each bar wipes in from the centre, top to bottom, so the eye
                  follows the narrowing rather than seeing five bars appear. */}
              <rect
                x={cx}
                y={y}
                width="0"
                height={rowH}
                fill={s.payoff ? YELLOW : "#FFFFFF"}
                fillOpacity={s.payoff ? 1 : 0.1}
                stroke={s.payoff ? YELLOW : "#FFFFFF"}
                strokeOpacity={s.payoff ? 1 : 0.28}
                strokeWidth="1"
              >
                <animate attributeName="width" from="0" to={s.w} dur="0.65s" begin={`${i * 0.13}s`} fill="freeze" />
                <animate attributeName="x" from={cx} to={x} dur="0.65s" begin={`${i * 0.13}s`} fill="freeze" />
              </rect>

              <text
                x={cx}
                y={y + 20}
                textAnchor="middle"
                fontFamily="var(--font-display), ui-sans-serif, system-ui, sans-serif"
                fontSize="19"
                fontWeight="300"
                letterSpacing="-0.5"
                fill={s.payoff ? "#0A102F" : "#FFFFFF"}
                opacity="0"
              >
                {s.value}
                <animate attributeName="opacity" from="0" to="1" dur="0.4s" begin={`${i * 0.13 + 0.3}s`} fill="freeze" />
              </text>
              <text
                x={cx}
                y={y + 34}
                textAnchor="middle"
                fontFamily={MONO}
                fontSize="7.5"
                letterSpacing="1.1"
                fill={s.payoff ? "#0A102F" : "#FFFFFF"}
                fillOpacity={s.payoff ? 0.7 : 0.55}
                opacity="0"
              >
                {s.label}
                <animate attributeName="opacity" from="0" to="1" dur="0.4s" begin={`${i * 0.13 + 0.3}s`} fill="freeze" />
              </text>

              {/* Qualifier, set outside the bar so it never crowds the figure. */}
              {s.note && (
                <text
                  x={cx + s.w / 2 + 12}
                  y={y + 26}
                  fontFamily={MONO}
                  fontSize="7.5"
                  letterSpacing="0.9"
                  fill="#FFFFFF"
                  fillOpacity="0.38"
                  opacity="0"
                >
                  {s.note}
                  <animate attributeName="opacity" from="0" to="1" dur="0.4s" begin={`${i * 0.13 + 0.42}s`} fill="freeze" />
                </text>
              )}
            </g>
          );
        })}

        <line x1="30" y1="360" x2="430" y2="360" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.16" />

        <text x="30" y="380" fontFamily={MONO} fontSize="11" letterSpacing="1.6" fill={YELLOW}>
          134× MEDIA TO CLOSED SALES
        </text>
        {/* The scale warning. See the note at the top of this file — it is not
            optional decoration, it is what makes the drawing honest. */}
        <text x="30" y="396" fontFamily={MONO} fontSize="8.5" letterSpacing="1" fill="#FFFFFF" fillOpacity="0.3">
          BAR WIDTHS ARE A FIXED TAPER, NOT TO SCALE — FIGURES ARE EXACT
        </text>
      </svg>
    </div>
  );
}
