import { join } from "node:path";
import { readFileSync } from "node:fs";
import { toPortableText } from "../portable-text";

/**
 * Insights / articles.
 *
 * Body copy is parsed from markdown in deliverables/content/insights/.
 * Metadata (slug, category, SEO) is hand-curated below.
 *
 * ── SOURCING NOTE ───────────────────────────────────────────────────────────
 * These are written from Zeppstr's own engagement data — the Tru Aquapolis
 * account (Mar–May 2026) and the Invest in Sharjah search programme. Every
 * figure quoted appears in the corresponding case study and is traceable to
 * platform reporting.
 *
 * The "Zeppstr Blogs List" sheet was reviewed as a source and rejected: its
 * "Ready Articles" tab holds 29 topic titles with zero published rows
 * (Article Live = TRUE on none, no URLs), no body copy in any column, and
 * the topics are 2023 trend round-ups that would date the site badly.
 * Use that sheet as a production tracker, not a content store.
 */

const CONTENT_ROOT = "deliverables/content/insights";

type Category =
  | "growth-strategy"
  | "seo-search"
  | "performance-paid"
  | "conversion-experience"
  | "industry-insights";

interface SeedArticle {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  category: Category;
  publishedAt: string;
  markdownFile: string;
  relatedSolutionId?: string;
  seoTitle: string;
  seoDescription: string;
}

const META: SeedArticle[] = [
  {
    _id: "article-creative-concentration",
    title:
      "Eighty-six percent of your leads come from five ads. The skill is deleting the rest.",
    slug: "creative-concentration",
    excerpt:
      "Thirty-three creatives tested, two survived, and a single static floor-plan image delivered 440 leads at 37% below the blended average. The discipline was never making it — it was retiring the others.",
    author: "Nitish Kumar",
    category: "performance-paid",
    publishedAt: "2026-07-08T09:00:00Z",
    markdownFile: "creative-concentration.md",
    relatedSolutionId: "solution-performance-media",
    seoTitle: "Creative Concentration: Why 5 Ads Carry Your Account",
    seoDescription:
      "86% of leads came from five creatives. Why retiring underperformers matters more than making new ones — and why retainer economics discourage it.",
  },
  {
    _id: "article-revenue-claims-arithmetic",
    title:
      "If your agency's case study claims more revenue than the project was worth, stop reading it",
    slug: "revenue-claims-that-fail-arithmetic",
    excerpt:
      "A one-minute test for any agency deck: divide claimed revenue by the total value of what was being sold. We reviewed one claiming ₹4,555 Cr on a ₹450 Cr project.",
    author: "Nitish Kumar",
    category: "growth-strategy",
    publishedAt: "2026-07-22T09:00:00Z",
    markdownFile: "revenue-claims-that-fail-arithmetic.md",
    relatedSolutionId: "solution-growth-strategy-advisory",
    seoTitle: "The Revenue Claim Test for Agency Case Studies",
    seoDescription:
      "How impossible ROI claims get built from defensible-sounding estimates, what they cost you with a CFO buyer, and what to claim instead.",
  },
  {
    _id: "article-zero-conversions",
    title:
      "Zero conversions on the platform, 147 in the CRM: what a broken account actually looks like",
    slug: "zero-conversions-147-leads",
    excerpt:
      "The most expensive failure in paid media is invisible from the dashboard. Spend looks normal, impressions look normal, and Smart Bidding is optimising against nothing.",
    author: "Nitish Kumar",
    category: "conversion-experience",
    publishedAt: "2026-06-17T09:00:00Z",
    markdownFile: "zero-conversions-147-leads.md",
    relatedSolutionId: "solution-experience-engineering",
    seoTitle: "Broken Conversion Tracking: The Invisible Ad Spend Leak",
    seoDescription:
      "Zero platform conversions against 147 in the CRM. Why adding budget before fixing tracking compounds the waste — and the repair sequence that worked.",
  },
  {
    _id: "article-win-four-searches",
    title: "Win four searches completely, or a hundred partially. Not both.",
    slug: "win-four-searches-completely",
    excerpt:
      "For high-value, low-volume query sets, position four isn't 40% of position one — it's close to nothing. Why owning a handful of terms beats ranking broadly.",
    author: "Nitish Kumar",
    category: "seo-search",
    publishedAt: "2026-08-01T09:00:00Z",
    markdownFile: "win-four-searches-completely.md",
    relatedSolutionId: "solution-organic-growth",
    seoTitle: "Own Four Searches, Not a Hundred | Zeppstr",
    seoDescription:
      "When a single conversion is worth more than a thousand visitors, traffic growth is the wrong target. Three tests to know if this applies to you.",
  },
];

/** Reads each article's markdown and converts the body to Portable Text. */
export function loadArticles(repoRoot: string) {
  return META.map((m) => {
    const path = join(repoRoot, CONTENT_ROOT, m.markdownFile);
    const raw = readFileSync(path, "utf-8");
    // Drop the H1 — the title lives in the `title` field, not the body.
    const body = raw.replace(/^#\s+.*\n/, "").trim();
    return { ...m, body: toPortableText(body) };
  });
}

export type LoadedArticle = ReturnType<typeof loadArticles>[number];
