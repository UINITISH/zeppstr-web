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

        {/* Published proof, where it exists. Absent on four of six categories
            by design — see CATEGORY_PROOF above. */}
        {proof && (
          <div className="mt-5 pt-4 border-t border-ink-headline/10">
            <p className="font-display font-light text-display-xs text-ink-headline leading-tight">
              {proof.figure}
            </p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">
              {proof.note}
            </p>
          </div>
        )}

        <span className="mt-auto pt-4 font-body font-medium text-body-sm text-brand-blue inline-flex items-center gap-1 group-hover:gap-2 transition-all duration-hover">
          Explore →
        </span>
      </div>
    </Link>
  );
}
