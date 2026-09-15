import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/meta";
import { GlobalNav } from "@/components/nav/GlobalNav";
import { Footer } from "@/components/nav/Footer";
import { SolutionCard } from "@/components/cards/SolutionCard";
import { CTABanner } from "@/components/blocks/CTABanner";
import { PracticeStack } from "@/components/utility/HubDiagrams";
import { sanity } from "@/sanity/lib/client";
import { allSolutionsQuery } from "@/sanity/lib/queries";
import type { Solution } from "@/sanity/lib/types";

export const metadata: Metadata = buildMetadata({
  title: "Solutions",
  description:
    "Five practices. Built to drive measurable, compounding growth. Growth Strategy & Advisory · Organic Growth Practice · Performance Media · Experience & Engineering · Brand, Engagement & Lifecycle.",
  path: "/solutions",
});

/**
 * ── SOURCING RULE FOR THIS PAGE ──────────────────────────────────────────────
 * This page had a hero, a card grid and a CTA — nothing between them. Someone
 * arriving from the mega-menu learned five names and left.
 *
 * Everything added below is either (a) a description of how we work, which is
 * ours to state, or (b) a number that traces to a named engagement already
 * published on this site. No industry benchmarks, no invented averages, no
 * "clients typically see". If you cannot point at the case study, do not write
 * the figure.
 *
 * The only outcome numbers on this page are TRU Aquapolis (₹1.4 Cr media →
 * ₹187.5 Cr closed, Jan–Aug 2026, 75 units) which is published in full at
 * /work/tru-aquapolis.
 */

/** Which practice is the constraint — a self-diagnostic, not a service list. */
const CONSTRAINT_MAP: {
  symptom: string;
  practice: string;
  href: string;
  why: string;
}[] = [
  {
    symptom: "Spend goes up, revenue doesn't move with it",
    practice: "Growth Strategy & Advisory",
    href: "/solutions/growth-strategy-advisory",
    why: "Almost always a positioning or unit-economics problem wearing a media costume. More budget against the same offer buys the same result at a higher price.",
  },
  {
    symptom: "Leads arrive and sales says they're junk",
    practice: "Performance Media",
    href: "/solutions/performance-media",
    why: "A volume target was set without a qualification definition. The fix is upstream of the ad account: decide what a real lead is, then buy only those.",
  },
  {
    symptom: "Traffic is flat and every competitor outranks you",
    practice: "Organic Growth Practice",
    href: "/solutions/organic-growth",
    why: "Usually content published against keywords rather than against questions, on a site structure search engines can't read as authority.",
  },
  {
    symptom: "Traffic is fine, conversion is not",
    practice: "Experience & Engineering",
    href: "/solutions/experience-engineering",
    why: "You are paying full price for attention and losing it on the page. Cheapest revenue in the business sits here, and it is almost always unworked.",
  },
  {
    symptom: "You acquire well and keep badly",
    practice: "Brand, Engagement & Lifecycle",
    href: "/solutions/brand-engagement-lifecycle",
    why: "Retention is a marketing output, not a product afterthought. Lifecycle, content and community are where a second purchase is decided.",
  },
  {
    symptom: "Nobody in the room agrees what the numbers mean",
    practice: "Experience & Engineering",
    href: "/solutions/experience-engineering",
    why: "Measurement first, always. We do not change spend against reporting we have not verified — you cannot optimise a number you cannot trust.",
  },
];

/** The order we work in, and why it is not negotiable. */
const SEQUENCE = [
  {
    step: "01",
    title: "Diagnose before you spend",
    body: "Every engagement opens with a paid diagnostic, delivered as a written document whether or not you continue with us. It exists so the work that follows is aimed at the actual constraint rather than the channel you were already planning to buy.",
  },
  {
    step: "02",
    title: "Make the measurement honest",
    body: "Before any budget moves, attribution has to report accurately. This is the least glamorous phase and the one that determines whether everything after it is real. A channel that looks like it works because the tracking is broken will absorb budget indefinitely.",
  },
  {
    step: "03",
    title: "Fix the one thing holding the rest back",
    body: "We improve the constraint rather than improving everything a little. If qualification is the problem, creative testing is a distraction. If the page converts at a third of what it should, more traffic is an expensive way to make that worse.",
  },
  {
    step: "04",
    title: "Then scale, against a system that holds",
    body: "Channels compound when the layer beneath them works — positioning, journey, measurement, conversion. That is the whole argument of this practice. Scale is the last step, not the first.",
  },
];

