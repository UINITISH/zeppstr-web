import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/cn";
import type { CaseStudy } from "@/sanity/lib/types";
import { sanityImageProps } from "@/sanity/lib/image";

interface CaseStudyCardProps {
  caseStudy: Pick<
    CaseStudy,
    "_id" | "clientName" | "slug" | "headlineMetric" | "headlineTimeframe" | "heroImage" | "industry"
  >;
  variant?: "default" | "featured";
  className?: string;
}

/**
 * Case Study Card — used on Home, /work index, Industry pages, Solution pages.
 *
 * Variants:
 *  - default: standard card for /work index
 *  - featured: larger card with hero image for Home + featured slots
 */
export function CaseStudyCard({
  caseStudy,
  variant = "default",
  className,
}: CaseStudyCardProps) {
  const img = caseStudy.heroImage
    ? sanityImageProps(caseStudy.heroImage, {
        width: variant === "featured" ? 1200 : 800,
        height: variant === "featured" ? 800 : 500,
      })
    : null;

  return (
    <Link
      href={`/work/${caseStudy.slug.current}`}
      className={cn(
        "group block bg-bg-primary border border-rule rounded-lg overflow-hidden",
        "transition-all duration-hover ease-smooth",
        "hover:border-brand-blue hover:-translate-y-0.5",
        "focus-visible:outline-2 focus-visible:outline-brand-blue focus-visible:outline-offset-2",
        className
      )}
    >
      {img && (
        <div
          className={cn(
            "relative bg-bg-secondary overflow-hidden",
            variant === "featured" ? "aspect-[3/2]" : "aspect-[16/10]"
          )}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes={
              variant === "featured"
                ? "(max-width: 768px) 100vw, 50vw"
                : "(max-width: 768px) 100vw, 33vw"
            }
            className="object-cover transition-transform duration-page ease-smooth group-hover:scale-105"
            placeholder={img.blurDataURL ? "blur" : "empty"}
            blurDataURL={img.blurDataURL}
          />
        </div>
      )}
      <div className={cn("p-6", variant === "featured" && "p-8 md:p-10")}>
        <div className="flex items-center gap-3 mb-4">
          <span className="font-body text-eyebrow text-brand-blue uppercase">
            {caseStudy.clientName}
          </span>
          {caseStudy.industry?.name && (
            <>
              <span className="text-ink-muted" aria-hidden="true">
                ·
              </span>
              <span className="font-body text-eyebrow text-ink-muted uppercase">
                {caseStudy.industry.name}
              </span>
            </>
          )}
        </div>
        <h3
          className={cn(
            "font-display font-extralight text-ink-headline tracking-tight mb-3",
            variant === "featured" ? "text-display-lg" : "text-display-md"
          )}
        >
          {caseStudy.headlineMetric}
        </h3>
        {caseStudy.headlineTimeframe && (
          <p className="font-body text-body text-ink-muted">
            {caseStudy.headlineTimeframe}
          </p>
        )}
        <span className="mt-6 font-body font-medium text-body-sm text-brand-blue inline-flex items-center gap-1 group-hover:gap-2 transition-all duration-hover">
          Read the story →
        </span>
      </div>
    </Link>
  );
}
