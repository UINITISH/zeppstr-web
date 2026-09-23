import type { PortableTextBlock } from "@portabletext/types";

/**
 * Shared helpers for the Insights article experience.
 *
 * Everything here is pure + server-safe so the article page can compute the
 * table of contents, reading time and cover fallback during render — no
 * client-side DOM scraping, no layout shift.
 */

export interface TocHeading {
  /** Portable Text block _key — lets the renderer stamp the same id on the DOM node. */
  key: string;
  id: string;
  text: string;
  level: 2 | 3;
}

/** Stable, URL-safe anchor id derived from heading text. */
export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[*_`~]/g, "")
    .replace(/&[a-z]+;/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

/** Flatten a Portable Text block's spans into plain text. */
export function blockToPlainText(block: PortableTextBlock): string {
  const children = (block as { children?: { text?: string }[] }).children ?? [];
  return children
    .map((c) => c.text ?? "")
    .join("")
    .replace(/\*\*/g, "")
    .trim();
}

/**
 * Extract h2/h3 headings for the sidebar table of contents.
 * Ids are de-duplicated so two identical headings still anchor correctly —
 * the same de-duplication runs in the renderer, keyed by document order.
 */
export function extractHeadings(body: PortableTextBlock[] | undefined): TocHeading[] {
  if (!body?.length) return [];
  const seen = new Map<string, number>();
  const out: TocHeading[] = [];

  for (const block of body) {
    const style = (block as { style?: string }).style;
    if (style !== "h2" && style !== "h3") continue;
    const text = blockToPlainText(block);
    if (!text) continue;

    const base = slugifyHeading(text) || "section";
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    out.push({
      key: (block as { _key?: string })._key ?? base,
      id: count === 0 ? base : `${base}-${count + 1}`,
      text,
      level: style === "h2" ? 2 : 3,
    });
  }
  return out;
}

/** Words-per-minute reading estimate from the article body. */
export function readingTimeMinutes(body: PortableTextBlock[] | undefined): number {
  if (!body?.length) return 1;
  const words = body
    .filter((b) => (b as { _type?: string })._type === "block")
    .map((b) => blockToPlainText(b))
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 225));
}

/**
 * Cover art fallback. Articles seeded from the content archive have no
 * uploaded heroImage; the generated route renders a branded, category-keyed
 * cover so the grid never shows a hole. Uploading a real image in Sanity
 * overrides this automatically.
 */
export function coverFallbackUrl(slug: string): string {
  return `/insights-cover/${slug}`;
}

export const CATEGORY_LABELS: Record<string, string> = {
  "growth-strategy": "Growth Strategy",
  "seo-search": "SEO & Search",
  "performance-paid": "Performance & Paid",
  "conversion-experience": "Conversion & Experience",
  "email-lifecycle": "Email & Lifecycle",
  "social-content": "Social & Content",
  "industry-insights": "Industry Insights",
};

/** Category accent colours — used by cards, covers and the category rail. */
export const CATEGORY_ACCENT: Record<string, { bg: string; fg: string }> = {
  "growth-strategy": { bg: "#064E3B", fg: "#FFD031" },
  "seo-search": { bg: "#0A102F", fg: "#FFD031" },
  "performance-paid": { bg: "#3147FF", fg: "#FFFFFF" },
  "conversion-experience": { bg: "#7C2D12", fg: "#FFD031" },
  "email-lifecycle": { bg: "#5B21B6", fg: "#FFD031" },
  "social-content": { bg: "#9D174D", fg: "#FFD031" },
  "industry-insights": { bg: "#1F2937", fg: "#FFD031" },
};

/** Map of Portable Text block _key → anchor id, for the renderer. */
export function headingIdMap(headings: TocHeading[]): Record<string, string> {
  return Object.fromEntries(headings.map((h) => [h.key, h.id]));
}
