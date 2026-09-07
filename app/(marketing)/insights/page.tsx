import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/meta";
import { GlobalNav } from "@/components/nav/GlobalNav";
import { Footer } from "@/components/nav/Footer";
import { ArticleCard } from "@/components/cards/ArticleCard";
import { InsightsFilter } from "@/components/insights/InsightsFilter";
import { LeadMagnetCard } from "@/components/insights/LeadMagnetCard";
import { NewsletterInline } from "@/components/blocks/NewsletterInline";
import { sanity } from "@/sanity/lib/client";
import { allArticlesQuery } from "@/sanity/lib/queries";
import type { Article } from "@/sanity/lib/types";

type ArticleListItem = Pick<
  Article,
  "_id" | "title" | "slug" | "excerpt" | "heroImage" | "author" | "category" | "publishedAt"
>;

/**
 * ISR: re-fetch from Sanity at most once a minute.
 * Without this, Next caches the Sanity fetch indefinitely and new
 * articles never appear until the build cache is cleared.
 */
export const revalidate = 60;

export const metadata: Metadata = buildMetadata({
  title: "Insights · The Brief",
  description:
    "Field notes on growth structure — how multi-channel marketing actually compounds. Subscribe to The Brief for one practical, opinionated essay every other Thursday.",
  path: "/insights",
});

const CATEGORIES: { value: string; label: string }[] = [
  { value: "all", label: "All" },
  { value: "growth-strategy", label: "Growth Strategy" },
  { value: "seo-search", label: "SEO & Search" },
  { value: "performance-paid", label: "Performance & Paid" },
  { value: "conversion-experience", label: "Conversion & Experience" },
  { value: "email-lifecycle", label: "Email & Lifecycle" },
  { value: "social-content", label: "Social & Content" },
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

  const categoriesWithCounts = CATEGORIES.map((c) => ({
    ...c,
    count:
      c.value === "all"
        ? allArticles.length
        : allArticles.filter((a) => a.category === c.value).length,
  })).filter((c) => c.count > 0 || c.value === "all");

  const featured = activeCategory === "all" ? articles[0] : undefined;
  const rest = featured ? articles.slice(1) : articles;

  // Break the grid after the sixth card so the lead magnet lands mid-scroll
  // rather than at the bottom where nobody reaches it.
  const firstRun = rest.slice(0, 6);
  const secondRun = rest.slice(6);

  return (
    <>
      <GlobalNav />
      <main>
        {/* ── Hero ───────────────────────────────── */}
        <section className="border-b border-rule">
          <div className="container-layout pt-16 md:pt-24 pb-12">
            <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-16 items-end">
              <div>
                <p className="eyebrow mb-6">Insights</p>
                <h1 className="font-display font-extralight tracking-tight text-display-xl text-ink-headline mb-6 max-w-[16ch]">
                  Field notes on growth structure.
                </h1>
                <p className="font-body text-body-lg text-ink-body max-w-[58ch] leading-relaxed">
                  How multi-channel marketing actually compounds — written from inside the
                  work, not from the outside looking in. One practical, opinionated essay
                  every other Thursday.
                </p>
              </div>
              <div className="lg:pb-2">
                <div className="rounded-lg border border-rule bg-bg-secondary p-6">
                  <p className="font-body text-eyebrow font-medium uppercase text-brand-blue mb-3">
                    The Brief
                  </p>
                  <p className="font-body text-body-sm text-ink-body leading-relaxed mb-5">
                    Get each essay the morning it ships. No roundups, no link dumps.
                  </p>
                  <NewsletterInline
                    source="insights-hub-hero"
                    stacked
                  />
                  <p className="font-body text-body-sm text-ink-muted mt-4">
                    Read by 2,400+ founders and growth leads.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Filter ─────────────────────────────── */}
        <section className="sticky top-[85px] z-30 bg-bg-primary/95 backdrop-blur border-b border-rule">
          <div className="container-layout py-4 overflow-x-auto">
            <InsightsFilter
              categories={categoriesWithCounts}
              activeCategory={activeCategory}
            />
          </div>
        </section>

        {/* ── Empty state ────────────────────────── */}
        {articles.length === 0 && (
          <section className="container-layout py-24 text-center">
            <p className="font-body text-body-lg text-ink-muted max-w-[50ch] mx-auto">
              No essays in this category yet — but the next one is in the writing queue.{" "}
              <Link href="/insights#newsletter" className="text-brand-blue underline">
                Subscribe to The Brief
              </Link>{" "}
              and you&rsquo;ll get it the morning it ships.
            </p>
          </section>
        )}

        {/* ── Featured ───────────────────────────── */}
        {featured && (
          <section className="container-layout pt-14 pb-16">
            <p className="font-body text-eyebrow font-medium uppercase text-ink-muted mb-8">
              Latest
            </p>
            <ArticleCard article={featured} variant="feature" />
          </section>
        )}

        {/* ── Grid ───────────────────────────────── */}
        {firstRun.length > 0 && (
          <section className="container-layout pb-16">
            <div className="border-t border-rule pt-12">
              <p className="font-body text-eyebrow font-medium uppercase text-ink-muted mb-10">
                {activeCategory === "all" ? "More essays" : "All essays in this category"}
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
                {firstRun.map((article) => (
                  <ArticleCard key={article._id} article={article} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── Mid-scroll lead magnet ─────────────── */}
        {rest.length > 3 && (
          <section className="container-layout">
            <LeadMagnetCard
              variant="inline"
              eyebrow="Free growth diagnostic"
              heading="Reading about growth is cheaper than guessing at it. Testing it is cheaper still."
              body="We'll audit your acquisition, conversion and retention layers and hand back a prioritised fix list — the same diagnostic we run before every engagement."
              points={[
                "Where your spend is leaking, with numbers",
                "The three fixes worth doing first",
                "A 30-minute walkthrough, not a sales call",
              ]}
              cta={{ label: "Book the diagnostic", href: "/book-consultation" }}
              className="my-0"
            />
          </section>
        )}

        {secondRun.length > 0 && (
          <section className="container-layout pt-16 pb-20">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
              {secondRun.map((article) => (
                <ArticleCard key={article._id} article={article} />
              ))}
            </div>
          </section>
        )}

        {/* ── Newsletter ─────────────────────────── */}
        <section id="newsletter" className="bg-bg-secondary py-20 md:py-24">
          <div className="container-layout max-w-[680px] mx-auto text-center">
            <p className="eyebrow mb-6">The Brief</p>
            <h2 className="font-display font-extralight tracking-tight text-display-lg text-ink-headline mb-6">
              One essay. Every other Thursday.
            </h2>
            <p className="font-body text-body-lg text-ink-body mb-10 max-w-[55ch] mx-auto leading-relaxed">
              Practical, opinionated, structured. No marketing platitudes, no roundups, no
              curated link dumps. The thing we&rsquo;ve actually been wrestling with that
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
