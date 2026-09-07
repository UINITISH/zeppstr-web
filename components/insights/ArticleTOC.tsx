"use client";

import * as React from "react";
import { cn } from "@/lib/cn";
import type { TocHeading } from "@/lib/insights/article";

interface ArticleTOCProps {
  headings: TocHeading[];
  className?: string;
}

/**
 * "On this page" anchor rail.
 *
 * Ids are computed server-side and stamped onto the rendered headings, so this
 * component never scrapes the DOM for structure — it only observes position to
 * highlight the section currently in view.
 */
export function ArticleTOC({ headings, className }: ArticleTOCProps) {
  const [activeId, setActiveId] = React.useState<string>(headings[0]?.id ?? "");

  React.useEffect(() => {
    if (!headings.length) return;

    const nodes = headings
      .map((h) => document.getElementById(h.id))
      .filter((n): n is HTMLElement => Boolean(n));
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Prefer the topmost heading currently intersecting the upper band.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]?.target.id) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-88px 0px -70% 0px", threshold: 0 }
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 3) return null;

  return (
    <nav aria-label="On this page" className={cn("", className)}>
      <p className="font-body text-eyebrow font-medium uppercase text-ink-muted mb-4">
        On this page
      </p>
      <ul className="border-l border-rule">
        {headings.map((h) => {
          const active = h.id === activeId;
          return (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                aria-current={active ? "location" : undefined}
                className={cn(
                  "block py-1.5 pr-2 -ml-px border-l-2 transition-colors duration-hover",
                  "font-body text-body-sm leading-snug",
                  h.level === 3 ? "pl-7" : "pl-4",
                  active
                    ? "border-brand-blue text-brand-blue font-medium"
                    : "border-transparent text-ink-muted hover:text-ink-headline"
                )}
              >
                {h.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
