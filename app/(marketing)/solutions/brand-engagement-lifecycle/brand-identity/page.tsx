import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/meta";
import { GlobalNav } from "@/components/nav/GlobalNav";
import { Footer } from "@/components/nav/Footer";
import { GridOverlay } from "@/components/blocks/GridOverlay";
import { BrandIdentitySystem } from "@/components/utility/BrandIdentitySystem";

// ─────────────────────────────────────────────
// Brand Identity sub-service page.
// Distinct content shape from the parent solution page —
// identity-specific symptoms, principles, and process.
// ─────────────────────────────────────────────

export const metadata: Metadata = buildMetadata({
  title: "Brand Identity — Brand, Engagement & Lifecycle | Zeppstr",
  description:
    "Most identity projects solve the wrong problem. They optimize for how the brand looks in a deck — not how it performs in a paid ad, a checkout page, or a sales call. We design for the second one.",
  path: "/solutions/brand-engagement-lifecycle/brand-identity",
})

// ─── Content ───

const FEATURED_LOGOS = [
  { name: "Mini Leaves", file: "mini-leaves.png" },
  { name: "Wise Market", file: "wise-market.png" },
  { name: "Tru Aquapolis", file: "tru-aquapolis.png" },
  { name: "Aishwarya Interiors", file: "aishwarya-interiors.png" },
  { name: "My Keto Co", file: "my-keto-co.png" },
  { name: "Tristar Online", file: "tristar-online.png" },
  { name: "Prohance", file: "prohance.png" },
  { name: "Lucky White Goods", file: "lucky-white-goods.png" },
];

// 6 identity layers — what's actually in the system (not "practice deliverables")
const SYSTEM_LAYERS = [
  {
    name: "Mark System",
    format: "Primary · Secondary · Monogram · App icon",
    description:
      "Not one logo. A family — primary mark, alternate, monogram, lockups, favicon, app icon. Built so every surface gets the right version.",
  },
  {
    name: "Type System",
    format: "Display · Body · Functional · Numerical",
    description:
      "A four-tier type hierarchy with usage rules per surface. Includes the only fonts we license, sizes, leading, and the cases where bold actually does work.",
  },
  {
    name: "Color System",
    format: "Brand · Action · Status · Surface · Ink",
    description:
      "Semantic, not decorative. Every hex has a job — what it means, where it goes, and which channel it&rsquo;s tested for contrast on.",
  },
  {
    name: "Voice Doc",
    format: "Principles · Modes · Anti-patterns",
    description:
      "Voice as behavior, not a tone-of-voice paragraph. Four named modes, sentence-level examples, and the ten things the brand never says.",
  },
  {
    name: "Motion + Photography",
    format: "Direction · Reference · Don&rsquo;ts",
    description:
      "How the identity moves and what it depicts. Motion primitives, photography direction, and a no-go list that ends the stock-photo era.",
  },
  {
    name: "Application Templates",
    format: "Ads · Email · Social · Sales · Product",
    description:
      "Production-ready templates for every channel your teams ship from. Built so a junior designer can produce on-brand work on day one.",
  },
];

// 7 symptoms — diagnostic teaser specific to identity
const IDENTITY_SYMPTOMS = [
  "Your paid creative looks like a different company than your lifecycle emails.",
  "Your sales deck has its own font palette.",
  "Your product team has rebuilt the brand colors twice this year.",
  "Your social grid looks fine month-to-month but unrecognizable year-to-year.",
  "Your customer support sounds like a different company than your founder.",
  "Your photography is stock from three different sites.",
  "Your brand book is from 2022 and nobody opens it.",
];

// 4 principles — how we design identity
const PRINCIPLES = [
  {
    n: "01",
    title: "Identity is operated, not framed.",
    body: "A brand book that lives in a Figma file nobody opens is not an identity. The system has to survive Monday morning, every Monday morning.",
  },
  {
    n: "02",
    title: "The mark serves the system.",
    body: "Most identity projects start with the logo and let the rest drift. We start with the system and let the mark earn its place inside it.",
  },
  {
    n: "03",
    title: "Voice is a behavior.",
    body: "A tone-of-voice paragraph doesn&rsquo;t change how anyone writes. Named voice modes and sentence-level examples do.",
  },
  {
    n: "04",
    title: "If a junior can&rsquo;t ship from it, it failed.",
    body: "The test for a brand operating system isn&rsquo;t whether the founders approve it. It&rsquo;s whether a new designer can produce on-brand work in week one.",
  },
];

