import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/meta";
import { GlobalNav } from "@/components/nav/GlobalNav";
import { Footer } from "@/components/nav/Footer";
import { GridOverlay } from "@/components/blocks/GridOverlay";
import { LocationCoverageHeatmap } from "@/components/utility/LocationCoverageHeatmap";

// ─────────────────────────────────────────────
// Local Search sub-service page (Organic Growth Practice).
// Distinct sections — What Wins The Map Pack (green ranked factors with
// visual weight bars), Local Catalog, Architecture, 12-week Process.
// ─────────────────────────────────────────────

export const metadata: Metadata = buildMetadata({
  title: "Local Search — Organic Growth Practice | Zeppstr",
  description:
    "The Map Pack is the SERP. Below it is the consolation prize. We build multi-location local search programs that rank, get reviewed, and convert — across every relevant geo × intent combination.",
  path: "/solutions/organic-growth/local-search",
})

// ─── Content ───

const FEATURED_LOGOS = [
  { name: "Tru Aquapolis", file: "tru-aquapolis.png" },
  { name: "Aishwarya Interiors", file: "aishwarya-interiors.png" },
  { name: "Sky Phonez", file: "sky-phonez.png" },
  { name: "Tristar Online", file: "tristar-online.png" },
  { name: "Mini Leaves", file: "mini-leaves.png" },
  { name: "Lucky White Goods", file: "lucky-white-goods.png" },
  { name: "JP Parking Yard", file: "jp-parking-yard.png" },
];

// MAP PACK MECHANICS — 5 ranking factors with visual weight bars
const MAP_PACK_FACTORS = [
  {
    n: "01",
    factor: "Profile completeness &amp; freshness",
    weight: 88,
    requires: "Every field filled · weekly updates · category accuracy",
    miss: "Most teams set it once and forget",
  },
  {
    n: "02",
    factor: "Review velocity &amp; recency",
    weight: 82,
    requires: "Steady inflow · responded to · last 30 days weighted",
    miss: "Reviews stop after launch",
  },
  {
    n: "03",
    factor: "Proximity &amp; location signals",
    weight: 76,
    requires: "Service-area accuracy · physical citations · NAP consistency",
    miss: "Old citations contradict the GBP",
  },
  {
    n: "04",
    factor: "Engagement signals",
    weight: 64,
    requires: "Photos uploaded · posts published · Q&amp;A answered",
    miss: "GBP treated as static, not a live channel",
  },
  {
    n: "05",
    factor: "Geo-targeted on-page content",
    weight: 52,
    requires: "Location pages · intent-specific copy · local schema",
    miss: "One template across 50 locations",
  },
];

// Principles — 4 rules
const PRINCIPLES = [
  {
    n: "01",
    title: "Map Pack or nothing.",
    body: "70% of local clicks land in the top three results. Position four is a 10× drop. We optimise for the three slots that capture the demand &mdash; not Page 1 vanity rankings.",
  },
  {
    n: "02",
    title: "Reviews are rankings.",
    body: "Velocity (how often), recency (last 30 days), and response cadence move the rank more than star average. A profile with 200 stale reviews loses to one with 50 fresh ones.",
  },
  {
    n: "03",
    title: "Multi-location, multi-discipline.",
    body: "Fifty locations means fifty profiles, fifty review pipelines, fifty location pages, fifty response cadences. One strategy applied fifty times is one strategy ignored fifty times.",
  },
  {
    n: "04",
    title: "Geo × intent is the unit.",
    body: "Not rankings. Not traffic. The unit is &ldquo;in the Map Pack for this intent in this location.&rdquo; A 6 × 6 program has 36 coverage cells. Closed one by one.",
  },
];

// HERO STATS — 3 punchy facts shown below the tagline
const HERO_STATS = [
  {
    figure: "70%+",
    label: "Local clicks in the Map Pack",
  },
  {
    figure: "10×",
    label: "Drop from rank 3 → 4",
  },
  {
    figure: "4×",
    label: "Conversion vs Page 1 listings",
  },
];

