import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/meta";
import { GlobalNav } from "@/components/nav/GlobalNav";
import { Footer } from "@/components/nav/Footer";
import { GridOverlay } from "@/components/blocks/GridOverlay";
import { CreativeScrollFeed } from "@/components/utility/CreativeScrollFeed";

// ─────────────────────────────────────────────
// Paid Social sub-service page (Performance Media).
// Distinct sections — The Creative Power Law (green distribution math
// block), hero stats, First 30 Days, Paid Social Catalog, Architecture.
// ─────────────────────────────────────────────

export const metadata: Metadata = buildMetadata({
  title: "Paid Social — Performance Media | Zeppstr",
  description:
    "Most paid social fails on creative, not targeting. We run paid social as a creative production line — native, tested at volume, killed fast, winners doubled.",
  path: "/solutions/performance-media/paid-social",
})

// ─── Content ───

const FEATURED_LOGOS = [
  { name: "Mini Leaves", file: "mini-leaves.png" },
  { name: "Wise Market", file: "wise-market.png" },
  { name: "My Keto Co", file: "my-keto-co.png" },
  { name: "Tristar Online", file: "tristar-online.png" },
  { name: "Aishwarya Interiors", file: "aishwarya-interiors.png" },
  { name: "Tru Aquapolis", file: "tru-aquapolis.png" },
  { name: "Sky Phonez", file: "sky-phonez.png" },
  { name: "Lucky White Goods", file: "lucky-white-goods.png" },
];

// HERO STATS — 3 punchy facts
const HERO_STATS = [
  { figure: "70%", label: "Of paid social performance is creative" },
  { figure: "30+", label: "Creatives shipped monthly · standard" },
  { figure: "1 in 5", label: "Tests that produce a winner" },
];

// CREATIVE POWER LAW — green distribution math block
const POWER_LAW_ROWS = [
  {
    band: "Top 20%",
    pctOfCreatives: "20%",
    pctOfRevenue: "80%",
    note: "The winners. Doubled, refreshed, defended.",
    isHero: true,
  },
  {
    band: "Middle 30%",
    pctOfCreatives: "30%",
    pctOfRevenue: "15%",
    note: "Holding ground. Iterate quickly or sunset.",
    isHero: false,
  },
  {
    band: "Bottom 50%",
    pctOfCreatives: "50%",
    pctOfRevenue: "5%",
    note: "Already dead. Most accounts keep running them anyway.",
    isHero: false,
  },
];

// Principles — 4 rules
const PRINCIPLES = [
  {
    n: "01",
    title: "Creative is 70%.",
    body: "Targeting is 20%. Bidding is 10%. The platforms have automated the cheap parts; the only lever you still own is the creative work. Spend the time accordingly.",
  },
  {
    n: "02",
    title: "Native &gt; polished.",
    body: "Ads that look like ads get scrolled past. Ads that look like content earn the click and survive. The era of agency-polished hero films converting cold audiences is over.",
  },
  {
    n: "03",
    title: "Throughput &gt; perfection.",
    body: "One ad per quarter optimised to death loses to thirty ads per month tested honestly. The algorithm needs volume to learn what works. So do we.",
  },
  {
    n: "04",
    title: "Kill fast. Double winners.",
    body: "A creative that hasn&rsquo;t found product-market fit by Day 5 won&rsquo;t. Retire it. A creative beating ROAS targets gets fresh variants, more spend, and protection from fatigue.",
  },
];

// FIRST 30 DAYS — week-by-week deliverables
const FIRST_30_DAYS = [
  {
    week: "Week 01",
    label: "Account audit shipped",
    items: [
      "Creative inventory + decay map",
      "Audience overlap scored",
      "Pixel + attribution baseline",
    ],
  },
  {
    week: "Week 02",
    label: "Creative line spun up",
    items: [
      "30-concept brief shipped",
      "Production lane wired up",
      "Native-style standards locked",
    ],
  },
  {
    week: "Week 03",
    label: "First test cohort live",
    items: [
      "10 creatives launched",
      "Test framework operating",
      "Performance dashboard live",
    ],
  },
  {
    week: "Week 04",
    label: "First winners + first kills",
    items: [
      "Day-5 cull complete",
      "Winners scaled + protected",
      "Next 10 concepts in production",
    ],
  },
];

