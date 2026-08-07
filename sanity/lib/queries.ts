import { groq } from "next-sanity";

/**
 * GROQ query library.
 *
 * Naming convention:
 *  - all*Query   → list of items
 *  - *BySlugQuery → single item by slug
 *  - featured*Query → curated subset
 *
 * All queries use projection to limit payload — never `*[]` without projection.
 */

// ─────────────────────────────────────────────
// Reusable projection fragments
// ─────────────────────────────────────────────

const seoFragment = groq`
  seoTitle,
  seoDescription,
  ogImage
`;

const imageFragment = groq`
  ...,
  asset->{
    _id,
    url,
    metadata { dimensions, lqip }
  }
`;

const solutionMinimalFragment = groq`
  _id,
  name,
  slug,
  tagline
`;

const subServiceMinimalFragment = groq`
  _id,
  name,
  slug,
  legacyName,
  tagline,
  parentSolution->{
    _id,
    name,
    slug
  }
`;

const industryMinimalFragment = groq`
  _id,
  name,
  slug,
  heroClaim
`;

const caseStudyMinimalFragment = groq`
  _id,
  clientName,
  slug,
  headlineMetric,
  headlineTimeframe,
  heroImage { ${imageFragment} },
  industry->{ _id, name, slug }
`;

const clientLogoFragment = groq`
  _id,
  clientName,
  logo { ${imageFragment} },
  status,
  website,
  industry->{ _id, name, slug }
`;

// ─────────────────────────────────────────────
// SOLUTIONS
// ─────────────────────────────────────────────

/** All Solutions for nav mega-menu + Solutions hub index */
export const allSolutionsQuery = groq`
  *[_type == "solution"] | order(name asc) {
    ${solutionMinimalFragment},
    "subServices": *[_type == "subService" && parentSolution._ref == ^._id] | order(name asc) {
      ${subServiceMinimalFragment}
    }
  }
`;

/** Single Solution by slug — for /solutions/[slug] hub page */
export const solutionBySlugQuery = groq`
  *[_type == "solution" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    tagline,
    heroImage { ${imageFragment} },
    longDescription,
    "services": *[_type == "subService" && parentSolution._ref == ^._id] | order(name asc) {
      ${subServiceMinimalFragment}
    },
    relatedIndustries[]->{ ${industryMinimalFragment} },
    relatedCaseStudies[]->{ ${caseStudyMinimalFragment} },
    ${seoFragment}
  }
`;

/** Single Sub-service by parent slug + sub-service slug */
export const subServiceBySlugQuery = groq`
  *[_type == "subService" && slug.current == $slug && parentSolution->slug.current == $parent][0] {
    _id,
    name,
    slug,
    legacyName,
    tagline,
    parentSolution->{
      _id,
      name,
      slug
    },
    whatsIncluded,
    methodology,
    faqs,
    relatedCaseStudy->{ ${caseStudyMinimalFragment} },
    ${seoFragment}
  }
`;

// ─────────────────────────────────────────────
// INDUSTRIES
// ─────────────────────────────────────────────

/** All Industries for nav + index page */
export const allIndustriesQuery = groq`
  *[_type == "industry"] | order(name asc) {
    ${industryMinimalFragment},
    heroImage { ${imageFragment} }
  }
`;

/** Single Industry by slug */
export const industryBySlugQuery = groq`
  *[_type == "industry" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    heroImage { ${imageFragment} },
    heroClaim,
    whatsBroken,
    ourApproach,
    featuredCaseStudy->{ ${caseStudyMinimalFragment}, founderQuote->{ quoteText, attributionName, attributionTitle, attributionCompany } },
    "allClientLogos": *[_type == "clientLogo" && industry._ref == ^._id] | order(status asc, clientName asc) {
      ${clientLogoFragment}
    },
    solutionsMostUsed[]->{ ${solutionMinimalFragment} },
    industryFaqs,
    ${seoFragment}
  }
`;

// ─────────────────────────────────────────────
// CASE STUDIES (WORK)
// ─────────────────────────────────────────────

