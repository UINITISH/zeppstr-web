import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/meta";
import { GlobalNav } from "@/components/nav/GlobalNav";
import { Footer } from "@/components/nav/Footer";
import { PortableText } from "@/components/article/PortableText";
import { ArticleCard } from "@/components/cards/ArticleCard";
import { CTABanner } from "@/components/blocks/CTABanner";
import { NewsletterInline } from "@/components/blocks/NewsletterInline";
import { ArticleTOC } from "@/components/insights/ArticleTOC";
import { ReadingProgress } from "@/components/insights/ReadingProgress";
import { ShareRow } from "@/components/insights/ShareRow";
import { LeadMagnetCard } from "@/components/insights/LeadMagnetCard";
import { ArticleByline } from "@/components/insights/ArticleByline";
import { ArticleCover } from "@/components/insights/ArticleCover";
import { Comments, type PublicComment } from "@/components/insights/Comments";
import { sanity } from "@/sanity/lib/client";
import { sanityImageProps } from "@/sanity/lib/image";
import {
  articleBySlugQuery,
  approvedCommentsQuery,
  relatedArticlesQuery,
} from "@/sanity/lib/queries";
import type { Article } from "@/sanity/lib/types";
import {
  CATEGORY_LABELS,
  coverFallbackUrl,
  extractHeadings,
  headingIdMap,
  readingTimeMinutes,
} from "@/lib/insights/article";

/**
 * ISR: re-fetch from Sanity at most once a minute.
 * Without this, Next caches the Sanity fetch indefinitely and new
 * articles never appear until the build cache is cleared.
 */
export const revalidate = 60;

// ─────────────────────────────────────────────
// Static generation
// ─────────────────────────────────────────────

