/**
 * Sanity content type TypeScript definitions.
 * Matches schemas in sanity/schemas/.
 *
 * Keep in sync with schema files. For auto-generation,
 * use Sanity's TypeGen CLI: `npx sanity typegen generate`.
 */

import type { PortableTextBlock } from "@portabletext/types";

// ─────────────────────────────────────────────
// Shared primitives
// ─────────────────────────────────────────────

export interface SanitySlug {
  current: string;
  _type: "slug";
}

export interface SanityImage {
  asset: {
    _ref: string;
    _type: "reference";
    url?: string;
  };
  alt?: string;
  hotspot?: { x: number; y: number };
  crop?: { top: number; bottom: number; left: number; right: number };
}

export interface SanityReference {
  _ref: string;
  _type: "reference";
}

export interface SeoFields {
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: SanityImage;
}

export interface FAQ {
  question: string;
  answer: PortableTextBlock[];
}

// ─────────────────────────────────────────────
// 1. Solution
// ─────────────────────────────────────────────

export interface Solution extends SeoFields {
  _id: string;
  _type: "solution";
  name: string;
  slug: SanitySlug;
  tagline?: string;
  heroImage?: SanityImage;
  longDescription?: PortableTextBlock[];
  services?: SubService[];
  relatedIndustries?: Industry[];
  relatedCaseStudies?: CaseStudy[];
}

// ─────────────────────────────────────────────
// 2. Sub-Service
// ─────────────────────────────────────────────

export interface SubService extends SeoFields {
  _id: string;
  _type: "subService";
  name: string;
  slug: SanitySlug;
  parentSolution: Solution;
  legacyName?: string;
  tagline?: string;
  whatsIncluded?: PortableTextBlock[];
  methodology?: PortableTextBlock[];
  faqs?: FAQ[];
  relatedCaseStudy?: CaseStudy;
}

// ─────────────────────────────────────────────
// 3. Industry
// ─────────────────────────────────────────────

/**
 * The six industries that have their own page under /industries.
 * Every one of these resolves to a real route.
 */
export type IndustryPageName =
  | "Healthcare"
  | "SaaS / Tech"
  | "Real Estate"
  | "EdTech / Education"
  | "Professional Services"
  | "E-commerce / D2C";

/**
 * Sectors we work in that do NOT have a page of their own.
 *
 * Added 17 Sep 2026. Vikas corrected three client mappings and two of them —
 * 21 Finance (fintech) and Aishwarya Interiors (interior design) — had been
 * filed under whichever of the six was closest, which meant the site was
 * telling a visitor something untrue about a named client. One of them
 * carried a literal "(?)" in the seed.
 *
 * The taxonomy is coarser than the client list, and forcing every client into
 * six buckets was the actual bug. A card may now display the client's REAL
 * sector while its link still points at the nearest page that exists. Better a
 * true label on a slightly approximate link than a false label on a tidy one.
 *
 * If one of these ever earns a page, promote it to IndustryPageName and give
 * it a route.
 */
/* Not a union of literals any more. A client's real sector is now a free
 * string on clientLogo.sector, because the set of sectors that lack a page
 * grows whenever a client is signed and a hardcoded union means a code change
 * for every one. The earlier union was also dead — nothing ever read it. */
export type SectorLabelOnly = string;

export type IndustryName = IndustryPageName | SectorLabelOnly;

export interface Industry extends SeoFields {
  _id: string;
  _type: "industry";
  name: IndustryName;
  slug: SanitySlug;
  heroImage?: SanityImage;
  heroClaim?: string;
  whatsBroken?: PortableTextBlock[];
  ourApproach?: PortableTextBlock[];
  featuredCaseStudy?: CaseStudy;
  allClientLogos?: ClientLogo[];
  solutionsMostUsed?: Solution[];
  industryFaqs?: FAQ[];
}

// ─────────────────────────────────────────────
// 4. Case Study
// ─────────────────────────────────────────────

export interface BeforeAfterMedia {
  before?: SanityImage;
  after?: SanityImage;
  caption?: string;
}

export interface CaseStudy extends SeoFields {
  _id: string;
  _type: "caseStudy";
  clientName: string;
  slug: SanitySlug;
  industry: Industry;
  solutionsUsed?: Solution[];
  headlineMetric: string;
  headlineTimeframe?: string;
  heroImage?: SanityImage;
  situation?: PortableTextBlock[];
  diagnosis?: PortableTextBlock[];
  whatWeDid?: PortableTextBlock[];
  results?: PortableTextBlock[];
  whatThisProves?: PortableTextBlock[];
  founderQuote?: Quote;
  beforeAfterMedia?: BeforeAfterMedia[];
  publishedAt?: string;
}

// ─────────────────────────────────────────────
// 5. Article (Insight)
// ─────────────────────────────────────────────

export type ArticleCategory =
  | "growth-strategy"
  | "seo-search"
  | "performance-paid"
  | "conversion-experience"
  | "email-lifecycle"
  | "social-content"
  | "industry-insights";

export interface Article extends SeoFields {
  _id: string;
  _type: "article";
  title: string;
  slug: SanitySlug;
  excerpt?: string;
  heroImage?: SanityImage;
  author: string;
  category: ArticleCategory;
  body?: PortableTextBlock[];
  publishedAt: string;
  relatedSolution?: Solution;
  relatedIndustry?: Industry;
}

// ─────────────────────────────────────────────
// 6. Quote
// ─────────────────────────────────────────────

export interface Quote {
  _id: string;
  _type: "quote";
  quoteText: string;
  attributionName: string;
  attributionTitle?: string;
  attributionCompany?: string;
  attributionPhoto?: SanityImage;
  relatedCaseStudy?: CaseStudy;
}

// ─────────────────────────────────────────────
// 7. Client Logo
// ─────────────────────────────────────────────

export type ClientLogoStatus = "flagship" | "active" | "past";

export interface ClientLogo {
  _id: string;
  _type: "clientLogo";
  clientName: string;
  logo: SanityImage;
  /** Grouping key — which industry page this logo is listed on. Not a claim
   *  about what the client actually does; see `sector`. */
  industry?: Industry;
  /** The client's real sector, set only when it has no industry page of its
   *  own (Fintech, Interior Design). Prefer this over industry.name for any
   *  label shown to a visitor. */
  sector?: string;
  status: ClientLogoStatus;
  website?: string;
}

// ─────────────────────────────────────────────
// 8. Client Project (internal dashboard)
// ─────────────────────────────────────────────

export type ProjectPhase = "Diagnose" | "Architect" | "Deploy" | "Operate";
export type ProjectHealth = "On Track" | "At Risk" | "Blocked" | "Completed";

export interface ProjectKpi {
  label: string;
  value: string;
  trend?: "up" | "down" | "flat";
}

export interface ClientProject {
  _id: string;
  _type: "clientProject";
  _updatedAt: string;
  name: string;
  phase: ProjectPhase;
  health: ProjectHealth;
  percentComplete?: number;
  owner?: string;
  startDate?: string;
  nextMilestone?: string;
  nextMilestoneDate?: string;
  kpis?: ProjectKpi[];
  notes?: string;
}
