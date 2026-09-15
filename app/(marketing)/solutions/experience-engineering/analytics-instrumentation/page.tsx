import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/meta";
import { GlobalNav } from "@/components/nav/GlobalNav";
import { Footer } from "@/components/nav/Footer";
import { GridOverlay } from "@/components/blocks/GridOverlay";
import { DataInstrumentationFlow } from "@/components/utility/DataInstrumentationFlow";

// ─────────────────────────────────────────────
// Analytics & Instrumentation sub-service page (Experience & Engineering).
// Distinct sections — Four Lies (green diagnostic), Instrumentation Catalog,
// Architecture, 12-week Process.
// ─────────────────────────────────────────────

export const metadata: Metadata = buildMetadata({
  title:
    "Analytics & Instrumentation — Experience & Engineering | Zeppstr",
  description:
    "If you can’t trust the number, you can’t trust the decision. We build one event spec, one identity model, one warehouse — and every tool downstream of it.",
  path: "/solutions/experience-engineering/analytics-instrumentation",
})

// ─── Content ───

const FEATURED_LOGOS = [
  { name: "Mini Leaves", file: "mini-leaves.png" },
  { name: "Wise Market", file: "wise-market.png" },
  { name: "Prohance", file: "prohance.png" },
  { name: "Empuls", file: "empuls.png" },
  { name: "My Keto Co", file: "my-keto-co.png" },
  { name: "Fixstars", file: "fixstars.png" },
  { name: "iVehicleValue", file: "ivehiclevalue.png" },
  { name: "Twenty One Finance", file: "twenty-one-finance.png" },
];

// THE FOUR LIES — bad instrumentation produces these
const FOUR_LIES = [
  {
    n: "01",
    lie: "Attribution is honest.",
    why: "Last-click ignores 70% of the journey. Every channel takes credit it didn&rsquo;t earn.",
    fix: "Modeled multi-touch attribution backed by a real identity graph.",
  },
  {
    n: "02",
    lie: "Funnel rates are real.",
    why: "Half of every funnel drop is missing instrumentation, not real abandonment. The numbers look like a problem &mdash; the problem is the schema.",
    fix: "Event coverage audit. Schema before dashboards.",
  },
  {
    n: "03",
    lie: "LTV is your LTV.",
    why: "Most LTV calculations exclude refunds, returns, and churned cohorts. The number says one thing. Finance disagrees.",
    fix: "Cohort-anchored LTV modeled in the warehouse, not the dashboard.",
  },
  {
    n: "04",
    lie: "A/B tests are valid.",
    why: "No sample-ratio-mismatch detection, no minimum detectable effect, no holdout. The test &ldquo;won&rdquo; on noise.",
    fix: "Experiment framework with SRM, MDE, and pre-registered hypotheses.",
  },
];

// Principles — 4 rules
const PRINCIPLES = [
  {
    n: "01",
    title: "One spec. One identity. One warehouse.",
    body: "Every event flows through one schema. Every user resolves to one identity. Every downstream tool reads from one warehouse. Anything else, and the numbers drift.",
  },
  {
    n: "02",
    title: "Events are contracts. Treat them like code.",
    body: "Event names, properties, and types are pull-requested, reviewed, versioned. Tracking plans live in git, not in Notion. Drift gets caught at the diff, not the dashboard.",
  },
  {
    n: "03",
    title: "If you can&rsquo;t replay it, you can&rsquo;t trust it.",
    body: "Raw events stored, immutable. Every dashboard rebuildable from source. If the model breaks, you don&rsquo;t lose history &mdash; you re-derive it.",
  },
  {
    n: "04",
    title: "The dashboard is the last layer.",
    body: "Most teams start with the dashboard and back into events. We build source → identity → warehouse → models → dashboard, in that order. The dashboard is the output of the system, not the system.",
  },
];