export async function generateStaticParams() {
  const articles = await sanity.fetch<Array<{ slug: { current: string } }>>(
    `*[_type == "article"]{ slug }`
  );
  return articles.map((a) => ({ slug: a.slug.current }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const article = await sanity.fetch<Article | null>(articleBySlugQuery, {
    slug: params.slug,
  });
  if (!article) return {};
  return buildMetadata({
    title: article.seoTitle ?? article.title,
    description: article.seoDescription ?? article.excerpt,
    path: `/insights/${params.slug}`,
    openGraph: {
      type: "article",
      publishedTime: article.publishedAt,
      images: [
        {
          url: coverFallbackUrl(params.slug),
          width: 1200,
          height: 750,
          alt: article.title,
        },
      ],
    },
  });
}

// ─────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────

export default async function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = await sanity.fetch<Article | null>(articleBySlugQuery, {
    slug: params.slug,
  });

  if (!article) notFound();

  const [comments, related] = await Promise.all([
    sanity.fetch<PublicComment[]>(approvedCommentsQuery, { articleId: article._id }),
    sanity.fetch<
      Array<
        Pick<
          Article,
          | "_id"
          | "title"
          | "slug"
          | "excerpt"
          | "heroImage"
          | "author"
          | "category"
          | "publishedAt"
        >
      >
    >(relatedArticlesQuery, { category: article.category, slug: params.slug }),
  ]);

  const uploaded = article.heroImage
    ? sanityImageProps(article.heroImage, { width: 1600, height: 900 })
    : null;

  const headings = extractHeadings(article.body);
  const idMap = headingIdMap(headings);
  const minutes = readingTimeMinutes(article.body);
  const categoryLabel = CATEGORY_LABELS[article.category] ?? article.category;

  return (
    <>
      <ReadingProgress />
      <GlobalNav />
      <main>
        {/* ── Header ─────────────────────────────── */}
        <header className="container-layout pt-12 md:pt-16 pb-10">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 font-body text-body-sm text-ink-muted">
              <li>
                <Link href="/insights" className="hover:text-brand-blue transition-colors">
                  Insights
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link
                  href={`/insights?category=${article.category}`}
                  className="hover:text-brand-blue transition-colors"
                >
                  {categoryLabel}
                </Link>
              </li>
            </ol>
          </nav>

          <div className="max-w-[62ch]">
            <p className="eyebrow mb-5">{categoryLabel}</p>
            <h1 className="font-display font-extralight tracking-tight text-display-lg text-ink-headline mb-6">
              {article.title}
            </h1>
            {article.excerpt && (
              <p className="font-body text-body-lg text-ink-body leading-relaxed mb-8">
                {article.excerpt}
              </p>
            )}
            <div className="flex flex-wrap items-center justify-between gap-6 pt-6 border-t border-rule">
              <ArticleByline
                author={article.author}
                publishedAt={article.publishedAt}
                readingMinutes={minutes}
              />
              <ShareRow title={article.title} path={`/insights/${params.slug}`} />
            </div>
          </div>
        </header>

        {/* ── Hero image ─────────────────────────── */}
        <div className="container-layout pb-12 md:pb-16">
          <div className="relative aspect-[16/9] md:aspect-[16/7] rounded-lg overflow-hidden bg-bg-secondary">
            {uploaded ? (
              <Image
                src={uploaded.src}
                alt={uploaded.alt}
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover"
              />
            ) : (
              <ArticleCover
                title={article.title}
                category={article.category}
                size="hero"
              />
            )}
          </div>
        </div>

        {/* ── Body + sticky rail ─────────────────── */}
        <div className="container-layout pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-x-16 gap-y-16">
            {/* Left: article */}
            <div className="min-w-0 max-w-[72ch]">
              <article id="article-body">
                <PortableText value={article.body} headingIds={idMap} sectionMarkers />
              </article>

              {/* Mid-funnel lead magnet, placed after the reading */}
              <LeadMagnetCard
                variant="inline"
                eyebrow="Free growth diagnostic"
                heading="Want this applied to your own funnel?"
                body="We'll audit your acquisition, conversion and retention layers and hand back a prioritised fix list — the same diagnostic we run before every engagement. No deck, no pitch."
                points={[
                  "Where your spend is leaking, with numbers",
                  "The three fixes worth doing first",
                  "A 30-minute walkthrough, not a sales call",
                ]}
                cta={{ label: "Book the diagnostic", href: "/book-consultation" }}
              />

              {/* Author card */}
              <section className="mt-4 pt-10 border-t border-rule">
                <div className="flex flex-wrap items-start justify-between gap-6">
                  <ArticleByline
                    size="lg"
                    author={article.author}
                    publishedAt={article.publishedAt}
                    readingMinutes={minutes}
                  />
                  <ShareRow title={article.title} path={`/insights/${params.slug}`} />
                </div>
                <p className="font-body text-body text-ink-body leading-relaxed mt-5 max-w-[65ch]">
                  Written by the team at Zeppstr Growth Media — a multi-channel growth
                  practice working across organic search, performance media, lifecycle and
                  conversion for premium-category brands.
                </p>
              </section>

              {/* Related links */}
              {(article.relatedSolution || article.relatedIndustry) && (
                <section className="mt-12 pt-10 border-t border-rule">
                  <p className="eyebrow mb-4">Related service</p>
                  <div className="flex flex-wrap gap-3">
                    {article.relatedSolution && (
                      <Link
                        href={`/solutions/${article.relatedSolution.slug.current}`}
                        className="px-5 py-2.5 bg-bg-secondary border border-rule rounded-md font-body text-body-sm text-ink-headline hover:border-brand-blue hover:text-brand-blue transition-colors"
                      >
                        {article.relatedSolution.name}
                      </Link>
                    )}
                    {article.relatedIndustry && (
                      <Link
                        href={`/industries/${article.relatedIndustry.slug.current}`}
                        className="px-5 py-2.5 bg-bg-secondary border border-rule rounded-md font-body text-body-sm text-ink-headline hover:border-brand-blue hover:text-brand-blue transition-colors"
                      >
                        {article.relatedIndustry.name}
                      </Link>
                    )}
                  </div>
                </section>
              )}

              {/* Comments */}
              <div className="mt-16 pt-12 border-t border-rule">
                <Comments articleId={article._id} comments={comments ?? []} />
              </div>
            </div>

            {/* Right: sticky rail */}
            <aside className="hidden lg:block h-full">
              <div className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto overscroll-contain rail-scroll space-y-10 pr-1">
                <ArticleTOC headings={headings} />

                <LeadMagnetCard
                  eyebrow="Free growth diagnostic"
                  heading="Get your funnel audited in 30 minutes"
                  body="A prioritised fix list for your acquisition, conversion and retention layers. No deck, no pitch."
                  cta={{ label: "Book the diagnostic", href: "/book-consultation" }}
                />

                <div className="rounded-lg border border-rule p-6">
                  <p className="font-body text-eyebrow font-medium uppercase text-brand-blue mb-3">
                    The Brief
                  </p>
                  <p className="font-body text-body-sm text-ink-body leading-relaxed mb-5">
                    One practical essay every other Thursday. Written for operators, not
                    other marketers.
                  </p>
                  <NewsletterInline source={`article:${params.slug}`} stacked />
                </div>

                {related.length > 0 && (
                  <div>
                    <p className="font-body text-eyebrow font-medium uppercase text-ink-muted mb-5">
                      More in {categoryLabel}
                    </p>
                    <ul className="space-y-5">
                      {related.map((r) => (
                        <li key={r._id} className="pb-5 border-b border-rule last:border-0">
                          <ArticleCard article={r} variant="compact" />
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>

        {/* ── Related reading (mobile + wide) ────── */}
        {related.length > 0 && (
          <section className="bg-bg-secondary py-16 lg:hidden">
            <div className="container-layout">
              <p className="eyebrow mb-8">Keep reading</p>
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-12">
                {related.map((r) => (
                  <ArticleCard key={r._id} article={r} />
                ))}
              </div>
            </div>
          </section>
        )}

        <CTABanner
          eyebrow="The Brief"
          heading="Get more like this in your inbox."
          subhead="The Brief — a fortnightly newsletter for premium-category founders. Frameworks, not tips."
          primary={{ label: "Subscribe", href: "/insights#newsletter" }}
          secondary={{ label: "More articles", href: "/insights" }}
          variant="inverse"
        />
      </main>
      <Footer />
    </>
  );
}
