import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/meta";
import { GlobalNav } from "@/components/nav/GlobalNav";
import { Footer } from "@/components/nav/Footer";
import { GridOverlay } from "@/components/blocks/GridOverlay";
import { SpendAllocationDial } from "@/components/utility/SpendAllocationDial";

// ─────────────────────────────────────────────
// Paid Search sub-service page (Performance Media).
// Distinct sections — The Bid Ladder (green 5-rung step diagram),
// hero stats strip, First 30 Days, Paid Catalog, Architecture, Process.
// ─────────────────────────────────────────────

export const metadata: Metadata = buildMetadata({
  title: "Paid Search — Performance Media | Zeppstr",
  description:
    "Stop bidding on keywords. Start buying intent. Paid search built as a portfolio — Brand, Non-brand, Conquest, Long-tail, Remarketing — optimised for revenue, not position.",
  path: "/solutions/performance-media/paid-search",
})

// ─── Content ───

const FEATURED_LOGOS = [
  { name: "Wise Market", file: "wise-market.png" },
  { name: "Tru Aquapolis", file: "tru-aquapolis.png" },
  { name: "Mini Leaves", file: "mini-leaves.png" },
  { name: "Empuls", file: "empuls.png" },
  { name: "Tristar Online", file: "tristar-online.png" },
  { name: "iVehicleValue", file: "ivehiclevalue.png" },
  { name: "Twenty One Finance", file: "twenty-one-finance.png" },
  { name: "Aishwarya Interiors", file: "aishwarya-interiors.png" },
];

// HERO STATS — 3 punchy facts
const HERO_STATS = [
  { figure: "4.2×", label: "Standard ROAS target" },
  { figure: "−32%", label: "CPC after account rebuild" },
  { figure: "5 buckets", label: "Spend split by intent" },
];

// THE BID LADDER — 5-rung step diagram
const BID_LADDER = [
  {
    n: "01",
    rung: "Min bid",
    position: "Position 8+",
    outcome: "No traffic. Money sleeps in the account.",
    state: "starved",
  },
  {
    n: "02",
    rung: "Below market",
    position: "Position 5–7",
    outcome: "Leaky CTR. Click cost low but volume too thin to learn.",
    state: "leaky",
  },
  {
    n: "03",
    rung: "Market rate",
    position: "Position 3–4",
    outcome: "Balanced ROAS. The discipline sweet spot.",
    state: "sweet",
  },
  {
    n: "04",
    rung: "Premium bid",
    position: "Position 1–2",
    outcome: "Peak CTR. ROAS starts dropping — paying for clicks you would have won at #3.",
    state: "premium",
  },
  {
    n: "05",
    rung: "Hostile bid",
    position: "Always #1",
    outcome: "ROAS-negative. Winning the auction by losing the account.",
    state: "hostile",
  },
];

// Principles — 4 rules
const PRINCIPLES = [
  {
    n: "01",
    title: "Bid for revenue.",
    body: "Not clicks. Not position. Every bid decision is a revenue decision &mdash; modelled, tested, owned. The platform&rsquo;s auto-bid optimises for the platform; we optimise for the P&amp;L.",
  },
  {
    n: "02",
    title: "Account architecture &gt; bid management.",
    body: "A well-structured account with average bidding beats a chaotic account with brilliant bidding every time. We fix the structure first &mdash; ad groups, match types, negatives, landing pages &mdash; before touching the bid lever.",
  },
  {
    n: "03",
    title: "Brand and non-brand are different jobs.",
    body: "Brand defends what you already earned. Non-brand acquires new demand. Conquest steals from competitors. They have different ROAS expectations, different creatives, different landing pages. Confuse them and you waste both.",
  },
  {
    n: "04",
    title: "Quality Score is the silent multiplier.",
    body: "A Quality Score of 8 costs half a Quality Score of 4 for the same position. Most accounts ignore it. We treat it as the lever that compounds everything else.",
  },
];

