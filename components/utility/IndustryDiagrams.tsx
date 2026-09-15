"use client";

import * as React from "react";
import { DiagramFrame, INK, EMERALD, YELLOW, MONO } from "./DiagramFrame";

/**
 * Industry hero diagrams — one per vertical.
 *
 * The six industry pages had no hero graphic at all while every solution and
 * sub-service page carried one, so they read as a different, older part of the
 * site. Each diagram below argues that industry's specific structural problem —
 * the thing its "What's broken" section goes on to describe — rather than
 * decorating the page with a generic chart.
 *
 * They live in one file because they are short and always maintained together;
 * the larger single-purpose diagrams stay in their own files.
 */

/* ───────────────────────────── REAL ESTATE ────────────────────────────────
   The money arrives weeks after the click, in a CRM the ad platform cannot
   see. A timeline with the platform's visibility ending early. */
export function AttributionGapTimeline({ className = "" }: { className?: string }) {
  const X0 = 58;
  const X1 = 402;
  const Y = 210;
  const platformEnd = X0 + (X1 - X0) * 0.22;
  const marks = [
    { t: 0.0, label: "CLICK" },
    { t: 0.22, label: "ENQUIRY" },
    { t: 0.55, label: "SITE VISIT" },
    { t: 1.0, label: "BOOKING" },
  ];
  return (
    <DiagramFrame
      className={className}
      title="Attribution gap — the ad platform stops seeing the buyer long before the booking"
      leftLabel="CONSIDERATION CYCLE"
      rightLabel="WEEKS, NOT CLICKS"
    >
      <line x1={X0} y1={Y} x2={X1} y2={Y} stroke={INK} strokeWidth="1.5" strokeOpacity="0.2" />
      <rect x={X0} y={Y - 26} width={platformEnd - X0} height="52" fill={INK} fillOpacity="0.07" />
      <rect x={platformEnd} y={Y - 26} width={X1 - platformEnd} height="52" fill={EMERALD} fillOpacity="0.1">
        <animate attributeName="width" from="0" to={X1 - platformEnd} dur="1.1s" begin="0.4s" fill="freeze" calcMode="spline" keySplines="0.16 1 0.3 1" />
      </rect>
      {/* Stacked either side of the band. Side by side they collided: the
          platform window is only 22% of the timeline, so the left label ran
          straight through the right one. */}
      <text x={X0 + 4} y={Y + 62} fontFamily={MONO} fontSize="8" fontWeight="600" fill={INK} fillOpacity="0.5" letterSpacing="1.3">
        ↑ PLATFORM SEES THIS MUCH
      </text>
      <text x={X1} y={Y - 40} fontFamily={MONO} fontSize="8" fontWeight="600" fill={EMERALD} letterSpacing="1.3" textAnchor="end">
        THE CRM SEES ALL OF IT ↓
      </text>
      {marks.map((m, i) => {
        const x = X0 + (X1 - X0) * m.t;
        const last = i === marks.length - 1;
        return (
          <g key={m.label}>
            <circle cx={x} cy={Y} r={last ? 7 : 5} fill={last ? YELLOW : INK} fillOpacity={last ? 1 : 0.35} stroke={last ? EMERALD : "none"} strokeWidth="1.5" />
            <text x={x} y={Y + 32} fontFamily={MONO} fontSize="7.5" fontWeight="700" fill={INK} fillOpacity={last ? 0.85 : 0.5} letterSpacing="1" textAnchor="middle">
              {m.label}
            </text>
          </g>
        );
      })}
      <line x1={platformEnd} y1={Y - 40} x2={platformEnd} y2={Y + 44} stroke={INK} strokeWidth="1.5" strokeDasharray="4 4" strokeOpacity="0.4" />
      <text x="58" y="356" fontFamily={MONO} fontSize="8.5" fontWeight="500" fill={INK} fillOpacity="0.45" letterSpacing="1.3">
        BID ON WHAT CLOSES, NOT WHAT SUBMITS
      </text>
    </DiagramFrame>
  );
}

