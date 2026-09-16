import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/meta";
import { GlobalNav } from "@/components/nav/GlobalNav";
import { Footer } from "@/components/nav/Footer";
import { GridOverlay } from "@/components/blocks/GridOverlay";
import { OrganicCompoundingCurve } from "@/components/utility/OrganicCompoundingCurve";

// ─────────────────────────────────────────────
// Organic Social sub-service page.
// Distinct section shape — Format Anatomy (green dissection card),
// Format Library catalog, Architecture, Process.
// ─────────────────────────────────────────────

export const metadata: Metadata = buildMetadata({
  title: "Organic Social — Brand, Engagement & Lifecycle | Zeppstr",
  description:
    "Posts decay. Formats compound. We build organic social as a format library and editorial rhythm — not a content treadmill measured in posts-per-week.",
  path: "/solutions/brand-engagement-lifecycle/organic-social",
})

// ─── Content ───

const FEATURED_LOGOS = [
  { name: "Mini Leaves", file: "mini-leaves.png" },
  { name: "Aishwarya Interiors", file: "aishwarya-interiors.png" },
  { name: "Tru Aquapolis", file: "tru-aquapolis.png" },
  { name: "Tristar Online", file: "tristar-online.png" },
  { name: "Prohance", file: "prohance.png" },
  { name: "Empuls", file: "empuls.png" },
  { name: "My Keto Co", file: "my-keto-co.png" },
  { name: "Sky Phonez", file: "sky-phonez.png" },
];

// FORMAT ANATOMY — one sample format dissected into 6 labeled parts
const SAMPLE_FORMAT = {
  name: "Tuesday Teardown",
  frequency: "1 / week · LinkedIn + X",
  parts: [
    {
      tag: "01 — Hook",
      label: "Headline that names a familiar problem",
      example: "&ldquo;Why most CAC dashboards lie.&rdquo;",
    },
    {
      tag: "02 — Frame",
      label: "One sentence that flips the assumption",
      example: "Most teams measure the wrong attribution window.",
    },
    {
      tag: "03 — Evidence",
      label: "A real number, screenshot, or example",
      example: "Pulled from a recent client teardown.",
    },
    {
      tag: "04 — Mechanic",
      label: "How to think about it differently",
      example: "Cohort attribution, not last-click.",
    },
    {
      tag: "05 — Payoff",
      label: "The line they screenshot or quote",
      example: "&ldquo;Stop measuring clicks. Start measuring cohorts.&rdquo;",
    },
    {
      tag: "06 — Recur",
      label: "Reusable across 52 weeks",
      example: "Same structure. New teardown each Tuesday.",
    },
  ],
};

// Principles — 4 organic social rules
const PRINCIPLES = [
  {
    n: "01",
    title: "Formats compound. Posts decay.",
    body: "A one-off post is a one-off post. A format run weekly for fifty-two weeks is an audience-building system. Most calendars chase posts. We build formats.",
  },
  {
    n: "02",
    title: "Consistency beats clever.",
    body: "Showing up at the same cadence, with the same recognizable structure, beats sporadic brilliance every quarter. Algorithms reward fit, not effort.",
  },
  {
    n: "03",
    title: "Build for one platform at a time.",
    body: "Cross-posting is a tax. We build the format native to one platform first, then adapt &mdash; not the inverse. LinkedIn deserves its own structure.",
  },
  {
    n: "04",
    title: "The audience is the asset.",
    body: "Follower count is the receipt. Audience &mdash; the people who notice when you post and quote you when you don&rsquo;t &mdash; is the asset. Build for that.",
  },
];

// THE FORMAT LIBRARY — 6 categories of formats with examples
const FORMAT_LIBRARY = [
  {
    category: "Authority",
    formats: [
      "Tuesday Teardown",
      "Industry Glossary",
      "Frameworks We Use",
      "POV Essays",
    ],
  },
  {
    category: "Education",
    formats: [
      "Mechanic-of-the-Week",
      "Mini Course (5-part thread)",
      "How We Do This",
      "Mistakes We&rsquo;ve Made",
    ],
  },
  {
    category: "Behind the Scenes",
    formats: [
      "Founder Notes",
      "Build Logs",
      "Sprint Recaps",
      "Hire Announcements",
    ],
  },
  {
    category: "Social Proof",
    formats: [
      "Client Wins",
      "Quotes from the Room",
      "Before / After",
      "Outcome Spotlights",
    ],
  },
  {
    category: "Stats That Stuck",
    formats: [
      "One Chart, One Insight",
      "Counter-intuitive Numbers",
      "Industry Benchmark",
      "Internal Data Drops",
    ],
  },
  {
    category: "Recurring Anchors",
    formats: [
      "Friday Roundup",
      "Quote We&rsquo;re Sitting With",
      "Recommendations",
      "Reader Q&A",
    ],
  },
];

