import type { Metadata } from "next";
import Link from "next/link";
import { GlobalNav } from "@/components/nav/GlobalNav";
import { HeroPrimary } from "@/components/hero/HeroPrimary";
import { FilterableWorkGrid } from "@/components/work/FilterableWorkGrid";
import { ClientLogosWall } from "@/components/blocks/ClientLogosWall";
import { ResultsStrip } from "@/components/blocks/ResultsStrip";
import { ManifestoBlock } from "@/components/blocks/ManifestoBlock";
import { MethodologyFlow } from "@/components/blocks/MethodologyFlow";
import { GridOverlay } from "@/components/blocks/GridOverlay";
import { ArticleCard } from "@/components/cards/ArticleCard";
import { Footer } from "@/components/nav/Footer";
import { sanity } from "@/sanity/lib/client";
import {
  allSolutionsQuery,
  allCaseStudiesQuery,
  recentArticlesQuery,
} from "@/sanity/lib/queries";
import type { Solution, CaseStudy, Article, Industry } from "@/sanity/lib/types";

// Home inherits the root default title/description; only the canonical is
// set here so the homepage self-references correctly.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

type CaseStudyListItem = Pick<
  CaseStudy,
  "_id" | "clientName" | "slug" | "headlineMetric" | "headlineTimeframe" | "heroImage"
> & {
  industry?: Pick<Industry, "_id" | "name" | "slug">;
  linkHref?: string;
  country?: string;
  screenshotSrc?: string;
};

// Static featured brands — render as Selected Work tiles even without
// full case study pages. Mapped to the 6 canonical industries so they
// don't fragment the filter row.
const STATIC_FEATURED_CASES: CaseStudyListItem[] = [
  {
    _id: "static-prohance",
    clientName: "Prohance",
    slug: { current: "prohance" },
    industry: { _id: "ind-saas", name: "SaaS / Tech", slug: { current: "saas" } },
    country: "India",
    linkHref: "/work",
    screenshotSrc: "/case-screenshots/prohance.jpg",
  },
  {
    _id: "static-21finance",
    clientName: "21 Finance",
    slug: { current: "21-finance" },
    industry: { _id: "ind-fintech", name: "Fintech", slug: { current: "fintech" } },
    country: "India",
    linkHref: "/work",
  },
  {
    _id: "static-empuls",
    clientName: "Empuls",
    slug: { current: "empuls" },
    industry: { _id: "ind-saas", name: "SaaS / Tech", slug: { current: "saas" } },
    country: "India",
    linkHref: "/work",
    screenshotSrc: "/case-screenshots/empuls.jpg",
  },
  {
    _id: "static-aishwarya-interiors",
    clientName: "Aishwarya Interiors",
    slug: { current: "aishwarya-interiors" },
    industry: { _id: "ind-real-estate", name: "Real Estate", slug: { current: "real-estate" } },
    country: "India",
    linkHref: "/work",
    screenshotSrc: "/case-screenshots/aishwarya-interiors.jpg",
  },
  {
    _id: "static-fixstars",
    clientName: "Fixstars",
    slug: { current: "fixstars" },
    industry: { _id: "ind-saas", name: "SaaS / Tech", slug: { current: "saas" } },
    country: "Tokyo, Japan",
    linkHref: "/work",
    screenshotSrc: "/case-screenshots/fixstars.jpg",
  },
  {
    _id: "static-tristar-online",
    clientName: "Tristar Online",
    slug: { current: "tristar-online" },
    industry: { _id: "ind-ecom", name: "E-commerce / D2C", slug: { current: "ecommerce" } },
    country: "Australia",
    linkHref: "/work",
    screenshotSrc: "/case-screenshots/tristar-online.jpg",
  },
];

// Country fallback map for Sanity-driven cases (until country is added to the schema)
const COUNTRY_BY_SLUG: Record<string, string> = {
  "wise-market": "Australia",
  "tru-aquapolis": "India",
  "mini-leaves": "India",
};

// Website screenshot map for Sanity-driven cases (overrides Sanity heroImage on the home grid)
const SCREENSHOT_BY_SLUG: Record<string, string> = {
  "wise-market": "/case-screenshots/wise-market.jpg",
  "tru-aquapolis": "/case-screenshots/tru-aquapolis.jpg",
  "mini-leaves": "/case-screenshots/mini-leaves.jpg",
};

