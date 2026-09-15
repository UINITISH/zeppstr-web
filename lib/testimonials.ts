import type { TestimonialItem } from "@/components/blocks/Testimonials";

/**
 * Client testimonials — held in code, not in Sanity.
 *
 * ── WHY THESE MOVED OUT OF THE CMS ──────────────────────────────────────────
 * They were seeded documents, which meant three things went wrong at once:
 *
 *   1. Only one of the four appeared on the site, because the seed had not been
 *      re-run since the other three were written.
 *   2. The one that did appear carried the WRONG attribution, because it was a
 *      stale document from an earlier seed.
 *   3. A wildcard query briefly published fabricated testimonials that an early
 *      seed had written into the dataset and that were never deleted from it.
 *
 * Testimonials are a handful of fixed sentences that change maybe twice a year.
 * Putting them behind a CMS bought nothing and cost correctness. They live here
 * now: what is in this file is what renders, immediately, with no publish step.
 *
 * ── SOURCE ──────────────────────────────────────────────────────────────────
 * All four are transcribed from "Client Testimonials", page 6 of
 * Case Studies & Portfolio/Portfolio Zeppstr.pdf — client-facing collateral, so
 * the wording is the client's own.
 *
 * ── ATTRIBUTION, AND THE TRAP IN THE SOURCE ─────────────────────────────────
 * The source lays the four quotes out in two columns. Read top-to-bottom it
 * pairs every quote with the wrong signature — which is exactly the error that
 * put Pankaj Singhal's name on the Mini Leaves quote for weeks. Confirmed by
 * Vikas on 13 Sep 2026: Mini Leaves and Pankaj Singhal are different clients.
 *
 * Two quotes are signed by a company with no individual named, and two are
 * signed by an individual with no company named. Both gaps are in the source.
 * DO NOT fill either in by inference — a testimonial with an invented name or
 * an invented employer is worse than one with a visible gap.
 *
 * Typos in the original ("markiting") are corrected. Nothing else is edited. If
 * a client objects to appearing here, delete the entry — do not paraphrase it.
 */
export const TESTIMONIALS: TestimonialItem[] = [
  {
    _id: "quote-mini-leaves",
    quoteText:
      "I was looking for a Digital Marketing agency for Mini Leaves and I came across Zeppstr where I got all the services under one roof. I am absolutely satisfied with the services of Product Designing, SEO and Social Media Management. The team is very enthusiastic and creative.",
    // Source signs this "Minileaves / Founder" — no individual named.
    attributionName: "Founder",
    attributionCompany: "Mini Leaves",
    relatedCaseStudySlug: "mini-leaves",
  },
  {
    _id: "quote-homatico",
    quoteText:
      "Working with Zeppstr for our website last 2–3 months. Impressed with their systematic approach and the team. Starting from content creation, website design, image and video selection the team has been of great help to take Homatico website to next level. Thanks Nitish and team for the wonderful work with our website.",
    // Source signs this "Homatico / Founder" — no individual named.
    attributionName: "Founder",
    attributionCompany: "Homatico",
    relatedCaseStudySlug: "homatico",
  },
  {
    _id: "quote-mohammed-asif",
    quoteText:
      "Zeppstr's social media services, Google search engine optimization, and work on various platforms are exceptional. We've experienced significant growth in inquiries and business numbers since engaging with their services. We're delighted to continue our partnership and look forward to exploring additional services with them.",
    attributionName: "Mohammed Asif",
    attributionTitle: "Founder",
    // No company stated in the source. Do not guess one.
  },
  {
    _id: "quote-pankaj-singhal",
    quoteText:
      "Zeppstr is one stop solution to your entire digital marketing journey. They are fast, energetic, creative and business oriented. I highly recommend them for your organic and inorganic growth both. Keep up good work.",
    attributionName: "Pankaj Singhal",
    attributionTitle: "Founder",
    // No company stated in the source. Do not guess one.
  },
];
