import Link from "next/link";
import Image from "next/image";
import { GlobalNav } from "@/components/nav/GlobalNav";
import { Footer } from "@/components/nav/Footer";
import { CTABanner } from "@/components/blocks/CTABanner";

/**
 * WISE MARKET — bespoke case-study layout (built 17 Nov 2026).
 *
 * Second page on the case-study benchmark (Tru Aquapolis is the reference).
 *
 * SOURCING RULE: every figure comes from
 *   - deliverables/content/case-studies/wise-market.md (revenue, rankings table)
 *   - lib/case-study-metrics.ts "wise-market" (keywords ranked, referring domains,
 *     peak-month spend and return) — already published on the site.
 * Do not add a figure that is not in those files. Engagement dates are not on
 * record, so the page says "six months" and gives no calendar range.
 */

const BEFORE_AFTER = [
  { label: "Monthly revenue", before: "AUD 40K", after: "AUD 2.7M", note: "67× in six months" },
  { label: "Organic keywords ranked", before: "~0", after: "12,300", note: "commercial and model-level terms" },
  { label: "Referring domains", before: "~0", after: "3,900", note: "earned, not bought" },
  { label: "Paid return, peak month", before: "from AUD 360K spend", after: "AUD 1.24M", note: "3.4× ROAS", noStrike: true },
];

const MOVES = [
  {
    n: "01",
    title: "Fix the foundations: technical SEO and site architecture",
    body: "Restructured the catalogue and usability so model-and-condition pages could be crawled, ranked and converted — not buried three clicks under a category.",
    stat: "12,300",
    statLabel: "organic keywords ranked, from effectively zero",
  },
  {
    n: "02",
    title: "Build pages for the query the buyer actually types",
    body: "Refurbished-tech buyers search by exact model and condition. Content was mapped to those queries, one intent per page.",
    stat: "8 / 8",
    statLabel: "tracked commercial terms in Google's top 10",
  },
  {
    n: "03",
    title: "Earn the authority that makes rankings hold",
    body: "Off-page work built links and citations deliberately, so positions survived when competitors outspent the account.",
    stat: "3,900",
    statLabel: "referring domains, from effectively zero",
  },
  {
    n: "04",
    title: "Rebuild paid for efficiency, not volume",
    body: "As organic took over the queries paid had been overpaying for, the paid budget moved to genuinely incremental demand.",
    stat: "3.4×",
    statLabel: "ROAS in the peak month — AUD 360K in, AUD 1.24M back",
  },
];

/* Positions captured at the end of the engagement — wise-market.md. */
const RANKINGS = [
  { kw: "iphone 11 pro max", pos: 2, vol: "10K – 100K" },
  { kw: "xiaomi mi 11 ultra refurbished", pos: 3, vol: "1K – 2K" },
  { kw: "iphone 12 pro", pos: 5, vol: "10K – 100K" },
  { kw: "iphone 12 australia best price", pos: 6, vol: "1K – 3K" },
  { kw: "realme refurbished mobiles", pos: 6, vol: "1K – 3K" },
  { kw: "iphone 12 prices", pos: 6, vol: "1K – 10K" },
  { kw: "refurbished xiaomi phones", pos: 9, vol: "500 – 900" },
  { kw: "refurbished motorola phones", pos: 10, vol: "10 – 100" },
];

const LESSONS = [
  {
    title: "A 67× movement is not a campaign result.",
    body: "Nothing in a single channel moves a business that far. What moved was the structure underneath every channel.",
  },
  {
    title: "Win the search results page, because that's where the sale is decided.",
    body: "In price-comparison categories the buyer chooses before they reach your site. Pages built for exact model-and-condition queries are how you get chosen.",
  },
  {
    title: "Stop renting what you can own.",
    body: "Once organic held the high-intent queries, paid stopped buying demand the business could win for free — and every channel started compounding.",
  },
];

