import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/meta";
import Link from "next/link";
import { GlobalNav } from "@/components/nav/GlobalNav";
import { Footer } from "@/components/nav/Footer";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata: Metadata = buildMetadata({
  title: "Contact | Bengaluru, India",
  description:
    "Reach Zeppstr Growth Media — engagement applications, press, partnerships and general enquiries. 27th Main Road, HSR Layout, Bengaluru · +91 72592 93335 · nitish@zeppstr.com",
  alternates: { canonical: "/contact" },
  path: "/contact",
});

/**
 * ── CONTACT DETAILS — SINGLE SOURCE OF TRUTH ────────────────────────────────
 *
 * Confirmed by the founder, 11 Sep 2026.
 *
 * ⚠️ Four phone numbers were in circulation across Zeppstr materials. The
 * founder has confirmed +91 72592 93335 as the single number to use
 * everywhere. The others need retiring at source:
 *      +91 72909 27926  ← live zeppstr.com and docs/ACCESS-REQUEST-UINITISH.md
 *      +91 79799 05852  ← Brand Assets/Letterhead/ — needs regenerating
 *      +91 90488 26468  ← was hard-coded here, origin unknown — removed
 *
 * Separately: the live zeppstr.com click-to-call link is broken — the href is
 * literally "tel:123", so every mobile visitor who tapped the number dialled
 * nothing. Worth fixing on the old site until the cutover.
 *
 * Hours are stated in IST. The old site said "EST", which is wrong for a
 * Bengaluru office and would have had callers ringing at 8pm local time.
 */
const CONTACT = {
  phoneDisplay: "+91 72592 93335",
  phoneHref: "tel:+917259293335",
  email: "nitish@zeppstr.com",
  emailGeneral: "digital@zeppstr.com",
  hours: "Monday to Friday, 10am – 7pm IST",
  address: {
    line1: "27th Main Road, 1st Sector",
    line2: "HSR Layout",
    line3: "Bengaluru, Karnataka 560102",
    country: "India",
  },
  mapQuery:
    "Zeppstr Growth Media, 27th Main Rd, 1st Sector, HSR Layout, Bengaluru, Karnataka 560102",
} as const;

const CONTACT_PATHS = [
  {
    heading: "Want to work with us?",
    body: "Apply for a Strategic Diagnostic. Nitish reads every application himself, and replies within two working days — including the ones we turn down.",
    cta: { label: "Apply for a Diagnostic →", href: "/book-consultation" },
  },
  {
    heading: "Prefer to talk?",
    body: `Call ${CONTACT.hours}. If we are on a client call you will reach voicemail — leave a number and we will ring back the same day.`,
    cta: { label: CONTACT.phoneDisplay, href: CONTACT.phoneHref },
  },
  {
    heading: "Press or podcast?",
    body: "Send the publication, your deadline and the angle you are working. We will tell you quickly whether we are the right people, rather than leaving you waiting.",
    cta: { label: CONTACT.email, href: `mailto:${CONTACT.email}` },
  },
  {
    heading: "Something else?",
    body: "Partnerships, white-label work, or a question that fits none of the above — including from students and other agencies. Write to the general mailbox.",
    cta: {
      label: CONTACT.emailGeneral,
      href: `mailto:${CONTACT.emailGeneral}`,
    },
  },
];

/**
 * Social. Verified against the live zeppstr.com footer.
 *
 * The LinkedIn slug was previously /company/zeppstr, which does not resolve.
 * The founder has confirmed the page is "Zeppstr Growth Media"; the slug below
 * is the standard form of that name and needs one click to verify before
 * launch. If it 404s, correct it here and in lib/seo/jsonld.ts — those are the
 * only two places it appears.
 */
const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/zeppstr-growth-media/",
  },
  { label: "Instagram", href: "https://www.instagram.com/zeppstr/" },
  { label: "YouTube", href: "https://www.youtube.com/@zeppstr" },
  {
    label: "Facebook",
    href: "https://www.facebook.com/people/Zeppstr/100092439014712/",
  },
  { label: "Quora", href: "https://www.quora.com/profile/Zeppstr" },
];

