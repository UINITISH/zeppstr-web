"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { getClientLogo } from "@/lib/client-logo";
import { logoBox, WORK_ROW_LOGO } from "@/lib/logo-optical";
import { sanityImageProps } from "@/sanity/lib/image";
import type { CaseStudy } from "@/sanity/lib/types";

/**
 * headlineMetric / headlineTimeframe / heroImage are OPTIONAL by design.
 *
 * The grid renders two kinds of entry: published case studies, which always
 * carry an outcome metric, and roster tiles for named clients whose work has
 * not been written up yet, which deliberately carry none. Requiring the metric
 * forced callers to invent one — the exact failure this codebase has been
 * cleaning up. The row renders the metric only when it exists.
 */
export type CaseStudyListItem = Pick<CaseStudy, "_id" | "clientName" | "slug"> &
  Partial<
    Pick<CaseStudy, "headlineMetric" | "headlineTimeframe" | "heroImage">
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
  const img: string | null =
    caseStudy.screenshotSrc ??
    (caseStudy.heroImage
      ? sanityImageProps(caseStudy.heroImage, { width: 640, height: 480 })?.src ??
        null
      : null);

  /**
   * ── ONE TREATMENT FOR EVERY ROW ───────────────────────────────────────────
   *
   * Earlier versions of this column mixed three states: a website screenshot
   * where one existed, a logo on an emerald panel where it did not, and an
   * empty cell for anyone with neither. Scanning the index you saw photographs
   * next to flat logos next to holes, and the inconsistency read as unfinished
   * rather than considered.
   *
   * Every row now gets the same thing: the client's logo, centred on the
   * emerald panel. It is uniform down the column, it is on-brand, and every
   * logo is a real asset.
   *
   * The website screenshots have not been discarded — they still render at full
   * width on each case study's own page, which is where they are large enough
   * to be worth looking at. At the 180px this column allows, a screenshot is an
   * unreadable smear of a webpage; a logo is legible.
   *
   * `img` is still resolved above because the detail page and Sanity heroImage
   * path both depend on it.
   */
  const isRealImage = Boolean(img && !img.startsWith("/work-thumb/"));
  void isRealImage; // retained for the detail-page resolution order

  const logoSrc = getClientLogo(caseStudy.slug.current);

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
          {/* STEPPED DOWN from clamp(24,2.6vw,40). At 40px a list-row label was
              rendering within 6px of the page's own section headings (46px) and
              at 1.76× the outcome metric beside it — so the client's NAME was
              the loudest thing in a row whose stated purpose is the number it
              produced. display-md puts it a clear step below a section heading
              and a clear step above the metric. */}
          <h3 className="font-display font-extralight text-display-md leading-[1.1] tracking-[-0.02em] text-ink-headline group-hover:text-brand-blue transition-colors duration-hover">
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
            <p className="font-display font-light text-display-xs leading-[1.25] tracking-[-0.01em] text-ink-headline">
              {caseStudy.headlineMetric}
            </p>
          )}
          {caseStudy.headlineTimeframe && (
            <p className="mt-1.5 font-body text-body-sm text-ink-muted">
              {caseStudy.headlineTimeframe}
            </p>
          )}
        </div>

        {/* Thumbnail — the client's logo on an emerald panel, identically for
            every row. See the note above `logoSrc` for why this is uniform
            rather than mixing screenshots and logos.

            PANEL COLOUR — CORRECTED 13 SEP 2026. This column used an emerald
            panel on the stated basis that the logo files were "white artwork
            for dark backgrounds". That was backwards. All 23 PNGs were dark
            artwork on an opaque WHITE CARD — complete with a black rule and a
            drop shadow — lifted from the Our Clients page of Portfolio
            Zeppstr.pdf. On emerald each one rendered as a small white sticker
            floating in a green box, which is the irregularity in the work index.

            Two things changed. The artwork was reprocessed: card, rule and
            shadow removed by flood-filling the plate to transparency, then
            tight-cropped to the mark. Originals are archived in
            deliverables/logo-originals/. And the panel is white, which suits
            the artwork — most of these marks are dark or mid-tone and would be
            unreadable on green even now that they are transparent.

            Rows whose client has no logo file render the panel with the client
            name set in it, so the column never has a hole in it. */}
        <div className="col-span-12 md:col-span-2 order-first md:order-none mb-5 md:mb-0">
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-white border border-ink-headline/12">
            {logoSrc ? (
              <div className="absolute inset-0 flex items-center justify-center p-3">
                <Image
                  src={logoSrc}
                  alt=""
                  aria-hidden="true"
                  width={220}
                  height={110}
                  /* Sized by optical AREA, not by height — see lib/logo-optical.ts.
                     A flat height cap made VehicleMall (ratio 5.6) render as a
                     124×22 strip while Tru Aquapolis (ratio 0.70) rendered
                     38×54, a ~3× difference in ink under nominally the same
                     rule. That mismatch is what read as "logo sizes are off". */
                  style={logoBox(logoSrc, WORK_ROW_LOGO)}
                  className="w-auto h-auto object-contain opacity-90 transition-opacity duration-page ease-smooth group-hover:opacity-100"
                />
              </div>
            ) : (
              /* No logo artwork on file. Set the client name rather than
                 leaving an empty rectangle — it still reads as a deliberate
                 tile, and the row stays consistent with its neighbours. Supply
                 the logo file and this disappears on its own.
                 Currently hits: tru-aquapolis, invest-in-sharjah. */
              <div className="absolute inset-0 flex items-center justify-center p-4 text-center bg-bg-secondary">
                <span className="font-display font-light text-[13px] leading-[1.25] tracking-[-0.01em] text-ink-muted transition-colors duration-page ease-smooth group-hover:text-ink-headline">
                  {caseStudy.clientName}
                </span>
              </div>
            )}
          </div>
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
