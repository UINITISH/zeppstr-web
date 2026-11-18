import Link from "next/link";
import Image from "next/image";

/**
 * FOUNDER-LED HERO — brand home page (preview, 18 Nov 2026).
 *
 * Direction chosen by Nitish: "human and founder-led". One position, one person,
 * two actions. No floating icons, no drafting grid, no proof rail — the
 * portrait and the founder's note carry the warmth those were adding.
 *
 * PHOTO: drop a portrait at /public/team/nitish-kumar.jpg (4:5, at least
 * 1000×1250, plain or studio background) and pass photo="/team/nitish-kumar.jpg".
 * Until then the frame shows a monogram, never a stock image.
 *
 * NOTE COPY: the first-person note is a DRAFT written for Nitish to approve or
 * rewrite. Its facts come from lib/team.ts (reads every diagnostic, sits on
 * the engagement) — do not add claims that are not his.
 */

interface HeroFounderProps {
  photo?: string;
}

export function HeroFounder({ photo }: HeroFounderProps) {
  return (
    <section className="relative bg-ink-headline text-white overflow-hidden">
      <div className="container-layout pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="grid lg:grid-cols-12 gap-14 lg:gap-16 items-center">
          {/* ── Left: position + founder's note ── */}
          <div className="lg:col-span-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/55">
              Zeppstr Growth Media · Bengaluru
            </p>

            <h1 className="mt-8 font-bold tracking-[-0.035em] text-[44px] sm:text-[56px] md:text-[68px] leading-[1.02] text-balance max-w-[16ch]">
              Your channels aren&apos;t the problem.{" "}
              <span className="text-brand-yellow">What&apos;s underneath them is.</span>
            </h1>

            <figure className="mt-12 max-w-[52ch] border-l-2 border-brand-yellow pl-6">
              <blockquote className="font-body text-body-lg text-white/80 leading-relaxed">
                &ldquo;Most businesses that come to us don&apos;t need another channel. They need the
                layer underneath fixed: positioning, measurement, conversion. I read every diagnostic
                myself and stay on the work until it compounds.&rdquo;
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span className="font-display font-bold text-body text-white">Nitish Kumar</span>
                <span className="text-white/40">·</span>
                <span className="font-body text-body-sm text-white/60">Founder</span>
              </figcaption>
            </figure>

            <div className="mt-12 flex flex-wrap items-center gap-4">
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

          {/* ── Right: the founder ── */}
          <div className="lg:col-span-5 lg:col-start-8">
            <div className="relative mx-auto max-w-[420px]">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-white/[0.06] border border-white/10">
                {photo ? (
                  <Image
                    src={photo}
                    alt="Nitish Kumar, founder of Zeppstr Growth Media"
                    fill
                    priority
                    sizes="(min-width: 1024px) 420px, 80vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 grid place-items-center">
                    <span className="font-display font-extralight text-[120px] tracking-[-0.04em] text-white/25">
                      NK
                    </span>
                  </div>
                )}
              </div>
              {/* Caption card overlapping the frame */}
              <div className="absolute -bottom-6 left-6 right-6 rounded-xl bg-white text-ink-headline px-6 py-5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)]">
                <p className="font-display font-bold text-[18px] tracking-[-0.01em]">Nitish Kumar</p>
                <p className="mt-1 font-body text-body-sm text-ink-body">
                  Founder · 10+ years in growth, UX and performance marketing
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
