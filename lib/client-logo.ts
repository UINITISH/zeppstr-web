/**
 * Client logo registry, keyed by case study / roster slug.
 *
 * ── WHY THIS IS AN EXPLICIT MAP AND NOT `/client-logos/v3/${slug}.png` ─────────
 * Deriving the path from the slug looks tidier and breaks silently. Several
 * slugs do not match their logo filename, and a missing file produces a broken
 * <img> rather than a clean fallback. Every entry below has been checked against
 * the contents of /public/client-logos.
 *
 * ── WHY EACH LOGO CARRIES A TONE ────────────────────────────────────────────
 * The artwork is not uniform and cannot be made uniform without redrawing other
 * people's brands, which we are not going to do.
 *
 *   - Most logos are dark or mid-tone marks. They need a LIGHT panel.
 *   - FWC, Magtik, Scageon and Pohewala were supplied as white / reversed
 *     artwork. On a white panel they are invisible — not faint, invisible.
 *     They need a DARK panel.
 *   - Invest in Sharjah is yellow-on-navy; the navy card was flood-filled to
 *     transparency, leaving yellow artwork that also needs a dark panel.
 *
 * So the panel colour is a property of the logo, not of the grid. Every tile is
 * still the same size with the same padding and the same hover behaviour — only
 * the panel value differs, which reads as deliberate rather than as the
 * mismatched screenshot/logo/hole mess this replaced.
 *
 * TO REMOVE A DARK PANEL: supply a dark-artwork version of that logo, change
 * its tone to "light", and it joins the rest. Magtik in particular was supplied
 * as "Magtik-Bharat-White-logo" — a colour version almost certainly exists.
 *
 * ── PROVENANCE ──────────────────────────────────────────────────────────────
 * The original 23 were lifted from the "Our Clients" page of Portfolio
 * Zeppstr.pdf as dark artwork on a white card with a rule and a drop shadow.
 * Those cards were flood-filled to transparency and tight-cropped on 13 Sep
 * 2026; the untouched originals are in deliverables/logo-originals/.
 *
 * The nine added on 15 Sep 2026 were supplied directly by Vikas. Two arrived as
 * SVG (Tru, Pohewala) and were rasterised at 900px wide.
 *
 * KNOWN ISSUE: pohewala.png renders "Established 20__" with the last two digits
 * overlapping. That is in the supplied SVG's outlines, not in our conversion. A
 * flat PNG of that logo would fix it.
 * KNOWN ISSUE: scageon.png was supplied at 121×16px. It is too small to render
 * crisply anywhere and will look soft. A larger file would fix it.
 */

export type LogoTone = "light" | "dark";

interface LogoEntry {
  src: string;
  /** "light" = dark artwork, put it on a white panel (default).
   *  "dark"  = white/reversed artwork, put it on an emerald panel. */
  tone: LogoTone;
}

const CLIENT_LOGOS: Record<string, LogoEntry> = {
  // ── Published case studies ──
  homatico: { src: "/client-logos/v3/homatico.png", tone: "light" },
  vehiclemall: { src: "/client-logos/v3/vehiclemall.png", tone: "light" },
  "sky-phonez": { src: "/client-logos/v3/sky-phonez.png", tone: "light" },
  "mini-leaves": { src: "/client-logos/v3/mini-leaves.png", tone: "light" },
  "wise-market": { src: "/client-logos/v3/wise-market.png", tone: "light" },
  "tru-aquapolis": { src: "/client-logos/v3/tru-aquapolis.png", tone: "light" },
  "invest-in-sharjah": {
    src: "/client-logos/v3/invest-in-sharjah.png",
    tone: "dark",
  },

  // ── Roster clients — no case study written up yet ──
  "aishwarya-interiors": {
    src: "/client-logos/v3/aishwarya-interiors.png",
    tone: "light",
  },
  empuls: { src: "/client-logos/v3/empuls.png", tone: "light" },
  fixstars: { src: "/client-logos/v3/fixstars.png", tone: "light" },
  prohance: { src: "/client-logos/v3/prohance.png", tone: "light" },
  "tristar-online": { src: "/client-logos/v3/tristar-online.png", tone: "light" },
  "twenty-one-finance": {
    src: "/client-logos/v3/twenty-one-finance.png",
    tone: "light",
  },
  // Same client, second key. The homepage's STATIC_FEATURED_CASES uses the slug
  // "21-finance" while the logo file and the seed both use
  // "twenty-one-finance". Rather than rename a slug that may be linked
  // elsewhere, both keys resolve to the same artwork. This is exactly the
  // failure mode the explicit map exists to catch — a derived
  // `/client-logos/v3/${slug}.png` would have 404'd here in silence.
  "21-finance": {
    src: "/client-logos/v3/twenty-one-finance.png",
    tone: "light",
  },
  ivehiclevalue: { src: "/client-logos/v3/ivehiclevalue.png", tone: "light" },
  learncab: { src: "/client-logos/v3/learncab.png", tone: "light" },
  nakshatech: { src: "/client-logos/v3/nakshatech.png", tone: "light" },

  // ── Supplied 15 Sep 2026 ──
  // ── -dark.png SUFFIX ───────────────────────────────────────────────────────
  // These four were supplied as white/reversed artwork and have been recoloured
  // to ink so they work on the light wall. The file is renamed rather than
  // overwritten because Next caches optimised images by URL: overwriting
  // client-logos/fwc.png left the dev server serving the old white version
  // indefinitely, which looked like the logo had vanished. A new filename is a
  // new cache key. If these are ever re-processed, bump the suffix again.

  moonwalk: { src: "/client-logos/v3/moonwalk.png", tone: "light" },
  truglobal: { src: "/client-logos/v3/truglobal.png", tone: "light" },
  "leverage-edu": { src: "/client-logos/v3/leverage-edu.png", tone: "light" },
  fwc: { src: "/client-logos/v3/fwc-dark.png", tone: "dark" },
  "magtik-lighting": { src: "/client-logos/v3/magtik-lighting-dark.png", tone: "dark" },
  scageon: { src: "/client-logos/v3/scageon-dark.png", tone: "dark" },
  pohewala: { src: "/client-logos/v3/pohewala-2018.png", tone: "dark" },
};

export function getClientLogo(slug: string): string | null {
  return CLIENT_LOGOS[slug]?.src ?? null;
}

export function getClientLogoTone(slug: string): LogoTone {
  return CLIENT_LOGOS[slug]?.tone ?? "light";
}

/** Both at once — saves callers doing two lookups per tile. */
export function getClientLogoEntry(slug: string): LogoEntry | null {
  return CLIENT_LOGOS[slug] ?? null;
}
