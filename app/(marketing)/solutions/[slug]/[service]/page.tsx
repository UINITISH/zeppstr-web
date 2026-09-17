import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/meta";
import { GlobalNav } from "@/components/nav/GlobalNav";
import { Footer } from "@/components/nav/Footer";
import { Button } from "@/components/ui/Button";
import { PortableText } from "@/components/article/PortableText";
import { CaseStudyCard } from "@/components/cards/CaseStudyCard";
import { FAQAccordion } from "@/components/blocks/FAQAccordion";
import { CTABanner } from "@/components/blocks/CTABanner";
import { sanity } from "@/sanity/lib/client";
import { subServiceBySlugQuery } from "@/sanity/lib/queries";
import type { SubService, CaseStudy } from "@/sanity/lib/types";

interface SubServiceWithRelated extends SubService {
  relatedCaseStudy?: CaseStudy;
}

// ─────────────────────────────────────────────
// Static generation
// ─────────────────────────────────────────────

export async function generateStaticParams() {
  const subServices = await sanity.fetch<
    Array<{ slug: { current: string }; parentSolution: { slug: { current: string } } }>
  >(`*[_type == "subService"]{ slug, parentSolution->{slug} }`);
  return subServices.map((s) => ({
    slug: s.parentSolution.slug.current,
    service: s.slug.current,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string; service: string };
}): Promise<Metadata> {
  const subService = await sanity.fetch<SubServiceWithRelated | null>(subServiceBySlugQuery, {
    parent: params.slug,
    slug: params.service,
  });
  if (!subService) return {};
  return buildMetadata({
    title: subService.seoTitle ?? subService.name,
    description: subService.seoDescription ?? subService.tagline,
    path: `/solutions/${params.slug}/${params.service}`,
  });
}

// ─────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────

export default async function SubServicePage({
  params,
}: {
  params: { slug: string; service: string };
}) {
  const subService = await sanity.fetch<SubServiceWithRelated | null>(subServiceBySlugQuery, {
    parent: params.slug,
    slug: params.service,
  });

  if (!subService) notFound();

  return (
    <>
      <GlobalNav />
      <main>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="container-layout pt-8">
          <ol className="flex items-center gap-2 font-body text-body-sm text-ink-muted">
            <li>
              <Link href="/solutions" className="hover:text-brand-blue transition-colors">
                Solutions
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                href={`/solutions/${subService.parentSolution.slug.current}`}
                className="hover:text-brand-blue transition-colors"
              >
                {subService.parentSolution.name}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-ink-headline">{subService.name}</li>
          </ol>
        </nav>

        {/* Hero — H1 uses elevated name, sub-deck keeps legacy keyword for SEO */}
        <section className="container-layout pt-12 pb-16">
          <p className="eyebrow mb-6">
            <Link
              href={`/solutions/${subService.parentSolution.slug.current}`}
              className="hover:text-brand-blue transition-colors"
            >
              {subService.parentSolution.name}
            </Link>
          </p>
          <h1 className="font-extralight tracking-tight text-display-xl text-ink-headline mb-6 max-w-[20ch]">
            {subService.name}
          </h1>
          {subService.tagline && (
            <p className="font-body text-body-lg text-ink-body max-w-[60ch] mb-8">
              {subService.tagline}
            </p>
          )}
          {subService.legacyName && (
            <p className="font-body text-body-sm text-ink-muted mb-10 italic">
              Also known as {subService.legacyName} — the elevated practice we run
              for businesses where {subService.legacyName.toLowerCase()} is meant to compound revenue, not just hit the dashboard.
            </p>
          )}
          <Button asChild>
            <Link href="/book-consultation">Apply for an Audit</Link>
          </Button>
        </section>

        {/* What's included */}
        {subService.whatsIncluded && (
          <section className="container-reading py-16 border-t border-rule">
            <h2 className="font-display font-light text-display-md text-ink-headline tracking-tight mb-8">
              What’s included
            </h2>
            <PortableText value={subService.whatsIncluded} />
          </section>
        )}

        {/* Methodology */}
        {subService.methodology && (
          <section className="container-reading py-16 border-t border-rule">
            <h2 className="font-display font-light text-display-md text-ink-headline tracking-tight mb-8">
              How we deliver
            </h2>
            <PortableText value={subService.methodology} />
          </section>
        )}

        {/* Related case study */}
        {subService.relatedCaseStudy && (
          <section className="container-layout py-20 border-t border-rule">
            <div className="mb-10">
              <p className="eyebrow mb-4">Outcome</p>
              <h2 className="font-display font-light text-display-lg text-ink-headline tracking-tight">
                Where this practice has delivered.
              </h2>
            </div>
            <div className="max-w-2xl">
              <CaseStudyCard caseStudy={subService.relatedCaseStudy} variant="featured" />
            </div>
          </section>
        )}

        {/* FAQs */}
        {subService.faqs && subService.faqs.length > 0 && (
          <FAQAccordion
            faqs={subService.faqs}
            eyebrow="FAQs"
            heading="Common questions"
            className="border-t border-rule"
          />
        )}

        {/* CTA */}
        <CTABanner
          eyebrow="Engage"
          heading={`Ready to engage on ${subService.name}?`}
          subhead="Apply for a Strategic Diagnostic or a service-specific audit."
          primary={{ label: "Apply for a Diagnostic", href: "/book-consultation" }}
          secondary={{ label: "Or just say hi", href: "/contact" }}
        />
      </main>
      <Footer />
    </>
  );
}
