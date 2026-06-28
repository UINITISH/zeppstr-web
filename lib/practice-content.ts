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

export interface PracticeContent {
  featuredLogos?: FeaturedLogo[];
  deliverables?: Deliverable[];
  processSteps?: ProcessStep[];
  practiceNumbers?: PracticeNumber[];
  faqs?: FAQ[];
}

export const PRACTICE_CONTENT: Record<string, PracticeContent> = {
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
