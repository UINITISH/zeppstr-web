import Link from "next/link";

/**
 * Testimonials — client words, reproduced exactly.
 *
 * ── DESIGN NOTES ────────────────────────────────────────────────────────────
 *
 * 1. THE TYPE IS DELIBERATELY SMALL. A first pass set these quotes at display
 *    size in two columns. Client testimonials are not written to be read at
 *    40px — they are ordinary sentences, and blowing them up made the section
 *    read as filler and left huge ragged gaps where one quote was shorter than
 *    its neighbour. They now set at body size in a four-up grid, where uneven
 *    lengths stop being visible.
 *
 * 2. NO CAROUSEL. A slider hides most of the evidence behind an interaction
 *    nobody performs.
 *
 * 3. NO AVATARS, AND NO LOGOS. None of these quotes came with a photograph, and
 *    a stock headshot beside a real quote makes a true testimonial look fake.
 *    Attribution is set in type.
 *
 * 4. THE GAPS ARE LEFT VISIBLE. "Founder, Homatico" with no individual named is
 *    how the source document signs it. Inventing a plausible name would be
 *    fabrication; dropping the quote would throw away real evidence.
 *
 * ── WHAT GETS RENDERED IS AN ALLOWLIST ──────────────────────────────────────
 * See TESTIMONIAL_IDS in sanity/lib/queries.ts. The Sanity dataset still
 * contains fabricated testimonials from an early seed; a wildcard query put
 * them on the homepage. Do not loosen that query.
 *
 * Renders nothing when passed an empty array, so a page loses a section rather
 * than showing an empty frame.
 */

export interface TestimonialItem {
  _id: string;
  quoteText: string;
  attributionName: string;
  attributionTitle?: string;
  attributionCompany?: string;
  /** Slug of the case study this testimonial refers to, if any. */
  relatedCaseStudySlug?: string | null;
}

interface TestimonialsProps {
  quotes: TestimonialItem[];
  eyebrow?: string;
  heading?: string;
  /** Tone of the band. "light" on white pages, "dark" to break up a run. */
  tone?: "light" | "dark";
}

export function Testimonials({
  quotes,
  eyebrow = "In their words",
  heading = "Clients, unedited.",
  tone = "light",
}: TestimonialsProps) {
  if (!quotes || quotes.length === 0) return null;

  const dark = tone === "dark";

  return (
    <section
      className={
        dark
          ? "bg-bg-inverse text-white"
          : "bg-bg-secondary border-y border-ink-headline/10"
      }
      aria-labelledby="testimonials-heading"
    >
      <div className="container-layout py-20 md:py-24">
        {/* Header — one line. The quotes are the content; the heading is a
            label, and setting it at hero scale stole attention from them. */}
        <div
          className={`flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 border-b pb-6 mb-12 ${
            dark ? "border-white/20" : "border-ink-headline/15"
          }`}
        >
          <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
            <p
              className={`font-mono text-[11px] uppercase tracking-[0.2em] ${
                dark ? "text-white/55" : "text-ink-muted"
              }`}
            >
              {eyebrow}
            </p>
            <h2
              id="testimonials-heading"
              className={`font-display font-light tracking-[-0.02em] text-display-md leading-[1.1] ${
                dark ? "text-white" : "text-ink-headline"
              }`}
            >
              {heading}
            </h2>
          </div>
          <p
            className={`font-body text-body-sm max-w-[46ch] leading-relaxed ${
              dark ? "text-white/60" : "text-ink-muted"
            }`}
          >
            Reproduced as written &mdash; including the ones signed by a company
            rather than a person.
          </p>
        </div>

        {/* Four-up on desktop, two-up on tablet. Small type, equal columns:
            short and long quotes sit side by side without a visible hole. */}
        <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 lg:gap-x-10 gap-y-10">
          {quotes.map((q) => (
            <li key={q._id} className="flex flex-col">
              <blockquote className="flex flex-col h-full">
                {/* Yellow tick rather than a decorative quote glyph — the
                    quotation marks are already in the text. */}
                <span
                  aria-hidden="true"
                  className="block w-6 h-[3px] bg-brand-yellow mb-5"
                />
                <p
                  className={`font-body text-body-sm leading-[1.65] flex-1 ${
                    dark ? "text-white/85" : "text-ink-body"
                  }`}
                >
                  &ldquo;{q.quoteText}&rdquo;
                </p>
                <footer
                  className={`mt-6 pt-4 border-t ${
                    dark ? "border-white/20" : "border-ink-headline/15"
                  }`}
                >
                  <cite
                    className={`not-italic block font-body font-medium text-body-sm ${
                      dark ? "text-white" : "text-ink-headline"
                    }`}
                  >
                    {q.attributionName}
                  </cite>
                  <span
                    className={`mt-1 block font-mono text-[10px] uppercase tracking-[0.18em] ${
                      dark ? "text-white/50" : "text-ink-muted"
                    }`}
                  >
                    {[q.attributionTitle, q.attributionCompany]
                      .filter(Boolean)
                      .join(" · ")}
                  </span>
                  {/* ── RESERVED SLOT, NOT A CONDITIONAL ELEMENT ───────────
                      Pre-launch QA: two of the four cards carried a company
                      name and a "Read the work" link and two did not, so the
                      row read as half-finished.

                      The data is correct and is not the problem. Mohammed Asif
                      and Pankaj Singhal are signed with a name and "Founder"
                      and NOTHING ELSE in the source deck — there is no company
                      to add, and inventing one to square up a layout would be
                      exactly the kind of small fabrication this site has spent
                      weeks removing.

                      So the slot is always rendered and always the same height.
                      Cards with a case study get a link; cards without get
                      empty space of identical size. The row is even, and no
                      data was invented to make it so. */}
                  <div className="mt-3 min-h-[22px]">
                    {q.relatedCaseStudySlug && (
                      <Link
                        href={`/work/${q.relatedCaseStudySlug}`}
                        className={`inline-block font-mono text-[10px] uppercase tracking-[0.18em] border-b pb-0.5 transition-colors ${
                          dark
                            ? "text-white/70 border-white/40 hover:text-white hover:border-brand-yellow"
                            : "text-ink-headline border-ink-headline/40 hover:text-brand-blue hover:border-brand-yellow"
                        }`}
                      >
                        Read the work &rarr;
                      </Link>
                    )}
                  </div>
                </footer>
              </blockquote>
            </li>
          ))}
        </ul>

        {/* Honest note about volume. Four testimonials is not a wall of praise,
            and pretending otherwise invites the reader to count them. */}
        <p
          className={`mt-12 pt-6 border-t font-body text-body-sm max-w-[78ch] leading-relaxed ${
            dark
              ? "border-white/20 text-white/50"
              : "border-ink-headline/15 text-ink-muted"
          }`}
        >
          We publish testimonials clients have given us in writing. Several of
          the engagements we are proudest of sit under NDAs and are not
          represented here at all &mdash; we will put you on a call with those
          clients instead.
        </p>
      </div>
    </section>
  );
}
