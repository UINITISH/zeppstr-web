import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: process.env.SANITY_API_VERSION ?? "2024-01-01",
  useCdn: process.env.NODE_ENV === "production",
};

/** Read-only client for ISR/SSG content fetching */
export const sanity = createClient({
  ...sanityConfig,
  perspective: "published",
});

/** Builder for Sanity image URLs (responsive, transformed) */
const builder = imageUrlBuilder(sanity);
export const urlFor = (source: any) => builder.image(source);
