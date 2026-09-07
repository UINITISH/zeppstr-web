import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * The compact Zeppstr mark (the Z-with-arrow in a rounded square), as a data
 * URI for use inside ImageResponse / Satori.
 *
 * Satori cannot resolve site-relative image paths — it has no notion of the
 * request origin — so the file is read from disk at render time and inlined.
 *
 * Two variants:
 *   markDataUri("white")  → for the dark brand-green cards
 *   markDataUri("black")  → for light backgrounds
 *
 * Source: public/brand/zeppstr-mark*.png, derived from app/icon.png.
 * The horizontal wordmark is deliberately NOT used here — at the size these
 * cards render the tagline ("You Grow, We Grow") becomes unreadable, and the
 * mark reads better as a corner device.
 */

const cache = new Map<string, string | null>();

export function markDataUri(variant: "white" | "black" = "white"): string | null {
  const key = variant;
  if (cache.has(key)) return cache.get(key)!;

  const file = variant === "white" ? "zeppstr-mark-white.png" : "zeppstr-mark.png";
  try {
    const buf = readFileSync(join(process.cwd(), "public", "brand", file));
    const uri = `data:image/png;base64,${buf.toString("base64")}`;
    cache.set(key, uri);
    return uri;
  } catch {
    // Missing asset must not 500 a social card.
    cache.set(key, null);
    return null;
  }
}
