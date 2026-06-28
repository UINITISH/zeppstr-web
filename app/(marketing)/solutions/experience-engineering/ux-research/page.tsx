import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { GlobalNav } from "@/components/nav/GlobalNav";
import { Footer } from "@/components/nav/Footer";
import { GridOverlay } from "@/components/blocks/GridOverlay";
import { ResearchMethodMatrix } from "@/components/utility/ResearchMethodMatrix";

// ─────────────────────────────────────────────
// UX Research sub-service page (Experience & Engineering).
// Distinct sections — Said vs Saw (green contrast pairs),
// Method Library, Architecture, research-cycle Process.
// ─────────────────────────────────────────────

export const metadata: Metadata = {
  title: "UX Research — Experience & Engineering | Zeppstr",
  description:
    "Stop asking users. Start watching them. We run continuous discovery as decision infrastructure — every product, design, and marketing call backed by behaviour, not opinion.",
};

// ─── Content ───

const FEATURED_LOGOS = [
  { name: "Prohance", file: "prohance.png" },
  { name: "Empuls", file: "empuls.png" },
  { name: "Mini Leaves", file: "mini-leaves.png" },
  { name: "Wise Market", file: "wise-market.png" },
  { name: "Twenty One Finance", file: "twenty-one-finance.png" },
  { name: "Fixstars", file: "fixstars.png" },
  { name: "iVehicleValue", file: "ivehiclevalue.png" },
  { name: "Tristar Online", file: "tristar-online.png" },
];

// SAID vs SAW — 5 contrast pairs of stated preference vs observed behavior
const SAID_VS_SAW = [
  {
    said: "&ldquo;I&rsquo;d love a dark mode.&rdquo;",
    saw: "2% of users toggle dark mode when offered.",
    lesson: "Stated preference ≠ revealed preference.",
  },
  {
    said: "&ldquo;The pricing page is the problem.&rdquo;",
    saw: "92% of churned users never visited it.",
    lesson: "The complaint is often a proxy for something earlier.",
  },
  {
    said: "&ldquo;Onboarding is too long.&rdquo;",
    saw: "Users who completed it had 4× the retention.",
    lesson: "Friction isn&rsquo;t always cost. Sometimes it&rsquo;s qualification.",
  },
  {
    said: "&ldquo;I want more features.&rdquo;",
    saw: "Most users used 4 of the 32 already shipped.",
    lesson: "Roadmaps built from interviews build feature bloat.",
  },
  {
    said: "&ldquo;Email is too noisy.&rdquo;",
    saw: "Open rate on the 3rd email was 41%.",
    lesson: "What people say they want is rarely what they engage with.",
  },
];

// Principles — 4 rules
const PRINCIPLES = [
  {
    n: "01",
    title: "Behavior trumps opinion.",
    body: "What users do is data. What they say is hypothesis. We weight them accordingly. Most teams build from interview quotes; we build from interview quotes plus behavioral validation.",
  },
  {
    n: "02",
    title: "Every question has its own method.",
    body: "&ldquo;What do they want?&rdquo; needs interviews. &ldquo;Will they pay for it?&rdquo; needs a price-tested landing page. &ldquo;Can they find it?&rdquo; needs a tree test. Picking the wrong method produces the wrong answer with high confidence.",
  },
  {
    n: "03",
    title: "Research without a decision is theater.",
    body: "Every research engagement starts with the decision it&rsquo;ll inform. No decision in scope, no research. The deliverable isn&rsquo;t a report &mdash; it&rsquo;s a decision documented with evidence.",
  },
  {
    n: "04",
    title: "Sample size of zero is still zero.",
    body: "Best instinct beats no research. But no research beats research dressed up to look bigger than it is. We&rsquo;d rather ship 5 quality sessions than 100 noisy ones.",
  },
];

