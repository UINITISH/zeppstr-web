import Link from "next/link";
import Image from "next/image";
import { GlobalNav } from "@/components/nav/GlobalNav";
import { Footer } from "@/components/nav/Footer";
import { CTABanner } from "@/components/blocks/CTABanner";
import { AttributionGap } from "@/components/work/CaseCharts";

/**
 * TRU AQUAPOLIS — bespoke case-study layout (redesigned 17 Nov 2026).
 *
 * Replaces the generic [slug] template for this one case. The generic page
 * ran ~7,000px of prose; this layout leads with the arithmetic and gives each
 * section of the story its own visual form.
 *
 * SOURCING RULE: every figure on this page comes from
 * deliverables/content/case-studies/tru-aquapolis.md and the founder-confirmed
 * numbers in scripts/seed/data/case-studies.ts. Do not add a figure that is not
 * in those files. CRM data is under NDA: no screenshots, no quotes from it.
 *
 * CLAIM BOUNDARY: Zeppstr ran acquisition and qualification; TRU's own sales
 * team closed. The headline says "sold from leads we generated", never "we sold".
 */

const FUNNEL = [
  { value: "₹1.4 Cr", label: "Media invested", sub: "Meta + Google, Jan–Aug 2026", width: 100 },
  { value: "6,000+", label: "Leads generated", sub: "₹2,333 blended cost per lead", width: 86 },
  { value: "~4,200", label: "Qualified & handed over", sub: "70%+ cleared screening", width: 70 },
  { value: "75", label: "Apartments closed", sub: "1.8% close rate on qualified · by TRU's sales team", width: 38 },
];

const DIAGNOSIS = [
  { value: "0", vs: "vs 147", label: "Platform-recorded conversions in February, against 147 leads sitting in the CRM. Smart Bidding was optimising against nothing." },
  { value: "70%", vs: "@ ₹101 CPC", label: "Of February's ₹6.5L Google spend went to one brand campaign." },
  { value: "All", vs: "paused", label: "Every campaign was paused at handover. The account was short of instrumentation, not budget." },
];

const MOVES = [
  {
    n: "01",
    title: "Build the awareness pool before chasing the lead",
    body: "A brand-reach campaign put the project in front of Bengaluru residents first — the cheapest brand presence the account has ever logged.",
    stat: "21.4 lakh",
    statLabel: "residents reached at ₹0.58 each",
  },
  {
    n: "02",
    title: "Win the high-intent searches",
    body: "Four disciplined Google campaigns, not forty. UHI · 4BHK · Whitefield delivered the account's strongest unit economics.",
    stat: "5.83%",
    statLabel: "CTR — roughly 2× the luxury real-estate benchmark",
  },
  {
    n: "03",
    title: "Let creatives compete, then consolidate",
    body: "Thirty-three Meta creatives tested; two survived. Demand Gen was killed on data inside 21 days.",
    stat: "33 → 2",
    statLabel: "creatives; the top two carried half of May's leads",
  },
  {
    n: "04",
    title: "Qualify before handing over",
    body: "Every lead screened for budget band, configuration fit, contactability and real intent. The 30% that failed never reached TRU's sales desk.",
    stat: "70%",
    statLabel: "of leads cleared screening",
  },
  {
    n: "05",
    title: "Make the brand visible everywhere",
    body: "Organic social ran alongside paid, so every ad landed on a brand that already looked active.",
    stat: "131",
    statLabel: "organic pieces in two months · 106 stories, 13 posts, 12 reels",
  },
];

const TIMELINE = [
  { month: "Feb", title: "Inherited baseline", body: "Tracking broken. ₹4.6L wasted on one brand campaign at ₹101 CPC." },
  { month: "Mar", title: "Search reactivated", body: "Cost per lead down 44% month on month." },
  { month: "Apr", title: "Pruned", body: "Six underperformers cut in parallel. First real signal." },
  { month: "May", title: "Breakout", body: "948 enquiries in 31 days. Top four creatives absorbed 92% of spend." },
  { month: "Jun–Aug", title: "Compounding", body: "Spend scaled ~3.5× against a warm audience instead of restarting cold." },
];

