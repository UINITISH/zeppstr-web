import Link from "next/link";

/**
 * FOUNDER-LED HERO — brand home page (preview, 18 Nov 2026).
 *
 * Direction chosen by Nitish: founder-led, then (18 Nov) plain and centred with
 * no image. One position, the founder's note, two actions. Nothing else.
 *
 * NOTE COPY: the first-person note is a DRAFT written for Nitish to approve or
 * rewrite. Its facts come from lib/team.ts (reads every diagnostic, sits on
 * the engagement) — do not add claims that are not his.
 */

export function HeroFounder() {
  return (
    <section className="relative bg-ink-headline text-white">
      <div className="container-layout pt-20 pb-24 md:pt-32 md:pb-36">
        <div className="mx-auto max-w-[880px] text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/55">
            Zeppstr Growth Media · Bengaluru
          </p>

          <h1 className="mt-8 font-bold tracking-[-0.035em] text-[44px] sm:text-[58px] md:text-[76px] leading-[1.02] text-balance">
            Your channels aren&apos;t the problem.{" "}
            <span className="text-brand-yellow">What&apos;s underneath them is.</span>
          </h1>

          <figure className="mt-12 mx-auto max-w-[56ch]">
            <blockquote className="font-body text-body-lg text-white/75 leading-relaxed">
              &ldquo;Most businesses that come to us don&apos;t need another channel. They need the
              layer underneath fixed: positioning, measurement, conversion. I read every diagnostic
              myself and stay on the work until it compounds.&rdquo;
            </blockquote>
            <figcaption className="mt-6 font-body text-body-sm text-white/60">
              <span className="font-display font-bold text-white">Nitish Kumar</span>
              <span className="mx-2 text-white/40">·</span>
              Founder
            </figcaption>
          </figure>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/book-consultation"
              className="inline-flex items-center gap-2 rounded-md bg-brand-yellow px-7 py-4 font-body font-semibold text-body text-ink-headline hover:bg-white transition-colors duration-hover"
            >
              Apply for a diagnostic <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/work"
              className="inline-flex items-center rounded-md border border-white/30 px-7 py-4 font-body text-body text-white hover:border-white hover:bg-white/5 transition-colors duration-hover"
            >
              See the work
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
