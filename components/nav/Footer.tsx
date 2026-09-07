import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-bg-inverse text-white">
      <div className="container-layout py-16 grid md:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="md:col-span-1">
          {/* White wordmark — the footer panel is bg-bg-inverse (dark green),
              so the black logo would be invisible here. */}
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
          <p className="font-display text-body-sm text-white font-medium">
            You Grow, We Grow.
          </p>
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
          <FooterLink href="/book-consultation">Book a Consultation</FooterLink>
          <FooterLink href="/work">Case Studies</FooterLink>
          <FooterLink href="/insights">Insights</FooterLink>
          <FooterLink href="/about">About</FooterLink>
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
