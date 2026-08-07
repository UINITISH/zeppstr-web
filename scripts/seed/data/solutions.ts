import { paragraphsToPt } from "../portable-text";

/**
 * Five Solutions — the locked taxonomy. Order matters: the IDs here are referenced
 * by sub-services, industries, and case studies.
 */
export const SOLUTIONS = [
  {
    _id: "solution-growth-strategy-advisory",
    name: "Growth Strategy & Advisory",
    slug: "growth-strategy-advisory",
    tagline: "Strategy before tactics. Growth as a system, not a campaign.",
    longDescription: paragraphsToPt([
      "We embed as the strategic layer above your marketing — diagnosing what's actually broken, designing the revenue system that fixes it, and staying accountable for the number that matters to your business.",
      "This isn't a channel problem. It's a structure problem — positioning that's vague, a buyer journey nobody designed, and measurement that reports impressions when the only thing that matters is revenue. That's the work this Solution exists for.",
      "Closer to how a consulting firm operates than how an agency does. Smaller, sharper, more selective. We work with founders and CEOs, not marketing managers.",
    ]),
    seoTitle: "Growth Strategy & Advisory | Marketing Strategy Consulting",
    seoDescription:
      "Embedded growth strategy consulting for businesses where marketing spend isn't translating to revenue. Diagnose, architect, and operate the system underneath your campaigns.",
  },
  {
    _id: "solution-organic-growth",
    name: "Organic Growth Practice",
    slug: "organic-growth",
    tagline: "Where SEO becomes a compounding asset, not a service line.",
    longDescription: paragraphsToPt([
      "Most agencies sell SEO. We build organic growth as a system — the operating layer that compounds search visibility, content authority, and pipeline over multi-quarter horizons rather than month-to-month rankings.",
      "Three things make organic compound: technical foundations that don't break under content velocity, content engineered for buyer intent rather than keyword volume, and authority built deliberately rather than opportunistically.",
      "When all three are working as a system, SEO stops being a line item and becomes an asset on the balance sheet of your marketing.",
    ]),
    seoTitle: "Organic Growth Practice | SEO & Content Strategy",
    seoDescription:
      "Organic search and content as a compounding asset. Technical SEO, on-page strategy, content engineering, and authority building — operated as one system across multi-quarter horizons.",
  },
  {
    _id: "solution-performance-media",
    name: "Performance Media",
    slug: "performance-media",
    tagline: "Paid that reports to revenue. Not to dashboards.",
    longDescription: paragraphsToPt([
      "Paid media run as a unit-economics business: every campaign reports a CPL, every channel reports a closing rate, and every dollar reports the revenue it produced — not the impressions it bought.",
      "We separate awareness, consideration, and decision-stage spend with attribution that ties clicks to revenue. We kill campaigns that drive vanity metrics. We scale the ones that drive orders.",
      "Performance Media works inside the system — feeding the organic strategy, accelerating the buyer journey, and being held accountable to the same north-star number the rest of the engagement is.",
    ]),
    seoTitle: "Performance Media | Paid Marketing & Acquisition",
    seoDescription:
      "Performance media operated as a unit-economics business — Google, Meta, programmatic, retargeting, attribution, and creative strategy. Every campaign reports to revenue, not to dashboards.",
  },
  {
    _id: "solution-experience-engineering",
    name: "Experience & Engineering",
    slug: "experience-engineering",
    tagline: "The site is the salesperson. Build it like one.",
    longDescription: paragraphsToPt([
      "Most websites are brochures. Yours has to be a salesperson — opening conversations with the right buyers, qualifying them through the journey, closing them on the page.",
      "We treat web, conversion, UX, and analytics as one practice rather than four siloed services. The site converts because the structure is right, the trust signals are deliberate, the mobile experience is engineered (not adapted), and every change is measured.",
      "This is where strategy becomes pixels — and where pixels become revenue.",
    ]),
    seoTitle: "Experience & Engineering | Web Development & Conversion",
    seoDescription:
      "Web development, conversion optimization, UX, and analytics — operated as one practice. Sites engineered to qualify, convert, and report to revenue. Mobile-first, accessibility-grade.",
  },
  {
    _id: "solution-brand-engagement-lifecycle",
    name: "Brand, Engagement & Lifecycle",
    slug: "brand-engagement-lifecycle",
    tagline: "From awareness to advocacy. The full lifecycle, owned.",
    longDescription: paragraphsToPt([
      "Brand isn't a logo, social isn't likes, and lifecycle isn't a Mailchimp template. We operate the full demand and engagement layer — brand expression, organic and paid social, content, video, lifecycle email and SMS — as one connected practice.",
      "The job: make sure the audience that finds you, stays engaged. The audience that engages, converts. The audience that converts, comes back.",
      "When this layer is right, your CAC drops, your LTV rises, and your other channels work harder for less.",
    ]),
    seoTitle: "Brand, Engagement & Lifecycle | Social, Content, Email",
    seoDescription:
      "Brand identity, social media, video, content, email and lifecycle marketing — operated as one connected practice from awareness to advocacy. The full demand and engagement layer.",
  },
] as const;
