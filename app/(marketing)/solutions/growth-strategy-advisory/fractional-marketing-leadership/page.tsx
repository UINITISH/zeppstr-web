import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/meta";
import { GlobalNav } from "@/components/nav/GlobalNav";
import { Footer } from "@/components/nav/Footer";
import { GridOverlay } from "@/components/blocks/GridOverlay";
import { OperatingCadenceCalendar } from "@/components/utility/OperatingCadenceCalendar";

// ─────────────────────────────────────────────
// Fractional Marketing Leadership sub-service page (Growth Strategy & Advisory).
// Distinct sections — Owns / Doesn't Own (green 2-column accountability map),
// Accountability Catalog, Architecture, 12-month Process.
// ─────────────────────────────────────────────

export const metadata: Metadata = buildMetadata({
  title:
    "Fractional Marketing Leadership — Growth Strategy & Advisory | Zeppstr",
  description:
    "Hire the role, not the headcount. A senior marketing operator embedded in your team two days a week — accountable to the number, not the slide deck.",
  path: "/solutions/growth-strategy-advisory/fractional-marketing-leadership",
})

// ─── Content ───

const FEATURED_LOGOS = [
  { name: "Prohance", file: "prohance.png" },
  { name: "Empuls", file: "empuls.png" },
  { name: "Wise Market", file: "wise-market.png" },
  { name: "Twenty One Finance", file: "twenty-one-finance.png" },
  { name: "Mini Leaves", file: "mini-leaves.png" },
  { name: "Tru Aquapolis", file: "tru-aquapolis.png" },
  { name: "Fixstars", file: "fixstars.png" },
  { name: "Tristar Online", file: "tristar-online.png" },
];

// OWNS / DOESN'T OWN — 2-column accountability map
const OWNS = [
  {
    item: "The number",
    sub: "Pipeline, revenue, or growth metric the role is hired to move.",
  },
  {
    item: "Strategy & operating model",
    sub: "Annual plan, quarterly OKRs, the operating cadence underneath them.",
  },
  {
    item: "Team building & coaching",
    sub: "Hiring map, performance management for marketing function, weekly 1:1s with leads.",
  },
  {
    item: "Vendor & agency management",
    sub: "Brief, scope, evaluate, hire, fire. The procurement layer for marketing spend.",
  },
  {
    item: "Brand & narrative",
    sub: "Positioning, messaging house, brand voice. The system every channel inherits from.",
  },
  {
    item: "Board & exec alignment",
    sub: "Board deck section, exec readouts, the marketing perspective at the cap-table level.",
  },
];

const DOESNT_OWN = [
  {
    item: "Daily execution",
    sub: "Email sends, ad campaigns, social posts. That&rsquo;s the team. Or the agency. Not the fractional CMO.",
  },
  {
    item: "Vendor seat-warming",
    sub: "Joining every agency call to nod. Vendors are managed, not babysat.",
  },
  {
    item: "Strategy theatre",
    sub: "Decks that don&rsquo;t turn into operating decisions. Strategy without operating ownership is consulting.",
  },
  {
    item: "Forever",
    sub: "12&ndash;24 month engagement, with succession built in. The goal is hiring a full-time replacement when scale demands.",
  },
  {
    item: "Other people&rsquo;s P&Ls",
    sub: "Sales is sales&rsquo;s. Product is product&rsquo;s. We collaborate; we don&rsquo;t take over.",
  },
  {
    item: "Politics",
    sub: "We work for the company, not the founder&rsquo;s favourite stakeholder. Honest feedback is the job.",
  },
];

