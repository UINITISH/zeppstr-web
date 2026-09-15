import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/meta";
import { GlobalNav } from "@/components/nav/GlobalNav";
import { Footer } from "@/components/nav/Footer";
import { GridOverlay } from "@/components/blocks/GridOverlay";
import { DemandIceberg } from "@/components/utility/DemandIceberg";

// ─────────────────────────────────────────────
// Demand Generation sub-service page (Performance Media).
// Distinct sections — Two Different Jobs (green 2-column creation vs
// capture comparison), hero stats, First 30 Days, Demand Catalog.
// ─────────────────────────────────────────────

export const metadata: Metadata = buildMetadata({
  title: "Demand Generation — Performance Media | Zeppstr",
  description:
    "Stop capturing demand. Create it. Two-funnel demand programs — creation (the 95% that compounds) and capture (the 5% that converts) — operated as one system.",
  path: "/solutions/performance-media/demand-generation",
})

// ─── Content ───

const FEATURED_LOGOS = [
  { name: "Prohance", file: "prohance.png" },
  { name: "Empuls", file: "empuls.png" },
  { name: "Fixstars", file: "fixstars.png" },
  { name: "Twenty One Finance", file: "twenty-one-finance.png" },
  { name: "Wise Market", file: "wise-market.png" },
  { name: "BSG", file: "bsg.png" },
  { name: "iVehicleValue", file: "ivehiclevalue.png" },
  { name: "Tristar Online", file: "tristar-online.png" },
];

// HERO STATS — 3 punchy facts
const HERO_STATS = [
  { figure: "95%", label: "Of pipeline forms below the waterline" },
  { figure: "5%", label: "Of buyers in-market today" },
  { figure: "60 / 40", label: "Recommended creation vs capture split" },
];

// TWO DIFFERENT JOBS — green 2-column creation vs capture
const TWO_JOBS = {
  rows: [
    {
      attribute: "Who you&rsquo;re reaching",
      creation: "95% of buyers · not in-market yet",
      capture: "5% of buyers · in-market this week",
    },
    {
      attribute: "What you&rsquo;re building",
      creation: "Awareness · category authority · trust",
      capture: "Form fills · MQLs · pipeline-this-quarter",
    },
    {
      attribute: "Time horizon",
      creation: "6 – 18 months",
      capture: "0 – 30 days",
    },
    {
      attribute: "Channels",
      creation: "LinkedIn organic · podcast · PR · long-form",
      capture: "Paid search · retargeting · gated content",
    },
    {
      attribute: "Today&rsquo;s budget",
      creation: "~20% (most teams)",
      capture: "~80% (most teams)",
    },
    {
      attribute: "Right budget",
      creation: "~60%",
      capture: "~40%",
    },
  ],
};

// Principles — 4 rules
const PRINCIPLES = [
  {
    n: "01",
    title: "95% above. 5% below.",
    body: "Only 5% of buyers are in-market in any window. The other 95% will buy in the next 6&ndash;18 months. The 95% is where pipeline gets created. The 5% is where it gets captured.",
  },
  {
    n: "02",
    title: "Creation compounds. Capture decays.",
    body: "Spend on capture flatlines at the audience size you&rsquo;ve already saturated. Spend on creation grows the audience the capture engine has to draw from &mdash; for years.",
  },
  {
    n: "03",
    title: "Dark social is the new search.",
    body: "Buyers research in DMs, Slack channels, LinkedIn comments, podcast episodes &mdash; not Google. None of that touches your CRM. The pipeline shows up branded; the source stays invisible.",
  },
  {
    n: "04",
    title: "MQLs lie about source.",
    body: "&ldquo;Direct&rdquo; and &ldquo;organic search&rdquo; are the labels CRMs put on demand that was created elsewhere. We measure pipeline-by-cohort, not credit-by-last-touch.",
  },
];

