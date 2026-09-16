import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/meta";
import { GlobalNav } from "@/components/nav/GlobalNav";
import { Footer } from "@/components/nav/Footer";
import { GridOverlay } from "@/components/blocks/GridOverlay";
import { ConversionLeveragePyramid } from "@/components/utility/ConversionLeveragePyramid";

// ─────────────────────────────────────────────
// Conversion Optimization sub-service page (Experience & Engineering).
// Distinct sections — Leverage Math (green tiered table),
// Experiment Library catalog, Architecture, sprint-cadence Process.
// ─────────────────────────────────────────────

export const metadata: Metadata = buildMetadata({
  title:
    "Conversion Optimization — Experience & Engineering | Zeppstr",
  description:
    "Most CRO teams test buttons. We rebuild flows. Color doesn’t move CAC — offer does. We work the leverage hierarchy in the right order, not the easy one.",
  path: "/solutions/experience-engineering/conversion-optimization",
})

// ─── Content ───

const FEATURED_LOGOS = [
  { name: "Wise Market", file: "wise-market.png" },
  { name: "Mini Leaves", file: "mini-leaves.png" },
  { name: "Tru Aquapolis", file: "tru-aquapolis.png" },
  { name: "Aishwarya Interiors", file: "aishwarya-interiors.png" },
  { name: "Empuls", file: "empuls.png" },
  { name: "My Keto Co", file: "my-keto-co.png" },
  { name: "Tristar Online", file: "tristar-online.png" },
  { name: "iVehicleValue", file: "ivehiclevalue.png" },
];

// LEVERAGE MATH — tier table with lift potential
const LEVERAGE_TIERS = [
  {
    n: "05",
    tier: "Offer",
    lift: "+40 – 200%",
    work: "What you sell, to whom, at what price.",
    examples: "Price tier · bundle · guarantee · payment terms",
  },
  {
    n: "04",
    tier: "Positioning",
    lift: "+20 – 80%",
    work: "Who it&rsquo;s for and what it replaces.",
    examples: "Audience reframe · category swap · hero promise",
  },
  {
    n: "03",
    tier: "Flow",
    lift: "+10 – 40%",
    work: "The path from landing to purchase.",
    examples: "Step removal · friction edits · sequence rebuilds",
  },
  {
    n: "02",
    tier: "Copy",
    lift: "+5 – 25%",
    work: "How you say it on the surface.",
    examples: "Headlines · CTA copy · proof points · objections",
  },
  {
    n: "01",
    tier: "Design + Color",
    lift: "+1 – 10%",
    work: "What it looks like.",
    examples: "Layout · button color · imagery · typography",
  },
];

// Principles — 4 rules
const PRINCIPLES = [
  {
    n: "01",
    title: "Leverage > velocity.",
    body: "One offer test that lifts conversion 60% beats fifty button tests that lift it 0.4% each. We work the right tier, not the easy one.",
  },
  {
    n: "02",
    title: "The page is the experiment.",
    body: "Variants are the noise. Most teams optimize variants without questioning the page underneath. We start with the rebuild, then test variants on a sound surface.",
  },
  {
    n: "03",
    title: "If you can&rsquo;t measure it, you can&rsquo;t ship it.",
    body: "No test goes live without sample size, MDE, sample-ratio-mismatch checks, and a pre-registered hypothesis. Tests &ldquo;won&rdquo; on noise are not wins.",
  },
  {
    n: "04",
    title: "Statistical significance is the floor.",
    body: "Significant + holdout-confirmed + segment-stable + 90-day-decay-checked is the ceiling. Most teams stop at the first. We stop at the fourth.",
  },
];

// EXPERIMENT LIBRARY — 6 categories of experiments
const EXPERIMENT_LIBRARY = [
  {
    category: "Offer Tests",
    items: [
      "Price tier · bundle · payment terms",
      "Guarantee · risk reversal",
      "Trial vs freemium vs paid",
      "Anchor pricing structure",
    ],
  },
  {
    category: "Positioning Tests",
    items: [
      "Hero promise rewrites",
      "Category reframe",
      "Audience-segment landing",
      "Alternative-to messaging",
    ],
  },
  {
    category: "Flow Restructures",
    items: [
      "Step removal · consolidation",
      "Friction audit edits",
      "Form-field reduction",
      "Multi-step ↔ single-page",
    ],
  },
  {
    category: "Copy Rewrites",
    items: [
      "Headline · sub-head pairs",
      "CTA copy variants",
      "Proof point reordering",
      "Objection-handling sections",
    ],
  },
  {
    category: "Layout Rebuilds",
    items: [
      "Section sequence",
      "Above-fold density",
      "Mobile-first restructure",
      "Comparison-table builds",
    ],
  },
  {
    category: "Pricing Tests",
    items: [
      "Annual vs monthly framing",
      "Inclusion / exclusion lines",
      "Tier-naming experiments",
      "Discount mechanic tests",
    ],
  },
];

