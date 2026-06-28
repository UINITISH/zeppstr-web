import { join } from "node:path";
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
    founderQuoteId: "quote-wise-market-founder",
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
    headlineMetric: "31-campaign account architecture",
    headlineTimeframe: "across launch",
    founderQuoteId: "quote-tru-aquapolis-founder",
    publishedAt: "2024-09-22T09:00:00Z",
    markdownFile: "tru-aquapolis.md",
    seoTitle: "Tru Aquapolis — Project Launch Marketing Architecture | Zeppstr",
    seoDescription:
      "How a 31-campaign account architecture turned an underperforming Aquapolis project launch into qualified site visits and a healthy bookings pipeline.",
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
    headlineMetric: "Brand-led DTC growth",
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
export function loadCaseStudies(repoRoot: string) {
  return META.map((m) => {
    const path = join(repoRoot, CONTENT_ROOT, m.markdownFile);
    const sections = parseSections(path);

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
