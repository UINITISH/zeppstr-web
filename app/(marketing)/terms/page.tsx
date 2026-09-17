import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/meta";
import { GlobalNav } from "@/components/nav/GlobalNav";
import { Footer } from "@/components/nav/Footer";

/**
 * /terms
 *
 * Linked from the footer on every page but had no route — it 404'd. Found
 * during pre-launch verification, 19 Aug 2026.
 *
 * ⚠️ REVIEW BEFORE LAUNCH ────────────────────────────────────────────────────
 * These are website terms of use only — they govern use of zeppstr.com. They
 * do NOT govern client engagements; those are covered by the individual
 * contract, and this page says so explicitly.
 *
 * Not legal advice and not reviewed by a lawyer. Have counsel confirm the
 * liability and governing-law clauses before launch.
 */

export const metadata: Metadata = buildMetadata({
  title: "Terms of Use",
  description:
    "Terms governing use of the zeppstr.com website, including content ownership, third-party marks, and limitation of liability.",
  alternates: { canonical: "/terms" },
  path: "/terms",
});

const UPDATED = "19 August 2026";

export default function TermsPage() {
  return (
    <>
      <GlobalNav />
      <main>
        <section className="container-layout pt-20 md:pt-28 pb-16">
          <p className="eyebrow mb-6">Legal</p>
          <h1 className="font-extralight tracking-tight text-display-xl text-ink-headline mb-6 max-w-[18ch]">
            Terms of Use
          </h1>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
            Last updated {UPDATED}
          </p>
        </section>

        <section className="container-layout pb-24 md:pb-32">
          <div className="max-w-[64ch] space-y-10 font-body text-body text-ink-body leading-relaxed">
            <div>
              <h2 className="font-display font-light text-display-sm text-ink-headline mb-4">
                Scope
              </h2>
              <p>
                These terms govern your use of zeppstr.com. They do not govern
                client engagements — those are set out in the individual contract
                signed with Zeppstr Growth Media, which takes precedence over
                anything on this website.
              </p>
            </div>

            <div>
              <h2 className="font-display font-light text-display-sm text-ink-headline mb-4">
                Our content
              </h2>
              <p>
                The written content, case studies, articles, design and code on
                this site are the property of Zeppstr Growth Media. You may
                quote or cite them with attribution and a link. You may not
                reproduce them wholesale, or republish them as your own.
              </p>
            </div>

            <div>
              <h2 className="font-display font-light text-display-sm text-ink-headline mb-4">
                Client names and trade marks
              </h2>
              <p>
                Client names and logos shown on this site remain the property of
                their respective owners and are used to identify engagements
                Zeppstr has delivered. Where an engagement was delivered under an
                agreement that does not permit us to name the client, we report
                it in anonymised, aggregate form only. If you believe your mark
                appears here in error, write to{" "}
                <a
                  href="mailto:nitish@zeppstr.com"
                  className="text-brand-blue underline underline-offset-2"
                >
                  nitish@zeppstr.com
                </a>{" "}
                and we will remove it promptly.
              </p>
            </div>

            <div>
              <h2 className="font-display font-light text-display-sm text-ink-headline mb-4">
                Results and figures
              </h2>
              <p>
                Figures published in case studies describe outcomes achieved for
                specific clients under specific conditions and are not a promise
                of comparable results. Where a figure is modelled rather than
                measured — for example pipeline value derived from an assumed
                close rate — the assumption is stated alongside it.
              </p>
            </div>

            <div>
              <h2 className="font-display font-light text-display-sm text-ink-headline mb-4">
                No advice
              </h2>
              <p>
                Articles and guides on this site are published for general
                information. They are not consulting, legal, financial or tax
                advice, and should not be relied on as a substitute for
                professional guidance on your specific situation.
              </p>
            </div>

            <div>
              <h2 className="font-display font-light text-display-sm text-ink-headline mb-4">
                Third-party links
              </h2>
              <p>
                This site links to third-party websites we do not control. We are
                not responsible for their content, accuracy or privacy practices.
              </p>
            </div>

            <div>
              <h2 className="font-display font-light text-display-sm text-ink-headline mb-4">
                Limitation of liability
              </h2>
              <p>
                This website is provided on an “as is” basis. To the
                extent permitted by law, Zeppstr Growth Media is not liable for
                any loss arising from use of, or reliance on, information
                published here.
              </p>
            </div>

            <div>
              <h2 className="font-display font-light text-display-sm text-ink-headline mb-4">
                Governing law
              </h2>
              <p>
                These terms are governed by the laws of India, and disputes are
                subject to the exclusive jurisdiction of the courts of
                Bengaluru, Karnataka.
              </p>
            </div>

            <div className="pt-6 border-t border-ink-headline/15">
              <p className="text-body-sm text-ink-muted">
                See also our{" "}
                <Link
                  href="/privacy"
                  className="text-brand-blue underline underline-offset-2"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