const LESSONS = [
  {
    title: "Fix instrumentation before adding budget.",
    body: "147 CRM leads, zero recorded conversions. Every rupee added before that was fixed would have trained the bidding algorithm on noise.",
  },
  {
    title: "Qualification is where agency work should end — properly.",
    body: "6,000 raw leads would have buried the sales team. 4,200 screened ones let them sell. The 30% we withheld is the part nobody puts in a deck.",
  },
  {
    title: "The audience is the asset, not the quarter.",
    body: "A 31.7 lakh retargeting pool now exists, with expected CPL of ₹900–₹1,500 — under half the cost of cold acquisition.",
  },
];

const COMPETITORS = ["DLF", "Prestige", "Sobha", "Godrej", "Brigade", "Embassy"];

const SOLUTIONS = [
  { name: "Growth Strategy & Advisory", href: "/solutions/growth-strategy-advisory" },
  { name: "Performance Media", href: "/solutions/performance-media" },
  { name: "Experience Engineering", href: "/solutions/experience-engineering" },
];

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p
      className={`font-mono text-[11px] uppercase tracking-[0.2em] mb-6 ${
        light ? "text-white/60" : "text-ink-muted"
      }`}
    >
      {children}
    </p>
  );
}

export function TruAquapolisCase() {
  return (
    <>
      <GlobalNav />
      <main>
        {/* ── 1. HERO — dark brand green, the ratio up front ── */}
        <section className="bg-ink-headline text-white">
          <div className="container-layout pt-10 pb-32 md:pb-44">
            <nav aria-label="Breadcrumb" className="mb-14">
              <ol className="flex items-center gap-2 font-body text-body-sm text-white/60">
                <li>
                  <Link href="/work" className="hover:text-white transition-colors">
                    Work
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-white">Tru Aquapolis</li>
              </ol>
            </nav>

            <div className="grid md:grid-cols-12 gap-12 items-end">
              <div className="md:col-span-8">
                <Eyebrow light>Case study · Real estate · East Bengaluru</Eyebrow>
                <h1 className="font-bold tracking-[-0.03em] text-display-xl leading-[1.02] text-balance">
                  75 apartments sold from leads we generated, on{" "}
                  <span className="highlight-mark text-ink-headline">₹1.4 Cr</span> of media.
                </h1>
                <p className="mt-8 font-body text-body-lg text-white/75 max-w-[56ch] leading-relaxed">
                  Eight months of Meta and Google for a premium 3 &amp; 4 BHK lake-facing tower, in
                  India&apos;s most contested luxury corridor. ₹187.5 Cr in closed sales, with ₹50–60 Cr
                  still in pipeline.
                </p>
              </div>
              <div className="md:col-span-4 md:text-right">
                <p className="font-display font-extralight leading-none tracking-[-0.04em] text-[96px] md:text-[148px] text-brand-yellow">
                  134×
                </p>
                <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">
                  Media spend → closed sales
                </p>
              </div>
            </div>

            <dl className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6 border-t border-white/15 pt-8">
              {[
                ["Client", "TRU Aquapolis"],
                ["Duration", "Jan – Aug 2026"],
                ["Channels", "Meta · Google · Organic"],
                ["Our role", "Acquisition & qualification"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">{k}</dt>
                  <dd className="mt-2 font-body text-body text-white">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ── 2. SITE SCREENSHOT — overlaps the hero ── */}
        <section className="container-layout -mt-20 md:-mt-28 relative">
          <div className="rounded-xl overflow-hidden shadow-[0_30px_80px_-20px_rgba(15,61,46,0.45)] border border-ink-headline/10 bg-white">
            <div className="flex items-center gap-1.5 px-4 py-3 bg-bg-secondary border-b border-ink-headline/10">
              <span className="w-2.5 h-2.5 rounded-full bg-ink-headline/20" />
              <span className="w-2.5 h-2.5 rounded-full bg-ink-headline/20" />
              <span className="w-2.5 h-2.5 rounded-full bg-ink-headline/20" />
            </div>
            <div className="relative aspect-[16/9]">
              <Image
                src="/case-screenshots/tru-aquapolis.jpg"
                alt="TRU Aquapolis website"
                fill
                priority
                sizes="(min-width: 1280px) 1200px, 100vw"
                className="object-cover object-top"
                unoptimized
              />
            </div>
          </div>
        </section>

        {/* ── 3. THE ARITHMETIC — funnel ── */}
        <section className="container-layout py-24 md:py-32" aria-labelledby="arithmetic-heading">
          <div className="grid md:grid-cols-12 gap-12 mb-16">
            <div className="md:col-span-6">
              <Eyebrow>The arithmetic</Eyebrow>
              <h2
                id="arithmetic-heading"
                className="font-bold tracking-[-0.025em] text-display-lg text-ink-headline leading-[1.05] text-balance"
              >
                134× isn&apos;t a miracle. It&apos;s{" "}
                <span className="highlight-mark">ordinary</span> numbers on a ₹2.5 Cr ticket.
              </h2>
            </div>
            <p className="md:col-span-5 md:col-start-8 self-end font-body text-body-lg text-ink-body leading-relaxed">
              Any deck claiming a ratio like this without showing the middle of the funnel is asking
              you to take it on faith. So here is the middle.
            </p>
          </div>

          <ol className="space-y-3">
            {FUNNEL.map((f, i) => (
              <li key={f.label} className="grid md:grid-cols-12 gap-4 md:gap-8 items-center">
                <div className="md:col-span-8">
                  <div
                    className={`h-16 md:h-20 rounded-md flex items-center px-6 ${
                      i === FUNNEL.length - 1 ? "bg-brand-yellow" : "bg-ink-headline"
                    }`}
                    style={{ width: `${f.width}%` }}
                  >
                    <span
                      className={`font-display font-bold text-[28px] md:text-[36px] tracking-[-0.02em] ${
                        i === FUNNEL.length - 1 ? "text-ink-headline" : "text-white"
                      }`}
                    >
                      {f.value}
                    </span>
                  </div>
                </div>
                <div className="md:col-span-4">
                  <p className="font-body font-semibold text-body text-ink-headline">{f.label}</p>
                  <p className="font-body text-body-sm text-ink-muted">{f.sub}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-10 grid md:grid-cols-12 gap-8 items-center border-t border-ink-headline/15 pt-10">
            <p className="md:col-span-8 font-display font-extralight text-display-md text-ink-headline tracking-[-0.02em] leading-tight">
              75 × ₹2.5 Cr average ticket = <strong className="font-bold">₹187.5 Cr closed</strong>
            </p>
            <p className="md:col-span-4 font-body text-body-sm text-ink-body leading-relaxed">
              ₹2,333 per lead and a 1.8% close rate are unremarkable for ₹2.5 Cr property. That is
              the point — they are checkable.
            </p>
          </div>

          <p className="mt-10 rounded-md bg-bg-secondary border-l-4 border-brand-yellow px-6 py-5 font-body text-body-sm text-ink-body max-w-[80ch]">
            <strong className="text-ink-headline">The boundary, stated plainly:</strong> Zeppstr ran
            acquisition and qualification. TRU&apos;s in-house sales team closed every one of these 75
            units. We do not claim the close.
          </p>
        </section>

        {/* ── 4. SITUATION ── */}
        <section className="bg-bg-secondary border-y border-ink-headline/10">
          <div className="container-layout py-24 md:py-28 grid md:grid-cols-12 gap-12">
            <div className="md:col-span-5">
              <Eyebrow>The situation</Eyebrow>
              <h2 className="font-bold tracking-[-0.025em] text-display-lg text-ink-headline leading-[1.05] text-balance">
                In a market like this, presence is the only moat.
              </h2>
            </div>
            <div className="md:col-span-6 md:col-start-7 space-y-6 font-body text-body-lg text-ink-body leading-relaxed">
              <p>
                A premium 3 and 4 BHK lake-facing tower in East Bengaluru — where every major
                developer bids on the same intent, in the same postcodes.
              </p>
              <ul className="flex flex-wrap gap-2" aria-label="Competing developers">
                {COMPETITORS.map((c) => (
                  <li
                    key={c}
                    className="px-3 py-1.5 rounded-full border border-ink-headline/20 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-headline"
                  >
                    {c}
                  </li>
                ))}
              </ul>
              <p>
                The brief was narrow: qualified, in-market buyer enquiries at a cost the developer
                could underwrite against booking economics.{" "}
                <span className="text-ink-headline font-semibold">
                  Not impressions. Not engagement. Enquiries a sales team can call.
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* ── 5. DIAGNOSIS ── */}
        <section className="container-layout py-24 md:py-32">
          <Eyebrow>The diagnosis</Eyebrow>
          <h2 className="font-bold tracking-[-0.025em] text-display-lg text-ink-headline leading-[1.05] max-w-[22ch] text-balance mb-16">
            Not underperforming. <span className="highlight-mark">Structurally broken.</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-px bg-ink-headline/15 border border-ink-headline/15 rounded-lg overflow-hidden">
            {DIAGNOSIS.map((d) => (
              <div key={d.label} className="bg-white p-8 md:p-10">
                <p className="flex items-baseline gap-3">
                  <span className="font-display font-extralight text-[64px] leading-none tracking-[-0.03em] text-ink-headline">
                    {d.value}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-muted">
                    {d.vs}
                  </span>
                </p>
                <p className="mt-6 font-body text-body text-ink-body leading-relaxed">{d.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-16">
            <AttributionGap />
          </div>
        </section>

        {/* ── 6. WHAT WE DID — five moves ── */}
        <section className="bg-ink-headline text-white">
          <div className="container-layout py-24 md:py-32">
            <div className="grid md:grid-cols-12 gap-12 mb-16">
              <div className="md:col-span-7">
                <Eyebrow light>What we did</Eyebrow>
                <h2 className="font-bold tracking-[-0.025em] text-display-lg leading-[1.05] text-balance">
                  Five moves, in order. A stack, not a stunt.
                </h2>
              </div>
            </div>
            <ol className="border-t border-white/15">
              {MOVES.map((m) => (
                <li
                  key={m.n}
                  className="grid md:grid-cols-12 gap-6 md:gap-8 py-10 border-b border-white/15"
                >
                  <span className="md:col-span-1 font-mono text-[11px] uppercase tracking-[0.2em] text-brand-yellow pt-2">
                    {m.n}
                  </span>
                  <div className="md:col-span-6">
                    <h3 className="font-display font-bold text-[24px] md:text-[28px] tracking-[-0.02em] leading-tight">
                      {m.title}
                    </h3>
                    <p className="mt-3 font-body text-body text-white/70 leading-relaxed max-w-[52ch]">
                      {m.body}
                    </p>
                  </div>
                  <div className="md:col-span-4 md:col-start-9 md:text-right">
                    <p className="font-display font-extralight text-[48px] md:text-[56px] leading-none tracking-[-0.03em] text-brand-yellow">
                      {m.stat}
                    </p>
                    <p className="mt-2 font-body text-body-sm text-white/60">{m.statLabel}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── 7. MONTH BY MONTH ── */}
        <section className="container-layout py-24 md:py-32">
          <Eyebrow>Month by month</Eyebrow>
          <h2 className="font-bold tracking-[-0.025em] text-display-lg text-ink-headline leading-[1.05] max-w-[24ch] text-balance mb-16">
            From broken tracking to 948 enquiries in a month.
          </h2>
          <ol className="grid md:grid-cols-5 gap-6 md:gap-0">
            {TIMELINE.map((t, i) => (
              <li key={t.month} className="relative md:pr-6">
                <div className="flex items-center mb-6">
                  <span
                    className={`w-3.5 h-3.5 rounded-full shrink-0 ${
                      t.month === "May" ? "bg-brand-yellow ring-4 ring-brand-yellow/30" : "bg-ink-headline"
                    }`}
                  />
                  {i < TIMELINE.length - 1 && (
                    <span className="hidden md:block h-px flex-1 bg-ink-headline/20 ml-2" />
                  )}
                </div>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">{t.month}</p>
                <p className="mt-2 font-body font-semibold text-body-lg text-ink-headline">{t.title}</p>
                <p className="mt-2 font-body text-body-sm text-ink-body leading-relaxed">{t.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ── 8. FORECAST VS ACTUAL ── */}
        <section className="bg-bg-secondary border-y border-ink-headline/10">
          <div className="container-layout py-24 md:py-28 grid md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-5">
              <Eyebrow>The forecast we published</Eyebrow>
              <h2 className="font-bold tracking-[-0.025em] text-display-lg text-ink-headline leading-[1.05] text-balance">
                We&apos;d rather be corrected <span className="highlight-mark">upward.</span>
              </h2>
              <p className="mt-6 font-body text-body-lg text-ink-body leading-relaxed">
                At day 90 we published 1,690 qualified enquiries on ₹39.7L, and projected bookings at
                a 1% close rate — the conservative floor for premium real estate. Seventeen bookings
                was the number we were willing to defend.
              </p>
            </div>
            <div className="md:col-span-6 md:col-start-7 space-y-8">
              {[
                { label: "Close rate", f: "1.0%", a: "1.8%", fw: 39, aw: 70 },
                { label: "Units", f: "17 (day-90 estimate)", a: "75 (eight-month actual)", fw: 16, aw: 70 },
              ].map((r) => (
                <div key={r.label}>
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-3">
                    {r.label}
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-4">
                      <div className="h-9 rounded bg-ink-headline/20" style={{ width: `${r.fw}%` }} />
                      <span className="font-body text-body-sm text-ink-body whitespace-nowrap">
                        Forecast · {r.f}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="h-9 rounded bg-ink-headline" style={{ width: `${r.aw}%` }} />
                      <span className="font-body font-semibold text-body-sm text-ink-headline whitespace-nowrap">
                        Actual · {r.a}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 9. WHAT DROVE IT ── */}
        <section className="container-layout py-24 md:py-32">
          <Eyebrow>What drove it</Eyebrow>
          <div className="grid md:grid-cols-3 gap-12 md:gap-8">
            <div className="border-t-2 border-ink-headline pt-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">Channel split</p>
              <p className="mt-4 font-display font-bold text-[26px] tracking-[-0.02em] text-ink-headline leading-tight">
                Meta for volume. Google for depth.
              </p>
              <p className="mt-3 font-body text-body text-ink-body leading-relaxed">
                Neither platform was asked to do both — which is why unit economics held as spend
                scaled roughly 3.5×.
              </p>
            </div>
            <div className="border-t-2 border-ink-headline pt-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">Creative concentration</p>
              <p className="mt-4 font-display font-extralight text-[56px] leading-none tracking-[-0.03em] text-ink-headline">
                86%
              </p>
              <p className="mt-3 font-body text-body text-ink-body leading-relaxed">
                of Meta leads came from five creatives. The hero — one static floor-plan image —
                produced 440 leads in May at ₹1,378 each, 37% below the blended average.
              </p>
            </div>
            <div className="border-t-2 border-ink-headline pt-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">Organic, Apr–May</p>
              <dl className="mt-4 grid grid-cols-3 gap-4">
                {[
                  ["32.9M", "views"],
                  ["10.5M", "unique reach"],
                  ["+6,050", "followers"],
                ].map(([v, l]) => (
                  <div key={l}>
                    <dt className="font-display font-bold text-[24px] tracking-[-0.02em] text-ink-headline">{v}</dt>
                    <dd className="font-body text-body-sm text-ink-muted">{l}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 font-body text-body text-ink-body leading-relaxed">
                Posting timed to the 5:30–7:30 PM Bengaluru commute scroll.
              </p>
            </div>
          </div>
        </section>

        {/* ── 10. WHAT THIS PROVES ── */}
        <section className="bg-ink-headline text-white">
          <div className="container-layout py-24 md:py-32">
            <Eyebrow light>What this proves</Eyebrow>
            <h2 className="font-bold tracking-[-0.025em] text-display-lg leading-[1.05] max-w-[24ch] text-balance mb-16">
              A campaign that landed, or a system that was built.
            </h2>
            <div className="grid md:grid-cols-3 gap-10">
              {LESSONS.map((l, i) => (
                <div key={l.title}>
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-yellow">
                    0{i + 1}
                  </span>
                  <h3 className="mt-4 font-display font-bold text-[22px] tracking-[-0.02em] leading-snug">
                    {l.title}
                  </h3>
                  <p className="mt-3 font-body text-body text-white/70 leading-relaxed">{l.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 11. SOLUTIONS + DISCLOSURE ── */}
        <section className="container-layout py-16 grid md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-5">
              Solutions deployed
            </p>
            <div className="flex flex-wrap gap-3">
              {SOLUTIONS.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="px-5 py-2.5 bg-bg-secondary border border-rule rounded-md font-body text-body-sm text-ink-headline hover:border-ink-headline transition-colors"
                >
                  {s.name}
                </Link>
              ))}
            </div>
          </div>
          <p className="md:col-span-5 md:col-start-8 font-body text-[13px] text-ink-muted leading-relaxed">
            Figures published with TRU Aquapolis&apos;s agreement. Underlying CRM records are subject
            to a non-disclosure agreement and are not reproduced. Closed sales were completed by
            TRU&apos;s in-house sales team from leads generated and qualified by Zeppstr.
          </p>
        </section>

        <CTABanner
          eyebrow="Engage"
          heading="Want a system like this for your project?"
          subhead="Apply for a Strategic Diagnostic. Honest assessment, written deliverable, no agency pitch dressed up as a report."
          primary={{ label: "Book a Call", href: "/book-consultation" }}
          secondary={{ label: "See more outcomes", href: "/work" }}
        />
      </main>
      <Footer />
    </>
  );
}
