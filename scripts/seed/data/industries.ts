import { paragraphsToPt } from "../portable-text";

interface SeedIndustry {
  _id: string;
  name: string;
  slug: string;
  heroClaim: string;
  whatsBroken: ReturnType<typeof paragraphsToPt>;
  ourApproach: ReturnType<typeof paragraphsToPt>;
  solutionsMostUsedIds: string[];
  industryFaqs: Array<{
    question: string;
    answer: ReturnType<typeof paragraphsToPt>;
  }>;
  seoTitle: string;
  seoDescription: string;
}

export const INDUSTRIES: SeedIndustry[] = [
  {
    _id: "industry-real-estate",
    name: "Real Estate",
    slug: "real-estate",
    heroClaim:
      "Lead generation for real-estate is mostly noise. We build it into a revenue system.",
    whatsBroken: paragraphsToPt([
      "Most real-estate marketing is buying audiences who aren't qualified, in markets you don't control, with a brand that doesn't differentiate. Lead cost is high, lead quality is low, and the project pipeline depends on hope rather than process.",
      "Brokerages and developers operate as if the next campaign will fix it. The next campaign won't fix it. Structure will.",
    ]),
    ourApproach: paragraphsToPt([
      "We rebuild positioning at the project or brokerage level. We architect lead flow as a system across organic, paid, and lifecycle. We instrument attribution so every campaign reports a CPL and a closing rate.",
      "Real estate compounds when the buyer journey is engineered — not when the next ad campaign is.",
    ]),
    solutionsMostUsedIds: [
      "solution-organic-growth",
      "solution-performance-media",
      "solution-experience-engineering",
    ],
    industryFaqs: [
      {
        question: "Do you work with developers, brokerages, or both?",
        answer: paragraphsToPt([
          "Both — we work with developers running individual projects and with brokerages running portfolios. The work shape is different, but the principles are the same: positioning, journey, and attribution.",
        ]),
      },
      {
        question: "How do you measure success in real estate?",
        answer: paragraphsToPt([
          "Site visits booked, qualified inquiries, and ultimately bookings or transactions. We tie every campaign back to one of those outcomes — not lead-form fills.",
        ]),
      },
    ],
    seoTitle: "Real Estate Marketing | Growth Partner for Brokerages & Developers",
    seoDescription:
      "Real-estate marketing operated as a revenue system. Positioning, lead generation, attribution, and the operating model behind successful project launches and brokerage growth.",
  },
  {
    _id: "industry-ecommerce-dtc",
    name: "E-commerce / D2C",
    slug: "ecommerce-dtc",
    heroClaim: "E-commerce growth compounds when SEO, paid, and conversion work as one system.",
    whatsBroken: paragraphsToPt([
      "Most e-commerce marketing is single-channel optimization in isolation. SEO does its thing. Paid does its thing. The site does its thing. Each one has a ceiling — and the brand hits it.",
      "Wise Market hit that ceiling at AUD 40K/month. The fix wasn't more ads. It was rebuilding the system underneath them.",
    ]),
    ourApproach: paragraphsToPt([
      "We operate organic, paid, and conversion as one connected system. Organic captures commercial intent. Paid fills the gaps and accelerates awareness. The site converts both. The result is unit economics that work — and revenue that scales.",
    ]),
    solutionsMostUsedIds: [
      "solution-organic-growth",
      "solution-performance-media",
      "solution-experience-engineering",
      "solution-brand-engagement-lifecycle",
    ],
    industryFaqs: [
      {
        question: "Do you work with Shopify, Magento, custom platforms?",
        answer: paragraphsToPt([
          "All of the above. The platform doesn't determine the strategy — but we have deep operating experience across Shopify, Magento, WooCommerce, and headless stacks.",
        ]),
      },
      {
        question: "What revenue range do you typically work with?",
        answer: paragraphsToPt([
          "Sweet spot is brands between $1M–$50M revenue who are spending $5K–$50K/month on marketing. Smaller and we're overkill. Larger and you're better served by an in-house team.",
        ]),
      },
    ],
    seoTitle: "E-commerce Marketing | DTC Growth Partner",
    seoDescription:
      "E-commerce and DTC growth as a system — SEO, paid, and conversion operated as one connected practice. From brands at $1M to $50M, accountable to revenue not impressions.",
  },
  {
    _id: "industry-saas-tech",
    name: "SaaS / Tech",
    slug: "saas-tech",
    heroClaim: "B2B SaaS demand is structured, not bought.",
    whatsBroken: paragraphsToPt([
      "SaaS marketing tends to default to two failure modes: gating every PDF and waiting for MQLs, or pouring spend into G2 and AdWords without ICP discipline. Both produce expensive leads that don't convert.",
      "The problem isn't the channels. It's the absence of the structural layer underneath them — ICP definition, positioning, content tied to buyer stages, and attribution that reports closing rate per source.",
    ]),
    ourApproach: paragraphsToPt([
      "We operate as the strategic layer above your demand-gen team. ICP definition first. Positioning second. Channel architecture third. Content that compounds across organic and lifecycle, with paid as accelerant.",
      "We work with PLG, sales-led, and hybrid models — but always with closing rate as the accountability metric.",
    ]),
    solutionsMostUsedIds: [
      "solution-growth-strategy-advisory",
      "solution-organic-growth",
      "solution-experience-engineering",
    ],
    industryFaqs: [
      {
        question: "Do you work with PLG and sales-led SaaS?",
        answer: paragraphsToPt([
          "Both, plus hybrids. The strategy adapts — what stays consistent is operating to closing rate as the north-star metric, regardless of motion.",
        ]),
      },
    ],
    seoTitle: "B2B SaaS Marketing | Growth Partner for Tech Companies",
    seoDescription:
      "Strategic growth partner for B2B SaaS — ICP definition, positioning, content, and demand-gen architecture. Operated to closing rate, not MQLs.",
  },
  {
    _id: "industry-healthcare-wellness",
    name: "Healthcare & Wellness",
    slug: "healthcare-wellness",
    heroClaim:
      "Healthcare marketing has to be regulatory-grade. We operate it that way.",
    whatsBroken: paragraphsToPt([
      "Healthcare and wellness brands sit between strict regulatory boundaries and the consumer expectation of 24/7 trust signals. Most agencies aren't equipped for the constraint. They run wellness like e-commerce — and either get clipped by compliance or burn brand trust on hype copy.",
    ]),
    ourApproach: paragraphsToPt([
      "We build healthcare marketing the way the category requires — clinical-grade copy, regulatory-aware claims, multi-location SEO at scale, lifecycle nurture that respects the patient journey, and trust signals everywhere they need to be.",
      "Compliance is a constraint we design with, not work around.",
    ]),
    solutionsMostUsedIds: [
      "solution-organic-growth",
      "solution-experience-engineering",
      "solution-brand-engagement-lifecycle",
    ],
    industryFaqs: [
      {
        question: "Do you handle regulated medical claims?",
        answer: paragraphsToPt([
          "Yes — with caveats. We work alongside your medical or legal review process; we don't replace it. We're trained to write within the constraint, not around it.",
        ]),
      },
    ],
    seoTitle: "Healthcare Marketing | Wellness & Clinical Growth Partner",
    seoDescription:
      "Strategic marketing for healthcare and wellness brands — clinical-grade copy, regulatory-aware claims, multi-location SEO, lifecycle nurture, and trust-grade experience design.",
  },
  {
    _id: "industry-edtech-education",
    name: "EdTech / Education",
    slug: "edtech-education",
    heroClaim: "Education marketing is a long sale. Build the journey for it.",
    whatsBroken: paragraphsToPt([
      "Education has long sales cycles, multi-stakeholder decisions (student, parent, payer), and trust requirements that retail products don't have. Most agencies run education like e-commerce, optimize for first-touch CPL, and watch closing rates collapse.",
    ]),
    ourApproach: paragraphsToPt([
      "We build the long sale. Awareness, consideration, decision — each stage instrumented separately, each with its own content and channel mix. Lifecycle nurture is non-negotiable. Attribution reports to enrollments, not lead-form fills.",
    ]),
    solutionsMostUsedIds: [
      "solution-organic-growth",
      "solution-brand-engagement-lifecycle",
      "solution-experience-engineering",
    ],
    industryFaqs: [
      {
        question: "Do you work with K-12, higher ed, or professional ed?",
        answer: paragraphsToPt([
          "All three. The structural principles are the same; the messaging changes by audience.",
        ]),
      },
    ],
    seoTitle: "EdTech Marketing | Education Growth Partner",
    seoDescription:
      "Education and EdTech marketing — built for long sales cycles, multi-stakeholder decisions, and the trust requirements the category demands. Accountable to enrollments.",
  },
  {
    _id: "industry-professional-services",
    name: "Professional Services",
    slug: "professional-services",
    heroClaim: "Expertise is the product. Marketing is how it's distributed.",
    whatsBroken: paragraphsToPt([
      "Professional-services firms — law, accounting, consulting, financial services — typically rely on referrals and stop there. When growth requires more than referrals, most don't have the marketing operating model to produce it.",
    ]),
    ourApproach: paragraphsToPt([
      "We treat the firm's expertise as the product and marketing as the distribution layer. Thought-leadership content, partner-led publishing, ICP-targeted SEO, and lifecycle nurture aimed at high-trust buyer journeys.",
    ]),
    solutionsMostUsedIds: [
      "solution-growth-strategy-advisory",
      "solution-organic-growth",
      "solution-brand-engagement-lifecycle",
    ],
    industryFaqs: [
      {
        question: "Do you work with law firms specifically?",
        answer: paragraphsToPt([
          "Yes — including ethics-bounded jurisdictions. We design within the constraint.",
        ]),
      },
    ],
    seoTitle: "Marketing for Professional Services | Law, Consulting, Finance",
    seoDescription:
      "Marketing growth partner for professional-services firms — law, accounting, consulting, finance. Thought-leadership content, partner-led publishing, ICP-targeted SEO.",
  },
];
