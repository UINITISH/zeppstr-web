/**
 * Pre-flight check — counts existing documents in Sanity by type.
 * Run with: npm run seed:check
 *
 * Useful for verifying what's already in Sanity before deciding to re-seed,
 * or for confirming a seed run completed successfully.
 */

// MUST be the first import — loads .env.local before client.ts reads env vars
import "./load-env";
import { sanity, sanityConfig } from "./client";
import { reportFailure } from "./report-failure";

async function main() {
  console.log("Zeppstr · Sanity content audit");
  console.log(`  project: ${sanityConfig.projectId}`);
  console.log(`  dataset: ${sanityConfig.dataset}`);

  const types = [
    "solution",
    "subService",
    "industry",
    "clientLogo",
    "caseStudy",
    "quote",
    "article",
  ] as const;

  for (const type of types) {
    const count = await sanity.fetch<number>(`count(*[_type == $type])`, { type });
    const slugs = await sanity.fetch<{ name?: string; clientName?: string; title?: string }[]>(
      `*[_type == $type] | order(_createdAt asc) { name, clientName, title } [0...20]`,
      { type }
    );
    const labels = slugs.map((s) => s.name ?? s.clientName ?? s.title ?? "(unnamed)");
    console.log(`\n${type.padEnd(15)} ${count} document(s)`);
    if (labels.length) {
      labels.forEach((l) => console.log(`  · ${l}`));
      if (count > 20) console.log(`  · ... and ${count - 20} more`);
    }
  }

  console.log("\n✓ Audit complete.");
}

main().catch((err) => {
  reportFailure(err, "Check failed");
  process.exit(1);
});
