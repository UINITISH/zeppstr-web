/**
 * The conversation tree for the site chat widget.
 *
 * ── WHAT THIS IS ────────────────────────────────────────────────────────────
 * A scripted, branching conversation. NOT an AI chatbot. Every line it can
 * say is written here, which means it is incapable of inventing a client
 * result, a price, a timeline or a capability.
 *
 * That constraint is the point, not a limitation to be apologised for. On a
 * site whose entire positioning is "we only claim what we can prove", a
 * generative bot that hallucinates "we typically deliver 3–5× ROAS" does more
 * damage in one sentence than the widget could earn back in a year. If this is
 * ever upgraded to an LLM, it needs grounding in published content and a hard
 * refusal to state numbers that are not on the site.
 *
 * ── HOW TO EDIT IT ──────────────────────────────────────────────────────────
 * This is data. Add or reword a node below and the UI follows — no React
 * changes needed. Each node has:
 *
 *   say      what the bot sends (one or more messages, in order)
 *   links    optional real pages to offer — this is the "navigate the site
 *            from the chat" behaviour
 *   options  buttons that move to the next node
 *   capture  when set, the widget switches into lead-capture mode
 *
 * ── RULES FOR ANYTHING YOU ADD ──────────────────────────────────────────────
 *  1. No figure that is not already published on this site.
 *  2. No response-time promise. Nobody is sitting in this.
 *  3. No "we can definitely help with that" before a diagnostic has run —
 *     the whole model is that the constraint is usually not what the visitor
 *     thinks it is.
 *  4. Every link must resolve. A chat that 404s is worse than no chat.
 */

export interface ChatLink {
  label: string;
  href: string;
  /** One line on why this page, shown under the label. */
  note?: string;
}

export interface ChatOption {
  label: string;
  next: string;
}

export interface ChatNode {
  id: string;
  say: string[];
  links?: ChatLink[];
  options?: ChatOption[];
  /** Switches the widget into lead capture at this point. */
  capture?: boolean;
  /** Short tag recorded with the lead so you know how they got here. */
  intent?: string;
}

export const CHAT_START = "start";