/** All case studies for /work index */
export const allCaseStudiesQuery = groq`
  *[_type == "caseStudy"] | order(publishedAt desc) {
    ${caseStudyMinimalFragment}
  }
`;

/** Featured case studies for Home page (top 3 flagship) */
export const featuredCaseStudiesQuery = groq`
  *[_type == "caseStudy" && _id in *[_type == "clientLogo" && status == "flagship"].industry._ref] | order(publishedAt desc) [0...3] {
    ${caseStudyMinimalFragment}
  }
`;

/** Single case study by slug */
export const caseStudyBySlugQuery = groq`
  *[_type == "caseStudy" && slug.current == $slug][0] {
    _id,
    clientName,
    slug,
    industry->{ _id, name, slug, heroClaim },
    solutionsUsed[]->{ ${solutionMinimalFragment} },
    headlineMetric,
    headlineTimeframe,
    heroImage { ${imageFragment} },
    situation,
    diagnosis,
    whatWeDid,
    results,
    whatThisProves,
    founderQuote->{
      quoteText,
      attributionName,
      attributionTitle,
      attributionCompany,
      attributionPhoto { ${imageFragment} }
    },
    beforeAfterMedia[] {
      before { ${imageFragment} },
      after { ${imageFragment} },
      caption
    },
    publishedAt,
    ${seoFragment}
  }
`;

// ─────────────────────────────────────────────
// ARTICLES (INSIGHTS)
// ─────────────────────────────────────────────

/** All articles for /insights index */
export const allArticlesQuery = groq`
  *[_type == "article"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    heroImage { ${imageFragment} },
    author,
    category,
    publishedAt
  }
`;

/** Articles by category (for filter views) */
export const articlesByCategoryQuery = groq`
  *[_type == "article" && category == $category] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    heroImage { ${imageFragment} },
    author,
    category,
    publishedAt
  }
`;

/** Recent articles (for home page teaser) */
export const recentArticlesQuery = groq`
  *[_type == "article"] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    excerpt,
    heroImage { ${imageFragment} },
    publishedAt
  }
`;

/** Single article by slug */
export const articleBySlugQuery = groq`
  *[_type == "article" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    heroImage { ${imageFragment} },
    author,
    category,
    body,
    publishedAt,
    relatedSolution->{ ${solutionMinimalFragment} },
    relatedIndustry->{ ${industryMinimalFragment} },
    ${seoFragment}
  }
`;

// ─────────────────────────────────────────────
// CLIENT LOGOS
// ─────────────────────────────────────────────

/** All client logos for trust strip */
export const allClientLogosQuery = groq`
  *[_type == "clientLogo"] | order(status asc, clientName asc) {
    ${clientLogoFragment}
  }
`;

/** Featured client logos for Home (status == "flagship") */
export const featuredClientLogosQuery = groq`
  *[_type == "clientLogo" && status in ["flagship", "active"]] | order(status asc, clientName asc) [0...12] {
    ${clientLogoFragment}
  }
`;

// ─────────────────────────────────────────────
// CLIENT PROJECTS (internal dashboard)
// ─────────────────────────────────────────────

/** All ongoing client projects for /dashboard */
export const allClientProjectsQuery = groq`
  *[_type == "clientProject"] | order(name asc) {
    _id,
    _updatedAt,
    name,
    phase,
    health,
    percentComplete,
    owner,
    startDate,
    nextMilestone,
    nextMilestoneDate,
    kpis[] { label, value, trend },
    notes
  }
`;

// ─────────────────────────────────────────────
// SITEMAP
// ─────────────────────────────────────────────

/** All slugs for sitemap.ts (lightweight) */
export const sitemapQuery = groq`
{
  "solutions": *[_type == "solution"]{ "slug": slug.current },
  "subServices": *[_type == "subService"]{
    "slug": slug.current,
    "parentSlug": parentSolution->slug.current
  },
  "industries": *[_type == "industry"]{ "slug": slug.current },
  "caseStudies": *[_type == "caseStudy"]{ "slug": slug.current, publishedAt },
  "articles": *[_type == "article"]{ "slug": slug.current, publishedAt }
}
`;
