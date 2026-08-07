import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/meta";
import { GlobalNav } from "@/components/nav/GlobalNav";
import { Footer } from "@/components/nav/Footer";
import { ArticleCard } from "@/components/cards/ArticleCard";
import { InsightsFilter } from "@/components/insights/InsightsFilter";
import { NewsletterInline } from "@/components/blocks/NewsletterInline";
import { sanity } from "@/sanity/lib/client";
import { allArticlesQuery } from "@/sanity/lib/queries";
import type { Article } from "@/sanity/lib/types";

type ArticleListItem = Pick<
  Article,
  "_id" | "title" | "slug" | "excerpt" | "heroImage" | "author" | "category" | "publishedAt"
>;

export const metadata: Metadata = buildMetadata({
  title: "Insights · The Brief",
  description:
    "Field notes on growth structure — how multi-channel marketing actually compounds. Subscribe to The Brief for one practical, opinionated essay every other Thursday.",
  path: "/insights",
})

const CATEGORIES: { value: string; label: string }[] = [
  { value: "all", label: "All" },
  { value: "growth-strategy", label: "Growth Strategy" },
  { value: "seo-search", label: "SEO & Search" },
  { value: "performance-paid", label: "Performance & Paid" },
  { value: "conversion-experience", label: "Conversion & Experience" },
  { value: "industry-insights", label: "Industry Insights" },
];

interface InsightsHubPageProps {
  searchParams?: { category?: string };
}

export default async function InsightsHubPage({ searchParams }: InsightsHubPageProps) {
  const allArticles = await sanity.fetch<ArticleListItem[]>(allArticlesQuery);

  const activeCategory = searchParams?.category ?? "all";
  const articles =
    activeCategory === "all"
      ? allArticles
      : allArticles.filter((a) => a.category === activeCategory);

  const featured = activeCategory === "all" ? allArticles[0] : undefined;
  const remaining = featured ? articles.slice(1) : articles;

  return (
    <>
      <GlobalNav />
      <main>
        {/* Hero */}
        <section className="container-layout pt-20 md:pt-32 pb-12 text-center">
          <p className="eyebrow mb-6">Insights</p>
          <h1 className="font-extralight tracking-tight text-display-xl text-ink-headline mb-8 max-w-[22ch] mx-auto">
            Field notes on growth structure.
          </h1>
          <p className="font-body text-body-lg text-ink-body max-w-[60ch] mx-auto">
            How multi-channel marketing actually compounds — written from inside the work,
            not from the outside looking in. One practical, opinionated essay every other
            Thursday.
          </p>
        </section>

        {/* Category filter */}
        <section className="container-layout pb-10">
          <InsightsFilter categories={CATEGORIES} activeCategory={activeCategory} />
        </section>

        {/* Empty state */}
        {articles.length === 0 && (
          <section className="container-layout py-20 text-center">
            <p className="font-body text-body-lg text-ink-muted max-w-[50ch] mx-auto">
              No essays in this category yet — but the next one is in the writing queue.{" "}
              <a href="#newsletter" className="text-brand-blue underline">
                Subscribe to The Brief
              </a>{" "}
              and you&rsquo;ll get it the morning it ships.
            </p>
          </section>
        )}

        {/* Featured (only on "all" view) */}
        {featured && (
          <section className="container-layout pb-16">
            <div className="border-t border-rule pt-10">
              <p className="eyebrow mb-6 text-ink-muted">Latest</p>
              <ArticleCard article={featured} className="lg:max-w-[80ch]" />
            </div>
          </section>
        )}

        {/* Article grid */}
        {remaining.length > 0 && (
          <section className="container-layout pb-20">
            <div className="border-t border-rule pt-10">
              <p className="eyebrow mb-8 text-ink-muted">
                {activeCategory === "all" ? "More essays" : "All essays in this category"}
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                {remaining.map((article) => (
                  <ArticleCard key={article._id} article={article} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Newsletter — The Brief */}
        <section id="newsletter" className="bg-bg-secondary py-20">
          <div className="container-layout max-w-[680px] mx-auto text-center">
            <p className="eyebrow mb-6">The Brief</p>
            <h2 className="font-extralight tracking-tight text-display-lg text-ink-headline mb-6">
              One essay. Every other Thursday.
            </h2>
            <p className="font-body text-body-lg text-ink-body mb-10 max-w-[55ch] mx-auto">
              Practical, opinionated, structured. No marketing platitudes, no roundups,
              no curated link dumps. The thing we&rsquo;ve actually been wrestling with that
              week — written for operators, not other marketers.
            </p>
            <NewsletterInline source="insights-hub" />
            <p className="font-body text-body-sm text-ink-muted mt-6">
              Read by 2,400+ founders and growth leads. Unsubscribe in one click.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
