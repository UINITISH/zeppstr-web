import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/meta";
import { GlobalNav } from "@/components/nav/GlobalNav";
import { Footer } from "@/components/nav/Footer";
import { GridOverlay } from "@/components/blocks/GridOverlay";
import { DiagnosticReportCover } from "@/components/utility/DiagnosticReportCover";

// ─────────────────────────────────────────────
// Growth Diagnostic & Audit sub-service page (Growth Strategy & Advisory).
// Distinct sections — The Descent (green vertical investigation trail),
// Diagnostic Catalog, Architecture, 4–6 week Process.
// ─────────────────────────────────────────────

export const metadata: Metadata = buildMetadata({
  title:
    "Growth Diagnostic & Audit — Growth Strategy & Advisory | Zeppstr",
  description:
    "Most marketing problems are diagnosis problems. A written growth diagnostic, six weeks end-to-end, readable in thirty minutes, actionable on Monday morning. Refundable if we’re wrong.",
  path: "/solutions/growth-strategy-advisory/growth-diagnostic-audit",
})

// ─── Content ───

const FEATURED_LOGOS = [
  { name: "Prohance", file: "prohance.png" },
  { name: "Empuls", file: "empuls.png" },
  { name: "Wise Market", file: "wise-market.png" },
  { name: "Mini Leaves", file: "mini-leaves.png" },
  { name: "Tru Aquapolis", file: "tru-aquapolis.png" },
  { name: "Aishwarya Interiors", file: "aishwarya-interiors.png" },
  { name: "Tristar Online", file: "tristar-online.png" },
  { name: "Twenty One Finance", file: "twenty-one-finance.png" },
];

// THE DESCENT — vertical investigation trail (single example)
const DESCENT = [
  {
    label: "Reported symptom",
    text: "&ldquo;Revenue is down 18% this quarter.&rdquo;",
    sub: "What the founder says in the kickoff call.",
  },
  {
    label: "Step 01 · Surface metric",
    text: "Paid spend is up 30% but converted revenue is flat.",
    sub: "First scrub of the GA / Stripe / ad platform numbers.",
  },
  {
    label: "Step 02 · Channel decomposition",
    text: "Channel mix has shifted — 60% of spend now goes to generic search.",
    sub: "Spend allocation by channel, vs same quarter last year.",
  },
  {
    label: "Step 03 · Keyword-level look",
    text: "Generic search is bidding on terms the brand already ranks organically for.",
    sub: "SEM keyword report cross-referenced with organic visibility.",
  },
  {
    label: "Step 04 · Brand-name cannibalisation",
    text: "47% of paid clicks are users who would have come anyway via brand search.",
    sub: "Cohort analysis of paid-click users vs organic baseline.",
  },
  {
    label: "Diagnosis",
    text: "Paid is paying for traffic the brand already had. Revenue isn&rsquo;t down — paid spend is up, against itself.",
    sub: "→ 90-day plan: pause generic search, redirect to demand-gen, exclude brand terms.",
    isDiagnosis: true,
  },
];

// Principles — 4 rules
const PRINCIPLES = [
  {
    n: "01",
    title: "Diagnosis is the work.",
    body: "Not an opening for a longer engagement. Not a sales deck disguised as analysis. The written diagnostic is the deliverable &mdash; whether or not you ever work with us again.",
  },
  {
    n: "02",
    title: "Symptom &ne; diagnosis.",
    body: "&ldquo;Conversion is down&rdquo; is a symptom. &ldquo;Brand promise mismatch with paid creative&rdquo; is a diagnosis. We don&rsquo;t prescribe until we&rsquo;ve descended through the symptom to the actual cause.",
  },
  {
    n: "03",
    title: "Written, not presented.",
    body: "Slide decks hide thinking. A written diagnostic forces clarity. Readable in thirty minutes. Forwardable to the board. Argues with itself in the margins.",
  },
  {
    n: "04",
    title: "Refundable, by design.",
    body: "If the diagnostic doesn&rsquo;t name something you didn&rsquo;t already know, we refund it. The bar isn&rsquo;t &ldquo;the work was done.&rdquo; The bar is &ldquo;you learned something.&rdquo;",
  },
];