// FIRST 30 DAYS — week-by-week deliverables
const FIRST_30_DAYS = [
  {
    week: "Week 01",
    label: "Account audit shipped",
    items: [
      "Spend by bucket measured",
      "Wasted-spend cells identified",
      "QS distribution mapped",
    ],
  },
  {
    week: "Week 02",
    label: "Structure rebuild",
    items: [
      "Ad groups re-architected by intent",
      "Match-type discipline enforced",
      "Negative-keyword library installed",
    ],
  },
  {
    week: "Week 03",
    label: "Creative + LP refresh",
    items: [
      "Ad copy variants live",
      "Landing pages aligned to intent",
      "Brand vs non-brand creatives split",
    ],
  },
  {
    week: "Week 04",
    label: "First ROAS lift",
    items: [
      "QS improvements compound",
      "Wasted-spend buckets shut",
      "First weekly readout shipped",
    ],
  },
];

// PAID CATALOG — 6 categories
const PAID_CATALOG = [
  {
    category: "Account Architecture",
    items: [
      "Intent-led campaign structure",
      "Ad-group granularity",
      "Match-type discipline",
      "Negative-keyword library",
    ],
  },
  {
    category: "Bid &amp; Budget Strategy",
    items: [
      "Bucket-level budget allocation",
      "Bid strategy per intent type",
      "Day-parting · device-modifier",
      "Auto-bid governance",
    ],
  },
  {
    category: "Creative &amp; Copy",
    items: [
      "Ad copy testing framework",
      "Sitelinks · callouts · structured snippets",
      "Responsive search ads · pinned variants",
      "Brand vs non-brand voice",
    ],
  },
  {
    category: "Landing Page Alignment",
    items: [
      "Intent-matched landing pages",
      "Message-match audit",
      "Form &amp; checkout friction review",
      "Mobile-first surface check",
    ],
  },
  {
    category: "Quality Score Work",
    items: [
      "QS audit · component breakdown",
      "CTR diagnostics · uplift plan",
      "Relevance &amp; LP experience fixes",
      "Historical QS rehabilitation",
    ],
  },
  {
    category: "Measurement &amp; Attribution",
    items: [
      "Cross-channel attribution model",
      "Cohort ROAS · not last-click",
      "Holdout testing · incrementality",
      "Weekly cell-level reporting",
    ],
  },
];

// ARCHITECTURE — 5 layers
const ARCHITECTURE_LAYERS = [
  {
    name: "Intent Layer",
    format: "Brand · Non-brand · Conquest · Long-tail · Remarketing",
    description:
      "Every keyword classified by intent type before it enters the account. The bucket decides the bid logic, the creative, the landing page, the ROAS expectation.",
  },
  {
    name: "Structure Layer",
    format: "Campaigns · Ad groups · Match types · Negatives",
    description:
      "The account chassis. Tight ad groups, disciplined match types, comprehensive negative-keyword library. The single biggest determinant of QS &mdash; and of every cost downstream.",
  },
  {
    name: "Creative Layer",
    format: "Ad copy · Sitelinks · Pinned variants",
    description:
      "Ad copy aligned to keyword intent. Sitelinks, callouts, and structured snippets that earn higher slots without higher bids. Tested in pairs, not in isolation.",
  },
  {
    name: "Landing Layer",
    format: "LP per intent · Message match · Friction",
    description:
      "The page the click lands on. Message-match with the ad. Friction removed. Mobile-first. The layer most accounts under-spec &mdash; and the one CRO compounds with.",
  },
  {
    name: "Measurement Layer",
    format: "Cohort ROAS · Attribution · Holdout",
    description:
      "Cohort-level ROAS, not platform-reported. Multi-touch attribution backed by an identity layer. Holdout tests for incrementality. The platform won&rsquo;t mark its own homework.",
  },
];

