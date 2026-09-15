import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/meta";
import { getCaseStudyMetrics } from "@/lib/case-study-metrics";
import { CaseStudyMetrics } from "@/components/case-study/CaseStudyMetrics";
import { getCaseStudyImage } from "@/lib/case-study-images";
import { GlobalNav } from "@/components/nav/GlobalNav";
import { Footer } from "@/components/nav/Footer";
import { Button } from "@/components/ui/Button";
import { PortableText } from "@/components/article/PortableText";
import { PullQuote } from "@/components/blocks/PullQuote";
import { CTABanner } from "@/components/blocks/CTABanner";
import { getCaseVisuals } from "@/lib/case-visuals";
import { CaseChart } from "@/components/work/CaseCharts";
import { sanity } from "@/sanity/lib/client";
import { sanityImageProps } from "@/sanity/lib/image";
import { caseStudyBySlugQuery } from "@/sanity/lib/queries";
import type { CaseStudy, Industry, Solution, Quote } from "@/sanity/lib/types";

interface CaseStudyPageData extends CaseStudy {
  industry: Industry;
  solutionsUsed?: Solution[];
  founderQuote?: Quote;
}

// ─────────────────────────────────────────────
// Static generation
// ─────────────────────────────────────────────

export async function generateStaticParams() {
  const cases = await sanity.fetch<Array<{ slug: { current: string } }>>(
    `*[_type == "caseStudy"]{ slug }`
  );
  return cases.map((c) => ({ slug: c.slug.current }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const cs = await sanity.fetch<CaseStudyPageData | null>(caseStudyBySlugQuery, {
    slug: params.slug,
  });
  if (!cs) return {};
  return buildMetadata({
    title: cs.seoTitle ?? `${cs.clientName} — ${cs.headlineMetric}`,
    description: cs.seoDescription,
    path: `/work/${params.slug}`,
  });
}

// ─────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────

export default async function CaseStudyPage({
  params,
}: {
  params: { slug: string };
}) {
  const cs = await sanity.fetch<CaseStudyPageData | null>(caseStudyBySlugQuery, {
    slug: params.slug,
  });

  if (!cs) notFound();

  const metrics = getCaseStudyMetrics(params.slug);
  /* Stat band + chart. Null for any case without published figures, which is
     the intended state rather than a gap to fill — see lib/case-visuals.ts. */
  const visuals = getCaseVisuals(params.slug);
  const heroImg = cs.heroImage ? sanityImageProps(cs.heroImage, { width: 1600, height: 900 }) : null;
  const heroFallback = !cs.heroImage ? getCaseStudyImage(params.slug) : null;

  return (
    <>
      <GlobalNav />
      <main>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="container-layout pt-8">
          <ol className="flex items-center gap-2 font-body text-body-sm text-ink-muted">
            <li>
              <Link href="/work" className="hover:text-brand-blue transition-colors">
                Work
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-ink-headline">{cs.clientName}</li>
          </ol>
        </nav>

        {/* Hero */}
        <section className="container-layout pt-12 pb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-body text-eyebrow text-brand-blue uppercase">
              {cs.clientName}
            </span>
            <span className="text-ink-muted" aria-hidden="true">·</span>
            <Link
              href={`/industries/${cs.industry.slug.current}`}
              className="font-body text-eyebrow text-ink-muted uppercase hover:text-brand-blue transition-colors"
            >
              {cs.industry.name}
            </Link>
          </div>
          <h1 className="font-extralight tracking-tight text-display-xl text-ink-headline mb-6 max-w-[24ch]">
            {cs.headlineMetric}
          </h1>
          {cs.headlineTimeframe && (
            <p className="font-body text-body-lg text-ink-body">
              {cs.headlineTimeframe}
            </p>
          )}
        </section>

        {/* ── Stat band ──
            ADDED 15 SEP 2026. These pages ran ~5,900px of unbroken prose in a
            single narrow column with no visual break between the hero image
            and the footer. The strongest figures on the whole site were buried
            as bullet points inside that prose — a reader skims past "₹0.58 per
            person reached" in a sentence, and stops on it in 38px type.

            Every figure is lifted from the same page's own narrative; see the
            sourcing rule at the top of lib/case-visuals.ts. Cases with no hard
            published numbers (Homatico) render no band at all rather than a
            band of invented ones. */}
        {visuals?.stats && visuals.stats.length > 0 && (
          <section className="container-layout pb-16">
            <dl className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 border-t border-ink-headline/15 pt-10">
              {visuals.stats.map((s) => (
                <div key={s.label}>
                  <dt className="font-display font-extralight text-display-md text-ink-headline leading-none tracking-[-0.02em]">
                    {s.value}
                  </dt>
                  <dd className="mt-3 font-body text-body-sm text-ink-body leading-snug max-w-[24ch]">
                    {s.label}
                    {s.note && (
                      <span className="block mt-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">
                        {s.note}
                      </span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        {/* Hero image */}
        {heroImg ? (
          <section className="container-layout pb-16">
            <div className="relative aspect-[16/9] rounded-lg overflow-hidden bg-bg-secondary">
              <Image
                src={heroImg.src}
                alt={heroImg.alt}
                fill
                priority
                sizes="100vw"
                className="object-cover"
                placeholder={heroImg.blurDataURL ? "blur" : "empty"}
                blurDataURL={heroImg.blurDataURL}
              />
            </div>
          </section>
        ) : heroFallback ? (
          <section className="container-layout pb-16">
            <div className="relative aspect-[16/9] rounded-lg overflow-hidden bg-bg-secondary">
              <Image
                src={heroFallback}
                alt={`${cs.clientName} — case study`}
                fill
                priority
                sizes="100vw"
                className="object-cover"
                unoptimized
              />
            </div>
          </section>
        ) : null}

        {/* Narrative — long-form reading column */}
        <article className="container-reading py-12 space-y-16">
          {cs.situation && (
            <section>
              <h2 className="font-display font-light text-display-md text-ink-headline tracking-tight mb-6">
                The situation
              </h2>
              <PortableText value={cs.situation} />
            </section>
          )}

          {cs.diagnosis && (
            <section>
              <h2 className="font-display font-light text-display-md text-ink-headline tracking-tight mb-6">
                The diagnosis
              </h2>
              <PortableText value={cs.diagnosis} />
            </section>
          )}
        </article>

        {/* ── The chart ──
            Deliberately placed BETWEEN the diagnosis and what-we-did, and
            deliberately breaking out of the narrow reading column.

            Position: the diagnosis is where the problem is stated and the next
            section is where it gets solved, so this is the one point in the
            page where a reader needs to be convinced the problem was real.
            Putting it at the top would make it decoration; putting it at the
            bottom would make it a summary of something they already believe.

            Width: it sits outside <article> because container-reading is
            ~720px and a comparison at that width is a thumbnail. Breaking the
            column is also the visual rest the page badly needed — it is the
            only thing between the hero and the footer that is not a paragraph. */}
        {visuals?.chart && (
          <section className="bg-bg-secondary border-y border-ink-headline/10 my-4">
            <div className="container-layout py-16 md:py-20">
              {visuals.chartCaption && (
                <p className="font-body text-body text-ink-body leading-relaxed max-w-[62ch] mb-10">
                  {visuals.chartCaption}
                </p>
              )}
              <CaseChart chart={visuals.chart} />
            </div>
          </section>
        )}

        <article className="container-reading py-12 space-y-16">
          {cs.whatWeDid && (
            <section>
              <h2 className="font-display font-light text-display-md text-ink-headline tracking-tight mb-6">
                What we did
              </h2>
              <PortableText value={cs.whatWeDid} />
            </section>
          )}

          {cs.results && (
            <section>
              <h2 className="font-display font-light text-display-md text-ink-headline tracking-tight mb-6">
                What changed
              </h2>
              <PortableText value={cs.results} />
            </section>
          )}

          {cs.founderQuote && (
            <PullQuote quote={cs.founderQuote} variant="large" />
          )}

          {cs.whatThisProves && (
            <section>
              <h2 className="font-display font-light text-display-md text-ink-headline tracking-tight mb-6">
                What this proves
              </h2>
              <PortableText value={cs.whatThisProves} />
            </section>
          )}
        </article>

        {/* By the numbers — charts (renders when metrics exist for this slug) */}
        {metrics && <CaseStudyMetrics data={metrics} />}

        {/* Solutions deployed */}
        {cs.solutionsUsed && cs.solutionsUsed.length > 0 && (
          <section className="container-layout py-16 border-t border-rule">
            <p className="eyebrow mb-6">Solutions deployed</p>
            <div className="flex flex-wrap gap-3">
              {cs.solutionsUsed.map((solution) => (
                <Link
                  key={solution._id}
                  href={`/solutions/${solution.slug.current}`}
                  className="px-5 py-2.5 bg-bg-secondary border border-rule rounded-md font-body text-body-sm text-ink-headline hover:border-brand-blue hover:text-brand-blue transition-colors duration-hover"
                >
                  {solution.name}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <CTABanner
          eyebrow="Engage"
          heading="Want a system like this for your business?"
          subhead="Apply for a Strategic Diagnostic. Honest assessment, written deliverable, no agency-pitch dressed up as a report."
          primary={{ label: "Book a Call", href: "/book-consultation" }}
          secondary={{ label: "See more outcomes", href: "/work" }}
        />
      </main>
      <Footer />
    </>
  );
}