const SOLUTIONS = [
  { name: "Organic Growth", href: "/solutions/organic-growth" },
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

export function WiseMarketCase() {
  return (
    <>
      <GlobalNav />
      <main>
        {/* ── 1. HERO ── */}
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
                <li className="text-white">Wise Market</li>
              </ol>
            </nav>

            <div className="grid md:grid-cols-12 gap-12 items-end">
              <div className="md:col-span-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-6 text-white/60">
                  Case study ·{" "}
                  <Link
                    href="/industries/ecommerce-dtc"
                    className="underline underline-offset-4 decoration-white/30 hover:text-white"
                  >
                    E-commerce
                  </Link>{" "}
                  · Australia
                </p>
                <h1 className="font-bold tracking-[-0.03em] text-display-xl leading-[1.02] text-balance">
                  Monthly revenue from AUD 40K to{" "}
                  <span className="highlight-mark text-ink-headline whitespace-nowrap">AUD 2.7M</span> in six months.
                </h1>
                <p className="mt-8 font-body text-body-lg text-white/75 max-w-[56ch] leading-relaxed">
                  An Australian retailer of new and refurbished tech, in a category where margins are
                  thin and the buyer decides on the search results page. We rebuilt organic, paid and
                  the site underneath them so the channels stopped competing and started compounding.
                </p>
                <p className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 font-body text-body-sm text-white/60">
                  <span>
                    By{" "}
                    <Link href="/about" className="text-white hover:underline underline-offset-4">
                      Nitish Kumar
                    </Link>
                    , Founder
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>
                    Published <time dateTime="2024-11-15">15 Nov 2024</time>
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>
                    Updated <time dateTime="2026-11-17">17 Nov 2026</time>
                  </span>
                </p>
              </div>
              <div className="md:col-span-4 md:text-right">
                <p className="font-display font-extralight leading-none tracking-[-0.04em] text-[96px] md:text-[148px] text-brand-yellow">
                  67×
                </p>
                <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">
                  Monthly revenue in six months
                </p>
              </div>
            </div>

            <dl className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6 border-t border-white/15 pt-8">
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">Client</dt>
                <dd className="mt-2">
                  <span className="inline-flex items-center rounded-md bg-white px-3 py-2">
                    <Image
                      src="/client-logos/v3/wise-market.png"
                      alt="Wise Market logo"
                      width={150}
                      height={32}
                      className="h-6 w-auto"
                    />
                  </span>
                </dd>
              </div>
              {[
                ["Market", "Australia · new & refurbished tech"],
                ["Duration", "Six months"],
                ["Our role", "SEO, paid media, site architecture"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">{k}</dt>
                  <dd className="mt-2 font-body text-body text-white">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ── 2. SITE SCREENSHOT ── */}
        <section className="container-layout -mt-20 md:-mt-28 relative">
          <div className="rounded-xl overflow-hidden shadow-[0_30px_80px_-20px_rgba(15,61,46,0.45)] border border-ink-headline/10 bg-white">
            <div className="flex items-center gap-1.5 px-4 py-3 bg-bg-secondary border-b border-ink-headline/10">
              <span className="w-2.5 h-2.5 rounded-full bg-ink-headline/20" />
              <span className="w-2.5 h-2.5 rounded-full bg-ink-headline/20" />
              <span className="w-2.5 h-2.5 rounded-full bg-ink-headline/20" />
              <span className="ml-4 font-mono text-[11px] text-ink-muted">wisemarket.com.au</span>
            </div>
            <div className="relative aspect-[1600/845]">
              <Image
                src="/case-screenshots/wise-market.jpg"
                alt="Wise Market website home page, an Australian store for new and refurbished phones and tech"
                fill
                priority
                sizes="(min-width: 1280px) 1200px, 100vw"
                className="object-cover object-top"
              />
            </div>
          </div>
        </section>

        {/* ── 3. AT A GLANCE ── */}
        <section className="container-layout pt-20 md:pt-24" aria-labelledby="glance-heading">
          <h2 id="glance-heading" className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-8">
            At a glance
          </h2>
          <dl className="grid md:grid-cols-3 gap-px bg-ink-headline/15 border border-ink-headline/15 rounded-lg overflow-hidden">
            {[
              ["The challenge", "Wise Market was doing AUD 40K a month, nearly invisible in organic search, with paid carrying acquisition on its own."],
              ["What Zeppstr did", "Rebuilt site architecture and technical SEO, created pages for exact model-and-condition searches, earned links, and restructured paid for efficiency."],
              ["The result", "Monthly revenue reached AUD 2.7M within six months, with 12,300 keywords ranked and 3,900 referring domains."],
            ].map(([k, v]) => (
              <div key={k} className="bg-white p-8">
                <dt className="font-body font-semibold text-body text-ink-headline">{k}</dt>
                <dd className="mt-3 font-body text-body text-ink-body leading-relaxed">{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ── 4. BEFORE → AFTER ── */}
        <section className="container-layout py-24 md:py-32" aria-labelledby="ba-heading">
          <div className="grid md:grid-cols-12 gap-12 mb-16">
            <div className="md:col-span-7">
              <Eyebrow>Before → after</Eyebrow>
              <h2
                id="ba-heading"
                className="font-bold tracking-[-0.025em] text-display-lg text-ink-headline leading-[1.05] text-balance"
              >
                Four numbers moved together. That&apos;s the{" "}
                <span className="highlight-mark">point.</span>
              </h2>
            </div>
            <p className="md:col-span-4 md:col-start-9 self-end font-body text-body-lg text-ink-body leading-relaxed">
              Revenue didn&apos;t jump because one channel spiked. Rankings, authority and paid
              efficiency all moved in the same six months.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-ink-headline/15 border border-ink-headline/15 rounded-lg overflow-hidden">
            {BEFORE_AFTER.map((b, i) => (
              <div key={b.label} className={i === 0 ? "bg-brand-yellow p-8" : "bg-white p-8"}>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-headline/60">{b.label}</p>
                <p
                  className={`mt-6 font-body text-body-sm text-ink-headline/60 ${
                    "noStrike" in b ? "" : "line-through decoration-ink-headline/30"
                  }`}
                >
                  {b.before}
                </p>
                <p className="mt-1 font-display font-bold text-[40px] leading-none tracking-[-0.03em] text-ink-headline">
                  {b.after}
                </p>
                <p className="mt-3 font-body text-body-sm text-ink-headline/70">{b.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 5. SITUATION ── */}
        <section className="bg-bg-secondary border-y border-ink-headline/10">
          <div className="container-layout py-24 md:py-28 grid md:grid-cols-12 gap-12">
            <div className="md:col-span-5">
              <Eyebrow>The situation</Eyebrow>
              <h2 className="font-bold tracking-[-0.025em] text-display-lg text-ink-headline leading-[1.05] text-balance">
                The sale is decided on Google, not on your website.
              </h2>
            </div>
            <div className="md:col-span-6 md:col-start-7 space-y-6 font-body text-body-lg text-ink-body leading-relaxed">
              <p>
                Wise Market sells new and refurbished consumer tech into Australia. Margins are thin,
                the price comparison is one tab away, and almost all high-intent traffic starts on a
                search results page.
              </p>
              <ul className="grid sm:grid-cols-3 gap-3">
                {["Thin margins", "Price-comparison buyers", "Search-led demand"].map((c) => (
                  <li
                    key={c}
                    className="rounded-md border border-ink-headline/20 bg-white px-4 py-3 font-body text-body-sm font-semibold text-ink-headline"
                  >
                    {c}
                  </li>
                ))}
              </ul>
              <p>
                Revenue sat at <strong className="text-ink-headline">AUD 40,000 a month</strong>.
                Organic visibility was minimal, and paid campaigns were spending without a structure
                that made the spend defensible.
              </p>
            </div>
          </div>
        </section>

        {/* ── 6. DIAGNOSIS ── */}
        <section className="container-layout py-24 md:py-32">
          <Eyebrow>The diagnosis</Eyebrow>
          <h2 className="font-bold tracking-[-0.025em] text-display-lg text-ink-headline leading-[1.05] max-w-[22ch] text-balance mb-16">
            Two problems, and they were <span className="highlight-mark">connected.</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-px bg-ink-headline/15 border border-ink-headline/15 rounded-lg overflow-hidden">
            <div className="bg-white p-8 md:p-10">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">Problem 1</p>
              <h3 className="mt-4 font-display font-bold text-[26px] tracking-[-0.02em] text-ink-headline leading-tight">
                Invisible to the searches that convert.
              </h3>
              <p className="mt-4 font-body text-body text-ink-body leading-relaxed">
                Buyers search by exact model and condition, not category. The site had no pages built
                to answer queries like these:
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {["refurbished xiaomi phones", "iphone 12 australia best price", "iphone 11 pro max"].map((q) => (
                  <li
                    key={q}
                    className="rounded-full bg-bg-secondary border border-ink-headline/15 px-3 py-1.5 font-mono text-[12px] text-ink-headline"
                  >
                    &ldquo;{q}&rdquo;
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-8 md:p-10">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">Problem 2</p>
              <h3 className="mt-4 font-display font-bold text-[26px] tracking-[-0.02em] text-ink-headline leading-tight">
                Paid carried acquisition alone.
              </h3>
              <p className="mt-4 font-body text-body text-ink-body leading-relaxed">
                When paid is the only channel, every sale is rented. Cost floors rise and nothing
                compounds underneath. And because organic was missing, paid was buying the very
                queries a well-built site could have won for free.
              </p>
            </div>
          </div>
        </section>

        {/* ── 7. WHAT WE DID ── */}
        <section className="bg-ink-headline text-white">
          <div className="container-layout py-24 md:py-32">
            <div className="grid md:grid-cols-12 gap-12 mb-16">
              <div className="md:col-span-7">
                <Eyebrow light>What we did</Eyebrow>
                <h2 className="font-bold tracking-[-0.025em] text-display-lg leading-[1.05] text-balance">
                  Four moves. The order mattered.
                </h2>
              </div>
              <p className="md:col-span-4 md:col-start-9 self-end font-body text-body text-white/70 leading-relaxed">
                Organic was built to take over the queries paid was overpaying for, so paid could
                move to demand that was genuinely new.
              </p>
            </div>
            <ol className="border-t border-white/15">
              {MOVES.map((m) => (
                <li key={m.n} className="grid md:grid-cols-12 gap-6 md:gap-8 py-10 border-b border-white/15">
                  <span className="md:col-span-1 font-mono text-[11px] uppercase tracking-[0.2em] text-brand-yellow pt-2">
                    {m.n}
                  </span>
                  <div className="md:col-span-6">
                    <h3 className="font-display font-bold text-[24px] md:text-[28px] tracking-[-0.02em] leading-tight">
                      {m.title}
                    </h3>
                    <p className="mt-3 font-body text-body text-white/70 leading-relaxed max-w-[52ch]">{m.body}</p>
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

        {/* ── 8. RANKINGS — real table + position bars ── */}
        <section className="container-layout py-24 md:py-32" aria-labelledby="rank-heading">
          <div className="grid md:grid-cols-12 gap-12 mb-14">
            <div className="md:col-span-7">
              <Eyebrow>Where it ranked</Eyebrow>
              <h2
                id="rank-heading"
                className="font-bold tracking-[-0.025em] text-display-lg text-ink-headline leading-[1.05] text-balance"
              >
                Page one for the exact queries buyers type.
              </h2>
            </div>
            <p className="md:col-span-4 md:col-start-9 self-end font-body text-body text-ink-body leading-relaxed">
              Every tracked commercial term reached Google&apos;s top 10. Positions were captured at
              the end of the engagement.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full font-body text-body text-left border-collapse">
              <caption className="sr-only">
                Wise Market Google positions for tracked commercial keywords, Australia
              </caption>
              <thead>
                <tr className="border-b-2 border-ink-headline">
                  <th scope="col" className="py-3 pr-6 font-semibold text-ink-headline">Keyword</th>
                  <th scope="col" className="py-3 pr-6 font-semibold text-ink-headline w-[40%] hidden md:table-cell">
                    <span className="sr-only">Position bar</span>
                  </th>
                  <th scope="col" className="py-3 pr-6 font-semibold text-ink-headline text-right">Position</th>
                  <th scope="col" className="py-3 font-semibold text-ink-headline text-right">Monthly searches</th>
                </tr>
              </thead>
              <tbody>
                {RANKINGS.map((r) => (
                  <tr key={r.kw} className="border-b border-ink-headline/10">
                    <th scope="row" className="py-4 pr-6 font-mono text-[13px] font-normal text-ink-headline">
                      {r.kw}
                    </th>
                    <td className="py-4 pr-6 hidden md:table-cell" aria-hidden="true">
                      <div className="h-2.5 rounded-full bg-ink-headline/10">
                        <div
                          className={`h-2.5 rounded-full ${r.pos <= 3 ? "bg-brand-yellow" : "bg-ink-headline"}`}
                          style={{ width: `${((11 - r.pos) / 10) * 100}%` }}
                        />
                      </div>
                    </td>
                    <td className="py-4 pr-6 text-right font-display font-bold text-[20px] text-ink-headline tabular-nums">
                      #{r.pos}
                    </td>
                    <td className="py-4 text-right text-ink-body tabular-nums">{r.vol}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── 9. HOW THE CHANNELS STOPPED COMPETING ── */}
        <section className="bg-bg-secondary border-y border-ink-headline/10">
          <div className="container-layout py-24 md:py-28">
            <Eyebrow>The shift</Eyebrow>
            <h2 className="font-bold tracking-[-0.025em] text-display-lg text-ink-headline leading-[1.05] max-w-[24ch] text-balance mb-14">
              From renting every sale to owning the demand.
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-lg border border-ink-headline/15 bg-white p-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">Before</p>
                <div className="mt-6 space-y-3">
                  <div className="rounded-md bg-ink-headline/80 px-5 py-4 text-white font-body text-body">
                    <strong>Paid</strong> → every query, including the ones organic should own
                  </div>
                  <div className="rounded-md border border-dashed border-ink-headline/30 px-5 py-4 font-body text-body text-ink-muted">
                    Organic → almost nothing
                  </div>
                </div>
                <p className="mt-6 font-body text-body-sm text-ink-body">Every sale rented. Costs rise, nothing compounds.</p>
              </div>
              <div className="rounded-lg border-2 border-ink-headline bg-white p-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">After</p>
                <div className="mt-6 space-y-3">
                  <div className="rounded-md bg-ink-headline px-5 py-4 text-white font-body text-body">
                    <strong>Organic</strong> → model-and-condition searches, 12,300 keywords
                  </div>
                  <div className="rounded-md bg-brand-yellow px-5 py-4 text-ink-headline font-body text-body">
                    <strong>Paid</strong> → genuinely incremental demand, 3.4× ROAS at peak
                  </div>
                </div>
                <p className="mt-6 font-body text-body-sm text-ink-body">Each channel does one job. Both compound.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 10. FULL NUMBERS ── */}
        <section className="container-layout py-24 md:py-28" aria-labelledby="numbers-heading">
          <h2 id="numbers-heading" className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-8">
            The full numbers
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full max-w-[820px] font-body text-body text-left border-collapse">
              <caption className="sr-only">Wise Market engagement figures, before and after six months</caption>
              <thead>
                <tr className="border-b-2 border-ink-headline">
                  <th scope="col" className="py-3 pr-6 font-semibold text-ink-headline">Measure</th>
                  <th scope="col" className="py-3 pr-6 font-semibold text-ink-headline text-right">Before</th>
                  <th scope="col" className="py-3 font-semibold text-ink-headline text-right">After six months</th>
                </tr>
              </thead>
              <tbody className="text-ink-body">
                {[
                  ["Monthly revenue", "AUD 40K", "AUD 2.7M"],
                  ["Revenue multiple", "—", "67×"],
                  ["Organic keywords ranked", "~0", "12,300"],
                  ["Referring domains", "~0", "3,900"],
                  ["Tracked commercial terms in top 10", "—", "8 of 8"],
                  ["Paid spend, peak month", "—", "AUD 360K"],
                  ["Paid revenue, peak month", "—", "AUD 1.24M (3.4× ROAS)"],
                ].map(([k, b, a]) => (
                  <tr key={k} className="border-b border-ink-headline/10">
                    <th scope="row" className="py-3 pr-6 font-normal">{k}</th>
                    <td className="py-3 pr-6 text-right tabular-nums">{b}</td>
                    <td className="py-3 text-right font-semibold text-ink-headline tabular-nums">{a}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── 11. WHAT THIS PROVES ── */}
        <section className="bg-ink-headline text-white">
          <div className="container-layout py-24 md:py-32">
            <Eyebrow light>What this proves</Eyebrow>
            <h2 className="font-bold tracking-[-0.025em] text-display-lg leading-[1.05] max-w-[24ch] text-balance mb-16">
              The pattern transfers to any search-led category.
            </h2>
            <div className="grid md:grid-cols-3 gap-10">
              {LESSONS.map((l, i) => (
                <div key={l.title}>
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-yellow">0{i + 1}</span>
                  <h3 className="mt-4 font-display font-bold text-[22px] tracking-[-0.02em] leading-snug">{l.title}</h3>
                  <p className="mt-3 font-body text-body text-white/70 leading-relaxed">{l.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 12. AUTHOR ── */}
        <section className="container-layout pt-20">
          <div className="flex items-start gap-5 border-t border-b border-ink-headline/15 py-8 max-w-[820px]">
            <span
              aria-hidden="true"
              className="shrink-0 w-14 h-14 rounded-full bg-ink-headline text-white grid place-items-center font-display font-bold text-[18px]"
            >
              NK
            </span>
            <div>
              <p className="font-body text-body text-ink-headline">
                Written by{" "}
                <Link href="/about" className="font-semibold hover:underline underline-offset-4">
                  Nitish Kumar
                </Link>
                , Founder, Zeppstr Growth Media
              </p>
              <p className="mt-1 font-body text-body-sm text-ink-body leading-relaxed">
                10+ years in UX, growth and performance marketing across e-commerce, real estate,
                SaaS and finance.
              </p>
            </div>
          </div>
        </section>

        {/* ── 13. RELATED WORK ── */}
        <section className="container-layout pt-20" aria-labelledby="related-heading">
          <h2 id="related-heading" className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-8">
            Related work
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { name: "Tru Aquapolis", metric: "75 apartments sold on ₹1.4 Cr of media", tag: "Real estate · Performance media", href: "/work/tru-aquapolis" },
              { name: "Mini Leaves", metric: "0.5% → 3%+ conversion", tag: "E-commerce · Conversion", href: "/work/mini-leaves" },
            ].map((r) => (
              <Link
                key={r.href}
                href={r.href}
                className="group block rounded-lg border border-ink-headline/15 p-8 hover:border-ink-headline transition-colors"
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">{r.tag}</p>
                <p className="mt-4 font-display font-bold text-[26px] tracking-[-0.02em] text-ink-headline leading-tight">
                  {r.metric}
                </p>
                <p className="mt-3 font-body text-body text-ink-body">
                  {r.name} <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* ── 14. SOLUTIONS + DISCLOSURE ── */}
        <section className="container-layout py-16 grid md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-5">Solutions deployed</p>
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
            Figures are from Zeppstr&apos;s engagement report for Wise Market. Keyword positions were
            captured at the end of the engagement; search positions change over time.
          </p>
        </section>

        <CTABanner
          eyebrow="Engage"
          heading="Selling where the buyer decides on Google?"
          subhead="Apply for a Strategic Diagnostic. Honest assessment, written deliverable, no agency pitch dressed up as a report."
          primary={{ label: "Book a Call", href: "/book-consultation" }}
          secondary={{ label: "See more outcomes", href: "/work" }}
        />
      </main>
      <Footer />
    </>
  );
}
