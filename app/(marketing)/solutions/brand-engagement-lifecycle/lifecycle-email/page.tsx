import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/meta";
import { GlobalNav } from "@/components/nav/GlobalNav";
import { Footer } from "@/components/nav/Footer";
import { GridOverlay } from "@/components/blocks/GridOverlay";
import { EmailFlowGraph } from "@/components/utility/EmailFlowGraph";

// ─────────────────────────────────────────────
// Lifecycle & Email sub-service page.
// Distinct section shape — Revenue Composition (green bar chart),
// Flow Library catalog, Architecture stack.
// ─────────────────────────────────────────────

export const metadata: Metadata = buildMetadata({
  title:
    "Lifecycle & Email Marketing — Brand, Engagement & Lifecycle | Zeppstr",
  description:
    "Email is the only channel you own. Treat it like one. We build lifecycle as a state machine — automated flows for every meaningful customer state, measured against revenue, not open rates.",
  path: "/solutions/brand-engagement-lifecycle/lifecycle-email",
})

// ─── Content ───

const FEATURED_LOGOS = [
  { name: "Mini Leaves", file: "mini-leaves.png" },
  { name: "Wise Market", file: "wise-market.png" },
  { name: "My Keto Co", file: "my-keto-co.png" },
  { name: "Aishwarya Interiors", file: "aishwarya-interiors.png" },
  { name: "Empuls", file: "empuls.png" },
  { name: "Tristar Online", file: "tristar-online.png" },
  { name: "Sky Phonez", file: "sky-phonez.png" },
  { name: "Lucky White Goods", file: "lucky-white-goods.png" },
];

// Revenue Composition — before/after split between flows and campaigns
const REVENUE_COMPOSITION = {
  before: { flows: 18, campaigns: 82 },
  after: { flows: 68, campaigns: 32 },
};

// Principles — 4 lifecycle rules
const PRINCIPLES = [
  {
    n: "01",
    title: "Email is owned. Act like it.",
    body: "It&rsquo;s the one channel no algorithm can throttle. Most brands treat it like rented social. We treat it like the second-most valuable asset the business has.",
  },
  {
    n: "02",
    title: "Flows compound. Campaigns decay.",
    body: "A campaign earns once and dies. A flow earns every time a customer hits its trigger &mdash; for years. Most programs do the inverse of what they should.",
  },
  {
    n: "03",
    title: "Send less. Send when it matters.",
    body: "Fewer sends, better triggered. We&rsquo;ve cut send volume 60% and increased revenue. The list thanks you. The inbox provider thanks you. Revenue thanks you.",
  },
  {
    n: "04",
    title: "Open rate is dead.",
    body: "Apple killed it. The unit is attributed revenue per send, repeat-purchase rate, and LTV lift per cohort. Anything else is theater.",
  },
];

// The Flow Library — 6 categories, sub-flows under each (catalog format)
const FLOW_LIBRARY = [
  {
    category: "Welcome & Onboarding",
    flows: [
      "Welcome series · 3 emails",
      "First-purchase coupon",
      "Profile enrichment",
      "Preference center",
    ],
  },
  {
    category: "Cart & Browse Recovery",
    flows: [
      "Cart abandonment",
      "Browse abandonment",
      "Wishlist recovery",
      "Price-drop trigger",
    ],
  },
  {
    category: "Post-Purchase",
    flows: [
      "Order confirmation",
      "Shipping updates",
      "First-use education",
      "Review request",
      "Cross-sell post-delivery",
    ],
  },
  {
    category: "Retention & Replenishment",
    flows: [
      "Replenishment reminder",
      "Category cross-sell",
      "Upsell to bundle",
      "VIP early access",
    ],
  },
  {
    category: "Win-Back & Reactivation",
    flows: [
      "At-risk (no engagement 30d)",
      "60-day win-back",
      "180-day reactivation",
      "Sunset & list hygiene",
    ],
  },
  {
    category: "Lifecycle-Triggered Campaigns",
    flows: [
      "Birthday",
      "Anniversary",
      "Loyalty milestone",
      "Referral request",
    ],
  },
];

