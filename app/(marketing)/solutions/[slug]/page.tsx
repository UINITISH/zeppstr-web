import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/meta";
import { GlobalNav } from "@/components/nav/GlobalNav";
import { Footer } from "@/components/nav/Footer";
import { PortableText } from "@/components/article/PortableText";
import { CaseStudyCard } from "@/components/cards/CaseStudyCard";
import { GridOverlay } from "@/components/blocks/GridOverlay";
import { LifecycleCircle } from "@/components/utility/LifecycleCircle";
import { sanity } from "@/sanity/lib/client";
import { solutionBySlugQuery } from "@/sanity/lib/queries";
import { PRACTICE_CONTENT } from "@/lib/practice-content";
import type { Solution, SubService, Industry, CaseStudy } from "@/sanity/lib/types";

interface SolutionPageData extends Solution {
  services?: SubService[];
  relatedIndustries?: Industry[];
  relatedCaseStudies?: CaseStudy[];
}

// ─────────────────────────────────────────────
// Static generation
// ─────────────────────────────────────────────

export async function generateStaticParams() {
  const solutions = await sanity.fetch<Array<{ slug: { current: string } }>>(
    `*[_type == "solution"]{ slug }`
  );
  return solutions.map((s) => ({ slug: s.slug.current }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const solution = await sanity.fetch<SolutionPageData | null>(solutionBySlugQuery, {
    slug: params.slug,
  });
  if (!solution) return {};
  return buildMetadata({
    title: solution.seoTitle ?? solution.name,
    description: solution.seoDescription ?? solution.tagline,
    path: `/solutions/${params.slug}`,
  });
}

// ─────────────────────────────────────────────
// Page — full editorial brand-block layout (up to 11 sections)
// ─────────────────────────────────────────────

export default async function SolutionPage({
  params,
}: {
  params: { slug: string };
}) {
  const solution = await sanity.fetch<SolutionPageData | null>(solutionBySlugQuery, {
    slug: params.slug,
  });

  if (!solution) notFound();

  const practice = PRACTICE_CONTENT[params.slug];

  return (
    <>
      <GlobalNav />
      <main className="relative">
        <GridOverlay />

        {/* ─── 1. HERO — copy left, lifecycle circle right ─── */}
        <section className="relative bg-bg-primary border-b border-ink-headline/10 overflow-hidden">
          <div className="container-layout pt-20 md:pt-28 pb-20 md:pb-28">
            <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-center">
              {/* Left — eyebrow, headline, tagline, CTA */}
              <div className="md:col-span-7">
                <div className="flex items-center gap-4 mb-8">
                  <span aria-hidden="true" className="block w-2.5 h-2.5 bg-brand-yellow flex-shrink-0" />
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
                    Practice — Solution
                  </p>
                </div>

                <h1 className="font-bold tracking-[-0.025em] text-display-xl text-ink-headline leading-[1.16] max-w-[16ch] text-balance mb-8">
                  {solution.name}
                </h1>

                {solution.tagline && (
                  <p className="font-body text-body-lg text-ink-body leading-[1.55] max-w-[52ch] mb-10">
                    {solution.tagline}
                  </p>
                )}

                <Link
                  href="/book-consultation"
                  className="inline-flex items-center gap-3 bg-brand-yellow text-ink-headline font-display font-light text-display-xs px-8 py-4 hover:bg-emerald-900 hover:text-white transition-colors duration-hover"
                >
                  <span>Apply for a diagnostic</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>

              {/* Right — lifecycle circle graphic */}
              <div className="md:col-span-5 flex items-center justify-center pt-8 md:pt-0">
                <LifecycleCircle className="px-12 md:px-8" />
              </div>
            </div>
          </div>
        </section>

        {/* ─── 2. LOGO STRIP — practice-specific brands ─── */}
        {practice?.featuredLogos && practice.featuredLogos.length > 0 && (
          <section
            className="bg-bg-primary border-b border-ink-headline/10"
            aria-labelledby="practice-logos-heading"
          >
            <div className="container-layout py-16 md:py-20">
              <p
                id="practice-logos-heading"
                className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-10"
              >
                Brands we’ve built this practice for
              </p>
              <div className="border-t border-l border-ink-headline/10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-8">
                {practice.featuredLogos.map((logo) => (
                  <div
                    key={logo.file}
                    className="group relative flex items-center justify-center h-[100px] md:h-[120px] px-6 md:px-8 border-r border-b border-ink-headline/10 transition-colors duration-hover hover:bg-bg-secondary"
                  >
                    <Image
                      src={`/client-logos/v3/${logo.file}`}
                      alt={`${logo.name} — Zeppstr client`}
                      width={140}
                      height={60}
                      className="max-h-[55%] w-auto object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-hover"
                      sizes="(max-width: 640px) 50vw, (max-width: 1280px) 25vw, 12vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ─── 3. POV — long description ─── */}
        {solution.longDescription && (
          <section className="bg-bg-primary border-b border-ink-headline/10">
            <div className="container-layout py-24 md:py-32">
              <div className="grid md:grid-cols-12 gap-8 md:gap-16">
                <div className="md:col-span-2">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
                    POV
                  </p>
                </div>
                <div className="md:col-span-10 max-w-[64ch] prose-zeppstr">
                  <PortableText value={solution.longDescription} />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ─── 4. WHAT YOU GET — featured + grid ─── */}
        {practice?.deliverables && practice.deliverables.length > 0 && (
          <section
            className="bg-bg-primary border-b border-ink-headline/10"
            aria-labelledby="deliverables-heading"
          >
            <div className="container-layout py-24 md:py-32">
              {/* Section header */}
              <div className="grid md:grid-cols-12 gap-8 md:gap-16 mb-16 md:mb-20 items-end">
                <div className="md:col-span-9">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-6">
                    Engagement
                  </p>
                  <h2
                    id="deliverables-heading"
                    className="font-bold tracking-[-0.025em] text-display-xl text-ink-headline leading-[1.02] max-w-[20ch] text-balance"
                  >
                    What you actually{" "}
                    <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                      get
                    </span>
                    .
                  </h2>
                </div>
                <div className="md:col-span-3 md:text-right">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted leading-relaxed">
                    <span className="inline-block w-1.5 h-1.5 bg-brand-yellow mr-2 align-middle" />
                    {practice.deliverables.length} artifacts
                    <br />
                    Documented · Living · Operated
                  </p>
                </div>
              </div>

              {/* Featured deliverable — first one, full-width with substantial treatment */}
              {practice.deliverables[0] && (
                <article className="group relative bg-bg-secondary border border-ink-headline/15 mb-px">
                  <div className="grid md:grid-cols-12 gap-8 md:gap-12 p-10 md:p-16 items-end">
                    {/* Left — number + accent + name */}
                    <div className="md:col-span-7">
                      <div className="flex items-baseline justify-between gap-6 mb-8">
                        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-headline">
                          01 / {String(practice.deliverables.length).padStart(2, "0")}
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-700">
                          ▪ Foundation
                        </span>
                      </div>
                      <span
                        aria-hidden="true"
                        className="block w-4 h-4 bg-brand-yellow mb-7"
                      />
                      <h3 className="font-display font-bold text-display-lg text-ink-headline tracking-[-0.025em] leading-[1.02] mb-3 max-w-[16ch]">
                        {practice.deliverables[0].name}
                      </h3>
                      {practice.deliverables[0].format && (
                        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
                          {practice.deliverables[0].format}
                        </p>
                      )}
                    </div>

                    {/* Right — body description */}
                    <div className="md:col-span-5">
                      <p className="font-body text-body-lg text-ink-body leading-[1.55] max-w-[52ch] mb-8">
                        {practice.deliverables[0].description}
                      </p>
                      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted border-t border-ink-headline/15 pt-6">
                        Every other deliverable refers back to this.
                      </p>
                    </div>
                  </div>

                  {/* Yellow underline that animates on hover */}
                  <span
                    aria-hidden="true"
                    className="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-brand-yellow scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-hover"
                  />
                </article>
              )}

              {/* Grid of remaining deliverables — 2x2 (or 2-col for any remainder) */}
              {practice.deliverables.length > 1 && (
                <ol className="grid md:grid-cols-2 border-l border-ink-headline/15">
                  {practice.deliverables.slice(1).map((d, idx) => {
                    const i = idx + 1; // adjust display number since we sliced
                    return (
                      <li
                        key={d.name}
                        className="group relative p-8 md:p-12 border-r border-b border-ink-headline/15 flex flex-col transition-colors duration-hover hover:bg-bg-secondary"
                      >
                        {/* Top — number + format */}
                        <div className="flex items-baseline justify-between gap-6 mb-7">
                          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-headline">
                            {String(i + 1).padStart(2, "0")} / {String(practice.deliverables!.length).padStart(2, "0")}
                          </span>
                          {d.format && (
                            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted text-right">
                              {d.format}
                            </span>
                          )}
                        </div>

                        <span aria-hidden="true" className="block w-3 h-3 bg-brand-yellow mb-5" />

                        <h3 className="font-display font-bold text-display-sm text-ink-headline tracking-[-0.02em] leading-[1.15] mb-3 max-w-[22ch]">
                          {d.name}
                        </h3>

                        <p className="font-body text-body text-ink-body leading-relaxed max-w-[44ch]">
                          {d.description}
                        </p>

                        <span
                          aria-hidden="true"
                          className="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-brand-yellow scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-hover"
                        />
                      </li>
                    );
                  })}
                </ol>
              )}
            </div>
          </section>
        )}

        {/* ─── 4b. CRAFT — what actually gets produced ───
            Sits deliberately after the deliverables block and before the
            service list. The deliverables describe a system; this describes the
            output. A reader who only scans headings should still come away
            knowing we run shoots, go on location and staff on-ground work. */}
        {practice?.craft && practice.craft.length > 0 && (
          <section
            className="bg-bg-secondary border-b border-ink-headline/10"
            aria-labelledby="craft-heading"
          >
            <div className="container-layout py-24 md:py-32">
              <div className="grid md:grid-cols-12 gap-8 md:gap-16 items-end mb-16 md:mb-20">
                <div className="md:col-span-7">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-6">
                    What we make
                  </p>
                  <h2
                    id="craft-heading"
                    className="font-display font-light tracking-[-0.025em] text-display-lg text-ink-headline max-w-[24ch] text-balance"
                  >
                    Strategy is half of it. This is the other half.
                  </h2>
                </div>
                <p className="md:col-span-5 font-body text-body text-ink-muted leading-relaxed">
                  Crews, cameras, locations, editors and people standing in a
                  room with your customers. Produced in-house, which is why the
                  creative and the media plan are not two separate arguments.
                </p>
              </div>

              <div className="border-t border-ink-headline/15">
                {practice.craft.map((block, i) => (
                  <div
                    key={block.label}
                    className="grid md:grid-cols-12 gap-x-8 gap-y-5 border-b border-ink-headline/15 py-10 md:py-12"
                  >
                    <div className="md:col-span-5">
                      <div className="flex items-baseline gap-4 mb-4">
                        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
                          0{i + 1}
                        </span>
                        <h3 className="font-display font-light text-display-sm text-ink-headline tracking-[-0.015em] leading-[1.15]">
                          {block.label}
                        </h3>
                      </div>
                      <p className="font-body text-body text-ink-body leading-relaxed max-w-[44ch]">
                        {block.lede}
                      </p>
                    </div>
                    <ul className="md:col-span-7 space-y-3.5 md:pt-1">
                      {block.outputs.map((o) => (
                        <li
                          key={o}
                          className="relative pl-5 font-body text-body-sm text-ink-body leading-relaxed"
                        >
                          <span
                            aria-hidden="true"
                            className="absolute left-0 top-[0.6em] block w-2 h-[2px] bg-brand-yellow"
                          />
                          {o}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ─── 5. SERVICES — sub-services list ─── */}
        {solution.services && solution.services.length > 0 && (
          <section
            className="bg-bg-primary border-b border-ink-headline/10"
            aria-labelledby="services-list-heading"
          >
            <div className="container-layout py-24 md:py-32">
              <div className="mb-16 md:mb-20">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-6">
                  Services
                </p>
                <h2
                  id="services-list-heading"
                  className="font-bold tracking-[-0.025em] text-display-xl text-ink-headline leading-[1.02] max-w-[22ch] text-balance"
                >
                  {solution.services.length} services.{" "}
                  <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                    One
                  </span>{" "}
                  connected practice.
                </h2>
              </div>

              <ol className="border-t border-ink-headline/15">
                {solution.services.map((service, i) => (
                  <li
                    key={service._id}
                    className="border-b border-ink-headline/15 group"
                  >
                    <Link
                      href={`/solutions/${solution.slug.current}/${service.slug.current}`}
                      className="grid md:grid-cols-12 gap-6 py-8 md:py-10 items-center hover:bg-bg-secondary transition-colors duration-hover ease-smooth -mx-4 px-4 md:-mx-6 md:px-6"
                    >
                      <div className="md:col-span-1 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <div className="md:col-span-5">
                        <span aria-hidden="true" className="block w-2.5 h-2.5 bg-brand-yellow mb-4" />
                        <h3 className="font-display font-bold text-display-md text-ink-headline tracking-[-0.02em] leading-[1.1] group-hover:text-ink-headline/70 transition-colors">
                          {service.name}
                        </h3>
                      </div>
                      <div className="md:col-span-5">
                        {service.tagline && (
                          <p className="font-body text-body text-ink-body leading-relaxed max-w-[36ch]">
                            {service.tagline}
                          </p>
                        )}
                        {service.legacyName && (
                          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted mt-3">
                            Also: {service.legacyName}
                          </p>
                        )}
                      </div>
                      <div
                        aria-hidden="true"
                        className="md:col-span-1 md:text-right text-[24px] text-ink-muted group-hover:text-ink-headline group-hover:translate-x-1 transition-all duration-hover"
                      >
                        →
                      </div>
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        )}

        {/* ─── 6. PROCESS — how we deliver ─── */}
        {practice?.processSteps && practice.processSteps.length > 0 && (
          <section
            className="bg-bg-primary border-b border-ink-headline/10"
            aria-labelledby="process-heading"
          >
            <div className="container-layout py-24 md:py-32">
              <div className="mb-16 md:mb-20 max-w-[1100px]">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-6">
                  Process
                </p>
                <h2
                  id="process-heading"
                  className="font-bold tracking-[-0.025em] text-display-xl text-ink-headline leading-[1.02] max-w-[22ch] text-balance"
                >
                  How we{" "}
                  <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                    deliver
                  </span>{" "}
                  this practice.
                </h2>
              </div>

              <ol className="grid md:grid-cols-4 gap-y-12 md:gap-x-8 border-t border-ink-headline/15 pt-12">
                {practice.processSteps.map((step, i) => (
                  <li key={step.title} className="relative">
                    <span aria-hidden="true" className="block w-3 h-3 bg-brand-yellow mb-7" />
                    <p className="font-display font-extralight text-display-stat text-ink-headline leading-none tracking-[-0.03em] mb-6">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="font-display font-light text-display-sm text-ink-headline tracking-[-0.01em] leading-[1.15] mb-3">
                      {step.title}
                    </h3>
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-6">
                      {step.duration}
                    </p>
                    <p className="font-body text-body text-ink-body leading-relaxed max-w-[32ch]">
                      {step.body}
                    </p>
                    {i < practice.processSteps!.length - 1 && (
                      <span
                        aria-hidden="true"
                        className="hidden md:block absolute top-[6px] -right-4 text-ink-headline text-[20px]"
                      >
                        →
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          </section>
        )}

        {/* ─── 7. PRACTICE NUMBERS ─── */}
        {practice?.practiceNumbers && practice.practiceNumbers.length > 0 && (
          <section
            className="bg-bg-primary border-b border-ink-headline/10"
            aria-labelledby="practice-numbers-heading"
          >
            <div className="container-layout py-24 md:py-32">
              <div className="mb-16 md:mb-20">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-6">
                  Practice numbers
                </p>
                <h2
                  id="practice-numbers-heading"
                  className="font-bold tracking-[-0.025em] text-display-xl text-ink-headline leading-[1.02] max-w-[18ch] text-balance"
                >
                  Numbers we can{" "}
                  <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                    publish
                  </span>
                  .
                </h2>
              </div>

              <ol className="grid md:grid-cols-3 border-t border-ink-headline/15">
                {practice.practiceNumbers.map((n, i) => (
                  <li
                    key={n.figure}
                    className={`relative py-12 md:py-16 flex flex-col min-w-0 ${
                      i > 0 ? "md:border-l border-ink-headline/15 md:pl-10" : ""
                    } md:pr-10 border-b md:border-b-0 border-ink-headline/15`}
                  >
                    <span aria-hidden="true" className="block w-3 h-3 bg-brand-yellow mb-6" />
                    <p className="font-display font-extralight text-display-lg leading-[0.95] tracking-[-0.03em] text-ink-headline mb-6 break-words">
                      {n.figure}
                    </p>
                    <p className="font-display font-light text-display-sm tracking-[-0.01em] text-ink-headline leading-[1.2] mb-3">
                      {n.metric}
                    </p>
                    <p className="font-body text-body text-ink-body leading-[1.5] max-w-[34ch]">
                      {n.detail}
                    </p>
                    <p className="mt-auto pt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
                      {n.client}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        )}

        {/* ─── 8. OUTCOMES — case studies ─── */}
        {solution.relatedCaseStudies && solution.relatedCaseStudies.length > 0 && (
          <section
            className="bg-bg-primary border-b border-ink-headline/10"
            aria-labelledby="solution-cases-heading"
          >
            <div className="container-layout py-24 md:py-32">
              <div className="mb-16 md:mb-20">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-6">
                  Outcomes
                </p>
                <h2
                  id="solution-cases-heading"
                  className="font-bold tracking-[-0.025em] text-display-xl text-ink-headline leading-[1.02] max-w-[22ch] text-balance mb-6"
                >
                  What this practice has{" "}
                  <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                    delivered
                  </span>
                  .
                </h2>
                <p className="font-body text-body-lg text-ink-body max-w-[58ch] leading-[1.55]">
                  The same architecture, applied across categories — outsized in each.
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 md:gap-y-16">
                {solution.relatedCaseStudies.map((cs) => (
                  <CaseStudyCard key={cs._id} caseStudy={cs} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ─── 9. INDUSTRIES — chip line ─── */}
        {solution.relatedIndustries && solution.relatedIndustries.length > 0 && (
          <section className="bg-bg-primary border-b border-ink-headline/10">
            <div className="container-layout py-20 md:py-24">
              <div className="grid md:grid-cols-12 gap-8 md:gap-16 items-baseline">
                <div className="md:col-span-3">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
                    Industries we run this for
                  </p>
                </div>
                <div className="md:col-span-9 flex flex-wrap gap-x-7 md:gap-x-9 gap-y-3">
                  {solution.relatedIndustries.map((industry) => (
                    <Link
                      key={industry._id}
                      href={`/industries/${industry.slug.current}`}
                      className="font-mono text-[13px] uppercase tracking-[0.18em] text-ink-headline border-b border-ink-headline pb-0.5 hover:text-ink-headline/60 hover:border-brand-yellow transition-colors"
                    >
                      {industry.name} →
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ─── 10. FAQ ─── */}
        {practice?.faqs && practice.faqs.length > 0 && (
          <section
            className="bg-bg-primary border-b border-ink-headline/10"
            aria-labelledby="faq-heading"
          >
            <div className="container-layout py-24 md:py-32">
              <div className="mb-16 md:mb-20 max-w-[72ch] mx-auto">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-6">
                  FAQ
                </p>
                <h2
                  id="faq-heading"
                  className="font-bold tracking-[-0.025em] text-display-xl text-ink-headline leading-[1.02] max-w-[22ch] text-balance"
                >
                  What you might want to{" "}
                  <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone">
                    ask
                  </span>
                  .
                </h2>
              </div>

              <div className="max-w-[72ch] mx-auto border-t border-ink-headline/15">
                {practice.faqs.map((faq) => (
                  <details
                    key={faq.question}
                    className="group border-b border-ink-headline/15 py-6"
                  >
                    <summary className="flex items-baseline justify-between gap-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                      <h3 className="font-display font-bold text-display-xs text-ink-headline tracking-[-0.01em] leading-[1.3]">
                        {faq.question}
                      </h3>
                      <span
                        aria-hidden="true"
                        className="font-display text-[24px] text-ink-muted shrink-0 transition-transform duration-hover group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <p className="font-body text-body text-ink-body leading-relaxed mt-4 max-w-[60ch]">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ─── 11. BOTTOM CTA — brand block ─── */}
        <section className="relative z-10 bg-emerald-900 text-white">
          <div className="container-layout py-32 md:py-48">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/70 mb-12">
              Engage
            </p>

            <h2 className="font-bold tracking-[-0.025em] text-display-stat leading-[1.02] max-w-[20ch] mb-16 md:mb-24 text-white text-balance">
              Build a{" "}
              <span className="bg-brand-yellow text-ink-headline px-3 py-0.5 box-decoration-clone">
                system
              </span>{" "}
              around this practice.
            </h2>

            <div className="grid md:grid-cols-12 gap-8 md:gap-16 pt-10 border-t border-white/15 items-center">
              <div className="md:col-span-7">
                <p className="font-body text-body-lg text-white/80 leading-[1.5] max-w-[52ch]">
                  Twelve partners a year, by intention. We start with a 45-minute
                  paid diagnostic — refunded in full if we’re not the
                  right fit for each other.
                </p>
              </div>
              <div className="md:col-span-5 flex md:justify-end">
                <Link
                  href="/book-consultation"
                  className="inline-flex items-center justify-center bg-brand-yellow text-emerald-900 font-display font-light text-display-sm px-10 py-5 hover:bg-white transition-colors duration-hover"
                >
                  Apply for a diagnostic →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
