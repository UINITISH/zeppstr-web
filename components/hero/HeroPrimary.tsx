import Link from "next/link";
import { AnimatedNumber } from "@/components/utility/AnimatedNumber";
import { AnimatedHeadline } from "@/components/utility/AnimatedHeadline";
import { FloatingMarketingIcons } from "@/components/utility/FloatingMarketingIcons";

interface CTA {
  label: string;
  href: string;
}

interface HeroPrimaryProps {
  eyebrow?: string;
  headline: React.ReactNode;
  subhead?: string;
  ctaPrimary: CTA;
  ctaSecondary?: CTA;
}

/**
 * Editorial hero — Instrument-disciplined, with two focal points.
 *
 * Left: massive extralight headline (the thesis).
 * Right: firm credibility card — two oversized stats (6—12 partner clients,
 *        300+ businesses) with mono labels. Gives the eye a second place to
 *        land without competing with the headline.
 *
 * Bottom: editorial rule + supporting subhead + primary CTA + scroll cue.
 */
export function HeroPrimary({
  headline,
  subhead,
  ctaPrimary,
  ctaSecondary,
}: HeroPrimaryProps) {
  return (
    <section className="relative bg-bg-primary overflow-hidden min-h-[calc(100vh-80px)] flex items-center">
      <FloatingMarketingIcons />
      <div className="container-layout pt-12 md:pt-16 pb-10 md:pb-12 relative z-10 w-full">
        {/* Top meta strip */}
        <div className="flex items-center gap-4 mb-6 md:mb-8">
          <span
            aria-hidden="true"
            className="block w-2.5 h-2.5 bg-brand-yellow flex-shrink-0"
          />
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
            Strategic growth partner
          </p>
        </div>

        {/* Main two-column zone — headline left, firm card right */}
        <div className="grid md:grid-cols-12 gap-10 md:gap-12 items-start">
          {/* Headline — kinetic letter-by-letter reveal (Yellow Slice-style) */}
          <div className="md:col-span-8">
            <AnimatedHeadline
              as="h1"
              stagger={28}
              duration={800}
              boldLeadingWords={2}
              highlightLeadingWords={2}
              className="font-light tracking-[-0.025em] text-[clamp(48px,6vw,96px)] text-ink-headline leading-[1.1] max-w-[18ch]"
            >
              {typeof headline === "string"
                ? headline
                : "Strategic growth planning for ambitious businesses."}
            </AnimatedHeadline>
          </div>

          {/* Firm card — brand block: green bg + white text */}
          <aside className="md:col-span-4 hidden md:block relative z-10">
            <div className="bg-emerald-900 text-white p-6 md:p-8 space-y-6">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/70 mb-4">
                  Engagement model
                </p>
                <p className="font-display font-extralight text-[64px] leading-[0.95] tracking-[-0.025em] text-white mb-3">
                  6—<AnimatedNumber target={12} />
                </p>
                <p className="font-body text-body-sm text-white/85 leading-relaxed">
                  partner clients per year
                  <br />
                  <span className="text-white/60">selective by design</span>
                </p>
              </div>

              <div className="border-t border-white/15 pt-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/70 mb-4">
                  Track record
                </p>
                <p className="font-display font-extralight text-[64px] leading-[0.95] tracking-[-0.025em] text-white mb-3">
                  <AnimatedNumber target={300} />+
                </p>
                <p className="font-body text-body-sm text-white/85 leading-relaxed">
                  businesses across 10+ countries
                </p>
              </div>
            </div>
          </aside>
        </div>

        {/* Bottom row — supporting line + CTA */}
        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-end mt-10 md:mt-14 pt-6 border-t border-ink-headline/10">
          {subhead && (
            <p className="md:col-span-7 font-body text-body-lg text-ink-body leading-[1.5] max-w-[52ch]">
              {subhead}
            </p>
          )}

          <div className="md:col-span-5 flex md:justify-end">
            <Link
              href={ctaPrimary.href}
              className="inline-flex items-center gap-3 bg-brand-yellow text-ink-headline font-display font-light text-[clamp(18px,1.4vw,24px)] px-8 py-4 hover:bg-emerald-900 hover:text-white transition-colors duration-hover"
            >
              <span>{ctaPrimary.label}</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
