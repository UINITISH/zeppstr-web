import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/meta";
import { GlobalNav } from "@/components/nav/GlobalNav";
import { Footer } from "@/components/nav/Footer";
import { DiagnosticIntake } from "@/components/forms/DiagnosticIntake";

export const metadata: Metadata = buildMetadata({
  title: "Apply for a Diagnostic — Zeppstr",
  description:
    "A 5-step intake. We read your inputs and return a preliminary diagnosis before any conversation. The 45-minute paid diagnostic comes after — refunded in full if we’re not the right fit.",
  path: "/book-consultation",
})

export default function BookConsultationPage() {
  return (
    <>
      <GlobalNav />
      <main className="bg-bg-primary">
        {/* ── Page header ──
            REBUILT 15 SEP 2026, to the two-column pattern every other page on
            the site uses. Three things were wrong:

            1. It was a single full-width column, so the right half of the most
               important conversion page on the site was empty white. Every
               solution, industry and index page puts something in that space.

            2. `max-w-[20ch]` with a two-word yellow highlight mid-sentence
               wrapped the highlight across a line break, producing a staircase
               of three separate yellow blocks. Combined with leading-[1.05] the
               blocks overlapped the descenders on the line above ("leaking"
               was visibly clipped). The highlight is now on "24 hours" — short,
               load-bearing, and it cannot break across a line.

            3. The page asked for five steps of personal information without
               stating anywhere near the form what the visitor gets back. That
               is now the panel on the right, above the fold. */}
        <section className="border-b border-ink-headline/10">
          <div className="container-layout pt-20 md:pt-24 pb-14 md:pb-20">
            <div className="grid md:grid-cols-12 gap-10 md:gap-14 items-start">
              <div className="md:col-span-7">
                <div className="flex items-center gap-4 mb-8">
                  <span aria-hidden="true" className="block w-2.5 h-2.5 bg-brand-yellow flex-shrink-0" />
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
                    Engage — Diagnostic intake
                  </p>
                </div>
                {/* leading-[1.18] rather than 1.05: a highlighted span needs
                    room for its own padding or it collides with the line above. */}
                <h1 className="font-bold tracking-[-0.03em] text-display-xl text-ink-headline leading-[1.18] max-w-[18ch] text-balance mb-8">
                  Tell us where it&rsquo;s leaking. We&rsquo;ll send a preliminary read within{" "}
                  <span className="bg-brand-yellow px-3 py-0.5 box-decoration-clone whitespace-nowrap">
                    24 hours
                  </span>
                  .
                </h1>
                <p className="font-body text-body-lg text-ink-body leading-[1.6] max-w-[56ch]">
                  Five short steps, about three minutes. We map your situation against the patterns
                  we&rsquo;ve seen across 300+ businesses and return a written diagnosis to your inbox
                  within 24 hours. It&rsquo;s yours to keep, even if we never speak again. The
                  45-minute paid diagnostic comes after — refunded in full if we&rsquo;re not the
                  right fit for each other.
                </p>
              </div>

              {/* What you actually get back. Matches the homepage proof card so
                  the two ends of the funnel are visibly the same system. */}
              <aside className="md:col-span-5 hidden md:block">
                <div className="bg-bg-inverse text-white p-8 md:p-10">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/70 mb-7">
                    What you get back
                  </p>
                  <ul className="space-y-6">
                    {[
                      ["A written preliminary read", "Not a call invitation. An actual assessment of where your growth is leaking, in your inbox."],
                      ["Within 24 hours", "Sent whether or not you go further, and yours to keep either way."],
                      ["No sales sequence", "One reply. If you don't respond, you don't hear from us again."],
                    ].map(([t, d]) => (
                      <li key={t} className="border-t border-white/15 pt-5 first:border-t-0 first:pt-0">
                        <p className="font-display font-light text-display-xs text-white mb-1.5">
                          {t}
                        </p>
                        <p className="font-body text-body-sm text-white/75 leading-relaxed">
                          {d}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* The form itself (client component) */}
        <DiagnosticIntake />
      </main>
      <Footer />
    </>
  );
}
