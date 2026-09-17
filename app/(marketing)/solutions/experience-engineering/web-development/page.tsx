import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/meta";
import { GlobalNav } from "@/components/nav/GlobalNav";
import { Footer } from "@/components/nav/Footer";
import { GridOverlay } from "@/components/blocks/GridOverlay";
import { WebPerformanceScorecard } from "@/components/utility/WebPerformanceScorecard";

// ─────────────────────────────────────────────
// Web Development sub-service page (Experience & Engineering).
// Distinct sections — Done Bar (green acceptance-criteria spec),
// Build Library catalog, Architecture stack, 12-week Process.
// ─────────────────────────────────────────────

export const metadata: Metadata = buildMetadata({
  title: "Web Development — Experience & Engineering | Zeppstr",
  description:
    "Most websites are debt. We ship infrastructure. Sites that hit 95+ Lighthouse, ship features in days not quarters, and compound with every campaign downstream.",
  path: "/solutions/experience-engineering/web-development",
})

// ─── Content ───

const FEATURED_LOGOS = [
  { name: "Prohance", file: "prohance.png" },
  { name: "Wise Market", file: "wise-market.png" },
  { name: "Mini Leaves", file: "mini-leaves.png" },
  { name: "Empuls", file: "empuls.png" },
  { name: "Tru Aquapolis", file: "tru-aquapolis.png" },
  { name: "Tristar Online", file: "tristar-online.png" },
  { name: "Fixstars", file: "fixstars.png" },
  { name: "Twenty One Finance", file: "twenty-one-finance.png" },
];

// THE DONE BAR — acceptance criteria spec (6 rows on green)
const DONE_BAR = [
  {
    n: "01",
    metric: "Lighthouse Performance",
    measure: "Mobile · 3G · real-user-conditions",
    threshold: "≥ 95",
  },
  {
    n: "02",
    metric: "Accessibility",
    measure: "WCAG 2.1 AA · automated + manual audit",
    threshold: "AA full pass",
  },
  {
    n: "03",
    metric: "Largest Contentful Paint",
    measure: "Real users · field data",
    threshold: "≤ 2.5s",
  },
  {
    n: "04",
    metric: "Cumulative Layout Shift",
    measure: "All viewports · post-launch",
    threshold: "≤ 0.1",
  },
  {
    n: "05",
    metric: "Time-to-Interactive",
    measure: "Mobile · throttled 4× CPU",
    threshold: "≤ 3s",
  },
  {
    n: "06",
    metric: "Uptime SLA",
    measure: "Production · monthly average",
    threshold: "≥ 99.99%",
  },
];

// Principles — 4 rules
const PRINCIPLES = [
  {
    n: "01",
    title: "Performance is a marketing metric.",
    body: "Every 100ms of latency costs measurable conversion. The Lighthouse score is a marketing KPI, not an engineering trophy — treated as such, the site stops being a leak point.",
  },
  {
    n: "02",
    title: "Build for the slow phone on the bad network.",
    body: "Median user is on mobile, on cellular, on a three-year-old device. We build for that user. If the site is great on a M3 MacBook over fibre, that’s an accident, not a baseline.",
  },
  {
    n: "03",
    title: "Boring tech, well-applied.",
    body: "Next.js + Sanity + Vercel + Tailwind, applied with care, beats whatever framework is on the front page of Hacker News this week. We ship infrastructure that survives three years — not portfolio pieces.",
  },
  {
    n: "04",
    title: "Ship infra, not artifacts.",
    body: "A site that’s a Figma export pinned to a CMS is debt. A codebase with design tokens, component library, instrumentation, and CI is infrastructure that compounds with every campaign downstream.",
  },
];

