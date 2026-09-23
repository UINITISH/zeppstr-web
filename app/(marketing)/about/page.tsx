import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/meta";
import { GlobalNav } from "@/components/nav/GlobalNav";
import { Footer } from "@/components/nav/Footer";
import { CTABanner } from "@/components/blocks/CTABanner";
import { Testimonials } from "@/components/blocks/Testimonials";
import { TESTIMONIALS } from "@/lib/testimonials";
import { GridOverlay } from "@/components/blocks/GridOverlay";
import { CapacityModel } from "@/components/utility/PageDiagrams";
import { TeamSection } from "@/components/about/TeamSection";

/**
 * /about
 *
 * This route was linked from the main nav (MegaMenu, MobileDrawer), the footer
 * and the sitemap, but had no page file — every "About" click 404'd, and the
 * sitemap advertised /about, /about/clients, /about/founder and /about/firm to
 * search engines. Found during pre-launch verification, 19 Aug 2026.
 *
 * Content here is drawn only from material already published elsewhere on the
 * site or from documents in the archive:
 *   - engagement model and cadence: the Methodology block on the homepage
 *   - "12 partners a year": HeroPrimary + CTA copy
 *   - founder: Nitish Kumar, per Portfolio Zeppstr.pdf
 *   - office: 27th Main Rd, HSR Layout, Bengaluru, per /contact
 * No new claims are introduced.
 */

export const metadata: Metadata = buildMetadata({
  title: "About | The firm, the model, the founder",
  description:
    "Zeppstr is a growth practice, not an agency retainer. Twelve partner clients a year, twelve-month minimum engagements, one accountable revenue metric. Bengaluru, India.",
  alternates: { canonical: "/about" },
  path: "/about",
});

const PRINCIPLES = [
  {
    n: "01",
    title: "Diagnosis before tactics",
    body: "Every engagement opens with a written diagnostic — what is working, what is leaking, what is missing. If it does not name something the client did not already know, it is refunded. The bar is learning, not agreement.",
  },
  {
    n: "02",
    title: "Twelve partners a year",
    body: "Capacity is capped deliberately. The operating model — monthly board-style reviews, one accountable north-star metric — does not survive being spread across forty accounts. Selectivity is the product, not positioning.",
  },
  {
    n: "03",
    title: "Systems, not channels",
    body: "Growth stalls are almost never channel problems. They are architecture problems — positioning, journey, measurement, conversion. We rebuild the layer beneath the channels so the channels compound instead of competing.",
  },
  {
    n: "04",
    title: "Claim only what we can prove",
    body: "We report media-operations outcomes we control — pipeline, cost per lead, funnel conversion, ROAS. We do not publish attributed revenue that depends on a client's sales team and inventory. Numbers that cannot be sourced do not appear on this site.",
  },
];

const FACTS = [
  { k: "Founded", v: "Bengaluru, India" },
  { k: "Engagement length", v: "12 months minimum" },
  { k: "Partner clients", v: "6–12 per year" },
  { k: "Practices", v: "Five, operated as one system" },
  { k: "Entry point", v: "A paid strategic diagnostic" },
];

/**
 * How an engagement actually runs.
 *
 * Added 12 Sep 2026. The page previously stated the model in the abstract
 * ("twelve partners a year", "monthly board-style reviews") without ever
 * describing what a client experiences. For a firm asking for a twelve-month
 * commitment and a paid diagnostic up front, that is the most important thing
 * a prospect wants to read and it was missing.
 */
const ENGAGEMENT = [
  {
    phase: "Weeks 1–4",
    title: "Diagnostic",
    body: "Paid, written, and delivered whether or not we go further. We audit acquisition, conversion and retention, read the ad accounts and analytics against your CRM, and hand back a prioritised list of what is broken and what it is costing. If it does not tell you something you did not already know, it is refunded.",
  },
  {
    phase: "Weeks 4–8",
    title: "Instrumentation",
    body: "Before any spend changes, measurement has to report accurately. Conversion tracking verified against your CRM, server-side where the platform requires it, and one north-star metric everyone agrees to be judged on. Most engagements find something material here — a broken conversion event, a channel double-counting itself, a form quietly discarding submissions.",
  },
  {
    phase: "Months 2–4",
    title: "Rebuild the constraint",
    body: "We fix the one thing holding the rest back rather than improving everything a little. Usually that is conversion, positioning, or the architecture beneath the channels. Working on the constraint is what makes the later channel work worth funding.",
  },
  {
    phase: "Months 4–12",
    title: "Compound",
    body: "Channels scale against a system that now converts and reports honestly. Monthly board-style review against the north-star metric, with what did not work stated as plainly as what did.",
  },
];

