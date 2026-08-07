import type { MetadataRoute } from "next";
import { sanity } from "@/sanity/lib/client";
import { sitemapQuery } from "@/sanity/lib/queries";
import { SITE_URL } from "@/lib/seo/jsonld";

interface SitemapData {
  solutions: { slug: string }[];
  subServices: { slug: string; parentSlug: string }[];
  industries: { slug: string }[];
  caseStudies: { slug: string; publishedAt?: string }[];
  articles: { slug: string; publishedAt?: string }[];
}

/**
 * Dynamic sitemap.xml — combines static routes with all Sanity content.
 * Revalidated on Sanity content publish via the "sitemap" cache tag.
 */
export const revalidate = 3600; // hourly fallback

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  let data: SitemapData = {
    solutions: [],
    subServices: [],
    industries: [],
    caseStudies: [],
    articles: [],
  };

  try {
    data = await sanity.fetch<SitemapData>(
      sitemapQuery,
      {},
      { next: { tags: ["sitemap"] } }
    );
  } catch {
    // Sanity not yet populated — fall through with empty arrays so the sitemap still builds
  }

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/solutions`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/industries`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/work`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/insights`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/about/clients`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/about/founder`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/about/firm`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/book-consultation`, lastModified: now, changeFrequency: "monthly", priority: 0.95 },
  ];

  const solutions = (data.solutions ?? []).map((s) => ({
    url: `${SITE_URL}/solutions/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const subServices = (data.subServices ?? [])
    .filter((s) => s.slug && s.parentSlug)
    .map((s) => ({
      url: `${SITE_URL}/solutions/${s.parentSlug}/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  const industries = (data.industries ?? []).map((i) => ({
    url: `${SITE_URL}/industries/${i.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const caseStudies = (data.caseStudies ?? []).map((c) => ({
    url: `${SITE_URL}/work/${c.slug}`,
    lastModified: c.publishedAt ? new Date(c.publishedAt) : now,
    changeFrequency: "yearly" as const,
    priority: 0.8,
  }));

  const articles = (data.articles ?? []).map((a) => ({
    url: `${SITE_URL}/insights/${a.slug}`,
    lastModified: a.publishedAt ? new Date(a.publishedAt) : now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...solutions,
    ...subServices,
    ...industries,
    ...caseStudies,
    ...articles,
  ];
}