// INSTRUMENTATION CATALOG — categories of events we instrument
const INSTRUMENTATION_CATALOG = [
  {
    category: "Web & App Events",
    items: [
      "Page · screen views",
      "Click & interaction events",
      "Form lifecycle events",
      "Performance & error events",
    ],
  },
  {
    category: "CRM & Marketing",
    items: [
      "Lead capture · scoring",
      "Email engagement",
      "Stage / status transitions",
      "Owner & assignment changes",
    ],
  },
  {
    category: "Revenue & Commerce",
    items: [
      "Cart · checkout · purchase",
      "Subscription lifecycle",
      "Refunds · chargebacks · churn",
      "Pricing experiment events",
    ],
  },
  {
    category: "Experiment Events",
    items: [
      "Assignment & exposure",
      "Conversion events",
      "Holdout cohort flags",
      "SRM / quality checks",
    ],
  },
  {
    category: "Server-side Events",
    items: [
      "API call telemetry",
      "Backend conversion events",
      "Webhook intake",
      "Cross-device server-resolution",
    ],
  },
  {
    category: "Identity Resolution",
    items: [
      "Anonymous → known stitching",
      "Cross-device identity",
      "PII handling · hashing",
      "Consent state tracking",
    ],
  },
];

// ARCHITECTURE — 5 layers
const ARCHITECTURE_LAYERS = [
  {
    name: "Source Layer",
    format: "Web · App · Server · 3rd-party",
    description:
      "Every touchpoint capturing the same events with the same schema. JS SDK, native SDKs, server SDKs, webhooks. The boundary of the system.",
  },
  {
    name: "Collection Layer",
    format: "CDP · Tag Manager · Pipelines",
    description:
      "Segment, RudderStack, or open-source equivalent. One ingestion plane that all sources write to. Routed downstream without business logic in the pipe.",
  },
  {
    name: "Identity Layer",
    format: "Anonymous → known resolution",
    description:
      "Anonymous visitor stitched to known user on identification event. Cross-device, cross-session, server-resolved. Without this, every funnel undercounts.",
  },
  {
    name: "Warehouse Layer",
    format: "Raw · Staging · Modeled",
    description:
      "BigQuery, Snowflake, or Redshift. Raw events immutable. Staging layer cleaned. dbt models for the metrics the business actually uses. Source of truth.",
  },
  {
    name: "Activation Layer",
    format: "Dashboards · Reverse-ETL · Ads sync",
    description:
      "Dashboards (Looker, Metabase), reverse-ETL to lifecycle tools, audiences synced to ads platforms. Every consumer reads from the same warehouse.",
  },
];

// 6 process phases — 12 weeks
const PROCESS_PHASES = [
  {
    title: "Audit",
    duration: "Week 1–2",
    body: "Current event coverage, identity resolution quality, source-of-truth count, dashboard-to-event traceability. Written diagnostic with leak points.",
  },
  {
    title: "Event Spec",
    duration: "Week 3–4",
    body: "Tracking plan written. Naming convention, properties, identity model, consent rules. Reviewed, versioned, signed off before any code ships.",
  },
  {
    title: "Source Implementation",
    duration: "Week 5–7",
    body: "Web, app, server SDKs implemented to spec. Each event tested. Tag manager cleaned. Old events deprecated, not silently replaced.",
  },
  {
    title: "Warehouse + Identity",
    duration: "Week 8–9",
    body: "Events piped into BigQuery / Snowflake. Identity resolution live. Raw events stored immutable. Staging layer cleaned and documented.",
  },
  {
    title: "Modeling + Dashboards",
    duration: "Week 10–11",
    body: "dbt models for the metrics that matter. The four or five dashboards the business actually decides from. Everything else gets killed.",
  },
  {
    title: "Activation",
    duration: "Week 12+",
    body: "Reverse-ETL sync to lifecycle, ads, CRM. Experiment framework operational. Quality monitoring live. The system runs without anyone babysitting it.",
  },
];

