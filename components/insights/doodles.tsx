import * as React from "react";

/**
 * Hand-drawn doodle library for article artwork.
 *
 * ── WHY THESE ARE DRAWN HERE AND NOT DOWNLOADED ─────────────────────────────
 * Vikas showed a page of stock doodle sets — Shutterstock, Dreamstime, Vecteezy,
 * Envato — as the STYLE reference. The style is right. Those particular files
 * are not ours to use: they are licensed illustrations, and lifting them would
 * be both a copyright problem and the same mistake as the Magnific photographs,
 * which is paying for someone else's picture of our subject.
 *
 * So these are drawn from scratch. They are ordinary marketing symbols — a
 * magnifier, an envelope, a bar chart — which nobody owns as ideas, executed
 * in our own line.
 *
 * ── WHAT MAKES THEM LOOK HAND-DRAWN ─────────────────────────────────────────
 * Three things, all deliberate:
 *   1. No perfect geometry. Circles are slightly-off arcs, rectangles have
 *      corners that overshoot, lines are a touch uneven. A perfect circle reads
 *      as software; a wobbly one reads as a pen.
 *   2. Round caps and joins throughout, at a chunky stroke width.
 *   3. Overshoot at corners, the way a real pen leaves a tail.
 *
 * Every doodle is drawn inside a 0 0 100 100 box so the composer can place and
 * scale them freely.
 */

export type DoodleName =
  | "magnifier" | "megaphone" | "laptop" | "barChart" | "lineChart"
  | "envelope" | "cursor" | "link" | "hashtag" | "bulb"
  | "target" | "funnel" | "gear" | "rocket" | "clock"
  | "cart" | "star" | "thumbsUp" | "pin" | "document"
  | "calendar" | "play" | "bell" | "wallet" | "mobile" | "checklist";