// ARCHITECTURE — 5 layers
const ARCHITECTURE_LAYERS = [
  {
    name: "Hypothesis Layer",
    format: "Quant + Qual + Heuristic",
    description:
      "Where ideas come from. Funnel data, session replays, customer interviews, sales objections, support tickets. Ranked by expected leverage × evidence × effort.",
  },
  {
    name: "Spec Layer",
    format: "Hypothesis · MDE · Holdout · KPI",
    description:
      "Every test specced before it ships. Primary metric, guardrail metrics, minimum detectable effect, sample size, holdout cohort, decision criteria. Pre-registered.",
  },
  {
    name: "Implementation Layer",
    format: "Build · QA · Instrument",
    description:
      "Code, design, copy, and instrumentation deployed together. No test launches unless the analytics layer is verified end-to-end.",
  },
  {
    name: "Analysis Layer",
    format: "Stats · Segments · Replays",
    description:
      "Statistical significance with SRM check, segment-level stability, qualitative replay review. A &ldquo;winner&rdquo; that fails any one is held for rerun.",
  },
  {
    name: "Decision Layer",
    format: "Ship · Kill · Iterate",
    description:
      "Wins shipped to 100% and 90-day decay-monitored. Losses documented (most losses are knowledge). Inconclusive runs iterated or killed &mdash; not extended forever.",
  },
];

// 6 process phases — sprint cadence
const PROCESS_PHASES = [
  {
    title: "Audit",
    duration: "Week 1–2",
    body: "Baseline funnel rates, qualitative gaps, current test backlog, instrumentation quality. Written diagnostic with the top-leverage opportunities scored.",
  },
  {
    title: "Hypothesis Bank",
    duration: "Week 3",
    body: "Thirty-plus hypotheses generated, scored by leverage × evidence × effort, prioritized by tier. The backlog the program runs on for the next two quarters.",
  },
  {
    title: "Sprint 01",
    duration: "Week 4–5",
    body: "Top two hypotheses specced, built, instrumented, shipped. First learnings logged whether they win or lose.",
  },
  {
    title: "Sprint 02",
    duration: "Week 6–7",
    body: "Next two hypotheses. By now the cadence is set — the analytics tested, the spec template proven, the design lane warm.",
  },
  {
    title: "Sprint 03",
    duration: "Week 8–9",
    body: "Wins from Sprints 01–02 iterated, scaled to 100%, or doubled. Losses become next hypotheses or killed cleanly.",
  },
  {
    title: "Operating Cadence",
    duration: "Week 10–12+",
    body: "Rolling two-week sprints, four tests per quarter, monthly review, quarterly leverage-rebalance. The program runs without anyone reinventing the wheel each cycle.",
  },
];

