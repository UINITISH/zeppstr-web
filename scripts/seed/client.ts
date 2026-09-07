import { createClient } from "@sanity/client";

/**
 * Sanity write client for seeding.
 * Uses SANITY_API_TOKEN (read+write) — must be set in .env.local before running `npm run seed`.
 */
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const apiVersion = process.env.SANITY_API_VERSION ?? "2024-01-01";
const token = process.env.SANITY_API_TOKEN;

if (!projectId) {
  throw new Error(
    "NEXT_PUBLIC_SANITY_PROJECT_ID not set. Add to .env.local before running seed."
  );
}
if (!token) {
  throw new Error(
    "SANITY_API_TOKEN not set. Generate a write token in Sanity Studio → Manage → API → Tokens, then add to .env.local."
  );
}

export const sanity = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

export const sanityConfig = { projectId, dataset, apiVersion };
