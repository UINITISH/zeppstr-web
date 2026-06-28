"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

interface InsightsFilterProps {
  categories: { value: string; label: string }[];
  activeCategory: string;
}

/**
 * InsightsFilter — pill row of category tabs.
 * Server-rendered links with shallow URL updates (no JS required for filtering).
 * Each link sets ?category=<value>; "all" clears the param.
 */
export function InsightsFilter({ categories, activeCategory }: InsightsFilterProps) {
  const pathname = usePathname() || "/insights";
  const searchParams = useSearchParams();

  const buildHref = (value: string) => {
    const params = new URLSearchParams(searchParams?.toString() ?? "");
    if (value === "all") {
      params.delete("category");
    } else {
      params.set("category", value);
    }
    const qs = params.toString();
    return qs ? `${pathname}?${qs}` : pathname;
  };

  return (
    <nav
      aria-label="Filter essays by category"
      className="flex flex-wrap items-center justify-center gap-2 md:gap-3"
    >
      {categories.map((cat) => {
        const isActive = cat.value === activeCategory;
        return (
          <Link
            key={cat.value}
            href={buildHref(cat.value)}
            scroll={false}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "inline-flex items-center px-4 py-2 rounded-full",
              "font-body text-body-sm transition-colors duration-hover ease-smooth",
              "border focus-visible:outline-2 focus-visible:outline-brand-blue focus-visible:outline-offset-2",
              isActive
                ? "bg-emerald-900 text-white border-emerald-900"
                : "bg-bg-primary text-ink-body border-rule hover:border-ink-headline hover:text-ink-headline"
            )}
          >
            {cat.label}
          </Link>
        );
      })}
    </nav>
  );
}
