import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/meta";
import { GlobalNav } from "@/components/nav/GlobalNav";
import { Footer } from "@/components/nav/Footer";
import { GridOverlay } from "@/components/blocks/GridOverlay";
import { ProductionAssetTree } from "@/components/utility/ProductionAssetTree";

// ─────────────────────────────────────────────
// Video Production sub-service page.
// Distinct section shape — Output Inventory (green asset-yield breakdown),
// Asset Library catalog, Architecture, quarter-long Process.
// ─────────────────────────────────────────────

export const metadata: Metadata = buildMetadata({
  title: "Video Production — Brand, Engagement & Lifecycle | Zeppstr",
  description:
    "Stop shooting films. Start running a production line. One shoot day, sixteen deployable assets, ninety days of supply — and the rights stay with you.",
  path: "/solutions/brand-engagement-lifecycle/video-production",
})

// ─── Content ───

const FEATURED_LOGOS = [
  { name: "Mini Leaves", file: "mini-leaves.png" },
  { name: "Tru Aquapolis", file: "tru-aquapolis.png" },
  { name: "Wise Market", file: "wise-market.png" },
  { name: "Aishwarya Interiors", file: "aishwarya-interiors.png" },
  { name: "Tristar Online", file: "tristar-online.png" },
  { name: "My Keto Co", file: "my-keto-co.png" },
  { name: "Lucky White Goods", file: "lucky-white-goods.png" },
];

// OUTPUT INVENTORY — what one shoot day produces (qty + asset + use)
const OUTPUT_INVENTORY = [
  { qty: "01", asset: "Hero Film", use: "Site · YouTube · Sales", spec: "90s master cut" },
  { qty: "02", asset: "Cut-downs", use: "Paid Search · Display", spec: "60s + 30s" },
  { qty: "06", asset: "Social Verticals", use: "Reels · TikTok · Shorts", spec: "15s native" },
  { qty: "03", asset: "Photo Stills", use: "Site · Lifecycle · Sales decks", spec: "On-set capture" },
  { qty: "02", asset: "Sales Clips", use: "Decks · Demos · Onboarding", spec: "Product-focused" },
  { qty: "01", asset: "Behind-the-Scenes", use: "Owned social · Founder content", spec: "Cinéma-vérité" },
  { qty: "01", asset: "Lifecycle Asset", use: "Email · SMS · WhatsApp", spec: "Embeddable cut" },
];

const TOTAL_ASSETS = 16;

// Principles — 4 rules
const PRINCIPLES = [
  {
    n: "01",
    title: "One shoot, many cuts.",
    body: "Every shoot day is briefed to produce sixteen deployable assets, not one final film. The cost amortizes. The supply lasts a quarter.",
  },
  {
    n: "02",
    title: "The brief is the production plan.",
    body: "We don&rsquo;t write a brief, then write a treatment, then write a shot list. Brief, treatment, and shot list are the same document &mdash; written before the location scout.",
  },
  {
    n: "03",
    title: "Own the source. Edit forever.",
    body: "Raw footage, project files, and rights stay with you. Three months later when you need a new cut for a campaign, the source is in your drive &mdash; not in someone else&rsquo;s archive.",
  },
  {
    n: "04",
    title: "Distribution is part of production.",
    body: "Every cut is briefed against a specific channel and a specific moment. We design for Reels before we shoot, not after. The platform shapes the camera, not the edit.",
  },
];

// ASSET LIBRARY — 6 categories of video assets we produce
const ASSET_LIBRARY = [
  {
    category: "Brand Films",
    items: [
      "Founder-led brand story",
      "Manifesto / POV film",
      "Anniversary / milestone film",
      "Recruitment film",
    ],
  },
  {
    category: "Performance Cuts",
    items: [
      "Hook-led product ads",
      "Promo / offer cuts",
      "UGC-style scripted",
      "Retargeting variants",
    ],
  },
  {
    category: "Social Verticals",
    items: [
      "Reels · TikTok · Shorts",
      "Carousel-companion clips",
      "Hook + payoff pairs",
      "Trend-anchored cuts",
    ],
  },
  {
    category: "Episodic Series",
    items: [
      "Customer story series",
      "Behind-the-build series",
      "Industry teardown series",
      "Founder vlog cadence",
    ],
  },
  {
    category: "Sales & Product",
    items: [
      "Product walkthrough",
      "Onboarding demo",
      "Sales-deck embed clips",
      "Case-study films",
    ],
  },
  {
    category: "Owned-Channel Cuts",
    items: [
      "Email-embed videos",
      "Landing-page hero loop",
      "WhatsApp / SMS shorts",
      "Internal / culture cuts",
    ],
  },
];

