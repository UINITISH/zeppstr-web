import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/meta";
import { GlobalNav } from "@/components/nav/GlobalNav";
import { Footer } from "@/components/nav/Footer";
import { Button } from "@/components/ui/Button";
import { PortableText } from "@/components/article/PortableText";
import { indefiniteArticle } from "@/lib/indefinite-article";
import { CaseStudyCard } from "@/components/cards/CaseStudyCard";
import { FAQAccordion } from "@/components/blocks/FAQAccordion";
import { CTABanner } from "@/components/blocks/CTABanner";
import { GridOverlay } from "@/components/blocks/GridOverlay";
import { IndustryDiagram } from "@/components/utility/IndustryDiagrams";
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

  /**
   * "Apply for an Real Estate Diagnostic" was rendering on four of the six
   * pages. The article has to agree with the industry name, not be hard-coded.
   */
  /**
   * NAME CASING: these headings used industry.name.toLowerCase(), which reads
   * fine for "real estate" and badly for the rest — "most saas / tech
   * marketing", "most edtech & education marketing". Brand and product casing
   * is not ours to flatten, so the name is used as written.
   */

  /**
   * The article has to agree with how the name is SPOKEN, not spelled.
   *
   * A plain vowel test gets "an EdTech" right and "a SaaS" wrong — S is a
   * consonant but "SaaS" is said "sass", so it takes "a". Conversely "an MBA",
   * "an SEO audit": consonant letters whose names begin with a vowel sound.
   *
   * So: if the first word is an all-caps acronym that is read letter by letter,
   * use the sound of that first letter. Otherwise fall back to the spelling.
   * Current industry names — Real Estate, E-commerce / D2C, SaaS / Tech,
   * Healthcare & Wellness, EdTech & Education, Professional Services — are all
   * handled correctly by this. Check any new one by reading it aloud.
   */
  const article = indefiniteArticle(industry.name);

  return (
    <>
      <GlobalNav />
      <main className="relative">
        <GridOverlay />
        {/* ─── HERO — copy left, industry diagram right ───
            Matches the solution and sub-service pages exactly: yellow square
            eyebrow, bold clamp headline, claim, then actions. Previously this
            was a centred stack of light type with nothing beside it. */}
        <section className="relative bg-bg-primary border-b border-ink-headline/10 overflow-hidden">
          <div className="container-layout pt-12 md:pt-16 pb-20 md:pb-28">
            <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-center">
              <div className="md:col-span-7">
                <div className="flex items-center gap-4 mb-8">
                  <span
                    aria-hidden="true"
                    className="block w-2.5 h-2.5 bg-brand-yellow flex-shrink-0"
                  />
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
                    Practice — Industry
                  </p>
                </div>

                <h1 className="font-bold tracking-[-0.025em] text-display-xl text-ink-headline leading-[1.16] max-w-[16ch] text-balance mb-8">
                  {industry.name}
                </h1>

                {industry.heroClaim && (
                  <p className="font-body text-body-lg text-ink-body leading-[1.55] max-w-[54ch] mb-10">
                    {industry.heroClaim}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    href="/book-consultation"
                    className="inline-flex items-center gap-3 bg-brand-yellow text-ink-headline font-display font-light text-display-xs px-8 py-4 hover:bg-emerald-900 hover:text-white transition-colors duration-hover"
                  >
                    <span>Apply for {article} {industry.name} diagnostic</span>
                    <span aria-hidden="true">&rarr;</span>
                  </Link>
                  {industry.featuredCaseStudy && (
                    <Link
                      href={`/work/${industry.featuredCaseStudy.slug.current}`}
                      className="font-mono text-[12px] uppercase tracking-[0.18em] text-ink-headline border-b border-ink-headline pb-0.5 hover:text-ink-headline/60 hover:border-brand-yellow transition-colors"
                    >
                      {industry.featuredCaseStudy.clientName} &rarr;
                    </Link>
                  )}
                </div>
              </div>

              <div className="md:col-span-5 flex items-center justify-center pt-8 md:pt-0">
                {/* Hero diagram, keyed by industry slug. The six industry
                    pages were the only top-level pages with no hero graphic,
                    which made the whole section read as an older part of the
                    site. The slug is passed as a string and resolved inside a
                    client component — see IndustryDiagrams.tsx for why. */}
                <IndustryDiagram slug={params.slug} />
              </div>
            </div>
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
            <h2 className="font-display font-light text-display-md text-ink-headline tracking-tight mb-8">
              What’s broken in most {industry.name} marketing
            </h2>
            <PortableText value={industry.whatsBroken} />
          </section>
        )}

        {/* Our approach */}
        {industry.ourApproach && (
          <section className="container-reading py-16 border-t border-rule">
            <h2 className="font-display font-light text-display-md text-ink-headline tracking-tight mb-8">
              Our approach for {industry.name}
            </h2>
            <PortableText value={industry.ourApproach} />
          </section>
        )}

        {/* Featured case study */}
        {industry.featuredCaseStudy && (
          <section className="container-layout py-20 border-t border-rule">
            <div className="mb-10">
              <p className="eyebrow mb-4">Featured outcome</p>
              <h2 className="font-display font-light text-display-lg text-ink-headline tracking-tight">
                Where we’ve delivered in {industry.name}.
              </h2>
            </div>
            <div className="max-w-3xl">
              <CaseStudyCard caseStudy={industry.featuredCaseStudy} variant="featured" />
            </div>
          </section>
        )}

        {/* Other client logos in this industry */}
        {/* Guarded on length: with no logos seeded this rendered a heading
            above an empty row, which reads as a broken section. */}
        {industry.allClientLogos && industry.allClientLogos.length > 0 && (
          <section className="container-layout py-20 border-t border-rule">
            <p className="eyebrow text-center mb-8">
              Other {industry.name} brands we’ve worked with
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
              <h2 className="font-display font-light text-display-lg text-ink-headline tracking-tight">
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
          heading={`Running a ${industry.name} business?`}
          /* WAS: a hardcoded "an" in both strings, producing "Apply for an
             Real Estate Diagnostic" on four of six pages. `article` was
             already computed above and already used correctly by the hero CTA
             — the footer simply never got wired to it. Caught in pre-launch QA
             on 16 Sep, after an earlier pass that fixed only the hero and did
             not grep for other call sites. */
          subhead={`Apply for ${article} ${industry.name} diagnostic. We'll review your channel mix, conversion funnel, and the structure underneath your marketing.`}
          primary={{ label: `Apply for ${article} ${industry.name} diagnostic`, href: "/book-consultation" }}
          secondary={{ label: "Or just say hi", href: "/contact" }}
        />
      </main>
      <Footer />
    </>
  );
}
