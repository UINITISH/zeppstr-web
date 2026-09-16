import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/meta";
import { GlobalNav } from "@/components/nav/GlobalNav";
import { Footer } from "@/components/nav/Footer";
import { GridOverlay } from "@/components/blocks/GridOverlay";
import { CreatorTierLadder } from "@/components/utility/CreatorTierLadder";

// ─────────────────────────────────────────────
// Influencer & Creator Partnership sub-service page.
// Distinct section shape from Brand Identity page —
// uses a Comparison block, Tier system, and Stack rather than Symptoms / Principles / Layers.
// ─────────────────────────────────────────────

export const metadata: Metadata = buildMetadata({
  title:
    "Influencer & Creator Partnerships — Brand, Engagement & Lifecycle | Zeppstr",
  description:
    "Most creator programs are media buys in disguise. We build them as growth assets — discovered, briefed, owned, measured, and indexed against the channels you already run.",
  path: "/solutions/brand-engagement-lifecycle/influencer-partnerships",
})

// ─── Content ───

const FEATURED_LOGOS = [
  { name: "Mini Leaves", file: "mini-leaves.png" },
  { name: "Wise Market", file: "wise-market.png" },
  { name: "My Keto Co", file: "my-keto-co.png" },
  { name: "Tristar Online", file: "tristar-online.png" },
  { name: "Sky Phonez", file: "sky-phonez.png" },
  { name: "Pacer", file: "pacer.png" },
  { name: "Lucky White Goods", file: "lucky-white-goods.png" },
  { name: "Empuls", file: "empuls.png" },
];

// Comparison rows — "Most agencies" vs "How we run it"
const COMPARISON = [
  {
    them: "Optimize for follower count.",
    us: "Optimize for conversion-per-impression.",
  },
  {
    them: "Pay for a post. Lose the rights in 30 days.",
    us: "Pay for performance-indexed assets. Keep the rights for 18 months.",
  },
  {
    them: "Rent borrowed time on someone else’s platform.",
    us: "Build owned media you re-use across paid, lifecycle, and sales.",
  },
  {
    them: "Track impressions and engagement.",
    us: "Track attributed revenue, repeat purchase, and modeled lift.",
  },
  {
    them: "Run 30-day campaigns. Move on.",
    us: "Run 12-month relationships. Compound the third and fourth deal.",
  },
  {
    them: "Send a 20-page brief. Pray.",
    us: "Send a one-page brief. Co-produce. Sign off twice.",
  },
];

// 4 principles — different from Brand Identity's
const PRINCIPLES = [
  {
    n: "01",
    title: "The post is rented. The rights are owned.",
    body: "Most spend buys 30 days of attention. The real asset is the 18 months of usage rights on the creative — repurposed across paid, lifecycle, and sales.",
  },
  {
    n: "02",
    title: "Reach is vanity. CPI is the unit.",
    body: "One million views with no attribution is a media buy that didn&rsquo;t run. Three hundred conversions on a hundred thousand views is a partnership that worked.",
  },
  {
    n: "03",
    title: "We don&rsquo;t pay for posts.",
    body: "Deal structure: paid floor + performance bonus + 18-month rights. Same total cost, different incentive alignment. The creator gets paid more when the work performs.",
  },
  {
    n: "04",
    title: "Partnership, not campaign.",
    body: "A 30-day deal with a creator is a media buy in disguise. A 12-month relationship with three creators is a moat — by deal four, you&rsquo;re paying half and earning twice.",
  },
];

// The Stack — 5 operational layers of a creator partnership
const STACK_LAYERS = [
  {
    name: "Discovery",
    format: "Long-list 80 · Short-list 20 · Vet 12",
    description:
      "Vertical fit, audience overlap with your high-LTV cohort, and prior conversion history — not raw follower count. The part most brands underspec.",
  },
  {
    name: "Brief",
    format: "1-page · 3 non-negotiables · 1 hook",
    description:
      "Creator latitude on craft, brand non-negotiables on substance, performance hooks on structure. Twenty-page decks die in the inbox.",
  },
  {
    name: "Rights",
    format: "18-month usage · Exclusivity · Bonus",
    description:
      "An 18-month rights baseline as standard rather than the short window most creator deals default to, category exclusivity windows, and a performance bonus tied to attributed revenue.",
  },
  {
    name: "Distribution",
    format: "Creator post + Paid amp + Owned repost",
    description:
      "The post is the start. Paid amplification on the creator&rsquo;s handle, repost on your owned channels, and conversion-asset rebuild for paid social.",
  },
  {
    name: "Measurement",
    format: "Code · Link · Modeled lift · Repeat",
    description:
      "Layered attribution: coupon code, tracked link, modeled lift against control, and the 90-day repeat-purchase rate. Single-touch attribution lies.",
  },
];

