import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

interface CTABannerProps {
  eyebrow?: string;
  heading: string;
  subhead?: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  variant?: "yellow" | "inverse";
  className?: string;
}

/**
 * CTA Banner — full-width section at end of every page.
 *
 * Variants:
 *  - yellow: brand-yellow background, ink-headline text (default)
 *  - inverse: deep navy background, brand-yellow CTA
 */
export function CTABanner({
  eyebrow,
  heading,
  subhead,
  primary,
  secondary,
  variant = "yellow",
  className,
}: CTABannerProps) {
  const isYellow = variant === "yellow";

  return (
    <section
      className={cn(
        "py-20 md:py-24",
        isYellow ? "bg-brand-yellow" : "bg-bg-inverse",
        className
      )}
    >
      <div className="container-layout text-center max-w-3xl">
        {eyebrow && (
          <p
            className={cn(
              "font-body text-eyebrow uppercase mb-6",
              isYellow ? "text-[#000]" : "text-brand-yellow"
            )}
          >
            {eyebrow}
          </p>
        )}
        <h2
          className={cn(
            "font-display font-light text-display-lg tracking-tight mb-6",
            isYellow ? "text-ink-headline" : "text-white"
          )}
        >
          {heading}
        </h2>
        {subhead && (
          <p
            className={cn(
              "font-body text-body-lg leading-relaxed mb-10",
              isYellow ? "text-ink-body" : "text-white/80"
            )}
          >
            {subhead}
          </p>
        )}
        <div className="flex flex-wrap items-center justify-center gap-4">
          {/* Primary CTA is SOLID in both variants.
              On the yellow banner it was previously `outline` — a thin dark
              border on yellow, which reads as a secondary action next to the
              plain-text link beside it. This is the page's main conversion
              point; it should be the highest-contrast element in the section.
              Solid emerald on yellow is the strongest pairing in the palette. */}
          <Button
            asChild
            variant="primary"
            className={
              isYellow
                ? "bg-emerald-900 text-white hover:bg-ink-headline shadow-[0_2px_0_0_rgba(0,0,0,0.18)] hover:shadow-[0_4px_0_0_rgba(0,0,0,0.22)] hover:-translate-y-px"
                : "bg-brand-yellow text-ink-headline hover:bg-brand-yellow-hover shadow-[0_2px_0_0_rgba(0,0,0,0.35)] hover:shadow-[0_4px_0_0_rgba(0,0,0,0.4)] hover:-translate-y-px"
            }
          >
            <Link href={primary.href}>{primary.label}</Link>
          </Button>
          {secondary && (
            <Link
              href={secondary.href}
              // Underline gives the secondary link an affordance without
              // competing with the solid primary above it.
              className={cn(
                "font-body font-medium text-button underline underline-offset-4 decoration-1 hover:opacity-70 transition-opacity",
                isYellow
                  ? "text-ink-headline decoration-ink-headline/40"
                  : "text-brand-yellow decoration-brand-yellow/40"
              )}
            >
              {secondary.label} →
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
