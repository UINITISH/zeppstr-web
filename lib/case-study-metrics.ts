/**
 * Structured metrics for case-study detail-page visualizations.
 *
 * Keyed by case-study slug. Kept in code (not Sanity) so the charts version
 * with the app and need no schema change. Values are the DEFENSIBLE operational
 * metrics from the source deck — lead volume, cost-per-lead, conversion, ROAS,
 * channel mix. The non-credible revenue/ROI figures are intentionally excluded.
 *
 * The detail page renders a "By the numbers" section from this data when an
 * entry exists for the current slug; otherwise it renders nothing extra.
 */

export interface StatDelta {
  label: string;
  before: string;
  after: string;
  /** e.g. "+340%", "−42%" — sign drives up/down styling. */
  delta: string;
  /** true when the delta is an improvement even though the number went down (e.g. cost). */
  goodWhenLower?: boolean;
}

export interface SeriesPoint {
  label: string;
  value: number;
}

export interface CaseStudyMetrics {
  /** Headline before→after deltas rendered as a stat band. */
  stats: StatDelta[];
  /** Optional month-by-month series → column chart. */
  leadProgression?: { unit: string; points: SeriesPoint[] };
  /** Channel contribution (% of leads) → horizontal bar chart. */
  channelMix?: SeriesPoint[];
}

export const CASE_STUDY_METRICS: Record<string, CaseStudyMetrics> = {
  // ── Live case studies (already seeded) ──
  "wise-market": {
    stats: [
      { label: "Monthly revenue", before: "AUD 40K", after: "AUD 2.7M", delta: "+67×" },
      { label: "Organic keywords ranked", before: "~0", after: "12,300", delta: "+12,300" },
      { label: "Referring domains", before: "~0", after: "3,900", delta: "+3,900" },
      { label: "Peak-month return", before: "AUD 360K spend", after: "AUD 1.24M", delta: "3.4× ROAS" },
    ],
  },

  "tru-aquapolis": {
    stats: [
      { label: "Qualified leads (April)", before: "—", after: "377", delta: "₹3,117 CPL" },
      { label: "Google CTR", before: "2–3% benchmark", after: "4.30%", delta: "above benchmark" },
      { label: "Awareness cost / person", before: "₹1.50–3.00", after: "₹0.58", delta: "−80%", goodWhenLower: true },
      { label: "Best-campaign CPL", before: "target", after: "₹2,169", delta: "−28%", goodWhenLower: true },
    ],
  },

  // ── Real-estate case studies (pending seed) ──




};

export function getCaseStudyMetrics(slug: string): CaseStudyMetrics | null {
  return CASE_STUDY_METRICS[slug] ?? null;
}
