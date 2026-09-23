import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/meta";
import { GlobalNav } from "@/components/nav/GlobalNav";
import { Footer } from "@/components/nav/Footer";
import { FilterableWorkGrid } from "@/components/work/FilterableWorkGrid";
import { CTABanner } from "@/components/blocks/CTABanner";
import { SectorRecord } from "@/components/blocks/SectorRecord";
import { ClientRoster } from "@/components/work/ClientRoster";
import { sanity } from "@/sanity/lib/client";
import { allCaseStudiesQuery } from "@/sanity/lib/queries";
import { CASE_STUDY_IMAGES } from "@/lib/case-study-images";
import { GridOverlay } from "@/components/blocks/GridOverlay";
import { CompoundingPattern } from "@/components/utility/PageDiagrams";
import Link from "next/link";
import type { CaseStudy, Industry } from "@/sanity/lib/types";

interface CaseStudyListItem extends Pick<CaseStudy, "_id" | "clientName" | "slug" | "headlineMetric" | "headlineTimeframe" | "heroImage"> {
  industry?: Pick<Industry, "_id" | "name" | "slug">;
}

export const metadata: Metadata = buildMetadata({
  title: "Work · Client Outcomes",
  description:
    "Three flagship case studies and growing portfolio. Real revenue numbers, real client transformations, across e-commerce, real estate, government, and DTC.",
  path: "/work",
})

/** Small-number words read better than digits in display copy. */
const NUMBER_WORDS = [
  "Zero", "One", "Two", "Three", "Four", "Five", "Six",
  "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve",
];

function toWord(n: number): string {
  return NUMBER_WORDS[n] ?? String(n);
}

export default async function WorkHubPage() {
  const cases = await sanity.fetch<CaseStudyListItem[]>(allCaseStudiesQuery);

  const caseCountWord = toWord(cases.length);
  const industryCountWord = toWord(
    new Set(cases.map((c) => c.industry?.name).filter(Boolean)).size
  );

  // Generate an on-brand thumbnail for any case study without a real heroImage.
  // Real images uploaded in Sanity take precedence automatically.
  const casesWithThumbs = cases.map((c) => ({
    ...c,
    // Priority: real Sanity image → industry placeholder photo → generated branded thumb.
    screenshotSrc: c.heroImage
      ? undefined
      : CASE_STUDY_IMAGES[c.slug.current] ?? `/work-thumb/${c.slug.current}`,
  }));

  return (
    <>
      <GlobalNav />
      <main className="relative">
        <GridOverlay />

        {/* ── Hero ──
            Rebuilt to the house pattern used by every solution, sub-service and
            industry page: yellow square eyebrow, bold clamp headline, claim,
            diagram beside it. The outcome strip stays directly beneath, so the
            page still leads with proof rather than with a filter row. */}
        <section className="relative bg-bg-primary border-b border-ink-headline/10 overflow-hidden">
          <div className="container-layout pt-12 md:pt-16 pb-16 md:pb-20">
            <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-center">
              <div className="md:col-span-7">
                <div className="flex items-center gap-4 mb-8">
                  <span aria-hidden="true" className="block w-2.5 h-2.5 bg-brand-yellow flex-shrink-0" />
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
                    Work — Client outcomes
                  </p>
                </div>
                {/* Counts derive from the published case studies — the original
                    copy hardcoded "Three businesses. Three industries." and
                    went stale the moment a fourth was published. */}
                <h1 className="font-bold tracking-[-0.025em] text-display-xl text-ink-headline leading-[1.16] max-w-[15ch] text-balance mb-8">
                  {caseCountWord} businesses. {industryCountWord} industries.{" "}
                  <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                    One pattern
                  </span>
                  .
                </h1>
                <p className="font-body text-body-lg text-ink-body leading-[1.55] max-w-[54ch] mb-10">
                  When marketing structure is built right, the channels start
                  compounding. Each story below is the system we built and the
                  numbers it produced — not the campaign that happened to
                  land.
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
                    href="/work/tru-aquapolis"
                    className="font-mono text-[12px] uppercase tracking-[0.18em] text-ink-headline border-b border-ink-headline pb-0.5 hover:text-ink-headline/60 hover:border-brand-yellow transition-colors"
                  >
                    Read the Aquapolis story &rarr;
                  </Link>
                </div>
              </div>
              <div className="md:col-span-5 flex items-center justify-center pt-8 md:pt-0">
                <CompoundingPattern />
              </div>
            </div>
          </div>
        </section>

        {/* Outcome strip — the strongest numbers, directly under the hero. */}
        <section className="container-layout pt-14 pb-14">
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8 border-t border-ink-headline/15 pt-10">
            {[
              ["₹187.5 Cr", "Closed from leads we generated"],
              ["75", "Apartments sold on ₹1.4 Cr of media"],
              ["67×", "Revenue growth in six months"],
              ["#1", "For a client's own category term"],
            ].map(([v, l]) => (
              <div key={l}>
                <dt className="font-display font-extralight text-display-md text-ink-headline leading-none tracking-[-0.02em]">
                  {v}
                </dt>
                <dd className="mt-3 font-body text-body-sm text-ink-muted leading-snug max-w-[22ch]">
                  {l}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* All case studies */}
        {cases.length > 0 && (
          <section className="container-layout pb-20">
            <FilterableWorkGrid cases={casesWithThumbs as any} />
          </section>
        )}

        {/* Empty state if no cases yet */}
        {cases.length === 0 && (
          <div className="container-layout py-20 text-center">
            <p className="font-body text-body-lg text-ink-muted">
              First case studies publishing soon.{" "}
              {/* Was /insights/the-brief — no such article exists, so the link
                  404'd. /insights carries the newsletter signup inline. */}
              <a href="/insights" className="text-brand-blue underline">
                Subscribe to The Brief
              </a>{" "}
              to get them in your inbox.
            </p>
          </div>
        )}

        {/* Named clients without a published case study yet — no metric, no
            link, deliberately. See ClientRoster.tsx for the promotion rule. */}
        <ClientRoster />

        {/* Anonymised aggregate proof for work delivered under third-party
            agreements that don't permit naming the client. */}
        <SectorRecord />

        <CTABanner
          eyebrow="Engage"
          heading="Want a system like this for your business?"
          subhead="Apply for a Strategic Diagnostic. Honest assessment, written deliverable, no agency-pitch dressed up as a report."
          primary={{ label: "Apply for a Diagnostic", href: "/book-consultation" }}
          secondary={{ label: "Or just say hi", href: "/contact" }}
        />
      </main>
      <Footer />
    </>
  );
}
