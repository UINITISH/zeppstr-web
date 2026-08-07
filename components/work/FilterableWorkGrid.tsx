"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { sanityImageProps } from "@/sanity/lib/image";
import type { CaseStudy } from "@/sanity/lib/types";

export type CaseStudyListItem = Pick<
  CaseStudy,
  "_id" | "clientName" | "slug" | "headlineMetric" | "headlineTimeframe" | "heroImage"
> & {
  industry?: { _id: string; name: string; slug: { current: string } };
  /** Optional href override — used for static featured brands without a full case study page */
  linkHref?: string;
  /** Country of operation — appended to the tile metadata line */
  country?: string;
  /** Local screenshot path (e.g. /case-screenshots/wise-market.png) — overrides Sanity heroImage */
  screenshotSrc?: string;
};

interface FilterableWorkGridProps {
  cases: CaseStudyListItem[];
}

/**
 * Filterable case study grid — Instrument-disciplined.
 * Sharp edges, no rounding. Type-first tile when no image.
 * Hover: opacity + arrow translate. No scale, no shadow, no decoration.
 */
export function FilterableWorkGrid({ cases }: FilterableWorkGridProps) {
  // Dedupe industries by NAME — Sanity and static cases may use different IDs
  // for the same canonical industry (e.g. "Real Estate" appearing twice).
  const industries = React.useMemo(() => {
    const seen = new Set<string>();
    const result: { name: string }[] = [];
    cases.forEach((c) => {
      const name = c.industry?.name;
      if (name && !seen.has(name)) {
        seen.add(name);
        result.push({ name });
      }
    });
    return result;
  }, [cases]);

  const [activeFilter, setActiveFilter] = React.useState<string>("ALL");

  const visibleCases = React.useMemo(() => {
    if (activeFilter === "ALL") return cases;
    return cases.filter((c) => c.industry?.name === activeFilter);
  }, [cases, activeFilter]);

  return (
    <div>
      {/* Filter row — plain editorial text + All Work link on the right */}
      <div className="mb-14 border-b border-ink-headline/15 pb-5">
        <div className="flex flex-wrap items-center gap-x-7 md:gap-x-9 gap-y-2.5">
          <FilterText
            label="All"
            active={activeFilter === "ALL"}
            onClick={() => setActiveFilter("ALL")}
          />
          {industries.map((i) => (
            <FilterText
              key={i.name}
              label={i.name}
              active={activeFilter === i.name}
              onClick={() => setActiveFilter(i.name)}
            />
          ))}

          {/* All work index link — sits at the right end of the filter line */}
          <Link
            href="/work"
            className="ml-auto font-mono text-[13px] uppercase tracking-[0.18em] text-ink-headline border-b border-ink-headline pb-0.5 hover:text-ink-headline/60 hover:border-brand-yellow transition-colors"
          >
            All work →
          </Link>
        </div>
      </div>

      {/* Index layout — numbered plates, mono labels, type-led.
          Deliberately mirrors the "Atelier Index" system used in the client
          deliverables (see TRU_Aquapolis_Case_Study_Zeppstr.pdf). A stock-photo
          card grid looks like every other agency; the index looks like the
          documents we actually hand clients, and the imagery stops carrying
          weight it can't bear. */}
      <ol className="border-t border-ink-headline/15">
        {visibleCases.map((cs, idx) => (
          <WorkRow key={cs._id} caseStudy={cs} index={idx} />
        ))}
      </ol>

      {visibleCases.length === 0 && (
        <p className="font-body text-body text-ink-muted text-center py-20">
          No case studies in this category yet.
        </p>
      )}
    </div>
  );
}

function FilterText({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "relative font-mono text-[13px] uppercase tracking-[0.18em] py-1 transition-colors duration-hover",
        "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-yellow rounded-sm",
        active
          ? "text-ink-headline after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-[2px] after:bg-brand-yellow"
          : "text-ink-muted hover:text-ink-headline",
      )}
    >
      {label}
    </button>
  );
}


// ─── Index row ───

function WorkRow({
  caseStudy,
  index,
}: {
  caseStudy: CaseStudyListItem;
  index: number;
}) {
  const img =
    caseStudy.screenshotSrc ??
    (caseStudy.heroImage
      ? sanityImageProps(caseStudy.heroImage, { width: 640, height: 480 }).src
      : null);

  const plate = String(index + 1).padStart(2, "0");

  return (
    <li className="border-b border-ink-headline/15">
      <Link
        href={caseStudy.linkHref ?? `/work/${caseStudy.slug.current}`}
        className="group grid grid-cols-12 items-center gap-x-4 md:gap-x-8 py-8 md:py-11 focus-visible:outline-2 focus-visible:outline-brand-blue focus-visible:outline-offset-4"
      >
        {/* Plate number */}
        <span className="col-span-2 md:col-span-1 font-mono text-[11px] md:text-[12px] uppercase tracking-[0.2em] text-ink-muted group-hover:text-brand-yellow transition-colors duration-hover">
          {plate}
        </span>

        {/* Client + sector */}
        <div className="col-span-10 md:col-span-4">
          <h3 className="font-display font-extralight text-[clamp(24px,2.6vw,40px)] leading-[1.05] tracking-[-0.02em] text-ink-headline group-hover:text-brand-blue transition-colors duration-hover">
            {caseStudy.clientName}
          </h3>
          <p className="mt-2 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-ink-muted">
            {caseStudy.industry?.name}
            {caseStudy.industry && caseStudy.country && " · "}
            {caseStudy.country}
          </p>
        </div>

        {/* Outcome — the reason the row exists */}
        <div className="col-span-12 md:col-span-4 mt-4 md:mt-0">
          {caseStudy.headlineMetric && (
            <p className="font-display font-light text-[clamp(18px,1.5vw,24px)] leading-[1.25] tracking-[-0.01em] text-ink-headline">
              {caseStudy.headlineMetric}
            </p>
          )}
          {caseStudy.headlineTimeframe && (
            <p className="mt-1.5 font-body text-body-sm text-ink-muted">
              {caseStudy.headlineTimeframe}
            </p>
          )}
        </div>

        {/* Thumbnail — always visible in grayscale, colour on hover. It was
            previously opacity-0 until hover, which hid the imagery entirely
            rather than desaturating it. */}
        <div className="col-span-12 md:col-span-2 order-first md:order-none mb-5 md:mb-0">
          {img && (
            <div className="relative aspect-[4/3] w-full bg-emerald-900 overflow-hidden">
              <Image
                src={img}
                alt=""
                aria-hidden="true"
                fill
                sizes="180px"
                className="object-cover grayscale group-hover:grayscale-0 transition-[filter] duration-page ease-smooth"
                unoptimized={/^https?:\/\//.test(img)}
              />
            </div>
          )}
        </div>

        <span
          aria-hidden="true"
          className="hidden md:block md:col-span-1 text-right font-display text-display-sm text-ink-muted group-hover:text-brand-blue group-hover:translate-x-1 transition-all duration-hover"
        >
          →
        </span>
      </Link>
    </li>
  );
}
