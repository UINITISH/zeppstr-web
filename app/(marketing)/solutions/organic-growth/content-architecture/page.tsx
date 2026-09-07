import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/meta";
import { GlobalNav } from "@/components/nav/GlobalNav";
import { Footer } from "@/components/nav/Footer";
import { GridOverlay } from "@/components/blocks/GridOverlay";
import { TopicTerritoryMap } from "@/components/utility/TopicTerritoryMap";

// ─────────────────────────────────────────────
// Content Architecture sub-service page (Organic Growth Practice).
// Distinct sections — Four Coverage States (green maturity ladder),
// Content Catalog, Architecture, 12-week Process.
// ─────────────────────────────────────────────

export const metadata: Metadata = buildMetadata({
  title: "Content Architecture — Organic Growth Practice | Zeppstr",
  description:
    "Stop publishing articles. Start owning topic territories. We build topic clusters — pillar pages, supporting articles, and the internal-link graph between them — so content compounds instead of accumulating.",
  path: "/solutions/organic-growth/content-architecture",
})

// ─── Content ───

const FEATURED_LOGOS = [
  { name: "Prohance", file: "prohance.png" },
  { name: "Empuls", file: "empuls.png" },
  { name: "Wise Market", file: "wise-market.png" },
  { name: "Mini Leaves", file: "mini-leaves.png" },
  { name: "Twenty One Finance", file: "twenty-one-finance.png" },
  { name: "Tru Aquapolis", file: "tru-aquapolis.png" },
  { name: "iVehicleValue", file: "ivehiclevalue.png" },
  { name: "Tristar Online", file: "tristar-online.png" },
];

// FOUR COVERAGE STATES — green maturity ladder
const COVERAGE_STATES = [
  {
    n: "01",
    state: "Unclaimed",
    competitors: "0",
    earns: "Nothing · zero presence",
    move: "Choose territory · brief pillar",
  },
  {
    n: "02",
    state: "Fragmented",
    competitors: "Most teams here",
    earns: "Occasional rankings on long-tail terms",
    move: "Inventory existing articles · group into clusters",
  },
  {
    n: "03",
    state: "Architected",
    competitors: "Top quartile",
    earns: "Top-10 ranking on pillar + 3-5 cluster terms",
    move: "Internal-link discipline · supporting depth",
  },
  {
    n: "04",
    state: "Owned",
    competitors: "Top decile",
    earns: "Top-3 on 80%+ of relevant search demand",
    move: "Defend · expand · adjacent territory",
  },
];

// Principles — 4 rules
const PRINCIPLES = [
  {
    n: "01",
    title: "Topic &gt; article.",
    body: "The unit isn&rsquo;t the article. It&rsquo;s the topic territory &mdash; one pillar plus 8&ndash;12 supporting articles plus the internal-link discipline between them. Anything else is publishing without architecture.",
  },
  {
    n: "02",
    title: "Architecture &gt; volume.",
    body: "Ten well-architected pieces in one cluster outperform a hundred standalone articles. The architecture is the leverage; the words are the table stakes.",
  },
  {
    n: "03",
    title: "Compounding &gt; novelty.",
    body: "An article published once and never touched is a depreciating asset. An architected cluster updated quarterly compounds for years. We refresh the library; we don&rsquo;t fill it.",
  },
  {
    n: "04",
    title: "Internal-link discipline is non-negotiable.",
    body: "Every supporting article links to the pillar. The pillar links to every supporting article. Adjacent clusters cross-link where the topics naturally bridge. Without this discipline, you have a folder of files, not an architecture.",
  },
];

// CONTENT CATALOG — 6 categories of content architecture work
const CONTENT_CATALOG = [
  {
    category: "Topic Strategy",
    items: [
      "Territory selection · audit",
      "Search-demand sizing",
      "Competitor coverage map",
      "Adjacent-topic expansion plan",
    ],
  },
  {
    category: "Pillar Design",
    items: [
      "Pillar brief &amp; outline",
      "Long-form pillar production",
      "Visual asset library",
      "Update cadence · semi-annual",
    ],
  },
  {
    category: "Supporting Articles",
    items: [
      "Cluster gap analysis",
      "Brief library &middot; templated",
      "Production line · sprint cadence",
      "Editorial review &amp; standards",
    ],
  },
  {
    category: "Internal-Link Graph",
    items: [
      "Audit · link inventory",
      "Anchor-text strategy",
      "Pillar ↔ supporting mapping",
      "Cross-cluster bridge links",
    ],
  },
  {
    category: "On-Page Authority",
    items: [
      "Schema · structured data",
      "Heading hierarchy &amp; semantics",
      "Featured-snippet engineering",
      "Image &amp; alt optimisation",
    ],
  },
  {
    category: "Operating Cadence",
    items: [
      "Quarterly content review",
      "Refresh prioritisation",
      "Decay detection &amp; rebuild",
      "Performance reporting · cluster-level",
    ],
  },
];

