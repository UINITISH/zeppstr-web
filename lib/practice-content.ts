/**
 * practice-content.ts — practice-specific copy for solution pages.
 *
 * The dynamic /solutions/[slug] page reads this map and conditionally renders
 * Logo Strip / Deliverables / Process / Practice Numbers / FAQ sections only
 * when content exists for that slug. Add an entry here to enrich a solution
 * page beyond the Sanity-driven baseline.
 */

export interface FeaturedLogo {
  name: string;
  file: string; // filename in /public/client-logos/
}

export interface Deliverable {
  name: string;
  description: string;
  /** Short mono-caps tag describing the artifact type (e.g. "30+ page document") */
  format?: string;
}

export interface ProcessStep {
  title: string;
  duration: string;
  body: string;
}

export interface PracticeNumber {
  figure: string;
  metric: string;
  detail: string;
  client: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

/**
 * Production craft — the work that actually gets made.
 *
 * Added because the Brand, Engagement & Lifecycle page described a system and
 * never said what we physically produce. A reader could finish the page without
 * learning that we run video shoots, go on location, or staff on-ground
 * activations. "Lifecycle architecture" is accurate and tells a prospective
 * client nothing about what shows up in their shared drive on a Friday.
 */
export interface CraftBlock {
  /** Mono-caps label, e.g. "Video & film". */
  label: string;
  /** One-line statement of what this is. */
  lede: string;
  /** Concrete outputs — the things that get delivered, named plainly. */
  outputs: string[];
}

export interface PracticeContent {
  featuredLogos?: FeaturedLogo[];
  deliverables?: Deliverable[];
  /** What gets physically produced. Rendered between deliverables and services. */
  craft?: CraftBlock[];
  processSteps?: ProcessStep[];
  practiceNumbers?: PracticeNumber[];
  faqs?: FAQ[];
}

export const PRACTICE_CONTENT: Record<string, PracticeContent> = {
  /**
   * PERFORMANCE MEDIA
   *
   * This practice used to have its OWN page file at
   * app/(marketing)/solutions/performance-media/page.tsx — a bespoke 355-line
   * layout, while the other four pillars all fell through to the shared
   * [slug] template. So one of the five looked like a different website: no
   * logo strip, no deliverables, no process band, no practice numbers, no FAQ.
   *
   * That file is now a thin delegate to the shared template and the content it
   * carried lives here, where the template can render it in the same system as
   * everything else.
   *
   * SOURCING: every figure below traces to TRU Aquapolis, published in full at
   * /work/tru-aquapolis. No benchmarks, no category averages.
   */
  "performance-media": {
    featuredLogos: [
      { name: "Mini Leaves", file: "mini-leaves.png" },
      { name: "Wise Market", file: "wise-market.png" },
      { name: "Sky Phonez", file: "sky-phonez.png" },
      { name: "VehicleMall", file: "vehiclemall.png" },
      { name: "Tristar Online", file: "tristar-online.png" },
      { name: "Homatico", file: "homatico.png" },
    ],
    deliverables: [
      {
        name: "Measurement Rebuild",
        format: "Instrumentation · weeks 1–4",
        description:
          "Conversion tracking verified against your CRM, server-side measurement where the platform requires it, offline conversion import so bidding learns from qualified outcomes rather than form fills. Nothing scales until this reports accurately.",
      },
      {
        name: "Intent-Tiered Account Structure",
        format: "Search + social architecture",
        description:
          "Campaigns separated so branded, non-branded and competitor traffic carry their own budget and their own judgement. Branded performance flatters everything it is averaged with, so it never shares a reporting line.",
      },
      {
        name: "Creative Test Programme",
        format: "Concepts, not colour variants",
        description:
          "A running set of concepts with a retirement rule. On Aquapolis, 86% of Meta leads came from five creatives out of thirty-three tested — and the best performer was a static floor plan. The work is retiring the other twenty-eight.",
      },
      {
        name: "Qualification Layer",
        format: "Pre-handover screening",
        description:
          "Leads screened on budget band, product fit, contactability and genuine intent before they reach your sales desk. On Aquapolis roughly 30% never got passed on. Handing over raw volume buries a sales team.",
      },
      {
        name: "Revenue Reporting",
        format: "Monthly · against your own prior periods",
        description:
          "Cost per qualified lead and closed revenue. Platform-reported conversions are used to compare ads against each other, never as the number of record.",
      },
    ],
    craft: [
      {
        label: "Paid search",
        lede: "Google and Microsoft, structured by intent tier rather than by product.",
        outputs: [
          "Branded, non-branded and competitor traffic funded and judged separately",
          "Negative keyword discipline treated as core work — on most accounts it protects more budget than bid management does",
          "Landing pages matched to intent tier rather than one page taking all traffic",
          "Offline conversion import so Smart Bidding optimises on qualified leads, not raw submissions",
        ],
      },
      {
        label: "Paid social & programmatic",
        lede: "Meta and LinkedIn, measured server-side because the browser pixel no longer tells the truth.",
        outputs: [
          "Server-side measurement as standard — since App Tracking Transparency, pixel-only tracking undercounts by an unknown margin",
          "Ad sets consolidated rather than fragmented; the algorithm needs volume per set to optimise at all",
          "Creative produced in-house, so a failing ad is recut this week rather than re-briefed next fortnight",
          "Audience architecture that accumulates a warm pool rather than renting cold reach every month",
        ],
      },
      {
        label: "Demand generation",
        lede: "For a new project or a category with no established search volume, there is nothing for search to capture yet.",
        outputs: [
          "Awareness built deliberately so it later shows up as branded search",
          "Measured on assisted conversions and branded search volume, not on last-click",
          "Sequenced ahead of the search campaign — skipping it makes search carry a problem it cannot solve",
        ],
      },
      {
        label: "Retargeting & lifecycle acquisition",
        lede: "Built into the funnel architecture rather than bolted on at the end.",
        outputs: [
          "Segmented by depth of engagement rather than one catch-all audience",
          "Frequency capped against fatigue, with creative rotated on a schedule",
          "The durable output of a media programme is the warm audience it accumulates — reaching it again costs a fraction of cold acquisition",
        ],
      },
    ],
    processSteps: [
      {
        title: "Instrumentation before budget",
        duration: "Weeks 1–4",
        body: "Conversion tracking verified against your CRM, server-side where required, offline conversions imported. Nothing scales until this reports accurately.",
      },
      {
        title: "Structure by intent",
        duration: "Weeks 3–6",
        body: "Campaigns separated so each intent tier carries its own budget and its own judgement, and branded never flatters the rest.",
      },
      {
        title: "Test, then retire",
        duration: "Ongoing",
        body: "Creative concepts tested in sets, with the losers retired rather than left running. Retainer economics rarely reward this; it is where the return is.",
      },
      {
        title: "Qualify, then scale",
        duration: "Month 3+",
        body: "Screening before handover, then budget increases against a funnel that converts and a sales desk that can absorb the volume.",
      },
    ],
    practiceNumbers: [
      {
        figure: "₹2,333",
        metric: "Cost per lead",
        detail: "6,000+ leads across eight months",
        client: "TRU Aquapolis — Indian premium real estate",
      },
      {
        figure: "70%+",
        metric: "Cleared qualification",
        detail: "Screened before reaching the sales desk",
        client: "TRU Aquapolis — Jan–Aug 2026",
      },
      {
        figure: "₹187.5 Cr",
        metric: "Closed sales value",
        detail: "75 apartments on ₹1.4 Cr of media — closed by the client's own sales team",
        client: "TRU Aquapolis — ₹2.5 Cr average ticket",
      },
    ],
    faqs: [
      {
        question: "Our tracking is probably fine. Can we skip the first month?",
        answer:
          "Almost every account says that, and it is the most expensive fault in paid media precisely because the dashboard looks normal. We have opened accounts with 147 leads sitting in the CRM and zero conversions recorded on the platform — Smart Bidding had been training on an empty signal for months. Adding budget in that state multiplies the waste.",
      },
      {
        question: "Why do you refuse to optimise for a low cost per lead?",
        answer:
          "Because cheap leads are easy to buy and usually worthless. High-intent traffic costs several times the blended average, so an account driven toward a low CPL systematically defunds the only segment producing revenue. We optimise toward cost per qualified lead instead, which needs qualified status fed back from your CRM.",
      },
      {
        question: "Do you charge a percentage of media spend?",
        answer:
          "No. It pays us to increase your spend, which is the behaviour you are hiring us to stop. Fixed monthly fee, and the media is bought on your own accounts with your own billing — the account history, the audiences and the learning stay with you if we part ways.",
      },
      {
        question: "How quickly should we expect results?",
        answer:
          "The first month usually produces no reportable improvement because it is spent making measurement honest. On TRU Aquapolis the first defensible result came at ninety days, and the figure we publish now is the eight-month actual — five times larger than what we were willing to commit to at the ninety-day mark.",
      },
      {
        question: "Can you run paid media without touching anything else?",
        answer:
          "Sometimes. But if the diagnostic says spend is scaling faster than the funnel behind it — a page that does not convert, or a sales desk not following up fast enough to matter — we will say so rather than take the budget. In property, an enquiry contacted within minutes converts at a materially different rate from one contacted the next day, and no amount of bid management closes that gap.",
      },
    ],
  },

  "brand-engagement-lifecycle": {
    featuredLogos: [
      { name: "Mini Leaves", file: "mini-leaves.png" },
      { name: "Wise Market", file: "wise-market.png" },
      { name: "My Keto Co", file: "my-keto-co.png" },
      { name: "Aishwarya Interiors", file: "aishwarya-interiors.png" },
      { name: "Lucky White Goods", file: "lucky-white-goods.png" },
      { name: "Tristar Online", file: "tristar-online.png" },
      { name: "Sky Phonez", file: "sky-phonez.png" },
      { name: "Pacer", file: "pacer.png" },
    ],
    deliverables: [
      {
        name: "Brand Operating System",
        format: "Reference document · 30+ pages",
        description:
          "A reference document — identity, voice, expression, behavior — built to be operated, not framed.",
      },
      {
        name: "Lifecycle Architecture",
        format: "Journey map + lifecycle flows",
        description:
          "The full customer journey mapped from first touch to seventh purchase. Every email, every SMS, every social touch designed to compound.",
      },
      {
        name: "Content Operating Calendar",
        format: "Living 90-day calendar",
        description:
          "A 90-day rolling calendar across all owned channels — modular, repurposable, accountable.",
      },
      {
        name: "Measurement Framework",
        format: "Custom metrics + dashboard",
        description:
          "Custom metrics for engagement and lifecycle health. Open rates not included.",
      },
      {
        name: "Quarterly Operating Review",
        format: "Recurring · Every quarter",
        description:
          "Board-style practice review every quarter. One revenue metric. One north star.",
      },
    ],
    craft: [
      {
        label: "Video & film",
        lede: "We shoot. Scripting, direction, crew, location, edit — in-house, not brokered out to a production house and marked up.",
        outputs: [
          "Brand films and founder films — the long-form piece that does the heavy lifting on a landing page",
          "Product and catalogue shoots, built so one shoot day feeds a quarter of social",
          "Vertical-first cuts for Reels, Shorts and in-feed, framed for vertical at the shoot rather than cropped afterwards",
          "Performance creative built as a testable set — variants of hook, offer and proof, not one hero film with nothing to compare it to",
          "Testimonial and walkthrough films, shot on site with real customers",
        ],
      },
      {
        label: "Behind the scenes & always-on capture",
        lede: "The most reliable organic content a brand owns is the footage of itself working. Most companies throw it away.",
        outputs: [
          "BTS capture on every shoot day — a second camera whose entire job is the footage around the footage",
          "Founder and team content captured in batches, so a quarter of personal-brand posting comes out of one afternoon",
          "Factory floor, kitchen, site, studio — process content, which outperforms polished product content in almost every category we work in",
          "A capture kit and shot brief for the client's own team, so the feed does not go quiet between shoot days",
        ],
      },
      {
        label: "Social, operated rather than scheduled",
        lede: "Organic social is run as a channel with a job, not a calendar that has to be filled.",
        outputs: [
          "Platform-native strategy per channel — Instagram, LinkedIn, YouTube, WhatsApp — with a stated role for each, not the same post reformatted four times",
          "A 90-day rolling content calendar with modular formats that survive a bad week",
          "Community management and DM handling, including the enquiries that arrive in the inbox rather than the form",
          "Creator and influencer partnerships, briefed on outcome and disclosed to ASCI requirements",
          "Employee and founder-led content, which is where B2B attention actually sits",
        ],
      },
      {
        label: "On-ground & experiential",
        lede: "Some categories are won in a room, not a feed. Property, education and healthcare all convert on a physical interaction.",
        outputs: [
          "Site launches, open houses and channel-partner meets — collateral, capture, and the lead-capture mechanism that connects the room to the CRM",
          "Exhibition and expo presence, including the part most brands skip: where the badge scans go afterwards",
          "Activations and sampling, instrumented so footfall becomes an attributable number",
          "Event films and same-week edits, because the content window on an event closes fast",
          "On-ground lead capture wired into the same qualification logic as paid — one definition of a real lead, not two",
        ],
      },
      {
        label: "Lifecycle & owned channels",
        lede: "Once attention is earned, retention is a marketing job. Email, SMS and WhatsApp are where a second purchase is decided.",
        outputs: [
          "Lifecycle flows — welcome, abandonment, post-purchase, winback, replenishment — written as sequences, not one-off sends",
          "Segmentation built on behaviour and value rather than on whatever fields the form happened to collect",
          "WhatsApp as a revenue channel, which in India it is, operated inside template and opt-in rules",
          "Deliverability and authentication work — SPF, DKIM, DMARC — because a sequence that lands in spam is not a sequence",
          "Reporting on revenue per recipient, not open rates, which Apple's Mail Privacy Protection made decorative in 2021",
        ],
      },
    ],
    processSteps: [
      {
        title: "Diagnose",
        duration: "4–6 weeks",
        body: "We audit identity, lifecycle, content, and social. Find the leak points. Written diagnostic, not a slide deck.",
      },
      {
        title: "Architect",
        duration: "2–4 weeks",
        body: "The system gets designed — brand operating system, lifecycle architecture, content calendar.",
      },
      {
        title: "Deploy",
        duration: "Ongoing",
        body: "We operate it ourselves, or hand it to your team with the playbook. Either way, it runs as one practice.",
      },
      {
        title: "Operate",
        duration: "12+ months",
        body: "Quarterly board reviews. One revenue metric. Accountable.",
      },
    ],
    practiceNumbers: [
      {
        figure: "6×",
        metric: "Conversion rate lift",
        detail: "0.5% → 3%+ — an order of magnitude across the funnel",
        client: "Mini Leaves — DTC lifecycle program",
      },
      {
        figure: "₹60L+/mo",
        metric: "Owned-channel run rate",
        detail: "Email + SMS, operated as a single revenue line",
        client: "Mini Leaves — Indian DTC consumer brand",
      },
      {
        figure: "3 of 12",
        metric: "Annual partner slots",
        detail: "Out of every 12 partner clients we take, three are dedicated to this practice",
        client: "Selective by design",
      },
    ],
    faqs: [
      {
        question: "Can we engage you only for one of the five services?",
        answer:
          "Sometimes — usually only after we've architected the full system. The five services compound each other. Running them in isolation forfeits most of the compounding.",
      },
      {
        question: "How long is the typical engagement?",
        answer:
          "12 months minimum, with a 6-month review break-clause. Brand and lifecycle work compounds — we don't sign 90-day pilots.",
      },
      {
        question: "Do you work in-house with our team, or as an external agency?",
        answer:
          "Both. We can run the practice ourselves, embed with your team, or hand off after architecture. Whichever produces the right outcome.",
      },
      {
        question:
          "How is this different from hiring five different agencies for each service?",
        answer:
          "Agencies are rewarded for producing volume. We're rewarded for producing growth that compounds. The engagement model and the deliverables reflect that.",
      },
      {
        question: "Is the diagnostic actually refundable?",
        answer:
          "Yes. The 45-minute paid diagnostic is refunded in full if we're not the right fit for each other.",
      },
    ],
  },
};
