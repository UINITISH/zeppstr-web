import { join } from "node:path";
import { readFileSync } from "node:fs";
import { toPortableText } from "../portable-text";
import { parseSections, getSection } from "../markdown-sections";

/**
 * Case studies — narrative content is parsed from the canonical markdown files
 * in deliverables/content/case-studies/. Metadata (slug, refs, headline metric)
 * is hand-curated below.
 */

interface SeedCaseStudy {
  _id: string;
  clientName: string;
  slug: string;
  industryId: string;
  solutionsUsedIds: string[];
  headlineMetric: string;
  headlineTimeframe: string;
  founderQuoteId?: string;
  publishedAt: string;
  markdownFile: string;
  seoTitle: string;
  seoDescription: string;
}

const CONTENT_ROOT = "deliverables/content/case-studies";

const META: SeedCaseStudy[] = [
  {
    _id: "case-study-wise-market",
    clientName: "Wise Market",
    slug: "wise-market",
    industryId: "industry-ecommerce-dtc",
    solutionsUsedIds: [
      "solution-organic-growth",
      "solution-performance-media",
      "solution-experience-engineering",
    ],
    headlineMetric: "AUD 40K → AUD 2.7M",
    headlineTimeframe: "in 6 months",
    publishedAt: "2024-11-15T09:00:00Z",
    markdownFile: "wise-market.md",
    seoTitle: "Wise Market — 67× Revenue Growth in 6 Months | Zeppstr",
    seoDescription:
      "How Wise Market scaled from AUD 40K to AUD 2.7M in six months by rebuilding the revenue engine end-to-end across organic, paid, and conversion.",
  },
  {
    _id: "case-study-tru-aquapolis",
    clientName: "Tru Aquapolis",
    slug: "tru-aquapolis",
    industryId: "industry-real-estate",
    solutionsUsedIds: [
      "solution-growth-strategy-advisory",
      "solution-performance-media",
      "solution-experience-engineering",
    ],
    headlineMetric: "₹34 Cr+ qualified pipeline on ₹39.7L media",
    headlineTimeframe: "90 days · 85× media-to-pipeline",
    publishedAt: "2026-06-05T09:00:00Z",
    markdownFile: "tru-aquapolis.md",
    seoTitle: "Tru Aquapolis — ₹34 Cr Pipeline on ₹39.7L Media | Zeppstr",
    seoDescription:
      "How a paused, untracked ad account became 1,690 qualified enquiries and ₹34 Cr+ of pipeline in 90 days — at ₹2,348 per in-market luxury buyer in East Bengaluru.",
  },
  {
    _id: "case-study-homatico",
    clientName: "Homatico",
    slug: "homatico",
    industryId: "industry-professional-services",
    solutionsUsedIds: [
      "solution-experience-engineering",
      "solution-organic-growth",
      "solution-brand-engagement-lifecycle",
    ],
    // Client-stated outcome. No numeric claim — they did not give one.
    headlineMetric: "Website rebuilt, then inquiries grew",
    headlineTimeframe: "client-reported · partnership ongoing",
    publishedAt: "2025-06-11T09:00:00Z",
    markdownFile: "homatico.md",
    seoTitle: "Homatico — Website Rebuild, Then Demand | Zeppstr",
    seoDescription:
      "Content, design and video first; SEO and social second. The client reports significant growth in inquiries and business numbers since the engagement began.",
  },
  {
    _id: "case-study-vehiclemall",
    clientName: "VehicleMall",
    slug: "vehiclemall",
    industryId: "industry-saas-tech",
    solutionsUsedIds: ["solution-experience-engineering"],
    headlineMetric: "3 production apps · valuation, auction, custody",
    headlineTimeframe: "mobile + desktop",
    publishedAt: "2025-04-09T09:00:00Z",
    markdownFile: "vehiclemall.md",
    seoTitle: "VehicleMall — Three Apps, One Vehicle Lifecycle | Zeppstr",
    seoDescription:
      "Building valuation, hybrid auction and yard-management applications against a single asset model — for dealers, bidders and finance institutions.",
  },
  {
    _id: "case-study-sky-phonez",
    clientName: "Sky Phonez",
    slug: "sky-phonez",
    industryId: "industry-ecommerce-dtc",
    solutionsUsedIds: [
      "solution-experience-engineering",
    ],
    headlineMetric: "Custom storefront built for SKU depth",
    headlineTimeframe: "Australian market · built ground-up",
    publishedAt: "2025-01-22T09:00:00Z",
    markdownFile: "sky-phonez.md",
    seoTitle: "Sky Phonez — A Storefront Built for SKU Depth | Zeppstr",
    seoDescription:
      "A custom Australian e-commerce build: bespoke UI/UX, integrated commerce, and a product architecture that handles extensive SKU listings without degrading.",
  },
  {
    _id: "case-study-invest-in-sharjah",
    clientName: "Invest in Sharjah",
    slug: "invest-in-sharjah",
    industryId: "industry-professional-services",
    solutionsUsedIds: [
      "solution-organic-growth",
      "solution-experience-engineering",
    ],
    headlineMetric: "#1 for “invest in sharjah”",
    headlineTimeframe: "two head terms at position one",
    publishedAt: "2025-02-18T09:00:00Z",
    markdownFile: "invest-in-sharjah.md",
    seoTitle: "Invest in Sharjah — Owning the Investor Search | Zeppstr",
    seoDescription:
      "How an investment promotion agency took position one for its own mandate as a search term — and for Sharjah free trade zones — by winning a small set of decision-stage queries outright.",
  },
  {
    _id: "case-study-mini-leaves",
    clientName: "Mini Leaves",
    slug: "mini-leaves",
    industryId: "industry-ecommerce-dtc",
    solutionsUsedIds: [
      "solution-brand-engagement-lifecycle",
      "solution-organic-growth",
      "solution-performance-media",
    ],
    // Figures per docs/brand-guidelines.md "proof points" table. Replace with a
    // dated, source-linked figure if you can pull one from the client's analytics.
    headlineMetric: "0.5% → 3%+ conversion · ₹60L+/mo run rate",
    headlineTimeframe: "across multiple cohorts",
    founderQuoteId: "quote-mini-leaves-founder",
    publishedAt: "2024-08-10T09:00:00Z",
    markdownFile: "mini-leaves.md",
    seoTitle: "Mini Leaves — Brand-Led DTC Growth System | Zeppstr",
    seoDescription:
      "How Mini Leaves was engineered into a brand and a revenue system — content, lifecycle, and acquisition operated as one connected practice.",
  },
];

