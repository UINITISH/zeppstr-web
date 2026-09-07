import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/meta";
import Link from "next/link";
import { GlobalNav } from "@/components/nav/GlobalNav";
import { Footer } from "@/components/nav/Footer";

export const metadata: Metadata = buildMetadata({
  title: "Thanks for applying | Zeppstr",
  description:
    "Thanks for applying to work with Zeppstr. Nitish reads every application personally — you’ll hear back within 48 hours.",
  robots: { index: false, follow: false },
  path: "/thank-you",
})

const CALENDLY_URL = "https://cal.com/nitish-kumar-yvxogq/30min";

export default function ThankYouPage() {
  return (
    <>
      <GlobalNav />
      <main>
        <section className="container-layout pt-20 md:pt-32 pb-12 text-center">
          <p className="eyebrow mb-6">Application received</p>
          <h1 className="font-extralight tracking-tight text-display-xl text-ink-headline mb-8 max-w-[22ch] mx-auto">
            Thanks for applying.
          </h1>
          <p className="font-body text-body-lg text-ink-body max-w-[60ch] mx-auto leading-relaxed">
            Nitish reads every application personally. You&rsquo;ll hear back within 48 hours.
          </p>
        </section>

        <section className="container-layout pb-16">
          <div className="max-w-[64ch] mx-auto space-y-6 font-body text-body text-ink-body leading-relaxed">
            <p>
              If we&rsquo;re a fit for the engagement you described, we&rsquo;ll send a
              calendar link for a 30-minute scoping call. The call is exactly that —
              scoping. We diagnose live what you&rsquo;d want the diagnostic to cover. No
              sales deck.
            </p>
            <p>
              If we&rsquo;re not a fit, we&rsquo;ll tell you why and where we&rsquo;d
              suggest you look instead. Honest answers are part of how we operate.
            </p>
            <p>
              In the meantime — feel free to grab a 30-minute window directly if you&rsquo;d
              prefer to skip the email loop:
            </p>
          </div>
        </section>

        {/* Calendly CTA — opens in new tab */}
        <section className="container-layout pb-20 text-center">
          <Link
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 rounded-md bg-brand-yellow text-[#000] font-body font-medium text-button hover:bg-brand-yellow-hover transition-colors duration-hover"
          >
            Book a 30-minute window →
          </Link>
          <p className="font-body text-body-sm text-ink-muted mt-4">
            Opens in a new tab
          </p>
        </section>

        {/* Quiet bottom links */}
        <section className="container-layout py-12 border-t border-rule text-center">
          <p className="font-body text-body-sm text-ink-muted mb-4">
            While you&rsquo;re here:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <Link
              href="/work"
              className="font-body text-body-sm text-brand-blue hover:opacity-70 transition-opacity"
            >
              See client outcomes →
            </Link>
            <Link
              href="/insights"
              className="font-body text-body-sm text-brand-blue hover:opacity-70 transition-opacity"
            >
              Read The Brief →
            </Link>
            <Link
              href="/about"
              className="font-body text-body-sm text-brand-blue hover:opacity-70 transition-opacity"
            >
              About the firm →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
