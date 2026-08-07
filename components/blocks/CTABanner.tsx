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
            "font-display font-extralight text-display-lg tracking-tight mb-6",
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
          <Button
            asChild
            variant={isYellow ? "outline" : "primary"}
            className={
              isYellow
                ? "border-ink-headline text-ink-headline hover:bg-emerald-900 hover:text-white hover:border-emerald-900"
                : "bg-brand-yellow text-ink-headline hover:bg-brand-yellow-hover"
            }
          >
            <Link href={primary.href}>{primary.label}</Link>
          </Button>
          {secondary && (
            <Link
              href={secondary.href}
              className={cn(
                "font-body font-medium text-button hover:opacity-70 transition-opacity",
                isYellow ? "text-ink-headline" : "text-brand-yellow"
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