/* ─────────────────────────── E-COMMERCE / D2C ─────────────────────────────
   First order is bought; the second and third are where margin lives. */
export function RepeatPurchaseCohorts({ className = "" }: { className?: string }) {
  const bars = [
    { label: "ORDER 1", h: 44, note: "PAID FOR" },
    { label: "ORDER 2", h: 96, note: "" },
    { label: "ORDER 3", h: 142, note: "" },
    { label: "ORDER 4+", h: 190, note: "MARGIN" },
  ];
  return (
    <DiagramFrame
      className={className}
      title="Repeat purchase cohorts — acquisition is bought once, margin accumulates afterwards"
      leftLabel="COHORT VALUE"
      rightLabel="ACQUIRE ONCE"
    >
      {bars.map((b, i) => {
        const x = 74 + i * 82;
        const y = 330 - b.h;
        return (
          <g key={b.label}>
            <rect x={x} y={y} width={58} height={b.h} fill={i === 0 ? INK : EMERALD} fillOpacity={i === 0 ? 0.14 : 0.35 + i * 0.2}>
              <animate attributeName="height" from="0" to={b.h} dur="0.9s" begin={`${0.2 + i * 0.14}s`} fill="freeze" calcMode="spline" keySplines="0.16 1 0.3 1" />
              <animate attributeName="y" from="330" to={y} dur="0.9s" begin={`${0.2 + i * 0.14}s`} fill="freeze" calcMode="spline" keySplines="0.16 1 0.3 1" />
            </rect>
            <text x={x + 29} y="348" fontFamily={MONO} fontSize="7.5" fontWeight="700" fill={INK} fillOpacity="0.6" letterSpacing="0.9" textAnchor="middle">
              {b.label}
            </text>
            {b.note && (
              <text x={x + 29} y={y - 10} fontFamily={MONO} fontSize="7.5" fontWeight="700" fill={i === 0 ? INK : EMERALD} fillOpacity={i === 0 ? 0.5 : 1} letterSpacing="1" textAnchor="middle">
                {b.note}
              </text>
            )}
          </g>
        );
      })}
      <line x1="66" y1="330" x2="400" y2="330" stroke={INK} strokeWidth="1" strokeOpacity="0.2" />
      <text x="66" y="390" fontFamily={MONO} fontSize="8.5" fontWeight="500" fill={INK} fillOpacity="0.45" letterSpacing="1.3">
        RETENTION IS A MARKETING OUTPUT
      </text>
    </DiagramFrame>
  );
}

/* ───────────────────────────── SAAS / TECH ────────────────────────────────
   You are selling to a committee, and the objection that kills the deal is
   rarely raised by the person you are talking to. */