/**
 * Who this is not for.
 *
 * Kept deliberately blunt. A firm that caps capacity at twelve clients is
 * turning work down constantly; saying what gets turned down is more credible
 * than another list of capabilities, and it saves both sides a call.
 */
const NOT_FOR = [
  "Month-to-month retainers. The model needs twelve months to produce anything worth reporting, and we would rather decline than take fees for a quarter of a job.",
  "Briefs that arrive as a channel request. 'We need someone to run our Google Ads' is a symptom; if nobody has established that paid search is the constraint, running it faster will not help.",
  "Work where nobody can say what a customer is worth. Without that number there is no way to judge whether any of this succeeded.",
  "Anyone who needs the reporting to look good more than they need it to be right. Our reports contain bad months.",
];

/**
 * ISR — revalidate every 60s.
 *
 * Without this the page is built once and only changes on a redeploy, which
 * means editing content in Sanity (or re-running the seed) appeared to do
 * nothing. Matches the insights routes, which already did this.
 */
export const revalidate = 60;

export default function AboutPage() {

  return (
    <>
      <GlobalNav />
      <main className="relative">
        <GridOverlay />

        {/* ── Hero ──
            Rebuilt to the house pattern: yellow square eyebrow, bold clamp
            headline, claim, diagram. It was a centred stack of light type with
            nothing beside it, which made the site's own About page the least
            designed page on the site. */}
        <section className="relative bg-bg-primary border-b border-ink-headline/10 overflow-hidden">
          <div className="container-layout pt-12 md:pt-16 pb-20 md:pb-28">
            <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-center">
              <div className="md:col-span-7">
                <div className="flex items-center gap-4 mb-8">
                  <span aria-hidden="true" className="block w-2.5 h-2.5 bg-brand-yellow flex-shrink-0" />
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
                    About — The firm
                  </p>
                </div>
                <h1 className="font-bold tracking-[-0.025em] text-display-xl text-ink-headline leading-[1.16] max-w-[16ch] text-balance mb-8">
                  A growth practice, not an{" "}
                  <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                    agency retainer
                  </span>
                  .
                </h1>
                <p className="font-body text-body-lg text-ink-body leading-[1.55] max-w-[54ch] mb-10">
                  Zeppstr builds the structural layer beneath marketing —
                  positioning, journey, measurement, conversion — so that
                  every channel a business runs compounds instead of competing.
                  We take on twelve partner clients a year, and we work like an
                  operating partner rather than a vendor.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    href="/book-consultation"
                    className="inline-flex items-center gap-3 bg-brand-yellow text-ink-headline font-display font-light text-display-xs px-8 py-4 hover:bg-emerald-900 hover:text-white transition-colors duration-hover"
                  >
                    <span>Apply for a diagnostic</span>
                    <span aria-hidden="true">&rarr;</span>
                  </Link>
                  <Link
                    href="/work"
                    className="font-mono text-[12px] uppercase tracking-[0.18em] text-ink-headline border-b border-ink-headline pb-0.5 hover:text-ink-headline/60 hover:border-brand-yellow transition-colors"
                  >
                    See the work &rarr;
                  </Link>
                </div>
              </div>
              <div className="md:col-span-5 flex items-center justify-center pt-8 md:pt-0">
                <CapacityModel />
              </div>
            </div>
          </div>
        </section>

        {/* ── Facts ── */}
        <section className="container-layout pt-20 pb-20">
          <dl className="grid grid-cols-2 md:grid-cols-5 gap-x-6 gap-y-10 border-t border-ink-headline/15 pt-10">
            {FACTS.map((f) => (
              <div key={f.k}>
                <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted mb-3">
                  {f.k}
                </dt>
                <dd className="font-display font-light text-display-xs text-ink-headline leading-[1.2]">
                  {f.v}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ── How we work ── */}
        <section className="bg-bg-secondary border-y border-ink-headline/10">
          <div className="container-layout py-24 md:py-32">
            <div className="grid md:grid-cols-12 gap-8 md:gap-16 mb-16">
              <div className="md:col-span-7">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-6">
                  How we work
                </p>
                <h2 className="font-display font-extralight tracking-[-0.025em] text-display-lg leading-[1.05] text-ink-headline max-w-[22ch] text-balance">
                  Four principles that decide what we take on.
                </h2>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-x-12 gap-y-14">
              {PRINCIPLES.map((p) => (
                <div key={p.n}>
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-blue">
                    {p.n}
                  </span>
                  <h3 className="mt-4 font-display font-light text-display-sm text-ink-headline leading-[1.2] tracking-[-0.01em]">
                    {p.title}
                  </h3>
                  <p className="mt-4 font-body text-body text-ink-body leading-relaxed max-w-[46ch]">
                    {p.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── How an engagement runs ── */}
        <section
          className="container-layout py-24 md:py-32"
          aria-labelledby="engagement-heading"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-6">
            The engagement
          </p>
          <h2
            id="engagement-heading"
            className="font-display font-light tracking-[-0.025em] text-display-lg text-ink-headline max-w-[24ch] mb-4 text-balance"
          >
            Twelve months, in four movements.
          </h2>
          <p className="font-body text-body-lg text-ink-body max-w-[62ch] leading-relaxed mb-16">
            The order is the method. Every stage below exists because the one
            after it fails without it — which is why we will not start at stage
            three, however much of the budget is already committed to channels.
          </p>

          <ol className="border-t border-ink-headline/15">
            {ENGAGEMENT.map((e) => (
              <li
                key={e.phase}
                className="grid md:grid-cols-[150px_minmax(0,22ch)_1fr] gap-x-8 gap-y-3 border-b border-ink-headline/15 py-8 md:py-10"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted md:pt-2">
                  {e.phase}
                </span>
                <h3 className="font-display font-light text-display-sm text-ink-headline tracking-tight">
                  {e.title}
                </h3>
                <p className="font-body text-body text-ink-body leading-relaxed max-w-[62ch]">
                  {e.body}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* ── Who this is not for ── */}
        <section
          className="bg-bg-inverse text-white"
          aria-labelledby="not-for-heading"
        >
          <div className="container-layout py-20 md:py-28">
            <div className="grid md:grid-cols-12 gap-8 md:gap-16">
              <div className="md:col-span-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60 mb-6">
                  Fit
                </p>
                <h2
                  id="not-for-heading"
                  className="font-display font-light tracking-[-0.025em] text-display-lg text-white max-w-[18ch] text-balance"
                >
                  What we turn down.
                </h2>
                <p className="mt-6 font-body text-body text-white/70 leading-relaxed max-w-[42ch]">
                  Capping capacity at twelve clients a year means declining most
                  of what comes in. It is more useful to say what, and why, than
                  to add another list of things we can do.
                </p>
              </div>
              <ul className="md:col-span-7 space-y-6">
                {NOT_FOR.map((item) => (
                  <li
                    key={item}
                    className="border-b border-white/15 pb-6 font-body text-body text-white/85 leading-relaxed"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── Leadership + team ──
            Replaces the old text-only "Founder" block. Same copy, now with a
            portrait frame (monogram until photography lands) and a grid below
            it for the wider team. Everything it renders comes from lib/team.ts
            — nobody is invented there. */}
        <TeamSection />

        {/* ── Testimonials — dark band, breaks the run of white sections ── */}
        <Testimonials
          quotes={TESTIMONIALS}
          tone="dark"
          eyebrow="In their words"
          heading="The part we cannot write ourselves."
        />

        <CTABanner
          eyebrow="Engage"
          heading="Start with a diagnosis, not a pitch."
          subhead="A written strategic diagnostic — honest assessment, real deliverable, refunded if it doesn't tell you something you didn't know."
          primary={{ label: "Apply for a Diagnostic", href: "/book-consultation" }}
          secondary={{ label: "Or just say hi", href: "/contact" }}
        />
      </main>
      <Footer />
    </>
  );
}
