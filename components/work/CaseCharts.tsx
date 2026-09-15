"use client";

import * as React from "react";

/**
 * Charts for the case study pages.
 *
 * ── WHY THESE EXIST ─────────────────────────────────────────────────────────
 * The case studies were ~5,900px of unbroken prose in a single narrow column,
 * with no visual break of any kind between the hero image and the footer. The
 * strongest material on the site was in them — "zero platform-recorded
 * conversions in February against 147 sitting in the CRM", "21.4 lakh reached
 * at ₹0.58 per person", "thirty-three creatives tested, two survived" — and
 * every one of those was rendered as a bullet point a reader skims past.
 *
 * Each chart below takes one figure that is already load-bearing in that
 * page's narrative and gives it the weight it earns. See lib/case-visuals.ts
 * for the sourcing rule; no chart here invents a number.
 *
 * ── WHY SVG + SMIL AND NOT A CHART LIBRARY ──────────────────────────────────
 * Consistency with the twenty-odd hero diagrams already on the site, which are
 * hand-built SVG with <animate>. Adding Recharts for three charts would ship a
 * second visual language and ~50KB for the privilege.
 */

const INK = "#0A102F";
const EMERALD = "#064E3B";
const YELLOW = "#FFD031";
const MONO = "var(--font-mono), ui-monospace, monospace";

