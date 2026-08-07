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

export type IndustryName =
  | "Healthcare"
  | "SaaS / Tech"
  | "Real Estate"
  | "EdTech / Education"
  | "Professional Services"
  | "E-commerce / D2C";

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
  industry?: Industry;
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
