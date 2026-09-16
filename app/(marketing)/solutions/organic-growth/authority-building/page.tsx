import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/meta";
import { GlobalNav } from "@/components/nav/GlobalNav";
import { Footer } from "@/components/nav/Footer";
import { GridOverlay } from "@/components/blocks/GridOverlay";
import { CitationGraph } from "@/components/utility/CitationGraph";

// ─────────────────────────────────────────────
// Authority Building sub-service page (Organic Growth Practice).
// Distinct sections — Authority Hierarchy (green 4-tier publication table),
// Earned-Media Catalog, Architecture, 12-week Process.
// ─────────────────────────────────────────────

export const metadata: Metadata = buildMetadata({
  title: "Authority Building — Organic Growth Practice | Zeppstr",
  description:
    "Stop building links. Start building citations. Authority isn’t bought — it’s earned in publications that matter, then leveraged across the rest of the practice.",
  path: "/solutions/organic-growth/authority-building",
})

// ─── Content ───

const FEATURED_LOGOS = [
  { name: "Prohance", file: "prohance.png" },
  { name: "Empuls", file: "empuls.png" },
  { name: "Twenty One Finance", file: "twenty-one-finance.png" },
  { name: "Fixstars", file: "fixstars.png" },
  { name: "Wise Market", file: "wise-market.png" },
  { name: "Mini Leaves", file: "mini-leaves.png" },
  { name: "Tru Aquapolis", file: "tru-aquapolis.png" },
  { name: "Tristar Online", file: "tristar-online.png" },
];

// AUTHORITY HIERARCHY — 4 tiers of publications with weight and what it takes
const HIERARCHY = [
  {
    tier: "T1",
    label: "Mainstream & Tier-One Business",
    examples: "WSJ · NYT · TechCrunch · Bloomberg",
    weight: "×10",
    earns: "Original research · executive POV · breaking news angle",
    pace: "1–2 / quarter",
  },
  {
    tier: "T2",
    label: "Tier-Two Trade & Vertical",
    examples: "Forbes · Inc · HBR · Wired · vertical trades",
    weight: "×5",
    earns: "Expert contribution · category-defining frameworks · case data",
    pace: "4–6 / quarter",
  },
  {
    tier: "T3",
    label: "Niche & Specialist",
    examples: "Industry blogs · podcasts · newsletters",
    weight: "×2",
    earns: "Definitional content · interviews · referenced quotes",
    pace: "8–12 / quarter",
  },
  {
    tier: "T4",
    label: "Aggregators & Roundups",
    examples: "Lists · awards · directories · social citations",
    weight: "×1",
    earns: "Excellence in the work itself · being notable",
    pace: "20+ / quarter",
  },
];

// Principles — 4 rules
const PRINCIPLES = [
  {
    n: "01",
    title: "Earned first, leveraged second.",
    body: "Authority can&rsquo;t be bought into existence. It has to be earned in publications that wouldn&rsquo;t take money for it. Once earned, every other channel &mdash; paid, lifecycle, sales &mdash; gets to leverage it.",
  },
  {
    n: "02",
    title: "Citations &gt; links.",
    body: "A link is a URL. A citation is a sentence in a credible publication that frames your brand as the source. Citations rank, links accumulate. We measure citations.",
  },
  {
    n: "03",
    title: "Source &gt; placement.",
    body: "Becoming the source other people cite when they don&rsquo;t have to beats placing 100 articles in publications that nobody reads. Source-of-truth is the asset; the article is the receipt.",
  },
  {
    n: "04",
    title: "Real publications, real journalists.",
    body: "We don&rsquo;t guest-post on networks, don&rsquo;t buy from link sellers, don&rsquo;t use PR distribution as a substitute for relationships. The work is slower. The authority compounds.",
  },
];

// EARNED-MEDIA CATALOG — 6 categories of authority work
const EARNED_MEDIA_CATALOG = [
  {
    category: "Original Research",
    items: [
      "Annual industry benchmark study",
      "Survey-led original data",
      "Internal-data published reports",
      "Cross-industry comparison",
    ],
  },
  {
    category: "Definitional Content",
    items: [
      "Category-defining essays",
      "Framework articles · referenceable",
      "Definitive guides on niche topics",
      "Glossary of the category we lead",
    ],
  },
  {
    category: "Expert Positioning",
    items: [
      "Founder · executive POV programs",
      "Conference & podcast circuit",
      "Internal expert profiles · LinkedIn",
      "Quoted-expert pipeline for press",
    ],
  },
  {
    category: "Journalist Relationships",
    items: [
      "Beat-reporter mapping",
      "Expert-source program",
      "Targeted pitches · not blast",
      "Long-term relationship cadence",
    ],
  },
  {
    category: "Paid Placement, Done Well",
    items: [
      "Native &amp; sponsored editorial",
      "Premium podcast sponsorships",
      "Vetted media partnerships",
      "Industry-report co-publishing",
    ],
  },
  {
    category: "Internal Expert Program",
    items: [
      "Internal-source media training",
      "Quotable-line bank · refreshed",
      "Expert availability calendar",
      "Crisis-response readiness",
    ],
  },
];