// FIRST 30 DAYS — week-by-week deliverables
const FIRST_30_DAYS = [
  {
    week: "Week 01",
    label: "Demand audit shipped",
    items: [
      "Creation vs capture split measured",
      "Channel mix scored",
      "Pipeline-source decomposition",
    ],
  },
  {
    week: "Week 02",
    label: "Creation engine spun up",
    items: [
      "LinkedIn organic cadence live",
      "Podcast tour scoped",
      "Long-form research drafted",
    ],
  },
  {
    week: "Week 03",
    label: "Capture engine tightened",
    items: [
      "Search + retargeting rebuilt",
      "Form-friction reduced",
      "MQL → SQL handoff fixed",
    ],
  },
  {
    week: "Week 04",
    label: "First waterline reading",
    items: [
      "Branded search lift visible",
      "Dark-social signal captured",
      "First cohort report shipped",
    ],
  },
];

// DEMAND GEN CATALOG — 6 categories
const DEMAND_CATALOG = [
  {
    category: "Creation Channels",
    items: [
      "LinkedIn organic · founder-led",
      "Podcast tour &amp; production",
      "Long-form research &amp; reports",
      "PR &amp; analyst relations",
    ],
  },
  {
    category: "Capture Channels",
    items: [
      "Paid search · intent-led",
      "Retargeting cohorts",
      "Gated content · lead magnets",
      "Form &amp; friction optimisation",
    ],
  },
  {
    category: "Audience Architecture",
    items: [
      "ICP segment definition",
      "Account list build &amp; tier",
      "Buyer-committee mapping",
      "Cohort &amp; sequence design",
    ],
  },
  {
    category: "Content &amp; Narrative",
    items: [
      "Category-defining POV",
      "Editorial calendar",
      "Asset library &middot; modular",
      "Sales-enablement creative",
    ],
  },
  {
    category: "Measurement Discipline",
    items: [
      "Pipeline source decomposition",
      "Self-reported attribution survey",
      "Branded-search lift tracking",
      "Cohort &amp; vintage analysis",
    ],
  },
  {
    category: "Operating Cadence",
    items: [
      "Weekly channel review",
      "Monthly pipeline readout",
      "Quarterly mix rebalance",
      "Annual creation budget reset",
    ],
  },
];

// ARCHITECTURE — 5 layers
const ARCHITECTURE_LAYERS = [
  {
    name: "Audience Layer",
    format: "ICP · Accounts · Buyer committee",
    description:
      "Who you&rsquo;re reaching. ICP segments defined, account tiers ranked, buyer committees mapped. The cohort behind every channel decision downstream.",
  },
  {
    name: "Creation Layer",
    format: "LinkedIn · Podcast · Long-form · PR",
    description:
      "The 95% engine. Sustained presence in the surfaces buyers research in &mdash; even when they&rsquo;re not buying. Built on cadence, not bursts.",
  },
  {
    name: "Capture Layer",
    format: "Search · Retarget · Gated · Form",
    description:
      "The 5% engine. Catches the in-market buyer the moment they raise a hand. Optimised for friction-removal and source-honest attribution.",
  },
  {
    name: "Handoff Layer",
    format: "MQL → SQL · SDR cadence · CRM hygiene",
    description:
      "Where pipeline lives or dies. MQL definition, scoring, SDR cadence, CRM hygiene. The layer most agencies ignore because it sits beyond &ldquo;marketing.&rdquo;",
  },
  {
    name: "Measurement Layer",
    format: "Cohort · Self-report · Branded lift",
    description:
      "Pipeline measured by cohort and vintage, not last-touch. Self-reported source survey on every form. Branded-search lift tracked as a leading indicator.",
  },
];