// ARCHITECTURE — 5 layers
const ARCHITECTURE_LAYERS = [
  {
    name: "Strategy & Audience",
    format: "Brief · Positioning · Distribution plan",
    description:
      "Who&rsquo;s the audience, what channel does this serve, what does success look like in numbers. Locked before treatment.",
  },
  {
    name: "Production Plan",
    format: "Treatment · Shot list · Cast · Location",
    description:
      "Treatment, shot list, talent, location, equipment, schedule &mdash; one document, not five. Designed to produce 16 assets, not one film.",
  },
  {
    name: "Capture",
    format: "Shoot discipline · B-roll · Audio · Stills",
    description:
      "On-set discipline that maximizes asset yield. B-roll is scheduled, not improvised. Audio captured clean. Photo stills captured in parallel.",
  },
  {
    name: "Edit & Cut",
    format: "Master · Derivatives · Variants",
    description:
      "Master cut first. Then the 15 derivatives &mdash; cut-downs, verticals, stills, sales clips &mdash; assembled from the same source in parallel.",
  },
  {
    name: "Distribution & Measurement",
    format: "Native deploy · Cohort lift · Renewal",
    description:
      "Each cut shipped to its native channel. Performance measured at the cut level, not the campaign level. Best performers re-cut, worst quietly retired.",
  },
];

// 6 process phases — quarter rhythm
const PROCESS_PHASES = [
  {
    title: "Brief & Audience",
    duration: "Week 1",
    body: "Audience, channels, success metrics. The reason for the shoot, written before anyone picks up a camera.",
  },
  {
    title: "Treatment & Plan",
    duration: "Week 2",
    body: "Treatment, shot list, cast, location, equipment — one document. Designed for 16 asset outputs, not one hero film.",
  },
  {
    title: "Pre-production",
    duration: "Week 3",
    body: "Location lock, cast confirm, crew booked, props sorted, schedule signed. Shoot day is calm because pre-production wasn&rsquo;t.",
  },
  {
    title: "Shoot",
    duration: "Week 4 · 1–2 days",
    body: "One or two days on set. B-roll, audio, photo stills captured in parallel with primary. Sign-off on dailies before wrap.",
  },
  {
    title: "Edit & Cut",
    duration: "Week 5–7",
    body: "Master cut delivered week 5. Derivatives — cut-downs, verticals, social, sales, lifecycle — assembled weeks 6–7.",
  },
  {
    title: "Distribute & Measure",
    duration: "Week 8–12",
    body: "Each cut shipped to its native channel on its native cadence. Performance reviewed at cut level, not campaign level. Best performers re-cut.",
  },
];

const PRACTICE_NUMBERS = [
  {
    figure: "16+",
    metric: "Assets per shoot day",
    detail:
      "Standard yield from a single one-day shoot, before any add-on cuts.",
    client: "Standard build",
  },
  {
    figure: "₹62K",
    metric: "Cost per deployable asset",
    detail:
      "Effective per-asset cost when ₹10L shoot produces 16 cuts. Industry baseline: ₹3L+ per cut.",
    client: "Cost amortization",
  },
  {
    figure: "90 days",
    metric: "Supply per shoot",
    detail:
      "One shoot day produces a full quarter of paid, social, and lifecycle supply &mdash; without a re-shoot.",
    client: "DTC consumer · Real estate",
  },
];

const INDUSTRIES = [
  { name: "Direct-to-Consumer", slug: "direct-to-consumer" },
  { name: "Real Estate", slug: "real-estate" },
  { name: "B2B SaaS", slug: "b2b-saas" },
  { name: "Premium Retail", slug: "premium-retail" },
  { name: "Multi-brand Operators", slug: "multi-brand-operators" },
];