// ARCHITECTURE — 5 layers
const ARCHITECTURE_LAYERS = [
  {
    name: "Audience Layer",
    format: "Beat reporters · Vertical media · Aggregators",
    description:
      "Who actually decides what your category gets cited as. Reporters, editors, podcasters, newsletter writers &mdash; the human layer that earns the citation. Mapped, not assumed.",
  },
  {
    name: "Source Layer",
    format: "Research · POV · Expert · Data",
    description:
      "What we have that they want. Original research, sharp POV, expert sources, internal data &mdash; the assets that make us the source instead of the supplicant.",
  },
  {
    name: "Outreach Layer",
    format: "Targeted pitch · Long-term cadence",
    description:
      "How we reach them. Targeted pitches built around their beat, not blast distribution. Relationship cadence, not transactional asks. Slow. Earned.",
  },
  {
    name: "Placement Layer",
    format: "Citations · Quotes · Profiles · Co-published",
    description:
      "What comes back. A citation in a beat reporter&rsquo;s piece. A quote in a feature. A co-published industry report. Tracked, archived, measured.",
  },
  {
    name: "Leverage Layer",
    format: "Site · Sales · Paid · Lifecycle",
    description:
      "How the earned citation gets re-used everywhere downstream. Press wall on site, social proof in sales decks, ad creative referencing the publication, lifecycle email signature lines.",
  },
];

// 6 process phases — 12 weeks
const PROCESS_PHASES = [
  {
    title: "Source Audit",
    duration: "Week 1–2",
    body: "What do we already have that journalists would want? Research, data, expert profiles, internal stories. Inventoried, gap-mapped.",
  },
  {
    title: "Beat Mapping",
    duration: "Week 3",
    body: "Who covers our category? Which reporters at which publications? Who reads them? Mapped to a working media list, not a vanity press list.",
  },
  {
    title: "Asset Build",
    duration: "Week 4–6",
    body: "Original research designed, framework essays drafted, expert profiles produced, data reports authored. The pitch-worthy material that earns citations.",
  },
  {
    title: "Outreach Cadence",
    duration: "Week 7–9",
    body: "Targeted pitches go out per beat reporter. Long-term relationship cadence established &mdash; introductions before asks.",
  },
  {
    title: "Placement & Capture",
    duration: "Week 10–11",
    body: "First placements landed. Quotes, citations, features captured into the citation graph. Each one tracked back to the source asset that earned it.",
  },
  {
    title: "Leverage & Operate",
    duration: "Week 12+",
    body: "Earned citations deployed on site press wall, in sales decks, in paid creative, in lifecycle email signatures. The leverage layer doubles the value of every earned mention.",
  },
];

