import Image from "next/image";
import { cn } from "@/lib/cn";
import { sanityImageSquare } from "@/sanity/lib/image";
import type { Quote } from "@/sanity/lib/types";

interface PullQuoteProps {
  quote: Pick<
    Quote,
    "quoteText" | "attributionName" | "attributionTitle" | "attributionCompany" | "attributionPhoto"
  >;
  variant?: "large" | "small";
  className?: string;
}

/**
 * Pull Quote — used on Home, Case Study pages, Solution pages, Industry pages.
 * Uses brand-yellow left border + Plus Jakarta Sans extra-light italic.
 */
export function PullQuote({ quote, variant = "large", className }: PullQuoteProps) {
  const photo = quote.attributionPhoto ? sanityImageSquare(quote.attributionPhoto, 96) : null;

  return (
    <figure
      className={cn(
        "border-l-2 border-brand-yellow",
        variant === "large" ? "pl-8 md:pl-12 my-16" : "pl-6 my-10",
        className
      )}
    >
      <blockquote
        className={cn(
          "font-display font-extralight text-ink-headline italic tracking-tight",
          variant === "large" ? "text-display-lg leading-tight" : "text-display-sm leading-snug"
        )}
      >
        “{quote.quoteText}”
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-4">
        {photo && (
          <Image
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            placeholder={photo.blurDataURL ? "blur" : "empty"}
            blurDataURL={photo.blurDataURL}
            className="w-12 h-12 rounded-full object-cover"
          />
        )}
        <div>
          <div className="font-body font-medium text-body text-ink-headline">
            {quote.attributionName}
          </div>
          {(quote.attributionTitle || quote.attributionCompany) && (
            <div className="font-body text-body-sm text-ink-muted">
              {quote.attributionTitle}
              {quote.attributionTitle && quote.attributionCompany && " · "}
              {quote.attributionCompany}
            </div>
          )}
        </div>
      </figcaption>
    </figure>
  );
}
