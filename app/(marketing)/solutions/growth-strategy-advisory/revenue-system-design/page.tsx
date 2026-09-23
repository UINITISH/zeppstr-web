import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/meta";
import { GlobalNav } from "@/components/nav/GlobalNav";
import { Footer } from "@/components/nav/Footer";
import { GridOverlay } from "@/components/blocks/GridOverlay";
import { RevenueSystemBlueprint } from "@/components/utility/RevenueSystemBlueprint";

// ─────────────────────────────────────────────
// Revenue System Design sub-service page (Growth Strategy & Advisory).
// Distinct sections — Five Levers Compounded (green math block),
// System Catalog, Architecture, 8–12 week Process.
// ─────────────────────────────────────────────

export const metadata: Metadata = buildMetadata({
  title: "Revenue System Design — Growth Strategy & Advisory | Zeppstr",
  description:
    "Pipeline gets built. Revenue gets designed. We blueprint the full revenue system — acquire, convert, activate, retain, expand — so every downstream team operates from one map, not five.",
  path: "/solutions/growth-strategy-advisory/revenue-system-design",
})

// ─── Content ───

const FEATURED_LOGOS = [
  { name: "Prohance", file: "prohance.png" },
  { name: "Empuls", file: "empuls.png" },
  { name: "Wise Market", file: "wise-market.png" },
  { name: "Mini Leaves", file: "mini-leaves.png" },
  { name: "Tru Aquapolis", file: "tru-aquapolis.png" },
  { name: "Twenty One Finance", file: "twenty-one-finance.png" },
  { name: "Fixstars", file: "fixstars.png" },
  { name: "Tristar Online", file: "tristar-online.png" },
];

// THE FIVE LEVERS — green math block showing compound effect
const FIVE_LEVERS = [
  {
    n: "01",
    lever: "Traffic",
    move: "+10%",
    effect: "Revenue · linear",
    note: "More at-bat. Most-attacked lever, least leverage.",
  },
  {
    n: "02",
    lever: "Conversion",
    move: "+10%",
    effect: "Revenue · linear",
    note: "Same traffic, more conversion. CRO-tier work.",
  },
  {
    n: "03",
    lever: "AOV",
    move: "+10%",
    effect: "Revenue · linear",
    note: "Pricing, bundle, upsell at point of purchase.",
  },
  {
    n: "04",
    lever: "Repeat rate",
    move: "+10%",
    effect: "LTV · compounding",
    note: "Each cohort earns more. Lifecycle’s job.",
  },
  {
    n: "05",
    lever: "Referral",
    move: "+10%",
    effect: "Free acquisition · compounding",
    note: "Referred users become acquisition. Loop-back to lever 01.",
  },
];

// Principles — 4 rules
const PRINCIPLES = [
  {
    n: "01",
    title: "System &gt; tactics.",
    body: "Every team can optimize their own tactic. None of those optimizations compound across teams unless they sit inside one designed system. The design is the leverage.",
  },
  {
    n: "02",
    title: "Five levers, designed together.",
    body: "Traffic, conversion, AOV, repeat, referral. Most teams pull one or two. We design all five at once so the math compounds — the difference between 10% and 60% on the same effort.",
  },
  {
    n: "03",
    title: "One blueprint, ten outputs.",
    body: "The revenue system design produces the paid plan, content plan, lifecycle plan, sales playbook, measurement spec, and so on. Every downstream practice runs from one source — not from a different map per team.",
  },
  {
    n: "04",
    title: "Designed to loop.",
    body: "Acquired customers should become acquisition channel via retention, advocacy, and referral. A revenue system without the loop is a pipeline. With the loop, it’s an engine.",
  },
];

// SYSTEM CATALOG — 6 categories of system components
const SYSTEM_CATALOG = [
  {
    category: "Acquisition Design",
    items: [
      "Channel mix · weight",
      "CAC ceiling per channel",
      "Creative strategy per channel",
      "Attribution model · cohort",
    ],
  },
  {
    category: "Conversion Design",
    items: [
      "Site journey architecture",
      "Sales playbook · stage gates",
      "Offer ladder · price tiers",
      "Friction map · removal plan",
    ],
  },
  {
    category: "Activation Design",
    items: [
      "Onboarding sequence",
      "Time-to-first-value target",
      "Behavioural milestones",
      "Activation owner · accountability",
    ],
  },
  {
    category: "Retention Design",
    items: [
      "Lifecycle flow architecture",
      "Health-score model",
      "Retention KPI · cadence",
      "Churn-cause taxonomy",
    ],
  },
  {
    category: "Expansion Design",
    items: [
      "Upsell paths · triggers",
      "Cross-sell offer map",
      "Pricing & packaging review",
      "NRR target · accountability",
    ],
  },
  {
    category: "Loop Mechanics",
    items: [
      "Referral mechanic design",
      "Advocacy program",
      "Compound channel feedback",
      "Word-of-mouth measurement",
    ],
  },
];

