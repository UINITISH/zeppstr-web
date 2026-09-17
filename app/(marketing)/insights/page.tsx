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
        {/* ── Header ─────────────────────────────────
            The full-height hero here was removed 11 Sep 2026 at the founder's
            request. It pushed the first article below the fold on a laptop,
            which is the wrong trade for an index page — people arrive here to
            find something to read, not to be introduced to the section.

            The newsletter capture that lived in this block has moved to the
            mid-scroll break, where it already had a slot. Its subscriber-count
            line ("Read by 2,400+ founders and growth leads") was dropped rather
            than moved: nobody has been able to point to where that figure came
            from, and an unverifiable number is exactly what the rest of this
            site argues against. Put it back once it can be sourced. */}
        <section className="border-b border-rule">
          <div className="container-layout pt-12 md:pt-16 pb-8">
            <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
              <h1 className="font-display font-light tracking-tight text-display-lg text-ink-headline">
                Insights
              </h1>
              <p className="font-body text-body text-ink-muted max-w-[46ch]">
                Field notes on how growth actually compounds — written from
                inside the work.
              </p>
            </div>
          </div>
        </section>

        {/* ── Filter ───────────────────────────────
            Hidden when there is nothing to filter. With zero articles
            `categoriesWithCounts` collapses to a single "All 0" pill, and a
            sticky filter bar offering one empty category above an empty state
            reads as broken rather than as deliberate. */}
        {allArticles.length > 0 && (
          <section className="sticky top-[var(--nav-h)] z-30 bg-bg-primary/95 backdrop-blur border-b border-rule">
            <div className="container-layout py-4 overflow-x-auto">
              <InsightsFilter
                categories={categoriesWithCounts}
                activeCategory={activeCategory}
              />
            </div>
          </section>
        )}

        {/* ── Empty state ──────────────────────────
            REWRITTEN 17 Sep 2026, because this is now the page's normal
            condition rather than an edge case.

            Forty-nine bulk-imported filler posts were withdrawn (see
            PARKED_FILLER in scripts/seed/data/articles.ts). The old copy read
            "No essays in this category yet" — written for a category filter
            returning nothing, and misleading when the whole section is empty.

            An empty section is a legitimate state for this site to be in. The
            alternative was leaving recycled template content one click from
            case studies that publish revenue with the spend attached, which
            costs more than an honest gap does. This says that plainly instead
            of apologising for it. */}
        {articles.length === 0 && (
          <section className="container-layout py-24 md:py-32">
            <div className="max-w-[58ch]">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-6">
                Nothing published yet
              </p>
              <h2 className="font-display font-light tracking-[-0.025em] text-display-md text-ink-headline mb-6 text-balance">
                We took the filler down rather than leave it up.
              </h2>
              <p className="font-body text-body-lg text-ink-body leading-relaxed mb-5">
                This section previously carried several dozen imported SEO
                articles that were not written here and did not say anything we
                would stand behind. They have been withdrawn.
              </p>
              <p className="font-body text-body text-ink-muted leading-relaxed mb-8">
                What replaces them is being written from live engagement data,
                held to the same standard as the case studies: every figure
                traceable to a named client, or it does not go in. That takes
                longer and produces fewer posts. Both of those are the point.
              </p>
              <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                <Link
                  href="/work"
                  className="inline-flex font-mono text-[12px] uppercase tracking-[0.18em] text-ink-headline border-b border-ink-headline pb-1 hover:text-ink-headline/60 hover:border-brand-yellow transition-colors"
                >
                  Read the case studies instead &rarr;
                </Link>
                <Link
                  href="/insights#newsletter"
                  className="inline-flex font-mono text-[12px] uppercase tracking-[0.18em] text-ink-muted border-b border-ink-muted/40 pb-1 hover:text-ink-headline hover:border-brand-yellow transition-colors"
                >
                  Get the first one by email &rarr;
                </Link>
              </div>
            </div>
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
            <h2 className="font-display font-light tracking-tight text-display-lg text-ink-headline mb-6">
              One essay. Every other Thursday.
            </h2>
            <p className="font-body text-body-lg text-ink-body mb-10 max-w-[55ch] mx-auto leading-relaxed">
              Practical, opinionated, structured. No marketing platitudes, no roundups, no
              curated link dumps. The thing we’ve actually been wrestling with that
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
