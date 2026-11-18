import type { Metadata } from "next";
import Link from "next/link";
import { GlobalNav } from "@/components/nav/GlobalNav";
import { HeroPrimary } from "@/components/hero/HeroPrimary";
import { FilterableWorkGrid } from "@/components/work/FilterableWorkGrid";
import { ClientLogosWall } from "@/components/blocks/ClientLogosWall";
import { ResultsStrip } from "@/components/blocks/ResultsStrip";
import { ReflexSketch } from "@/components/blocks/ReflexSketch";
import { Testimonials } from "@/components/blocks/Testimonials";
import { TESTIMONIALS } from "@/lib/testimonials";
import { GridOverlay } from "@/components/blocks/GridOverlay";
import { Footer } from "@/components/nav/Footer";
import { sanity } from "@/sanity/lib/client";
import {
  allSolutionsQuery,
  allCaseStudiesQuery,
} from "@/sanity/lib/queries";
import type { Solution, CaseStudy, Industry } from "@/sanity/lib/types";

// Home inherits the root default title/description; only the canonical is
// set here so the homepage self-references correctly.
/**
 * ISR — revalidate every 60s.
 *
 * Without this the page is built once and only changes on a redeploy, which
 * means editing content in Sanity (or re-running the seed) appeared to do
 * nothing. Matches the insights routes, which already did this.
 */
export const revalidate = 60;


// Mirrors the grid's exported type. Outcome fields are optional because the
// static roster tiles below are named clients without a published case study —
// they have no metric and must not be given an invented one.
type CaseStudyListItem = Pick<CaseStudy, "_id" | "clientName" | "slug"> &
  Partial<
    Pick<CaseStudy, "headlineMetric" | "headlineTimeframe" | "heroImage">
  > & {
    industry?: Pick<Industry, "_id" | "name" | "slug">;
    linkHref?: string;
    country?: string;
    screenshotSrc?: string;
  };