// 6 identity-specific phases — not the generic 4
const PROCESS_PHASES = [
  {
    title: "Identity Audit",
    duration: "Week 1–2",
    body: "Every existing identity surface scored for consistency, performance, and decay. Written diagnostic — what’s working, what’s leaking, what’s drifting.",
  },
  {
    title: "Positioning Lock",
    duration: "Week 3",
    body: "One sentence we’ll design from. Until this is signed by the founder, no visual work begins. This is the part most agencies skip.",
  },
  {
    title: "System Composition",
    duration: "Week 4–7",
    body: "Mark, type, color, voice — designed as one composition, not four parallel workstreams. Reviewed weekly. Decisions made, not deferred.",
  },
  {
    title: "Production Build",
    duration: "Week 8–10",
    body: "Every artifact built in production format. Source files. Design tokens. Code variables. Copy in markdown. No deck that can’t be shipped.",
  },
  {
    title: "Application + Handoff",
    duration: "Week 11–12",
    body: "Rolled out across paid, lifecycle, product, sales. Legacy assets retired or migrated. The system goes live, in public, with your team trained.",
  },
  {
    title: "90-Day Governance",
    duration: "Month 4–6",
    body: "We watch for drift, catch it, fix it. After that, your team has the muscle to maintain it — or we stay on as the parent practice retainer.",
  },
];

const PRACTICE_NUMBERS = [
  {
    figure: "Every surface",
    metric: "Documented, not just the logo sheet",
    detail:
      "A brand book that covers the mark and two lockups leaves every other surface to be invented on the fly — ad formats, email, sales decks, packaging, the site. Those are where the brand is actually seen.",
    client: "Zeppstr — scope of the system",
  },
  {
    figure: "One toolkit",
    metric: "Paid, lifecycle and sales stop re-making the same asset",
    detail:
      "The deliverable is the application system, not the logo. Once it ships, downstream teams build from it instead of reinterpreting the brand each time.",
    client: "Zeppstr — what we deliver",
  },
  {
    figure: "Rebuild",
    metric: "The usual starting point, not a blank page",
    detail:
      "Most businesses already have an identity. It just isn&rsquo;t operating. We come in when paid, lifecycle and sales each have their own version of the brand.",
    client: "Zeppstr — engagement model",
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
    question: "Is this just a logo project?",
    answer:
      "No. The logo is one artifact in a system of about forty. If your engagement ends with a logo, you bought the wrong thing.",
  },
  {
    question: "Rebrand or new identity — which do you do?",
    answer:
      "Mostly rebrands. Nine of ten engagements are operators who already have an identity that’s stopped operating. We rarely build a brand from a blank canvas.",
  },
  {
    question: "How is this different from hiring a branding agency?",
    answer:
      "Branding agencies optimize for the brand book. We optimize for what the brand book produces downstream — across paid, lifecycle, product, and sales. Same craft, different scorecard.",
  },
  {
    question: "Can we engage you for identity alone?",
    answer:
      "Yes, but identity in isolation tends to revert within 18 months. We usually pair it with lifecycle and content governance under the parent practice retainer.",
  },
  {
    question: "What does it cost?",
    answer:
      "Brand Operating System builds start at ₹18L for the 12-week engagement. Governance is included inside the parent practice retainer. Fixed scope, quoted after the audit.",
  },
  {
    question: "What if our team is the bottleneck, not the identity?",
    answer:
      "The audit will tell us that. If your problem is operating capacity rather than the identity itself, we’ll say so — and recommend Lifecycle or Content Operations instead.",
  },
];

// ─────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────

