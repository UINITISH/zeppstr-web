/**
 * Schema.org JSON-LD generators.
 * Each function returns a serializable object you drop into a <script type="application/ld+json">.
 *
 * Usage:
 *   <Script id="ld-org" type="application/ld+json"
 *     dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd()) }} />
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://zeppstr.com";

const ORG_NAME = "Zeppstr Growth Media";
const ORG_LEGAL_NAME = "Zeppstr Growth Media Pvt. Ltd.";

// ─────────────────────────────────────────────
// Organization (root layout)
// ─────────────────────────────────────────────

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: ORG_NAME,
    legalName: ORG_LEGAL_NAME,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/zeppstr-logo.png`,
      width: 512,
      height: 512,
    },
    description:
      "Strategic growth partner for ambitious businesses. Five Solutions across organic growth, performance media, brand, experience, and advisory — built to compound.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "27th Main Road, 1st Sector, HSR Layout",
      addressLocality: "Bengaluru",
      addressRegion: "Karnataka",
      postalCode: "560102",
      addressCountry: "IN",
    },
    /**
     * Only mailboxes and numbers confirmed by the founder, 11 Sep 2026.
     *
     * press@zeppstr.com and partnerships@zeppstr.com were removed — they were
     * never real mailboxes. Structured data is read by search engines and AI
     * assistants and surfaced directly to users, so an invented address here
     * routes enquiries into a void with no bounce to warn anyone.
     *
     * Telephone corrected from +91-90488-26468 (origin unknown) to the main
     * line. Keep this in step with app/(marketing)/contact/page.tsx.
     */
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "nitish@zeppstr.com",
        telephone: "+91-72592-93335",
        availableLanguage: ["en", "hi"],
        hoursAvailable: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
          ],
          opens: "10:00",
          closes: "19:00",
        },
      },
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: "digital@zeppstr.com",
        availableLanguage: ["en", "hi"],
      },
    ],
    /**
     * `sameAs` must list profiles that actually resolve.
     *
     * The LinkedIn slug was /company/zeppstr, which 404s. Replaced with the
     * standard slug for "Zeppstr Growth Media" — verify once before launch.
     */
    sameAs: [
      "https://www.linkedin.com/company/zeppstr-growth-media/",
      "https://www.youtube.com/@zeppstr",
      "https://www.instagram.com/zeppstr/",
      "https://www.facebook.com/people/Zeppstr/100092439014712/",
      "https://www.quora.com/profile/Zeppstr",
    ],
  };
}

// ─────────────────────────────────────────────
// Website (root layout, paired with Organization)
// ─────────────────────────────────────────────

export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: ORG_NAME,
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en",
  };
}

// ─────────────────────────────────────────────
// BreadcrumbList — sub-service, case study, article
// ─────────────────────────────────────────────

export function breadcrumbLd(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

// ─────────────────────────────────────────────
// Article (blog posts in /insights)
// ─────────────────────────────────────────────

interface ArticleLdInput {
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt?: string;
  modifiedAt?: string;
  authorName?: string;
  heroImageUrl?: string;
  category?: string;
}

export function articleLd(a: ArticleLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${SITE_URL}/insights/${a.slug}#article`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/insights/${a.slug}`,
    },
    headline: a.title,
    description: a.excerpt,
    image: a.heroImageUrl ? [a.heroImageUrl] : undefined,
    datePublished: a.publishedAt,
    dateModified: a.modifiedAt ?? a.publishedAt,
    author: {
      "@type": "Person",
      name: a.authorName ?? "Nitish Kumar",
      worksFor: { "@id": `${SITE_URL}/#organization` },
    },
    publisher: { "@id": `${SITE_URL}/#organization` },
    articleSection: a.category,
  };
}

// ─────────────────────────────────────────────
// Service (Solution + sub-service pages)
// ─────────────────────────────────────────────

interface ServiceLdInput {
  name: string;
  description?: string;
  url: string;
  provider?: "organization";
}

export function serviceLd(s: ServiceLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    description: s.description,
    url: s.url.startsWith("http") ? s.url : `${SITE_URL}${s.url}`,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: ["IN", "US", "GB", "AE", "SG", "AU"],
  };
}

// ─────────────────────────────────────────────
// FAQPage
// ─────────────────────────────────────────────

export function faqLd(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

// ─────────────────────────────────────────────
// CaseStudy (uses Article schema for SEO familiarity)
// ─────────────────────────────────────────────

interface CaseStudyLdInput {
  clientName: string;
  slug: string;
  headlineMetric?: string;
  industryName?: string;
  heroImageUrl?: string;
  publishedAt?: string;
}

export function caseStudyLd(c: CaseStudyLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${SITE_URL}/work/${c.slug}#case-study`,
    headline: `${c.clientName} — ${c.headlineMetric ?? "Client outcome"}`,
    image: c.heroImageUrl ? [c.heroImageUrl] : undefined,
    datePublished: c.publishedAt,
    about: c.industryName,
    author: { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}