// Static featured brands — render as Selected Work tiles even without
// full case study pages. Mapped to the 6 canonical industries so they
// don't fragment the filter row.
// ── SCOPE LINES, NOT METRICS ────────────────────────────────────────────────
// These six clients have no published outcome figure, so their row in the work
// index used to render an empty middle column — the grid looked half-filled.
//
// The fix is a scope line describing what the engagement was about, drawn from
// the written diagnosis in deliverables/content/case-studies/<slug>.md. It is
// NOT a result and must never be dressed up as one: no numbers, no "grew",
// no "increased". When a client agrees to publish a figure, replace the line
// with a real headlineMetric and move them into the metric treatment.
const STATIC_FEATURED_CASES: CaseStudyListItem[] = [
  {
    _id: "static-prohance",
    headlineMetric: "Positioned against the surveillance objection",
    headlineTimeframe: "compliance-led messaging · enterprise proof",
    clientName: "Prohance",
    slug: { _type: "slug", current: "prohance" },
    industry: { _id: "ind-saas", name: "SaaS / Tech", slug: { _type: "slug", current: "saas" } },
    country: "India",
    linkHref: "/work",
    screenshotSrc: "/case-screenshots/prohance.jpg",
  },
  {
    _id: "static-21finance",
    headlineMetric: "Category and messaging work in consumer fintech",
    headlineTimeframe: "positioning · owned channels",
    clientName: "21 Finance",
    slug: { _type: "slug", current: "21-finance" },
    /* Fintech, confirmed by Vikas 17 Sep 2026. There is no fintech industry
       page, so the slug points at professional-services while the NAME — the
       only part a visitor reads — says Fintech. */
    industry: { _id: "ind-fintech", name: "Fintech", slug: { _type: "slug", current: "professional-services" } },
    country: "India",
    linkHref: "/work",
  },
  {
    _id: "static-empuls",
    headlineMetric: "An all-in-one platform sold into a point-solution market",
    headlineTimeframe: "displacement sale · six-stakeholder committee",
    clientName: "Empuls",
    slug: { _type: "slug", current: "empuls" },
    industry: { _id: "ind-saas", name: "SaaS / Tech", slug: { _type: "slug", current: "saas" } },
    country: "India",
    linkHref: "/work",
    screenshotSrc: "/case-screenshots/empuls.jpg",
  },
  {
    _id: "static-aishwarya-interiors",
    headlineMetric: "Local search and enquiry capture for a studio practice",
    headlineTimeframe: "organic · lead qualification",
    clientName: "Aishwarya Interiors",
    slug: { _type: "slug", current: "aishwarya-interiors" },
    /* An interior design firm, not real estate — corrected 17 Sep 2026.
       Same arrangement as 21 Finance: no interior-design page exists, so the
       link goes to professional-services and the label tells the truth. */
    industry: { _id: "ind-interior-design", name: "Interior Design", slug: { _type: "slug", current: "professional-services" } },
    country: "India",
    linkHref: "/work",
    screenshotSrc: "/case-screenshots/aishwarya-interiors.jpg",
  },
  {
    _id: "static-fixstars",
    headlineMetric: "Technical marketing for engineers who distrust marketing",
    headlineTimeframe: "bilingual JP/EN · webinar-led demand",
    clientName: "Fixstars",
    slug: { _type: "slug", current: "fixstars" },
    industry: { _id: "ind-saas", name: "SaaS / Tech", slug: { _type: "slug", current: "saas" } },
    country: "Tokyo, Japan",
    linkHref: "/work",
    screenshotSrc: "/case-screenshots/fixstars.jpg",
  },
  {
    _id: "static-tristar-online",
    headlineMetric: "Winning the SKUs Amazon deprioritises",
    headlineTimeframe: "multi-category retail · long-tail SEO",
    clientName: "Tristar Online",
    slug: { _type: "slug", current: "tristar-online" },
    industry: { _id: "ind-ecom", name: "E-commerce / D2C", slug: { _type: "slug", current: "ecommerce" } },
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

export const metadata: Metadata = {
  title: "Home (brand version) — preview",
  robots: { index: false, follow: false },
};

/* PREVIEW 18 Nov 2026 — brand-led home page for review. Not linked, not indexed.
   Kept: hero, POV, results, 4 flagship cases, client wall, testimonials, CTA.
   Moved: full work grid → /work · tools + AI stack + methodology → /how-we-work
   · practices detail → /solutions · insights → /insights · manifesto dropped
   (it repeated the hero and POV argument a third time). */
export default async function HomeBrandPreview() {
  const [solutions, sanityCases] = await Promise.all([
    sanity.fetch<Solution[]>(allSolutionsQuery),
    sanity.fetch<CaseStudyListItem[]>(allCaseStudiesQuery),
  ]);

  // Enrich Sanity cases with country + website screenshot, then merge with static featured brands
  const enrichedSanityCases: CaseStudyListItem[] = sanityCases.map((c) => ({
    ...c,
    country: c.country ?? COUNTRY_BY_SLUG[c.slug.current],
    screenshotSrc: c.screenshotSrc ?? SCREENSHOT_BY_SLUG[c.slug.current],
  }));
  // Invest in Sharjah leads the Selected Work grid (set 17 Nov 2026), ahead of
  // Tru Aquapolis. Array.sort is stable, so every other case keeps its order.
  const LEAD_SLUG = "invest-in-sharjah";
  const allCases = [...enrichedSanityCases, ...STATIC_FEATURED_CASES].sort(
    (a, b) => Number(b.slug.current === LEAD_SLUG) - Number(a.slug.current === LEAD_SLUG),
  );

  // Brand home: four flagship cases only; the full filterable grid lives on /work.
  const FEATURED = ["invest-in-sharjah", "tru-aquapolis", "wise-market", "mini-leaves"];
  const featuredCases = FEATURED.map((slug) => allCases.find((c) => c.slug.current === slug)).filter(
    (c): c is CaseStudyListItem => Boolean(c),
  );

  return (
    <>
      <GlobalNav />
      <main className="relative">
        <GridOverlay />
        {/* ─── 1. HERO — one idea, oversized ─── */}
        <HeroPrimary
          /**
           * ── HEADLINE REPLACED 15 SEP 2026 ──────────────────────────────────
           *
           * WAS: "Strategic growth planning for ambitious businesses."
           *
           * That is a category description, not a claim. Every word in it is
           * one a competitor would also use, and none of it commits to
           * anything a reader could disagree with — which means none of it is
           * worth reading. It also duplicated the old subhead almost verbatim
           * (fixed separately), so the top of the site said nothing twice.
           *
           * The replacement is contrarian and specific: it states a position
           * a prospect can push back on, and it is the exact argument the POV
           * section immediately below the fold then makes ("Growth stalls. The
           * reflex is to add —"). The hero now sets up the page instead of
           * introducing the company.
           *
           * If you want the old line back it is one string. But be clear about
           * the trade: the old line is safe and says nothing; this one takes a
           * position and will lose the readers who disagree with it. For a
           * firm that turns down most inbound work, losing those readers early
           * is the point.
           */
          headline="Your channels aren't the problem. What's underneath them is."
          /* REWRITTEN 15 SEP 2026. The previous subhead opened "Zeppstr is the
             strategic growth partner for ambitious businesses" — a near-verbatim
             restatement of the headline directly above it. The first two
             sentences on the site said the same thing twice, which spends the
             most valuable paragraph on the site saying nothing new. This version
             makes the argument the rest of the page then evidences. */
          subhead="Most growth stalls are architecture problems, not channel problems. We rebuild the layer beneath your marketing — positioning, measurement, conversion — so every channel, every campaign, every rupee compounds instead of competing."
          ctaPrimary={{ label: "View Selected Work", href: "/work" }}
          ctaSecondary={{ label: "Apply for a diagnostic", href: "/book-consultation" }}
        />

        {/* ─── 2. EDITORIAL STATEMENT — pure type, no decoration ─── */}
        {/* The page's quietest-loudest moment. Nothing to click. */}
        {/* py was 28/44 — ~176px of padding above and below a single
            paragraph, with the whole right half of the grid empty. Every other
            section on this page carries a visual, so this one read as the
            place where the page ran out of things to say, at exactly its
            strongest claim. Padding tightened and the statement now has a
            drawing arguing the same point beside it. */}
        <section className="bg-bg-primary border-t border-ink-headline/10">
          <div className="container-layout py-24 md:py-32">
            <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-center">
              <div className="md:col-span-2">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
                  POV
                </p>
              </div>
              <div className="md:col-span-6">
                <p className="font-display font-extralight text-display-lg text-ink-headline leading-[1.08] tracking-[-0.02em]">
                  Growth stalls. The reflex is to add — another agency, another platform, another channel.{" "}
                  <span className="text-ink-muted">
                    The constraint was never the channels.
                  </span>{" "}
                  It was the architecture beneath them.
                </p>
              </div>
              <div className="md:col-span-4">
                <ReflexSketch className="w-full max-w-[300px] md:ml-auto" />
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
                className="font-bold tracking-[-0.025em] text-display-xl text-ink-headline leading-[1.02] max-w-[18ch] text-balance"
              >
                Same playbook.{" "}
                <span className="highlight-mark">Outsized</span>{" "}
                results.
              </h2>
            </div>

            <FilterableWorkGrid cases={featuredCases} />

            <div className="mt-14 flex justify-center">
              <Link
                href="/work"
                className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-headline border-b-2 border-ink-headline pb-1 hover:border-brand-yellow transition-colors"
              >
                See all work →
              </Link>
            </div>
          </div>
        </section>

        {/* ─── 4. CLIENT LOGOS WALL — visual breadth proof ─── */}
        <ClientLogosWall />

        {/* ─── 5b. TESTIMONIALS — client words, verbatim ───
            Placed after the manifesto and before the methodology on purpose:
            the manifesto is the loudest claim on the page, and the cheapest way
            to earn it back is to hand the next section to somebody else.
            Renders nothing if Sanity has no quotes. */}
        <Testimonials quotes={TESTIMONIALS} />

        {/* ─── 7. WHAT WE DO — one compact band; detail lives on /solutions and /how-we-work ─── */}
        <section className="bg-bg-secondary border-t border-ink-headline/10" aria-labelledby="practices-heading">
          <div className="container-layout py-20 md:py-24 grid md:grid-cols-12 gap-10 items-start">
            <div className="md:col-span-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-6">What we do</p>
              <h2 id="practices-heading" className="font-bold tracking-[-0.025em] text-display-md text-ink-headline leading-[1.05] text-balance">
                Five practices. One method.
              </h2>
              <Link
                href="/preview/how-we-work"
                className="mt-8 inline-block font-mono text-[11px] uppercase tracking-[0.2em] text-ink-headline border-b-2 border-ink-headline pb-1 hover:border-brand-yellow transition-colors"
              >
                How we work →
              </Link>
            </div>
            <ol className="md:col-span-7 md:col-start-6 border-t border-ink-headline/15">
              {solutions.map((s, i) => (
                <li key={s._id} className="border-b border-ink-headline/15">
                  <Link
                    href={`/solutions/${s.slug.current}`}
                    className="group flex items-baseline gap-6 py-5 hover:text-ink-headline/70 transition-colors"
                  >
                    <span className="font-mono text-[11px] tracking-[0.2em] text-ink-muted w-6">0{i + 1}</span>
                    <span className="font-display font-bold text-[22px] md:text-[26px] tracking-[-0.02em] text-ink-headline">
                      {s.name}
                    </span>
                    <span aria-hidden="true" className="ml-auto text-ink-muted group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ─── 8. CTA — emerald full-bleed (brand block: green bg + white text + yellow CTA) ─── */}
        <section className="relative z-10 bg-emerald-900 text-white">
          {/* py was 32/48. At 48 the band ran ~700px tall with a 200px void
              between the button and the footer, which is what made the CTA and
              the footer look like one continuous green section. */}
          <div className="container-layout py-24 md:py-32">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/70 mb-12">
              Engage
            </p>

            <h2 className="font-bold tracking-[-0.025em] text-display-stat leading-[1.02] max-w-[20ch] mb-14 md:mb-18 text-white text-balance">
              Build a{" "}
              <span className="highlight-mark text-ink-headline">
                system
              </span>{" "}
              like this for your business.
            </h2>

            <div className="grid md:grid-cols-12 gap-8 md:gap-16 pt-10 border-t border-white/15">
              <div className="md:col-span-6">
                <p className="font-body text-body-lg text-white/80 leading-[1.5] max-w-[44ch]">
                  Twelve partners a year, by intention. We start with a 45-minute paid diagnostic — refunded in full if we’re not the right fit for each other.
                </p>
              </div>
              <div className="md:col-span-6 flex md:items-end md:justify-end">
                <Link
                  href="/book-consultation"
                  className="inline-flex items-center justify-center bg-brand-yellow text-emerald-900 font-display font-light text-display-sm px-10 py-5 hover:bg-white transition-colors duration-hover"
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
