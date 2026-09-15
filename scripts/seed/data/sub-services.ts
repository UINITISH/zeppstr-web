import { paragraphsToPt } from "../portable-text";

/**
 * 23 elevated sub-services across the 5 Solutions.
 * `parentSolutionId` matches the `_id` from solutions.ts.
 * `legacyName` carries the SEO-keyword equity to body copy via the McKinsey trick.
 */

interface SeedSubService {
  _id: string;
  name: string;
  slug: string;
  parentSolutionId: string;
  legacyName?: string;
  tagline: string;
  whatsIncluded: ReturnType<typeof paragraphsToPt>;
  methodology: ReturnType<typeof paragraphsToPt>;
  seoTitle: string;
  seoDescription: string;
}

export const SUB_SERVICES: SeedSubService[] = [
  // ───── Growth Strategy & Advisory (4) ─────
  {
    _id: "subservice-growth-strategy-operating-model",
    name: "Growth Strategy & Operating Model",
    slug: "growth-strategy-operating-model",
    parentSolutionId: "solution-growth-strategy-advisory",
    legacyName: "Marketing Strategy Consulting",
    tagline: "The full strategic stack — positioning, journey, channels, measurement, operating model.",
    whatsIncluded: paragraphsToPt([
      "A complete revenue-system strategy: positioning that the buyer feels, a buyer journey you can draw on a whiteboard, channel allocation tied to outcome, attribution that reports to revenue, and the operating model behind it.",
      "Output: written strategic deliverable, 90-day plan, and the operating model your team uses to execute it.",
    ]),
    methodology: paragraphsToPt([
      "Diagnose → Architect → Deploy → Operate. We diagnose what's broken, architect the system that fixes it, deploy through your team or ours, and operate alongside as the strategic layer.",
    ]),
    seoTitle: "Growth Strategy & Operating Model | Marketing Strategy",
    seoDescription:
      "Comprehensive marketing strategy and the operating model behind it. Positioning, buyer journey, channel architecture, attribution, and the operating cadence to run it.",
  },
  {
    _id: "subservice-growth-diagnostic-audit",
    name: "Growth Diagnostic & Audit",
    slug: "growth-diagnostic-audit",
    parentSolutionId: "solution-growth-strategy-advisory",
    legacyName: "Marketing Audit",
    tagline: "Honest assessment. Written deliverable. No agency-pitch dressed up as a report.",
    whatsIncluded: paragraphsToPt([
      "A 4–6 week strategic audit covering positioning, journey, channel mix, attribution, content velocity, and the unsaid bottlenecks. We talk to your customers. We read your data. We tell you what's actually happening — and what to do about it.",
      "Output: a written diagnostic, a 90-day plan, and identified leak points.",
    ]),
    methodology: paragraphsToPt([
      "Selective. Honest. Fixed-fee. We engage with 6–12 partner clients per year because the diagnostic is the work — and we won't cut corners on it.",
    ]),
    seoTitle: "Growth Diagnostic & Audit | Strategic Marketing Audit",
    seoDescription:
      "A standalone strategic audit and 90-day plan. Honest diagnosis of where revenue is leaking. Written deliverable. Selective by design — 6–12 partner engagements per year.",
  },
  {
    _id: "subservice-revenue-system-design",
    name: "Revenue System Design",
    slug: "revenue-system-design",
    parentSolutionId: "solution-growth-strategy-advisory",
    legacyName: "Demand Generation Strategy",
    tagline: "Where lead gen, demand creation, conversion, and retention get architected as one.",
    whatsIncluded: paragraphsToPt([
      "Demand creation, lead generation, conversion, and retention designed as one connected revenue system rather than four disconnected functions. Channel architecture. Funnel logic. Lifecycle stages. Measurement that ties each stage to a revenue outcome.",
    ]),
    methodology: paragraphsToPt([
      "We start with the revenue equation, work backwards to the system that produces it, and forward to the channels that feed it.",
    ]),
    seoTitle: "Revenue System Design | Demand Generation Strategy",
    seoDescription:
      "Architect demand creation, lead generation, conversion, and retention as a single revenue system. Channel architecture, funnel logic, attribution — all designed to compound.",
  },
  {
    _id: "subservice-fractional-marketing-leadership",
    name: "Fractional Marketing Leadership",
    slug: "fractional-marketing-leadership",
    parentSolutionId: "solution-growth-strategy-advisory",
    legacyName: "Fractional CMO Services",
    tagline: "Senior marketing leadership without the cost or time-to-hire of a full-time CMO.",
    whatsIncluded: paragraphsToPt([
      "Embedded senior marketing leadership for founders who need adult marketing supervision before they need a permanent hire. Strategic ownership, team management, vendor oversight, and accountability to the revenue number.",
    ]),
    methodology: paragraphsToPt([
      "Day-rate or monthly retainer. Typically 2–4 days per month of strategic operating time, with on-call availability in between.",
    ]),
    seoTitle: "Fractional CMO | Embedded Marketing Leadership",
    seoDescription:
      "Fractional CMO and senior marketing leadership for founders without the cost or time-to-hire of a full-time hire. Strategic, embedded, accountable to revenue.",
  },

  // ───── Organic Growth Practice (5) ─────
  {
    _id: "subservice-organic-search-strategy",
    name: "Organic Search Strategy",
    slug: "organic-search-strategy",
    parentSolutionId: "solution-organic-growth",
    legacyName: "SEO Services",
    tagline: "SEO operated as a compounding asset, not a service line.",
    whatsIncluded: paragraphsToPt([
      "Full-stack SEO: keyword strategy at scale, on-page optimization, content engineering, internal-link architecture, and the editorial calendar that keeps it compounding.",
    ]),
    methodology: paragraphsToPt([
      "We don't ship one-off SEO projects. We operate organic search as an ongoing practice — quarterly horizons, multi-quarter compounding, and accountability to traffic-to-revenue, not impressions.",
    ]),
    seoTitle: "Organic Search Strategy | SEO Services",
    seoDescription:
      "Organic search and SEO services operated as a compounding asset — keyword strategy, on-page, content, internal-link architecture, and editorial cadence over multi-quarter horizons.",
  },
  {
    _id: "subservice-content-architecture",
    name: "Content Architecture & Editorial Strategy",
    slug: "content-architecture",
    parentSolutionId: "solution-organic-growth",
    legacyName: "Content Marketing & Content Writing",
    tagline: "Content engineered for buyer intent, not keyword volume.",
    whatsIncluded: paragraphsToPt([
      "Editorial strategy across pillar pages, cluster content, comparison pages, glossaries, and case-driven posts. Each asset is built for a specific stage of the buyer journey and a specific intent — not just a keyword.",
    ]),
    methodology: paragraphsToPt([
      "Architecture first, then editorial calendar, then writing. The structure is what makes content compound.",
    ]),
    seoTitle: "Content Architecture | Content Marketing & SEO Writing",
    seoDescription:
      "Content marketing operated as architecture — pillar pages, cluster content, intent-based writing, and an editorial calendar engineered to compound over multiple quarters.",
  },
  {
    _id: "subservice-technical-seo",
    name: "Technical SEO & Crawl Engineering",
    slug: "technical-seo",
    parentSolutionId: "solution-organic-growth",
    legacyName: "Technical SEO Audit",
    tagline: "The foundations under every other SEO practice.",
    whatsIncluded: paragraphsToPt([
      "Crawl-budget engineering, indexability fixes, site-speed work, structured data, internal-link graphs, and the technical foundations under every other SEO investment.",
    ]),
    methodology: paragraphsToPt([
      "We audit, we fix, we re-test, we monitor. No mystery, no recurring magic — just the engineering layer that makes the rest of organic possible.",
    ]),
    seoTitle: "Technical SEO | Site Audit & Crawl Engineering",
    seoDescription:
      "Technical SEO services — site audit, crawl engineering, site speed, structured data, indexability, and the foundations every content investment depends on.",
  },
  {
    _id: "subservice-authority-building",
    name: "Authority Building & Digital PR",
    slug: "authority-building",
    parentSolutionId: "solution-organic-growth",
    legacyName: "Off-Page SEO & Link Building",
    tagline: "Authority built deliberately, not opportunistically.",
    whatsIncluded: paragraphsToPt([
      "Off-page SEO and digital PR engineered as a programme, not a campaign. Editorial placements, narrative-driven outreach, and the relationship layer behind sustainable authority.",
    ]),
    methodology: paragraphsToPt([
      "Authority compounds when the work is editorial-grade. We pitch ideas, not link targets. We publish stories worth linking to.",
    ]),
    seoTitle: "Authority Building | Digital PR & Off-Page SEO",
    seoDescription:
      "Authority building, digital PR, and off-page SEO operated as an editorial programme. Narrative-led outreach, placements that compound, and the relationship layer behind it.",
  },
  {
    _id: "subservice-local-seo",
    name: "Local & Geographic Search",
    slug: "local-search",
    parentSolutionId: "solution-organic-growth",
    legacyName: "Local SEO",
    tagline: "Multi-location, multi-market, multi-language local visibility.",
    whatsIncluded: paragraphsToPt([
      "Local SEO at scale: Google Business Profile, location pages, NAP consistency, review programmes, and the operating model for businesses with multiple locations or markets.",
    ]),
    methodology: paragraphsToPt([
      "Centralized strategy, distributed execution, accountable to local revenue. Built for healthcare networks, real-estate brokerages, hospitality groups, and other multi-location operators.",
    ]),
    seoTitle: "Local SEO | Multi-Location Search Marketing",
    seoDescription:
      "Local SEO services for multi-location businesses — Google Business Profile, location pages, NAP consistency, review programmes, and centralized operating model.",
  },

  // ───── Performance Media (5) ─────
  {
    _id: "subservice-paid-search",
    name: "Paid Search & Acquisition",
    slug: "paid-search",
    parentSolutionId: "solution-performance-media",
    legacyName: "PPC & Google Ads Management",
    tagline: "Google Ads operated as a unit-economics business.",
    whatsIncluded: paragraphsToPt([
      "Paid search across Google Ads and Microsoft Ads — campaign architecture, keyword strategy, ad creative, landing-page alignment, and bidding tied to closing rate, not click-through.",
    ]),
    methodology: paragraphsToPt([
      "Every campaign reports a CPL and the closing rate of the leads it produced. We kill what doesn't work. We scale what does.",
    ]),
    seoTitle: "Paid Search | Google Ads Management",
    seoDescription:
      "Paid search and Google Ads management operated as a unit-economics business — every campaign reports to revenue, every lead is traced to a closing rate.",
  },
  {
    _id: "subservice-paid-social",
    name: "Paid Social & Programmatic",
    slug: "paid-social",
    parentSolutionId: "solution-performance-media",
    legacyName: "Facebook Ads & Meta Advertising",
    tagline: "Paid social engineered as demand creation, not impression-buying.",
    whatsIncluded: paragraphsToPt([
      "Meta, LinkedIn, TikTok, programmatic display — operated with attribution, creative testing, and the kind of audience strategy that produces lift rather than vanity reach.",
    ]),
    methodology: paragraphsToPt([
      "Creative is the variable that matters most. We invest in creative testing as deliberately as we invest in audience targeting.",
    ]),
    seoTitle: "Paid Social | Meta, LinkedIn, TikTok Ads",
    seoDescription:
      "Paid social and programmatic media — Meta, LinkedIn, TikTok, and display operated with attribution, creative testing, and audience strategy that produces revenue.",
  },
  {
    _id: "subservice-attribution-measurement",
    name: "Attribution & Measurement",
    slug: "attribution-measurement",
    parentSolutionId: "solution-performance-media",
    legacyName: "Marketing Analytics",
    tagline: "Every campaign reports to revenue. Every channel reports a closing rate.",
    whatsIncluded: paragraphsToPt([
      "Attribution architecture: GA4, server-side tracking, MMM/MTA where it makes sense, and the dashboards your operators actually use to make decisions.",
    ]),
    methodology: paragraphsToPt([
      "We build the measurement model first, then run paid against it. Without measurement, performance media is theatre.",
    ]),
    seoTitle: "Attribution & Marketing Analytics | Measurement Architecture",
    seoDescription:
      "Marketing attribution and analytics architecture — GA4, server-side tracking, MMM/MTA, and the dashboards operators use to make decisions tied to revenue.",
  },
  {
    _id: "subservice-creative-strategy",
    name: "Creative Strategy & Production",
    slug: "creative-strategy",
    parentSolutionId: "solution-performance-media",
    legacyName: "Ad Creative & Video Production",
    tagline: "Creative as the variable that matters most in performance media.",
    whatsIncluded: paragraphsToPt([
      "Creative strategy, copy, design, video, and the production pipeline that lets paid teams test at the velocity attribution requires.",
    ]),
    methodology: paragraphsToPt([
      "Insights-driven, iteration-fast, modular by design. Built so the creative pipeline keeps up with the bidding pipeline.",
    ]),
    seoTitle: "Creative Strategy | Ad Creative Production",
    seoDescription:
      "Ad creative strategy and production — copy, design, video, and the modular pipeline that keeps creative velocity matched to paid-media testing cadence.",
  },
  {
    _id: "subservice-retargeting-lifecycle",
    name: "Retargeting & Lifecycle Acquisition",
    slug: "retargeting-lifecycle",
    parentSolutionId: "solution-performance-media",
    legacyName: "Remarketing & Retargeting",
    tagline: "Retargeting as system, not afterthought.",
    whatsIncluded: paragraphsToPt([
      "Retargeting and lifecycle paid spend — sequenced creative, audience exclusions, frequency caps, and the journey logic behind every drop-off recovery.",
    ]),
    methodology: paragraphsToPt([
      "Built as part of the funnel architecture, not bolted on after. Reports against revenue lift, not just retargeting click-through.",
    ]),
    seoTitle: "Retargeting & Remarketing | Lifecycle Acquisition",
    seoDescription:
      "Retargeting and remarketing operated as part of the funnel architecture — sequenced creative, audience logic, frequency caps, accountable to revenue lift.",
  },

  // ───── Experience & Engineering (4) ─────
  {
    _id: "subservice-web-development",
    name: "Web Development & Engineering",
    slug: "web-development",
    parentSolutionId: "solution-experience-engineering",
    legacyName: "Website Development & Web Design",
    tagline: "The site is the salesperson. Build it like one.",
    whatsIncluded: paragraphsToPt([
      "Front-end and full-stack web development — Next.js, headless CMS, e-commerce, performance budgets, accessibility-grade markup, and the engineering layer behind every conversion.",
    ]),
    methodology: paragraphsToPt([
      "We engineer for performance, accessibility, and conversion as one set of constraints, not three.",
    ]),
    seoTitle: "Web Development | Next.js & Headless CMS",
    seoDescription:
      "Modern web development — Next.js, headless CMS, e-commerce, performance budgets, accessibility-grade markup. Sites engineered to convert and to scale.",
  },
  {
    _id: "subservice-conversion-optimization",
    name: "Conversion Optimization (CRO)",
    slug: "conversion-optimization",
    parentSolutionId: "solution-experience-engineering",
    legacyName: "Conversion Rate Optimization",
    tagline: "Where strategy becomes pixels and pixels become revenue.",
    whatsIncluded: paragraphsToPt([
      "CRO programmes — quantitative analysis, qualitative research, hypothesis library, A/B testing infrastructure, and the cadence to keep compounding.",
    ]),
    methodology: paragraphsToPt([
      "We don't just A/B test colours. We diagnose where the funnel leaks, hypothesize the structural fix, and instrument the test against revenue.",
    ]),
    seoTitle: "Conversion Rate Optimization (CRO) | A/B Testing",
    seoDescription:
      "Conversion rate optimization (CRO) operated as a programme — quantitative analysis, qualitative research, A/B testing infrastructure, accountable to revenue lift.",
  },
  {
    _id: "subservice-ux-research",
    name: "UX Research & Usability Engineering",
    slug: "ux-research",
    parentSolutionId: "solution-experience-engineering",
    legacyName: "UX & UI Design",
    tagline: "Research-led design. Decisions backed by user evidence.",
    whatsIncluded: paragraphsToPt([
      "UX research, usability testing, journey mapping, IA, and the design decisions that follow from real evidence rather than internal opinion.",
    ]),
    methodology: paragraphsToPt([
      "We research before we design. We test before we ship. We iterate after we measure.",
    ]),
    seoTitle: "UX Research | Usability & UI Design",
    seoDescription:
      "UX research, usability testing, and information architecture — design decisions backed by user evidence rather than opinion. Research-led, evidence-tested.",
  },
  {
    _id: "subservice-analytics-instrumentation",
    name: "Analytics Instrumentation",
    slug: "analytics-instrumentation",
    parentSolutionId: "solution-experience-engineering",
    legacyName: "Analytics Implementation",
    tagline: "Measurement that operators can actually use to make decisions.",
    whatsIncluded: paragraphsToPt([
      "GA4 implementation, server-side tracking, GTM architecture, custom dashboards, and the data layer that ties product, marketing, and revenue.",
    ]),
    methodology: paragraphsToPt([
      "Instrumentation is invisible when it works and catastrophic when it doesn't. We build it once, properly, then keep it healthy.",
    ]),
    seoTitle: "Analytics Implementation | GA4 & GTM Setup",
    seoDescription:
      "Analytics instrumentation — GA4 implementation, server-side tracking, GTM architecture, and the data layer that ties product, marketing, and revenue together.",
  },

  // ───── Brand, Engagement & Lifecycle (5) ─────
  {
    _id: "subservice-brand-identity",
    name: "Brand Identity & Expression",
    slug: "brand-identity",
    parentSolutionId: "solution-brand-engagement-lifecycle",
    legacyName: "Branding & Brand Strategy",
    tagline: "Brand isn't a logo. It's an identity stack the buyer feels.",
    whatsIncluded: paragraphsToPt([
      "Brand strategy, naming, identity systems, voice and tone, and the design language that makes everything else consistent.",
    ]),
    methodology: paragraphsToPt([
      "We work top-down: positioning, then voice, then identity, then expression. Each layer is non-negotiable before the next.",
    ]),
    seoTitle: "Brand Identity & Strategy | Naming & Design",
    seoDescription:
      "Brand strategy, naming, identity systems, voice and tone, and design language. The full identity stack — positioning to expression — that the buyer actually feels.",
  },
  {
    _id: "subservice-organic-social",
    name: "Organic & Owned Social",
    slug: "organic-social",
    parentSolutionId: "solution-brand-engagement-lifecycle",
    legacyName: "Social Media Marketing",
    tagline: "Social as a publishing practice, not a content treadmill.",
    whatsIncluded: paragraphsToPt([
      "Editorial planning across LinkedIn, Instagram, X, YouTube — content systems, format playbooks, and the cadence that builds audience over months and years rather than chasing weekly virality.",
    ]),
    methodology: paragraphsToPt([
      "Founder-led, narrative-driven, structured. Less posting, more publishing.",
    ]),
    seoTitle: "Organic Social Media | Founder-Led Publishing",
    seoDescription:
      "Organic social media operated as a publishing practice — LinkedIn, Instagram, X, YouTube. Editorial planning, format playbooks, and audience built over years not weeks.",
  },
  {
    _id: "subservice-video-production",
    name: "Video & Multi-Format Content",
    slug: "video-production",
    parentSolutionId: "solution-brand-engagement-lifecycle",
    legacyName: "Video Marketing & YouTube Strategy",
    tagline: "Video built for the platforms it lives on, not adapted from a TVC.",
    whatsIncluded: paragraphsToPt([
      "YouTube long-form, short-form (Reels, Shorts, TikTok), explainer, brand films, and the production model that lets you ship at platform velocity without burning the team out.",
    ]),
    methodology: paragraphsToPt([
      "Platform-native, distribution-first. We design for the algorithm before we design for the script.",
    ]),
    seoTitle: "Video Marketing | YouTube & Multi-Format Production",
    seoDescription:
      "Video marketing and multi-format content — YouTube long-form, Reels, Shorts, TikTok, explainer, and the production model that ships at platform velocity.",
  },
  {
    _id: "subservice-lifecycle-email",
    name: "Lifecycle Email & SMS",
    slug: "lifecycle-email",
    parentSolutionId: "solution-brand-engagement-lifecycle",
    legacyName: "Email Marketing & Marketing Automation",
    tagline: "Lifecycle as compounding revenue. Not as a Mailchimp template.",
    whatsIncluded: paragraphsToPt([
      "Email and SMS lifecycle programmes — onboarding, nurture, abandoned-cart recovery, win-back, retention, and the segmentation that makes each touch matter.",
    ]),
    methodology: paragraphsToPt([
      "We design the lifecycle journey first, then write the messages, then engineer the automation. Sequence matters.",
    ]),
    seoTitle: "Email Marketing & Lifecycle Automation",
    seoDescription:
      "Email and SMS lifecycle marketing — onboarding, nurture, retention, win-back, segmentation, and the automation architecture that makes each touch compound.",
  },
  {
    _id: "subservice-influencer-partnerships",
    name: "Influencer & Creator Partnerships",
    slug: "influencer-partnerships",
    parentSolutionId: "solution-brand-engagement-lifecycle",
    legacyName: "Influencer Marketing",
    tagline: "Creator partnerships engineered for narrative fit, not follower count.",
    whatsIncluded: paragraphsToPt([
      "Creator strategy, talent sourcing, brief design, contracting, and the measurement layer behind influencer spend.",
    ]),
    methodology: paragraphsToPt([
      "We pick creators by narrative fit, not by follower count. Smaller, sharper, more selective.",
    ]),
    seoTitle: "Influencer Marketing | Creator Partnerships",
    seoDescription:
      "Influencer and creator partnerships — strategy, sourcing, briefs, contracting, and measurement. Selected by narrative fit rather than follower count.",
  },
  /**
   * ── LINKED 15 SEP 2026 ─────────────────────────────────────────────────────
   * Both of these already had a full page file in the repo but no entry here,
   * which meant they existed as routes and were reachable from nowhere: not the
   * mega-menu, not the practice page's service list, not the sitemap. Two
   * finished pages nobody could find.
   *
   * They are now seeded like every other sub-service. NOTE: the mega-menu and
   * the practice pages read this list from Sanity, so these two stay invisible
   * until the seed is run against the dataset.
   */
  {
    _id: "subservice-demand-generation",
    name: "Demand Generation",
    slug: "demand-generation",
    parentSolutionId: "solution-performance-media",
    legacyName: "Lead Generation Campaigns",
    tagline: "For categories where the search demand does not exist yet.",
    whatsIncluded: paragraphsToPt([
      "Awareness built deliberately so it later shows up as branded search. For a new project, a new product, or a category with no established search volume, paid search has nothing to capture — demand generation creates the thing search later harvests.",
    ]),
    methodology: paragraphsToPt([
      "Measured on assisted conversions and branded search volume rather than last-click, and sequenced ahead of the search campaign. Skipping this step is why a search campaign gets blamed for a problem it cannot solve.",
    ]),
    seoTitle: "Demand Generation | Building Search Demand That Does Not Exist Yet",
    seoDescription:
      "Demand generation for new projects and categories with no established search volume — awareness built so it later shows up as branded search, measured on assisted conversions rather than last-click.",
  },
  {
    _id: "subservice-experience-design",
    name: "Experience Design",
    slug: "experience-design",
    parentSolutionId: "solution-experience-engineering",
    legacyName: "UI/UX Design Services",
    tagline: "Interface design judged on what it converts, not on how it looks.",
    whatsIncluded: paragraphsToPt([
      "Interface and journey design for the pages that carry revenue — landing pages, product and category templates, enquiry and checkout flows. Designed against the decision the visitor is trying to make rather than against a moodboard.",
    ]),
    methodology: paragraphsToPt([
      "Design decisions are argued from research and tested after launch. A page that looks better and converts worse has failed, and we report it that way.",
    ]),
    seoTitle: "Experience Design | UI/UX Built to Convert",
    seoDescription:
      "Interface and journey design for the pages that carry revenue — argued from research, tested after launch, and judged on conversion rather than appearance.",
  },
];
