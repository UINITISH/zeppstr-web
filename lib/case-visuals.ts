/**
 * Per-case-study stat bands and chart data.
 *
 * ── SOURCING RULE — THE ONLY ONE THAT MATTERS HERE ──────────────────────────
 * Every figure below is lifted from the prose ALREADY PUBLISHED on that case
 * study's own page. Nothing is computed, rounded up, extrapolated, or filled
 * in from a client deck that is not on the site. If a number is in this file,
 * you can scroll down that same page and read the sentence it came from.
 *
 * This matters more here than anywhere else on the site. A number set in 76px
 * type inside a chart carries far more weight than the same number inside a
 * paragraph — a reader treats it as the headline claim. So the bar for putting
 * one here is that it is already load-bearing in the narrative.
 *
 * Where a case has no hard figures (Homatico is client-reported and carries
 * none), it gets NO stat band and NO chart with numbers on it. It gets a
 * qualitative diagram instead. Manufacturing three plausible percentages to
 * fill a layout is precisely the failure this codebase has spent weeks
 * cleaning up.
 *
 * ── TRU AQUAPOLIS — provenance of each figure ───────────────────────────────
 *   ₹1.4 Cr media / ₹187.5 Cr closed / 75 units — headline + /work index
 *   0 platform conversions vs 147 in CRM (February) — "The diagnosis"
 *   ₹6.5L February Google spend, 70% to one brand campaign, ₹101 CPC — same
 *   21.4 lakh reach at ₹0.58 per person — "What we did", move i
 *   5.83% CTR on UHI · 4BHK · Whitefield — "What we did", move ii
 *   33 Meta creatives tested, 2 survived — "What we did", move iii
 *
 * ── AQUAPOLIS NDA ───────────────────────────────────────────────────────────
 * The agreed figures above may be published — they already are. The underlying
 * CRM records must not be reproduced, quoted or screenshotted. Nothing in this
 * file goes beyond what the page already states.
 */

export interface CaseStat {
  value: string;
  label: string;
  /** Optional qualifier printed small beneath the label. */
  note?: string;
}

export interface CaseVisuals {
  /** Stat band under the hero. Omit entirely when there are no hard figures. */
  stats?: CaseStat[];
  /** Which chart component to render, by key. See components/work/CaseCharts.tsx */
  chart?: "attribution-gap" | "creative-funnel" | "product-surface";
  /** One line printed above the chart, explaining what it shows. */
  chartCaption?: string;
}

export const CASE_VISUALS: Record<string, CaseVisuals> = {
  "tru-aquapolis": {
    stats: [
      { value: "₹187.5 Cr", label: "Closed from leads we generated", note: "Jan–Aug 2026" },
      { value: "₹1.4 Cr", label: "Total media investment", note: "the whole eight months" },
      { value: "75", label: "Apartments sold", note: "3 & 4 BHK premium" },
      /* NOTE: deliberately NOT ₹0.58 CPM or the 4.30% CTR. Both already appear
         in the before/after table lower down the page (lib/case-study-metrics.ts).
         This band is the COMMERCIAL outcome; that table is the media mechanics.
         Repeating a figure in two treatments on one page makes both look like
         padding. */
      { value: "21.4 lakh", label: "Bengaluru residents reached", note: "brand layer, before chasing leads" },
    ],
    chart: "attribution-gap",
    chartCaption:
      "February, before we touched the account: the ad platform recorded zero conversions while the CRM held 147. Smart Bidding was optimising against nothing.",
  },

  vehiclemall: {
    /**
     * No revenue figures are published for VehicleMall, so none appear here.
     * The deliverable was product surface area, which is what the diagram
     * shows. "3 production apps · valuation, auction, custody · mobile +
     * desktop" is the headline metric on the /work index — it is a scope
     * claim, not a performance claim, and it is presented as one.
     */
    stats: [
      { value: "3", label: "Production applications", note: "valuation · auction · custody" },
      { value: "2", label: "Platforms shipped", note: "mobile and desktop" },
    ],
    chart: "product-surface",
    chartCaption:
      "Three applications sharing one valuation engine — the reason a car can move from appraisal to auction to custody without being re-entered.",
  },

  /**
   * HOMATICO — deliberately minimal.
   *
   * The published outcome is "Website rebuilt, then inquiries grew", qualified
   * on the /work index as "client-reported · partnership ongoing". Client-
   * reported means we did not measure it. There is therefore no honest number
   * to chart, and no stat band. The page keeps its narrative and gets a
   * qualitative before/after diagram with no axis values.
   *
   * If Homatico ever shares analytics we are permitted to publish, add stats
   * here and switch the chart. Until then this stays empty — and the empty
   * state is the point, not an oversight.
   */
  homatico: {
    chart: "creative-funnel",
    chartCaption:
      "The rebuild sequence. Inquiry growth here is client-reported, so this shows the order of work rather than a measured result.",
  },
};

export function getCaseVisuals(slug: string): CaseVisuals | null {
  return CASE_VISUALS[slug] ?? null;
}