// THE ARCHITECTURE — 5 layers
const ARCHITECTURE_LAYERS = [
  {
    name: "Strategy & Positioning",
    format: "Audience · POV · Voice",
    description:
      "Who the program is for, what we&rsquo;re known for, how we sound. Locked in writing before a single format is designed.",
  },
  {
    name: "Format Library",
    format: "8–12 repeatable structures",
    description:
      "The recurring post structures the program runs on. Templated, briefed, named. The factory floor of the practice.",
  },
  {
    name: "Editorial Rhythm",
    format: "Weekly calendar · Owners · Sign-off",
    description:
      "Who briefs, who writes, who approves, when it ships. The rhythm is the discipline. Without it, formats decay back into one-off posts.",
  },
  {
    name: "Production Lane",
    format: "Brief · Draft · Design · Schedule",
    description:
      "A four-stage production line so a single post moves from idea to scheduled in under 48 hours. Built once, then it runs.",
  },
  {
    name: "Measurement",
    format: "Audience · Engagement · Attribution",
    description:
      "Audience growth per format, engagement-per-post normalized by reach, and the formats that actually move pipeline. Vanity stays in the basement.",
  },
];

// 6 process phases — 12 weeks
const PROCESS_PHASES = [
  {
    title: "Audit",
    duration: "Week 1–2",
    body: "Current cadence, post mix, format usage (usually zero), engagement baseline, audience growth trend. Written diagnostic.",
  },
  {
    title: "Strategy & Voice",
    duration: "Week 3",
    body: "Positioning lock, voice doc, audience map, one-platform decision. Signed before format work begins.",
  },
  {
    title: "Format Design",
    duration: "Week 4–5",
    body: "Eight to twelve formats designed and templated. Each with a brief, an example, and a recurrence pattern. Reviewed once.",
  },
  {
    title: "Production Lane",
    duration: "Week 6–7",
    body: "Brief template, design system, sign-off flow, scheduling cadence. The factory floor built so production becomes assembly, not authoring.",
  },
  {
    title: "Soft Launch",
    duration: "Week 8–9",
    body: "First cohort of posts ships. Feedback collected. Formats refined. Rhythm tuned. Cadence locked.",
  },
  {
    title: "Operate",
    duration: "Week 10–12+",
    body: "Weekly rhythm running. Monthly format-fit review. Quarterly audience-growth check. The program runs itself with light governance.",
  },
];

const PRACTICE_NUMBERS = [
  {
    figure: "8–12",
    metric: "Formats in a mature library",
    detail:
      "The active library we build out. Most clients arrive with one (the founder&rsquo;s ad-hoc thoughts).",
    client: "Standard build",
  },
  {
    figure: "Formats",
    metric: "Repeatable formats beat one-off posts",
    detail:
      "A named format can be briefed, batched and improved. An ad-hoc post starts from nothing every time and cannot be judged against anything.",
    client: "Zeppstr — operating model",
  },
  {
    figure: "Hours",
    metric: "Brief to scheduled, once the lane is built",
    detail:
      "The lane is the deliverable: templates, approvals and a standing shoot cadence. Before it exists the same post takes days, most of which is waiting.",
    client: "Zeppstr — operating model",
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
    question: "Do you run our accounts or just consult?",
    answer:
      "Both. We can operate the rhythm end-to-end, or build the format library + production lane and hand it to your team. Most engagements start operated and transition to handed-off by month 9.",
  },
  {
    question: "Why focus on one platform first?",
    answer:
      "Algorithms reward platform-native structure. A LinkedIn post adapted from a tweet performs like neither. Pick the platform where your audience lives, build native, then adapt. We&rsquo;ll help you pick.",
  },
  {
    question: "How much volume should we be posting?",
    answer:
      "Less than you think. 3–5 high-fit posts per week per platform consistently outperforms daily ad-hoc volume. The lever is fit and recurrence, not frequency.",
  },
  {
    question: "Do you write for the founder&rsquo;s personal account too?",
    answer:
      "Often, yes &mdash; especially in B2B. A founder posting in voice, on a recurring format, with consistent cadence is often a more valuable owned-audience asset than the brand handle.",
  },
  {
    question: "How do you measure attribution from organic social?",
    answer:
      "Cohort lift, not click attribution. We measure audience growth per format, engagement normalized by reach, branded search lift, and inbound from social over 90-day windows. Last-click lies on organic.",
  },
  {
    question: "What does it cost?",
    answer:
      "Format library builds start at ₹12L for the 12-week engagement. Ongoing operation runs ₹4L–8L/month depending on cadence and platforms. Fixed scope after the audit.",
  },
];

