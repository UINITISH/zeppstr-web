/**
 * Leadership and team, for the About page.
 *
 * ── WHAT IS AND IS NOT IN HERE ──────────────────────────────────────────────
 * One name. Nitish Kumar is the only person documented anywhere in the archive
 * — "Meet Founder · Nitish Kumar · Founder | Digital Marketing Consultant |
 * Trainer | Marketing Strategist | Investor", page 3 of Portfolio Zeppstr.pdf.
 *
 * Nobody else has been invented. A team page with plausible-looking names and
 * stock headshots is the single most checkable lie a site can tell: a prospect
 * searches one name, finds nothing, and every other claim on the site is now
 * suspect. The section is built to hold eight people and currently holds one,
 * which is visibly incomplete rather than quietly false.
 *
 * ── HOW TO ADD SOMEONE ──────────────────────────────────────────────────────
 * 1. Drop a square portrait at /public/team/<slug>.jpg — 800×800 or larger,
 *    shot on a plain background, head and shoulders.
 * 2. Add the entry below with that slug.
 *
 * A member with no `photo` renders a monogram tile instead of a broken image,
 * so names can go up before the photography does. That is the intended interim
 * state, not a bug.
 *
 * ── WHAT NOT TO DO ──────────────────────────────────────────────────────────
 * Do not fill the grid with stock photography of people who do not work here.
 * Do not add a name without a real person behind it. Do not list contractors as
 * staff. For a firm whose whole pitch is "we only claim what we can prove", the
 * team page is the first place that claim gets tested.
 */

export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  /** Square portrait in /public/team/. Omit until a real photo exists. */
  photo?: string;
  /** Paragraphs. What they actually do, not an adjective list. */
  bio?: string[];
  linkedin?: string;
}

/** Leadership — rendered large, with a bio. */
export const LEADERSHIP: TeamMember[] = [
  {
    slug: "nitish-kumar",
    name: "Nitish Kumar",
    role: "Digital marketing consultant · Strategist",
    // photo: "/team/nitish-kumar.jpg",   ← uncomment once the file is in place
    bio: [
      "Nitish reads every diagnostic application personally and sits on the engagement through delivery. The firm is built so that the person who makes the argument is the person accountable for the result — which is the practical reason capacity is capped rather than scaled.",
      "Zeppstr operates from Bengaluru and works with clients across India, the UAE, Australia and Japan.",
    ],
  },
];

/**
 * The wider team — rendered as a compact grid.
 *
 * Deliberately empty. See the note at the top of this file: the alternative to
 * an empty grid is an invented one, and that is a worse outcome than a section
 * that is honestly still being filled.
 */
export const TEAM: TeamMember[] = [];

/** Monogram for members without a portrait. "Nitish Kumar" → "NK". */
export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}
