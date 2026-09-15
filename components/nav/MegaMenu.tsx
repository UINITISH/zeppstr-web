"use client";

import * as React from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import { cn } from "@/lib/cn";
import type { Solution, Industry, SubService } from "@/sanity/lib/types";

/**
 * MegaMenu — desktop-only.
 * Solutions dropdown: 5 columns, one per Solution, each listing its sub-services.
 * Industries dropdown: 6-card grid.
 *
 * Accessibility: built on Radix Navigation Menu — keyboard nav, ARIA, focus management built in.
 */

interface SolutionWithServices extends Solution {
  subServices?: SubService[];
}

interface MegaMenuProps {
  solutions: SolutionWithServices[];
  industries: Industry[];
}

export function MegaMenu({ solutions, industries }: MegaMenuProps) {
  return (
    <NavigationMenu.Root className="relative hidden md:flex">
      <NavigationMenu.List className="flex items-center gap-7">
        {/* Solutions */}
        <NavigationMenu.Item>
          <NavigationMenu.Trigger
            className={cn(
              "font-body text-body-sm text-ink-headline font-medium tracking-[-0.005em]",
              "flex items-center gap-1",
              "hover:text-brand-blue transition-colors duration-hover",
              "data-[state=open]:text-brand-blue",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue rounded"
            )}
          >
            Solutions
            <ChevronDown />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content
            className={cn(
              "fixed left-1/2 -translate-x-1/2 top-[var(--nav-h)] w-[1100px] max-w-[calc(100vw-3rem)]",
              "bg-bg-primary border border-rule rounded-lg shadow-2xl",
              "p-8",
              "data-[motion=from-start]:animate-in data-[motion=from-end]:animate-in",
              "data-[motion=to-start]:animate-out data-[motion=to-end]:animate-out"
            )}
          >
            <SolutionsContent solutions={solutions} />
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        {/* Industries */}
        <NavigationMenu.Item>
          <NavigationMenu.Trigger
            className={cn(
              "font-body text-body-sm text-ink-headline font-medium tracking-[-0.005em]",
              "flex items-center gap-1",
              "hover:text-brand-blue transition-colors duration-hover",
              "data-[state=open]:text-brand-blue",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue rounded"
            )}
          >
            Industries
            <ChevronDown />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content
            className={cn(
              "fixed left-1/2 -translate-x-1/2 top-[var(--nav-h)] w-[800px] max-w-[calc(100vw-3rem)]",
              "bg-bg-primary border border-rule rounded-lg shadow-2xl",
              "p-8"
            )}
          >
            <IndustriesContent industries={industries} />
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        {/* Plain links */}
        {SIMPLE_NAV_ITEMS.map((item) => (
          <NavigationMenu.Item key={item.href}>
            <NavigationMenu.Link asChild>
              <Link
                href={item.href}
                className={cn(
                  "font-body text-body-sm text-ink-headline font-medium tracking-[-0.005em]",
                  "hover:text-brand-blue transition-colors duration-hover",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue rounded"
                )}
              >
                {item.label}
              </Link>
            </NavigationMenu.Link>
          </NavigationMenu.Item>
        ))}
      </NavigationMenu.List>

      {/* Viewport — required by Radix for animated content panel */}
      <NavigationMenu.Viewport className="absolute left-0 top-full" />
    </NavigationMenu.Root>
  );
}