export default function ContactPage() {
  return (
    <>
      <GlobalNav />
      <main>
        {/* Hero */}
        <section className="container-layout pt-20 md:pt-32 pb-16 text-center">
          <p className="eyebrow mb-6">Reach us</p>
          <h1 className="font-extralight tracking-tight text-display-xl text-ink-headline mb-8 max-w-[20ch] mx-auto">
            Get in touch.
          </h1>
          <p className="font-body text-body-lg text-ink-body max-w-[60ch] mx-auto">
            If you want to work together, the{" "}
            <Link
              href="/book-consultation"
              className="text-brand-blue underline underline-offset-4 hover:opacity-70"
            >
              Strategic Diagnostic
            </Link>{" "}
            is the cleanest way in. For anything else, pick whichever of these
            suits you.
          </p>
        </section>

        {/* Contact paths grid */}
        <section className="container-layout pb-20" aria-label="Contact channels">
          <div className="grid md:grid-cols-2 gap-6 max-w-[1100px] mx-auto">
            {CONTACT_PATHS.map((path) => (
              <div
                key={path.heading}
                className="border border-rule rounded-lg p-8 hover:border-ink-headline transition-colors duration-hover"
              >
                <h2 className="font-display font-light text-display-sm text-ink-headline mb-3 tracking-tight">
                  {path.heading}
                </h2>
                <p className="font-body text-body text-ink-body leading-relaxed mb-5">
                  {path.body}
                </p>
                <Link
                  href={path.cta.href}
                  className="font-body font-medium text-body text-brand-blue hover:opacity-70 transition-opacity inline-flex items-center"
                >
                  {path.cta.label}
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* General contact form */}
        <section
          className="bg-bg-secondary py-20 md:py-24"
          aria-labelledby="form-heading"
        >
          <div className="container-layout">
            <div className="text-center mb-12 max-w-[60ch] mx-auto">
              <p className="eyebrow mb-4">Or use the form</p>
              <h2
                id="form-heading"
                className="font-light tracking-tight text-display-lg text-ink-headline mb-4"
              >
                Send a message.
              </h2>
              <p className="font-body text-body text-ink-muted">
                We reply within one working day.
              </p>
            </div>

            <div className="bg-bg-primary rounded-2xl border border-rule shadow-sm px-6 md:px-12 py-12 md:py-14">
              <ContactForm />
            </div>
          </div>
        </section>

        {/* Office + Social */}
        <section className="container-layout py-20 max-w-[1100px] mx-auto">
          <div className="grid md:grid-cols-2 gap-12 mb-14">
            <div>
              <p className="eyebrow mb-4">Find us</p>
              <h2 className="font-light tracking-tight text-display-md text-ink-headline mb-6">
                Bengaluru, India.
              </h2>
              <address className="not-italic font-body text-body text-ink-body leading-relaxed mb-6">
                {CONTACT.address.line1}
                <br />
                {CONTACT.address.line2}
                <br />
                {CONTACT.address.line3}
                <br />
                {CONTACT.address.country}
              </address>

              <dl className="space-y-3 font-body text-body">
                <div>
                  <dt className="sr-only">Telephone</dt>
                  <dd>
                    <a
                      href={CONTACT.phoneHref}
                      className="text-ink-body hover:text-brand-blue transition-colors"
                    >
                      {CONTACT.phoneDisplay}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="sr-only">Email</dt>
                  <dd>
                    <a
                      href={`mailto:${CONTACT.email}`}
                      className="text-brand-blue hover:opacity-70 transition-opacity"
                    >
                      {CONTACT.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="sr-only">Opening hours</dt>
                  <dd className="text-ink-muted">{CONTACT.hours}</dd>
                </div>
              </dl>
            </div>

            <div>
              <p className="eyebrow mb-4">Elsewhere</p>
              <h2 className="font-light tracking-tight text-display-md text-ink-headline mb-6">
                Follow the work.
              </h2>
              <ul className="space-y-3 font-body text-body">
                {SOCIAL_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-blue hover:opacity-70 transition-opacity inline-flex items-center"
                    >
                      {link.label} →
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Map. Lazy-loaded so it never blocks first paint — a map iframe is
              one of the heaviest things a contact page can carry. */}
          <div className="overflow-hidden rounded-2xl border border-rule">
            <iframe
              title="Zeppstr Growth Media office location, HSR Layout, Bengaluru"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(
                CONTACT.mapQuery
              )}&t=m&z=15&output=embed&iwloc=near`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[360px] w-full border-0"
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
