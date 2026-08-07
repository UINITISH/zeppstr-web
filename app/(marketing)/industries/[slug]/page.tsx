import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
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
import { sanityImageProps, sanityImageSquare } from "@/sanity/lib/image";
import { industryBySlugQuery } from "@/sanity/lib/queries";
import type { Industry, CaseStudy, ClientLogo, Solution } from "@/sanity/lib/types";

interface IndustryPageData extends Industry {
  featuredCaseStudy?: CaseStudy;
  allClientLogos?: ClientLogo[];
  solutionsMostUsed?: Solution[];
}

// ─────────────────────────────────────────────
// Static generation
// ─────────────────────────────────────────────

export async function generateStaticParams() {
  const industries = await sanity.fetch<Array<{ slug: { current: string } }>>(
    `*[_type == "industry"]{ slug }`
  );
  return industries.map((i) => ({ slug: i.slug.current }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const industry = await sanity.fetch<IndustryPageData | null>(industryBySlugQuery, {
    slug: params.slug,
  });
  if (!industry) return {};
  return buildMetadata({
    title: industry.seoTitle ?? industry.name,
    description: industry.seoDescription ?? industry.heroClaim,
    path: `/industries/${params.slug}`,
  });
}

// ─────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────

export default async function IndustryPage({
  params,
}: {
  params: { slug: string };
}) {
  const industry = await sanity.fetch<IndustryPageData | null>(industryBySlugQuery, {
    slug: params.slug,
  });

  if (!industry) notFound();

  const heroImg = industry.heroImage ? sanityImageProps(industry.heroImage, { width: 1600, height: 700 }) : null;

  return (
    <>
      <GlobalNav />
      <main>
        {/* Hero */}
        <section className="container-layout pt-12 md:pt-20 pb-16">
          <p className="eyebrow mb-6">Industry</p>
          <h1 className="font-extralight tracking-tight text-display-xl text-ink-headline mb-6 max-w-[22ch]">
            {industry.name}
          </h1>
          {industry.heroClaim && (
            <p className="font-body text-body-lg text-ink-body max-w-[60ch] mb-10">
              {industry.heroClaim}
            </p>
          )}
          <div className="flex flex-wrap gap-4">
            <Button asChild>
              <Link href="/book-consultation">Apply for an {industry.name} Diagnostic</Link>
            </Button>
            {industry.featuredCaseStudy && (
              <Button asChild variant="secondary">
                <Link href={`/work/${industry.featuredCaseStudy.slug.current}`}>
                  Read the {industry.featuredCaseStudy.clientName} story
                </Link>
              </Button>
            )}
          </div>
        </section>

        {/* Hero image */}
        {heroImg && (
          <section className="container-layout pb-16">
            <div className="relative aspect-[21/9] rounded-lg overflow-hidden bg-bg-secondary">
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

        {/* What's broken */}
        {industry.whatsBroken && (
          <section className="container-reading py-16 border-t border-rule">
            <h2 className="font-display font-extralight text-display-md text-ink-headline tracking-tight mb-8">
              What&rsquo;s broken in most {industry.name.toLowerCase()} marketing
            </h2>
            <PortableText value={industry.whatsBroken} />
          </section>
        )}

        {/* Our approach */}
        {industry.ourApproach && (
          <section className="container-reading py-16 border-t border-rule">
            <h2 className="font-display font-extralight text-display-md text-ink-headline tracking-tight mb-8">
              Our approach for {industry.name.toLowerCase()}
            </h2>
            <PortableText value={industry.ourApproach} />
          </section>
        )}

        {/* Featured case study */}
        {industry.featuredCaseStudy && (
          <section className="container-layout py-20 border-t border-rule">
            <div className="mb-10">
              <p className="eyebrow mb-4">Featured outcome</p>
              <h2 className="font-display font-extralight text-display-lg text-ink-headline tracking-tight">
                Where we&rsquo;ve delivered in {industry.name.toLowerCase()}.
              </h2>
            </div>
            <div className="max-w-3xl">
              <CaseStudyCard caseStudy={industry.featuredCaseStudy} variant="featured" />
            </div>
          </section>
        )}

        {/* Other client logos in this industry */}
        {industry.allClientLogos && industry.allClientLogos.length > 0 && (
          <section className="container-layout py-20 border-t border-rule">
            <p className="eyebrow text-center mb-8">
              Other {industry.name.toLowerCase()} brands we&rsquo;ve worked with
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 opacity-80">
              {industry.allClientLogos.map((client) => {
                const logo = sanityImageSquare(client.logo, 200);
                if (!logo) return null;
                return (
                  <div key={client._id} className="flex items-center justify-center">
                    <Image
                      src={logo.src}
                      alt={`${client.clientName} logo`}
                      width={120}
                      height={60}
                      className="object-contain max-h-[60px] w-auto"
                    />
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Solutions most used */}
        {industry.solutionsMostUsed && industry.solutionsMostUsed.length > 0 && (
          <section className="container-layout py-20 border-t border-rule">
            <div className="mb-10">
              <p className="eyebrow mb-4">Solutions most-used</p>
              <h2 className="font-display font-extralight text-display-lg text-ink-headline tracking-tight">
                The practices we run for this industry.
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {industry.solutionsMostUsed.map((solution) => (
                <Link
                  key={solution._id}
                  href={`/solutions/${solution.slug.current}`}
                  className="group block bg-bg-secondary border border-rule rounded-lg p-6 hover:border-brand-blue transition-all duration-hover"
                >
                  <h3 className="font-body font-semibold text-body-lg text-ink-headline mb-2 group-hover:text-brand-blue transition-colors">
                    {solution.name}
                  </h3>
                  {solution.tagline && (
                    <p className="font-body text-body-sm text-ink-muted leading-relaxed">
                      {solution.tagline}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* FAQs */}
        {industry.industryFaqs && industry.industryFaqs.length > 0 && (
          <FAQAccordion
            faqs={industry.industryFaqs}
            eyebrow="FAQs"
            heading={`${industry.name}-specific questions`}
            className="border-t border-rule"
          />
        )}

        {/* CTA */}
        <CTABanner
          eyebrow="Engage"
          heading={`Running a ${industry.name.toLowerCase()} business?`}
          subhead={`Apply for an ${industry.name} Diagnostic. We'll review your channel mix, conversion funnel, and the structure underneath your marketing.`}
          primary={{ label: `Apply for an ${industry.name} Diagnostic`, href: "/book-consultation" }}
          secondary={{ label: "Or just say hi", href: "/contact" }}
        />
      </main>
      <Footer />
    </>
  );
}