const FAQS = [
  {
    q: "Can we engage just one practice?",
    a: "Yes, and many clients do. Paid search, a CRO programme or a lifecycle rebuild all stand alone and all have their own practice pages. What we will not do is take a single-channel brief when the diagnostic says the channel is not the constraint — we will tell you that in writing, and you are free to take the diagnostic elsewhere.",
  },
  {
    q: "What does the diagnostic actually produce?",
    a: "A written document: what is constraining growth, what we would change in what order, what the measurement is currently getting wrong, and what we think the realistic ceiling is. It is paid, it is yours, and it does not obligate you to a retainer. Roughly four weeks.",
  },
  {
    q: "Which practice should we start with?",
    a: "The symptom table above is the honest short answer, and it is how most conversations begin. The longer answer is that the diagnostic exists precisely because self-diagnosis is unreliable — the channel that feels broken is frequently downstream of the one that is.",
  },
  {
    q: "How long before the work shows up in revenue?",
    a: "It depends entirely on the constraint. Conversion and lifecycle work can move a number inside a quarter because the traffic already exists. Organic and positioning work are measured in quarters, not weeks. On TRU Aquapolis the first defensible result came at the ninety-day mark; the figure we publish today is the eight-month actual, and it was five times larger than what we were willing to commit to at ninety days.",
  },
  {
    q: "Do you report the months that went badly?",
    a: "Yes. Our reports contain bad months, because a report that never does is not a report. If you need the reporting to look good more than you need it to be accurate, we are the wrong firm and the diagnostic will say so.",
  },
  {
    q: "Why cap the client list?",
    a: "Because the model above is senior-time heavy and does not survive volume. Capacity is deliberately limited, which means we turn down most of what comes in — including work we could do competently.",
  },
];

/**
 * ISR — revalidate every 60s.
 *
 * Without this the page is built once and only changes on a redeploy, which
 * means editing content in Sanity (or re-running the seed) appeared to do
 * nothing. Matches the insights routes, which already did this.
 */
export const revalidate = 60;

