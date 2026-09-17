import Link from "next/link";
import { AnimatedNumber } from "@/components/utility/AnimatedNumber";
import { AnimatedHeadline } from "@/components/utility/AnimatedHeadline";
import { CompoundingVectors } from "@/components/utility/CompoundingVectors";
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
 * Editorial hero — headline and argument left, proof card right.
 *
 * ── REBUILT 15 SEP 2026 ─────────────────────────────────────────────────────
 * Five things were wrong with the previous version, in descending order of how
 * much they cost:
 *
 * 1. ctaSecondary WAS NEVER RENDERED. It sits in the props interface and
 *    app/(marketing)/page.tsx passes "Apply for a diagnostic" into it — the
 *    paid entry point this entire firm is structured around — and the JSX
 *    simply never used the prop. The homepage's primary conversion action was
 *    silently dropped. That is the most expensive bug on the site and it was
 *    invisible because nothing errors when you ignore a prop.
 *
 * 2. The headline was set in `display-stat` (76px), a tier meant for two- and
 *    three-glyph numerals, not sentences. At 76px an eight-word headline broke
 *    to three lines and dominated everything below it.
 *
 * 3. `min-h-[calc(100vh-80px)]` with `items-center` forced the block to fill
 *    the viewport whatever its content. On a 1512×795 window that inflated the
 *    gap between headline and supporting copy to ~180px of empty white, which
 *    read as a missing element rather than as breathing room.
 *
 * 4. The subhead repeated the headline almost verbatim. Headline: "Strategic
 *    growth planning for ambitious businesses." Subhead, twelve words later:
 *    "Zeppstr is the strategic growth partner for ambitious businesses." The
 *    first two sentences on the site were the same sentence twice. Rewritten
 *    at the call site to make an argument instead.
 *
 * 5. `highlightLeadingWords={2}` put the yellow block on "Strategic growth" —
 *    the two most generic words in the sentence, and the two a competitor
 *    would also use. Highlighting is emphasis; emphasis on a commodity phrase
 *    is wasted.
 *
 * FloatingMarketingIcons: removed in the first pass, then restored on 15 Sep
 * at Vikas's request, in a dark tone. I had argued they were the one
 * un-disciplined element on an otherwise severe page. He wants the ambient
 * movement, and on a dark hero they are far less obtrusive than they were on
 * white — they read as drawn marks in the margin rather than clip-art. Fair
 * call; the page keeps its character and gains some warmth.
 */
