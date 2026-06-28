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

      {/* Tile grid */}
      <div className="grid md:grid-cols-2 gap-x-6 gap-y-16 md:gap-y-24">
        {visibleCases.map((cs, idx) => (
          <WorkTile key={cs._id} caseStudy={cs} index={idx} />
        ))}
      </div>

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

// ─── Single tile ───

function WorkTile({
  caseStudy,
  index,
}: {
  caseStudy: CaseStudyListItem;
  index: number;
}) {
  const img = caseStudy.heroImage
    ? sanityImageProps(caseStudy.heroImage, { width: 1200, height: 800 })
    : null;

  return (
    <Link
      href={caseStudy.linkHref ?? `/work/${caseStudy.slug.current}`}
      className="group block focus-visible:outline-2 focus-visible:outline-brand-blue focus-visible:outline-offset-4"
    >
      {/* Tile visual — sharp edges, no rounding */}
      <div className="relative aspect-[4/3] bg-emerald-900 overflow-hidden mb-6 transition-opacity duration-hover group-hover:opacity-90">
        {caseStudy.screenshotSrc ? (
          <Image
            src={caseStudy.screenshotSrc}
            alt={`${caseStudy.clientName} — website`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-top"
          />
        ) : img ? (
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            placeholder={img.blurDataURL ? "blur" : "empty"}
            blurDataURL={img.blurDataURL}
          />
        ) : (
          // Type-only placeholder — confident, not apologetic
          <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-12">
            <div className="flex items-start justify-between">
              {caseStudy.industry ? (
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-yellow">
                  {caseStudy.industry.name}
                </span>
              ) : (
                <span />
              )}
              {caseStudy.country && (
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">
                  {caseStudy.country}
                </span>
              )}
            </div>

            <div>
              <span
                aria-hidden="true"
                className="block w-10 h-[3px] bg-brand-yellow mb-6"
              />
              <span className="block font-display font-extralight text-[clamp(40px,5.5vw,80px)] text-white leading-[0.92] tracking-[-0.025em] max-w-[14ch]">
                {caseStudy.clientName}
              </span>
              {caseStudy.headlineMetric && (
                <span className="block mt-6 font-body text-body-lg text-white/75 max-w-[36ch]">
                  {caseStudy.headlineMetric}
                  {caseStudy.headlineTimeframe && (
                    <span className="text-white/50">
                      {" "}· {caseStudy.headlineTimeframe}
                    </span>
                  )}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Tile meta below — clean editorial line */}
      <div className="flex items-baseline justify-between gap-6">
        <div className="flex items-baseline gap-6">
          <h3 className="font-display font-light text-[clamp(22px,1.8vw,28px)] text-ink-headline tracking-[-0.01em] leading-[1.15] group-hover:text-brand-blue transition-colors duration-hover">
            {caseStudy.clientName}
            {(caseStudy.industry || caseStudy.country) && (
              <span className="font-body text-body-sm text-ink-muted ml-3 align-baseline">
                {caseStudy.industry?.name}
                {caseStudy.industry && caseStudy.country && " · "}
                {caseStudy.country}
              </span>
            )}
          </h3>
        </div>
        <span
          aria-hidden="true"
          className="font-display text-display-sm text-ink-muted group-hover:text-brand-blue group-hover:translate-x-1 transition-all duration-hover"
        >
          →
        </span>
      </div>
    </Link>
  );
}
