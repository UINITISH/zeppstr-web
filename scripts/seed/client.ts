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

/**
 * maxRetries: the seed fires several hundred mutations in sequence over one
 * keep-alive connection, and on 23 Sep it died on ECONNRESET four logos into a
 * twenty-five logo batch — a transient TCP reset, nothing to do with content.
 * Without retries a single dropped packet wastes the whole run and leaves the
 * dataset half-written.
 *
 * Retrying is safe here specifically BECAUSE every document uses a
 * deterministic _id, so a mutation replayed after an ambiguous failure upserts
 * the same document rather than creating a duplicate. Do not copy this setting
 * to a client that does create-without-id writes.
 */
export const sanity = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
  maxRetries: 5,
  retryDelay: (attempt: number) => Math.min(1000 * 2 ** attempt, 15000),
});

export const sanityConfig = { projectId, dataset, apiVersion };
