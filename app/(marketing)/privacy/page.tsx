import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/meta";
import { GlobalNav } from "@/components/nav/GlobalNav";
import { Footer } from "@/components/nav/Footer";

/**
 * /privacy
 *
 * Linked from the footer on every page but had no route — it 404'd. Found
 * during pre-launch verification, 19 Aug 2026.
 *
 * ⚠️ REVIEW BEFORE LAUNCH ────────────────────────────────────────────────────
 * This describes what the codebase actually does — the form handlers in
 * app/api/, the analytics scripts in app/layout.tsx, and the third parties in
 * .env.example. It is factually accurate as a description of the system.
 *
 * It is NOT legal advice and has not been reviewed by a lawyer. Zeppstr
 * operates in India (DPDP Act 2023) and serves clients in the EU, UK, UAE and
 * Australia, so GDPR is likely in scope. Have counsel review before launch,
 * and confirm the retention period and grievance-officer details below — those
 * two are placeholders marked TODO.
 */

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "How Zeppstr Growth Media collects, uses and retains personal data submitted through this website.",
  alternates: { canonical: "/privacy" },
  path: "/privacy",
});

const UPDATED = "19 August 2026";

export default function PrivacyPage() {
  return (
    <>
      <GlobalNav />
      <main>
        <section className="container-layout pt-20 md:pt-28 pb-16">
          <p className="eyebrow mb-6">Legal</p>
          <h1 className="font-extralight tracking-tight text-display-xl text-ink-headline mb-6 max-w-[18ch]">
            Privacy Policy
          </h1>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
            Last updated {UPDATED}
          </p>
        </section>

        <section className="container-layout pb-24 md:pb-32">
          <div className="max-w-[64ch] space-y-10 font-body text-body text-ink-body leading-relaxed">
            <div>
              <h2 className="font-display font-light text-display-sm text-ink-headline mb-4">
                Who we are
              </h2>
              <p>
                Zeppstr Growth Media (“Zeppstr”, “we”)
                is a digital marketing consultancy based in Bengaluru, India. This
                policy covers personal data collected through zeppstr.com.
              </p>
            </div>

            <div>
              <h2 className="font-display font-light text-display-sm text-ink-headline mb-4">
                What we collect
              </h2>
              <p className="mb-4">
                We only collect what you actively submit. There are three forms
                on this site:
              </p>
              <ul className="space-y-3 pl-5 list-disc marker:text-ink-muted">
                <li>
                  <strong className="font-medium text-ink-headline">
                    Contact form
                  </strong>{" "}
                  — name, business email, company, and your message.
                </li>
                <li>
                  <strong className="font-medium text-ink-headline">
                    Diagnostic application
                  </strong>{" "}
                  — name, business email, company website, annual revenue band,
                  monthly marketing budget, desired outcome, start timeline, and
                  how you heard about us.
                </li>
                <li>
                  <strong className="font-medium text-ink-headline">
                    Newsletter signup
                  </strong>{" "}
                  — email address only.
                </li>
              </ul>
              <p className="mt-4">
                We do not ask for, and you should not send, financial account
                details, government identifiers, or any sensitive personal data
                through these forms.
              </p>
            </div>

            <div>
              <h2 className="font-display font-light text-display-sm text-ink-headline mb-4">
                Analytics
              </h2>
              <p>
                We use privacy-focused analytics to understand which pages are
                read. Depending on configuration this may include Plausible
                Analytics (cookieless, no personal data), Google Analytics 4, and
                Microsoft Clarity. Where cookie-based analytics are active, they
                collect usage data such as pages viewed, approximate location
                derived from IP, device type and referrer. You can block these
                with any standard browser privacy setting or extension.
              </p>
            </div>

            <div>
              <h2 className="font-display font-light text-display-sm text-ink-headline mb-4">
                Who processes your data
              </h2>
              <p className="mb-4">
                We use the following third-party processors. Each holds data
                under its own terms:
              </p>
              <ul className="space-y-2 pl-5 list-disc marker:text-ink-muted">
                <li>Vercel — website hosting and delivery</li>
                <li>Sanity — content management (no visitor data)</li>
                <li>Resend — transactional email delivery for form submissions</li>
                <li>Beehiiv — newsletter subscriptions</li>
                <li>Cloudflare Turnstile — spam protection on forms</li>
                <li>Sentry — error monitoring</li>
                <li>Plausible, Google Analytics, Microsoft Clarity — analytics</li>
              </ul>
              <p className="mt-4">
                We do not sell personal data, and we do not share it with
                advertisers.
              </p>
            </div>

            <div>
              <h2 className="font-display font-light text-display-sm text-ink-headline mb-4">
                How long we keep it
              </h2>
              <p>
                {/* TODO — confirm actual retention period before launch. */}
                Form submissions are retained for as long as needed to respond to
                your enquiry and to maintain a record of the engagement
                discussion. Newsletter subscriptions are retained until you
                unsubscribe, which you can do from any email we send.
              </p>
            </div>

            <div>
              <h2 className="font-display font-light text-display-sm text-ink-headline mb-4">
                Your rights
              </h2>
              <p>
                You can ask us to confirm what personal data we hold about you,
                correct it, or delete it. Where the GDPR applies you also have
                rights to restrict or object to processing and to data
                portability. Write to{" "}
                <a
                  href="mailto:nitish@zeppstr.com"
                  className="text-brand-blue underline underline-offset-2"
                >
                  nitish@zeppstr.com
                </a>{" "}
                and we will respond within 30 days.
              </p>
            </div>

            <div>
              <h2 className="font-display font-light text-display-sm text-ink-headline mb-4">
                Contact
              </h2>
              <p>
                Zeppstr Growth Media, 27th Main Road, HSR Layout, Bengaluru,
                Karnataka, India.{" "}
                <a
                  href="mailto:nitish@zeppstr.com"
                  className="text-brand-blue underline underline-offset-2"
                >
                  nitish@zeppstr.com
                </a>
              </p>
            </div>

            <div className="pt-6 border-t border-ink-headline/15">
              <p className="text-body-sm text-ink-muted">
                See also our{" "}
                <Link
                  href="/terms"
                  className="text-brand-blue underline underline-offset-2"
                >
                  Terms of Use
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