// ARCHITECTURE — 5 layers
const ARCHITECTURE_LAYERS = [
  {
    name: "Demand Layer",
    format: "Search volume · Intent · Competition",
    description:
      "Which topic territories have real, defensible demand. Not just keyword volume &mdash; intent quality, conversion fit, and how concentrated the existing competitive landscape is.",
  },
  {
    name: "Hierarchy Layer",
    format: "Pillar → Cluster → Supporting",
    description:
      "The hierarchy of pages within a territory. Pillar at the top, 8&ndash;12 supporting articles underneath, every page slotted by intent and depth before a word is written.",
  },
  {
    name: "Production Layer",
    format: "Brief · Draft · Edit · Ship",
    description:
      "The sprint cadence that turns the hierarchy into shipped pages. Briefs templated. Drafts reviewed against editorial standards. Production line, not authoring per page.",
  },
  {
    name: "Linking Layer",
    format: "Internal · Anchor · Cross-cluster",
    description:
      "Every supporting article links to the pillar; the pillar back to each supporting. Anchor-text strategy locked. Adjacent clusters cross-link where topics genuinely bridge.",
  },
  {
    name: "Operating Layer",
    format: "Refresh · Decay · Expand",
    description:
      "Quarterly review of every cluster &mdash; what&rsquo;s decaying gets refreshed, what&rsquo;s stable gets defended, what&rsquo;s won earns the right to expand into adjacent territory.",
  },
];

// 6 process phases — 12 weeks
const PROCESS_PHASES = [
  {
    title: "Territory Audit",
    duration: "Week 1–2",
    body: "Existing content inventoried, scored against coverage states. Search demand mapped. Competitor coverage analysed. Territory shortlist signed off.",
  },
  {
    title: "Hierarchy Design",
    duration: "Week 3",
    body: "For each territory: pillar page brief, 8&ndash;12 supporting article briefs, intent mapping, internal-link plan. The blueprint before production.",
  },
  {
    title: "Pillar Production",
    duration: "Week 4–6",
    body: "Pillar pages written, designed, structured for featured snippets, schema-marked. The foundation that every supporting article will link back to.",
  },
  {
    title: "Supporting Build",
    duration: "Week 7–10",
    body: "Supporting articles produced on sprint cadence. Each one briefed, drafted, edited, internally linked. Pages ship in clusters &mdash; never as one-offs.",
  },
  {
    title: "Link Graph",
    duration: "Week 11",
    body: "Final internal-link audit. Every required link in place. Anchor text variations applied. Cross-cluster bridges verified.",
  },
  {
    title: "Operate &amp; Compound",
    duration: "Week 12+",
    body: "Quarterly review begins. Decaying pages refreshed, winning clusters defended, adjacent territories scoped. The library compounds instead of accumulating.",
  },
];

const PRACTICE_NUMBERS = [
  {
    figure: "1 + 9",
    metric: "Pillar plus supporting",
    detail:
      "Standard cluster size. One pillar earning broad authority, nine supporting articles capturing long-tail and reinforcing the pillar.",
    client: "Standard build",
  },
  {
    figure: "80%+",
    metric: "Top-3 capture · owned topic",
    detail:
      "The threshold for &ldquo;owned&rdquo; coverage state &mdash; ranking top-3 for 80%+ of the territory&rsquo;s relevant search demand.",
    client: "Ownership bar",
  },
  {
    figure: "Quarterly",
    metric: "Refresh cadence",
    detail:
      "Every cluster reviewed every quarter. Decay caught early. The library stays alive instead of decaying into archive.",
    client: "Operating discipline",
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
    question: "Why not just publish more articles?",
    answer:
      "Most teams publish more articles for years and never rank for the topics they care about. Architecture &mdash; pillar + supporting + internal linking &mdash; is what converts content effort into ranking power. Volume without architecture is a content treadmill.",
  },
  {
    question: "We already have a content library. Do we start over?",
    answer:
      "Almost never. The audit usually surfaces 30&ndash;60% of existing articles that can be slotted into clusters with light edits. We rebuild the architecture around what&rsquo;s already there, then fill the gaps.",
  },
  {
    question: "How long until we rank?",
    answer:
      "Pillar pages on lower-competition territories: 3&ndash;6 months. Owned-state (top-3 on 80%+ of demand): 9&ndash;18 months. The compounding from clusters is real but not fast &mdash; which is why this isn&rsquo;t a 90-day engagement.",
  },
  {
    question: "Who writes the content?",
    answer:
      "We brief and edit; you write or we provide writers. The brief is the discipline; the writing is the execution. We won&rsquo;t cargo-cult voice &mdash; founder or subject-matter expert involvement makes the work better.",
  },
  {
    question: "What about AI content?",
    answer:
      "AI-drafted, human-edited, fact-checked, voice-aligned &mdash; yes, for some classes of content. AI-generated, published-as-is, indistinguishable from competitors &mdash; no. The architecture matters more than the writing tool.",
  },
  {
    question: "What does it cost?",
    answer:
      "Content Architecture engagements start at ₹6L/month for a 12-month minimum, scaling with territory count and production volume. Quoted post-audit.",
  },
];

