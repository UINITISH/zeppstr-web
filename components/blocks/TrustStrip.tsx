import Link from "next/link";

interface Stat {
  accent: string;
  after?: string;
  label: string;
  href?: string;
}

interface TrustStripProps {
  label: string;
  stats: Stat[];
}

/**
 * Outcomes showcase — premium consulting-firm metric strip.
 * Oversized display numbers, restrained typography, dividers between each stat,
 * subtle brand-yellow accent only on the leading metric. Each stat is a
 * full-bleed clickable card with directional hover treatment.
 */
export function TrustStrip({ label, stats }: TrustStripProps) {
  return (
    <section className="bg-bg-secondary border-y border-rule">
      <div className="container-layout py-16 md:py-24">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-3">
          <p className="font-body text-eyebrow font-semibold text-ink-muted uppercase tracking-[0.12em]">
            {label}
          </p>
          <Link
            href="/work"
            className="font-body text-body-sm text-brand-blue hover:opacity-70 transition-opacity"
          >
            All client outcomes →
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-rule">
          {stats.map((stat, i) => {
            const isLeading = i === 0;
            const inner = (
              <div className="bg-bg-secondary p-8 md:p-10 h-full transition-colors duration-hover ease-smooth group-hover:bg-bg-primary">
                {/* Leading accent — only on the flagship stat */}
                {isLeading && (
                  <div
                    aria-hidden="true"
                    className="w-10 h-px bg-brand-yellow mb-6"
                  />
                )}
                {!isLeading && (
                  <div
                    aria-hidden="true"
                    className="w-10 h-px bg-rule mb-6 group-hover:bg-brand-blue transition-colors duration-hover"
                  />
                )}

                <div className="font-display font-extralight text-display-lg leading-[0.95] tracking-[-0.02em] text-ink-headline mb-1">
                  <span className="font-medium text-ink-headline">{stat.accent}</span>
                </div>
                {stat.after && (
                  <div className="font-display font-light text-display-md leading-[1.1] tracking-[-0.01em] text-brand-blue mb-6">
                    {stat.after}
                  </div>
                )}

                <div className="font-body text-body-sm text-ink-body leading-relaxed max-w-[32ch]">
                  {stat.label}
                </div>

                {stat.href && (
                  <div className="mt-6 font-body text-body-sm text-brand-blue inline-flex items-center gap-1 group-hover:gap-2 transition-all duration-hover opacity-0 group-hover:opacity-100">
                    Read the story
                    <span aria-hidden="true">→</span>
                  </div>
                )}
              </div>
            );
            return (
              <div key={i} className="group cursor-pointer">
                {stat.href ? (
                  <Link href={stat.href} className="block h-full">
                    {inner}
                  </Link>
                ) : (
                  inner
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