export function HeroPrimary({
  eyebrow,
  headline,
  subhead,
  ctaPrimary,
  ctaSecondary,
}: HeroPrimaryProps) {
  return (
    <section className="relative bg-bg-inverse text-white overflow-hidden">
      {/* Ambient marketing doodles, restored 15 Sep 2026 at Vikas's request.
          Same drift + pulse animation as before (float-a/b/c in globals.css);
          `tone="dark"` swaps the ink-on-white bubble for a white hairline so
          they read on emerald instead of vanishing into it. Positioned in the
          outer margins and clear of the proof rail — see the layout note in
          that component. */}
      <FloatingMarketingIcons tone="dark" />

      {/* Hairline drafting grid — the same drafting language as the diagrams,
          at very low contrast so it reads as paper texture, not decoration. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #FFF 1px, transparent 1px), linear-gradient(to bottom, #FFF 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      <div className="container-layout pt-16 md:pt-24 pb-0 relative z-10 w-full">
        {/* Top meta strip */}
        <div className="flex items-center gap-4 mb-8 md:mb-10">
          <span
            aria-hidden="true"
            className="block w-2.5 h-2.5 bg-brand-yellow flex-shrink-0"
          />
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">
            {eyebrow ?? "Strategic growth partner"}
          </p>
        </div>

        <div className="grid md:grid-cols-12 gap-10 md:gap-14 items-start pb-14 md:pb-20">
          <div className="md:col-span-7">
            <AnimatedHeadline
              as="h1"
              stagger={28}
              duration={800}
              boldLeadingWords={4}
              className="font-light tracking-[-0.03em] text-display-xl text-white leading-[1.06] max-w-[16ch] text-balance"
            >
              {typeof headline === "string"
                ? headline
                : "Your channels aren't the problem. What's underneath them is."}
            </AnimatedHeadline>

            {subhead && (
              <p className="mt-7 md:mt-9 font-body text-body-lg text-white/75 leading-[1.6] max-w-[52ch]">
                {subhead}
              </p>
            )}

            <div className="mt-9 md:mt-11 flex flex-wrap items-center gap-x-8 gap-y-5">
              <Link
                href={ctaPrimary.href}
                className="inline-flex items-center gap-3 bg-brand-yellow text-ink-headline font-display font-light text-display-xs px-8 py-4 hover:bg-white transition-colors duration-hover"
              >
                <span>{ctaPrimary.label}</span>
                <span aria-hidden="true">→</span>
              </Link>

              {ctaSecondary && (
                <Link
                  href={ctaSecondary.href}
                  className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.18em] text-white border-b border-white/50 pb-1 hover:border-brand-yellow hover:text-brand-yellow transition-colors duration-hover"
                >
                  <span>{ctaSecondary.label}</span>
                  <span aria-hidden="true">→</span>
                </Link>
              )}
            </div>
          </div>

          {/* ── Hero diagram ──
              The homepage was the ONLY hero on the site with no graphic in it.
              Every solution page, industry page, hub page, /work and /about
              carries an animated diagram; the one page everybody sees carried
              type alone, which is why it read as less designed than pages
              three clicks deeper.

              CompoundingVectors argues the headline directly rather than
              decorating it — four channel arrows that rotate from splayed to
              aligned while the combined result grows. See that component for
              the reasoning and for why it carries no figures. */}
          <aside className="md:col-span-5 hidden md:block">
            <CompoundingVectors />

            {/* ── The two USP figures ──
                PROMOTED 15 SEP 2026. These are the firm's actual
                differentiators — a capped client list and the breadth behind
                it — and the previous pass demoted them from a card to 34px
                grey-ish type tucked under the diagram, where they read as a
                footnote. A USP set smaller than the supporting proof beneath
                it is a hierarchy error.

                They now get the largest type in the hero after the headline,
                the brand yellow, a rule that wipes in, and the count-up.

                COLOUR HIERARCHY: these two are yellow; the proof rail below is
                white. Only one tier of number can be the loudest, and yellow
                on emerald is the loudest thing this palette can do. When the
                rail was also yellow, five figures competed and none won. */}
            <div className="grid grid-cols-2 gap-8 mt-9 pt-8 border-t border-white/15">
              {[
                {
                  figure: (
                    <>
                      6—<AnimatedNumber target={12} duration={1400} />
                    </>
                  ),
                  label: "Partner clients per year",
                  note: "Selective by design",
                  delay: "0ms",
                },
                {
                  figure: (
                    <>
                      <AnimatedNumber target={300} duration={1800} />+
                    </>
                  ),
                  label: "Businesses across 10+ countries",
                  /* NOT a founding year. Nothing in the archive states when
                     Zeppstr was founded, and "Since 20XX" on a homepage is the
                     kind of detail a prospect checks against Companies House
                     or LinkedIn in ten seconds. "Six industries" is already
                     published on the logo wall lower down this same page. */
                  note: "Six industries",
                  delay: "140ms",
                },
              ].map((s) => (
                <div key={s.label} className="flex flex-col h-full">
                  {/* Accent rule — origin-left so it grows outward rather than
                      expanding from its own centre. */}
                  <span
                    aria-hidden="true"
                    className="block h-[3px] w-10 bg-brand-yellow origin-left animate-wipe-in mb-5"
                    style={{ animationDelay: s.delay }}
                  />
                  <p
                    className="font-display font-extralight text-display-stat text-brand-yellow leading-[0.9] tracking-[-0.03em] animate-rise-in"
                    style={{ animationDelay: s.delay }}
                  >
                    {s.figure}
                  </p>
                  {/* flex-col + mt-auto rather than a min-height guess.
                      "Partner clients per year" sets on one line and
                      "Businesses across 10+ countries" on two, so the mono
                      notes beneath them landed on different baselines. A fixed
                      min-h got close but stayed a few pixels out at some
                      widths; pinning the note to the bottom of an equal-height
                      cell is exact at every width. */}
                  <p className="mt-4 font-body text-body-sm text-white leading-snug">
                    {s.label}
                  </p>
                  <p className="mt-auto pt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">
                    {s.note}
                  </p>
                </div>
              ))}
            </div>
          </aside>
        </div>

        {/* ── Proof rail ──
            THE ACTUAL POINT OF THIS REBUILD.

            Three real, published, named client outcomes sitting in the first
            viewport. Previously a visitor had to scroll past the whole
            homepage and click into /work before encountering a single number
            that belonged to a client. The firm's entire positioning is "we
            only claim what we can prove" — and the proof started two screens
            below the claim.

            SOURCING: all three are published in full on this site with the
            spend attached. Tru Aquapolis at /work/tru-aquapolis, Wise Market
            at /work/wise-market, Mini Leaves at /work/mini-leaves. Each tile
            links to the case study, which is the whole reason it is safe to
            put the number here — a figure a reader can click into is a
            different kind of claim from one they cannot. Do not add a fourth
            tile for a result that is not written up. */}
        <div className="border-t border-white/15 grid grid-cols-1 md:grid-cols-3">
          {[
            {
              figure: "₹187.5 Cr",
              label: "closed from leads we generated",
              note: "on ₹1.4 Cr of media · Tru Aquapolis",
              href: "/work/tru-aquapolis",
            },
            {
              figure: "AUD 40K → 2.7M",
              label: "monthly revenue, six months",
              note: "Australian e-commerce · Wise Market",
              href: "/work/wise-market",
            },
            {
              figure: "0.5% → 3%+",
              label: "site conversion rate",
              note: "Indian DTC brand · Mini Leaves",
              href: "/work/mini-leaves",
            },
          ].map((p, i) => (
            <Link
              key={p.figure}
              href={p.href}
              className={`group py-8 md:py-10 md:px-8 first:md:pl-0 border-white/15 ${
                i > 0 ? "border-t md:border-t-0 md:border-l" : ""
              } hover:bg-white/[0.04] transition-colors duration-hover`}
            >
              {/* White, not yellow — see the colour-hierarchy note on the USP
                  stats above. These are supporting evidence for the two
                  headline claims, so they sit one tier down. */}
              <p className="font-display font-extralight text-display-md text-white leading-none tracking-[-0.02em] group-hover:text-brand-yellow transition-colors duration-hover">
                {p.figure}
              </p>
              <p className="mt-3 font-body text-body-sm text-white/85 leading-snug">
                {p.label}
              </p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-white/45 group-hover:text-brand-yellow transition-colors duration-hover">
                {p.note} →
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