const PRACTICE_NUMBERS = [
  {
    figure: "T1–T3",
    metric: "Publication tier coverage",
    detail:
      "Standard scope across mainstream business, trade, and niche. T4 aggregators handled as overflow, not focus.",
    client: "Standard scope",
  },
  {
    figure: "Concentration",
    metric: "A few real citations beat a long list",
    detail:
      "One placement a human would actually click is worth more than a page of directory listings. We do not publish a multiplier for this, because the weighting is Google's and is not disclosed.",
    client: "Zeppstr — how we judge a link",
  },
  {
    figure: "12 mo",
    metric: "Minimum engagement",
    detail:
      "Relationships compound. We don&rsquo;t take 90-day pilots in this practice &mdash; the math doesn&rsquo;t work for either side.",
    client: "Engagement floor",
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
    question: "Isn&rsquo;t this just PR with a different name?",
    answer:
      "PR is the broader category &mdash; we&rsquo;re a specific cut of it focused on earning the kind of citations that move SEO authority, sales trust, and category positioning. We don&rsquo;t do crisis comms, internal comms, or event press.",
  },
  {
    question: "Do you guarantee placements?",
    answer:
      "No. Anyone guaranteeing placements is either lying, paying for them and hiding it, or both. We commit to the work and to the sources we build; the publications still get the final call.",
  },
  {
    question: "How is this different from link-building agencies?",
    answer:
      "Link-building optimizes for the URL. We optimize for the citation &mdash; the sentence that frames you as the source. Citations rank. Links accumulate. Most link-building moves the wrong number.",
  },
  {
    question: "Will you do paid placements?",
    answer:
      "Sometimes. Native editorial in real publications, podcast sponsorships, industry-report co-publishing &mdash; yes. Sponsored backlinks dressed up as editorial, pay-to-play awards, blog network buys &mdash; no.",
  },
  {
    question: "How long until we see results?",
    answer:
      "First placements typically land in months 3&ndash;4. The compounding starts around month 6 (one citation makes the next easier). The real authority lift shows up around month 12 &mdash; which is why we don&rsquo;t take shorter engagements.",
  },
  {
    question: "What does it cost?",
    answer:
      "Authority Building engagements start at ₹6L/month for a 12-month minimum, scaling with publication tier ambition and source-asset volume. Quoted post-audit.",
  },
];

// ─────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────

