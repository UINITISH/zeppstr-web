import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/cn";
import type { Article } from "@/sanity/lib/types";
import { sanityImageProps } from "@/sanity/lib/image";
import { getCategoryImage, getCategoryImageMeta } from "@/lib/insights/category-image";
import { CATEGORY_LABELS } from "@/lib/insights/article";
// ArticleCover is no longer rendered on-page — see the note above. It is kept
// as a component because /insights-cover/[slug] still generates social share
// images from the same design, where a title card is the right thing.

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
 * Image resolution order:
 *   1. the article's own uploaded heroImage in Sanity;
 *   2. the licensed category photograph (lib/insights/category-image.ts).
 *
 * It used to fall back to /insights-cover/<slug> — the article title set in
 * type on a navy gradient. Thirty of those in one grid was thirty near-identical
 * dark rectangles restating a headline that is already printed in real text
 * directly underneath the card. That route still exists and is still used for
 * social share images, where a title card is exactly right; it is just no
 * longer used on-page.
 */
export function ArticleCard({ article, variant = "default", className }: ArticleCardProps) {
  const uploaded = article.heroImage
    ? sanityImageProps(article.heroImage, { width: 960, height: 600 })
    : null;

  // Category photograph, used whenever the article has no image of its own.
  const categoryPhoto = getCategoryImage(article.category, article.slug.current);
  const categoryPhotoAlt = getCategoryImageMeta(article.category, article.slug.current).title;

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
              <Image
                src={categoryPhoto}
                alt={categoryPhotoAlt}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-page ease-smooth group-hover:scale-[1.03]"
              />
            )}
          </div>
          <div>
            {meta}
            <h2 className="font-display font-light text-display-md text-ink-headline tracking-tight mb-4 group-hover:text-brand-blue transition-colors duration-hover">
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
          <Image
            src={categoryPhoto}
            alt={categoryPhotoAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition-transform duration-page ease-smooth group-hover:scale-105"
          />
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
