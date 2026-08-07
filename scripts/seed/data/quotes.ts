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
 * Only verifiable, named testimonials ship. A quote attributed to a job title
 * ("Founder", "Sales Director") rather than a named person is not a testimonial
 * — it is copy written on the client's behalf, and it reads that way to any
 * buyer who has seen a real one.
 *
 * The Wise Market and Tru Aquapolis quotes previously in this file were of that
 * kind and have been removed. To reinstate either, have the client supply and
 * approve the wording in writing, then add it here with a real name and title.
 *
 * Verified source for the Mini Leaves quote below:
 *   Case Studies & Portfolio/Portfolio Zeppstr.pdf — "Client Testimonials".
 *
 * Two further verified testimonials exist in the same PDF and are worth adding
 * once you confirm the speakers are happy to be quoted on the public site:
 *   • Homatico (Founder) — website build, content, SEO
 *   • Mohammed Asif (Founder) — organic + inorganic growth
 */

export const QUOTES: SeedQuote[] = [
  {
    _id: "quote-mini-leaves-founder",
    quoteText:
      "I was looking for a Digital Marketing agency for Mini Leaves and I came across Zeppstr where I got all the services under one roof. I am absolutely satisfied with the services of Product Designing, SEO and Social Media Management. The team is very enthusiastic and creative.",
    attributionName: "Pankaj Singhal",
    attributionTitle: "Founder",
    attributionCompany: "Mini Leaves",
    relatedCaseStudyId: "case-study-mini-leaves",
  },
];