// METHOD LIBRARY — 6 categories
const METHOD_LIBRARY = [
  {
    category: "Generative Interviews",
    items: [
      "Discovery interviews · 6–12 users",
      "Jobs-to-be-done framing",
      "Switch interviews · why they bought",
      "Stakeholder interviews · internal",
    ],
  },
  {
    category: "Behavioral Observation",
    items: [
      "Contextual inquiry · in-environment",
      "Diary studies · 1–4 weeks",
      "Ethnography · embedded",
      "Session replay analysis · at scale",
    ],
  },
  {
    category: "Usability Testing",
    items: [
      "Moderated · 5 users per round",
      "Unmoderated · 30+ at scale",
      "RITE testing · iterative",
      "Tree test · navigation",
    ],
  },
  {
    category: "Survey & Quant",
    items: [
      "Maxdiff · feature prioritization",
      "Conjoint · price sensitivity",
      "NPS · cohort-segmented",
      "Single-question pulse",
    ],
  },
  {
    category: "Concept & Prototype",
    items: [
      "Card sort · IA discovery",
      "Concept tests · paid landing",
      "Wizard-of-Oz · feasibility",
      "Prototype usability",
    ],
  },
  {
    category: "Continuous Discovery",
    items: [
      "Weekly user interviews",
      "Monthly tree tests",
      "Quarterly diary studies",
      "Always-on session-replay sampling",
    ],
  },
];

// ARCHITECTURE — 5 layers
const ARCHITECTURE_LAYERS = [
  {
    name: "Question Layer",
    format: "Decision · Hypothesis · Risk",
    description:
      "What decision is this research informing, and what assumption underneath that decision is most at risk if wrong. Without a clear question, no method fits.",
  },
  {
    name: "Method Layer",
    format: "Right method · Right cohort · Right depth",
    description:
      "The matched method, the cohort that can actually answer it, the depth required. Picked from the matrix &mdash; not from the agency that&rsquo;s available.",
  },
  {
    name: "Recruit Layer",
    format: "Sourcing · Screening · Logistics",
    description:
      "Recruiting the actual cohort, screening for fit (not convenience), scheduling, incentives. The unglamorous half of research that decides whether the data is real.",
  },
  {
    name: "Run Layer",
    format: "Capture · Tag · Store",
    description:
      "Sessions captured (audio · screen · transcript), tagged in a consistent taxonomy, stored where the team can re-watch. Raw evidence outlives the immediate study.",
  },
  {
    name: "Synthesize · Decide",
    format: "Themes · Insight · Decision log",
    description:
      "Raw evidence → themes → insights → the decision documented with evidence. Every decision is traceable to the sessions that produced it.",
  },
];

// 6 process phases — research cycle
const PROCESS_PHASES = [
  {
    title: "Question Framing",
    duration: "Week 1",
    body: "What decision is this informing? What&rsquo;s the riskiest assumption? Written question brief signed off before recruitment starts.",
  },
  {
    title: "Method Design",
    duration: "Week 2",
    body: "Right method picked from the matrix, cohort defined, discussion guide / test plan / survey designed and pilot-tested.",
  },
  {
    title: "Recruitment",
    duration: "Week 2–3",
    body: "Screened to fit, not convenience. Targets the actual cohort that can answer the question. Logistics handled end-to-end.",
  },
  {
    title: "Fieldwork",
    duration: "Week 3–5",
    body: "Sessions run, captured, transcribed, tagged. Behavioral data collected from product instrumentation in parallel.",
  },
  {
    title: "Synthesis",
    duration: "Week 5–6",
    body: "Raw evidence → themes → insights. Reviewed with the team. Where behavior contradicts opinion, behavior wins.",
  },
  {
    title: "Decision Log",
    duration: "Week 6+",
    body: "Decision documented with the evidence behind it. Filed in the decision log so the next quarter&rsquo;s research builds on this one, not from scratch.",
  },
];

