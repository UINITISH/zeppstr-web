/**
 * SectorRecord — anonymised, aggregate sector proof.
 *
 * ── WHY THIS COMPONENT EXISTS ───────────────────────────────────────────────
 * Zeppstr has delivered paid acquisition for several tier-1 residential
 * developers in Bengaluru and Dubai as third-party / subcontracted work.
 * Reporting access only — NO naming rights. Those engagements therefore cannot
 * appear as named case studies, and cannot appear as individually-profiled
 * anonymous case studies either: a single engagement described by project
 * value, unit mix, corridor and duration is trivially re-identifiable by
 * anyone working in the sector.
 *
 * Aggregation is what actually anonymises. Pooling four engagements removes
 * the per-project fingerprint while preserving the operational truth.
 *
 * ── WHAT IS DELIBERATELY EXCLUDED ───────────────────────────────────────────
 * All revenue and ROI figures from the source deck are omitted. They were
 * arithmetically impossible — two engagements claimed attributed revenue of
 * 7×–10× the stated total value of the project being sold, and the deck's
 * blended "1,897% average ROI" follows from those same figures. Publishing
 * them anonymised would not reduce the credibility risk, only the legal one.
 *
 * What remains is media-operations performance: lead volume, cost per lead,
 * funnel conversion and ROAS. These are internally consistent across all four
 * engagements, defensible from platform reporting, and are the numbers a
 * developer's CMO actually underwrites against.
 *
 * Source: Case Studies & Portfolio/Zeppstr_Case_Studies.md (results tables only).
 */

interface Stat {
  value: string;
  label: string;
  detail: string;
}

const AGGREGATE: Stat[] = [
  {
    value: "2,625 → 10,148",
    label: "Qualified leads / month",
    detail: "Combined monthly run rate across four developer accounts, entry vs. exit.",
  },
  {
    value: "−34% to −42%",
    label: "Cost per lead",
    detail: "Reduction achieved in every engagement, across two currencies.",
  },
  {
    value: "2.0–2.4× → 3.5–4.1×",
    label: "Return on ad spend",
    detail: "Platform-reported ROAS, inherited baseline vs. steady state.",
  },
  {
    value: "12–22% → 28–35%",
    label: "Lead → site visit",
    detail: "Funnel conversion after tracking, scoring and follow-up were rebuilt.",
  },
];

export function SectorRecord() {
  return (
    <section
      className="bg-emerald-950 text-white"
      aria-labelledby="sector-record-heading"
    >
      <div className="container-layout py-24 md:py-32">
        <div className="grid md:grid-cols-12 gap-8 md:gap-16 mb-16 md:mb-20 items-end">
          <div className="md:col-span-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-yellow mb-6">
              Sector record · Residential real estate
            </p>
            <h2
              id="sector-record-heading"
              /* text-white is explicit: a global heading rule sets a dark ink
                 colour that wins over the section's inherited colour. */
              className="font-display font-extralight tracking-[-0.025em] text-[clamp(32px,4.5vw,60px)] leading-[1.05] max-w-[22ch] text-balance text-white"
            >
              Four developer accounts. Two markets. The same rebuild.
            </h2>
          </div>
          <div className="md:col-span-4">
            <p className="font-body text-body text-white/70 leading-relaxed">
              These engagements were delivered under third-party agreements that
              don&rsquo;t permit us to name the developers. The numbers are pooled
              and reported in aggregate for that reason — and because a single
              anonymised project is rarely anonymous to anyone in the sector.
            </p>
          </div>
        </div>

        <dl className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 border-t border-white/15 pt-14">
          {AGGREGATE.map((s) => (
            <div key={s.label}>
              <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-yellow mb-4">
                {s.label}
              </dt>
              <dd>
                <span className="block font-display font-extralight text-[clamp(26px,2.6vw,38px)] leading-[1.05] tracking-[-0.02em] mb-4">
                  {s.value}
                </span>
                <span className="block font-body text-body-sm text-white/60 leading-relaxed max-w-[32ch]">
                  {s.detail}
                </span>
              </dd>
            </div>
          ))}
        </dl>

        <p className="mt-16 pt-8 border-t border-white/10 font-body text-body-sm text-white/50 max-w-[70ch]">
          Aggregate of four residential developer engagements in Bengaluru and
          Dubai, 8–12 months each. Figures are media-operations metrics taken from
          platform reporting. We don&rsquo;t publish attributed revenue or ROI
          multiples for this work — booking revenue depends on sales-team
          execution and inventory we don&rsquo;t control, and any number we quoted
          would be ours to claim rather than ours to prove.
        </p>
      </div>
    </section>
  );
}
