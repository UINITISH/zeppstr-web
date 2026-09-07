import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/meta";
import { GlobalNav } from "@/components/nav/GlobalNav";
import { Footer } from "@/components/nav/Footer";
import { GridOverlay } from "@/components/blocks/GridOverlay";
import { InterfaceBlueprint } from "@/components/utility/InterfaceBlueprint";

// ─────────────────────────────────────────────
// Experience Design (UI/UX) sub-service page (Experience & Engineering).
// Distinct sections — Hidden Decisions (green 3-column table),
// Component Library catalog, atomic-design Architecture, 12-week Process.
// ─────────────────────────────────────────────

export const metadata: Metadata = buildMetadata({
  title:
    "Experience Design — Experience & Engineering | Zeppstr",
  description:
    "Design isn’t decoration. It’s decision architecture. We build experience systems that reduce hesitation — for product, marketing, and sales surfaces alike.",
  path: "/solutions/experience-engineering/experience-design",
})

// ─── Content ───

const FEATURED_LOGOS = [
  { name: "Prohance", file: "prohance.png" },
  { name: "Empuls", file: "empuls.png" },
  { name: "Mini Leaves", file: "mini-leaves.png" },
  { name: "Wise Market", file: "wise-market.png" },
  { name: "Tru Aquapolis", file: "tru-aquapolis.png" },
  { name: "Aishwarya Interiors", file: "aishwarya-interiors.png" },
  { name: "Twenty One Finance", file: "twenty-one-finance.png" },
  { name: "Fixstars", file: "fixstars.png" },
];

// HIDDEN DECISIONS — 6-row, 3-column comparison table
const HIDDEN_DECISIONS = [
  {
    decision: "Default sort",
    most: "Random · created date",
    we: "Most relevant first · personalised by behaviour",
  },
  {
    decision: "Empty states",
    most: "&ldquo;No results.&rdquo;",
    we: "Path to the next action · live examples",
  },
  {
    decision: "Loading states",
    most: "Generic spinner",
    we: "Skeleton matching the final layout · no jump",
  },
  {
    decision: "Form errors",
    most: "Shown on submit · red wall",
    we: "Validated inline · resolved before submit",
  },
  {
    decision: "Pre-filled defaults",
    most: "None · user picks from scratch",
    we: "Best for most users · changeable in one click",
  },
  {
    decision: "Confirmation patterns",
    most: "Modal that blocks the flow",
    we: "Inline non-blocking · undo as a first-class action",
  },
];

// Principles — 4 rules
const PRINCIPLES = [
  {
    n: "01",
    title: "Design is decision architecture.",
    body: "What gets shown, what gets hidden, what gets pre-selected, what gets named. Every screen encodes hundreds of decisions. Most are made by accident. Ours are made on purpose.",
  },
  {
    n: "02",
    title: "Defaults are decisions. Pick the right one.",
    body: "The default option is what 80% of users will accept. Treating defaults as &ldquo;just a placeholder&rdquo; abdicates the most important design decision on the page.",
  },
  {
    n: "03",
    title: "Empty states earn the most attention.",
    body: "First-time users see them. Returning users see them. They&rsquo;re the second-most-visited &ldquo;page&rdquo; in most products. Treat them like the home page, not the cutting-room floor.",
  },
  {
    n: "04",
    title: "Microcopy is the system&rsquo;s voice.",
    body: "Button labels, error messages, placeholder text, confirmation prompts. The product talks more through microcopy than through any marketing channel. Don&rsquo;t outsource it.",
  },
];

// COMPONENT LIBRARY — 6 categories
const COMPONENT_LIBRARY = [
  {
    category: "Foundations",
    items: [
      "Type system · 4 tiers",
      "Color · semantic roles",
      "Space · 8px grid · 12-col",
      "Motion · 5 primitives",
    ],
  },
  {
    category: "Form Primitives",
    items: [
      "Input · text · select · radio",
      "Inline validation states",
      "Pickers · date · file",
      "Multi-step form patterns",
    ],
  },
  {
    category: "Navigation Patterns",
    items: [
      "Global nav · mobile drawer",
      "Breadcrumb · in-context",
      "Tab · pill · segmented",
      "Sidebar · collapsible",
    ],
  },
  {
    category: "Feedback & Status",
    items: [
      "Toast · banner · inline",
      "Loading · skeleton · spinner",
      "Empty states · 3 variants",
      "Error states · recovery paths",
    ],
  },
  {
    category: "Data Display",
    items: [
      "Tables · sortable · filterable",
      "Cards · list · grid · masonry",
      "Charts · 4 primitive types",
      "Stats · KPI tiles",
    ],
  },
  {
    category: "Layout Systems",
    items: [
      "Page templates · 6 base",
      "Container · grid · stack",
      "Responsive breakpoints",
      "Print + email layouts",
    ],
  },
];

