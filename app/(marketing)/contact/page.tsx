import type { Metadata } from "next";
import Link from "next/link";
import { GlobalNav } from "@/components/nav/GlobalNav";
import { Footer } from "@/components/nav/Footer";
import { ContactForm } from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Contact Zeppstr Growth Media | Bengaluru",
  description:
    "Reach Zeppstr Growth Media — for engagement applications, press, partnerships, and general inquiries. Bengaluru, India · 27th Main Rd, HSR Layout · nitish@zeppstr.com.",
  alternates: { canonical: "/contact" },
};

const CONTACT_PATHS = [
  {
    heading: "Want to work with us?",
    body: "Apply for a 4–6 week Strategic Diagnostic. Nitish reads every application personally. 48-hour response.",
    cta: { label: "Apply for a Diagnostic →", href: "/book-consultation" },
  },
  {
    heading: "Press inquiry?",
    body: "For interview requests, podcast invitations, or quote requests, write directly with the publication, deadline, and angle.",
    cta: { label: "press@zeppstr.com", href: "mailto:press@zeppstr.com" },
  },
  {
    heading: "Partnership inquiry?",
    body: "For agency partnerships, white-label engagements, technology integrations, or co-marketing — we collaborate selectively.",
    cta: { label: "partnerships@zeppstr.com", href: "mailto:partnerships@zeppstr.com" },
  },
  {
    heading: "Just have a question?",
    body: "For anything that doesn't fit the categories above — including students, peer firms, or curious operators — write to us directly.",
    cta: { label: "nitish@zeppstr.com", href: "mailto:nitish@zeppstr.com" },
  },
];

const SOCIAL_LINKS = [
  { label: "YouTube — DemandForge", href: "https://www.youtube.com/@zeppstr" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/zeppstr" },
  { label: "Instagram", href: "https://instagram.com/zeppstr" },
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
            For engagement applications, the{" "}
            <Link
              href="/book-consultation"
              className="text-brand-blue underline underline-offset-4 hover:opacity-70"
            >
              Strategic Diagnostic
            </Link>{" "}
            is the cleanest path. For everything else, the right channel is below.
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
                className="font-extralight tracking-tight text-display-lg text-ink-headline mb-4"
              >
                Send a message.
              </h2>
              <p className="font-body text-body text-ink-muted">
                We usually reply within 1 business day.
              </p>
            </div>

            <div className="bg-bg-primary rounded-2xl border border-rule shadow-sm px-6 md:px-12 py-12 md:py-14">
              <ContactForm />
            </div>
          </div>
        </section>

        {/* Office + Social */}
        <section className="container-layout py-20 grid md:grid-cols-2 gap-12 max-w-[1100px] mx-auto">
          <div>
            <p className="eyebrow mb-4">Find us</p>
            <h2 className="font-extralight tracking-tight text-display-md text-ink-headline mb-6">
              Bengaluru, India.
            </h2>
            <address className="not-italic font-body text-body text-ink-body leading-relaxed mb-6">
              27th Main Road, 1st Sector
              <br />
              HSR Layout
              <br />
              Bengaluru, Karnataka 560102
              <br />
              India
            </address>
            <div className="space-y-2 font-body text-body">
              <p>
                <a
                  href="mailto:nitish@zeppstr.com"
                  className="text-brand-blue hover:opacity-70 transition-opacity"
                >
                  nitish@zeppstr.com
                </a>
                <span className="text-ink-muted"> · </span>
                <a
                  href="mailto:vidya@zeppstr.com"
                  className="text-brand-blue hover:opacity-70 transition-opacity"
                >
                  vidya@zeppstr.com
                </a>
              </p>
              <p>
                <a
                  href="tel:+919048826468"
                  className="text-ink-body hover:text-brand-blue transition-colors"
                >
                  +91 90488 26468
                </a>
              </p>
            </div>
          </div>

          <div>
            <p className="eyebrow mb-4">Elsewhere</p>
            <h2 className="font-extralight tracking-tight text-display-md text-ink-headline mb-6">
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
        </section>
      </main>
      <Footer />
    </>
  );
}
