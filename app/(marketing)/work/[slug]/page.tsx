import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { GlobalNav } from "@/components/nav/GlobalNav";
import { Footer } from "@/components/nav/Footer";
import { Button } from "@/components/ui/Button";
import { PortableText } from "@/components/article/PortableText";
import { PullQuote } from "@/components/blocks/PullQuote";
import { CTABanner } from "@/components/blocks/CTABanner";
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
  return {
    title: cs.seoTitle ?? `${cs.clientName} — ${cs.headlineMetric}`,
    description: cs.seoDescription,
  };
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

  const heroImg = cs.heroImage ? sanityImageProps(cs.heroImage, { width: 1600, height: 900 }) : null;

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

        {/* Hero image */}
        {heroImg && (
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
        )}

        {/* Narrative — long-form reading column */}
        <article className="container-reading py-12 space-y-16">
          {cs.situation && (
            <section>
              <h2 className="font-display font-extralight text-display-md text-ink-headline tracking-tight mb-6">
                The situation
              </h2>
              <PortableText value={cs.situation} />
            </section>
          )}

          {cs.diagnosis && (
            <section>
              <h2 className="font-display font-extralight text-display-md text-ink-headline tracking-tight mb-6">
                The diagnosis
              </h2>
              <PortableText value={cs.diagnosis} />
            </section>
          )}

          {cs.whatWeDid && (
            <section>
              <h2 className="font-display font-extralight text-display-md text-ink-headline tracking-tight mb-6">
                What we did
              </h2>
              <PortableText value={cs.whatWeDid} />
            </section>
          )}

          {cs.results && (
            <section>
              <h2 className="font-display font-extralight text-display-md text-ink-headline tracking-tight mb-6">
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
              <h2 className="font-display font-extralight text-display-md text-ink-headline tracking-tight mb-6">
                What this proves
              </h2>
              <PortableText value={cs.whatThisProves} />
            </section>
          )}
        </article>

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
          primary={{ label: "Book a Consultation", href: "/book-consultation" }}
          secondary={{ label: "See more outcomes", href: "/work" }}
        />
      </main>
      <Footer />
    </>
  );
}