// ARCHITECTURE — atomic design hierarchy
const ARCHITECTURE_LAYERS = [
  {
    name: "Tokens",
    format: "Type · Color · Space · Motion · Elevation",
    description:
      "The smallest design decisions, versioned in code. Every component reads from these. Change a token, every surface updates downstream.",
  },
  {
    name: "Atoms",
    format: "Button · Input · Badge · Icon · Label",
    description:
      "The single-purpose primitives. Each with documented states, accessibility notes, and the only-this-not-that usage rules.",
  },
  {
    name: "Molecules",
    format: "Form field · Card · Menu item · Breadcrumb",
    description:
      "Atoms composed into the most-reused chunks. Form field = label + input + helper + error. Each molecule documented and standardized.",
  },
  {
    name: "Organisms",
    format: "Header · Hero · Sidebar · Comparison table",
    description:
      "Molecules composed into recurring surface sections. The product becomes assembly from a fixed organism kit, not custom design per page.",
  },
  {
    name: "Templates · Pages",
    format: "Composed surfaces · Six base templates",
    description:
      "Templates define the layout grid for whole pages. Specific pages are templates with content swapped in. Consistency without rigidity.",
  },
];

// 6 process phases — 12 weeks
const PROCESS_PHASES = [
  {
    title: "Audit",
    duration: "Week 1–2",
    body: "Heuristic audit, analytics review, session replays, accessibility pass. Written diagnostic with the top design-debt opportunities scored.",
  },
  {
    title: "Discovery",
    duration: "Week 3",
    body: "Customer interviews, sales-call review, journey mapping. The decisions that need to be made &mdash; not just the surfaces that need to be designed.",
  },
  {
    title: "Design System",
    duration: "Week 4–6",
    body: "Tokens, atoms, molecules built and documented. The foundation every later surface inherits from. Built in code-ready format, not just Figma.",
  },
  {
    title: "Surface Design",
    duration: "Week 7–9",
    body: "The key surfaces &mdash; signup, dashboard, settings, checkout, whichever apply &mdash; designed against the system. Each surface = templates + decisions.",
  },
  {
    title: "Build Handoff",
    duration: "Week 10–11",
    body: "Specs, redlines, design tokens exported to dev. Decisions documented inline. Engineering ships from the system, not from screenshots.",
  },
  {
    title: "Governance",
    duration: "Week 12+",
    body: "Quarterly drift audit. New components added under review. The system stays alive instead of forking into thirty Figma files.",
  },
];

const PRACTICE_NUMBERS = [
  {
    figure: "−42%",
    metric: "Time-to-task on rebuilt surfaces",
    detail:
      "Median reduction in time-to-complete for primary tasks after experience redesign.",
    client: "B2B SaaS product",
  },
  {
    figure: "1 system",
    metric: "Across product · marketing · sales",
    detail:
      "One source of truth across every surface. Most clients arrive with three diverging systems.",
    client: "Standard outcome",
  },
  {
    figure: "6 / 12",
    metric: "Annual partner slots",
    detail:
      "Six of twelve partner engagements include experience design &mdash; usually paired with the rest of Experience & Engineering.",
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
    question: "Do you do product design or marketing design?",
    answer:
      "Both, usually as one system. Most clients arrive with product and marketing diverged into separate visual languages. We unify them &mdash; same tokens, same components, same voice &mdash; so the brand reads consistently from ad to product onboarding to settings page.",
  },
  {
    question: "Do you work in Figma?",
    answer:
      "Yes. Figma file: hKLYShm3thswPaSuYw4g8F is our active workspace. Tokens are also exported in code (Style Dictionary / Theo format) so engineering doesn&rsquo;t have to translate from Figma to CSS each time.",
  },
  {
    question: "What if we have a design system already?",
    answer:
      "We&rsquo;ll audit it first. Most existing systems are 30% built, 50% drifted, 20% forked. The first move is usually consolidation, not replacement &mdash; we keep what works and rebuild what&rsquo;s broken.",
  },
  {
    question: "Can you work with our existing brand or identity?",
    answer:
      "Yes. Experience design and brand identity are different layers. We can either work inside an existing identity (most common) or scope an identity rebuild alongside this if the audit surfaces a need.",
  },
  {
    question: "What if we have no in-house design team?",
    answer:
      "Common. We build the system so a small team (or even a single hire) can operate it. By month six, most clients hire one designer to maintain and extend &mdash; we transition to governance.",
  },
  {
    question: "What does it cost?",
    answer:
      "Design system + key surfaces start at ₹18L for the 12-week engagement. Larger scope (full product, multi-brand) quoted post-audit. Ongoing governance from ₹3L/month.",
  },
];

