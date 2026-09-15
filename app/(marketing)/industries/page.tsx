import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/meta";
import { GlobalNav } from "@/components/nav/GlobalNav";
import { Footer } from "@/components/nav/Footer";
import { IndustryCard } from "@/components/cards/IndustryCard";
import { CTABanner } from "@/components/blocks/CTABanner";
import { ValueSpread } from "@/components/utility/HubDiagrams";
import { sanity } from "@/sanity/lib/client";
import { allIndustriesQuery } from "@/sanity/lib/queries";
import type { Industry } from "@/sanity/lib/types";

export const metadata: Metadata = buildMetadata({
  title: "Industries",
  description:
    "The categories where Zeppstr runs growth systems — Real Estate, E-commerce / D2C, SaaS / Tech, Healthcare & Wellness, EdTech / Education, Professional Services.",
  path: "/industries",
});

/**
 * ── SOURCING RULE FOR THIS PAGE ──────────────────────────────────────────────
 * "300+ businesses served across 10+ countries" is kept, on Vikas's explicit
 * instruction (13 Sep 2026), and appears in eight places across the site. It is
 * a founder-asserted figure rather than one derived from a client list in this
 * repo. If it is ever challenged publicly, the client list is the thing that has
 * to exist — not a softer form of words.
 *
 * Named outcomes on this page are limited to engagements published on this site:
 * TRU Aquapolis (Real Estate) and Wise Market / Mini Leaves (E-commerce). The
 * other four categories are described by what the work involves, not by results
 * we cannot attribute. An empty proof slot is cheaper than a borrowed one.
 */

/** What actually differs by category — the structural variable, not the vibe. */
const WHAT_CHANGES = [
  {
    label: "The unit of value",
    body: "A ₹2.5 crore apartment and a ₹900 toy do not tolerate the same cost per lead, the same sales cycle, or the same definition of a qualified enquiry. Before anything else we establish what one customer is worth — and if nobody in the business can answer that, that is the first project, not the media plan.",
  },
  {
    label: "Who actually decides",
    body: "In D2C one person decides in ninety seconds. In B2B SaaS a committee of six decides over four months, and half of them will never click an ad. In education a parent decides and a student influences. The channel mix is downstream of that; it is not a preference.",
  },
  {
    label: "Where the measurement breaks",
    body: "Property closes offline, so the CRM is the only honest scoreboard. Healthcare cannot pass identifiable data to ad platforms. Professional services convert on reputation that no attribution model can see. Each category breaks measurement in its own specific place, and that place is where we start.",
  },
  {
    label: "How seasonal the demand is",
    body: "Admissions have intake windows. Property has launch cycles and festive quarters. E-commerce has a handful of weeks that carry the year. Treating a seasonal category as an always-on one is how budget gets spent at the wrong time at the wrong price.",
  },
];

/** The honest position on industry specialisation. */
const TRANSFER = [
  {
    title: "What transfers across categories",
    points: [
      "Measurement discipline. Broken attribution looks the same in property as it does in SaaS, and fixing it is the same work.",
      "Lead qualification as a marketing responsibility rather than a sales complaint.",
      "The diagnostic itself — finding the single constraint before spending against it.",
      "Conversion work. Pages lose people for the same handful of reasons in every category.",
    ],
  },
  {
    title: "What does not transfer",
    points: [
      "Creative language, objection handling, and what counts as proof to that buyer.",
      "Benchmarks. A cost per lead that is excellent in real estate is catastrophic in D2C.",
      "Channel priority. Search-led, social-led and referral-led categories are not interchangeable.",
      "Compliance constraints — healthcare, finance and education each have their own, and they shape the media plan before creative ever does.",
    ],
  },
];