export function BuyingCommittee({ className = "" }: { className?: string }) {
  const seats = [
    { label: "CHAMPION", angle: -90, lit: true },
    { label: "FINANCE", angle: -30 },
    { label: "IT / SEC", angle: 30 },
    { label: "LEGAL", angle: 90 },
    { label: "END USER", angle: 150 },
    { label: "EXEC", angle: -150 },
  ];
  const CX = 230, CY = 226, R = 112;
  return (
    <DiagramFrame
      className={className}
      title="Buying committee — six stakeholders, one of whom you are actually talking to"
      leftLabel="BUYING COMMITTEE"
      rightLabel="SIX SEATS"
    >
      <circle cx={CX} cy={CY} r={R} fill="none" stroke={INK} strokeWidth="1" strokeOpacity="0.15" strokeDasharray="5 5" />
      {seats.map((s, i) => {
        const rad = (s.angle * Math.PI) / 180;
        const x = CX + Math.cos(rad) * R;
        const y = CY + Math.sin(rad) * R;
        return (
          <g key={s.label} opacity="0">
            <animate attributeName="opacity" from="0" to="1" dur="0.45s" begin={`${0.25 + i * 0.12}s`} fill="freeze" />
            <circle cx={x} cy={y} r="27" fill={s.lit ? YELLOW : "#FFFFFF"} stroke={s.lit ? EMERALD : INK} strokeWidth={s.lit ? 1.5 : 1} strokeOpacity={s.lit ? 1 : 0.22} />
            <text x={x} y={y + 3} fontFamily={MONO} fontSize="6.5" fontWeight="700" fill={INK} fillOpacity={s.lit ? 1 : 0.6} letterSpacing="0.6" textAnchor="middle">
              {s.label}
            </text>
          </g>
        );
      })}
      <text x={CX} y={CY - 6} fontFamily={MONO} fontSize="8" fontWeight="600" fill={INK} fillOpacity="0.45" letterSpacing="1.3" textAnchor="middle">
        ONE MESSAGE
      </text>
      <text x={CX} y={CY + 10} fontFamily={MONO} fontSize="8" fontWeight="600" fill={INK} fillOpacity="0.45" letterSpacing="1.3" textAnchor="middle">
        CANNOT SERVE ALL SIX
      </text>
      <text x="58" y="394" fontFamily={MONO} fontSize="8.5" fontWeight="500" fill={INK} fillOpacity="0.45" letterSpacing="1.3">
        THE DEAL DIES ON AN OBJECTION
      </text>
      <text x="58" y="412" fontFamily={MONO} fontSize="8.5" fontWeight="500" fill={INK} fillOpacity="0.45" letterSpacing="1.3">
        NOBODY RAISED IN THE ROOM
      </text>
    </DiagramFrame>
  );
}

/* ──────────────────────── HEALTHCARE & WELLNESS ───────────────────────────
   The constraint is the strategy: what data may not leave the building. */
export function ComplianceBoundary({ className = "" }: { className?: string }) {
  const allowed = ["Aggregate volume", "Non-identifying intent", "Consented contact"];
  const blocked = ["Condition data", "Identifiable records", "Diagnosis-based audiences"];
  return (
    <DiagramFrame
      className={className}
      title="Compliance boundary — what may cross into an ad platform and what may not"
      leftLabel="DATA BOUNDARY"
      rightLabel="DPDP · PLATFORM POLICY"
    >
      <line x1="230" y1="96" x2="230" y2="382" stroke={INK} strokeWidth="1.5" strokeDasharray="6 5" strokeOpacity="0.35" />
      <text x="118" y="122" fontFamily={MONO} fontSize="8.5" fontWeight="700" fill={EMERALD} letterSpacing="1.4" textAnchor="middle">
        MAY CROSS
      </text>
      <text x="342" y="122" fontFamily={MONO} fontSize="8.5" fontWeight="700" fill={INK} fillOpacity="0.5" letterSpacing="1.4" textAnchor="middle">
        MAY NOT
      </text>
      {allowed.map((t, i) => (
        <g key={t} opacity="0">
          <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin={`${0.3 + i * 0.14}s`} fill="freeze" />
          <rect x="48" y={150 + i * 62} width="152" height="46" fill={EMERALD} fillOpacity="0.14" stroke={EMERALD} strokeWidth="1" />
          <text x="124" y={178 + i * 62} fontFamily={MONO} fontSize="7.5" fontWeight="600" fill={EMERALD} letterSpacing="0.8" textAnchor="middle">
            {t.toUpperCase()}
          </text>
        </g>
      ))}
      {blocked.map((t, i) => (
        <g key={t} opacity="0">
          <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin={`${0.5 + i * 0.14}s`} fill="freeze" />
          <rect x="260" y={150 + i * 62} width="152" height="46" fill={INK} fillOpacity="0.05" stroke={INK} strokeWidth="1" strokeOpacity="0.18" strokeDasharray="4 3" />
          <text x="336" y={178 + i * 62} fontFamily={MONO} fontSize="7.5" fontWeight="600" fill={INK} fillOpacity="0.45" letterSpacing="0.8" textAnchor="middle">
            {t.toUpperCase()}
          </text>
        </g>
      ))}
      <text x="48" y="412" fontFamily={MONO} fontSize="8.5" fontWeight="500" fill={INK} fillOpacity="0.45" letterSpacing="1.3">
        SETTLED IN THE FIRST FORTNIGHT
      </text>
    </DiagramFrame>
  );
}