const PRACTICE_NUMBERS = [
  {
    figure: "4 / qtr",
    metric: "Discovery cycles run",
    detail:
      "Four scoped research cycles per quarter. Each answers one decision, not &ldquo;general user understanding.&rdquo;",
    client: "Standard cadence",
  },
  {
    figure: "20+",
    metric: "Users per round",
    detail:
      "Minimum cohort for qualitative depth, scaled higher for quant. Sample size of one is still one.",
    client: "Minimum threshold",
  },
  {
    figure: "100%",
    metric: "Decisions with a trail",
    detail:
      "Every product, design, and marketing decision touched by research is traceable to the evidence that produced it.",
    client: "Decision log discipline",
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
    question: "Aren&rsquo;t five users enough?",
    answer:
      "For surface usability issues, yes &mdash; the Nielsen rule still mostly holds. For generative discovery, prioritisation, or pricing, no. The method decides the sample, not the budget.",
  },
  {
    question: "Do you do quant or qual?",
    answer:
      "Both. Most questions need both. Qual tells you why; quant tells you how much. We run them in sequence (qual first to define what to measure, then quant to size it) more often than in parallel.",
  },
  {
    question: "Will users actually tell us the truth?",
    answer:
      "Sometimes. More often they&rsquo;ll tell you a version of the truth shaped by what they think you want to hear. That&rsquo;s why we observe behaviour as much as we ask. The matrix exists exactly for this gap.",
  },
  {
    question: "Can we do continuous discovery without a research team?",
    answer:
      "Yes. The point of continuous discovery is to make it lightweight enough that product managers and designers can run it. We&rsquo;ll set up the rhythm and tooling, then hand off &mdash; or stay on as governance.",
  },
  {
    question: "What if leadership wants a survey of 1,000 users for everything?",
    answer:
      "We&rsquo;ll explain why that&rsquo;s the wrong method for most product questions, and what the right method is. If they still want it, we&rsquo;ll run the survey &mdash; and the right method alongside &mdash; and let the data adjudicate.",
  },
  {
    question: "What does it cost?",
    answer:
      "Discovery cycles start at ₹5L per cycle (one decision, one method, fully run). Continuous discovery operations from ₹3L–6L/month. Fixed scope, quoted after the brief.",
  },
];

// ─────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────