export default async function HomePage() {
  const [solutions, sanityCases, recentArticles] = await Promise.all([
    sanity.fetch<Solution[]>(allSolutionsQuery),
    sanity.fetch<CaseStudyListItem[]>(allCaseStudiesQuery),
    sanity.fetch<Article[]>(recentArticlesQuery),
  ]);

  // Enrich Sanity cases with country + website screenshot, then merge with static featured brands
  const enrichedSanityCases: CaseStudyListItem[] = sanityCases.map((c) => ({
    ...c,
    country: c.country ?? COUNTRY_BY_SLUG[c.slug.current],
    screenshotSrc: c.screenshotSrc ?? SCREENSHOT_BY_SLUG[c.slug.current],
  }));
  const allCases = [...enrichedSanityCases, ...STATIC_FEATURED_CASES];

  return (
    <>
      <GlobalNav />
      <main className="relative">
        <GridOverlay />
        {/* ─── 1. HERO — one idea, oversized ─── */}
        <HeroPrimary
          headline="Strategic growth planning for ambitious businesses."
          subhead="Zeppstr is the strategic growth partner for ambitious businesses. We build the system underneath your marketing — so every channel, every campaign, every rupee compounds."
          ctaPrimary={{ label: "View Selected Work", href: "/work" }}
          ctaSecondary={{ label: "Apply for a diagnostic", href: "/book-consultation" }}
        />

        {/* ─── 2. EDITORIAL STATEMENT — pure type, no decoration ─── */}
        {/* The page's quietest-loudest moment. Nothing to click. */}
        <section className="bg-bg-primary border-t border-ink-headline/10">
          <div className="container-layout py-28 md:py-44">
            <div className="grid md:grid-cols-12 gap-8 md:gap-16">
              <div className="md:col-span-2">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
                  POV
                </p>
              </div>
              <div className="md:col-span-10">
                <p className="font-display font-extralight text-[clamp(28px,4.5vw,68px)] text-ink-headline leading-[1.08] tracking-[-0.02em] max-w-[28ch]">
                  Growth stalls. The reflex is to add — another agency, another platform, another channel.{" "}
                  <span className="text-ink-muted">
                    The constraint was never the channels.
                  </span>{" "}
                  It was the architecture beneath them.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 2b. RESULTS STRIP — outcome proof ─── */}
        <ResultsStrip />

        {/* ─── 3. SELECTED WORK — filterable grid ─── */}
        <section className="bg-bg-primary border-t border-ink-headline/10" aria-labelledby="work-heading">
          <div className="container-layout py-24 md:py-32">
            <div className="mb-16 md:mb-20">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-6">
                Selected Work
              </p>
              <h2
                id="work-heading"
                className="font-bold tracking-[-0.025em] text-[clamp(44px,7vw,104px)] text-ink-headline leading-[1.02] max-w-[18ch] text-balance"
              >
                Same playbook.{" "}
                <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">Outsized</span>{" "}
                results.
              </h2>
            </div>

            <FilterableWorkGrid cases={allCases} />
          </div>
        </section>

        {/* ─── 4. CLIENT LOGOS WALL — visual breadth proof ─── */}
        <ClientLogosWall />

        {/* ─── 5. MANIFESTO — yellow full-bleed ─── */}
        <ManifestoBlock
          eyebrow="Approach"
          headline={
            <>
              We don&rsquo;t add channels.{" "}
              <span className="opacity-60">We build the layer above them.</span>
            </>
          }
          body="Positioning. Journey. Measurement. Conversion. The structural layer beneath every channel &mdash; the difference between growth that compounds and spend that disappears. We rebuild the layer until the channels work because of it, not despite it."
          link={{ label: "Read the full POV", href: "/about/our-pov" }}
        />

        {/* ─── 6. METHODOLOGY — Diagnose → Architect → Deploy → Operate ─── */}
        <MethodologyFlow />

        {/* ─── 7. SERVICES — editorial list, not card grid ─── */}
        <section className="bg-bg-primary" aria-labelledby="services-heading">
          <div className="container-layout py-24 md:py-32">
            <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-end mb-16 md:mb-20">
              <div className="md:col-span-9">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-6">
                  Practice
                </p>
                <h2
                  id="services-heading"
                  className="font-bold tracking-[-0.025em] text-[clamp(44px,6.5vw,96px)] text-ink-headline leading-[1.02] max-w-[20ch] text-balance"
                >
                  Five practices. Built to{" "}
                  <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">compound</span>{" "}
                  revenue.
                </h2>
              </div>
              <div className="md:col-span-3 md:text-right">
                <Link
                  href="/solutions"
                  className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-headline border-b-2 border-ink-headline pb-1 hover:text-ink-headline/60 hover:border-brand-yellow transition-colors"
                >
                  All offerings →
                </Link>
              </div>
            </div>

            {/* 5 Solutions list — editorial */}
            <ol className="border-t border-ink-headline/15">
              {solutions.map((s, i) => (
                <li
                  key={s._id}
                  className="border-b border-ink-headline/15 group"
                >
                  <Link
                    href={`/solutions/${s.slug.current}`}
                    className="grid md:grid-cols-12 gap-6 py-8 md:py-10 items-center hover:bg-bg-secondary transition-colors duration-hover ease-smooth -mx-4 px-4 md:-mx-6 md:px-6"
                  >
                    <div className="md:col-span-1 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
                      0{i + 1}
                    </div>
                    <div className="md:col-span-5">
                      {/* Yellow accent square — matches methodology brand block */}
                      <span
                        aria-hidden="true"
                        className="block w-2.5 h-2.5 bg-brand-yellow mb-4"
                      />
                      <h3 className="font-display font-bold text-[clamp(28px,3.2vw,46px)] text-ink-headline tracking-[-0.02em] leading-[1.05] group-hover:text-ink-headline/70 transition-colors">
                        {s.name}
                      </h3>
                    </div>
                    <div className="md:col-span-5 space-y-5">
                      {s.tagline && (
                        <p className="font-body font-bold text-body text-ink-headline leading-relaxed max-w-[32ch]">
                          {s.tagline}
                        </p>
                      )}
                      {/* Sub-services — matches description body color and weight */}
                      {(s as any).subServices && (s as any).subServices.length > 0 && (
                        <p className="font-body text-body text-ink-body leading-relaxed">
                          {(s as any).subServices
                            .slice(0, 4)
                            .map((ss: { name: string }) => ss.name)
                            .join(" · ")}
                          {(s as any).subServices.length > 4 &&
                            ` · +${(s as any).subServices.length - 4} more`}
                        </p>
                      )}
                    </div>
                    <div
                      aria-hidden="true"
                      className="md:col-span-1 md:text-right font-display text-display-sm text-ink-muted group-hover:text-ink-headline/70 group-hover:translate-x-1 transition-all duration-hover"
                    >
                      →
                    </div>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ─── 7. INSIGHTS teaser ─── */}
        {recentArticles.length > 0 && (
          <section className="bg-bg-secondary border-t border-ink-headline/10" aria-labelledby="insights-heading">
            <div className="container-layout py-24 md:py-32">
              <div className="grid md:grid-cols-12 gap-8 mb-16 items-end">
                <div className="md:col-span-9">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-6">
                    Field Notes
                  </p>
                  <h2
                    id="insights-heading"
                    className="font-bold tracking-[-0.025em] text-[clamp(40px,6vw,88px)] text-ink-headline leading-[1.02] max-w-[14ch] text-balance"
                  >
                    Notes from{" "}
                    <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">inside</span>{" "}
                    the work.
                  </h2>
                </div>
                <div className="md:col-span-3 md:text-right">
                  <Link
                    href="/insights"
                    className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-headline border-b-2 border-ink-headline pb-1 hover:text-ink-headline/60 hover:border-brand-yellow transition-colors"
                  >
                    All essays →
                  </Link>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                {recentArticles.slice(0, 3).map((a) => (
                  <ArticleCard key={a._id} article={a} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ─── 8. CTA — emerald full-bleed (brand block: green bg + white text + yellow CTA) ─── */}
        <section className="relative z-10 bg-emerald-900 text-white">
          <div className="container-layout py-32 md:py-48">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/70 mb-12">
              Engage
            </p>

            <h2 className="font-bold tracking-[-0.025em] text-[clamp(48px,8vw,128px)] leading-[1.02] max-w-[20ch] mb-16 md:mb-24 text-white text-balance">
              Build a{" "}
              <span className="bg-brand-yellow text-ink-headline px-3 py-0.5 box-decoration-clone">
                system
              </span>{" "}
              like this for your business.
            </h2>

            <div className="grid md:grid-cols-12 gap-8 md:gap-16 pt-10 border-t border-white/15">
              <div className="md:col-span-6">
                <p className="font-body text-body-lg text-white/80 leading-[1.5] max-w-[44ch]">
                  Twelve partners a year, by intention. We start with a 45-minute paid diagnostic &mdash; refunded in full if we&rsquo;re not the right fit for each other.
                </p>
              </div>
              <div className="md:col-span-6 flex md:items-end md:justify-end">
                <Link
                  href="/book-consultation"
                  className="inline-flex items-center justify-center bg-brand-yellow text-emerald-900 font-display font-light text-[clamp(20px,1.6vw,28px)] px-10 py-5 hover:bg-white transition-colors duration-hover"
                >
                  Apply for a diagnostic →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