// ARCHITECTURE — 5 layers of the design
const ARCHITECTURE_LAYERS = [
  {
    name: "Question Layer",
    format: "Which lever · Which segment · Why now",
    description:
      "Where the leverage actually is. Which customer segment, which lever, which time horizon. Without this, the system design becomes a generic pipeline diagram.",
  },
  {
    name: "Math Layer",
    format: "Cohort · LTV · CAC · NRR",
    description:
      "The unit economics that the system is being designed to move. CAC payback period, LTV by cohort, NRR target. Numbers signed off before design begins.",
  },
  {
    name: "Wiring Layer",
    format: "Stages · Components · Connections",
    description:
      "The actual blueprint — five stages, named components per stage, the connections between them. The thing you can put on a wall.",
  },
  {
    name: "Output Layer",
    format: "Plans · Playbooks · Specs",
    description:
      "The ten downstream documents the design produces: paid plan, content plan, lifecycle plan, sales playbook, measurement spec, hiring map, vendor map, governance plan, and two more.",
  },
  {
    name: "Operating Layer",
    format: "Cadence · Owners · Reviews",
    description:
      "How the system gets operated week-to-week. Owners assigned per stage, KPIs per owner, monthly review of the system itself (not just outputs).",
  },
];

// 6 process phases — 8–12 weeks
const PROCESS_PHASES = [
  {
    title: "Question Lock",
    duration: "Week 1",
    body: "Which lever, which segment, which horizon. Signed off in writing before any design starts. Without it, this becomes generic strategy.",
  },
  {
    title: "Math + Evidence",
    duration: "Week 2–3",
    body: "Unit economics modelled. Cohort behaviour pulled. CAC payback, LTV, NRR, repeat rate — the baseline numbers the system has to move.",
  },
  {
    title: "Wiring Design",
    duration: "Week 4–6",
    body: "Five-stage blueprint designed. Components named, connections drawn, loop mechanics scoped. Reviewed with leadership before output drafting.",
  },
  {
    title: "Output Drafting",
    duration: "Week 7–9",
    body: "Ten downstream documents produced — paid plan, content plan, lifecycle plan, sales playbook, and the rest. Each in production-ready form.",
  },
  {
    title: "Operating Plan",
    duration: "Week 10–11",
    body: "Owners assigned, cadence defined, KPIs locked. The plan for how the system gets operated — not just designed.",
  },
  {
    title: "Hand-off + Governance",
    duration: "Week 12+",
    body: "Walk-through with every stage owner. First quarterly review scheduled. We stay on as governance, or hand off cleanly to the parent practice.",
  },
];

const PRACTICE_NUMBERS = [
  {
    figure: "1 → 10",
    metric: "One blueprint, ten outputs",
    detail:
      "The design produces ten downstream plans — paid, content, lifecycle, sales, measurement, hiring, and more.",
    client: "Standard deliverable",
  },
  {
    figure: "5 levers",
    metric: "Designed together",
    detail:
      "Traffic, conversion, AOV, repeat, referral — designed as one system. Combined +5% on each = +63% revenue.",
    client: "Compound math",
  },
  {
    figure: "8–12 wks",
    metric: "End-to-end cycle",
    detail:
      "From question lock to operating plan. Faster and the math hasn’t been done. Longer and the team has moved on.",
    client: "Standard cycle",
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
    question: "How is this different from a strategy deck?",
    answer:
      "Strategy decks describe; revenue system designs prescribe. The blueprint names every stage, every component, every owner, every KPI. It’s the document the paid team operates from, not a PowerPoint you forward and forget.",
  },
  {
    question: "Do we need this if we already have a marketing plan?",
    answer:
      "Most “marketing plans” are channel plans — what we’ll do on paid, what we’ll do on content. A revenue system design sits underneath those, defining how the channels connect, how they hand off, and how they compound. If your channels are working in isolation, you need this.",
  },
  {
    question: "Who needs to be in the room?",
    answer:
      "The founder or CEO, head of marketing, head of sales (or revenue), and a finance partner. Without finance, the unit economics get hand-waved. Without sales, the conversion design fails on first contact.",
  },
  {
    question: "Can you execute the system after designing it?",
    answer:
      "Yes — through the parent practice. Or we hand it off to your team with the operating plan and stay on as governance. The design isn’t conditional on us executing.",
  },
  {
    question: "What if our unit economics are bad?",
    answer:
      "Then the system design becomes a turnaround plan. The math layer surfaces the leak; the wiring layer shows where the fix lives; the output layer prescribes what to do. We’ll tell you if the underlying business doesn’t support the system you want.",
  },
  {
    question: "What does it cost?",
    answer:
      "Revenue System Design engagements run ₹12L–18L for the 8–12 week cycle, depending on company complexity. Annual operating plan + governance from ₹4L/month.",
  },
];