// THE BUILD LIBRARY — 6 categories of what we build
const BUILD_LIBRARY = [
  {
    category: "Marketing Sites",
    items: [
      "High-traffic editorial · ISR",
      "Multi-brand parent sites",
      "Headless CMS · Sanity / Contentful",
      "International · multi-locale",
    ],
  },
  {
    category: "Conversion Surfaces",
    items: [
      "Landing-page systems",
      "Campaign micro-sites",
      "Pricing pages · interactive",
      "Comparison + calculator pages",
    ],
  },
  {
    category: "Product UI",
    items: [
      "In-app dashboards · React",
      "Settings + admin surfaces",
      "Authenticated marketing surfaces",
      "Embeds + widgets",
    ],
  },
  {
    category: "Headless Commerce",
    items: [
      "Shopify Hydrogen · custom storefront",
      "BigCommerce · headless",
      "Cart + checkout flows",
      "PIM / inventory integrations",
    ],
  },
  {
    category: "Internal Tools",
    items: [
      "Ops dashboards · Retool / custom",
      "CRM extensions",
      "Lifecycle / workflow tooling",
      "Reporting + BI surfaces",
    ],
  },
  {
    category: "Editorial / CMS",
    items: [
      "Sanity Studio · custom schemas",
      "Editorial workflows · review · approve",
      "Visual editing · live preview",
      "Localization tooling",
    ],
  },
];

// ARCHITECTURE — 5 layers (stack)
const ARCHITECTURE_LAYERS = [
  {
    name: "Edge / CDN",
    format: "Vercel · Cloudflare · Fastly",
    description:
      "Static and ISR served from the edge globally. Sub-100ms TTFB everywhere. Caching strategy that survives traffic spikes without re-architecting.",
  },
  {
    name: "Framework",
    format: "Next.js · Astro · SvelteKit",
    description:
      "App-router Next.js for product-heavy surfaces, Astro for content-heavy editorial. Picked per surface — not based on what we built last time.",
  },
  {
    name: "Data / CMS",
    format: "Sanity · Contentful · Postgres",
    description:
      "Headless CMS for editorial. Postgres / Planetscale / Supabase for product data. GROQ for Sanity, SQL elsewhere. Schema versioned in code.",
  },
  {
    name: "Performance · Observability",
    format: "Vitals · RUM · Error tracking",
    description:
      "Core Web Vitals tracked from real users (not Lighthouse-on-CI). Errors caught with Sentry. Performance regressions block deploy.",
  },
  {
    name: "Deploy · CI",
    format: "GitHub · Preview · Production",
    description:
      "Preview deploy per PR. CI runs lint, type, test, Lighthouse, accessibility. Production deploys via promote — not via branch merge.",
  },
];

// 6 process phases — 12 weeks
const PROCESS_PHASES = [
  {
    title: "Architecture",
    duration: "Week 1–2",
    body: "Stack picked per surface, data model designed, repo + CI scaffolded, performance budget locked. The decisions that shape the next twelve weeks.",
  },
  {
    title: "Component System",
    duration: "Week 3–4",
    body: "Tokens, atoms, molecules built from the design system. Storybook documented. Component library exists before the first page is built.",
  },
  {
    title: "Build",
    duration: "Week 5–9",
    body: "Pages and surfaces shipped. Each PR previewed, reviewed, Lighthouse-tested before merge. The site grows as composed surfaces, not bespoke pages.",
  },
  {
    title: "Integrate + QA",
    duration: "Week 10–11",
    body: "CMS connected, analytics instrumented, forms wired to CRM / lifecycle, accessibility audited, performance verified against budget. Nothing slips.",
  },
  {
    title: "Launch",
    duration: "Week 12",
    body: "DNS cutover, redirects mapped, monitoring live, on-call set. Launch is a fifteen-minute event because the eleven weeks before it were the launch.",
  },
  {
    title: "Operate",
    duration: "Month 4+",
    body: "Performance monitored. New surfaces shipped weekly. Editorial team operating the CMS without a developer. The system extends instead of accruing debt.",
  },
];

const PRACTICE_NUMBERS = [
  {
    figure: "98+",
    metric: "Lighthouse Performance",
    detail:
      "Baseline we ship to. On real users, on mobile, on cellular — not on a lab machine.",
    client: "Post-launch standard",
  },
  {
    figure: "3",
    metric: "Production applications on one engine",
    detail:
      "Valuation, auction and custody, shipped on mobile and desktop against a shared valuation engine — so a car is appraised once and never re-entered.",
    client: "VehicleMall",
  },
  {
    figure: "3 years",
    metric: "Codebase shelf life",
    detail:
      "Stack choices made for three-year durability, not Hacker News bragging rights. Boring tech, well-applied.",
    client: "Engineering standard",
  },
];

