import Link from "next/link";
import Image from "next/image";
import { GlobalNav } from "@/components/nav/GlobalNav";
import { Footer } from "@/components/nav/Footer";
import { GridOverlay } from "@/components/blocks/GridOverlay";
import type { ServiceContent } from "@/lib/service-content";

/**
 * ServicePageLayout — the standalone sub-service page.
 *
 * ── WHY A SHARED LAYOUT RATHER THAN FIVE HAND-BUILT PAGES ───────────────────
 * Performance Media has five services. Two of them — Paid Search and Paid
 * Social — were hand-built standalone pages of ~1,000 lines each, with eleven
 * sections and their own diagrams. The other three (Attribution & Measurement,
 * Creative Strategy & Production, Retargeting & Lifecycle Acquisition) had no
 * page file at all, so they fell through to the generic [service] template and
 * rendered as a headline, a one-line tagline and a CTA.
 *
 * These are standalone pages, and the three thin ones needed to become
 * standalone pages too — not delegates to a generic template. But hand-building
 * three more thousand-line files would mean five separate implementations of
 * the same eleven sections, which is how a design system quietly dies: fix a
 * spacing bug and you fix it in one file out of five.
 *
 * So the eleven sections live here once, and each service page is a short file
 * that supplies its own content. The page is still standalone — its own route,
 * its own metadata, its own copy — it just does not re-implement the layout.
 *
 * Paid Search and Paid Social keep their existing files. They carry bespoke
 * elements this layout has no concept of (the Bid Ladder diagram, the spend
 * allocation dial), and rewriting working pages to force them through here
 * would be churn for its own sake. If those extras are ever retired, they can
 * move onto this layout without a redesign.
 *
 * ── SECTION ORDER, AND WHY ──────────────────────────────────────────────────
 *  1  Hero + stats        — the claim, with the evidence immediately under it
 *  2  The problem         — emerald band; what this service exists to fix
 *  3  What's included     — the deliverables, numbered
 *  4  How we deliver      — the sequence, with durations
 *  5  What this is not    — scope boundary, stated rather than implied
 *  6  Logo strip          — who it has been run for
 *  7  FAQ                 — the objections, answered
 *  8  CTA
 *
 * The problem band sits second on purpose. A prospect arriving from the menu
 * wants to know whether their situation is the one being described before they
 * read a deliverables list.
 */

export interface ServicePageLayoutProps {
  /**
   * The hero diagram. Every other solution and sub-service page on the site
   * carries one — LifecycleCircle on the practice pages, SpendAllocationDial on
   * Paid Search, DemandIceberg on Demand Generation, and so on. A page without
   * one reads as unfinished next to its siblings, so this is required rather
   * than optional.
   */
  graphic: React.ReactNode;
  /** Display name, e.g. "Attribution & Measurement". */
  name: string;
  /** Hero headline. Wrap the emphasised phrase in {highlight}. */
  headline: React.ReactNode;
  /** Parent practice — breadcrumb and back-link. */
  parent: { name: string; slug: string };
  content: ServiceContent;
  /** Client logos, filenames in /public/client-logos/v3/. */
  logos?: { name: string; file: string }[];
  /** Hero CTA label. Defaults to the diagnostic. */
  ctaLabel?: string;
}

