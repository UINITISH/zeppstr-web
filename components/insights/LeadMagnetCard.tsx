import Link from "next/link";
import { cn } from "@/lib/cn";

interface LeadMagnetCardProps {
  eyebrow?: string;
  heading: string;
  body: string;
  cta: { label: string; href: string };
  points?: string[];
  variant?: "sidebar" | "inline";
  className?: string;
}

/**
 * Lead magnet block.
 *
 * `sidebar` — compact, lives in the sticky article rail.
 * `inline`  — full-width band dropped mid-article, after the reader has had
 *             enough of the piece to be worth converting.
 */
export function LeadMagnetCard({
  eyebrow = "Free diagnostic",
  heading,
  body,
  cta,
  points,
  variant = "sidebar",
  className,
}: LeadMagnetCardProps) {
  if (variant === "inline") {
    return (
      <aside
        className={cn(
          "my-14 rounded-lg bg-bg-inverse text-white px-7 py-8 md:px-10 md:py-10",
          className
        )}
      >
        <p className="font-body text-eyebrow font-medium uppercase text-brand-yellow mb-4">
          {eyebrow}
        </p>
        <h3 className="font-display font-light text-display-sm text-white tracking-tight mb-4 max-w-[24ch]">
          {heading}
        </h3>
        <p className="font-body text-body text-white/75 leading-relaxed mb-6 max-w-[60ch]">
          {body}
        </p>
        {points && points.length > 0 && (
          <ul className="mb-7 space-y-2">
            {points.map((p) => (
              <li
                key={p}
                className="font-body text-body-sm text-white/85 pl-5 relative before:absolute before:left-0 before:top-[0.6em] before:w-2 before:h-[2px] before:bg-brand-yellow"
              >
                {p}
              </li>
            ))}
          </ul>
        )}
        <Link
          href={cta.href}
          className="inline-flex items-center justify-center bg-brand-yellow text-[#000] font-body font-medium text-button px-8 py-4 rounded hover:bg-brand-yellow-hover transition-colors duration-hover ease-smooth"
        >
          {cta.label}
        </Link>
      </aside>
    );
  }

  return (
    <aside
      className={cn(
        "rounded-lg border border-rule bg-bg-secondary p-6",
        className
      )}
    >
      <p className="font-body text-eyebrow font-medium uppercase text-brand-blue mb-3">
        {eyebrow}
      </p>
      <h3 className="font-display font-light text-body-lg text-ink-headline leading-snug mb-3">
        {heading}
      </h3>
      <p className="font-body text-body-sm text-ink-body leading-relaxed mb-5">{body}</p>
      {points && points.length > 0 && (
        <ul className="mb-5 space-y-1.5">
          {points.map((p) => (
            <li
              key={p}
              className="font-body text-body-sm text-ink-body pl-4 relative before:absolute before:left-0 before:top-[0.62em] before:w-2 before:h-[2px] before:bg-brand-yellow"
            >
              {p}
            </li>
          ))}
        </ul>
      )}
      <Link
        href={cta.href}
        className="inline-flex w-full items-center justify-center bg-brand-yellow text-[#000] font-body font-medium text-body-sm px-5 py-3 rounded hover:bg-brand-yellow-hover transition-colors duration-hover ease-smooth"
      >
        {cta.label}
      </Link>
    </aside>
  );
}