const INDUSTRIES = [
  { name: "B2B SaaS", slug: "b2b-saas" },
  { name: "Direct-to-Consumer", slug: "direct-to-consumer" },
  { name: "Real Estate", slug: "real-estate" },
  { name: "Premium Retail", slug: "premium-retail" },
  { name: "Multi-brand Operators", slug: "multi-brand-operators" },
];

const FAQS = [
  {
    question: "What stack do you use?",
    answer:
      "Default: Next.js (App Router) + Sanity + Tailwind + Vercel. Astro for editorial-heavy sites. We pick per surface — not from a template — and we don’t change the stack to look modern in a portfolio piece.",
  },
  {
    question: "Can you work with our existing WordPress / Webflow / Shopify?",
    answer:
      "Yes. We’ll audit before recommending. WordPress is fine for editorial-only sites with low traffic. Webflow is fine when the design surface is the product. Shopify is fine for commerce until it isn’t. We’ll say so honestly.",
  },
  {
    question: "Do you handle hosting and ops, or hand it off?",
    answer:
      "Either. Default is hosted on Vercel with monitoring + on-call set up by us. We can also hand off to your team or a managed-hosting partner, with a runbook documented.",
  },
  {
    question: "How do you handle SEO equity during a rebuild?",
    answer:
      "Redirect mapping is a first-class deliverable, not an afterthought. We audit every existing URL, map to the new structure, ship 301s with the launch, and monitor index health for 90 days post-launch. SEO equity doesn’t leak on our launches.",
  },
  {
    question: "What about A/B testing and personalization?",
    answer:
      "Built in. Edge middleware for personalization, Vercel / Optimizely / VWO for A/B. The infrastructure assumes you’ll want to test; you don’t have to re-platform six months later.",
  },
  {
    question: "What does it cost?",
    answer:
      "Marketing site builds start at ₹18L for the 12-week engagement. Product UI and headless commerce quoted post-architecture. Ongoing operation from ₹4L/month.",
  },
];

// ─────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────