// 6 process phases — 12 weeks
const PROCESS_PHASES = [
  {
    title: "Account Audit",
    duration: "Week 1–2",
    body: "Spend by bucket, QS distribution, wasted-spend cells, attribution gaps. Written diagnostic with the leak points scored.",
  },
  {
    title: "Structure Rebuild",
    duration: "Week 3–4",
    body: "Ad groups re-architected by intent. Match types disciplined. Negative-keyword library installed. The chassis fixed before bids are touched.",
  },
  {
    title: "Creative &amp; LP",
    duration: "Week 5–6",
    body: "Ad copy variants live. Landing pages aligned to intent. Brand and non-brand split into distinct surfaces. QS starts climbing.",
  },
  {
    title: "Bid Strategy",
    duration: "Week 7–8",
    body: "Bid strategy per bucket configured. Day-parting and device modifiers tuned. Auto-bid governance set. Now we lift the bid lever &mdash; on a sound structure.",
  },
  {
    title: "Measurement Lock",
    duration: "Week 9–10",
    body: "Cohort attribution operational. Holdout cells running. Weekly reporting templated. Decisions get made from cohort ROAS, not platform reports.",
  },
  {
    title: "Operate &amp; Compound",
    duration: "Week 11+",
    body: "Weekly cell-level review. Wasted-spend buckets shut as they appear. New tests prioritised. The account compounds instead of bleeding.",
  },
];

const PRACTICE_NUMBERS = [
  {
    figure: "4.2×",
    metric: "Standard ROAS target",
    detail:
      "The blended ROAS we build to. Higher on Brand and Remarketing; lower (but acceptable) on Conquest and Long-tail.",
    client: "Across the practice",
  },
  {
    figure: "−32%",
    metric: "CPC reduction · post-rebuild",
    detail:
      "Typical drop in cost-per-click after account architecture and Quality Score work. Same positions, less spend.",
    client: "Standard outcome",
  },
  {
    figure: "5",
    metric: "Spend buckets",
    detail:
      "Brand · Non-brand · Conquest · Long-tail · Remarketing. Each with its own ROAS expectation, bid logic, and creative.",
    client: "Allocation discipline",
  },
  {
    figure: "Weekly",
    metric: "Cell-level review",
    detail:
      "Every keyword × landing-page × creative combination reviewed weekly. Leaks shut. Winners doubled.",
    client: "Operating rhythm",
  },
];

const INDUSTRIES = [
  { name: "Direct-to-Consumer", slug: "direct-to-consumer" },
  { name: "B2B SaaS", slug: "b2b-saas" },
  { name: "Real Estate", slug: "real-estate" },
  { name: "Premium Retail", slug: "premium-retail" },
  { name: "Multi-brand Operators", slug: "multi-brand-operators" },
];

const FAQS = [
  {
    question: "Do you do Performance Max?",
    answer:
      "Yes &mdash; but rarely as the primary spend bucket. PMax is good for spillover and remarketing surfaces; it&rsquo;s a poor fit for intent-led campaigns where keyword visibility and creative control matter. We use it deliberately, not by default.",
  },
  {
    question: "How quickly do you cut wasted spend?",
    answer:
      "Week 1&ndash;2. The audit surfaces it; the rebuild closes it. Most accounts have 15&ndash;30% of spend going to terms that have never converted or to broad-match queries chasing the wrong intent.",
  },
  {
    question: "Will you take over our existing account?",
    answer:
      "Yes &mdash; manager access, full read-write. We typically run it for the first quarter, then either continue operating or hand off to your team with the playbook. Your account; your access never leaves your control.",
  },
  {
    question: "What about Google&rsquo;s auto-bid strategies?",
    answer:
      "We use them where they belong &mdash; remarketing, mature campaigns with conversion data, brand defense. We don&rsquo;t use them on cold non-brand campaigns where the algorithm has nothing to optimise against.",
  },
  {
    question: "How do you measure incrementality?",
    answer:
      "Holdout cells, geo-tests, and modeled lift against control. Platform-reported conversions overstate paid&rsquo;s contribution by 20&ndash;40% in our experience. We measure incremental revenue, not credited conversions.",
  },
  {
    question: "What does it cost?",
    answer:
      "Paid Search programs start at ₹4L/month for accounts spending under ₹20L/month, scaling with managed spend. Minimum 6 months. Quoted post-audit. We don&rsquo;t charge % of spend &mdash; that aligns nobody.",
  },
];

// ─────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────

