import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/cn";
import type { Industry } from "@/sanity/lib/types";
import { sanityImageProps } from "@/sanity/lib/image";

interface IndustryCardProps {
  industry: Pick<Industry, "_id" | "name" | "slug" | "heroClaim" | "heroImage">;
  className?: string;
}

/**
 * Named, published proof per category.
 *
 * ── SOURCING RULE — READ BEFORE ADDING A ROW ────────────────────────────────
 * A category appears here ONLY if the result is already published in full on
 * this site with the spend attached, and the client is nameable. Both entries
 * below trace to a case study you can click:
 *
 *   real-estate  → /work/tru-aquapolis   ₹1.4 Cr media → ₹187.5 Cr closed,
 *                                        75 units, Jan–Aug 2026
 *   ecommerce-d2c → /work/wise-market    AUD 40K → AUD 2.7M in six months
 *
 * The other four categories are ABSENT ON PURPOSE. The page's own FAQ states
 * that only two categories carry named results, so inventing a third here
 * would contradict the page two screens further down. An empty proof slot is
 * cheaper than a borrowed one — a visitor reads "no number yet" as honesty and
 * "industry average uplift of 3.2×" as marketing.
 *
 * Do not add a row for a category on the strength of a private result. If it
 * is not published at /work, it does not go here.
 */
const CATEGORY_PROOF: Record<string, { figure: string; note: string }> = {
  "real-estate": {
    figure: "₹187.5 Cr closed",
    note: "on ₹1.4 Cr of media — Tru Aquapolis",
  },
  /* Slug is "ecommerce-dtc" in Sanity, not "-d2c". Checked against the seed —
     a mismatch here fails silently and the proof line just never appears. */
  "ecommerce-dtc": {
    figure: "AUD 40K → 2.7M",
    note: "in six months — Wise Market",
  },
};

/**
 * Industry Card — used on Home (6-up grid) and Industries hub index.
 */
export function IndustryCard({ industry, className }: IndustryCardProps) {
  const img = industry.heroImage ? sanityImageProps(industry.heroImage, { width: 800, height: 500 }) : null;
  const proof = CATEGORY_PROOF[industry.slug.current];

  return (
    <Link
      href={`/industries/${industry.slug.current}`}
      className={cn(
        /* flex-col h-full so cards in a row end level. Hero claims differ in
           length (E-commerce runs to three lines where its neighbours run to
           two), which left the "Explore" links on a row sitting at three
           different baselines. */
        "group flex flex-col h-full bg-bg-primary border border-rule rounded-lg overflow-hidden",
        "transition-all duration-hover ease-smooth",
        "hover:border-brand-blue hover:-translate-y-0.5",
        "focus-visible:outline-2 focus-visible:outline-brand-blue focus-visible:outline-offset-2",
        className
      )}
    >
      {img && (
        <div className="relative aspect-[16/10] bg-bg-secondary overflow-hidden">
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition-transform duration-page ease-smooth group-hover:scale-105"
            placeholder={img.blurDataURL ? "blur" : "empty"}
            blurDataURL={img.blurDataURL}
          />
        </div>
      )}
      <div className="flex flex-col flex-1 p-6">
        <h3 className="font-display font-light text-display-sm text-ink-headline mb-2 tracking-tight">
          {industry.name}
        </h3>
        {industry.heroClaim && (
          <p className="font-body text-body-sm text-ink-muted leading-relaxed">
            {industry.heroClaim}
          </p>
        )}

        {/* ── PROOF LINE — PRESENT ON TWO OF SIX, BY DESIGN ──────────────────
            Pre-launch QA flagged the grid as looking unfinished because four
            cards lacked the stat the other two carry.

            The stat is only on Real Estate and E-commerce because those are
            the only two categories with a published, nameable client result.
            That is stated outright in this page's own FAQ two screens down, so
            backfilling the other four with invented figures would contradict
            the page as well as the site's whole position.

            What changed instead is the TREATMENT. It used to be a bordered
            band — a visually distinct section that was conspicuously missing
            from four cards. It is now set inline, in the same rhythm as the
            hero claim above it, so a card carrying one reads as having an
            extra sentence rather than an extra module. A card without it no
            longer looks like a card with a hole in it.

            Add a row to CATEGORY_PROOF the moment a category earns one. Do not
            add a placeholder. */}
        {proof && (
          <p className="mt-4 font-body text-body-sm text-ink-headline leading-snug">
            <span className="font-medium">{proof.figure}</span>
            <span className="text-ink-muted"> — {proof.note}</span>
          </p>
        )}

        <span className="mt-auto pt-4 font-body font-medium text-body-sm text-brand-blue inline-flex items-center gap-1 group-hover:gap-2 transition-all duration-hover">
          Explore →
        </span>
      </div>
    </Link>
  );
}
