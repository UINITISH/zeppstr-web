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

  /**
   * ORGANIC GROWTH
   *
   * Added 15 Sep 2026. This page, along with Experience & Engineering and
   * Growth Strategy & Advisory, had NO entry here at all — so three of the
   * five pillar pages rendered a hero and then nothing, while Performance
   * Media and Brand/Lifecycle carried seven sections each. On the deployed
   * site the difference was 2 h2 headings against 7. They were published in
   * the sense that they returned 200, and unpublished in every sense that
   * matters to a reader.
   *
   * SOURCING: every figure traces to Wise Market (/work/wise-market) or to
   * Invest in Sharjah, both published on this site. No category benchmarks,
   * no "clients typically see".
   */
  "organic-growth": {
    featuredLogos: [
      { name: "Wise Market", file: "wise-market.png" },
      { name: "Invest in Sharjah", file: "invest-in-sharjah.png" },
      { name: "LearnCab", file: "learncab.png" },
      { name: "Prohance", file: "prohance.png" },
      { name: "Empuls", file: "empuls.png" },
      { name: "Fixstars", file: "fixstars.png" },
    ],
    deliverables: [
      {
        name: "Technical Foundation Audit",
        format: "Crawl, index and architecture · weeks 1–3",
        description:
          "What search engines can actually reach, render and read as authority. Most sites that 'have an SEO problem' have an architecture problem the SEO work then fails against — so this runs before a single piece of content is commissioned.",
      },
      {
        name: "Intent-Mapped Content Architecture",
        format: "Structure, not a keyword list",
        description:
          "Content planned against the questions a buyer actually asks at each stage, organised so the site reads as a body of work on a subject rather than a pile of posts. Publishing against keywords produces pages that rank for nothing and convince nobody.",
      },
      {
        name: "Authority Programme",
        format: "Ongoing",
        description:
          "Earned links and citations built deliberately rather than bought. Wise Market went from effectively zero referring domains to 3,900; that is the asset that makes the rankings hold when a competitor outspends you.",
      },
      {
        name: "Local & Category Search",
        format: "Where geography decides the sale",
        description:
          "Profile, citation and category work for businesses where the buyer is choosing within a radius. Invest in Sharjah holds position one for its own category term — the term the entire proposition depends on.",
      },
      {
        name: "Compounding Report",
        format: "Monthly · against your own prior periods",
        description:
          "Rankings, qualified organic sessions and revenue attributable to organic, reported against what you did before rather than against an industry average nobody can verify.",
      },
    ],
    craft: [
      {
        label: "Technical SEO",
        lede: "The unglamorous half, and the half that decides whether the rest works.",
        outputs: [
          "Crawl budget directed at pages that earn revenue rather than at pagination and parameters",
          "Render-path checks — a page a crawler cannot render is a page that does not exist",
          "Internal linking treated as architecture, so authority flows to the pages that need it",
          "Core Web Vitals fixed where they affect ranking, not chased as a vanity score",
        ],
      },
      {
        label: "Content architecture",
        lede: "Built as a structure with a spine, not a publishing calendar.",
        outputs: [
          "Pillar and cluster mapping so related pages reinforce rather than cannibalise each other",
          "Content briefed against buyer questions and objections, with the commercial intent stated up front",
          "Existing pages consolidated or retired — most sites rank better after deleting than after publishing",
          "Written by people who understand the category, then edited for accuracy before style",
        ],
      },
      {
        label: "Authority building",
        lede: "Earned coverage and citations, which is slow and is the point.",
        outputs: [
          "Digital PR angles derived from the client's own data rather than invented studies",
          "Placement quality judged on whether a human would click it, not on a domain score",
          "No link buying, no PBNs, no guest-post networks — the recovery from a manual action costs more than the shortcut saves",
        ],
      },
    ],
    processSteps: [
      {
        title: "Audit the foundation",
        duration: "Weeks 1–3",
        body:
          "Crawl, index coverage, architecture and existing performance. This nearly always finds something material — pages search engines cannot read, authority pooling on the wrong URLs, or a content library competing with itself.",
      },
      {
        title: "Fix before you publish",
        duration: "Weeks 3–8",
        body:
          "Technical and structural work lands first. Commissioning content onto a broken foundation is the most common and most expensive mistake in this discipline: you pay for the writing twice.",
      },
      {
        title: "Build the body of work",
        duration: "Months 2–8",
        body:
          "Content published against mapped intent, with authority work running alongside it. This is the phase that looks slowest and compounds hardest.",
      },
      {
        title: "Compound",
        duration: "Months 6+",
        body:
          "Organic is the channel where the work you did in month three is still paying in month thirty. Wise Market's revenue curve is the shape this produces when the foundation holds.",
      },
    ],
    practiceNumbers: [
      {
        figure: "AUD 2.7M",
        metric: "Monthly revenue",
        detail: "From AUD 40K, in six months",
        client: "Wise Market",
      },
      {
        figure: "12,300",
        metric: "Organic keywords ranked",
        detail: "From effectively zero",
        client: "Wise Market",
      },
      {
        figure: "3,900",
        metric: "Referring domains earned",
        detail: "The asset that makes rankings hold",
        client: "Wise Market",
      },
      {
        figure: "#1",
        metric: "For the category term",
        detail: "Two head terms at position one",
        client: "Invest in Sharjah",
      },
    ],
    faqs: [
      {
        question: "How long before organic shows up in revenue?",
        answer:
          "Quarters, not weeks, and anyone promising otherwise is either buying links or counting branded search they already had. Wise Market reached AUD 2.7M monthly in six months, which is fast for this discipline and was possible because the technical foundation was rebuilt before anything was published.",
      },
      {
        question: "Do you guarantee rankings?",
        answer:
          "No, and a guarantee is a reliable signal that someone intends to rank you for terms nobody searches. We commit to the work and report against your own prior periods.",
      },
      {
        question: "We already publish a lot of content and it isn't working.",
        answer:
          "That is the most common brief we get. It is usually content published against keywords rather than against questions, on a site structure search engines cannot read as authority. The audit says which of the two it is, and frequently the first recommendation is to delete rather than to publish.",
      },
      {
        question: "Can you do this without the technical work?",
        answer:
          "We would rather not, and the diagnostic will say so in writing. Commissioning content onto a foundation that cannot rank it means paying for the same pages twice.",
      },
    ],
  },

  /**
   * EXPERIENCE & ENGINEERING
   *
   * SOURCING: Mini Leaves (/work/mini-leaves) for the conversion figure and
   * VehicleMall (/work/vehiclemall) for scope. Homatico is referenced only as
   * a sequence, never as a number — its outcome is client-reported and this
   * site does not chart figures it did not measure.
   */
  "experience-engineering": {
    featuredLogos: [
      { name: "Mini Leaves", file: "mini-leaves.png" },
      { name: "VehicleMall", file: "vehiclemall.png" },
      { name: "Homatico", file: "homatico.png" },
      { name: "iVehicleValue", file: "ivehiclevalue.png" },
      { name: "Pacer", file: "pacer.png" },
      { name: "Nakshatech", file: "nakshatech.png" },
    ],
    deliverables: [
      {
        name: "Measurement Instrumentation",
        format: "Before anything else · weeks 1–3",
        description:
          "Analytics verified against the CRM, events that describe real behaviour, and a north-star metric everyone agrees to be judged on. On Tru Aquapolis the platform recorded zero conversions in a month the CRM held 147. You cannot optimise a number that is not being recorded.",
      },
      {
        name: "Conversion Diagnosis",
        format: "Where the page loses people, and why",
        description:
          "Session replay, funnel analysis and form-level drop-off, read together rather than separately. The output is a ranked list of losses with a rupee figure attached, not a list of usability opinions.",
      },
      {
        name: "Experience Design",
        format: "Wireframe to build-ready",
        description:
          "Journeys designed around the decision the buyer is actually making — which differs by category, which is why the same template does not work for a ₹2.5 crore apartment and a ₹900 toy.",
      },
      {
        name: "Web Development",
        format: "Production build",
        description:
          "Built for speed, crawlability and the ability to change without a developer for every edit. A site the marketing team cannot update becomes a site nobody updates.",
      },
      {
        name: "Continuous Test Programme",
        format: "Ongoing",
        description:
          "A running queue of tests with a stopping rule, prioritised by expected value rather than by who suggested them. Tests that lose are reported as plainly as tests that win.",
      },
    ],
    craft: [
      {
        label: "Analytics & instrumentation",
        lede: "The least glamorous phase and the one that determines whether everything after it is real.",
        outputs: [
          "Conversion tracking verified against the CRM rather than trusted because it fires",
          "Server-side measurement where the platform requires it",
          "One north-star metric, agreed before any spend changes",
          "A reporting layer someone other than us can read",
        ],
      },
      {
        label: "Conversion optimisation",
        lede: "The cheapest revenue in the business usually sits here, and it is almost always unworked.",
        outputs: [
          "Losses ranked by value, so effort goes where the money is rather than where the opinion is",
          "Tests sized before they run — an underpowered test produces a confident wrong answer",
          "Form and checkout work first, because that is where intent is highest and friction costs most",
          "Mini Leaves moved from 0.5% to over 3% on this work",
        ],
      },
      {
        label: "Design & build",
        lede: "The site is the salesperson. Build it like one.",
        outputs: [
          "Journeys designed around the buyer's decision, not around the org chart",
          "Performance treated as a conversion feature, not an engineering nicety",
          "Editable by the marketing team without a ticket",
          "VehicleMall: three production applications — valuation, auction and custody — on one shared engine, mobile and desktop",
        ],
      },
    ],
    processSteps: [
      {
        title: "Instrument first",
        duration: "Weeks 1–3",
        body:
          "Nothing is changed until measurement reports accurately. Improving a page against broken tracking means you will not know whether you improved it, and a channel that looks like it works because the tracking is broken absorbs budget indefinitely.",
      },
      {
        title: "Diagnose the loss",
        duration: "Weeks 3–6",
        body:
          "Find where people leave and what it costs. The deliverable is a ranked list with money attached, which is what makes it possible to argue about priorities honestly.",
      },
      {
        title: "Rebuild the constraint",
        duration: "Months 2–4",
        body:
          "Fix the one thing holding the rest back rather than improving everything a little. If the page converts at a third of what it should, more traffic is an expensive way to make that worse.",
      },
      {
        title: "Test continuously",
        duration: "Ongoing",
        body:
          "A standing queue with a stopping rule. Results reported including the ones that failed — a test programme that never reports a loss is not a test programme.",
      },
    ],
    practiceNumbers: [
      {
        figure: "0.5% → 3%+",
        metric: "Site conversion rate",
        detail: "Six-fold, across multiple cohorts",
        client: "Mini Leaves",
      },
      {
        figure: "₹60L+",
        metric: "Monthly run rate",
        detail: "Following the conversion rebuild",
        client: "Mini Leaves",
      },
      {
        figure: "3",
        metric: "Production applications",
        detail: "Valuation, auction and custody on one engine",
        client: "VehicleMall",
      },
      {
        figure: "147",
        metric: "Conversions the platform missed",
        detail: "In a month it reported zero — found at instrumentation",
        client: "Tru Aquapolis",
      },
    ],
    faqs: [
      {
        question: "Why does measurement come before design work?",
        answer:
          "Because otherwise you cannot tell whether the design work succeeded. It is the least interesting phase to sell and the one that decides whether every number after it is trustworthy. Most engagements find something material here — a broken conversion event, a channel double-counting itself, or a form quietly discarding submissions.",
      },
      {
        question: "Can you work on our existing site or does it need rebuilding?",
        answer:
          "Usually the existing site. A rebuild is the most expensive possible answer to a conversion problem and it is rarely the right one — it also resets whatever authority the current site has earned. The diagnosis says which applies, and it says so before anyone has quoted for a build.",
      },
      {
        question: "How do you decide what to test?",
        answer:
          "By expected value: size of the loss multiplied by confidence in the fix. Not by who suggested it and not by what is easiest to build. Tests are sized before they run, because an underpowered test produces a confident wrong answer that then gets rolled out everywhere.",
      },
      {
        question: "Do you report tests that failed?",
        answer:
          "Yes. Roughly half of them do. A CRO report with no losing tests in it is a report that has been curated, and it is worth nothing as a basis for the next decision.",
      },
    ],
  },

  /**
   * GROWTH STRATEGY & ADVISORY
   *
   * SOURCING: the capacity model and engagement terms are the firm's own and
   * published on /about. The Tru Aquapolis figures are published in full at
   * /work/tru-aquapolis. Nothing here is a benchmark or an average.
   */
  "growth-strategy-advisory": {
    featuredLogos: [
      { name: "Tru Aquapolis", file: "tru-aquapolis.png" },
      { name: "Invest in Sharjah", file: "invest-in-sharjah.png" },
      { name: "TruGlobal", file: "truglobal.png" },
      { name: "Moonwalk", file: "moonwalk.png" },
      { name: "Leverage Edu", file: "leverage-edu.png" },
      { name: "Twenty One Finance", file: "twenty-one-finance.png" },
    ],
    deliverables: [
      {
        name: "The Growth Diagnostic",
        format: "Written document · ~4 weeks",
        description:
          "What is constraining growth, what we would change in what order, what the measurement is currently getting wrong, and what we think the realistic ceiling is. Paid, yours to keep, and refunded if it does not tell you something you did not already know.",
      },
      {
        name: "Unit Economics Model",
        format: "Before any channel decision",
        description:
          "What one customer is worth, what you can afford to pay for one, and what the payback period is. If nobody in the business can answer that, that is the first project rather than the media plan — no cost-per-lead target means anything without it.",
      },
      {
        name: "Revenue System Design",
        format: "Architecture, not a campaign plan",
        description:
          "Positioning, offer, journey and measurement designed as one system. Channels compound when this layer works and compete when it does not; that is the whole argument of the firm.",
      },
      {
        name: "Fractional Marketing Leadership",
        format: "Embedded · monthly cadence",
        description:
          "Senior time inside the business — board-style monthly review against one accountable metric, with what did not work stated as plainly as what did. For companies that need the judgement before they need the headcount.",
      },
      {
        name: "Operating Cadence",
        format: "Monthly",
        description:
          "One north-star metric, a standing review, and decisions recorded with the reasoning attached. Most marketing does not fail from lack of ideas; it fails from nobody being able to say why last quarter's decision was made.",
      },
    ],
    craft: [
      {
        label: "Diagnosis",
        lede: "Every engagement opens here, and it is paid precisely so it can tell you things you do not want to hear.",
        outputs: [
          "Acquisition, conversion and retention audited against the CRM rather than against platform reporting",
          "The constraint named explicitly — and it is frequently not the channel that prompted the call",
          "A prioritised list of what is broken with what it is costing",
          "Delivered as a document whether or not you continue with us",
        ],
      },
      {
        label: "Positioning & offer",
        lede: "More budget against the same offer buys the same result at a higher price.",
        outputs: [
          "Positioning tested against what the buyer already believes, not against what the founder wishes they believed",
          "Offer architecture — what is sold, to whom, at what commitment",
          "Proof assembled from what can actually be evidenced",
        ],
      },
      {
        label: "Operating model",
        lede: "The part that outlasts the engagement.",
        outputs: [
          "One accountable metric, agreed and then not quietly changed when it goes the wrong way",
          "Monthly board-style review with bad months reported",
          "Decision records, so the reasoning survives the person who made it",
        ],
      },
    ],
    processSteps: [
      {
        title: "Diagnose before you spend",
        duration: "Weeks 1–4",
        body:
          "A paid, written diagnostic delivered whether or not you continue. It exists so the work that follows is aimed at the actual constraint rather than at the channel you were already planning to buy.",
      },
      {
        title: "Make the measurement honest",
        duration: "Weeks 4–8",
        body:
          "Attribution has to report accurately before any budget moves. On Tru Aquapolis this phase found a month in which the ad platform recorded zero conversions while the CRM held 147 — the bidding algorithm had been optimising against nothing.",
      },
      {
        title: "Fix the constraint",
        duration: "Months 2–4",
        body:
          "One thing, properly, rather than everything a little. If qualification is the problem, creative testing is a distraction.",
      },
      {
        title: "Compound",
        duration: "Months 4–12",
        body:
          "Channels scale against a system that now converts and reports honestly. Scale is the last step, not the first.",
      },
    ],
    practiceNumbers: [
      {
        figure: "₹187.5 Cr",
        metric: "Closed from leads generated",
        detail: "On ₹1.4 Cr of media, Jan–Aug 2026",
        client: "Tru Aquapolis",
      },
      {
        figure: "75",
        metric: "Apartments sold",
        detail: "3 & 4 BHK premium, one project",
        client: "Tru Aquapolis",
      },
      {
        figure: "6–12",
        metric: "Partner clients per year",
        detail: "Capacity capped deliberately — the model does not survive volume",
        client: "Zeppstr",
      },
      {
        figure: "12 months",
        metric: "Minimum engagement",
        detail: "Below this there is nothing worth reporting",
        client: "Zeppstr",
      },
    ],
    faqs: [
      {
        question: "What does the diagnostic actually produce?",
        answer:
          "A written document: what is constraining growth, what we would change in what order, what the measurement is currently getting wrong, and what we think the realistic ceiling is. It is paid, it is yours, and it does not obligate you to a retainer. Roughly four weeks.",
      },
      {
        question: "Why is it paid?",
        answer:
          "Because a free audit is a sales document and both sides know it. Paying for it means we can tell you the thing you did not want to hear — including that the channel you came to buy is not your constraint, or that we are the wrong firm for this.",
      },
      {
        question: "Why cap the client list at twelve?",
        answer:
          "Because the operating model is senior-time heavy and does not survive being spread across forty accounts. We turn down most of what comes in, including work we could do competently. Selectivity is the product, not positioning.",
      },
      {
        question: "Can you just run our channels instead?",
        answer:
          "Yes, and many clients engage a single practice. What we will not do is take a single-channel brief when the diagnostic says the channel is not the constraint — we will tell you that in writing, and the diagnostic is yours to take elsewhere.",
      },
      {
        question: "Do your reports contain bad months?",
        answer:
          "Yes, because a report that never does is not a report. If you need the reporting to look good more than you need it to be accurate, the diagnostic will say we are the wrong firm.",
      },
    ],
  },
};