const PRACTICE_NUMBERS = [
  {
    figure: "87%",
    metric: "Event-coverage gap",
    detail:
      "Average gap between what teams think they track and what they actually capture, found on first audit.",
    client: "Across the practice",
  },
  {
    figure: "5 → 1",
    metric: "Sources of truth",
    detail:
      "Most clients arrive with five tools each claiming different numbers. Target state is one warehouse, every tool downstream.",
    client: "Standard outcome",
  },
  {
    figure: "3 / 12",
    metric: "Annual partner slots",
    detail:
      "Three of every twelve partner engagements include instrumentation work — usually paired with the rest of Experience & Engineering.",
    client: "Selective by design",
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
    question: "We already use GA4 / Mixpanel / Amplitude. Do you re-platform us?",
    answer:
      "Only if the platform is the bottleneck. Most engagements add a warehouse + identity layer behind your existing tools so they finally agree with each other. We don&rsquo;t default to rip-and-replace.",
  },
  {
    question: "Do we need a data team, or do you replace one?",
    answer:
      "We build the system so a non-specialist team can operate it. If you have a data team, we hand it to them in production-ready form. If you don&rsquo;t, we&rsquo;ll usually advise hiring one analytics engineer by month six.",
  },
  {
    question: "What if our engineering team is the bottleneck?",
    answer:
      "Common. The audit usually surfaces this. We&rsquo;ll scope the implementation in chunks engineering can absorb — or bring our own implementation partner in for the SDK + warehouse work.",
  },
  {
    question: "Where do you stand on GA4?",
    answer:
      "GA4 is fine as a dashboard tool. It&rsquo;s a poor source of truth — sampled, modeled, and not yours. Use it for board-deck graphs; use your warehouse for decisions.",
  },
  {
    question: "How do you handle privacy and consent?",
    answer:
      "Consent state is itself an event. We instrument it the same way we instrument everything else, then enforce downstream — so paid sync, lifecycle send, and experiment assignment all respect it. GDPR / CCPA compliant by design.",
  },
  {
    question: "What does it cost?",
    answer:
      "Foundational builds start at ₹20L for the 12-week engagement. Larger scopes (multi-region, multi-brand, complex identity) quoted post-audit. Ongoing governance from ₹3L/month.",
  },
];

// ─────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────