// Principles — 4 rules
const PRINCIPLES = [
  {
    n: "01",
    title: "Operator, not advisor.",
    body: "Advisors give opinions. Operators make calls. We make calls &mdash; on hiring, vendor selection, budget, and channel mix. The accountability is non-negotiable.",
  },
  {
    n: "02",
    title: "Accountable to the number.",
    body: "Hired against a measurable outcome &mdash; pipeline, revenue, MQL, retention &mdash; not against &ldquo;strategic thinking.&rdquo; If the number doesn&rsquo;t move, the engagement doesn&rsquo;t renew.",
  },
  {
    n: "03",
    title: "Embedded, not parachuted.",
    body: "Two days a week, in your team&rsquo;s Slack, on your team&rsquo;s calendar, at your team&rsquo;s standups. Not a quarterly off-site. Operating presence is the asset.",
  },
  {
    n: "04",
    title: "Succession from day one.",
    body: "The engagement plans its own end. We&rsquo;re hiring a full-time CMO or director by month 12&ndash;24 in most cases. Working ourselves out of the role is the goal.",
  },
];

// ACCOUNTABILITY CATALOG — 6 categories of what the role owns
const ACCOUNTABILITY_CATALOG = [
  {
    category: "Strategy & Operating Model",
    items: [
      "Annual marketing plan",
      "Quarterly OKR design",
      "Operating cadence · weekly · monthly · quarterly",
      "Resource & budget allocation",
    ],
  },
  {
    category: "Team Building & Coaching",
    items: [
      "Hiring map for next 12 months",
      "Performance management · marketing leads",
      "Weekly 1:1s with team",
      "Skills gap audit & development plan",
    ],
  },
  {
    category: "Pipeline & Demand",
    items: [
      "Pipeline forecast accountability",
      "Channel mix decisions",
      "Demand-gen KPIs · monitored weekly",
      "Sales–marketing alignment",
    ],
  },
  {
    category: "Brand & Narrative",
    items: [
      "Positioning · messaging house",
      "Voice & brand operating system",
      "Competitive positioning",
      "PR / analyst / community",
    ],
  },
  {
    category: "Vendor & Agency Mgmt",
    items: [
      "Brief · scope · evaluate",
      "Hire · fire · renegotiate",
      "Performance reviews · quarterly",
      "Consolidation decisions",
    ],
  },
  {
    category: "Board & Exec Alignment",
    items: [
      "Board deck · marketing section",
      "Monthly exec readout",
      "Investor pipeline narrative",
      "Cross-functional alignment",
    ],
  },
];

// ARCHITECTURE — 5 layers of how the engagement works
const ARCHITECTURE_LAYERS = [
  {
    name: "Goals Layer",
    format: "Annual · Quarterly OKRs",
    description:
      "The number the role is hired to move, written in the engagement contract. Reviewed quarterly. Without it, this is consulting in disguise.",
  },
  {
    name: "Operating Layer",
    format: "Weekly · Monthly · Quarterly cadence",
    description:
      "Two days a week embedded. Weekly leadership team, monthly review, quarterly planning, board prep. The presence pattern that earns the title.",
  },
  {
    name: "Team Layer",
    format: "Reports · Collaborates · Coaches",
    description:
      "Direct reports (typically 2&ndash;5 marketing leads). Cross-functional collaboration with sales, product, finance. Coaching relationship with the founder.",
  },
  {
    name: "Reporting Layer",
    format: "Exec deck · Board readout",
    description:
      "Marketing&rsquo;s seat at the executive table. Standardized monthly readout. Marketing section of the board deck owned end-to-end.",
  },
  {
    name: "Exit Layer",
    format: "Succession · Hiring · Handoff",
    description:
      "From month 6, the succession plan is being built. By month 12&ndash;24, the engagement is wrapping into a full-time hire we&rsquo;ve helped recruit.",
  },
];