// DIAGNOSTIC CATALOG — 6 categories of what we audit (24 areas)
const DIAGNOSTIC_CATALOG = [
  {
    category: "Strategy & Operating Model",
    items: [
      "ICP fit · audience clarity",
      "Goals · OKRs · accountability",
      "Team structure & coverage",
      "Operating rhythm · cadence",
    ],
  },
  {
    category: "Acquisition Channels",
    items: [
      "Channel mix · spend allocation",
      "CAC by channel · cohort",
      "Creative quality · diversity",
      "Brand vs non-brand split",
    ],
  },
  {
    category: "Conversion Architecture",
    items: [
      "Funnel performance · stage rates",
      "Landing-page health",
      "Offer · pricing · friction",
      "Sales hand-off · MQL→SQL",
    ],
  },
  {
    category: "Lifecycle & Retention",
    items: [
      "Lifecycle flow coverage",
      "Owned-channel revenue share",
      "Repeat purchase · LTV",
      "Win-back & reactivation",
    ],
  },
  {
    category: "Brand & Positioning",
    items: [
      "Positioning · category fit",
      "Voice consistency",
      "Identity & system drift",
      "Brand-search velocity",
    ],
  },
  {
    category: "Measurement & Attribution",
    items: [
      "Event coverage · source-of-truth",
      "Identity resolution quality",
      "Attribution model · gaps",
      "Reporting · decision support",
    ],
  },
];

// ARCHITECTURE — 5 layers of how the diagnostic gets produced
const ARCHITECTURE_LAYERS = [
  {
    name: "Intake Layer",
    format: "Kickoff · stakeholder interviews · access",
    description:
      "Founder interview, leadership round, customer call sampling, tool access provisioned. The questions we&rsquo;ll descend through, written before any data is touched.",
  },
  {
    name: "Evidence Layer",
    format: "Quant · Qual · Behavioural",
    description:
      "Analytics, CRM, ad platforms, lifecycle tools, session replays, sales transcripts. Pulled, normalized, cross-referenced. Surface complaints checked against ground truth.",
  },
  {
    name: "Descent Layer",
    format: "Symptom → Cause · 4–6 layers deep",
    description:
      "Each finding traced from reported symptom through 4&ndash;6 layers of inquiry to its underlying cause. Documented step-by-step so the diagnosis can be argued with, not just received.",
  },
  {
    name: "Diagnosis Layer",
    format: "Findings · Severity · Confidence",
    description:
      "Each finding written up with severity, evidence, confidence interval, and a clear &ldquo;so what.&rdquo; This is the document you forward to the board.",
  },
  {
    name: "Plan Layer",
    format: "Stop · Start · Fix · 90 days",
    description:
      "Three columns: what to stop doing, what to start, what to fix. Prioritized by impact × effort. Owners and dates suggested. Actionable Monday morning.",
  },
];

// 6 process phases — short cycle (4–6 weeks)
const PROCESS_PHASES = [
  {
    title: "Intake",
    duration: "Week 1",
    body: "Kickoff call with founder + leadership. Tool access provisioned. Customer sample identified. Working questions drafted and signed off.",
  },
  {
    title: "Evidence",
    duration: "Week 2–3",
    body: "Quant pulled from every channel. Customer interviews run. Sales transcripts reviewed. Session replays sampled. Stakeholder round complete.",
  },
  {
    title: "Descent",
    duration: "Week 3–4",
    body: "Each surface symptom traced down through evidence to its root cause. Findings drafted with severity, evidence, and confidence labelled.",
  },
  {
    title: "Drafting",
    duration: "Week 4–5",
    body: "Written diagnostic drafted. Reviewed internally for argumentative clarity &mdash; if it doesn&rsquo;t survive an internal challenge, it doesn&rsquo;t ship.",
  },
  {
    title: "Readout",
    duration: "Week 5",
    body: "Single readout call with leadership. Document delivered. We argue with our own findings before you do. Edits captured live.",
  },
  {
    title: "Final + Refund Window",
    duration: "Week 6",
    body: "Final document delivered. If it didn&rsquo;t name something you didn&rsquo;t already know, we refund. The bar is learning &mdash; not delivery.",
  },
];