const FAQS = [
  {
    q: "Do you only work in these six categories?",
    a: "No. These are the categories where we have enough repeat exposure to be useful on day one rather than quarter two. Work outside them starts the same way — with a diagnostic — and we will say plainly in that document if we think category inexperience will cost you time.",
  },
  {
    q: "Why do only two industry pages carry named results?",
    a: "Because only two have engagements we can both name and evidence: TRU Aquapolis in real estate, Wise Market and Mini Leaves in e-commerce. The other four describe the work rather than the outcome. We would rather have visibly empty proof slots than fill them with averages nobody can check.",
  },
  {
    q: "Is an industry specialist better than a generalist here?",
    a: "For creative and objection handling, frequently yes. For diagnosing why growth has stalled, frequently no — a specialist who has only ever seen one category tends to mistake category habit for best practice. The section above is our honest split between what carries across and what does not.",
  },
  {
    q: "We're in a regulated category. Does that change the engagement?",
    a: "It changes what data can reach an ad platform, which changes measurement, which changes everything downstream. Healthcare and financial services both need that settled in the first fortnight rather than discovered in month three. Tell us the constraint early and it shapes the plan instead of breaking it.",
  },
  {
    q: "Can you share references in our category?",
    a: "On a call, yes, including for clients whose work is not written up on this site. What we will not do is publish a client's numbers without their agreement, or reproduce CRM records that sit under an NDA.",
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

export default async function IndustriesHubPage() {
  const industries = await sanity.fetch<Industry[]>(allIndustriesQuery);

  return (
    <>
      <GlobalNav />
      <main>
        {/* ── Hero ──
            REBUILT 15 SEP 2026, same fault as /solutions: a single left-hand
            column left the right half of the first viewport empty, and there
            was no call to action above the card grid at all.

            The diagram argues the headline directly — one constant method line
            held against six categories whose customer value differs by orders
            of magnitude. See the sourcing note in HubDiagrams.tsx: the bars
            carry no figures, deliberately. */}
        <section className="border-b border-ink-headline/10">
          <div className="container-layout pt-16 md:pt-24 pb-16 md:pb-20">
            <div className="grid md:grid-cols-12 gap-10 md:gap-14 items-center">
              <div className="md:col-span-7">
                <div className="flex items-center gap-4 mb-7">
                  <span aria-hidden="true" className="block w-2.5 h-2.5 bg-brand-yellow flex-shrink-0" />
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
                    Industries &mdash; Six categories
                  </p>
                </div>
                <h1 className="font-light tracking-[-0.03em] text-display-xl text-ink-headline mb-7 max-w-[19ch] text-balance">
                  The method is the same. What a customer is worth is not.
                </h1>
                <p className="font-body text-body-lg text-ink-body max-w-[54ch] leading-[1.6]">
                  Six categories, 300+ businesses served across 10+ countries.
                  Each page below sets out what is structurally broken in that
                  category and the sequence we run to fix it &mdash; and where
                  we have a named result, it is there with the spend attached
                  to it.
                </p>
                <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-5">
                  <Link
                    href="/book-consultation"
                    className="inline-flex items-center gap-3 bg-brand-yellow text-ink-headline font-display font-light text-display-xs px-8 py-4 hover:bg-emerald-900 hover:text-white transition-colors duration-hover"
                  >
                    <span>Apply for a diagnostic</span>
                    <span aria-hidden="true">&rarr;</span>
                  </Link>
                  <Link
                    href="/work"
                    className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.18em] text-ink-headline border-b border-ink-headline pb-1 hover:text-ink-headline/60 hover:border-brand-yellow transition-colors duration-hover"
                  >
                    <span>See the named results</span>
                    <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              </div>
              <div className="md:col-span-5 flex items-center justify-center pt-6 md:pt-0">
                <ValueSpread />
              </div>
            </div>
          </div>
        </section>

        {/* ── Industry cards ──
            `items-stretch` + h-full inside the card: taglines differ in length,
            so E-commerce ran to three lines where its neighbours ran to two and
            the "Explore" links in a row sat at different baselines. */}
        <section className="container-layout py-20 md:py-28">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {industries.map((industry) => (
              <IndustryCard key={industry._id} industry={industry} />
            ))}
          </div>
        </section>

        {/* ── What changes by category ── */}
        <section
          className="bg-bg-secondary border-y border-ink-headline/10"
          aria-labelledby="changes-heading"
        >
          <div className="container-layout py-24 md:py-32">
            <div className="grid md:grid-cols-12 gap-8 md:gap-16 items-end mb-14 md:mb-20">
              <div className="md:col-span-7">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-6">
                  The variables
                </p>
                <h2
                  id="changes-heading"
                  className="font-display font-light tracking-[-0.025em] text-display-lg text-ink-headline max-w-[24ch] text-balance"
                >
                  Four things change when the category changes.
                </h2>
              </div>
              <p className="md:col-span-5 font-body text-body text-ink-muted leading-relaxed">
                &ldquo;Industry expertise&rdquo; is usually sold as familiarity
                with the jargon. The parts that actually matter are these, and
                they are structural.
              </p>
            </div>

            <ol className="border-t border-ink-headline/15">
              {WHAT_CHANGES.map((item, i) => (
                <li
                  key={item.label}
                  className="grid md:grid-cols-12 gap-x-8 gap-y-3 border-b border-ink-headline/15 py-8 md:py-10"
                >
                  <span className="md:col-span-1 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted md:pt-2">
                    0{i + 1}
                  </span>
                  <h3 className="md:col-span-4 font-display font-light text-display-sm text-ink-headline tracking-[-0.015em] leading-[1.15]">
                    {item.label}
                  </h3>
                  <p className="md:col-span-7 font-body text-body text-ink-body leading-relaxed max-w-[64ch]">
                    {item.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── What transfers / what doesn't ── */}
        <section
          className="container-layout py-24 md:py-32"
          aria-labelledby="transfer-heading"
        >
          <div className="mb-14 md:mb-20">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-6">
              Specialisation
            </p>
            <h2
              id="transfer-heading"
              className="font-display font-light tracking-[-0.025em] text-display-lg text-ink-headline max-w-[26ch] mb-6 text-balance"
            >
              Half of this work is category-blind. Say which half.
            </h2>
            <p className="font-body text-body-lg text-ink-body max-w-[62ch] leading-relaxed">
              Every agency claims industry expertise and almost none of them will
              tell you where it stops. Here is our split, so you can judge
              whether we are the right fit before you pay for anything.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 md:gap-16">
            {TRANSFER.map((col) => (
              <div key={col.title} className="border-t border-ink-headline/15 pt-7">
                <h3 className="font-display font-light text-display-sm text-ink-headline tracking-[-0.015em] mb-6">
                  {col.title}
                </h3>
                <ul className="space-y-5">
                  {col.points.map((p) => (
                    <li
                      key={p}
                      className="font-body text-body text-ink-body leading-relaxed pl-5 relative"
                    >
                      <span
                        aria-hidden="true"
                        className="absolute left-0 top-[0.65em] block w-2 h-[2px] bg-brand-yellow"
                      />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── Named proof ── */}
        <section className="bg-emerald-900 text-white">
          <div className="container-layout py-20 md:py-28">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60 mb-10">
              Where we have a number, it is attached to a client name
            </p>
            <div className="grid md:grid-cols-2 gap-12 md:gap-20">
              <div className="border-t border-white/20 pt-7">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/60 mb-4">
                  Real Estate
                </p>
                <p className="font-display font-light text-display-md leading-[1.1] tracking-[-0.02em] text-white max-w-[22ch]">
                  ₹1.4 Cr of media became ₹187.5 Cr in closed sales.
                </p>
                <p className="mt-5 font-body text-body text-white/75 leading-relaxed max-w-[46ch]">
                  TRU Aquapolis, January to August 2026. 6,000+ leads, over 70%
                  qualified at handover, 75 units closed by the client&rsquo;s own
                  sales team. The leads were ours; the close was theirs.
                </p>
                <Link
                  href="/work/tru-aquapolis"
                  className="mt-6 inline-block font-mono text-[11px] uppercase tracking-[0.2em] text-white border-b border-white/50 pb-1 hover:border-brand-yellow transition-colors"
                >
                  Read the case study &rarr;
                </Link>
              </div>
              <div className="border-t border-white/20 pt-7">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/60 mb-4">
                  E-commerce / D2C
                </p>
                <p className="font-display font-light text-display-md leading-[1.1] tracking-[-0.02em] text-white max-w-[22ch]">
                  Two written-up engagements, both with the working shown.
                </p>
                <p className="mt-5 font-body text-body text-white/75 leading-relaxed max-w-[46ch]">
                  Wise Market in Australia and Mini Leaves in India. Different
                  constraints, different fixes, and in both cases the reporting
                  had to be repaired before the spend was touched.
                </p>
                <Link
                  href="/work"
                  className="mt-6 inline-block font-mono text-[11px] uppercase tracking-[0.2em] text-white border-b border-white/50 pb-1 hover:border-brand-yellow transition-colors"
                >
                  See selected work &rarr;
                </Link>
              </div>
            </div>
            <p className="mt-14 font-body text-body-sm text-white/55 max-w-[70ch] leading-relaxed">
              The other four categories on this page do not carry headline
              numbers yet. That is deliberate. We publish a figure when the
              client has agreed to it and the arithmetic is ours to defend
              &mdash; not before.
            </p>
          </div>
        </section>

        {/* ── FAQs ── */}
        <section
          className="container-layout py-24 md:py-32"
          aria-labelledby="industries-faq-heading"
        >
          <div className="grid md:grid-cols-12 gap-8 md:gap-16">
            <div className="md:col-span-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-6">
                Questions
              </p>
              <h2
                id="industries-faq-heading"
                className="font-display font-light tracking-[-0.025em] text-display-lg text-ink-headline max-w-[16ch] text-balance"
              >
                The ones we actually get asked.
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
          heading="Don’t see your industry?"
          subhead="Apply for a Strategic Diagnostic anyway. We diagnose first and tell you where category inexperience would cost you — in writing, before you commit to anything."
          primary={{ label: "Apply for a Diagnostic", href: "/book-consultation" }}
          secondary={{ label: "Or just say hi", href: "/contact" }}
        />
      </main>
      <Footer />
    </>
  );
}