// 6 process phases — full engagement arc
const PROCESS_PHASES = [
  {
    title: "Onboarding",
    duration: "Week 1–2",
    body: "Embedded into Slack, calendar, tooling, exec table. Diagnostic interviews with team, sales, product, customers. No public commitments yet.",
  },
  {
    title: "Diagnostic",
    duration: "Month 1",
    body: "Written marketing diagnostic — what&rsquo;s working, what&rsquo;s leaking, what&rsquo;s missing. Presented to the exec team. The honest read most founders haven&rsquo;t had.",
  },
  {
    title: "90-Day Plan",
    duration: "Month 2",
    body: "Operating model designed. Quarterly OKRs locked. Team structure proposed. Vendor consolidation decisions made. Signed off by CEO + board.",
  },
  {
    title: "Operating Cadence",
    duration: "Month 3+",
    body: "Two days a week embedded. Weekly leadership, monthly review, quarterly planning. The number gets moved by accumulating decisions, not single bets.",
  },
  {
    title: "Quarterly Review",
    duration: "Every quarter",
    body: "OKR scoring, plan refresh, board readout, vendor performance review. The discipline that keeps the engagement honest about outcomes.",
  },
  {
    title: "Succession",
    duration: "Month 9–18",
    body: "Full-time CMO / Director hired and handed off to &mdash; with us as co-hiring partner. The engagement ends successfully when we&rsquo;re no longer needed.",
  },
];

const PRACTICE_NUMBERS = [
  {
    figure: "2 days / wk",
    metric: "Standard engagement weight",
    detail:
      "Embedded presence pattern that earns the title. Less than this is advisory. More is full-time in disguise.",
    client: "Standard cadence",
  },
  {
    figure: "12+ months",
    metric: "Minimum engagement",
    detail:
      "Brand and operating-model work compounds. We don&rsquo;t take 90-day pilots in this practice.",
    client: "Engagement floor",
  },
  {
    figure: "1 / 12",
    metric: "Annual partner slots",
    detail:
      "Only one fractional CMO engagement per twelve partner clients per year. Heaviest senior-time commitment in the practice.",
    client: "Selective by design",
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
    question: "How is this different from a marketing consultant?",
    answer:
      "Consultants advise. Fractional CMOs operate. We sit on the leadership team, make hiring calls, own vendor decisions, sign off on quarterly OKRs, and answer to the board for the marketing number. If the engagement ends with a strategy deck and no decisions made, we&rsquo;ve failed.",
  },
  {
    question: "When does a company actually need a fractional CMO?",
    answer:
      "Typically Series A to Series B, ₹20Cr&ndash;₹150Cr revenue, marketing function that has 2&ndash;8 people but no senior operator. Below that, you need a great marketer, not a CMO. Above, you need a full-time hire.",
  },
  {
    question: "Will you actually fire vendors and people if needed?",
    answer:
      "Yes. That&rsquo;s the job. We do it with care, transparency, and documentation &mdash; but we do it. If the founder&rsquo;s expecting a yes-person, this is the wrong engagement.",
  },
  {
    question: "Can you scale up to 4 days a week if we need more?",
    answer:
      "Rarely. If the role needs 4+ days a week consistently, that&rsquo;s a full-time CMO &mdash; and we&rsquo;ll help you hire one. Scaling a fractional engagement past 3 days/week is usually a sign the model has run its course.",
  },
  {
    question: "Who actually does the work?",
    answer:
      "Strategy, decisions, hiring, board prep, vendor management &mdash; us, directly. Execution &mdash; your team, your agency, or our other practices (organic, performance, lifecycle) if it&rsquo;s the right fit.",
  },
  {
    question: "What does it cost?",
    answer:
      "Fractional CMO engagements run ₹6L&ndash;10L/month depending on company size, ownership scope, and weight. Minimum 12 months. Quoted post-onboarding diagnostic.",
  },
];

// ─────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────