const PRACTICE_NUMBERS = [
  {
    figure: "0.5% → 3%+",
    metric: "Site conversion rate",
    detail:
      "A six-fold move, sustained across multiple cohorts. It came from the offer and the journey, not from button colours.",
    client: "Mini Leaves",
  },
  {
    figure: "4 / qtr",
    metric: "Tests we ship per quarter",
    detail:
      "Deliberately low cadence. Industry &ldquo;always-on&rdquo; programs ship 20+ shallow tests that compound to nothing.",
    client: "Discipline of the practice",
  },
  {
    figure: "Powered",
    metric: "Every test sized before it runs",
    detail:
      "An underpowered test produces a confident wrong answer that then gets rolled out everywhere. We size for the effect we are willing to act on, and we report the tests that lose.",
    client: "Zeppstr — testing discipline",
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
    question: "Why only 4 tests a quarter? Doesn&rsquo;t velocity matter?",
    answer:
      "Velocity matters when the underlying hypotheses are strong. Most &ldquo;always-on&rdquo; programs ship shallow tests that don&rsquo;t move the business, then look busy on a dashboard. We&rsquo;d rather ship four tests that produce four real decisions than forty that produce noise.",
  },
  {
    question: "What testing platform do you use?",
    answer:
      "VWO, Optimizely, Convert, or your existing tool. The platform doesn&rsquo;t make a meaningful difference. The hypothesis quality, spec discipline, and analysis rigor do.",
  },
  {
    question: "Can you work without our engineering team?",
    answer:
      "For surface tests (copy, layout, design), yes &mdash; client-side via the testing tool. For flow rebuilds and offer changes, no &mdash; those need engineering. The audit will scope which work needs engineering vs which doesn&rsquo;t.",
  },
  {
    question: "What if our traffic is too low for statistical significance?",
    answer:
      "Common. Below ~50K monthly sessions, classical A/B testing is shaky. We&rsquo;ll either focus on offer / positioning / flow rebuilds (no test needed) or use Bayesian methods and segment-stable wins. We don&rsquo;t fake significance.",
  },
  {
    question: "Do you do conversion copywriting?",
    answer:
      "Yes &mdash; though copy is tier 02 in our leverage hierarchy. We&rsquo;ll do it when it&rsquo;s the right move. We won&rsquo;t default to it when offer or flow is the actual lever.",
  },
  {
    question: "What does it cost?",
    answer:
      "Programs start at ₹12L per quarter (audit + hypothesis bank + 4 sprints). Annual engagements ₹40L–60L depending on scope. Fixed scope, quoted after the audit.",
  },
];

// ─────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────