export default function AnalyticsInstrumentationPage() {
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
            <li className="text-ink-headline">Analytics & Instrumentation</li>
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
                  If you can&rsquo;t{" "}
                  <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                    trust the number
                  </span>
                  , don&rsquo;t trust the decision.
                </h1>

                <p className="font-body text-body-lg text-ink-body leading-[1.55] max-w-[54ch] mb-10">
                  One event spec. One identity model. One warehouse. Every tool
                  downstream of it &mdash; agreeing, finally, on the same
                  numbers.
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    href="/book-consultation"
                    className="inline-flex items-center gap-3 bg-brand-yellow text-ink-headline font-display font-light text-display-xs px-8 py-4 hover:bg-emerald-900 hover:text-white transition-colors duration-hover"
                  >
                    <span>Apply for an instrumentation audit</span>
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

              {/* Right — data flow graphic */}
              <div className="md:col-span-5 flex items-center justify-center pt-8 md:pt-0">
                <DataInstrumentationFlow />
              </div>
            </div>
          </div>
        </section>

        {/* ─── 2. THE FOUR LIES — green diagnostic block ─── */}
        <section
          className="bg-emerald-900 text-white"
          aria-labelledby="four-lies-heading"
        >
          <div className="container-layout py-24 md:py-32">
            <div className="grid md:grid-cols-12 gap-8 md:gap-16 mb-14 md:mb-16 items-end">
              <div className="md:col-span-9">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60 mb-6">
                  Diagnostic
                </p>
                <h2
                  id="four-lies-heading"
                  className="font-bold tracking-[-0.025em] text-display-lg text-white leading-[1.05] max-w-[24ch] text-balance"
                >
                  Four lies your{" "}
                  <span className="bg-brand-yellow text-ink-headline px-3 py-0.5 box-decoration-clone">
                    dashboard
                  </span>{" "}
                  is telling you.
                </h2>
              </div>
              <div className="md:col-span-3 md:text-right">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60 leading-relaxed">
                  <span className="inline-block w-1.5 h-1.5 bg-brand-yellow mr-2 align-middle" />
                  Found in
                  <br />
                  every audit
                </p>
              </div>
            </div>

            <ol className="grid md:grid-cols-2 gap-px bg-white/15 border border-white/15">
              {FOUR_LIES.map((l) => (
                <li
                  key={l.n}
                  className="bg-emerald-900 p-8 md:p-10 flex flex-col"
                >
                  {/* Header row */}
                  <div className="flex items-baseline justify-between gap-6 mb-5">
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-yellow">
                      Lie {l.n}
                    </span>
                    <span
                      aria-hidden="true"
                      className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 line-through"
                    >
                      &ldquo;Believed&rdquo;
                    </span>
                  </div>
                  {/* Lie statement */}
                  <h3 className="font-display font-light text-display-md text-white leading-[1.15] tracking-[-0.01em] mb-5 line-through decoration-brand-yellow/60 decoration-[1px]">
                    {l.lie}
                  </h3>
                  {/* Why it's a lie */}
                  <p
                    className="font-body text-body text-white/75 leading-[1.6] mb-5"
                    dangerouslySetInnerHTML={{ __html: l.why }}
                  />
                  {/* Fix */}
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-yellow border-t border-white/15 pt-5 mt-auto">
                    Fix → {l.fix.replace(/&rsquo;/g, "'")}
                  </p>
                </li>
              ))}
            </ol>
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
                  instrument from
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

        {/* ─── 4. INSTRUMENTATION CATALOG ─── */}
        <section
          className="bg-bg-primary border-b border-ink-headline/10"
          aria-labelledby="catalog-heading"
        >
          <div className="container-layout py-24 md:py-32">
            <div className="grid md:grid-cols-12 gap-8 md:gap-16 mb-16 md:mb-20 items-end">
              <div className="md:col-span-9">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-6">
                  Instrumentation catalog
                </p>
                <h2
                  id="catalog-heading"
                  className="font-bold tracking-[-0.025em] text-display-xl text-ink-headline leading-[1.02] max-w-[22ch] text-balance"
                >
                  Six categories.{" "}
                  <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                    Twenty-four
                  </span>{" "}
                  event groups.
                </h2>
              </div>
              <div className="md:col-span-3 md:text-right">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted leading-relaxed">
                  <span className="inline-block w-1.5 h-1.5 bg-brand-yellow mr-2 align-middle" />
                  Versioned
                  <br />
                  Tested · Documented
                </p>
              </div>
            </div>

            <ol className="grid md:grid-cols-2 lg:grid-cols-3 border-l border-t border-ink-headline/15">
              {INSTRUMENTATION_CATALOG.map((cat, i) => (
                <li
                  key={cat.category}
                  className="group relative p-8 md:p-10 border-r border-b border-ink-headline/15 flex flex-col transition-colors duration-hover hover:bg-bg-secondary"
                >
                  <div className="flex items-baseline justify-between gap-6 mb-6">
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-headline">
                      {String(i + 1).padStart(2, "0")} /{" "}
                      {String(INSTRUMENTATION_CATALOG.length).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                      {cat.items.length} groups
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
                  Five layers between{" "}
                  <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                    event and decision
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
                  Twelve weeks from audit to{" "}
                  <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                    one source of truth
                  </span>
                  .
                </h2>
              </div>
              <div className="md:col-span-3 md:text-right">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted leading-relaxed">
                  <span className="inline-block w-1.5 h-1.5 bg-brand-yellow mr-2 align-middle" />
                  6 phases · 12 weeks
                  <br />
                  Then quarterly governance
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
                  <p className="font-body text-body text-ink-body leading-relaxed max-w-[34ch]">
                    {phase.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ─── 7. LOGO STRIP ─── */}
        <section
          className="bg-bg-primary border-b border-ink-headline/10"
          aria-labelledby="analytics-logos-heading"
        >
          <div className="container-layout py-16 md:py-20">
            <p
              id="analytics-logos-heading"
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-10"
            >
              Brands we&rsquo;ve instrumented
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
                What the audit{" "}
                <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                  always finds
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
                  <p className="font-body text-body text-ink-body leading-[1.5] max-w-[34ch]">
                    {n.detail}
                  </p>
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
                  Industries we instrument for
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
              Stop debating numbers.{" "}
              <span className="bg-brand-yellow text-ink-headline px-3 py-0.5 box-decoration-clone">
                Trust them
              </span>
              .
            </h2>

            <div className="grid md:grid-cols-12 gap-8 md:gap-16 pt-10 border-t border-white/15 items-center">
              <div className="md:col-span-7">
                <p className="font-body text-body-lg text-white/80 leading-[1.5] max-w-[52ch]">
                  A 45-minute paid instrumentation audit. We score your event
                  coverage, identity resolution, and source-of-truth count.
                  Refunded in full if we&rsquo;re not the right fit.
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
