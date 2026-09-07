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
/**
 * Articles withheld from publication.
 *
 * These four essays were seeded to Sanity before being pulled at the founder's
 * instruction. Removing them from scripts/seed/data/articles.ts stops the seed
 * re-creating them, but the seed is upsert-only — it never deletes — so the
 * documents stayed in the dataset and kept rendering on /insights, the homepage
 * "Field Notes" block, and their own detail pages.
 *
 * Rather than depend on `npm run seed:prune -- --apply` having been run, every
 * article query below excludes them explicitly. The site is correct regardless
 * of dataset state.
 *
 * To republish one: delete its slug from this list AND move its entry back into
 * META in scripts/seed/data/articles.ts.
 */
export const WITHHELD_ARTICLE_SLUGS = [
  "creative-concentration",
  "revenue-claims-that-fail-arithmetic",
  "zero-conversions-147-leads",
  "win-four-searches-completely",
] as const;

/** GROQ fragment: drop withheld articles from any article filter. */
const NOT_WITHHELD = `!(slug.current in ${JSON.stringify([...WITHHELD_ARTICLE_SLUGS])})`;

export const allArticlesQuery = groq`
  *[_type == "article" && ${NOT_WITHHELD}] | order(publishedAt desc) {
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
  *[_type == "article" && category == $category && ${NOT_WITHHELD}] | order(publishedAt desc) {
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
  *[_type == "article" && ${NOT_WITHHELD}] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    excerpt,
    // category was missing here, so ArticleCard on the homepage fell back to a
    // default: all three covers rendered identical green with a generic
    // "INSIGHTS" label, while /insights showed the correct per-category colour
    // and name. The generated cover art is keyed on this field.
    category,
    author,
    heroImage { ${imageFragment} },
    publishedAt
  }
`;

/** Single article by slug */
export const articleBySlugQuery = groq`
  *[_type == "article" && slug.current == $slug && ${NOT_WITHHELD}][0] {
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

/** Approved comments for an article, oldest first (thread reads top-down) */
export const approvedCommentsQuery = groq`
  *[_type == "comment" && approved == true && article._ref == $articleId]
    | order(createdAt asc) {
    _id,
    name,
    body,
    createdAt
  }
`;

/** Sibling articles in the same category, excluding the current one */
export const relatedArticlesQuery = groq`
  *[_type == "article" && category == $category && slug.current != $slug && ${NOT_WITHHELD}]
    | order(publishedAt desc) [0...3] {
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
  "articles": *[_type == "article" && ${NOT_WITHHELD}]{ "slug": slug.current, publishedAt }
}
`;