export default function BrandIdentityPage() {
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
            <li className="text-ink-headline">Brand Identity</li>
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
                  Most identities solve the{" "}
                  <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                    wrong problem
                  </span>
                  .
                </h1>

                <p className="font-body text-body-lg text-ink-body leading-[1.55] max-w-[54ch] mb-10">
                  They optimize for how the brand looks in a deck &mdash; not
                  how it performs in a paid ad, a checkout page, or a sales
                  call. We design for the second one.
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    href="/book-consultation"
                    className="inline-flex items-center gap-3 bg-brand-yellow text-ink-headline font-display font-light text-display-xs px-8 py-4 hover:bg-emerald-900 hover:text-white transition-colors duration-hover"
                  >
                    <span>Apply for an identity audit</span>
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

              {/* Right — system graphic */}
              <div className="md:col-span-5 flex items-center justify-center pt-8 md:pt-0">
                <BrandIdentitySystem />
              </div>
            </div>
          </div>
        </section>

        {/* ─── 2. SYMPTOMS — identity-specific diagnostic teaser ─── */}
        <section
          className="bg-emerald-900 text-white"
          aria-labelledby="symptoms-heading"
        >
          <div className="container-layout py-24 md:py-32">
            <div className="grid md:grid-cols-12 gap-8 md:gap-16">
              <div className="md:col-span-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60 mb-6">
                  Diagnostic
                </p>
                <h2
                  id="symptoms-heading"
                  className="font-bold tracking-[-0.025em] text-display-lg text-white leading-[1.05] max-w-[16ch] text-balance mb-8"
                >
                  Is your identity{" "}
                  <span className="bg-brand-yellow text-ink-headline px-3 py-0.5 box-decoration-clone">
                    leaking
                  </span>
                  ?
                </h2>
                <p className="font-body text-body text-white/75 leading-[1.6] max-w-[40ch]">
                  Seven symptoms we look for in the audit. Nod at two and
                  you&rsquo;re likely paying a tax on every paid impression
                  downstream.
                </p>
              </div>

              <ol className="md:col-span-8">
                {IDENTITY_SYMPTOMS.map((symptom, i) => (
                  <li
                    key={symptom}
                    className="grid grid-cols-[auto_1fr] gap-6 md:gap-8 items-baseline py-5 md:py-6 border-b border-white/15"
                  >
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-yellow w-10">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="font-display font-light text-display-xs text-white leading-[1.3] tracking-[-0.005em]">
                      {symptom}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ─── 3. PRINCIPLES — how we design identity ─── */}
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
                className="font-bold tracking-[-0.025em] text-display-xl text-ink-headline leading-[1.02] max-w-[20ch] text-balance"
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
                    <h3 className="font-display font-bold text-display-md text-ink-headline tracking-[-0.02em] leading-[1.12] mb-4 max-w-[22ch]">
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

        {/* ─── 4. WHAT'S IN THE SYSTEM — 6 layers ─── */}
        <section
          className="bg-bg-primary border-b border-ink-headline/10"
          aria-labelledby="system-heading"
        >
          <div className="container-layout py-24 md:py-32">
            <div className="grid md:grid-cols-12 gap-8 md:gap-16 mb-16 md:mb-20 items-end">
              <div className="md:col-span-9">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-6">
                  The system
                </p>
                <h2
                  id="system-heading"
                  className="font-bold tracking-[-0.025em] text-display-xl text-ink-headline leading-[1.02] max-w-[22ch] text-balance"
                >
                  Six layers of an identity that{" "}
                  <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                    compounds
                  </span>
                  .
                </h2>
              </div>
              <div className="md:col-span-3 md:text-right">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted leading-relaxed">
                  <span className="inline-block w-1.5 h-1.5 bg-brand-yellow mr-2 align-middle" />
                  6 layers
                  <br />
                  47 touchpoints
                  <br />
                  1 operating system
                </p>
              </div>
            </div>

            <ol className="grid md:grid-cols-2 lg:grid-cols-3 border-l border-t border-ink-headline/15">
              {SYSTEM_LAYERS.map((layer, i) => (
                <li
                  key={layer.name}
                  className="group relative p-8 md:p-10 border-r border-b border-ink-headline/15 flex flex-col transition-colors duration-hover hover:bg-bg-secondary"
                >
                  <div className="flex items-baseline justify-between gap-6 mb-7">
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-headline">
                      {String(i + 1).padStart(2, "0")} /{" "}
                      {String(SYSTEM_LAYERS.length).padStart(2, "0")}
                    </span>
                    <span
                      className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted text-right max-w-[20ch]"
                      dangerouslySetInnerHTML={{ __html: layer.format }}
                    />
                  </div>
                  <span
                    aria-hidden="true"
                    className="block w-3 h-3 bg-brand-yellow mb-5"
                  />
                  <h3 className="font-display font-bold text-display-sm text-ink-headline tracking-[-0.02em] leading-[1.15] mb-3 max-w-[22ch]">
                    {layer.name}
                  </h3>
                  <p
                    className="font-body text-body text-ink-body leading-relaxed max-w-[44ch]"
                    dangerouslySetInnerHTML={{ __html: layer.description }}
                  />
                  <span
                    aria-hidden="true"
                    className="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-brand-yellow scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-hover"
                  />
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ─── 5. PROCESS — 6 identity-specific phases (week-numbered) ─── */}
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
                  className="font-bold tracking-[-0.025em] text-display-xl text-ink-headline leading-[1.02] max-w-[22ch] text-balance"
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
                  +90-day governance
                </p>
              </div>
            </div>

            {/* Horizontal timeline-style list */}
            <ol className="border-t border-ink-headline/15">
              {PROCESS_PHASES.map((phase, i) => (
                <li
                  key={phase.title}
                  className="group grid md:grid-cols-12 gap-6 md:gap-8 py-8 md:py-10 border-b border-ink-headline/15"
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
                      {phase.title}
                    </h3>
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
                      {phase.duration}
                    </p>
                  </div>
                  <div className="md:col-span-6">
                    <p className="font-body text-body text-ink-body leading-[1.6] max-w-[52ch]">
                      {phase.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ─── 6. LOGO STRIP ─── */}
        <section
          className="bg-bg-primary border-b border-ink-headline/10"
          aria-labelledby="brand-identity-logos-heading"
        >
          <div className="container-layout py-16 md:py-20">
            <p
              id="brand-identity-logos-heading"
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-10"
            >
              Identities we&rsquo;ve built and rebuilt
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
                className="font-bold tracking-[-0.025em] text-display-xl text-ink-headline leading-[1.02] max-w-[20ch] text-balance"
              >
                What the work has{" "}
                <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                  produced
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

        {/* ─── 8. INDUSTRIES ─── */}
        <section className="bg-bg-primary border-b border-ink-headline/10">
          <div className="container-layout py-20 md:py-24">
            <div className="grid md:grid-cols-12 gap-8 md:gap-16 items-baseline">
              <div className="md:col-span-3">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
                  Industries we build identity for
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
                  <p className="font-body text-body text-ink-body leading-relaxed mt-4 max-w-[60ch]">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 10. BOTTOM CTA — green brand block, identity-specific ─── */}
        <section className="relative z-10 bg-emerald-900 text-white">
          <div className="container-layout py-32 md:py-48">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/70 mb-12">
              Engage
            </p>

            <h2 className="font-bold tracking-[-0.025em] text-display-stat leading-[1.02] max-w-[20ch] mb-16 md:mb-24 text-white text-balance">
              Your identity is{" "}
              <span className="bg-brand-yellow text-ink-headline px-3 py-0.5 box-decoration-clone">
                leaking
              </span>
              . Let us audit it.
            </h2>

            <div className="grid md:grid-cols-12 gap-8 md:gap-16 pt-10 border-t border-white/15 items-center">
              <div className="md:col-span-7">
                <p className="font-body text-body-lg text-white/80 leading-[1.5] max-w-[52ch]">
                  A 45-minute paid identity audit. Refunded in full if
                  we&rsquo;re not the right fit. Three slots a quarter, by
                  intention.
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
