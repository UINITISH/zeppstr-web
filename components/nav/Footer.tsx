import Link from "next/link";
import Image from "next/image";

/**
 * Site footer.
 *
 * Background is bg-bg-footer, NOT bg-bg-inverse. The emerald CTA band that
 * precedes the footer on most pages uses bg-bg-inverse, and the footer used the
 * identical value — the two merged into one unbroken wall of green with no
 * visible page ending. The footer is now a deeper green with a hairline above
 * it. See the `footer` token in tailwind.config.ts.
 */
export function Footer() {
  return (
    <footer className="bg-bg-footer text-white border-t border-white/15">
      <div className="container-layout py-16 grid md:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="md:col-span-1">
          {/* White wordmark — the footer panel is dark green, so the black
              logo would be invisible here. */}
          <div className="mb-5">
            <Image
              src="/brand/zeppstr-logo-horizontal-white.png"
              alt="Zeppstr"
              width={1999}
              height={548}
              className="h-[32px] w-auto"
            />
          </div>
          <p className="font-body text-body-sm text-white/75 mb-6">
            Organic Growth, Performance Media & Brand Consulting. Your growth partner, embedded.
          </p>
          <p className="font-display text-body-sm text-white font-medium mb-7">
            You Grow, We Grow.
          </p>

          {/* Social. Handles taken from the live zeppstr.com footer — these are
              the accounts that actually exist. There is deliberately no LinkedIn
              entry: Zeppstr has no LinkedIn company page, which is a real gap
              for a B2B agency and is flagged separately. Add it here once it
              exists rather than linking to a personal profile. */}
          <SocialRow />
        </div>

        {/* Sitemap */}
        <FooterCol heading="Solutions">
          <FooterLink href="/solutions/growth-strategy-advisory">Growth Strategy & Advisory</FooterLink>
          <FooterLink href="/solutions/organic-growth">Organic Growth Practice</FooterLink>
          <FooterLink href="/solutions/performance-media">Performance Media</FooterLink>
          <FooterLink href="/solutions/experience-engineering">Experience & Engineering</FooterLink>
          <FooterLink href="/solutions/brand-engagement-lifecycle">Brand, Engagement & Lifecycle</FooterLink>
        </FooterCol>

        <FooterCol heading="Industries">
          <FooterLink href="/industries/healthcare-wellness">Healthcare</FooterLink>
          <FooterLink href="/industries/saas-tech">SaaS / Tech</FooterLink>
          <FooterLink href="/industries/real-estate">Real Estate</FooterLink>
          <FooterLink href="/industries/edtech-education">EdTech</FooterLink>
          <FooterLink href="/industries/professional-services">Professional Services</FooterLink>
          <FooterLink href="/industries/ecommerce-dtc">E-commerce / D2C</FooterLink>
        </FooterCol>

        <FooterCol heading="Engage">
          <FooterLink href="/book-consultation">Book a Call</FooterLink>
          <FooterLink href="/work">Case Studies</FooterLink>
          <FooterLink href="/insights">Insights</FooterLink>
          <FooterLink href="/about">About</FooterLink>
          <FooterLink href="/faq">FAQ</FooterLink>
          <FooterLink href="/careers">Careers</FooterLink>
          <FooterLink href="/contact">Contact</FooterLink>
          <FooterLink href="mailto:nitish@zeppstr.com">nitish@zeppstr.com</FooterLink>
        </FooterCol>
      </div>

      {/* Bottom strip */}
      <div className="border-t border-white/10">
        <div className="container-layout py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-body-sm text-white/60">
          <div>© {new Date().getFullYear()} Zeppstr Growth Media · 27th Main Rd, HSR Layout, Bengaluru 560102</div>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

/**
 * Social links.
 *
 * Sourced from the live zeppstr.com footer, Sep 2026. Only accounts that
 * actually exist are listed.
 *
 * Icons are inline SVG paths rather than an icon package — four icons does not
 * justify a dependency, and inlining keeps them from blocking first paint.
 */
const SOCIALS: { label: string; href: string; path: string }[] = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/zeppstr/",
    path: "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 5.68a4.16 4.16 0 1 0 0 8.32 4.16 4.16 0 0 0 0-8.32Zm0 6.86a2.7 2.7 0 1 1 0-5.4 2.7 2.7 0 0 1 0 5.4Zm5.3-7.03a.97.97 0 1 1-1.94 0 .97.97 0 0 1 1.94 0Z",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@zeppstr",
    path: "M21.58 7.19a2.5 2.5 0 0 0-1.76-1.77C18.25 5 12 5 12 5s-6.25 0-7.82.42A2.5 2.5 0 0 0 2.42 7.2 26.2 26.2 0 0 0 2 12a26.2 26.2 0 0 0 .42 4.81 2.5 2.5 0 0 0 1.76 1.77C5.75 19 12 19 12 19s6.25 0 7.82-.42a2.5 2.5 0 0 0 1.76-1.77A26.2 26.2 0 0 0 22 12a26.2 26.2 0 0 0-.42-4.81ZM10 15.02V8.98L15.2 12 10 15.02Z",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/people/Zeppstr/100092439014712/",
    path: "M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.51 1.5-3.9 3.77-3.9 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.45 2.89h-2.33v6.99A10 10 0 0 0 22 12Z",
  },
  {
    label: "Quora",
    href: "https://www.quora.com/profile/Zeppstr",
    path: "M12.74 17.34a5.46 5.46 0 0 1-1.05.1c-3.2 0-5.8-2.6-5.8-5.8s2.6-5.8 5.8-5.8 5.8 2.6 5.8 5.8a5.77 5.77 0 0 1-1.2 3.53l-1.3-1.55a3.86 3.86 0 1 0-3.3 1.88c.2 0 .4-.02.6-.05l-1.4-1.67h2.4l3.9 4.64c1.4-1.27 2.3-3.1 2.3-5.15 0-3.85-3.13-6.97-6.97-6.97S4.55 8.42 4.55 12.27c0 3.84 3.12 6.96 6.97 6.96.9 0 1.76-.17 2.55-.48l-1.33-1.41Z",
  },
];

function SocialRow() {
  return (
    <ul className="flex items-center gap-3">
      {SOCIALS.map((s) => (
        <li key={s.label}>
          <a
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Zeppstr on ${s.label}`}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors duration-hover hover:border-brand-yellow hover:text-brand-yellow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-bg-inverse"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-[18px] w-[18px]"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d={s.path} />
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}

function FooterCol({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="font-body font-semibold text-eyebrow uppercase text-white mb-4">
        {heading}
      </h4>
      <ul className="space-y-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="font-body text-body-sm text-white/75 hover:text-white transition-colors duration-hover"
      >
        {children}
      </Link>
    </li>
  );
}