// ─────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────

export default function OrganicSocialPage() {
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
                href="/solutions/brand-engagement-lifecycle"
                className="hover:text-ink-headline transition-colors"
              >
                Brand, Engagement & Lifecycle
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-ink-headline">Organic Social</li>
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
                    Service — Brand, Engagement & Lifecycle
                  </p>
                </div>

                <h1 className="font-bold tracking-[-0.025em] text-display-xl text-ink-headline leading-[1.16] max-w-[18ch] text-balance mb-8">
                  Posts decay.{" "}
                  <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                    Formats
                  </span>{" "}
                  compound.
                </h1>

                <p className="font-body text-body-lg text-ink-body leading-[1.55] max-w-[54ch] mb-10">
                  We build organic social as a format library and editorial
                  rhythm &mdash; not a content treadmill measured in
                  posts-per-week.
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    href="/book-consultation"
                    className="inline-flex items-center gap-3 bg-brand-yellow text-ink-headline font-display font-light text-display-xs px-8 py-4 hover:bg-emerald-900 hover:text-white transition-colors duration-hover"
                  >
                    <span>Apply for a social audit</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                  <Link
                    href="/solutions/brand-engagement-lifecycle"
                    className="font-mono text-[12px] uppercase tracking-[0.18em] text-ink-headline border-b border-ink-headline pb-0.5 hover:text-ink-headline/60 hover:border-brand-yellow transition-colors"
                  >
                    Parent practice →
                  </Link>
                </div>
              </div>

              {/* Right — compounding curve graphic */}
              <div className="md:col-span-5 flex items-center justify-center pt-8 md:pt-0">
                <OrganicCompoundingCurve />
              </div>
            </div>
          </div>
        </section>

        {/* ─── 2. FORMAT ANATOMY — green block dissecting one sample format ─── */}
        <section
          className="bg-emerald-900 text-white"
          aria-labelledby="format-anatomy-heading"
        >
          <div className="container-layout py-24 md:py-32">
            <div className="grid md:grid-cols-12 gap-8 md:gap-16 mb-14 md:mb-16 items-end">
              <div className="md:col-span-9">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60 mb-6">
                  Format anatomy
                </p>
                <h2
                  id="format-anatomy-heading"
                  className="font-bold tracking-[-0.025em] text-display-lg text-white leading-[1.05] max-w-[24ch] text-balance"
                >
                  One format,{" "}
                  <span className="bg-brand-yellow text-ink-headline px-3 py-0.5 box-decoration-clone">
                    six parts
                  </span>
                  , fifty-two posts.
                </h2>
              </div>
              <div className="md:col-span-3 md:text-right">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60 leading-relaxed">
                  <span className="inline-block w-1.5 h-1.5 bg-brand-yellow mr-2 align-middle" />
                  Sample · Live
                  <br />
                  Format
                </p>
              </div>
            </div>

            {/* Anatomy card */}
            <div className="border border-white/25 bg-white/5 backdrop-blur-sm p-8 md:p-12">
              {/* Card header */}
              <div className="flex flex-wrap items-baseline justify-between gap-4 pb-6 mb-8 border-b border-white/20">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-yellow mb-2">
                    Format name
                  </p>
                  <h3 className="font-display font-light text-display-md text-white tracking-[-0.02em] leading-[1.05]">
                    {SAMPLE_FORMAT.name}
                  </h3>
                </div>
                <div className="text-right">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/60 mb-2">
                    Cadence · Platform
                  </p>
                  <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-white">
                    {SAMPLE_FORMAT.frequency}
                  </p>
                </div>
              </div>

              {/* Dissection grid */}
              <ol className="grid md:grid-cols-2 gap-x-12 gap-y-8 md:gap-y-10">
                {SAMPLE_FORMAT.parts.map((part) => (
                  <li
                    key={part.tag}
                    className="grid grid-cols-[auto_1fr] gap-5 items-baseline"
                  >
                    {/* Yellow tag */}
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-yellow shrink-0 pt-1">
                      {part.tag}
                    </span>
                    <div>
                      <p className="font-display font-light text-display-xs text-white leading-[1.35] mb-2">
                        {part.label}
                      </p>
                      <p
                        className="font-body text-body-sm text-white/65 leading-[1.5] italic"
                        dangerouslySetInnerHTML={{ __html: part.example }}
                      />
                    </div>
                  </li>
                ))}
              </ol>

              {/* Footer note */}
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 pt-8 mt-8 border-t border-white/20">
                One template → 52 posts a year → 1 audience-building asset
              </p>
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
                  publish from
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

        {/* ─── 4. FORMAT LIBRARY — catalog of format categories ─── */}
        <section
          className="bg-bg-primary border-b border-ink-headline/10"
          aria-labelledby="format-library-heading"
        >
          <div className="container-layout py-24 md:py-32">
            <div className="grid md:grid-cols-12 gap-8 md:gap-16 mb-16 md:mb-20 items-end">
              <div className="md:col-span-9">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-6">
                  Format library
                </p>
                <h2
                  id="format-library-heading"
                  className="font-bold tracking-[-0.025em] text-display-xl text-ink-headline leading-[1.02] max-w-[22ch] text-balance"
                >
                  Six categories.{" "}
                  <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                    Twenty-four
                  </span>{" "}
                  format starters.
                </h2>
              </div>
              <div className="md:col-span-3 md:text-right">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted leading-relaxed">
                  <span className="inline-block w-1.5 h-1.5 bg-brand-yellow mr-2 align-middle" />
                  Templated
                  <br />
                  Operated · Measured
                </p>
              </div>
            </div>

            <ol className="grid md:grid-cols-2 lg:grid-cols-3 border-l border-t border-ink-headline/15">
              {FORMAT_LIBRARY.map((cat, i) => (
                <li
                  key={cat.category}
                  className="group relative p-8 md:p-10 border-r border-b border-ink-headline/15 flex flex-col transition-colors duration-hover hover:bg-bg-secondary"
                >
                  <div className="flex items-baseline justify-between gap-6 mb-6">
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-headline">
                      {String(i + 1).padStart(2, "0")} /{" "}
                      {String(FORMAT_LIBRARY.length).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                      {cat.formats.length} formats
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
                    {cat.formats.map((fmt) => (
                      <li
                        key={fmt}
                        className="font-body text-body-sm text-ink-body leading-[1.55] flex items-baseline gap-3"
                      >
                        <span
                          aria-hidden="true"
                          className="text-brand-yellow text-[10px]"
                        >
                          ▸
                        </span>
                        <span
                          dangerouslySetInnerHTML={{ __html: fmt }}
                        />
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

        {/* ─── 5. ARCHITECTURE — 5 layers ─── */}
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
                  Five layers behind every{" "}
                  <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                    published post
                  </span>
                  .
                </h2>
              </div>
              <div className="md:col-span-3 md:text-right">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted leading-relaxed">
                  <span className="inline-block w-1.5 h-1.5 bg-brand-yellow mr-2 align-middle" />
                  Stack-built
                  <br />
                  Rhythm-operated
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

        {/* ─── 6. PROCESS — 12-week, 6 phases ─── */}
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
                    operating rhythm
                  </span>
                  .
                </h2>
              </div>
              <div className="md:col-span-3 md:text-right">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted leading-relaxed">
                  <span className="inline-block w-1.5 h-1.5 bg-brand-yellow mr-2 align-middle" />
                  6 phases · 12 weeks
                  <br />
                  Soft launch by week 8
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
          aria-labelledby="social-logos-heading"
        >
          <div className="container-layout py-16 md:py-20">
            <p
              id="social-logos-heading"
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-10"
            >
              Brands we&rsquo;ve built social rhythms for
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
                What format-led{" "}
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
                  Industries we run organic social for
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

        {/* ─── 11. BOTTOM CTA — green brand block ─── */}
        <section className="relative z-10 bg-emerald-900 text-white">
          <div className="container-layout py-32 md:py-48">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/70 mb-12">
              Engage
            </p>

            <h2 className="font-bold tracking-[-0.025em] text-display-stat leading-[1.02] max-w-[22ch] mb-16 md:mb-24 text-white text-balance">
              Stop posting.{" "}
              <span className="bg-brand-yellow text-ink-headline px-3 py-0.5 box-decoration-clone">
                Start compounding
              </span>
              .
            </h2>

            <div className="grid md:grid-cols-12 gap-8 md:gap-16 pt-10 border-t border-white/15 items-center">
              <div className="md:col-span-7">
                <p className="font-body text-body-lg text-white/80 leading-[1.5] max-w-[52ch]">
                  A 45-minute paid social audit. We pull your last 90 days of
                  posts, score your format library (usually zero), and map the
                  audience-asset gap. Refunded in full if we&rsquo;re not the
                  right fit.
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