// 6 process phases — week-numbered, creator-specific
const PROCESS_PHASES = [
  {
    title: "Brief & Vertical Lock",
    duration: "Week 1",
    body: "Audience, message, conversion event. Locked in writing before discovery starts. This is the part that prevents a $50K spend on the wrong creator.",
  },
  {
    title: "Discovery & Screen",
    duration: "Week 2–3",
    body: "Long-list 80 candidates. Short-list 20 by audience overlap. Vet 12 by past conversion data and brand fit. You meet the final 12.",
  },
  {
    title: "Outreach & Negotiation",
    duration: "Week 3–4",
    body: "Brief sent. Terms negotiated to our deal structure (paid + perf + rights). Contracts signed. Exclusivity windows locked.",
  },
  {
    title: "Production & Sign-off",
    duration: "Week 5–6",
    body: "Creator produces. We give brand-fidelity feedback, not creative-direction feedback. You sign off once on script, once on cut.",
  },
  {
    title: "Distribution & Amplification",
    duration: "Week 7–8",
    body: "Live posts. Paid amplification on the creator&rsquo;s handle. Owned-channel repost. Cuts adapted for paid social and lifecycle email.",
  },
  {
    title: "Measurement & Renewal",
    duration: "Week 9–12",
    body: "Attribution measured against control. Top performers renewed for next quarter under improved terms. Underperformers paid out and parked.",
  },
];

const PRACTICE_NUMBERS = [
  {
    figure: "Owned",
    metric: "Creative you keep, not impressions you rent",
    detail:
      "The measurable asset is the usage rights: creator-led work that can run as paid media long after the post itself has stopped being served.",
    client: "Zeppstr — what we negotiate for",
  },
  {
    figure: "18 months",
    metric: "Usage rights baseline",
    detail:
      "The usage window we negotiate as standard, so creative that performs can keep running as paid media rather than expiring the month it was posted.",
    client: "Zeppstr standard",
  },
  {
    figure: "1 + 3 + 8",
    metric: "Anchor · Resonance · Niche",
    detail:
      "Standard quarterly creator mix — one anchor for hero creative, three for mid-funnel signal, eight for compounding niche.",
    client: "Per partner, per quarter",
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
    question: "Do you find the creators, or do we?",
    answer:
      "We do. Discovery is the part most brands underspec, and the part that decides whether the program compounds or stalls. We long-list 80, short-list 20, vet 12.",
  },
  {
    question: "Flat fee or performance — what’s the deal structure?",
    answer:
      "Both. Paid floor + performance bonus + 18-month rights is the baseline we negotiate against. Same total cost, different incentive alignment — the creator gets paid more when the work performs.",
  },
  {
    question: "Can you run this if we already work with creators?",
    answer:
      "Yes. Often the first move is renegotiating existing deals to retain rights, add performance hooks, and tier them — Anchor / Resonance / Niche — instead of treating every creator as the same line item.",
  },
  {
    question: "Do you handle UGC, affiliate, and employee creators too?",
    answer:
      "UGC and affiliate sit inside the Resonance and Niche tiers — same operating model, lower production weight. Employee creators are a separate workstream we’ll scope if relevant.",
  },
  {
    question: "What attribution model do you use?",
    answer:
      "Layered, not single-touch. Coupon code, tracked link, modeled lift against control cohort, and 90-day repeat-purchase. Each layer answers a different question; together they don’t lie.",
  },
  {
    question: "What does it cost?",
    answer:
      "Programs start at ₹12L per quarter for the 12-creator mix (1 anchor + 3 resonance + 8 niche). Excludes creator fees themselves — we negotiate, you pay direct so there&rsquo;s no markup.",
  },
];

// ─────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────

