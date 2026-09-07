import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/meta";
import { GlobalNav } from "@/components/nav/GlobalNav";
import { Footer } from "@/components/nav/Footer";
import { CTABanner } from "@/components/blocks/CTABanner";

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

export default function AboutPage() {
  return (
    <>
      <GlobalNav />
      <main>
        {/* ── Hero ── */}
        <section className="container-layout pt-20 md:pt-28 pb-16">
          <p className="eyebrow mb-6">About</p>
          <h1 className="font-extralight tracking-tight text-display-xl text-ink-headline mb-8 max-w-[20ch] text-balance">
            A growth practice, not an agency retainer.
          </h1>
          <p className="font-body text-body-lg text-ink-body max-w-[58ch]">
            Zeppstr builds the structural layer beneath marketing — positioning,
            journey, measurement, conversion — so that every channel a business
            runs compounds instead of competing. We take on twelve partner
            clients a year, and we work like an operating partner rather than a
            vendor.
          </p>
        </section>

        {/* ── Facts ── */}
        <section className="container-layout pb-20">
          <dl className="grid grid-cols-2 md:grid-cols-5 gap-x-6 gap-y-10 border-t border-ink-headline/15 pt-10">
            {FACTS.map((f) => (
              <div key={f.k}>
                <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted mb-3">
                  {f.k}
                </dt>
                <dd className="font-display font-light text-[clamp(17px,1.4vw,21px)] text-ink-headline leading-[1.2]">
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
                <h2 className="font-display font-extralight tracking-[-0.025em] text-[clamp(30px,4vw,52px)] leading-[1.05] text-ink-headline max-w-[22ch] text-balance">
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
                  <h3 className="mt-4 font-display font-light text-[clamp(21px,1.8vw,27px)] text-ink-headline leading-[1.2] tracking-[-0.01em]">
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

        {/* ── Founder ── */}
        <section className="container-layout py-24 md:py-32">
          <div className="grid md:grid-cols-12 gap-8 md:gap-16">
            <div className="md:col-span-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-6">
                Founder
              </p>
              <h2 className="font-display font-extralight text-[clamp(28px,3vw,40px)] leading-[1.05] tracking-[-0.02em] text-ink-headline">
                Nitish Kumar
              </h2>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
                Digital marketing consultant · Strategist
              </p>
            </div>
            <div className="md:col-span-8">
              <p className="font-body text-body-lg text-ink-body leading-relaxed max-w-[58ch]">
                Nitish reads every diagnostic application personally and sits on
                the engagement through delivery. The firm is built so that the
                person who makes the argument is the person accountable for the
                result — which is the practical reason capacity is capped rather
                than scaled.
              </p>
              <p className="mt-6 font-body text-body text-ink-muted leading-relaxed max-w-[58ch]">
                Zeppstr operates from Bengaluru and works with clients across
                India, the UAE, Australia and Japan.
              </p>
              <Link
                href="/contact"
                className="mt-8 inline-flex font-mono text-[13px] uppercase tracking-[0.18em] text-ink-headline border-b border-ink-headline pb-0.5 hover:text-ink-headline/60 hover:border-brand-yellow transition-colors"
              >
                Get in touch &rarr;
              </Link>
            </div>
          </div>
        </section>

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