const FAQS = [
  {
    question: "Do you have an in-house crew or do you book?",
    answer:
      "Both. A core in-house production lead plus a roster of vetted directors, DPs, editors, and post houses we&rsquo;ve worked with for years. Scope of the brief decides who&rsquo;s on the call sheet.",
  },
  {
    question: "Who owns the rights to the footage?",
    answer:
      "You do. Raw footage, project files, music licenses, and talent releases are all assigned to you on delivery. Three months later when you need a new cut, the source is in your drive &mdash; not in someone else&rsquo;s archive.",
  },
  {
    question: "Can you do a one-off film, not a quarterly program?",
    answer:
      "Yes, but it&rsquo;s rarely the efficient move. A one-off hero film at ₹15L produces one asset. The same shoot day, briefed differently, produces sixteen. We&rsquo;ll usually advise the latter.",
  },
  {
    question: "Do you handle on-camera talent, or do we bring it?",
    answer:
      "Both. Founder-led is common (and often the highest-converting). We can also cast professional talent, customer talent, or hybrid &mdash; whichever the audience and channel call for.",
  },
  {
    question: "How fast can you turn around a shoot?",
    answer:
      "Brief to shoot day: 3 weeks minimum, 4 weeks comfortable. Master cut: week 5. Derivatives: week 7. Full quarter supply distributed by week 12. Rush is possible at premium.",
  },
  {
    question: "What does it cost?",
    answer:
      "Quarterly programs (one shoot day, full asset suite, distribution-ready) start at ₹10L. Annual programs (4 shoot days, ~64 assets) run ₹35L–55L depending on production weight. Fixed scope, quoted after the brief.",
  },
];

// ─────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────

