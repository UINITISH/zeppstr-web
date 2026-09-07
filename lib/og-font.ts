/**
 * Font loading for generated images (ImageResponse / Satori).
 *
 * ── THE BUG THIS FIXES ──────────────────────────────────────────────────────
 * /work-thumb/[slug], /insights-cover/[slug] and app/opengraph-image.tsx all
 * declared `fontFamily: "sans-serif"` without loading a font. Satori ships no
 * system fonts, so it fell back to a default with no rupee glyph and rendered
 * "₹34 Cr+" as "□34 Cr+".
 *
 * Not cosmetic: the rupee sign is in the headline metric of the flagship case
 * study, and these images are what appear when a page is shared on LinkedIn or
 * WhatsApp.
 *
 * ── WHY A TTF, NOT GOOGLE FONTS CSS ─────────────────────────────────────────
 * Satori supports TTF, OTF and WOFF — but NOT WOFF2. The Google Fonts CSS API
 * returns WOFF2 to any modern user agent, so the usual "fetch the CSS, parse
 * the src URL" recipe produces a font Satori cannot parse and the route 500s.
 *
 * Fontsource publishes plain TTFs on jsDelivr at a stable, versioned path.
 * That is what we fetch.
 *
 * ── OFFLINE ALTERNATIVE ─────────────────────────────────────────────────────
 * To remove the network dependency at render time, download the same file to
 * /public/fonts/inter-400.ttf and replace the fetch with a readFileSync. That
 * is the more robust option for production; it is left as a fetch here so the
 * repo carries no binary.
 */

/**
 * Order matters. The `latin` subset does NOT contain U+20B9 (₹) — that was the
 * first fix attempt and it still rendered tofu. `latin-ext` carries the
 * currency block. Noto Sans is the fallback because its coverage is the widest
 * of the freely-hosted families.
 */
const FONT_URLS = [
  "https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-ext-400-normal.ttf",
  "https://cdn.jsdelivr.net/fontsource/fonts/noto-sans@latest/latin-ext-400-normal.ttf",
  "https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-400-normal.ttf",
];

let cached: ArrayBuffer | null = null;
let attempted = false;

/**
 * Returns an Inter font buffer for ImageResponse, or null if unavailable.
 * Cached in module scope, so it is fetched once per server instance.
 *
 * Never throws — a missing font degrades to the previous rendering rather than
 * failing the image route.
 */
export async function loadOgFont(): Promise<ArrayBuffer | null> {
  if (cached) return cached;
  if (attempted) return null;
  attempted = true;

  for (const url of FONT_URLS) {
    try {
      const res = await fetch(url, {
        next: { revalidate: 60 * 60 * 24 * 30 },
      });
      if (!res.ok) continue;
      const buf = await res.arrayBuffer();
      if (buf.byteLength > 1000) {
        cached = buf;
        return cached;
      }
    } catch {
      // try the next mirror
    }
  }
  return null;
}

/**
 * Last-resort text guard. If no font loaded, substitute the rupee sign so the
 * image reads correctly instead of printing a tofu box.
 */
export function safeGlyphs(text: string, hasFont: boolean): string {
  return hasFont ? text : text.replace(/₹/g, "Rs ");
}