export function ServicePageLayout({
  name,
  headline,
  parent,
  content,
  graphic,
  logos = [],
  ctaLabel = "Apply for a diagnostic",
}: ServicePageLayoutProps) {
  return (
    <>
      <GlobalNav />
      <main className="relative">
        <GridOverlay />

        {/* ─── Breadcrumb ─── */}
        <nav aria-label="Breadcrumb" className="container-layout pt-8">
          <ol className="flex flex-wrap items-center gap-2 font-body text-body-sm text-ink-muted">
            <li>
              <Link href="/solutions" className="hover:text-brand-blue transition-colors">
                Solutions
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                href={`/solutions/${parent.slug}`}
                className="hover:text-brand-blue transition-colors"
              >
                {parent.name}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-ink-headline">{name}</li>
          </ol>
        </nav>

        {/* ─── 1. HERO ─── */}
        <section className="relative bg-bg-primary border-b border-ink-headline/10 overflow-hidden">
          <div className="container-layout pt-12 md:pt-16 pb-20 md:pb-28">
            <div className="grid md:grid-cols-12 gap-10 md:gap-16">
              <div className="md:col-span-7">
                <div className="flex items-center gap-4 mb-8">
                  <span
                    aria-hidden="true"
                    className="block w-2.5 h-2.5 bg-brand-yellow flex-shrink-0"
                  />
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
                    Service — {parent.name}
                  </p>
                </div>

                <h1 className="font-bold tracking-[-0.025em] text-display-xl text-ink-headline leading-[1.16] max-w-[18ch] text-balance mb-8">
                  {headline}
                </h1>

                <p className="font-body text-body-lg text-ink-body leading-[1.55] max-w-[54ch] mb-8">
                  {content.pov}
                </p>

                {content.stats && content.stats.length > 0 && (
                  <div className="grid grid-cols-3 gap-4 md:gap-6 py-6 mb-10 border-y border-ink-headline/15">
                    {content.stats.map((stat, i) => (
                      <div
                        key={stat.label}
                        className={i > 0 ? "md:pl-6 md:border-l border-ink-headline/15" : ""}
                      >
                        <p className="font-display font-extralight text-display-md text-ink-headline leading-[1.1] tracking-[-0.02em] mb-1">
                          {stat.figure}
                        </p>
                        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted leading-[1.4]">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    href="/book-consultation"
                    className="inline-flex items-center gap-3 bg-brand-yellow text-ink-headline font-display font-light text-display-xs px-8 py-4 hover:bg-emerald-900 hover:text-white transition-colors duration-hover"
                  >
                    <span>{ctaLabel}</span>
                    <span aria-hidden="true">&rarr;</span>
                  </Link>
                  <Link
                    href={`/solutions/${parent.slug}`}
                    className="font-mono text-[12px] uppercase tracking-[0.18em] text-ink-headline border-b border-ink-headline pb-0.5 hover:text-ink-headline/60 hover:border-brand-yellow transition-colors"
                  >
                    Parent practice &rarr;
                  </Link>
                </div>
              </div>

              {/* Right — the hero diagram, matching every other page in the
                  system. The stat provenance moved below it rather than being
                  dropped: a figure without its source is the thing this site
                  has spent weeks removing. */}
              <div className="md:col-span-5 flex flex-col items-center justify-center pt-8 md:pt-0">
                {graphic}
                {content.stats && content.stats.length > 0 && (
                  <ul className="mt-8 w-full max-w-[460px] space-y-3 border-t border-ink-headline/15 pt-5">
                    {content.stats.map((stat) => (
                      <li key={stat.label} className="font-body text-body-sm text-ink-muted leading-relaxed">
                        <span className="font-medium text-ink-headline">
                          {stat.figure} — {stat.label}.
                        </span>{" "}
                        {stat.source}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ─── 2. THE PROBLEM ─── */}
        <section className="bg-emerald-900 text-white" aria-labelledby="problem-heading">
          <div className="container-layout py-20 md:py-28">
            <div className="grid md:grid-cols-12 gap-8 md:gap-16">
              <div className="md:col-span-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60 mb-6">
                  What goes wrong
                </p>
                <h2
                  id="problem-heading"
                  className="font-display font-light tracking-[-0.025em] text-display-lg text-white max-w-[20ch] text-balance"
                >
                  {content.problem.title}
                </h2>
              </div>
              <p className="md:col-span-7 font-body text-body-lg text-white/80 leading-[1.6] max-w-[62ch] md:pt-2">
                {content.problem.body}
              </p>
            </div>
          </div>
        </section>

        {/* ─── 3. WHAT'S INCLUDED ─── */}
        <section
          className="bg-bg-primary border-b border-ink-headline/10"
          aria-labelledby="included-heading"
        >
          <div className="container-layout py-24 md:py-32">
            <div className="mb-16 md:mb-20">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-6">
                Engagement
              </p>
              <h2
                id="included-heading"
                className="font-display font-light tracking-[-0.025em] text-display-lg text-ink-headline max-w-[22ch] text-balance"
              >
                What’s included.
              </h2>
            </div>

            <ol className="border-t border-ink-headline/15">
              {content.included.map((item, i) => (
                <li
                  key={item.title}
                  className="grid md:grid-cols-12 gap-x-8 gap-y-3 border-b border-ink-headline/15 py-8 md:py-10"
                >
                  <span className="md:col-span-1 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted md:pt-2">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="md:col-span-4 font-display font-light text-display-sm text-ink-headline tracking-[-0.015em] leading-[1.15]">
                    {item.title}
                  </h3>
                  <p className="md:col-span-7 font-body text-body text-ink-body leading-relaxed max-w-[64ch]">
                    {item.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ─── 4. HOW WE DELIVER ─── */}
        <section
          className="bg-bg-secondary border-b border-ink-headline/10"
          aria-labelledby="method-heading"
        >
          <div className="container-layout py-24 md:py-32">
            <div className="mb-14 md:mb-20">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-6">
                Sequence
              </p>
              <h2
                id="method-heading"
                className="font-display font-light tracking-[-0.025em] text-display-lg text-ink-headline max-w-[24ch] text-balance"
              >
                How we deliver it.
              </h2>
            </div>

            <ol className="grid md:grid-cols-2 gap-x-12 gap-y-12">
              {content.method.map((step, i) => (
                <li key={step.title} className="border-t border-ink-headline/15 pt-7">
                  <div className="flex items-baseline gap-4 mb-2">
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-blue">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display font-light text-display-sm text-ink-headline tracking-[-0.015em]">
                      {step.title}
                    </h3>
                  </div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted mb-4">
                    {step.duration}
                  </p>
                  <p className="font-body text-body text-ink-body leading-relaxed max-w-[56ch]">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ─── 5. WHAT THIS IS NOT ─── */}
        {content.notThis && content.notThis.length > 0 && (
          <section
            className="bg-bg-primary border-b border-ink-headline/10"
            aria-labelledby="not-this-heading"
          >
            <div className="container-layout py-20 md:py-24">
              <div className="grid md:grid-cols-12 gap-8 md:gap-16">
                <div className="md:col-span-5">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-6">
                    Scope
                  </p>
                  <h2
                    id="not-this-heading"
                    className="font-display font-light tracking-[-0.025em] text-display-md text-ink-headline max-w-[18ch] text-balance"
                  >
                    What this is not.
                  </h2>
                  <p className="mt-5 font-body text-body-sm text-ink-muted leading-relaxed max-w-[40ch]">
                    Stated rather than discovered in month three.
                  </p>
                </div>
                <ul className="md:col-span-7 space-y-5 border-t border-ink-headline/15 pt-6">
                  {content.notThis.map((item) => (
                    <li
                      key={item}
                      className="relative pl-5 font-body text-body text-ink-body leading-relaxed max-w-[62ch]"
                    >
                      <span
                        aria-hidden="true"
                        className="absolute left-0 top-[0.65em] block w-2 h-[2px] bg-brand-yellow"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* ─── 6. LOGO STRIP ─── */}
        {logos.length > 0 && (
          <section
            className="bg-bg-primary border-b border-ink-headline/10"
            aria-labelledby="service-logos-heading"
          >
            <div className="container-layout py-16 md:py-20">
              <p
                id="service-logos-heading"
                className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-10"
              >
                Brands we’ve run this for
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
                {logos.map((logo) => (
                  <div
                    key={logo.file}
                    className="group relative flex items-center justify-center h-[100px] md:h-[118px] px-4 md:px-5 bg-white rounded-md border border-ink-headline/10 shadow-[0_1px_2px_rgba(10,16,47,0.04),0_2px_8px_rgba(10,16,47,0.05)] transition-all duration-hover hover:-translate-y-0.5 hover:border-ink-headline/20 hover:shadow-[0_2px_4px_rgba(10,16,47,0.06),0_8px_20px_rgba(10,16,47,0.10)]"
                  >
                    <Image
                      src={`/client-logos/v3/${logo.file}`}
                      alt={`${logo.name} — Zeppstr client`}
                      width={160}
                      height={70}
                      className="max-h-[60px] md:max-h-[70px] w-auto object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-hover"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ─── 7. FAQ ─── */}
        <section
          className="bg-bg-primary border-b border-ink-headline/10"
          aria-labelledby="service-faq-heading"
        >
          <div className="container-layout py-24 md:py-32">
            <div className="grid md:grid-cols-12 gap-8 md:gap-16">
              <div className="md:col-span-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted mb-6">
                  Questions
                </p>
                <h2
                  id="service-faq-heading"
                  className="font-display font-light tracking-[-0.025em] text-display-lg text-ink-headline max-w-[16ch] text-balance"
                >
                  Before you enquire.
                </h2>
              </div>
              <dl className="md:col-span-8 border-t border-ink-headline/15">
                {content.faqs.map((f) => (
                  <div
                    key={f.question}
                    className="border-b border-ink-headline/15 py-7 md:py-8"
                  >
                    <dt className="font-display font-light text-display-sm text-ink-headline tracking-[-0.015em] mb-3 max-w-[46ch]">
                      {f.question}
                    </dt>
                    <dd className="font-body text-body text-ink-body leading-relaxed max-w-[66ch]">
                      {f.answer}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* ─── 8. CTA ─── */}
        <section className="relative z-10 bg-emerald-900 text-white">
          <div className="container-layout py-24 md:py-32">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/70 mb-10">
              Engage
            </p>
            <h2 className="font-bold tracking-[-0.025em] text-display-xl leading-[1.02] max-w-[18ch] mb-12 text-white text-balance">
              Start with the{" "}
              <span className="bg-brand-yellow text-ink-headline px-3 py-0.5 box-decoration-clone">
                diagnostic
              </span>
              .
            </h2>
            <div className="grid md:grid-cols-12 gap-8 md:gap-16 pt-10 border-t border-white/15">
              <p className="md:col-span-6 font-body text-body-lg text-white/80 leading-[1.5] max-w-[46ch]">
                Four weeks, a fixed fee, and a written answer on what is actually
                constraining growth — including when the answer is that{" "}
                {name.toLowerCase()} is not your constraint.
              </p>
              <div className="md:col-span-6 flex md:items-end md:justify-end">
                <Link
                  href="/book-consultation"
                  className="inline-flex items-center justify-center bg-brand-yellow text-emerald-900 font-display font-light text-display-sm px-10 py-5 hover:bg-white transition-colors duration-hover"
                >
                  Apply for a diagnostic &rarr;
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