// PAID SOCIAL CATALOG — 6 categories
const PAID_SOCIAL_CATALOG = [
  {
    category: "Creative Production",
    items: [
      "Concept brief · 30 per month",
      "Native-style standards",
      "Hook library · proven openers",
      "UGC-style scripted production",
    ],
  },
  {
    category: "Testing Framework",
    items: [
      "Test cell design · MDE-aware",
      "Day-5 cull threshold",
      "Variant-on-winner protocol",
      "Holdout cells for incrementality",
    ],
  },
  {
    category: "Audience Architecture",
    items: [
      "Cold prospecting structure",
      "Custom audience hierarchy",
      "Retargeting cohort design",
      "Lookalike refresh cadence",
    ],
  },
  {
    category: "Platform Mix",
    items: [
      "Meta · feed · reels · stories",
      "TikTok · native-first",
      "LinkedIn · B2B specific",
      "YouTube Shorts · longform",
    ],
  },
  {
    category: "Performance Measurement",
    items: [
      "Cohort ROAS · not platform",
      "Creative-level attribution",
      "Saturation &amp; fatigue tracking",
      "Cross-channel incrementality",
    ],
  },
  {
    category: "Operating Cadence",
    items: [
      "Weekly creative review",
      "Monthly performance readout",
      "Quarterly platform-mix rebalance",
      "Always-on hook research",
    ],
  },
];

// ARCHITECTURE — 5 layers
const ARCHITECTURE_LAYERS = [
  {
    name: "Creative Layer",
    format: "Production line · 30+ creatives / month",
    description:
      "Where the work actually happens. A briefed, produced, shipped, measured creative pipeline that treats throughput as the strategic asset &mdash; not the cost.",
  },
  {
    name: "Testing Layer",
    format: "Day-5 cull · Variant-on-winner",
    description:
      "The discipline that turns volume into learning. Tests designed for minimum detectable effect, killed at Day 5 if no signal, doubled on winners with fresh variants.",
  },
  {
    name: "Audience Layer",
    format: "Cold · Warm · Lookalike · Retarget",
    description:
      "Cohort architecture that respects the journey. Cold prospecting tested at the creative level; warm retargeting tested at the offer level. Different creative, different intent.",
  },
  {
    name: "Platform Layer",
    format: "Meta · TikTok · LinkedIn · YouTube",
    description:
      "Native by platform. Same brand, different surface logic. Reels formats for Meta, vertical native for TikTok, longform thought leadership for LinkedIn &mdash; never cross-posted.",
  },
  {
    name: "Measurement Layer",
    format: "Cohort ROAS · Creative attribution · Incrementality",
    description:
      "Platform-reported ROAS overstates paid&rsquo;s contribution by 30&ndash;60%. We measure cohort lift, holdout-tested incremental revenue, and creative-level attribution.",
  },
];

// 6 process phases — 12 weeks
const PROCESS_PHASES = [
  {
    title: "Audit &amp; Inventory",
    duration: "Week 1–2",
    body: "Creative decay map, audience overlap, pixel integrity, attribution baseline. The leak points scored before any new creative is briefed.",
  },
  {
    title: "Creative Line",
    duration: "Week 3–4",
    body: "Production lane stood up. 30-concept brief shipped. Native-style standards locked. The factory floor exists before the first test goes live.",
  },
  {
    title: "Test Cohort 01",
    duration: "Week 5–6",
    body: "First 10 creatives launched. Test framework operating with MDE-aware cells. Day-5 cull discipline applied without sentiment.",
  },
  {
    title: "Test Cohort 02",
    duration: "Week 7–8",
    body: "Winners from cohort 01 scaled and protected from fatigue. Next 10 creatives launched. Audience architecture refined from learning.",
  },
  {
    title: "Measurement Lock",
    duration: "Week 9–10",
    body: "Cohort attribution operational. Holdout cells running. Incrementality measured. Decisions get made from cohort lift, not platform reports.",
  },
  {
    title: "Operate &amp; Compound",
    duration: "Week 11+",
    body: "Weekly creative review. Monthly performance readout. Quarterly platform-mix rebalance. The account runs on cadence, not heroics.",
  },
];