// The Architecture — 5 layers
const ARCHITECTURE_LAYERS = [
  {
    name: "Data Layer",
    format: "Source-of-truth events · CDP · Identity",
    description:
      "Every meaningful customer action captured and resolved to a single identity. Without this, segmentation lies and flows misfire.",
  },
  {
    name: "Segmentation Layer",
    format: "RFM · Behavioral cohorts · Predictive",
    description:
      "Recency-frequency-monetary cohorts, plus behavioral and predictive segments. Segments are the audience &mdash; flows are the trigger.",
  },
  {
    name: "Flow Layer",
    format: "18+ automated journeys",
    description:
      "Welcome, cart, post-purchase, replenishment, win-back, lifecycle campaigns. Always-on. Built once, earning forever.",
  },
  {
    name: "Campaign Layer",
    format: "Rolling 90-day calendar",
    description:
      "Layered on top of flows, not in place of them. Modular content. Templated production. Cadence determined by data, not by Tuesdays.",
  },
  {
    name: "Measurement Layer",
    format: "Attribution · LTV · Cohort lift",
    description:
      "Attributed revenue per send, repeat-purchase rate, and cohort LTV lift. The metrics that decide what gets renewed and what gets killed.",
  },
];

// 6 process phases — 12 weeks
const PROCESS_PHASES = [
  {
    title: "Audit",
    duration: "Week 1–2",
    body: "Current sends, list health, deliverability, attribution baseline, and the revenue split between flows and campaigns. Written diagnostic.",
  },
  {
    title: "Architecture",
    duration: "Week 3",
    body: "Data model, segmentation framework, flow blueprint. Signed off before a single email is written.",
  },
  {
    title: "Foundation Flows",
    duration: "Week 4–6",
    body: "Welcome, post-purchase, abandonment built first. These three carry the majority of automated revenue. Live in 21 days.",
  },
  {
    title: "Expansion Flows",
    duration: "Week 7–9",
    body: "Replenishment, win-back, loyalty, referral, and lifecycle triggers. The library grows from three flows to eighteen.",
  },
  {
    title: "Campaign Calendar",
    duration: "Week 10–11",
    body: "Rolling 90-day rhythm built on modular content blocks. Production becomes assembly, not writing-from-scratch each week.",
  },
  {
    title: "Measurement & Optimization",
    duration: "Week 12+",
    body: "Attribution model live. A/B framework active. Drift caught quarterly. The program operates without anyone having to babysit it.",
  },
];

const PRACTICE_NUMBERS = [
  {
    figure: "₹60L/mo",
    metric: "Owned-channel run rate",
    detail:
      "Email + SMS, operated as a single revenue line — not a marketing-team line item.",
    client: "Mini Leaves — DTC consumer",
  },
  {
    figure: "70 / 30",
    metric: "Flows vs Campaigns",
    detail:
      "The revenue split we build towards: automated flows doing the heavy lifting, broadcast campaigns on top. Most programmes we inherit are the other way round.",
    client: "Zeppstr — what we build to",
  },
  {
    figure: "18+",
    metric: "Automated flows in a mature program",
    detail:
      "The library we build out by end of engagement. Most clients arrive with 3.",
    client: "Standard build",
  },
];

const INDUSTRIES = [
  { name: "Direct-to-Consumer", slug: "direct-to-consumer" },
  { name: "B2B SaaS", slug: "b2b-saas" },
  { name: "Premium Retail", slug: "premium-retail" },
  { name: "Real Estate", slug: "real-estate" },
  { name: "Multi-brand Operators", slug: "multi-brand-operators" },
];

const FAQS = [
  {
    question: "We already use Klaviyo / HubSpot. Do you re-platform us?",
    answer:
      "Only if the platform is the bottleneck. Most engagements run on what you already have — Klaviyo, HubSpot, Mailchimp, Iterable. The leak is almost always in architecture, not tooling.",
  },
  {
    question: "Will sending less actually grow revenue?",
    answer:
      "Yes, usually. Most lists are over-mailed, under-segmented, and beat down to single-digit open rates. Sending less to better-segmented cohorts compounds. We’ve cut volume 60% and grown revenue in the same quarter.",
  },
  {
    question: "Do you do SMS, push, and WhatsApp too?",
    answer:
      "Yes. Lifecycle is channel-agnostic. SMS and WhatsApp sit inside the same flow architecture. Push is the same model for app-first brands.",
  },
  {
    question: "How fast until we see revenue from this?",
    answer:
      "Foundation flows go live in 21 days. Welcome, cart abandonment, and post-purchase typically deliver attributable revenue inside the first month. The full library hits its run rate by month 4.",
  },
  {
    question: "What attribution model do you use?",
    answer:
      "Last-click for flow trigger, with cohort LTV lift as the long-form check. Attributed revenue per send is the dashboard metric. Single-touch attribution lies; we layer.",
  },
  {
    question: "What does it cost?",
    answer:
      "Lifecycle builds start at ₹15L for the 12-week engagement, then ₹4L–8L/month for ongoing operation or governance. Fixed scope, quoted after the audit.",
  },
];