// ─────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────

export default function ContentArchitecturePage() {
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
            <li className="text-ink-headline">Content Architecture</li>
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

                <h1 className="font-bold tracking-[-0.025em] text-[clamp(40px,6vw,88px)] text-ink-headline leading-[1.05] max-w-[20ch] text-balance mb-8">
                  Stop publishing articles. Own{" "}
                  <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                    topic territories
                  </span>
                  .
                </h1>

                <p className="font-body text-body-lg text-ink-body leading-[1.55] max-w-[54ch] mb-10">
                  We build topic clusters &mdash; pillar pages, supporting
                  articles, and the internal-link graph between them &mdash;
                  so content compounds instead of accumulating.
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    href="/book-consultation"
                    className="inline-flex items-center gap-3 bg-brand-yellow text-ink-headline font-display font-light text-[clamp(18px,1.4vw,24px)] px-8 py-4 hover:bg-emerald-900 hover:text-white transition-colors duration-hover"
                  >
                    <span>Apply for a content audit</span>
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

              {/* Right — topic territory map */}
              <div className="md:col-span-5 flex items-center justify-center pt-8 md:pt-0">
                <TopicTerritoryMap />
              </div>
            </div>
          </div>
        </section>

        {/* ─── 2. FOUR COVERAGE STATES — green maturity ladder ─── */}
        <section
          className="bg-emerald-900 text-white"
          aria-labelledby="states-heading"
        >
          <div className="container-layout py-24 md:py-32">
            <div className="grid md:grid-cols-12 gap-8 md:gap-16 mb-14 md:mb-16 items-end">
              <div className="md:col-span-9">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60 mb-6">
                  Coverage maturity
                </p>
                <h2
                  id="states-heading"
                  className="font-bold tracking-[-0.025em] text-[clamp(36px,5vw,68px)] text-white leading-[1.05] max-w-[26ch] text-balance"
                >
                  Four states a topic can be in.{" "}
                  <span className="bg-brand-yellow text-ink-headline px-3 py-0.5 box-decoration-clone">
                    Most teams stop
                  </span>{" "}
                  at two.
                </h2>
              </div>
              <div className="md:col-span-3 md:text-right">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60 leading-relaxed">
                  <span className="inline-block w-1.5 h-1.5 bg-brand-yellow mr-2 align-middle" />
                  Climbing
                  <br />
                  the ladder
                </p>
              </div>
            </div>

            {/* Header */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 pb-4 border-b border-white/25 mb-2">
              <div className="md:col-span-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                #
              </div>
              <div className="md:col-span-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                State
              </div>
              <div className="md:col-span-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                Population
              </div>
              <div className="md:col-span-3 font-mono text-[10px] uppercase tracking-[0.2em] text-brand-yellow">
                What it earns
              </div>
              <div className="md:col-span-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                Move to advance
              </div>
            </div>

            <ol>
              {COVERAGE_STATES.map((row, i) => {
                const isOwned = i === 3;
                const isFragmented = i === 1;
                return (
                  <li
                    key={row.n}
                    className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 py-6 md:py-7 border-b border-white/15 items-baseline"
                  >
                    <div className="md:col-span-1">
                      <span
                        className={`font-mono text-[11px] uppercase tracking-[0.2em] ${
                          isOwned ? "text-brand-yellow" : "text-white/55"
                        }`}
                      >
                        {row.n}
                      </span>
                    </div>
                    <div className="md:col-span-3">
                      <p
                        className={`font-display ${
                          isOwned ? "font-bold" : "font-light"
                        } text-[clamp(20px,1.9vw,26px)] text-white leading-[1.2] tracking-[-0.01em]`}
                      >
                        {row.state}
                      </p>
                    </div>
                    <div className="md:col-span-2">
                      <p
                        className={`font-mono text-[10px] uppercase tracking-[0.18em] leading-relaxed ${
                          isFragmented ? "text-brand-yellow" : "text-white/55"
                        }`}
                      >
                        {row.competitors}
                      </p>
                    </div>
                    <div className="md:col-span-3">
                      <p
                        className={`font-body text-body-sm leading-[1.5] ${
                          isOwned ? "text-brand-yellow font-medium" : "text-white/75"
                        }`}
                      >
                        {row.earns}
                      </p>
                    </div>
                    <div className="md:col-span-3">
                      <p className="font-body text-body-sm text-white/65 leading-[1.5] italic">
                        → {row.move}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>

            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 mt-8">
              Most teams live at &ldquo;Fragmented.&rdquo; The work is climbing two more rungs.
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
                  architect from
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

        {/* ─── 4. CONTENT CATALOG ─── */}
        <section
          className="bg-bg-primary border-b border-ink-headline/10"
          aria-labelledby="catalog-heading"
        >
          <div className="container-layout py-24 md:py-32">
            <div className="grid md:grid-cols-12 gap-8 md:gap-16 mb-16 md:mb-20 items-end">
              <div className="md:col-span-9">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-6">
                  Content catalog
                </p>
                <h2
                  id="catalog-heading"
                  className="font-bold tracking-[-0.025em] text-[clamp(40px,6vw,88px)] text-ink-headline leading-[1.02] max-w-[22ch] text-balance"
                >
                  Six categories.{" "}
                  <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                    Twenty-four
                  </span>{" "}
                  content disciplines.
                </h2>
              </div>
              <div className="md:col-span-3 md:text-right">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted leading-relaxed">
                  <span className="inline-block w-1.5 h-1.5 bg-brand-yellow mr-2 align-middle" />
                  Templated
                  <br />
                  Reviewed · Refreshed
                </p>
              </div>
            </div>

            <ol className="grid md:grid-cols-2 lg:grid-cols-3 border-l border-t border-ink-headline/15">
              {CONTENT_CATALOG.map((cat, i) => (
                <li
                  key={cat.category}
                  className="group relative p-8 md:p-10 border-r border-b border-ink-headline/15 flex flex-col transition-colors duration-hover hover:bg-bg-secondary"
                >
                  <div className="flex items-baseline justify-between gap-6 mb-6">
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-headline">
                      {String(i + 1).padStart(2, "0")} /{" "}
                      {String(CONTENT_CATALOG.length).padStart(2, "0")}
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
                    demand to compound
                  </span>
                  .
                </h2>
              </div>
              <div className="md:col-span-3 md:text-right">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted leading-relaxed">
                  <span className="inline-block w-1.5 h-1.5 bg-brand-yellow mr-2 align-middle" />
                  Architecture
                  <br />
                  before authoring
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
                  Twelve weeks to a first{" "}
                  <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                    owned territory
                  </span>
                  .
                </h2>
              </div>
              <div className="md:col-span-3 md:text-right">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted leading-relaxed">
                  <span className="inline-block w-1.5 h-1.5 bg-brand-yellow mr-2 align-middle" />
                  6 phases · 12 weeks
                  <br />
                  Compounding from month 6
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
          aria-labelledby="content-logos-heading"
        >
          <div className="container-layout py-16 md:py-20">
            <p
              id="content-logos-heading"
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-10"
            >
              Brands we&rsquo;ve architected content for
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
                What the cluster{" "}
                <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                  ships at
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
                  Industries we architect content for
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
              Stop renting traffic.{" "}
              <span className="bg-brand-yellow text-ink-headline px-3 py-0.5 box-decoration-clone">
                Own a territory
              </span>
              .
            </h2>

            <div className="grid md:grid-cols-12 gap-8 md:gap-16 pt-10 border-t border-white/15 items-center">
              <div className="md:col-span-7">
                <p className="font-body text-body-lg text-white/80 leading-[1.5] max-w-[52ch]">
                  A 45-minute paid content audit. We score your existing
                  coverage, identify the territories you should own, and map
                  the path to ownership. Refunded in full if we&rsquo;re not
                  the right fit.
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