const SIMPLE_NAV_ITEMS = [
  { label: "Work", href: "/work" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
];

// ─────────────────────────────────────────────
// Solutions content: 5 columns — editorial treatment
// ─────────────────────────────────────────────


/**
 * Menu taglines, overriding whatever Sanity holds.
 *
 * Two reasons this is local rather than seeded:
 *
 * 1. ALIGNMENT. The five columns share a horizontal rule above the service
 *    list. The rule sat wherever each tagline happened to end, so a shorter
 *    line pushed one column's rule up and made that column look unfinished
 *    next to its neighbours — which is exactly what was happening to
 *    Performance Media. The block below is now a fixed height, and these lines
 *    are written to a consistent length so they fill it.
 *
 * 2. It renders immediately. Editing the seed changes nothing until the seed is
 *    re-run against Sanity.
 *
 * Any solution not listed here falls back to its Sanity tagline.
 */
const MENU_TAGLINES: Record<string, string> = {
  "performance-media":
    "Paid that reports to revenue, not to dashboards — bought against a real definition of a qualified lead.",
  "growth-strategy-advisory":
    "Strategy before tactics. Growth treated as a system to be built, not a campaign to be run.",
  "organic-growth":
    "Where search becomes a compounding asset rather than a service line you rent each month.",
  "experience-engineering":
    "The site is the salesperson. Measured, rebuilt and instrumented to behave like one.",
  "brand-engagement-lifecycle":
    "From awareness to advocacy — brand, content, film and lifecycle owned as one practice.",
};

function SolutionsContent({ solutions }: { solutions: SolutionWithServices[] }) {
  return (
    <>
      {/* Header — eyebrow + headline + view-all link */}
      <div className="flex items-end justify-between gap-8 mb-7 pb-5 border-b border-ink-headline/15">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted mb-2.5">
            Practice — Five Solutions
          </p>
          <p className="font-display font-semibold text-[22px] tracking-[-0.015em] text-ink-headline leading-[1.2] max-w-[42ch]">
            One growth system.{" "}
            <span className="text-ink-muted font-light">
              Compounding by design.
            </span>
          </p>
        </div>
        <Link
          href="/solutions"
          className="shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-headline border-b border-ink-headline pb-0.5 hover:text-ink-headline/60 hover:border-brand-yellow transition-colors"
        >
          View all →
        </Link>
      </div>

      {/* 5-column grid */}
      <div className="grid grid-cols-5 gap-x-6">
        {solutions.map((solution, i) => (
          <div key={solution._id} className="group/col relative">
            {/* Solution heading link */}
            <Link
              href={`/solutions/${solution.slug.current}`}
              className="block mb-4 pr-3"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted mb-2">
                0{i + 1}
              </p>
              <h3 className="relative inline-block font-display font-bold text-[17px] leading-[1.2] tracking-[-0.01em] text-ink-headline group-hover/col:text-ink-headline transition-colors duration-hover after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-0.5 after:bg-brand-yellow after:scale-x-0 after:origin-left group-hover/col:after:scale-x-100 after:transition-transform after:duration-hover">
                {solution.name}
              </h3>
              {/* min-h keeps the rule below aligned across all five columns
                  whatever the copy length. Without it the shortest tagline
                  lifted its column's divider and broke the row. */}
              <div className="min-h-[52px] mt-1.5">
                {(MENU_TAGLINES[solution.slug.current] ?? solution.tagline) && (
                  <p className="font-body text-[12px] text-ink-muted leading-[1.4] max-w-[24ch]">
                    {MENU_TAGLINES[solution.slug.current] ?? solution.tagline}
                  </p>
                )}
              </div>
            </Link>

            {/* Sub-services list */}
            <ul className="space-y-1 pt-4 border-t border-ink-headline/12">
              {solution.subServices?.slice(0, 6).map((service) => (
                <li key={service._id}>
                  <Link
                    href={`/solutions/${solution.slug.current}/${service.slug.current}`}
                    className="group/item flex items-baseline gap-2 py-1 font-body text-[13px] text-ink-body hover:text-ink-headline transition-colors duration-hover leading-snug"
                  >
                    <span
                      aria-hidden="true"
                      className="text-brand-yellow opacity-0 group-hover/item:opacity-100 transition-opacity duration-hover -ml-3"
                    >
                      ·
                    </span>
                    <span>{service.name}</span>
                  </Link>
                </li>
              ))}
              {solution.subServices && solution.subServices.length > 6 && (
                <li className="pt-1">
                  <Link
                    href={`/solutions/${solution.slug.current}`}
                    className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-headline border-b border-brand-yellow pb-0.5 hover:text-ink-headline/60 transition-colors"
                  >
                    +{solution.subServices.length - 6} more →
                  </Link>
                </li>
              )}
            </ul>
          </div>
        ))}
      </div>

      {/* Footer — selectivity strip + green CTA pill */}
      <div className="mt-7 pt-5 border-t border-ink-headline/15 flex items-center justify-between gap-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
          <span className="inline-block w-1.5 h-1.5 bg-brand-yellow mr-2 align-middle" />
          Selective by design — 6–12 partner clients per year
        </p>
        <Link
          href="/book-consultation"
          className="inline-flex items-center gap-2 bg-brand-yellow text-ink-headline font-mono text-[10px] uppercase tracking-[0.2em] px-4 py-2.5 hover:bg-emerald-900 hover:text-white transition-colors duration-hover"
        >
          <span>Apply for a diagnostic</span>
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────
// Industries content — editorial list with arrows
// ─────────────────────────────────────────────

function IndustriesContent({ industries }: { industries: Industry[] }) {
  return (
    <>
      {/* Header — eyebrow + headline + view-all link */}
      <div className="flex items-end justify-between gap-8 mb-7 pb-5 border-b border-ink-headline/15">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted mb-2.5">
            Practice — Six Industries
          </p>
          <p className="font-display font-semibold text-[22px] tracking-[-0.015em] text-ink-headline leading-[1.2] max-w-[42ch]">
            300+ businesses.{" "}
            <span className="text-ink-muted font-light">
              The categories where we run growth systems.
            </span>
          </p>
        </div>
        <Link
          href="/industries"
          className="shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-headline border-b border-ink-headline pb-0.5 hover:text-ink-headline/60 hover:border-brand-yellow transition-colors"
        >
          View all →
        </Link>
      </div>

      {/* 2-column editorial list */}
      <div className="grid grid-cols-2 gap-x-10">
        {industries.map((industry, i) => (
          <Link
            key={industry._id}
            href={`/industries/${industry.slug.current}`}
            className="group flex items-baseline gap-4 py-4 border-b border-ink-headline/10 hover:border-brand-yellow transition-colors duration-hover"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted shrink-0 w-6 pt-1 group-hover:text-ink-headline transition-colors">
              0{i + 1}
            </span>
            <span className="flex-1 min-w-0">
              <h3 className="relative inline-block font-display font-bold text-[18px] leading-[1.2] tracking-[-0.01em] text-ink-headline transition-colors after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-0.5 after:bg-brand-yellow after:scale-x-0 after:origin-left group-hover:after:scale-x-100 after:transition-transform after:duration-hover">
                {industry.name}
              </h3>
              {industry.heroClaim && (
                <p className="font-body text-[12px] text-ink-muted mt-1 leading-snug">
                  {industry.heroClaim}
                </p>
              )}
            </span>
            <span
              aria-hidden="true"
              className="font-display text-[18px] text-ink-muted shrink-0 group-hover:text-ink-headline group-hover:translate-x-0.5 transition-all duration-hover"
            >
              →
            </span>
          </Link>
        ))}
      </div>

      {/* Footer — anchor line + green CTA pill */}
      <div className="mt-7 pt-5 border-t border-ink-headline/15 flex items-center justify-between gap-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-muted">
          <span className="inline-block w-1.5 h-1.5 bg-brand-yellow mr-2 align-middle" />
          Three flagship case studies — Tru Aquapolis · Wise Market · Mini Leaves
        </p>
        <Link
          href="/work"
          className="inline-flex items-center gap-2 bg-brand-yellow text-ink-headline font-mono text-[10px] uppercase tracking-[0.2em] px-4 py-2.5 hover:bg-emerald-900 hover:text-white transition-colors duration-hover"
        >
          <span>See selected work</span>
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────
// Chevron icon (inline, no extra dep)
// ─────────────────────────────────────────────

function ChevronDown() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2 4l3 3 3-3" />
    </svg>
  );
}