const S = {
  fill: "none" as const,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** Each entry returns paths only; the composer supplies stroke colour/width. */
export const DOODLES: Record<DoodleName, () => React.ReactElement> = {
  magnifier: () => (
    <g {...S}>
      <path d="M44 16c-15 -1 -28 11 -28 26 0 14 11 26 26 27 15 1 28-11 28-26 0-14-11-26-26-27z" />
      <path d="M64 66 L86 88" />
      <path d="M30 34c3-5 8-8 13-9" />
    </g>
  ),
  megaphone: () => (
    <g {...S}>
      <path d="M18 44 L18 62 L34 62 L72 82 L72 24 L34 44 Z" />
      <path d="M40 64 L44 86 L56 86 L52 70" />
      <path d="M80 40c5 3 5 20 0 24" />
      <path d="M88 32c9 7 9 33 0 40" />
    </g>
  ),
  laptop: () => (
    <g {...S}>
      <path d="M22 24 L78 22 L80 66 L20 68 Z" />
      <path d="M10 74 L90 72 L84 84 L16 86 Z" />
      <path d="M32 38 L60 37" />
      <path d="M32 50 L50 49" />
    </g>
  ),
  barChart: () => (
    <g {...S}>
      <path d="M14 86 L88 84" />
      <path d="M26 86 L26 58" />
      <path d="M44 85 L44 38" />
      <path d="M62 85 L62 50" />
      <path d="M80 84 L80 22" />
    </g>
  ),
  lineChart: () => (
    <g {...S}>
      <path d="M14 84 L86 82" />
      <path d="M14 84 L14 16" />
      <path d="M22 68c14 2 18-18 30-16 12 2 14-22 32-26" />
      <path d="M72 24 L86 22 L84 36" />
    </g>
  ),
  envelope: () => (
    <g {...S}>
      <path d="M12 28 L88 26 L90 74 L14 76 Z" />
      <path d="M12 28 L50 54 L90 26" />
    </g>
  ),
  cursor: () => (
    <g {...S}>
      <path d="M30 16 L30 78 L44 64 L54 86 L66 80 L56 58 L76 56 Z" />
    </g>
  ),
  link: () => (
    <g {...S}>
      <path d="M44 58c-8 8-8 18 0 26 8 8 18 8 26 0l12-12c8-8 8-18 0-26-8-8-18-8-26 0" />
      <path d="M56 42c8-8 8-18 0-26-8-8-18-8-26 0L18 28c-8 8-8 18 0 26 8 8 18 8 26 0" />
    </g>
  ),
  hashtag: () => (
    <g {...S}>
      <path d="M36 14 L28 88" />
      <path d="M68 12 L60 86" />
      <path d="M16 36 L88 32" />
      <path d="M14 64 L86 60" />
    </g>
  ),
  bulb: () => (
    <g {...S}>
      <path d="M50 12c-16 0-27 12-27 26 0 10 6 16 9 22 2 4 3 8 3 12h30c0-4 1-8 3-12 3-6 9-12 9-22 0-14-11-26-27-26z" />
      <path d="M38 80 L62 79" />
      <path d="M42 90 L58 89" />
    </g>
  ),
  target: () => (
    <g {...S}>
      <path d="M50 14c-20 0-36 16-36 36 0 20 16 36 36 36 20 0 36-16 36-36 0-20-16-36-36-36z" />
      <path d="M50 32c-10 0-18 8-18 18 0 10 8 18 18 18 10 0 18-8 18-18" />
      <path d="M50 46 L50 54" />
      <path d="M62 38 L88 12" />
      <path d="M76 12 L88 12 L88 24" />
    </g>
  ),
  funnel: () => (
    <g {...S}>
      <path d="M12 18 L88 16 L58 52 L58 84 L42 76 L42 52 Z" />
    </g>
  ),
  gear: () => (
    <g {...S}>
      <path d="M50 34c-9 0-16 7-16 16 0 9 7 16 16 16 9 0 16-7 16-16 0-9-7-16-16-16z" />
      <path d="M50 8 L50 22 M50 78 L50 92 M8 50 L22 50 M78 50 L92 50" />
      <path d="M21 21 L31 31 M69 69 L79 79 M21 79 L31 69 M69 31 L79 21" />
    </g>
  ),
  rocket: () => (
    <g {...S}>
      <path d="M50 10c14 12 20 28 18 46l-16 14-16-14c-2-18 4-34 14-46z" />
      <path d="M50 38c-4 0-7 3-7 7s3 7 7 7 7-3 7-7-3-7-7-7z" />
      <path d="M36 62 L24 74 L38 72" />
      <path d="M64 62 L76 74 L62 72" />
      <path d="M44 78c3 8 9 10 12 0" />
    </g>
  ),
  clock: () => (
    <g {...S}>
      <path d="M50 12c-21 0-38 17-38 38s17 38 38 38 38-17 38-38-17-38-38-38z" />
      <path d="M50 28 L50 52 L68 62" />
    </g>
  ),
  cart: () => (
    <g {...S}>
      <path d="M10 16 L24 18 L34 62 L78 58" />
      <path d="M26 28 L88 24 L80 58" />
      <path d="M40 76c-4 0-7 3-7 7s3 7 7 7 7-3 7-7-3-7-7-7z" />
      <path d="M72 74c-4 0-7 3-7 7s3 7 7 7 7-3 7-7-3-7-7-7z" />
    </g>
  ),
  star: () => (
    <g {...S}>
      <path d="M50 10 L62 38 L92 40 L68 58 L76 88 L50 71 L24 88 L32 58 L8 40 L38 38 Z" />
    </g>
  ),
  thumbsUp: () => (
    <g {...S}>
      <path d="M30 44 L30 86 L14 86 L14 44 Z" />
      <path d="M30 46c10-4 16-14 18-24 2-10 12-10 12 0 0 6-2 10-4 14h22c6 0 9 5 7 10l-10 30c-2 5-6 8-11 8H30" />
    </g>
  ),
  pin: () => (
    <g {...S}>
      <path d="M50 10c-16 0-28 12-28 28 0 20 28 50 28 50s28-30 28-50c0-16-12-28-28-28z" />
      <path d="M50 28c-6 0-11 5-11 11s5 11 11 11 11-5 11-11-5-11-11-11z" />
    </g>
  ),
  document: () => (
    <g {...S}>
      <path d="M22 10 L62 12 L80 32 L78 90 L20 88 Z" />
      <path d="M62 12 L62 32 L80 32" />
      <path d="M34 48 L66 47 M34 60 L66 59 M34 72 L54 71" />
    </g>
  ),
  calendar: () => (
    <g {...S}>
      <path d="M14 22 L86 20 L88 86 L16 88 Z" />
      <path d="M14 40 L88 38" />
      <path d="M32 10 L32 30 M68 10 L68 28" />
      <path d="M32 56 L40 56 M56 55 L64 55 M32 72 L40 72 M56 71 L64 71" />
    </g>
  ),
  play: () => (
    <g {...S}>
      <path d="M14 20 L86 18 L88 82 L16 84 Z" />
      <path d="M42 38 L66 51 L42 64 Z" />
    </g>
  ),
  bell: () => (
    <g {...S}>
      <path d="M50 12c-14 0-24 11-24 25 0 18-6 22-10 28h68c-4-6-10-10-10-28 0-14-10-25-24-25z" />
      <path d="M40 74c2 8 18 8 20 0" />
      <path d="M50 6 L50 12" />
    </g>
  ),
  wallet: () => (
    <g {...S}>
      <path d="M12 26 L78 22 L80 80 L14 84 Z" />
      <path d="M80 44 L92 43 L93 62 L81 63" />
      <path d="M84 52c-2 0-4 2-4 4s2 4 4 4" />
    </g>
  ),
  mobile: () => (
    <g {...S}>
      <path d="M30 8 L70 10 L68 92 L28 90 Z" />
      <path d="M44 16 L56 16" />
      <path d="M49 80c-2 0-4 2-4 4s2 4 4 4 4-2 4-4-2-4-4-4z" />
    </g>
  ),
  checklist: () => (
    <g {...S}>
      <path d="M14 22 L28 24 L34 14" />
      <path d="M14 50 L28 52 L34 42" />
      <path d="M14 78 L28 80 L34 70" />
      <path d="M46 22 L88 20 M46 50 L88 48 M46 78 L76 76" />
    </g>
  ),
};

export const DOODLE_NAMES = Object.keys(DOODLES) as DoodleName[];
