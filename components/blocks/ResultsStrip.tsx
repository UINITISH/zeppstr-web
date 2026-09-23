import Link from "next/link";

/**
 * ResultsStrip — outcome-led 3-stat block.
 *
 * The page's quietest-loudest moment for proof. Three flagship case-study
 * outcomes rendered as oversized extralight numerals with a one-line
 * caption beneath each. Hairline dividers between columns.
 *
 * Editorial tone — same display extralight system used across the page.
 */

const RESULTS = [
  {
    figure: "67×",
    metric: "Revenue lift",
    detail: "AUD 40K → AUD 2.7M in 6 months",
    client: "Wise Market — Australian e-commerce",
  },
  {
    figure: "6×",
    metric: "Conversion rate",
    detail: "0.5% → 3%+ — ₹60L+/month run rate",
    client: "Mini Leaves — Indian DTC consumer brand",
  },
  {
    // Was: "22M+ / Demand reach / Into 3 premium flats sold direct from
    // generated leads". Replaced 19 Aug 2026 for two reasons.
    //
    // 1. It contradicted the case study two sections below, which reports
    //    1,690 qualified enquiries and ₹34 Cr+ of pipeline. Two different
    //    claims about the same client on the same page, with the weaker one
    //    appearing first.
    // 2. "3 premium flats sold direct" is not traceable to any source document
    //    in the archive. Booking counts depend on the client's sales team and
    //    inventory, which is not ours to claim — see the editorial standards in
    //    docs/CHANGELOG-2026-08-05.md.
    //
    // UPDATED 11 Sep 2026. The 85× figure above was the 90-day interim, with
    // pipeline modelled at a 1% close rate. The full Jan–Aug engagement closed
    // out well ahead of that estimate: ₹1.4 Cr media, 6,000+ leads, 75 units at
    // a ₹2.5 Cr average = ₹187.5 Cr in *closed* sales, not modelled pipeline.
    //
    // "Closed from our leads" rather than "we generated ₹187.5 Cr" — TRU's own
    // sales team closed every unit, and claiming the whole chain is what makes
    // numbers this size unbelievable. The case study carries the full funnel
    // arithmetic so the ratio can be checked.
    figure: "75 units",
    metric: "Closed from our leads",
    detail: "₹1.4 Cr of media → ₹187.5 Cr in closed sales, Jan–Aug 2026",
    client: "Tru Aquapolis — Indian premium real estate",
  },
];

export function ResultsStrip() {
  return (
    <section
      className="bg-bg-primary border-t border-ink-headline/10"
      aria-labelledby="results-heading"
    >
      <div className="container-layout py-24 md:py-32">
        {/* Editorial header */}
        <div className="grid md:grid-cols-12 gap-8 md:gap-16 mb-16 md:mb-20 items-end">
          <div className="md:col-span-9">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-6">
              Results
            </p>
            <h2
              id="results-heading"
              className="font-bold tracking-[-0.025em] text-display-xl text-ink-headline leading-[1.02] max-w-[16ch] text-balance"
            >
              What the{" "}
              <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">system</span>{" "}
              produces.
            </h2>
          </div>
          <div className="md:col-span-3 md:text-right">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted leading-relaxed">
              <span className="inline-block w-1.5 h-1.5 bg-brand-yellow mr-2 align-middle" />
              Documented · Repeatable · Compounding
            </p>
          </div>
        </div>

        {/* 3-column results grid */}
        <ol className="grid md:grid-cols-3 border-t border-ink-headline/15">
          {RESULTS.map((r, i) => (
            <li
              key={r.figure}
              className={`relative py-12 md:py-16 flex flex-col ${
                i > 0 ? "md:border-l border-ink-headline/15 md:pl-10" : ""
              } md:pr-10 border-b md:border-b-0 border-ink-headline/15`}
            >
              {/* Yellow accent square */}
              <span
                aria-hidden="true"
                className="block w-3 h-3 bg-brand-yellow mb-6"
              />

              {/* Big numeral */}
              <p className="font-display font-extralight text-display-stat leading-[0.9] tracking-[-0.04em] text-ink-headline mb-6">
                {r.figure}
              </p>

              {/* Metric label */}
              <p className="font-display font-light text-display-sm tracking-[-0.01em] text-ink-headline leading-[1.2] mb-3">
                {r.metric}
              </p>

              {/* Detail */}
              <p className="font-body text-body text-ink-body leading-[1.5] max-w-[34ch]">
                {r.detail}
              </p>

              {/* Client attribution — pinned to bottom for cross-column alignment */}
              <p className="mt-auto pt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
                {r.client}
              </p>
            </li>
          ))}
        </ol>

      </div>
    </section>
  );
}
