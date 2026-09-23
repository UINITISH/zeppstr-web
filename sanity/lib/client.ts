import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const sanityConfig = {
  // Literal fallback: Sanity Studio runs on Vite, which doesn't inject
  // NEXT_PUBLIC_* vars. The projectId is public (shipped to every visitor).
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "03uhyc94",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: process.env.SANITY_API_VERSION ?? "2024-01-01",

  /**
   * useCdn: false — deliberately, including in production.
   *
   * ── WHY THIS WAS CHANGED ────────────────────────────────────────────────
   * It used to be `process.env.NODE_ENV === "production"`, which looks like an
   * obvious optimisation and is wrong for this codebase. `next build` runs with
   * NODE_ENV=production, so every static page was generated from Sanity's CDN
   * cache rather than from the dataset.
   *
   * The symptom on 23 Sep: 12 filler articles were deleted from Sanity, the
   * prune confirmed `deleted ...` for all 12, and the very next build still
   * prerendered all 12 article routes. Nothing was wrong with the delete. The
   * build had simply read a stale cache.
   *
   * That is not a cosmetic problem. It means ANY content change may or may not
   * appear in a build depending on cache timing, so a deploy can silently ship
   * yesterday's content and the logs look completely clean. An intermittent,
   * invisible staleness bug is far more expensive than the milliseconds the CDN
   * saves.
   *
   * This client is only used for SSG/ISR fetches on the server, where each
   * query runs once per build or once per revalidate window — so the CDN buys
   * very little here anyway. Freshness at build time is worth more.
   *
   * If a browser-side or high-volume edge client is ever added, give it its own
   * client with useCdn: true. Do not switch this one back.
   */
  useCdn: false,
};

/** Read-only client for ISR/SSG content fetching */
export const sanity = createClient({
  ...sanityConfig,
  perspective: "published",
});

/** Builder for Sanity image URLs (responsive, transformed) */
const builder = imageUrlBuilder(sanity);
export const urlFor = (source: any) => builder.image(source);