// ─────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────

export default function RevenueSystemDesignPage() {
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
            <li className="text-ink-headline">Revenue System Design</li>
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

                <h1 className="font-bold tracking-[-0.025em] text-display-xl text-ink-headline leading-[1.16] max-w-[20ch] text-balance mb-8">
                  Pipeline gets built.{" "}
                  <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                    Revenue
                  </span>{" "}
                  gets designed.
                </h1>

                <p className="font-body text-body-lg text-ink-body leading-[1.55] max-w-[54ch] mb-10">
                  We blueprint the full revenue system — acquire,
                  convert, activate, retain, expand — so every downstream
                  team operates from one map, not five.
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    href="/book-consultation"
                    className="inline-flex items-center gap-3 bg-brand-yellow text-ink-headline font-display font-light text-display-xs px-8 py-4 hover:bg-emerald-900 hover:text-white transition-colors duration-hover"
                  >
                    <span>Apply for a system design</span>
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

              {/* Right — revenue system blueprint */}
              <div className="md:col-span-5 flex items-center justify-center pt-8 md:pt-0">
                <RevenueSystemBlueprint />
              </div>
            </div>
          </div>
        </section>

        {/* ─── 2. THE FIVE LEVERS — green math block ─── */}
        <section
          className="bg-emerald-900 text-white"
          aria-labelledby="five-levers-heading"
        >
          <div className="container-layout py-24 md:py-32">
            <div className="grid md:grid-cols-12 gap-8 md:gap-16 mb-14 md:mb-16 items-end">
              <div className="md:col-span-9">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60 mb-6">
                  The five levers
                </p>
                <h2
                  id="five-levers-heading"
                  className="font-bold tracking-[-0.025em] text-display-lg text-white leading-[1.05] max-w-[24ch] text-balance"
                >
                  Five levers, designed{" "}
                  <span className="bg-brand-yellow text-ink-headline px-3 py-0.5 box-decoration-clone">
                    together
                  </span>
                  .
                </h2>
              </div>
              <div className="md:col-span-3 md:text-right">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60 leading-relaxed">
                  <span className="inline-block w-1.5 h-1.5 bg-brand-yellow mr-2 align-middle" />
                  Same effort
                  <br />
                  Compounding result
                </p>
              </div>
            </div>

            {/* Lever rows */}
            <ol>
              {FIVE_LEVERS.map((row) => (
                <li
                  key={row.n}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-6 md:py-7 border-b border-white/15 items-baseline"
                >
                  <div className="md:col-span-1 font-mono text-[11px] uppercase tracking-[0.2em] text-brand-yellow">
                    {row.n}
                  </div>
                  <div className="md:col-span-3">
                    <p className="font-display font-light text-display-sm text-white leading-[1.2] tracking-[-0.005em]">
                      {row.lever}
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="font-display font-extralight text-display-sm text-brand-yellow leading-[1.2] tracking-[-0.01em]">
                      {row.move}
                    </p>
                  </div>
                  <div className="md:col-span-3">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/70 leading-[1.5]">
                      → {row.effect}
                    </p>
                  </div>
                  <div className="md:col-span-3">
                    <p
                      className="font-body text-body-sm text-white/65 leading-[1.5] italic"
                      dangerouslySetInnerHTML={{ __html: row.note }}
                    />
                  </div>
                </li>
              ))}
            </ol>

            {/* Compound math summary */}
            <div className="mt-12 md:mt-14 grid md:grid-cols-12 gap-6 md:gap-8 py-10 border-y-2 border-brand-yellow items-baseline">
              <div className="md:col-span-1 font-mono text-[11px] uppercase tracking-[0.2em] text-brand-yellow">
                Σ
              </div>
              <div className="md:col-span-5">
                <p className="font-display font-light text-display-sm text-white leading-[1.2]">
                  All five &middot; +5% each
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/55 mt-2">
                  Same total effort as “+10% on traffic alone”
                </p>
              </div>
              <div className="md:col-span-3">
                <p className="font-display font-extralight text-display-md text-brand-yellow leading-[1.1] tracking-[-0.02em]">
                  +63% revenue
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/55 mt-2">
                  1.05⁵ &minus; 1
                </p>
              </div>
              <div className="md:col-span-3">
                <p className="font-body text-body-sm text-white/70 leading-[1.5]">
                  The compounding is the system. Designing for one lever forfeits it.
                </p>
              </div>
            </div>
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
                  design from
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

        {/* ─── 4. SYSTEM CATALOG ─── */}
        <section
          className="bg-bg-primary border-b border-ink-headline/10"
          aria-labelledby="catalog-heading"
        >
          <div className="container-layout py-24 md:py-32">
            <div className="grid md:grid-cols-12 gap-8 md:gap-16 mb-16 md:mb-20 items-end">
              <div className="md:col-span-9">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-6">
                  System catalog
                </p>
                <h2
                  id="catalog-heading"
                  className="font-bold tracking-[-0.025em] text-display-xl text-ink-headline leading-[1.02] max-w-[22ch] text-balance"
                >
                  Six domains.{" "}
                  <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                    Twenty-four
                  </span>{" "}
                  system components.
                </h2>
              </div>
              <div className="md:col-span-3 md:text-right">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted leading-relaxed">
                  <span className="inline-block w-1.5 h-1.5 bg-brand-yellow mr-2 align-middle" />
                  Designed together
                  <br />
                  Wired together
                </p>
              </div>
            </div>

            <ol className="grid md:grid-cols-2 lg:grid-cols-3 border-l border-t border-ink-headline/15">
              {SYSTEM_CATALOG.map((cat, i) => (
                <li
                  key={cat.category}
                  className="group relative p-8 md:p-10 border-r border-b border-ink-headline/15 flex flex-col transition-colors duration-hover hover:bg-bg-secondary"
                >
                  <div className="flex items-baseline justify-between gap-6 mb-6">
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-headline">
                      {String(i + 1).padStart(2, "0")} /{" "}
                      {String(SYSTEM_CATALOG.length).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                      {cat.items.length} components
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
                    question to operating
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
                  Twelve weeks to a{" "}
                  <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                    wired system
                  </span>
                  .
                </h2>
              </div>
              <div className="md:col-span-3 md:text-right">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted leading-relaxed">
                  <span className="inline-block w-1.5 h-1.5 bg-brand-yellow mr-2 align-middle" />
                  6 phases · 8–12 weeks
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
          aria-labelledby="revenue-logos-heading"
        >
          <div className="container-layout py-16 md:py-20">
            <p
              id="revenue-logos-heading"
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-10"
            >
              Revenue systems we’ve designed
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
                What the design{" "}
                <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                  produces
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
                  Industries we design revenue for
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
              Stop assembling tactics.{" "}
              <span className="bg-brand-yellow text-ink-headline px-3 py-0.5 box-decoration-clone">
                Design a system
              </span>
              .
            </h2>

            <div className="grid md:grid-cols-12 gap-8 md:gap-16 pt-10 border-t border-white/15 items-center">
              <div className="md:col-span-7">
                <p className="font-body text-body-lg text-white/80 leading-[1.5] max-w-[52ch]">
                  Eight to twelve weeks. One blueprint. Ten downstream
                  documents. Every team operating from the same map. Refundable
                  if it doesn’t change how you make the next decision.
                </p>
              </div>
              <div className="md:col-span-5 flex md:justify-end">
                <Link
                  href="/book-consultation"
                  className="inline-flex items-center justify-center bg-brand-yellow text-emerald-900 font-display font-light text-display-sm px-10 py-5 hover:bg-white transition-colors duration-hover"
                >
                  Apply for a design →
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