// FIRST 30 DAYS — concrete week-by-week deliverables
const FIRST_30_DAYS = [
  {
    week: "Week 01",
    label: "Coverage map shipped",
    items: [
      "Geo × intent matrix built",
      "Current rank captured",
      "Gap cells identified",
    ],
  },
  {
    week: "Week 02",
    label: "Profile sweep complete",
    items: [
      "Every GBP audited",
      "Duplicates removed",
      "NAP inconsistencies flagged",
    ],
  },
  {
    week: "Week 03",
    label: "Review program live",
    items: [
      "Request automation set up",
      "Response cadence operational",
      "Negative-review playbook in place",
    ],
  },
  {
    week: "Week 04",
    label: "First Map Pack lifts",
    items: [
      "Profile signal wins compound",
      "First review-velocity gains land",
      "Coverage heatmap report shipped",
    ],
  },
];

// LOCAL CATALOG — 6 categories
const LOCAL_CATALOG = [
  {
    category: "GBP Profile Discipline",
    items: [
      "Profile audit &amp; gap close",
      "Category &amp; attribute strategy",
      "Weekly post cadence",
      "Photo &amp; video uploads",
    ],
  },
  {
    category: "Review Program",
    items: [
      "Request automation",
      "Response cadence · 24-hour SLA",
      "Negative-review playbook",
      "Review-to-content recycling",
    ],
  },
  {
    category: "Citation &amp; NAP",
    items: [
      "Citation audit &amp; clean-up",
      "Industry directory submissions",
      "NAP consistency monitoring",
      "Duplicate listing removal",
    ],
  },
  {
    category: "Location Pages",
    items: [
      "Per-location landing pages",
      "Intent-mapped content variants",
      "Local schema · breadcrumbs",
      "Internal-link discipline",
    ],
  },
  {
    category: "Local On-page SEO",
    items: [
      "Geo-keyword research",
      "Featured-snippet engineering",
      "Local-link earning",
      "Hyper-local content briefs",
    ],
  },
  {
    category: "Coverage Operations",
    items: [
      "Geo × intent rank tracking",
      "Coverage heatmap reporting",
      "Quarterly gap-close sprints",
      "Competitor displacement plan",
    ],
  },
];

// ARCHITECTURE — 5 layers
const ARCHITECTURE_LAYERS = [
  {
    name: "Profile Layer",
    format: "GBP · directories · industry listings",
    description:
      "The owned profile real estate &mdash; Google Business Profile, Apple Maps, Bing, industry directories. One per location, maintained as a live channel, not a static listing.",
  },
  {
    name: "Signal Layer",
    format: "Reviews · photos · posts · Q&amp;A",
    description:
      "The continuous signals that tell Google the location is alive, engaged, and current. Generated systematically, not opportunistically.",
  },
  {
    name: "Content Layer",
    format: "Location pages · intent variants",
    description:
      "Site-side content that handshakes with the profile signals. Per-location landing pages, intent-specific variants, local schema, internal-link discipline.",
  },
  {
    name: "Citation Layer",
    format: "NAP consistency · directories",
    description:
      "The off-site references that validate the profile. Name-address-phone consistency across every directory that matters &mdash; conflicting citations dilute the signal.",
  },
  {
    name: "Operating Layer",
    format: "Tracking · reporting · sprint cadence",
    description:
      "Geo × intent coverage tracked weekly, reported monthly, attacked quarterly. The cells that aren&rsquo;t in the Map Pack become the work.",
  },
];

// 6 process phases — 12 weeks
const PROCESS_PHASES = [
  {
    title: "Coverage Audit",
    duration: "Week 1–2",
    body: "Every location, every relevant intent, current rank captured into the coverage heatmap. The cells that need work surface immediately.",
  },
  {
    title: "Profile Sweep",
    duration: "Week 3–4",
    body: "Every GBP profile completed, categorised, photographed, post-cadence-armed. Duplicates removed, NAP inconsistencies fixed.",
  },
  {
    title: "Review Program",
    duration: "Week 5–6",
    body: "Request automation set up, response cadence operational, negative-review playbook in place. Reviews start compounding from week 6.",
  },
  {
    title: "Location Pages",
    duration: "Week 7–9",
    body: "Per-location landing pages built, intent variants drafted, local schema applied. The site-side content that handshakes with the profiles.",
  },
  {
    title: "Citation Cleanup",
    duration: "Week 10–11",
    body: "Off-site citations audited and aligned. NAP inconsistencies fixed across every directory that matters. Duplicate listings removed.",
  },
  {
    title: "Operate &amp; Close Cells",
    duration: "Week 12+",
    body: "Weekly rank tracking, monthly coverage report, quarterly gap-close sprints. The heatmap turns from gap to Map Pack, cell by cell.",
  },
];