/* ──────────────────────── EDTECH & EDUCATION ──────────────────────────────
   Admissions are seasonal. The marketing that wins is not. */
export function AdmissionsSeasonality({ className = "" }: { className?: string }) {
  const months = ["J","F","M","A","M","J","J","A","S","O","N","D"];
  const demand = [18, 26, 58, 96, 132, 104, 62, 34, 24, 20, 22, 30];
  const X0 = 56, W = 348, BASE = 328;
  const step = W / (months.length - 1);
  const pts = demand.map((d, i) => `${X0 + i * step},${BASE - d}`).join(" ");
  return (
    <DiagramFrame
      className={className}
      title="Admissions seasonality — demand spikes in an intake window while the work runs all year"
      leftLabel="INTAKE DEMAND"
      rightLabel="ONE WINDOW"
    >
      <line x1={X0} y1={BASE} x2={X0 + W} y2={BASE} stroke={INK} strokeWidth="1" strokeOpacity="0.2" />
      {/* Intake window */}
      <rect x={X0 + 2.6 * step} y="140" width={step * 3} height={BASE - 140} fill={YELLOW} fillOpacity="0.28" />
      <text x={X0 + 4.1 * step} y="132" fontFamily={MONO} fontSize="8" fontWeight="700" fill={INK} fillOpacity="0.7" letterSpacing="1.2" textAnchor="middle">
        INTAKE WINDOW
      </text>
      <polyline points={pts} fill="none" stroke={EMERALD} strokeWidth="2.5" strokeLinejoin="round" strokeDasharray="900" strokeDashoffset="900">
        <animate attributeName="stroke-dashoffset" from="900" to="0" dur="1.8s" begin="0.3s" fill="freeze" />
      </polyline>
      {/* The always-on baseline the page argues for */}
      <line x1={X0} y1={BASE - 40} x2={X0 + W} y2={BASE - 40} stroke={INK} strokeWidth="1.5" strokeDasharray="5 4" strokeOpacity="0.35" />
      <text x={X0 + W} y={BASE - 48} fontFamily={MONO} fontSize="7.5" fontWeight="600" fill={INK} fillOpacity="0.5" letterSpacing="1.1" textAnchor="end">
        ALWAYS-ON BASELINE
      </text>
      {months.map((m, i) => (
        <text key={i} x={X0 + i * step} y={BASE + 18} fontFamily={MONO} fontSize="7.5" fontWeight="600" fill={INK} fillOpacity="0.4" textAnchor="middle">
          {m}
        </text>
      ))}
      <text x={X0} y="382" fontFamily={MONO} fontSize="8.5" fontWeight="500" fill={INK} fillOpacity="0.45" letterSpacing="1.3">
        BUILD IN THE TROUGH. HARVEST IN THE PEAK.
      </text>
    </DiagramFrame>
  );
}

/* ──────────────────────── PROFESSIONAL SERVICES ───────────────────────────
   People hire the person, not the firm. Most firm marketing hides the people. */