export default function WebDevelopmentPage() {
  return (
    <>
      <GlobalNav />
      <main className="relative">
        <GridOverlay />

        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="container-layout pt-8 relative z-10"
        >
          <ol className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">
            <li>
              <Link
                href="/solutions"
                className="hover:text-ink-headline transition-colors"
              >
                Solutions
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                href="/solutions/experience-engineering"
                className="hover:text-ink-headline transition-colors"
              >
                Experience & Engineering
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-ink-headline">Web Development</li>
          </ol>
        </nav>

        {/* ─── 1. HERO ─── */}
        <section className="relative bg-bg-primary border-b border-ink-headline/10 overflow-hidden">
          <div className="container-layout pt-16 md:pt-20 pb-20 md:pb-28">
            <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-center">
              <div className="md:col-span-7">
                <div className="flex items-center gap-4 mb-8">
                  <span
                    aria-hidden="true"
                    className="block w-2.5 h-2.5 bg-brand-yellow flex-shrink-0"
                  />
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
                    Service — Experience & Engineering
                  </p>
                </div>

                <h1 className="font-bold tracking-[-0.025em] text-display-xl text-ink-headline leading-[1.16] max-w-[18ch] text-balance mb-8">
                  Most websites are{" "}
                  <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                    debt
                  </span>
                  . We ship infrastructure.
                </h1>

                <p className="font-body text-body-lg text-ink-body leading-[1.55] max-w-[54ch] mb-10">
                  Sites that hit 95+ Lighthouse on real mobile users, ship new
                  features in days not quarters, and compound with every
                  campaign downstream.
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    href="/book-consultation"
                    className="inline-flex items-center gap-3 bg-brand-yellow text-ink-headline font-display font-light text-display-xs px-8 py-4 hover:bg-emerald-900 hover:text-white transition-colors duration-hover"
                  >
                    <span>Apply for a build audit</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                  <Link
                    href="/solutions/experience-engineering"
                    className="font-mono text-[12px] uppercase tracking-[0.18em] text-ink-headline border-b border-ink-headline pb-0.5 hover:text-ink-headline/60 hover:border-brand-yellow transition-colors"
                  >
                    Parent practice →
                  </Link>
                </div>
              </div>

              {/* Right — performance scorecard */}
              <div className="md:col-span-5 flex items-center justify-center pt-8 md:pt-0">
                <WebPerformanceScorecard />
              </div>
            </div>
          </div>
        </section>

        {/* ─── 2. THE DONE BAR — green spec sheet ─── */}
        <section
          className="bg-emerald-900 text-white"
          aria-labelledby="done-bar-heading"
        >
          <div className="container-layout py-24 md:py-32">
            <div className="grid md:grid-cols-12 gap-8 md:gap-16 mb-14 md:mb-16 items-end">
              <div className="md:col-span-9">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60 mb-6">
                  The done bar
                </p>
                <h2
                  id="done-bar-heading"
                  className="font-bold tracking-[-0.025em] text-display-lg text-white leading-[1.05] max-w-[24ch] text-balance"
                >
                  Six numbers a site has to{" "}
                  <span className="bg-brand-yellow text-ink-headline px-3 py-0.5 box-decoration-clone">
                    hit
                  </span>{" "}
                  before launch.
                </h2>
              </div>
              <div className="md:col-span-3 md:text-right">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60 leading-relaxed">
                  <span className="inline-block w-1.5 h-1.5 bg-brand-yellow mr-2 align-middle" />
                  Acceptance spec
                  <br />
                  Non-negotiable
                </p>
              </div>
            </div>

            {/* Spec header */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 pb-4 border-b border-white/25 mb-2">
              <div className="md:col-span-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                #
              </div>
              <div className="md:col-span-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                Metric
              </div>
              <div className="md:col-span-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                Measured how
              </div>
              <div className="md:col-span-3 font-mono text-[10px] uppercase tracking-[0.2em] text-brand-yellow text-right">
                Threshold
              </div>
            </div>

            <ol>
              {DONE_BAR.map((row) => (
                <li
                  key={row.n}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-6 md:py-7 border-b border-white/15 items-baseline"
                >
                  <div className="md:col-span-1 font-mono text-[11px] uppercase tracking-[0.2em] text-brand-yellow">
                    {row.n}
                  </div>
                  <div className="md:col-span-4">
                    <p className="font-display font-light text-display-sm text-white leading-[1.25] tracking-[-0.005em]">
                      {row.metric}
                    </p>
                  </div>
                  <div className="md:col-span-4">
                    <p className="font-body text-body-sm text-white/70 leading-[1.55]">
                      {row.measure}
                    </p>
                  </div>
                  <div className="md:col-span-3 md:text-right">
                    <p className="font-display font-extralight text-display-md text-brand-yellow leading-[1.1] tracking-[-0.02em]">
                      {row.threshold}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 mt-8">
              Miss one and we don’t ship. The thresholds aren’t aspirational.
            </p>
          </div>
        </section>

        {/* ─── 3. PRINCIPLES ─── */}
        <section
          className="bg-bg-primary border-b border-ink-headline/10"
          aria-labelledby="principles-heading"
        >
          <div className="container-layout py-24 md:py-32">
            <div className="mb-16 md:mb-20 max-w-[1100px]">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-6">
                Principles
              </p>
              <h2
                id="principles-heading"
                className="font-bold tracking-[-0.025em] text-display-xl text-ink-headline leading-[1.02] max-w-[22ch] text-balance"
              >
                Four rules we{" "}
                <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                  engineer from
                </span>
                .
              </h2>
            </div>

            <ol className="grid md:grid-cols-2 gap-x-12 gap-y-14 md:gap-y-16 border-t border-ink-headline/15 pt-12 md:pt-16">
              {PRINCIPLES.map((p) => (
                <li key={p.n} className="flex gap-6 md:gap-8">
                  <div className="shrink-0 pt-2">
                    <span aria-hidden="true" className="block w-3 h-3 bg-brand-yellow mb-3" />
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
                      {p.n}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-display-md text-ink-headline tracking-[-0.02em] leading-[1.12] mb-4 max-w-[24ch]">
                      {p.title}
                    </h3>
                    <p
                      className="font-body text-body text-ink-body leading-[1.6] max-w-[44ch]"
                      dangerouslySetInnerHTML={{ __html: p.body }}
                    />
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ─── 4. BUILD LIBRARY ─── */}
        <section
          className="bg-bg-primary border-b border-ink-headline/10"
          aria-labelledby="build-library-heading"
        >
          <div className="container-layout py-24 md:py-32">
            <div className="grid md:grid-cols-12 gap-8 md:gap-16 mb-16 md:mb-20 items-end">
              <div className="md:col-span-9">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-6">
                  Build library
                </p>
                <h2
                  id="build-library-heading"
                  className="font-bold tracking-[-0.025em] text-display-xl text-ink-headline leading-[1.02] max-w-[22ch] text-balance"
                >
                  Six surface types.{" "}
                  <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                    Twenty-four
                  </span>{" "}
                  build patterns.
                </h2>
              </div>
              <div className="md:col-span-3 md:text-right">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted leading-relaxed">
                  <span className="inline-block w-1.5 h-1.5 bg-brand-yellow mr-2 align-middle" />
                  Type-safe
                  <br />
                  Tokenized · Tested
                </p>
              </div>
            </div>

            <ol className="grid md:grid-cols-2 lg:grid-cols-3 border-l border-t border-ink-headline/15">
              {BUILD_LIBRARY.map((cat, i) => (
                <li
                  key={cat.category}
                  className="group relative p-8 md:p-10 border-r border-b border-ink-headline/15 flex flex-col transition-colors duration-hover hover:bg-bg-secondary"
                >
                  <div className="flex items-baseline justify-between gap-6 mb-6">
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-headline">
                      {String(i + 1).padStart(2, "0")} /{" "}
                      {String(BUILD_LIBRARY.length).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                      {cat.items.length} patterns
                    </span>
                  </div>
                  <span
                    aria-hidden="true"
                    className="block w-3 h-3 bg-brand-yellow mb-5"
                  />
                  <h3 className="font-display font-bold text-display-sm text-ink-headline tracking-[-0.02em] leading-[1.15] mb-5 max-w-[22ch]">
                    {cat.category}
                  </h3>
                  <ul className="space-y-2 mt-2">
                    {cat.items.map((item) => (
                      <li
                        key={item}
                        className="font-body text-body-sm text-ink-body leading-[1.55] flex items-baseline gap-3"
                      >
                        <span
                          aria-hidden="true"
                          className="text-brand-yellow text-[10px]"
                        >
                          ▸
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <span
                    aria-hidden="true"
                    className="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-brand-yellow scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-hover"
                  />
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ─── 5. ARCHITECTURE — stack ─── */}
        <section
          className="bg-bg-primary border-b border-ink-headline/10"
          aria-labelledby="architecture-heading"
        >
          <div className="container-layout py-24 md:py-32">
            <div className="grid md:grid-cols-12 gap-8 md:gap-16 mb-16 md:mb-20 items-end">
              <div className="md:col-span-9">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-6">
                  Architecture
                </p>
                <h2
                  id="architecture-heading"
                  className="font-bold tracking-[-0.025em] text-display-xl text-ink-headline leading-[1.02] max-w-[24ch] text-balance"
                >
                  Five layers behind every{" "}
                  <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                    request
                  </span>
                  .
                </h2>
              </div>
              <div className="md:col-span-3 md:text-right">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted leading-relaxed">
                  <span className="inline-block w-1.5 h-1.5 bg-brand-yellow mr-2 align-middle" />
                  Boring · battle-tested
                  <br />
                  Three-year horizon
                </p>
              </div>
            </div>

            <ol className="border-t border-ink-headline/15">
              {ARCHITECTURE_LAYERS.map((layer, i) => (
                <li
                  key={layer.name}
                  className="group grid md:grid-cols-12 gap-6 md:gap-8 py-8 md:py-10 border-b border-ink-headline/15 hover:bg-bg-secondary transition-colors duration-hover -mx-4 px-4 md:-mx-6 md:px-6"
                >
                  <div className="md:col-span-2">
                    <p className="font-display font-extralight text-display-lg text-ink-headline leading-none tracking-[-0.03em]">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                  </div>
                  <div className="md:col-span-4">
                    <span
                      aria-hidden="true"
                      className="block w-2.5 h-2.5 bg-brand-yellow mb-3"
                    />
                    <h3 className="font-display font-bold text-display-sm text-ink-headline tracking-[-0.02em] leading-[1.15] mb-2">
                      {layer.name}
                    </h3>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
                      {layer.format}
                    </p>
                  </div>
                  <div className="md:col-span-6">
                    <p className="font-body text-body text-ink-body leading-[1.6] max-w-[52ch]">
                      {layer.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ─── 6. PROCESS ─── */}
        <section
          className="bg-bg-secondary border-b border-ink-headline/10"
          aria-labelledby="process-heading"
        >
          <div className="container-layout py-24 md:py-32">
            <div className="grid md:grid-cols-12 gap-8 md:gap-16 items-end mb-16 md:mb-20">
              <div className="md:col-span-9">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-6">
                  Process
                </p>
                <h2
                  id="process-heading"
                  className="font-bold tracking-[-0.025em] text-display-xl text-ink-headline leading-[1.02] max-w-[26ch] text-balance"
                >
                  Twelve weeks from architecture to{" "}
                  <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                    production
                  </span>
                  .
                </h2>
              </div>
              <div className="md:col-span-3 md:text-right">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted leading-relaxed">
                  <span className="inline-block w-1.5 h-1.5 bg-brand-yellow mr-2 align-middle" />
                  6 phases · 12 weeks
                  <br />
                  Operate from month 4
                </p>
              </div>
            </div>

            <ol className="grid md:grid-cols-3 gap-x-8 gap-y-12 border-t border-ink-headline/15 pt-12">
              {PROCESS_PHASES.map((phase, i) => (
                <li key={phase.title} className="relative">
                  <span
                    aria-hidden="true"
                    className="block w-3 h-3 bg-brand-yellow mb-7"
                  />
                  <p className="font-display font-extralight text-display-lg text-ink-headline leading-none tracking-[-0.03em] mb-5">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="font-display font-light text-display-sm text-ink-headline tracking-[-0.01em] leading-[1.15] mb-3">
                    {phase.title}
                  </h3>
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-5">
                    {phase.duration}
                  </p>
                  <p
                    className="font-body text-body text-ink-body leading-relaxed max-w-[34ch]"
                    dangerouslySetInnerHTML={{ __html: phase.body }}
                  />
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ─── 7. LOGO STRIP ─── */}
        <section
          className="bg-bg-primary border-b border-ink-headline/10"
          aria-labelledby="webdev-logos-heading"
        >
          <div className="container-layout py-16 md:py-20">
            <p
              id="webdev-logos-heading"
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-10"
            >
              Sites we’ve engineered
            </p>
            <div className="border-t border-l border-ink-headline/10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-8">
              {FEATURED_LOGOS.map((logo) => (
                <div
                  key={logo.file}
                  className="group relative flex items-center justify-center h-[100px] md:h-[120px] px-6 md:px-8 border-r border-b border-ink-headline/10 transition-colors duration-hover hover:bg-bg-secondary"
                >
                  <Image
                    src={`/client-logos/${logo.file}`}
                    alt={`${logo.name} — Zeppstr client`}
                    width={140}
                    height={60}
                    className="max-h-[55%] w-auto object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-hover"
                    sizes="(max-width: 640px) 50vw, (max-width: 1280px) 25vw, 12vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 8. PRACTICE NUMBERS ─── */}
        <section
          className="bg-bg-primary border-b border-ink-headline/10"
          aria-labelledby="practice-numbers-heading"
        >
          <div className="container-layout py-24 md:py-32">
            <div className="mb-16 md:mb-20">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-6">
                Practice numbers
              </p>
              <h2
                id="practice-numbers-heading"
                className="font-bold tracking-[-0.025em] text-display-xl text-ink-headline leading-[1.02] max-w-[22ch] text-balance"
              >
                What the build{" "}
                <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                  ships at
                </span>
                .
              </h2>
            </div>

            <ol className="grid md:grid-cols-3 border-t border-ink-headline/15">
              {PRACTICE_NUMBERS.map((n, i) => (
                <li
                  key={n.figure}
                  className={`relative py-12 md:py-16 flex flex-col min-w-0 ${
                    i > 0 ? "md:border-l border-ink-headline/15 md:pl-10" : ""
                  } md:pr-10 border-b md:border-b-0 border-ink-headline/15`}
                >
                  <span
                    aria-hidden="true"
                    className="block w-3 h-3 bg-brand-yellow mb-6"
                  />
                  <p className="font-display font-extralight text-display-lg leading-[0.95] tracking-[-0.03em] text-ink-headline mb-6 break-words">
                    {n.figure}
                  </p>
                  <p className="font-display font-light text-display-sm tracking-[-0.01em] text-ink-headline leading-[1.2] mb-3">
                    {n.metric}
                  </p>
                  <p
                    className="font-body text-body text-ink-body leading-[1.5] max-w-[34ch]"
                    dangerouslySetInnerHTML={{ __html: n.detail }}
                  />
                  <p className="mt-auto pt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
                    {n.client}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ─── 9. INDUSTRIES ─── */}
        <section className="bg-bg-primary border-b border-ink-headline/10">
          <div className="container-layout py-20 md:py-24">
            <div className="grid md:grid-cols-12 gap-8 md:gap-16 items-baseline">
              <div className="md:col-span-3">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
                  Industries we engineer for
                </p>
              </div>
              <div className="md:col-span-9 flex flex-wrap gap-x-7 md:gap-x-9 gap-y-3">
                {INDUSTRIES.map((industry) => (
                  <Link
                    key={industry.slug}
                    href={`/industries/${industry.slug}`}
                    className="font-mono text-[13px] uppercase tracking-[0.18em] text-ink-headline border-b border-ink-headline pb-0.5 hover:text-ink-headline/60 hover:border-brand-yellow transition-colors"
                  >
                    {industry.name} →
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── 10. FAQ ─── */}
        <section
          className="bg-bg-primary border-b border-ink-headline/10"
          aria-labelledby="faq-heading"
        >
          <div className="container-layout py-24 md:py-32">
            <div className="mb-16 md:mb-20 max-w-[72ch] mx-auto">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-6">
                FAQ
              </p>
              <h2
                id="faq-heading"
                className="font-bold tracking-[-0.025em] text-display-xl text-ink-headline leading-[1.02] max-w-[22ch] text-balance"
              >
                What founders{" "}
                <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                  actually
                </span>{" "}
                ask.
              </h2>
            </div>

            <div className="max-w-[72ch] mx-auto border-t border-ink-headline/15">
              {FAQS.map((faq) => (
                <details
                  key={faq.question}
                  className="group border-b border-ink-headline/15 py-6"
                >
                  <summary className="flex items-baseline justify-between gap-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                    <h3 className="font-display font-bold text-display-xs text-ink-headline tracking-[-0.01em] leading-[1.3]">
                      {faq.question}
                    </h3>
                    <span
                      aria-hidden="true"
                      className="font-display text-[24px] text-ink-muted shrink-0 transition-transform duration-hover group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p
                    className="font-body text-body text-ink-body leading-relaxed mt-4 max-w-[60ch]"
                    dangerouslySetInnerHTML={{ __html: faq.answer }}
                  />
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 11. BOTTOM CTA ─── */}
        <section className="relative z-10 bg-emerald-900 text-white">
          <div className="container-layout py-32 md:py-48">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/70 mb-12">
              Engage
            </p>

            <h2 className="font-bold tracking-[-0.025em] text-display-stat leading-[1.02] max-w-[22ch] mb-16 md:mb-24 text-white text-balance">
              Stop carrying a debt site.{" "}
              <span className="bg-brand-yellow text-ink-headline px-3 py-0.5 box-decoration-clone">
                Ship infrastructure
              </span>
              .
            </h2>

            <div className="grid md:grid-cols-12 gap-8 md:gap-16 pt-10 border-t border-white/15 items-center">
              <div className="md:col-span-7">
                <p className="font-body text-body-lg text-white/80 leading-[1.5] max-w-[52ch]">
                  A 45-minute paid build audit. We score your performance, your
                  ship velocity, and the debt the site is accruing each
                  quarter. Refunded in full if we’re not the right fit.
                </p>
              </div>
              <div className="md:col-span-5 flex md:justify-end">
                <Link
                  href="/book-consultation"
                  className="inline-flex items-center justify-center bg-brand-yellow text-emerald-900 font-display font-light text-display-sm px-10 py-5 hover:bg-white transition-colors duration-hover"
                >
                  Apply for an audit →
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