export default function AuthorityBuildingPage() {
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
            <li className="text-ink-headline">Authority Building</li>
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

                <h1 className="font-bold tracking-[-0.025em] text-display-xl text-ink-headline leading-[1.16] max-w-[18ch] text-balance mb-8">
                  Stop building links. Start building{" "}
                  <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                    citations
                  </span>
                  .
                </h1>

                <p className="font-body text-body-lg text-ink-body leading-[1.55] max-w-[54ch] mb-10">
                  Authority isn&rsquo;t bought. It&rsquo;s earned in
                  publications that wouldn&rsquo;t take money for it &mdash;
                  then leveraged across paid, lifecycle, and sales for the rest
                  of the year.
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    href="/book-consultation"
                    className="inline-flex items-center gap-3 bg-brand-yellow text-ink-headline font-display font-light text-display-xs px-8 py-4 hover:bg-emerald-900 hover:text-white transition-colors duration-hover"
                  >
                    <span>Apply for an authority audit</span>
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

              {/* Right — citation graph */}
              <div className="md:col-span-5 flex items-center justify-center pt-8 md:pt-0">
                <CitationGraph />
              </div>
            </div>
          </div>
        </section>

        {/* ─── 2. AUTHORITY HIERARCHY — green tiered table ─── */}
        <section
          className="bg-emerald-900 text-white"
          aria-labelledby="hierarchy-heading"
        >
          <div className="container-layout py-24 md:py-32">
            <div className="grid md:grid-cols-12 gap-8 md:gap-16 mb-14 md:mb-16 items-end">
              <div className="md:col-span-9">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60 mb-6">
                  Authority hierarchy
                </p>
                <h2
                  id="hierarchy-heading"
                  className="font-bold tracking-[-0.025em] text-display-lg text-white leading-[1.05] max-w-[24ch] text-balance"
                >
                  Not every citation is{" "}
                  <span className="bg-brand-yellow text-ink-headline px-3 py-0.5 box-decoration-clone">
                    worth the same
                  </span>
                  .
                </h2>
              </div>
              <div className="md:col-span-3 md:text-right">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60 leading-relaxed">
                  <span className="inline-block w-1.5 h-1.5 bg-brand-yellow mr-2 align-middle" />
                  4 tiers · 10×
                  <br />
                  weight spread
                </p>
              </div>
            </div>

            {/* Header row */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 pb-4 border-b border-white/25 mb-2">
              <div className="md:col-span-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                Tier
              </div>
              <div className="md:col-span-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                Publication
              </div>
              <div className="md:col-span-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                Examples
              </div>
              <div className="md:col-span-1 font-mono text-[10px] uppercase tracking-[0.2em] text-brand-yellow">
                Weight
              </div>
              <div className="md:col-span-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                Earns it
              </div>
              <div className="md:col-span-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 text-right">
                Pace
              </div>
            </div>

            <ol>
              {HIERARCHY.map((row, i) => {
                const isTop = i === 0;
                return (
                  <li
                    key={row.tier}
                    className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 py-6 md:py-7 border-b border-white/15 items-baseline"
                  >
                    <div className="md:col-span-1">
                      <span
                        className={`font-mono text-[11px] uppercase tracking-[0.2em] ${
                          isTop ? "text-brand-yellow" : "text-white/60"
                        }`}
                      >
                        {row.tier}
                      </span>
                    </div>
                    <div className="md:col-span-3">
                      <p
                        className={`font-display ${
                          isTop ? "font-bold" : "font-light"
                        } text-display-xs text-white leading-[1.25] tracking-[-0.005em]`}
                      >
                        {row.label}
                      </p>
                    </div>
                    <div className="md:col-span-3">
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/55 leading-[1.55]">
                        {row.examples}
                      </p>
                    </div>
                    <div className="md:col-span-1">
                      <p
                        className={`font-display ${
                          isTop ? "font-light text-brand-yellow" : "font-extralight text-white/75"
                        } text-display-xs leading-[1.1] tracking-[-0.01em]`}
                      >
                        {row.weight}
                      </p>
                    </div>
                    <div className="md:col-span-3">
                      <p
                        className="font-body text-body-sm text-white/70 leading-[1.5]"
                        dangerouslySetInnerHTML={{ __html: row.earns }}
                      />
                    </div>
                    <div className="md:col-span-1 md:text-right">
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/55">
                        {row.pace}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>

            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 mt-8">
              One T1 citation outweighs ten T4 aggregator mentions. We design for concentration.
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
                  earn from
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

        {/* ─── 4. EARNED-MEDIA CATALOG ─── */}
        <section
          className="bg-bg-primary border-b border-ink-headline/10"
          aria-labelledby="catalog-heading"
        >
          <div className="container-layout py-24 md:py-32">
            <div className="grid md:grid-cols-12 gap-8 md:gap-16 mb-16 md:mb-20 items-end">
              <div className="md:col-span-9">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-6">
                  Earned-media catalog
                </p>
                <h2
                  id="catalog-heading"
                  className="font-bold tracking-[-0.025em] text-display-xl text-ink-headline leading-[1.02] max-w-[22ch] text-balance"
                >
                  Six categories.{" "}
                  <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                    Twenty-four
                  </span>{" "}
                  earned-media plays.
                </h2>
              </div>
              <div className="md:col-span-3 md:text-right">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted leading-relaxed">
                  <span className="inline-block w-1.5 h-1.5 bg-brand-yellow mr-2 align-middle" />
                  Real journalists
                  <br />
                  Real relationships
                </p>
              </div>
            </div>

            <ol className="grid md:grid-cols-2 lg:grid-cols-3 border-l border-t border-ink-headline/15">
              {EARNED_MEDIA_CATALOG.map((cat, i) => (
                <li
                  key={cat.category}
                  className="group relative p-8 md:p-10 border-r border-b border-ink-headline/15 flex flex-col transition-colors duration-hover hover:bg-bg-secondary"
                >
                  <div className="flex items-baseline justify-between gap-6 mb-6">
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-headline">
                      {String(i + 1).padStart(2, "0")} /{" "}
                      {String(EARNED_MEDIA_CATALOG.length).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                      {cat.items.length} plays
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
                  className="font-bold tracking-[-0.025em] text-display-xl text-ink-headline leading-[1.02] max-w-[24ch] text-balance"
                >
                  Five layers from{" "}
                  <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                    audience to leverage
                  </span>
                  .
                </h2>
              </div>
              <div className="md:col-span-3 md:text-right">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted leading-relaxed">
                  <span className="inline-block w-1.5 h-1.5 bg-brand-yellow mr-2 align-middle" />
                  Earned upstream
                  <br />
                  Leveraged downstream
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
                  Twelve weeks to first{" "}
                  <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                    citations
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
          aria-labelledby="authority-logos-heading"
        >
          <div className="container-layout py-16 md:py-20">
            <p
              id="authority-logos-heading"
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-10"
            >
              Brands we&rsquo;ve earned citations for
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
                What the practice{" "}
                <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                  asks for
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
                  Industries we earn citations in
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
              Stop being a vendor.{" "}
              <span className="bg-brand-yellow text-ink-headline px-3 py-0.5 box-decoration-clone">
                Become the source
              </span>
              .
            </h2>

            <div className="grid md:grid-cols-12 gap-8 md:gap-16 pt-10 border-t border-white/15 items-center">
              <div className="md:col-span-7">
                <p className="font-body text-body-lg text-white/80 leading-[1.5] max-w-[52ch]">
                  A 45-minute paid authority audit. We score your current
                  citation graph, your source assets, and the publications you
                  should be in &mdash; but aren&rsquo;t. Refunded in full if
                  we&rsquo;re not the right fit.
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
