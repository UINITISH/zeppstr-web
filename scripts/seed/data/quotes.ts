interface SeedQuote {
  _id: string;
  quoteText: string;
  attributionName: string;
  attributionTitle?: string;
  attributionCompany?: string;
  relatedCaseStudyId?: string;
}

/**
 * ── TESTIMONIAL INTEGRITY ───────────────────────────────────────────────────
 * Only testimonials traceable to a source document ship. Nothing here is
 * written on a client's behalf.
 *
 * VERIFIED SOURCE for all four below:
 *   Case Studies & Portfolio/Portfolio Zeppstr.pdf — page 6, "Client
 *   Testimonials". This deck has been used as client-facing collateral, so the
 *   wording is the client's own.
 *
 * ── CORRECTION LOGGED 12 SEP 2026 ───────────────────────────────────────────
 * An earlier version of this file attributed the Mini Leaves quote ("I was
 * looking for a Digital Marketing agency for Mini Leaves…") to Pankaj Singhal.
 * That was wrong. The source deck lays the testimonials out in two columns, and
 * reading it linearly pairs each quote with the wrong signature.
 *
 * In the source:
 *   • the Mini Leaves quote is signed "Minileaves / Founder" — company name,
 *     no person named;
 *   • Pankaj Singhal signs a different quote ("Zeppstr is one stop solution…")
 *     with no company given.
 *
 * Both are reproduced correctly below. Do not "tidy" either by inferring the
 * missing half — a testimonial with an invented name or an invented employer is
 * worse than one with a gap in it.
 *
 * ── WHAT STILL NEEDS CONFIRMING ─────────────────────────────────────────────
 *   1. Pankaj Singhal's company. Unknown. Until it is supplied, the quote
 *      renders with his name and title only.
 *   2. Whether "Homatico" and "Minileaves" will supply a named individual. A
 *      company-signed testimonial is weaker than a named one; worth one email.
 *   3. Mohammed Asif's company. Not stated in the source deck either.
 *
 * Typos in the original ("markiting") are corrected silently; nothing else in
 * the wording has been edited. If a client objects to any of this appearing on
 * the public site, remove the entry — do not paraphrase it.
 */

export const QUOTES: SeedQuote[] = [
  {
    _id: "quote-mini-leaves-founder",
    quoteText:
      "I was looking for a Digital Marketing agency for Mini Leaves and I came across Zeppstr where I got all the services under one roof. I am absolutely satisfied with the services of Product Designing, SEO and Social Media Management. The team is very enthusiastic and creative.",
    // Source signs this "Minileaves / Founder" — no individual named.
    attributionName: "Founder",
    attributionCompany: "Mini Leaves",
    relatedCaseStudyId: "case-study-mini-leaves",
  },
  {
    _id: "quote-homatico-founder",
    quoteText:
      "Working with Zeppstr for our website last 2–3 months. Impressed with their systematic approach and the team. Starting from content creation, website design, image and video selection the team has been of great help to take Homatico website to next level. Thanks Nitish and team for the wonderful work with our website.",
    // Source signs this "Homatico / Founder" — no individual named.
    attributionName: "Founder",
    attributionCompany: "Homatico",
    relatedCaseStudyId: "case-study-homatico",
  },
  {
    _id: "quote-mohammed-asif",
    quoteText:
      "Zeppstr's social media services, Google search engine optimization, and work on various platforms are exceptional. We've experienced significant growth in inquiries and business numbers since engaging with their services. We're delighted to continue our partnership and look forward to exploring additional services with them.",
    attributionName: "Mohammed Asif",
    attributionTitle: "Founder",
    // No company stated in the source deck. Do not guess one.
  },
  {
    _id: "quote-pankaj-singhal",
    quoteText:
      "Zeppstr is one stop solution to your entire digital marketing journey. They are fast, energetic, creative and business oriented. I highly recommend them for your organic and inorganic growth both. Keep up good work.",
    attributionName: "Pankaj Singhal",
    attributionTitle: "Founder",
    // No company stated in the source deck. Do not guess one.
  },
];
