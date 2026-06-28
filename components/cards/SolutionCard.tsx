import Link from "next/link";
import { cn } from "@/lib/cn";
import type { Solution } from "@/sanity/lib/types";

interface SolutionCardProps {
  solution: Pick<Solution, "_id" | "name" | "slug" | "tagline">;
  number?: string;
  className?: string;
}

/**
 * Solution Card — Home (5-up grid) and Solutions hub index.
 * Oversized decorative number, refined hover with brand-blue rule animation,
 * subtle elevation on hover. Consulting-firm card calibre.
 */
export function SolutionCard({ solution, number, className }: SolutionCardProps) {
  // Extract just the number ("01" from "Solution 01") for the decorative element
  const decorativeNumber = number?.match(/\d+/)?.[0] ?? "";

  return (
    <Link
      href={`/solutions/${solution.slug.current}`}
      className={cn(
        "group relative block bg-bg-primary border border-rule rounded-lg",
        "p-7 md:p-8 overflow-hidden",
        "transition-all duration-hover ease-smooth",
        "hover:border-ink-headline hover:-translate-y-1 hover:shadow-[0_12px_40px_-12px_rgba(10,16,47,0.15)]",
        "focus-visible:outline-2 focus-visible:outline-brand-blue focus-visible:outline-offset-2",
        className
      )}
    >
      {/* Oversized decorative number — bottom-right, very faint */}
      {decorativeNumber && (
        <span
          aria-hidden="true"
          className="absolute -right-4 -bottom-8 font-display font-extralight text-[180px] leading-[0.85] tracking-tighter text-ink-headline/[0.04] select-none pointer-events-none transition-colors duration-hover ease-smooth group-hover:text-brand-blue/[0.06]"
        >
          {decorativeNumber}
        </span>
      )}

      {/* Animated brand-blue rule — top edge */}
      <span
        aria-hidden="true"
        className="absolute top-0 left-0 h-px w-0 bg-brand-blue transition-all duration-page ease-smooth group-hover:w-full"
      />

      <div className="relative">
        {number && (
          <div className="font-body text-eyebrow font-semibold text-ink-muted uppercase tracking-[0.12em] mb-5">
            {number}
          </div>
        )}
        <h3 className="font-display font-light text-display-sm text-ink-headline mb-4 tracking-[-0.01em] leading-[1.15] max-w-[18ch]">
          {solution.name}
        </h3>
        {solution.tagline && (
          <p className="font-body text-body text-ink-body leading-relaxed mb-8 max-w-[40ch]">
            {solution.tagline}
          </p>
        )}
        <span className="font-body font-medium text-body-sm text-brand-blue inline-flex items-center gap-1.5 group-hover:gap-3 transition-all duration-hover">
          Explore the practice
          <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  );
}
