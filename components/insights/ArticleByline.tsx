import { cn } from "@/lib/cn";

interface ArticleBylineProps {
  author: string;
  publishedAt?: string;
  readingMinutes: number;
  className?: string;
  size?: "sm" | "lg";
}

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/** Compact byline: avatar, author, publish date, reading estimate. */
export function ArticleByline({
  author,
  publishedAt,
  readingMinutes,
  className,
  size = "sm",
}: ArticleBylineProps) {
  const date = publishedAt ? new Date(publishedAt) : null;
  const avatar = size === "lg" ? "w-12 h-12 text-body" : "w-10 h-10 text-body-sm";

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div
        aria-hidden="true"
        className={cn(
          "shrink-0 rounded-full bg-bg-inverse text-brand-yellow flex items-center justify-center font-body font-medium",
          avatar
        )}
      >
        {initials(author)}
      </div>
      <div className="min-w-0">
        <div className="font-body font-medium text-body-sm text-ink-headline">
          {author}
        </div>
        <div className="font-body text-body-sm text-ink-muted flex flex-wrap items-center gap-x-2">
          {date && (
            <time dateTime={publishedAt}>
              {date.toLocaleDateString("en-IN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          )}
          {date && <span aria-hidden="true">·</span>}
          <span>{readingMinutes} min read</span>
        </div>
      </div>
    </div>
  );
}
