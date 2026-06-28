import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { GlobalNav } from "@/components/nav/GlobalNav";
import { Footer } from "@/components/nav/Footer";
import { PortableText } from "@/components/article/PortableText";
import { CTABanner } from "@/components/blocks/CTABanner";
import { sanity } from "@/sanity/lib/client";
import { sanityImageProps } from "@/sanity/lib/image";
import { articleBySlugQuery } from "@/sanity/lib/queries";
import type { Article } from "@/sanity/lib/types";

const CATEGORY_LABELS: Record<string, string> = {
  "growth-strategy": "Growth Strategy",
  "seo-search": "SEO & Search",
  "performance-paid": "Performance & Paid",
  "conversion-experience": "Conversion & Experience",
  "industry-insights": "Industry Insights",
};

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
  return {
    title: article.seoTitle ?? article.title,
    description: article.seoDescription ?? article.excerpt,
  };
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

  const heroImg = article.heroImage
    ? sanityImageProps(article.heroImage, { width: 1600, height: 900 })
    : null;
  const date = article.publishedAt ? new Date(article.publishedAt) : null;

  return (
    <>
      <GlobalNav />
      <main>
        {/* Article header */}
        <header className="container-reading pt-12 md:pt-20 pb-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="font-body text-eyebrow text-brand-blue uppercase">
              {CATEGORY_LABELS[article.category] ?? article.category}
            </span>
            {date && (
              <>
                <span className="text-ink-muted" aria-hidden="true">·</span>
                <time
                  dateTime={article.publishedAt}
                  className="font-body text-body-sm text-ink-muted"
                >
                  {date.toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </>
            )}
          </div>
          <h1 className="font-extralight tracking-tight text-display-xl text-ink-headline mb-8 max-w-[22ch] mx-auto">
            {article.title}
          </h1>
          {article.excerpt && (
            <p className="font-body text-body-lg text-ink-body max-w-[60ch] mx-auto">
              {article.excerpt}
            </p>
          )}
        </header>

        {/* Hero image */}
        {heroImg && (
          <div className="container-layout pb-16">
            <div className="relative aspect-[16/9] rounded-lg overflow-hidden bg-bg-secondary">
              <Image
                src={heroImg.src}
                alt={heroImg.alt}
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover"
                placeholder={heroImg.blurDataURL ? "blur" : "empty"}
                blurDataURL={heroImg.blurDataURL}
              />
            </div>
          </div>
        )}

        {/* Article body */}
        <article className="container-reading pb-16">
          <PortableText value={article.body} />
        </article>

        {/* Author */}
        <section className="container-reading py-12 border-t border-rule">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-bg-secondary flex items-center justify-center font-display font-medium text-body text-ink-headline">
              {article.author.split(" ").map((n) => n[0]).join("").slice(0, 2)}
            </div>
            <div>
              <div className="font-body font-medium text-body text-ink-headline">
                {article.author}
              </div>
              <div className="font-body text-body-sm text-ink-muted">
                Zeppstr Growth Media
              </div>
            </div>
          </div>
        </section>

        {/* Related links */}
        {(article.relatedSolution || article.relatedIndustry) && (
          <section className="container-reading py-12 border-t border-rule">
            <p className="eyebrow mb-4">Related</p>
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

        {/* CTA */}
        <CTABanner
          eyebrow="The Brief"
          heading="Get more like this in your inbox."
          subhead="The Brief — a fortnightly newsletter for premium-category founders. Frameworks, not tips."
          primary={{ label: "Subscribe", href: "/insights/the-brief" }}
          secondary={{ label: "More articles", href: "/insights" }}
          variant="inverse"
        />
      </main>
      <Footer />
    </>
  );
}