const PRACTICE_NUMBERS = [
  {
    figure: "30+",
    metric: "Creatives shipped monthly",
    detail:
      "Standard throughput. Below 20 per month, the algorithm under-learns; above 50, briefing quality collapses.",
    client: "Standard cadence",
  },
  {
    figure: "Day 5",
    metric: "Cull threshold",
    detail:
      "If a creative hasn&rsquo;t hit signal by Day 5, it won&rsquo;t. Retired without sentiment, slot opened for the next test.",
    client: "Testing discipline",
  },
  {
    figure: "1 in 5",
    metric: "Tests that win",
    detail:
      "Industry-realistic win rate. The 4 that lose are the work, not the failure. Each loss informs the next concept.",
    client: "Across the practice",
  },
  {
    figure: "4–6×",
    metric: "ROAS · top winners",
    detail:
      "What the 20% of creatives that drive 80% of revenue look like. The math justifies the throughput.",
    client: "Peak creative tier",
  },
];

const INDUSTRIES = [
  { name: "Direct-to-Consumer", slug: "direct-to-consumer" },
  { name: "B2B SaaS", slug: "b2b-saas" },
  { name: "Premium Retail", slug: "premium-retail" },
  { name: "Real Estate", slug: "real-estate" },
  { name: "Multi-brand Operators", slug: "multi-brand-operators" },
];

const FAQS = [
  {
    question: "Do you produce the creative or just buy media?",
    answer:
      "We produce. Concept, brief, script, edit, ship. We don&rsquo;t outsource the most leveraged part of paid social to a separate agency &mdash; the creative team and the media team share a Slack channel and a dashboard.",
  },
  {
    question: "How do you decide which platforms to run on?",
    answer:
      "Audience-led, not budget-led. We map where your buyer actually spends time, then test the two highest-fit platforms first. Spreading across all platforms early dilutes the learning signal.",
  },
  {
    question: "Will Advantage+ / Performance Max replace creative work?",
    answer:
      "No. Algorithmic placement decisions improved; algorithmic creative still under-performs human-led creative at every account size we&rsquo;ve measured. The platform automates the parts that don&rsquo;t matter.",
  },
  {
    question: "What if we already have a brand book and locked visual guidelines?",
    answer:
      "We work within them &mdash; mostly. Brand books designed for owned channels often choke paid social creative (too polished, too brand-forward). We&rsquo;ll either negotiate a paid-social addendum or run the creative tier explicitly outside brand for testing.",
  },
  {
    question: "How do you handle creative fatigue at scale?",
    answer:
      "Rolling refresh cadence (typically 6&ndash;10 weeks per winner), variant-on-winner production, and saturation tracking per audience cohort. Winners get protected before they decay, not after.",
  },
  {
    question: "What does it cost?",
    answer:
      "Paid Social programs start at ₹6L/month for spend under ₹20L/month, scaling with managed spend + creative throughput. 6-month minimum. Quoted post-audit. Flat fee, not % of spend.",
  },
];

// ─────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────