function ChartShell({
  title,
  children,
  viewBox = "0 0 720 380",
}: {
  title: string;
  children: React.ReactNode;
  viewBox?: string;
}) {
  const id = React.useId();
  return (
    <svg
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto"
      role="img"
      aria-labelledby={id}
    >
      <title id={id}>{title}</title>
      {children}
    </svg>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
 * AttributionGap — Tru Aquapolis
 *
 * Two bars: what Google saw (0) against what the CRM held (147), for the same
 * month. The whole argument of the engagement is in this one comparison, and
 * a bar of height zero makes it instantly.
 * ──────────────────────────────────────────────────────────────────────────── */
export function AttributionGap() {
  const baseY = 268;
  const maxH = 180;
  const crmH = maxH; // 147 = the top of the scale

  return (
    <ChartShell title="In February, the ad platform recorded zero conversions while the CRM held 147 for the same period.">
      <text x="0" y="18" fontFamily={MONO} fontSize="11" letterSpacing="1.6" fill={INK} fillOpacity="0.45">
        FEBRUARY 2026 — SAME MONTH, TWO SCOREBOARDS
      </text>

      {/* Baseline */}
      <line x1="0" y1={baseY} x2="720" y2={baseY} stroke={INK} strokeWidth="1" strokeOpacity="0.2" />

      {/* Platform-recorded: zero. Rendered as a flat rule ON the baseline with
          a dashed ghost showing where a bar would have been — an absent bar is
          easy to mistake for a rendering failure. */}
      <g>
        <rect x="90" y={baseY - crmH} width="150" height={crmH} fill="none" stroke={INK} strokeOpacity="0.15" strokeDasharray="4 4" />
        <rect x="90" y={baseY - 3} width="150" height="3" fill={INK} fillOpacity="0.5" />
        <text x="165" y={baseY - 20} textAnchor="middle" fontFamily={MONO} fontSize="46" fill={INK} fillOpacity="0.75" letterSpacing="-2">
          0
        </text>
        <text x="165" y={baseY + 26} textAnchor="middle" fontFamily={MONO} fontSize="10.5" letterSpacing="1.4" fill={INK} fillOpacity="0.55">
          RECORDED BY THE PLATFORM
        </text>
        <text x="165" y={baseY + 44} textAnchor="middle" fontFamily={MONO} fontSize="9.5" letterSpacing="1.1" fill={INK} fillOpacity="0.35">
          WHAT SMART BIDDING OPTIMISED AGAINST
        </text>
      </g>

      {/* CRM-held: 147 */}
      <g>
        <rect x="480" y={baseY - crmH} width="150" height={crmH} fill={EMERALD}>
          <animate attributeName="height" from="0" to={crmH} dur="1s" fill="freeze" />
          <animate attributeName="y" from={baseY} to={baseY - crmH} dur="1s" fill="freeze" />
        </rect>
        <text x="555" y={baseY - crmH - 16} textAnchor="middle" fontFamily={MONO} fontSize="46" fill={EMERALD} letterSpacing="-2">
          147
        </text>
        <text x="555" y={baseY + 26} textAnchor="middle" fontFamily={MONO} fontSize="10.5" letterSpacing="1.4" fill={INK} fillOpacity="0.55">
          SITTING IN THE CRM
        </text>
        <text x="555" y={baseY + 44} textAnchor="middle" fontFamily={MONO} fontSize="9.5" letterSpacing="1.1" fill={INK} fillOpacity="0.35">
          REAL ENQUIRIES, INVISIBLE TO THE ACCOUNT
        </text>
      </g>

      {/* The gap, called out explicitly between the two bars. */}
      <line x1="248" y1={baseY - 90} x2="472" y2={baseY - 90} stroke={YELLOW} strokeWidth="2" strokeDasharray="6 5" />
      <rect x="292" y={baseY - 108} width="136" height="34" fill={YELLOW} />
      <text x="360" y={baseY - 86} textAnchor="middle" fontFamily={MONO} fontSize="11" letterSpacing="1.4" fill={INK}>
        THE GAP
      </text>

      <text x="0" y="336" fontFamily={MONO} fontSize="9.5" letterSpacing="1.1" fill={INK} fillOpacity="0.4">
        NO SPEND CHANGED UNTIL THIS WAS FIXED — YOU CANNOT OPTIMISE A NUMBER THAT IS NOT BEING RECORDED
      </text>
      <text x="0" y="356" fontFamily={MONO} fontSize="9.5" letterSpacing="1.1" fill={INK} fillOpacity="0.3">
        FIGURES AS PUBLISHED IN THE DIAGNOSIS BELOW
      </text>
    </ChartShell>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
 * CreativeFunnel — used for Homatico
 *
 * A sequence diagram with NO measured values on it, because Homatico's outcome
 * is client-reported. It shows the order the work ran in, which is a claim we
 * can make, rather than a result we did not measure.
 * ──────────────────────────────────────────────────────────────────────────── */
const SEQUENCE = [
  { n: "01", label: "AUDIT", sub: "WHAT THE SITE LOST" },
  /* Subs are capped at ~19 characters. "STRUCTURE, THEN SURFACE" (23) overflowed
     the 152px box and was sliced by the border at 8.5px mono. If a stage needs
     a longer description, widen the box — do not let the text run out of it. */
  { n: "02", label: "REBUILD", sub: "STRUCTURE FIRST" },
  { n: "03", label: "INSTRUMENT", sub: "MEASURE ARRIVALS" },
  { n: "04", label: "ITERATE", sub: "ONGOING" },
];

export function CreativeFunnel() {
  /* viewBox was 720×380 with content starting at y=150, which left roughly a
     third of the frame empty above the sequence — on screen that read as a
     broken image rather than as whitespace. Frame now fits the content. */
  const y = 42;
  const w = 152;
  const gap = 38;

  return (
    <ChartShell
      title="The four stages of the Homatico rebuild, in order. No measured values are shown because the reported outcome is client-reported."
      viewBox="0 0 720 230"
    >
      <text x="0" y="16" fontFamily={MONO} fontSize="11" letterSpacing="1.6" fill={INK} fillOpacity="0.45">
        THE ORDER OF WORK
      </text>

      {SEQUENCE.map((s, i) => {
        const x = i * (w + gap);
        const isLast = i === SEQUENCE.length - 1;
        return (
          <g key={s.n}>
            <rect
              x={x}
              y={y}
              width={w}
              height={92}
              fill={isLast ? EMERALD : "none"}
              stroke={isLast ? EMERALD : INK}
              strokeWidth="1"
              strokeOpacity={isLast ? 1 : 0.25}
            />
            <text x={x + 16} y={y + 28} fontFamily={MONO} fontSize="10" fill={isLast ? YELLOW : INK} fillOpacity={isLast ? 1 : 0.35}>
              {s.n}
            </text>
            <text x={x + 16} y={y + 56} fontFamily={MONO} fontSize="15" letterSpacing="1.6" fill={isLast ? "#FFFFFF" : INK} fillOpacity={isLast ? 1 : 0.8}>
              {s.label}
            </text>
            <text x={x + 16} y={y + 76} fontFamily={MONO} fontSize="8.5" letterSpacing="0.9" fill={isLast ? "#FFFFFF" : INK} fillOpacity={isLast ? 0.65 : 0.4}>
              {s.sub}
            </text>

            {/* Connector with a travelling dot — the sequence is the argument. */}
            {!isLast && (
              <>
                <line x1={x + w} y1={y + 46} x2={x + w + gap} y2={y + 46} stroke={INK} strokeWidth="1" strokeOpacity="0.25" />
                <circle r="3.5" fill={YELLOW}>
                  <animateMotion
                    dur="1.4s"
                    begin={`${i * 0.45}s`}
                    repeatCount="indefinite"
                    path={`M ${x + w} ${y + 46} L ${x + w + gap} ${y + 46}`}
                  />
                </circle>
              </>
            )}
          </g>
        );
      })}

      <text x="0" y="186" fontFamily={MONO} fontSize="9.5" letterSpacing="1.1" fill={INK} fillOpacity="0.4">
        NO PERFORMANCE FIGURES ARE SHOWN HERE
      </text>
      <text x="0" y="206" fontFamily={MONO} fontSize="9.5" letterSpacing="1.1" fill={INK} fillOpacity="0.3">
        INQUIRY GROWTH ON THIS ENGAGEMENT IS CLIENT-REPORTED — WE DID NOT MEASURE IT, SO WE DO NOT CHART IT
      </text>
    </ChartShell>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
 * ProductSurface — VehicleMall
 *
 * Three applications sharing one valuation engine. This is a scope diagram,
 * not a performance one, because VehicleMall's published headline is scope.
 * ──────────────────────────────────────────────────────────────────────────── */
const APPS = [
  { label: "VALUATION", sub: "APPRAISE" },
  { label: "AUCTION", sub: "SELL" },
  { label: "CUSTODY", sub: "HOLD & TRANSFER" },
];

export function ProductSurface() {
  const topY = 62;
  const boxW = 190;
  const boxH = 86;
  const gapX = 40;

  return (
    <ChartShell
      title="Three production applications — valuation, auction and custody — sharing one valuation engine across mobile and desktop."
      viewBox="0 0 720 332"
    >
      <text x="0" y="18" fontFamily={MONO} fontSize="11" letterSpacing="1.6" fill={INK} fillOpacity="0.45">
        THREE APPLICATIONS · ONE ENGINE · TWO PLATFORMS
      </text>

      {APPS.map((a, i) => {
        const x = i * (boxW + gapX);
        return (
          <g key={a.label}>
            <rect x={x} y={topY} width={boxW} height={boxH} fill="none" stroke={INK} strokeWidth="1" strokeOpacity="0.25" />
            <rect x={x} y={topY} width={boxW} height="4" fill={YELLOW}>
              <animate attributeName="width" from="0" to={boxW} dur="0.7s" begin={`${i * 0.18}s`} fill="freeze" />
            </rect>
            <text x={x + 18} y={topY + 42} fontFamily={MONO} fontSize="15" letterSpacing="1.8" fill={INK} fillOpacity="0.85">
              {a.label}
            </text>
            <text x={x + 18} y={topY + 64} fontFamily={MONO} fontSize="9" letterSpacing="1.1" fill={INK} fillOpacity="0.4">
              {a.sub}
            </text>

            {/* Down-link into the shared engine */}
            <line
              x1={x + boxW / 2}
              y1={topY + boxH}
              x2={x + boxW / 2}
              y2="214"
              stroke={INK}
              strokeWidth="1"
              strokeOpacity="0.2"
              strokeDasharray="3 3"
            />
            <circle r="3.5" fill={EMERALD}>
              <animateMotion
                dur="2.2s"
                begin={`${i * 0.5}s`}
                repeatCount="indefinite"
                path={`M ${x + boxW / 2} ${topY + boxH} L ${x + boxW / 2} 214`}
              />
            </circle>
          </g>
        );
      })}

      {/* Shared engine */}
      <rect x="0" y="214" width={APPS.length * boxW + (APPS.length - 1) * gapX} height="62" fill={EMERALD} />
      <text x={(APPS.length * boxW + (APPS.length - 1) * gapX) / 2} y="240" textAnchor="middle" fontFamily={MONO} fontSize="13" letterSpacing="2" fill="#FFFFFF">
        SHARED VALUATION ENGINE
      </text>
      <text x={(APPS.length * boxW + (APPS.length - 1) * gapX) / 2} y="260" textAnchor="middle" fontFamily={MONO} fontSize="9" letterSpacing="1.2" fill={YELLOW} fillOpacity="0.9">
        A CAR IS APPRAISED ONCE, THEN MOVES WITHOUT BEING RE-ENTERED
      </text>

      {/* Platform rail */}
      <text x="0" y="318" fontFamily={MONO} fontSize="9.5" letterSpacing="1.1" fill={INK} fillOpacity="0.4">
        SHIPPED ON MOBILE AND DESKTOP · SCOPE, NOT A PERFORMANCE CLAIM
      </text>
    </ChartShell>
  );
}

/** Dispatcher — keeps the page component free of chart-key branching. */
export function CaseChart({ chart }: { chart: string }) {
  if (chart === "attribution-gap") return <AttributionGap />;
  if (chart === "creative-funnel") return <CreativeFunnel />;
  if (chart === "product-surface") return <ProductSurface />;
  return null;
}