export default function FractionalMarketingLeadershipPage() {
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
                href="/solutions/growth-strategy-advisory"
                className="hover:text-ink-headline transition-colors"
              >
                Growth Strategy & Advisory
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-ink-headline">Fractional Marketing Leadership</li>
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
                    Service — Growth Strategy & Advisory
                  </p>
                </div>

                <h1 className="font-bold tracking-[-0.025em] text-[clamp(40px,6vw,88px)] text-ink-headline leading-[1.05] max-w-[18ch] text-balance mb-8">
                  Hire the{" "}
                  <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                    role
                  </span>
                  , not the headcount.
                </h1>

                <p className="font-body text-body-lg text-ink-body leading-[1.55] max-w-[54ch] mb-10">
                  A senior marketing operator embedded in your team two days a
                  week. Accountable to the number, not the slide deck. Working
                  themselves out of the job from month one.
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    href="/book-consultation"
                    className="inline-flex items-center gap-3 bg-brand-yellow text-ink-headline font-display font-light text-[clamp(18px,1.4vw,24px)] px-8 py-4 hover:bg-emerald-900 hover:text-white transition-colors duration-hover"
                  >
                    <span>Apply for a fractional engagement</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                  <Link
                    href="/solutions/growth-strategy-advisory"
                    className="font-mono text-[12px] uppercase tracking-[0.18em] text-ink-headline border-b border-ink-headline pb-0.5 hover:text-ink-headline/60 hover:border-brand-yellow transition-colors"
                  >
                    Parent practice →
                  </Link>
                </div>
              </div>

              {/* Right — operating cadence calendar */}
              <div className="md:col-span-5 flex items-center justify-center pt-8 md:pt-0">
                <OperatingCadenceCalendar />
              </div>
            </div>
          </div>
        </section>

        {/* ─── 2. OWNS / DOESN'T OWN — green 2-column accountability map ─── */}
        <section
          className="bg-emerald-900 text-white"
          aria-labelledby="owns-doesnt-heading"
        >
          <div className="container-layout py-24 md:py-32">
            <div className="grid md:grid-cols-12 gap-8 md:gap-16 mb-14 md:mb-16 items-end">
              <div className="md:col-span-9">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60 mb-6">
                  Accountability map
                </p>
                <h2
                  id="owns-doesnt-heading"
                  className="font-bold tracking-[-0.025em] text-[clamp(36px,5vw,68px)] text-white leading-[1.05] max-w-[24ch] text-balance"
                >
                  What the role{" "}
                  <span className="bg-brand-yellow text-ink-headline px-3 py-0.5 box-decoration-clone">
                    owns
                  </span>{" "}
                  &mdash; and what it doesn&rsquo;t.
                </h2>
              </div>
              <div className="md:col-span-3 md:text-right">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60 leading-relaxed">
                  <span className="inline-block w-1.5 h-1.5 bg-brand-yellow mr-2 align-middle" />
                  Scope discipline
                  <br />
                  Signed at week one
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-px bg-white/15 border border-white/15">
              {/* OWNS column */}
              <div className="bg-emerald-900 p-8 md:p-10">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-yellow mb-8 flex items-center gap-3">
                  <span className="inline-block w-2 h-2 bg-brand-yellow" />
                  Owns
                </p>
                <ol className="space-y-7">
                  {OWNS.map((row, i) => (
                    <li
                      key={row.item}
                      className="grid grid-cols-[auto_1fr] gap-4 md:gap-5 items-baseline"
                    >
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 w-8">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="font-display font-light text-[clamp(18px,1.7vw,22px)] text-white leading-[1.3] tracking-[-0.005em] mb-1">
                          {row.item}
                        </p>
                        <p
                          className="font-body text-body-sm text-white/65 leading-[1.5]"
                          dangerouslySetInnerHTML={{ __html: row.sub }}
                        />
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              {/* DOESN'T OWN column */}
              <div className="bg-emerald-900 p-8 md:p-10">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/50 mb-8 flex items-center gap-3">
                  <span className="inline-block w-2 h-2 bg-white/30" />
                  Doesn&rsquo;t own
                </p>
                <ol className="space-y-7">
                  {DOESNT_OWN.map((row, i) => (
                    <li
                      key={row.item}
                      className="grid grid-cols-[auto_1fr] gap-4 md:gap-5 items-baseline"
                    >
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 w-8">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p className="font-display font-light text-[clamp(18px,1.7vw,22px)] text-white/55 leading-[1.3] tracking-[-0.005em] line-through decoration-white/25 mb-1">
                          {row.item}
                        </p>
                        <p
                          className="font-body text-body-sm text-white/45 leading-[1.5]"
                          dangerouslySetInnerHTML={{ __html: row.sub }}
                        />
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 mt-8">
              Scope is signed at week one. Adjustments quarterly.
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
                    <h3 className="font-display font-bold text-[clamp(24px,2.4vw,34px)] text-ink-headline tracking-[-0.02em] leading-[1.12] mb-4 max-w-[24ch]">
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

        {/* ─── 4. ACCOUNTABILITY CATALOG ─── */}
        <section
          className="bg-bg-primary border-b border-ink-headline/10"
          aria-labelledby="catalog-heading"
        >
          <div className="container-layout py-24 md:py-32">
            <div className="grid md:grid-cols-12 gap-8 md:gap-16 mb-16 md:mb-20 items-end">
              <div className="md:col-span-9">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-6">
                  Accountability catalog
                </p>
                <h2
                  id="catalog-heading"
                  className="font-bold tracking-[-0.025em] text-[clamp(40px,6vw,88px)] text-ink-headline leading-[1.02] max-w-[22ch] text-balance"
                >
                  Six domains.{" "}
                  <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                    Twenty-four
                  </span>{" "}
                  named responsibilities.
                </h2>
              </div>
              <div className="md:col-span-3 md:text-right">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted leading-relaxed">
                  <span className="inline-block w-1.5 h-1.5 bg-brand-yellow mr-2 align-middle" />
                  Scoped
                  <br />
                  Reviewed quarterly
                </p>
              </div>
            </div>

            <ol className="grid md:grid-cols-2 lg:grid-cols-3 border-l border-t border-ink-headline/15">
              {ACCOUNTABILITY_CATALOG.map((cat, i) => (
                <li
                  key={cat.category}
                  className="group relative p-8 md:p-10 border-r border-b border-ink-headline/15 flex flex-col transition-colors duration-hover hover:bg-bg-secondary"
                >
                  <div className="flex items-baseline justify-between gap-6 mb-6">
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-headline">
                      {String(i + 1).padStart(2, "0")} /{" "}
                      {String(ACCOUNTABILITY_CATALOG.length).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                      {cat.items.length} owned
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
                  Five layers of the{" "}
                  <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                    engagement
                  </span>
                  .
                </h2>
              </div>
              <div className="md:col-span-3 md:text-right">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted leading-relaxed">
                  <span className="inline-block w-1.5 h-1.5 bg-brand-yellow mr-2 align-middle" />
                  Operating layer
                  <br />
                  Not advisory
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
                  From day one to{" "}
                  <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                    succession
                  </span>
                  .
                </h2>
              </div>
              <div className="md:col-span-3 md:text-right">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted leading-relaxed">
                  <span className="inline-block w-1.5 h-1.5 bg-brand-yellow mr-2 align-middle" />
                  6 phases · 12–24 months
                  <br />
                  Hand-off built in
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
                  <h3 className="font-display font-light text-[clamp(22px,2vw,28px)] text-ink-headline tracking-[-0.01em] leading-[1.15] mb-3">
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
          aria-labelledby="fractional-logos-heading"
        >
          <div className="container-layout py-16 md:py-20">
            <p
              id="fractional-logos-heading"
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-10"
            >
              Companies we&rsquo;ve sat at the leadership table for
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
                What the engagement{" "}
                <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                  asks of you
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
                  Industries we operate inside
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
                    <h3 className="font-display font-bold text-[clamp(18px,1.6vw,22px)] text-ink-headline tracking-[-0.01em] leading-[1.3]">
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

            <h2 className="font-bold tracking-[-0.025em] text-[clamp(48px,8vw,128px)] leading-[1.02] max-w-[22ch] mb-16 md:mb-24 text-white text-balance">
              Stop searching for a CMO.{" "}
              <span className="bg-brand-yellow text-ink-headline px-3 py-0.5 box-decoration-clone">
                Borrow one
              </span>
              .
            </h2>

            <div className="grid md:grid-cols-12 gap-8 md:gap-16 pt-10 border-t border-white/15 items-center">
              <div className="md:col-span-7">
                <p className="font-body text-body-lg text-white/80 leading-[1.5] max-w-[52ch]">
                  A 45-minute paid leadership audit. We score your marketing
                  function, the number that needs moving, and whether a
                  fractional CMO is actually what you need. Refunded in full if
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