export const CHAT_FLOW: Record<string, ChatNode> = {
  start: {
    id: "start",
    say: [
      "Hi — this is a guided menu rather than a person, so it can point you to the right page fast.",
      "What brings you here?",
    ],
    options: [
      { label: "Growth has stalled", next: "stalled" },
      { label: "I'm looking for a specific service", next: "service" },
      { label: "I want to see your work", next: "work" },
      { label: "Something else", next: "other" },
    ],
  },

  // ── Branch 1: the diagnostic pitch, which is the real product ──────────────
  stalled: {
    id: "stalled",
    intent: "growth-stalled",
    say: [
      "That's the usual reason people land here.",
      "Our position is that stalled growth is almost always an architecture problem rather than a channel problem — the thing limiting you is usually not the practice you came to buy.",
      "Two places to read that argument in full:",
    ],
    links: [
      {
        label: "How we work",
        href: "/solutions",
        note: "Five practices, and why the constraint moves between them",
      },
      {
        label: "Start from the symptom",
        href: "/solutions#constraint-heading",
        note: "Find your symptom, read the practice it actually implicates",
      },
    ],
    options: [
      { label: "Tell me about the diagnostic", next: "diagnostic" },
      { label: "Leave my details", next: "capture_general" },
      { label: "Back", next: "start" },
    ],
  },

  diagnostic: {
    id: "diagnostic",
    intent: "diagnostic-interest",
    say: [
      "It's a paid, written assessment delivered in about four weeks — what's constraining growth, what we'd change in what order, and what the measurement is currently getting wrong.",
      "It's yours whether or not you continue with us, and it's refunded if it doesn't tell you something you didn't already know.",
    ],
    links: [
      {
        label: "Apply for a diagnostic",
        href: "/book-consultation",
        note: "Five steps, about three minutes",
      },
    ],
    options: [
      { label: "Leave my details instead", next: "capture_diagnostic" },
      { label: "Back", next: "start" },
    ],
  },

  // ── Branch 2: route to the right practice ─────────────────────────────────
  service: {
    id: "service",
    intent: "service-browse",
    say: ["Which one is closest?"],
    options: [
      { label: "Paid media", next: "svc_paid" },
      { label: "SEO / organic", next: "svc_organic" },
      { label: "Website / conversion", next: "svc_experience" },
      { label: "Brand & lifecycle", next: "svc_brand" },
      { label: "Strategy & advisory", next: "svc_strategy" },
    ],
  },

  svc_paid: {
    id: "svc_paid",
    intent: "service-performance-media",
    say: ["Performance Media — paid that reports to revenue, not to dashboards."],
    links: [
      { label: "Performance Media", href: "/solutions/performance-media" },
      {
        label: "Tru Aquapolis case study",
        href: "/work/tru-aquapolis",
        note: "₹1.4 Cr of media, ₹187.5 Cr closed, published in full",
      },
    ],
    options: [
      { label: "Leave my details", next: "capture_general" },
      { label: "Back", next: "service" },
    ],
  },

  svc_organic: {
    id: "svc_organic",
    intent: "service-organic",
    say: ["Organic Growth — where SEO becomes a compounding asset rather than a service line."],
    links: [
      { label: "Organic Growth", href: "/solutions/organic-growth" },
      {
        label: "Wise Market case study",
        href: "/work/wise-market",
        note: "AUD 40K to AUD 2.7M monthly in six months",
      },
    ],
    options: [
      { label: "Leave my details", next: "capture_general" },
      { label: "Back", next: "service" },
    ],
  },

  svc_experience: {
    id: "svc_experience",
    intent: "service-experience",
    say: [
      "Experience & Engineering — the site is the salesperson.",
      "If traffic is fine and conversion isn't, this is usually the cheapest revenue in the business and the least worked.",
    ],
    links: [
      { label: "Experience & Engineering", href: "/solutions/experience-engineering" },
      {
        label: "Mini Leaves case study",
        href: "/work/mini-leaves",
        note: "0.5% to 3%+ site conversion",
      },
    ],
    options: [
      { label: "Leave my details", next: "capture_general" },
      { label: "Back", next: "service" },
    ],
  },

  svc_brand: {
    id: "svc_brand",
    intent: "service-brand",
    say: ["Brand, Engagement & Lifecycle — from awareness to advocacy, the full lifecycle owned."],
    links: [
      {
        label: "Brand, Engagement & Lifecycle",
        href: "/solutions/brand-engagement-lifecycle",
      },
    ],
    options: [
      { label: "Leave my details", next: "capture_general" },
      { label: "Back", next: "service" },
    ],
  },

  svc_strategy: {
    id: "svc_strategy",
    intent: "service-strategy",
    say: ["Growth Strategy & Advisory — strategy before tactics, growth as a system rather than a campaign."],
    links: [
      { label: "Growth Strategy & Advisory", href: "/solutions/growth-strategy-advisory" },
      { label: "How the firm works", href: "/about" },
    ],
    options: [
      { label: "Leave my details", next: "capture_general" },
      { label: "Back", next: "service" },
    ],
  },

  // ── Branch 3: proof ───────────────────────────────────────────────────────
  work: {
    id: "work",
    intent: "work-browse",
    say: [
      "Everything published has the spend attached to it. Where we can't name a client or evidence a number, there's no case study — which is why there are seven and not seventy.",
    ],
    links: [
      { label: "All work", href: "/work" },
      { label: "Tru Aquapolis · Real estate", href: "/work/tru-aquapolis" },
      { label: "Wise Market · E-commerce", href: "/work/wise-market" },
      { label: "Mini Leaves · D2C", href: "/work/mini-leaves" },
    ],
    options: [
      { label: "Leave my details", next: "capture_general" },
      { label: "Back", next: "start" },
    ],
  },

  // ── Branch 4: everything else ─────────────────────────────────────────────
  other: {
    id: "other",
    intent: "other",
    say: ["Fair enough. What would be most useful?"],
    links: [
      { label: "Contact details and office", href: "/contact" },
      { label: "Common questions", href: "/faq" },
      { label: "Field notes", href: "/insights" },
    ],
    options: [
      { label: "Leave my details", next: "capture_general" },
      { label: "Back", next: "start" },
    ],
  },

  // ── Lead capture ──────────────────────────────────────────────────────────
  capture_general: {
    id: "capture_general",
    intent: "chat-lead",
    capture: true,
    say: [
      "Three fields and we'll come back to you.",
      "If you'd rather send it as a full picture, the diagnostic application asks better questions than this box can.",
    ],
  },

  capture_diagnostic: {
    id: "capture_diagnostic",
    intent: "chat-lead-diagnostic",
    capture: true,
    say: ["Three fields, and we'll send you the diagnostic application."],
  },

  done: {
    id: "done",
    say: [
      "Got it — that's with us.",
      "Nobody is monitoring this chat around the clock, so the honest answer on timing is the next working day. If it's urgent, WhatsApp is faster.",
    ],
    options: [{ label: "Start again", next: "start" }],
  },
};