// ─────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────

export default function LifecycleEmailPage() {
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
            <li className="text-ink-headline">Lifecycle & Email</li>
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
                  Email is the only channel you{" "}
                  <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                    own
                  </span>
                  .
                </h1>

                <p className="font-body text-body-lg text-ink-body leading-[1.55] max-w-[54ch] mb-10">
                  Treat it like one. We build lifecycle as a state machine
                  &mdash; automated flows for every meaningful customer state,
                  measured against revenue, not open rates.
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    href="/book-consultation"
                    className="inline-flex items-center gap-3 bg-brand-yellow text-ink-headline font-display font-light text-display-xs px-8 py-4 hover:bg-emerald-900 hover:text-white transition-colors duration-hover"
                  >
                    <span>Apply for a lifecycle audit</span>
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

              {/* Right — state machine graphic */}
              <div className="md:col-span-5 flex items-center justify-center pt-8 md:pt-0">
                <EmailFlowGraph />
              </div>
            </div>
          </div>
        </section>

        {/* ─── 2. REVENUE COMPOSITION — green block with before/after bars ─── */}
        <section
          className="bg-emerald-900 text-white"
          aria-labelledby="revenue-composition-heading"
        >
          <div className="container-layout py-24 md:py-32">
            <div className="grid md:grid-cols-12 gap-8 md:gap-16 mb-14 md:mb-20 items-end">
              <div className="md:col-span-9">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60 mb-6">
                  Revenue composition
                </p>
                <h2
                  id="revenue-composition-heading"
                  className="font-bold tracking-[-0.025em] text-display-lg text-white leading-[1.05] max-w-[22ch] text-balance"
                >
                  Most programs earn from{" "}
                  <span className="bg-brand-yellow text-ink-headline px-3 py-0.5 box-decoration-clone">
                    the wrong half
                  </span>
                  .
                </h2>
              </div>
              <div className="md:col-span-3 md:text-right">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60 leading-relaxed">
                  <span className="inline-block w-1.5 h-1.5 bg-brand-yellow mr-2 align-middle" />
                  Industry avg → <br />
                  Our target
                </p>
              </div>
            </div>

            {/* Before/After bars — visual revenue split comparison */}
            <div className="grid md:grid-cols-2 gap-10 md:gap-16">
              {/* BEFORE */}
              <div>
                <div className="flex items-baseline justify-between mb-5">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/70">
                    Before · Most programs
                  </p>
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
                    100% revenue
                  </p>
                </div>
                <div className="flex w-full h-16 border border-white/25">
                  <div
                    className="flex items-center justify-center text-ink-headline font-display font-light text-display-sm bg-white/30 border-r border-white/25"
                    style={{ width: `${REVENUE_COMPOSITION.before.flows}%` }}
                  >
                    {REVENUE_COMPOSITION.before.flows}%
                  </div>
                  <div
                    className="flex items-center justify-center text-white font-display font-light text-display-sm"
                    style={{
                      width: `${REVENUE_COMPOSITION.before.campaigns}%`,
                    }}
                  >
                    {REVENUE_COMPOSITION.before.campaigns}%
                  </div>
                </div>
                <div className="flex justify-between mt-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">
                    Flows
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">
                    Campaigns
                  </p>
                </div>
                <p className="font-body text-body-sm text-white/65 leading-[1.6] mt-6 max-w-[44ch]">
                  Most teams arrive with a few campaigns, no flows, and
                  declining open rates. Volume is the only lever they pull.
                </p>
              </div>

              {/* AFTER */}
              <div>
                <div className="flex items-baseline justify-between mb-5">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-yellow">
                    After · The target state
                  </p>
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
                    100% revenue
                  </p>
                </div>
                <div className="flex w-full h-16 border border-brand-yellow">
                  <div
                    className="flex items-center justify-center text-ink-headline font-display font-light text-display-sm bg-brand-yellow border-r border-brand-yellow"
                    style={{ width: `${REVENUE_COMPOSITION.after.flows}%` }}
                  >
                    {REVENUE_COMPOSITION.after.flows}%
                  </div>
                  <div
                    className="flex items-center justify-center text-white font-display font-light text-display-sm bg-white/10"
                    style={{
                      width: `${REVENUE_COMPOSITION.after.campaigns}%`,
                    }}
                  >
                    {REVENUE_COMPOSITION.after.campaigns}%
                  </div>
                </div>
                <div className="flex justify-between mt-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-yellow">
                    Flows
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">
                    Campaigns
                  </p>
                </div>
                <p className="font-body text-body-sm text-white/80 leading-[1.6] mt-6 max-w-[44ch]">
                  Two-thirds of revenue comes from flows built once and earning
                  forever. Campaigns become the topping, not the pizza.
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
                  send from
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

        {/* ─── 4. FLOW LIBRARY — catalog of 18+ flows in 6 categories ─── */}
        <section
          className="bg-bg-primary border-b border-ink-headline/10"
          aria-labelledby="flow-library-heading"
        >
          <div className="container-layout py-24 md:py-32">
            <div className="grid md:grid-cols-12 gap-8 md:gap-16 mb-16 md:mb-20 items-end">
              <div className="md:col-span-9">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-6">
                  Flow library
                </p>
                <h2
                  id="flow-library-heading"
                  className="font-bold tracking-[-0.025em] text-display-xl text-ink-headline leading-[1.02] max-w-[22ch] text-balance"
                >
                  Six categories.{" "}
                  <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                    Twenty-six
                  </span>{" "}
                  always-on flows.
                </h2>
              </div>
              <div className="md:col-span-3 md:text-right">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted leading-relaxed">
                  <span className="inline-block w-1.5 h-1.5 bg-brand-yellow mr-2 align-middle" />
                  Built once
                  <br />
                  Earning forever
                </p>
              </div>
            </div>

            <ol className="grid md:grid-cols-2 lg:grid-cols-3 border-l border-t border-ink-headline/15">
              {FLOW_LIBRARY.map((cat, i) => (
                <li
                  key={cat.category}
                  className="group relative p-8 md:p-10 border-r border-b border-ink-headline/15 flex flex-col transition-colors duration-hover hover:bg-bg-secondary"
                >
                  <div className="flex items-baseline justify-between gap-6 mb-6">
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-headline">
                      {String(i + 1).padStart(2, "0")} /{" "}
                      {String(FLOW_LIBRARY.length).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                      {cat.flows.length} flows
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
                    {cat.flows.map((flow) => (
                      <li
                        key={flow}
                        className="font-body text-body-sm text-ink-body leading-[1.55] flex items-baseline gap-3"
                      >
                        <span
                          aria-hidden="true"
                          className="text-brand-yellow text-[10px]"
                        >
                          ▸
                        </span>
                        <span>{flow}</span>
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
                  Five layers beneath every{" "}
                  <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                    sent email
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
                    self-running program
                  </span>
                  .
                </h2>
              </div>
              <div className="md:col-span-3 md:text-right">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted leading-relaxed">
                  <span className="inline-block w-1.5 h-1.5 bg-brand-yellow mr-2 align-middle" />
                  6 phases · 12 weeks
                  <br />
                  Foundation live in 21d
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
          aria-labelledby="lifecycle-logos-heading"
        >
          <div className="container-layout py-16 md:py-20">
            <p
              id="lifecycle-logos-heading"
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-10"
            >
              Brands we&rsquo;ve built lifecycle programs for
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
                  earns
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
                  Industries we run lifecycle for
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
                  <p className="font-body text-body text-ink-body leading-relaxed mt-4 max-w-[60ch]">
                    {faq.answer}
                  </p>
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
              Build a lifecycle that{" "}
              <span className="bg-brand-yellow text-ink-headline px-3 py-0.5 box-decoration-clone">
                earns while you sleep
              </span>
              .
            </h2>

            <div className="grid md:grid-cols-12 gap-8 md:gap-16 pt-10 border-t border-white/15 items-center">
              <div className="md:col-span-7">
                <p className="font-body text-body-lg text-white/80 leading-[1.5] max-w-[52ch]">
                  A 45-minute paid lifecycle audit. We pull your last 90 days of
                  sends, score your flow library, and map the revenue gap.
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