const PRACTICE_NUMBERS = [
  {
    figure: "70%+",
    metric: "Local clicks in Map Pack",
    detail:
      "The share of local search traffic that lands in the top three results. Page 1 below it captures the rest, divided among ten listings.",
    client: "Industry benchmark",
  },
  {
    figure: "24 hr",
    metric: "Review response SLA",
    detail:
      "Every review answered within 24 hours, positive or negative. Response cadence is itself a Map Pack signal.",
    client: "Operating discipline",
  },
  {
    figure: "36",
    metric: "Coverage cells per program",
    detail:
      "A 6-location × 6-intent program is 36 cells. Each one&rsquo;s rank is a separate piece of work. We track all 36 weekly.",
    client: "Standard scope",
  },
  {
    figure: "Quarterly",
    metric: "Gap-close sprint cadence",
    detail:
      "Every quarter we attack the lowest-coverage cells with a focused sprint &mdash; profile depth, review velocity, location-page rebuild.",
    client: "Operating rhythm",
  },
];

const INDUSTRIES = [
  { name: "Real Estate", slug: "real-estate" },
  { name: "Premium Retail", slug: "premium-retail" },
  { name: "Multi-brand Operators", slug: "multi-brand-operators" },
  { name: "Direct-to-Consumer", slug: "direct-to-consumer" },
  { name: "B2B SaaS", slug: "b2b-saas" },
];

const FAQS = [
  {
    question: "Do we need this if we&rsquo;re a single-location business?",
    answer:
      "Yes &mdash; though the program is lighter. One location still has 5&ndash;15 relevant search intents and 5+ surrounding service areas, which is 25&ndash;75 coverage cells. The discipline scales down; the work doesn&rsquo;t disappear.",
  },
  {
    question: "What if we have 50+ locations?",
    answer:
      "Common &mdash; and where this program earns its keep. The work isn&rsquo;t one strategy applied 50 times; it&rsquo;s 50 instances of the same disciplined operating model. We build the operations team or playbook to scale it.",
  },
  {
    question: "Will you respond to our reviews?",
    answer:
      "Yes &mdash; with templates approved by you and signed by a real human on your team. Generic AI-generated review responses get noticed (and ignored). Templated-but-human is the sweet spot.",
  },
  {
    question: "How do you handle negative reviews?",
    answer:
      "There&rsquo;s a playbook: acknowledge within 24 hours, never argue publicly, take it offline, document the resolution. Negative reviews handled well move the trust needle more than another five-star review.",
  },
  {
    question: "What about review-buying schemes?",
    answer:
      "No. Fake review networks get caught, GBP gets suspended, business gets hurt. Real review programs with real customer prompting compound; manufactured ones implode. Not worth the trade.",
  },
  {
    question: "What does it cost?",
    answer:
      "Local Search programs start at ₹4L/month for single-location, scaling with location count and intent breadth. 12-month minimum. Quoted post-audit.",
  },
];

// ─────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────