export default function PaidSearchPage() {
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
            <li className="text-ink-headline">Paid Search</li>
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

                <h1 className="font-bold tracking-[-0.025em] text-[clamp(40px,6vw,88px)] text-ink-headline leading-[1.05] max-w-[18ch] text-balance mb-8">
                  Stop bidding on keywords.{" "}
                  <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                    Buy intent
                  </span>
                  .
                </h1>

                <p className="font-body text-body-lg text-ink-body leading-[1.55] max-w-[54ch] mb-8">
                  Paid search built as a portfolio &mdash; Brand, Non-brand,
                  Conquest, Long-tail, Remarketing &mdash; each with its own
                  bid logic, ROAS expectation, and creative.
                </p>

                {/* Hero stats strip */}
                <div className="grid grid-cols-3 gap-4 md:gap-6 py-6 mb-10 border-y border-ink-headline/15">
                  {HERO_STATS.map((stat, i) => (
                    <div key={i} className={i > 0 ? "md:pl-6 md:border-l border-ink-headline/15" : ""}>
                      <p className="font-display font-extralight text-[clamp(24px,2.4vw,34px)] text-ink-headline leading-[1.1] tracking-[-0.02em] mb-1">
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
                    className="inline-flex items-center gap-3 bg-brand-yellow text-ink-headline font-display font-light text-[clamp(18px,1.4vw,24px)] px-8 py-4 hover:bg-emerald-900 hover:text-white transition-colors duration-hover"
                  >
                    <span>Apply for an account audit</span>
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

              {/* Right — spend allocation dial */}
              <div className="md:col-span-5 flex items-center justify-center pt-8 md:pt-0">
                <SpendAllocationDial />
              </div>
            </div>
          </div>
        </section>

        {/* ─── 2. THE BID LADDER — green 5-rung step diagram ─── */}
        <section
          className="bg-emerald-900 text-white"
          aria-labelledby="bid-ladder-heading"
        >
          <div className="container-layout py-24 md:py-32">
            <div className="grid md:grid-cols-12 gap-8 md:gap-16 mb-14 md:mb-16 items-end">
              <div className="md:col-span-9">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60 mb-6">
                  The bid ladder
                </p>
                <h2
                  id="bid-ladder-heading"
                  className="font-bold tracking-[-0.025em] text-[clamp(36px,5vw,68px)] text-white leading-[1.05] max-w-[26ch] text-balance"
                >
                  Five bid rungs. Only{" "}
                  <span className="bg-brand-yellow text-ink-headline px-3 py-0.5 box-decoration-clone">
                    one
                  </span>{" "}
                  is the sweet spot.
                </h2>
              </div>
              <div className="md:col-span-3 md:text-right">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60 leading-relaxed">
                  <span className="inline-block w-1.5 h-1.5 bg-brand-yellow mr-2 align-middle" />
                  Climb deliberately
                  <br />
                  Don&rsquo;t over-bid
                </p>
              </div>
            </div>

            {/* Header */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 pb-4 border-b border-white/25 mb-2">
              <div className="md:col-span-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                Rung
              </div>
              <div className="md:col-span-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                Bid level
              </div>
              <div className="md:col-span-2 font-mono text-[10px] uppercase tracking-[0.2em] text-brand-yellow">
                Position
              </div>
              <div className="md:col-span-6 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                Outcome
              </div>
            </div>

            <ol>
              {BID_LADDER.map((row, i) => {
                const isSweet = row.state === "sweet";
                const isBad = row.state === "starved" || row.state === "hostile";
                return (
                  <li
                    key={row.n}
                    className={`grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 py-7 md:py-8 items-baseline ${
                      isSweet
                        ? "border-y-2 border-brand-yellow bg-brand-yellow/10"
                        : "border-b border-white/15"
                    }`}
                  >
                    <div className="md:col-span-1 md:pl-2">
                      <span
                        className={`font-mono text-[11px] uppercase tracking-[0.2em] ${
                          isSweet ? "text-brand-yellow" : "text-white/55"
                        }`}
                      >
                        {row.n}
                      </span>
                    </div>
                    <div className="md:col-span-3">
                      <p
                        className={`font-display ${
                          isSweet
                            ? "font-bold text-brand-yellow"
                            : isBad
                              ? "font-light text-white/55"
                              : "font-light text-white"
                        } text-[clamp(20px,1.9vw,26px)] leading-[1.2] tracking-[-0.01em]`}
                      >
                        {row.rung}
                      </p>
                    </div>
                    <div className="md:col-span-2">
                      <p
                        className={`font-mono text-[11px] uppercase tracking-[0.18em] ${
                          isSweet ? "text-brand-yellow" : "text-white/55"
                        }`}
                      >
                        {row.position}
                      </p>
                    </div>
                    <div className="md:col-span-6 md:pr-2">
                      <p
                        className={`font-body text-body-sm leading-[1.5] ${
                          isSweet ? "text-white font-medium" : "text-white/70"
                        }`}
                      >
                        {row.outcome}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>

            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 mt-8">
              Rung 03 is the discipline. Most accounts live at 04 or 05 and bleed.
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
                className="font-bold tracking-[-0.025em] text-[clamp(40px,6vw,88px)] text-ink-headline leading-[1.02] max-w-[22ch] text-balance"
              >
                Four rules we{" "}
                <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                  bid from
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
                      className="font-display font-bold text-[clamp(24px,2.4vw,34px)] text-ink-headline tracking-[-0.02em] leading-[1.12] mb-4 max-w-[24ch]"
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
                  className="font-bold tracking-[-0.025em] text-[clamp(40px,6vw,88px)] text-ink-headline leading-[1.02] max-w-[24ch] text-balance"
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
                  Structure by week 03
                  <br />
                  ROAS lift by week 04
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
                  <h3 className="font-display font-bold text-[clamp(20px,1.8vw,26px)] text-ink-headline tracking-[-0.015em] leading-[1.18] mb-5 max-w-[20ch]">
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

        {/* ─── 4. PAID CATALOG ─── */}
        <section
          className="bg-bg-primary border-b border-ink-headline/10"
          aria-labelledby="catalog-heading"
        >
          <div className="container-layout py-24 md:py-32">
            <div className="grid md:grid-cols-12 gap-8 md:gap-16 mb-16 md:mb-20 items-end">
              <div className="md:col-span-9">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-6">
                  Paid catalog
                </p>
                <h2
                  id="catalog-heading"
                  className="font-bold tracking-[-0.025em] text-[clamp(40px,6vw,88px)] text-ink-headline leading-[1.02] max-w-[22ch] text-balance"
                >
                  Six categories.{" "}
                  <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                    Twenty-four
                  </span>{" "}
                  paid disciplines.
                </h2>
              </div>
              <div className="md:col-span-3 md:text-right">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted leading-relaxed">
                  <span className="inline-block w-1.5 h-1.5 bg-brand-yellow mr-2 align-middle" />
                  Per intent
                  <br />
                  Per surface
                </p>
              </div>
            </div>

            <ol className="grid md:grid-cols-2 lg:grid-cols-3 border-l border-t border-ink-headline/15">
              {PAID_CATALOG.map((cat, i) => (
                <li
                  key={cat.category}
                  className="group relative p-8 md:p-10 border-r border-b border-ink-headline/15 flex flex-col transition-colors duration-hover hover:bg-bg-secondary"
                >
                  <div className="flex items-baseline justify-between gap-6 mb-6">
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-headline">
                      {String(i + 1).padStart(2, "0")} /{" "}
                      {String(PAID_CATALOG.length).padStart(2, "0")}
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
                    className="font-display font-bold text-[clamp(22px,2vw,28px)] text-ink-headline tracking-[-0.02em] leading-[1.15] mb-5 max-w-[22ch]"
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
                  className="font-bold tracking-[-0.025em] text-[clamp(40px,6vw,88px)] text-ink-headline leading-[1.02] max-w-[24ch] text-balance"
                >
                  Five layers from{" "}
                  <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                    intent to ROAS
                  </span>
                  .
                </h2>
              </div>
              <div className="md:col-span-3 md:text-right">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted leading-relaxed">
                  <span className="inline-block w-1.5 h-1.5 bg-brand-yellow mr-2 align-middle" />
                  Structure before bid
                  <br />
                  Bid before scale
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
                    <p className="font-display font-extralight text-[clamp(40px,4vw,56px)] text-ink-headline leading-none tracking-[-0.03em]">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                  </div>
                  <div className="md:col-span-4">
                    <span
                      aria-hidden="true"
                      className="block w-2.5 h-2.5 bg-brand-yellow mb-3"
                    />
                    <h3 className="font-display font-bold text-[clamp(22px,2.2vw,30px)] text-ink-headline tracking-[-0.02em] leading-[1.15] mb-2">
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
                  className="font-bold tracking-[-0.025em] text-[clamp(40px,6vw,88px)] text-ink-headline leading-[1.02] max-w-[26ch] text-balance"
                >
                  Eleven weeks from audit to{" "}
                  <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                    compounding account
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
                  <p className="font-display font-extralight text-[clamp(48px,5vw,72px)] text-ink-headline leading-none tracking-[-0.03em] mb-5">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3
                    className="font-display font-light text-[clamp(22px,2vw,28px)] text-ink-headline tracking-[-0.01em] leading-[1.15] mb-3"
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
          aria-labelledby="paid-logos-heading"
        >
          <div className="container-layout py-16 md:py-20">
            <p
              id="paid-logos-heading"
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-10"
            >
              Accounts we&rsquo;ve rebuilt
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
                className="font-bold tracking-[-0.025em] text-[clamp(40px,6vw,88px)] text-ink-headline leading-[1.02] max-w-[22ch] text-balance"
              >
                What the account{" "}
                <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                  ships at
                </span>
                .
              </h2>
            </div>

            <ol className="grid md:grid-cols-2 lg:grid-cols-4 border-t border-l border-ink-headline/15">
              {PRACTICE_NUMBERS.map((n, i) => (
                <li
                  key={n.figure}
                  className="relative py-12 md:py-14 px-6 md:px-8 flex flex-col min-w-0 border-r border-b border-ink-headline/15"
                >
                  <span
                    aria-hidden="true"
                    className="block w-3 h-3 bg-brand-yellow mb-6"
                  />
                  <p className="font-display font-extralight text-[clamp(34px,4vw,56px)] leading-[0.95] tracking-[-0.03em] text-ink-headline mb-5 break-words">
                    {n.figure}
                  </p>
                  <p className="font-display font-light text-[clamp(17px,1.4vw,22px)] tracking-[-0.005em] text-ink-headline leading-[1.2] mb-3">
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
                  Industries we run paid search for
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
                className="font-bold tracking-[-0.025em] text-[clamp(40px,6vw,88px)] text-ink-headline leading-[1.02] max-w-[22ch] text-balance"
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
                      className="font-display font-bold text-[clamp(18px,1.6vw,22px)] text-ink-headline tracking-[-0.01em] leading-[1.3]"
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

            <h2 className="font-bold tracking-[-0.025em] text-[clamp(48px,8vw,128px)] leading-[1.02] max-w-[22ch] mb-16 md:mb-24 text-white text-balance">
              Stop renting position.{" "}
              <span className="bg-brand-yellow text-ink-headline px-3 py-0.5 box-decoration-clone">
                Buy ROAS
              </span>
              .
            </h2>

            <div className="grid md:grid-cols-12 gap-8 md:gap-16 pt-10 border-t border-white/15 items-center">
              <div className="md:col-span-7">
                <p className="font-body text-body-lg text-white/80 leading-[1.5] max-w-[52ch]">
                  A 45-minute paid account audit. We pull your spend split,
                  your QS distribution, your wasted cells &mdash; live on the
                  call &mdash; and scope the 90-day rebuild. Refunded if
                  we&rsquo;re not the right fit.
                </p>
              </div>
              <div className="md:col-span-5 flex md:justify-end">
                <Link
                  href="/book-consultation"
                  className="inline-flex items-center justify-center bg-brand-yellow text-emerald-900 font-display font-light text-[clamp(20px,1.6vw,28px)] px-10 py-5 hover:bg-white transition-colors duration-hover"
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