export default function PaidSocialPage() {
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
                href="/solutions/performance-media"
                className="hover:text-ink-headline transition-colors"
              >
                Performance Media
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-ink-headline">Paid Social</li>
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
                    Service — Performance Media
                  </p>
                </div>

                <h1 className="font-bold tracking-[-0.025em] text-display-xl text-ink-headline leading-[1.16] max-w-[18ch] text-balance mb-8">
                  Stop running ads.{" "}
                  <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                    Produce creative
                  </span>
                  .
                </h1>

                <p className="font-body text-body-lg text-ink-body leading-[1.55] max-w-[54ch] mb-8">
                  Paid social is 70% creative, 20% targeting, 10% bidding. We
                  run it as a production line &mdash; native, tested at volume,
                  killed fast, winners doubled.
                </p>

                {/* Hero stats strip */}
                <div className="grid grid-cols-3 gap-4 md:gap-6 py-6 mb-10 border-y border-ink-headline/15">
                  {HERO_STATS.map((stat, i) => (
                    <div key={i} className={i > 0 ? "md:pl-6 md:border-l border-ink-headline/15" : ""}>
                      <p className="font-display font-extralight text-display-md text-ink-headline leading-[1.1] tracking-[-0.02em] mb-1">
                        {stat.figure}
                      </p>
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted leading-[1.4]">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    href="/book-consultation"
                    className="inline-flex items-center gap-3 bg-brand-yellow text-ink-headline font-display font-light text-display-xs px-8 py-4 hover:bg-emerald-900 hover:text-white transition-colors duration-hover"
                  >
                    <span>Apply for a creative audit</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                  <Link
                    href="/solutions/performance-media"
                    className="font-mono text-[12px] uppercase tracking-[0.18em] text-ink-headline border-b border-ink-headline pb-0.5 hover:text-ink-headline/60 hover:border-brand-yellow transition-colors"
                  >
                    Parent practice →
                  </Link>
                </div>
              </div>

              {/* Right — creative scroll feed */}
              <div className="md:col-span-5 flex items-center justify-center pt-8 md:pt-0">
                <CreativeScrollFeed />
              </div>
            </div>
          </div>
        </section>

        {/* ─── 2. CREATIVE POWER LAW — green distribution math ─── */}
        <section
          className="bg-emerald-900 text-white"
          aria-labelledby="power-law-heading"
        >
          <div className="container-layout py-24 md:py-32">
            <div className="grid md:grid-cols-12 gap-8 md:gap-16 mb-14 md:mb-16 items-end">
              <div className="md:col-span-9">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60 mb-6">
                  The creative power law
                </p>
                <h2
                  id="power-law-heading"
                  className="font-bold tracking-[-0.025em] text-display-lg text-white leading-[1.05] max-w-[24ch] text-balance"
                >
                  Twenty percent of creative drives{" "}
                  <span className="bg-brand-yellow text-ink-headline px-3 py-0.5 box-decoration-clone">
                    eighty
                  </span>{" "}
                  of revenue.
                </h2>
              </div>
              <div className="md:col-span-3 md:text-right">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60 leading-relaxed">
                  <span className="inline-block w-1.5 h-1.5 bg-brand-yellow mr-2 align-middle" />
                  Distribution math
                  <br />
                  Not aspiration
                </p>
              </div>
            </div>

            {/* Header */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 pb-4 border-b border-white/25 mb-2">
              <div className="md:col-span-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                Creative band
              </div>
              <div className="md:col-span-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                % of creatives
              </div>
              <div className="md:col-span-3 font-mono text-[10px] uppercase tracking-[0.2em] text-brand-yellow">
                % of revenue
              </div>
              <div className="md:col-span-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                What you do with it
              </div>
            </div>

            <ol>
              {POWER_LAW_ROWS.map((row, i) => (
                <li
                  key={row.band}
                  className={`grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 py-7 md:py-8 items-baseline ${
                    row.isHero
                      ? "border-y-2 border-brand-yellow bg-brand-yellow/10"
                      : "border-b border-white/15"
                  }`}
                >
                  <div className="md:col-span-3">
                    <p
                      className={`font-display ${
                        row.isHero ? "font-bold text-brand-yellow" : "font-light text-white"
                      } text-display-sm leading-[1.15] tracking-[-0.015em]`}
                    >
                      {row.band}
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/65">
                      {row.pctOfCreatives}
                    </p>
                    {/* Inline mini-bar showing % of creatives */}
                    <div className="mt-2 h-1 w-full bg-white/15 max-w-[120px]">
                      <div
                        className="h-full bg-white/45"
                        style={{ width: row.pctOfCreatives }}
                      />
                    </div>
                  </div>
                  <div className="md:col-span-3">
                    <p
                      className={`font-display ${
                        row.isHero ? "font-light text-brand-yellow" : "font-extralight text-white"
                      } text-display-sm leading-[1.1] tracking-[-0.02em]`}
                    >
                      {row.pctOfRevenue}
                    </p>
                    {/* Inline mini-bar showing % of revenue */}
                    <div className="mt-2 h-1 w-full bg-white/15 max-w-[160px]">
                      <div
                        className="h-full bg-brand-yellow"
                        style={{ width: row.pctOfRevenue }}
                      />
                    </div>
                  </div>
                  <div className="md:col-span-4">
                    <p
                      className={`font-body text-body-sm leading-[1.5] ${
                        row.isHero ? "text-white font-medium" : "text-white/65"
                      }`}
                    >
                      {row.note}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 mt-8">
              The 20% is the work. The 50% is the cost of finding them.
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
                  test from
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
                    <h3
                      className="font-display font-bold text-display-md text-ink-headline tracking-[-0.02em] leading-[1.12] mb-4 max-w-[24ch]"
                      dangerouslySetInnerHTML={{ __html: p.title }}
                    />
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

        {/* ─── 3.5. FIRST 30 DAYS ─── */}
        <section
          className="bg-bg-secondary border-b border-ink-headline/10"
          aria-labelledby="first-30-heading"
        >
          <div className="container-layout py-24 md:py-32">
            <div className="grid md:grid-cols-12 gap-8 md:gap-16 mb-16 md:mb-20 items-end">
              <div className="md:col-span-9">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-6">
                  First 30 days
                </p>
                <h2
                  id="first-30-heading"
                  className="font-bold tracking-[-0.025em] text-display-xl text-ink-headline leading-[1.02] max-w-[24ch] text-balance"
                >
                  Concrete ground gained{" "}
                  <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                    every week
                  </span>
                  .
                </h2>
              </div>
              <div className="md:col-span-3 md:text-right">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted leading-relaxed">
                  <span className="inline-block w-1.5 h-1.5 bg-brand-yellow mr-2 align-middle" />
                  Creative line by week 02
                  <br />
                  First winners by week 04
                </p>
              </div>
            </div>

            <ol className="grid md:grid-cols-4 gap-px bg-ink-headline/15 border border-ink-headline/15">
              {FIRST_30_DAYS.map((wk, i) => (
                <li
                  key={wk.week}
                  className="bg-bg-secondary p-8 md:p-10 flex flex-col"
                >
                  <div className="flex items-baseline justify-between mb-6">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-headline">
                      {wk.week}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                      {String(i + 1).padStart(2, "0")} / 04
                    </span>
                  </div>
                  <span aria-hidden="true" className="block w-3 h-3 bg-brand-yellow mb-4" />
                  <h3 className="font-display font-bold text-display-sm text-ink-headline tracking-[-0.015em] leading-[1.18] mb-5 max-w-[20ch]">
                    {wk.label}
                  </h3>
                  <ul className="space-y-2 mt-auto">
                    {wk.items.map((item) => (
                      <li
                        key={item}
                        className="font-body text-body-sm text-ink-body leading-[1.5] flex items-baseline gap-2.5"
                      >
                        <span
                          aria-hidden="true"
                          className="text-brand-yellow text-[10px] shrink-0"
                        >
                          ●
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>

            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted mt-8">
              Concrete deliverables. Each week ships work, not promises.
            </p>
          </div>
        </section>

        {/* ─── 4. PAID SOCIAL CATALOG ─── */}
        <section
          className="bg-bg-primary border-b border-ink-headline/10"
          aria-labelledby="catalog-heading"
        >
          <div className="container-layout py-24 md:py-32">
            <div className="grid md:grid-cols-12 gap-8 md:gap-16 mb-16 md:mb-20 items-end">
              <div className="md:col-span-9">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-6">
                  Paid social catalog
                </p>
                <h2
                  id="catalog-heading"
                  className="font-bold tracking-[-0.025em] text-display-xl text-ink-headline leading-[1.02] max-w-[22ch] text-balance"
                >
                  Six categories.{" "}
                  <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                    Twenty-four
                  </span>{" "}
                  paid-social disciplines.
                </h2>
              </div>
              <div className="md:col-span-3 md:text-right">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted leading-relaxed">
                  <span className="inline-block w-1.5 h-1.5 bg-brand-yellow mr-2 align-middle" />
                  Production-led
                  <br />
                  Volume-tested
                </p>
              </div>
            </div>

            <ol className="grid md:grid-cols-2 lg:grid-cols-3 border-l border-t border-ink-headline/15">
              {PAID_SOCIAL_CATALOG.map((cat, i) => (
                <li
                  key={cat.category}
                  className="group relative p-8 md:p-10 border-r border-b border-ink-headline/15 flex flex-col transition-colors duration-hover hover:bg-bg-secondary"
                >
                  <div className="flex items-baseline justify-between gap-6 mb-6">
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-headline">
                      {String(i + 1).padStart(2, "0")} /{" "}
                      {String(PAID_SOCIAL_CATALOG.length).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                      {cat.items.length} disciplines
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
                        <span dangerouslySetInnerHTML={{ __html: item }} />
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

        {/* ─── 5. ARCHITECTURE ─── */}
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
                  Five layers from{" "}
                  <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                    brief to ROAS
                  </span>
                  .
                </h2>
              </div>
              <div className="md:col-span-3 md:text-right">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted leading-relaxed">
                  <span className="inline-block w-1.5 h-1.5 bg-brand-yellow mr-2 align-middle" />
                  Creative-first
                  <br />
                  Measurement-honest
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
                    <p
                      className="font-body text-body text-ink-body leading-[1.6] max-w-[52ch]"
                      dangerouslySetInnerHTML={{ __html: layer.description }}
                    />
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
                  Eleven weeks to a{" "}
                  <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                    learning machine
                  </span>
                  .
                </h2>
              </div>
              <div className="md:col-span-3 md:text-right">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted leading-relaxed">
                  <span className="inline-block w-1.5 h-1.5 bg-brand-yellow mr-2 align-middle" />
                  6 phases · 11 weeks
                  <br />
                  Then weekly cadence
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
                  <h3
                    className="font-display font-light text-display-sm text-ink-headline tracking-[-0.01em] leading-[1.15] mb-3"
                    dangerouslySetInnerHTML={{ __html: phase.title }}
                  />
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
          aria-labelledby="social-logos-heading"
        >
          <div className="container-layout py-16 md:py-20">
            <p
              id="social-logos-heading"
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-10"
            >
              Brands we&rsquo;ve scaled on paid social
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
                What the program{" "}
                <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                  runs at
                </span>
                .
              </h2>
            </div>

            <ol className="grid md:grid-cols-2 lg:grid-cols-4 border-t border-l border-ink-headline/15">
              {PRACTICE_NUMBERS.map((n) => (
                <li
                  key={n.figure}
                  className="relative py-12 md:py-14 px-6 md:px-8 flex flex-col min-w-0 border-r border-b border-ink-headline/15"
                >
                  <span
                    aria-hidden="true"
                    className="block w-3 h-3 bg-brand-yellow mb-6"
                  />
                  <p className="font-display font-extralight text-display-lg leading-[0.95] tracking-[-0.03em] text-ink-headline mb-5 break-words">
                    {n.figure}
                  </p>
                  <p className="font-display font-light text-display-xs tracking-[-0.005em] text-ink-headline leading-[1.2] mb-3">
                    {n.metric}
                  </p>
                  <p
                    className="font-body text-body-sm text-ink-body leading-[1.5] max-w-[34ch]"
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
                  Industries we run paid social for
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
            <div className="mb-16 md:mb-20">
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

            <div className="max-w-[64ch] border-t border-ink-headline/15">
              {FAQS.map((faq) => (
                <details
                  key={faq.question}
                  className="group border-b border-ink-headline/15 py-6"
                >
                  <summary className="flex items-baseline justify-between gap-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                    <h3
                      className="font-display font-bold text-display-xs text-ink-headline tracking-[-0.01em] leading-[1.3]"
                      dangerouslySetInnerHTML={{ __html: faq.question }}
                    />
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
              Stop boosting posts.{" "}
              <span className="bg-brand-yellow text-ink-headline px-3 py-0.5 box-decoration-clone">
                Run a line
              </span>
              .
            </h2>

            <div className="grid md:grid-cols-12 gap-8 md:gap-16 pt-10 border-t border-white/15 items-center">
              <div className="md:col-span-7">
                <p className="font-body text-body-lg text-white/80 leading-[1.5] max-w-[52ch]">
                  A 45-minute paid creative audit. We pull your creative
                  inventory, your fatigue map, your win-rate distribution
                  &mdash; live on the call &mdash; and scope the production
                  line to lift it. Refunded if we&rsquo;re not the right fit.
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
