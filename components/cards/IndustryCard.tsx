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
 * Industry Card — used on Home (6-up grid) and Industries hub index.
 */
export function IndustryCard({ industry, className }: IndustryCardProps) {
  const img = industry.heroImage ? sanityImageProps(industry.heroImage, { width: 800, height: 500 }) : null;

  return (
    <Link
      href={`/industries/${industry.slug.current}`}
      className={cn(
        "group block bg-bg-primary border border-rule rounded-lg overflow-hidden",
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
      <div className="p-6">
        <h3 className="font-display font-light text-display-sm text-ink-headline mb-2 tracking-tight">
          {industry.name}
        </h3>
        {industry.heroClaim && (
          <p className="font-body text-body-sm text-ink-muted leading-relaxed">
            {industry.heroClaim}
          </p>
        )}
        <span className="mt-4 font-body font-medium text-body-sm text-brand-blue inline-flex items-center gap-1 group-hover:gap-2 transition-all duration-hover">
          Explore →
        </span>
      </div>
    </Link>
  );
}