export default function LocalSearchPage() {
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
                href="/solutions/organic-growth"
                className="hover:text-ink-headline transition-colors"
              >
                Organic Growth Practice
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-ink-headline">Local Search</li>
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
                    Service — Organic Growth Practice
                  </p>
                </div>

                <h1 className="font-bold tracking-[-0.025em] text-[clamp(40px,6vw,88px)] text-ink-headline leading-[1.05] max-w-[16ch] text-balance mb-8">
                  Win the{" "}
                  <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                    Map Pack
                  </span>
                  . Page 1 is consolation.
                </h1>

                <p className="font-body text-body-lg text-ink-body leading-[1.55] max-w-[54ch] mb-8">
                  Multi-location local search built as a coverage matrix
                  &mdash; geo × intent, cell by cell. Tracked weekly,
                  attacked quarterly, ranked where the demand actually lives.
                </p>

                {/* Hero stats strip — 3 punchy facts */}
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
                    <span>Apply for a coverage audit</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                  <Link
                    href="/solutions/organic-growth"
                    className="font-mono text-[12px] uppercase tracking-[0.18em] text-ink-headline border-b border-ink-headline pb-0.5 hover:text-ink-headline/60 hover:border-brand-yellow transition-colors"
                  >
                    Parent practice →
                  </Link>
                </div>
              </div>

              {/* Right — coverage heatmap */}
              <div className="md:col-span-5 flex items-center justify-center pt-8 md:pt-0">
                <LocationCoverageHeatmap />
              </div>
            </div>
          </div>
        </section>

        {/* ─── 2. WHAT WINS THE MAP PACK — green ranked factors w/ weight bars ─── */}
        <section
          className="bg-emerald-900 text-white"
          aria-labelledby="map-pack-heading"
        >
          <div className="container-layout py-24 md:py-32">
            <div className="grid md:grid-cols-12 gap-8 md:gap-16 mb-14 md:mb-16 items-end">
              <div className="md:col-span-9">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60 mb-6">
                  Map Pack mechanics
                </p>
                <h2
                  id="map-pack-heading"
                  className="font-bold tracking-[-0.025em] text-[clamp(36px,5vw,68px)] text-white leading-[1.05] max-w-[26ch] text-balance"
                >
                  Five factors that decide who{" "}
                  <span className="bg-brand-yellow text-ink-headline px-3 py-0.5 box-decoration-clone">
                    wins
                  </span>{" "}
                  the Map Pack.
                </h2>
              </div>
              <div className="md:col-span-3 md:text-right">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60 leading-relaxed">
                  <span className="inline-block w-1.5 h-1.5 bg-brand-yellow mr-2 align-middle" />
                  Weight = relative
                  <br />
                  contribution
                </p>
              </div>
            </div>

            <ol>
              {MAP_PACK_FACTORS.map((row, i) => (
                <li
                  key={row.n}
                  className="py-7 md:py-8 border-b border-white/15"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-baseline mb-3">
                    <div className="md:col-span-1 font-mono text-[11px] uppercase tracking-[0.2em] text-brand-yellow">
                      {row.n}
                    </div>
                    <div className="md:col-span-5">
                      <p
                        className="font-display font-light text-[clamp(20px,1.9vw,26px)] text-white leading-[1.2] tracking-[-0.005em]"
                        dangerouslySetInnerHTML={{ __html: row.factor }}
                      />
                    </div>
                    <div className="md:col-span-3">
                      <p
                        className="font-body text-body-sm text-white/65 leading-[1.5]"
                        dangerouslySetInnerHTML={{ __html: row.requires }}
                      />
                    </div>
                    <div className="md:col-span-3">
                      <p className="font-body text-body-sm text-white/45 leading-[1.5] italic">
                        Most miss → {row.miss}
                      </p>
                    </div>
                  </div>

                  {/* Visual weight bar */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-center">
                    <div className="md:col-span-1" />
                    <div className="md:col-span-9">
                      <div className="relative w-full h-2.5 bg-white/10">
                        <div
                          className="absolute inset-y-0 left-0 bg-brand-yellow"
                          style={{ width: `${row.weight}%` }}
                        />
                      </div>
                    </div>
                    <div className="md:col-span-2 md:text-right">
                      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-yellow">
                        {row.weight} / 100
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>

            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 mt-8">
              Move factors 01 and 02 first. The other three follow.
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
                  rank from
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

        {/* ─── 3.5. FIRST 30 DAYS — concrete week-by-week deliverables ─── */}
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
                  Live by week 03
                  <br />
                  Lifts by week 04
                </p>
              </div>
            </div>

            <ol className="grid md:grid-cols-4 gap-px bg-ink-headline/15 border border-ink-headline/15">
              {FIRST_30_DAYS.map((wk, i) => (
                <li
                  key={wk.week}
                  className="bg-bg-secondary p-8 md:p-10 flex flex-col"
                >
                  {/* Week marker */}
                  <div className="flex items-baseline justify-between mb-6">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-headline">
                      {wk.week}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                      {String(i + 1).padStart(2, "0")} / 04
                    </span>
                  </div>

                  {/* Yellow accent + week label */}
                  <span aria-hidden="true" className="block w-3 h-3 bg-brand-yellow mb-4" />
                  <h3 className="font-display font-bold text-[clamp(20px,1.8vw,26px)] text-ink-headline tracking-[-0.015em] leading-[1.18] mb-5 max-w-[20ch]">
                    {wk.label}
                  </h3>

                  {/* Deliverable bullets */}
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
              Concrete deliverables. Not a roadmap. Each week ships work, not promises.
            </p>
          </div>
        </section>

        {/* ─── 4. LOCAL CATALOG ─── */}
        <section
          className="bg-bg-primary border-b border-ink-headline/10"
          aria-labelledby="catalog-heading"
        >
          <div className="container-layout py-24 md:py-32">
            <div className="grid md:grid-cols-12 gap-8 md:gap-16 mb-16 md:mb-20 items-end">
              <div className="md:col-span-9">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-6">
                  Local catalog
                </p>
                <h2
                  id="catalog-heading"
                  className="font-bold tracking-[-0.025em] text-[clamp(40px,6vw,88px)] text-ink-headline leading-[1.02] max-w-[22ch] text-balance"
                >
                  Six categories.{" "}
                  <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                    Twenty-four
                  </span>{" "}
                  local disciplines.
                </h2>
              </div>
              <div className="md:col-span-3 md:text-right">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted leading-relaxed">
                  <span className="inline-block w-1.5 h-1.5 bg-brand-yellow mr-2 align-middle" />
                  Per location
                  <br />
                  Every intent
                </p>
              </div>
            </div>

            <ol className="grid md:grid-cols-2 lg:grid-cols-3 border-l border-t border-ink-headline/15">
              {LOCAL_CATALOG.map((cat, i) => (
                <li
                  key={cat.category}
                  className="group relative p-8 md:p-10 border-r border-b border-ink-headline/15 flex flex-col transition-colors duration-hover hover:bg-bg-secondary"
                >
                  <div className="flex items-baseline justify-between gap-6 mb-6">
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-headline">
                      {String(i + 1).padStart(2, "0")} /{" "}
                      {String(LOCAL_CATALOG.length).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                      {cat.items.length} disciplines
                    </span>
                  </div>
                  <span
                    aria-hidden="true"
                    className="block w-3 h-3 bg-brand-yellow mb-5"
                  />
                  <h3 className="font-display font-bold text-[clamp(22px,2vw,28px)] text-ink-headline tracking-[-0.02em] leading-[1.15] mb-5 max-w-[22ch]">
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
                  className="font-bold tracking-[-0.025em] text-[clamp(40px,6vw,88px)] text-ink-headline leading-[1.02] max-w-[24ch] text-balance"
                >
                  Five layers from{" "}
                  <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                    profile to coverage
                  </span>
                  .
                </h2>
              </div>
              <div className="md:col-span-3 md:text-right">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted leading-relaxed">
                  <span className="inline-block w-1.5 h-1.5 bg-brand-yellow mr-2 align-middle" />
                  Multi-location
                  <br />
                  multi-channel
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
                    <p
                      className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted"
                      dangerouslySetInnerHTML={{ __html: layer.format }}
                    />
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
                  Twelve weeks to close{" "}
                  <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                    Map Pack cells
                  </span>
                  .
                </h2>
              </div>
              <div className="md:col-span-3 md:text-right">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted leading-relaxed">
                  <span className="inline-block w-1.5 h-1.5 bg-brand-yellow mr-2 align-middle" />
                  6 phases · 12 weeks
                  <br />
                  Then quarterly sprints
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
          aria-labelledby="local-logos-heading"
        >
          <div className="container-layout py-16 md:py-20">
            <p
              id="local-logos-heading"
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-10"
            >
              Brands we&rsquo;ve ranked locally
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
                What the program{" "}
                <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                  optimises for
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
                  <p className="font-display font-extralight text-[clamp(40px,5vw,72px)] leading-[0.95] tracking-[-0.03em] text-ink-headline mb-6 break-words">
                    {n.figure}
                  </p>
                  <p className="font-display font-light text-[clamp(20px,1.6vw,28px)] tracking-[-0.01em] text-ink-headline leading-[1.2] mb-3">
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
                  Industries we run local search for
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
                What operators{" "}
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

            <h2 className="font-bold tracking-[-0.025em] text-[clamp(48px,8vw,128px)] leading-[1.02] max-w-[20ch] mb-16 md:mb-24 text-white text-balance">
              Close the cells.{" "}
              <span className="bg-brand-yellow text-ink-headline px-3 py-0.5 box-decoration-clone">
                Take the Pack
              </span>
              .
            </h2>

            <div className="grid md:grid-cols-12 gap-8 md:gap-16 pt-10 border-t border-white/15 items-center">
              <div className="md:col-span-7">
                <p className="font-body text-body-lg text-white/80 leading-[1.5] max-w-[52ch]">
                  A 45-minute paid coverage audit. We build your geo × intent
                  heatmap live on the call, name the cells losing demand, and
                  scope the 90-day plan to close them. Refunded if
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
