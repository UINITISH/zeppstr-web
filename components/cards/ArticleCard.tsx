import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/cn";
import type { Article } from "@/sanity/lib/types";
import { sanityImageProps } from "@/sanity/lib/image";
import { CATEGORY_LABELS } from "@/lib/insights/article";
import { ArticleCover } from "@/components/insights/ArticleCover";

interface ArticleCardProps {
  article: Pick<
    Article,
    "_id" | "title" | "slug" | "excerpt" | "heroImage" | "author" | "category" | "publishedAt"
  >;
  /** `feature` renders the horizontal hero treatment used for the latest essay. */
  variant?: "default" | "feature" | "compact";
  className?: string;
}

/**
 * Article Card — /insights index, home teaser, and the related-reading rail.
 *
 * Falls back to the generated /insights-cover/<slug> art when an article has no
 * uploaded heroImage, so the grid never renders a hole. Uploading a real image
 * in Sanity overrides it with no code change.
 */
export function ArticleCard({ article, variant = "default", className }: ArticleCardProps) {
  const uploaded = article.heroImage
    ? sanityImageProps(article.heroImage, { width: 960, height: 600 })
    : null;

  const categoryLabel = CATEGORY_LABELS[article.category] ?? article.category;
  const date = article.publishedAt ? new Date(article.publishedAt) : null;

  const meta = (
    <div className="flex items-center gap-3 mb-3">
      <span className="font-body text-eyebrow font-medium text-brand-blue uppercase">
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
  );

  const base = cn(
    "group block transition-all duration-hover ease-smooth rounded-lg",
    "focus-visible:outline-2 focus-visible:outline-brand-blue focus-visible:outline-offset-2",
    className
  );

  if (variant === "compact") {
    return (
      <Link href={`/insights/${article.slug.current}`} className={base}>
        {meta}
        <h3 className="font-display font-light text-body-lg leading-snug text-ink-headline mb-1 group-hover:text-brand-blue transition-colors duration-hover">
          {article.title}
        </h3>
      </Link>
    );
  }

  if (variant === "feature") {
    return (
      <Link href={`/insights/${article.slug.current}`} className={base}>
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="relative aspect-[16/10] bg-bg-secondary overflow-hidden rounded-lg">
            {uploaded ? (
              <Image
                src={uploaded.src}
                alt={uploaded.alt}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-page ease-smooth group-hover:scale-[1.03]"
              />
            ) : (
              <div className="absolute inset-0 transition-transform duration-page ease-smooth group-hover:scale-[1.03]">
                <ArticleCover title={article.title} category={article.category} />
              </div>
            )}
          </div>
          <div>
            {meta}
            <h2 className="font-display font-extralight text-display-md text-ink-headline tracking-tight mb-4 group-hover:text-brand-blue transition-colors duration-hover">
              {article.title}
            </h2>
            {article.excerpt && (
              <p className="font-body text-body-lg text-ink-body leading-relaxed line-clamp-4">
                {article.excerpt}
              </p>
            )}
            <span className="inline-block mt-6 font-body font-medium text-body-sm text-brand-blue">
              Read the essay →
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/insights/${article.slug.current}`} className={base}>
      <div className="relative aspect-[16/10] bg-bg-secondary overflow-hidden rounded-lg mb-5">
        {uploaded ? (
          <Image
            src={uploaded.src}
            alt={uploaded.alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition-transform duration-page ease-smooth group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 transition-transform duration-page ease-smooth group-hover:scale-105">
            <ArticleCover title={article.title} category={article.category} />
          </div>
        )}
      </div>
      {meta}
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