const PRACTICE_NUMBERS = [
  {
    figure: "30 min",
    metric: "Reading time",
    detail:
      "The diagnostic is built to be readable in one sitting, forwardable to the board, and skimmable by the operator.",
    client: "Document discipline",
  },
  {
    figure: "4–6 wks",
    metric: "End-to-end cycle",
    detail:
      "Intake to delivered document. Compressed deliberately &mdash; if it takes longer, the diagnosis has stopped being timely.",
    client: "Standard cycle",
  },
  {
    figure: "100%",
    metric: "Refundable",
    detail:
      "If the diagnostic doesn&rsquo;t name something you didn&rsquo;t already know, we refund. The bar is learning, not delivery.",
    client: "Refund clause",
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
    question: "Is this the same as the diagnostic on the home page?",
    answer:
      "No. The 45-minute paid diagnostic on the home page is a triage call &mdash; useful for fit and pointing at the right practice. This is the full written growth diagnostic &mdash; six weeks of work, ₹4L&ndash;6L, a 30&ndash;50 page document, refundable.",
  },
  {
    question: "Will you upsell us into a longer engagement?",
    answer:
      "Sometimes the right next step is one of our practices &mdash; sometimes it&rsquo;s a hire we recommend, an agency consolidation, or just &ldquo;here&rsquo;s the 90-day plan, go execute.&rdquo; The diagnostic is the work. What comes next is a separate decision.",
  },
  {
    question: "Who actually does the diagnostic?",
    answer:
      "A senior operator (typically the founder or a principal). Not a junior consultant with a template. The diagnosis is only as good as the brain doing the descent.",
  },
  {
    question: "Can you do this without a lot of internal data?",
    answer:
      "Yes &mdash; but the depth scales with what&rsquo;s accessible. We&rsquo;ll tell you up front what coverage we can realistically achieve. We won&rsquo;t fake confidence we don&rsquo;t have.",
  },
  {
    question: "What if we already have an internal marketing team?",
    answer:
      "Most clients do. The diagnostic is often more valuable then &mdash; an outside read with no internal politics, no career incentives, no roadmap to defend. Many teams have asked for one specifically because they couldn&rsquo;t make the case internally.",
  },
  {
    question: "What does it cost?",
    answer:
      "₹4L&ndash;6L for the full written growth diagnostic, depending on company complexity. Six weeks end-to-end. Refundable if it doesn&rsquo;t name something you didn&rsquo;t already know.",
  },
];

// ─────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────

