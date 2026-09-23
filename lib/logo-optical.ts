/**
 * Optical sizing for client logos.
 *
 * ── THE PROBLEM THIS SOLVES ─────────────────────────────────────────────────
 * Every logo grid on this site capped logos by HEIGHT alone (`max-h-[54px]`)
 * plus a percentage width ceiling. That is fine when all the marks have a
 * similar shape. Ours do not — the supplied artwork spans an 11× range of
 * aspect ratio:
 *
 *     tru-aquapolis      697 × 1000   ratio 0.70   (tall portrait crest)
 *     mini-leaves        411 ×  291   ratio 1.41
 *     homatico           578 ×  186   ratio 3.11
 *     vehiclemall        599 ×  107   ratio 5.60
 *     scageon            121 ×   16   ratio 7.56   (hairline wordmark)
 *
 * Under a single 54px height cap, VehicleMall renders 124 × 22 (width-limited,
 * a thin strip across the cell) while Tru Aquapolis renders 38 × 54 (a small
 * stamp marooned in white space). Measured on /work: the two marks differ by
 * roughly 3× in ink area while nominally obeying the same rule. That is what
 * reads as "the logo sizes are off".
 *
 * ── THE FIX ─────────────────────────────────────────────────────────────────
 * Normalise by AREA, not by height. Given a target area A and a logo's aspect
 * ratio r = w/h:
 *
 *     h = sqrt(A / r)        w = h · r
 *
 * A tall mark is then allowed to be tall, a wide mark is allowed to be wide,
 * and both end up occupying the same amount of the eye's attention. The result
 * is clamped at both ends: nothing taller than `maxHeight` (or a portrait crest
 * would tower over the row) and nothing wider than `maxWidth` (or a hairline
 * wordmark would run to the cell edge).
 *
 * This is the standard approach for a mixed logo wall. It is not a stylistic
 * preference — a single height cap is simply the wrong instrument when the
 * inputs vary in shape.
 *
 * ── WHY THE DIMENSIONS LIVE HERE ────────────────────────────────────────────
 * Intrinsic size has to be known at render time to compute the box, and these
 * are static files in /public that Next cannot measure server-side without
 * reading them off disk on every request. They are recorded once, below. They
 * were read from the actual PNGs, not estimated.
 *
 * If you add or replace a logo file, add or update its row here. A logo with no
 * row falls back to a plain height cap, which is the old behaviour — it will
 * look slightly off next to its neighbours until its dimensions are recorded.
 */

/** Intrinsic pixel dimensions of each file in /public/client-logos/v3/. */
const LOGO_DIMENSIONS: Record<string, { w: number; h: number }> = {
  "tru-aquapolis.png": { w: 697, h: 1000 },
  "aishwarya-interiors.png": { w: 317, h: 347 },
  "my-keto-co.png": { w: 296, h: 294 },
  "tansi-fintech.png": { w: 401, h: 308 },
  "mini-leaves.png": { w: 411, h: 291 },
  "moonwalk.png": { w: 754, h: 438 },
  "leverage-edu.png": { w: 333, h: 167 },
  "ace-online.png": { w: 537, h: 237 },
  "jp-parking-yard.png": { w: 546, h: 239 },
  "twenty-one-finance.png": { w: 585, h: 254 },
  "eagledrift.png": { w: 579, h: 237 },
  "pacer.png": { w: 600, h: 244 },
  "sky-phonez.png": { w: 545, h: 214 },
  "bsg.png": { w: 595, h: 211 },
  "fixstars.png": { w: 576, h: 202 },
  "homatico.png": { w: 578, h: 186 },
  "magtik-lighting-dark.png": { w: 289, h: 92 },
  "magtik-lighting.png": { w: 289, h: 92 },
  "empuls.png": { w: 598, h: 190 },
  "invest-in-sharjah.png": { w: 455, h: 138 },
  "learncab.png": { w: 545, h: 163 },
  "fwc-dark.png": { w: 512, h: 138 },
  "fwc.png": { w: 512, h: 138 },
  "ignite.png": { w: 590, h: 153 },
  "pohewala-2018.png": { w: 1000, h: 247 },
  "pohewala-dark.png": { w: 1000, h: 247 },
  "pohewala.png": { w: 1000, h: 247 },
  "truglobal.png": { w: 422, h: 102 },
  "lucky-white-goods.png": { w: 600, h: 138 },
  "ivehiclevalue.png": { w: 597, h: 127 },
  "wise-market.png": { w: 600, h: 127 },
  "vehiclemall.png": { w: 599, h: 107 },
  "nakshatech.png": { w: 598, h: 97 },
  "prohance.png": { w: 598, h: 92 },
  "tristar-online.png": { w: 542, h: 82 },
  "scageon-dark.png": { w: 121, h: 16 },
  "scageon.png": { w: 121, h: 16 },
};

export interface LogoBoxOptions {
  /**
   * Target ink area in px². This is the single number that controls how large
   * logos feel in a given grid. Roughly: a square mark renders at
   * sqrt(area) on a side.
   *
   *   2600  → ~51px square  (work index rows)
   *   4200  → ~65px square  (homepage wall, client roster)
   */
  area: number;
  /** Hard ceiling on height, whatever the area maths says. */
  maxHeight: number;
  /** Hard ceiling on width, whatever the area maths says. */
  maxWidth: number;
}

/**
 * Returns the `style` object for a logo <Image>, sized so that every mark in
 * the grid carries comparable visual weight regardless of its shape.
 *
 * Usage:
 *   <Image src={src} style={logoBox(src, WORK_ROW_LOGO)} className="object-contain" />
 */
export function logoBox(
  src: string | null | undefined,
  { area, maxHeight, maxWidth }: LogoBoxOptions,
): { maxHeight: string; maxWidth: string } {
  const file = src ? src.split("/").pop() ?? "" : "";
  const dim = LOGO_DIMENSIONS[file];

  // Unknown file — fall back to the plain height cap rather than guessing a
  // ratio. Slightly off, but never wildly wrong.
  if (!dim) {
    return { maxHeight: `${maxHeight}px`, maxWidth: `${maxWidth}px` };
  }

  const ratio = dim.w / dim.h;
  let h = Math.sqrt(area / ratio);
  let w = h * ratio;

  // Clamp to the cell. Clamping one dimension has to re-derive the other, or
  // object-contain would letterbox and we would be back to inconsistent sizes.
  if (h > maxHeight) {
    h = maxHeight;
    w = h * ratio;
  }
  if (w > maxWidth) {
    w = maxWidth;
    h = w / ratio;
  }

  return { maxHeight: `${Math.round(h)}px`, maxWidth: `${Math.round(w)}px` };
}

/**
 * Shared presets. Defined here rather than at each call site so the three grids
 * stay in a deliberate relationship: roster and wall tiles are the display
 * size, work-index rows are one step down because the row is a list entry, not
 * a showcase.
 */
export const WALL_LOGO: LogoBoxOptions = { area: 4200, maxHeight: 74, maxWidth: 160 };
export const ROSTER_LOGO: LogoBoxOptions = { area: 4200, maxHeight: 74, maxWidth: 170 };
export const WORK_ROW_LOGO: LogoBoxOptions = { area: 2900, maxHeight: 62, maxWidth: 132 };
/** Trust strip on the diagnostic intake — smaller cells (80–88px tall). */
export const INTAKE_LOGO: LogoBoxOptions = { area: 2200, maxHeight: 46, maxWidth: 104 };