// 6 process phases — 12 weeks
const PROCESS_PHASES = [
  {
    title: "Audit",
    duration: "Week 1–2",
    body: "Creation vs capture split today. Channel mix. Pipeline source decomposition. Self-reported source survey baseline. The honest read on where pipeline actually comes from.",
  },
  {
    title: "Creation Stand-up",
    duration: "Week 3–4",
    body: "LinkedIn organic cadence live. Podcast tour scoped. Long-form research drafted. The 95% engine starts producing &mdash; before anyone expects ROI from it.",
  },
  {
    title: "Capture Rebuild",
    duration: "Week 5–6",
    body: "Search + retargeting accounts cleaned. Form friction removed. Gated-content lead magnets refreshed. The 5% engine starts converting more of what creation feeds it.",
  },
  {
    title: "Handoff Fix",
    duration: "Week 7–8",
    body: "MQL definition tightened. SDR cadence rebuilt. CRM hygiene enforced. The layer most pipeline dies in &mdash; fixed before the volume scales.",
  },
  {
    title: "Measurement Lock",
    duration: "Week 9–10",
    body: "Self-reported source survey live on every form. Branded-search lift tracked weekly. Cohort dashboard operational. Decisions get made from cohort lift, not last-touch.",
  },
  {
    title: "Operate &amp; Compound",
    duration: "Week 11+",
    body: "Weekly channel review. Monthly pipeline readout. Quarterly creation-vs-capture rebalance. The compounding starts visible in month 4&ndash;6.",
  },
];

const PRACTICE_NUMBERS = [
  {
    figure: "60 / 40",
    metric: "Creation vs capture",
    detail:
      "Recommended budget split for B2B at growth stage. Most teams ship 20 / 80 and wonder why pipeline is flat.",
    client: "Discipline target",
  },
  {
    figure: "6–18 mo",
    metric: "Creation horizon",
    detail:
      "How long demand creation takes to show in pipeline. Anyone promising faster is selling capture in a creation costume.",
    client: "Honest horizon",
  },
  {
    figure: "Cohort",
    metric: "Attribution unit",
    detail:
      "Not last-click. Cohort + self-reported source + branded-search lift. The only honest way to measure creation&rsquo;s contribution.",
    client: "Measurement standard",
  },
  {
    figure: "Weekly",
    metric: "Channel review cadence",
    detail:
      "Every channel reviewed weekly against its specific KPI &mdash; creation channels on reach + branded lift; capture channels on CPL + cohort yield.",
    client: "Operating rhythm",
  },
];

const INDUSTRIES = [
  { name: "B2B SaaS", slug: "b2b-saas" },
  { name: "Premium Retail", slug: "premium-retail" },
  { name: "Real Estate", slug: "real-estate" },
  { name: "Direct-to-Consumer", slug: "direct-to-consumer" },
  { name: "Multi-brand Operators", slug: "multi-brand-operators" },
];

const FAQS = [
  {
    question: "Will you commit to a CPL or MQL number?",
    answer:
      "On capture, yes &mdash; per channel, post-audit. On creation, no. CPL on creation is the wrong metric &mdash; LinkedIn organic doesn&rsquo;t produce form fills, it produces branded search 9 months later. We commit to the creation KPIs that actually matter (reach, share-of-voice, branded lift) instead.",
  },
  {
    question: "How do you measure dark social?",
    answer:
      "Layered. Self-reported source on every form. Branded search lift weekly. LinkedIn engagement signals. Sales calls referencing podcast episodes or LinkedIn posts. None of these is perfect alone; together they tell the truth that last-touch hides.",
  },
  {
    question: "What if our team can&rsquo;t produce on LinkedIn?",
    answer:
      "Most can&rsquo;t at first. We ghost-write with the founder, train the team on the format, run an editorial cadence, then transition production back to in-house by month 6&ndash;9. The asset is the audience; the founder is the voice.",
  },
  {
    question: "Do we need to be on every channel?",
    answer:
      "No. We pick the two creation channels and two capture channels where your ICP actually lives. Spreading across all of LinkedIn, podcast, YouTube, TikTok, PR, search, retargeting at once dilutes everything.",
  },
  {
    question: "What about ABM?",
    answer:
      "ABM is a way of running the audience layer &mdash; not a separate practice. If account-targeted is the right fit, ABM tactics live inside both the creation and capture engines. We don&rsquo;t treat it as a standalone product.",
  },
  {
    question: "What does it cost?",
    answer:
      "Demand programs start at ₹8L/month for B2B SaaS at growth stage, scaling with creation channel breadth and capture spend managed. 12-month minimum &mdash; the math doesn&rsquo;t work shorter. Quoted post-audit.",
  },
];