export function PersonVsFirm({ className = "" }: { className?: string }) {
  return (
    <DiagramFrame
      className={className}
      title="Person versus firm — trust accrues to named people, while most firm marketing hides them"
      leftLabel="WHERE TRUST SITS"
      rightLabel="NAMED VS ANONYMOUS"
    >
      {/* Firm block — large, anonymous, low contrast */}
      <rect x="54" y="132" width="164" height="188" fill={INK} fillOpacity="0.06" stroke={INK} strokeWidth="1" strokeOpacity="0.15" />
      <text x="136" y="120" fontFamily={MONO} fontSize="8" fontWeight="700" fill={INK} fillOpacity="0.45" letterSpacing="1.3" textAnchor="middle">
        THE FIRM
      </text>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect key={i} x={72 + (i % 3) * 50} y={158 + Math.floor(i / 3) * 74} width="34" height="46" fill={INK} fillOpacity="0.12" />
      ))}
      <text x="136" y="338" fontFamily={MONO} fontSize="7.5" fontWeight="600" fill={INK} fillOpacity="0.4" letterSpacing="1" textAnchor="middle">
        NOBODY NAMED
      </text>

      {/* The named individual — small, specific, high contrast */}
      <g opacity="0">
        <animate attributeName="opacity" from="0" to="1" dur="0.7s" begin="0.7s" fill="freeze" />
        <rect x="262" y="176" width="140" height="100" fill={EMERALD} />
        <circle cx="332" cy="212" r="17" fill={YELLOW} />
        <text x="332" y="248" fontFamily={MONO} fontSize="8" fontWeight="700" fill="#FFFFFF" fillOpacity="0.95" letterSpacing="1.1" textAnchor="middle">
          A NAMED PERSON
        </text>
        <text x="332" y="262" fontFamily={MONO} fontSize="7" fontWeight="500" fill={YELLOW} letterSpacing="1" textAnchor="middle">
          WITH A TRACK RECORD
        </text>
        <text x="332" y="164" fontFamily={MONO} fontSize="8" fontWeight="700" fill={EMERALD} letterSpacing="1.3" textAnchor="middle">
          THE PRACTITIONER
        </text>
      </g>

      {/* Weight arrow */}
      <g opacity="0">
        <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="1.2s" fill="freeze" />
        <line x1="226" y1="226" x2="252" y2="226" stroke={YELLOW} strokeWidth="2.5" />
        <path d="M 260 226 L 248 220 L 248 232 Z" fill={YELLOW} />
      </g>

      <text x="54" y="388" fontFamily={MONO} fontSize="8.5" fontWeight="500" fill={INK} fillOpacity="0.45" letterSpacing="1.3">
        PUT THE PEOPLE BACK ON THE PAGE
      </text>
    </DiagramFrame>
  );
}

/**
 * Slug → diagram, resolved ON THE CLIENT.
 *
 * ── WHY THIS IS A COMPONENT AND NOT AN EXPORTED MAP ─────────────────────────
 * The first version exported a Record<string, ComponentType> and the server
 * component did `const Diagram = INDUSTRY_DIAGRAMS[slug]` then rendered it.
 * That throws at runtime:
 *
 *   Could not find the module ".../IndustryDiagrams.tsx#INDUSTRY_DIAGRAMS#real-estate"
 *   in the React Client Manifest.
 *
 * A server component can only render a client component the bundler can see as
 * a named export at build time. Pulling one out of a map at runtime gives the
 * RSC bundler nothing to register, so the reference cannot be serialised across
 * the boundary. The error names a module path that was never emitted.
 *
 * The fix is to keep the lookup on the client side of the boundary: the server
 * renders one named client component and passes a plain string.
 *
 * Unlisted industries render nothing rather than a generic chart, so a new
 * vertical is visibly missing art rather than quietly borrowing another
 * industry's argument.
 */
const BY_SLUG: Record<string, React.ComponentType<{ className?: string }>> = {
  "real-estate": AttributionGapTimeline,
  "ecommerce-dtc": RepeatPurchaseCohorts,
  "saas-tech": BuyingCommittee,
  "healthcare-wellness": ComplianceBoundary,
  "edtech-education": AdmissionsSeasonality,
  "professional-services": PersonVsFirm,
};

export function IndustryDiagram({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) {
  const Diagram = BY_SLUG[slug];
  if (!Diagram) return null;
  return <Diagram className={className} />;
}