export default function InfluencerCreatorPartnershipPage() {
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
            <li className="text-ink-headline">Influencer & Creator Partnership</li>
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
                  Most creator programs are{" "}
                  <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                    media buys
                  </span>{" "}
                  in disguise.
                </h1>

                <p className="font-body text-body-lg text-ink-body leading-[1.55] max-w-[54ch] mb-10">
                  We build them as growth assets &mdash; discovered, briefed,
                  owned, measured, and indexed against the channels you already
                  run.
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    href="/book-consultation"
                    className="inline-flex items-center gap-3 bg-brand-yellow text-ink-headline font-display font-light text-display-xs px-8 py-4 hover:bg-emerald-900 hover:text-white transition-colors duration-hover"
                  >
                    <span>Apply for a creator audit</span>
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

              {/* Right — tier ladder graphic */}
              <div className="md:col-span-5 flex items-center justify-center pt-8 md:pt-0">
                <CreatorTierLadder />
              </div>
            </div>
          </div>
        </section>

        {/* ─── 2. COMPARISON BLOCK — Most agencies vs How we run it ─── */}
        <section
          className="bg-emerald-900 text-white"
          aria-labelledby="comparison-heading"
        >
          <div className="container-layout py-24 md:py-32">
            <div className="grid md:grid-cols-12 gap-8 md:gap-16 mb-14 md:mb-20 items-end">
              <div className="md:col-span-9">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60 mb-6">
                  How the work is different
                </p>
                <h2
                  id="comparison-heading"
                  className="font-bold tracking-[-0.025em] text-display-lg text-white leading-[1.05] max-w-[22ch] text-balance"
                >
                  Same spend.{" "}
                  <span className="bg-brand-yellow text-ink-headline px-3 py-0.5 box-decoration-clone">
                    Different
                  </span>{" "}
                  scorecard.
                </h2>
              </div>
              <div className="md:col-span-3 md:text-right">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60 leading-relaxed">
                  <span className="inline-block w-1.5 h-1.5 bg-brand-yellow mr-2 align-middle" />
                  6 decisions
                  <br />
                  reframed
                </p>
              </div>
            </div>

            {/* Header row */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 pb-4 border-b border-white/20 mb-2">
              <div className="md:col-span-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                #
              </div>
              <div className="md:col-span-5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                Most agencies
              </div>
              <div className="md:col-span-1 hidden md:block" />
              <div className="md:col-span-5 font-mono text-[10px] uppercase tracking-[0.2em] text-brand-yellow">
                How we run it
              </div>
            </div>

            <ol>
              {COMPARISON.map((row, i) => (
                <li
                  key={i}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 py-6 md:py-7 border-b border-white/15 items-baseline"
                >
                  <div className="md:col-span-1 font-mono text-[11px] uppercase tracking-[0.2em] text-brand-yellow">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="md:col-span-5">
                    <p className="font-body text-body text-white/55 leading-[1.5] line-through decoration-white/30">
                      {row.them}
                    </p>
                  </div>
                  <div
                    aria-hidden="true"
                    className="hidden md:flex md:col-span-1 justify-center text-white/40 text-[20px]"
                  >
                    →
                  </div>
                  <div className="md:col-span-5">
                    <p className="font-display font-light text-display-xs text-white leading-[1.4] tracking-[-0.005em]">
                      {row.us}
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
                  negotiate from
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

        {/* ─── 4. THE STACK — 5 operational layers ─── */}
        <section
          className="bg-bg-primary border-b border-ink-headline/10"
          aria-labelledby="stack-heading"
        >
          <div className="container-layout py-24 md:py-32">
            <div className="grid md:grid-cols-12 gap-8 md:gap-16 mb-16 md:mb-20 items-end">
              <div className="md:col-span-9">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-6">
                  The stack
                </p>
                <h2
                  id="stack-heading"
                  className="font-bold tracking-[-0.025em] text-display-xl text-ink-headline leading-[1.02] max-w-[22ch] text-balance"
                >
                  Five layers between{" "}
                  <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                    brief and revenue
                  </span>
                  .
                </h2>
              </div>
              <div className="md:col-span-3 md:text-right">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted leading-relaxed">
                  <span className="inline-block w-1.5 h-1.5 bg-brand-yellow mr-2 align-middle" />
                  5 layers
                  <br />
                  1 operating model
                </p>
              </div>
            </div>

            <ol className="border-t border-ink-headline/15">
              {STACK_LAYERS.map((layer, i) => (
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

        {/* ─── 5. PROCESS — 12-week, 6 phases ─── */}
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
                  className="font-bold tracking-[-0.025em] text-display-xl text-ink-headline leading-[1.02] max-w-[24ch] text-balance"
                >
                  Twelve weeks from brief to{" "}
                  <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                    measured outcome
                  </span>
                  .
                </h2>
              </div>
              <div className="md:col-span-3 md:text-right">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted leading-relaxed">
                  <span className="inline-block w-1.5 h-1.5 bg-brand-yellow mr-2 align-middle" />
                  6 phases · 12 weeks
                  <br />
                  Then quarterly renewal
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

        {/* ─── 6. LOGO STRIP ─── */}
        <section
          className="bg-bg-primary border-b border-ink-headline/10"
          aria-labelledby="creator-logos-heading"
        >
          <div className="container-layout py-16 md:py-20">
            <p
              id="creator-logos-heading"
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-10"
            >
              Brands we&rsquo;ve run creator programs for
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

        {/* ─── 7. PRACTICE NUMBERS ─── */}
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

        {/* ─── 8. INDUSTRIES ─── */}
        <section className="bg-bg-primary border-b border-ink-headline/10">
          <div className="container-layout py-20 md:py-24">
            <div className="grid md:grid-cols-12 gap-8 md:gap-16 items-baseline">
              <div className="md:col-span-3">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
                  Industries we run creator programs for
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

        {/* ─── 9. FAQ ─── */}
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

        {/* ─── 10. BOTTOM CTA — green brand block ─── */}
        <section className="relative z-10 bg-emerald-900 text-white">
          <div className="container-layout py-32 md:py-48">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/70 mb-12">
              Engage
            </p>

            <h2 className="font-bold tracking-[-0.025em] text-display-stat leading-[1.02] max-w-[22ch] mb-16 md:mb-24 text-white text-balance">
              Build a creator program that{" "}
              <span className="bg-brand-yellow text-ink-headline px-3 py-0.5 box-decoration-clone">
                compounds
              </span>
              .
            </h2>

            <div className="grid md:grid-cols-12 gap-8 md:gap-16 pt-10 border-t border-white/15 items-center">
              <div className="md:col-span-7">
                <p className="font-body text-body-lg text-white/80 leading-[1.5] max-w-[52ch]">
                  A 45-minute paid creator audit. We map your current spend,
                  your owned-channel overlap, and the partnership gaps. Refunded
                  in full if we&rsquo;re not the right fit.
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