export default function GrowthDiagnosticAuditPage() {
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
            <li className="text-ink-headline">Growth Diagnostic & Audit</li>
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

                <h1 className="font-bold tracking-[-0.025em] text-[clamp(40px,6vw,88px)] text-ink-headline leading-[1.05] max-w-[20ch] text-balance mb-8">
                  Most marketing problems are{" "}
                  <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                    diagnosis
                  </span>{" "}
                  problems.
                </h1>

                <p className="font-body text-body-lg text-ink-body leading-[1.55] max-w-[54ch] mb-10">
                  A written growth diagnostic, six weeks end-to-end, readable
                  in thirty minutes, actionable on Monday morning. Refundable
                  if it doesn&rsquo;t name something you didn&rsquo;t already
                  know.
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    href="/book-consultation"
                    className="inline-flex items-center gap-3 bg-brand-yellow text-ink-headline font-display font-light text-[clamp(18px,1.4vw,24px)] px-8 py-4 hover:bg-emerald-900 hover:text-white transition-colors duration-hover"
                  >
                    <span>Apply for a diagnostic</span>
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

              {/* Right — diagnostic report cover */}
              <div className="md:col-span-5 flex items-center justify-center pt-8 md:pt-0">
                <DiagnosticReportCover />
              </div>
            </div>
          </div>
        </section>

        {/* ─── 2. THE DESCENT — green vertical investigation trail ─── */}
        <section
          className="bg-emerald-900 text-white"
          aria-labelledby="descent-heading"
        >
          <div className="container-layout py-24 md:py-32">
            <div className="grid md:grid-cols-12 gap-8 md:gap-16 mb-14 md:mb-16 items-end">
              <div className="md:col-span-9">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60 mb-6">
                  The descent
                </p>
                <h2
                  id="descent-heading"
                  className="font-bold tracking-[-0.025em] text-[clamp(36px,5vw,68px)] text-white leading-[1.05] max-w-[24ch] text-balance"
                >
                  One symptom.{" "}
                  <span className="bg-brand-yellow text-ink-headline px-3 py-0.5 box-decoration-clone">
                    Four layers
                  </span>{" "}
                  down to the diagnosis.
                </h2>
              </div>
              <div className="md:col-span-3 md:text-right">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60 leading-relaxed">
                  <span className="inline-block w-1.5 h-1.5 bg-brand-yellow mr-2 align-middle" />
                  Sample
                  <br />
                  investigation
                </p>
              </div>
            </div>

            {/* Vertical descent trail */}
            <ol className="max-w-[58ch] mx-auto">
              {DESCENT.map((step, i) => {
                const isDiag = step.isDiagnosis;
                return (
                  <li key={i} className="relative pl-10 md:pl-14">
                    {/* Vertical connector line */}
                    {i < DESCENT.length - 1 && (
                      <span
                        aria-hidden="true"
                        className="absolute left-3 md:left-5 top-7 w-px h-full bg-white/25"
                      />
                    )}
                    {/* Indicator dot */}
                    <span
                      aria-hidden="true"
                      className={`absolute left-1 md:left-3 top-2 w-5 h-5 flex items-center justify-center ${
                        isDiag
                          ? "bg-brand-yellow"
                          : i === 0
                            ? "bg-white/15 border border-white/40"
                            : "bg-emerald-900 border border-white/40"
                      }`}
                    >
                      {isDiag && (
                        <span className="block w-2 h-2 bg-ink-headline" />
                      )}
                    </span>

                    <div className={`pb-${isDiag ? "0" : "10"} md:pb-${isDiag ? "0" : "12"}`}>
                      {/* Step label */}
                      <p
                        className={`font-mono text-[10px] uppercase tracking-[0.2em] mb-3 ${
                          isDiag ? "text-brand-yellow" : "text-white/55"
                        }`}
                      >
                        {step.label}
                      </p>

                      {/* Main statement */}
                      <p
                        className={`font-display ${
                          isDiag
                            ? "font-bold text-[clamp(22px,2.2vw,30px)] text-white"
                            : "font-light text-[clamp(18px,1.7vw,22px)] text-white/90"
                        } leading-[1.35] tracking-[-0.01em] mb-3`}
                        dangerouslySetInnerHTML={{ __html: step.text }}
                      />

                      {/* Sub note */}
                      <p
                        className={`font-body text-body-sm leading-[1.55] ${
                          isDiag ? "text-brand-yellow/80 mt-3" : "text-white/55 italic"
                        }`}
                        dangerouslySetInnerHTML={{ __html: step.sub }}
                      />
                    </div>
                  </li>
                );
              })}
            </ol>

            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 mt-12 text-center">
              Every finding in the diagnostic descends like this.
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
                  diagnose from
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

        {/* ─── 4. DIAGNOSTIC CATALOG ─── */}
        <section
          className="bg-bg-primary border-b border-ink-headline/10"
          aria-labelledby="catalog-heading"
        >
          <div className="container-layout py-24 md:py-32">
            <div className="grid md:grid-cols-12 gap-8 md:gap-16 mb-16 md:mb-20 items-end">
              <div className="md:col-span-9">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-6">
                  Diagnostic catalog
                </p>
                <h2
                  id="catalog-heading"
                  className="font-bold tracking-[-0.025em] text-[clamp(40px,6vw,88px)] text-ink-headline leading-[1.02] max-w-[22ch] text-balance"
                >
                  Six domains.{" "}
                  <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                    Twenty-four
                  </span>{" "}
                  audit lines.
                </h2>
              </div>
              <div className="md:col-span-3 md:text-right">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted leading-relaxed">
                  <span className="inline-block w-1.5 h-1.5 bg-brand-yellow mr-2 align-middle" />
                  Scored
                  <br />
                  Evidence-backed
                </p>
              </div>
            </div>

            <ol className="grid md:grid-cols-2 lg:grid-cols-3 border-l border-t border-ink-headline/15">
              {DIAGNOSTIC_CATALOG.map((cat, i) => (
                <li
                  key={cat.category}
                  className="group relative p-8 md:p-10 border-r border-b border-ink-headline/15 flex flex-col transition-colors duration-hover hover:bg-bg-secondary"
                >
                  <div className="flex items-baseline justify-between gap-6 mb-6">
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-headline">
                      {String(i + 1).padStart(2, "0")} /{" "}
                      {String(DIAGNOSTIC_CATALOG.length).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                      {cat.items.length} lines
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
                  Five layers from{" "}
                  <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                    intake to plan
                  </span>
                  .
                </h2>
              </div>
              <div className="md:col-span-3 md:text-right">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted leading-relaxed">
                  <span className="inline-block w-1.5 h-1.5 bg-brand-yellow mr-2 align-middle" />
                  Sequential
                  <br />
                  None skipped
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
                  Six weeks from intake to{" "}
                  <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                    diagnosis
                  </span>
                  .
                </h2>
              </div>
              <div className="md:col-span-3 md:text-right">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted leading-relaxed">
                  <span className="inline-block w-1.5 h-1.5 bg-brand-yellow mr-2 align-middle" />
                  6 phases · 4–6 weeks
                  <br />
                  Refundable
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
          aria-labelledby="diagnostic-logos-heading"
        >
          <div className="container-layout py-16 md:py-20">
            <p
              id="diagnostic-logos-heading"
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-10"
            >
              Companies we&rsquo;ve diagnosed
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
                What the diagnostic{" "}
                <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                  guarantees
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
                  Industries we diagnose
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
              Stop guessing.{" "}
              <span className="bg-brand-yellow text-ink-headline px-3 py-0.5 box-decoration-clone">
                Get diagnosed
              </span>
              .
            </h2>

            <div className="grid md:grid-cols-12 gap-8 md:gap-16 pt-10 border-t border-white/15 items-center">
              <div className="md:col-span-7">
                <p className="font-body text-body-lg text-white/80 leading-[1.5] max-w-[52ch]">
                  Six weeks. A 30&ndash;50 page written diagnostic plus a 90-day
                  plan. Refundable if it doesn&rsquo;t name something you
                  didn&rsquo;t already know.
                </p>
              </div>
              <div className="md:col-span-5 flex md:justify-end">
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