/**
 * Reads each case study's markdown file at seed time and extracts narrative
 * sections into Portable Text. Returns the fully-resolved seed records.
 */
/**
 * Draft case studies awaiting outcome data.
 *
 * Their markdown contains a RESULTS PENDING marker. The situation/diagnosis/
 * thesis sections are written from each client's public positioning and are
 * safe, but no engagement scope or result has been supplied yet.
 *
 * To publish one: fill in "What we did" and "What changed" in its markdown,
 * remove the PENDING markers, add a META entry above, and delete it from this
 * list. The guard in loadCaseStudies() will refuse to seed any file that still
 * contains a PENDING marker, so a half-finished page cannot reach the site.
 */
export const DRAFT_CASE_STUDIES = [
  "prohance.md",
  "empuls.md",
  "fixstars.md",
  "tristar-online.md",
];

export function loadCaseStudies(repoRoot: string) {
  return META.map((m) => {
    const path = join(repoRoot, CONTENT_ROOT, m.markdownFile);
    const sections = parseSections(path);

    // Refuse to publish anything still carrying an unfilled outcome section.
    const raw = readFileSync(path, "utf-8");
    if (/RESULTS PENDING|OUTCOME DATA PENDING/.test(raw)) {
      throw new Error(
        `Refusing to seed "${m.markdownFile}": it still contains a PENDING ` +
          `marker. Fill in "What we did" and "What changed" first.`
      );
    }

    const situation = getSection(sections, "The situation");
    const diagnosis = getSection(sections, "The diagnosis");
    const whatWeDid = getSection(sections, "What we did");
    const results = getSection(sections, "What changed", "Results", "The numbers");
    const whatThisProves = getSection(sections, "What this proves");

    return {
      ...m,
      situation: situation ? toPortableText(situation) : [],
      diagnosis: diagnosis ? toPortableText(diagnosis) : [],
      whatWeDid: whatWeDid ? toPortableText(whatWeDid) : [],
      results: results ? toPortableText(results) : [],
      whatThisProves: whatThisProves ? toPortableText(whatThisProves) : [],
    };
  });
}

export type LoadedCaseStudy = ReturnType<typeof loadCaseStudies>[number];