// ─────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────

export default function DemandGenerationPage() {
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
            <li className="text-ink-headline">Demand Generation</li>
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

                <h1 className="font-bold tracking-[-0.025em] text-display-xl text-ink-headline leading-[1.16] max-w-[16ch] text-balance mb-8">
                  Stop capturing demand.{" "}
                  <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                    Create it
                  </span>
                  .
                </h1>

                <p className="font-body text-body-lg text-ink-body leading-[1.55] max-w-[54ch] mb-8">
                  Two-funnel demand programs &mdash; creation (the 95% that
                  compounds) and capture (the 5% that converts) &mdash;
                  operated as one system, measured by cohort, not last-touch.
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
                    <span>Apply for a demand audit</span>
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

              {/* Right — demand iceberg */}
              <div className="md:col-span-5 flex items-center justify-center pt-8 md:pt-0">
                <DemandIceberg />
              </div>
            </div>
          </div>
        </section>

        {/* ─── 2. TWO DIFFERENT JOBS — green 2-column ─── */}
        <section
          className="bg-emerald-900 text-white"
          aria-labelledby="two-jobs-heading"
        >
          <div className="container-layout py-24 md:py-32">
            <div className="grid md:grid-cols-12 gap-8 md:gap-16 mb-14 md:mb-16 items-end">
              <div className="md:col-span-9">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60 mb-6">
                  Two different jobs
                </p>
                <h2
                  id="two-jobs-heading"
                  className="font-bold tracking-[-0.025em] text-display-lg text-white leading-[1.05] max-w-[26ch] text-balance"
                >
                  Creation and capture are{" "}
                  <span className="bg-brand-yellow text-ink-headline px-3 py-0.5 box-decoration-clone">
                    different functions
                  </span>
                  .
                </h2>
              </div>
              <div className="md:col-span-3 md:text-right">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60 leading-relaxed">
                  <span className="inline-block w-1.5 h-1.5 bg-brand-yellow mr-2 align-middle" />
                  Confused at most
                  <br />
                  B2B teams
                </p>
              </div>
            </div>

            {/* Two-column comparison header */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 pb-4 border-b border-white/25 mb-2">
              <div className="md:col-span-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                Attribute
              </div>
              <div className="md:col-span-4 font-mono text-[10px] uppercase tracking-[0.2em] text-brand-yellow">
                ↑ Demand creation
              </div>
              <div className="md:col-span-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/55">
                ↓ Demand capture
              </div>
            </div>

            <ol>
              {TWO_JOBS.rows.map((row, i) => {
                // Highlight the budget rows as critical
                const isBudgetRow = row.attribute.toLowerCase().includes("budget");
                return (
                  <li
                    key={i}
                    className={`grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 py-6 md:py-7 items-baseline ${
                      isBudgetRow ? "border-y border-brand-yellow/40 bg-brand-yellow/5" : "border-b border-white/15"
                    }`}
                  >
                    <div className="md:col-span-4">
                      <p
                        className="font-display font-light text-display-xs text-white/70 leading-[1.3] tracking-[-0.005em]"
                        dangerouslySetInnerHTML={{ __html: row.attribute }}
                      />
                    </div>
                    <div className="md:col-span-4">
                      <p
                        className="font-body text-body text-brand-yellow leading-[1.5] font-medium"
                        dangerouslySetInnerHTML={{ __html: row.creation }}
                      />
                    </div>
                    <div className="md:col-span-4">
                      <p
                        className="font-body text-body text-white/75 leading-[1.5]"
                        dangerouslySetInnerHTML={{ __html: row.capture }}
                      />
                    </div>
                  </li>
                );
              })}
            </ol>

            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 mt-8">
              Same channel can&rsquo;t serve both jobs. We staff them as
              separate workstreams, then operate them as one system.
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
                  operate from
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
                  Both engines live by{" "}
                  <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                    week three
                  </span>
                  .
                </h2>
              </div>
              <div className="md:col-span-3 md:text-right">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted leading-relaxed">
                  <span className="inline-block w-1.5 h-1.5 bg-brand-yellow mr-2 align-middle" />
                  Creation seeded
                  <br />
                  Capture rebuilt
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
              Capture earns this quarter. Creation earns next year.
            </p>
          </div>
        </section>

        {/* ─── 4. DEMAND CATALOG ─── */}
        <section
          className="bg-bg-primary border-b border-ink-headline/10"
          aria-labelledby="catalog-heading"
        >
          <div className="container-layout py-24 md:py-32">
            <div className="grid md:grid-cols-12 gap-8 md:gap-16 mb-16 md:mb-20 items-end">
              <div className="md:col-span-9">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-6">
                  Demand catalog
                </p>
                <h2
                  id="catalog-heading"
                  className="font-bold tracking-[-0.025em] text-display-xl text-ink-headline leading-[1.02] max-w-[22ch] text-balance"
                >
                  Six categories.{" "}
                  <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                    Twenty-four
                  </span>{" "}
                  demand disciplines.
                </h2>
              </div>
              <div className="md:col-span-3 md:text-right">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted leading-relaxed">
                  <span className="inline-block w-1.5 h-1.5 bg-brand-yellow mr-2 align-middle" />
                  Creation upstream
                  <br />
                  Capture downstream
                </p>
              </div>
            </div>

            <ol className="grid md:grid-cols-2 lg:grid-cols-3 border-l border-t border-ink-headline/15">
              {DEMAND_CATALOG.map((cat, i) => (
                <li
                  key={cat.category}
                  className="group relative p-8 md:p-10 border-r border-b border-ink-headline/15 flex flex-col transition-colors duration-hover hover:bg-bg-secondary"
                >
                  <div className="flex items-baseline justify-between gap-6 mb-6">
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-headline">
                      {String(i + 1).padStart(2, "0")} /{" "}
                      {String(DEMAND_CATALOG.length).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                      {cat.items.length} disciplines
                    </span>
                  </div>
                  <span
                    aria-hidden="true"
                    className="block w-3 h-3 bg-brand-yellow mb-5"
                  />
                  <h3
                    className="font-display font-bold text-display-sm text-ink-headline tracking-[-0.02em] leading-[1.15] mb-5 max-w-[22ch]"
                    dangerouslySetInnerHTML={{ __html: cat.category }}
                  />
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
                    audience to pipeline
                  </span>
                  .
                </h2>
              </div>
              <div className="md:col-span-3 md:text-right">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted leading-relaxed">
                  <span className="inline-block w-1.5 h-1.5 bg-brand-yellow mr-2 align-middle" />
                  Creation + capture
                  <br />
                  staffed separately
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
                  Twelve weeks to{" "}
                  <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                    both engines running
                  </span>
                  .
                </h2>
              </div>
              <div className="md:col-span-3 md:text-right">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted leading-relaxed">
                  <span className="inline-block w-1.5 h-1.5 bg-brand-yellow mr-2 align-middle" />
                  6 phases · 12 weeks
                  <br />
                  Then quarterly rebalance
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
          aria-labelledby="demand-logos-heading"
        >
          <div className="container-layout py-16 md:py-20">
            <p
              id="demand-logos-heading"
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-10"
            >
              Companies we&rsquo;ve run demand for
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
                  insists on
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
                  Industries we run demand for
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
              Stop chasing the 5%.{" "}
              <span className="bg-brand-yellow text-ink-headline px-3 py-0.5 box-decoration-clone">
                Build the 95%
              </span>
              .
            </h2>

            <div className="grid md:grid-cols-12 gap-8 md:gap-16 pt-10 border-t border-white/15 items-center">
              <div className="md:col-span-7">
                <p className="font-body text-body-lg text-white/80 leading-[1.5] max-w-[52ch]">
                  A 45-minute paid demand audit. We split your spend into
                  creation vs capture, name the channels each is
                  under-investing in, and scope the 12-month rebalance.
                  Refunded if we&rsquo;re not the right fit.
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