export default function VideoProductionPage() {
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
            <li className="text-ink-headline">Video Production</li>
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
                  Stop shooting{" "}
                  <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                    films
                  </span>
                  . Run a production line.
                </h1>

                <p className="font-body text-body-lg text-ink-body leading-[1.55] max-w-[54ch] mb-10">
                  One shoot day. Sixteen deployable assets. Ninety days of
                  supply across paid, social, sales, and lifecycle &mdash; and
                  the rights stay with you.
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    href="/book-consultation"
                    className="inline-flex items-center gap-3 bg-brand-yellow text-ink-headline font-display font-light text-display-xs px-8 py-4 hover:bg-emerald-900 hover:text-white transition-colors duration-hover"
                  >
                    <span>Apply for a production audit</span>
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

              {/* Right — asset tree graphic */}
              <div className="md:col-span-5 flex items-center justify-center pt-8 md:pt-0">
                <ProductionAssetTree />
              </div>
            </div>
          </div>
        </section>

        {/* ─── 2. OUTPUT INVENTORY — green block, asset multiplier ─── */}
        <section
          className="bg-emerald-900 text-white"
          aria-labelledby="output-inventory-heading"
        >
          <div className="container-layout py-24 md:py-32">
            <div className="grid md:grid-cols-12 gap-8 md:gap-16 mb-14 md:mb-16 items-end">
              <div className="md:col-span-9">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60 mb-6">
                  Output inventory
                </p>
                <h2
                  id="output-inventory-heading"
                  className="font-bold tracking-[-0.025em] text-display-lg text-white leading-[1.05] max-w-[22ch] text-balance"
                >
                  One shoot day.{" "}
                  <span className="bg-brand-yellow text-ink-headline px-3 py-0.5 box-decoration-clone">
                    Sixteen
                  </span>{" "}
                  deployable assets.
                </h2>
              </div>
              <div className="md:col-span-3 md:text-right">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60 leading-relaxed">
                  <span className="inline-block w-1.5 h-1.5 bg-brand-yellow mr-2 align-middle" />
                  Standard yield
                  <br />
                  Before add-ons
                </p>
              </div>
            </div>

            {/* Multiplier strip */}
            <div className="grid md:grid-cols-12 gap-6 md:gap-12 py-10 mb-10 border-y border-white/20 items-center">
              <div className="md:col-span-3 text-center md:text-left">
                <p className="font-display font-extralight text-display-stat text-brand-yellow leading-none tracking-[-0.04em]">
                  01
                </p>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/70 mt-3">
                  Shoot day
                </p>
              </div>
              <div className="md:col-span-1 hidden md:flex justify-center text-white/30 text-[40px]">
                ×
              </div>
              <div className="md:col-span-3 text-center md:text-left">
                <p className="font-display font-extralight text-display-stat text-white leading-none tracking-[-0.04em]">
                  {TOTAL_ASSETS}
                </p>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/70 mt-3">
                  Assets delivered
                </p>
              </div>
              <div className="md:col-span-1 hidden md:flex justify-center text-white/30 text-[40px]">
                =
              </div>
              <div className="md:col-span-4 text-center md:text-left">
                <p className="font-display font-light text-display-md text-white leading-[1.1] tracking-[-0.02em]">
                  ₹62K / asset
                </p>
                <p className="font-body text-body-sm text-white/65 leading-[1.5] mt-3 max-w-[34ch]">
                  Industry baseline: ₹3L+ per cut. Same craft, fifth of the
                  cost per deployable asset.
                </p>
              </div>
            </div>

            {/* Inventory rows */}
            <ol>
              {OUTPUT_INVENTORY.map((item, i) => (
                <li
                  key={item.asset}
                  className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 py-5 md:py-6 border-b border-white/15 items-baseline"
                >
                  <div className="md:col-span-1 font-mono text-[11px] uppercase tracking-[0.2em] text-brand-yellow">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="md:col-span-1 font-display font-light text-display-sm text-brand-yellow leading-none tracking-[-0.02em]">
                    {item.qty}×
                  </div>
                  <div className="md:col-span-4">
                    <p className="font-display font-light text-display-xs text-white leading-[1.3] tracking-[-0.005em]">
                      {item.asset}
                    </p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/50 mt-1">
                      {item.spec}
                    </p>
                  </div>
                  <div className="md:col-span-6">
                    <p className="font-body text-body-sm text-white/65 leading-[1.5]">
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 mr-3">
                        For →
                      </span>
                      {item.use}
                    </p>
                  </div>
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
                  shoot from
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

        {/* ─── 4. ASSET LIBRARY — catalog ─── */}
        <section
          className="bg-bg-primary border-b border-ink-headline/10"
          aria-labelledby="asset-library-heading"
        >
          <div className="container-layout py-24 md:py-32">
            <div className="grid md:grid-cols-12 gap-8 md:gap-16 mb-16 md:mb-20 items-end">
              <div className="md:col-span-9">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-6">
                  Asset library
                </p>
                <h2
                  id="asset-library-heading"
                  className="font-bold tracking-[-0.025em] text-display-xl text-ink-headline leading-[1.02] max-w-[22ch] text-balance"
                >
                  Six categories.{" "}
                  <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                    Twenty-four
                  </span>{" "}
                  asset types.
                </h2>
              </div>
              <div className="md:col-span-3 md:text-right">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted leading-relaxed">
                  <span className="inline-block w-1.5 h-1.5 bg-brand-yellow mr-2 align-middle" />
                  Each built
                  <br />
                  for a channel
                </p>
              </div>
            </div>

            <ol className="grid md:grid-cols-2 lg:grid-cols-3 border-l border-t border-ink-headline/15">
              {ASSET_LIBRARY.map((cat, i) => (
                <li
                  key={cat.category}
                  className="group relative p-8 md:p-10 border-r border-b border-ink-headline/15 flex flex-col transition-colors duration-hover hover:bg-bg-secondary"
                >
                  <div className="flex items-baseline justify-between gap-6 mb-6">
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-headline">
                      {String(i + 1).padStart(2, "0")} /{" "}
                      {String(ASSET_LIBRARY.length).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                      {cat.items.length} assets
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
                    brief to broadcast
                  </span>
                  .
                </h2>
              </div>
              <div className="md:col-span-3 md:text-right">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted leading-relaxed">
                  <span className="inline-block w-1.5 h-1.5 bg-brand-yellow mr-2 align-middle" />
                  Sequential
                  <br />
                  No layer skipped
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
                  One quarter, end to end.{" "}
                  <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                    Brief to distribution
                  </span>
                  .
                </h2>
              </div>
              <div className="md:col-span-3 md:text-right">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted leading-relaxed">
                  <span className="inline-block w-1.5 h-1.5 bg-brand-yellow mr-2 align-middle" />
                  6 phases · 12 weeks
                  <br />
                  Shoot on week 4
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
          aria-labelledby="video-logos-heading"
        >
          <div className="container-layout py-16 md:py-20">
            <p
              id="video-logos-heading"
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-10"
            >
              Brands we&rsquo;ve produced video for
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
                What the shoot day{" "}
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
                  Industries we produce video for
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

        {/* ─── 11. BOTTOM CTA ─── */}
        <section className="relative z-10 bg-emerald-900 text-white">
          <div className="container-layout py-32 md:py-48">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/70 mb-12">
              Engage
            </p>

            <h2 className="font-bold tracking-[-0.025em] text-display-stat leading-[1.02] max-w-[22ch] mb-16 md:mb-24 text-white text-balance">
              One shoot.{" "}
              <span className="bg-brand-yellow text-ink-headline px-3 py-0.5 box-decoration-clone">
                A quarter of supply
              </span>
              .
            </h2>

            <div className="grid md:grid-cols-12 gap-8 md:gap-16 pt-10 border-t border-white/15 items-center">
              <div className="md:col-span-7">
                <p className="font-body text-body-lg text-white/80 leading-[1.5] max-w-[52ch]">
                  A 45-minute paid production audit. We score your current
                  asset library, your shoot-to-cut ratio, and the supply gap.
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