export default function UXResearchPage() {
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
            <li className="text-ink-headline">UX Research</li>
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

                <h1 className="font-bold tracking-[-0.025em] text-[clamp(40px,6vw,88px)] text-ink-headline leading-[1.05] max-w-[18ch] text-balance mb-8">
                  Stop asking users.{" "}
                  <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                    Start watching them
                  </span>
                  .
                </h1>

                <p className="font-body text-body-lg text-ink-body leading-[1.55] max-w-[54ch] mb-10">
                  We run research as decision infrastructure &mdash; every
                  product, design, and marketing call backed by behaviour, not
                  opinion. The right method for the right question.
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    href="/book-consultation"
                    className="inline-flex items-center gap-3 bg-brand-yellow text-ink-headline font-display font-light text-[clamp(18px,1.4vw,24px)] px-8 py-4 hover:bg-emerald-900 hover:text-white transition-colors duration-hover"
                  >
                    <span>Apply for a research audit</span>
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

              {/* Right — method matrix */}
              <div className="md:col-span-5 flex items-center justify-center pt-8 md:pt-0">
                <ResearchMethodMatrix />
              </div>
            </div>
          </div>
        </section>

        {/* ─── 2. SAID vs SAW — green quote-pair contrast ─── */}
        <section
          className="bg-emerald-900 text-white"
          aria-labelledby="said-saw-heading"
        >
          <div className="container-layout py-24 md:py-32">
            <div className="grid md:grid-cols-12 gap-8 md:gap-16 mb-14 md:mb-16 items-end">
              <div className="md:col-span-9">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60 mb-6">
                  Said vs Saw
                </p>
                <h2
                  id="said-saw-heading"
                  className="font-bold tracking-[-0.025em] text-[clamp(36px,5vw,68px)] text-white leading-[1.05] max-w-[24ch] text-balance"
                >
                  What users{" "}
                  <span className="bg-brand-yellow text-ink-headline px-3 py-0.5 box-decoration-clone">
                    say
                  </span>{" "}
                  is rarely what they do.
                </h2>
              </div>
              <div className="md:col-span-3 md:text-right">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60 leading-relaxed">
                  <span className="inline-block w-1.5 h-1.5 bg-brand-yellow mr-2 align-middle" />
                  Stated preference
                  <br />
                  ≠ revealed behaviour
                </p>
              </div>
            </div>

            <ol>
              {SAID_VS_SAW.map((p, i) => (
                <li
                  key={i}
                  className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 py-8 md:py-10 border-b border-white/15 items-baseline"
                >
                  <div className="md:col-span-1 font-mono text-[11px] uppercase tracking-[0.2em] text-brand-yellow">
                    {String(i + 1).padStart(2, "0")}
                  </div>

                  {/* SAID */}
                  <div className="md:col-span-4 border-l-2 border-white/30 pl-5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/45 mb-2">
                      Said
                    </p>
                    <p
                      className="font-display font-light text-[clamp(18px,1.7vw,24px)] text-white/65 leading-[1.35] tracking-[-0.005em] italic"
                      dangerouslySetInnerHTML={{ __html: p.said }}
                    />
                  </div>

                  {/* SAW */}
                  <div className="md:col-span-4 border-l-2 border-brand-yellow pl-5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-yellow mb-2">
                      Saw
                    </p>
                    <p className="font-display font-light text-[clamp(18px,1.7vw,24px)] text-white leading-[1.35] tracking-[-0.005em]">
                      {p.saw}
                    </p>
                  </div>

                  {/* LESSON */}
                  <div className="md:col-span-3">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/45 mb-2">
                      Lesson
                    </p>
                    <p className="font-body text-body-sm text-white/75 leading-[1.5]">
                      {p.lesson}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 mt-8">
              Behaviour decides. Opinion informs.
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
                  research from
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

        {/* ─── 4. METHOD LIBRARY ─── */}
        <section
          className="bg-bg-primary border-b border-ink-headline/10"
          aria-labelledby="method-library-heading"
        >
          <div className="container-layout py-24 md:py-32">
            <div className="grid md:grid-cols-12 gap-8 md:gap-16 mb-16 md:mb-20 items-end">
              <div className="md:col-span-9">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-6">
                  Method library
                </p>
                <h2
                  id="method-library-heading"
                  className="font-bold tracking-[-0.025em] text-[clamp(40px,6vw,88px)] text-ink-headline leading-[1.02] max-w-[22ch] text-balance"
                >
                  Six categories.{" "}
                  <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                    Twenty-four
                  </span>{" "}
                  method types.
                </h2>
              </div>
              <div className="md:col-span-3 md:text-right">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted leading-relaxed">
                  <span className="inline-block w-1.5 h-1.5 bg-brand-yellow mr-2 align-middle" />
                  Matched
                  <br />
                  to question
                </p>
              </div>
            </div>

            <ol className="grid md:grid-cols-2 lg:grid-cols-3 border-l border-t border-ink-headline/15">
              {METHOD_LIBRARY.map((cat, i) => (
                <li
                  key={cat.category}
                  className="group relative p-8 md:p-10 border-r border-b border-ink-headline/15 flex flex-col transition-colors duration-hover hover:bg-bg-secondary"
                >
                  <div className="flex items-baseline justify-between gap-6 mb-6">
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-headline">
                      {String(i + 1).padStart(2, "0")} /{" "}
                      {String(METHOD_LIBRARY.length).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                      {cat.items.length} types
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
                    question to decision
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
                  Six weeks from question to{" "}
                  <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                    decision log
                  </span>
                  .
                </h2>
              </div>
              <div className="md:col-span-3 md:text-right">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted leading-relaxed">
                  <span className="inline-block w-1.5 h-1.5 bg-brand-yellow mr-2 align-middle" />
                  6 phases · 6 weeks
                  <br />
                  Per discovery cycle
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
          aria-labelledby="research-logos-heading"
        >
          <div className="container-layout py-16 md:py-20">
            <p
              id="research-logos-heading"
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-10"
            >
              Brands we&rsquo;ve researched for
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
                What the cycle{" "}
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
                  Industries we research for
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

            <h2 className="font-bold tracking-[-0.025em] text-[clamp(48px,8vw,128px)] leading-[1.02] max-w-[22ch] mb-16 md:mb-24 text-white text-balance">
              Stop deciding from opinion.{" "}
              <span className="bg-brand-yellow text-ink-headline px-3 py-0.5 box-decoration-clone">
                Decide from evidence
              </span>
              .
            </h2>

            <div className="grid md:grid-cols-12 gap-8 md:gap-16 pt-10 border-t border-white/15 items-center">
              <div className="md:col-span-7">
                <p className="font-body text-body-lg text-white/80 leading-[1.5] max-w-[52ch]">
                  A 45-minute paid research audit. We score your current
                  research practice, your decision-log discipline, and the
                  evidence gap on your highest-risk assumptions. Refunded in
                  full if we&rsquo;re not the right fit.
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