// ─────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────

export default function ExperienceDesignPage() {
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
            <li className="text-ink-headline">Experience Design</li>
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

                <h1 className="font-bold tracking-[-0.025em] text-[clamp(40px,6vw,88px)] text-ink-headline leading-[1.05] max-w-[20ch] text-balance mb-8">
                  Design isn&rsquo;t decoration. It&rsquo;s{" "}
                  <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                    decision architecture
                  </span>
                  .
                </h1>

                <p className="font-body text-body-lg text-ink-body leading-[1.55] max-w-[54ch] mb-10">
                  Every screen encodes hundreds of decisions. We make them on
                  purpose &mdash; for product, marketing, and sales surfaces
                  alike &mdash; and we encode them in a system that compounds.
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    href="/book-consultation"
                    className="inline-flex items-center gap-3 bg-brand-yellow text-ink-headline font-display font-light text-[clamp(18px,1.4vw,24px)] px-8 py-4 hover:bg-emerald-900 hover:text-white transition-colors duration-hover"
                  >
                    <span>Apply for an experience audit</span>
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

              {/* Right — interface blueprint */}
              <div className="md:col-span-5 flex items-center justify-center pt-8 md:pt-0">
                <InterfaceBlueprint />
              </div>
            </div>
          </div>
        </section>

        {/* ─── 2. HIDDEN DECISIONS — green 3-column table ─── */}
        <section
          className="bg-emerald-900 text-white"
          aria-labelledby="hidden-decisions-heading"
        >
          <div className="container-layout py-24 md:py-32">
            <div className="grid md:grid-cols-12 gap-8 md:gap-16 mb-14 md:mb-16 items-end">
              <div className="md:col-span-9">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60 mb-6">
                  Hidden decisions
                </p>
                <h2
                  id="hidden-decisions-heading"
                  className="font-bold tracking-[-0.025em] text-[clamp(36px,5vw,68px)] text-white leading-[1.05] max-w-[24ch] text-balance"
                >
                  Six decisions{" "}
                  <span className="bg-brand-yellow text-ink-headline px-3 py-0.5 box-decoration-clone">
                    hiding
                  </span>{" "}
                  inside one screen.
                </h2>
              </div>
              <div className="md:col-span-3 md:text-right">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60 leading-relaxed">
                  <span className="inline-block w-1.5 h-1.5 bg-brand-yellow mr-2 align-middle" />
                  Most teams default
                  <br />
                  We design on purpose
                </p>
              </div>
            </div>

            {/* Table header */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 pb-4 border-b border-white/25 mb-2">
              <div className="md:col-span-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                #
              </div>
              <div className="md:col-span-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                Decision
              </div>
              <div className="md:col-span-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                Most teams default to
              </div>
              <div className="md:col-span-4 font-mono text-[10px] uppercase tracking-[0.2em] text-brand-yellow">
                What we ship
              </div>
            </div>

            <ol>
              {HIDDEN_DECISIONS.map((row, i) => (
                <li
                  key={row.decision}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-6 md:py-7 border-b border-white/15 items-baseline"
                >
                  <div className="md:col-span-1 font-mono text-[11px] uppercase tracking-[0.2em] text-brand-yellow">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="md:col-span-3">
                    <p className="font-display font-light text-[clamp(18px,1.6vw,22px)] text-white leading-[1.3] tracking-[-0.005em]">
                      {row.decision}
                    </p>
                  </div>
                  <div className="md:col-span-4">
                    <p
                      className="font-body text-body-sm text-white/55 leading-[1.55] line-through decoration-white/25"
                      dangerouslySetInnerHTML={{ __html: row.most }}
                    />
                  </div>
                  <div className="md:col-span-4">
                    <p
                      className="font-body text-body text-white leading-[1.55]"
                      dangerouslySetInnerHTML={{ __html: row.we }}
                    />
                  </div>
                </li>
              ))}
            </ol>

            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 mt-8">
              A screen has hundreds of these. The system makes them once.
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

        {/* ─── 4. COMPONENT LIBRARY ─── */}
        <section
          className="bg-bg-primary border-b border-ink-headline/10"
          aria-labelledby="component-library-heading"
        >
          <div className="container-layout py-24 md:py-32">
            <div className="grid md:grid-cols-12 gap-8 md:gap-16 mb-16 md:mb-20 items-end">
              <div className="md:col-span-9">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-6">
                  Component library
                </p>
                <h2
                  id="component-library-heading"
                  className="font-bold tracking-[-0.025em] text-[clamp(40px,6vw,88px)] text-ink-headline leading-[1.02] max-w-[22ch] text-balance"
                >
                  Six categories.{" "}
                  <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                    Twenty-four
                  </span>{" "}
                  component groups.
                </h2>
              </div>
              <div className="md:col-span-3 md:text-right">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted leading-relaxed">
                  <span className="inline-block w-1.5 h-1.5 bg-brand-yellow mr-2 align-middle" />
                  Token-driven
                  <br />
                  Code-ready
                </p>
              </div>
            </div>

            <ol className="grid md:grid-cols-2 lg:grid-cols-3 border-l border-t border-ink-headline/15">
              {COMPONENT_LIBRARY.map((cat, i) => (
                <li
                  key={cat.category}
                  className="group relative p-8 md:p-10 border-r border-b border-ink-headline/15 flex flex-col transition-colors duration-hover hover:bg-bg-secondary"
                >
                  <div className="flex items-baseline justify-between gap-6 mb-6">
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-headline">
                      {String(i + 1).padStart(2, "0")} /{" "}
                      {String(COMPONENT_LIBRARY.length).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                      {cat.items.length} groups
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

        {/* ─── 5. ARCHITECTURE — atomic design hierarchy ─── */}
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
                    token to page
                  </span>
                  .
                </h2>
              </div>
              <div className="md:col-span-3 md:text-right">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted leading-relaxed">
                  <span className="inline-block w-1.5 h-1.5 bg-brand-yellow mr-2 align-middle" />
                  Atomic-design
                  <br />
                  Tokens compound up
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
                  className="font-bold tracking-[-0.025em] text-[clamp(40px,6vw,88px)] text-ink-headline leading-[1.02] max-w-[26ch] text-balance"
                >
                  Twelve weeks from audit to{" "}
                  <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                    operating system
                  </span>
                  .
                </h2>
              </div>
              <div className="md:col-span-3 md:text-right">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted leading-relaxed">
                  <span className="inline-block w-1.5 h-1.5 bg-brand-yellow mr-2 align-middle" />
                  6 phases · 12 weeks
                  <br />
                  Then governance
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
          aria-labelledby="ux-logos-heading"
        >
          <div className="container-layout py-16 md:py-20">
            <p
              id="ux-logos-heading"
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-10"
            >
              Brands we&rsquo;ve designed experience for
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
                What the system{" "}
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
                  <p className="font-display font-extralight text-[clamp(40px,5vw,72px)] leading-[0.95] tracking-[-0.03em] text-ink-headline mb-6 break-words">
                    {n.figure}
                  </p>
                  <p className="font-display font-light text-[clamp(20px,1.6vw,28px)] tracking-[-0.01em] text-ink-headline leading-[1.2] mb-3">
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
                  Industries we design experience for
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
              Stop designing screens.{" "}
              <span className="bg-brand-yellow text-ink-headline px-3 py-0.5 box-decoration-clone">
                Design a system
              </span>
              .
            </h2>

            <div className="grid md:grid-cols-12 gap-8 md:gap-16 pt-10 border-t border-white/15 items-center">
              <div className="md:col-span-7">
                <p className="font-body text-body-lg text-white/80 leading-[1.5] max-w-[52ch]">
                  A 45-minute paid experience audit. We score your design
                  system, your decision quality, and the drift between product,
                  marketing, and sales. Refunded in full if we&rsquo;re not the
                  right fit.
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
