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
      <main>
        {/* Left-aligned rather than centred: centred display type at this size
            forces the eye back to the left edge on every line, and the outcome
            strip below needs a consistent left rule to align against. */}
        <section className="container-layout pt-20 md:pt-28 pb-14">
          <p className="eyebrow mb-6">Work</p>
          {/* Derived from the actual case-study count — the previous copy
              hardcoded "Three businesses. Three industries." and would have
              gone stale the moment a fourth study was published. */}
          <h1 className="font-extralight tracking-tight text-display-xl text-ink-headline mb-8 max-w-[20ch] text-balance">
            {caseCountWord} businesses. {industryCountWord} industries. One pattern.
          </h1>
          <p className="font-body text-body-lg text-ink-body max-w-[54ch]">
            When marketing structure is built right, the channels start compounding. Each story
            below is the system we built and the numbers it produced — not the campaign that
            happened to land.
          </p>

          {/* Outcome strip — pulls the strongest numbers above the fold so the
              page leads with proof instead of with a filter row. */}
          <dl className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8 border-t border-ink-headline/15 pt-10">
            {[
              ["₹34 Cr+", "Pipeline built on ₹39.7L of media"],
              ["67×", "Revenue growth in six months"],
              ["#1", "For a client's own category term"],
              ["85×", "Best media-to-pipeline ratio"],
            ].map(([v, l]) => (
              <div key={l}>
                <dt className="font-display font-extralight text-[clamp(26px,2.4vw,38px)] text-ink-headline leading-none tracking-[-0.02em]">
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
