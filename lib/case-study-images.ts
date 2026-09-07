/**
 * Local screenshot overrides per case study (keyed by slug).
 *
 * ── RESOLUTION ORDER (see app/(marketing)/work/page.tsx) ────────────────────
 *   1. Sanity `heroImage`            — real project photography, always wins
 *   2. This map                       — a real screenshot in /public/case-screenshots
 *   3. /work-thumb/<slug>             — generated branded thumbnail (fallback)
 *
 * ── WHY THE STOCK PHOTOS WERE REMOVED ───────────────────────────────────────
 * This map previously pointed at generic Unsplash images — a laptop and credit
 * card above "AUD 40K → AUD 2.7M", a stock apartment block above the Tru
 * Aquapolis pipeline figure. Generic stock is the visual language of the
 * commodity-agency positioning the rest of this site argues against, and it
 * actively undercut the numbers it sat above.
 *
 * The generated fallback at /work-thumb/[slug] renders a branded card — client
 * name, headline metric, industry, brand green and yellow — pulled live from
 * Sanity. It is consistent, on-brand, matches the "Atelier Index" system used
 * in the client deliverables, and carries no licensing question. That is a
 * better default than mismatched stock.
 *
 * ── ADDING REAL IMAGERY ─────────────────────────────────────────────────────
 * Two routes, both of which override the fallback automatically:
 *
 *   A. Upload project photography to `heroImage` in Sanity Studio. Preferred.
 *      For Tru Aquapolis the real assets already exist in Drive — "Aquapolis
 *      assets" holds 3D renders, three drone folders and the brand book.
 *
 *   B. Drop a screenshot at /public/case-screenshots/<slug>.jpg (1600px wide)
 *      and add the slug below. Best for clients whose own website is the work.
 *
 * Do not reintroduce stock photography here. If there is no real image, the
 * branded thumbnail is the correct answer.
 */

export const CASE_STUDY_IMAGES: Record<string, string> = {
  // Real screenshots on file. Everything else falls through to /work-thumb.
  "mini-leaves": "/case-screenshots/mini-leaves.jpg",
};

export function getCaseStudyImage(slug: string): string | null {
  return CASE_STUDY_IMAGES[slug] ?? null;
}
