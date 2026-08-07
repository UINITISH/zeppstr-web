import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/cn";
import type { Article } from "@/sanity/lib/types";
import { sanityImageProps } from "@/sanity/lib/image";

interface ArticleCardProps {
  article: Pick<
    Article,
    "_id" | "title" | "slug" | "excerpt" | "heroImage" | "author" | "category" | "publishedAt"
  >;
  className?: string;
}

const CATEGORY_LABELS: Record<string, string> = {
  "growth-strategy": "Growth Strategy",
  "seo-search": "SEO & Search",
  "performance-paid": "Performance & Paid",
  "conversion-experience": "Conversion & Experience",
  "industry-insights": "Industry Insights",
};

/**
 * Article Card — used on /insights index + Home recent-articles + related articles in articles.
 */
export function ArticleCard({ article, className }: ArticleCardProps) {
  const img = article.heroImage
    ? sanityImageProps(article.heroImage, { width: 800, height: 500 })
    : null;

  const categoryLabel = CATEGORY_LABELS[article.category] ?? article.category;
  const date = article.publishedAt ? new Date(article.publishedAt) : null;

  return (
    <Link
      href={`/insights/${article.slug.current}`}
      className={cn(
        "group block",
        "transition-all duration-hover ease-smooth",
        "focus-visible:outline-2 focus-visible:outline-brand-blue focus-visible:outline-offset-2 rounded-lg",
        className
      )}
    >
      {img && (
        <div className="relative aspect-[16/10] bg-bg-secondary overflow-hidden rounded-lg mb-5">
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-page ease-smooth group-hover:scale-105"
            placeholder={img.blurDataURL ? "blur" : "empty"}
            blurDataURL={img.blurDataURL}
          />
        </div>
      )}
      <div className="flex items-center gap-3 mb-3">
        <span className="font-body text-eyebrow text-brand-blue uppercase">
          {categoryLabel}
        </span>
        {date && (
          <>
            <span className="text-ink-muted" aria-hidden="true">
              ·
            </span>
            <time
              dateTime={article.publishedAt}
              className="font-body text-body-sm text-ink-muted"
            >
              {date.toLocaleDateString("en-IN", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </time>
          </>
        )}
      </div>
      <h3 className="font-display font-light text-display-sm text-ink-headline tracking-tight mb-3 group-hover:text-brand-blue transition-colors duration-hover">
        {article.title}
      </h3>
      {article.excerpt && (
        <p className="font-body text-body text-ink-body leading-relaxed line-clamp-3">
          {article.excerpt}
        </p>
      )}
    </Link>
  );
}
