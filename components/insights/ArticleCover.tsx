import { cn } from "@/lib/cn";
import { CATEGORY_ACCENT, CATEGORY_LABELS } from "@/lib/insights/article";
import { CategoryMotif } from "@/components/insights/CategoryMotif";

interface ArticleCoverProps {
  title: string;
  category: string;
  /** `hero` is the full-bleed treatment at the top of an article page. */
  size?: "card" | "hero";
  className?: string;
}

/**
 * Branded cover art, rendered as DOM rather than a generated image.
 *
 * Articles seeded from the content archive have no uploaded heroImage. This
 * fills that gap with real markup — no image request, no optimizer round-trip,
 * nothing to 500. Uploading a heroImage in Sanity replaces it entirely.
 *
 * Colours are set inline rather than via utility classes: the panel background
 * is category-driven at runtime, and inline styles keep the contrast contract
 * explicit instead of depending on class-merge ordering.
 *
 * (The /insights-cover/<slug> route still exists and is used for social
 * sharing previews, where an actual PNG is required.)
 */
export function ArticleCover({
  title,
  category,
  size = "card",
  className,
}: ArticleCoverProps) {
  const accent = CATEGORY_ACCENT[category] ?? CATEGORY_ACCENT["growth-strategy"];
  const label = CATEGORY_LABELS[category] ?? "Insights";
  const hero = size === "hero";

  return (
    <div
      className={cn(
        "relative w-full h-full flex flex-col justify-between overflow-hidden",
        hero ? "p-8 md:p-14" : "p-6",
        className
      )}
      style={{ backgroundColor: accent.bg }}
    >
      {/* Structural rule grid — echoes the site's layout language */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          opacity: 0.07,
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: hero ? "56px 56px" : "36px 36px",
        }}
      />

      {/* Category motif */}
      <CategoryMotif
        category={category}
        color={accent.fg}
        className={cn(
          "absolute pointer-events-none",
          hero
            ? "right-8 md:right-16 top-1/2 -translate-y-1/2 w-[180px] md:w-[260px] opacity-40"
            : "-right-6 -bottom-6 w-[132px] opacity-25"
        )}
      />

      <p
        className={cn(
          "relative font-body font-semibold uppercase",
          hero ? "text-eyebrow" : "text-[11px] tracking-[0.16em]"
        )}
        style={{ color: accent.fg }}
      >
        {label}
      </p>

      <div className={cn("relative", hero && "md:max-w-[62%]")}>
        <div
          aria-hidden="true"
          className={cn("mb-4", hero ? "w-16 h-1.5" : "w-10 h-1")}
          style={{ backgroundColor: accent.fg }}
        />
        <p
          className={cn(
            "font-display font-light tracking-tight",
            hero
              ? "text-display-md max-w-[20ch]"
              : "text-body-lg leading-snug max-w-[22ch] line-clamp-4"
          )}
          style={{ color: "#FFFFFF" }}
        >
          {title}
        </p>
      </div>

      <p
        className={cn(
          "relative font-body font-medium uppercase",
          hero ? "text-body-sm tracking-[0.2em]" : "text-[10px] tracking-[0.18em]"
        )}
        style={{ color: "rgba(255,255,255,0.5)" }}
      >
        Zeppstr Growth Media
      </p>
    </div>
  );
}