export default async function SolutionsHubPage() {
  const solutions = await sanity.fetch<Solution[]>(allSolutionsQuery);

  return (
    <>
      <GlobalNav />
      <main>
        {/* ── Hero ──
            REBUILT 15 SEP 2026. This was a single left-hand column, so the
            right half of the first viewport was empty white — on the page that
            is the front door to five practices and twenty-odd sub-service
            pages. It also had no call to action anywhere above the card grid:
            you landed here from the mega-menu and the only thing you could do
            was pick a practice, which is precisely the decision the page
            argues you are not qualified to make yet.

            The diagram carries the second half of the headline ("one system
            underneath them") and the CTAs give the undecided reader the
            diagnostic, which is the honest next step. */}
        <section className="border-b border-ink-headline/10">
          <div className="container-layout pt-16 md:pt-24 pb-16 md:pb-20">
            <div className="grid md:grid-cols-12 gap-10 md:gap-14 items-center">
              <div className="md:col-span-7">
                <div className="flex items-center gap-4 mb-7">
                  <span aria-hidden="true" className="block w-2.5 h-2.5 bg-brand-yellow flex-shrink-0" />
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
                    Solutions &mdash; Five practices
                  </p>
                </div>
                <h1 className="font-light tracking-[-0.03em] text-display-xl text-ink-headline mb-7 max-w-[18ch] text-balance">
                  Five practices. One system underneath them.
                </h1>
                <p className="font-body text-body-lg text-ink-body max-w-[54ch] leading-[1.6]">
                  Each is a deep practice you can engage on its own. The reason
                  they are listed together is that the thing limiting your
                  growth is usually not the practice you came here to buy.
                </p>
                <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-5">
                  <Link
                    href="/book-consultation"
                    className="inline-flex items-center gap-3 bg-brand-yellow text-ink-headline font-display font-light text-display-xs px-8 py-4 hover:bg-emerald-900 hover:text-white transition-colors duration-hover"
                  >
                    <span>Apply for a diagnostic</span>
                    <span aria-hidden="true">&rarr;</span>
                  </Link>
                  <a
                    href="#constraint-heading"
                    className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.18em] text-ink-headline border-b border-ink-headline pb-1 hover:text-ink-headline/60 hover:border-brand-yellow transition-colors duration-hover"
                  >
                    <span>Which one is my constraint?</span>
                    <span aria-hidden="true">&darr;</span>
                  </a>
                </div>
              </div>
              <div className="md:col-span-5 flex items-center justify-center pt-6 md:pt-0">
                <PracticeStack />
              </div>
            </div>
          </div>
        </section>

        {/* ── Practice cards ──
            THE RAGGED-ROW PROBLEM: five cards in a three-column grid leaves an
            empty slot in row two. It read as a missing sixth practice.

            Rather than reflow to two columns (which leaves the same hole) the
            sixth cell is now the diagnostic — which is both the real answer for
            a reader who cannot tell which practice they need, and the most
            valuable action on the page. The hole is filled with the thing we
            most want clicked, not with padding. */}
        <section className="container-layout py-20 md:py-28">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.map((solution, idx) => (
              <SolutionCard
                key={solution._id}
                solution={solution}
                number={`Solution 0${idx + 1}`}
              />
            ))}

            <Link
              href="/book-consultation"
              className="group relative flex flex-col justify-between bg-bg-inverse text-white rounded-lg p-7 md:p-8 overflow-hidden transition-all duration-hover ease-smooth hover:-translate-y-1 hover:shadow-[0_12px_40px_-12px_rgba(6,78,59,0.45)] focus-visible:outline-2 focus-visible:outline-brand-yellow focus-visible:outline-offset-2"
            >
              <div>
                <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60 mb-5">
                  Not sure which
                </div>
                <h3 className="font-display font-light text-display-sm text-white mb-4 tracking-[-0.01em] leading-[1.15] max-w-[18ch]">
                  Most people pick the wrong one.
                </h3>
                <p className="font-body text-body text-white/75 leading-relaxed max-w-[40ch]">
                  That is not a criticism &mdash; the channel that feels broken
                  is usually downstream of the one that is. The diagnostic
                  exists to answer this in writing before you commit budget.
                </p>
              </div>
              <span className="mt-8 font-mono text-[12px] uppercase tracking-[0.18em] text-brand-yellow inline-flex items-center gap-2 group-hover:gap-3.5 transition-all duration-hover">
                Apply for a diagnostic
                <span aria-hidden="true">&rarr;</span>
              </span>
            </Link>
          </div>
        </section>

        {/* ── Which practice is your constraint ── */}
        <section
          className="bg-bg-secondary border-y border-ink-headline/10"
          aria-labelledby="constraint-heading"
        >
          <div className="container-layout py-24 md:py-32">
            <div className="grid md:grid-cols-12 gap-8 md:gap-16 items-end mb-14 md:mb-20">
              <div className="md:col-span-7">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-6">
                  Self-diagnostic
                </p>
                <h2
                  id="constraint-heading"
                  className="font-display font-light tracking-[-0.025em] text-display-lg text-ink-headline max-w-[24ch] text-balance"
                >
                  Start from the symptom, not the service.
                </h2>
              </div>
              <p className="md:col-span-5 font-body text-body text-ink-muted leading-relaxed">
                Most briefs arrive as a channel request. Underneath almost every
                one is a symptom that points somewhere else. Find yours below,
                and read the practice it actually implicates.
              </p>
            </div>

            <ul className="border-t border-ink-headline/15">
              {CONSTRAINT_MAP.map((row) => (
                <li
                  key={row.symptom}
                  className="border-b border-ink-headline/15 py-8 md:py-10"
                >
                  <div className="grid md:grid-cols-12 gap-y-4 gap-x-8">
                    <p className="md:col-span-4 font-display font-light text-display-sm text-ink-headline tracking-[-0.015em] leading-[1.15]">
                      &ldquo;{row.symptom}&rdquo;
                    </p>
                    <div className="md:col-span-5">
                      <p className="font-body text-body text-ink-body leading-relaxed">
                        {row.why}
                      </p>
                    </div>
                    <div className="md:col-span-3 md:text-right">
                      <Link
                        href={row.href}
                        className="inline-block font-mono text-[11px] uppercase tracking-[0.2em] text-ink-headline border-b border-ink-headline pb-1 hover:text-brand-blue hover:border-brand-yellow transition-colors"
                      >
                        {row.practice} &rarr;
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── The order of work ── */}
        <section
          className="container-layout py-24 md:py-32"
          aria-labelledby="sequence-heading"
        >
          <div className="mb-14 md:mb-20">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-6">
              Sequence
            </p>
            <h2
              id="sequence-heading"
              className="font-display font-light tracking-[-0.025em] text-display-lg text-ink-headline max-w-[26ch] mb-6 text-balance"
            >
              The order is the method.
            </h2>
            <p className="font-body text-body-lg text-ink-body max-w-[62ch] leading-relaxed">
              Whichever practice you engage, the work runs in this order. Each
              stage exists because the one after it fails without it, which is
              why we will not start at stage three however much of the budget is
              already committed to channels.
            </p>
          </div>

          <ol className="grid md:grid-cols-2 gap-x-12 gap-y-12">
            {SEQUENCE.map((s) => (
              <li key={s.step} className="border-t border-ink-headline/15 pt-7">
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-blue">
                    {s.step}
                  </span>
                  <h3 className="font-display font-light text-display-sm text-ink-headline tracking-[-0.015em]">
                    {s.title}
                  </h3>
                </div>
                <p className="font-body text-body text-ink-body leading-relaxed max-w-[58ch]">
                  {s.body}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* ── Proof band ── */}
        <section className="bg-emerald-900 text-white">
          <div className="container-layout py-20 md:py-28">
            <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-start">
              <div className="md:col-span-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60 mb-6">
                  What it looks like when it works
                </p>
                <h2 className="font-display font-light tracking-[-0.025em] text-display-lg text-white max-w-[20ch] text-balance">
                  ₹1.4 Cr of media. ₹187.5 Cr closed.
                </h2>
                <p className="mt-6 font-body text-body text-white/75 leading-relaxed max-w-[46ch]">
                  TRU Aquapolis, January to August 2026. Meta and Google
                  generated the leads; we segregated and qualified them before
                  they reached the client&rsquo;s sales team, who closed every one
                  of the 75 units. We do not claim the close &mdash; we claim the
                  pipeline it came from.
                </p>
                <Link
                  href="/work/tru-aquapolis"
                  className="mt-8 inline-block font-mono text-[11px] uppercase tracking-[0.2em] text-white border-b border-white/50 pb-1 hover:border-brand-yellow transition-colors"
                >
                  Read the full case study &rarr;
                </Link>
              </div>
              <dl className="md:col-span-7 grid grid-cols-2 gap-x-8 gap-y-10">
                {[
                  ["6,000+", "Leads generated"],
                  ["70%+", "Qualified on handover"],
                  ["75", "Units closed"],
                  ["₹2.5 Cr", "Average ticket size"],
                ].map(([figure, label]) => (
                  <div key={label} className="border-t border-white/20 pt-5">
                    <dt className="font-display font-light text-display-lg leading-[1] tracking-[-0.02em] text-white">
                      {figure}
                    </dt>
                    <dd className="mt-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">
                      {label}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* ── FAQs ── */}
        <section
          className="container-layout py-24 md:py-32"
          aria-labelledby="solutions-faq-heading"
        >
          <div className="grid md:grid-cols-12 gap-8 md:gap-16">
            <div className="md:col-span-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-6">
                Questions
              </p>
              <h2
                id="solutions-faq-heading"
                className="font-display font-light tracking-[-0.025em] text-display-lg text-ink-headline max-w-[16ch] text-balance"
              >
                Before you enquire.
              </h2>
            </div>
            <dl className="md:col-span-8 border-t border-ink-headline/15">
              {FAQS.map((f) => (
                <div
                  key={f.q}
                  className="border-b border-ink-headline/15 py-7 md:py-8"
                >
                  <dt className="font-display font-light text-display-sm text-ink-headline tracking-[-0.015em] mb-3">
                    {f.q}
                  </dt>
                  <dd className="font-body text-body text-ink-body leading-relaxed max-w-[64ch]">
                    {f.a}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <CTABanner
          eyebrow="Engage"
          heading="Want to know which practice is your constraint?"
          subhead="Apply for a Strategic Diagnostic. We diagnose what is actually limiting growth and tell you in writing — including when the answer is that you do not need us."
          primary={{ label: "Apply for a Diagnostic", href: "/book-consultation" }}
          secondary={{ label: "Or just say hi", href: "/contact" }}
        />
      </main>
      <Footer />
    </>
  );
}