export default function ConversionOptimizationPage() {
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
            <li className="text-ink-headline">Conversion Optimization</li>
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
                  Most CRO teams test{" "}
                  <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                    buttons
                  </span>
                  . We rebuild flows.
                </h1>

                <p className="font-body text-body-lg text-ink-body leading-[1.55] max-w-[54ch] mb-10">
                  Color doesn&rsquo;t move CAC. Offer does. Positioning does.
                  Flow does. We work the leverage hierarchy in the right order
                  &mdash; not the easy one.
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    href="/book-consultation"
                    className="inline-flex items-center gap-3 bg-brand-yellow text-ink-headline font-display font-light text-display-xs px-8 py-4 hover:bg-emerald-900 hover:text-white transition-colors duration-hover"
                  >
                    <span>Apply for a CRO audit</span>
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

              {/* Right — leverage pyramid */}
              <div className="md:col-span-5 flex items-center justify-center pt-8 md:pt-0">
                <ConversionLeveragePyramid />
              </div>
            </div>
          </div>
        </section>

        {/* ─── 2. LEVERAGE MATH — green tiered table ─── */}
        <section
          className="bg-emerald-900 text-white"
          aria-labelledby="leverage-math-heading"
        >
          <div className="container-layout py-24 md:py-32">
            <div className="grid md:grid-cols-12 gap-8 md:gap-16 mb-14 md:mb-16 items-end">
              <div className="md:col-span-9">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60 mb-6">
                  Leverage math
                </p>
                <h2
                  id="leverage-math-heading"
                  className="font-bold tracking-[-0.025em] text-display-lg text-white leading-[1.05] max-w-[24ch] text-balance"
                >
                  Same effort.{" "}
                  <span className="bg-brand-yellow text-ink-headline px-3 py-0.5 box-decoration-clone">
                    Wildly different
                  </span>{" "}
                  lift.
                </h2>
              </div>
              <div className="md:col-span-3 md:text-right">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60 leading-relaxed">
                  <span className="inline-block w-1.5 h-1.5 bg-brand-yellow mr-2 align-middle" />
                  Typical ranges
                  <br />
                  by tier
                </p>
              </div>
            </div>

            {/* Table header row */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 pb-4 border-b border-white/25 mb-2">
              <div className="md:col-span-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                Tier
              </div>
              <div className="md:col-span-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                Lever
              </div>
              <div className="md:col-span-2 font-mono text-[10px] uppercase tracking-[0.2em] text-brand-yellow">
                Lift range
              </div>
              <div className="md:col-span-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                What it actually means
              </div>
              <div className="md:col-span-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                Examples
              </div>
            </div>

            {/* Tier rows — biggest leverage at top of the table */}
            <ol>
              {LEVERAGE_TIERS.map((row, i) => {
                const isTop = i === 0; // Offer tier
                const isBottom = i === LEVERAGE_TIERS.length - 1; // Design + Color
                return (
                  <li
                    key={row.tier}
                    className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 py-6 md:py-7 border-b border-white/15 items-baseline"
                  >
                    <div className="md:col-span-1 font-mono text-[11px] uppercase tracking-[0.2em] text-brand-yellow">
                      {row.n}
                    </div>
                    <div className="md:col-span-3">
                      <p
                        className={`font-display ${
                          isTop ? "font-bold" : isBottom ? "font-light line-through decoration-white/30" : "font-light"
                        } text-[clamp(20px,2vw,28px)] text-white leading-[1.2] tracking-[-0.01em]`}
                      >
                        {row.tier}
                      </p>
                    </div>
                    <div className="md:col-span-2">
                      <p
                        className={`font-display ${
                          isTop ? "font-light text-brand-yellow" : "font-extralight text-white/70"
                        } text-display-xs leading-[1.2] tracking-[-0.01em]`}
                      >
                        {row.lift}
                      </p>
                    </div>
                    <div className="md:col-span-3">
                      <p
                        className="font-body text-body-sm text-white/75 leading-[1.5]"
                        dangerouslySetInnerHTML={{ __html: row.work }}
                      />
                    </div>
                    <div className="md:col-span-3">
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/55 leading-relaxed">
                        {row.examples}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>

            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 mt-8">
              We work top-down. Most teams work bottom-up.
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

        {/* ─── 4. EXPERIMENT LIBRARY ─── */}
        <section
          className="bg-bg-primary border-b border-ink-headline/10"
          aria-labelledby="experiment-library-heading"
        >
          <div className="container-layout py-24 md:py-32">
            <div className="grid md:grid-cols-12 gap-8 md:gap-16 mb-16 md:mb-20 items-end">
              <div className="md:col-span-9">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-6">
                  Experiment library
                </p>
                <h2
                  id="experiment-library-heading"
                  className="font-bold tracking-[-0.025em] text-display-xl text-ink-headline leading-[1.02] max-w-[22ch] text-balance"
                >
                  Six categories.{" "}
                  <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                    Twenty-four
                  </span>{" "}
                  test types.
                </h2>
              </div>
              <div className="md:col-span-3 md:text-right">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted leading-relaxed">
                  <span className="inline-block w-1.5 h-1.5 bg-brand-yellow mr-2 align-middle" />
                  Specced
                  <br />
                  Powered · Reviewed
                </p>
              </div>
            </div>

            <ol className="grid md:grid-cols-2 lg:grid-cols-3 border-l border-t border-ink-headline/15">
              {EXPERIMENT_LIBRARY.map((cat, i) => (
                <li
                  key={cat.category}
                  className="group relative p-8 md:p-10 border-r border-b border-ink-headline/15 flex flex-col transition-colors duration-hover hover:bg-bg-secondary"
                >
                  <div className="flex items-baseline justify-between gap-6 mb-6">
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-headline">
                      {String(i + 1).padStart(2, "0")} /{" "}
                      {String(EXPERIMENT_LIBRARY.length).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                      {cat.items.length} types
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
                  Five layers from{" "}
                  <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                    hypothesis to decision
                  </span>
                  .
                </h2>
              </div>
              <div className="md:col-span-3 md:text-right">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted leading-relaxed">
                  <span className="inline-block w-1.5 h-1.5 bg-brand-yellow mr-2 align-middle" />
                  Stack-built
                  <br />
                  Stack-measured
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
                  Two-week sprints.{" "}
                  <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                    Four tests per quarter
                  </span>
                  .
                </h2>
              </div>
              <div className="md:col-span-3 md:text-right">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted leading-relaxed">
                  <span className="inline-block w-1.5 h-1.5 bg-brand-yellow mr-2 align-middle" />
                  6 phases · 12 weeks
                  <br />
                  Rolling thereafter
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
          aria-labelledby="cro-logos-heading"
        >
          <div className="container-layout py-16 md:py-20">
            <p
              id="cro-logos-heading"
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-10"
            >
              Brands we&rsquo;ve optimized conversion for
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
                  ships
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
                  Industries we run CRO for
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
              Stop testing buttons.{" "}
              <span className="bg-brand-yellow text-ink-headline px-3 py-0.5 box-decoration-clone">
                Move the lever
              </span>
              .
            </h2>

            <div className="grid md:grid-cols-12 gap-8 md:gap-16 pt-10 border-t border-white/15 items-center">
              <div className="md:col-span-7">
                <p className="font-body text-body-lg text-white/80 leading-[1.5] max-w-[52ch]">
                  A 45-minute paid CRO audit. We score your funnel, your test
                  backlog, and the tier you&rsquo;re actually testing at.
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
